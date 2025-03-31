<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



$mensajeUsuario = "";
$mensajePassword = "";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];


    try {
        $stmt = $conn->prepare("SELECT username, password FROM repartidor WHERE username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($password, $row['password'])) {
                session_start();
                $_SESSION['username'] = $username;
                header("Location: MapaRepartidor.html");
                exit();
            } else {
                $mensajePassword = "Contraseña incorrecta.";
            }
        } else {
            $stmt = $conn->prepare("SELECT nameempresa, password FROM empresa WHERE nameempresa = :username");
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if (password_verify($password, $row['password'])) {
                    session_start();
                    $_SESSION['username'] = $username;

                    $stmt2 = $conn->prepare("SELECT * FROM suscriptores WHERE nameempresaid2 = :nameempresaid2");
                    $stmt2->bindParam(':nameempresaid2', $username);
                    $stmt2->execute();
                    if ($stmt2->rowCount() > 0) {
                        $row2 = $stmt2->fetch(PDO::FETCH_ASSOC);
                        if ($row2['suscripcion'] == 1) {

                            header("Location: MapaBacico.php");
                            exit();
                        }
                        if ($row2['suscripcion'] == 2) {

                            header("Location: MapEG.php");
                            exit();
                        }
                        if ($row2['suscripcion'] == 3) {

                            header("Location: MapEG.php");
                            exit();
                        }
                    } else {
                        header("Location: suscripciones.html");
                    }
                    exit();
                } else {
                    $mensajePassword = "Contraseña incorrecta.";
                }
            } else {
                $mensajeUsuario = "Usuario no encontrado.";
            }
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>

    <!DOCTYPE HTML>
<html lang="en">
<html>
<head>
    <title>Iniciar Sesión</title>
    <link rel="icon" type="image/png" href="{{ asset('img/logg.png')}}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/login_style.css')}}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href='https://fonts.googleapis.com/css?family=Titillium+Web:400,300,600' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Titillium+Web:400,300,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
</head>

<body class="body">
<div class="login-page">
    <div class="form">

        <form action="login.php" method="post">
            <img src="{{asset('img/perfilimg.png')}}" alt="Perfil" style="display: block; margin: 0 auto; width: 160px">
            <input type="text" id="username" name="username" required placeholder="&#xf007;  Nombre de usuario"/>
            <?php if (!empty($mensajeUsuario)): ?>
            <div class="error"><?php echo $mensajeUsuario; ?></div>
            <?php endif; ?>

            <input type="password" id="password" name="password" required placeholder="&#xf023;  Contraseña"/>
            <?php if (!empty($mensajePassword)): ?>
            <div class="error"><?php echo $mensajePassword; ?></div>
            <?php endif; ?>
            <i class="fas fa-eye" onclick="show()"></i>
            <br>
            <br>
            <button type="submit">Iniciar Sesión</button>
            <p class="message"></p>
        </form>

        <form class="login-form">
            <button type="button" onclick="window.location.href='signup.html'">Registrarse</button>
        </form>
    </div>
</div>

<script>
    function show() {
        var password = document.getElementById("password");
        var icon = document.querySelector(".fas")

        // ========== Checking type of password ===========
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    };
</script>
</body>
</html>
