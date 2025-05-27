import { scrambleOnHover, resetToOriginal } from '../utils/textScramble.js';

// Create a block quote card with highlight and link
export function createBlockQuoteCard(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper blockquote-card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;
    wrapper.style.maxWidth = '420px';
    wrapper.style.width = 'min(90vw, 420px)';

    // Responsive quote text
    const quote = document.createElement('div');
    quote.className = 'blockquote-card-quote';
    quote.style.fontFamily = 'Inter, sans-serif';
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
            `<span class="blockquote-highlight" style="background:${accentVar}; color:var(--color-black,#111); padding:0.1em 0.2em; border-radius:4px;">` +
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
    link.style.marginTop = '8px';
    link.style.textDecoration = 'none';
    link.style.color = 'var(--foreground-secondary)';
    link.style.transition = 'color 0.2s';
    link.style.position = 'relative';
    link.style.padding = '2px 0';
    link.style.cursor = 'pointer';
    link.style.fontFamily = 'var(--font-mono)';
    link.style.fontSize = 'var(--text-xs)';
    link.style.fontWeight = 'var(--font-light)';
    link.style.letterSpacing = 'var(--tracking-widest)';
    link.style.textTransform = 'uppercase';

    // Link text
    const linkText = document.createElement('span');
    linkText.textContent = data.label || 'READ MORE';

    // Arrow icon
    const arrow = document.createElement('img');
    arrow.src = 'assets/icons/arrow-diagonal-upd.svg';
    arrow.className = 'link-icon';
    arrow.alt = 'arrow';
    arrow.style.width = '12px';
    arrow.style.height = '12px';
    arrow.style.display = 'inline-block';
    arrow.style.marginTop = '2px';
    arrow.style.alignSelf = 'flex-start';
    arrow.style.opacity = '0.6';

    // Hover effect
    link.addEventListener('mouseenter', () => {
        link.style.color = 'var(--foreground-primary)';
        scrambleOnHover(linkText, data.label || 'READ MORE');
    });
    link.addEventListener('mouseleave', () => {
        link.style.color = 'var(--foreground-secondary)';
        resetToOriginal(linkText, data.label || 'READ MORE');
    });

    link.appendChild(linkText);
    link.appendChild(arrow);

    // Assemble card
    wrapper.appendChild(quote);
    wrapper.appendChild(link);
    return wrapper;
} 