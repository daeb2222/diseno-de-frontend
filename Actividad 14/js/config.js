document.addEventListener('DOMContentLoaded', () => {
    const configForm = document.getElementById('config-form');

    document.getElementById('nombre').value = localStorage.getItem('eventNombre') || '';
    document.getElementById('edad').value = localStorage.getItem('eventEdad') || '';
    document.getElementById('fecha').value = localStorage.getItem('eventFecha') || '';
    document.getElementById('lugar').value = localStorage.getItem('eventLugar') || '';

    configForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        const fecha = document.getElementById('fecha').value;
        const lugar = document.getElementById('lugar').value;

        localStorage.setItem('eventNombre', nombre);
        localStorage.setItem('eventEdad', edad);
        localStorage.setItem('eventFecha', fecha);
        localStorage.setItem('eventLugar', lugar);

        alert('Datos guardados. Redirigiendo a la invitación...');

        window.location.href = 'index.html';
    });
});