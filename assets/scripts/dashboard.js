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
        const icon = document.getElementById('icono-ojo');
        if (visible) {
            icon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
        } else {
            icon.innerHTML = '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>';
        }

    });
}

// 3. Inyectar datos en tablas
function renderData() {
    const resumen = document.getElementById('tabla-resumen');
    const historial = document.getElementById('tabla-historial');

    if (resumen) renderRows(transacciones.slice(0, 3), resumen);
    if (historial) renderRows(transacciones, historial);
}


function renderRows(datos, contenedor) {
    if (!contenedor) return;

    contenedor.innerHTML = datos.map(t => `
        <tr onclick="showDetail('${t.ref}')" style="cursor: pointer;">
            <td>${t.fecha}</td>
            <td><strong>${t.desc}</strong></td>
            <td style="color: ${t.monto.includes('+') ? 'var(--success-green)' : 'var(--error-red)'}; font-weight: bold; text-align: right;">
                ${t.monto}
            </td>
        </tr>
    `).join('');
}

function showDetail(ref) {
    const t = transacciones.find(item => item.ref === ref);
    if (!t) return;

    const modal = document.createElement('div');
    modal.id = 'modal-detalle';
    modal.className = 'spinner-overlay'; // Reusamos el estilo de overlay para el fondo oscuro
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="card" style="width: 90%; max-width: 400px; text-align: center; border: 1px solid rgba(40, 55, 161, 0.1); position: relative; padding: 30px;">
            <button onclick="document.getElementById('modal-detalle').remove()" 
                    style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: #999; cursor: pointer;">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <h2 style="color: var(--primary); margin-bottom: 25px; font-family: 'Outfit', sans-serif;">Detalle de Transacción</h2>
            <div style="text-align: left; margin-bottom: 30px; line-height: 2.2; font-size: 0.95rem; color: var(--text-main);">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 5px;"><strong>Referencia:</strong> <span>${t.ref}</span></div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 5px; margin-top: 10px;"><strong>Fecha:</strong> <span>${t.fecha} 2026</span></div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 5px; margin-top: 10px;"><strong>Descripción:</strong> <span>${t.desc}</span></div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 5px; margin-top: 10px;"><strong>Monto:</strong> <span style="color: ${t.monto.includes('+') ? 'var(--success-green)' : 'var(--error-red)'}; font-weight: bold;">${t.monto}</span></div>
            </div>
            <button onclick="document.getElementById('modal-detalle').remove()" 
                    style="width: 100%; padding: 14px; border-radius: 15px; border: none; background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; font-weight: 600; cursor: pointer; box-shadow: 0 8px 20px rgba(40, 55, 161, 0.25); transition: 0.3s;">
                Entendido
            </button>
        </div>
    `;

    document.body.appendChild(modal);
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

    const svgMoon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    const svgSun = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

    btn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        const svg = btn.querySelector('svg');
        svg.innerHTML = theme === 'light' ? svgMoon : svgSun;
        if (theme === 'dark') {
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '2');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');
        } else {
            svg.setAttribute('fill', 'currentColor');
            svg.removeAttribute('stroke');
        }
        localStorage.setItem('banco360-tema', theme);
    });

    const saved = localStorage.getItem('banco360-tema') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    const svg = btn.querySelector('svg');
    if (svg) {
        svg.innerHTML = saved === 'light' ? svgMoon : svgSun;
        if (saved === 'dark') {
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '2');
        } else {
            svg.setAttribute('fill', 'currentColor');
            svg.removeAttribute('stroke');
        }
    }
}