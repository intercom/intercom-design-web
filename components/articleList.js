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

    folder.articles.forEach(article => {
        const articleItem = document.createElement('div');
        articleItem.className = 'article-item';

        const articleInner = document.createElement('div');
        articleInner.className = 'article-item-inner';

        const header = document.createElement('div');
        header.className = 'article-header';

        const author = document.createElement('span');
        author.className = 'article-author';
        author.textContent = article.author;

        const readMore = document.createElement('span');
        readMore.className = 'article-read-more';
        readMore.textContent = 'READ MORE';

        header.appendChild(author);
        header.appendChild(readMore);

        const title = document.createElement('h3');
        title.className = 'article-title';
        title.textContent = article.title;

        articleInner.appendChild(header);
        articleInner.appendChild(title);
        articleItem.appendChild(articleInner);

        // Add click handler
        articleItem.addEventListener('click', () => {
            window.open(article.url, '_blank');
        });

        articleList.appendChild(articleItem);
    });

    modal.appendChild(articleList);

    return modal;
} 