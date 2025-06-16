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
import { createLogoCard } from './cards/logoCard.js';
import { scrambleOnHover, resetToOriginal } from './utils/textScrambleSimple.js';

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

// Drag navigation state
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragStartOffsetX = 0;
let dragStartOffsetY = 0;

// Canvas dimensions - now responsive
const MIN_CANVAS_WIDTH = 4320;
const MIN_CANVAS_HEIGHT = 2640;
const ASPECT_RATIO = MIN_CANVAS_WIDTH / MIN_CANVAS_HEIGHT;

// Function to calculate responsive canvas dimensions
function calculateCanvasDimensions() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isMobile = viewportWidth <= 600;
  
  // Calculate base dimensions (2x viewport)
  let width = viewportWidth * 2;
  let height = width / ASPECT_RATIO;
  
  // Ensure minimum dimensions
  width = Math.max(width, MIN_CANVAS_WIDTH);
  height = Math.max(height, MIN_CANVAS_HEIGHT);
  
  // Scale down for mobile
  if (isMobile) {
    width *= 0.8;
    height *= 0.8;
  }
  
  // Debug scaling information
  console.log('🔍 Scaling Debug Info:', {
    environment: location.hostname.includes('github') ? 'Production (GitHub Pages)' : 'Local',
    viewportWidth,
    viewportHeight,
    devicePixelRatio: window.devicePixelRatio,
    isMobile,
    calculatedWidth: width,
    calculatedHeight: height,
    aspectRatio: ASPECT_RATIO,
    userAgent: navigator.userAgent.split(' ').slice(-2).join(' '), // Browser info
    baseURL: location.origin + location.pathname
  });
  
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
    top: '2%', 
    left: '67%', 
    src: 'assets/images/img4.jpg', 
    link: '', 
    label: '' 
  },
  { 
    type: 'image', 
    top: '83%', 
    left: '55%', 
    src: 'assets/images/img5.jpg', 
    link: '', 
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
    top: '80%', 
    left: '76%', 
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
    type: 'logo', 
    top: '45%', 
    left: '44%', 
    text: 'INTERCOM DESIGN',
    modalTitle: 'About Intercom Design',
    modalContent: `
      <p>Our mission has always been to help our customers provide incredible customer experiences.</p>
      <p>We've been building bots and customer service tools for years—but AI has changed everything.<br>
      We believe AI Agents will do the vast majority of customer service, and soon.<br>
      Fin, our AI Agent is the best performing, most widely adopted, and highest grossing AI service agent on the market.</p>
      <p>We are shaping the future of how businesses communicate with their customers.</p>
    `
  },
  { 
    type: 'text', 
    top: '52%', 
    left: '12%', 
    paragraph: `Every product reaches a moment when its foundation begins to strain under the weight of growth.

For Intercom, we encountered this moment when it became clear that our information architecture (IA) – the framework that organizes how features, settings, and workflows fit together – was struggling to keep pace with the development of our product.`, 
    link: 'https://www.intercom.com/blog/designing-for-clarity-restructuring-intercoms-information-architecture/',
    label: 'DESIGNING FOR CLARITY',
    accent: 'accent-blue'
  },
  
  { 
    type: 'text', 
    top: '68%', 
    left: '22%', 
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
    title: 'AI IDEAS', 
    content: 'AI Ideas.',
    label: 'AI IDEAS',
    folderId: 'ai-ideas'
  },
  { 
    type: 'folder', 
    top: '55%', 
    left: '24%', 
    title: 'ARTICLES', 
    content: 'Read our latest articles...',
    label: 'ARTICLES'
  },
  { 
    type: 'folder', 
    top: '47%', 
    left: '62%', 
    title: 'VIDEOS', 
    content: 'Watch our latest videos...',
    label: 'VIDEOS'
  },
  {
    type: 'folder',
    top: '15%',
    left: '60%',
    title: 'PODCASTS',
    content: 'Listen to our podcasts...',
    label: 'PODCASTS',
    folderId: 'podcasts'
  },
  {
    type: 'blockquote',
    top: '54%',
    left: '32%',
    text: "AI isn\'t killing design, it's making it matter more. And the companies that get that? They\'re not scaling back their design teams. They\'re expecting more from them. And giving them more power in return.",
    highlight: "AI isn\'t killing design, it's making it matter more.",
    highlightColor: 'accent-gold',
    link: 'https://verifiedinsider.substack.com/p/design-at-intercom',
    label: 'READ MORE'
  },
  {
    type: 'blockquote',
    top: '58%',
    left: '75%',
    text: 'You can feel the shape of what\'s coming - even if the tools are still clunky, the future is clearly starting to boot up.',
    highlight: 'the future is clearly starting to boot up',
    highlightColor: 'accent-green',
    link: 'https://thoughtwax.com/2025/03/terminal-velocity/',
    label: 'READ MORE'
  },
  {
    type: 'blockquote',
    top: '30%',
    left: '60%',
    text: 'I was going to title this \'Why can\'t we let self-driving cars kill anyone?\' but I thought that might be a bit too much.',
    highlight: 'Why can\'t we let self-driving cars kill anyone?',
    highlightColor: 'accent-orchid',
    link: 'https://fin.ai/ideas/why-do-we-expect-our-ai-products-to-be-flawless/',
    label: 'READ MORE'
  },
  { 
    type: 'video',
    top: '69%',
    left: '63%',
    src: 'assets/videos/hero-loop.mp4',
    label: 'Built For You 2025',
    link: 'https://bfy.fin.ai/'
  },
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

// Handle touch events for mobile
function handleTouchStart(event) {
  event.preventDefault();
  const touch = event.touches[0];
  const startX = touch.clientX;
  const startY = touch.clientY;
  
  function handleTouchMove(moveEvent) {
    moveEvent.preventDefault();
    const touch = moveEvent.touches[0];
    const deltaX = startX - touch.clientX;
    const deltaY = startY - touch.clientY;
    
    const { width, height } = calculateCanvasDimensions();
    const borderLeft = window.innerWidth - width;
    const borderTop = window.innerHeight - height;
    
    scrollTween.x = Math.min(0, Math.max(offsetX + deltaX, borderLeft));
    scrollTween.y = Math.min(0, Math.max(offsetY + deltaY, borderTop));
    
    gsap.to(canvas, {
      duration: 0.3,
      ease: 'power2.out',
      x: scrollTween.x,
      y: scrollTween.y,
      onUpdate: () => {
        offsetX = gsap.getProperty(canvas, 'x');
        offsetY = gsap.getProperty(canvas, 'y');
      }
    });
  }
  
  function handleTouchEnd() {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  }
  
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);
}

// Handle drag navigation
function handleMouseDown(event) {
  // Don't start drag if clicking on a card or interactive element
  if (event.target.closest('.card') || event.target.closest('.modal') || event.target.closest('.minimap')) {
    return;
  }
  
  event.preventDefault();
  isDragging = true;
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  dragStartOffsetX = offsetX;
  dragStartOffsetY = offsetY;
  
  // Change cursor to grabbing
  canvasContainer.style.cursor = 'grabbing';
}

function handleMouseMove(event) {
  if (!isDragging) return;
  
  event.preventDefault();
  const deltaX = event.clientX - dragStartX;
  const deltaY = event.clientY - dragStartY;
  
  const { width, height } = calculateCanvasDimensions();
  const borderLeft = window.innerWidth - width;
  const borderTop = window.innerHeight - height;
  
  scrollTween.x = Math.min(0, Math.max(dragStartOffsetX + deltaX, borderLeft));
  scrollTween.y = Math.min(0, Math.max(dragStartOffsetY + deltaY, borderTop));
  
  gsap.to(canvas, {
    duration: 0.1,
    ease: 'power2.out',
    x: scrollTween.x,
    y: scrollTween.y,
    onUpdate: () => {
      offsetX = gsap.getProperty(canvas, 'x');
      offsetY = gsap.getProperty(canvas, 'y');
    }
  });
}

function handleMouseUp(event) {
  if (!isDragging) return;
  
  isDragging = false;
  canvasContainer.style.cursor = 'default';
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
  
  // Add drag navigation event listeners
  canvasContainer.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  
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

  // Add touch event listeners
  canvasContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
  
  // Update minimap for mobile
  if (window.innerWidth <= 600) {
    const minimapElement = document.querySelector('.minimap');
    if (minimapElement) {
      minimapElement.style.transform = 'scale(0.7)';
      minimapElement.style.right = '10px';
      minimapElement.style.bottom = '10px';
    }
  }
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
      case 'logo': card = createLogoCard(cardData, modal); break;
    }
    if (card) {
      // Find the .card element inside the wrapper
      const cardElement = card.querySelector('.card');
      // Only add corner overlay to logo card
      if (cardElement && cardData.type === 'logo') {
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

    // Add scramble animation
    const text = link.textContent.trim();
    link.addEventListener('mouseenter', () => {
      scrambleOnHover(link, text);
    });
    link.addEventListener('mouseleave', () => {
      resetToOriginal(link, text);
    });

    // Add click handler for design link
    if (link.getAttribute('href') === '#design') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        // Center the canvas
        const canvasWidth = canvas.offsetWidth;
        const canvasHeight = canvas.offsetHeight;
        const containerWidth = canvasContainer.offsetWidth;
        const containerHeight = canvasContainer.offsetHeight;
        
        const targetX = (canvasWidth - containerWidth) / 2;
        const targetY = (canvasHeight - containerHeight) / 2;
        
        gsap.to(canvas, {
          x: -targetX,
          y: -targetY,
          duration: 1,
          ease: "power2.inOut"
        });
      });
    }
  });
}

// Start app
init();

// Font loading debug for GitHub Pages
document.fonts.ready.then(() => {
  console.log('All fonts loaded');
  document.fonts.forEach(font => {
    console.log(`Font loaded: ${font.family} ${font.weight} ${font.style}`);
  });
});

// Check if MediumLLSub font is available with standard weight values
document.fonts.load('normal 16px MediumLLSub').then(() => {
  console.log('MediumLLSub Regular loaded successfully');
}).catch(err => {
  console.error('MediumLLSub Regular failed to load:', err);
});

document.fonts.load('bold 16px MediumLLSub').then(() => {
  console.log('MediumLLSub Bold loaded successfully');
}).catch(err => {
  console.error('MediumLLSub Bold failed to load:', err);
});

// Force create a test element to trigger font loading
const testElement = document.createElement('div');
testElement.style.fontFamily = 'MediumLLSub, sans-serif';
testElement.style.position = 'absolute';
testElement.style.left = '-9999px';
testElement.style.fontSize = '16px';
testElement.textContent = 'Test MediumLLSub Font Loading';
document.body.appendChild(testElement);

// Check computed styles to see what font is actually being used
setTimeout(() => {
  const computedStyle = window.getComputedStyle(testElement);
  console.log('🔤 Font Debug Info:', {
    environment: location.hostname.includes('github') ? 'Production' : 'Local',
    requestedFont: 'MediumLLSub, sans-serif',
    actualFont: computedStyle.fontFamily,
    fontSize: computedStyle.fontSize,
    fontWeight: computedStyle.fontWeight,
    textWidth: testElement.offsetWidth,
    textHeight: testElement.offsetHeight
  });
  document.body.removeChild(testElement);
}, 200);

// Debug CSS custom properties
setTimeout(() => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  console.log('🎨 CSS Variables Debug:', {
    environment: location.hostname.includes('github') ? 'Production' : 'Local',
    fontSans: rootStyles.getPropertyValue('--font-sans').trim(),
    fontSansBold: rootStyles.getPropertyValue('--font-sans-bold').trim(),
    text7xl: rootStyles.getPropertyValue('--text-7xl').trim(),
    foregroundPrimary: rootStyles.getPropertyValue('--foreground-primary').trim()
  });
}, 300);

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
    notifications.show('We are hiring!', 'https://example.com');
}, 1000);

setTimeout(() => {
    notifications.show('Join us in the BFY event in London', 'https://example.com');
}, 3000);