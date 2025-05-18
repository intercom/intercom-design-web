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

// Canvas dimensions
const CANVAS_WIDTH = 3600;
const CANVAS_HEIGHT = 2200;

// Card data
const cards = [
  { type: 'image', top: '0%', left: '0%', src: 'https://picsum.photos/400/300?random=1', link: 'https://www.intercom.com/design', label: 'DESIGN SYSTEM' },
  { type: 'image', top: '8%', left: '52%', src: 'https://picsum.photos/400/300?random=2', link: 'https://www.intercom.com/blog', label: 'BLOG POST' },
  { type: 'image', top: '65%', left: '10%', src: 'https://picsum.photos/400/300?random=3', link: 'https://www.intercom.com/careers', label: 'CAREERS' },
  { type: 'image', top: '75%', left: '82%', src: 'https://picsum.photos/400/300?random=4', link: 'https://www.intercom.com/podcast', label: 'PODCAST' },
  { type: 'youtube', top: '12%', left: '22%', embedId: 'I8hMPj3AD34', label: 'FEATURED VIDEO' },
  { type: 'youtube', top: '35%', left: '82%', embedId: 'jNQXAC9IVRw', label: 'PRODUCT WALKTHROUGH' },
  { type: 'spotify', top: '30%', left: '30%', embedId: 'show/5QhB5qCYiPxbRzaeaN44Bk', label: 'DESIGN PODCAST' },
  { type: 'spotify', top: '48%', left: '52%', embedId: 'show/5QhB5qCYiPxbRzaeaN44Bk', label: 'PRODUCT PODCAST' },
  { type: 'text', top: '28%', left: '10%', text: 'DESIGN SYSTEM DOCS', link: 'https://www.intercom.com/design-system' },
  { type: 'text', top: '55%', left: '62%', text: 'DESIGN BLOG', link: 'https://www.intercom.com/blog/design' },
  { type: 'text', top: '62%', left: '30%', text: 'FOLLOW US ON TWITTER', link: 'https://twitter.com/intercom' },
  { type: 'folder', top: '2%', left: '82%', title: 'DESIGN DIGEST', content: 'Our monthly design newsletter...' },
  { type: 'folder', top: '38%', left: '32%', title: 'CAREERS', content: 'Join our design team!...' },
  { type: 'folder', top: '30%', left: '63%', title: 'BLOG', content: 'Read our latest articles...' },
  { type: 'folder', top: '50%', left: '50%', title: 'PODCASTS', content: 'Listen to our podcasts...' }
];

// Initialize minimap
let minimap;

// Handle wheel scroll with easing using GSAP
function handleWheel(event) {
  // Prevent default browser behavior
  event.preventDefault();
  event.stopPropagation();

  // Only process if there's significant movement
  if (Math.abs(event.deltaX) < 1 && Math.abs(event.deltaY) < 1) return;

  const deltaX = event.deltaX * 6;
  const deltaY = event.deltaY * 6;

  const borderLeft = window.innerWidth - CANVAS_WIDTH;
  const borderTop = window.innerHeight - CANVAS_HEIGHT;

  scrollTween.x = Math.min(0, Math.max(offsetX + deltaX, borderLeft));
  scrollTween.y = Math.min(0, Math.max(offsetY + deltaY, borderTop));

  gsap.to(canvas, {
    duration: 0.8,
    ease: "expo.out",
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

  minimap = new Minimap(canvasContainer, canvas, cards);
  minimap.renderDots();

  const rect = canvas.getBoundingClientRect();
  offsetX = -rect.width / 2 + window.innerWidth / 2;
  offsetY = -rect.height / 2 + window.innerHeight / 2;

  gsap.set(canvas, { x: offsetX, y: offsetY });

  // Add wheel event listener with passive: false to ensure preventDefault works
  canvasContainer.addEventListener('wheel', handleWheel, { passive: false });
}

// Recenter button logic
const recenterBtn = document.getElementById('recenter-btn');
if (recenterBtn) {
  recenterBtn.addEventListener('click', () => {
    const centerX = (window.innerWidth - CANVAS_WIDTH) / 2;
    const centerY = (window.innerHeight - CANVAS_HEIGHT) / 2;
    gsap.to(canvas, {
      duration: 1,
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
  cards.forEach(cardData => {
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
      canvas.appendChild(card);
    }
  });
}

// Start app
init();
