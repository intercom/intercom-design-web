// Create an image card with a link
export function createImageCard(data) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'card image-card';

    // Create image element
    const img = document.createElement('img');
    img.src = data.src;
    img.alt = data.label;

    // Create link wrapper
    const link = document.createElement('a');
    link.href = data.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.appendChild(img);

    // Add label
    const label = document.createElement('div');
    label.className = 'card-label';
    label.textContent = data.label;

    // Assemble card
    card.appendChild(link);
    card.appendChild(label);

    return card;
} 