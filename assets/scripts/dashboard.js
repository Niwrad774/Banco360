// 1. Lógica del Saldo (Ocultar/Mostrar)
const btnOjo = document.getElementById('btn-ojo');
const textoSaldo = document.getElementById('texto-saldo');
let saldoVisible = true;

btnOjo.addEventListener('click', () => {
    saldoVisible = !saldoVisible;
    if (saldoVisible) {
        textoSaldo.textContent = "$ 12.850,00";
    } else {
        textoSaldo.textContent = "*******";
    }
});

// 2. Lógica de Cambio de Tema
const btnTema = document.getElementById('btn-tema');
btnTema.addEventListener('click', () => {
    const doc = document.documentElement;
    const temaActual = doc.getAttribute('data-theme');
    const nuevoTema = temaActual === 'light' ? 'dark' : 'light';
    doc.setAttribute('data-theme', nuevoTema);
});