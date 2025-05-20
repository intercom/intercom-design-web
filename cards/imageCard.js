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

    // Create link wrapper
    const link = document.createElement('a');
    link.href = data.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.appendChild(img);

    // Assemble card
    const card = document.createElement('div');
    card.className = 'card image-card';
    card.appendChild(link);

    wrapper.appendChild(title);
    wrapper.appendChild(card);

    return wrapper;
} 