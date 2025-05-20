// Create a text card with a link
export function createTextCard(data) {
    // Special handling for logo card
    if (data.id === 'logo') {
        const card = document.createElement('div');
        card.className = 'card text-card';
        card.id = 'logo';

        // Create link element
        const link = document.createElement('a');
        link.href = data.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = data.text;

        // Assemble card
        card.appendChild(link);
        return card;
    }

    // Regular card handling
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
    card.className = 'card text-card';

    // Create link element
    const link = document.createElement('a');
    link.href = data.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = data.text;

    // Assemble card
    card.appendChild(link);

    wrapper.appendChild(title);
    wrapper.appendChild(card);

    return wrapper;
} 