
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('producto-form');

    if (!formulario) {
        return;
    }

    const nombre = document.getElementById('id_nombre');
    const descripcion = document.getElementById('id_descripcion');
    const precio = document.getElementById('id_precio');
    const cantidad = document.getElementById('id_cantidad_disponible');

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
            case 'id_nombre':
                if (!campo.value.trim()) {
                    error = 'El nombre es obligatorio.';
                } else if (campo.value.trim().length < 3) {
                    error = 'El nombre debe tener al menos 3 caracteres.';
                }
                break;

            case 'id_descripcion':
                if (!campo.value.trim()) {
                    error = 'La descripción es obligatoria.';
                } else if (campo.value.length > 500) {
                    error = 'La descripción no puede superar los 500 caracteres.';
                }
                break;

            case 'id_precio': {
                const valor = Number(campo.value);

                if (!campo.value.trim()) {
                    error = 'El precio es obligatorio.';
                } else if (!Number.isFinite(valor) || valor <= 0) {
                    error = 'El precio debe ser mayor que cero.';
                }
                break;
            }

            case 'id_cantidad_disponible': {
                const valor = Number(campo.value);

                if (!campo.value.trim()) {
                    error = 'La cantidad disponible es obligatoria.';
                } else if (!Number.isInteger(valor) || valor < 0) {
                    error = 'La cantidad debe ser un número entero igual o mayor que cero.';
                }
                break;
            }
        }

        campo.classList.toggle('is-invalid', Boolean(error));
        campo.setAttribute('aria-invalid', error ? 'true' : 'false');

        if (mensaje) {
            mensaje.textContent = error;
        }

        return !error;
    }

    const campos = [nombre, descripcion, precio, cantidad].filter(Boolean);

    campos.forEach(function (campo) {
        campo.addEventListener('input', function () {
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
