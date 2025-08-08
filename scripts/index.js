// Header scroll behavior - hide on scroll down, show on scroll up
let lastScrollTop = 0;
let header = null;

document.addEventListener('DOMContentLoaded', function() {
    header = document.querySelector('.header__unUser');
    
    if (header) {
        // Initially ensure header is visible
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease-in-out';
    }
});

window.addEventListener('scroll', function() {
    if (!header) return;
    
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down and past 100px - hide header
        header.style.transform = 'translateY(-100%)';
    } else if (scrollTop < lastScrollTop) {
        // Scrolling up - show header
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// Ensure header shows when at top of page
window.addEventListener('scroll', function() {
    if (!header) return;
    
    if (window.pageYOffset === 0) {
        header.style.transform = 'translateY(0)';
    }
});
