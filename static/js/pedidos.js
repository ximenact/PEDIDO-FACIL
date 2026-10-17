
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('pedido-form');

    if (!formulario) {
        return;
    }

    const numero = document.getElementById('id_numero_pedido');
    const cliente = document.getElementById('id_cliente');
    const descripcion = document.getElementById('id_descripcion');
    const valorTotal = document.getElementById('id_valor_total');
    const estado = document.getElementById('id_estado');

    function validarCampo(campo) {
        if (!campo) {
            return true;
        }

        const contenedor = campo.closest('.mb-3');
        const mensaje = contenedor
            ? contenedor.querySelector('.js-error')
            : null;

        let error = '';

        switch (campo.id) {
            case 'id_numero_pedido':
                if (!campo.value.trim()) {
                    error = 'El número de pedido es obligatorio.';
                } else if (campo.value.trim().length > 50) {
                    error = 'El número de pedido no puede superar los 50 caracteres.';
                }
                break;

            case 'id_cliente':
                if (!campo.value.trim()) {
                    error = 'El nombre del cliente es obligatorio.';
                } else if (campo.value.trim().length < 3) {
                    error = 'El nombre del cliente debe tener al menos 3 caracteres.';
                } else if (campo.value.length > 150) {
                    error = 'El nombre del cliente no puede superar los 150 caracteres.';
                }
                break;

            case 'id_descripcion':
                if (!campo.value.trim()) {
                    error = 'La descripción del pedido es obligatoria.';
                } else if (campo.value.length > 500) {
                    error = 'La descripción no puede superar los 500 caracteres.';
                }
                break;

            case 'id_valor_total': {
                const valor = Number(campo.value);

                if (!campo.value.trim()) {
                    error = 'El valor total es obligatorio.';
                } else if (!Number.isFinite(valor) || valor <= 0) {
                    error = 'El valor total debe ser mayor que cero.';
                }
                break;
            }

            case 'id_estado':
                if (!['pendiente', 'confirmado', 'cancelado'].includes(campo.value)) {
                    error = 'Selecciona un estado válido.';
                }
                break;
        }

        campo.classList.toggle('is-invalid', Boolean(error));
        campo.setAttribute('aria-invalid', error ? 'true' : 'false');

        if (mensaje) {
            mensaje.textContent = error;
        }

        return !error;
    }

    const campos = [
        numero,
        cliente,
        descripcion,
        valorTotal,
        estado
    ].filter(Boolean);

    campos.forEach(function (campo) {
        campo.addEventListener('input', function () {
            validarCampo(campo);
        });

        campo.addEventListener('change', function () {
            validarCampo(campo);
        });

        campo.addEventListener('blur', function () {
            validarCampo(campo);
        });
    });

    formulario.addEventListener('submit', function (evento) {
        let formularioValido = true;

        campos.forEach(function (campo) {
            if (!validarCampo(campo)) {
                formularioValido = false;
            }
        });

        if (!formularioValido) {
            evento.preventDefault();

            const primerCampoInvalido =
                formulario.querySelector('.is-invalid');

            if (primerCampoInvalido) {
                primerCampoInvalido.focus();
            }
        }
    });
});
