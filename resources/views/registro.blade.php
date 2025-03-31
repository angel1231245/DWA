<!DOCTYPE html>
<html lang="en">
<html>
<head>
    <title>Registrarse</title>
    <link rel="icon" type="image/png" href="{{asset('img/logg.png')}}}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta charset="utf-8"/>
    <link rel="stylesheet" type="text/css" href="{{asset('css/registro.css')}}"/>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link
        href="https://fonts.googleapis.com/css?family=Titillium+Web:400,300,600"
        rel="stylesheet"
        type="text/css"
    />
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
</head>

<body class="body">

<div class="login-page">
    <div class="form">
        <form action="{{ route('registro') }}" method="post">
            @csrf
            <img src="{{asset('img/perfilimg.png')}}" alt="Perfil" style="display: block; margin: 0 auto; width: 160px">

            <input type="text" placeholder="Nombre completo" id="name" name="name" required/>
            <input type="text" placeholder="Correo electronico" id="email" name="email" required/>
            <input type="text" placeholder="Nombre de usuario" id="username" name="username" required/>
            <input type="password" id="password" placeholder="Contraseña" id="password" name="password" required/>
            <i class="fas fa-eye" onclick="show()"></i>
            <br>
            <br>
            <button type="submit">Crear cuenta</button>
        </form>

        <form class="login-form">
            <!--<button type="submit">Crear cuenta</button>-->
        </form>
    </div>
</div>
</body>
<script>
    function show() {
        var password = document.getElementById("password");
        var icon = document.querySelector(".fas");

        // ========== Checking type of password ===========
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    }
</script>
</html>
</html>
