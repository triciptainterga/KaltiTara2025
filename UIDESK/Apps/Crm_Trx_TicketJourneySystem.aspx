<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_TicketJourneySystem.aspx.vb" Inherits="UIDESK.Crm_Trx_TicketJourneySystem" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_TicketJourneySystem.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxNumberID" runat="server" />
    <asp:HiddenField ID="TrxThreadID" runat="server" />
    <asp:HiddenField ID="TrxChannel" runat="server" />
    <asp:HiddenField ID="TrxTicketNumber" runat="server" />
    <asp:HiddenField ID="TrxStatus" runat="server" />
    <asp:HiddenField ID="HD_API_Gender" runat="server" />
    <asp:HiddenField ID="HD_API_NomorPolis" runat="server" />
    <asp:HiddenField ID="hd_Layer" runat="server" />
    <asp:HiddenField ID="hd_EskalasiDepartment" runat="server" />
    <asp:HiddenField ID="hd_EmailID" runat="server" />
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
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Ticket</h4>
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
                        <img src="assets/images/users/user.png" alt="" class="rounded-circle img-thumbnail">
                    </div>
                    <h5 class="mb-1" id="Profile_NamaCustomer"></h5>
                    <p class="text-muted" style="cursor: pointer;" id="Profile_NamaPerusahaan"></p>
                </div>
            </div>
            <div class="col-xl-12">
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
                <div class="card">
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="workexperience-category-input">No. Ticket</label>
                            <input type="text" class="form-control" id="Ticket_Number" placeholder="No. Ticket">
                        </div>
                        <div class="mb-3">
                            <label for="workexperience-category-input">Priority</label>
                            <input type="text" class="form-control" id="Ticket_Priority" placeholder="Priority">
                        </div>
                        <div class="mb-3">
                            <label for="workexperience-category-input">Status</label>
                            <input type="text" class="form-control" id="Ticket_Status" placeholder="Status">
                        </div>
                        <div class="mb-3">
                            <label for="workexperience-category-input">Owner/Nama Agent</label>
                            <input type="text" class="form-control" id="Ticket_Nama_Agent" placeholder="Owner/Nama Agent">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xxl-9 col-lg-8">
            <div class="card">
                <div class="card-body">
                    <div class="hori-timeline">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                            </div>
                            <div class="swiper-arrow d-flex gap-2 justify-content-end arrow-sm">
                                <div class="swiper-button-prev position-relative rounded-start"></div>
                                <div class="swiper-button-next position-relative rounded-end"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-xxl-3 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">No. Ticket MS. Dynamic</label>
                                        <input type="text" class="form-control" id="Ticket_Dynamic" placeholder="No. Ticket MS. Dynamic" readonly="readonly">
                                    </div>
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Subject</label>
                                        <input type="text" class="form-control" id="Ticket_Subject" placeholder="Subject">
                                    </div>
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Kategori</label>
                                        <input type="text" class="form-control" id="Ticket_Kategori" placeholder="Kategori">
                                    </div>
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Sub Kategori</label>
                                        <input type="text" class="form-control" id="Ticket_Sub_Kategori" placeholder="Sub Kategori">
                                    </div>
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Kantor</label>
                                        <input type="text" class="form-control" id="Ticket_Kantor" placeholder="Kantor">
                                    </div>
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">No. Aju</label>
                                        <input type="text" class="form-control" id="Ticket_NoAju" placeholder="No. Aju">
                                    </div>
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Nilai Transaksi</label>
                                        <input type="text" class="form-control" id="Ticket_NilaiTransaksi" placeholder="Nilai Transaksi">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-9 col-lg-8">
                            <div class="mt-2">
                                <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link active" data-bs-toggle="tab" href="#navtabs2-home" role="tab" aria-selected="true">
                                            <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                            <span class="d-none d-sm-block">Ticket Properties</span>
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-profile" role="tab" aria-selected="false" tabindex="-1">
                                            <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                            <span class="d-none d-sm-block">Ticket Escalation</span>
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-interaction" role="tab" aria-selected="false" tabindex="-1" onclick="TicketInteraction()">
                                            <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                            <span class="d-none d-sm-block">Ticket Interaction</span>
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-activity" role="tab" aria-selected="false" tabindex="-1" onclick="TicketActivity()">
                                            <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                            <span class="d-none d-sm-block">Ticket Activity</span>
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-preview" role="tab" aria-selected="false" tabindex="-1" onclick="PreviewConversation()">
                                            <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                            <span class="d-none d-sm-block">Preview Conversation</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content">
                                <div class="tab-pane active" id="navtabs2-home" role="tabpanel">
                                    <br />
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Pertanyaan</label>
                                        <textarea id="Ticket_Pertanyaan" name="Ticket_Pertanyaan" class="form-control" rows="8"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Jawaban</label>
                                        <textarea id="Ticket_Jawaban" name="Ticket_Jawaban" class="form-control" rows="8"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Catatan Team Leader</label>
                                        <textarea id="Ticket_TeamLeader" name="Ticket_TeamLeader" class="form-control" rows="8"></textarea>
                                    </div>
                                    <div class="mt-3">
                                        <div class="text-end">
                                            <a class="btn btn-soft-primary w-sm" onclick="ActionUpdateTicketProperties()" id="UpdateTicketProperties"><i class="fa fa-save"></i>&nbsp;Update</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="navtabs2-profile" role="tabpanel">
                                    <br />
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Resolusi</label>
                                        <input type="text" class="form-control" id="Ticket_Resolusi" placeholder="Resolusi" readonly="readonly">
                                    </div>
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Deskripsi</label>
                                        <textarea id="Ticket_Deskripsi" name="Ticket_Deskripsi" class="form-control" rows="14"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Ticket ID IKC</label>
                                        <input type="text" class="form-control" id="Ticket_TicketIKC" placeholder="Ticket ID IKC" readonly="readonly">
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="workexperience-category-input">Nama Agent Outbound</label>
                                                <input type="text" class="form-control" id="Ticket_Nama_Agent_Outbound" placeholder="Nama Agent Outbound" readonly="readonly">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="workexperience-category-input">Tanggal Update</label>
                                                <input type="text" class="form-control" id="Ticket_Tanggal_Update" placeholder="Tanggal Update" readonly="readonly">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="navtabs2-activity" role="tabpanel">
                                    <br />
                                    <div id="DivTicketActivity" class="verti-timeline left-timeline" style="height: 640px; overflow-y: auto;"></div>
                                </div>
                                <div class="tab-pane" id="navtabs2-interaction" role="tabpanel">
                                    <br />
                                    <div class="row">
                                        <div class="mb-3">
                                            <div id="DivTicketInteraction" class="verti-timeline left-timeline" style="height: 100%; overflow-y: auto; max-height: 400px;"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="mb-3">
                                            <label for="workexperience-category-input">Status</label>
                                            <select id="Ticket_InteractonStatus" class="form-select">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="mb-3">
                                            <label for="workexperience-category-input">Response Agent</label>
                                            <textarea id="Ticket_InteractonReason" name="Ticket_InteractonReason" class="form-control" rows="8"></textarea>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <div class="text-end">
                                            <a class="btn btn-soft-warning w-sm" onclick="ActionUpdateTicketEskalasi()" id="ConvertToCase"><i class="fa fa-save"></i>&nbsp;Convert To Case</a>
                                            <a class="btn btn-soft-primary w-sm" onclick="ActionUpdateTicketClose()" id="UpdateClosed"><i class="fa fa-save"></i>&nbsp;Update</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="navtabs2-preview" role="tabpanel">
                                    <br />
                                    <iframe id="FramePreview" title="description" style="width: 100%; height: 650px; overflow-y: auto;"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    <%--<div class="row">
                        <div class="col-lg-12">
                            <input type="file" name="files" class="form-control">
                        </div>
                    </div>--%>
                    <div class="mt-3">
                        <div id="TicketAttachment" style="width: 100%;"></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ContactPreviewChannel" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content" style="width: 800px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelContactPreviewChannel">Form Customer Channel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="card-body">
                        <div id="Div_CustomerChannel" class="row"></div>
                    </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modalHistory"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content" style="width: 1100px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelHistory">Form History Ticket</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <table class="table align-middle table-nowrap table-check" id="TrmHistory">
                        <thead>
                            <tr>
                                <th style="width: 150px; min-width: 150px;">Ticket Number</th>
                                <th style="width: 150px; min-width: 150px;">Category</th>
                                <th style="width: 150px; min-width: 150px;">Position</th>
                                <th style="width: 50px; min-width: 100px;">Status</th>
                                <th style="width: 150px; min-width: 100px;">SLA</th>
                                <th style="width: 150px; min-width: 150px;">Date Create</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script src="assets/libs/swiper/swiper-bundle.min.js"></script>
    <script src="assets/js/pages/timeline.init.js"></script>
    <script>
        var Ticket_Pertanyaan = CKEDITOR.replace('Ticket_Pertanyaan');
        Ticket_Pertanyaan.config.height = 250;
        Ticket_Pertanyaan.config.toolbar = 'Basic';
        Ticket_Pertanyaan.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-']
            ];
        var Ticket_Jawaban = CKEDITOR.replace('Ticket_Jawaban');
        Ticket_Jawaban.config.height = 250;
        Ticket_Jawaban.config.toolbar = 'Basic';
        Ticket_Jawaban.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-']
            ];
        var Ticket_TeamLeader = CKEDITOR.replace('Ticket_TeamLeader');
        Ticket_TeamLeader.config.height = 250;
        Ticket_TeamLeader.config.toolbar = 'Basic';
        Ticket_TeamLeader.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-']
            ];
    </script>
    <script>
        var Ticket_InteractonReason = CKEDITOR.replace('Ticket_InteractonReason');
        Ticket_InteractonReason.config.height = 250;
        Ticket_InteractonReason.config.toolbar = 'Basic';
        Ticket_InteractonReason.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-']
            ];
        var Ticket_Deskripsi = CKEDITOR.replace('Ticket_Deskripsi');
        Ticket_Deskripsi.config.height = 250;
        Ticket_Deskripsi.config.toolbar = 'Basic';
        Ticket_Deskripsi.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-']
            ];

    </script>
</asp:Content>
