<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_MailSystem_Ready.aspx.vb" Inherits="UIDESK.Crm_Trx_MailSystem_Ready" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_MailSystem.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <asp:HiddenField ID="TrxEmailID" runat="server" />
    <asp:HiddenField ID="TrxGenerateEmailID" runat="server" />
    <asp:HiddenField ID="Hd_StartDate" runat="server" />
    <asp:HiddenField ID="Hd_FinishDate" runat="server" />
    <asp:HiddenField ID="DraftID" runat="server" />
    <asp:HiddenField ID="HDSignature" runat="server" />
    <div class="container-fluid">
        <%--  <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                    <h4 class="mb-0">Inbox</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Email</a></li>
                            <li class="breadcrumb-item active">Inbox</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>--%>
        <!-- end page title -->
        <div class="row">
            <div class="col-12">
                <!-- Left sidebar -->
                <div class="email-leftbar card">
                    <button type="button" class="btn btn-danger w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#composemodal" onclick="Compose_Add()">
                        Compose                                   
                    </button>
                    <div class="mail-list mt-4">
                        <a href="javascript:void(0)" class="active" onclick="TrmInboxEmail()" id="InboxClass"><i class="bx bxs-inbox font-size-16 align-middle me-2"></i>Inbox <span class="ms-1 float-end">
                            <p id="InboxCount" style="text-align: center;"></p>
                        </span></a>
                        <%--<a href="#"><i class="bx bx-star font-size-16 align-middle me-2"></i>Starred</a>--%>
                        <a href="javascript:void(0)"><i class="bx bxs-bookmark font-size-16 align-middle me-2"></i>Closed</a>
                        <a href="javascript:void(0)" onclick="TrmDraftEmail()"><i class="bx bx-file font-size-16 align-middle me-2"></i>Draft<span class="ms-1 float-end"><p id="DraftCount" style="text-align: center;"></p>
                        </span></a>
                        <a href="javascript:void(0)" onclick="TrmSendingEmail()"><i class="bx bx-mail-send font-size-16 align-middle me-2"></i>Sent Mail</a>
                        <a href="javascript:void(0)" onclick="TrmSpamEmail()"><i class="bx bx-trash font-size-16 align-middle me-2"></i>Spam <span class="ms-1 float-end">
                            <p id="SpamCount" style="text-align: center;"></p>
                        </span></a>
                        <a href="javascript:void(0)" onclick="TrmArchiveEmail()"><i class="bx bx-archive font-size-16 align-middle me-2"></i>Archive</a>
                    </div>
                    <h6 class="mt-4">List Data Agent</h6>
                    <div class="mail-list mt-1" id="divLisAgent">
                        <%--<a href="#"><span class="mdi mdi-circle-outline text-info me-2"></span>Theme Support</a>
                        <a href="#"><span class="mdi mdi-circle-outline text-warning me-2"></span>Freelance</a>
                        <a href="#"><span class="mdi mdi-circle-outline text-primary me-2"></span>Social</a>
                        <a href="#"><span class="mdi mdi-circle-outline text-danger me-2"></span>Friends</a>
                        <a href="#"><span class="mdi mdi-circle-outline text-success me-2"></span>Family</a>--%>
                    </div>
                </div>
                <!-- End Left sidebar -->
                <!-- Right Sidebar -->
                <div class="email-rightbar mb-3">
                    <div class="card">
                        <div class="card-body" id="FormBodyEmail">
                            <div>
                                <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Filter()">Filter Date</a>
                            </div>
                            <br />
                            <div id="DivTrmInboxEmail">
                                <table id="TrmInboxEmail" class="table table-hover" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="width: 150px;">Email Service</th>
                                            <th style="width: 150px;">From</th>
                                            <th>Subject</th>
                                            <th style="width: 150px;">Status</th>
                                            <th style="width: 150px;">Date Create</th>
                                            <th style="width: 50px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div id="DivTrmSpamEmail" style="display: none;">
                                <table id="TrmSpamEmail" class="table align-middle table-nowrap table-check" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="width: 150px;">Email Service</th>
                                            <th style="width: 150px;">From</th>
                                            <th>Subject</th>
                                            <th style="width: 150px;">Date Create</th>
                                            <th style="width: 50px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div id="DivTrmSendingEmail" style="display: none;">
                                <table id="TrmSendingEmail" class="table align-middle table-nowrap table-check" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="width: 150px;">Email Service</th>
                                            <th style="width: 150px;">To</th>
                                            <th>Subject</th>
                                            <th style="width: 200px;">Date Create</th>
                                            <th style="width: 50px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div id="DivTrmDraftEmail" style="display: none;">
                                <table id="TrmDraftEmail" class="table align-middle table-nowrap table-check" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="width: 150px;">Email Service</th>
                                            <th style="width: 150px;">To</th>
                                            <th>Subject</th>
                                            <th style="width: 150px;">Date Create</th>
                                            <th style="width: 50px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div id="DivTrmArchiveEmail" style="display: none;">
                                <table id="TrmArchiveEmail" class="table align-middle table-nowrap table-check" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="width: 150px;">Email Service</th>
                                            <th style="width: 150px;">From</th>
                                            <th>Subject</th>
                                            <th style="width: 150px;">Date Create</th>
                                            <th style="width: 50px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="card-body" id="FormReadingEmail">
                        </div>
                    </div>
                    <!-- card -->
                    <%--                    <div class="row">
                        <div class="col-7">
                            Showing 1 - 20 of 1,524                                       
                        </div>
                        <div class="col-5">
                            <div class="btn-group float-end">
                                <button type="button" class="btn btn-sm btn-success"><i class="fa fa-chevron-left"></i></button>
                                <button type="button" class="btn btn-sm btn-success"><i class="fa fa-chevron-right"></i></button>
                            </div>
                        </div>
                    </div>--%>

                    <div class="card">
                        <div class="card-body">
                             <div id="FormCustomer">
                        <div id="FormNewPerusahaan">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Nama</label>
                                        <input type="text" class="form-control" id="Perusahaan_Nama" placeholder="Nama">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Telepon</label>
                                        <input type="text" class="form-control" id="Perusahaan_Telepon" placeholder="Telepon">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">NPWP</label>
                                        <input type="text" class="form-control" id="Perusahaan_NPWP" placeholder="NPWP">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Email</label>
                                        <input type="text" class="form-control" id="Perusahaan_Email" placeholder="Email">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="FormNewCustomer">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Nama</label>
                                        <input type="text" class="form-control" id="AddCustomer_Name" placeholder="Nama">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Tipe</label>
                                        <select id="AddCustomer_Type" class="form-select" onchange="ComboTypePerusahaan('1')">
                                            <option value="">Select</option>
                                            <option value="1">Perusahaan</option>
                                            <option value="2">Perorangan</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Nama Perusahaan</label><a href="#" class="btn btn-sm btn-soft-primary float-end" onclick="FormListPIC()" id="FormListPIC"><i class="fas fa-user-circle"></i></a>&nbsp;&nbsp;<a href="#" class="btn btn-sm btn-soft-primary float-end" onclick="FormNewPerusahaan()" id="FormAddPerusahaan"><i class="fas fa-plus-circle"></i></a>
                                        <input type="text" class="form-control" id="AddCustomer_NamaPerusahaan" placeholder="Nama Perusahaan">
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
                                        <label for="addcontact-designation-input" class="form-label">NIK</label>
                                        <input type="text" class="form-control" id="AddCustomer_NIK" placeholder="NIK">
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
                        </div>
                    </div>
                        </div>
                    </div>
                   
                    <div class="row" id="DivObjectReadEmail">
                        <!-- start page title -->
                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 class="mb-0">Read Email</h4>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Email</a></li>
                                            <li class="breadcrumb-item active">Read Email</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- end page title -->

                        <div class="row">
                            <div class="col-12">
                                <!-- Left sidebar -->
                                <div class="email-leftbar card">
                                    <button type="button" class="btn btn-danger w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#composemodal">
                                        Compose
                                   
                                    </button>
                                    <div class="mail-list mt-4">
                                        <a href="#" class="active"><i class="bx bxs-inbox font-size-16 align-middle me-2"></i>Inbox <span class="ms-1 float-end">(18)</span></a>
                                        <a href="#"><i class="bx bx-star font-size-16 align-middle me-2"></i>Starred</a>
                                        <a href="#"><i class="bx bxs-bookmark font-size-16 align-middle me-2"></i>Important</a>
                                        <a href="#"><i class="bx bx-file font-size-16 align-middle me-2"></i>Draft</a>
                                        <a href="#"><i class="bx bx-mail-send font-size-16 align-middle me-2"></i>Sent Mail</a>
                                        <a href="#"><i class="bx bx-trash font-size-16 align-middle me-2"></i>Trash</a>
                                    </div>

                                    <h6 class="mt-4">Labels</h6>

                                    <div class="mail-list mt-1">
                                        <a href="#"><span class="mdi mdi-circle-outline text-info me-2"></span>Theme Support</a>
                                        <a href="#"><span class="mdi mdi-circle-outline text-warning me-2"></span>Freelance</a>
                                        <a href="#"><span class="mdi mdi-circle-outline text-primary me-2"></span>Social</a>
                                        <a href="#"><span class="mdi mdi-circle-outline text-danger me-2"></span>Friends</a>
                                        <a href="#"><span class="mdi mdi-circle-outline text-success me-2"></span>Family</a>
                                    </div>

                                </div>
                                <!-- End Left sidebar -->
                                <!-- Right Sidebar -->
                                <div class="email-rightbar mb-3">

                                    <div class="card">
                                        <div class="btn-toolbar p-3" role="toolbar">
                                            <div class="btn-group me-2 mb-2 mb-sm-0">
                                                <button type="button" class="btn btn-primary"><i class="fa fa-inbox"></i></button>
                                                <button type="button" class="btn btn-primary"><i class="fa fa-exclamation-circle"></i></button>
                                                <button type="button" class="btn btn-primary"><i class="far fa-trash-alt"></i></button>
                                            </div>
                                            <div class="btn-group me-2 mb-2 mb-sm-0">
                                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa fa-folder"></i><i class="mdi mdi-chevron-down ms-1"></i>
                                                </button>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" href="#">Updates</a>
                                                    <a class="dropdown-item" href="#">Social</a>
                                                    <a class="dropdown-item" href="#">Team Manage</a>
                                                </div>
                                            </div>
                                            <div class="btn-group me-2 mb-2 mb-sm-0">
                                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa fa-tag"></i><i class="mdi mdi-chevron-down ms-1"></i>
                                                </button>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" href="#">Updates</a>
                                                    <a class="dropdown-item" href="#">Social</a>
                                                    <a class="dropdown-item" href="#">Team Manage</a>
                                                </div>
                                            </div>

                                            <div class="btn-group me-2 mb-2 mb-sm-0">
                                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    More <i class="mdi mdi-dots-vertical ms-2"></i>
                                                </button>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" href="#">Mark as Unread</a>
                                                    <a class="dropdown-item" href="#">Mark as Important</a>
                                                    <a class="dropdown-item" href="#">Add to Tasks</a>
                                                    <a class="dropdown-item" href="#">Add Star</a>
                                                    <a class="dropdown-item" href="#">Mute</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card-body">
                                            <div class="d-flex align-items-start mb-4">
                                                <div class="flex-shrink-0 me-3">
                                                    <img class="rounded-circle avatar-sm" src="assets/images/users/avatar-2.jpg" alt="Generic placeholder image">
                                                </div>

                                                <div class="flex-grow-1">
                                                    <h5 class="font-size-14 my-1">Humberto D. Champion</h5>
                                                    <small class="text-muted">support@domain.com</small>
                                                </div>
                                            </div>

                                            <h4 class="mt-0 mb-4 font-size-16">Your Storage is lonely. Add some files!</h4>

                                            <p class="text-muted">Dear User,</p>
                                            <p class="text-muted">Once your files are in Storage, they’ll be waiting for you anywhere you install the app—like your computer, phone, or tablet. Your files will also be securely backed up and easy to share, no matter what type of files they are.</p>
                                            <p class="text-muted">An unrecognized device or browser recently signed into your Storage account. Help us keep your account secure by letting us know if this was you:</p>
                                            <p class="text-muted mb-0">Sincerly,</p>
                                            <p class="text-muted">Pichforest</p>
                                            <hr />

                                            <div class="row">
                                                <div class="col-xl-2 col-6">
                                                    <div class="card border shadow-none">
                                                        <img class="card-img-top img-fluid" src="assets/images/small/img-3.jpg" alt="Card image cap">
                                                        <div class="py-2 text-center">
                                                            <a href="#!" class="fw-semibold font-size-13 text-reset">Download <i class="bx bxs-download align-middle"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-2 col-6">
                                                    <div class="card border shadow-none">
                                                        <img class="card-img-top img-fluid" src="assets/images/small/img-4.jpg" alt="Card image cap">
                                                        <div class="py-2 text-center">
                                                            <a href="#!" class="fw-semibold font-size-13 text-reset">Download <i class="bx bxs-download align-middle"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <a href="#" class="btn btn-light mt-4"><i class="mdi mdi-reply"></i>Reply</a>

                                        </div>

                                    </div>
                                    <!-- end card -->
                                </div>
                                <!-- End email-rightbar -->

                            </div>
                            <!-- end Col-9 -->

                        </div>
                        <!-- end row -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" id="modal-compose" tabindex="-1" role="dialog" aria-labelledby="composemodalTitle" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="composemodalTitle">New Message</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body" style="overflow-y: scroll; overflow-x: hidden; height: 650px;">
                    <div class="mb-3">
                        <select id="ComboFrom" class="form-select" onchange="ChangeComboSignature('1')">
                            <option value="">From</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <select id="FormatTypeCompose" class="form-select" onchange="OnchangeFormatTypeCompose('1')">
                            <option value="">Response</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <%--<input type="email" class="form-control" id="customerinfo-email-input">--%>
                        <div class="controls">
                            <input type="email" class="form-control" placeholder="To" id="ComposeETO" name="ComposeETO" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="controls">
                            <input type="text" class="form-control" placeholder="CC" id="ComposeECC" name="ComposeECC" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                        </div>
                    </div>
                    <div class="mb-3">
                        <input class="form-control" placeholder="Subject" type="text" id="ComposeESUBJECT" name="ComposeESUBJECT()">
                    </div>
                    <div class="mb-3">
                        <textarea id="Compose_Body" name="Compose_Body" class="form-control" rows="12"></textarea>
                    </div>
                    <div class="mb-3" id="FileUploadCompose">
                        <input type="file" name="files" class="form-control">
                    </div>
                    <div class="mb-3" id="FileUploadDraft" style="display: none;">
                        <input type="file" name="filesdraft" class="form-control">
                    </div>
                    <div class="mt-4">
                        <div id="Div_Compose_Attachment" style="width: 100%;"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <div class="btn-group me-2 mb-2 mb-sm-0">
                        <button type="button" class="btn btn-primary dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
                            Action <i class="mdi mdi-dots-vertical ms-2"></i>
                        </button>
                        <div class="dropdown-menu" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 40px, 0px);" data-popper-placement="bottom-start">
                            <a class="dropdown-item" href="#" onclick="Compose_ActionButton()" id="ComposeActionButton">Send</a>
                            <a class="dropdown-item" href="#" onclick="DraftSend_ActionButton()" id="DraftSendActionButton">Send</a>
                            <a class="dropdown-item" href="#" onclick="DraftEvent()" id="DraftActionButton">Draft</a>
                            <a class="dropdown-item" href="#" onclick="CloseEvent()">Close</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" id="modal-reply" tabindex="-1" role="dialog" aria-labelledby="composemodalTitle" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="replymodalTitle">Reply Message</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body" style="overflow-y: scroll; overflow-x: hidden; height: 650px;">
                    <div class="mb-3">
                        <input class="form-control" placeholder="Email Service" id="ReplyEmailService" name="ReplyEmailService">
                    </div>
                    <div class="mb-3">
                        <select id="FormatTypeReply" class="form-select" onchange="OnchangeFormatTypeReply('1')">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <div class="controls">
                            <input class="form-control" placeholder="To" id="ReplyTo" name="ReplyTo" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="controls">
                            <input class="form-control" placeholder="CC" type="text" id="ReplyECC" name="ReplyECC" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                        </div>
                    </div>
                    <div class="mb-3">
                        <input class="form-control" placeholder="Subject" id="ReplySubject" name="ReplySubject">
                    </div>
                    <div class="mb-3">
                        <textarea id="Reply_BodyEmail" name="Reply_BodyEmail" class="form-control" rows="12"></textarea>
                    </div>
                    <div class="mb-3">
                        <input type="file" name="attachmentreply" class="form-control">
                    </div>
                    <div class="mb-3">
                        <div id="Div_Reply_Attachment" style="width: 100%;"></div>
                    </div>
                    <hr />
                    <h5 class="modal-title" id="ReadmodalTitle" style="text-align: right;">Read Message</h5>
                    <hr />
                    <iframe id="Reply_FrameHTML" title="description" style="width: 100%; height: 300px;"></iframe>
                    <div class="mb-3">
                        <div id="Div_Inbox_Attachment" style="width: 100%;"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="ReplyEvent()">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="Reply_ActionButton()" id="ActionReply">Send</button>
                    <%--   <div class="pull-right">
                    <a href="#" class="btn btn-rounded btn-primary btn-outline pull-right" onclick="Reply_ActionButton();" id="ActionReply"><i class="fa fa-send"></i>&nbsp;Send</a>
                </div>--%>
                </div>
            </div>

        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" id="modal-forward" tabindex="-1" role="dialog" aria-labelledby="composemodalTitle" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="forwardmodalTitle">Forward Message</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body" style="overflow-y: scroll; overflow-x: hidden; height: 650px;">
                    <div class="mb-3">
                        <select id="ForwardComboFrom" class="form-select" onchange="ChangeComboSignature('3')">
                            <option value="">Select</option>
                        </select>
                        <asp:HiddenField ID="HdForward_From" runat="server" />
                    </div>
                    <div class="mb-3">
                        <select id="FormatTypeForward" class="form-select" onchange="OnchangeFormatTypeForward('3')">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <div class="controls">
                            <input class="form-control" placeholder="To" id="ForwardTo" name="ForwardTo" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="controls">
                            <input class="form-control" placeholder="CC" type="text" id="ForwardECC" name="ForwardECC" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                        </div>
                    </div>
                    <div class="mb-3">
                        <input class="form-control" placeholder="Subject" id="ForwardSubject" name="ForwardSubject">
                    </div>
                    <div class="mb-3">
                        <textarea id="Forward_BodyEmail" name="Forward_BodyEmail" class="form-control" rows="12"></textarea>
                    </div>
                    <div class="mb-3">
                        <input type="file" name="attachmentforward" class="form-control">
                    </div>
                    <div class="mb-3">
                        <div id="Div_ForwardAttachment" style="width: 100%;"></div>
                    </div>
                    <hr />
                    <h5 class="modal-title" id="ForwardmodalTitle" style="text-align: right;">Read Message</h5>
                    <hr />
                    <iframe id="Forward_FrameHTML" title="description" style="width: 100%; height: 300px;"></iframe>
                    <div class="mb-3">
                        <div id="Div_Inbox_Forward_Attachment" style="width: 100%;"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="ForwardEvent()">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="Forward_ActionButton()" id="ActionForward">Send</button>
                    <%--   <div class="pull-right">
                    <a href="#" class="btn btn-rounded btn-primary btn-outline pull-right" onclick="Reply_ActionButton();" id="ActionReply"><i class="fa fa-send"></i>&nbsp;Send</a>
                </div>--%>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" id="modal-preview" tabindex="-1" role="dialog" aria-labelledby="composemodalTitle" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="previewmodalTitle">Read Message</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="overflow-y: scroll; overflow-x: hidden;">
                    <div class="mb-3">
                        <iframe id="Preview_FrameHTML" title="description" style="width: 100%; height: 450px;"></iframe>
                        <hr />
                        <div id="Div_PreviewAttachment" style="width: 100%;"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <%--<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="ForwardEvent()">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="Forward_ActionButton()" id="ActionForward">Send</button>--%>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" id="modal-conversation" tabindex="-1" role="dialog" aria-labelledby="composemodalTitle" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ConversationmodalTitle">Conversation Message</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="overflow-y: scroll; overflow-x: hidden; height: 700px;">
                    <%-- <div class="verti-timeline left-timeline">
                        <div class="timeline-item left">
                                <div class="timeline-block">
                                    <div class="time-show-btn mt-0">
                                        <a href="#" class="btn btn-danger btn-rounded w-lg">2021</a>
                                    </div>
                                </div>
                           </div>
                        <div class="timeline-item">
                            <div class="timeline-block">
                                <div class="timeline-box card">
                                    <div class="card-body">
                                        <div class="timeline-date">28 April</div>
                                        <h5 class="mt-3 font-size-16">Timeline Event One</h5>
                                        <div class="text-muted">
                                            <p class="mb-0">
                                                It will be as simple as occidental in fact. To an english person, it will seem like simplified English, as a skeptical friend
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>--%>
                    <div id="Journeymailconversation" class="verti-timeline left-timeline"></div>
                    <%--<div id="Journeymailconversation1" class="verti-timeline left-timeline"></div>--%>
                </div>
                <div class="modal-footer">
                    <%--<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="ForwardEvent()">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="Forward_ActionButton()" id="ActionForward">Send</button>--%>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModalFilterDate" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Filter Date</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Start Date</label>
                            <input type="date" class="form-control" id="startdate" placeholder="startdate" required>
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">End Date</label>
                            <input type="date" class="form-control" id="enddate" placeholder="enddate" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionFilterDate()" id="Update">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModalTicket" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelTicket">Form Ticket</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Subject</label>
                            <input type="text" class="form-control" id="Ticket_Subject" placeholder="Subject">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Kategori</label>
                            <select id="Ticket_Kategori" class="form-select">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">No. Aju</label>
                            <input type="text" class="form-control" id="Ticket_NoAju" placeholder="No. Aju">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Kantor</label>
                            <input type="text" class="form-control" id="Ticket_Kantor" placeholder="Kantor">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Sub Kategori</label>
                            <select id="Ticket_SubKategori" class="form-select">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Nilai Transaksi</label>
                            <input type="text" class="form-control" id="Ticket_NilaiTransaksi" placeholder="Nilai Transaksi">
                        </div>
                        <div class="mb-3">
                            <textarea id="Ticket_NoteAgent" name="Ticket_NoteAgent" class="form-control" rows="8" placeholder="Jawaban.."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionCreateTicket()" id="ActionCreateTicket">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/pages/validation.js"></script>
    <script src="js/pages/form-validation.js"></script>
    <%--<script src="../assets/vendor_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.js"></script>--%>
    <script src="js/ckeditor/ckeditor.js"></script>
    <%-- <script>
        CKEDITOR.replace('Compose_Body');
        CKEDITOR.replace('Reply_BodyEmail');
        CKEDITOR.replace('Forward_BodyEmail');
        CKEDITOR.config.height = 250;
        CKEDITOR.config.toolbar = 'Full';
        CKEDITOR.config.toolbar_Full =
            [
                //{ name: 'snddocument', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates'] },
                //{ name: 'clipboard', items: ['Undo', 'Redo'] },
                //{ name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },
                {
                    name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
                        'HiddenField']
                },
                '/',
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                {
                    name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv',
                        '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
                },
                { name: 'links', items: ['Link', 'Unlink'] },
                { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'PageBreak', 'Iframe'] },
                '/',
                { name: 'styles', items: ['Styles', 'Format', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] },
                { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
            ];
    </script>--%>
</asp:Content>
