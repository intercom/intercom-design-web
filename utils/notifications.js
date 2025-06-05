export class NotificationSystem {
    constructor() {
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.top = '32px';
        this.container.style.right = '32px';
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';
        this.container.style.gap = '8px';
        this.container.style.zIndex = '1500';
        this.container.style.width = '360px';
        document.body.appendChild(this.container);

        // Define available accent colors from themes.css
        this.accentColors = [
            'var(--accent-blue)',
            'var(--accent-orange)',
            'var(--accent-gold)',
            'var(--accent-orchid)',
            'var(--accent-slate)',
            'var(--accent-lime)',
            'var(--accent-green)'
        ];

        // Shuffle colors array
        this.shuffleColors();
    }

    // Helper method to shuffle array
    shuffleColors() {
        for (let i = this.accentColors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.accentColors[i], this.accentColors[j]] = [this.accentColors[j], this.accentColors[i]];
        }
    }

    // Helper method to get next color in shuffled array
    getNextAccentColor() {
        const color = this.accentColors[0];
        // Move used color to end of array
        this.accentColors.push(this.accentColors.shift());
        return color;
    }

    show(message) {
        // Create notification wrapper
        const notificationWrapper = document.createElement('div');
        notificationWrapper.style.position = 'relative';
        notificationWrapper.style.display = 'flex';
        notificationWrapper.style.flexDirection = 'column';
        notificationWrapper.style.alignItems = 'center';
        notificationWrapper.style.width = '371px';
        notificationWrapper.style.marginBottom = '8px';

        // Create close button (initially hidden)
        const closeButton = document.createElement('button');
        closeButton.textContent = 'x';
        closeButton.style.display = 'inline-flex';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '-8px';
        closeButton.style.right = '-7px';
        closeButton.style.padding = '4px 14px';
        closeButton.style.alignItems = 'center';
        closeButton.style.justifyContent = 'center';
        closeButton.style.borderRadius = '40px';
        closeButton.style.background = 'rgba(20, 20, 20, 0.7)';
        closeButton.style.backdropFilter = 'blur(10px)';
        closeButton.style.webkitBackdropFilter = 'blur(10px)';
        closeButton.style.border = 'none';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontFamily = 'DM Mono, monospace';
        closeButton.style.fontSize = 'var(--text-xs)';
        closeButton.style.fontWeight = 'var(--font-light)';
        closeButton.style.letterSpacing = 'var(--tracking-widest)';
        closeButton.style.textTransform = 'uppercase';
        closeButton.style.color = 'var(--foreground-secondary)';
        closeButton.style.opacity = '0';
        closeButton.style.transition = 'opacity 0.2s ease, background 0.2s ease, color 0.2s ease';
        closeButton.style.zIndex = '1';
        closeButton.style.textDecoration = 'none';
        closeButton.style.transform = 'scale(0.8)';
        closeButton.style.transformOrigin = 'center';
        closeButton.style.width = '26px';
        closeButton.style.height = '26px';
        closeButton.style.minWidth = '26px';
        closeButton.style.minHeight = '26px';
        closeButton.style.padding = '0';

        // Notification main container
        const notification = document.createElement('div');
        notification.style.background = 'rgba(20, 20, 20, 0.7)';
        notification.style.backdropFilter = 'blur(10px)';
        notification.style.webkitBackdropFilter = 'blur(10px)';
        notification.style.borderRadius = '16px';
        notification.style.border = '1px solid rgba(46, 46, 46, 0.3)';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        notification.style.display = 'flex';
        notification.style.width = '360px';
        notification.style.padding = '16px';
        notification.style.alignItems = 'flex-start';
        notification.style.gap = '12px';
        notification.style.position = 'relative';
        notification.style.transform = 'translateX(100px)';
        notification.style.opacity = '0';
        notification.style.scale = '0.8';
        notification.style.boxSizing = 'border-box';

        // Show/hide close button on hover
        notificationWrapper.addEventListener('mouseenter', () => {
            gsap.to(closeButton, {
                opacity: 1,
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
            messageRow.style.color = 'var(--foreground-primary)';
        });
        notificationWrapper.addEventListener('mouseleave', () => {
            gsap.to(closeButton, {
                opacity: 0,
                scale: 0.8,
                duration: 0.2,
                ease: "power2.in"
            });
            messageRow.style.color = 'var(--foreground-secondary)';
        });

        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.background = 'rgba(40,40,40,0.9)';
            closeButton.style.color = 'var(--foreground-primary)';
        });
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.background = 'rgba(20, 20, 20, 0.7)';
            closeButton.style.color = 'var(--foreground-secondary)';
        });
        closeButton.addEventListener('click', () => {
            gsap.to(notificationWrapper, {
                x: 100,
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    this.container.removeChild(notificationWrapper);
                }
            });
        });

        // Left: Accent rectangles
        const accentBar = document.createElement('div');
        accentBar.style.display = 'flex';
        accentBar.style.flexDirection = 'row';
        accentBar.style.gap = '4px';
        accentBar.style.marginTop = '2px';
        
        // Create rectangle with next color from shuffled array
        const rect = document.createElement('div');
        rect.style.width = '8px';
        rect.style.height = '12px';
        rect.style.borderRadius = '0';
        rect.style.background = this.getNextAccentColor();
        accentBar.appendChild(rect);

        // Right: Timestamp
        const timestamp = document.createElement('div');
        timestamp.textContent = 'NOW';
        timestamp.style.color = 'rgba(255,255,255,0.3)';
        timestamp.style.fontFamily = 'DM Mono, monospace';
        timestamp.style.fontSize = 'var(--text-xs)';
        timestamp.style.fontWeight = 'var(--font-light)';
        timestamp.style.letterSpacing = 'var(--tracking-widest)';
        timestamp.style.textTransform = 'uppercase';
        timestamp.style.alignSelf = 'flex-start';
        timestamp.style.marginLeft = 'auto';
        timestamp.style.marginTop = '2px';

        // Inner container (vertical stack)
        const innerContainer = document.createElement('div');
        innerContainer.style.display = 'flex';
        innerContainer.style.flexDirection = 'column';
        innerContainer.style.alignItems = 'flex-start';
        innerContainer.style.gap = '8px';
        innerContainer.style.flex = '1 0 0';
        innerContainer.style.alignSelf = 'stretch';

        // Top row: accent rectangles + timestamp
        const topRow = document.createElement('div');
        topRow.style.display = 'flex';
        topRow.style.justifyContent = 'space-between';
        topRow.style.alignItems = 'center';
        topRow.style.alignSelf = 'stretch';
        topRow.appendChild(accentBar);
        topRow.appendChild(timestamp);

        // Message row
        const messageRow = document.createElement('div');
        messageRow.style.display = 'flex';
        messageRow.style.alignItems = 'flex-start';
        messageRow.style.alignSelf = 'stretch';
        messageRow.style.fontFamily = 'DM Mono, monospace';
        messageRow.style.fontSize = 'var(--text-xs)';
        messageRow.style.fontWeight = 'var(--font-light)';
        messageRow.style.letterSpacing = 'var(--tracking-widest)';
        messageRow.style.textTransform = 'uppercase';
        messageRow.style.color = 'var(--foreground-secondary)';
        messageRow.style.cursor = 'pointer';
        messageRow.style.textDecoration = 'none';
        messageRow.textContent = message;

        // Assemble inner container
        innerContainer.appendChild(topRow);
        innerContainer.appendChild(messageRow);

        // Assemble notification
        notification.appendChild(innerContainer);

        // Add notification and close button to wrapper
        notificationWrapper.appendChild(closeButton);
        notificationWrapper.appendChild(notification);
        this.container.appendChild(notificationWrapper);

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