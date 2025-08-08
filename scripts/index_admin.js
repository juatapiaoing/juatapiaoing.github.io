// Index Admin JavaScript - Para administradores
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales del admin
    let adminData = {
        name: 'Administrador',
        permissions: JSON.parse(localStorage.getItem('admin_permissions') || '["view", "edit", "delete", "manage"]'),
        stats: {
            totalUsers: 0,
            onlineUsers: 0,
            monthlyRevenue: 0,
            newSignups: 0
        }
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

    // Inicializar funcionalidades del admin
    setupAdminDashboard();
    setupUserManagement();
    setupBulkActions();
    setupReports();
    setupSystemSettings();
    setupAdvancedSearch();

    // Cargar estadísticas iniciales
    loadAdminStats();
    
    // Auto-refresh de estadísticas cada 30 segundos
    setInterval(loadAdminStats, 30000);
});

// Configurar dashboard del admin
function setupAdminDashboard() {
    updateDashboardStats();
    setupRealTimeUpdates();
    
    // Quick action buttons
    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.dataset.action;
            executeQuickAction(actionType);
        });
    });
}

// Actualizar estadísticas del dashboard
function updateDashboardStats() {
    // Simular carga de estadísticas
    adminData.stats = {
        totalUsers: Math.floor(Math.random() * 1000) + 500,
        onlineUsers: Math.floor(Math.random() * 100) + 50,
        monthlyRevenue: Math.floor(Math.random() * 50000) + 25000,
        newSignups: Math.floor(Math.random() * 50) + 10
    };

    // Actualizar UI
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
        statCards[0].querySelector('.stat-value').textContent = adminData.stats.totalUsers;
        statCards[1].querySelector('.stat-value').textContent = adminData.stats.onlineUsers;
        statCards[2].querySelector('.stat-value').textContent = `$${adminData.stats.monthlyRevenue.toLocaleString()}`;
        statCards[3].querySelector('.stat-value').textContent = adminData.stats.newSignups;
    }
}

// Configurar gestión de usuarios
function setupUserManagement() {
    const usuarios = document.querySelectorAll('.producto');
    
    usuarios.forEach(usuario => {
        // Hover effects específicos para admin
        usuario.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 30px rgba(156, 39, 176, 0.4)';
            
            const overlay = this.querySelector('.producto-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }
        });

        usuario.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            
            const overlay = this.querySelector('.producto-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(20px)';
            }
        });

        // Admin actions
        const viewDetailsBtn = usuario.querySelector('.view-details');
        const manageUserBtn = usuario.querySelector('.manage-user');
        const blockUserBtn = usuario.querySelector('.block-user');

        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                viewUserDetails(usuario);
            });
        }

        if (manageUserBtn) {
            manageUserBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openUserManagement(usuario);
            });
        }

        if (blockUserBtn) {
            blockUserBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleUserBlock(usuario);
            });
        }
    });
}

// Ver detalles del usuario
function viewUserDetails(usuario) {
    const userName = usuario.querySelector('h3').textContent;
    const modal = document.getElementById('userDetailsModal');
    
    // Poblar información del usuario
    document.getElementById('detailUserName').textContent = userName;
    document.getElementById('detailUserAvatar').src = `https://via.placeholder.com/80/6f42c1/ffffff?text=${userName.charAt(0)}`;
    
    // Generar datos simulados
    const userData = generateUserData(userName);
    populateUserDetails(userData);
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Track acción del admin
    trackAdminAction('view_user_details', { user: userName });
}

// Generar datos simulados del usuario
function generateUserData(userName) {
    const joinDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
    const lastLogin = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    
    return {
        name: userName,
        email: `${userName.toLowerCase().replace(' ', '.')}@email.com`,
        joinDate: joinDate.toLocaleDateString(),
        lastLogin: lastLogin.toLocaleDateString(),
        status: ['active', 'away', 'blocked'][Math.floor(Math.random() * 3)],
        totalConnections: Math.floor(Math.random() * 100) + 5,
        messagesReceived: Math.floor(Math.random() * 500) + 50,
        messagesSent: Math.floor(Math.random() * 300) + 30,
        profileViews: Math.floor(Math.random() * 1000) + 100,
        subscription: ['Basic', 'Premium', 'VIP'][Math.floor(Math.random() * 3)],
        country: ['España', 'México', 'Argentina', 'Colombia', 'Chile'][Math.floor(Math.random() * 5)]
    };
}

// Poblar detalles del usuario
function populateUserDetails(userData) {
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userJoinDate').textContent = userData.joinDate;
    document.getElementById('userLastLogin').textContent = userData.lastLogin;
    document.getElementById('userStatus').textContent = userData.status;
    document.getElementById('userConnections').textContent = userData.totalConnections;
    document.getElementById('userMessagesReceived').textContent = userData.messagesReceived;
    document.getElementById('userMessagesSent').textContent = userData.messagesSent;
    document.getElementById('userProfileViews').textContent = userData.profileViews;
    document.getElementById('userSubscription').textContent = userData.subscription;
    document.getElementById('userCountry').textContent = userData.country;
    
    // Colorear estado
    const statusElement = document.getElementById('userStatus');
    switch(userData.status) {
        case 'active':
            statusElement.style.color = '#4caf50';
            break;
        case 'away':
            statusElement.style.color = '#ff9800';
            break;
        case 'blocked':
            statusElement.style.color = '#f44336';
            break;
    }
}

// Cerrar modal de detalles
function closeUserDetails() {
    const modal = document.getElementById('userDetailsModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Abrir gestión de usuario
function openUserManagement(usuario) {
    const userName = usuario.querySelector('h3').textContent;
    showNotification(`Abriendo panel de gestión para ${userName}`, 'info');
    
    // En una app real, aquí se abriría un panel de gestión completo
    setTimeout(() => {
        const actions = [
            'Editar perfil',
            'Cambiar suscripción',
            'Ver historial de mensajes',
            'Gestionar conexiones',
            'Ver reportes'
        ];
        
        const action = actions[Math.floor(Math.random() * actions.length)];
        showNotification(`Panel de gestión cargado - ${action}`, 'success');
    }, 1000);
    
    trackAdminAction('open_user_management', { user: userName });
}

// Toggle bloqueo de usuario
function toggleUserBlock(usuario) {
    const userName = usuario.querySelector('h3').textContent;
    const blockBtn = usuario.querySelector('.block-user');
    const isBlocked = blockBtn.textContent.includes('Desbloquear');
    
    if (isBlocked) {
        // Desbloquear usuario
        blockBtn.textContent = '🚫 Bloquear';
        blockBtn.style.background = 'rgba(244, 67, 54, 0.2)';
        usuario.style.opacity = '1';
        showNotification(`Usuario ${userName} desbloqueado`, 'success');
    } else {
        // Bloquear usuario
        blockBtn.textContent = '✅ Desbloquear';
        blockBtn.style.background = 'rgba(76, 175, 80, 0.2)';
        usuario.style.opacity = '0.6';
        showNotification(`Usuario ${userName} bloqueado`, 'info');
    }
    
    // Animación
    blockBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        blockBtn.style.transform = 'scale(1)';
    }, 200);
    
    trackAdminAction('toggle_user_block', { user: userName, action: isBlocked ? 'unblock' : 'block' });
}

// Configurar acciones en lote
function setupBulkActions() {
    const bulkActionBtn = document.querySelector('.bulk-actions-btn');
    const selectAllBtn = document.querySelector('.select-all-users');
    
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', selectAllUsers);
    }
    
    if (bulkActionBtn) {
        bulkActionBtn.addEventListener('click', showBulkActionsMenu);
    }
}

// Seleccionar todos los usuarios
function selectAllUsers() {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    const allSelected = Array.from(checkboxes).every(cb => cb.checked);
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = !allSelected;
        const usuario = checkbox.closest('.producto');
        if (checkbox.checked) {
            usuario.style.border = '2px solid #9c27b0';
        } else {
            usuario.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });
    
    const selectedCount = document.querySelectorAll('.user-checkbox:checked').length;
    showNotification(`${selectedCount} usuarios seleccionados`, 'info');
    
    trackAdminAction('bulk_select', { count: selectedCount, action: allSelected ? 'deselect_all' : 'select_all' });
}

// Mostrar menú de acciones en lote
function showBulkActionsMenu() {
    const selectedUsers = document.querySelectorAll('.user-checkbox:checked');
    
    if (selectedUsers.length === 0) {
        showNotification('Selecciona al menos un usuario', 'error');
        return;
    }
    
    const actions = [
        'Enviar mensaje masivo',
        'Cambiar estado',
        'Exportar datos',
        'Generar reporte',
        'Aplicar promoción'
    ];
    
    const selectedAction = actions[Math.floor(Math.random() * actions.length)];
    showNotification(`Ejecutando: ${selectedAction} para ${selectedUsers.length} usuarios`, 'success');
    
    trackAdminAction('bulk_action', { 
        action: selectedAction, 
        userCount: selectedUsers.length 
    });
}

// Configurar reportes
function setupReports() {
    const generateReportBtn = document.querySelector('.generate-report-btn');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', generateReport);
    }
}

// Generar reporte
function generateReport() {
    showNotification('Generando reporte...', 'info');
    
    // Simular generación de reporte
    setTimeout(() => {
        const reportData = {
            totalUsers: adminData.stats.totalUsers,
            onlineUsers: adminData.stats.onlineUsers,
            activeConversations: Math.floor(Math.random() * 200) + 50,
            totalMessages: Math.floor(Math.random() * 10000) + 5000,
            timestamp: new Date().toLocaleString()
        };
        
        // En una app real, se descargaría el reporte
        console.log('Reporte generado:', reportData);
        showNotification('Reporte generado y enviado por email', 'success');
        
        trackAdminAction('generate_report', reportData);
    }, 2000);
}

// Configurar configuraciones del sistema
function setupSystemSettings() {
    const settingsBtn = document.querySelector('.system-settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSystemSettings);
    }
}

// Abrir configuraciones del sistema
function openSystemSettings() {
    showNotification('Abriendo configuraciones del sistema...', 'info');
    
    // En una app real, se abriría un panel de configuraciones
    setTimeout(() => {
        const settings = [
            'Configuración de usuarios',
            'Límites de mensajes',
            'Configuración de pagos',
            'Configuración de notificaciones',
            'Configuración de seguridad'
        ];
        
        const randomSetting = settings[Math.floor(Math.random() * settings.length)];
        showNotification(`Panel de configuración cargado - ${randomSetting}`, 'success');
    }, 1000);
    
    trackAdminAction('open_system_settings');
}

// Configurar búsqueda avanzada
function setupAdvancedSearch() {
    const searchInput = document.querySelector('.admin-search input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase().trim();
            
            if (query.length > 0) {
                searchTimeout = setTimeout(() => {
                    performAdvancedSearch(query);
                }, 300);
            } else {
                clearAdvancedSearch();
            }
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            applyFilter(filter);
            
            // Toggle active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Realizar búsqueda avanzada
function performAdvancedSearch(query) {
    const usuarios = document.querySelectorAll('.producto');
    let foundResults = 0;
    
    usuarios.forEach(usuario => {
        const nombre = usuario.querySelector('h3').textContent.toLowerCase();
        const nacionalidad = usuario.querySelector('.nacionalidad span').textContent.toLowerCase();
        
        // Búsqueda más avanzada para admin
        const matches = nombre.includes(query) || 
                       nacionalidad.includes(query) ||
                       query.includes('online') && usuario.querySelector('.estado__actividad').classList.contains('online') ||
                       query.includes('away') && usuario.querySelector('.estado__actividad').classList.contains('away') ||
                       query.includes('offline') && usuario.querySelector('.estado__actividad').classList.contains('offline');
        
        if (matches) {
            usuario.style.display = 'block';
            usuario.style.opacity = '1';
            usuario.style.border = '2px solid #9c27b0';
            usuario.style.boxShadow = '0 8px 25px rgba(156, 39, 176, 0.4)';
            foundResults++;
        } else {
            usuario.style.opacity = '0.3';
            usuario.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            usuario.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }
    });
    
    showNotification(`Admin Search: ${foundResults} resultado(s) para "${query}"`, 'info');
    trackAdminAction('advanced_search', { query: query, results: foundResults });
}

// Limpiar búsqueda avanzada
function clearAdvancedSearch() {
    const usuarios = document.querySelectorAll('.producto');
    usuarios.forEach(usuario => {
        usuario.style.display = 'block';
        usuario.style.opacity = '1';
        usuario.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        usuario.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    });
}

// Aplicar filtro
function applyFilter(filter) {
    const usuarios = document.querySelectorAll('.producto');
    let visibleCount = 0;
    
    usuarios.forEach(usuario => {
        let shouldShow = false;
        
        switch(filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'online':
                shouldShow = usuario.querySelector('.estado__actividad').classList.contains('online');
                break;
            case 'away':
                shouldShow = usuario.querySelector('.estado__actividad').classList.contains('away');
                break;
            case 'offline':
                shouldShow = !usuario.querySelector('.estado__actividad').classList.contains('online') && 
                           !usuario.querySelector('.estado__actividad').classList.contains('away');
                break;
            case 'vip':
                // Simular usuarios VIP (ej: los primeros 3)
                const index = Array.from(usuarios).indexOf(usuario);
                shouldShow = index < 3;
                break;
        }
        
        if (shouldShow) {
            usuario.style.display = 'block';
            usuario.style.opacity = '1';
            visibleCount++;
        } else {
            usuario.style.display = 'none';
        }
    });
    
    showNotification(`Filtro "${filter}": ${visibleCount} usuarios mostrados`, 'info');
    trackAdminAction('apply_filter', { filter: filter, resultCount: visibleCount });
}

// Ejecutar acción rápida
function executeQuickAction(actionType) {
    switch(actionType) {
        case 'refresh':
            loadAdminStats();
            showNotification('Estadísticas actualizadas', 'success');
            break;
        case 'backup':
            showNotification('Iniciando respaldo del sistema...', 'info');
            setTimeout(() => {
                showNotification('Respaldo completado', 'success');
            }, 3000);
            break;
        case 'maintenance':
            showNotification('Modo mantenimiento activado', 'info');
            break;
        case 'export':
            showNotification('Exportando datos de usuarios...', 'info');
            setTimeout(() => {
                showNotification('Datos exportados a CSV', 'success');
            }, 2000);
            break;
        default:
            showNotification(`Ejecutando: ${actionType}`, 'info');
    }
    
    trackAdminAction('quick_action', { action: actionType });
}

// Cargar estadísticas del admin
function loadAdminStats() {
    updateDashboardStats();
    
    // Simular carga de datos en tiempo real
    const onlineIndicator = document.querySelector('.online-indicator');
    if (onlineIndicator) {
        onlineIndicator.style.animation = 'pulse 2s infinite';
    }
}

// Configurar actualizaciones en tiempo real
function setupRealTimeUpdates() {
    // Simular actualizaciones en tiempo real
    setInterval(() => {
        // Actualizar contador de usuarios online
        const change = Math.floor(Math.random() * 10) - 5; // +/- 5
        adminData.stats.onlineUsers = Math.max(0, adminData.stats.onlineUsers + change);
        
        const onlineCountEl = document.querySelector('.stat-card:nth-child(2) .stat-value');
        if (onlineCountEl) {
            onlineCountEl.textContent = adminData.stats.onlineUsers;
        }
    }, 5000);
}

// Función para mostrar notificaciones (específicas para admin)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">🔧</div>
        <div class="notification-content">
            <div class="notification-title">Admin Panel</div>
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#9c27b0'};
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Analytics para admin
function trackAdminAction(action, data = {}) {
    const analyticsData = {
        admin_action: action,
        admin_id: 'admin_001',
        timestamp: Date.now(),
        session_id: Date.now(),
        ...data
    };
    
    // En una app real, se enviaría al servidor
    console.log('Admin Analytics:', analyticsData);
    
    // Guardar en localStorage para debugging
    const adminLogs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
    adminLogs.push(analyticsData);
    localStorage.setItem('admin_logs', JSON.stringify(adminLogs.slice(-100))); // Mantener últimas 100 acciones
}

// Cerrar modales al hacer click fuera
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        if (e.target.id === 'userDetailsModal') {
            closeUserDetails();
        }
    }
});

// Función de utilidad para formatear números
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Keyboard shortcuts para admin
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey) {
        switch(e.key) {
            case 'r':
                e.preventDefault();
                loadAdminStats();
                showNotification('Estadísticas actualizadas (Ctrl+R)', 'success');
                break;
            case 'f':
                e.preventDefault();
                const searchInput = document.querySelector('.admin-search input');
                if (searchInput) searchInput.focus();
                break;
            case 's':
                e.preventDefault();
                openSystemSettings();
                break;
        }
    }
});

// Mostrar mensaje de bienvenida del admin
setTimeout(() => {
    showNotification('Panel de administración cargado correctamente', 'success');
}, 1000);
