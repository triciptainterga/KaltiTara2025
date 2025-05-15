<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Inbox_EmailSystem.aspx.vb" Inherits="UIDESK.Crm_Trm_Inbox_EmailSystem" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Inbox_EmailSystem.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
   
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <link href="assets/libs/choices.js/public/assets/styles/choices.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/libs/flatpickr/flatpickr.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/libs/swiper/swiper-bundle.min.css">
   <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>


    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <asp:HiddenField ID="TrxEmailID" runat="server" />
    <asp:HiddenField ID="TrxGenerateEmailID" runat="server" />
    <asp:HiddenField ID="Hd_StartDate" runat="server" />
    <asp:HiddenField ID="Hd_FinishDate" runat="server" />
    <asp:HiddenField ID="DraftID" runat="server" />
    <asp:HiddenField ID="HDSignature" runat="server" />
    <asp:HiddenField ID="CustomerID" runat="server" />
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxEmailAccount" runat="server" />
    <asp:HiddenField ID="TrxTicketNumber" runat="server" />
    <asp:HiddenField ID="TrxPerusahaanID" runat="server" />
    <asp:HiddenField ID="DynamicEmailContactID" runat="server" />
    <asp:HiddenField ID="DynamicEmailAccountID" runat="server" />


    <style>
        /* Ensure the autocomplete dropdown is on top */

        .ui-autocomplete {
            z-index: 20000000 !important; /* Lebih tinggi dari modal (1050) */
            position: absolute;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            max-height: 300px;
            overflow-y: auto;
        }


        /*.ui-autocomplete {
    z-index: 1000 !important;*/ /* pastikan lebih tinggi dari modal Bootstrap (1050) */

        /*position: absolute;*/ /* wajib untuk jQuery UI autocomplete */
        /*border: 1px solid #ccc;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0px 2px 6px rgba(0,0,0,0.2);
}*/
        .modal-dialog {
            z-index: 1050 !important; /* Bootstrap modal z-index */
        }
    </style>


    <%--   <style>
        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            max-height: 160px;
            overflow-y: auto;
            background-color: white;
            border: 0px solid #ccc;
            z-index: 1000; /* Ensure it's above other elements */
        }
    </style>
    <style>
        .tooltip-container {
            position: relative;
            display: inline-block;
        }

            .tooltip-container .tooltip {
                display: none;
                position: absolute;
                background-color: #333;
                color: #fff;
                padding: 5px;
                border-radius: 3px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
            }

            .tooltip-container:hover .tooltip {
                display: block;
            }

        .mail-list a {
            color: #6c757d;
        }

            .mail-list a i {
                color: #6c757d;
            }

            .mail-list a.active {
                color: #FF4433;
                font-weight: bold;
            }

                .mail-list a.active i {
                    color: #FF4433; /* Warna icon saat aktif */
                }
    </style>
    <style>
        .bodyemailread {
            height: 100%; /* Make the child element take full height of the parent */
            min-height: 300px; /* Set the minimum height */
            overflow-y: auto; /* Add scrollbars if content exceeds max height */
        }
    </style>--%>
    <style>
        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            max-height: 160px;
            overflow-y: auto;
            background-color: white;
            border: 0px solid #ccc;
            z-index: 1000; /* Ensure it's above other elements */
        }
    </style>
    <style>
        .tooltip-container {
            position: relative;
            display: inline-block;
        }

            .tooltip-container .tooltip {
                display: none;
                position: absolute;
                background-color: #333;
                color: #fff;
                padding: 5px;
                border-radius: 3px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
            }

            .tooltip-container:hover .tooltip {
                display: block;
            }

        .mail-list a {
            color: #6c757d;
        }

            .mail-list a i {
                color: #6c757d;
            }

            .mail-list a.active {
                color: #FF4433;
                font-weight: bold;
            }

                .mail-list a.active i {
                    color: #FF4433;
                }

        .modal-body {
            max-height: 72vh; /* Set max height to 70% of the viewport height */
            overflow-y: auto; /* Enable vertical scrolling */
        }

        .email-container {
            margin: 20px 0; /* Space between email blocks */
            display: flex;
            justify-content: space-between; /* Space between left and right cards */
            align-items: flex-start;
            position: relative; /* For vertical line positioning */
        }

        .email-wrapper {
            display: flex;
            justify-content: flex-start; /* Align both sides at the same height */
            width: 100%; /* Ensure wrapper takes full width */
            position: relative; /* Relative positioning for vertical divider */
        }

            /* Continuous vertical center divider between the left and right */
            .email-wrapper::before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                left: 50%;
                width: 1px;
                background-color: #ddd; /* Light color for the vertical divider */
                z-index: 0; /* Ensure the line is behind the cards */
            }

        .email-left, .email-right {
            flex: 1;
        }

        .email-left {
            justify-content: flex-start; /* Align incoming emails to the left */
        }

        .email-right {
            justify-content: flex-end; /* Align outgoing emails to the right */
        }

        .email-card {
            background-color: #f9f9f9; /* Light gray for the card */
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #ddd;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
            width: 100%; /* Take full available width */
            max-width: 500px; /* Same maximum width for both left and right */
            position: relative; /* Allows the divider and other elements inside */
            z-index: 1; /* Ensures the card is on top of the vertical line */
            margin-bottom: 20px; /* Space between cards */
        }

        /* Dashed line with dots in the middle inside each card */
        .divider {
            margin: 10px 0;
            position: relative;
            border-top: 1px dashed #ccc; /* Dashed line between sections */
        }

            .divider:before {
                content: '• • •';
                position: absolute;
                top: -12px; /* Adjust position above the dashed line */
                left: 50%;
                transform: translateX(-50%);
                background-color: #f9f9f9;
                padding: 0 5px;
                color: #666;
                font-size: 12px;
            }

        .email-header {
            font-weight: bold;
            font-size: 14px;
            color: #333;
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px; /* Space before the divider */
            border-bottom: 1px solid #ddd; /* Solid border between header and body */
        }

        .email-title {
            font-size: 16px;
            font-weight: bold;
            margin-right: 15px;
        }

        .email-date {
            font-size: 12px;
            color: #666;
        }

        .email-subject {
            font-size: 14px;
            color: #333; /* Adjust color as needed */
            margin: 5px 0; /* Space around the subject */
        }

        .email-body {
            margin-top: 10px;
            font-size: 14px;
            line-height: 1.6;
        }

        .email-footer {
            margin-top: 10px;
            font-size: 12px;
        }

        .email-attachments {
            list-style: none;
            padding: 0;
            margin: 5px 0;
        }

            .email-attachments li {
                display: inline-block;
                margin-right: 5px;
            }

        .email-signature {
            margin-top: 15px;
            font-size: 14px;
        }

        .company-logo {
            width: 100px;
            margin-top: 10px;
        }
    </style>
    <style>
        /* Untuk Agent */
        .agent-row {
            display: flex;
            align-items: flex-start;
            margin-bottom: 5px;
        }

        .agent-icon {
            width: 30px;
            flex-shrink: 0;
            text-align: center;
            margin-right: 8px;
        }

        .agent-name {
            flex-grow: 1;
            white-space: normal;
            word-wrap: break-word;
            line-height: 1.2;
        }

        /* Untuk Team Leader */
        .team-leader-row {
            display: flex;
            align-items: flex-start;
            margin-bottom: 5px;
        }

        .team-leader-icon {
            width: 30px;
            flex-shrink: 0;
            text-align: center;
            margin-right: 8px;
        }

        .team-leader-name {
            flex-grow: 1;
            white-space: normal;
            word-wrap: break-word;
            line-height: 1.2;
        }
    </style>
    <style>
        .bodyemailread {
            height: 100%; /* Make the child element take full height of the parent */
            min-height: 300px; /* Set the minimum height */
            overflow-y: auto; /* Add scrollbars if content exceeds max height */
        }
    </style>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Inbox Email</h4>
                <div class="page-title-right" id="DivNomorTicketFollowup">
                    <ol class="breadcrumb m-0">
                        <%--<li class="breadcrumb-item"><a href="javascript: void(0);">Dashonic</a></li>--%>
                        <li class="breadcrumb-item active">
                            <h4 id="NomorTicketFollowup" class="mb-0"></h4>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="email-leftbar card">
                <div class="row">
                    <button type="button" class="btn btn-danger w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#composemodal" onclick="Compose_Add()">
                        Compose                                   
                    </button>
                    <div class="mail-list mt-4">
                        <a href="javascript:void(0)" class="active" onclick="OnclickInbox();" id="InboxClass">
                            <i class="bx bxs-inbox font-size-16 align-middle me-2"></i>
                            Inbox 
                        <span class="ms-1 float-end">
                            <p id="InboxCount" style="text-align: center;"></p>
                        </span>
                        </a>
                        <a href="javascript:void(0)" onclick="OnclickDraft()" id="FolderDraft">
                            <i class="bx bx-file font-size-16 align-middle me-2"></i>
                            Draft
                        <span class="ms-1 float-end">
                            <p id="DraftCount" style="text-align: center;"></p>
                        </span>
                        </a>
                        <a href="javascript:void(0)" onclick="OnclickSendLeader()" id="FolderSendTeamLeader">
                            <i class="bx bx-user-circle font-size-16 align-middle me-2"></i>Send To Leader
                        <span class="ms-1 float-end">
                            <p id="SentLeaderCount" style="text-align: center;"></p>
                        </span>
                        </a>
                        <a href="javascript:void(0)" onclick="OnclickSendMail()" id="FolderSendEmail">
                            <i class="bx bx-mail-send font-size-16 align-middle me-2"></i>
                            Sent Mail
                         <span class="ms-1 float-end">
                             <p id="SentMailCount" style="text-align: center;"></p>
                         </span>
                        </a>
                        <a href="javascript:void(0)" onclick="OnclickCase()" id="FolderCase">
                            <i class="bx bx-briefcase-alt font-size-16 align-middle me-2"></i>Case
                        <span class="ms-1 float-end">
                            <p id="CaseCount" style="text-align: center;"></p>
                        </span>
                        </a>
                        <a href="javascript:void(0)" onclick="OnclickArchieve()" id="FolderArchieve">
                            <i class="bx bx-archive-in font-size-16 align-middle me-2"></i>Archieve
                        <span class="ms-1 float-end">
                            <p id="ArchieveCount" style="text-align: center;"></p>
                        </span>
                        </a>
                    </div>
                    <h6 class="mt-4">Data Agent</h6>
                    <div class="mail-list mt-1" id="divLisAgent" style="height: 300px; overflow: auto;">
                    </div>
                    <h6 class="mt-4">Data Team Leader</h6>
                    <div class="mail-list mt-1" id="divLisTeamLeader">
                    </div>
                </div>
            </div>
            <div class="email-rightbar mb-3">
                <div class="card" id="DivHeader">
                    <div class="card-body">
                        <div class="btn-toolbar" role="toolbar" id="DivHeaderDetail">
                            <%--<div class="btn-group me-2 mb-2 mb-sm-0">
                                <button type="button" class="btn btn-primary"><i class="fa fa-inbox"></i></button>
                            </div>--%>
                            <%--  <div class="btn-group me-2 mb-2 mb-sm-0" id="filterDate">
                                <a href="#" class="btn btn-primary dropdown-toggle" data-bs-toggle="modal" onclick="Filter()">Filter Date</a>
                            </div>--%>
                            <%--  <div class="btn-group me-2 mb-2 mb-sm-0" id="divSearchingCustomer">
                                <a href="#" class="btn btn-primary dropdown-toggle" data-bs-toggle="modal" onclick="Search()">Search Customer</a>
                            </div>--%>
                            <div class="btn-group me-2 mb-2 mb-sm-0">
                                <button type="button" class="btn btn-primary" title="Information" onclick="EmailConversation()"><i class="fa fa-exclamation-circle"></i></button>
                            </div>
                            <div class="btn-group me-2 mb-2 mb-sm-0">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-folder"></i>&nbsp;Archieve <i class="mdi mdi-dots-vertical ms-2"></i>
                                </button>
                                <div class="dropdown-menu" style="" id="DivMarkAsEmail"></div>
                            </div>
                            <div class="btn-group me-2 mb-2 mb-sm-0">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-tag"></i>&nbsp;More<i class="mdi mdi-chevron-down ms-1"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#" onclick="FollowUp()">Follow up Ticket</a>
                                    <a class="dropdown-item" href="#" onclick="SaveClose()">Close Ticket</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" id="DivFilterDate">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-10">
                            </div>
                            <div class="col-md-2">
                                <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                    <div>
                                        <a href="#" class="btn btn-primary" data-bs-toggle="modal" onclick="FilterDateEmailArchieve()" id="FilterDateEmailArchieve">Filter Date</a>
                                        <a href="#" class="btn btn-primary" data-bs-toggle="modal" onclick="FilterDateEmailSendingEmail()" id="FilterDateEmailSendingEmail">Filter Date</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" id="DivTableIncomingEmail">
                    <div class="card-body">
                        <!-- Filter Date Button (initially hidden) -->
                        <div id="filterDateContainer" style="display: none; float: right;">
                            <a href="#" class="btn btn-light ms-2" data-bs-toggle="modal" data-bs-target="#addContactModalFilterDate">Filter Date</a>
                        </div>
                        <!-- Table -->
                        <table id="TableIncomingEmail" class="table table-hover" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="width: 250px;">From</th>
                                    <th>Subject</th>
                                    <th style="width: 200px;">Status</th>
                                    <th style="width: 200px;">Date Create</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Dynamic content loaded here -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card" id="DivTableOutgoingEmail">
                    <div class="card-body">
                        <table id="TableOutgoingEmail" class="table table-hover" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="width: 250px;">To</th>
                                    <th>Subject</th>
                                    <th style="width: 200px;">Date Create</th>
                                    <th style="width: 200px;">Date Modified</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card" id="DivTableOutgoingSendingEmail">
                    <div class="card-body">
                        <!-- Filter Date Button (initially hidden) -->
                        <div id="filterDateContainerSendEmail" style="display: none; float: right;">
                            <a href="#" class="btn btn-light ms-2" data-bs-toggle="modal" data-bs-target="#addContactModalFilterDate">Filter Date</a>
                        </div>
                        <table id="TableOutgoingSendingEmail" class="table table-hover" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="width: 250px;">To</th>
                                    <th>Subject</th>
                                    <th style="width: 200px;">Sender</th>
                                    <th style="width: 200px;">Date Create</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card" id="DivObjectCustomer">
                    <div class="card-body">
                        <div class="mt-2">
                            <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link active" data-bs-toggle="tab" href="#navtabs2-customer" role="tab" aria-selected="true">
                                        <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                        <span class="d-none d-sm-block">Customer</span>
                                    </a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-perusahaan" role="tab" aria-selected="false" tabindex="-1" onclick="DisplayPerusahaan()">
                                        <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                        <span class="d-none d-sm-block">Perusahaan/Pemerintah</span>
                                    </a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-channel" role="tab" aria-selected="true">
                                        <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                        <span class="d-none d-sm-block">Other Channel</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane active" id="navtabs2-customer" role="tabpanel">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row" style="display: none;">
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">Nama <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="AddCustomer_Nama" placeholder="Nama" value="1">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">Tipe <span class="text-danger">*</span></label>
                                                    <select id="AddCustomer_Type" class="form-select" onchange="Dropdown_TypePerusahaan('1')">
                                                        <option value="">Select</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label for="addcontact-designation-input" class="form-label">Nama Perusahaan/Pemerintah</label>
                                                    <div class="input-group">
                                                        <div class="input-group-text" style="cursor: pointer;" onclick="Perusahaan_AddNew()" role="tabpanel"><i class="fas fa-plus-circle"></i></div>
                                                        <input type="text" class="form-control" id="AddCustomer_NamaPerusahaan" placeholder="Nama Perusahaan/Pemerintah">
                                                    </div>
                                                    <div id="Div_CustomerSearching" class="search-results" style="margin-left: 10px; margin-right: 10px; margin-top: -15px; width: 350px;"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label for="addcontact-designation-input" class="form-label">NPWP</label>
                                                    <input type="text" class="form-control" id="AddCustomer_NPWP" placeholder="NPWP">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label for="addcontact-designation-input" class="form-label">Nama/PIC <span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <div class="input-group-text" onclick="Perusahaan_ListPIC()" style="cursor: pointer;"><i class="fas fa-user-circle"></i></div>
                                                        <input type="text" class="form-control" id="AddCustomer_Name" placeholder="Nama">
                                                    </div>
                                                    <div id="Div_CustomerSearchingPIC" class="search-results" style="margin-left: 10px; margin-right: 10px; margin-top: -15px; width: 350px;"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label for="addcontact-designation-input" class="form-label">Nomor Telepon</label>
                                                    <input type="text" class="form-control" id="AddCustomer_HP" placeholder="Nomor Telepon">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label for="addcontact-designation-input" class="form-label">Email <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="AddCustomer_Email" placeholder="Email">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label for="addcontact-designation-input" class="form-label">Facebook</label>
                                                    <input type="text" class="form-control" id="AddCustomer_Facebook" placeholder="Facebook">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label for="addcontact-designation-input" class="form-label">Instagram</label>
                                                    <input type="text" class="form-control" id="AddCustomer_Instagram" placeholder="Instagram">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label for="addcontact-designation-input" class="form-label">Twitter</label>
                                                    <input type="text" class="form-control" id="AddCustomer_Twitter" placeholder="Twitter">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="display: none;">
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label for="addcontact-designation-input" class="form-label">Address</label>
                                                    <textarea class="form-control" placeholder="Address" id="AddCustomer_Alamat" name="AddCustomer_Alamat" style="height: 300px;"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <%--<button type="button" class="btn btn-light w-sm" onclick="Customer_Close()" id="CloseCustomer">Close</button>--%>
                                            <button type="button" class="btn btn-light w-sm" onclick="Proses_CancelCustomer()" id="CancelCustomerNya">Cancel</button>
                                            <button type="button" class="btn btn-primary w-sm" onclick="Proses_UpdateCustomer()" id="UpdateCustomer">Update</button>
                                            <button type="button" class="btn btn-primary w-sm" onclick="Proses_SimpanCustomer()" id="SimpanCustomer">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="navtabs2-channel" role="tabpanel">
                                <div class="card">
                                    <div class="card-body">
                                        <div id="Div_CustomerChannel" class="row" style="height: 100%; overflow-x: auto;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="navtabs2-perusahaan" role="tabpanel">
                                <div class="card" id="DivObjectPerusahaan">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">Nama Perusahaan/Pemerintah<span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="Perusahaan_Nama" placeholder="Nama Perusahaan/Pemerintah">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">NPWP</label>
                                                    <input type="text" class="form-control" id="Perusahaan_NPWP" placeholder="NPWP">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">Tipe <span class="text-danger">*</span></label>
                                                    <select id="AddPerusahaan_Type" class="form-select">
                                                        <option value="">Select</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="display: none;">
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">Telepon</label>
                                                    <input type="text" class="form-control" id="Perusahaan_Telepon" placeholder="Telepon">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">Email</label>
                                                    <input type="text" class="form-control" id="Perusahaan_Email" placeholder="Email">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-light w-sm" onclick="Proses_CancelPerusahaan()" id="CancelCustomer">Cancel</button>
                                            <button type="button" class="btn btn-primary w-sm" onclick="Proses_UpdatePerusahaan()" id="UpdatePerusahaan">Update</button>
                                            <button type="button" class="btn btn-primary w-sm" onclick="Proses_SimpanPerusahaan()" id="SimpanPerusahaan">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="DivObjectCompose">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="ComposeETO" placeholder="To">
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="ComposeESUBJECT" placeholder="Subject">
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="ComposeECC" placeholder="Cc">
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <iframe id="Preview_FrameHTML3" title="description" style="width: 100%;" class="bodyemailread"></iframe>
                                        <div id="Div_Inbox_AttachmentEmailReplyWithoutTicket" style="width: 100%; height: 100%; overflow-x: hidden; overflow-y: scroll;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <textarea id="Compose_Body" name="Compose_Body" class="form-control" rows="25" placeholder="Jawaban.."></textarea>
                            </div>
                            <div class="mt-3" id="Div_ComposeTicketAttachmentExisting">
                                <div id="ComposeTicketAttachmentExisting" style="width: 100%;"></div>
                            </div>
                            <div class="row" id="ComposeDivAttachmentTicketEmail">
                                <div class="col-lg-12">
                                    <input type="file" name="composefiles" class="form-control">
                                </div>
                            </div>
                            <div class="mt-3">
                                <div id="ComposeTicketAttachment" style="width: 100%;"></div>
                            </div>
                            <div class="mt-3">
                                <a class="btn btn-soft-primary w-sm float-end" onclick="Proses_ComposeEmail()" id="ButtonProsesCompose"><i class="fab fa-telegram-plane ms-1"></i>&nbsp;Send</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="DivObjectTicket">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="contact-info-name" class="form-label">Agent Name <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" placeholder="Enter Name" id="Form_Ticket_Agent_Name">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="contact-info-email-input" class="form-label">Priority <span class="text-danger">*</span></label>
                                        <select id="Form_Ticket_Priority" class="form-select" required>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="contact-info-phone-input" class="form-label">Status <span class="text-danger">*</span></label>
                                        <select id="Form_Ticket_Status" class="form-select">
                                            <option value="Open" selected="selected">Select</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Solved">Solved</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Subject <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="Form_Ticket_Subject" placeholder="Subject">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Category <span class="text-danger">*</span></label>
                                        <select id="Form_Ticket_Kategori" class="form-select" onchange="Dropdown_SubCategory(1);">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">No. Aju</label><label class="float-end" id="errorNoAjo" style="color: red;"></label>
                                        <input type="text" class="form-control" id="Form_Ticket_NoAju" placeholder="No. Aju">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Kantor <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="Form_Ticket_Kantor" placeholder="Kantor">
                                        <div id="Div_KantorSearching" class="search-results" style="margin-left: 10px; margin-right: 10px; margin-top: -15px; width: 420px;"></div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Sub Category <span class="text-danger">*</span></label>
                                        <select id="Form_Ticket_SubKategori" class="form-select">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Nilai Transaksi</label>
                                        <input type="text" class="form-control" id="Form_Ticket_NilaiTransaksi" placeholder="Nilai Transaksi">
                                    </div>
                                </div>
                            </div>
                            <div class="form-check form-switch mb-2" id="DivHideShowTeamLeader">
                                <input type="checkbox" class="form-check-input" id="customSwitchsizesm" onclick="CheckedTeamleader(this.checked)">
                                <label class="form-check-label" for="customSwitchsizesm">Hide/Show</label>
                            </div>
                            <div class="row" id="DivRejectTeamLeader">
                                <div class="row" id="RejectTeamLeader"></div>
                            </div>
                            <div class="row" id="DivAction">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <label for="contact-info-phone-input" class="form-label">Action</label>
                                        <select id="Form_Ticket_Action" class="form-select" onchange="Dropdown_ChangeAction('1')">
                                            <option value="">Select</option>
                                            <%-- <option value="1">Send To Team Leader</option>
                                            <option value="3">Convert To Case</option>
                                            <option value="2">Save & Close</option>--%>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="ObjectEmail">
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">To</label>
                                        <input type="text" class="form-control" id="Form_Ticket_Email_Tujuan" placeholder="To">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Subject</label>
                                        <input type="text" class="form-control" id="Form_Ticket_Email_Subject" placeholder="Subject">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Cc</label>
                                        <input type="text" class="form-control" id="Form_Ticket_Email_CC" placeholder="Cc">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <iframe id="Preview_FrameHTML2" title="description" style="width: 100%;" class="bodyemailread"></iframe>
                                        <div id="Div_Inbox_AttachmentEmailReply" style="width: 100%; height: 100%; overflow-x: hidden; overflow-y: scroll;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <textarea id="Ticket_NoteAgent" name="Ticket_NoteAgent" class="form-control" rows="20" placeholder="Jawaban.."></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3" id="Div_TicketAttachmentExisting">
                                <div id="TicketAttachmentExisting" style="width: 100%;"></div>
                            </div>
                            <div class="row" id="DivAttachmentTicketEmail">
                                <div class="col-lg-12">
                                    <input type="file" name="files" class="form-control">
                                </div>
                            </div>
                            <div class="mt-3">
                                <div id="TicketAttachment" style="width: 100%;"></div>
                            </div>
                            <div class="mt-3">
                                <a class="btn btn-soft-warning w-sm float-start" onclick="SaveTemplate()" id="ButtonProsesSaveTemplate"><i class="fa fa-save"></i>&nbsp;Save As Template</a>
                                <a class="btn btn-soft-success w-sm float-start" onclick="InsertTemplate()" id="ButtonProsesInsertTemplate"><i class="fa fa-save"></i>&nbsp;Insert From Template</a>
                                <a class="btn btn-soft-primary w-sm float-end" onclick="Proses_UpdateEmail()" id="ButtonProsesUpdateEmail"><i class="fa fa-save"></i>&nbsp;Update</a>
                                <a class="btn btn-soft-primary w-sm float-end" onclick="Proses_SubmitEmail()" id="ButtonProsesSubmitEmail"><i class="fa fa-save"></i>&nbsp;Submit</a>
                                <a class="btn btn-soft-primary w-sm float-end" onclick="Proses_ForwardEmail()" id="ButtonProsesForwardEmail"><i class="fab fa-telegram-plane ms-1"></i>&nbsp;Send</a>
                                <a class="btn btn-soft-primary w-sm float-end" onclick="Proses_ForwardEmailTeamLeader()" id="ButtonProsesForwardEmailTeamLeader"><i class="fab fa-telegram-plane ms-1"></i>&nbsp;Send</a>
                                <a class="btn btn-soft-primary w-sm float-end" onclick="Proses_FollowupTicket()" id="ButtonProsesFollowupTicket"><i class="fab fa-telegram-plane ms-1"></i>&nbsp;Send</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" id="DivBodyEmailDuplicate">
                    <div class="card-body">
                        <table id="TableDuplicateIncomingEmail" class="table table-hover" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="width: 250px;">From</th>
                                    <th>Subject</th>
                                    <th style="width: 200px;">Owner</th>
                                    <th style="width: 200px;">Progress</th>
                                    <th style="width: 200px;">Date Create</th>
                                    <th style="width: 200px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card" id="DivBodyEmail">
                    <div class="card-body">
                        <div class="d-flex align-items-start mb-4">
                            <div class="flex-shrink-0 me-3" onclick="PreviewDataCustomer()" style="cursor: pointer;">
                                <img class="rounded-circle avatar-sm" src="assets/images/users/avatar-2.jpg" alt="Generic placeholder image">
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="font-size-14 my-1" id="Profile_NamaCustomer"></h5>
                                <small class="text-muted" id="Profile_EmailCustomer"></small>
                            </div>
                        </div>
                        <iframe id="Preview_FrameHTML1" title="description" style="width: 100%;" class="bodyemailread"></iframe>
                        <div id="Div_Inbox_AttachmentEmail" style="width: 100%; height: 100%; overflow-x: hidden; overflow-y: scroll;"></div>
                        <a href="#" id="ButtonReply" class="btn btn-light mt-4" onclick="Action_Reply()"><i class="mdi mdi-reply"></i>Reply</a>
                        <a href="#" id="ButtonForward" class="btn btn-light mt-4" onclick="Action_Forward()"><i class="mdi mdi-forward"></i>Forward</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="FormTemplate"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalKantor">Form Template</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3" id="TemplateTextboxtSubject">
                            <label for="addcontact-name-input" class="form-label">Template Name</label>
                            <input type="text" class="form-control" id="Template_Name" placeholder="Template Name">
                        </div>
                       
                        <div class="mb-3 position-relative" id="TemplateDropdownSubject">
                            <label for="ComboTemplateName" class="form-label">Template Name</label>
                            <select id="ComboTemplateName" class="form-select" style="width: 100%" data-allow-clear="true">
    <option></option> <!-- option kosong dibutuhkan untuk fitur clear -->
</select>
                        </div>

                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Template Description</label>
                            <textarea id="Template_Description" name="Template_Description" class="form-control" rows="18" placeholder="Template Description.."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                     <input type="hidden" id="HiddenTemplateID">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger w-sm" onclick="DeleteTemplate()" id="DeleteDataTemplate">Delete</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanTemplate()" id="SimpanTemplate">Submit</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionGetTemplate()" id="GetTemplate">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-followup" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalFollowup">Follow up email</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Ticket Number</label>
                            <select id="TicketNumberFollowup" class="form-select" onchange="ChangeTicketFollowup('1')">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Status Ticket</label>
                            <input type="text" class="form-control" id="TicketStatusFollowup" placeholder="Status Ticket" readonly="readonly">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="Submitfollowup()" id="submitfollowup">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-preview-email"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content" style="width: 1100px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelHistory">Preview</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <iframe id="FramePreviewEmail" title="description" style="width: 100%; height: 600px;"></iframe>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ContactChannel" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Form Channel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Account</label>
                            <input type="text" class="form-control" id="ValueChannel" placeholder="Account">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-designation-input" class="form-label">Channel</label>
                            <select class="form-select" id="AddComboChannel">
                                <option>Select</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdateChannel()" id="UpdateChannel">Update</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanChannel()" id="SimpanChannel">Submit</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionDeleteChannel()" id="DeleteChannel">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="popupemail" tabindex="-1" aria-labelledby="emailModalLabel" aria-hidden="true" style="margin-top: 50px;">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="emailModalLabel">Email Conversation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="overflow-y: scroll;">
                    <div id="Journeymailconversationnew"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModalFilterDateSendingEmail" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelDateSendingEmail">Filter Date</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="clearFormFields()"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3" id="dateFieldsSendingEmail">
                            <label for="startdate" class="form-label">Start Date</label>
                            <input type="date" class="form-control" id="startdateSendingEmail" required>
                        </div>
                        <div class="mb-3" id="endDateFieldsSendingEmail">
                            <label for="enddate" class="form-label">End Date</label>
                            <input type="date" class="form-control" id="enddateSendingEmail" required>
                        </div>
                        <small id="dateErrorSendingEmail" class="text-danger" style="display: none;"></small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal" onclick="clearFormFields()">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionFilterDateSendingEmail()" id="SubmitSendingEmail">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModalFilterDateArchieve" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelDate">Filter Date</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="clearFormFields()"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3" id="dateFields">
                            <label for="startdate" class="form-label">Start Date</label>
                            <input type="date" class="form-control" id="startdate" required>
                        </div>
                        <div class="mb-3" id="endDateFields">
                            <label for="enddate" class="form-label">End Date</label>
                            <input type="date" class="form-control" id="enddate" required>
                        </div>
                        <small id="dateError" class="text-danger" style="display: none;"></small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal" onclick="clearFormFields()">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionFilterDateArchieve()" id="SubmitArchieve">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script src="assets/libs/swiper/swiper-bundle.min.js"></script>
    <script src="assets/js/pages/timeline.init.js"></script>
    <script>
        var Ticket_NoteAgent = CKEDITOR.replace('Ticket_NoteAgent');
          Ticket_NoteAgent.config.height = 500;
          Ticket_NoteAgent.config.toolbar = 'Basic';
          Ticket_NoteAgent.config.toolbar_Basic =
              [
                  ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-']
              ];
          var Template_Description = CKEDITOR.replace('Template_Description');
          Template_Description.config.height = 500;
          Template_Description.config.toolbar = 'Basic';
          Template_Description.config.toolbar_Basic =
              [
                  ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-']
              ];
          var Compose_Body = CKEDITOR.replace('Compose_Body');
          Compose_Body.config.height = 500;
          Compose_Body.config.toolbar = 'Basic';
          Compose_Body.config.toolbar_Basic =
              [
                  ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-']
              ];
    </script >
</asp:Content>

