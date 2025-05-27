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
import { createBlockQuoteCard } from './cards/blockQuoteCard.js';
import { scrambleOnHover, resetToOriginal } from './utils/textScramble.js';

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
    src: 'assets/images/img3.png', 
    link: 'https://www.intercom.com/design', 
    label: '' 
  },
  { 
    type: 'image', 
    top: '20%', 
    left: '38%', 
    src: 'assets/images/img1.png', 
    link: 'https://www.intercom.com/blog', 
    label: '',
  },
  { 
    type: 'image', 
    top: '32%', 
    left: '20%', 
    src: 'assets/images/img2.png', 
    link: 'https://www.intercom.com/careers', 
    label: '' 
  },
  { 
    type: 'image', 
    top: '75%', 
    left: '82%', 
    src: 'assets/images/img2.png', 
    link: 'https://www.intercom.com/podcast', 
    label: '' 
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
    top: '69%', 
    left: '63%', 
    embedId: 'cnhUspTS4YU', 
    label: 'Built For You: April 2024 Broadcast' 
  },
  { 
    type: 'youtube', 
    top: '80%', 
    left: '74%', 
    embedId: 'rc1WGS8QNeI', 
    label: 'How to design standout products in an AI world' 
  },
  { 
    type: 'spotify', 
    top: '28%', 
    left: '74%', 
    embedId: 'episode/5F4PfFZhgVnPWlNJedKj4n', 
    label: 'WHY ANTHROPIC CHOSE FIN',
    colourful: false
  },
  { 
    type: 'spotify', 
    top: '20%', 
    left: '78%', 
    embedId: 'episode/6JJx8dpieFuAmzayEbJdYs', 
    label: 'NAVIGATING AI-FIRST CUSTOMER SERVICE', 
    colourful: false
  },
  { 
    type: 'spotify', 
    top: '36%', 
    left: '78%', 
    embedId: '4fxGDCRdLwO1Zs7YQm8YMz', 
    label: 'A day in the life of a conversation designer',
    colourful: false
  },
  { 
    type: 'text', 
    top: '45%', 
    left: '40%', 
    paragraph: 'INTERCOM DESIGN',
    link: 'https://www.intercom.com/design',
    label: '',
    isCenter: true
  },
  { 
    type: 'text', 
    top: '55%', 
    left: '32%', 
    paragraph: `Every product reaches a moment when its foundation begins to strain under the weight of growth.

For Intercom, we encountered this moment when it became clear that our information architecture (IA) – the framework that organizes how features, settings, and workflows fit together – was struggling to keep pace with the development of our product.`, 
    link: 'https://www.intercom.com/blog/designing-for-clarity-restructuring-intercoms-information-architecture/',
    label: 'DESIGNING FOR CLARITY',
    accent: 'accent-blue'
  },
  
  { 
    type: 'text', 
    top: '63%', 
    left: '18%', 
    paragraph: `Before ChatGPT rolled onto the scene a year ago, artificial intelligence (AI) and machine learning (ML) were the mysterious tools of experts and data scientists – teams with a lot of niche experience and specialized domain knowledge. Now, things are different.

You're probably reading this because your company has decided to use OpenAI's GPT or another LLM (large language model) to build generative AI features into your product.`, 
    link: 'https://www.intercom.com/blog/design-ux-machine-learning-ai/',
    label: `A new age of UX: 
Evolving your design approach for AI products`,
    accent: 'accent-lime'
  },

  { 
    type: 'text', 
    top: '75%', 
    left: '38%', 
    paragraph: `AI is no longer a distant promise—it's here, and it's changing everything. From customer support to product design, the AI revolution is reshaping how we work, interact, and innovate. Are you ready to pioneer the future?`, 
    link: 'https://www.intercom.com/blog/videos/pioneer-this-is-getting-real-ai-revolution/',
    label: 'This is getting real: Welcome to the AI revolution',
    accent: 'accent-orchid'
  },

  { 
    type: 'folder', 
    top: '38%', 
    left: '34%', 
    title: 'IDEAS', 
    content: 'FIN.AI Ideas.',
    label: 'IDEAS'
  },
  { 
    type: 'folder', 
    top: '55%', 
    left: '24%', 
    title: 'TEXTS', 
    content: 'Read our latest articles...',
    label: 'TEXTS'
  },
  { 
    type: 'folder', 
    top: '47%', 
    left: '62%', 
    title: 'TALKS & EVENTS', 
    content: 'Listen to our podcasts...',
    label: 'TALKS & EVENTS'
  },
  {
    type: 'blockquote',
    top: '52%',
    left: '12%',
    text: 'Most portfolios look great. But they rarely tell us how someone actually thinks and works. That\'s the gap we\'re trying to close.',
    highlight: 'how someone actually thinks and works.',
    highlightColor: 'accent-gold',
    link: 'https://www.intercom.com/blog/videos/pioneer-this-is-getting-real-ai-revolution/',
    label: 'READ MORE'
  },
  {
    type: 'blockquote',
    top: '58%',
    left: '75%',
    text: 'Most portfolios look great. But they rarely tell us how someone actually thinks and works. That\'s the gap we\'re trying to close.',
    highlight: 'how someone actually thinks and works.',
    highlightColor: 'accent-green',
    link: 'https://www.intercom.com/blog/videos/pioneer-this-is-getting-real-ai-revolution/',
    label: 'READ MORE'
  },
  {
    type: 'blockquote',
    top: '30%',
    left: '60%',
    text: `I was going to title this 'Why can\'t we let self-driving cars kill anyone?' but I thought that might be a bit too much.`,
    highlight: 'Why can\'t we let self-driving cars kill anyone?',
    highlightColor: 'accent-orchid',
    link: 'https://www.intercom.com/blog/videos/pioneer-this-is-getting-real-ai-revolution/',
    label: 'READ MORE'
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
      case 'blockquote': card = createBlockQuoteCard(cardData); break;
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
}

// Start app
init();

// Update cursor position for grid mask
document.addEventListener('mousemove', (e) => {
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    canvas.style.setProperty('--cursor-x', `${x}px`);
    canvas.style.setProperty('--cursor-y', `${y}px`);
});

// Show notifications with a delay
setTimeout(() => {
    notifications.show('We are hiring!');
}, 1000);

setTimeout(() => {
    notifications.show('Join us in the BFY event in London');
}, 3000);