export class Minimap {
    constructor(canvasContainer, canvas, cards) {
      this.canvasContainer = canvasContainer;
      this.canvas = canvas;
      this.cards = cards;
  
      // Get canvas dimensions from the actual canvas element
      const canvasRect = this.canvas.getBoundingClientRect();
      this.canvasWidth = canvasRect.width;
      this.canvasHeight = canvasRect.height;
      
      // Calculate minimap scale and dimensions
      this.scale = 14; // Increased from 12 to 16 to make minimap smaller
      this.minimapWidth = this.canvasWidth / this.scale;
      this.minimapHeight = this.canvasHeight / this.scale;
  
      // Initialize minimap and viewport elements
      this.minimap = document.getElementById('minimap');
      this.viewportBox = document.getElementById('map-viewport');
      
      // Set minimap dimensions
      this.minimap.style.width = `${this.minimapWidth}px`;
      this.minimap.style.height = `${this.minimapHeight}px`;
  
      // Bind methods
      this.renderCards = this.renderCards.bind(this);
      this.updateViewportFromTransform = this.updateViewportFromTransform.bind(this);
      this.handleMinimapClick = this.handleMinimapClick.bind(this);
      this.updateDimensions = this.updateDimensions.bind(this);
  
      // Render and set up listeners
      this.renderCards();
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      // Update viewport on canvas movement
      gsap.ticker.add(() => {
        const currentX = gsap.getProperty(this.canvas, 'x');
        const currentY = gsap.getProperty(this.canvas, 'y');
        this.updateViewportFromTransform(currentX, currentY);
      });

      window.addEventListener('resize', () => {
        // Update dimensions on resize
        const canvasRect = this.canvas.getBoundingClientRect();
        this.canvasWidth = canvasRect.width;
        this.canvasHeight = canvasRect.height;
        this.minimapWidth = this.canvasWidth / this.scale;
        this.minimapHeight = this.canvasHeight / this.scale;
        
        // Update minimap size
        this.minimap.style.width = `${this.minimapWidth}px`;
        this.minimap.style.height = `${this.minimapHeight}px`;
        
        // Re-render cards with new dimensions
        this.renderCards();
        
        // Update viewport
        const currentX = gsap.getProperty(this.canvas, 'x');
        const currentY = gsap.getProperty(this.canvas, 'y');
        this.updateViewportFromTransform(currentX, currentY);
      });
      
      this.minimap.addEventListener('click', this.handleMinimapClick);
    }
  
    renderCards() {
      // Clear old cards
      this.minimap.querySelectorAll('.minimap-card').forEach(card => card.remove());
  
      // Get all card elements from the canvas
      const cardElements = this.canvas.querySelectorAll('.card');
  
      cardElements.forEach(cardElement => {
        const rect = cardElement.getBoundingClientRect();
        const canvasRect = this.canvas.getBoundingClientRect();
        
        // Calculate position relative to canvas
        const relativeLeft = rect.left - canvasRect.left;
        const relativeTop = rect.top - canvasRect.top;
        
        // Create minimap card element
        const minimapCard = document.createElement('div');
        minimapCard.className = 'minimap-card';
        
        // Calculate scaled dimensions and position
        const scaledWidth = rect.width / this.scale;
        const scaledHeight = rect.height / this.scale;
        const scaledLeft = relativeLeft / this.scale;
        const scaledTop = relativeTop / this.scale;
        
        // Set card type class for styling
        const cardType = cardElement.classList[1]; // Get the second class (e.g., 'image-card', 'youtube-card')
        if (cardType) {
          minimapCard.classList.add(cardType);
          // Remove debug color for video and blockquote
          // if (cardType === 'video-card') {
          //   minimapCard.style.background = 'purple';
          // }
          // if (cardType === 'blockquote-card') {
          //   minimapCard.style.background = 'orange';
          // }
        }
        
        // Ensure card stays within minimap bounds
        const boundedLeft = Math.max(0, Math.min(scaledLeft, this.minimapWidth - scaledWidth));
        const boundedTop = Math.max(0, Math.min(scaledTop, this.minimapHeight - scaledHeight));
        
        // Apply styles
        minimapCard.style.width = `${scaledWidth}px`;
        minimapCard.style.height = `${scaledHeight}px`;
        minimapCard.style.left = `${boundedLeft}px`;
        minimapCard.style.top = `${boundedTop}px`;
        
        this.minimap.appendChild(minimapCard);
      });
    }
  
    updateViewportFromTransform(canvasX, canvasY) {
      if (!this.viewportBox) return;
  
      // Calculate viewport position and size
      const viewWidth = window.innerWidth / this.scale;
      const viewHeight = window.innerHeight / this.scale;
      
      // Calculate the viewport position on the minimap
      // Note: canvasX and canvasY are negative when scrolled
      const viewLeft = -canvasX / this.scale;
      const viewTop = -canvasY / this.scale;
  
      // Ensure viewport stays within minimap bounds
      const boundedLeft = Math.max(0, Math.min(viewLeft, this.minimapWidth - viewWidth));
      const boundedTop = Math.max(0, Math.min(viewTop, this.minimapHeight - viewHeight));
  
      // Update viewport box
      this.viewportBox.style.width = `${viewWidth}px`;
      this.viewportBox.style.height = `${viewHeight}px`;
      this.viewportBox.style.left = `${boundedLeft}px`;
      this.viewportBox.style.top = `${boundedTop}px`;
    }
  
    handleMinimapClick(event) {
      const rect = this.minimap.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
  
      // Convert minimap coordinates to canvas coordinates
      const canvasX = clickX * this.scale;
      const canvasY = clickY * this.scale;
  
      // Calculate target position to center the clicked point
      const targetX = -canvasX + window.innerWidth / 2;
      const targetY = -canvasY + window.innerHeight / 2;
  
      gsap.to(this.canvas, {
        duration: 1,
        ease: 'power2.out',
        x: targetX,
        y: targetY,
        onUpdate: () => {
          const currentX = gsap.getProperty(this.canvas, 'x');
          const currentY = gsap.getProperty(this.canvas, 'y');
          this.updateViewportFromTransform(currentX, currentY);
        }
      });
    }
  
    centerOnCard(cardIndex) {
      const card = this.cards[cardIndex];
      if (!card) return;
  
      const top = parseFloat(card.top) / 100 * this.canvasHeight;
      const left = parseFloat(card.left) / 100 * this.canvasWidth;
  
      const centerX = -left + window.innerWidth / 2;
      const centerY = -top + window.innerHeight / 2;
  
      gsap.to(this.canvas, {
        duration: 1,
        ease: 'power2.out',
        x: centerX,
        y: centerY,
        onUpdate: () => {
          const currentX = gsap.getProperty(this.canvas, 'x');
          const currentY = gsap.getProperty(this.canvas, 'y');
          this.updateViewportFromTransform(currentX, currentY);
        }
      });
    }

    // Add method to update dimensions
    updateDimensions(width, height) {
      this.canvasWidth = width;
      this.canvasHeight = height;
      this.minimapWidth = width / this.scale;
      this.minimapHeight = height / this.scale;
      
      // Update minimap size
      this.minimap.style.width = `${this.minimapWidth}px`;
      this.minimap.style.height = `${this.minimapHeight}px`;
      
      // Re-render cards with new dimensions
      this.renderCards();
      
      // Update viewport
      const currentX = gsap.getProperty(this.canvas, 'x');
      const currentY = gsap.getProperty(this.canvas, 'y');
      this.updateViewportFromTransform(currentX, currentY);
    }
}
  