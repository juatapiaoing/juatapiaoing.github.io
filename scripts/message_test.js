// Message Test JavaScript - Sistema de comentarios
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let comentarios = [
        {
            id: 1,
            usuario: 'MariaVIP',
            avatar: 'https://via.placeholder.com/40/ff6b6b/ffffff?text=VIP',
            tiempo: 'hace 1 hora',
            texto: '¡Increíble como siempre! 🔥 Definitivamente mi creadora favorita. El contenido premium vale cada centavo 💕',
            likes: 45,
            esVIP: true,
            destacado: true,
            respuestas: []
        },
        {
            id: 2,
            usuario: 'AlexFan92',
            avatar: 'https://via.placeholder.com/40/4ecdc4/ffffff?text=AF',
            tiempo: 'hace 2 horas',
            texto: '¿Cuándo será la próxima sesión en vivo? No me quiero perder ninguna 😍',
            likes: 12,
            esVIP: false,
            destacado: false,
            respuestas: [
                {
                    id: 'r1',
                    usuario: 'Tu Hermana',
                    avatar: 'https://via.placeholder.com/30/6f42c1/ffffff?text=TH',
                    tiempo: 'hace 1 hora',
                    texto: '¡Pronto anunciaré la fecha! Mantente atento a mis historias 💋',
                    likes: 8,
                    esPremium: true
                }
            ]
        }
    ];

    // Header scroll behavior
    let lastScrollTop = 0;
    const header = document.querySelector('.header-navegacion');
    
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

    // Funcionalidad de likes
    function setupLikeButtons() {
        const likeButtons = document.querySelectorAll('.comentario-like, .respuesta-like, .like-btn');
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentText = this.textContent;
                const isLiked = this.classList.contains('liked');
                
                if (isLiked) {
                    this.classList.remove('liked');
                    this.style.color = '#888';
                    // Decrementar like count
                    const match = currentText.match(/\d+/);
                    if (match) {
                        const newCount = parseInt(match[0]) - 1;
                        this.textContent = currentText.replace(/\d+/, newCount);
                    }
                } else {
                    this.classList.add('liked');
                    this.style.color = '#ff6b6b';
                    // Incrementar like count
                    const match = currentText.match(/\d+/);
                    if (match) {
                        const newCount = parseInt(match[0]) + 1;
                        this.textContent = currentText.replace(/\d+/, newCount);
                    }
                }
                
                // Animación
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    // Funcionalidad del nuevo comentario
    function setupNuevoComentario() {
        const textarea = document.querySelector('.comentario-textarea');
        const enviarBtn = document.querySelector('.enviar-btn');
        const emojiBtn = document.querySelector('.emoji-btn');

        // Auto-resize del textarea
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });

        // Emoji picker simple
        emojiBtn.addEventListener('click', function() {
            const emojis = ['😍', '🔥', '💕', '😘', '🤩', '✨', '💋', '🥰', '😎', '🎉'];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            textarea.value += emoji;
            textarea.focus();
        });

        // Enviar comentario
        enviarBtn.addEventListener('click', function() {
            const texto = textarea.value.trim();
            if (texto) {
                agregarNuevoComentario(texto);
                textarea.value = '';
                textarea.style.height = 'auto';
            }
        });

        // Enviar con Enter (Ctrl+Enter)
        textarea.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                enviarBtn.click();
            }
        });
    }

    // Función para agregar nuevo comentario
    function agregarNuevoComentario(texto) {
        const comentariosLista = document.querySelector('.comentarios-lista');
        const nuevoComentario = document.createElement('article');
        nuevoComentario.className = 'comentario';
        
        const nuevoId = Date.now();
        const comentarioData = {
            id: nuevoId,
            usuario: 'Tú',
            avatar: 'https://via.placeholder.com/40/6f42c1/ffffff?text=YO',
            tiempo: 'ahora',
            texto: texto,
            likes: 0,
            esVIP: false,
            destacado: false,
            respuestas: []
        };

        nuevoComentario.innerHTML = `
            <img src="${comentarioData.avatar}" alt="Tu avatar" class="comentario-avatar">
            <div class="comentario-contenido">
                <div class="comentario-header">
                    <h4 class="comentario-usuario">${comentarioData.usuario}</h4>
                    <span class="comentario-tiempo">${comentarioData.tiempo}</span>
                </div>
                <p class="comentario-texto">${comentarioData.texto}</p>
                <div class="comentario-acciones">
                    <button class="comentario-like">❤️ ${comentarioData.likes}</button>
                    <button class="comentario-responder">Responder</button>
                    <button class="comentario-reportar">Reportar</button>
                </div>
            </div>
        `;

        // Insertar al inicio de la lista
        comentariosLista.insertBefore(nuevoComentario, comentariosLista.firstChild);

        // Actualizar contador
        const contador = document.querySelector('.comentarios-count');
        const currentCount = parseInt(contador.textContent.match(/\d+/)[0]);
        contador.textContent = `(${currentCount + 1})`;

        // Aplicar funcionalidades al nuevo comentario
        setupLikeButtons();
        setupReportarButtons();
        setupResponderButtons();

        // Animación de aparición
        nuevoComentario.style.opacity = '0';
        nuevoComentario.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            nuevoComentario.style.transition = 'all 0.3s ease';
            nuevoComentario.style.opacity = '1';
            nuevoComentario.style.transform = 'translateY(0)';
        }, 100);

        // Scroll hasta el nuevo comentario
        nuevoComentario.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Funcionalidad de reportar
    function setupReportarButtons() {
        const reportarBtns = document.querySelectorAll('.comentario-reportar');
        const modal = document.getElementById('modalReportar');
        const closeBtn = modal.querySelector('.modal-close');
        const cancelarBtn = modal.querySelector('.btn-cancelar');
        const reportarBtn = modal.querySelector('.btn-reportar');

        reportarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function cerrarModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            // Limpiar formulario
            modal.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
            modal.querySelector('.reporte-comentario').value = '';
        }

        closeBtn.addEventListener('click', cerrarModal);
        cancelarBtn.addEventListener('click', cerrarModal);

        // Cerrar al hacer click fuera del modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                cerrarModal();
            }
        });

        reportarBtn.addEventListener('click', function() {
            const razonSeleccionada = modal.querySelector('input[name="razon"]:checked');
            if (razonSeleccionada) {
                // Simulación de reporte
                mostrarNotificacion('Comentario reportado correctamente. Gracias por tu feedback.', 'success');
                cerrarModal();
            } else {
                mostrarNotificacion('Por favor selecciona una razón para el reporte.', 'error');
            }
        });
    }

    // Funcionalidad de responder
    function setupResponderButtons() {
        const responderBtns = document.querySelectorAll('.comentario-responder');
        
        responderBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const comentario = this.closest('.comentario');
                const usuario = comentario.querySelector('.comentario-usuario').textContent;
                
                // Crear formulario de respuesta si no existe
                let formRespuesta = comentario.querySelector('.form-respuesta');
                if (!formRespuesta) {
                    formRespuesta = document.createElement('div');
                    formRespuesta.className = 'form-respuesta';
                    formRespuesta.innerHTML = `
                        <div class="respuesta-nueva">
                            <img src="https://via.placeholder.com/30/6f42c1/ffffff?text=YO" alt="Tu avatar" class="respuesta-avatar">
                            <div class="respuesta-input-container">
                                <textarea class="respuesta-textarea" placeholder="Responder a ${usuario}..." rows="2"></textarea>
                                <div class="respuesta-acciones">
                                    <button class="cancelar-respuesta">Cancelar</button>
                                    <button class="enviar-respuesta">Responder</button>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    comentario.querySelector('.comentario-contenido').appendChild(formRespuesta);
                    
                    // Eventos para el formulario de respuesta
                    const textarea = formRespuesta.querySelector('.respuesta-textarea');
                    const enviarRespuesta = formRespuesta.querySelector('.enviar-respuesta');
                    const cancelarRespuesta = formRespuesta.querySelector('.cancelar-respuesta');
                    
                    textarea.focus();
                    
                    cancelarRespuesta.addEventListener('click', function() {
                        formRespuesta.remove();
                    });
                    
                    enviarRespuesta.addEventListener('click', function() {
                        const textoRespuesta = textarea.value.trim();
                        if (textoRespuesta) {
                            agregarRespuesta(comentario, textoRespuesta);
                            formRespuesta.remove();
                        }
                    });
                    
                    textarea.addEventListener('keydown', function(e) {
                        if (e.ctrlKey && e.key === 'Enter') {
                            enviarRespuesta.click();
                        }
                    });
                } else {
                    // Si ya existe, enfocarlo
                    formRespuesta.querySelector('.respuesta-textarea').focus();
                }
            });
        });
    }

    // Función para agregar respuesta
    function agregarRespuesta(comentarioElement, texto) {
        let respuestasContainer = comentarioElement.querySelector('.respuestas-container');
        if (!respuestasContainer) {
            respuestasContainer = document.createElement('div');
            respuestasContainer.className = 'respuestas-container';
            comentarioElement.querySelector('.comentario-contenido').appendChild(respuestasContainer);
        }

        const nuevaRespuesta = document.createElement('div');
        nuevaRespuesta.className = 'respuesta';
        nuevaRespuesta.innerHTML = `
            <img src="https://via.placeholder.com/30/6f42c1/ffffff?text=YO" alt="Tu avatar" class="respuesta-avatar">
            <div class="respuesta-contenido">
                <div class="respuesta-header">
                    <h5 class="respuesta-usuario">Tú</h5>
                    <span class="respuesta-tiempo">ahora</span>
                </div>
                <p class="respuesta-texto">${texto}</p>
                <div class="respuesta-acciones">
                    <button class="respuesta-like">❤️ 0</button>
                </div>
            </div>
        `;

        respuestasContainer.appendChild(nuevaRespuesta);

        // Aplicar funcionalidades
        setupLikeButtons();

        // Animación
        nuevaRespuesta.style.opacity = '0';
        nuevaRespuesta.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            nuevaRespuesta.style.transition = 'all 0.3s ease';
            nuevaRespuesta.style.opacity = '1';
            nuevaRespuesta.style.transform = 'translateX(0)';
        }, 100);
    }

    // Filtro de comentarios
    function setupFiltroComentarios() {
        const filterSelect = document.querySelector('.filter-select');
        filterSelect.addEventListener('change', function() {
            const valor = this.value;
            const comentariosLista = document.querySelector('.comentarios-lista');
            const comentarios = Array.from(comentariosLista.querySelectorAll('.comentario'));
            
            // Simular ordenamiento (en una app real esto vendría del servidor)
            switch(valor) {
                case 'populares':
                    // Ordenar por likes (simulado)
                    comentarios.forEach(comentario => {
                        const likes = parseInt(comentario.querySelector('.comentario-like').textContent.match(/\d+/)[0]);
                        comentario.dataset.likes = likes;
                    });
                    comentarios.sort((a, b) => parseInt(b.dataset.likes) - parseInt(a.dataset.likes));
                    break;
                case 'antiguos':
                    // Invertir orden
                    comentarios.reverse();
                    break;
                default:
                    // Recientes (orden original)
                    break;
            }
            
            // Reorganizar en el DOM
            comentarios.forEach(comentario => {
                comentariosLista.appendChild(comentario);
            });
        });
    }

    // Cargar más comentarios
    function setupCargarMas() {
        const btnCargarMas = document.querySelector('.btn-cargar-mas');
        const comentariosRestantes = document.querySelector('.comentarios-restantes');
        
        btnCargarMas.addEventListener('click', function() {
            // Simular carga de más comentarios
            this.textContent = 'Cargando...';
            this.disabled = true;
            
            setTimeout(() => {
                // Agregar comentarios simulados
                for (let i = 0; i < 3; i++) {
                    const comentarioSimulado = crearComentarioSimulado();
                    document.querySelector('.comentarios-lista').appendChild(comentarioSimulado);
                }
                
                // Actualizar contador
                const restantes = parseInt(comentariosRestantes.textContent.match(/\d+/)[0]) - 3;
                if (restantes > 0) {
                    comentariosRestantes.textContent = `Quedan ${restantes} comentarios más`;
                    this.textContent = 'Cargar más comentarios';
                    this.disabled = false;
                } else {
                    comentariosRestantes.textContent = 'No hay más comentarios';
                    this.style.display = 'none';
                }
                
                // Aplicar funcionalidades
                setupLikeButtons();
                setupReportarButtons();
                setupResponderButtons();
            }, 1000);
        });
    }

    // Crear comentario simulado
    function crearComentarioSimulado() {
        const usuarios = ['CarlosFan', 'AnaModel', 'MiguelVIP', 'LauraPhoto', 'RicardoArt'];
        const textos = [
            '¡Excelente contenido! 🔥',
            'Siempre impresionante tu trabajo 💕',
            '¿Cuándo la próxima sesión? 😍',
            'Eres la mejor creadora ✨',
            'Increíble calidad como siempre 📸'
        ];
        
        const usuario = usuarios[Math.floor(Math.random() * usuarios.length)];
        const texto = textos[Math.floor(Math.random() * textos.length)];
        const likes = Math.floor(Math.random() * 20) + 1;
        
        const comentario = document.createElement('article');
        comentario.className = 'comentario';
        comentario.innerHTML = `
            <img src="https://via.placeholder.com/40/666666/ffffff?text=${usuario.charAt(0)}" alt="${usuario}" class="comentario-avatar">
            <div class="comentario-contenido">
                <div class="comentario-header">
                    <h4 class="comentario-usuario">${usuario}</h4>
                    <span class="comentario-tiempo">hace ${Math.floor(Math.random() * 12) + 1} horas</span>
                </div>
                <p class="comentario-texto">${texto}</p>
                <div class="comentario-acciones">
                    <button class="comentario-like">❤️ ${likes}</button>
                    <button class="comentario-responder">Responder</button>
                    <button class="comentario-reportar">Reportar</button>
                </div>
            </div>
        `;
        
        return comentario;
    }

    // Sistema de notificaciones
    function mostrarNotificacion(mensaje, tipo = 'info') {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion ${tipo}`;
        notificacion.textContent = mensaje;
        
        notificacion.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${tipo === 'success' ? '#4caf50' : tipo === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(notificacion);
        
        // Animación de entrada
        setTimeout(() => {
            notificacion.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-remove después de 3 segundos
        setTimeout(() => {
            notificacion.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 300);
        }, 3000);
    }

    // Inicializar todas las funcionalidades
    setupLikeButtons();
    setupNuevoComentario();
    setupReportarButtons();
    setupResponderButtons();
    setupFiltroComentarios();
    setupCargarMas();

    // Mensaje de bienvenida
    setTimeout(() => {
        mostrarNotificacion('¡Bienvenido a la sección de comentarios! 💬', 'success');
    }, 1000);
});
