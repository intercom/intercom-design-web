// Create a modal utility
export function createModal() {
    // Get modal elements
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalBody = modal.querySelector('.modal-body');
    const closeButton = modal.querySelector('.close-button');

    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        gsap.to(modalContent, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
        gsap.to(modal, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut'
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            gsap.to(modalContent, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () => {
                    modal.style.display = 'none';
                }
            });
            gsap.to(modal, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut'
            });
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
            
            // Animate modal opening
            gsap.set(modal, { opacity: 0 });
            gsap.set(modalContent, { opacity: 0 });
            
            gsap.to(modal, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.inOut'
            });
            
            gsap.to(modalContent, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.inOut'
            });
        },
        close: () => {
            gsap.to(modalContent, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () => {
                    modal.style.display = 'none';
                }
            });
            gsap.to(modal, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut'
            });
        }
    };
} 