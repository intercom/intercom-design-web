// Create a video card that plays on loop without controls
export function createVideoCard(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;
    
    // Responsive sizing based on viewport
    const isMobile = window.innerWidth <= 600;
    const scaleFactor = isMobile ? 1 : Math.min(window.innerWidth / 1920, 2.5); // Scale up to 2.5x on larger screens
    wrapper.style.width = `${50 * scaleFactor}vw`;  // Scale viewport width
    wrapper.style.height = `${50 * scaleFactor}vh`; // Scale viewport height
    wrapper.style.zIndex = '-1';    // Place under other cards

    // Create image element for GIF
    const image = document.createElement('img');
    image.src = 'assets/logo/Logo4.gif';
    image.style.width = '100%';
    image.style.height = '100%';
    image.style.objectFit = 'contain';
    image.style.display = 'block';

    // Assemble card
    const card = document.createElement('div');
    card.className = 'card video-card';
    card.style.padding = '0';
    card.style.overflow = 'hidden';
    card.style.border = 'none';
    card.style.background = 'transparent';
    card.style.borderRadius = '0';
    card.appendChild(image);

    wrapper.appendChild(card);

    return wrapper;
} 