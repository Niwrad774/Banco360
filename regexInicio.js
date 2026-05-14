const loginForm = document.querySelector('form');
const spinner = document.getElementById('spinner');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 1. Capturamos lo que el usuario escribió
    const emailIngresado = loginForm.querySelector('input[type="email"]').value;
    const passwordIngresada = loginForm.querySelector('input[type="password"]').value;

    // 2. Buscamos al usuario que guardamos en el localStorage durante el registro
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioBanca360'));

    // --- DEBUG: Esto te permite ver en la consola (F12) si el sistema encuentra al usuario ---
    console.log("Datos en el sistema:", usuarioGuardado);
    console.log("Intentando entrar con:", emailIngresado, passwordIngresada);

    // 3. Validaciones de formato (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^\d{6}$/; 

    if (!emailRegex.test(emailIngresado)) {
        alert("Correo inválido.");
        return;
    }
    if (!passRegex.test(passwordIngresada)) {
        alert("La clave debe ser de 6 números.");
        return;
    }

    // 4. VERIFICACIÓN REAL
    // Comparamos lo ingresado contra lo guardado
    if (usuarioGuardado && 
        usuarioGuardado.email === emailIngresado && 
        usuarioGuardado.password === passwordIngresada) {
        
        // Si todo coincide: Activamos spinner y vamos a la pregunta de seguridad
        spinner.style.display = 'flex';
        setTimeout(() => {
            window.location.href = 'verificacionSeguridad.html';
        }, 2000);

    } else {
        // Si no coincide o el usuario no existe en localStorage
        alert("Error: El usuario no existe o los datos son incorrectos. Asegúrate de haber completado el registro primero.");
        spinner.style.display = 'none'; // Por si acaso se quedó activado
    }
});

const togglePass = document.getElementById('togglePass');
const passInput = document.getElementById('passInput');
const eyeIcon = document.getElementById('eyeIcon');

togglePass.addEventListener('click', () => {
    const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
    
    passInput.setAttribute('type', type);
    
    if (type === 'text') {
        eyeIcon.setAttribute('name', 'eye-off-outline');
    } else {
        eyeIcon.setAttribute('name', 'eye-outline');
    }
});