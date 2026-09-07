document.addEventListener('DOMContentLoaded', () => {

    /*Logica Portal Cliente*/
    const formCita = document.getElementById('form-cita');
    
    if (formCita) {
        formCita.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const campos = formCita.querySelectorAll('[required]');
            let esValido = true;

            /*Validación de campos vacíos*/
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
                /*Captura de datos*/
                const nombreDueno = document.getElementById('nombre_dueno').value;
                const nombreMascota = document.getElementById('nombre_mascota').value;
                const motivoSelect = document.getElementById('motivo');
                const motivoTexto = motivoSelect.options[motivoSelect.selectedIndex].text;
                const fechaInput = document.getElementById('fecha').value;

                const fechaFormateada = new Date(fechaInput).toLocaleString('es-CL', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                });

                /*Agregar cita al historial*/
                const seccionHistorial = document.getElementById('historial');
                if (seccionHistorial) {
                    const nuevaCitaHTML = document.createElement('div');
                    nuevaCitaHTML.style.marginTop = '2rem';
                    nuevaCitaHTML.style.paddingTop = '1rem';
                    nuevaCitaHTML.style.borderTop = '1px solid var(--b)';
                    
                    nuevaCitaHTML.innerHTML = `
                        <h3 style="color: var(--s);">Cita Recién Agendada: ${nombreMascota}</h3>
                        <span class="txt-suave">Tutor: ${nombreDueno}</span>
                        <ul style="list-style: none; margin-top: 1rem;">
                            <li><strong>Fecha:</strong> ${fechaFormateada}</li>
                            <li><strong>Servicio Solicitado:</strong> ${motivoTexto}</li>
                            <li style="color: orange; margin-top: 0.5rem; font-weight: bold;">Estado: Agendada en el sistema</li>
                        </ul>
                    `;
                    seccionHistorial.appendChild(nuevaCitaHTML);
                }

                /*Agregar a Recordatorios*/
                const seccionRecordatorios = document.getElementById('recordatorios');
                if (seccionRecordatorios) {
                    const nuevaAlerta = document.createElement('div');
                    nuevaAlerta.className = 'alerta alerta-info'; 
                    nuevaAlerta.innerHTML = `
                        <strong>¡Cita Confirmada!</strong> Acabas de agendar: ${motivoTexto} para ${nombreMascota} el ${fechaFormateada}.
                    `;
                    
                    const tituloRecordatorios = seccionRecordatorios.querySelector('h2');
                    tituloRecordatorios.insertAdjacentElement('afterend', nuevaAlerta);
                }

                /*Mensaje final, limpieza y scroll*/
                if (mensaje) {
                    mensaje.textContent = `¡Cita para ${nombreMascota} registrada correctamente!`;
                    mensaje.style.color = "green";
                    mensaje.style.fontWeight = "bold";
                }
                
                formCita.reset(); 
                
                //Sube la pantalla a los recordatorios para mostrar la confirmación
                seccionRecordatorios.scrollIntoView({ behavior: 'smooth', block: 'start' });

            } else {
                if (mensaje) {
                    mensaje.textContent = "Complete todos los campos obligatorios.";
                    mensaje.style.color = "red";
                }
            }
        });
    }

    /*Logica Portal Veterinario*/
    const formLogin = document.getElementById('form-login');
    const seccionLogin = document.getElementById('login-vet');
    const seccionAgenda = document.getElementById('agenda-vet');
    const btnSalir = document.getElementById('btn-salir');

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

            correo.classList.remove('campo-invalido');
            rut.classList.remove('campo-invalido');

            if (!correo.value.includes('@')) {
                correo.classList.add('campo-invalido');
                esValido = false;
            }

            if (!validarRUT(rut.value.trim())) {
                rut.classList.add('campo-invalido');
                esValido = false;
            }

            if (esValido) {
                seccionLogin.classList.add('oculto');
                seccionAgenda.classList.remove('oculto');
                formLogin.reset();
                if(mensaje) mensaje.textContent = "";
            } else {
                if(mensaje) {
                    mensaje.textContent = "Error: Ingrese un correo válido y un RUT con formato 12345678-9.";
                    mensaje.style.color = "red";
                }
            }
        });
    }

    if (btnSalir) {
        btnSalir.addEventListener('click', () => {
            seccionAgenda.classList.add('oculto');
            seccionLogin.classList.remove('oculto');
        });
    }
});