export class Minimap {
    constructor(canvasContainer, canvas, cards) {
        this.canvasContainer = canvasContainer;
        this.canvas = canvas;
        this.cards = cards;
        
        // Minimap constants
        this.scale = 10;
        this.canvasWidth = 3600;
        this.canvasHeight = 2200;
        this.minimapWidth = 360;  // 3600 / scale
        this.minimapHeight = 220; // 2200 / scale
        
        // Initialize minimap
        this.minimap = document.getElementById('minimap');
        this.viewportBox = document.getElementById('map-viewport');
        
        // Initialize viewport box
        this.updateViewport();
        
        // Bind methods
        this.renderDots = this.renderDots.bind(this);
        this.updateViewport = this.updateViewport.bind(this);
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.canvasContainer.addEventListener('scroll', this.updateViewport);
        window.addEventListener('resize', this.updateViewport);
    }
    
    renderDots() {
        // Remove old dots
        this.minimap.querySelectorAll('.minimap-dot').forEach(dot => dot.remove());

        this.cards.forEach(card => {
            // Parse percentage or pixel values
            let top = parseFloat(card.top) / 100 * this.canvasHeight;
            let left = parseFloat(card.left) / 100 * this.canvasWidth;
            // If value is in px, use as is
            if (card.top && card.top.includes('px')) top = parseFloat(card.top);
            if (card.left && card.left.includes('px')) left = parseFloat(card.left);

            // Create dot
            const dot = document.createElement('div');
            dot.className = 'minimap-dot';
            
            // Calculate position on minimap (scale down and center the dot)
            const dotSize = 8; // Size of the dot in pixels
            const scaledLeft = (left / this.scale) - (dotSize / 2);
            const scaledTop = (top / this.scale) - (dotSize / 2);
            
            // Ensure dots stay within minimap bounds
            const boundedLeft = Math.max(0, Math.min(scaledLeft, this.minimapWidth - dotSize));
            const boundedTop = Math.max(0, Math.min(scaledTop, this.minimapHeight - dotSize));
            
            dot.style.left = boundedLeft + 'px';
            dot.style.top = boundedTop + 'px';
            this.minimap.appendChild(dot);
        });
    }
    
    updateViewport() {
        if (!this.viewportBox) return;
        
        // Update viewport size
        this.viewportBox.style.width = window.innerWidth / this.scale + 'px';
        this.viewportBox.style.height = window.innerHeight / this.scale + 'px';

        // Calculate scroll position relative to canvas
        const scrollLeft = this.canvasContainer.scrollLeft;
        const scrollTop = this.canvasContainer.scrollTop;
        
        // Update viewport position
        this.viewportBox.style.left = scrollLeft / this.scale + 'px';
        this.viewportBox.style.top = scrollTop / this.scale + 'px';
    }
    
    // Method to center view on a specific card
    centerOnCard(cardIndex) {
        const card = this.cards[cardIndex];
        if (!card) return;
        
        const top = parseFloat(card.top) / 100 * this.canvasHeight;
        const left = parseFloat(card.left) / 100 * this.canvasWidth;
        
        this.canvasContainer.scrollTo({
            left: left - (window.innerWidth / 2),
            top: top - (window.innerHeight / 2),
            behavior: 'smooth'
        });
    }
} 