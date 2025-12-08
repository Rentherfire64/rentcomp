// Función para cambiar la imagen de un producto
function cambiarImagen(imageId, newImageFileName) {
    // 1. Obtener el elemento de imagen por su ID
    const imagenElemento = document.getElementById(imageId);
    
    // Si el elemento existe, cambia su fuente (src)
    if (imagenElemento) {
        // 2. Definir la ruta base donde se guardan las imágenes
        // Asegúrate de que esta ruta coincida con la que usaste en el HTML
        const rutaBase = 'assets/imagenes/'; 
        
        // 3. Establecer la nueva fuente de la imagen
        imagenElemento.src = rutaBase + newImageFileName;
        
        // Opcional: Cambiar el texto alternativo (alt)
        const nombreLimpio = newImageFileName.replace('.jpg', '').replace(/-/g, ' ');
        imagenElemento.alt = nombreLimpio.charAt(0).toUpperCase() + nombreLimpio.slice(1);
    } else {
        console.error('Error: No se encontró el elemento con ID:', imageId);
    }
}