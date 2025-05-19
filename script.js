// Import card modules
import { createImageCard } from './cards/imageCard.js';
import { createYoutubeCard } from './cards/youtubeCard.js';
import { createSpotifyCard } from './cards/spotifyCard.js';
import { createTextCard } from './cards/textCard.js';
import { createFolderCard } from './cards/folderCard.js';
import { createModal } from './utils/createModal.js';
import { Minimap } from './utils/minimap.js';
// import gsap from 'gsap';

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
    top: '0%', 
    left: '0%', 
    src: 'https://picsum.photos/400/300?random=1', 
    link: 'https://www.intercom.com/design', 
    label: 'DESIGN SYSTEM' 
  },
  { 
    type: 'image', 
    top: '8%', 
    left: '52%', 
    src: 'https://picsum.photos/400/300?random=2', 
    link: 'https://www.intercom.com/blog', 
    label: 'BLOG POST' 
  },
  { 
    type: 'image', 
    top: '65%', 
    left: '10%', 
    src: 'https://picsum.photos/400/300?random=3', 
    link: 'https://www.intercom.com/careers', 
    label: 'CAREERS' 
  },
  { 
    type: 'image', 
    top: '75%', 
    left: '82%', 
    src: 'https://picsum.photos/400/300?random=4', 
    link: 'https://www.intercom.com/podcast', 
    label: 'PODCAST' 
  },
  { 
    type: 'youtube', 
    top: '12%', 
    left: '22%', 
    embedId: 'I8hMPj3AD34', 
    label: 'FEATURED VIDEO' 
  },
  { 
    type: 'youtube', 
    top: '35%', 
    left: '82%', 
    embedId: 'jNQXAC9IVRw', 
    label: 'PRODUCT WALKTHROUGH' 
  },
  { 
    type: 'spotify', 
    top: '30%', 
    left: '30%', 
    embedId: 'show/5QhB5qCYiPxbRzaeaN44Bk', 
    label: 'DESIGN PODCAST' 
  },
  { 
    type: 'spotify', 
    top: '48%', 
    left: '52%', 
    embedId: 'show/5QhB5qCYiPxbRzaeaN44Bk', 
    label: 'PRODUCT PODCAST' 
  },
  { 
    type: 'text', 
    top: '45%', 
    left: '42%', 
    text: 'Intercom Design', 
    link: 'https://www.intercom.com/design-system',
    id: 'logo' 
  },
  { 
    type: 'text', 
    top: '55%', 
    left: '62%', 
    text: 'DESIGN BLOG', 
    link: 'https://www.intercom.com/blog/design' 
  },
  { 
    type: 'text', 
    top: '62%', 
    left: '30%', 
    text: 'FOLLOW US ON TWITTER', 
    link: 'https://twitter.com/intercom' 
  },
  { 
    type: 'folder', 
    top: '2%', 
    left: '82%', 
    title: 'DESIGN DIGEST', 
    content: 'Our monthly design newsletter...' 
  },
  { 
    type: 'folder', 
    top: '38%', 
    left: '32%', 
    title: 'CAREERS', 
    content: 'Join our design team!...' 
  },
  { 
    type: 'folder', 
    top: '30%', 
    left: '63%', 
    title: 'BLOG', 
    content: 'Read our latest articles...' 
  },
  { 
    type: 'folder', 
    top: '80%', 
    left: '80%', 
    title: 'PODCASTS', 
    content: 'Listen to our podcasts...' 
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
    }
    if (card) {
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

          // Add hover animation after initial appearance
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
      });
    }
  });
}

// Start app
init();
