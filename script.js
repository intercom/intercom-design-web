// Import card modules
import { createImageCard } from './cards/imageCard.js';
import { createYoutubeCard } from './cards/youtubeCard.js';
import { createSpotifyCard } from './cards/spotifyCard.js';
import { createTextCard } from './cards/textCard.js';
import { createFolderCard } from './cards/folderCard.js';
import { createModal } from './utils/createModal.js';

// Get DOM elements
const canvas = document.getElementById('canvas');
const canvasContainer = document.getElementById('canvas-container');

// Canvas movement variables
let scrollX = 0;
let scrollY = 0;
let targetX = 0;
let targetY = 0;
let isAnimating = false;

// Define movement boundaries
const MAX_MOVEMENT = 300; // Maximum pixels the canvas can move in any direction

// Card data
const cards = [
    // Image Cards
    { 
        type: 'image', 
        top: '5%', 
        left: '5%', 
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

    // YouTube Cards
    { 
        type: 'youtube', 
        top: '12%', 
        left: '22%', 
        embedId: 'dQw4w9WgXcQ', 
        label: 'DESIGN TALK' 
    },
    { 
        type: 'youtube', 
        top: '35%', 
        left: '82%', 
        embedId: 'jNQXAC9IVRw', 
        label: 'PRODUCT WALKTHROUGH' 
    },

    // Spotify Cards
    { 
        type: 'spotify', 
        top: '22%', 
        left: '30%', 
        embedId: 'show/5QhB5qCYiPxbRzaeaN44Bk', 
        label: 'DESIGN PODCAST' 
    },
    { 
        type: 'spotify', 
        top: '42%', 
        left: '52%', 
        embedId: 'show/5QhB5qCYiPxbRzaeaN44Bk', 
        label: 'PRODUCT PODCAST' 
    },

    // Text Cards
    { 
        type: 'text', 
        top: '28%', 
        left: '10%', 
        text: 'DESIGN SYSTEM DOCS', 
        link: 'https://www.intercom.com/design-system' 
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

    // Folder Cards
    { 
        type: 'folder', 
        top: '2%', 
        left: '82%', 
        title: 'DESIGN DIGEST', 
        content: 'Our monthly design newsletter featuring the latest updates, case studies, and design tips from the Intercom design team.' 
    },
    { 
        type: 'folder', 
        top: '38%', 
        left: '32%', 
        title: 'CAREERS', 
        content: 'Join our design team! We\'re always looking for talented designers to help us build the future of customer communication.' 
    },
    { 
        type: 'folder', 
        top: '30%', 
        left: '63%', 
        title: 'BLOG', 
        content: 'Read our latest articles about design, product development, and customer communication.' 
    },
    { 
        type: 'folder', 
        top: '52%', 
        left: '42%', 
        title: 'PODCASTS', 
        content: 'Listen to our podcasts about design, product development, and customer communication.' 
    }
];

// Initialize modal
const modal = createModal();

// Create and append cards
function initializeCards() {
    cards.forEach(cardData => {
        let card;
        switch (cardData.type) {
            case 'image':
                card = createImageCard(cardData);
                break;
            case 'youtube':
                card = createYoutubeCard(cardData);
                break;
            case 'spotify':
                card = createSpotifyCard(cardData);
                break;
            case 'text':
                card = createTextCard(cardData);
                break;
            case 'folder':
                card = createFolderCard(cardData, modal);
                break;
        }
        if (card) {
            card.style.top = cardData.top;
            card.style.left = cardData.left;
            canvas.appendChild(card);
        }
    });
}

// Handle scroll events
function handleScroll() {
    const scrollLeft = canvasContainer.scrollLeft;
    const scrollTop = canvasContainer.scrollTop;
    
    // Calculate target position (opposite direction of scroll)
    // Clamp the movement within boundaries
    targetX = Math.max(-MAX_MOVEMENT, Math.min(MAX_MOVEMENT, -scrollLeft));
    targetY = Math.max(-MAX_MOVEMENT, Math.min(MAX_MOVEMENT, -scrollTop));
    
    // Start animation if not already running
    if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(animate);
    }
}

// Animation function
function animate() {
    // Smoothly interpolate current position to target position
    scrollX += (targetX - scrollX) * 0.1;
    scrollY += (targetY - scrollY) * 0.1;

    // Calculate boundaries
    const minX = Math.min(0, window.innerWidth - 3600);
    const maxX = 0;
    const minY = Math.min(0, window.innerHeight - 2200);
    const maxY = 0;

    // Clamp the values so the canvas never scrolls past its edges
    const clampedX = Math.max(minX, Math.min(scrollX, maxX));
    const clampedY = Math.max(minY, Math.min(scrollY, maxY));

    // Apply transform
    canvas.style.transform = `translate(${clampedX}px, ${clampedY}px)`;

    // Continue animation if still moving
    if (Math.abs(targetX - scrollX) > 0.1 || Math.abs(targetY - scrollY) > 0.1) {
        requestAnimationFrame(animate);
    } else {
        isAnimating = false;
    }
}

// Initialize
function init() {
    // Calculate the center position
    const centerX = (3600 - window.innerWidth) / 2;
    const centerY = (2200 - window.innerHeight) / 2;
    
    // Set initial scroll position to center
    canvasContainer.scrollLeft = centerX;
    canvasContainer.scrollTop = centerY;

    // Add scroll event listener
    canvasContainer.addEventListener('scroll', handleScroll);

    // Create cards
    initializeCards();
}

// Start the application
init(); 