export class NotificationSystem {
    constructor() {
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.bottom = '20px';
        this.container.style.right = '20px';
        this.container.style.zIndex = '1000';
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';
        this.container.style.gap = '0';
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
        notification.style.fontFamily = 'Inter, sans-serif';
        notification.style.fontSize = 'var(--text-xs)';
        notification.style.fontWeight = 'var(--font-light)';
        notification.style.letterSpacing = 'var(--tracking-wider)';
        notification.style.color = 'var(--foreground-primary)';
        notification.style.transform = 'translateX(20px)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.3s ease';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.justifyContent = 'space-between';
        notification.style.gap = '16px';
        notification.style.marginTop = '-20px';
        notification.style.position = 'relative';

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
            closeButton.style.opacity = '1';
        });

        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.opacity = '0.6';
        });

        // Add click handler to close button
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(20px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                this.container.removeChild(notification);
            }, 300);
        });

        // Add hover effect to spread notifications
        notification.addEventListener('mouseenter', () => {
            const notifications = this.container.children;
            for (let i = 0; i < notifications.length; i++) {
                const notif = notifications[i];
                notif.style.marginTop = '10px';
            }
        });

        notification.addEventListener('mouseleave', () => {
            const notifications = this.container.children;
            for (let i = 0; i < notifications.length; i++) {
                const notif = notifications[i];
                notif.style.marginTop = '-20px';
            }
        });

        // Assemble notification
        notification.appendChild(messageContainer);
        notification.appendChild(closeButton);
        this.container.appendChild(notification);

        // Trigger animation
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        });
    }
} 