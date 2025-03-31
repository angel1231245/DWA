//variables principales
let map;
let markers = [];
let directionsService;
let directionsRenderer;
let marker;
let cordenadaLat = [];
let cordenadaLng = [];
//variables de apollo
let cont = 1;
let traficoActivo = false;
let vehicleType = "automóvil";
let totalCost;
let totalLiters;
let marca;
let modeTravel;
let seguimiento;
let iniciar = false;
let iniciar2 = false;
let myMarker;
let pos;
//botones
let removerMarca;
let locationButton;

//estilos del mapa


function initMap() {
    //creacion de una plantilla de google map
    map = new google.maps.Map(document.getElementById("mapid"), {
        center: {lat: 16.751899128862924, lng: -93.10330346616853},
        zoom: 13,
        mapTypeControl: false,
    });

    //avento de clic en el mapa para marcar un punto
    map.addListener('click', (event) => {
        addMarker(event.latLng);
    });

    //estilo de la marka
    marker = new google.maps.Marker({
        icon: {
            url: "marka.png",
            scaledSize: new google.maps.Size(45, 45)
        },
        map: map,
        title: `Parada ${markers.length + 1}`,
        label: `${markers.length + 1}`,
        animation: google.maps.Animation.DROP,
    });

    //constantes nesesarias para marcar un punto por cordenadas
    const geocoder = new google.maps.Geocoder();
    const infoWindow = new google.maps.InfoWindow();
    //evento del boton para marcar un punto por cordenadas

    document.getElementById('submit').addEventListener('click', () => {
        const textoCordenadas = document.getElementById('latlng');
        const text = textoCordenadas.value;
        const coordenadas = text.split(',');
        cordenadaLat.push(parseFloat(coordenadas[0]));
        cordenadaLng.push(parseFloat(coordenadas[1].trim()));
        geocodeLatLng(geocoder, map, infoWindow, marker);
    });

    //Cambiar el tipo de veiculo
    const tipoVeiculo = document.getElementById("vehicleType");
    tipoVeiculo.addEventListener("change", () => {
        vehicleType = tipoVeiculo.value;
        calculateAndDisplayRoute();
    });


    //elementos nesesarios para generar la ruta
    //cuando se marcan las paradas de reparto en el mapa
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
            strokeColor: '#E16364',  // Color de la línea (rojo en este caso)
            strokeWeight: 2,         // Grosor de la línea
            strokeOpacity: 15       // Opacidad de la línea
        }
    });
    directionsRenderer.setMap(map);

    iniciarR = document.createElement("button");
    iniciarR.textContent = "Iniciar Ruta";
    iniciarR.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(iniciarR);
    iniciarR.addEventListener("click", () => {
        iniciar = !iniciar;
        iniciarR.textContent = iniciar ? "Pausar Ruta" : "Iniciar Ruta";
        if (iniciar) {
            seguirUbicacion();
            myMarker.setMap(map);
            seguimiento = setInterval(() => seguirUbicacion(), 5000);
        } else {
            clearInterval(seguimiento);
            myMarker.setMap(null);
        }
    });

    // Inicializar control de geolocalización
    initGeolocationControl();

    //crear y configurar boton para remover la ultmima marca
    removerMarca = document.createElement("button");
    removerMarca.textContent = "Eliminar Ultima Marca";
    removerMarca.classList.add("custom-map-control-button");
    removerMarca.disabled = true;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(removerMarca);
    //evento del voton para remover la ultima marka
    removerMarca.addEventListener("click", () => {
        removeLastMarker();
    });

    //boton para mostrar el trafico
    const btnTrafico = document.createElement("button");
    btnTrafico.textContent = "Tráfico";
    btnTrafico.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(btnTrafico);
    //constante nesesaria para ver el trafico
    const trafficLayer = new google.maps.TrafficLayer();
    //evento para mostrar u ocultar la vista del trafico
    btnTrafico.addEventListener("click", () => {
        if (traficoActivo) {
            trafficLayer.setMap(null);
            traficoActivo = false;
        } else {
            trafficLayer.setMap(map);
            traficoActivo = true;
        }
    });

    //boton para optimizar ruta
    const GenRuta = document.createElement("button");
    GenRuta.textContent = "Optimizar Ruta";
    GenRuta.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(GenRuta);
    GenRuta.addEventListener("click", () => {
        optimizarRutas();
    });

    const guardarR = document.createElement("button");
    guardarR.textContent = "Guardar Ruta";
    guardarR.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(guardarR);
    guardarR.addEventListener("click", () => {

        const posiciones = markers.map(marker => ({
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng()
        }));
        const cadenaArreglo = JSON.stringify(posiciones);
        // Pasar la cadena al input
        document.getElementById('cordenadas').value = cadenaArreglo;
        abrirFormulario();

    });

    const cargarR = document.createElement("button");
    cargarR.textContent = "Cargar Ruta";
    cargarR.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(cargarR);
    cargarR.addEventListener("click", () => {

        abrirFormulario2();
        calculateAndDisplayRoute();

    });

}/*Run Main*/
window.initMap = initMap;

//buscar por direccion y autoacompletado
function buscadorDireccion() {
    const placePicker = document.getElementById("place-picker");
    placePicker.addEventListener('gmpx-placechange', () => {
        const place = placePicker.value;
        addMarker(place.location);
    });
}

document.addEventListener('DOMContentLoaded', buscadorDireccion);


function initGeolocationControl() {
    const infoWindow = new google.maps.InfoWindow();

    locationButton = document.createElement("button");
    locationButton.textContent = "Marcar Mi Ubicación";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    const location = [
                        {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    ];
                    const ubicacion = location[0];
                    addMarker(ubicacion);

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Tu Ubicacion.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                    locationButton.disabled = true;
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

function addMarker(location) {
    if (markers.length < 15) {
        removerMarca.disabled = false;
        locationButton.disabled = true;

        const marker = new google.maps.Marker({
            position: location,
            icon: {
                url: "marka.png",
                scaledSize: new google.maps.Size(45, 45)
            },
            map: map,
            // setContent: ,
            title: `Parada ${markers.length + 1}`,
            label: `${markers.length + 1}`,
            animation: google.maps.Animation.DROP

        });
        console.log(location.lat)
        console.log(location.lng)
        cordenadaLat.push(location.lat);
        cordenadaLng.push(location.lng);
        marca = marker;

        markers.push(marker);
        if (markers.length > 1) {
            calculateAndDisplayRoute();
        }
    }
}

function calculateAndDisplayRoute() {
    if (markers.length < 2) {
        return;
    }
    const waypoints = markers.slice(1, -1).map(marker => ({location: marker.getPosition()}));

    directionsService.route(
        {
            origin: markers[0].getPosition(),
            destination: markers[markers.length - 1].getPosition(),
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING,

        },
        (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
                // directionsRenderer.polylineOptions.strokeColor= '#00FF00';
                updateDistancesTable(response);//
            } else {
                console.error("Directions request failed due to " + status);
            }
        }
    );
}

function updateDistancesTable(response) {
    let totalCombustible = 0;
    let totalLtr = 0;
    let totalDistancia = 0;
    let totalTiempo = 0;

    const distancesElement = document.getElementById("distancias").getElementsByTagName("tbody")[1];
    distancesElement.innerHTML = ""; // Limpia el contenido del tbody

    const legs = response.routes[0].legs;
    for (let i = 0; i < legs.length; i++) {
        const tr = document.createElement("tr");

        const tdFrom = document.createElement("td");
        tdFrom.textContent = `${legs[i].start_address}`;

        const tdTo = document.createElement("td");
        tdTo.textContent = `${legs[i].end_address}`;

        const tdDistance = document.createElement("td");
        tdDistance.textContent = `${legs[i].distance.text}`;

        const tdDuration = document.createElement("td");
        tdDuration.textContent = `${legs[i].duration.text}`;

        // Añadir todas las celdas a la fila
        tr.appendChild(tdFrom);
        tr.appendChild(tdTo);
        tr.appendChild(tdDistance);
        tr.appendChild(tdDuration);
        calculateFuelCost(tr, parseFloat(legs[i].distance.text));

        // Añadir la fila completa a la tabla
        distancesElement.appendChild(tr);

        totalCombustible += totalCost;
        totalLtr += totalLiters;
        totalDistancia += parseFloat(legs[i].distance.text);
        totalTiempo += parseFloat(legs[i].duration.text);
    }
    const trf = document.createElement("tr");

    const totalComb = document.createElement("td");
    totalComb.textContent = "$" + totalCombustible.toFixed(2) + " (" + totalLtr.toFixed(2) + "lts)";

    const totaldist = document.createElement("td");
    totaldist.textContent = totalDistancia.toFixed(2) + " Km";

    const totaltime = document.createElement("td");
    if (totalTiempo > 60) {
        totaltime.textContent = "1 hr " + (totalTiempo - 60) + " min";
    } else if (totalTiempo > 120) {
        totaltime.textContent = "2 hrs " + (totalTiempo - 120) + " min";
    } else if (totalTiempo > 180) {
        totaltime.textContent = "3 hrs " + (totalTiempo - 180) + " min";
    } else if (totalTiempo > 240) {
        totaltime.textContent = "4 hrs " + (totalTiempo - 240) + " min";
    } else if (totalTiempo > 300) {
        totaltime.textContent = "5 hrs " + (totalTiempo - 300) + " min";
    } else if (totalTiempo > 360) {
        totaltime.textContent = "6 hrs " + (totalTiempo - 360) + " min";
    } else {
        totaltime.textContent = totalTiempo + " min";
    }

    const celdaVacia = document.createElement("td");
    celdaVacia.textContent = "-";

    const celdaVacia2 = document.createElement("td");
    celdaVacia.textContent = "-";

    const celdaVacia3 = document.createElement("td");
    celdaVacia.textContent = "-";

    trf.appendChild(celdaVacia);
    trf.appendChild(celdaVacia2);
    trf.appendChild(totaldist);
    trf.appendChild(totaltime);
    trf.appendChild(totalComb);
    distancesElement.appendChild(trf);
}

function removeLastMarker() {
    if (markers.length === 0) {
        return;
    }
    const lastMarker = markers.pop();
    lastMarker.setMap(null);
    if (markers.length < 2) {
        directionsRenderer.set('directions', null);
        const tbodyElement = document.getElementById("distancias").getElementsByTagName("tbody")[1];
        tbodyElement.innerHTML = ""; // Limpia el contenido del tbody
    } else {
        calculateAndDisplayRoute();
    }
    if (markers.length == 0) {
        removerMarca.disabled = true;
        locationButton.disabled = false;
    }
}

function geocodeLatLng(geocoder, map, infoWindow, marker) {
    const input = document.getElementById("latlng").value;
    const latlngStr = input.split(",", 2);
    const latlng = {
        lat: parseFloat(latlngStr[0]),
        lng: parseFloat(latlngStr[1]),
    };
    geocoder.geocode({location: latlng})
        .then((response) => {
            if (response.results[0]) {
                map.setZoom(14);
                marker.setPosition(latlng);
                infoWindow.setContent(response.results[0].formatted_address);
                infoWindow.open(map, marker);
                markers.push(marker);
                if (markers.length > 1) {
                    calculateAndDisplayRoute();
                }
            } else {
                window.alert("No results found");
            }
        }).catch((e) => window.alert("Geocoder failed due to: " + e));
}

function calculateFuelCost(tr, distance) {
    const fuelPrices = 24.08; // Precio por litro de gasolina
    let consumptionPerKm; // Consumo en litros por kilómetro

    switch (vehicleType) {
        case 'automóvil':
            consumptionPerKm = 0.12;
            break;
        case 'camioneta':
            consumptionPerKm = 0.15;
            break;
        case 'motocicleta':
            consumptionPerKm = 0.05;
            break;
    }
    totalLiters = distance * consumptionPerKm;
    totalCost = totalLiters * fuelPrices;

    const gastoGasolina = document.createElement("td");
    gastoGasolina.textContent = "$" + totalCost.toFixed(2) + " (" + totalLiters.toFixed(2) + "lts)";
    tr.appendChild(gastoGasolina);
}

function seguirUbicacion() {
    if (!myMarker) {
        myMarker = new google.maps.Marker({
            map: map,
            icon: {
                url: "/img/vehiculo.png",
                scaledSize: new google.maps.Size(45, 45)
            },
            title: "Tu ubicación"
        });
    }
    // Intentar obtener la ubicación en tiempo real
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // Si la ruta está iniciada, actualizar posición
            if (iniciar) {
                myMarker.setPosition(pos);
                myMarker.setMap(map); // Mostrar marcador en el mapa
                // map.setCenter(pos); // Centrar el mapa en la ubicación actual
            }
        }, () => {
            handleLocationError(true, map.getCenter());
        });
    } else {
        // El navegador no soporta geolocalización
        handleLocationError(false, map.getCenter());
    }
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
    };

    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            console.error('Error al calcular la ruta:', status);
        }
    });
    calculateAndDisplayRoute();
}

// Mostrar el formulario flotante
function abrirFormulario() {
    document.getElementById('formFlotante').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function abrirFormulario2() {
    document.getElementById('formFlotante2').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Ocultar el formulario flotante
function cerrarFormulario() {
    document.getElementById('formFlotante').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

}

function cerrarFormulario2() {
    document.getElementById('formFlotante2').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function cargarRuta(index) {
    // Obtener el elemento de la celda con las coordenadas
    const cordenadasElement = document.getElementById(`cordenadas_${index}`);
    // Extraer las coordenadas desde el atributo 'data-cordenadas'
    const cordenadas = cordenadasElement.getAttribute('data-cordenadas');

    // Convertir la cadena JSON a un arreglo de posiciones
    const posiciones = JSON.parse(cordenadas);

    // Limpiar marcadores existentes en el mapa
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // Agregar marcadores al mapa usando las coordenadas cargadas
    posiciones.forEach(pos => {
        addMarker(new google.maps.LatLng(pos.lat, pos.lng));
    });

    // Mostrar un mensaje de éxito
    alert('Ruta cargada exitosamente desde la tabla.');
    cerrarFormulario2();
}
