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

// 1. MEMORIA DE MODO OSCURO (Persistente entre páginas)
function initTheme() {
    const btn = document.getElementById('btn-tema');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (btn) {
        btn.innerHTML = savedTheme === 'light' ? '<ion-icon name="moon-outline"></ion-icon>' : '<ion-icon name="sunny-outline"></ion-icon>';
        
        btn.onclick = () => {
            const current = document.documentElement.getAttribute('data-theme');
            const nuevo = current === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', nuevo);
            localStorage.setItem('theme', nuevo);
            btn.innerHTML = nuevo === 'light' ? '<ion-icon name="moon-outline"></ion-icon>' : '<ion-icon name="sunny-outline"></ion-icon>';
        };
    }
}

// 2. FUNCIONES DEL MODAL (Comprobante de operación)
function verComprobante(ref, fecha, concepto, monto) {
    const modal = document.getElementById('modal-comprobante');
    if (!modal) return;

    document.getElementById('comp-ref').innerText = ref;
    document.getElementById('comp-fecha').innerText = fecha;
    document.getElementById('comp-concepto').innerText = concepto;
    document.getElementById('comp-monto').innerText = monto;
    
    modal.style.display = 'flex'; 
}

function cerrarModal() {
    const modal = document.getElementById('modal-comprobante');
    if (modal) modal.style.display = 'none';
}

// 3. RENDERIZADO DE DATOS (Cápsulas Aesthetic)
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

// 5. OTROS AJUSTES (Hamburguesa y Ojo de privacidad)
function setupHamburger() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('nav-dropdown');
    if(btn && menu) {
        btn.onclick = (e) => { 
            e.stopPropagation(); 
            menu.classList.toggle('show'); 
        };
        document.onclick = () => menu.classList.remove('show');
    }
}

function setupEye() {
    const btn = document.getElementById('btn-ojo');
    const saldo = document.getElementById('texto-saldo');
    if(btn && saldo) {
        let vis = true;
        btn.onclick = () => {
            vis = !vis;
            saldo.textContent = vis ? "$ 12.850,00" : "••••••••";
            document.getElementById('icono-ojo').setAttribute('name', vis ? 'eye-outline' : 'eye-off-outline');
        };
    }
}