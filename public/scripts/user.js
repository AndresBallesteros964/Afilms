const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {

        // Quitar clase activa de todas las pestañas
        tabs.forEach(t => t.classList.remove('active'));

        // Agregar clase activa a la pestaña clickeada
        tab.classList.add('active');

        // Ocultar todos los contenidos
        contents.forEach(c => c.classList.remove('active'));

        // Obtener el id del contenido relacionado
        const tabId = tab.textContent.trim().toLowerCase();

        // Mostrar el contenido que coincide
        document.getElementById(tabId).classList.add('active');
    });
});
