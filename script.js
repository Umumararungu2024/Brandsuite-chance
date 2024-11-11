document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    let slideTimeout = null;
    const slideDelay = 2000;
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    function toggleMenu() {
        const menu = document.getElementById('menu');
        menu.classList.toggle('active');
    }
    // Show a specific slide
    function showSlide(n) {
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");
        
        // Reset to first slide if we've gone past the end
        if (n > slides.length) {
            slideIndex = 1;
        }
        // Reset to last slide if we've gone before the first
        if (n < 1) {
            slideIndex = slides.length;
        }
        
        // Hide all slides first
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].style.opacity = "0";
            dots[i].className = dots[i].className.replace(" active", "");
        }
        
        // Show the current slide with fade effect
        slides[slideIndex-1].style.display = "block";
        setTimeout(() => {
            slides[slideIndex-1].style.opacity = "1";
        }, 10);
        dots[slideIndex-1].className += " active";
    }
    
    // Next/previous controls
    function moveSlide(n) {
        clearTimeout(slideTimeout);
        slideIndex += n;
        showSlide(slideIndex);
        slideTimeout = setTimeout(() => showSlides(), slideDelay);
    }
    
    // Automatic slideshow
    function showSlides() {
        moveSlide(1);
    }
    
    // Initialize event listeners for next/previous buttons
    const prevButtons = document.querySelectorAll('.prev');
    const nextButtons = document.querySelectorAll('.next');
    
    prevButtons.forEach(button => {
        button.addEventListener('click', () => moveSlide(-1));
    });
    
    nextButtons.forEach(button => {
        button.addEventListener('click', () => moveSlide(1));
    });
    
    // Initialize slideshow if container exists
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearTimeout(slideTimeout);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            slideTimeout = setTimeout(showSlides, slideDelay);
        });
        
        // Initialize first slide
        showSlide(slideIndex);
        slideTimeout = setTimeout(showSlides, slideDelay);
    }
    
    
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                if (navMenu && navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });
    
    // Feature items animation
    const featureItems = document.querySelectorAll('.features-item');
    if (featureItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        featureItems.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(item);
        });
    }
});


let currentSlide = 0;
const slider = document.getElementById('slider');
const sliderNav = document.getElementById('sliderNav');
const totalSlides = document.querySelectorAll('.slide').length;
let slideInterval;

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// Create navigation dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(i);
    sliderNav.appendChild(dot);
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 25}%)`;
    // Update navigation dots
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetInterval();
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 2000); // Change slide every 2 seconds
}

function resetInterval() {
    clearInterval(slideInterval);
    startSlideshow();
}

startSlideshow();

// Pause on hover
slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
slider.addEventListener('mouseleave', startSlideshow);

// Optional: Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetInterval();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetInterval();
    }
});

// Close the menu when a link is clicked
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('menu');
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
});