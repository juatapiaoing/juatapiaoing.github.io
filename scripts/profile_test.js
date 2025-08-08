// Profile Test JavaScript - Gestión de publicaciones
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let publicaciones = [
        {
            id: 1,
            usuario: 'Tu Hermana',
            arroba: '@tuhermana77',
            contenido: '¡Nueva sesión de fotos disponible! 🔥 Para mis suscriptores VIP: contenido exclusivo en mensajes privados. ¿Listos para ver algo increíble? 💋 #Exclusive #Premium',
            tiempo: 'hace 2 horas',
            imagen: null,
            destacado: true
        },
        {
            id: 2,
            usuario: 'Tu Hermana',
            arroba: '@tuhermana77',
            contenido: 'Sesión de videos terminada ✨ El resultado superó todas las expectativas. Mis fans premium ya saben dónde encontrar el contenido completo 😘 #VideoShoot #Exclusive',
            tiempo: 'hace 5 horas',
            imagen: null,
            destacado: true
        },
        {
            id: 3,
            usuario: 'Tu Hermana',
            arroba: '@tuhermana77',
            contenido: '¡Promoción especial esta semana! 🎉 Descuentos en todos mis servicios premium. Escríbeme por privado para más detalles 💕 #Promo #SpecialOffer',
            tiempo: 'hace 1 día',
            imagen: null,
            destacado: true
        },
        {
            id: 4,
            usuario: 'Tu Hermana',
            arroba: '@tuhermana77',
            contenido: 'Buenos días mis amores 🌅 Hoy tengo muchas sorpresas preparadas para ustedes. ¡Manténganse atentos! 💕',
            tiempo: 'hace 2 días',
            imagen: null,
            destacado: false
        },
        {
            id: 5,
            usuario: 'Tu Hermana',
            arroba: '@tuhermana77',
            contenido: 'Entrenando duro en el gym 💪 La disciplina es clave para mantener este cuerpo perfecto 🔥 #Fitness #Motivation',
            tiempo: 'hace 3 días',
            imagen: null,
            destacado: false
        }
    ];

    let contadorId = 6;
    let vistaActual = 'destacados';

    // Datos del perfil
    let perfilData = {
        nombre: 'Tu Hermana',
        arroba: '@tuhermana77',
        descripcion: '🔥 Modelo profesional y creadora de contenido exclusivo 💋 | Sesiones privadas disponibles 📸 | Tu fantasía hecha realidad ✨',
        caracteristicas: {
            nacionalidad: 'Chilena 🇨🇱',
            edad: '25 años',
            altura: '1.68 m',
            peso: '55 kg',
            medidas: '90-60-90',
            especialidad: 'Sesiones artísticas',
            servicios: 'Fotos, Videos, Privados',
            disponibilidad: 'Lun-Dom 24/7',
            ubicacion: 'Santiago, Chile',
            metodospago: 'PayPal, Crypto, Transferencia'
        }
    };

    // Datos de servicios
    let serviciosData = [
        { emoji: '📸', nombre: 'Sesión de fotos básica (1h)', precio: '$150' },
        { emoji: '🎥', nombre: 'Video personalizado (5min)', precio: '$200' },
        { emoji: '💕', nombre: 'Sesión privada premium (2h)', precio: '$400' },
        { emoji: '🌟', nombre: 'Paquete VIP completo', precio: '$800' }
    ];

    // Elementos del DOM
    const btnNuevo = document.querySelector('.btn-nuevo');
    const btnEditarPerfil = document.querySelector('.btn-editar');
    const btnEditarServicios = document.querySelector('.btn-editar-servicios');
    const seccionPosts = document.querySelector('.seccion-posts');
    const navLinks = document.querySelectorAll('.perfil-navegacion a');
    
    // Elementos para modal de características móvil
    const btnCaracteristicasFlotante = document.getElementById('btnCaracteristicasFlotante');
    const modalCaracteristicas = document.getElementById('modalCaracteristicas');
    const btnCerrarCaracteristicas = document.getElementById('btnCerrarCaracteristicas');

    // Modal para crear publicación
    function crearModalPublicacion() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>✨ Crear Nueva Publicación</h3>
                    <button class="btn-cerrar">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="contenido-post">📝 Contenido de la publicación:</label>
                        <textarea id="contenido-post" placeholder="¿Qué quieres compartir con tus fans?" maxlength="280"></textarea>
                        <div class="contador-caracteres">0/280</div>
                    </div>
                    <div class="form-group">
                        <label for="imagen-post">📸 Imagen (opcional):</label>
                        <input type="file" id="imagen-post" accept="image/*">
                        <div class="preview-imagen"></div>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="destacado-post"> 
                            🌟 Marcar como contenido destacado
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancelar">Cancelar</button>
                    <button class="btn-publicar">🚀 Publicar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Event listeners del modal
        const textarea = modal.querySelector('#contenido-post');
        const contador = modal.querySelector('.contador-caracteres');
        const inputImagen = modal.querySelector('#imagen-post');
        const preview = modal.querySelector('.preview-imagen');
        const btnCerrar = modal.querySelector('.btn-cerrar');
        const btnCancelar = modal.querySelector('.btn-cancelar');
        const btnPublicar = modal.querySelector('.btn-publicar');

        // Contador de caracteres
        textarea.addEventListener('input', function() {
            const longitud = this.value.length;
            contador.textContent = `${longitud}/280`;
            contador.style.color = longitud > 250 ? '#ff4444' : '#aaa';
        });

        // Preview de imagen
        inputImagen.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.innerHTML = `
                        <div class="imagen-preview">
                            <img src="${e.target.result}" alt="Preview">
                            <button type="button" class="btn-eliminar-imagen">&times;</button>
                        </div>
                    `;
                    
                    preview.querySelector('.btn-eliminar-imagen').addEventListener('click', function() {
                        preview.innerHTML = '';
                        inputImagen.value = '';
                    });
                };
                reader.readAsDataURL(file);
            }
        });

        // Cerrar modal
        function cerrarModal() {
            modal.remove();
        }

        btnCerrar.addEventListener('click', cerrarModal);
        btnCancelar.addEventListener('click', cerrarModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) cerrarModal();
        });

        // Publicar
        btnPublicar.addEventListener('click', function() {
            const contenido = textarea.value.trim();
            const destacado = document.querySelector('#destacado-post').checked;
            
            if (contenido) {
                const nuevaPublicacion = {
                    id: contadorId++,
                    usuario: 'Tu Hermana',
                    arroba: '@tuhermana77',
                    contenido: contenido,
                    tiempo: 'hace unos segundos',
                    imagen: preview.querySelector('img') ? preview.querySelector('img').src : null,
                    destacado: destacado
                };
                
                publicaciones.unshift(nuevaPublicacion);
                renderizarPublicaciones();
                cerrarModal();
                
                // Mostrar notificación
                mostrarNotificacion('¡Publicación creada exitosamente! 🎉');
            } else {
                mostrarNotificacion('❌ El contenido no puede estar vacío');
            }
        });

        // Focus en el textarea
        setTimeout(() => textarea.focus(), 100);
    }

    // Modal para editar perfil
    function crearModalEditarPerfil() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content modal-editar-perfil">
                <div class="modal-header">
                    <h3>✏️ Editar Perfil</h3>
                    <button class="btn-cerrar">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="edit-nombre">👤 Nombre:</label>
                        <input type="text" id="edit-nombre" value="${perfilData.nombre}">
                    </div>
                    <div class="form-group">
                        <label for="edit-arroba">@ Usuario:</label>
                        <input type="text" id="edit-arroba" value="${perfilData.arroba}">
                    </div>
                    <div class="form-group">
                        <label for="edit-descripcion">📝 Descripción:</label>
                        <textarea id="edit-descripcion" maxlength="200">${perfilData.descripcion}</textarea>
                        <div class="contador-caracteres-desc">0/200</div>
                    </div>
                    <h4 style="color: #ffd700; margin: 20px 0 10px 0;">📋 Características Personales</h4>
                    <div class="caracteristicas-form">
                        <div class="form-group">
                            <label for="edit-nacionalidad">🌍 Nacionalidad:</label>
                            <input type="text" id="edit-nacionalidad" value="${perfilData.caracteristicas.nacionalidad}">
                        </div>
                        <div class="form-group">
                            <label for="edit-edad">🎂 Edad:</label>
                            <input type="text" id="edit-edad" value="${perfilData.caracteristicas.edad}">
                        </div>
                        <div class="form-group">
                            <label for="edit-altura">📏 Altura:</label>
                            <input type="text" id="edit-altura" value="${perfilData.caracteristicas.altura}">
                        </div>
                        <div class="form-group">
                            <label for="edit-peso">⚖️ Peso:</label>
                            <input type="text" id="edit-peso" value="${perfilData.caracteristicas.peso}">
                        </div>
                        <div class="form-group">
                            <label for="edit-medidas">👗 Medidas:</label>
                            <input type="text" id="edit-medidas" value="${perfilData.caracteristicas.medidas}">
                        </div>
                        <div class="form-group">
                            <label for="edit-especialidad">💼 Especialidad:</label>
                            <input type="text" id="edit-especialidad" value="${perfilData.caracteristicas.especialidad}">
                        </div>
                        <div class="form-group">
                            <label for="edit-disponibilidad">📅 Disponibilidad:</label>
                            <input type="text" id="edit-disponibilidad" value="${perfilData.caracteristicas.disponibilidad}">
                        </div>
                        <div class="form-group">
                            <label for="edit-ubicacion">📍 Ubicación:</label>
                            <input type="text" id="edit-ubicacion" value="${perfilData.caracteristicas.ubicacion}">
                        </div>
                        <div class="form-group">
                            <label for="edit-metodospago">💳 Métodos de pago:</label>
                            <input type="text" id="edit-metodospago" value="${perfilData.caracteristicas.metodospago}">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancelar">Cancelar</button>
                    <button class="btn-guardar-perfil">💾 Guardar Cambios</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Event listeners del modal
        const btnCerrar = modal.querySelector('.btn-cerrar');
        const btnCancelar = modal.querySelector('.btn-cancelar');
        const btnGuardar = modal.querySelector('.btn-guardar-perfil');
        const textareaDesc = modal.querySelector('#edit-descripcion');
        const contadorDesc = modal.querySelector('.contador-caracteres-desc');

        // Contador de caracteres para descripción
        function actualizarContador() {
            const longitud = textareaDesc.value.length;
            contadorDesc.textContent = `${longitud}/200`;
            contadorDesc.style.color = longitud > 180 ? '#ff4444' : '#aaa';
        }
        
        textareaDesc.addEventListener('input', actualizarContador);
        actualizarContador();

        // Cerrar modal
        function cerrarModal() {
            modal.remove();
        }

        btnCerrar.addEventListener('click', cerrarModal);
        btnCancelar.addEventListener('click', cerrarModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) cerrarModal();
        });

        // Guardar cambios
        btnGuardar.addEventListener('click', function() {
            // Actualizar datos del perfil
            perfilData.nombre = modal.querySelector('#edit-nombre').value;
            perfilData.arroba = modal.querySelector('#edit-arroba').value;
            perfilData.descripcion = modal.querySelector('#edit-descripcion').value;
            perfilData.caracteristicas.nacionalidad = modal.querySelector('#edit-nacionalidad').value;
            perfilData.caracteristicas.edad = modal.querySelector('#edit-edad').value;
            perfilData.caracteristicas.altura = modal.querySelector('#edit-altura').value;
            perfilData.caracteristicas.peso = modal.querySelector('#edit-peso').value;
            perfilData.caracteristicas.medidas = modal.querySelector('#edit-medidas').value;
            perfilData.caracteristicas.especialidad = modal.querySelector('#edit-especialidad').value;
            perfilData.caracteristicas.disponibilidad = modal.querySelector('#edit-disponibilidad').value;
            perfilData.caracteristicas.ubicacion = modal.querySelector('#edit-ubicacion').value;
            perfilData.caracteristicas.metodospago = modal.querySelector('#edit-metodospago').value;

            // Actualizar UI
            actualizarPerfil();
            cerrarModal();
            mostrarNotificacion('¡Perfil actualizado exitosamente! ✨');
        });
    }

    // Modal para editar servicios
    function crearModalEditarServicios() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content modal-editar-servicios">
                <div class="modal-header">
                    <h3>💎 Editar Servicios</h3>
                    <button class="btn-cerrar">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="servicios-editables">
                        ${serviciosData.map((servicio, index) => `
                            <div class="servicio-editable" data-index="${index}">
                                <div class="form-group">
                                    <label>🎯 Servicio ${index + 1}:</label>
                                    <div class="servicio-inputs">
                                        <input type="text" class="emoji-input" value="${servicio.emoji}" maxlength="2" placeholder="📸">
                                        <input type="text" class="nombre-input" value="${servicio.nombre}" placeholder="Nombre del servicio">
                                        <input type="text" class="precio-input" value="${servicio.precio}" placeholder="$000">
                                        <button type="button" class="btn-eliminar-servicio" data-index="${index}">🗑️</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-agregar-servicio">➕ Agregar Nuevo Servicio</button>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancelar">Cancelar</button>
                    <button class="btn-guardar-servicios">💾 Guardar Servicios</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Event listeners del modal
        const btnCerrar = modal.querySelector('.btn-cerrar');
        const btnCancelar = modal.querySelector('.btn-cancelar');
        const btnGuardar = modal.querySelector('.btn-guardar-servicios');
        const btnAgregar = modal.querySelector('.btn-agregar-servicio');
        const serviciosContainer = modal.querySelector('.servicios-editables');

        // Agregar nuevo servicio
        btnAgregar.addEventListener('click', function() {
            const nuevoIndex = serviciosContainer.children.length;
            const nuevoServicio = document.createElement('div');
            nuevoServicio.className = 'servicio-editable';
            nuevoServicio.dataset.index = nuevoIndex;
            nuevoServicio.innerHTML = `
                <div class="form-group">
                    <label>🎯 Servicio ${nuevoIndex + 1}:</label>
                    <div class="servicio-inputs">
                        <input type="text" class="emoji-input" value="✨" maxlength="2" placeholder="📸">
                        <input type="text" class="nombre-input" value="" placeholder="Nombre del servicio">
                        <input type="text" class="precio-input" value="$" placeholder="$000">
                        <button type="button" class="btn-eliminar-servicio" data-index="${nuevoIndex}">🗑️</button>
                    </div>
                </div>
            `;
            serviciosContainer.appendChild(nuevoServicio);
            
            // Agregar event listener al botón eliminar
            nuevoServicio.querySelector('.btn-eliminar-servicio').addEventListener('click', function() {
                nuevoServicio.remove();
            });
        });

        // Eliminar servicios existentes
        modal.querySelectorAll('.btn-eliminar-servicio').forEach(btn => {
            btn.addEventListener('click', function() {
                if (serviciosContainer.children.length > 1) {
                    this.closest('.servicio-editable').remove();
                } else {
                    mostrarNotificacion('❌ Debe mantener al menos un servicio');
                }
            });
        });

        // Cerrar modal
        function cerrarModal() {
            modal.remove();
        }

        btnCerrar.addEventListener('click', cerrarModal);
        btnCancelar.addEventListener('click', cerrarModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) cerrarModal();
        });

        // Guardar servicios
        btnGuardar.addEventListener('click', function() {
            const nuevosServicios = [];
            serviciosContainer.querySelectorAll('.servicio-editable').forEach(servicio => {
                const emoji = servicio.querySelector('.emoji-input').value || '✨';
                const nombre = servicio.querySelector('.nombre-input').value.trim();
                const precio = servicio.querySelector('.precio-input').value.trim();
                
                if (nombre && precio) {
                    nuevosServicios.push({ emoji, nombre, precio });
                }
            });

            if (nuevosServicios.length > 0) {
                serviciosData = nuevosServicios;
                actualizarServicios();
                cerrarModal();
                mostrarNotificacion('¡Servicios actualizados exitosamente! 💎');
            } else {
                mostrarNotificacion('❌ Debe agregar al menos un servicio válido');
            }
        });
    }

    // Función para actualizar las características en el modal móvil
    function actualizarCaracteristicasModal() {
        const caracteristicasModalLista = modalCaracteristicas && modalCaracteristicas.querySelector('.caracteristicas-lista');
        if (caracteristicasModalLista) {
            caracteristicasModalLista.innerHTML = `
                <li>
                    <div class="caracteristica-nombre">🌍 Nacionalidad</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.nacionalidad}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">🎂 Edad</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.edad}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">📏 Altura</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.altura}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">⚖️ Peso</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.peso}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">👗 Medidas</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.medidas}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">💼 Especialidad</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.especialidad}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">🎯 Servicios</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.servicios}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">📅 Disponibilidad</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.disponibilidad}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">📍 Ubicación</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.ubicacion}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">💳 Métodos de pago</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.metodospago}</div>
                </li>
            `;
        }
    }

    // Función para mostrar modal de características
    function mostrarModalCaracteristicas() {
        actualizarCaracteristicasModal();
        modalCaracteristicas.style.display = 'block';
        setTimeout(() => {
            modalCaracteristicas.classList.add('show');
        }, 10);
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }

    // Función para cerrar modal de características
    function cerrarModalCaracteristicas() {
        modalCaracteristicas.classList.remove('show');
        setTimeout(() => {
            modalCaracteristicas.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Event listeners para el modal de características móvil
    if (btnCaracteristicasFlotante) {
        btnCaracteristicasFlotante.addEventListener('click', mostrarModalCaracteristicas);
    }

    if (btnCerrarCaracteristicas) {
        btnCerrarCaracteristicas.addEventListener('click', cerrarModalCaracteristicas);
    }

    if (modalCaracteristicas) {
        modalCaracteristicas.addEventListener('click', function(e) {
            if (e.target === modalCaracteristicas) {
                cerrarModalCaracteristicas();
            }
        });
    }

    // Actualizar perfil en la UI
    function actualizarPerfil() {
        // Actualizar nombre y arroba
        document.querySelector('.info-texto h1').innerHTML = `${perfilData.nombre} <span class="premium-badge">✓ PREMIUM</span>`;
        document.querySelector('.usuario-arroba').textContent = perfilData.arroba;
        document.querySelector('.perfil-descripcion').textContent = perfilData.descripcion;

        // Actualizar características en el sidebar
        const caracteristicasLista = document.querySelector('.caracteristicas-lista');
        if (caracteristicasLista) {
            caracteristicasLista.innerHTML = `
                <li>
                    <div class="caracteristica-nombre">🌍 Nacionalidad</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.nacionalidad}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">🎂 Edad</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.edad}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">📏 Altura</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.altura}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">⚖️ Peso</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.peso}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">👗 Medidas</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.medidas}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">💼 Especialidad</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.especialidad}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">🎯 Servicios</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.servicios}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">📅 Disponibilidad</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.disponibilidad}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">📍 Ubicación</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.ubicacion}</div>
                </li>
                <li>
                    <div class="caracteristica-nombre">💳 Métodos de pago</div>
                    <div class="caracteristica-valor">${perfilData.caracteristicas.metodospago}</div>
                </li>
            `;
        }

        // Actualizar publicaciones existentes con el nuevo nombre
        publicaciones.forEach(pub => {
            pub.usuario = perfilData.nombre;
            pub.arroba = perfilData.arroba;
        });
        renderizarPublicaciones();
        
        // Actualizar también el modal de características móvil
        actualizarCaracteristicasModal();
    }

    // Actualizar servicios en la UI
    function actualizarServicios() {
        const serviciosContainer = document.querySelector('.servicios-precios');
        const serviciosHTML = serviciosData.map(servicio => `
            <div class="precio-item">
                <span class="precio-servicio">${servicio.emoji} ${servicio.nombre}</span>
                <span class="precio-valor">${servicio.precio}</span>
            </div>
        `).join('');

        serviciosContainer.innerHTML = `
            <div class="servicios-header">
                <h3>💎 Servicios Disponibles</h3>
                <button class="btn-editar-servicios" title="Editar servicios">✏️</button>
            </div>
            ${serviciosHTML}
        `;

        // Re-agregar event listener al nuevo botón de editar servicios
        serviciosContainer.querySelector('.btn-editar-servicios').addEventListener('click', crearModalEditarServicios);
    }

    // Renderizar publicaciones
    function renderizarPublicaciones() {
        let publicacionesFiltradas;
        
        switch(vistaActual) {
            case 'destacados':
                publicacionesFiltradas = publicaciones.filter(p => p.destacado);
                break;
            case 'todas':
                publicacionesFiltradas = publicaciones;
                break;
            case 'galeria':
                publicacionesFiltradas = publicaciones.filter(p => p.imagen);
                break;
            case 'videos':
                publicacionesFiltradas = publicaciones.filter(p => p.contenido.includes('video') || p.contenido.includes('Video'));
                break;
            default:
                publicacionesFiltradas = publicaciones.filter(p => p.destacado);
        }

        seccionPosts.innerHTML = publicacionesFiltradas.map(post => `
            <article class="post" data-id="${post.id}">
                <div class="post-cabecera">
                    <img src="https://via.placeholder.com/55/6f42c1/ffffff?text=TH" alt="Foto de perfil" class="post-foto">
                    <div class="post-info">
                        <span class="post-usuario">${post.usuario}</span>
                        <span class="post-arroba">${post.arroba} • ${post.tiempo}</span>
                    </div>
                    <div class="post-acciones">
                        ${post.destacado ? '<span class="badge-destacado">⭐ Destacado</span>' : ''}
                        <button class="btn-eliminar-post" data-id="${post.id}" title="Eliminar publicación">🗑️</button>
                    </div>
                </div>
                <p class="post-contenido">${post.contenido}</p>
                ${post.imagen ? `<div class="post-imagen"><img src="${post.imagen}" alt="Imagen del post"></div>` : ''}
                <div class="post-stats">
                    <span class="stat-likes">❤️ ${Math.floor(Math.random() * 500) + 50}</span>
                    <span class="stat-comments">💬 ${Math.floor(Math.random() * 50) + 5}</span>
                    <span class="stat-shares">🔄 ${Math.floor(Math.random() * 20) + 2}</span>
                </div>
            </article>
        `).join('');

        // Event listeners para eliminar posts
        document.querySelectorAll('.btn-eliminar-post').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id);
                eliminarPublicacion(id);
            });
        });

        // Actualizar contador de publicaciones
        actualizarContadorPublicaciones();
    }

    // Eliminar publicación
    function eliminarPublicacion(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
            publicaciones = publicaciones.filter(p => p.id !== id);
            renderizarPublicaciones();
            mostrarNotificacion('Publicación eliminada correctamente 🗑️');
        }
    }

    // Mostrar notificación
    function mostrarNotificacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion';
        notificacion.textContent = mensaje;
        document.body.appendChild(notificacion);

        setTimeout(() => {
            notificacion.classList.add('show');
        }, 100);

        setTimeout(() => {
            notificacion.classList.remove('show');
            setTimeout(() => notificacion.remove(), 300);
        }, 3000);
    }

    // Actualizar contador de publicaciones
    function actualizarContadorPublicaciones() {
        const totalPosts = publicaciones.length;
        const destacados = publicaciones.filter(p => p.destacado).length;
        
        // Actualizar estadísticas en el perfil si existe
        const statsElement = document.querySelector('.perfil-estadisticas');
        if (statsElement) {
            statsElement.innerHTML = `
                <span><strong>${destacados}</strong> destacados</span>
                <span><strong>${totalPosts}</strong> publicaciones</span>
                <span><strong>1.2K</strong> seguidores</span>
            `;
        }
    }

    // Navegación entre secciones
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase activo
            navLinks.forEach(l => l.classList.remove('activo'));
            this.classList.add('activo');
            
            // Determinar vista
            const href = this.getAttribute('href');
            switch(href) {
                case '#destacados':
                    vistaActual = 'destacados';
                    break;
                case '#todas':
                    vistaActual = 'todas';
                    break;
                case '#galeria':
                    vistaActual = 'galeria';
                    break;
                case '#videos':
                    vistaActual = 'videos';
                    break;
                default:
                    vistaActual = 'destacados';
            }
            
            renderizarPublicaciones();
        });
    });

    // Event listener para crear nueva publicación
    btnNuevo.addEventListener('click', crearModalPublicacion);

    // Event listener para editar perfil
    btnEditarPerfil.addEventListener('click', crearModalEditarPerfil);

    // Event listener para editar servicios
    btnEditarServicios.addEventListener('click', crearModalEditarServicios);

    // Renderizado inicial
    renderizarPublicaciones();

    // Header scroll behavior - hide on scroll down, show on scroll up
    let lastScrollTop = 0;
    const header = document.querySelector('.header-navegacion');
    
    if (header) {
        // Initially ensure header is visible
        header.style.transform = 'translateY(0)';
        
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down and past 100px - hide header
                header.style.transform = 'translateY(-100%)';
            } else if (scrollTop < lastScrollTop || scrollTop <= 50) {
                // Scrolling up or near top - show header
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        });
    }
});
