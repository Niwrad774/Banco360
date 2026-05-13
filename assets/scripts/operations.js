document.addEventListener('DOMContentLoaded', () => {
    // 0. Lógica de Cambio de Tema con Persistencia
    const btnTema = document.getElementById('btn-tema');

    const cargarTema = () => {
        const temaGuardado = localStorage.getItem('banco360-tema') || 'light';
        document.documentElement.setAttribute('data-theme', temaGuardado);
    };

    cargarTema();

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            const doc = document.documentElement;
            const temaActual = doc.getAttribute('data-theme');
            const nuevoTema = temaActual === 'light' ? 'dark' : 'light';
            
            doc.setAttribute('data-theme', nuevoTema);
            localStorage.setItem('banco360-tema', nuevoTema);
        });
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
                <ion-icon name="checkmark-circle-outline"></ion-icon>
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
