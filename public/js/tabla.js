// Variables globales
// let map;
// let markers = [];
// let directionsService;
// let directionsRenderer;
// let origin, destination;

// // Crea y muestra el mapa de Google
// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: 19.4326, lng: -99.1332 },  // Ciudad de México como punto de inicio
//         zoom: 12
//     });

//     directionsService = new google.maps.DirectionsService();
//     directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

//     // Agrega un evento de clic para añadir marcadores
//     google.maps.event.addListener(map, "click", function(event) {
//         if (markers.length < 2) {
//             const marker = new google.maps.Marker({
//                 position: event.latLng,
//                 map: map,
//                 title: "Ubicación " + (markers.length + 1),
//                 draggable: true
//             });

//             markers.push(marker);
//             if (markers.length === 2) {
//                 calculateRoute();  // Calcula la ruta una vez que ambos marcadores estén puestos
//             }
//         }
//     });
// }

// Calcula la ruta entre los dos marcadores seleccionados
function calculateRoute() {
    if (markers.length === 2) {
        origin = markers[0].getPosition();
        destination = markers[1].getPosition();

        // Usa DistanceMatrixService para obtener distancia y tiempo
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING
            },
            function(response, status) {
                if (status === google.maps.DistanceMatrixStatus.OK) {
                    updateDistancesTable(response);
                } else {
                    alert("Error al calcular la distancia: " + status);
                }
            }
        );
    }
}

// Actualiza la tabla con la distancia, tiempo y combustible
function updateDistancesTable(response) {
    const distancesElement = document.getElementById("distancias").getElementsByTagName("tbody")[0];
    distancesElement.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

    const originAddress = response.originAddresses[0];
    const destinationAddress = response.destinationAddresses[0];
    const distance = response.rows[0].elements[0].distance.text;
    const duration = response.rows[0].elements[0].duration.text;

    // Calcular el combustible (suponemos que el consumo es 1 litro cada 10 km)
    const kilometers = parseFloat(distance.replace(' km', '').replace(' km', '').replace(',', '.'));
    const liters = (kilometers / 10).toFixed(2);
    const fuelCost = (liters * 24.08).toFixed(2);  // Cálculo del costo en base a $24.08 por litro

    // Crear una fila para la tabla con los resultados
    const tr = document.createElement("tr");

    const tdFrom = document.createElement("td");
    tdFrom.textContent = originAddress;

    const tdTo = document.createElement("td");
    tdTo.textContent = destinationAddress;

    const tdDistance = document.createElement("td");
    tdDistance.textContent = distance;

    const tdDuration = document.createElement("td");
    tdDuration.textContent = duration;

    const tdFuelCost = document.createElement("td");
    tdFuelCost.textContent = `$${fuelCost} (${liters} L)`;

    // Añadir celdas a la fila
    tr.appendChild(tdFrom);
    tr.appendChild(tdTo);
    tr.appendChild(tdDistance);
    tr.appendChild(tdDuration);
    tr.appendChild(tdFuelCost);

    // Añadir la fila a la tabla
    distancesElement.appendChild(tr);
}