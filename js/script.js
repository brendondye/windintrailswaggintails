
let testimonialList = document.querySelector('.testimonial-list');
let testimonies = document.querySelectorAll('.testimony'); 
let currentTestimony = 0;
let heightOfTallestTestimony = 0;

let upArrow = document.querySelector('.up-arrow');
let downArrow = document.querySelector('.down-arrow');

function setMinHeightForTestimonials() {
  // Find height of tallest testimony
  testimonies.forEach(function(testimony) {
    heightOfTallestTestimony = Math.max(heightOfTallestTestimony, testimony.offsetHeight);
  });

  // Set testimony list's height = to tallest testimony
  testimonialList.style.minHeight = `${heightOfTallestTestimony}px`;
}

document.addEventListener('DOMContentLoaded', function() { // Run the script when the page finishes loading
    // Handle testimony navigation
    function scrollTestimonies(direction) { 
        testimonies[currentTestimony].classList.remove('active'); // Remove active class from current testimony
        testimonies[currentTestimony].setAttribute('aria-hidden', 'true');
        if (direction === 'up') {
            currentTestimony = (currentTestimony + 1) % testimonies.length;
        } else if (direction === 'down') {
            currentTestimony = (currentTestimony - 1 + testimonies.length) % testimonies.length;
        }
        testimonies[currentTestimony].classList.add('active'); // Add active class to new testimony
        testimonies[currentTestimony].setAttribute('aria-hidden', 'false');
    }
    
    upArrow.addEventListener('click', function() {
        scrollTestimonies('up');
    });

    downArrow.addEventListener('click', function() {
        scrollTestimonies('down');
    });

    scrollTestimonies();
    setMinHeightForTestimonials();
});

// Readjust min height for testimonies upon window resizing
window.addEventListener('resize', setMinHeightForTestimonials);

//// --- Functionalize image Gallery 
// Determine width of gallery
const slidesContainer = document.querySelector('.slideshow-container');
const slideWidth = slidesContainer.clientWidth;

// Determine number of images
let slides = document.querySelectorAll('.slide-wrapper');
let totalSlides = slides.length; 

// Grab buttons
const prevArrow = document.getElementById('prevArrow');
const nextArrow = document.getElementById('nextArrow');

// Create, identify, and place clones
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
firstClone.id = 'firstClone';
lastClone.id = 'lastClone';
slidesContainer.appendChild(firstClone);
slidesContainer.prepend(lastClone);

let currentSlide = 1; // Begin at 1 because of the beginning clone

const moveToSlide = (slideIndex) => {
  slidesContainer.style.transition = 'transform 0.5s ease-in-out';
  slidesContainer.style.transform = `translateX(${-slideWidth * slideIndex}px)`;
}

// Prevent initial transition upon page load
const moveToSlideWithoutTransition = (slideIndex) => {
  slidesContainer.style.transition = 'none'; // Disable transition
  slidesContainer.style.transform = `translateX(${-slideWidth * slideIndex}px)`;

  // Use setTimeout to re-enable the transition after the browser has had time to apply the transform property
  setTimeout(() => {
    slidesContainer.style.transition = 'transform 0.5s ease-in-out';
  }, 0);
};

// Requery slides to include clones
slides = document.querySelectorAll('.slide-wrapper');

// Manage accessibility for screen readers
const updateAriaHidden = () => {
  slides.forEach((slide, index) => {
    const isCurrentSlide = index === currentSlide;
    slide.setAttribute('aria-hidden', !isCurrentSlide);
  });
};

moveToSlideWithoutTransition(currentSlide);
updateAriaHidden();

const nextSlide = () => {
  if (currentSlide >= totalSlides + 1) return; // Allow transition end event listener to handle the loop if on first clone
  currentSlide++;
  moveToSlide(currentSlide);
  updateAriaHidden();
}

const prevSlide = () => {
  if (currentSlide <= 0) return; 
  currentSlide--;
  moveToSlide(currentSlide);
  updateAriaHidden();
}

slidesContainer.addEventListener('transitionend', () => {
  const slides = document.querySelectorAll('.slide-wrapper');
  const totalSlides = slides.length;

  if (slides[currentSlide].id === 'firstClone') {
    slidesContainer.style.transition = 'none';
    currentSlide = 1;
    slidesContainer.style.transform = `translateX(${-slideWidth * currentSlide}px)`
  } else if (slides[currentSlide].id === 'lastClone') {
    slidesContainer.style.transition = 'none';
    currentSlide = totalSlides - 2;
    slidesContainer.style.transform = `translateX(${-slideWidth * currentSlide}px)`
  };
});

prevArrow.addEventListener('click', prevSlide);
nextArrow.addEventListener('click', nextSlide);

// -- Animate sections on scroll
/*
function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function checkScroll() {
  document.querySelectorAll('.will-animate').forEach(element => {
    if (isInView(element)) {
      element.classList.remove('will-animate');
      element.classList.add('in-view');
    } else {
      element.classList.remove('in-view');
      element.classList.add('will-animate');
    }
  });
} 

window.addEventListener('scroll', checkScroll);
*/

document.addEventListener('DOMContentLoaded', function() {
  // Add intersection observer function
  const floatUpObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('float-up-visible');
          }
      });
  }, {
      root: null, // Use the viewport as bounding box
      rootMargin: '0px', // Trigger the intersection at the bottom of the page
  });

  // Grab elements to be floated up
  const floatUpElements = document.querySelectorAll('.float-up-hidden');
  floatUpElements.forEach(floatUpElement => {
      floatUpObserver.observe(floatUpElement); // Slide in the element
  });
}); 