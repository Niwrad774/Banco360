const transacciones = [
    { ref: 'REF-9821', fecha: '12 May', desc: 'Pago Móvil Farmatodo', monto: '-$ 12.00', tipo: 'salida' },
    { ref: 'REF-7732', fecha: '11 May', desc: 'Transferencia Recibida', monto: '+$ 50.00', tipo: 'entrada' },
    { ref: 'REF-1102', fecha: '10 May', desc: 'Depósito Efectivo', monto: '+$ 20.00', tipo: 'entrada' },
    { ref: 'REF-0045', fecha: '09 May', desc: 'Suscripción Netflix', monto: '-$ 10.00', tipo: 'salida' },
    { ref: 'REF-0099', fecha: '08 May', desc: 'Pago Móvil Panadería', monto: '-$ 5.00', tipo: 'salida' },
    { ref: 'REF-8811', fecha: '07 May', desc: 'Venta Marketplace', monto: '+$ 120.00', tipo: 'entrada' }
];

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupHamburger();
    setupEye();
    renderData();
});

// 1. Menú Hamburguesa
function setupHamburger() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('nav-dropdown');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('show');
    });

    document.addEventListener('click', () => menu.classList.remove('show'));
}

// 2. Lógica del Ojo
function setupEye() {
    const btn = document.getElementById('btn-ojo');
    const saldo = document.getElementById('texto-saldo');
    if (!btn) return;

    let visible = true;
    btn.addEventListener('click', () => {
        visible = !visible;
        saldo.textContent = visible ? "$ 12.850,00" : "••••••••";
        document.getElementById('icono-ojo').setAttribute('name', visible ? 'eye-outline' : 'eye-off-outline');
    });
}

// 3. Inyectar datos en tablas
function renderData() {
    const resumen = document.getElementById('tabla-resumen');
    const historial = document.getElementById('tabla-historial');

    if (resumen) renderRows(transacciones.slice(0, 6), resumen);
    if (historial) renderRows(transacciones, historial);
}

function renderRows(datos, contenedor) {
    if (!contenedor) return;

    contenedor.innerHTML = datos.map(t => `
        <tr onclick="verComprobante('${t.ref}', '${t.fecha}', '${t.desc}', '${t.monto}')">
            <td>${t.fecha}</td>
            <td><strong>${t.desc}</strong></td>
            <td style="color: ${t.monto.includes('+') ? 'var(--success-green)' : 'var(--error-red)'}; font-weight: bold; text-align: right;">
                ${t.monto}
            </td>
        </tr>
    `).join('');
}

// 4. LÓGICA DE FILTRADO (Reparada)
function filtrar(tipo, btn) {
    const botones = document.querySelectorAll('.opt-filter');
    botones.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const tablaHistorial = document.getElementById('tabla-historial');
    if (!tablaHistorial) return;

    const datosFiltrados = tipo === 'todos'
        ? transacciones
        : transacciones.filter(t => t.tipo === tipo);

    renderRows(datosFiltrados, tablaHistorial);
}

// 6. Modo Oscuro
function initTheme() {
    const btn = document.getElementById('btn-tema');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        btn.innerHTML = theme === 'light' ? '<ion-icon name="moon-outline"></ion-icon>' : '<ion-icon name="sunny-outline"></ion-icon>';
        localStorage.setItem('theme', theme);
    });

    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
}