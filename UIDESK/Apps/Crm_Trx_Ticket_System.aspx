<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_Ticket_System.aspx.vb" Inherits="UIDESK.Crm_Trx_Ticket_System" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_Ticket_System.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
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
        /* Custom CSS if needed */
        .swiper-container {
            width: 100%;
            height: 100%;
        }

        /*        .swiper-slide {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #eee;
            border-radius: 10px;
        }*/
    </style>
    <!-- swiper css -->
    <link rel="stylesheet" href="assets/libs/swiper/swiper-bundle.min.css">

    <!-- Bootstrap Css -->
    <link href="assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
    <!-- Icons Css -->
    <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <!-- App Css-->
    <link href="assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />

    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="CustomerID" runat="server" />
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxNumberID" runat="server" />
    <asp:HiddenField ID="TrxThreadID" runat="server" />
    <asp:HiddenField ID="TrxChannel" runat="server" />
    <asp:HiddenField ID="TrxTicketNumber" runat="server" />
    <asp:HiddenField ID="TrxStatus" runat="server" />
    <asp:HiddenField ID="HD_API_Gender" runat="server" />
    <asp:HiddenField ID="HD_API_NomorPolis" runat="server" />
    <asp:HiddenField ID="hd_Layer" runat="server" />
    <asp:HiddenField ID="DynamicContactID" runat="server" />
    <asp:HiddenField ID="DynamicAccountID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Ticketing</h4>
                <%-- <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Dashonic</a></li>
                        <li class="breadcrumb-item active">Sales Analytics</li>
                    </ol>
                </div>--%>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xxl-3 col-lg-4">
            <div class="card">
                <div class="card-body text-center">
                    <div class="text-end">
                        <div class="dropdown">
                            <a class="btn btn-link text-dark font-size-16 p-1 dropdown-toggle shadow-none" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fas fa-ellipsis-h"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" style="">
                                <li><a class="dropdown-item" href="#" onclick="AddCustomer()">Add</a></li>
                                <li><a class="dropdown-item" href="#" onclick="EditCustomer()">Edit</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="avatar-xl mx-auto mb-4">
                        <img src="assets/images/users/user.png" alt="" class="rounded-circle img-thumbnail">
                    </div>
                    <h5 class="mb-1" id="Profile_NamaCustomer"></h5>
                    <p class="text-muted" style="cursor: pointer;" id="Profile_NamaPerusahaan"></p>
                </div>
            </div>
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-body">
                        <div class="mt-2">
                            <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link active" data-bs-toggle="tab" href="#navtabs2-home" role="tab" aria-selected="true">
                                        <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                        <span class="d-none d-sm-block">Channel</span>
                                    </a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-channel" role="tab" aria-selected="true">
                                        <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                        <span class="d-none d-sm-block">Other Channel</span>
                                    </a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-profile" role="tab" aria-selected="false" tabindex="-1">
                                        <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                        <span class="d-none d-sm-block">Reported</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane active" id="navtabs2-home" role="tabpanel">
                                <div class="card">
                                    <div class="card-body">
                                        <ul class="list-unstyled mb-0">
                                            <li class="pb-2">
                                                <div class="d-flex align-items-center">
                                                    <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                                        <i class="fas fa-phone-alt"></i>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted mb-1 font-size-13">No. Telepon</p>
                                                        <h5 class="mb-0 font-size-14" id="Profile_NomorTelepon"></h5>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="py-2">
                                                <div class="d-flex align-items-center">
                                                    <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                                        <i class="far fa-envelope"></i>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted mb-1 font-size-13">Email</p>
                                                        <h5 class="mb-0 font-size-14" id="Profile_Email_Customer"></h5>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="py-2">
                                                <div class="d-flex align-items-center">
                                                    <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                                        <i class="fab fa-facebook"></i>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted mb-1 font-size-13">Facebook</p>
                                                        <h5 class="mb-0 font-size-14" id="Profile_Facebook"></h5>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="py-2">
                                                <div class="d-flex align-items-center">
                                                    <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                                        <i class="fab fa-instagram"></i>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted mb-1 font-size-13">Instagram</p>
                                                        <h5 class="mb-0 font-size-14" id="Profile_Instagram"></h5>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="py-2">
                                                <div class="d-flex align-items-center">
                                                    <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                                        <i class="fab fa-twitter"></i>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted mb-1 font-size-13">X</p>
                                                        <h5 class="mb-0 font-size-14" id="Profile_Twitter"></h5>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="py-2">
                                                <div class="d-flex align-items-center">
                                                    <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                                        <i class="fas fa-mobile-alt"></i>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted mb-1 font-size-13">No. Voip</p>
                                                        <h5 class="mb-0 font-size-14" id="Profile_Voip"></h5>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="navtabs2-channel" role="tabpanel">
                                <div>
                                    <div class="card">
                                        <div class="card-body">
                                            <div id="Div_CustomerChannel" class="row" style="height: 300px; overflow-x: auto;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="navtabs2-profile" role="tabpanel">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Nama Pelapor</label>
                                                <input type="text" class="form-control" id="Form_Ticket_Reported" placeholder="Nama Pelapor">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="text-end">
                                                <button type="button" class="btn btn-soft-primary w-sm" onclick="ActionSimpanPelapor()"><i class="fa fa-save"></i>&nbsp;Save</button>
                                            </div>
                                        </div>
                                        <br />
                                        <div class="row">
                                            <div id="Div_CustomerReported" class="search-results" style="width: 350px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header border-0">
                        <%--<div class="d-flex align-items-start">
                            <div class="flex-grow-1">
                                <h5 class="card-title">History Ticket</h5>
                            </div>
                            <div class="flex-shrink-0">
                                <div class="dropdown">
                                    <a class="font-size-16 text-muted dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="mdi mdi-dots-horizontal"></i>
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                        </div>--%>
                    </div>
                    <div class="pb-4">
                        <div class="chat-message-list widget-chat-list" data-simplebar>
                            <div class="px-4">
                                <ul class="list-unstyled chat-list" id="chat-list"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xxl-9 col-lg-8">
            <div class="card">
                <div class="card-body">
                    <div class="hori-timeline">
                        <!-- Swiper -->
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <!-- Slides will be dynamically added here -->
                            </div>
                            <!-- Navigation buttons -->
                            <div class="swiper-arrow d-flex gap-2 justify-content-end arrow-sm">
                                <div class="swiper-button-prev position-relative rounded-start"></div>
                                <div class="swiper-button-next position-relative rounded-end"></div>
                            </div>
                        </div>
                    </div>
                    <%--<div class="hori-timeline">
                        <div class="swiper-container slider swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0">
                                    <div class="swiper-arrow d-flex gap-2 justify-content-end arrow-sm">
                                        <div class="swiper-button-prev position-relative rounded-start swiper-button-disabled" tabindex="-1" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-6995dce3ce428459" aria-disabled="true"></div>
                                        <div class="swiper-button-next position-relative rounded-end" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-6995dce3ce428459" aria-disabled="false"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-wrapper" id="swiper-wrapper-6995dce3ce428459" aria-live="polite">
                                <div class="swiper-slide swiper-slide-active" style="width: 335.25px;" role="group" aria-label="1 / 6">
                                    <div class="event-list">
                                        <div class="p-2 bg-light">
                                            <div class="d-flex">
                                                <div class="avatar-sm align-self-center me-2">
                                                    <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                        <i class="far fa-envelope"></i>
                                                    </div>
                                                </div>
                                                <div class="overflow-hidden me-auto">
                                                    <p class="font-size-13 text-primary" style="margin-left: 60px; margin-top: 10px;">15 May 2024</p>
                                                </div>
                                                <div class="ms-2">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide swiper-slide-next" style="width: 335.25px;" role="group" aria-label="2 / 6">
                                    <div class="event-list">
                                        <div class="p-2 bg-light">
                                            <div class="d-flex">
                                                <div class="avatar-sm align-self-center me-2">
                                                    <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                        <i class="fab fa-viber"></i>
                                                    </div>
                                                </div>
                                                <div class="overflow-hidden me-auto">
                                                    <p class="font-size-13 text-primary" style="margin-left: 60px; margin-top: 10px;">17 May 2024</p>
                                                </div>
                                                <div class="ms-2">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide" style="width: 335.25px;" role="group" aria-label="3 / 6">
                                    <div class="event-list">
                                        <div class="p-2 bg-light">
                                            <div class="d-flex">
                                                <div class="avatar-sm align-self-center me-2">
                                                    <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                        <i class="fab fa-viber"></i>
                                                    </div>
                                                </div>
                                                <div class="overflow-hidden me-auto">
                                                    <p class="font-size-13 text-primary" style="margin-left: 60px; margin-top: 10px;">24 May 2024</p>
                                                </div>
                                                <div class="ms-2">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide" style="width: 335.25px;" role="group" aria-label="4 / 6">
                                    <div class="event-list">
                                        <div class="p-2 bg-light">
                                            <div class="d-flex">
                                                <div class="avatar-sm align-self-center me-2">
                                                    <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                        <i class="fab fa-whatsapp "></i>
                                                    </div>
                                                </div>
                                                <div class="overflow-hidden me-auto">
                                                    <p class="font-size-13 text-primary" style="margin-left: 60px; margin-top: 10px;">11 Juni 2024</p>
                                                </div>
                                                <div class="ms-2">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide" style="width: 335.25px;" role="group" aria-label="5 / 6">
                                    <div class="event-list">
                                        <div class="p-2 bg-light">
                                            <div class="d-flex">
                                                <div class="avatar-sm align-self-center me-2">
                                                    <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                        <i class="far fa-envelope"></i>
                                                    </div>
                                                </div>
                                                <div class="overflow-hidden me-auto">
                                                    <p class="font-size-13 text-primary" style="margin-left: 60px; margin-top: 10px;">19 Juni 2024</p>
                                                </div>
                                                <div class="ms-2">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide" style="width: 335.25px;" role="group" aria-label="6 / 6">
                                    <div class="event-list">
                                        <div class="p-2 bg-light">
                                            <div class="d-flex">
                                                <div class="avatar-sm align-self-center me-2">
                                                    <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                        <i class="far fa-envelope"></i>
                                                    </div>
                                                </div>
                                                <div class="overflow-hidden me-auto">
                                                    <p class="font-size-13 text-primary" style="margin-left: 60px; margin-top: 10px;">27 Juni 2024</p>
                                                </div>
                                                <div class="ms-2">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                        </div>
                    </div>--%>
                </div>
            </div>
            <div class="card" id="DivObjectCustomer">
                <div class="card-body">
                    <div id="FormNewPerusahaan">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Nama Perusahaan/Pemerintah <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="Perusahaan_Nama" placeholder="Nama">
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
                            <div class="col-md-12" style="display: none;">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Telepon</label>
                                    <input type="text" class="form-control" id="Perusahaan_Telepon" placeholder="Telepon">
                                </div>
                            </div>
                            <div class="col-md-4" style="display: none;">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Email</label>
                                    <input type="text" class="form-control" id="Perusahaan_Email" placeholder="Email">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mt-3">
                                <div class="text-end">
                                    <button type="button" class="btn btn-light w-sm" onclick="ActionCancelPerusahaan()" id="CancelCustomer">Cancel</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanPerusahaan()" id="SimpanPerusahaan">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="FormNewCustomer">
                        <div class="row" style="display: none;">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Nama</label>
                                    <input type="text" class="form-control" id="AddCustomer_NIK" placeholder="Nama" value="1">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Tipe <span class="text-danger">*</span></label>
                                    <select id="AddCustomer_Type" class="form-select" onchange="ComboTypePerusahaan('1')">
                                        <option value="">Select</option>
                                        <%--  <option value="1">Perusahaan</option>
                                        <option value="2">Perorangan</option>--%>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <%--<label for="addcontact-designation-input" class="form-label">Nama Perusahaan</label>&nbsp;&nbsp;<a href="#" class="btn btn-sm btn-soft-primary float-end" onclick="FormNewPerusahaan()" id="FormAddPerusahaan"><i class="fas fa-plus-circle"></i></a>
                                    <input type="text" class="form-control" id="AddCustomer_NamaPerusahaan" placeholder="Nama Perusahaan">--%>
                                    <%-- <label for="addcontact-designation-input" class="form-label">Nama Perusahaan</label>
                                    <div class="input-group">
                                        <a href="#" class="btn btn-sm btn-soft-primary" onclick="FormNewPerusahaan()" id="FormAddPerusahaan">
                                            <i class="fas fa-plus-circle"></i>
                                        </a>
                                        <input type="text" class="form-control" id="AddCustomer_NamaPerusahaan" placeholder="Nama Perusahaan">
                                    </div>--%>
                                    <label for="addcontact-designation-input" class="form-label">Nama Perusahaan</label>
                                    <div class="input-group">
                                        <div class="input-group-text" style="cursor: pointer;" onclick="FormNewPerusahaan()"><i class="fas fa-plus-circle"></i></div>
                                        <input type="text" class="form-control" id="AddCustomer_NamaPerusahaan" placeholder="Nama Perusahaan">
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
                                    <%--<label for="addcontact-designation-input" class="form-label">Nama</label><a href="#" class="btn btn-sm btn-soft-primary float-end" onclick="FormListPIC()" id="FormListPIC"><i class="fas fa-user-circle"></i></a>
                                    <input type="text" class="form-control" id="AddCustomer_Name" placeholder="Nama">--%>
                                    <label for="addcontact-designation-input" class="form-label">Nama/PIC <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <div class="input-group-text" onclick="FormListPIC()" style="cursor: pointer;"><i class="fas fa-user-circle"></i></div>
                                        <input type="text" class="form-control" id="AddCustomer_Name" placeholder="Nama">
                                    </div>
                                    <div id="Div_CustomerSearchingPIC" class="search-results" style="margin-left: 10px; margin-right: 10px; margin-top: -15px; width: 350px;"></div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Nomor Telepon <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="AddCustomer_HP" placeholder="Nomor Telepon">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Email</label>
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
                        <div class="row">
                            <div class="mt-3">
                                <div class="text-end">
                                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal" id="CloseCustomer">Close</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSubmitCustomer()" id="SubmitCustomer">Submit</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdateCustomer()" id="UpdateCustomer">Update</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanCustomer()" id="SimpanCustomer">Add</button>
                                </div>
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
                                <label for="contact-info-name" class="form-label">Agent Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" placeholder="Enter Name" id="Form_Ticket_Agent_Name">
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="contact-info-email-input" class="form-label">Priority <span class="text-danger">*</span></label>
                                <select id="Form_Ticket_Priority" class="form-select" required>
                                    <option value="Medium">Medium</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="contact-info-phone-input" class="form-label">Status <span class="text-danger">*</span></label>
                                <select id="Form_Ticket_Status" class="form-select">
                                    <option value="Open" selected="selected">Select</option>
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
                                <select id="Form_Ticket_Kategori" class="form-select" onchange="DropdownSubKategori(1);">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="workexperience-category-input">No.Aju/No.AWB</label><label class="float-end" id="errorNoAjo" style="color: red;"></label>
                                <input type="text" class="form-control" id="Form_Ticket_NoAju" placeholder="No.Aju/No.AWB">
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
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="mb-3">
                                <textarea id="Ticket_Complaints" name="Ticket_Complaints" class="form-control" rows="10" placeholder="Pertanyaan.."></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="mb-3">
                                <textarea id="Ticket_NoteAgent" name="Ticket_NoteAgent" class="form-control" rows="10" placeholder="Jawaban.."></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <input type="file" name="files" class="form-control">
                        </div>
                    </div>
                    <div class="mt-3">
                        <div id="TicketAttachment" style="width: 100%;"></div>
                    </div>
                    <div class="mt-3">
                        <div class="text-end">
                            <a class="btn btn-soft-warning w-sm" onclick="ActionConvertToCase()" id="ButtonConvertToCase"><i class="fa fa-save"></i>&nbsp;Convert To Case</a>
                            <a class="btn btn-soft-primary w-sm" onclick="ActionCreateTicketClose()" id="ButtonSaveAndClose"><i class="fa fa-save"></i>&nbsp;Save & Closed</a>
                        </div>
                    </div>
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
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modalnewcustomer" data-bs-backdrop="static"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalCustomer">Form Customer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-list-transaction-ticket"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="transaction-ticket">Data Transaction Ticket</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <table id="ListTransactionTicket" class="table align-middle table-nowrap table-check" style="width: 100%;" data-page-size="5">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;">Action</th>
                                            <th style="width: 150px;">Date</th>
                                            <th style="width: 150px;">Ticket Number</th>
                                            <th style="width: 150px;">Kategori</th>
                                            <th style="width: 150px;">Created By</th>
                                            <th style="width: 70px;">Status</th>
                                            <th style="width: 70px;">SLA</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <%--<button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>--%>
                    <%--<h4>Do you want to add ticket?</h4>--%>
                    <div class="flex-grow-1">
                        <button type="button" id="Ticket_AddTransaction" class="btn btn-rounded btn-danger btn-outline full-left" onclick="PublishTransaction()">
                            <i class="fa fa-times-circle"></i>&nbsp;Selesai
                        </button>
                    </div>
                    <button type="button" id="Ticket_PublishTransaction" class="btn btn-rounded btn-success btn-outline float-right" onclick="AddTransaction()">
                        <i class="fa fa-check-circle"></i>&nbsp;Add Ticket
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="FormKantor" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalKantor">Form Kantor</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Nama</label>
                            <input type="text" class="form-control" id="Kantor_Nama" placeholder="Nama">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Email</label>
                            <input type="text" class="form-control" id="Kantor_Email" placeholder="Email">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Telepon</label>
                            <input type="text" class="form-control" id="Kantor_Telepon" placeholder="Telepon">
                        </div>
                        <div class="mb-3">
                            <%--<label for="addcontact-name-input" class="form-label">Telepon</label>--%>
                            <%--                            <textarea class="form-control" id="Kantor_Alamat" name="Kantor_Alamat" placeholder="Alamat" row="8"/>--%>
                            <textarea id="Kantor_Alamat" name="Kantor_Alamat" class="form-control" rows="10" placeholder="Alamat.."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanKantor()" id="SimpanKantor">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-conver-case" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalConvert">Data Perusahaan</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Nama Perusahaan</label>
                            <%--<input type="text" class="form-control" id="Ticket_Nama_Perusahaan" placeholder="Nama Perusahaan">--%>
                            <div class="input-group">
                                <div class="input-group-text" style="cursor: pointer;" onclick="TambahTicketPerusahaan()"><i class="fas fa-plus-circle"></i></div>
                                <input type="text" class="form-control" id="Ticket_Nama_Perusahaan" placeholder="Nama Perusahaan">
                                <div id="Div_NamaPerusahaan" class="search-results" style="margin-left: 40px; margin-right: -30px; margin-top: -5px; width: 710px;"></div>
                            </div>
                        </div>
                        <%--                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Email</label>
                            <input type="text" class="form-control" id="Ticket_Email_Perusahaan" placeholder="Email">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Telepon</label>
                            <input type="text" class="form-control" id="Ticket_Telepon_Perusahaan" placeholder="Telepon">
                        </div>--%>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">NPWP</label>
                            <input type="text" class="form-control" id="Ticket_NPWP_Perusahaan" placeholder="NPWP">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanTicketPerusahaan()" id="AddTicketPerusahaan" style="display: none;">Add</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionCreateTicketEskalasi()" id="SubmitConvertToCase">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script src="assets/libs/swiper/swiper-bundle.min.js"></script>
    <script src="assets/js/pages/timeline.init.js"></script>
</asp:Content>
