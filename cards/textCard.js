// Create a text card with a link
export function createTextCard(data) {
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

    return card;
} 