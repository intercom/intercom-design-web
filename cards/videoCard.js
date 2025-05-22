// Create a video card that plays on loop without controls
export function createVideoCard(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;
    wrapper.style.width = '800px';  // Reduced width for the video
    wrapper.style.height = '800px'; // Reduced height for the video
    wrapper.style.zIndex = '-1';    // Place under other cards

    // Create image element for GIF
    const image = document.createElement('img');
    image.src = 'assets/logo/LogoGif22.gif';
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