// Import card modules
import { createImageCard } from './cards/imageCard.js';
import { createYoutubeCard } from './cards/youtubeCard.js';
import { createSpotifyCard } from './cards/spotifyCard.js';
import { createTextCard } from './cards/textCard.js';
import { createFolderCard } from './cards/folderCard.js';
import { createVideoCard } from './cards/videoCard.js';
import { createModal } from './utils/createModal.js';
import { Minimap } from './utils/minimap.js';
import { NotificationSystem } from './utils/notifications.js';

// Initialize notification system
const notifications = new NotificationSystem();

// Get DOM elements
const canvas = document.getElementById('canvas');
const canvasContainer = document.getElementById('canvas-container');

// Initial offsets for canvas position
let offsetX = 0;
let offsetY = 0;

// Track latest scroll targets
let scrollTween = { x: 0, y: 0 };

// Canvas dimensions - now responsive
const MIN_CANVAS_WIDTH = 4320;
const MIN_CANVAS_HEIGHT = 2640;
const ASPECT_RATIO = MIN_CANVAS_WIDTH / MIN_CANVAS_HEIGHT;

// Function to calculate responsive canvas dimensions
function calculateCanvasDimensions() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calculate base dimensions (2x viewport)
  let width = viewportWidth * 2;
  let height = width / ASPECT_RATIO;
  
  // Ensure minimum dimensions
  width = Math.max(width, MIN_CANVAS_WIDTH);
  height = Math.max(height, MIN_CANVAS_HEIGHT);
  
  return { width, height };
}

// Update canvas size
function updateCanvasSize() {
  const { width, height } = calculateCanvasDimensions();
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  
  // Update minimap if it exists
  if (minimap) {
    minimap.updateDimensions(width, height);
  }
}

// Card data
const cards = [
  { 
    type: 'image', 
    top: '15%', 
    left: '12%', 
    src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80', 
    link: 'https://www.intercom.com/design', 
    label: 'DESIGN SYSTEM' 
  },
  { 
    type: 'image', 
    top: '8%', 
    left: '52%', 
    src: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&auto=format&fit=crop&q=80', 
    link: 'https://www.intercom.com/blog', 
    label: 'BLOG POST' 
  },
  { 
    type: 'image', 
    top: '65%', 
    left: '10%', 
    src: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=800&auto=format&fit=crop&q=80', 
    link: 'https://www.intercom.com/careers', 
    label: 'CAREERS' 
  },
  { 
    type: 'image', 
    top: '75%', 
    left: '82%', 
    src: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&auto=format&fit=crop&q=80', 
    link: 'https://www.intercom.com/podcast', 
    label: 'IMG1' 
  },
  { 
    type: 'youtube', 
    top: '55%', 
    left: '60%', 
    embedId: 'I8hMPj3AD34', 
    label: "Why Old UI Designs Won't Work with AI" 
  },
  { 
    type: 'youtube', 
    top: '70%', 
    left: '63%', 
    embedId: 'cnhUspTS4YU', 
    label: 'Built For You: April 2024 - An Intercom Product Broadcast' 
  },
  { 
    type: 'spotify', 
    top: '28%', 
    left: '74%', 
    embedId: 'episode/2mJ5zLlX0iouG9H5vxUlhk', 
    label: 'BEYOND THE AI HYPE' 
  },
  { 
    type: 'spotify', 
    top: '20%', 
    left: '78%', 
    embedId: 'episode/2mJ5zLlX0iouG9H5vxUlhk', 
    label: 'BEYOND THE AI HYPE' 
  },
  { 
    type: 'video', 
    top: '45%', 
    left: '40%', 
    src: 'assets/logo/Logo4.gif'
  },
  { 
    type: 'text', 
    top: '55%', 
    left: '30%', 
    paragraph: `Every product reaches a moment when its foundation begins to strain under the weight of growth.

For Intercom, we encountered this moment when it became clear that our information architecture (IA) – the framework that organizes how features, settings, and workflows fit together – was struggling to keep pace with the development of our product.

It wasn't broken, but it wasn't serving our users anymore. Workflows were harder to locate, settings were scattered and confusing, and some navigation labels left users unsure of where to go.`, 
    link: 'https://www.intercom.com/blog/design',
    label: 'DESIGNING FOR CLARITY'
  },
  { 
    type: 'text', 
    top: '78%', 
    left: '32%', 
    paragraph: 'FOLLOW US ON TWITTER', 
    link: 'https://twitter.com/intercom',
    label: `A new age of UX: 
Evolving your design approach for AI products`
  },
  { 
    type: 'folder', 
    top: '38%', 
    left: '32%', 
    title: 'CAREERS', 
    content: 'Join our design team!...',
    label: 'RNDM'
  },
  { 
    type: 'folder', 
    top: '30%', 
    left: '63%', 
    title: 'BLOG', 
    content: 'Read our latest articles...',
    label: 'TEXTS'
  },
  { 
    type: 'folder', 
    top: '80%', 
    left: '80%', 
    title: 'PODCASTS', 
    content: 'Listen to our podcasts...',
    label: 'AUDIO'
  }
];

// Initialize minimap
let minimap;

// Handle wheel scroll with easing using GSAP
function handleWheel(event) {
  event.preventDefault();
  event.stopPropagation();

  if (Math.abs(event.deltaX) < 1 && Math.abs(event.deltaY) < 1) return;

  const deltaX = -event.deltaX * 9;
  const deltaY = -event.deltaY * 9;

  const { width, height } = calculateCanvasDimensions();
  const borderLeft = window.innerWidth - width;
  const borderTop = window.innerHeight - height;

  scrollTween.x = Math.min(0, Math.max(offsetX + deltaX, borderLeft));
  scrollTween.y = Math.min(0, Math.max(offsetY + deltaY, borderTop));

  gsap.to(canvas, {
    duration: 0.8,
    ease: 'expo.out',
    x: scrollTween.x,
    y: scrollTween.y,
    onUpdate: () => {
      offsetX = gsap.getProperty(canvas, 'x');
      offsetY = gsap.getProperty(canvas, 'y');
    }
  });
}

// Initialize canvas and content
function init() {
  initializeCards();
  updateCanvasSize();
  initializeMenuAnimations();

  const rect = canvas.getBoundingClientRect();
  offsetX = -rect.width / 2 + window.innerWidth / 2;
  offsetY = -rect.height / 2 + window.innerHeight / 2;

  gsap.set(canvas, { x: offsetX, y: offsetY });

  // Add event listeners
  canvasContainer.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('resize', () => {
    updateCanvasSize();
    // Recenter canvas after resize
    const { width, height } = calculateCanvasDimensions();
    const centerX = (window.innerWidth - width) / 2;
    const centerY = (window.innerHeight - height) / 2;
    gsap.to(canvas, {
      duration: 0.5,
      ease: 'power2.out',
      x: centerX,
      y: centerY,
      onUpdate: () => {
        offsetX = gsap.getProperty(canvas, 'x');
        offsetY = gsap.getProperty(canvas, 'y');
      }
    });
  });

  /* Grid illumination event listeners
   * These handle the cursor-based grid pattern reveal effect
   */
  // Track cursor movement to update the grid circle position
  canvasContainer.addEventListener('mousemove', handleCursorMove);
  // Show grid when cursor enters the canvas
  canvasContainer.addEventListener('mouseenter', () => canvas.classList.add('illuminated'));
  // Hide grid when cursor leaves the canvas
  canvasContainer.addEventListener('mouseleave', () => canvas.classList.remove('illuminated'));
}

/* Handle cursor movement for grid illumination
 * Updates the CSS variables that control the position of the grid circle
 * These variables are used by the clip-path in CSS
 */
function handleCursorMove(event) {
  // Get the position of the cursor relative to the canvas
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Update CSS variables that control the circle position
  // These are used by the clip-path in the CSS
  canvas.style.setProperty('--cursor-x', `${x}px`);
  canvas.style.setProperty('--cursor-y', `${y}px`);
}

function addCornerOverlay(cardElement) {
  const overlay = document.createElement('div');
  overlay.className = 'card-corner-overlay';
  overlay.style.transform = 'scale(0.8)';
  overlay.style.borderColor = 'var(--grid-color, rgba(255,255,255,0.4))';
  cardElement.appendChild(overlay);

  // Animate overlay on card hover
  cardElement.addEventListener('mouseenter', () => {
    gsap.to(overlay, {
      scale: 1,
      borderColor: 'rgba(255,255,255,0.8)',
      duration: 0.8,
      ease: 'expo.out',
      overwrite: true
    });
  });
  cardElement.addEventListener('mouseleave', () => {
    gsap.to(overlay, {
      scale: 0.8,
      borderColor: 'var(--grid-color, rgba(255,255,255,0.4))',
      duration: 0.8,
      ease: 'expo.in',
      overwrite: true
    });
  });
}

// Generate cards
function initializeCards() {
  const modal = createModal();
  const totalCards = cards.length;
  let cardsAnimated = 0;

  cards.forEach((cardData, index) => {
    let card;
    switch (cardData.type) {
      case 'image': card = createImageCard(cardData); break;
      case 'youtube': card = createYoutubeCard(cardData); break;
      case 'spotify': card = createSpotifyCard(cardData); break;
      case 'text': card = createTextCard(cardData); break;
      case 'folder': card = createFolderCard(cardData, modal); break;
      case 'video': card = createVideoCard(cardData); break;
    }
    if (card) {
      // Find the .card element inside the wrapper
      const cardElement = card.querySelector('.card');
      if (cardElement && cardData.type !== 'folder') {
        addCornerOverlay(cardElement);
      }
      card.style.top = cardData.top;
      card.style.left = cardData.left;
      if (cardData.id) card.id = cardData.id;
      
      // Set initial state for animation
      gsap.set(card, {
        scale: 0.8,
        opacity: 0,
        filter: 'blur(10px)'
      });
      
      canvas.appendChild(card);
      
      // Animate each card with a stagger effect
      gsap.to(card, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        delay: index * 0.08,
        ease: "power2.out",
        onComplete: () => {
          cardsAnimated++;
          
          // Initialize minimap after all cards are animated
          if (cardsAnimated === totalCards) {
            minimap = new Minimap(canvasContainer, canvas, cards);
            
            // Set initial state for minimap
            gsap.set(minimap.minimap, {
              opacity: 0,
              scale: 0.95,
              filter: 'blur(10px)'
            });
            
            // Animate minimap appearance
            gsap.to(minimap.minimap, {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: "power2.out",
              onStart: () => {
                minimap.renderCards();
              }
            });
          }

          // Add hover animation after initial appearance (skip for video cards)
          if (cardData.type !== 'video') {
            card.addEventListener('mouseenter', () => {
              gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
              });
            });
            
            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
              });
            });
          }
        }
      });
    }
  });
}

// Add menu animations
function initializeMenuAnimations() {
  const menuLinks = document.querySelectorAll('.menu-center a');
  
  menuLinks.forEach(link => {
    // Initial state
    gsap.set(link, {
      opacity: 1
    });
  });

  // Active indicator animation
  const activeIndicator = document.querySelector('.active-indicator');
  if (activeIndicator) {
    gsap.to(activeIndicator, {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }
}

// Start app
init();

// Update cursor position for grid mask
document.addEventListener('mousemove', (e) => {
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    canvas.style.setProperty('--cursor-x', `${x}%`);
    canvas.style.setProperty('--cursor-y', `${y}%`);
});

// Show notifications with a delay
setTimeout(() => {
    notifications.show('We are hiring!');
}, 1000);

setTimeout(() => {
    notifications.show('Join us in the BFY event in London');
}, 3000);

setTimeout(() => {
    notifications.show('We are hiring!');
}, 5000);
