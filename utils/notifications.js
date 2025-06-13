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

    show(message, url = 'https://example.com') {
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
        closeButton.style.zIndex = '2';
        closeButton.style.textDecoration = 'none';
        closeButton.style.transform = 'scale(0.8)';
        closeButton.style.transformOrigin = 'center';
        closeButton.style.width = '26px';
        closeButton.style.height = '26px';
        closeButton.style.minWidth = '26px';
        closeButton.style.minHeight = '26px';
        closeButton.style.padding = '0';

        // Notification main container as a link
        const notificationLink = document.createElement('a');
        notificationLink.href = url;
        notificationLink.target = '_blank';
        notificationLink.rel = 'noopener noreferrer';
        notificationLink.style.background = 'rgba(20, 20, 20, 0.7)';
        notificationLink.style.backdropFilter = 'blur(10px)';
        notificationLink.style.webkitBackdropFilter = 'blur(10px)';
        notificationLink.style.borderRadius = '16px';
        notificationLink.style.border = '1px solid rgba(46, 46, 46, 0.3)';
        notificationLink.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        notificationLink.style.display = 'flex';
        notificationLink.style.width = '360px';
        notificationLink.style.padding = '16px';
        notificationLink.style.alignItems = 'flex-start';
        notificationLink.style.gap = '12px';
        notificationLink.style.position = 'relative';
        notificationLink.style.transform = 'translateX(100px)';
        notificationLink.style.opacity = '0';
        notificationLink.style.scale = '0.8';
        notificationLink.style.boxSizing = 'border-box';
        notificationLink.style.textDecoration = 'none';
        notificationLink.style.color = 'inherit';
        notificationLink.style.cursor = 'pointer';
        notificationLink.style.transition = 'background 0.2s';
        notificationLink.tabIndex = 0;

        // --- Hover logic for close button with delay ---
        let closeBtnHideTimeout = null;
        const CLOSE_BTN_HIDE_DELAY = 400; // ms

        function showCloseBtn() {
            if (closeBtnHideTimeout) {
                clearTimeout(closeBtnHideTimeout);
                closeBtnHideTimeout = null;
            }
            gsap.to(closeButton, {
                opacity: 1,
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
            messageRow.style.color = 'var(--foreground-primary)';
        }
        function hideCloseBtnWithDelay() {
            if (closeBtnHideTimeout) clearTimeout(closeBtnHideTimeout);
            closeBtnHideTimeout = setTimeout(() => {
                gsap.to(closeButton, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.2,
                    ease: "power2.in"
                });
            }, CLOSE_BTN_HIDE_DELAY);
            messageRow.style.color = 'var(--foreground-secondary)';
        }

        notificationWrapper.addEventListener('mouseenter', showCloseBtn);
        notificationWrapper.addEventListener('mouseleave', hideCloseBtnWithDelay);
        notificationLink.addEventListener('mouseenter', showCloseBtn);
        notificationLink.addEventListener('mouseleave', hideCloseBtnWithDelay);
        closeButton.addEventListener('mouseenter', showCloseBtn);
        closeButton.addEventListener('mouseleave', hideCloseBtnWithDelay);

        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.background = 'rgba(40,40,40,0.9)';
            closeButton.style.color = 'var(--foreground-primary)';
        });
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.background = 'rgba(20, 20, 20, 0.7)';
            closeButton.style.color = 'var(--foreground-secondary)';
        });
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
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

        // --- Optional: Auto-dismiss logic with pause on hover ---
        const AUTO_DISMISS_DELAY = 6000; // ms
        let autoDismissTimeout = setTimeout(() => {
            if (document.body.contains(notificationWrapper)) {
                gsap.to(notificationWrapper, {
                    x: 100,
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: () => {
                        if (this.container.contains(notificationWrapper)) {
                            this.container.removeChild(notificationWrapper);
                        }
                    }
                });
            }
        }, AUTO_DISMISS_DELAY);
        function pauseAutoDismiss() {
            if (autoDismissTimeout) {
                clearTimeout(autoDismissTimeout);
                autoDismissTimeout = null;
            }
        }
        function resumeAutoDismiss() {
            if (!autoDismissTimeout) {
                autoDismissTimeout = setTimeout(() => {
                    if (document.body.contains(notificationWrapper)) {
                        gsap.to(notificationWrapper, {
                            x: 100,
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.4,
                            ease: "power2.in",
                            onComplete: () => {
                                if (this.container.contains(notificationWrapper)) {
                                    this.container.removeChild(notificationWrapper);
                                }
                            }
                        });
                    }
                }, AUTO_DISMISS_DELAY);
            }
        }
        notificationWrapper.addEventListener('mouseenter', pauseAutoDismiss);
        notificationWrapper.addEventListener('mouseleave', resumeAutoDismiss);
        notificationLink.addEventListener('mouseenter', pauseAutoDismiss);
        notificationLink.addEventListener('mouseleave', resumeAutoDismiss);
        closeButton.addEventListener('mouseenter', pauseAutoDismiss);
        closeButton.addEventListener('mouseleave', resumeAutoDismiss);

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

        // Assemble notification (link as main container)
        notificationLink.appendChild(innerContainer);

        // Add close button and notification link to wrapper
        notificationWrapper.appendChild(closeButton);
        notificationWrapper.appendChild(notificationLink);
        this.container.appendChild(notificationWrapper);

        // Animate in with GSAP
        gsap.to(notificationLink, {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
    }
} 