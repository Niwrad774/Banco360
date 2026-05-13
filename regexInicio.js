const loginForm = document.querySelector('form');
const spinner = document.getElementById('spinner');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Regex: Formato correo estándar y contraseña de 6 números exactos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^\d{6}$/; 

    if (!emailRegex.test(email)) {
        alert("Correo inválido. Por favor usa un formato correcto.");
        return;
    }
    if (!passRegex.test(password)) {
        alert("Clave inválida. Debe contener exactamente 6 caracteres numéricos.");
        return;
    }

    // Si es válido, activar Spinner por 2 segundos
    spinner.style.display = 'flex';
    setTimeout(() => {
        window.location.href = 'index.html'; // Redirige al Dashboard
    }, 2000);
});

const togglePass = document.getElementById('togglePass');
const passInput = document.getElementById('passInput');
const eyeIcon = document.getElementById('eyeIcon');

togglePass.addEventListener('click', () => {
    // Verificamos el tipo actual
    const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
    
    // Cambiamos el tipo
    passInput.setAttribute('type', type);
    
    // Cambiamos el ícono (ojo abierto / ojo cerrado)
    if (type === 'text') {
        eyeIcon.setAttribute('name', 'eye-off-outline');
    } else {
        eyeIcon.setAttribute('name', 'eye-outline');
    }
});