export class NotificationSystem {
    constructor() {
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.bottom = '24px';
        this.container.style.right = '24px';
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';
        this.container.style.gap = '8px';
        this.container.style.zIndex = '10000';
        document.body.appendChild(this.container);
    }

    show(message) {
        const notification = document.createElement('div');
        notification.style.background = 'rgba(20, 20, 20, 0.7)';
        notification.style.backdropFilter = 'blur(10px)';
        notification.style.webkitBackdropFilter = 'blur(10px)';
        notification.style.padding = '16px 24px';
        notification.style.borderRadius = '16px';
        notification.style.border = '1px solid rgba(46, 46, 46, 0.3)';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        notification.style.fontFamily = 'DM Mono, monospace';
        notification.style.fontSize = 'var(--text-xs)';
        notification.style.fontWeight = '300';
        notification.style.letterSpacing = 'var(--tracking-wider)';
        notification.style.color = 'var(--foreground-primary)';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.gap = '8px';
        notification.style.position = 'relative';
        notification.style.transform = 'translateX(100px)';
        notification.style.opacity = '0';
        notification.style.scale = '0.8';

        // Create indicator
        const indicator = document.createElement('div');
        indicator.style.width = '6px';
        indicator.style.height = '6px';
        indicator.style.background = 'var(--foreground-primary)';
        indicator.style.display = 'inline-block';
        indicator.style.position = 'relative';

        // Create message container
        const messageContainer = document.createElement('div');
        messageContainer.textContent = message;

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.padding = '4px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = 'var(--foreground-primary)';
        closeButton.style.opacity = '0.6';
        closeButton.style.transition = 'opacity 0.2s ease';
        closeButton.style.display = 'flex';
        closeButton.style.alignItems = 'center';
        closeButton.style.justifyContent = 'center';

        // Add hover effect to close button
        closeButton.addEventListener('mouseenter', () => {
            gsap.to(closeButton, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        closeButton.addEventListener('mouseleave', () => {
            gsap.to(closeButton, {
                opacity: 0.6,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        // Add click handler to close button
        closeButton.addEventListener('click', () => {
            gsap.to(notification, {
                x: 100,
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    this.container.removeChild(notification);
                }
            });
        });

        // Add hover effect to spread notifications
        notification.addEventListener('mouseenter', () => {
            const notifications = this.container.children;
            for (let i = 0; i < notifications.length; i++) {
                const notif = notifications[i];
                gsap.to(notif, {
                    y: i * 8,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        notification.addEventListener('mouseleave', () => {
            const notifications = this.container.children;
            for (let i = 0; i < notifications.length; i++) {
                const notif = notifications[i];
                gsap.to(notif, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        // Assemble notification
        notification.appendChild(indicator);
        notification.appendChild(messageContainer);
        notification.appendChild(closeButton);
        this.container.appendChild(notification);

        // Animate in with GSAP
        gsap.to(notification, {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
    }
} 