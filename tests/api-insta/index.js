const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config();

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function acceptCookies(page) {
    try {
        // Attendre que le dialogue des cookies apparaisse
        await page.waitForSelector('button._a9--._a9_1', { timeout: 5000 });
        await sleep(1000);
        
        // Cliquer sur le bouton "Autoriser les cookies"
        await page.click('button._a9--._a9_1');
        console.log('Cookies acceptés !');
        await sleep(2000);
    } catch (error) {
        console.log('Pas de dialogue de cookies ou déjà accepté');
    }
}

async function loginToInstagram(page) {
    try {
        // Désactiver le timeout de navigation
        await page.setDefaultNavigationTimeout(0);
        
        // Aller sur la page de connexion
        await page.goto('https://www.instagram.com/accounts/login/', {
            waitUntil: 'networkidle0',
            timeout: 0
        });
        
        // Accepter les cookies
        await acceptCookies(page);
        
        // Attendre que les éléments soient chargés
        await page.waitForSelector('input[name="username"]', { timeout: 0 });
        
        // Remplir les champs de connexion avec des délais
        await sleep(2000);
        await page.type('input[name="username"]', process.env.IG_USERNAME, { delay: 100 });
        await sleep(2000);
        await page.type('input[name="password"]', process.env.IG_PASSWORD, { delay: 100 });
        await sleep(2000);
        
        // Cliquer sur le bouton de connexion
        const loginButton = await page.waitForSelector('button[type="submit"]');
        await loginButton.click();
        
        // Attendre la redirection
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 0 });
        await sleep(5000);
        
        console.log('Connexion réussie !');
    } catch (error) {
        console.error('Erreur de connexion:', error);
        throw error;
    }
}

async function getAllPostsData(page, username) {
    try {
        await page.goto(`https://www.instagram.com/${username}/`, {
            waitUntil: 'networkidle0',
            timeout: 0
        });
        
        await sleep(2000);

        // Fonction pour faire défiler jusqu'à ce que tous les posts soient chargés
        async function scrollUntilNoNewPosts(page) {
            let previousHeight = 0;
            let scrollAttempts = 0;
            const maxScrollAttempts = 100;

            while (scrollAttempts < maxScrollAttempts) {
                const currentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
                if (currentHeight === previousHeight) {
                    break;
                }
                previousHeight = currentHeight;
                await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
                await sleep(1000);
                scrollAttempts++;
                
                // Log pour suivre la progression
                const postsCount = await page.evaluate(() => 
                    document.querySelectorAll('a[href*="/p/"]').length
                );
                console.log(`Posts chargés: ${postsCount}`);
            }
        }

        console.log('Chargement de tous les posts...');
        await scrollUntilNoNewPosts(page);
        console.log('Chargement des posts terminé');

        // Récupérer toutes les URLs des posts
        const postUrls = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a[href*="/p/"]'));
            // Filtrer les doublons et les liens non pertinents
            return [...new Set(links.map(link => link.href))].filter(url => 
                url.includes(`/p/`) && !url.includes('/liked_by/')
            );
        });

        console.log(`Nombre total de posts trouvés: ${postUrls.length}`);

        // Récupérer les détails de chaque post
        const detailedPosts = [];
        for (let i = 0; i < postUrls.length; i++) {
            const url = postUrls[i];
            console.log(`Analyse du post ${i + 1}/${postUrls.length}: ${url}`);

            await page.goto(url, { waitUntil: 'networkidle0' });
            await sleep(2000);

            const postData = await page.evaluate(() => {
                try {
                    // Sélecteurs mis à jour pour la nouvelle interface Instagram
                    const article = document.querySelector('article[role="presentation"]');
                    if (!article) return null;

                    // Fonction helper pour extraire le texte sécurisé
                    const getText = (selectors) => {
                        for (let selector of selectors) {
                            const element = article.querySelector(selector);
                            if (element) {
                                return element.textContent.trim();
                            }
                        }
                        return '';
                    };

                    // Récupérer la légende avec plusieurs sélecteurs possibles
                    const caption = getText([
                        'div._a9zs',
                        'h1',
                        'div[data-testid="post-comment-root"]',
                        'span[data-testid="post-comment"]',
                        'ul li span'
                    ]);

                    // Extraire les hashtags
                    const hashtags = caption.match(/#[^\s#]+/g) || [];

                    // Récupérer la localisation
                    const location = getText([
                        'div._aaqm',
                        'a[href*="/explore/locations/"]',
                        'div[role="button"] > div > div > div'
                    ]);

                    // Récupérer la date
                    const timeElement = article.querySelector('time');
                    const timestamp = timeElement ? timeElement.dateTime : '';

                    // Récupérer les likes
                    const likesText = getText([
                        'section span[class*="html-span"]',
                        'section span[role="button"]',
                        'div[role="button"] span'
                    ]);

                    // Récupérer le nombre de commentaires
                    const commentsElements = article.querySelectorAll('ul[class*="x78zum5"] > div');
                    const commentsCount = commentsElements.length;

                    // Détecter le type de média
                    const isVideo = !!article.querySelector('video') || 
                                  !!article.querySelector('span[data-visualcompletion="css-img"][aria-label*="Vidéo"]');

                    return {
                        url: window.location.href,
                        caption,
                        hashtags,
                        location,
                        timestamp,
                        likes: likesText,
                        comments: commentsCount,
                        type: isVideo ? 'video' : 'image'
                    };
                } catch (error) {
                    console.error('Erreur lors de l\'analyse du post:', error);
                    return null;
                }
            });

            if (postData) {
                detailedPosts.push(postData);
                // Sauvegarder la progression
                const fs = require('fs');
                fs.writeFileSync('instagram_data_progress.json', JSON.stringify({
                    profile: {
                        username,
                        postsAnalyzed: i + 1,
                        totalPosts: postUrls.length
                    },
                    posts: detailedPosts
                }, null, 2));
            }

            await sleep(2000); // Délai plus long entre les posts
        }

        const result = {
            profile: {
                username,
                totalPosts: postUrls.length,
                analyzedPosts: detailedPosts.length
            },
            posts: detailedPosts
        };

        const fs = require('fs');
        fs.writeFileSync('instagram_data_final.json', JSON.stringify(result, null, 2));
        console.log('Données sauvegardées dans instagram_data_final.json');

        return result;

    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

async function main() {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920,1080'
            ],
            ignoreHTTPSErrors: true
        });
        
        const page = await browser.newPage();
        
        // Configuration supplémentaire de la page
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
        await page.setViewport({ width: 1920, height: 1080 });
        await page.setDefaultTimeout(0);
        
        // Connexion à Instagram
        await loginToInstagram(page);
        
        // Récupérer les données du profil et des posts
        const userData = await getAllPostsData(page, 'pascalthetrlol');
        
        // Afficher les données en format JSON
        console.log('Données du profil et des posts en JSON:');
        console.log(JSON.stringify(userData, null, 2));
        
        // Sauvegarder les données dans un fichier
        const fs = require('fs');
        fs.writeFileSync('instagram_data.json', JSON.stringify(userData, null, 2));
        console.log('Données sauvegardées dans instagram_data.json');
        
        await sleep(5000);
        
    } catch (error) {
        console.error('Erreur principale:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Gérer les rejets de promesses non gérés
process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesse non gérée:', reason);
});

main();