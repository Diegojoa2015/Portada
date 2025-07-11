/**
 * Script principal para La Voz Libre
 * Funcionalidades del menú de navegación
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeMenuFunctionality();
});

/**
 * Inicializa la funcionalidad del menú hamburguesa
 */
function initializeMenuFunctionality() {
    const iconoMenu = document.querySelector('.icono-menu');
    const menuNavegacion = document.querySelector('.menu-navegacion');
    
    // Verificar que los elementos existen antes de agregar event listeners
    if (!iconoMenu || !menuNavegacion) {
        console.warn('Elementos del menú no encontrados');
        return;
    }
    
    // Agregar event listener para el toggle del menú
    iconoMenu.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace (para móviles)
    const menuLinks = menuNavegacion.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Cerrar menú al hacer clic fuera (para móviles)
    document.addEventListener('click', function(event) {
        if (!iconoMenu.contains(event.target) && !menuNavegacion.contains(event.target)) {
            closeMenu();
        }
    });
    
    // Cerrar menú al presionar Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

/**
 * Alterna la visibilidad del menú
 */
function toggleMenu() {
    const menuNavegacion = document.querySelector('.menu-navegacion');
    const iconoMenu = document.querySelector('.icono-menu');
    
    menuNavegacion.classList.toggle('menu-activo');
    
    // Cambiar icono y aria-label para accesibilidad
    if (menuNavegacion.classList.contains('menu-activo')) {
        iconoMenu.setAttribute('aria-label', 'Cerrar menú');
        iconoMenu.innerHTML = '✕';
    } else {
        iconoMenu.setAttribute('aria-label', 'Abrir menú');
        iconoMenu.innerHTML = '☰';
    }
}

/**
 * Cierra el menú
 */
function closeMenu() {
    const menuNavegacion = document.querySelector('.menu-navegacion');
    const iconoMenu = document.querySelector('.icono-menu');
    
    if (menuNavegacion.classList.contains('menu-activo')) {
        menuNavegacion.classList.remove('menu-activo');
        iconoMenu.setAttribute('aria-label', 'Abrir menú');
        iconoMenu.innerHTML = '☰';
    }
}
