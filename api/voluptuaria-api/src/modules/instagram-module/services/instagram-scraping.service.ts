import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as puppeteer from 'puppeteer';
import { InstagramPostContract, InstagramScrapingResult } from '../data-contracts/instagram-post.contract';

@Injectable()
export class InstagramScrapingService {
    constructor(
        private readonly configService: ConfigService
    ) {}

    private async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private async acceptCookies(page: puppeteer.Page): Promise<void> {
        try {
            await page.waitForSelector('button._a9--._a9_1', { timeout: 5000 });
            await this.sleep(1000);
            await page.click('button._a9--._a9_1');
            await this.sleep(2000);
        } catch (error) {
            console.log('Pas de dialogue de cookies ou déjà accepté');
        }
    }

    private async loginToInstagram(page: puppeteer.Page): Promise<void> {
        try {
            await page.setDefaultNavigationTimeout(0);
            await page.goto('https://www.instagram.com/accounts/login/', {
                waitUntil: 'networkidle0',
                timeout: 0
            });

            await this.acceptCookies(page);
            await page.waitForSelector('input[name="username"]', { timeout: 0 });

            const username = this.configService.get<string>('INSTAGRAM_USERNAME');
            const password = this.configService.get<string>('INSTAGRAM_PASSWORD');

            await this.sleep(2000);
            await page.type('input[name="username"]', username, { delay: 100 });
            await this.sleep(2000);
            await page.type('input[name="password"]', password, { delay: 100 });
            await this.sleep(2000);

            const loginButton = await page.waitForSelector('button[type="submit"]');
            await loginButton.click();
            await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 0 });
            await this.sleep(5000);
        } catch (error) {
            throw new Error(`Erreur de connexion Instagram: ${error.message}`);
        }
    }

    private async getPostDetails(page: puppeteer.Page, url: string): Promise<InstagramPostContract | null> {
        await page.goto(url, { waitUntil: 'networkidle0' });
        await this.sleep(2000);

        return page.evaluate((): InstagramPostContract | null => {
            try {
                const article = document.querySelector('article[role="presentation"]');
                if (!article) return null;

                const getText = (selectors: string[]): string => {
                    for (const selector of selectors) {
                        const element = article.querySelector(selector);
                        if (element) return element.textContent.trim();
                    }
                    return '';
                };

                const caption = getText([
                    'div._a9zs',
                    'h1',
                    'div[data-testid="post-comment-root"]',
                    'span[data-testid="post-comment"]',
                    'ul li span'
                ]);

                const hashtags = caption.match(/#[^\s#]+/g) || [];
                const location = getText([
                    'div._aaqm',
                    'a[href*="/explore/locations/"]',
                    'div[role="button"] > div > div > div'
                ]);

                const timeElement = article.querySelector('time');
                const timestamp = timeElement ? timeElement.dateTime : '';

                const likesText = getText([
                    'section span[class*="html-span"]',
                    'section span[role="button"]',
                    'div[role="button"] span'
                ]);

                const commentsElements = article.querySelectorAll('ul[class*="x78zum5"] > div');
                const isVideo = !!article.querySelector('video') || 
                              !!article.querySelector('span[data-visualcompletion="css-img"][aria-label*="Vidéo"]');

                const postType: 'video' | 'image' = isVideo ? 'video' : 'image';

                return {
                    url: window.location.href,
                    caption,
                    hashtags,
                    location,
                    timestamp,
                    likes: likesText,
                    comments: commentsElements.length,
                    type: postType
                };
            } catch (error) {
                console.error('Erreur lors de l\'analyse du post:', error);
                return null;
            }
        });
    }

    public async scrapeInstagramProfile(username: string): Promise<InstagramScrapingResult> {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920,1080',
                '--hide-scrollbars',
                '--mute-audio'
            ],
            ignoreHTTPSErrors: true
        });

        try {
            const page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', (request) => {
                if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
                    request.abort();
                } else {
                    request.continue();
                }
            });

            await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
            await page.setViewport({ width: 1920, height: 1080 });

            await this.loginToInstagram(page);
            await page.goto(`https://www.instagram.com/${username}/`, {
                waitUntil: 'networkidle0',
                timeout: 0
            });

            // Récupérer les URLs des posts
            const postUrls = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href*="/p/"]'));
                return [...new Set(links.map(link => link.href))].filter(url => 
                    url.includes('/p/') && !url.includes('/liked_by/')
                );
            });

            const posts: InstagramPostContract[] = [];
            for (let i = 0; i < postUrls.length; i++) {
                const postData = await this.getPostDetails(page, postUrls[i]);
                if (postData) posts.push(postData);
                await this.sleep(2000);
            }

            return {
                profile: {
                    username,
                    totalPosts: postUrls.length,
                    analyzedPosts: posts.length
                },
                posts
            };

        } catch (error) {
            throw new Error(`Erreur lors du scraping Instagram: ${error.message}`);
        } finally {
            await browser.close();
        }
    }
} 