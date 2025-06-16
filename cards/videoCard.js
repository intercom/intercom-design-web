// Create a Video preview card with play overlay and label
export function createVideoCard(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;

    // Create link wrapper (for play button click)
    const link = document.createElement('a');
    link.href = data.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'block';
    link.style.width = '100%';
    link.style.height = '100%';
    link.style.cursor = 'pointer';
    link.style.textDecoration = 'none';

    // Card Title (label above on hover, left-aligned with padding)
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = data.label || '';
    title.style.textTransform = 'uppercase';
    title.style.whiteSpace = 'pre-wrap';
    title.style.wordBreak = 'break-word';
    title.style.fontFamily = 'var(--font-mono)';
    title.style.fontSize = 'var(--text-xs)';
    title.style.letterSpacing = 'var(--tracking-widest)';
    title.style.textAlign = 'left';
    title.style.opacity = '0';
    title.style.transition = 'opacity 0.3s';
    title.style.pointerEvents = 'none';

    // Card container
    const card = document.createElement('div');
    card.className = 'card video-card';
    card.style.padding = '0';
    card.style.overflow = 'hidden';
    card.style.borderRadius = '16px';
    card.style.position = 'relative';
    card.style.width = 'max(25vw, 380px)';
    card.style.height = 'max(14vw, 214px)';
    card.style.background = '#000';

    // Video element
    const video = document.createElement('video');
    video.src = data.src;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.display = 'block';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.autoplay = false;
    video.setAttribute('tabindex', '-1');
    video.setAttribute('aria-hidden', 'true');

    // Dark overlay (like YouTube card)
    const overlay = document.createElement('div');
    overlay.className = 'video-dark-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.22)';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1';

    // Play button overlay (same as YouTube)
    const playButtonContainer = document.createElement('div');
    playButtonContainer.className = 'video-play-button-container';
    playButtonContainer.style.position = 'absolute';
    playButtonContainer.style.top = '50%';
    playButtonContainer.style.left = '50%';
    playButtonContainer.style.transform = 'translate(-50%, -50%)';
    playButtonContainer.style.width = '3.5rem';
    playButtonContainer.style.height = '3.5rem';
    playButtonContainer.style.borderRadius = '50%';
    playButtonContainer.style.background = 'rgba(0, 0, 0, 0.3)';
    playButtonContainer.style.backdropFilter = 'blur(8px)';
    playButtonContainer.style.webkitBackdropFilter = 'blur(8px)';
    playButtonContainer.style.display = 'flex';
    playButtonContainer.style.alignItems = 'center';
    playButtonContainer.style.justifyContent = 'center';
    playButtonContainer.style.transition = 'background 0.3s ease';
    playButtonContainer.style.pointerEvents = 'auto';
    playButtonContainer.style.zIndex = '2';

    const playButton = document.createElement('div');
    playButton.className = 'video-play-button';
    playButton.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5.14v14l11-7-11-7z" fill="white" fill-opacity="0.9"/>
        </svg>
    `;

    // Show label and overlay on hover
    card.addEventListener('mouseenter', () => {
        video.play();
        playButtonContainer.style.background = 'rgba(0, 0, 0, 0.4)';
        title.style.opacity = '1';
        overlay.style.opacity = '1';
        gsap.to(playButtonContainer, {
            scale: 1.15,
            duration: 0.35,
            ease: 'expo.out',
        });
    });
    card.addEventListener('mouseleave', () => {
        video.pause();
        playButtonContainer.style.background = 'rgba(0, 0, 0, 0.3)';
        title.style.opacity = '0';
        overlay.style.opacity = '0';
        gsap.to(playButtonContainer, {
            scale: 1,
            duration: 0.4,
            ease: 'expo.in',
        });
    });

    // Clicking play button or card opens link
    playButtonContainer.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(data.link, '_blank', 'noopener');
    });
    card.addEventListener('click', (e) => {
        // Only trigger if not clicking on a child link
        if (e.target === card || e.target === video) {
            window.open(data.link, '_blank', 'noopener');
        }
    });

    // Assemble
    playButtonContainer.appendChild(playButton);
    card.appendChild(video);
    card.appendChild(overlay);
    card.appendChild(playButtonContainer);
    link.appendChild(title);
    link.appendChild(card);
    wrapper.appendChild(link);

    return wrapper;
} 