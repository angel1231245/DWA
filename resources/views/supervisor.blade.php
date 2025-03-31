<!DOCTYPE html>
<html>

<head>
    <title>Supervisor</title>
    <link rel="icon" type="image/png" href="{{ asset('img/logg.png') }}">
    <link rel="stylesheet" href="{{ asset('css/tabla.css') }}">
    <link rel="stylesheet" href="{{ asset('css/supervisor.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body>
<header>
    <div id="menuIcon">
        <img id="scrollIcon" src="{{ asset('img/menu.png') }}" alt="Menu">
    </div>
    <img src="{{ asset('img/logg.png') }}" alt="Logo" id="logo">
    <div id="menuHeader">
        <img src="{{ asset('img/logomenu.png') }}" alt="Logo del Menú">
    </div>
    <nav id="sideMenu">
        <div id="menuTopImage">
            <img src="{{ asset('img/logg.png') }}" alt="Imagen Superior">
        </div>
        <ul>
            <li><a href="{{ route('repartidores') }}">Repartidores</a></li>
            <li><a href="{{ route('supervisar') }}">Supervisar</a></li>
        </ul>
        <ul>
            <li><a href="#opcion5">Rutas</a></li>
            <li><a href="#opcion8">Cerrar Sesión</a></li>
        </ul>
    </nav>
    <img id="closeIcon" src="{{ asset('img/equis.png') }}" alt="Close" style="display: none;">
</header>

<div class="container">
    <div id="mapid"></div>
    <div class="sidebar">
        <h3>Opciones</h3>
        <button class="btn-route" id="iniciarRutaBtn" onclick="iniciarRuta()">Iniciar Ruta</button>
        <button class="btn-route" id="recalculateRoutesBtn" onclick="recalcularRutas()">Recalcular Ruta</button>
        <button class="btn-route" id="optimizeRoutesBtn" onclick="optimizarRutas()">Optimizar Ruta</button>
        <button class="btn-route" id="toggleTrafficBtn" onclick="toggleTraffic()">Mostrar Tráfico</button>
    </div>

    <div class="file-explorer">
        <h3>Explorador de Archivos</h3>
        <div class="file-actions">
            <button onclick="createFolder()"><i class="fas fa-folder-plus"></i> Nueva Carpeta</button>
            <button onclick="createFile()"><i class="fas fa-file-circle-plus"></i> Nuevo Archivo</button>
        </div>
        <div class="breadcrumb" id="breadcrumb"></div>
        <div id="fileTree" class="file-tree"></div>
    </div>
</div>

<script src="{{ asset('js/supervisor.js') }}" defer></script>
<script type="module" src="https://unpkg.com/@googlemaps/extended-component-library@0.6"></script>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1fUiRAvm9KIG-DQj8xcVyDAZtb9Hpntk&callback=initMap&libraries=places,geometry"
    defer></script>
<script src="{{ asset('js/tabla.js') }}" defer></script>
<script src="{{ asset('js/fileExplorer.js') }}" defer></script>
</body>

</html>
