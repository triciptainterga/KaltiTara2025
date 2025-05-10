<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Customer_Detail.aspx.vb" Inherits="UIDESK.Crm_Trm_Customer_Detail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Customer_Detail.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>

    <!-- swiper css -->
    <link rel="stylesheet" href="assets/libs/swiper/swiper-bundle.min.css">

    <!-- Bootstrap Css -->
    <link href="assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
    <!-- Icons Css -->
    <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <!-- App Css-->
    <link href="assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />

    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxTicketNumber" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Detail Data Customer</h4>
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
                                <i class="uil uil-ellipsis-h"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="avatar-xl mx-auto mb-4">
                        <img src="assets/images/users/avatar-1.jpg" alt="" class="rounded-circle img-thumbnail">
                    </div>
                    <h5 class="mb-1" id="ProfileDetail_NamaCustomer"></h5>
                    <p class="text-muted" style="cursor: pointer;" id="ProfileDetail_NamaPerusahaan"></p>
                </div>
            </div>
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-body">
                        <ul class="list-unstyled mb-0" style="margin-left: -10px;">
                            <li class="pb-2">
                                <div class="d-flex align-items-center">
                                    <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                        <i class="uil uil-globe"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <p class="text-muted mb-1 font-size-13">No. Telepon</p>
                                        <h5 class="mb-0 font-size-14" id="ProfileDetail_NomorTelepon"></h5>
                                    </div>
                                </div>
                            </li>
                            <li class="py-2">
                                <div class="d-flex align-items-center">
                                    <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                        <i class="uil uil-envelope-alt"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <p class="text-muted mb-1 font-size-13">Email</p>
                                        <h5 class="mb-0 font-size-14" id="ProfileDetail_Email"></h5>
                                    </div>
                                </div>
                            </li>
                            <li class="py-2">
                                <div class="d-flex align-items-center">
                                    <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                        <i class="uil uil-map-marker"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <p class="text-muted mb-1 font-size-13">Facebook</p>
                                        <h5 class="mb-0 font-size-14" id="ProfileDetail_Facebook"></h5>
                                    </div>
                                </div>
                            </li>
                            <li class="py-2">
                                <div class="d-flex align-items-center">
                                    <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                        <i class="uil uil-map-marker"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <p class="text-muted mb-1 font-size-13">Instagram</p>
                                        <h5 class="mb-0 font-size-14" id="ProfileDetail_Instagram"></h5>
                                    </div>
                                </div>
                            </li>
                            <li class="py-2">
                                <div class="d-flex align-items-center">
                                    <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                        <i class="uil uil-map-marker"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <p class="text-muted mb-1 font-size-13">X</p>
                                        <h5 class="mb-0 font-size-14" id="ProfileDetail_Twitter"></h5>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <%--<div class="card">
                    <div class="card-header border-0">
                    </div>
                    <div class="pb-4">
                        <div class="chat-message-list widget-chat-list" data-simplebar>
                            <div class="px-4">
                                <ul class="list-unstyled chat-list">
                                    <li class="active">
                                        <a href="#" class="mt-0">
                                            <div class="d-flex align-items-start">
                                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                    <div class="avatar-sm align-self-center">
                                                        <span class="avatar-title rounded-circle bg-primary text-primary"></span>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 overflow-hidden">
                                                    <h5 class="text-truncate font-size-14 mb-1">20211216022013759</h5>
                                                    <p class="text-truncate mb-0">Open</p>
                                                </div>
                                                <div class="flex-shrink-0">
                                                    <div class="font-size-11">11 April 2024</div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="active">
                                        <a href="#" class="mt-0">
                                            <div class="d-flex align-items-start">
                                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                    <div class="avatar-sm align-self-center">
                                                        <span class="avatar-title rounded-circle bg-warning text-warning"></span>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 overflow-hidden">
                                                    <h5 class="text-truncate font-size-14 mb-1">20211216022310034</h5>
                                                    <p class="text-truncate mb-0">Pending</p>
                                                </div>
                                                <div class="flex-shrink-0">
                                                    <div class="font-size-11">23 April 2024</div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="active">
                                        <a href="#" class="mt-0">
                                            <div class="d-flex align-items-start">
                                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                    <div class="avatar-sm align-self-center">
                                                        <span class="avatar-title rounded-circle bg-danger text-danger"></span>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 overflow-hidden">
                                                    <h5 class="text-truncate font-size-14 mb-1">20211216022620814</h5>
                                                    <p class="text-truncate mb-0">Closed</p>
                                                </div>
                                                <div class="flex-shrink-0">
                                                    <div class="font-size-11">17 Juni 2024</div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="active">
                                        <a href="#" class="mt-0">
                                            <div class="d-flex align-items-start">
                                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                    <div class="avatar-sm align-self-center">
                                                        <span class="avatar-title rounded-circle bg-success text-success"></span>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 overflow-hidden">
                                                    <h5 class="text-truncate font-size-14 mb-1">20211216024342145</h5>
                                                    <p class="text-truncate mb-0">Solved</p>
                                                </div>
                                                <div class="flex-shrink-0">
                                                    <div class="font-size-11">29 Juni 2024</div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="active">
                                        <a href="#" class="mt-0">
                                            <div class="d-flex align-items-start">
                                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                    <div class="avatar-sm align-self-center">
                                                        <span class="avatar-title rounded-circle bg-success text-success"></span>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 overflow-hidden">
                                                    <h5 class="text-truncate font-size-14 mb-1">20211216024400125</h5>
                                                    <p class="text-truncate mb-0">Solved</p>
                                                </div>
                                                <div class="flex-shrink-0">
                                                    <div class="font-size-11">9 Maret 2024</div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="active">
                                        <a href="#" class="mt-0">
                                            <div class="d-flex align-items-start">
                                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                    <div class="avatar-sm align-self-center">
                                                        <span class="avatar-title rounded-circle bg-primary text-primary"></span>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 overflow-hidden">
                                                    <h5 class="text-truncate font-size-14 mb-1">20211216024926947</h5>
                                                    <p class="text-truncate mb-0">Open</p>
                                                </div>
                                                <div class="flex-shrink-0">
                                                    <div class="font-size-11">16 April 2024</div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="active">
                                        <a href="#" class="mt-0">
                                            <div class="d-flex align-items-start">
                                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                    <div class="avatar-sm align-self-center">
                                                        <span class="avatar-title rounded-circle bg-primary text-primary"></span>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 overflow-hidden">
                                                    <h5 class="text-truncate font-size-14 mb-1">20211216031811993</h5>
                                                    <p class="text-truncate mb-0">Open</p>
                                                </div>
                                                <div class="flex-shrink-0">
                                                    <div class="font-size-11">21 May 2024</div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>--%>
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
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table mb-0" id="DataTableHistory">
                            <thead class="table-light">
                                <tr>
                                    <th style="width:30px;">#</th>
                                    <th style="width:250px;">Channel</th>
                                    <th style="width:250px;">Ticket Number</th>
                                    <th style="width:250px;">Priority</th>
                                    <th style="width:250px;">Agent</th>
                                    <th style="width:250px;">Status</th>
                                </tr>
                            </thead>
                        </table>
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
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modalcustomer"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalCustomer">Form Customer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="AddCustomer_Name" placeholder="Name">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Gender</label>
                                    <select id="AddCustomer_ComboGender" class="form-select">
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Birth</label>
                                    <input type="date" class="form-control" id="AddCustomer_Birth" placeholder="Birth">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">NIK</label>
                                    <input type="text" class="form-control" id="AddCustomer_NIK" placeholder="NIK">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Mobile Phone</label>
                                    <input type="text" class="form-control" id="AddCustomer_HP" placeholder="Mobile Phone">
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
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Address</label>
                                    <textarea class="form-control" placeholder="Address" id="AddCustomer_Alamat" name="AddCustomer_Alamat" style="height: 300px;"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdateCustomer()" id="UpdateCustomer">Update</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanCustomer()" id="SimpanCustomer">Add</button>
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
    <!-- en card -->
    <script src="js/ckeditor/ckeditor.js"></script>
    <!-- swiper js -->
    <script src="assets/libs/swiper/swiper-bundle.min.js"></script>
    <!-- timeline init -->
    <script src="assets/js/pages/timeline.init.js"></script>
</asp:Content>
