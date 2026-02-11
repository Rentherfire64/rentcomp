// 1. Obtener todos los elementos necesarios
// Utilizamos document.getElementsByClassName en lugar de querySelectorAll 
// para asegurar compatibilidad, aunque ambos funcionan.
const images = document.getElementsByClassName('carousel-image');
const nextButton = document.getElementById('nextButton');

// El tiempo de 5000 milisegundos (5 segundos) solicitado
const intervalTime = 5000; 

let currentIndex = 0;
let slideInterval;

// 2. Función principal para cambiar la imagen
function showNextImage() {
    // Si no hay imágenes, termina la función
    if (images.length === 0) return;

    // a. Oculta la imagen actual removiendo la clase 'active'
    images[currentIndex].classList.remove('active');

    // b. Calcula el índice de la siguiente imagen (vuelve a 0 si llega al final)
    currentIndex = (currentIndex + 1) % images.length;

    // c. Muestra la nueva imagen añadiendo la clase 'active'
    images[currentIndex].classList.add('active');
}

// 3. Función para iniciar el carrusel automático
function startCarousel() {
    if (images.length === 0) return;
    
    // Asegura que la PRIMERA imagen esté visible al cargar
    images[currentIndex].classList.add('active');

    // Configura el intervalo para llamar a showNextImage cada 5 segundos
    slideInterval = setInterval(showNextImage, intervalTime);
}

// 4. Lógica del botón: Cambia la imagen y REINICIA el temporizador
function handleButtonClick() {
    // Detiene el temporizador actual
    clearInterval(slideInterval);
    
    // Muestra inmediatamente la siguiente imagen
    showNextImage();

    // Reinicia el temporizador de 5 segundos
    // Esto evita que la imagen cambie inmediatamente después de tocar el botón
    slideInterval = setInterval(showNextImage, intervalTime);
}

// 5. Asignar el evento 'click' al botón rojo
nextButton.addEventListener('click', handleButtonClick);

// 6. Iniciar el carrusel cuando la página cargue
window.onload = startCarousel;

/* ================================== */
/* 6. ESTILOS DE LA PÁGINA DE CONTACTO */
/* ================================== */

.contact-section {
    padding: 60px 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.contact-header {
    text-align: center;
    margin-bottom: 50px;
}

.contact-header h1 {
    font-size: 3em;
    color: var(--primary-color);
    margin-bottom: 10px;
}

.contact-header p {
    font-size: 1.1em;
    color: #666;
}

.contact-container {
    display: flex;
    gap: 40px;
    margin-bottom: 60px;
}

.contact-form-col {
    flex: 2; /* Ocupa 2/3 del espacio */
    padding: 30px;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.contact-info-col {
    flex: 1; /* Ocupa 1/3 del espacio */
    padding: 30px;
    background-color: var(--light-gray);
    border-radius: 8px;
}

.contact-form-col h2, .contact-info-col h2, .contact-info-col h3 {
    color: var(--primary-color);
    margin-bottom: 20px;
    border-bottom: 2px solid var(--accent-color);
    padding-bottom: 5px;
    display: inline-block;
}

/* --- Estilos del Formulario --- */

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: var(--dark-text);
}

.contact-form input[type="text"],
.contact-form input[type="email"],
.contact-form textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
}

.contact-form textarea {
    resize: vertical;
}

.btn-submit {
    /* Mismo estilo que el botón de comprar */
    background-color: var(--primary-color);
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1em;
    text-transform: uppercase;
    transition: background-color 0.3s;
}

.btn-submit:hover {
    background-color: var(--accent-color);
}

/* --- Estilos de Información y WhatsApp --- */

.info-block {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.info-block i {
    font-size: 1.5em;
    color: var(--accent-color);
    width: 30px;
    text-align: center;
}

.info-block p {
    margin-left: 10px;
    color: var(--dark-text);
}

.btn-whatsapp {
    display: block;
    text-align: center;
    background-color: #25d366; /* Verde WhatsApp */
    color: white;
    padding: 15px;
    border-radius: 50px; /* Botón redondo */
    font-size: 1.2em;
    font-weight: 700;
    margin: 25px 0;
    transition: background-color 0.3s;
}

.btn-whatsapp:hover {
    background-color: #128c7e;
}

.btn-whatsapp i {
    margin-right: 10px;
}

.social-links a {
    font-size: 1.8em;
    margin-right: 15px;
    color: var(--primary-color);
    transition: color 0.3s;
}

.social-links a:hover {
    color: var(--accent-color);
}

/* --- Estilos del Mapa --- */

.contact-map {
    margin-top: 40px;
}

.contact-map h2 {
    text-align: center;
    margin-bottom: 20px;
    color: var(--primary-color);
}

.contact-map iframe {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Media Queries para Responsive Design */
@media (max-width: 900px) {
    .contact-container {
        flex-direction: column;
    }
    .contact-form-col, .contact-info-col {
        flex: auto;
        padding: 20px;
    }
}