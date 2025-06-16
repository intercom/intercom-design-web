import { scrambleOnHover, resetToOriginal } from '../utils/textScramble.js';

// Create a block quote card with highlight and link
export function createBlockQuoteCard(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper blockquote-card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;
    wrapper.style.cursor = 'pointer';
    
    // Responsive sizing based on viewport
    const isMobile = window.innerWidth <= 600;
    const scaleFactor = isMobile ? 1 : Math.min(window.innerWidth / 1920, 2.5); // Scale up to 2.5x on larger screens
    wrapper.style.maxWidth = `${420 * scaleFactor}px`;
    wrapper.style.width = `min(90vw, ${420 * scaleFactor}px)`;

    // Create card container for minimap detection
    const card = document.createElement('div');
    card.className = 'card blockquote-card';
    card.style.width = '100%';
    card.style.height = 'auto';
    card.style.background = 'none';
    card.style.border = 'none';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'flex-start';
    card.style.justifyContent = 'center';
    card.style.padding = '0';
    card.style.boxSizing = 'border-box';

    // Responsive quote text
    const quote = document.createElement('div');
    quote.className = 'blockquote-card-quote';
    quote.style.fontFamily = 'MediumLLSub-Regular, sans-serif';
    quote.style.fontWeight = '400';
    quote.style.color = 'var(--color-white, #fff)';
    quote.style.fontSize = 'clamp(1.5rem, 4vw, 2rem)';
    quote.style.lineHeight = '1.09';
    quote.style.letterSpacing = '-0.32px';
    quote.style.background = 'none';
    quote.style.padding = '0';
    quote.style.marginBottom = '1.2rem';
    quote.style.wordBreak = 'break-word';
    quote.style.whiteSpace = 'pre-line';
    quote.style.maxWidth = '100%';

    // Highlight substring (first occurrence only)
    const { text, highlight, highlightColor } = data;
    const accentVar = highlightColor ? `var(--${highlightColor})` : 'var(--accent-gold)';
    let html = '';
    if (highlight && text.includes(highlight)) {
        const idx = text.indexOf(highlight);
        html =
            text.substring(0, idx) +
            `<span class="blockquote-highlight" style="background:${accentVar}; color:var(--color-black,#111); padding:0.1em 0.2em; border-radius:0;">` +
            highlight +
            '</span>' +
            text.substring(idx + highlight.length);
    } else {
        html = text;
    }
    quote.innerHTML = html;

    // Read More button (styled like text card link)
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

    // Add hover effect to the entire card
    wrapper.addEventListener('mouseenter', () => {
        link.style.color = 'var(--foreground-primary)';
        scrambleOnHover(linkText, 'READ MORE');
    });
    wrapper.addEventListener('mouseleave', () => {
        link.style.color = 'var(--foreground-secondary)';
        resetToOriginal(linkText, 'READ MORE');
    });

    // Make the entire card clickable
    wrapper.addEventListener('click', () => {
        window.open(data.link, '_blank');
    });

    // Assemble link
    link.appendChild(linkText);

    // Assemble card content
    card.appendChild(quote);
    card.appendChild(link);
    wrapper.appendChild(card);

    return wrapper;
} 