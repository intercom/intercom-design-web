// Create a YouTube embed card
export function createYoutubeCard(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;

    // Create link wrapper
    const link = document.createElement('a');
    link.href = data.link || `https://www.youtube.com/watch?v=${data.embedId}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'block';
    link.style.width = '100%';
    link.style.height = '100%';
    link.style.cursor = 'pointer';
    link.style.textDecoration = 'none';

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

    // Mobile detection for responsive sizing
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    // Create card container
    const card = document.createElement('div');
    card.className = 'card youtube-card';
    card.style.padding = '0';
    card.style.overflow = 'hidden';
    card.style.borderRadius = '16px';
    card.style.position = 'relative';

    // Responsive sizing for YouTube cards with proper 16:9 aspect ratio
    if (isSmallMobile) {
        // Very small mobile devices - compact format
        card.style.width = 'min(300px, 90vw)';
        card.style.height = 'min(169px, 50.6vw)'; // 169px = 300px * 9/16
    } else if (isMobile) {
        // Mobile devices - responsive but larger than small mobile
        card.style.width = 'min(360px, 85vw)';
        card.style.height = 'min(202px, 47.8vw)'; // 202px = 360px * 9/16
    } else {
        // Desktop and tablet - use viewport-based sizing with reasonable limits
        card.style.width = 'min(450px, 35vw)';
        card.style.height = 'min(253px, 19.7vw)'; // 253px = 450px * 9/16
    }

    // Add mobile-specific touch optimizations
    if (isMobile) {
        card.style.touchAction = 'manipulation';
        card.style.webkitTapHighlightColor = 'transparent';
    }

    // Create thumbnail container
    const thumbnail = document.createElement('div');
    thumbnail.className = 'youtube-thumbnail';
    thumbnail.style.width = '100%';
    thumbnail.style.height = '100%';
    thumbnail.style.backgroundImage = `url(https://img.youtube.com/vi/${data.embedId}/maxresdefault.jpg)`;
    thumbnail.style.backgroundSize = 'cover';
    thumbnail.style.backgroundPosition = 'center';

    // Create play button container with blur effect
    const playButtonContainer = document.createElement('div');
    playButtonContainer.className = 'youtube-play-button-container';
    playButtonContainer.style.position = 'absolute';
    playButtonContainer.style.top = '50%';
    playButtonContainer.style.left = '50%';
    playButtonContainer.style.transform = 'translate(-50%, -50%)';
    playButtonContainer.style.width = '3.5rem';  // 56px
    playButtonContainer.style.height = '3.5rem'; // 56px
    playButtonContainer.style.borderRadius = '50%';
    playButtonContainer.style.background = 'rgba(0, 0, 0, 0.3)';
    playButtonContainer.style.backdropFilter = 'blur(8px)';
    playButtonContainer.style.webkitBackdropFilter = 'blur(8px)';
    playButtonContainer.style.display = 'flex';
    playButtonContainer.style.alignItems = 'center';
    playButtonContainer.style.justifyContent = 'center';
    playButtonContainer.style.transition = 'background 0.3s ease';
    playButtonContainer.style.pointerEvents = 'none';

    // Create play button icon
    const playButton = document.createElement('div');
    playButton.className = 'youtube-play-button';
    playButton.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5.14v14l11-7-11-7z" fill="white" fill-opacity="0.9"/>
        </svg>
    `;

    // Add hover effect
    link.addEventListener('mouseenter', () => {
        playButtonContainer.style.background = 'rgba(0, 0, 0, 0.4)';
        // GSAP pop effect (no glow)
        gsap.to(playButtonContainer, {
            scale: 1.15,
            duration: 0.35,
            ease: 'expo.out',
        });
    });

    link.addEventListener('mouseleave', () => {
        playButtonContainer.style.background = 'rgba(0, 0, 0, 0.3)';
        // Revert GSAP effect (no glow)
        gsap.to(playButtonContainer, {
            scale: 1,
            duration: 0.4,
            ease: 'expo.in',
        });
    });

    // Assemble card
    playButtonContainer.appendChild(playButton);
    card.appendChild(thumbnail);
    card.appendChild(playButtonContainer);

    // Assemble wrapper
    link.appendChild(title);
    link.appendChild(card);
    wrapper.appendChild(link);

    return wrapper;
} 