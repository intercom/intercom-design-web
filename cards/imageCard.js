// Create an image card with a link
export function createImageCard(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;

    // Card Title
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = data.label || '';

    // Create image element
    const img = document.createElement('img');
    img.src = data.src;
    img.alt = data.label;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';

    // Assemble card
    const card = document.createElement('div');
    card.className = 'card image-card';
    card.style.padding = '0';
    card.style.overflow = 'hidden';
    card.style.cursor = 'default'; // Make non-clickable

    // Check if original size should be used
    if (data.originalSize) {
        // Use original image dimensions - will be set after image loads
        img.onload = function() {
            const aspectRatio = this.naturalWidth / this.naturalHeight;
            const maxSize = Math.min(window.innerWidth * 0.4, window.innerHeight * 0.4, 800); // Max 40% of viewport or 800px

            if (aspectRatio >= 1) {
                // Landscape or square
                card.style.width = `${Math.min(this.naturalWidth, maxSize)}px`;
                card.style.height = `${Math.min(this.naturalHeight, maxSize / aspectRatio)}px`;
            } else {
                // Portrait
                card.style.height = `${Math.min(this.naturalHeight, maxSize)}px`;
                card.style.width = `${Math.min(this.naturalWidth, maxSize * aspectRatio)}px`;
            }

            // Refresh minimap after image loads and card resizes
            setTimeout(() => {
                if (window.minimap && window.minimap.refresh) {
                    window.minimap.refresh();
                }
            }, 100); // Small delay to ensure DOM has updated
        };
        // Set initial size to prevent layout shift
        card.style.width = '400px';
        card.style.height = '400px';
    } else {
        // Responsive sizing based on viewport
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        const scaleFactor = isMobile ? 1 : Math.min(window.innerWidth / 1920, 2.5); // Scale up to 2.5x on larger screens

        if (data.vertical) {
            if (isSmallMobile) {
                card.style.width = 'min(280px, 85vw)';
                card.style.height = 'min(420px, 60vh)';
            } else if (isMobile) {
                card.style.width = 'min(320px, 80vw)';
                card.style.height = 'min(480px, 65vh)';
            } else {
                card.style.width = `min(${390 * scaleFactor}px, 60vw)`;
                card.style.height = `min(${600 * scaleFactor}px, 70vh)`;
            }
        } else {
            if (isSmallMobile) {
                card.style.width = 'min(300px, 90vw)';
                card.style.height = 'min(200px, 50vh)';
            } else if (isMobile) {
                card.style.width = 'min(360px, 85vw)';
                card.style.height = 'min(240px, 55vh)';
            } else {
                card.style.width = `min(${600 * scaleFactor}px, 90vw)`;
                card.style.height = `min(${400 * scaleFactor}px, 60vh)`;
            }
        }

        // Add mobile-specific touch optimizations
        if (isMobile) {
            card.style.touchAction = 'manipulation';
            card.style.webkitTapHighlightColor = 'transparent';
        }
    }

    card.appendChild(img);

    wrapper.appendChild(title);
    wrapper.appendChild(card);

    return wrapper;
} 