// Create a folder card that opens a modal
export function createFolderCard(data, modal) {
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
    card.className = 'card folder-card';

    // Create folder icon
    const icon = document.createElement('img');
    icon.src = 'assets/icons/folder.svg';
    icon.alt = 'Folder';

    // Create title element
    const cardTitle = document.createElement('span');
    cardTitle.textContent = data.title;

    // Add click handler to open modal
    card.addEventListener('click', () => {
        modal.open(data.title, data.content);
    });

    // Assemble card
    card.appendChild(icon);
    card.appendChild(cardTitle);

    wrapper.appendChild(title);
    wrapper.appendChild(card);

    return wrapper;
} 