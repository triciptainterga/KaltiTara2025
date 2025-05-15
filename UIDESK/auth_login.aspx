<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="auth_login.aspx.vb" Inherits="UIDESK.auth_login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>Bravo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
    <!-- swiper Css -->
    <link href="Apps/assets/libs/swiper/swiper-bundle.min.css" rel="stylesheet" type="text/css" />

    <style>
        body, html {
            height: 100%;
            margin: 0;
            justify-content: center;
            align-items: center;
            background-size: cover;
            background-position: center;
            overflow-x: hidden;
        }

        body {
            background-image: url('material/bg login bc.png');
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
        }

        .outer-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .row {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 75%;
            margin-top: 80px;
        }

        /*Scale 100%*/
        .login-slider {
            background-size: cover;
            width: 1100px;
            height: auto;
            flex: none;
        }

        .login-container {
            background: url('material/bglogin.png') no-repeat bottom center;
            background-size: cover;
            width: 460px;
            height: 550px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right: 150px;
        }

        .login-slider,
        .login-container {
            height: 570px;
            margin-right: 150px;
        }

        .form-container {
            /*max-width: 250px;*/
            width: 300px;
        }

        .logo {
            display: flex; /* Menggunakan flexbox */
            justify-content: center; /* Menyelaraskan logo secara horizontal */
            align-items: center; /* Menyelaraskan logo secara vertikal */
            width: 100%; /* Membuat lebar penuh agar logo bisa dipusatkan */
        }

        .logo2 {
            width: 60%; /* Atur lebar logo */
            height: auto; /* Mempertahankan rasio aspek */
        }

        .login-container h3 {
            text-align: center;
            margin-bottom: 0px;
        }

        .welcome-text {
            text-align: center; /* Menyelaraskan teks ke tengah */
            font-size: 15px; /* Mengatur ukuran teks */
        }

        .btn-login {
            background-color: #ffcc00;
            border: none;
            color: #fff;
            width: 100%;
            margin-top: 10px;
        }

            .btn-login:hover {
                background-color: #ffbb00;
            }

        /* Tambahan agar elemen tidak berubah ukuran saat zoom */
        * {
            transform: scale(1);
            transform-origin: 0 0;
        }

        /* Scale 125% */
        @media (max-width: 1536px) {
            .row {
                margin-top: 70px;
            }
            .login-slider {
                width: 880px;
            }

            .login-container {
                width: 350px;
                height: 450px;
            }

            .login-slider, .login-container {
                height: 460px;
            }
             .form-container {
                width: 300px;
            }
        }

        /* Scale 150% */
        @media (max-width: 1280px) {
            .row {
                margin-top: 55px;
            }
            .login-slider {
                width: 730px;
            }

            .login-container {
                width: 280px;
                height: 450px;
            }

            .login-slider, .login-container {
                height: 385px;
            }

            .form-container {
                width: 200px;
            }
        }
    </style>
</head>
<body>
    <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-7">
            <div class="login-slider">
                <div class="card">
                    <div class="card-body">
                        <div class="swiper-container pagination-swiper" dir="ltr">
                            <div class="swiper-wrapper">
                                <!-- Slides -->
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="login-container">
                <div class="logo">
                    <img class="logo2" src="material/logo.png" alt="Logo" />
                </div>
                <p class="welcome-text">
                    Welcome Back!<br />
                    Log in to continue to Bravo Omnichannel
                </p>
                <div class="form-container">
                    <form runat="server">
                        <div class="mb-3">
                            <input type="text" class="form-control" id="Login_Username" placeholder="Username" runat="server" />
                        </div>
                        <div class="mb-3">
                            <input type="password" class="form-control" id="Login_Password" placeholder="Password" runat="server" />
                        </div>
                        <div class="mt-3">
                            <a class="btn btn-login w-100" onclick="loginApplikasi()" id="Login_ButtonSubmit" runat="server">Log In</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="Apps/assets/libs/swiper/swiper-bundle.min.js"></script>
    <script src="Apps/js/jquery-1.9.1.min.js"></script>
    <script src="Apps/js/auth_login.js"></script>

</body>

</html>