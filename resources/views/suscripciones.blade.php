<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Snappy</title>
    <link rel="icon" type="image/png" href="{{asset('img/logg.png')}}">
    <link rel="stylesheet" href="{{asset('css/stylesSnap.css')}}"/>
</head>

<body>
<header>
    <div class="container-hero">
        <div class="container hero">
            <div class="customer-support">
                <i class="fa-solid fa-headset"></i>
                <div class="content-customer-support">
                    <span class="text"></span>
                    <span class="number"></span>
                </div>
            </div>

            <div class="container-logo">
                <img src="{{asset('img/logprincipal.png')}}" class="logo-img" alt="Snappy" style="width: 110px;">
            </div>
            <div class="container-user">
                <i class="fa-solid fa-user"></i>
            </div>
        </div>
    </div>
</header>

<main>
    <div class="brand-container">
        <div class="subscription-section">
            <h2>Suscripción Básica</h2>
            <p>Ideal para pequeños negocios con necesidades básicas.</p>
            <ul>
                <li>👥 Vista repartidor</li>
                <li>📡 1 equipo GPS</li>
                <li>📄 Manual de usuario en PDF</li>
                <li>📍 Paradas ilimitadas por ruta</li>
                <li>🤖 Optimización de rutas utilizando IA</li>
                <li>💾 Almacenamiento de rutas previas</li>
                <li>📧 Soporte técnico por correo</li>
            </ul>
            <p class="price">🪙 $8,000 MXN</p>
            <a href="https://buy.stripe.com/5kA15kgiM22i4AocMU">
                <button>Suscribirse</button>
            </a>
        </div>

        <div class="subscription-section popular">
            <span class="badge">Popular</span>
            <h2>Suscripción Intermedia</h2>
            <p>Funcionalidades mejoradas para mayor eficiencia.</p>
            <ul>
                <li>✔️ Funciones del plan básico +</li>
                <li>👨‍💼 Vista supervisor</li>
                <li>📡 10 equipos GPS para integrar a los vehículos de reparto</li>
                <li>📊 Reporte básico de ventas</li>
                <li>💬 Soporte técnico por WhatsApp</li>
            </ul>
            <p class="price">🪙 $15,000 MXN / año</p>
            <a href="https://buy.stripe.com/dR69BQ2rW36m0k8fZ7">
                <button>Suscribirse</button>
            </a>
        </div>

        <div class="subscription-section">
            <h2>Suscripción Empresarial</h2>
            <p>La solución completa para empresas grandes y complejas.</p>
            <ul>
                <li>✔️ Funciones del plan intermedio +</li>
                <li>📡 20 equipos GPS para integrar a los vehículos de reparto</li>
                <li>📊 Reportes detallados de ventas y combustible</li>
                <li>🛡️ Integración para auditorías</li>
                <li>⏰ Soporte exclusivo 24/7</li>
            </ul>
            <p class="price">🪙 $30,000 MXN / año</p>
            <a href="https://buy.stripe.com/fZe6pEd6AeP4eaY3cm">
                <button>Suscribirse</button>
            </a>
        </div>
    </div>
</main>

<footer class="footer">
    <div class="container container-footer">
        <div class="menu-footer">
            <div class="contact-info">
                <p class="title-footer">Información de Contacto</p>
                <ul>
                    <li>Dirección: KM 29020, Carr. Panamericana 1080, Boulevares, 29050 Tuxtla Gutiérrez, Chis.</li>
                    <li>Teléfono: 961 170 8152</li>
                    <li>Correo: snappyrutas@gmail.com</li>
                </ul>
            </div>

            <div class="information">
                <p class="title-footer">Información</p>
                <ul>
                    <li><a href="#">Acerca de Nosotros</a></li>
                    <li><a href="#">Políticas de Privacidad</a></li>
                    <li><a href="#">Términos y Condiciones</a></li>
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
                    <input type="text" class="input-text" placeholder="Escribe tu correo">
                    <button class="btn" type="submit">Enviar</button>
                </div>
            </div>
        </div>
    </div>
</footer>
</body>

</html>
