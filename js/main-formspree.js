// ============================================
// ALTERNATIVA SIMPLE: FORMSPREE
// ============================================
// Esta es una alternativa más simple a EmailJS
// Solo necesitas un email, sin configuración compleja

// INSTRUCCIONES RÁPIDAS:
// 1. Ve a https://formspree.io/
// 2. Crea una cuenta gratis
// 3. Crea un nuevo form
// 4. Copia el endpoint que te dan (ejemplo: https://formspree.io/f/xwkgrglo)
// 5. Reemplaza 'TU_FORMSPREE_ID' abajo con tu ID

const FORMSPREE_ENDPOINT = 'TU_FORMSPREE_ID'; // Ejemplo: 'xwkgrglo'

// ============================================
// CÓDIGO DEL FORMULARIO CON FORMSPREE
// ============================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        try {
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            
            // Deshabilitar botón
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            // Verificar si Formspree está configurado
            if (FORMSPREE_ENDPOINT === 'TU_FORMSPREE_ID') {
                console.warn('⚠️ Formspree no configurado');
                alert('Configuración pendiente. Por favor configura Formspree primero.');
                return;
            }
            
            // Enviar a Formspree
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('¡Mensaje enviado exitosamente! Te responderé pronto.');
                contactForm.reset();
            } else {
                throw new Error('Error al enviar');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ============================================
// INSTRUCCIONES DETALLADAS
// ============================================

/*
OPCIÓN 1: FORMSPREE (MÁS SIMPLE)
================================
1. Ve a https://formspree.io/
2. Regístrate gratis (50 envíos/mes)
3. Crea un nuevo formulario
4. Copia el ID que te dan (ejemplo: xwkgrglo)
5. Reemplaza 'TU_FORMSPREE_ID' arriba con ese ID
6. ¡Listo! Los emails llegarán al correo con el que te registraste

Ventajas:
✓ Configuración en 2 minutos
✓ No necesitas tocar el HTML
✓ 50 envíos gratis al mes
✓ Anti-spam incluido

OPCIÓN 2: EMAILJS (MÁS FLEXIBLE)
=================================
Si prefieres EmailJS, usa el archivo main.js original y sigue CONFIGURACION_EMAILJS.md

Ventajas:
✓ 200 envíos gratis al mes
✓ Más opciones de personalización
✓ Puedes cambiar el remitente

OPCIÓN 3: WEB3FORMS (SIN JAVASCRIPT)
=====================================
1. Ve a https://web3forms.com/
2. Obtén una Access Key gratuita
3. Modifica tu formulario en index.html así:

<form action="https://api.web3forms.com/submit" method="POST" class="contact-form">
    <input type="hidden" name="access_key" value="TU_ACCESS_KEY">
    <input type="text" name="name" placeholder="Tu Nombre" required>
    <input type="email" name="email" placeholder="Tu Email" required>
    <textarea name="message" placeholder="Tu Mensaje" rows="5" required></textarea>
    <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
</form>

Ventajas:
✓ No requiere JavaScript
✓ Funciona sin este archivo .js
✓ Muy simple y confiable
*/
