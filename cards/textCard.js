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
    card.style.width = 'min(480px, 90vw)';  // Increased from 450px to 600px
    card.style.cursor = 'default'; // Change cursor to default since card is not clickable

    // Create active indicator
    const activeIndicator = document.createElement('span');
    activeIndicator.className = 'active-indicator';
    activeIndicator.style.width = '8px';
    activeIndicator.style.height = '8px';
    activeIndicator.style.background = 'var(--accent-blue)';
    activeIndicator.style.display = 'inline-block';
    activeIndicator.style.position = 'relative';
    activeIndicator.style.alignSelf = 'center';
    activeIndicator.style.marginBottom = '16px';

    // Create paragraph container
    const paragraph = document.createElement('div');
    paragraph.className = 'text-card-paragraph';
    
    // Split text by newlines and create separate paragraph elements
    const paragraphs = data.paragraph.split('\n').filter(p => p.trim());
    paragraphs.forEach((text, index) => {
        const p = document.createElement('p');
        p.textContent = text;
        p.style.fontFamily = 'var(--font-sans)';
        p.style.fontSize = 'var(--text-base)';
        p.style.fontWeight = 'var(--font-regular)';
        p.style.letterSpacing = 'var(--tracking-wider)';
        p.style.color = 'var(--foreground-primary)';
        p.style.marginBottom = index < paragraphs.length - 1 ? '0.75em' : '16px';
        paragraph.appendChild(p);
    });

    paragraph.style.overflow = 'hidden';
    paragraph.style.position = 'relative';
    paragraph.style.maskImage = 'linear-gradient(to bottom, black 60%, transparent 100%)';
    paragraph.style.webkitMaskImage = 'linear-gradient(to bottom, black 60%, transparent 100%)';

    // Create link element
    const link = document.createElement('a');
    link.href = data.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'inline-flex'; // Changed from flex to inline-flex
    link.style.alignItems = 'center';
    link.style.gap = '8px';
    link.style.marginTop = '24px';
    link.style.textDecoration = 'none';
    link.style.color = 'var(--foreground-secondary)';
    link.style.transition = 'color 0.2s';
    link.style.position = 'relative';
    link.style.padding = '2px 0';
    link.style.cursor = 'pointer'; // Add pointer cursor for the link

    // Create text span
    const linkText = document.createElement('span');
    linkText.textContent = 'READ MORE';
    linkText.style.fontFamily = 'var(--font-mono)';
    linkText.style.fontSize = 'var(--text-xs)';
    linkText.style.fontWeight = 'var(--font-light)';
    linkText.style.letterSpacing = 'var(--tracking-widest)';
    linkText.style.textTransform = 'uppercase';

    // Create arrow image
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

    // Add hover effect only to the link
    link.addEventListener('mouseenter', () => {
        // Add pulse animation to active indicator on hover
        gsap.to(activeIndicator, {
            scale: 1.1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
        link.style.color = 'var(--foreground-primary)'; // Change color on hover
    });
    link.addEventListener('mouseleave', () => {
        // Stop pulse animation
        gsap.killTweensOf(activeIndicator);
        gsap.to(activeIndicator, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
        link.style.color = 'var(--foreground-secondary)'; // Reset color
    });

    // Assemble link
    link.appendChild(linkText);
    link.appendChild(arrow);

    // Assemble card
    card.appendChild(activeIndicator);
    card.appendChild(paragraph);
    card.appendChild(link);

    wrapper.appendChild(title);
    wrapper.appendChild(card);

    return wrapper;
} 