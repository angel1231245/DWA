const menuIcon = document.getElementById("scrollIcon");
const closeIcon = document.getElementById("closeIcon");
const sideMenu = document.getElementById("sideMenu");

menuIcon.addEventListener("click", () => {
    sideMenu.style.left = "0";
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
});

closeIcon.addEventListener("click", () => {
    sideMenu.style.left = "-100%";
    menuIcon.style.display = "block";
    closeIcon.style.display = "none";
});

let trafficLayerVisible = false;

let map, markers = [], directionsRenderer, stepIndex = 0;
let startTime, endTime, trafficLayer, userLocationMarker;
let watchId;

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const styles = document.body.classList.contains("dark-mode") ? "dark" : "default";
    map.setOptions({ styles: google.maps.StyledMapType(styles) });
}

function initMap() {
    map = new google.maps.Map(document.getElementById('mapid'), {
        center: { lat: 16.7525703, lng: -93.1051547 },
        zoom: 14,
        style: []
    });

    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
    });
    directionsRenderer.setMap(map);

    trafficLayer = new google.maps.TrafficLayer();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(userLocation);
                userLocationMarker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    label: 'U',
                });
                // const addUserLocation = confirm('¿Deseas usar tu ubicación como primer punto de referencia?');
                // if (addUserLocation) {
                //     markers.push(userLocationMarker);
                // }

                watchId = navigator.geolocation.watchPosition(updateUserLocation, handleLocationError, {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000
                });
            },
            () => {
                alert('No se pudo obtener tu ubicación.');
            }
        );
    } else {
        alert('Tu navegador no soporta la geolocalización.');
    }

    map.addListener('click', (event) => {
        const marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            label: String(markers.length + 1),
        });
        markers.push(marker);
    });

    // Agrega un evento de clic para añadir marcadores
    google.maps.event.addListener(map, "click", function (event) {
        if (markers.length < 2) {
            const marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                title: "Ubicación " + (markers.length + 1),
                draggable: true
            });

            // Añadir un evento de clic al marcador para eliminarlo solo si estamos en modo de eliminación
            marker.addListener("click", function () {
                if (canDelete) {
                    marker.setMap(null);  // Eliminar marcador
                    const index = markers.indexOf(marker);
                    if (index > -1) {
                        markers.splice(index, 1);  // Eliminar marcador de la lista de marcadores
                    }
                    updateDistancesTable();  // Actualizar la tabla después de eliminar un marcador
                }
            });

            markers.push(marker);
            if (markers.length === 2) {
                calculateRoute();  // Calcula la ruta una vez que ambos marcadores estén puestos
            }
        }
    });
}

function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitud = position.coords.latitude;
                const longitud = position.coords.longitude;

                // Actualizar el contenido en pantalla
                document.getElementById('latitude').textContent = latitud.toFixed(6);
                document.getElementById('longitude').textContent = longitud.toFixed(6);

                console.log(`Nueva ubicación: Latitud ${latitud}, Longitud ${longitud}`);

                // Enviar datos a PHP
                fetch('guardar_ubicacion.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ latitud, longitud })
                })
                    .then(response => response.text())
                    .then(data => console.log(data))
                    .catch(error => console.error('Error al enviar datos:', error));
            },
            (error) => {
                console.error("Error al obtener la ubicación:", error.message);
            }
        );
    } else {
        console.error("La geolocalización no es compatible con este navegador.");
    }
}

// Llamar a la función por primera vez
obtenerUbicacion();

// Configurar para actualizar cada 30 segundos
setInterval(obtenerUbicacion, 30000);

function updateUserLocation(position) {
    const newLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    userLocationMarker.setPosition(newLocation);
    map.setCenter(newLocation);
}

function handleLocationError(error) {
    console.error('Error de geolocalización: ', error);
}
function toggleTraffic() {
    if (trafficLayerVisible) {
        trafficLayer.setMap(null);
        trafficLayerVisible = false;
        document.getElementById('toggleTrafficBtn').innerText = 'Mostrar tráfico';
    } else {
        trafficLayer.setMap(map);
        trafficLayerVisible = true;
        document.getElementById('toggleTrafficBtn').innerText = 'Ocultar tráfico';
    }
}

function addMarker(position) {
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        label: String(markers.length + 1),
    });
    markers.push(marker);
}

async function addAddressMarker() {
    const addressInput = document.getElementById('addressInput').value;
    const geocoder = new google.maps.Geocoder();

    if (!addressInput) {
        alert('Por favor, ingresa una dirección.');
        return;
    }

    geocoder.geocode({ address: addressInput }, (results, status) => {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            addMarker(location);
            map.panTo(location);
        } else {
            alert('No se pudo encontrar la ubicación: ' + status);
        }
    });
}

function iniciarRuta() {
    if (markers.length < 2) {
        alert('Por favor, selecciona al menos dos puntos en el mapa.');
        return;
    }

    stepIndex = 0;
    startTime = new Date();
    mostrarSiguienteTramo();
}

function mostrarSiguienteTramo() {
    if (stepIndex >= markers.length - 1) {
        endTime = new Date();
        const tiempoTotal = (endTime - startTime) / 1000;
        alert(`Ruta completada en ${tiempoTotal} segundos.`);
        return;
    }

    const origin = markers[stepIndex].getPosition();
    const destination = markers[stepIndex + 1].getPosition();

    const directionsService = new google.maps.DirectionsService();
    const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            setTimeout(() => {
                stepIndex++;
                mostrarSiguienteTramo();
            }, 1000);
        } else {
            console.error('Error al calcular la ruta:', status);
        }
    });
}

function recalcularRutas() {
    if (markers.length < 2) {
        alert('Por favor, selecciona al menos dos puntos en el mapa.');
        return;
    }

    const directionsService = new google.maps.DirectionsService();
    const waypoints = markers.slice(1, -1).map(marker => ({ location: marker.getPosition(), stopover: true }));
    const request = {
        origin: markers[0].getPosition(),
        destination: markers[markers.length - 1].getPosition(),
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
            departureTime: new Date(),
        }
    };
    directionsService.route(
        {
            origin: markers[0].getPosition(),
            destination: markers[markers.length - 1].getPosition(),
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING,
            optimizeWaypoints: false,
        },
        (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
                const route = response.routes[0];
                const legs = route.legs;
                updateMarkerLabels(legs);
            } else {
                alert('No se pudo calcular la ruta: ' + status);
            }
        }
    );

}

function optimizarRutas() {
    if (markers.length < 2) {
        alert('Por favor, selecciona al menos dos puntos en el mapa.');
        return;
    }

    const origin = markers[0].getPosition();
    const destinations = markers.slice(1).map(marker => marker.getPosition());

    const orderedMarkers = [origin];
    while (destinations.length > 0) {
        let nearest = null;
        let nearestIndex = -1;
        let minDistance = Infinity;

        orderedMarkers.slice(-1).forEach(last => {
            destinations.forEach((destination, index) => {
                const distance = google.maps.geometry.spherical.computeDistanceBetween(last, destination);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = destination;
                    nearestIndex = index;
                }
            });
        });

        orderedMarkers.push(nearest);
        destinations.splice(nearestIndex, 1);
    }

    markers = orderedMarkers.map((pos, index) => new google.maps.Marker({
        position: pos,
        map: map,
        label: String(index + 1),
    }));

    recalcularRutas();
}

function guardarRutaBaseDatos() {
    const data = {
        desde: 'Punto A',
        hasta: 'Punto B',
        distancia: '10 km',
        tiempo: '15 mins',
        combustible: '1.5 litros'
    };

    fetch('guardarRuta.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(result => {
        alert(result.message);
    }).catch(error => console.error('Error al guardar la ruta:', error));
}

function mostrarRutas() {
    fetch('obtenerRutas.php')
        .then(response => response.json())
        .then(rutas => {
            const tabla = document.getElementById('contenidoRutas');
            tabla.innerHTML = rutas.map(ruta => `
                <tr>
                    <td>${ruta.desde}</td>
                    <td>${ruta.hasta}</td>
                    <td>${ruta.distancia}</td>
                    <td>${ruta.tiempo}</td>
                    <td>${ruta.combustible}</td>
                    <td>
                        <button onclick="editarRuta(${ruta.id})">Editar</button>
                        <button onclick="descargarExcel(${ruta.id})">Descargar</button>
                    </td>
                </tr>
            `).join('');
            document.getElementById('tabla-rutas').style.display = 'block';
        }).catch(error => console.error('Error al cargar las rutas:', error));
}

function descargarExcel() {
    window.location.href = 'descargarExcel.php';
}


function updateMarkerLabels(legs) {
    for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        if (i === 0) {
            marker.setLabel('1');
        } else if (i === markers.length - 1) {
            marker.setLabel(String(legs.length + 1));
        } else {
            marker.setLabel(String(i + 1));
        }
    }
}

function startAutoOptimization() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        optimizarRutas();
    }, 20000);
}

function detenerOptimizacionAutomatica() {
    if (intervalId) clearInterval(intervalId);
}

// Función para eliminar el último marcador
function eliminarUltimoPunto() {
    if (markers.length === 0) {
        alert('No hay puntos para eliminar.');
        return;
    }
    const lastMarker = markers.pop();
    lastMarker.setMap(null);  // Elimina el marcador del mapa
    updateDistancesTable();  // Actualiza la tabla después de eliminar un marcador
}

document.getElementById('optimizeRoutesBtn').addEventListener('click', optimizarRutas);