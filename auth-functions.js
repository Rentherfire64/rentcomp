/*
 * Archivo: auth-functions.js
 * Contiene toda la lógica de front-end para Firebase Authentication
 *
 * NOTA: Este archivo depende de que firebase-app.js, firebase-auth.js, y
 * la configuración inicial (const auth = firebase.auth();) se hayan cargado
 * previamente en tu archivo HTML.
 */

// --- VARIABLES DEL DOM Y DE FIREBASE ---

// Variables para los elementos dentro del Modal de Login
const loginModal = document.getElementById('login-modal');
const emailInput = document.getElementById('auth-email');
const passwordInput = document.getElementById('auth-password');
const messageDisplay = document.getElementById('auth-message');

// Variable para el botón de la cabecera (el que dice "Iniciar Sesión")
const authButton = document.getElementById('auth-button'); 


// --- MANEJO DEL MODAL ---

function mostrarModalLogin() {
    loginModal.style.display = 'flex'; // Muestra el modal (usando el estilo 'flex' para centrar)
}

function cerrarModalLogin() {
    loginModal.style.display = 'none'; // Oculta el modal
    emailInput.value = ''; // Limpia los campos
    passwordInput.value = '';
    messageDisplay.textContent = ""; // Limpia el mensaje de error/éxito
}


// --- FUNCIONES DE AUTENTICACIÓN ---

/**
 * Registra un nuevo cliente con email y contraseña.
 */
function registrarCliente() {
    const email = emailInput.value;
    const password = passwordInput.value;
    messageDisplay.textContent = "";

    // 1. Usar Firebase para crear el usuario
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const clienteID = user.uid; // ID ÚNICO DEL CLIENTE

            messageDisplay.textContent = "✅ ¡Registro exitoso! Ya puedes iniciar sesión.";
            
            // 2. OPCIONAL: Crear el documento inicial del cliente en Firestore
            // Esto es crucial para la personalización.
            db.collection("clientes").doc(clienteID).set({
                email: email,
                fechaRegistro: firebase.firestore.FieldValue.serverTimestamp(),
                // Puedes establecer preferencias iniciales, por ejemplo:
                es_interesado_3D: true, 
                es_interesado_Muebles: false
            });

        })
        .catch((error) => {
            // Mostrar error de registro al usuario
            messageDisplay.textContent = "❌ Error al registrar: " + error.message;
            console.error("Error de registro:", error.code, error.message);
        });
}


/**
 * Inicia la sesión de un cliente existente.
 */
function iniciarSesion() {
    const email = emailInput.value;
    const password = passwordInput.value;
    messageDisplay.textContent = "";

    // 1. Usar Firebase para iniciar sesión
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Éxito: El onAuthStateChanged se encargará de actualizar la UI
            cerrarModalLogin(); // Cierra el modal al iniciar sesión
            
        })
        .catch((error) => {
            // Mostrar error de login
            messageDisplay.textContent = "❌ Error de login. Verifica tu email y contraseña.";
            console.error("Error de login:", error.code, error.message);
        });
}

/**
 * Cierra la sesión del cliente actual.
 */
function cerrarSesion() {
    auth.signOut().then(() => {
        // La sesión se cerró. onAuthStateChanged actualizará la UI
        console.log("Sesión cerrada.");
    }).catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
}


// --- MANEJO DEL ESTADO DE LA SESIÓN (EL CORAZÓN DE LA PERSONALIZACIÓN) ---

/**
 * Esta función se ejecuta CADA VEZ que el estado de autenticación cambia (login, logout, recarga).
 */
auth.onAuthStateChanged((user) => {
    if (user) {
        // EL CLIENTE ESTÁ LOGUEADO
        console.log("Usuario activo:", user.uid);
        
        // 1. Actualiza el botón de la cabecera
        authButton.textContent = 'Cerrar Sesión';
        authButton.onclick = cerrarSesion; 
        
        // 2. Aquí llamarías a la función para cargar datos personalizados
        cargarDatosCliente(user.uid); 
        
    } else {
        // NINGÚN CLIENTE LOGUEADO
        console.log("Ningún usuario activo.");
        
        // 1. Actualiza el botón de la cabecera
        authButton.textContent = 'Iniciar Sesión';
        authButton.onclick = mostrarModalLogin; 

        // 2. Lógica para mostrar el catálogo general
        // mostrarCatalogoGeneral();
    }
});


/**
 * Función de ejemplo para cargar datos del cliente desde Firestore.
 * @param {string} clienteID El UID único proporcionado por Firebase.
 */
function cargarDatosCliente(clienteID) {
    db.collection("clientes").doc(clienteID).get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                console.log("Datos cargados. ¿Interesado en 3D?:", userData.es_interesado_3D);
                
                // Aquí iría tu lógica para PERSONALIZAR EL CATÁLOGO
                // if (userData.es_interesado_3D) {
                //    cargarProductosPorCategoria("Impresion 3D");
                // } else {
                //    cargarProductosPorCategoria("Muebles");
                // }
            } else {
                console.log("No se encontraron datos de perfil para este cliente.");
            }
        })
        .catch((error) => {
            console.error("Error al obtener datos del cliente:", error);
        });
}