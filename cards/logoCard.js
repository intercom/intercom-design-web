import { scrambleOnHover, resetToOriginal } from '../utils/textScramble.js';

// Create the byline component as a separate element
export function createByline(data) {
    // Create byline container
    const bylineContainer = document.createElement('div');
    bylineContainer.className = 'logo-byline-container';
    bylineContainer.style.position = 'absolute';
    bylineContainer.style.textAlign = 'center';
    bylineContainer.style.display = 'flex';
    bylineContainer.style.alignItems = 'center';
    bylineContainer.style.justifyContent = 'center';
    bylineContainer.style.gap = '12px';

    // Position the byline below the logo card
    // Calculate position based on logo card position
    const logoTop = parseFloat(data.top);
    const logoLeft = parseFloat(data.left);
    bylineContainer.style.top = `${logoTop + 12}%`; // Position below logo
    bylineContainer.style.left = `${logoLeft + 3.7}%`; // Center relative to logo
    bylineContainer.style.transform = 'translateX(-50%)';

    // Create byline elements following Figma design
    const madeByLabel = document.createElement('span');
    madeByLabel.textContent = 'Made by';
    madeByLabel.style.fontFamily = 'DM Mono, monospace';
    madeByLabel.style.fontSize = 'var(--text-sm)';
    madeByLabel.style.fontWeight = '300';
    madeByLabel.style.letterSpacing = 'var(--tracking-widest)';
    madeByLabel.style.color = 'var(--foreground-primary)';
    madeByLabel.style.textTransform = 'uppercase';
    madeByLabel.style.transition = 'color 0.2s ease';

    const colon = document.createElement('span');
    colon.textContent = ':';
    colon.style.fontFamily = 'DM Mono, monospace';
    colon.style.fontSize = 'var(--text-sm)';
    colon.style.fontWeight = '300';
    colon.style.letterSpacing = 'var(--tracking-widest)';
    colon.style.color = 'var(--foreground-primary)';
    colon.style.textTransform = 'uppercase';
    colon.style.transition = 'color 0.2s ease';

    const designers = document.createElement('span');
    designers.textContent = '3 designers';
    designers.style.fontFamily = 'DM Mono, monospace';
    designers.style.fontSize = 'var(--text-sm)';
    designers.style.fontWeight = '300';
    designers.style.letterSpacing = 'var(--tracking-widest)';
    designers.style.color = 'var(--foreground-primary)';
    designers.style.textTransform = 'uppercase';
    designers.style.transition = 'color 0.2s ease';

    const separator1 = document.createElement('div');
    separator1.style.width = '1px';
    separator1.style.height = '14px';
    separator1.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    separator1.style.flexShrink = '0';

    const aiTools = document.createElement('span');
    aiTools.textContent = '2 AI tools';
    aiTools.style.fontFamily = 'DM Mono, monospace';
    aiTools.style.fontSize = 'var(--text-sm)';
    aiTools.style.fontWeight = '300';
    aiTools.style.letterSpacing = 'var(--tracking-widest)';
    aiTools.style.color = 'var(--foreground-primary)';
    aiTools.style.textTransform = 'uppercase';
    aiTools.style.transition = 'color 0.2s ease';

    const separator2 = document.createElement('div');
    separator2.style.width = '1px';
    separator2.style.height = '14px';
    separator2.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    separator2.style.flexShrink = '0';

    const timeframe = document.createElement('span');
    timeframe.textContent = 'In 1 day';
    timeframe.style.fontFamily = 'DM Mono, monospace';
    timeframe.style.fontSize = 'var(--text-sm)';
    timeframe.style.fontWeight = '300';
    timeframe.style.letterSpacing = 'var(--tracking-widest)';
    timeframe.style.color = 'var(--foreground-primary)';
    timeframe.style.textTransform = 'uppercase';
    timeframe.style.transition = 'color 0.2s ease';

    // Create question mark icon container
    const questionMarkContainer = document.createElement('div');
    questionMarkContainer.className = 'question-mark-container';
    questionMarkContainer.style.position = 'relative';
    questionMarkContainer.style.display = 'inline-flex';
    questionMarkContainer.style.alignItems = 'center';
    questionMarkContainer.style.justifyContent = 'center';
    questionMarkContainer.style.width = '16px';
    questionMarkContainer.style.height = '16px';
    questionMarkContainer.style.borderRadius = '50%';
    questionMarkContainer.style.border = '1px solid var(--foreground-secondary)';
    questionMarkContainer.style.cursor = 'pointer';
    questionMarkContainer.style.fontSize = '10px';
    questionMarkContainer.style.fontFamily = 'DM Mono, monospace';
    questionMarkContainer.style.fontWeight = '500';
    questionMarkContainer.style.color = 'var(--foreground-secondary)';
    questionMarkContainer.textContent = '?';

    // Create tooltip container (positioned relative to question mark)
    const tooltipContainer = document.createElement('div');
    tooltipContainer.className = 'tooltip-container';
    tooltipContainer.style.position = 'absolute';
    tooltipContainer.style.bottom = 'calc(100% + 8px)';
    tooltipContainer.style.left = '50%';
    tooltipContainer.style.transform = 'translateX(-50%)';
    tooltipContainer.style.zIndex = '1000';
    tooltipContainer.style.pointerEvents = 'none';

    // Create the actual tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'logo-tooltip';
    tooltip.textContent = 'This site was created during a group hackathon with nothing but AI, teamwork and pride ❤️';
    tooltip.style.background = 'rgba(20, 20, 20, 0.8)';
    tooltip.style.backdropFilter = 'blur(30px) saturate(150%)';
    tooltip.style.webkitBackdropFilter = 'blur(30px) saturate(150%)';
    tooltip.style.border = '1px solid rgba(255, 255, 255, 0.15)';
    tooltip.style.borderRadius = '16px';
    tooltip.style.padding = '12px 16px';
    tooltip.style.fontFamily = 'MediumLLSub, sans-serif';
    tooltip.style.fontSize = 'var(--text-sm)';
    tooltip.style.fontWeight = 'var(--font-normal)';
    tooltip.style.letterSpacing = 'var(--tracking-wider)';
    tooltip.style.color = 'var(--foreground-primary)';
    tooltip.style.whiteSpace = 'normal';
    tooltip.style.width = '320px';
    tooltip.style.maxWidth = '90vw';
    tooltip.style.textAlign = 'center';
    tooltip.style.lineHeight = '1.4';
    tooltip.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
    tooltip.style.position = 'relative';

    // Add tooltip arrow
    const tooltipArrow = document.createElement('div');
    tooltipArrow.style.position = 'absolute';
    tooltipArrow.style.top = '100%';
    tooltipArrow.style.left = '50%';
    tooltipArrow.style.transform = 'translateX(-50%)';
    tooltipArrow.style.width = '0';
    tooltipArrow.style.height = '0';
    tooltipArrow.style.borderLeft = '6px solid transparent';
    tooltipArrow.style.borderRight = '6px solid transparent';
    tooltipArrow.style.borderTop = '6px solid rgba(20, 20, 20, 0.2)';
    tooltipArrow.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))';

    // Assemble tooltip
    tooltip.appendChild(tooltipArrow);
    tooltipContainer.appendChild(tooltip);

    // Add tooltip container to question mark container
    questionMarkContainer.appendChild(tooltipContainer);

    // Set initial GSAP state for tooltip container
    gsap.set(tooltipContainer, {
        opacity: 0,
        scale: 0.8,
        y: 10,
        visibility: 'hidden'
    });

    // Add hover effects for question mark icon with GSAP animations
    questionMarkContainer.addEventListener('mouseenter', () => {
        // Animate question mark icon
        gsap.to(questionMarkContainer, {
            borderColor: 'var(--foreground-primary)',
            color: 'var(--foreground-primary)',
            scale: 1.1,
            duration: 0.2,
            ease: 'power2.out'
        });

        // Show tooltip with animation
        tooltipContainer.style.visibility = 'visible';
        gsap.to(tooltipContainer, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });
    });

    questionMarkContainer.addEventListener('mouseleave', () => {
        // Animate question mark icon back
        gsap.to(questionMarkContainer, {
            borderColor: 'var(--foreground-secondary)',
            color: 'var(--foreground-secondary)',
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });

        // Hide tooltip with animation
        gsap.to(tooltipContainer, {
            opacity: 0,
            scale: 0.8,
            y: 10,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                tooltipContainer.style.visibility = 'hidden';
            }
        });
    });

    // Assemble byline
    bylineContainer.appendChild(madeByLabel);
    bylineContainer.appendChild(colon);
    bylineContainer.appendChild(designers);
    bylineContainer.appendChild(separator1);
    bylineContainer.appendChild(aiTools);
    bylineContainer.appendChild(separator2);
    bylineContainer.appendChild(timeframe);
    bylineContainer.appendChild(questionMarkContainer);

    return bylineContainer;
}

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

    // Assemble card (without byline)
    card.appendChild(paragraph);
    wrapper.appendChild(card);

    return wrapper;
} 