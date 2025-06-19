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
    // 16:9 aspect ratio dimensions - scale based on whether it has external link
    if (data.link && data.link !== '') {
        // Smaller size for cards with external links (75% of normal size)
        card.style.width = 'min(450px, 67.5vw)';
        card.style.height = 'min(253px, 38vw)'; // 253px = 450px * 9/16
    } else {
        // Normal larger size for fullscreen video cards
        card.style.width = 'min(600px, 90vw)';
        card.style.height = 'min(337.5px, 50.625vw)'; // 337.5px = 600px * 9/16
    }
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

    // Subtle overlay for hover effect
    const overlay = document.createElement('div');
    overlay.className = 'video-hover-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.1)';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.2s ease';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1';

    // Show label and overlay on hover (video continues playing)
    card.addEventListener('mouseenter', () => {
        title.style.opacity = '1';
        overlay.style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
        title.style.opacity = '0';
        overlay.style.opacity = '0';
    });

    // Make entire card clickable - behavior depends on whether it has external link
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (data.link && data.link !== '') {
            // Open external link for cards with links
            window.open(data.link, '_blank', 'noopener noreferrer');
        } else {
            // Open fullscreen modal for cards without external links
            openVideoFullscreen(data.src, data.label);
        }
    });

    // Assemble
    card.appendChild(video);
    card.appendChild(overlay);
    container.appendChild(title);
    container.appendChild(card);
    wrapper.appendChild(container);

    return wrapper;
}

// Fullscreen video modal function
function openVideoFullscreen(videoSrc, videoLabel) {
    // Hide minimap when opening fullscreen
    const minimapElement = document.getElementById('minimap');
    if (minimapElement) {
        gsap.to(minimapElement, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    // Create fullscreen overlay
    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.className = 'video-fullscreen-overlay';
    fullscreenOverlay.style.position = 'fixed';
    fullscreenOverlay.style.top = '0';
    fullscreenOverlay.style.left = '0';
    fullscreenOverlay.style.width = '100vw';
    fullscreenOverlay.style.height = '100vh';
    fullscreenOverlay.style.background = 'rgba(0, 0, 0, 0.3)';
    fullscreenOverlay.style.backdropFilter = 'blur(30px) saturate(150%)';
    fullscreenOverlay.style.webkitBackdropFilter = 'blur(30px) saturate(150%)';
    fullscreenOverlay.style.display = 'flex';
    fullscreenOverlay.style.alignItems = 'center';
    fullscreenOverlay.style.justifyContent = 'center';
    fullscreenOverlay.style.zIndex = '9999';
    fullscreenOverlay.style.opacity = '0';
    fullscreenOverlay.style.transition = 'opacity 0.3s ease';

    // Create video container
    const videoContainer = document.createElement('div');
    videoContainer.style.position = 'relative';
    videoContainer.style.width = '90vw';
    videoContainer.style.height = '50.625vw'; // 16:9 aspect ratio
    videoContainer.style.maxWidth = '1280px';
    videoContainer.style.maxHeight = '720px';
    videoContainer.style.borderRadius = '16px';
    videoContainer.style.overflow = 'hidden';
    videoContainer.style.background = '#000';

    // Create fullscreen video element
    const fullscreenVideo = document.createElement('video');
    fullscreenVideo.src = videoSrc;
    fullscreenVideo.style.width = '100%';
    fullscreenVideo.style.height = '100%';
    fullscreenVideo.style.objectFit = 'cover';
    fullscreenVideo.controls = true;
    fullscreenVideo.autoplay = true;
    fullscreenVideo.loop = true;
    fullscreenVideo.muted = false; // Allow sound in fullscreen

    // Create close button
    const closeButton = document.createElement('div');
    closeButton.className = 'video-fullscreen-close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '16px';
    closeButton.style.right = '16px';
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.background = 'rgba(0, 0, 0, 0.7)';
    closeButton.style.backdropFilter = 'blur(8px)';
    closeButton.style.webkitBackdropFilter = 'blur(8px)';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '10000';
    closeButton.style.transition = 'background 0.3s ease';
    closeButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;

    // Close functionality
    const closeFullscreen = () => {
        fullscreenVideo.pause();

        // Create closing timeline
        const closeTl = gsap.timeline();

        closeTl
        // First animate out the close button
        .to(closeButton, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in'
        })
        // Then animate out the video container
        .to(videoContainer, {
            scale: 0.9,
            opacity: 0,
            y: 20,
            filter: 'blur(5px)',
            duration: 0.4,
            ease: 'power2.in'
        }, '-=0.1')
        // Finally fade out the overlay
        .to(fullscreenOverlay, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                document.body.removeChild(fullscreenOverlay);

                // Show minimap again when closing fullscreen
                const minimapElement = document.getElementById('minimap');
                if (minimapElement) {
                    gsap.to(minimapElement, {
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            }
        }, '-=0.2');
    };

    closeButton.addEventListener('click', closeFullscreen);
    fullscreenOverlay.addEventListener('click', (e) => {
        if (e.target === fullscreenOverlay) {
            closeFullscreen();
        }
    });

    // ESC key to close
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            closeFullscreen();
            document.removeEventListener('keydown', handleEscKey);
        }
    };
    document.addEventListener('keydown', handleEscKey);

    // Assemble fullscreen modal
    videoContainer.appendChild(fullscreenVideo);
    videoContainer.appendChild(closeButton);
    fullscreenOverlay.appendChild(videoContainer);
    document.body.appendChild(fullscreenOverlay);

    // Set initial states for animation
    gsap.set(videoContainer, {
        scale: 0.8,
        opacity: 0,
        y: 30,
        filter: 'blur(10px)'
    });

    gsap.set(closeButton, {
        scale: 0,
        opacity: 0
    });

    // Animate in with staggered timing
    const tl = gsap.timeline();

    // First animate the overlay background
    tl.to(fullscreenOverlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
    })
    // Then animate the video container
    .to(videoContainer, {
        scale: 1,
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'back.out(1.2)'
    }, '-=0.2')
    // Finally animate the close button
    .to(closeButton, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'back.out(1.7)'
    }, '-=0.3');
}