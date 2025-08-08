// Index User JavaScript - Para usuarios registrados
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentUser = {
        name: 'Usuario',
        status: 'online',
        favorites: JSON.parse(localStorage.getItem('user_favorites') || '[]'),
        messages: JSON.parse(localStorage.getItem('user_messages') || '[]')
    };

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

    // Status management
    setupStatusButtons();
    
    // Search functionality
    setupSearch();
    
    // Product interactions
    setupProductInteractions();

    // Quick message functionality
    setupQuickMessage();

    // Help modal
    setupHelpModal();

    // Welcome notification for users
    setTimeout(() => {
        showUserWelcome();
    }, 1000);
});

// Configurar botones de estado
function setupStatusButtons() {
    const statusBtns = document.querySelectorAll('.status-btn');
    statusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover active de todos
            statusBtns.forEach(b => b.classList.remove('active'));
            // Agregar active al clickeado
            this.classList.add('active');
            
            const status = this.dataset.status;
            currentUser.status = status;
            
            // Guardar en localStorage
            localStorage.setItem('user_status', status);
            
            // Mostrar notificación
            showNotification(`Estado cambiado a: ${this.textContent}`, 'success');
            
            // Actualizar UI según el estado
            updateUserStatusUI(status);
        });
    });

    // Cargar estado guardado
    const savedStatus = localStorage.getItem('user_status');
    if (savedStatus) {
        const btn = document.querySelector(`[data-status="${savedStatus}"]`);
        if (btn) btn.click();
    }
}

// Actualizar UI según el estado del usuario
function updateUserStatusUI(status) {
    const header = document.querySelector('.header__user');
    
    // Cambiar color del header según el estado
    switch(status) {
        case 'online':
            header.style.borderBottom = '3px solid #4caf50';
            break;
        case 'away':
            header.style.borderBottom = '3px solid #ff9800';
            break;
        case 'busy':
            header.style.borderBottom = '3px solid #f44336';
            break;
    }
}

// Configurar funcionalidad de búsqueda
function setupSearch() {
    const searchInput = document.querySelector('.search__bar input');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase().trim();
            
            if (query.length > 0) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            } else {
                clearSearch();
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.toLowerCase().trim();
                if (query.length > 0) {
                    performSearch(query);
                }
            }
        });
    }
}

// Realizar búsqueda
function performSearch(query) {
    const productos = document.querySelectorAll('.producto');
    let foundResults = 0;
    
    productos.forEach(producto => {
        const nombre = producto.querySelector('h3').textContent.toLowerCase();
        const nacionalidad = producto.querySelector('.nacionalidad span').textContent.toLowerCase();
        
        if (nombre.includes(query) || nacionalidad.includes(query)) {
            producto.style.display = 'block';
            producto.style.opacity = '1';
            foundResults++;
            
            // Highlight del resultado
            producto.style.border = '2px solid #9c27b0';
            producto.style.boxShadow = '0 8px 25px rgba(156, 39, 176, 0.4)';
        } else {
            producto.style.opacity = '0.3';
            producto.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            producto.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }
    });

    // Mostrar resultado de búsqueda
    showNotification(`Se encontraron ${foundResults} resultado(s) para "${query}"`, 'info');
}

// Limpiar búsqueda
function clearSearch() {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        producto.style.display = 'block';
        producto.style.opacity = '1';
        producto.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        producto.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    });
}

// Configurar interacciones con productos
function setupProductInteractions() {
    const productos = document.querySelectorAll('.producto');
    
    productos.forEach(producto => {
        // Hover effects
        producto.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 30px rgba(156, 39, 176, 0.3)';
            
            const overlay = this.querySelector('.producto-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }
        });

        producto.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            
            const overlay = this.querySelector('.producto-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(20px)';
            }
        });

        // Quick actions
        const quickMessageBtn = producto.querySelector('.quick-message');
        const favoriteBtn = producto.querySelector('.add-favorite');

        if (quickMessageBtn) {
            quickMessageBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const userName = producto.querySelector('h3').textContent;
                openQuickMessage(userName, producto);
            });
        }

        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleFavorite(producto);
            });
        }
    });
}

// Ir al perfil del usuario
function goToProfile(category, id) {
    // En una app real, aquí se cargarían los datos específicos del usuario
    localStorage.setItem('selected_user', JSON.stringify({
        category: category,
        id: id,
        timestamp: Date.now()
    }));
    
    showNotification('Cargando perfil...', 'info');
    
    // Simular carga y redirección
    setTimeout(() => {
        window.location.href = 'profile_test.html';
    }, 800);
}

// Toggle favorito
function toggleFavorite(producto) {
    const userName = producto.querySelector('h3').textContent;
    const favoriteBtn = producto.querySelector('.add-favorite');
    
    if (currentUser.favorites.includes(userName)) {
        // Remover de favoritos
        currentUser.favorites = currentUser.favorites.filter(name => name !== userName);
        favoriteBtn.textContent = '💖 Favorito';
        favoriteBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        showNotification(`${userName} removido de favoritos`, 'info');
    } else {
        // Agregar a favoritos
        currentUser.favorites.push(userName);
        favoriteBtn.textContent = '❤️ Favorito';
        favoriteBtn.style.background = 'rgba(244, 67, 54, 0.2)';
        showNotification(`${userName} agregado a favoritos`, 'success');
    }
    
    // Guardar en localStorage
    localStorage.setItem('user_favorites', JSON.stringify(currentUser.favorites));
    
    // Animación
    favoriteBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        favoriteBtn.style.transform = 'scale(1)';
    }, 200);
}

// Configurar mensaje rápido
function setupQuickMessage() {
    // Los event listeners ya están configurados en setupProductInteractions
}

// Abrir modal de mensaje rápido
function openQuickMessage(userName, producto) {
    const modal = document.getElementById('quickMessageModal');
    const userNameEl = document.getElementById('messageUserName');
    const userAvatarEl = document.getElementById('messageUserAvatar');
    const userStatusEl = document.getElementById('messageUserStatus');
    
    // Rellenar información del usuario
    userNameEl.textContent = userName;
    userAvatarEl.src = `https://via.placeholder.com/50/6f42c1/ffffff?text=${userName.charAt(0)}`;
    
    // Estado basado en la clase del producto
    const estadoEl = producto.querySelector('.estado__actividad');
    if (estadoEl.classList.contains('online')) {
        userStatusEl.textContent = '🟢 En línea';
        userStatusEl.className = 'status-indicator online';
    } else if (estadoEl.classList.contains('away')) {
        userStatusEl.textContent = '🟡 Ausente';
        userStatusEl.className = 'status-indicator away';
    } else {
        userStatusEl.textContent = '⚫ Desconectado';
        userStatusEl.className = 'status-indicator offline';
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Enfocar textarea
    setTimeout(() => {
        document.getElementById('quickMessageText').focus();
    }, 300);
}

// Cerrar modal de mensaje rápido
function closeQuickMessage() {
    const modal = document.getElementById('quickMessageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Limpiar formulario
    document.getElementById('quickMessageText').value = '';
}

// Establecer template de mensaje
function setTemplate(template) {
    document.getElementById('quickMessageText').value = template;
}

// Enviar mensaje rápido
function sendQuickMessage() {
    const messageText = document.getElementById('quickMessageText').value.trim();
    const userName = document.getElementById('messageUserName').textContent;
    
    if (messageText) {
        // Simular envío
        const message = {
            to: userName,
            text: messageText,
            timestamp: Date.now(),
            status: 'sent'
        };
        
        currentUser.messages.push(message);
        localStorage.setItem('user_messages', JSON.stringify(currentUser.messages));
        
        showNotification(`Mensaje enviado a ${userName}`, 'success');
        closeQuickMessage();
        
        // En una app real, aquí se enviaría el mensaje al servidor
    } else {
        showNotification('Por favor escribe un mensaje', 'error');
    }
}

// Configurar modal de ayuda
function setupHelpModal() {
    // Event listeners manejados por las funciones globales
}

// Mostrar ayuda
function showHelp() {
    const modal = document.getElementById('helpModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Cerrar ayuda
function closeHelp() {
    const modal = document.getElementById('helpModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modales al hacer click fuera
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        if (e.target.id === 'quickMessageModal') {
            closeQuickMessage();
        } else if (e.target.id === 'helpModal') {
            closeHelp();
        }
    }
});

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Mostrar bienvenida de usuario
function showUserWelcome() {
    const userName = localStorage.getItem('user_name') || 'Usuario';
    const lastLogin = localStorage.getItem('last_login');
    
    let welcomeMessage = `¡Hola ${userName}! 👋`;
    if (lastLogin) {
        const loginDate = new Date(lastLogin);
        const now = new Date();
        const diffHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
        
        if (diffHours < 24) {
            welcomeMessage += ` Bienvenido de vuelta`;
        } else {
            welcomeMessage += ` Ha pasado tiempo, ¡hay mucho nuevo contenido!`;
        }
    }
    
    showNotification(welcomeMessage, 'success');
    
    // Guardar login actual
    localStorage.setItem('last_login', new Date().toISOString());
}

// Analytics para usuarios registrados
function trackUserAction(action, data = {}) {
    const analyticsData = {
        action: action,
        user_status: currentUser.status,
        timestamp: Date.now(),
        ...data
    };
    
    // En una app real, se enviaría al servidor
    console.log('User Analytics:', analyticsData);
}

// Track acciones del usuario
document.addEventListener('click', function(e) {
    if (e.target.closest('.producto')) {
        trackUserAction('product_view', {
            product: e.target.closest('.producto').querySelector('h3').textContent
        });
    }
    if (e.target.closest('.quick-message')) {
        trackUserAction('quick_message_open');
    }
    if (e.target.closest('.add-favorite')) {
        trackUserAction('favorite_toggle');
    }
});

// Inicializar estado de favoritos al cargar
function initializeFavorites() {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        const userName = producto.querySelector('h3').textContent;
        const favoriteBtn = producto.querySelector('.add-favorite');
        
        if (currentUser.favorites.includes(userName) && favoriteBtn) {
            favoriteBtn.textContent = '❤️ Favorito';
            favoriteBtn.style.background = 'rgba(244, 67, 54, 0.2)';
        }
    });
}

// Ejecutar inicialización después de que se cargue el DOM
setTimeout(initializeFavorites, 500);
