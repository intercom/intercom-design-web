// Create a folder card that opens a modal
export function createFolderCard(data, modal) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;

    // Create card container
    const card = document.createElement('div');
    card.className = 'card folder-card';
    card.style.background = 'none';
    card.style.border = 'none';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    card.style.gap = '12px';

    // Create folder icon
    const icon = document.createElement('img');
    icon.src = 'assets/icons/folder.png';
    icon.alt = 'Folder';
    icon.style.width = 'max(8vw, 96px)';  // Scale with viewport but max 96px (original size)
    icon.style.height = 'auto';

    // Create label element
    const label = document.createElement('span');
    label.textContent = data.label;
    label.style.color = 'var(--text-color, white)';
    label.style.fontSize = '14px';
    label.style.textAlign = 'center';

    // Add click handler to open modal
    card.addEventListener('click', () => {
        modal.open(data.title, data.content);
    });

    // Assemble card
    card.appendChild(icon);
    card.appendChild(label);
    wrapper.appendChild(card);

    return wrapper;
} 