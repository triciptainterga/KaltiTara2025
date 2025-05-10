<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master"
    CodeBehind="Crm_Trm_Email_Mtr.aspx.vb" Inherits="UIDESK.Crm_Trm_Email_Mtr" %>
    <asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <script src="js/jquery-1.9.1.min.js"></script>
        <script src="js/Crm_Trm_Email_Mtr.js"></script>
        <script src="js/sweetalert.min.js"></script>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
        <!-- Font Awesome CDN -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-KMZ8BDuMcZ4qTzX5C+Q5gLrmcKyZdBfuCaB0+UkMnVDP4qfvv6ScEohpspBVV8+yUpqXa+TcIgjwdb2opjqBlw=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

        <!-- DataTables JS -->
        <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

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

        <body>
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-flex align-items-center justify-content-between">
                        <h4 class="mb-0">Monitoring Email Queueing</h4>
                    </div>
                </div>
            </div>

            <!-- card menampilkan site berdasarkan ProductID -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row d-flex flex-nowrap justify-content-center" id="divCardSite"
                                style="gap: 15px;">
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
                            <%--<h5 class="mb-3">Email Queue</h5>--%>
                            <table class="table table-striped table-bordered" id="emailQueueTable">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>From</th>
                                        <th>Subject</th>
                                        <th>Email Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>            

        </body>
    </asp:Content>