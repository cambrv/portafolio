// ============================================
// CONFIGURACIÓN DE EMAILJS
// ============================================

// ============================================
// UTILIDADES Y MANEJO DE ERRORES
// ============================================
const logger = {
    error: (message, error) => {
        console.error(`❌ ${message}:`, error);
    },
    warn: (message) => {
        console.warn(`⚠️ ${message}`);
    },
    info: (message) => {
        console.log(`ℹ️ ${message}`);
    }
};

// Función para mostrar notificaciones al usuario
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Agregar estilos para las animaciones de notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// NAVEGACIÓN MÓVIL
// ============================================
try {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) {
        throw new Error('Elementos de navegación no encontrados');
    }

    // Toggle menú móvil
    hamburger.addEventListener('click', () => {
        try {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        } catch (error) {
            logger.error('Error al togglear menú móvil', error);
        }
    });

    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            try {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            } catch (error) {
                logger.error('Error al cerrar menú', error);
            }
        });
    });

} catch (error) {
    logger.error('Error al inicializar navegación móvil', error);
}

// ============================================
// HIGHLIGHT DE NAVEGACIÓN AL HACER SCROLL
// ============================================
try {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0) {
        throw new Error('No se encontraron secciones');
    }

    window.addEventListener('scroll', () => {
        try {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        } catch (error) {
            logger.error('Error en scroll navigation highlight', error);
        }
    });

} catch (error) {
    logger.error('Error al inicializar highlight de navegación', error);
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
try {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            try {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            } catch (error) {
                logger.error('Error al animar elemento', error);
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    
    if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
            try {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            } catch (error) {
                logger.error('Error al configurar animación de elemento', error);
            }
        });
    } else {
        logger.warn('No se encontraron elementos para animar');
    }

} catch (error) {
    logger.error('Error al inicializar animaciones de scroll', error);
}

// ============================================
// FORMULARIO DE CONTACTO CON EMAILJS
// ============================================
try {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        // Validación de email simple
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Validación básica antes de enviar (opcional - solo para mejor UX)
        contactForm.addEventListener('submit', (e) => {
            try {
                const nombre = contactForm.querySelector('input[name="name"]')?.value.trim();
                const email = contactForm.querySelector('input[name="email"]')?.value.trim();
                const mensaje = contactForm.querySelector('textarea[name="message"]')?.value.trim();

                // Validaciones opcionales
                if (nombre && nombre.length < 2) {
                    showNotification('Por favor ingresa un nombre válido', 'error');
                    e.preventDefault();
                    return;
                }

                if (email && !isValidEmail(email)) {
                    showNotification('Por favor ingresa un email válido', 'error');
                    e.preventDefault();
                    return;
                }

                if (mensaje && mensaje.length < 10) {
                    showNotification('El mensaje debe tener al menos 10 caracteres', 'error');
                    e.preventDefault();
                    return;
                }

                // Si todas las validaciones pasan, mostrar notificación de envío
                showNotification('Enviando mensaje...', 'success');
                
            } catch (error) {
                logger.error('Error en validación del formulario', error);
            }
        });
    }

} catch (error) {
    logger.error('Error al inicializar formulario de contacto', error);
}


// ============================================
// SCROLL SUAVE
// ============================================
try {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            try {
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    logger.warn(`Elemento objetivo no encontrado: ${targetId}`);
                }
            } catch (error) {
                logger.error('Error en scroll suave', error);
            }
        });
    });
} catch (error) {
    logger.error('Error al inicializar scroll suave', error);
}

// ============================================
// NAVBAR DINÁMICO
// ============================================
try {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) {
        throw new Error('Navbar no encontrado');
    }

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        try {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
            
            lastScroll = currentScroll;
        } catch (error) {
            logger.error('Error al actualizar navbar', error);
        }
    });

} catch (error) {
    logger.error('Error al inicializar navbar dinámico', error);
}

// ============================================
// INICIALIZACIÓN COMPLETA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    logger.info('Portafolio cargado correctamente ✓');
});
