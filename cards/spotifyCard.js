// Create a Spotify embed card
export function createSpotifyCard(data) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'card spotify-card';

    // Set fixed size
    card.style.width = '591px';
    card.style.height = '119px';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.justifyContent = 'flex-start';
    card.style.gap = '24px';
    card.style.padding = '24px';

    // Play button
    const playBtn = document.createElement('button');
    playBtn.className = 'audio-play-btn';
    playBtn.innerHTML = '▶️';
    playBtn.style.fontSize = '32px';
    playBtn.style.background = 'none';
    playBtn.style.border = 'none';
    playBtn.style.cursor = 'pointer';

    // Audio element (hidden)
    const audio = document.createElement('audio');
    audio.src = data.src;
    audio.preload = 'none';

    // Waveform (SVG or placeholder)
    const wave = document.createElement('div');
    wave.className = 'audio-wave';
    wave.innerHTML = `
      <svg width="320" height="40" viewBox="0 0 320 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="20" width="4" height="20" rx="2" fill="#1ED760"/>
        <rect x="8" y="10" width="4" height="30" rx="2" fill="#1ED760"/>
        <rect x="16" y="0" width="4" height="40" rx="2" fill="#1ED760"/>
        <rect x="24" y="10" width="4" height="30" rx="2" fill="#1ED760"/>
        <rect x="32" y="20" width="4" height="20" rx="2" fill="#1ED760"/>
        <!-- ...repeat or randomize for a more complex look... -->
      </svg>
    `;

    // Track label
    const label = document.createElement('div');
    label.className = 'card-label';
    label.textContent = data.label;

    // Play/pause logic
    let isPlaying = false;
    playBtn.onclick = () => {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '▶️';
        } else {
            audio.play();
            playBtn.innerHTML = '⏸️';
        }
        isPlaying = !isPlaying;
    };
    audio.onended = () => {
        playBtn.innerHTML = '▶️';
        isPlaying = false;
    };

    // Assemble card
    card.appendChild(playBtn);
    card.appendChild(wave);
    card.appendChild(label);
    card.appendChild(audio);

    return card;
} 