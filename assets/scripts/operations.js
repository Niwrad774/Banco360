document.addEventListener('DOMContentLoaded', () => {
    // 0. Lógica de Cambio de Tema con Persistencia
    const btnTema = document.getElementById('btn-tema');

    const svgMoon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    const svgSun = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

    const cargarTema = () => {
        const temaGuardado = localStorage.getItem('banco360-tema') || 'light';
        document.documentElement.setAttribute('data-theme', temaGuardado);
        if (btnTema) {
            const svg = btnTema.querySelector('svg');
            if (svg) {
                svg.innerHTML = temaGuardado === 'light' ? svgMoon : svgSun;
                if (temaGuardado === 'dark') {
                    svg.setAttribute('fill', 'none');
                    svg.setAttribute('stroke', 'currentColor');
                    svg.setAttribute('stroke-width', '2');
                    svg.setAttribute('stroke-linecap', 'round');
                    svg.setAttribute('stroke-linejoin', 'round');
                } else {
                    svg.setAttribute('fill', 'currentColor');
                    svg.removeAttribute('stroke');
                }
            }
        }
    };

    cargarTema();

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            const doc = document.documentElement;
            const temaActual = doc.getAttribute('data-theme');
            const nuevoTema = temaActual === 'light' ? 'dark' : 'light';

            doc.setAttribute('data-theme', nuevoTema);
            localStorage.setItem('banco360-tema', nuevoTema);
            const svg = btnTema.querySelector('svg');
            if (svg) {
                svg.innerHTML = nuevoTema === 'light' ? svgMoon : svgSun;
                if (nuevoTema === 'dark') {
                    svg.setAttribute('fill', 'none');
                    svg.setAttribute('stroke', 'currentColor');
                    svg.setAttribute('stroke-width', '2');
                    svg.setAttribute('stroke-linecap', 'round');
                    svg.setAttribute('stroke-linejoin', 'round');
                } else {
                    svg.setAttribute('fill', 'currentColor');
                    svg.removeAttribute('stroke');
                }
            }
        });
    }


    // Lógica de Menú Hamburguesa
    const btnHam = document.getElementById('hamburger-btn');
    const menuNav = document.getElementById('nav-dropdown');

    if (btnHam && menuNav) {
        btnHam.addEventListener('click', (e) => {
            e.stopPropagation();
            menuNav.classList.toggle('show');
        });
        document.addEventListener('click', () => menuNav.classList.remove('show'));
    }


    const formTransferencia = document.getElementById('form-transferencia');
    const formPagoMovil = document.getElementById('form-pagomovil');
    const formDeposito = document.getElementById('form-deposito');

    if (formTransferencia) {
        formTransferencia.addEventListener('submit', (e) => {
            e.preventDefault();
            const monto = document.getElementById('monto').value;
            const banco = document.getElementById('banco-destino').value;
            const cuenta = document.getElementById('numero-cuenta').value;

            showSuccess(`¡Transferencia exitosa!\nSe han enviado $${monto} al banco ${banco}, cuenta ${cuenta}.`);
        });
    }

    if (formPagoMovil) {
        formPagoMovil.addEventListener('submit', (e) => {
            e.preventDefault();
            const monto = document.getElementById('monto').value;
            const banco = document.getElementById('banco-destino').value;
            const tlf = document.getElementById('telefono').value;

            showSuccess(`¡Pago Móvil enviado!\nSe han enviado $${monto} al banco ${banco}, teléfono ${tlf}.`);
        });
    }

    if (formDeposito) {
        formDeposito.addEventListener('submit', (e) => {
            e.preventDefault();
            const monto = document.getElementById('monto').value;

            showSuccess(`¡Depósito exitoso!\nSe han abonado $${monto} a su cuenta.`);
        });
    }

    function showSuccess(message) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '9999';
        overlay.style.backdropFilter = 'blur(5px)';

        const card = document.createElement('div');
        card.style.backgroundColor = 'white';
        card.style.padding = '40px';
        card.style.borderRadius = '24px';
        card.style.textAlign = 'center';
        card.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
        card.style.maxWidth = '400px';
        card.style.animation = 'scaleIn 0.3s ease-out';

        card.innerHTML = `
            <div style="color: #2ecc71; font-size: 4rem; margin-bottom: 20px;">
                <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style="margin-bottom: 15px; color: #333;">Operación Exitosa</h3>
            <p style="color: #666; line-height: 1.5; margin-bottom: 25px;">${message.replace('\n', '<br>')}</p>
            <button id="btn-ok" style="background: #2837A1; color: white; border: none; padding: 12px 30px; border-radius: 12px; font-weight: bold; cursor: pointer;">Finalizar</button>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        document.getElementById('btn-ok').onclick = () => {
            window.location.href = 'dashboard.html';
        };

        // Add keyframe for scaleIn
        if (!document.getElementById('style-animation')) {
            const style = document.createElement('style');
            style.id = 'style-animation';
            style.innerHTML = `
                @keyframes scaleIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }
});
