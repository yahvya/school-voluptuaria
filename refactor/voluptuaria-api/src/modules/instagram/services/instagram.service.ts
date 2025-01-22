import { Injectable } from "@nestjs/common"
import { InstagramPostsDto } from "../data-contract/instagram-posts.dto"
import * as puppeteer from "puppeteer"
import { ConfigService } from "@nestjs/config"

/**
 * Instagram service
 */
@Injectable()
export class InstagramService{
    constructor(
        private readonly configService: ConfigService
    ) {}

    /**
     * Extract user posts
     * @param userPseudo user's instagram pseudo
     * @return {Promise<InstagramPostsDto[]>} posts data
     */
    public async extractPostOf(
        {userPseudo}:
        {userPseudo:string}
    ):Promise<InstagramPostsDto[]>{
        try{
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
            })

            const page = await browser.newPage()
            await page.setRequestInterception(true)
            page.on('request', (request) => {
                if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
                    request.abort()
                } else {
                    request.continue()
                }
            })
            await page.setUserAgent("Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")
            await page.setViewport({ width: 1920, height: 1080 })
            await this.loginToInstagram({page: page });
            await page.goto(`https://www.instagram.com/${userPseudo}/`, {
                waitUntil: 'networkidle0',
                timeout: 0
            })
            // Récupérer les URLs des posts
            const postUrls = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href*="/p/"]'))
                return [...new Set(links.map(link => link.href))].filter(url =>
                    url.includes('/p/') && !url.includes('/liked_by/')
                )
            })
            const posts: InstagramPostsDto[] = []
            for (let i = 0; i < postUrls.length; i++) {
                const postData = await this.getPostDetails({page: page,url: postUrls[i]})

                if (postData !== null)
                    posts.push(postData)

                await this.sleep({ms: 1000 })
            }

            await browser.close()

            return posts
        }
        catch (_){
            return []
        }
    }

    /**
     * Provide a sleep promise
     * @param ms sleep time in ms
     * @return {Promise<void>} sleep promise
     */
    private async sleep(
        {ms}:
        {ms:number}
    ): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /**
     * Accept cookies
     * @param page page
     * @return {Promise<void>} accept promise
     */
    private async acceptCookies(
        {page}:
        {page:puppeteer.Page}
    ): Promise<void> {
        try {
            await page.waitForSelector("button._a9--._a9_1", { timeout: 5000 })
            await this.sleep({ms: 1000 })
            await page.click("button._a9--._a9_1")
            await this.sleep({ms: 2000 })
        } catch (_) {}
    }

    /**
     * Login to instagram
     * @param page page
     * @return {Promise<void>} login promise
     */
    private async loginToInstagram(
        {page}:
        {page: puppeteer.Page}
    ): Promise<void> {
        try {
            await page.setDefaultNavigationTimeout(0)
            await page.goto("https://www.instagram.com/accounts/login/", {
                waitUntil: "networkidle0",
                timeout: 0
            })
            await this.acceptCookies({ page: page });
            await page.waitForSelector('input[name="username"]', { timeout: 0 })
            const username = this.configService.get<string>("SCRAPPING_INSTAGRAM_USERNAME")
            const password = this.configService.get<string>("SCRAPPING_INSTAGRAM_PASSWORD")
            await this.sleep({ms: 2000 })
            await page.type('input[name="username"]', username, { delay: 100 })
            await this.sleep({ms: 2000 })
            await page.type('input[name="password"]', password, { delay: 100 })
            await this.sleep({ms: 2000 })
            const loginButton = await page.waitForSelector('button[type="submit"]')
            await loginButton.click()
            await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 0 })
            await this.sleep({ms: 3000 })
        } catch (error) {
        }
    }

    /**
     * Load post details
     * @param page on page
     * @param url on url
     * @return {InstagramPostsDto|null} post data
     */
    private async getPostDetails(
        {page,url}:
        {page:puppeteer.Page,url:string}
    ): Promise<InstagramPostsDto | null> {
        await page.goto(url, { waitUntil: 'networkidle0' })
        await this.sleep({ms: 2000 })
        return page.evaluate((): InstagramPostsDto | null => {
            try {
                const article = document.querySelector('article[role="presentation"]')
                if (!article) return null
                const getText = (selectors: string[]): string => {
                    for (const selector of selectors) {
                        const element = article.querySelector(selector)
                        if (element) return element.textContent.trim()
                    }
                    return ''
                }
                const caption = getText([
                    'div._a9zs',
                    'h1',
                    'div[data-testid="post-comment-root"]',
                    'span[data-testid="post-comment"]',
                    'ul li span'
                ])
                const hashtags = caption.match(/#[^\s#]+/g) || []
                const location = getText([
                    'div._aaqm',
                    'a[href*="/explore/locations/"]',
                    'div[role="button"] > div > div > div'
                ])
                const timeElement = article.querySelector('time')
                const timestamp = timeElement ? timeElement.dateTime : ''
                const likesText = getText([
                    'section span[class*="html-span"]',
                    'section span[role="button"]',
                    'div[role="button"] span'
                ])
                const commentsElements = article.querySelectorAll('ul[class*="x78zum5"] > div')
                const isVideo = !!article.querySelector('video') ||
                              !!article.querySelector('span[data-visualcompletion="css-img"][aria-label*="Vidéo"]')
                const postType: 'video' | 'image' = isVideo ? 'video' : 'image'
                return {
                    url: window.location.href,
                    caption: caption,
                    hashtags: hashtags,
                    location: location,
                    timestamp: timestamp,
                    likes: likesText,
                    comments: commentsElements.length,
                    type: postType
                }
            } catch (error) {
                console.error('Erreur lors de l\'analyse du post:', error)
                return null
            }
        })
    }
}
