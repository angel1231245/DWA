<!DOCTYPE html>
<html>

<head>
    <title>Repartidor</title>
    <link rel="icon" type="image/png" href="{{ asset('img/logg.png') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/repartidor.css') }}"/>
    <script type="module" src="https://unpkg.com/@googlemaps/extended-component-library@0.6"></script>
</head>

<body>
<header>
    <div id="menuIcon">
        <img id="scrollIcon" src="{{ asset('img/menu.png') }}" alt="Menu">
    </div>
    <div id="menuHeader">
        <img src="{{ asset('img/logomenu.png') }}" alt="Logo del Menú">
    </div>
    <nav id="sideMenu">
        <div id="menuTopImage">
            <img src="{{ asset('img/trigueña.png') }}" alt="Imagen Superior">
        </div>
        <ul>
            <li><a href="#opcion1">Iniciar Ruta</a></li>
            <li><a href="#opcion4">Optimizar Ruta</a></li>
        </ul>
        <ul>
            <li><a href="#opcion5">Mostrar Tráfico</a></li>
            <li><a href="#opcion8">Cerrar Sesión</a></li>
        </ul>
    </nav>
    <img id="closeIcon" src="{{ asset('img/equis.png') }}" alt="Close" style="display: none;">
</header>

<div class="container">
    <div id="mapid"></div>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCsj5IMselsFT3YI0wvQLEQjFH2j-CLM-0&callback=initMap&libraries=places,geometry"
        defer></script>
    <script src="{{ asset('js/repartidor.js') }}" defer></script>
</div>
</body>

</html>
