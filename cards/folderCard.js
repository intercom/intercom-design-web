// Create a folder card that opens a modal
export function createFolderCard(data, modal) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'card folder-card';

    // Create folder icon
    const icon = document.createElement('img');
    icon.src = 'assets/icons/folder.svg';
    icon.alt = 'Folder';

    // Create title element
    const title = document.createElement('span');
    title.textContent = data.title;

    // Add click handler to open modal
    card.addEventListener('click', () => {
        modal.open(data.title, data.content);
    });

    // Assemble card
    card.appendChild(icon);
    card.appendChild(title);

    return card;
} 