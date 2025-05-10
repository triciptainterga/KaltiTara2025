<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Internal_Chat.aspx.vb" Inherits="UIDESK.Crm_Trm_Internal_Chat" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Internal_Chat.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <style>
        .iframe-container {
            position: relative;
            width: 100%;
            padding-top: 56.25%; /* 16:9 aspect ratio */
        }

        .responsive-iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
            margin-top: -60px;
        }

        .content {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

            .content img,
            .content video {
                max-height: 100%;
                height: auto;
                width: auto;
                margin: auto;
            }
    </style>
    <div class="col-lg-12">

        <!-- Popup -->
        <div class="row" id="multichatIframe" style="overflow-y: hidden; overflow-x: hidden;">
            <div class="col-md-12">
                <div class="iframe-container">
                    <iframe id="iframe_channel" title="description" frameborder="0" src="" class="responsive-iframe"></iframe>
                </div>
            </div>
        </div>
        <!--End-->
        <script src="js/ckeditor/ckeditor.js"></script>
        <script src="js/Crm_Trm_Internal_Chat.js"></script>
        <style>
            .style1 {
                display: none;
                /*visibility: none;*/
            }

            .style2 {
                margin-left: 50px;
            }

            .style3 {
                margin-left: 350px;
            }

            .style4 {
                display: block;
                /*visibility: none;*/
            }

            .style5 {
                display: block;
            }
        </style>
        <script>
            function HideSideLeftMenu() {
                console.log("123");
                document.getElementById('SideLeftMenu').setAttribute("class", "style1");
                document.getElementById('SideRightMenu').setAttribute("class", "style2");
                document.getElementById('ShowMenu').setAttribute("class", "left-block content style4");
            }
            function ShowSideLeftMenu() {
                console.log("456");
                document.getElementById('ShowMenu').setAttribute("class", "left-block content style1");
                document.getElementById('SideLeftMenu').setAttribute("class", "left-block content style5");
                document.getElementById('SideRightMenu').setAttribute("class", "style3");
            }
        </script>

    </div>
</asp:Content>
