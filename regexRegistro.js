
const listaUsuarios = [];

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.querySelectorAll('input')[0].value;
    const apellido = document.querySelectorAll('input')[1].value;
    const email = document.querySelectorAll('input')[2].value;
    const pass = document.getElementById('pass').value;
    const confirm = document.getElementById('confirmPass').value;
    
    const passRegex = /^\d{6}$/;

    if (!passRegex.test(pass)) {
        alert("La contraseña debe ser de exactamente 6 números.");
        return;
    }
    if (pass !== confirm) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    const nuevoUsuario = { nombre, apellido, email, password: pass };
    // Guardamos al usuario temporalmente en el navegador
    localStorage.setItem('usuarioTemp', JSON.stringify(nuevoUsuario));

    const spinner = document.getElementById('spinner');
    spinner.style.display = 'flex';

    // Esto redirije a las preguntas de seguridad
    setTimeout(() => {
        window.location.href = 'preguntasSeguridad.html';
    }, 2000);
});