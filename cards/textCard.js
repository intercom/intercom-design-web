import { scrambleOnHover, resetToOriginal } from '../utils/textScramble.js';

// Create a text card with a link
export function createTextCard(data) {
    // Special handling for logo card
    if (data.id === 'logo') {
        const card = document.createElement('div');
        card.className = 'card text-card';
        card.id = 'logo';

        // Create link element
        const link = document.createElement('a');
        link.href = data.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = data.text;

        // Assemble card
        card.appendChild(link);
        return card;
    }

    // Regular card handling
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;

    // Card Title
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = data.label || '';
    title.style.textTransform = 'uppercase';
    title.style.whiteSpace = 'pre-wrap';
    title.style.wordBreak = 'break-word';
    title.style.fontFamily = 'var(--font-mono)';
    title.style.fontSize = 'var(--text-xs)';
    title.style.letterSpacing = 'var(--tracking-widest)';

    // Create card container
    const card = document.createElement('div');
    card.className = 'card text-card';
    
    // Responsive sizing based on viewport
    const isMobile = window.innerWidth <= 600;
    const scaleFactor = isMobile ? 1 : Math.min(window.innerWidth / 1920, 2.5); // Scale up to 2.5x on larger screens
    
    if (data.isCenter) {
        card.style.width = `${800 * scaleFactor}px`; // Scale center text
        card.style.minWidth = 'unset';
        card.style.background = 'transparent';
        card.style.boxShadow = 'none';
        card.style.border = 'none';
        card.style.padding = '0';
        card.style.textAlign = 'center';
        card.style.position = 'relative';
    } else {
        card.style.width = `min(${480 * scaleFactor}px, 90vw)`;
    }
    card.style.cursor = 'default';

    // Create paragraph container
    const paragraph = document.createElement('div');
    paragraph.className = 'text-card-paragraph';
    
    // Special styling for center text
    if (data.isCenter) {
        const lines = data.paragraph.split(' ');
        const firstLine = lines[0];
        const secondLine = lines.slice(1).join(' ');
        
        // Create first line
        const p1 = document.createElement('p');
        p1.textContent = firstLine;
        p1.style.fontFamily = 'Inter, sans-serif';
        p1.style.fontSize = 'clamp(3rem, 8vw, 6rem)';
        p1.style.fontWeight = '500';
        p1.style.letterSpacing = '-0.02em';
        p1.style.color = 'var(--foreground-primary)';
        p1.style.marginBottom = '0';
        p1.style.lineHeight = '1';
        p1.style.textAlign = 'center';
        p1.style.width = '100%';
        p1.style.display = 'inline-block';
        
        // Create second line
        const p2 = document.createElement('p');
        p2.textContent = secondLine;
        p2.style.fontFamily = 'Inter, sans-serif';
        p2.style.fontSize = 'clamp(3rem, 8vw, 6rem)';
        p2.style.fontWeight = '500';
        p2.style.letterSpacing = '-0.02em';
        p2.style.color = 'var(--foreground-primary)';
        p2.style.marginTop = '0.2em';
        p2.style.lineHeight = '1';
        p2.style.textAlign = 'center';
        p2.style.width = '100%';
        p2.style.display = 'inline-block';
        
        paragraph.appendChild(p1);
        paragraph.appendChild(p2);
    } else {
        // Regular text card paragraphs
        const paragraphs = data.paragraph.split('\n').filter(p => p.trim());
        paragraphs.forEach((text, index) => {
            const p = document.createElement('p');
            p.textContent = text;
            p.style.fontFamily = 'Inter, sans-serif';
            p.style.fontSize = 'var(--text-base)';
            p.style.fontWeight = 'var(--font-regular)';
            p.style.letterSpacing = 'var(--tracking-wider)';
            p.style.color = 'var(--foreground-primary)';
            p.style.marginBottom = index < paragraphs.length - 1 ? '0.75em' : '16px';
            paragraph.appendChild(p);
        });
    }

    paragraph.style.overflow = 'hidden';
    paragraph.style.position = 'relative';
    if (!data.isCenter) {
        paragraph.style.maskImage = 'linear-gradient(to bottom, black 60%, transparent 100%)';
        paragraph.style.webkitMaskImage = 'linear-gradient(to bottom, black 60%, transparent 100%)';
    }

    // Create link element
    const link = document.createElement('a');
    link.href = data.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'inline-flex';
    link.style.alignItems = 'center';
    link.style.gap = '8px';
    link.style.marginTop = '24px';
    link.style.textDecoration = 'none';
    link.style.color = 'var(--foreground-secondary)';
    link.style.transition = 'color 0.2s';
    link.style.position = 'relative';
    link.style.padding = '2px 0';
    link.style.cursor = 'pointer';

    // Create text span
    const linkText = document.createElement('span');
    linkText.textContent = 'READ MORE';
    linkText.style.fontFamily = 'var(--font-mono)';
    linkText.style.fontSize = 'var(--text-xs)';
    linkText.style.fontWeight = 'var(--font-light)';
    linkText.style.letterSpacing = 'var(--tracking-widest)';
    linkText.style.textTransform = 'uppercase';

    // Add hover effect to the card instead of just the link
    card.addEventListener('mouseenter', () => {
        link.style.color = 'var(--foreground-primary)';
        if (data.isCenter) {
            const lines = data.paragraph.split(' ');
            const firstLine = lines[0];
            const secondLine = lines.slice(1).join(' ');
            scrambleOnHover(paragraph.querySelector('p:first-child'), firstLine);
            scrambleOnHover(paragraph.querySelector('p:last-child'), secondLine);
        } else {
            scrambleOnHover(linkText, 'READ MORE');
        }
    });
    card.addEventListener('mouseleave', () => {
        link.style.color = 'var(--foreground-secondary)';
        if (data.isCenter) {
            const lines = data.paragraph.split(' ');
            const firstLine = lines[0];
            const secondLine = lines.slice(1).join(' ');
            resetToOriginal(paragraph.querySelector('p:first-child'), firstLine);
            resetToOriginal(paragraph.querySelector('p:last-child'), secondLine);
        } else {
            resetToOriginal(linkText, 'READ MORE');
        }
    });

    // Remove the old hover effects from the link
    link.addEventListener('mouseenter', () => {
        link.style.color = 'var(--foreground-primary)';
    });
    link.addEventListener('mouseleave', () => {
        link.style.color = 'var(--foreground-secondary)';
    });

    // Assemble link (without arrow)
    link.appendChild(linkText);

    // Assemble card
    card.appendChild(paragraph);
    if (!data.isCenter) {
        card.appendChild(link);
    }

    wrapper.appendChild(title);
    wrapper.appendChild(card);

    return wrapper;
} 