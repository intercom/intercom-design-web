// Create a Spotify embed card
export function createSpotifyCard(data) {
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

    // Mobile detection for responsive sizing
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    // Create card container
    const card = document.createElement('div');
    card.className = 'card spotify-card';
    card.style.padding = '0';
    card.style.overflow = 'hidden';
    card.style.borderRadius = '12px';
    card.style.pointerEvents = 'none';

    // Responsive sizing for Spotify cards with mobile-optimized heights
    if (isSmallMobile) {
        // Very small mobile devices - compact format with reduced height
        card.style.width = 'min(320px, 95vw)';
        card.style.height = '132px'; // Reduced height for mobile compact view
    } else if (isMobile) {
        // Mobile devices - responsive but larger than small mobile
        card.style.width = 'min(380px, 85vw)';
        card.style.height = '142px'; // Slightly reduced height for mobile
    } else {
        // Desktop and tablet - use viewport-based sizing with standard height
        card.style.width = 'min(450px, 35vw)';
        card.style.height = '152px'; // Standard Spotify embed height
    }

    // Set default for colourful if not provided
    const isColourful = typeof data.colourful === 'boolean' ? data.colourful : false;
    // Ensure embedId has 'episode/' prefix
    let embedId = data.embedId;
    if (!embedId.startsWith('episode/')) {
        embedId = 'episode/' + embedId;
    }

    // Create Spotify embed iframe
    const iframe = document.createElement('iframe');
    iframe.style.borderRadius = '12px';

    // Build Spotify embed URL with mobile-optimized parameters
    const themeParam = isColourful ? '1' : '0';
    let embedUrl = `https://open.spotify.com/embed/${embedId}?theme=${themeParam}`;

    // Add mobile-specific parameters for better mobile experience
    if (isMobile) {
        embedUrl += '&utm_source=generator&utm_medium=embed';
        // Use mobile-optimized compact view that removes unnecessary UI elements
        embedUrl += '&compact=true';
        // Hide cover art on very small screens to save space
        if (isSmallMobile) {
            embedUrl += '&hide_cover=true';
        }
        // Enable mobile-friendly controls
        embedUrl += '&mobile=1';
    }

    iframe.src = embedUrl;
    iframe.width = '100%';

    // Set iframe height to match card height for mobile optimization
    if (isSmallMobile) {
        iframe.height = '132';
    } else if (isMobile) {
        iframe.height = '142';
    } else {
        iframe.height = '152';
    }

    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    iframe.style.pointerEvents = 'auto';

    // Add mobile-specific iframe optimizations
    if (isMobile) {
        iframe.style.touchAction = 'manipulation';
        iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms');
        // Optimize iframe for mobile performance
        iframe.style.transform = 'translateZ(0)'; // Hardware acceleration
        iframe.style.webkitTransform = 'translateZ(0)';
    }

    // Assemble card
    card.appendChild(iframe);
    wrapper.appendChild(title);
    wrapper.appendChild(card);

    return wrapper;
} 