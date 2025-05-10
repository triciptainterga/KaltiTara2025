<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_MailSystem.aspx.vb" Inherits="UIDESK.Crm_Trx_MailSystem" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <link href="assets/libs/choices.js/public/assets/styles/choices.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/libs/flatpickr/flatpickr.min.css" rel="stylesheet">

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
        media-single {
            display: flex;
            align-items: center; /* Center items vertically */
            justify-content: space-between; /* Space between name/email and button */
            background-color: #f8f9fa; /* Light background color */
            border: 1px solid #ddd; /* Border for separation */
            padding: 10px; /* Padding inside the result item */
            border-radius: 0.25rem; /* Rounded corners */
            margin-bottom: 10px; /* Space between result items */
        }

        .media-body {
            flex-grow: 1; /* Makes the media body take available space */
        }

        .media-right {
            margin-left: 10px; /* Space between text and button */
        }

        .btn-sm {
            font-size: 0.875rem; /* Smaller font size for button */
            padding: 0.25rem 0.5rem; /* Adjust padding */
        }

        .text-fader {
            color: #6c757d; /* Faded text color */
        }
    </style>
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
    <asp:HiddenField ID="CustomerID" runat="server" />
    <asp:HiddenField ID="TrxCustomerID" runat="server" />

        <div class="row">
            <div class="col-12">
                <!-- Left sidebar -->
                <div class="email-leftbar card">
                <%--<div class="email-leftbar card" id="emailMenu">--%>
                    <button type="button" class="btn btn-danger w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#composemodal" onclick="Compose_Add()">
                        Compose                                   
                    </button>
                    <div class="mail-list mt-4">
                        <a href="javascript:void(0)" class="active" onclick="TrmInboxEmail();" id="InboxClass"><i class="bx bxs-inbox font-size-16 align-middle me-2"></i>Inbox <span class="ms-1 float-end">
                            <p id="InboxCount" style="text-align: center;"></p>
                        </span></a>
                        <%--<a href="javascript:void(0)" class="active" onclick="location.reload();" id="InboxClass"><i class="bx bxs-inbox font-size-16 align-middle me-2"></i>Inbox <span class="ms-1 float-end">
                            <p id="InboxCount" style="text-align: center;"></p>
                        </span></a>--%>
                        <%--<a href="#"><i class="bx bx-star font-size-16 align-middle me-2"></i>Starred</a>--%>
                        <%--<a href="javascript:void(0)"><i class="bx bxs-bookmark font-size-16 align-middle me-2"></i>Closed</a>--%>
                        <a href="javascript:void(0)" onclick="TrmDraftEmail()"><i class="bx bx-file font-size-16 align-middle me-2"></i>Draft<span class="ms-1 float-end"><p id="DraftCount" style="text-align: center;"></p>
                        </span></a>
                        <a href="javascript:void(0)" onclick="TrmSendingEmail()"><i class="bx bx-mail-send font-size-16 align-middle me-2"></i>Sent Mail</a>
                        <a href="javascript:void(0)" onclick="TrmSpamEmail()"><i class="bx bx-mail-send font-size-16 align-middle me-2"></i>Send To Leader<span class="ms-1 float-end">
                            <p id="SpamCount" style="text-align: center;"></p>
                        </span></a>
                        <%--<a href="javascript:void(0)" onclick="TrmArchiveEmail()"><i class="bx bx-archive font-size-16 align-middle me-2"></i>Archive</a>--%>
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
                    <div id="cardBody">
                        <div class="card">
                            <div class="card-body">
                                <div class="btn-toolbar" role="toolbar" id="HeaderToolbar">
                                    <div class="btn-group me-2 mb-2 mb-sm-0">
                                        <button type="button" class="btn btn-primary"><i class="fa fa-inbox"></i></button>
                                        <button type="button" class="btn btn-primary" title="Information"><i class="fa fa-exclamation-circle"></i></button>
                                        <%--<button type="button" class="btn btn-primary"><i class="far fa-trash-alt"></i></button>--%>
                                    </div>
                                    <div class="btn-group me-2 mb-2 mb-sm-0" id="filterDate">
                                        <a href="#" class="btn btn-primary dropdown-toggle" data-bs-toggle="modal" onclick="Filter()">Filter Date</a>
                                    </div>

                                     <div class="btn-group me-2 mb-2 mb-sm-0" id="divSearchingCustomer">
                                        <a href="#" class="btn btn-primary dropdown-toggle" data-bs-toggle="modal" onclick="Search()">Search Customer</a>
                                    </div>
                                </div>
                                <div class="box-body p-0">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="card" id="FormBodyEmail">
                                <div class="card-body">
                                    <div id="DivTrmInboxEmail">
                                        <table id="TrmInboxEmail" class="table table-hover" style="width: 100%;">
                                            <thead>
                                                <tr>
                                                    <%--<th style="width: 150px;">Email Service</th>--%>
                                                    <th style="width: 150px;">From</th>
                                                    <th>Subject</th>
                                                    <th style="width: 150px;">Status</th>
                                                    <th style="width: 150px;">Date Create</th>
                                                    <%--<th style="width: 50px;">Action</th>--%>
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
                                                    <%--<th style="width: 150px;">Email Service</th>--%>
                                                    <th style="width: 150px;">From</th>
                                                    <th>Subject</th>
                                                    <th style="width: 150px;">Date Create</th>
                                                    <th style="/*width: 50px; */">Action</th>
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
                                                    <%--<th style="width: 150px;">Email Service</th>--%>
                                                    <th style="width: 150px;">To</th>
                                                    <th>Subject</th>
                                                    <th style="width: 200px;">Date Create</th>
                                                    <%--<th style="width: 50px;">Action</th>--%>
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
                                                    <%--<th style="width: 150px;">Email Service</th>--%>
                                                    <th style="width: 150px;">To</th>
                                                    <th>Subject</th>
                                                    <th style="width: 150px;">Date Create</th>
                                                    <%--<th style="width: 50px;">Action</th>--%>
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
                                                    <%--<th style="width: 150px;">Email Service</th>--%>
                                                    <th style="width: 150px;">From</th>
                                                    <th>Subject</th>
                                                    <th style="width: 150px;">Date Create</th>
                                                    <%--<th style="width: 50px;">Action</th>--%>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="" id="FormReadingEmail">
                                <div class="card">
                                    <div class="card-body" id="FormNewPerusahaan">
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
                                        <div class="card-body" id="FormNewCustomer">
                                            <div class="card-body" >
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
                                                        <label for="addcontact-designation-input" class="form-label">Nama/PIC</label>
                                                        <div class="input-group">
                                                            <div class="input-group-text" onclick="FormListPIC()" style="cursor: pointer;"><i class="fas fa-user-circle"></i></div>
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
                                                <div class="modal-footer" id="footerButtonAction">
                                            <%--<button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal" onclick="ActionCloseCustomer()" id="CloseCustomer">Close</button>--%>
                                            <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdateCustomer()" id="UpdateCustomer">Update</button>
                                            <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanCustomer()" id="SimpanCustomer">Add</button>
                                            <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionEmailReadDetail()" id="EmailReadDetail">detail</button>--%>
                                            <button type="button" class="btn btn-light w-sm" onclick="ActionCancelPerusahaan()" id="CancelCustomer">Cancel</button>
                                            <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanPerusahaan()" id="SimpanPerusahaan">Add</button>
                                        </div>
                                        </div> 
                                        
                                    </div>                                    
                                </div>                             
                            </div>
                            
                            <div class="card" id="ticketEmail" style="display: none;">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="mb-3">
                                                <label for="contact-info-name" class="form-label">Agent Name</label>
                                                <input type="text" class="form-control" placeholder="Enter Name" id="Form_Ticket_Agent_Name">
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="mb-3">
                                                <label for="contact-info-email-input" class="form-label">Priority</label>
                                                <select id="Form_Ticket_Priority" class="form-select" required>
                                                    <option value="">Select</option>
                                                    <option value="High">High</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="mb-3">
                                                <label for="contact-info-phone-input" class="form-label">Status</label>
                                                <select id="Form_Ticket_Status" class="form-select">
                                                    <%--<option value="" selected="selected">Select</option>--%>
                                                    <option value="Open" selected="selected">Open</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card" id="officeForm">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="mb-3">
                                                <label for="workexperience-category-input">Subject</label>
                                                <input type="text" class="form-control" id="Form_Ticket_Subject" placeholder="Subject">
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="mb-3">
                                                <label for="workexperience-category-input">Category</label>
                                                <select id="Form_Ticket_Kategori" class="form-select" onchange="DropdownSubKategori(1);">
                                                    <option value="">Select</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="mb-3">
                                                <label for="workexperience-category-input">No. Aju</label>
                                                <label class="float-end" id="errorNoAjo" style="color: red;"></label>
                                                <input type="text" class="form-control" id="Form_Ticket_NoAju" placeholder="No. Aju">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="mb-3">
                                                <label for="workexperience-category-input">Kantor</label>
                                                <%--<a href="#" class="btn btn-sm btn-soft-primary float-end" onclick="FormKantor()"><i class="fas fa-plus-circle"></i></a>--%>
                                                <input type="text" class="form-control" id="Form_Ticket_Kantor" placeholder="Kantor">
                                                <div id="Div_KantorSearching" class="search-results" style="margin-left: 10px; margin-right: 10px; margin-top: -15px; width: 420px;"></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="mb-3">
                                                <label for="workexperience-category-input">Sub Category</label>
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
                                </div>
                            </div>
                            <div class="card" id="ticketEmailSubject" style="display: none;">
                                <div class="card-body">

                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <label for="workexperience-category-input">Action</label>
                                                        <select id="Form_Email_Action" class="form-select" onchange="DropdownAction(1);">
                                                            <option value="">Select</option>
                                                            <option value="1">Send To Leader</option>
                                                            <option value="2">Save & Close</option>
                                                            <option value="3">Convert To Case</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-12" id="DivUpdateStatus" style="display:none">
                                                    <div class="mb-3">
                                                        <label for="workexperience-category-input">Update Status</label>
                                                        <select id="Form_Email_UpdateSts" class="form-select" >
                                                            <option value="">Select</option>
                                                            <option value="1">Approve</option>
                                                            <option value="2">Reject</option>
                                                            
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3" id="divTo">
                                                        <label for="workexperience-category-input">To</label>
                                                        <input type="text" class="form-control" id="Form_Email_To" placeholder="To">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3" id="divSubject">
                                                        <label for="workexperience-category-input">Subject</label>
                                                        <input type="text" class="form-control" id="Form_Email_Subject" placeholder="Subject">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3" id="divCC">
                                                        <label for="workexperience-category-input">CC</label>
                                                        <input type="text" class="form-control" id="Form_Email_CC" placeholder="CC">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="mb-3">
                                                            <iframe id="EmailPertanyaan" title="description" style="width: 100%; height: 300px;"></iframe>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="mb-3">
                                                <textarea id="txtEmailBody" name="Ticket_NoteAgent" class="form-control" rows="10" placeholder="Jawaban.."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <%--<input type="file" name="files" class="form-control">--%>
                                            <%--<div class="mt-4">
                                            <div id="Div_Reply_AttachmentOT" style="width: 100%;"></div>
                                        </div>--%>
                                            <div class="mb-3" id="FileUploadCreatedTicketEmail">
                                                <div class="fv-row mb-10">
                                                    <label style="font-weight: bold; font-size: 14px; color: red;">
                                                        Upload file Max 5 MB ( .jpg, .png, .pdf )<span style="color: red;">*</span>
                                                    </label>
                                                </div>
                                                <input type="file" name="attachmentreplyOT" class="form-control">
                                            </div>

                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <div class="text-end">
                                            <button type="button" id="ConvToCase" class="btn btn-soft-warning w-sm" onclick="ActionCreateTicket"><i class="fa fa-save"></i>&nbsp;Convert To Case</button>
                                            <button type="button" id="saveClosed" class="btn btn-soft-primary w-sm" onclick="ActionCreateTicket"><i class="fa fa-save"></i>&nbsp;Save & Closed</button>
                                            <button type="button" id="submitEmail" class="btn btn-soft-primary w-sm"><i class="fa fa-save"></i>&nbsp;Submit</button>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card" id="cardBodyBwh">
                                <div class="card-body">
                                    <div class="btn-toolbar" role="toolbar" id="HeaderToolbarBwh">
                                        <div class="btn-group me-2 mb-2 mb-sm-0">
                                            <button type="button" class="btn btn-primary" title="Archive"><i class="fa fa-inbox"></i></button>
                                            <button type="button" class="btn btn-primary" title="Information"><i class="fa fa-exclamation-circle"></i></button>
                                            <%--<button type="button" class="btn btn-primary"><i class="far fa-trash-alt"></i></button>--%>
                                        </div>
                                        <%--<div class="btn-group me-2 mb-2 mb-sm-0">
                                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa fa-folder"></i> <i class="mdi mdi-chevron-down ms-1"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#">Updates</a>
                                            <a class="dropdown-item" href="#">Social</a>
                                            <a class="dropdown-item" href="#">Team Manage</a>
                                        </div>
                                    </div>      --%>
                                        <%--<iframe id="Preview_FrameHTML2" title="description" style="width: 100%; height: 300px;"></iframe>--%>
                                        <div class="btn-group me-2 mb-2 mb-sm-0" id="filterDateTop">
                                            <a href="#" class="btn btn-primary dropdown-toggle" data-bs-toggle="modal" onclick="Filter()">Filter Date</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card" id="EmailReadEmpty">
                                <div class="card-body">
                                    <div class="d-flex align-items-start mb-4">
                                        <div class="flex-shrink-0 me-3">
                                            <img class="rounded-circle avatar-sm" src="assets/images/users/avatar-2.jpg" alt="Generic placeholder image">
                                        </div>

                                        <div class="flex-grow-1">
                                            <h5 class="font-size-14 my-1"></h5>
                                            <small class="text-muted"></small>
                                        </div>
                                    </div>

                                    <iframe id="Preview_FrameHTML1" title="description" style="width: 100%; height: 300px;"></iframe>

                                    <a href="#" id="btnReply1" class="btn btn-light mt-4"><i class="mdi mdi-reply"></i>Reply</a>

                                </div>
                            </div>
                            <div class="card-body" id="EmailRead">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-start mb-4">
                                            <div class="flex-shrink-0 me-3">
                                                <img class="rounded-circle avatar-sm" src="assets/images/users/avatar-2.jpg" alt="Generic placeholder image">
                                            </div>

                                            <div class="flex-grow-1">
                                                <h5 class="font-size-14 my-1"><span type="text" id="emailName" class="form-label" disabled="disabled" /></h5>
                                                <%--<small class="text-muted"><span type="text" id="Email" class="form-label" disabled="disabled" /></small>--%>
                                                <div>
                                                    <%--<input class="form-control choices__input" id="choices-text-disabled" type="text" hidden="" tabindex="-1" data-choice="active">--%>
                                                    <div class="choices__list--multiple">
                                                        <div id="Email" class="choices__item"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <iframe id="Preview_FrameHTML2" title="description" style="width: 100%; height: 300px;"></iframe>

                                        <div class="card">
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <div id="Div_Inbox_AttachmentEmail" style="width: 100%;"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <a href="#" id="btnReply" class="btn btn-light mt-4"><i class="mdi mdi-reply"></i>Reply</a>
                                        <%--<a href="#" id="btnForward" class="btn btn-light mt-4"><i class="mdi mdi-forward"></i>Forward</a>--%>
                                        <a href="#" id="btnForward" class="btn btn-light mt-4"><i class="mdi mdi-forward"></i>Forward</a>

                                    </div>
                                </div>
                            </div>
                            <div class="card-body" id="formTicket">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="addContactModalLabelTicketX">Form Ticket</h5>
                                            <%--<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>--%>
                                        </div>
                                        <div class="modal-body p-4">
                                            <div>
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">Subject</label>
                                                    <input type="text" class="form-control" id="Ticket_SubjectX" placeholder="Subject">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">Kategori</label>
                                                    <select id="Ticket_KategoriX" class="form-select">
                                                        <option value="">Select</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">No. Aju</label>
                                                    <input type="text" class="form-control" id="Ticket_NoAjuX" placeholder="No. Aju">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">Kantor</label>
                                                    <input type="text" class="form-control" id="Ticket_KantorX" placeholder="Kantor">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">Sub Kategori</label>
                                                    <select id="Ticket_SubKategoriX" class="form-select">
                                                        <option value="">Select</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="addcontact-name-input" class="form-label">Nilai Transaksi</label>
                                                    <input type="text" class="form-control" id="Ticket_NilaiTransaksiX" placeholder="Nilai Transaksi">
                                                </div>
                                                <div class="mb-3">
                                                    <textarea id="Ticket_NoteAgentX" name="Ticket_NoteAgent" class="form-control" rows="8" placeholder="Jawaban.."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary w-sm" onclick="ActionCreateTicket()" id="ActionCreateTicketX">Submit66</button>
                                        </div>
                                    </div>
                                </div>
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

        <div class="modal fade" id="addCustomerData" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" >Data customer</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="text-center bt-0 border-light p-2">
                                <div class="input-group">
                                    <input type="search" id="TicketSearchCustomer" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2">
                                </div>
                        <table id="Ticket_ListCustomer" class="table table-hover table-dark mb-0" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px"></th>
                                            <th style="width: 30px">ID</th>
                                            <th style="width: 150px;">Name</th>
                                            <th style="width: 150px;">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                     
                        <div class="modal-footer modal-footer-uniform">
                    <%--<input id="btnGet1" type="button" value="Get Selected" />--%>
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <input id="btnSimpanCus" class="btn btn-rounded btn-primary float-right" style="width: 100px" value="Submit" />
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
        <script src="js/ckeditor/ckeditor.js"></script>
</asp:Content>
