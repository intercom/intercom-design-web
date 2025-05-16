// Create a modal utility
export function createModal() {
    // Get modal elements
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalBody = modal.querySelector('.modal-body');
    const closeButton = modal.querySelector('.close-button');

    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Return modal API
    return {
        open: (title, content) => {
            modalBody.innerHTML = `
                <h2>${title}</h2>
                <div class="modal-content-body">${content}</div>
            `;
            modal.style.display = 'block';
        },
        close: () => {
            modal.style.display = 'none';
        }
    };
} 