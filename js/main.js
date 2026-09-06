document.addEventListener('DOMContentLoaded', () => {

    /*LOGICA PARA: PORTAL CLIENTE*/
    const formCita = document.getElementById('form-cita');
    if (formCita) {
        formCita.addEventListener('submit', (e) => {
            e.preventDefault(); /*Evita que recargue la página*/
            
            const campos = formCita.querySelectorAll('[required]');
            let esValido = true;

            /* Validación de campos vacíos*/
            campos.forEach(campo => {
                if (campo.value.trim() === '') {
                    campo.classList.add('campo-invalido');
                    esValido = false;
                } else {
                    campo.classList.remove('campo-invalido');
                }
            });

            const mensaje = document.getElementById('mensaje-cita');
            if (esValido) {
                mensaje.textContent = "¡Cita registrada correctamente!";
                mensaje.style.color = "green";
                mensaje.style.fontWeight = "bold";
                formCita.reset(); 
            } else {
                mensaje.textContent = "Complete todos los campos obligatorios.";
                mensaje.style.color = "red";
            }
        });
    }

    /*LOGICA PARA: PORTAL VETERINARIO*/
    const formLogin = document.getElementById('form-login');
    const seccionLogin = document.getElementById('login-vet');
    const seccionAgenda = document.getElementById('agenda-vet');
    const btnSalir = document.getElementById('btn-salir');

    /*Función para validar formato RUT básico (ej: 12345678-9)*/
    function validarRUT(rut) {
        const regex = /^[0-9]{7,8}-[0-9Kk]{1}$/;
        return regex.test(rut);
    }

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const correo = document.getElementById('correo-medico');
            const rut = document.getElementById('rut-medico');
            const mensaje = document.getElementById('mensaje-login');
            let esValido = true;

            /*Reiniciar estilos de error*/
            correo.classList.remove('campo-invalido');
            rut.classList.remove('campo-invalido');

            /*Validar si es correo*/
            if (!correo.value.includes('@')) {
                correo.classList.add('campo-invalido');
                esValido = false;
            }

            /*Validar formato del RUT*/
            if (!validarRUT(rut.value.trim())) {
                rut.classList.add('campo-invalido');
                esValido = false;
            }

            if (esValido) {
                /*Login exitoso: Ocultar login, mostrar agenda*/
                seccionLogin.classList.add('oculto');
                seccionAgenda.classList.remove('oculto');
                formLogin.reset();
                mensaje.textContent = "";
            } else {
                mensaje.textContent = "Error: Ingrese un correo válido y un RUT con formato 12345678-9.";
                mensaje.style.color = "red";
            }
        });
    }

    /*Botón cerrar sesión (vuelve a mostrar el login)*/
    if (btnSalir) {
        btnSalir.addEventListener('click', () => {
            seccionAgenda.classList.add('oculto');
            seccionLogin.classList.remove('oculto');
        });
    }

});