// Text scramble animation utility
const scrambleChars = "!@#$%^&*()_+[]{}";
const scrambleDurationPerChar = 400; // reduced from 400ms to 250ms
const stagger = 30; // reduced from 50ms to 30ms
const frameRate = 45; // changed to 45ms for more controlled character changes

// Theme accent colors
const accentColors = [
  'var(--accent-blue)',
  'var(--accent-orange)',
  'var(--accent-gold)',
  'var(--accent-orchid)',
  'var(--accent-slate)',
  'var(--accent-lime)',
  'var(--accent-green)',
  'var(--accent-coral)',
  'var(--accent-turquoise)',
  'var(--accent-sky)',
  'var(--accent-sage)',
  'var(--accent-cream)',
  'var(--accent-rose)',
  'var(--accent-purple)',
  'var(--accent-bright-blue)',
  'var(--accent-red)',
  'var(--accent-emerald)',
  'var(--accent-yellow)'
];

function getRandomChar() {
  return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
}

function getRandomAccentColor() {
  return accentColors[Math.floor(Math.random() * accentColors.length)];
}

let scrambleIntervals = [];

export function scrambleOnHover(el, text) {
  // clear previous intervals
  scrambleIntervals.forEach(clearInterval);
  scrambleIntervals = [];

  // Check if this is the central text (by checking font size)
  const isCentralText = window.getComputedStyle(el).fontSize.includes('clamp');
  
  // Adjust timing for central text
  const duration = isCentralText ? 1200 : scrambleDurationPerChar; // Much slower for central text
  const charStagger = isCentralText ? 80 : stagger; // More stagger for central text
  const frameTiming = isCentralText ? 80 : frameRate; // Slower frame rate for central text

  el.innerHTML = text
    .split("")
    .map((char, index) =>
      char === " "
        ? " "
        : `<span data-final="${char}" style="display:inline-block;">${char}</span>`
    )
    .join("");

  const spans = el.querySelectorAll("span");

  spans.forEach((span, index) => {
    const delay = index * charStagger;

    setTimeout(() => {
      const interval = setInterval(() => {
        const randomChar = getRandomChar();
        const bg = getRandomAccentColor();
        const color = getRandomAccentColor();

        span.textContent = randomChar;
        span.style.background = bg;
        span.style.color = color;
      }, frameTiming);

      scrambleIntervals.push(interval);

      setTimeout(() => {
        clearInterval(interval);
        span.textContent = span.dataset.final;
        span.style.background = "transparent";
        span.style.color = "inherit";
      }, duration);
    }, delay);
  });
}

export function resetToOriginal(el, originalText) {
  scrambleIntervals.forEach(clearInterval);
  scrambleIntervals = [];
  el.textContent = originalText;
} 