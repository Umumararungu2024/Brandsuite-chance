document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    let slideTimeout = null;
    const slideDelay = 2000;

    const slideshowContainer = document.querySelector('.slideshow-container');

    function showSlides() {
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";


        slideTimeout = setTimeout(showSlides, slideDelay);
    }

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = document.querySelector('.close-btn');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearTimeout(slideTimeout);
        });

        slideshowContainer.addEventListener('mouseleave', () => {
            slideTimeout = setTimeout(showSlides, slideDelay);
        });

        showSlides();
    }

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