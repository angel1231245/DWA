//import Seguir from 'segirUbicacion.js';
//variables principales
let map;
let markers = [];
let directionsService;
let directionsRenderer;
let marker;
//variables de apollo
let cont = 1;
let traficoActivo = false;
let vehicleType = "automóvil";
let totalCost;
let totalLiters;
let marca;
let marcas = [];
let i;
//botones
let removerMarca;
let locationButton;
// Referencia a la tabla
const tabla = document.getElementById('distancias').getElementsByTagName('tbody')[0];

function initMap() {
    //creacion de una plantilla de google map
    map = new google.maps.Map(document.getElementById("mapid"), {
        center: {lat: 16.751651, lng: -93.105770},
        zoom: 13,
        mapTypeControl: false,
    });


    crearGeocercas();
    // Actualizar el mapa cada 5 segundos
    setInterval(() => actualizarMapa(map), 5000);


    // Establezca el estilo del mapa en el valor inicial del selector.
    const styleSelector = document.getElementById("style-selector");
    map.setOptions({styles: styles[styleSelector.value]});
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleSelector);
    // Aplicar nuevo JSON cuando el usuario seleccione un estilo diferente.
    styleSelector.addEventListener("change", () => {
        map.setOptions({styles: styles[styleSelector.value]});
    });

}/*Run Main*/
window.initMap = initMap;

//estilos del mapa
const styles = {
    default: [],
    night: [
        {elementType: "geometry", stylers: [{color: "#242f3e"}]},
        {elementType: "labels.text.stroke", stylers: [{color: "#242f3e"}]},
        {elementType: "labels.text.fill", stylers: [{color: "#746855"}]},
        {featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{color: "#d59563"}]},
        {featureType: "poi", elementType: "labels.text.fill", stylers: [{color: "#d59563"}]},
        {featureType: "poi.park", elementType: "geometry", stylers: [{color: "#263c3f"}]},
        {featureType: "poi.park", elementType: "labels.text.fill", stylers: [{color: "#6b9a76"}]},
        {featureType: "road", elementType: "geometry", stylers: [{color: "#38414e"}]},
        {featureType: "road", elementType: "geometry.stroke", stylers: [{color: "#212a37"}]},
        {featureType: "road", elementType: "labels.text.fill", stylers: [{color: "#9ca5b3"}]},
        {featureType: "road.highway", elementType: "geometry", stylers: [{color: "#746855"}]},
        {featureType: "road.highway", elementType: "geometry.stroke", stylers: [{color: "#1f2835"}]},
        {featureType: "road.highway", elementType: "labels.text.fill", stylers: [{color: "#f3d19c"}]},
        {featureType: "transit", elementType: "geometry", stylers: [{color: "#2f3948"}]},
        {featureType: "transit.station", elementType: "labels.text.fill", stylers: [{color: "#d59563"}]},
        {featureType: "water", elementType: "geometry", stylers: [{color: "#17263c"}]},
        {featureType: "water", elementType: "labels.text.fill", stylers: [{color: "#515c6d"}]},
        {featureType: "water", elementType: "labels.text.stroke", stylers: [{color: "#17263c"}]},
    ],
    retro: [
        {elementType: "geometry", stylers: [{color: "#ebe3cd"}]},
        {elementType: "labels.text.fill", stylers: [{color: "#523735"}]},
        {elementType: "labels.text.stroke", stylers: [{color: "#f5f1e6"}]},
        {featureType: "administrative", elementType: "geometry.stroke", stylers: [{color: "#c9b2a6"}]},
        {featureType: "administrative.land_parcel", elementType: "geometry.stroke", stylers: [{color: "#dcd2be"}]},
        {featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{color: "#ae9e90"}]},
        {featureType: "landscape.natural", elementType: "geometry", stylers: [{color: "#dfd2ae"}]},
        {featureType: "poi", elementType: "geometry", stylers: [{color: "#dfd2ae"}]},
        {featureType: "poi", elementType: "labels.text.fill", stylers: [{color: "#93817c"}]},
        {featureType: "poi.park", elementType: "geometry.fill", stylers: [{color: "#a5b076"}]},
        {featureType: "poi.park", elementType: "labels.text.fill", stylers: [{color: "#447530"}]},
        {featureType: "road", elementType: "geometry", stylers: [{color: "#f5f1e6"}]},
        {featureType: "road.arterial", elementType: "geometry", stylers: [{color: "#fdfcf8"}]},
        {featureType: "road.highway", elementType: "geometry", stylers: [{color: "#f8c967"}]},
        {featureType: "road.highway", elementType: "geometry.stroke", stylers: [{color: "#e9bc62"}]},
        {featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{color: "#e98d58"}]},
        {featureType: "road.highway.controlled_access", elementType: "geometry.stroke", stylers: [{color: "#db8555"}]},
        {featureType: "road.local", elementType: "labels.text.fill", stylers: [{color: "#806b63"}]},
        {featureType: "transit.line", elementType: "geometry", stylers: [{color: "#dfd2ae"}]},
        {featureType: "transit.line", elementType: "labels.text.fill", stylers: [{color: "#8f7d77"}]},
        {featureType: "transit.line", elementType: "labels.text.stroke", stylers: [{color: "#ebe3cd"}]},
        {featureType: "transit.station", elementType: "geometry", stylers: [{color: "#dfd2ae"}]},
        {featureType: "water", elementType: "geometry.fill", stylers: [{color: "#b9d3c2"}]},
        {featureType: "water", elementType: "labels.text.fill", stylers: [{color: "#92998d"}]},
    ],
};

//funciones para el menu
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");

    if (sidebar.classList.contains("active")) {
        document.querySelector('.content').style.marginLeft = "250px";
        document.querySelector('#mapid').style.marginLeft = "250px";
        document.querySelector('#mapid').style.width = "79.5%";
        document.querySelector('#tabla').style.marginLeft = "250px";
    } else {
        document.querySelector('.content').style.marginLeft = "0";
        document.querySelector('#mapid').style.marginLeft = "0";
        document.querySelector('#mapid').style.width = "98%";
        document.querySelector('#tabla').style.marginLeft = "0px";
    }
}

function crearGeocercas() {

    const cuadrante1Coords = [
        {lat: 16.71785335566609, lng: -93.12075941422222},
        {lat: 16.705074355381203, lng: -93.0902765857167},
        {lat: 16.69458013513601, lng: -93.0859747616395},
        {lat: 16.693614409045146, lng: -93.08674775131794},
        {lat: 16.700986218909105, lng: -93.12361611319416},
        {lat: 16.712220418024977, lng: -93.13131238129351}
    ];

    // const cuadrante2Coords = [
    //     { lat: bounds.north, lng: centroLng },
    //     { lat: centroLat, lng: centroLng },
    //     { lat: centroLat, lng: bounds.east },
    //     { lat: bounds.north, lng: bounds.east }
    // ];

    // const cuadrante3Coords = [
    //     { lat: centroLat, lng: bounds.west },
    //     { lat: bounds.south, lng: bounds.west },
    //     { lat: bounds.south, lng: centroLng },
    //     { lat: centroLat, lng: centroLng }
    // ];

    const cuadrante4Coords = [
        {lat: 16.76903180065294, lng: -93.19484870012066},
        {lat: 16.76250613866359, lng: -93.18551748432243},
        {lat: 16.755867194208207, lng: -93.1567010807224},
        {lat: 16.75554907346407, lng: -93.15083910338964},
        {lat: 16.695755563358105, lng: -93.16498238006412},
        {lat: 16.746581657242054, lng: -93.20998281260795}
    ];

    //Dibujar los polígonos
    const cuadrante1 = new google.maps.Polygon({
        paths: cuadrante1Coords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35
    });

    // const cuadrante2 = new google.maps.Polygon({
    //     paths: cuadrante2Coords,
    //     strokeColor: "#00FF00",
    //     strokeOpacity: 0.8,
    //     strokeWeight: 2,
    //     fillColor: "#00FF00",
    //     fillOpacity: 0.35
    // });

    // const cuadrante3 = new google.maps.Polygon({
    //     paths: cuadrante3Coords,
    //     strokeColor: "#0000FF",
    //     strokeOpacity: 0.8,
    //     strokeWeight: 2,
    //     fillColor: "#0000FF",
    //     fillOpacity: 0.35
    // });

    const cuadrante4 = new google.maps.Polygon({
        paths: cuadrante4Coords,
        strokeColor: "#FFFF00",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FFFF00",
        fillOpacity: 0.35
    });

    cuadrante1.setMap(map);
    // cuadrante2.setMap(map);
    // cuadrante3.setMap(map);
    cuadrante4.setMap(map);

    //cuadrantes = [cuadrante1, cuadrante2, cuadrante3, cuadrante4];
    cuadrantes = [cuadrante4];
}


function actualizarMapa(map) {
    for (var i = 0; i < marcas.length; i++) {
        let marca = marcas.pop()
        marca.setMap(null);
    }
    i = 0;
    marcas = [];
    fetch('obtener_ubicaciones.php')
        .then((response) => response.json())
        .then((ubicaciones) => {
            ubicaciones.forEach((ubicacion) => {
                const {lat, lng, username} = ubicacion;

                // Agregar marcador en el mapa
                const marca = new google.maps.Marker({
                    position: {lat: parseFloat(lat), lng: parseFloat(lng)},
                    map: map,
                    icon: {
                        url: "/img/vehiculo.png",
                        scaledSize: new google.maps.Size(45, 45)
                    },
                    title: `Repartidor ${username}`,
                });
                marca.setMap(map); // Mostrar marcador en el mapa
                // map.setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
                marcas.push(marca);
                agregarFila(username, 'Unidad:' + i);
            });
        })
        .catch((error) => console.error('Error al obtener ubicaciones:', error));
}


// Función para agregar una fila
function agregarFila(nombreRepartidor, numeroUnidad) {
    let fila = tabla.insertRow(); // Crear una nueva fila

    // Agregar columnas (celdas) a la fila
    let celdaNombre = fila.insertCell(0);
    let celdaUnidad = fila.insertCell(1);


    // Asignar los valores a las celdas
    celdaNombre.textContent = nombreRepartidor;
    celdaUnidad.textContent = numeroUnidad;

}

// Ejemplo de cómo agregar filas
