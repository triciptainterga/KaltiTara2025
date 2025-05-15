<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="auth_bravo.aspx.vb" Inherits="UIDESK.auth_bravo" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bravo Omnichannel Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: url('Images/Background/BGLoginColumn1.png') no-repeat center center fixed;
            background-size: cover;
        }
        .container {
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 400px;
            width: 100%;
        }
        .container img {
            width: 150px;
            margin-bottom: 20px;
        }
        .container h2 {
            margin-bottom: 10px;
        }
        .textbox {
            margin-bottom: 20px;
            width: 100%;
        }
        .textbox input {
            width: 100%;
            padding: 10px;
            background: #f2f2f2;
            border: none;
            outline: none;
            color: #333;
            font-size: 18px;
            border-radius: 5px;
        }
        .textbox input:focus {
            background: #e0e0e0;
        }
        .btn {
            width: 100%;
            background: #ff8800;
            border: none;
            padding: 15px;
            cursor: pointer;
            font-size: 18px;
            color: white;
            border-radius: 5px;
            transition: background 0.3s ease;
        }
        .btn:hover {
            background: #ff6600;
        }
        .footer {
            margin-top: 20px;
            color: #666;
            font-size: 14px;
            position: absolute;
            bottom: 10px;
            text-align: center;
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="logo.png" alt="Logo Bravo">
        <h2>Welcome Back!</h2>
        <p>Login to continue to Bravo Omnichannel</p>
        <form action="/login" method="post">
            <div class="textbox">
                <input type="text" placeholder="Username" name="username" required>
            </div>
            <div class="textbox">
                <input type="password" placeholder="Password" name="password" required>
            </div>
            <button type="submit" class="btn">LOGIN</button>
        </form>
    </div>
    <div class="footer">
        <p>Kementerian Keuangan RI - Direktorat Jenderal Bea dan Cukai</p>
        <p>&copy; 2024 Ticketing System Crafted with ❤️ by Uidesk</p>
    </div>
</body>
</html>


