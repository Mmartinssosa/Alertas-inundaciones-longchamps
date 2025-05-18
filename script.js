var map = L.map('mapid').setView([-34.85, -58.40], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

document.getElementById('inundacion-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var latitud = document.getElementById('latitud').value;
    var longitud = document.getElementById('longitud').value;
    var nivel = document.getElementById('nivel').value;
    var hora = document.getElementById('hora').value;
    var comentarios = document.getElementById('comentarios').value;

    fetch('http://127.0.0.1:5000/reportar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitud: latitud, longitud: longitud, nivel: nivel, hora: hora, comentarios: comentarios })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje || data.error);
        // Aquí podrías recargar los marcadores del mapa
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al reportar la inundación.');
    });
});

function cargarReportes() {
    fetch('http://127.0.0.1:5000/obtener_reportes')
    .then(response => response.json())
    .then(data => {
        data.forEach(reporte => {
            L.marker([reporte.latitud, reporte.longitud]).addTo(map)
                .bindPopup(`Nivel: ${reporte.nivel}`);
        });
    })
    .catch((error) => {
        console.error('Error al cargar los reportes:', error);
    });
}

cargarReportes();

map.on('click', function(e) {
    document.getElementById('latitud').value = e.latlng.lat;
    document.getElementById('longitud').value = e.latlng.lng;
});
