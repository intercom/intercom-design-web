import { articlesData } from '../data/articles.js';

export function createArticleList(folderId) {
    const folder = articlesData[folderId];
    if (!folder) return null;

    const modal = document.createElement('div');
    modal.className = 'article-list-modal';

    // Create article list
    const articleList = document.createElement('div');
    articleList.style.display = 'flex';
    articleList.style.flexDirection = 'column';
    articleList.style.gap = '4px';
    articleList.style.width = '100%';
    articleList.style.maxHeight = 'calc(100vh - 90px)';
    articleList.style.overflowY = 'auto';

    // Define accent colors
    const accentColors = [
        'var(--accent-blue)',
        'var(--accent-gold)',
        'var(--accent-lime)',
        'var(--accent-orchid)',
        'var(--accent-green)'
    ];

    folder.articles.forEach(article => {
        const articleItem = document.createElement('div');
        articleItem.className = 'article-item';
        // Set initial state for animation
        gsap.set(articleItem, {
            opacity: 0,
            y: 80
        });

        const articleInner = document.createElement('div');
        articleInner.className = 'article-item-inner';
        articleInner.style.background = 'transparent';
        articleInner.style.transition = 'background-color 0.3s ease';
        articleInner.style.cursor = 'pointer';

        const header = document.createElement('div');
        header.className = 'article-header';

        const author = document.createElement('span');
        author.className = 'article-author';
        author.textContent = article.author;

        articleInner.appendChild(header);
        articleInner.appendChild(author);

        const title = document.createElement('h3');
        title.className = 'article-title';
        title.textContent = article.title;
        title.style.transition = 'color 0.3s ease';

        articleInner.appendChild(title);
        articleItem.appendChild(articleInner);

        // Add hover effects
        articleInner.addEventListener('mouseenter', () => {
            // Randomly select an accent color
            const randomColor = accentColors[Math.floor(Math.random() * accentColors.length)];
            gsap.to(title, {
                color: randomColor,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(articleInner, {
                backgroundColor: 'rgba(30, 30, 30, 0.3)',
                duration: 0.3,
                ease: "power2.out"
            });
        });

        articleInner.addEventListener('mouseleave', () => {
            gsap.to(title, {
                color: 'var(--foreground-primary)',
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(articleInner, {
                backgroundColor: 'transparent',
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Add click handler
        articleItem.addEventListener('click', () => {
            window.open(article.url, '_blank');
        });

        articleList.appendChild(articleItem);
    });

    // Animate article items with stagger
    gsap.to(articleList.querySelectorAll('.article-item'), {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: () => {
            // After items appear, animate the letters in each title
            articleList.querySelectorAll('.article-title').forEach(title => {
                const splitTitle = new SplitText(title, { type: "chars,words" });
                gsap.from(splitTitle.chars, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    stagger: 0.02,
                    ease: "back.out(1.7)",
                    delay: 0.2
                });
            });
        }
    });

    return articleList;
} 