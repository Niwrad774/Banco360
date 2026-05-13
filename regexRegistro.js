document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
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

    // Feedback visual antes de configurar seguridad
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'flex';
    setTimeout(() => {
        window.location.href = 'preguntasSeguridad.html';
    }, 2000);
});