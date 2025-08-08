// Index UnUser JavaScript - Para visitantes no registrados
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll behavior
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        header.style.transform = 'translateY(0)';
        
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else if (scrollTop < lastScrollTop || scrollTop <= 50) {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search__bar input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            showLoginPrompt();
            this.blur();
        });
    }

    // Funcionalidad de búsqueda simulada
    function simulateSearch() {
        showLoginPrompt();
    }

    // Agregar event listeners a todos los productos
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        producto.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(156, 39, 176, 0.3)';
        });

        producto.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
    });

    // Animación de entrada para productos
    function animateProducts() {
        const productos = document.querySelectorAll('.producto');
        productos.forEach((producto, index) => {
            producto.style.opacity = '0';
            producto.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                producto.style.transition = 'all 0.6s ease';
                producto.style.opacity = '1';
                producto.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Ejecutar animación después de cargar
    setTimeout(animateProducts, 300);

    // Notificación de bienvenida
    setTimeout(() => {
        showWelcomeNotification();
    }, 1000);
});

// Función para mostrar el prompt de login
function showLoginPrompt() {
    const modal = document.getElementById('loginPromptModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Animación de entrada
    const modalContent = modal.querySelector('.modal-login-prompt');
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease';
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 100);
}

// Función para cerrar el prompt de login
function closeLoginPrompt() {
    const modal = document.getElementById('loginPromptModal');
    const modalContent = modal.querySelector('.modal-login-prompt');
    
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('loginPromptModal');
    if (e.target === modal) {
        closeLoginPrompt();
    }
});

// Función para mostrar notificación de bienvenida
function showWelcomeNotification() {
    const notification = document.createElement('div');
    notification.className = 'welcome-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">👋</span>
            <div class="notification-text">
                <h4>¡Bienvenido!</h4>
                <p>Descubre contenido exclusivo registrándote gratis</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #9c27b0, #673ab7);
        color: white;
        padding: 0;
        border-radius: 12px;
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 8px 25px rgba(156, 39, 176, 0.3);
        overflow: hidden;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        padding: 15px;
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    notification.querySelector('.notification-icon').style.cssText = `
        font-size: 1.5em;
        flex-shrink: 0;
    `;
    
    notification.querySelector('.notification-text h4').style.cssText = `
        margin: 0 0 4px 0;
        font-size: 1em;
        font-weight: 600;
    `;
    
    notification.querySelector('.notification-text p').style.cssText = `
        margin: 0;
        font-size: 0.85em;
        opacity: 0.9;
    `;
    
    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2em;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
        flex-shrink: 0;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove después de 8 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 8000);
    
    // Hover effect en el botón de cerrar
    const closeBtn = notification.querySelector('button');
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'none';
    });
}

// Función para redirigir a registro con tracking
function goToRegister() {
    // En una app real, aquí se podría hacer tracking del origen
    localStorage.setItem('registration_source', 'homepage_modal');
    window.location.href = 'register.html';
}

// Función para redirigir a login con tracking
function goToLogin() {
    localStorage.setItem('login_source', 'homepage_modal');
    window.location.href = 'login.html';
}

// Lazy loading para imágenes
function setupLazyLoading() {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// Inicializar lazy loading si es compatible
if ('IntersectionObserver' in window) {
    setupLazyLoading();
}

// Analytics simulado para visitantes
function trackVisitorAction(action, category = 'unuser') {
    // En una app real, aquí se enviarían los datos a analytics
    console.log(`Analytics: ${category} - ${action}`);
}

// Track de visualización de página
trackVisitorAction('page_view');

// Track de intentos de interacción
document.addEventListener('click', function(e) {
    if (e.target.closest('.producto')) {
        trackVisitorAction('product_click_attempt');
    }
    if (e.target.closest('.search__bar')) {
        trackVisitorAction('search_attempt');
    }
});

// Función para animaciones suaves en scroll
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.catalogo__categoria');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        sectionObserver.observe(section);
    });
}

// Inicializar animaciones si es compatible
if ('IntersectionObserver' in window) {
    setupScrollAnimations();
}
