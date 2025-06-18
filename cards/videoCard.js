// Create a Video preview card with play overlay and label
export function createVideoCard(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;

    // Create container div (no linking)
    const container = document.createElement('div');
    container.style.display = 'block';
    container.style.width = '100%';
    container.style.height = '100%';

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
    card.style.width = 'min(467.812px, 90vw)';
    card.style.height = 'min(311.875px, 60vh)';
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
    video.autoplay = true;
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

    // No play button needed for autoplay video

    // Show label and overlay on hover (video continues playing)
    card.addEventListener('mouseenter', () => {
        title.style.opacity = '1';
        overlay.style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
        title.style.opacity = '0';
        overlay.style.opacity = '0';
    });

    // No click handlers needed - video just plays automatically

    // Assemble
    card.appendChild(video);
    card.appendChild(overlay);
    container.appendChild(title);
    container.appendChild(card);
    wrapper.appendChild(container);

    return wrapper;
} 