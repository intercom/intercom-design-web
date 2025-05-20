// Create a YouTube embed card
export function createYoutubeCard(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;

    // Card Title
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = data.label || '';

    // Create card container
    const card = document.createElement('div');
    card.className = 'card youtube-card';
    card.style.padding = '0';
    card.style.overflow = 'hidden';
    card.style.borderRadius = '16px';
    card.style.position = 'relative';

    // Create thumbnail container
    const thumbnail = document.createElement('div');
    thumbnail.className = 'youtube-thumbnail';
    thumbnail.style.width = '100%';
    thumbnail.style.height = '100%';
    thumbnail.style.backgroundImage = `url(https://img.youtube.com/vi/${data.embedId}/maxresdefault.jpg)`;
    thumbnail.style.backgroundSize = 'cover';
    thumbnail.style.backgroundPosition = 'center';
    thumbnail.style.transition = 'filter 0.3s ease';

    // Create play button overlay
    const playButton = document.createElement('div');
    playButton.className = 'youtube-play-button';
    playButton.innerHTML = '▶';
    playButton.style.position = 'absolute';
    playButton.style.top = '50%';
    playButton.style.left = '50%';
    playButton.style.transform = 'translate(-50%, -50%)';
    playButton.style.fontSize = '48px';
    playButton.style.color = 'rgba(255, 255, 255, 0.8)';
    playButton.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
    playButton.style.pointerEvents = 'none';

    // Create link wrapper
    const link = document.createElement('a');
    link.href = `https://www.youtube.com/watch?v=${data.embedId}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'block';
    link.style.width = '100%';
    link.style.height = '100%';

    // Add hover effect
    link.addEventListener('mouseenter', () => {
        thumbnail.style.filter = 'blur(2px) brightness(0.8)';
        playButton.style.color = 'rgba(255, 255, 255, 1)';
    });

    link.addEventListener('mouseleave', () => {
        thumbnail.style.filter = 'none';
        playButton.style.color = 'rgba(255, 255, 255, 0.8)';
    });

    // Assemble card
    link.appendChild(thumbnail);
    link.appendChild(playButton);
    card.appendChild(link);

    wrapper.appendChild(title);
    wrapper.appendChild(card);

    return wrapper;
} 