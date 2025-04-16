document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const tablaBody = document.querySelector('#tablaVisitantes tbody');

    const campos = {
        cedula: {
            regex: /^\d{3}-\d{6}-\d{4}[A-Z]$/,
            errorId: 'cedulaError',
            mensaje: 'Formato inválido. Ejemplo: 999-999999-9999X (con letra mayúscula final)'
        },
        nombres: {
            regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ\s]{2,}$/,
            errorId: 'nombresError',
            mensaje: 'Debe iniciar con mayúscula, tener al menos 3 letras y no contener números.'
        },
        apellidos: {
            regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ\s]{2,}$/,
            errorId: 'apellidosError',
            mensaje: 'Debe iniciar con mayúscula, tener al menos 3 letras y no contener números.'
        },
        departamento: {
            errorId: 'departamentoError',
            mensaje: 'Seleccione un departamento.'
        },
        motivo: {
            errorId: 'motivoError',
            mensaje: 'Ingrese el motivo de la visita.'
        }
    };

    const mostrarError = (campo, mensaje) => {
        const errorSpan = document.getElementById(campos[campo].errorId);
        errorSpan.textContent = mensaje;
        errorSpan.style.display = 'block';
    };

    const ocultarErrores = () => {
        Object.values(campos).forEach(campo => {
            const span = document.getElementById(campo.errorId);
            span.textContent = '';
            span.style.display = 'none';
        });
    };

    const validarFormulario = () => {
        ocultarErrores();
        let esValido = true;

        for (const campo in campos) {
            const input = document.getElementById(campo);
            const valor = input.value.trim();
            const { regex, mensaje } = campos[campo];

            if (!valor) {
                mostrarError(campo, mensaje);
                esValido = false;
            } else if (regex && !regex.test(valor)) {
                mostrarError(campo, mensaje);
                esValido = false;
            }
        }

        return esValido;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validarFormulario()) {
            const cedula = document.getElementById('cedula').value.trim();
            const nombres = document.getElementById('nombres').value.trim();
            const apellidos = document.getElementById('apellidos').value.trim();
            const departamento = document.getElementById('departamento').value;
            const motivo = document.getElementById('motivo').value.trim();
            const fechaHora = new Date().toLocaleString();

            const nuevaFila = document.createElement('tr');
            nuevaFila.innerHTML = `
                <td>${cedula}</td>
                <td>${nombres}</td>
                <td>${apellidos}</td>
                <td>${departamento}</td>
                <td>${motivo}</td>
                <td>${fechaHora}</td>
            `;

            tablaBody.appendChild(nuevaFila);
            form.reset();
        }
    });
});
