/**
 * Script para el formulario de suscripción - La Voz Libre
 * Maneja validación de formularios y funcionalidades específicas de suscripción
 */

document.addEventListener("DOMContentLoaded", () => {
  initializeSubscriptionForm();
});

/**
 * Inicializa el formulario de suscripción con todas sus validaciones
 */
function initializeSubscriptionForm() {
  const form = document.getElementById("formulario");
  const nombreInput = document.getElementById("nombre");
  const saludo = document.getElementById("greeting");

  // Verificar que los elementos existen
  if (!form || !nombreInput || !saludo) {
    console.warn('Elementos del formulario de suscripción no encontrados');
    return;
  }

  // Configuración de validaciones para cada campo
  const campos = [
    { id: "nombre", val: v => /^[A-Za-zÁÉÍÓÚÑáéíóúñ]{3,}\s[A-Za-zÁÉÍÓÚÑáéíóúñ]{3,}$/.test(v.trim()), msg: "Debe tener más de 6 letras y un espacio" },
    { id: "email", val: v => /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(v), msg: "Email inválido" },
    { id: "password", val: v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v), msg: "Mínimo 8 caracteres, letras y números" },
    { id: "confirmar", val: () => document.getElementById("confirmar").value === document.getElementById("password").value, msg: "Las contraseñas no coinciden" },
    { id: "edad", val: v => Number.isInteger(+v) && +v >= 18, msg: "Debe ser mayor de 18" },
    { id: "telefono", val: v => /^\d{7,}$/.test(v), msg: "Teléfono inválido (solo números, mínimo 7 dígitos)" },
    { id: "direccion", val: v => /^.+\s.+$/.test(v) && v.length >= 5, msg: "Dirección inválida" },
    { id: "ciudad", val: v => v.length >= 3, msg: "Ciudad inválida" },
    { id: "codigo", val: v => v.length >= 3, msg: "Código postal inválido" },
    { id: "dni", val: v => /^\d{7,8}$/.test(v), msg: "DNI inválido" }
  ];

  // Agregar eventos de validación a cada campo
  setupFieldValidation(campos);
  
  // Configurar evento de envío del formulario
  setupFormSubmission(form, campos);
  
  // Configurar saludo dinámico
  setupDynamicGreeting(nombreInput, saludo);
}

/**
 * Configura la validación para todos los campos del formulario
 */
function setupFieldValidation(campos) {
  campos.forEach(({ id, val, msg }) => {
    const input = document.getElementById(id);
    if (!input) return;
    
    const span = input.nextElementSibling;

    // Validación al perder el foco
    input.addEventListener("blur", () => {
      const valido = typeof val === "function" ? val(input.value) : true;
      updateFieldValidation(input, span, valido, msg);
    });

    // Limpiar errores al hacer foco
    input.addEventListener("focus", () => {
      clearFieldValidation(input, span);
    });
  });
}

/**
 * Actualiza el estado visual de validación de un campo
 */
function updateFieldValidation(input, span, valido, mensaje) {
  if (!valido) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    if (span) span.textContent = mensaje;
  } else {
    input.classList.remove("invalid");
    input.classList.add("valid");
    if (span) span.textContent = "";
  }
}

/**
 * Limpia el estado de validación de un campo
 */
function clearFieldValidation(input, span) {
  input.classList.remove("invalid");
  if (span) span.textContent = "";
}

/**
 * Configura el evento de envío del formulario
 */
function setupFormSubmission(form, campos) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    
    let errores = [];
    
    // Validar todos los campos
    campos.forEach(({ id, val, msg }) => {
      const input = document.getElementById(id);
      if (!input) return;
      
      const valido = typeof val === "function" ? val(input.value) : true;
      if (!valido) {
        errores.push(`${id}: ${msg}`);
      }
    });

    // Mostrar resultado
    if (errores.length > 0) {
      showFormErrors(errores);
    } else {
      showFormSuccess(campos);
    }
  });
}

/**
 * Muestra los errores del formulario
 */
function showFormErrors(errores) {
  alert("Errores encontrados:\n" + errores.join("\n"));
}

/**
 * Muestra el éxito del envío del formulario
 */
function showFormSuccess(campos) {
  const datos = campos.map(({ id }) => {
    const input = document.getElementById(id);
    const valor = input ? input.value : '';
    return `${id}: ${valor}`;
  }).join("\n");
  
  alert("¡Formulario enviado con éxito!\n\nDatos registrados:\n" + datos);
}

/**
 * Configura el saludo dinámico basado en el nombre
 */
function setupDynamicGreeting(nombreInput, saludo) {
  const updateGreeting = () => {
    const nombre = nombreInput.value.trim();
    saludo.textContent = nombre ? `HOLA ${nombre.toUpperCase()}` : "HOLA";
  };

  // Actualizar saludo mientras escribe
  nombreInput.addEventListener("input", updateGreeting);
  
  // Actualizar saludo al hacer foco
  nombreInput.addEventListener("focus", updateGreeting);
}
