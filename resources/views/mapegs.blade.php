<!DOCTYPE html>
<html>

<head>
    <title>Mapa</title>
    <link rel="icon" type="image/png" href="{{asset('img/logg.png')}}">
    <!-- <link rel="stylesheet" href="stylesSnap.css" /> -->
    <link rel="stylesheet" href="{{asset('StyleMapG.css')}}">
    <link rel="stylesheet" href="{{asset('styleMenu.css')}}">

</head>

<script type="module" src="https://unpkg.com/@googlemaps/extended-component-library@0.6"></script>

<body>
<div class="sidebar" id="sidebar">
    <div class="logo">
        <img src="{{asset('img/logg.png')}}" style="width: 240px;">
    </div>
    <ul>
        <li>
            <div class="dropdown-btn" id="dropdown-btn1">Rutas</div>
        <li><a href="#">Rutas Guardadas</a></li>
        <li><a href="#">Guardar Ruta</a></li>
        <li><a href="#">Eliminar Ruta</a></li>
        </li>
        <hr>
        <li>
            <div class="dropdown-btn" id="dropdown-btn2">Configuración de Rutas</div>
        <li><a href="#">Generar Aleatorio</a></li>
        <li><a href="#">Generar Seriado</a></li>
        </li>
        <hr>
        <li><a href="{{route('index.html')}}">Cerrar Sesión</a></li>
    </ul>
</div>

<div class="content">
    <button class="openbtn" onclick="toggleSidebar()"><img src="{{asset('btnMenu.png')}}" style="width: 30px;"></button>
</div>

<select id="style-selector" class="selector-control">
    <option value="default" selected="selected">Default</option>
    <option value="night">Night mode</option>
    <option value="retro">Retro</option>
</select>

<div id="floating-panel" slot="control-block-start-inline-center">
    <div class="search-and-select">
        <div class="search-bar">
            <input id="submit1" type="button" value="Regresar" class="custom-map-control-button"/>
            <!-- <input id="latlng" type="text" />
            <input id="submit" type="button" value="Marcar Ubicación" class="custom-map-control-button" />
            <gmpx-place-picker id="place-picker" for-map="map"></gmpx-place-picker> -->
        </div>
        <!-- <div class="vehicle-selection" id="vehicle-selection">
          <select id="vehicleType" name="vehicleType">
            <option value="automóvil">Automóvil</option>
            <option value="camioneta">Camioneta</option>
            <option value="motocicleta">Motocicleta</option>
          </select>
        </div> -->
    </div>
</div>

<div id="mapid"></div>
<br>
<center>
    <div id="tabla">
        <table id="distancias">
            <thead>
            <tr>
                <th>Nombre del Repartidor</th>
                <th>Número de Unidad</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</center>
<footer class="footer">
    <p>TecNM</p>
    <p>&copy; 2024</p>
</footer>
<script>
    document.getElementById('submit1').addEventListener('click', function () {
        // Redirigir a otra página
        window.location.href = 'MapEG.html'; // Cambia la URL por la que desees
    });
</script>


<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1fUiRAvm9KIG-DQj8xcVyDAZtb9Hpntk&callback=initMap&libraries=marker&v=beta&solution_channel=GMP_CCS_reversegeocoding_v3"
    defer></script>

<!-- <script src="segirUbicacion.js"></script> -->
<script src="{{asset('ControladorMapG2.js')}}"></script>

</body>

</html>
