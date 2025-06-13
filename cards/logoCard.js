import { scrambleOnHover, resetToOriginal } from '../utils/textScramble.js';

// Create a logo card with scramble animation
export function createLogoCard(data, modal) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper logo-card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;

    // Create card container
    const card = document.createElement('div');
    card.className = 'card logo-card';
    card.style.width = '600px';
    card.style.background = 'transparent';
    card.style.boxShadow = 'none';
    card.style.border = 'none';
    card.style.padding = '0';
    card.style.textAlign = 'center';
    card.style.position = 'relative';

    // Create paragraph container
    const paragraph = document.createElement('div');
    paragraph.className = 'logo-card-paragraph';
    
    // Split text into lines
    const lines = data.text.split(' ');
    const firstLine = lines[0];
    const secondLine = lines.slice(1).join(' ');
    
    // Create first line
    const p1 = document.createElement('p');
    p1.textContent = firstLine;
    p1.style.fontFamily = 'MediumLLSub, sans-serif';
    p1.style.fontSize = 'clamp(3rem, 8vw, 6rem)';
    p1.style.fontWeight = 'normal';
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
    p2.style.fontFamily = 'MediumLLSub, sans-serif';
    p2.style.fontSize = 'clamp(3rem, 8vw, 6rem)';
    p2.style.fontWeight = 'normal';
    p2.style.letterSpacing = '-0.02em';
    p2.style.color = 'var(--foreground-primary)';
    p2.style.marginTop = '0.2em';
    p2.style.lineHeight = '1';
    p2.style.textAlign = 'center';
    p2.style.width = '100%';
    p2.style.display = 'inline-block';
    
    paragraph.appendChild(p1);
    paragraph.appendChild(p2);

    // Add hover effect to the card
    card.addEventListener('mouseenter', () => {
        scrambleOnHover(p1, firstLine);
        scrambleOnHover(p2, secondLine);
    });
    card.addEventListener('mouseleave', () => {
        resetToOriginal(p1, firstLine);
        resetToOriginal(p2, secondLine);
    });

    // Assemble card
    card.appendChild(paragraph);
    wrapper.appendChild(card);

    return wrapper;
} 