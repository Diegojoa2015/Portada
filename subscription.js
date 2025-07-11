/**
 * Script para el formulario de suscripción - La Voz Libre
 * Maneja validación de formularios y funcionalidades específicas de suscripción
 */

document.addEventListener("DOMContentLoaded", () => {
  initializeSubscriptionForm();
  loadSavedData();
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
  form.addEventListener("submit", async e => {
    e.preventDefault();
    
    let errores = [];
    
    // Validar todos los campos
    campos.forEach(({ id, val, msg }) => {
      const input = document.getElementById(id);
      if (!input) return;
      
      const valido = typeof val === "function" ? val(input.value) : true;
      if (!valido) {
        errores.push(`${id}: ${msg}`);
        // Marcar campo como inválido visualmente
        const span = input.nextElementSibling;
        updateFieldValidation(input, span, false, msg);
      }
    });

    // Si hay errores, mostrarlos y no enviar
    if (errores.length > 0) {
      showFormErrors(errores);
      return;
    }

    // Si no hay errores, proceder con el envío
    await handleFormSubmission(campos);
  });
}

/**
 * Muestra los errores del formulario
 */
function showFormErrors(errores) {
  showModal('Error de Validación', 'Por favor, corrige los siguientes errores:', errores.join('\n'), 'error');
}

/**
 * Maneja el envío del formulario al servidor
 */
async function handleFormSubmission(campos) {
  // Recolectar datos del formulario
  const formData = {};
  campos.forEach(({ id }) => {
    const input = document.getElementById(id);
    if (input) {
      formData[id] = input.value;
    }
  });

  // Mostrar indicador de carga
  const submitButton = document.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.innerHTML = '<span class="loading"></span> Enviando...';
  submitButton.disabled = true;

  try {
    // Enviar datos al servidor
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const responseData = await response.json();
    
    // Éxito: guardar en localStorage y mostrar modal de éxito
    saveToLocalStorage(formData, responseData);
    showModal(
      'Envío Exitoso', 
      '¡Tu suscripción ha sido enviada correctamente!', 
      responseData, 
      'success'
    );

  } catch (error) {
    // Error: mostrar modal de error
    console.error('Error al enviar formulario:', error);
    showModal(
      'Error en el Envío', 
      'Hubo un problema al enviar tu suscripción. Por favor, intenta nuevamente.', 
      { error: error.message, timestamp: new Date().toISOString() }, 
      'error'
    );
  } finally {
    // Restaurar botón
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

/**
 * Guarda los datos en localStorage
 */
function saveToLocalStorage(formData, responseData) {
  const dataToSave = {
    formData,
    responseData,
    timestamp: new Date().toISOString()
  };
  
  try {
    localStorage.setItem('laVozLibre_subscription', JSON.stringify(dataToSave));
    console.log('Datos guardados en localStorage');
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
}

/**
 * Carga los datos guardados del localStorage
 */
function loadSavedData() {
  try {
    const savedData = localStorage.getItem('laVozLibre_subscription');
    if (savedData) {
      const { formData } = JSON.parse(savedData);
      
      // Cargar datos en el formulario
      Object.keys(formData).forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (input && formData[fieldId]) {
          input.value = formData[fieldId];
          // Disparar evento para actualizar saludo si es el campo nombre
          if (fieldId === 'nombre') {
            input.dispatchEvent(new Event('input'));
          }
        }
      });
      
      console.log('Datos cargados desde localStorage');
    }
  } catch (error) {
    console.error('Error al cargar datos desde localStorage:', error);
  }
}

/**
 * Muestra el modal con el mensaje especificado
 */
function showModal(title, message, data, type = 'info') {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const modalData = document.getElementById('modal-data');
  const modalContent = modal.querySelector('.modal-content');

  // Limpiar clases anteriores
  modalContent.classList.remove('modal-success', 'modal-error');
  
  // Establecer contenido
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  
  // Añadir clase según el tipo
  if (type === 'success') {
    modalContent.classList.add('modal-success');
  } else if (type === 'error') {
    modalContent.classList.add('modal-error');
  }
  
  // Mostrar datos si se proporcionan
  if (data) {
    modalData.style.display = 'block';
    if (typeof data === 'object') {
      modalData.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    } else {
      modalData.innerHTML = '<pre>' + data + '</pre>';
    }
  } else {
    modalData.style.display = 'none';
  }
  
  // Mostrar modal
  modal.classList.add('show');
  
  // Configurar cierre del modal
  setupModalClose(modal);
}

/**
 * Configura los eventos para cerrar el modal
 */
function setupModalClose(modal) {
  const closeButton = document.getElementById('modal-close');
  
  // Cerrar con botón X
  const closeHandler = () => {
    modal.classList.remove('show');
  };
  
  closeButton.removeEventListener('click', closeHandler);
  closeButton.addEventListener('click', closeHandler);
  
  // Cerrar al hacer clic fuera del modal
  const outsideClickHandler = (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  };
  
  modal.removeEventListener('click', outsideClickHandler);
  modal.addEventListener('click', outsideClickHandler);
  
  // Cerrar con ESC
  const escHandler = (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
    }
  };
  
  document.removeEventListener('keydown', escHandler);
  document.addEventListener('keydown', escHandler);
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
