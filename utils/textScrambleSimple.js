// Simple text scramble animation utility
const scrambleChars = "!@#$%^&*()_+[]{}";
const scrambleDurationPerChar = 400;
const stagger = 30;
const frameRate = 45;

function getRandomChar() {
  return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
}

let scrambleIntervals = [];

export function scrambleOnHover(el, text) {
  // clear previous intervals
  scrambleIntervals.forEach(clearInterval);
  scrambleIntervals = [];

  // Check if this is the central text (by checking font size)
  const isCentralText = window.getComputedStyle(el).fontSize.includes('clamp');
  
  // Adjust timing for central text
  const duration = isCentralText ? 1200 : scrambleDurationPerChar;
  const charStagger = isCentralText ? 80 : stagger;
  const frameTiming = isCentralText ? 80 : frameRate;

  // Create a wrapper to maintain text properties
  const wrapper = document.createElement('span');
  wrapper.style.display = 'inline-block';
  wrapper.style.fontFamily = window.getComputedStyle(el).fontFamily;
  wrapper.style.fontSize = window.getComputedStyle(el).fontSize;
  wrapper.style.fontWeight = window.getComputedStyle(el).fontWeight;
  wrapper.style.letterSpacing = window.getComputedStyle(el).letterSpacing;
  wrapper.style.textTransform = window.getComputedStyle(el).textTransform;

  wrapper.innerHTML = text
    .split("")
    .map((char, index) =>
      char === " "
        ? " "
        : `<span data-final="${char}">${char}</span>`
    )
    .join("");

  // Replace the element's content with our wrapper
  el.textContent = '';
  el.appendChild(wrapper);

  const spans = wrapper.querySelectorAll("span");

  spans.forEach((span, index) => {
    const delay = index * charStagger;

    setTimeout(() => {
      const interval = setInterval(() => {
        const randomChar = getRandomChar();
        span.textContent = randomChar;
      }, frameTiming);

      scrambleIntervals.push(interval);

      setTimeout(() => {
        clearInterval(interval);
        span.textContent = span.dataset.final;
      }, duration);
    }, delay);
  });
}

export function resetToOriginal(el, originalText) {
  scrambleIntervals.forEach(clearInterval);
  scrambleIntervals = [];
  el.textContent = originalText;
} 