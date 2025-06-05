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
            // Clear previous content
            modalBody.innerHTML = '';
            
            // Create header container
            const header = document.createElement('div');
            header.className = 'modal-header';

            // Create h2
            const titleElement = document.createElement('h2');
            titleElement.textContent = title;
            header.appendChild(titleElement);

            // Move the close button into the header
            header.appendChild(closeButton);

            modalBody.appendChild(header);

            // Add content (either string or DOM element)
            if (typeof content === 'string') {
                const contentDiv = document.createElement('div');
                contentDiv.className = 'modal-content-body';
                contentDiv.innerHTML = content;
                modalBody.appendChild(contentDiv);
            } else if (content instanceof Element) {
                modalBody.appendChild(content);
            }
            
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