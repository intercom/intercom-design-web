// Create a YouTube embed card
export function createYoutubeCard(data) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'card youtube-card';

    // Create iframe for YouTube embed
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${data.embedId}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    // Add label
    const label = document.createElement('div');
    label.className = 'card-label';
    label.textContent = data.label;

    // Assemble card
    card.appendChild(iframe);
    card.appendChild(label);

    return card;
} 