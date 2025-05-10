<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_System_Setting.aspx.vb" Inherits="UIDESK.Crm_System_Setting" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- CSS Files -->
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <link href="assets/libs/choices.js/public/assets/styles/choices.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/libs/flatpickr/flatpickr.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/libs/swiper/swiper-bundle.min.css">

    <div class="container">
         <div class="row" id="menuContainer">
         </div>
         <div class="separator"></div>
         <div class="row" id="submenuContainer" style="display: none;">
         </div>
    </div>
    
    
    <style>
        body {
            background-color: #f0f0f0;
        }
    
        .container {
            margin-left: 10px;
            max-width: calc(8 * 200px + 7 * 10px); /* 8 kotak @ 200px + 7 gap @ 10px */
        }
    
        .row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: start;
        }
    
        .boxicon {
            width: 200px;
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px solid #ddd;
            border-radius: 8px;
            transition: all 0.3s ease;
            background-color: #FFFFFF;
            margin: 0;
            box-sizing: border-box;
            text-decoration: none;
        }
    
        .boxicon:hover {
            border-color: #007bff;
        }
    
        .boxicon i {
            font-size: 5rem;
            color: #000000;
            margin-top: 5px;
        }
    
        .icon-title {
            font-size: 0.75rem;
            color: #000000;
            text-align: center;
        }
    
        .separator {
            height: 4px;
            width: 400vw;
            background-color: #ddd;
            margin: 20px 0 20px -100vw;
            left: 100%;
            position: relative;
        }
    </style>


        <!-- JavaScript Files -->
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_System_Setting.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
</asp:Content>
