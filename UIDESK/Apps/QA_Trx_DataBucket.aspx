<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_Trx_DataBucket.aspx.vb" Inherits="UIDESK.QA_Trx_DataBucket" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QA_TrxDataBucket.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <!-- <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" /> -->
    <asp:HiddenField ID="TrxID" runat="server" />
    <style>
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

        .journey-timeline {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            padding: 20px;
            background-color: #f5f7fa;
            border-radius: 10px;
            overflow: hidden;
        }

        .journey-step {
            text-align: center;
            position: relative;
        }

        .journey-date {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
        }

        .journey-circle {
            width: 20px;
            height: 20px;
            background-color: #007bff;
            border-radius: 50%;
            margin: 0 auto;
            border: 3px solid #fff;
            position: relative;
            z-index: 2;
        }

        .journey-label {
            margin-top: 10px;
            font-size: 14px;
            color: #333;
        }

        .journey-interval {
            margin-bottom: 0;
            margin-top: -20px;
            font-size: 14px;
            color: red;
            text-align: center;
            position: relative;
            top: -15px;
        }

        .journey-line {
            height: 2px;
            background-color: #007bff;
            margin: 5px 0;
            width: 60px;
            display: block;
        }

        .journey-timeline.email .journey-circle {
            background-color: #007bff;
        }

        .journey-timeline.email .journey-line {
            background-color: #007bff;
        }

        .journey-timeline.websocket .journey-circle {
            background-color: #fbc766;
        }

        .journey-timeline.websocket .journey-line {
            background-color: #fbc766;
        }

        .journey-timeline.multichat .journey-circle {
            background-color: #fbc766;
        }

        .journey-timeline.multichat .journey-line {
            background-color: #fbc766;
        }

        .journey-timeline.instagram .journey-circle {
            background-color: #cd486b;
        }

        .journey-timeline.instagram .journey-line {
            background-color: #cd486b;
        }

        .journey-timeline.whatsapp .journey-circle {
            background-color: #25d366;
        }

        .journey-timeline.whatsapp .journey-line {
            background-color: #25d366;
        }

        .journey-timeline.facebook .journey-circle {
            background-color: #316FF6;
        }

        .journey-timeline.facebook .journey-line {
            background-color: #316FF6;
        }

        .journey-timeline.hidden {
            display: none;
        }

        .journey-line.not-available {
            background-color: #d3d3d3; /* Light gray line color */
            opacity: 0.5;
        }

        .journey-circle.not-available {
            background-color: #d3d3d3; /* Light gray circle */
            border-color: #d3d3d3; /* Ensure the border is also gray */
        }

        .journey-interval.not-available {
            opacity: 0.5;
            pointer-events: none; /* Disable interactions */
            color: #d3d3d3; /* Light gray text color */
        }

        /* Ensure the entire step is grayed out */
        .journey-step.not-available {
            opacity: 0.5;
            pointer-events: none;
        }

        #TableBucket th, #TableBucket td {
            text-align: center; /* Menyelaraskan teks header dan nilai tabel ke tengah */
        }

        .action-icon {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50% !important;
            transition: all 0.2s ease-in-out;
        }

            .action-icon:hover {
                opacity: 0.85;
                transform: scale(1.1);
            }

        .row-reject td {
            font-weight: bold;
            color: #ffc107 !important; /* Kuning */
        }

        .row-preview td {
            font-weight: bold;
            color: #0dcaf0 !important; /* Biru */
        }

        .row-followup td {
            font-weight: bold;
            color: #90EE90 !important; /* Hijau */
        }
    </style>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Bucket Penilaian</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="text-end">
                            <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                +&nbsp;Action <i class="mdi mdi-dots-vertical ms-2"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" onclick="AddManual()" id="DataOutbound">Data Outbound</a>
                                <a class="dropdown-item" href="#" onclick="GetIncoming()">Data Incoming Chanel</a>
                            </div>
                            <%-- <div class="btn-group me-2 mb-2 mb-sm-0">
                                <button type="button" class="btn btn-soft-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-folder"></i>&nbsp;Action<i class="mdi mdi-chevron-down ms-1"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#" onclick="AddManual()">Add Data Manual</a>
                                    <a class="dropdown-item" href="#" onclick="GetIncoming()">Add Get Data Manual</a>
                                </div>
                            </div>--%>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table align-middle table-nowrap table-check" id="TableBucketIncoming">
                                    <thead>
                                        <tr>
                                            <th scope="col" style="width: 50px;">ID</th>
                                            <th scope="col" style="width: 250px;">Channel</th>
                                            <th scope="col" style="width: 250px;">TicketNumber</th>
                                            <th scope="col" style="width: 250px;">Agent</th>
                                            <th scope="col" style="width: 250px;">Periode</th>
                                            <th scope="col" style="width: 250px;">Account</th>
                                            <th scope="col" style="width: 250px;">Type Data</th>
                                            <th scope="col" style="width: 250px;">Date Distribute</th>
                                            <th scope="col" style="width: 50px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModalScreenCall" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalCustomer">Preview</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <iframe id="FrameAudio" title="description" style="width: 100%; height: 400px;"></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addContactModal"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Form Data Outbound</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Channel <span class="text-danger">*</span></label>
                                        <select id="ComboChannel" class="form-select">
                                            <option value="">Select</option>
                                            <option value="Outbound" selected="selected">Outbound</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Site <span class="text-danger">*</span></label>
                                        <select id="ComboSite" class="form-select">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Agent<span class="text-danger">*</span></label>
                                        <select id="ComboAgent" class="form-select">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Waktu Interaksi<span class="text-danger">*</span></label>
                                        <input type="datetime-local" class="form-control" id="WaktuInteraksi">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Periode Bulan<span class="text-danger">*</span></label>
                                        <select id="ComboBulan" class="form-select">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Periode Tahun<span class="text-danger">*</span></label>
                                        <select id="ComboTahun" class="form-select">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Ticket Number CRM Dynamic<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="Nama_PIC" placeholder="Ticket Number CRM Dynamic">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Ticket Number Ciesa</label>
                                        <input type="text" class="form-control" id="QA_Account" placeholder="Ticket Number Ciesa">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Link</label>
                                        <input type="text" class="form-control" id="QA_Link" placeholder="Link">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4" style="display: none;">
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Tipe <span class="text-danger">*</span></label>
                                        <select id="AddCustomer_Type" class="form-select" onchange="ComboTypePerusahaan('1')">
                                            <option value="0">Select</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSubmitPenilaianManual()" id="Simpan">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addContactModalTable" data-bs-backdrop="static"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalTableNya">Data Incoming Channel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Channel</label>
                                        <select id="ComboChannelNya" class="form-select">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Agent</label>
                                        <select id="ComboAgentIncoming" class="form-select">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="mb-3">
                                        <label for="startdate" class="form-label">Start Date</label>
                                        <input type="date" class="form-control" id="startdate" placeholder="startdate" required>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="mb-3">
                                        <label for="enddate" class="form-label">End Date</label>
                                        <input type="date" class="form-control" id="enddate" placeholder="enddate" required>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-11">
                                </div>
                                <div class="col-md-1">
                                    <a class="btn btn-primary w-sm" onclick="ActionGetDataManual()" id="ActionGetDataManual" style="margin-left: -25px;">Submit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card" id="DivTableNya">
                        <div class="card-body" style="width: 100%; overflow-x: auto; overflow-y: auto; height: 450px;">
                            <div class="row">
                                <div class="table-responsive">
                                    <table class="table align-middle table-nowrap table-check" id="TableBucket">
                                        <thead>
                                            <tr>
                                                <th scope="col" style="width: 250px;">Action</th>
                                                <th scope="col" style="width: 50px;">ID</th>
                                                <th scope="col" style="width: 250px;">Channel</th>
                                                <th scope="col" style="width: 250px;">Account</th>
                                                <th scope="col" style="width: 250px;">Ticket Category</th>
                                                <th scope="col" style="width: 250px;">Agent</th>
                                                <th scope="col" style="width: 250px;">Date Transaksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <a class="btn btn-primary w-sm" onclick="ActionGetDataSelesai()" id="ActionGetDataSelesai">Done</a>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addContactModalScreenNonCall"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelHistory">Preview</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <br />
                    <div class="journey-timeline">
                        <div class="journey-step">
                            <div class="journey-date">Inbox Date</div>
                            <div class="journey-circle"></div>
                            <div class="journey-label">Received Data</div>
                        </div>
                        <div class="journey-line"></div>
                        <div class="journey-step">
                            <div class="journey-date">Distribute Date</div>
                            <div class="journey-circle"></div>
                            <div class="journey-label">Distributed to Agent</div>
                        </div>
                        <div class="journey-interval"></div>
                        <!-- Added IntervalResponseAgentFormatted -->
                        <div class="journey-line"></div>
                        <div class="journey-step">
                            <div class="journey-date">Agent Date</div>
                            <div class="journey-circle"></div>
                            <div class="journey-label">Handled by Agent</div>
                        </div>
                        <div class="journey-interval"></div>
                        <!-- Added IntervalResponseTLFormatted -->
                        <div class="journey-line"></div>
                        <div class="journey-step">
                            <div class="journey-date">Team Leader Date</div>
                            <div class="journey-circle"></div>
                            <div class="journey-label">Reviewed by Team Leader</div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div id="EskalasiEmailTeamLeader" class="verti-timeline left-timeline"></div>
                    <br />
                    <div id="Journeymailconversationnew"></div>
                    <iframe id="FrameNonCall" title="description" style="width: 100%; height: 500px;"></iframe>
                </div>
                <div class="modal-footer">
                    <a href="#" class="btn btn-danger w-sm" id="DeleteProsesPreview" onclick="DeleteProsesPreview()" style="display: none;">Delete</a>
                    <a href="#" class="btn btn-primary w-sm" id="PreviewFollowup" onclick="PreviewFollowup()" style="display: none;">Follow up</a>
                    <a href="#" class="btn btn-primary w-sm" id="ActionProsesFollowup" onclick="ActionProses()">Follow up</a>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
