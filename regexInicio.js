const loginForm = document.querySelector('form');
const spinner = document.getElementById('spinner');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 1. Esto agarra lo que el usuario escribio
    const emailIngresado = loginForm.querySelector('input[type="email"]').value;
    const passwordIngresada = loginForm.querySelector('input[type="password"]').value;

    // 2. Esto busca al usuario que se guarda en el JSON durante el registro
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioBanca360'));


    // 3. Regex
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

    if (usuarioGuardado && 
        usuarioGuardado.email === emailIngresado && 
        usuarioGuardado.password === passwordIngresada) {
        
        // Se activa el spinner
        spinner.style.display = 'flex';
        setTimeout(() => {
            window.location.href = 'verificacionSeguridad.html';
        }, 2000);

    } else {
        alert("Error: El usuario no existe o los datos son incorrectos. Asegúrate de haber completado el registro primero.");
        spinner.style.display = 'none'; 
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