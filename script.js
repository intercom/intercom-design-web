// Import card modules
import { createImageCard } from './cards/imageCard.js';
import { createYoutubeCard } from './cards/youtubeCard.js';
import { createSpotifyCard } from './cards/spotifyCard.js';
import { createTextCard } from './cards/textCard.js';
import { createFolderCard } from './cards/folderCard.js';
import { createVideoCard } from './cards/videoCard.js';
import { createModal } from './utils/createModal.js';
import { Minimap } from './utils/minimap.js';

import { createBlockQuoteCard } from './cards/blockQuoteCard.js';
import { createLogoCard, animateBylineIn } from './cards/logoCard.js';
import { scrambleOnHover, resetToOriginal } from './utils/textScrambleSimple.js';



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
    type: 'video',
    top: '25%',
    left: '19%',
    src: 'assets/videos/1_1.mp4',
    label: 'Intercom Brand Reel'
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
    top: '2%',
    left: '67%',
    src: 'assets/images/img4.png',
    link: '',
    label: '',
    originalSize: true
  },
  {
    type: 'image',
    top: '78%',
    left: '55%',
    src: 'assets/images/img5.png',
    link: '',
    label: ''
  },
  {
    type: 'youtube',
    top: '55%',
    left: '58%',
    embedId: 'rRljig2AS0g',
    label: "Transitioning into the next era of design"
  },
  { 
    type: 'youtube', 
    top: '75%', 
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
    left: '50%',
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
    top: '45%',
    left: '16%',
    paragraph: `When people evaluate AI, they don't compare it to how humans actually perform—they compare it to perfection. That's a standard humans rarely meet. We forgive human error, but even a single AI misstep can erode trust completely. This double standard means AI has to earn trust in ways humans don't.`,
    link: 'https://fin.ai/ideas/why-do-we-expect-our-ai-products-to-be-flawless/',
    label: 'Why do we expect our AI products to be flawless?',
    accent: 'accent-blue'
  },
  
  { 
    type: 'text', 
    top: '68%', 
    left: '10%', 
    paragraph: `Before ChatGPT rolled onto the scene a year ago, artificial intelligence (AI) and machine learning (ML) were the mysterious tools of experts and data scientists – teams with a lot of niche experience and specialized domain knowledge. Now, things are different.

You're probably reading this because your company has decided to use OpenAI's GPT or another LLM (large language model) to build generative AI features into your product.`, 
    link: 'https://www.intercom.com/blog/design-ux-machine-learning-ai/',
    label: `A new age of UX: 
Evolving your design approach for AI products`,
    accent: 'accent-lime'
  },

  { 
    type: 'text', 
    top: '58%', 
    left: '15%', 
    paragraph: `AI is no longer a distant promise—it's here, and it's changing everything. From customer support to product design, the AI revolution is reshaping how we work, interact, and innovate. Are you ready to pioneer the future?`, 
    link: 'https://www.intercom.com/blog/videos/pioneer-this-is-getting-real-ai-revolution/',
    label: 'This is getting real: Welcome to the AI revolution',
    accent: 'accent-orchid'
  },

  {
    type: 'folder',
    top: '40%',
    left: '32%',
    title: 'POSTS',
    content: 'Posts.',
    label: 'POSTS',
    folderId: 'posts'
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
    left: '30%',
    text: "AI isn\'t killing design, it's making it matter more. And the companies that get that? They\'re not scaling back their design teams. They\'re expecting more from them. And giving them more power in return.",
    highlight: "AI isn\'t killing design, it's making it matter more.",
    highlightColor: 'accent-gold',
    link: 'https://verifiedinsider.substack.com/p/design-at-intercom',
    label: 'READ MORE'
  },
  {
    type: 'blockquote',
    top: '62%',
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
    top: '48%',
    left: '83%',
    src: 'assets/videos/hero-loop.mp4',
    label: 'Built For You 2025',
    link: 'https://bfy.fin.ai/'
  },
  {
    type: 'video',
    top: '72%',
    left: '36%',
    src: 'assets/videos/2.mp4',
    label: 'Intercom Brand Showreel'
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

// Enhanced touch navigation for mobile - similar to mobile maps
let touchState = {
  isActive: false,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  velocityX: 0,
  velocityY: 0,
  startTime: 0,
  lastTime: 0,
  initialDistance: 0,
  scale: 1,
  minScale: 0.5,
  maxScale: 3,
  swipeThreshold: 30,
  swipeTimeout: 200,
  momentumThreshold: 0.3,
  momentumMultiplier: 150,
  dampingFactor: 0.95,
  maxVelocity: 5
};

// Handle touch events for mobile - map-like navigation
function handleTouchStart(event) {
  // Don't handle touch if it's on a card or interactive element
  if (event.target.closest('.card') || event.target.closest('.modal') || event.target.closest('.minimap')) {
    return;
  }

  event.preventDefault();
  const touch = event.touches[0];
  const now = Date.now();

  // Stop any ongoing animations for immediate response
  gsap.killTweensOf(canvas);

  touchState.isActive = true;
  touchState.startX = touchState.lastX = touch.clientX;
  touchState.startY = touchState.lastY = touch.clientY;
  touchState.startTime = touchState.lastTime = now;
  touchState.velocityX = touchState.velocityY = 0;

  // Handle pinch-to-zoom for multi-touch
  if (event.touches.length === 2) {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    touchState.initialDistance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  }

  // Add visual feedback for touch start
  canvasContainer.style.cursor = 'grabbing';
  canvas.style.transition = 'none';

  function handleTouchMove(moveEvent) {
    if (!touchState.isActive) return;
    moveEvent.preventDefault();

    const now = Date.now();
    const timeDelta = Math.max(now - touchState.lastTime, 1); // Prevent division by zero

    if (moveEvent.touches.length === 2) {
      // Handle pinch-to-zoom (foundation for future implementation)
      const touch1 = moveEvent.touches[0];
      const touch2 = moveEvent.touches[1];
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (touchState.initialDistance > 0) {
        const scaleChange = currentDistance / touchState.initialDistance;
        // Store scale for future zoom implementation
        touchState.scale = Math.min(touchState.maxScale, Math.max(touchState.minScale, touchState.scale * scaleChange));
      }
    } else {
      // Handle single-touch pan - immediate response like mobile maps
      const touch = moveEvent.touches[0];
      const deltaX = touch.clientX - touchState.lastX;
      const deltaY = touch.clientY - touchState.lastY;

      // Calculate velocity for momentum scrolling (pixels per millisecond)
      touchState.velocityX = deltaX / timeDelta;
      touchState.velocityY = deltaY / timeDelta;

      // Clamp velocity to prevent extreme values
      touchState.velocityX = Math.max(-touchState.maxVelocity, Math.min(touchState.maxVelocity, touchState.velocityX));
      touchState.velocityY = Math.max(-touchState.maxVelocity, Math.min(touchState.maxVelocity, touchState.velocityY));

      const { width, height } = calculateCanvasDimensions();
      const borderLeft = window.innerWidth - width;
      const borderTop = window.innerHeight - height;

      // Apply movement with boundary constraints
      const newX = Math.min(0, Math.max(offsetX + deltaX, borderLeft));
      const newY = Math.min(0, Math.max(offsetY + deltaY, borderTop));

      // Immediate response - no animation delay like mobile maps
      gsap.set(canvas, { x: newX, y: newY });

      offsetX = newX;
      offsetY = newY;
      scrollTween.x = newX;
      scrollTween.y = newY;

      touchState.lastX = touch.clientX;
      touchState.lastY = touch.clientY;
      touchState.lastTime = now;
    }
  }

  function handleTouchEnd() {
    if (!touchState.isActive) return;

    touchState.isActive = false;
    canvasContainer.style.cursor = '';
    canvas.style.transition = '';

    const now = Date.now();
    const touchDuration = now - touchState.startTime;
    const deltaX = touchState.startX - touchState.lastX;
    const deltaY = touchState.startY - touchState.lastY;
    const distance = Math.hypot(deltaX, deltaY);

    // Apply momentum scrolling like mobile maps
    const absVelX = Math.abs(touchState.velocityX);
    const absVelY = Math.abs(touchState.velocityY);

    if (absVelX > touchState.momentumThreshold || absVelY > touchState.momentumThreshold) {
      const { width, height } = calculateCanvasDimensions();
      const borderLeft = window.innerWidth - width;
      const borderTop = window.innerHeight - height;

      // Calculate momentum distance based on velocity
      const momentumX = touchState.velocityX * touchState.momentumMultiplier;
      const momentumY = touchState.velocityY * touchState.momentumMultiplier;

      const targetX = Math.min(0, Math.max(offsetX + momentumX, borderLeft));
      const targetY = Math.min(0, Math.max(offsetY + momentumY, borderTop));

      // Smooth deceleration animation like mobile maps
      gsap.to(canvas, {
        duration: Math.min(2, Math.max(0.8, (absVelX + absVelY) * 0.5)),
        ease: 'power2.out',
        x: targetX,
        y: targetY,
        onUpdate: () => {
          offsetX = gsap.getProperty(canvas, 'x');
          offsetY = gsap.getProperty(canvas, 'y');
          scrollTween.x = offsetX;
          scrollTween.y = offsetY;
        }
      });
    } else if (touchDuration < touchState.swipeTimeout && distance > touchState.swipeThreshold) {
      // Handle quick swipe gestures for navigation
      handleSwipeGesture(deltaX, deltaY);
    }

    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  }

  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchEnd);
}

// Handle swipe gestures for quick navigation - map-like behavior
function handleSwipeGesture(deltaX, deltaY) {
  const { width, height } = calculateCanvasDimensions();
  const borderLeft = window.innerWidth - width;
  const borderTop = window.innerHeight - height;

  // More responsive swipe movement
  const swipeMultiplier = 300;
  let targetX = offsetX;
  let targetY = offsetY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe - move in opposite direction of swipe
    targetX = Math.min(0, Math.max(offsetX - (deltaX > 0 ? swipeMultiplier : -swipeMultiplier), borderLeft));
  } else {
    // Vertical swipe - move in opposite direction of swipe
    targetY = Math.min(0, Math.max(offsetY - (deltaY > 0 ? swipeMultiplier : -swipeMultiplier), borderTop));
  }

  gsap.to(canvas, {
    duration: 0.5,
    ease: 'power2.out',
    x: targetX,
    y: targetY,
    onUpdate: () => {
      offsetX = gsap.getProperty(canvas, 'x');
      offsetY = gsap.getProperty(canvas, 'y');
      scrollTween.x = offsetX;
      scrollTween.y = offsetY;
    }
  });

  // Subtle haptic feedback for swipe
  if ('vibrate' in navigator) {
    navigator.vibrate(10);
  }
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

function handleMouseUp() {
  if (!isDragging) return;
  
  isDragging = false;
  canvasContainer.style.cursor = 'default';
}

// Initialize canvas and content
function init() {
  initializeCards();
  updateCanvasSize();
  initializeMenuAnimations();

  // Use consistent centering logic for initial load (same as resize handler)
  const { width, height } = calculateCanvasDimensions();
  offsetX = (window.innerWidth - width) / 2;
  offsetY = (window.innerHeight - height) / 2;

  gsap.set(canvas, { x: offsetX, y: offsetY });

  // Add event listeners
  canvasContainer.addEventListener('wheel', handleWheel, { passive: false });
  
  // Add drag navigation event listeners
  canvasContainer.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  
  // Handle window resize and orientation changes - important for mobile maps
  window.addEventListener('resize', () => {
    updateCanvasSize();

    // Stop any ongoing animations during resize for immediate response
    gsap.killTweensOf(canvas);

    // Recenter canvas after resize - immediate positioning for mobile
    const { width, height } = calculateCanvasDimensions();
    const centerX = (window.innerWidth - width) / 2;
    const centerY = (window.innerHeight - height) / 2;

    // Use immediate positioning on mobile, smooth animation on desktop
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      gsap.set(canvas, { x: centerX, y: centerY });
      offsetX = centerX;
      offsetY = centerY;
      scrollTween.x = centerX;
      scrollTween.y = centerY;
    } else {
      gsap.to(canvas, {
        duration: 0.5,
        ease: 'power2.out',
        x: centerX,
        y: centerY,
        onUpdate: () => {
          offsetX = gsap.getProperty(canvas, 'x');
          offsetY = gsap.getProperty(canvas, 'y');
          scrollTween.x = offsetX;
          scrollTween.y = offsetY;
        }
      });
    }

    // Handle minimap visibility for mobile
    const minimapElement = document.getElementById('minimap');

    if (minimapElement) {
      if (isMobile) {
        minimapElement.style.display = 'none';
        minimapElement.style.visibility = 'hidden';
        minimapElement.style.opacity = '0';
      } else {
        minimapElement.style.display = '';
        minimapElement.style.visibility = '';
        minimapElement.style.opacity = '';
      }
    }

    // Re-setup mobile navigation after orientation change
    setupMobileNavigation();
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
  
  // Enhanced mobile setup
  setupMobileNavigation();
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

// Setup mobile-specific navigation and controls - map-like experience
function setupMobileNavigation() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Hide minimap completely on mobile
    const minimapElement = document.getElementById('minimap');
    if (minimapElement) {
      minimapElement.style.display = 'none';
      minimapElement.style.visibility = 'hidden';
      minimapElement.style.opacity = '0';
    }

    // Enhanced mobile touch optimizations for map-like behavior
    document.body.style.touchAction = 'pan-x pan-y';
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.webkitTouchCallout = 'none';

    // Prevent default touch behaviors that interfere with navigation
    canvasContainer.style.touchAction = 'none';
    canvasContainer.style.webkitUserSelect = 'none';
    canvasContainer.style.webkitTouchCallout = 'none';

    // Prevent zoom on double tap - essential for map-like behavior
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);

    // Prevent context menu on long press
    canvasContainer.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    // Add subtle haptic feedback for touch interactions
    if ('vibrate' in navigator) {
      canvasContainer.addEventListener('touchstart', (e) => {
        // Only vibrate for canvas touches, not card touches
        if (!e.target.closest('.card') && !e.target.closest('.modal')) {
          navigator.vibrate(5); // Very subtle feedback
        }
      });
    }

    console.log('Mobile navigation setup complete - map-like touch controls enabled');
  } else {
    // Show minimap on desktop
    const minimapElement = document.getElementById('minimap');
    if (minimapElement) {
      minimapElement.style.display = '';
      minimapElement.style.visibility = '';
      minimapElement.style.opacity = '';
    }
  }
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
    let byline = null; // Track byline for logo cards

    switch (cardData.type) {
      case 'image': card = createImageCard(cardData); break;
      case 'youtube': card = createYoutubeCard(cardData); break;
      case 'spotify': card = createSpotifyCard(cardData); break;
      case 'text': card = createTextCard(cardData); break;
      case 'folder': card = createFolderCard(cardData, modal); break;
      case 'video': card = createVideoCard(cardData); break;
      case 'blockquote': card = createBlockQuoteCard(cardData); break;
      case 'logo':
        const logoResult = createLogoCard(cardData, modal);
        card = logoResult.wrapper;
        byline = logoResult.byline;
        break;
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

      // Set initial state for animation - all cards including video cards
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

          // If this is a logo card, animate the byline after the card animation
          if (cardData.type === 'logo' && byline) {
            animateBylineIn(byline, 0.3); // 0.3s delay after logo card completes
          }

          // Initialize minimap after all cards are animated
          if (cardsAnimated === totalCards) {
            minimap = new Minimap(canvasContainer, canvas, cards);

            // Make minimap globally accessible for image cards with original sizing
            window.minimap = minimap;

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

          // Add hover animation after initial appearance (skip for video cards and image cards)
          if (cardData.type !== 'video' && cardData.type !== 'image') {
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
        // Center the canvas using consistent logic
        const { width, height } = calculateCanvasDimensions();
        const centerX = (window.innerWidth - width) / 2;
        const centerY = (window.innerHeight - height) / 2;

        gsap.to(canvas, {
          x: centerX,
          y: centerY,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => {
            offsetX = gsap.getProperty(canvas, 'x');
            offsetY = gsap.getProperty(canvas, 'y');
          }
        });
      });
    }
  });
}

// Start app
init();



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

