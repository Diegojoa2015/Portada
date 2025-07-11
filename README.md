# Portada de Diario - La Voz Libre

Este es un proyecto de ejemplo para la materia DESARROLLO Y ARQUITECTURAS WEB

## Descripción del Proyecto

Sitio web de un diario digital que incluye:
- **Página principal** (`index.html`): Portada con noticias destacadas y secundarias
- **Página de suscripción** (`subscription.html`): Formulario completo de suscripción con validaciones

## Funcionalidades Implementadas

### Semana 08
- ✅ Diseño responsive con Flexbox y CSS Grid
- ✅ Formulario de suscripción con validación en tiempo real
- ✅ Validación de campos (email, contraseñas, DNI, teléfono, etc.)
- ✅ Saludo dinámico basado en el nombre ingresado

### Semana 09 (Nuevas funcionalidades)
- ✅ **Envío HTTP**: Los datos del formulario se envían a `https://jsonplaceholder.typicode.com/posts` mediante fetch API
- ✅ **Modal personalizado**: Muestra resultados del envío (éxito o error) en lugar de alerts
- ✅ **LocalStorage**: Guarda datos exitosos y los recarga automáticamente al refrescar la página
- ✅ **Manejo de errores**: Gestión completa de errores de red y respuestas HTTP
- ✅ **Estados visuales**: Indicador de carga durante el envío y estados de éxito/error en el modal

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Flexbox, Grid, animaciones y responsive design
- **JavaScript ES6+**: Fetch API, async/await, LocalStorage, manipulación del DOM
- **APIs externas**: JSONPlaceholder para pruebas de envío HTTP

## Instrucciones de Uso

1. **Página Principal**: Navega por las noticias destacadas y secundarias
2. **Suscripción**: 
   - Completa todos los campos del formulario
   - Los campos se validan en tiempo real al perder el foco
   - Al enviar, se valida todo el formulario
   - Si hay errores, se muestran en un modal
   - Si es exitoso, se envía al servidor y se guarda en LocalStorage
   - Los datos guardados se recargan automáticamente la próxima vez

## Validaciones Implementadas

- **Nombre**: Mínimo 6 letras con un espacio (nombre y apellido)
- **Email**: Formato válido de email
- **Contraseña**: Mínimo 8 caracteres con letras y números
- **Confirmar contraseña**: Debe coincidir con la contraseña
- **Edad**: Debe ser mayor de 18 años
- **Teléfono**: Solo números, mínimo 7 dígitos
- **Dirección**: Mínimo 5 caracteres con espacio
- **Ciudad**: Mínimo 3 caracteres
- **Código postal**: Mínimo 3 caracteres
- **DNI**: 7 u 8 dígitos numéricos

## Estructura del Proyecto

```
/
├── index.html              # Página principal
├── subscription.html       # Página de suscripción
├── style.css              # Estilos principales
├── subscription.css       # Estilos específicos de suscripción
├── script.js              # Scripts generales
├── subscription.js        # Scripts del formulario de suscripción
└── README.md              # Este archivo
```

## GitHub Pages

🌐 **Demo en vivo**: [https://diegojoa2015.github.io/Portada-1/](https://diegojoa2015.github.io/Portada-1/)

## Repositorio

📦 **Código fuente**: [https://github.com/diegojoa2015/Portada-1](https://github.com/diegojoa2015/Portada-1)

---

**Autor**: Diego  
**Materia**: Desarrollo y Arquitecturas Web  
**Fecha**: Julio 2025
