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

    // Create card container
    const card = document.createElement('div');
    card.className = 'card spotify-card';
    card.style.padding = '0';
    card.style.overflow = 'hidden';
    card.style.borderRadius = '12px';
    card.style.width = 'min(450px, 30vw)';
    card.style.height = '152px';
    card.style.pointerEvents = 'none';

    // Create Spotify embed iframe
    const iframe = document.createElement('iframe');
    iframe.style.borderRadius = '12px';
    iframe.src = `https://open.spotify.com/embed/${data.embedId}?theme=0`;
    iframe.width = '100%';
    iframe.height = '152';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    iframe.style.pointerEvents = 'auto';

    // Assemble card
    card.appendChild(iframe);
    wrapper.appendChild(title);
    wrapper.appendChild(card);

    return wrapper;
} 