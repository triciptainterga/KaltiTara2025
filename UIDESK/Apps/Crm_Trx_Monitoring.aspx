<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master"
    CodeBehind="Crm_Trx_Monitoring.aspx.vb" Inherits="UIDESK.Crm_Trx_Monitoring" %>

    <asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <!-- CSS and JS Libraries -->
        <script src="js/jquery-1.9.1.min.js"></script>
        <script src="js/Crm_Trx_Monitoring.js"></script>
        <script src="js/sweetalert.min.js"></script>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
        <!-- Font Awesome CDN -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-KMZ8BDuMcZ4qTzX5C+Q5gLrmcKyZdBfuCaB0+UkMnVDP4qfvv6ScEohpspBVV8+yUpqXa+TcIgjwdb2opjqBlw=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />


        <style>
            .modal-body {
                max-height: 72vh;
                /* Set max height to 70% of the viewport height */
                overflow-y: auto;
                /* Enable vertical scrolling */
            }

            .modal-dialog {
                max-width: 70%;
                /* Adjust this value as needed */
            }

            .card-margin {
                margin-left: 15px;
                /* Ubah sesuai kebutuhan */
                margin-right: 15px;
                /* Ubah sesuai kebutuhan */
            }

            .position-relative {
                position: relative;
            }

            #TxtSearchingUserName {
                padding-right: 2.5rem;
                /* Adds space for the icon */
            }

            .search-icon {
                position: absolute;
                top: 50%;
                right: 12px;
                /* Adjusts horizontal distance from the input field's right edge */
                transform: translateY(-50%);
                /* Centers vertically */
                color: #adb5bd;
                /* Icon color */
                font-size: 1rem;
                /* Adjust icon size */
                pointer-events: none;
                /* Allows input interactions without affecting the icon */
            }

            /* Ensure icon is centered and has appropriate size inside the circular div */
            .icon-thumbnail {
                font-size: 28px;
                /* Adjust the size of the icon */
                width: 50px;
                /* Adjust the width of the circle */
                height: 50px;
                /* Adjust the height of the circle */
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                color: white;
                /* Set icon color */
            }

            .card-item,
            .card-site {
                cursor: pointer;
                padding: 10px;
                width: 370px;
                margin: 0 7.5px;
                transition: transform 0.2s, box-shadow 0.2s;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                border: 2px solid transparent;
                /* Default transparent border */
            }

            .card-item:hover,
            .card-site:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                background-color: #f0f2f5;
            }

            .card-item.active {
                border: 3px solid #0096FF !important;
            }

            .card-site.active {
                border: 3px solid #f0f2f5 !important;
            }
        </style>
        <asp:HiddenField ID="TrxID" runat="server" />
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                    <h4 class="mb-0">Setting User Login</h4>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row d-flex flex-nowrap justify-content-center" id="divCountingDataUser"
                            style="gap: 15px;">
                            <!-- gap untuk jarak antar card -->
                            <!-- Cards will be appended here dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row d-flex flex-nowrap justify-content-center" id="divCardSite" style="gap: 15px;">
                            <!-- gap untuk jarak antar card -->
                            <!-- Cards will be appended here dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <!-- You can add a button here to trigger the search box visibility -->
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="d-flex flex-wrap align-items-start justify-content-md-end gap-2 mb-3">
                                    <!-- Ensure this container is visible when required -->
                                    <div class="position-relative" id="searchContainer" style="display: none;">
                                        <input type="text" id="searchUser" class="form-control"
                                            placeholder="Search User..." onkeyup="LoadingUser(currentType)">
                                        <i class="fas fa-search search-icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="divUserNotification"></div>
                    </div>
                </div>
            </div>
        </div>


    </asp:Content>