document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    let slideTimeout = null;
    const slideDelay = 2000;
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    
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
    
    // Menu toggle functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = document.querySelector('.close-btn');
    
    function toggleMenu() {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Toggle hamburger animation
        const spans = hamburger.getElementsByTagName('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
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
    
    // Initialize menu functionality if elements exist
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMenu);
        if (closeBtn) {
            closeBtn.addEventListener('click', toggleMenu);
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
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