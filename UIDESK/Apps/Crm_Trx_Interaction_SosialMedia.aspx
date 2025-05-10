<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_Interaction_SosialMedia.aspx.vb" Inherits="UIDESK.Crm_Trx_Interaction_SosialMedia" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_Thread.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>   
    
<div class="col-lg-12">
        <div class="row" id="multichatIframe" style="overflow-y: hidden;  overflow-x: hidden;">
                    <div class="col-md-12">
                     
                            <iframe id="iframe_channel" title="description" frameborder="0" src="" style="width: 100%; height: 800px;margin-top:-70px;"></iframe>
                       
                    </div>
                </div>
                <!--End-->
                <script src="js/ckeditor/ckeditor.js"></script>
                <script src="js/Crm_Trx_Inbox_SosialMedia.js"></script>    
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
