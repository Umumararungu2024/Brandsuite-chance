
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = document.querySelector('.close-btn');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    hamburger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);

    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    const featureItems = document.querySelectorAll('.features-item');
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
});