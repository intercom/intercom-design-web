// Create a Spotify embed card
export function createSpotifyCard(data) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'card spotify-card';

    // Create iframe for Spotify embed
    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/${data.embedId}`;
    iframe.allow = 'encrypted-media';

    // Add label
    const label = document.createElement('div');
    label.className = 'card-label';
    label.textContent = data.label;

    // Assemble card
    card.appendChild(iframe);
    card.appendChild(label);

    return card;
} 