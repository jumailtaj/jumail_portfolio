/* ================================================================
   ⚡ JUMAIL TAJ — PORTFOLIO JAVASCRIPT
   ================================================================
   File: script.js
   Description: All interactive behavior for the portfolio
   Features:
     1. Sticky navbar with scroll effect
     2. Mobile hamburger menu toggle
     3. Typing animation in Hero section
     4. Fade-in animation using Intersection Observer
     5. Scroll-to-top button
   ================================================================ */


/* ----------------------------------------------------------------
   📌 STEP 1: Grab elements from the HTML
   These are the elements we'll control with JavaScript
---------------------------------------------------------------- */
const navbar       = document.getElementById('navbar');        // The nav bar
const hamburger    = document.getElementById('hamburger');     // Hamburger button
const navLinks     = document.getElementById('navLinks');      // Nav links list
const roleText     = document.getElementById('roleText');      // Typing text
const scrollTopBtn = document.getElementById('scrollTopBtn'); // Scroll-to-top button


/* ----------------------------------------------------------------
   📌 STEP 2: Sticky Navbar
   When user scrolls past 60px, add "scrolled" class to navbar
   The "scrolled" class adds a dark background (see CSS)
---------------------------------------------------------------- */
window.addEventListener('scroll', function () {

  // Check scroll position
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');   // Dark background appears
  } else {
    navbar.classList.remove('scrolled'); // Back to transparent
  }

  // Also show/hide the scroll-to-top button
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');   // Button fades in
  } else {
    scrollTopBtn.classList.remove('visible'); // Button hides
  }

});


/* ----------------------------------------------------------------
   📌 STEP 3: Hamburger Menu (Mobile only)
   When hamburger button is clicked, toggle the nav links open/closed
---------------------------------------------------------------- */
hamburger.addEventListener('click', function () {
  // Toggle "open" class on nav links (CSS handles the animation)
  navLinks.classList.toggle('open');
});

// Also close the menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open'); // Close the mobile menu
  });
});


/* ----------------------------------------------------------------
   📌 STEP 4: Typing Animation in Hero Section
   This cycles through different role titles like a typewriter
---------------------------------------------------------------- */

// List of roles to display
const roles = [
  'Fullstack Developer',
  'ML Enthusiast',
  'React Developer',
  'API Builder',
  'UI/UX Designer',
  'Python Coder',
];

let currentRoleIndex = 0; // Which role are we showing right now?
let currentCharIndex  = 0; // How many characters have been "typed"?
let isDeleting        = false; // Are we erasing or typing?

function typeEffect() {

  // Get the current role string
  const currentRole = roles[currentRoleIndex];

  if (isDeleting) {
    // ✏️ Erasing mode: remove one character
    roleText.textContent = currentRole.slice(0, currentCharIndex - 1);
    currentCharIndex--;
  } else {
    // ✏️ Typing mode: add one character
    roleText.textContent = currentRole.slice(0, currentCharIndex + 1);
    currentCharIndex++;
  }

  // Decide the speed of typing/erasing
  let speed = isDeleting ? 60 : 110; // Erasing is faster than typing

  // When we've finished typing the full word...
  if (!isDeleting && currentCharIndex === currentRole.length) {
    speed = 1800;       // Pause for 1.8 seconds before erasing
    isDeleting = true;
  }

  // When we've erased the whole word...
  if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    // Move to the next role (loop back to 0 if at end)
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    speed = 400; // Small pause before typing next word
  }

  // Call this function again after "speed" milliseconds
  setTimeout(typeEffect, speed);
}

// Start the typing animation after a short delay
setTimeout(typeEffect, 800);


/* ----------------------------------------------------------------
   📌 STEP 5: Fade-In Animation using Intersection Observer
   Elements with class "fade-in" will animate when they scroll
   into the viewport (the visible area of the page)
---------------------------------------------------------------- */

// Grab all elements that should fade in
const fadeElements = document.querySelectorAll('.fade-in');

// Create an "observer" that watches when elements enter the screen
const observer = new IntersectionObserver(

  function (entries) {
    entries.forEach(function (entry) {

      // If the element is now visible on screen...
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Add "visible" class (CSS animates it)
        observer.unobserve(entry.target);      // Stop watching (animate only once)
      }

    });
  },

  {
    threshold: 0.1, // Trigger when 10% of the element is visible
  }

);

// Tell the observer to watch each fade-in element
fadeElements.forEach(function (el) {
  observer.observe(el);
});


/* ----------------------------------------------------------------
   📌 STEP 6: Scroll to Top Button
   When button is clicked, smoothly scroll back to the top
---------------------------------------------------------------- */
scrollTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scroll instead of instant jump
  });
});


/* ----------------------------------------------------------------
   📌 STEP 7: Add staggered delay to skill cards
   This makes the cards appear one after another (cascade effect)
---------------------------------------------------------------- */
document.querySelectorAll('.skill-card').forEach(function (card, index) {
  // Add a small delay to each card based on its position
  card.style.transitionDelay = (index * 0.05) + 's';
});

document.querySelectorAll('.project-card').forEach(function (card, index) {
  card.style.transitionDelay = (index * 0.1) + 's';
});

document.querySelectorAll('.service-card').forEach(function (card, index) {
  card.style.transitionDelay = (index * 0.1) + 's';
});


/* ================================================================
   🎉 That's it! The website is fully interactive.
   
   HOW TO CUSTOMIZE THIS FILE:
   ──────────────────────────
   - Change the roles array to update the typing animation titles
   - Adjust the typing speeds (speed values) to make it faster/slower
   - The Intersection Observer threshold (0.1) controls when 
     elements fade in — 0.1 = 10% visible, 0.5 = 50% visible

   HOW TO RUN THIS WEBSITE:
   ──────────────────────────
   Option 1 (Simple): Just open index.html in your browser!
   Option 2 (Server): 
     1. Install Node.js from nodejs.org
     2. Run: npm install -g live-server
     3. In the folder: live-server
     4. Opens at http://localhost:8080

   HOW TO DEPLOY:
   ──────────────────────────
   - Drag and drop all 3 files to Netlify.com (free!)
   - Or push to GitHub and connect to Vercel.com (free!)
================================================================ */
