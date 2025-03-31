<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Snappy</title>
    <link rel="icon" type="image/png" href="{{ asset('img/logg.png')}}">
    <link rel="stylesheet" href="{{ asset('css/styleSnap.css') }}">
    <link rel="stylesheet" href="{{asset('css/index.css')}}"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>

<body>
<header>
    <div class="container-hero">
        <div class="container hero">
            <div class="customer-support">
                <i class="fa-solid fa-headset" style="color: #e15254;"></i>
                <div class="content-customer-support">
                    <span class="text">Soporte al cliente</span>
                    <span class="number">961 170 8152</span>
                </div>
            </div>

            <div class="container-logo">
                <img src="{{ asset('img/logprincipal.png')}}" class="logo-img" alt="Snappy" style="width: 120px;">
            </div>
            <div class="container-user">
                <a href="{{ route('login')}}">
                    <i class="fa-solid fa-user" style="color: #e15254;"></i>
                </a>
            </div>
        </div>
    </div>
</header>

<section class="banner">
    <div class="content-banner">
        <p>Snappy</p>
        <h2>Donde la eficiencia <br/> se encuentra con la innovación</h2>
    </div>
</section>

<main class="main-content">
    <div class="brand-container">
        <div class="brand-section mission">
            <div class="brand-text">
                <h2>Misión</h2>
                <p>Facilitar la eficiencia logística y mejorar la distribución de productos mediante la creación de
                    rutas de entrega óptimas, que maximicen la velocidad, la seguridad y la rentabilidad para
                    nuestros clientes.</p>
            </div>
            <img src="{{ asset('img/mision.jpg') }}" alt="Imagen de Marca">
        </div>

        <div class="brand-section vision">
            <div class="brand-text">
                <h2>Visión</h2>
                <p>Alcanzar la posición líder en el mercado mediante la provisión de soluciones logísticas de última
                    generación, destacándonos por nuestra destreza en la optimización de rutas, nuestra constante
                    innovación tecnológica y nuestro compromiso con la satisfacción del cliente, con el objetivo de
                    impulsar el crecimiento y el éxito de nuestros clientes en un entorno globalmente
                    interconectado.</p>
            </div>
            <img src="{{ asset('img/vision.png') }}" alt="Imagen de Marca">
        </div>

        <div class="brand-section what-is">
            <div class="brand-text">
                <h2>¿Qué es?</h2>
                <p>Snappy es una plataforma avanzada de logística diseñada para optimizar la distribución de
                    productos mediante la creación de rutas de entrega eficientes y seguras.</p>
            </div>
            <img src="{{asset('img/ques.jpg')}}" alt="Imagen de Marca">
        </div>

        <div class="brand-section history">
            <div class="brand-text">
                <h2>Historia</h2>
                <p>Snappy fue fundada en 2020 con el objetivo de revolucionar el sector logístico. Desde nuestros
                    inicios, hemos implementado tecnologías de punta y desarrollado estrategias innovadoras para
                    crear rutas de entrega óptimas. A lo largo de los años, hemos crecido y nos hemos adaptado a las
                    necesidades cambiantes del mercado, siempre manteniendo nuestro compromiso con la eficiencia y
                    la satisfacción del cliente.</p>
            </div>
            <img src="{{asset('img/historia.jpg')}}" alt="Imagen de Marca">
        </div>
    </div>

    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 id="modal-title"></h2>
            <p id="modal-text"></p>
            <!-- <img id="modal-image" src="" alt="Modal Image" style="width:100%; height:auto;"> -->
        </div>
    </div>


    <footer class="footer">
        <div class="container container-footer">
            <div class="menu-footer">
                <div class="contact-info">
                    <p class="title-footer">Información de Contacto</p>
                    <ul>
                        <li>
                            Dirección: KM 29020, Carr. Panamericana 1080, Boulevares, 29050 Tuxtla Gutiérrez, Chis.
                        </li>
                        <li>Teléfono: 961 170 8152</li>
                        <li>Correo: snappyrutas@gmail.com</li>
                    </ul>
                </div>

                <div class="information">
                    <p class="title-footer">Información</p>
                    <ul>
                        <li><a href="#">Acerca de Nosotros</a></li>
                        <li><a href="#">Políticas de Privacidad</a></li>
                        <li><a href="#">Términos y condiciones</a></li>
                    </ul>
                </div>

                <div class="my-account">
                    <p class="title-footer">Mi cuenta</p>
                    <ul>
                        <li><a href="#">Mi cuenta</a></li>
                        <li><a href="#">Suscripción</a></li>
                    </ul>
                </div>

                <div class="newsletter">
                    <p class="title-footer">Boletín informativo</p>
                    <div class="content">
                        <p>
                            Suscríbete a nuestros boletines ahora y mantente al día con nuevas colecciones y ofertas
                            exclusivas.
                        </p>
                        <input type="email" placeholder="Ingresa el correo aquí...">
                        <button>Suscríbete</button>
                    </div>
                </div>
            </div>

            <div class="copyright">
                <p>
                    Snappy &copy; 2024
                </p>
            </div>
        </div>
    </footer>
    <script src="{{ asset('js/modal.js') }}" defer></script>
    <script src="https://kit.fontawesome.com/81581fb069.js" crossorigin="anonymous"></script>
    </main>
</body>

</html>
