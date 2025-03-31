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
    map.setOptions({styles: google.maps.StyledMapType(styles)});
}

function initMap() {
    map = new google.maps.Map(document.getElementById('mapid'), {
        center: {lat: 16.7525703, lng: -93.1051547},
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
                const addUserLocation = confirm('¿Deseas usar tu ubicación como primer punto de referencia?');
                if (addUserLocation) {
                    markers.push(userLocationMarker);
                }

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
}

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

    geocoder.geocode({address: addressInput}, (results, status) => {
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
    const waypoints = markers.slice(1, -1).map(marker => ({location: marker.getPosition(), stopover: true}));
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

function eliminarUltimoPunto() {
    if (markers.length === 0) {
        alert('No hay puntos para eliminar.');
        return;
    }
    const lastMarker = markers.pop();
    lastMarker.setMap(null);
}

const rutasGuardadas = [];

function guardarRuta() {
    const repartidor = document.getElementById('repartidor').value;
    const diaSemana = document.getElementById('diaSemana').value;

    if (!repartidor || !diaSemana) {
        alert('Por favor, completa todos los campos antes de guardar la ruta.');
        return;
    }

    const ruta = {repartidor, diaSemana, markers};
    rutasGuardadas.push(ruta);
    localStorage.setItem('rutasGuardadas', JSON.stringify(rutasGuardadas));
    alert('Ruta guardada exitosamente.');
    actualizarOpcionesDeRutas();
}

document.getElementById('optimizeRoutesBtn').addEventListener('click', optimizarRutas);

function actualizarOpcionesDeRutas() {
    const selectRutas = document.getElementById('rutasGuardadas');
    selectRutas.innerHTML = '<option value="" disabled selected>Selecciona una ruta guardada</option>';
    rutasGuardadas.forEach((ruta, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${ruta.repartidor} - ${ruta.diaSemana}`;
        selectRutas.appendChild(option);
    });
}

function cargarRutaGuardada() {
    const selectRutas = document.getElementById('rutasGuardadas');
    const rutaIndex = selectRutas.value;

    if (rutaIndex === "") {
        alert('Por favor, selecciona una ruta guardada.');
        return;
    }

    const rutaSeleccionada = rutasGuardadas[rutaIndex];
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    rutaSeleccionada.puntos.forEach(pos => {
        addMarker(pos);
        map.panTo(pos);
    });

    alert(`Ruta cargada para el repartidor ${rutaSeleccionada.repartidor} el día ${rutaSeleccionada.diaSemana}.`);
}

function guardarRutaEnArchivo() {
    if (markers.length < 2) {
        alert('Por favor, selecciona al menos dos puntos en el mapa antes de guardar la ruta.');
        return;
    }

    const posiciones = markers.map(marker => ({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    }));

    const texto = JSON.stringify(posiciones);
    const blob = new Blob([texto], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ruta.txt';
    link.click();
    URL.revokeObjectURL(url);

    alert('Ruta guardada exitosamente en archivo.');
}

function cargarRutaDesdeArchivo() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

function leerArchivo(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('No se seleccionó ningún archivo.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const contenido = e.target.result;
            const posiciones = JSON.parse(contenido);

            markers.forEach(marker => marker.setMap(null));
            markers = [];

            posiciones.forEach(pos => {
                addMarker(new google.maps.LatLng(pos.lat, pos.lng));
            });

            alert('Ruta cargada exitosamente desde el archivo.');
        } catch (error) {
            alert('Error al leer el archivo. Asegúrate de que el formato es correcto.');
        }
    };
    reader.readAsText(file);
}
