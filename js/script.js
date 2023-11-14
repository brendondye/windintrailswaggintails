document.addEventListener("DOMContentLoaded", function() { // Run the script when the page finishes loading
    
    // --- Handling testimonial transitions
    let testimonies = document.querySelectorAll(".testimony"); // Grab the testimony elements
    let currentTestimony = 0; // Initialize a counter
    let testimonialList = document.querySelector(".testimonial-list"); 
    let upArrow = document.querySelector(".up-arrow") // Grab the up arrow button
    let downArrow = document.querySelector(".down-arrow")
    
    function scrollTestimonies(direction) { // Define a function
        testimonies[currentTestimony].classList.remove("active"); // Remove active class from current testimony
        if (direction === "up") {
            currentTestimony = (currentTestimony +1) % testimonies.length;
        } else if (direction === "down") {
            currentTestimony = (currentTestimony - 1 + testimonies.length) % testimonies.length;
        }
        testimonies[currentTestimony].classList.add("active"); // Add active class to new testimony
        testimonialList.style.transform = "translateY(-${currentTestimony * 100}%)"; // Update the transform property based on the active testimony index
    }
    
    upArrow.addEventListener("click", function() {
        scrollTestimonies("up");
    });

    downArrow.addEventListener("click", function() {
        scrollTestimonies("down");
    });

    scrollTestimonies();
});



// --- Image Gallery Functionality
document.addEventListener("DOMContentLoaded", (event) => {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    function showSlide(index) {
      const offset = index * -100; // Each slide is 100% of the width
      const slidesElement = document.querySelector('.slides');
      slidesElement.style.transform = `translateX(${offset}%)`;
      // Update is-active class for the new active slide
      document.querySelector('.slide.is-active').classList.remove('is-active');
      slides[index].classList.add('is-active');
      currentSlide = index;
    }
  
    function showNextSlide() {
      let nextSlideIndex = (currentSlide + 1) % slides.length;
      showSlide(nextSlideIndex);
    }
  
    function showPrevSlide() {
      let prevSlideIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevSlideIndex);
    }
  
    // Attach event listeners to buttons
    document.querySelector('.arrow-next').addEventListener('click', showNextSlide);
    document.querySelector('.arrow-prev').addEventListener('click', showPrevSlide);
  
    // Initialize the slideshow by showing first slide
    showSlide(0);
  }); 