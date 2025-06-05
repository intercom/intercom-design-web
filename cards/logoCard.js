import { scrambleOnHover, resetToOriginal } from '../utils/textScramble.js';

// Create a logo card with scramble animation
export function createLogoCard(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper logo-card-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = data.top;
    wrapper.style.left = data.left;

    // Create card container
    const card = document.createElement('div');
    card.className = 'card logo-card';
    card.style.width = '500px';
    card.style.background = 'transparent';
    card.style.boxShadow = 'none';
    card.style.border = 'none';
    card.style.padding = '0';
    card.style.textAlign = 'center';
    card.style.position = 'relative';
    card.style.cursor = 'pointer';

    // Create paragraph container
    const paragraph = document.createElement('div');
    paragraph.className = 'logo-card-paragraph';
    
    // Split text into lines
    const lines = data.text.split(' ');
    const firstLine = lines[0];
    const secondLine = lines.slice(1).join(' ');
    
    // Create first line
    const p1 = document.createElement('p');
    p1.textContent = firstLine;
    p1.style.fontFamily = 'var(--font-sans)';
    p1.style.fontSize = 'clamp(3rem, 8vw, 6rem)';
    p1.style.fontWeight = '500';
    p1.style.letterSpacing = '-0.02em';
    p1.style.color = 'var(--foreground-primary)';
    p1.style.marginBottom = '0';
    p1.style.lineHeight = '1';
    p1.style.textAlign = 'center';
    p1.style.width = '100%';
    p1.style.display = 'inline-block';
    
    // Create second line
    const p2 = document.createElement('p');
    p2.textContent = secondLine;
    p2.style.fontFamily = 'var(--font-sans)';
    p2.style.fontSize = 'clamp(3rem, 8vw, 6rem)';
    p2.style.fontWeight = '500';
    p2.style.letterSpacing = '-0.02em';
    p2.style.color = 'var(--foreground-primary)';
    p2.style.marginTop = '0.2em';
    p2.style.lineHeight = '1';
    p2.style.textAlign = 'center';
    p2.style.width = '100%';
    p2.style.display = 'inline-block';
    
    paragraph.appendChild(p1);
    paragraph.appendChild(p2);

    // Create logo modal
    const modal = document.createElement('div');
    modal.className = 'modal logo-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0, 0, 0, 0.2)';
    modal.style.backdropFilter = 'blur(8px)';
    modal.style.webkitBackdropFilter = 'blur(8px)';
    modal.style.zIndex = '2000';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content logo-modal-content';
    modalContent.style.position = 'absolute';
    modalContent.style.top = '50%';
    modalContent.style.left = '50%';
    modalContent.style.transform = 'translate(-50%, -50%)';
    modalContent.style.background = 'var(--background-tertiary)';
    modalContent.style.padding = '2rem';
    modalContent.style.borderRadius = '8px';
    modalContent.style.boxShadow = 'var(--shadow-soft)';
    modalContent.style.opacity = '0';
    modalContent.style.zIndex = '10000';
    modalContent.style.border = '1px solid var(--card-border)';
    modalContent.style.maxWidth = '90vw';
    modalContent.style.width = '600px';

    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.right = '1.5rem';
    closeButton.style.top = '1.5rem';
    closeButton.style.fontSize = '1.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = 'var(--foreground-secondary)';
    closeButton.style.transition = 'color 0.2s ease';

    const modalTitle = document.createElement('h2');
    modalTitle.textContent = data.modalTitle || 'About Intercom Design';
    modalTitle.style.fontFamily = 'var(--font-sans)';
    modalTitle.style.fontSize = '1.5rem';
    modalTitle.style.fontWeight = '600';
    modalTitle.style.marginBottom = '1.5rem';
    modalTitle.style.color = 'var(--foreground-primary)';

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-content-body';
    modalBody.innerHTML = data.modalContent || 'Welcome to Intercom Design.';
    modalBody.style.fontFamily = 'var(--font-sans)';
    modalBody.style.fontSize = '1rem';
    modalBody.style.lineHeight = '1.6';
    modalBody.style.color = 'var(--foreground-secondary)';

    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Add hover effect to the card
    card.addEventListener('mouseenter', () => {
        scrambleOnHover(p1, firstLine);
        scrambleOnHover(p2, secondLine);
    });
    card.addEventListener('mouseleave', () => {
        resetToOriginal(p1, firstLine);
        resetToOriginal(p2, secondLine);
    });

    // Add click handler to open modal
    card.addEventListener('click', () => {
        modal.style.display = 'block';
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
    });

    // Add click handler to close modal
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
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
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

    // Assemble card
    card.appendChild(paragraph);
    wrapper.appendChild(card);

    return wrapper;
} 