<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Inbox_EmailSystemSpv.aspx.vb" Inherits="UIDESK.Crm_Trm_Inbox_EmailSystemSpv" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Inbox_EmailSystemSpv.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <link href="assets/libs/choices.js/public/assets/styles/choices.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/libs/flatpickr/flatpickr.min.css" rel="stylesheet">
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
                bottom: 100%; /* Position the tooltip above the trigger element */
                left: 50%;
                transform: translateX(-50%);
            }

            .tooltip-container:hover .tooltip {
                display: block;
            }

        .mail-list a {
            color: #6c757d; /* Warna teks default */
        }

            .mail-list a i {
                color: #6c757d; /* Warna icon default */
            }

            .mail-list a.active {
                color: #FF4433; /* Warna teks saat aktif */
                font-weight: bold;
            }

                .mail-list a.active i {
                    color: #FF4433; /* Warna icon saat aktif */
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
            <div class="email-leftbar card">
                <div class="row" style="margin-top: -20px;">
                    <%--  <button type="button" class="btn btn-danger w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#composemodal" onclick="Compose_Add()">
                        Compose                                   
                    </button>--%>
                    <div class="mail-list mt-4">
                        <%--<i class="bx bx-mail-send font-size-16 align-middle me-2"></i>--%>
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
                            <i class="bx bx-user-circle font-size-16 align-middle me-2"></i>
                            Send To Leader
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
                            <i class="bx bx-briefcase-alt font-size-16 align-middle me-2"></i>
                            Case
                            <span class="ms-1 float-end">
                                <p id="CaseCount" style="text-align: center;"></p>
                            </span>
                        </a>
                        <a href="javascript:void(0)" onclick="OnclickArchieve()" id="FolderArchieve">
                            <i class="bx bx-archive-in font-size-16 align-middle me-2"></i>
                            Archive
                            <span class="ms-1 float-end">
                                <p id="ArchiveCount" style="text-align: center;"></p>
                            </span>
                        </a>
                    </div>
                    <h6 class="mt-4">List Data Agent</h6>
                    <div class="mail-list mt-1" id="divLisAgent" style="height: 100%; max-height: 200px; overflow: auto;">
                    </div>
                    <h6 class="mt-4">List Data Team Leader</h6>
                    <div class="mail-list mt-1" id="divLisTeamLeader" style="height: 100%; max-height: 200px; overflow: auto;">
                    </div>
                </div>
                <div class="row" id="DivJourneyReject">
                    <div class="mail-list mt-1" id="RejectTeamLeader">
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
                <div class="card" id="DivTableIncomingEmail">
                    <div class="card-body">
                        <table id="TableIncomingEmail" class="table table-hover" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="width: 250px;">From</th>
                                    <th>Subject</th>
                                    <th style="width: 200px;">Owner</th>
                                    <th style="width: 200px;">Date Create</th>
                                </tr>
                            </thead>
                            <tbody>
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
                                    <th style="width: 200px;">Owner</th>
                                    <th style="width: 200px;">Date Create</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
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
                                <input type="text" class="form-control" id="ComposeECC" placeholder="Ccc">
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
                                        <label for="contact-info-name" class="form-label">Agent Name</label>
                                        <input type="text" class="form-control" placeholder="Enter Name" id="Form_Ticket_Agent_Name" readonly="readonly">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="contact-info-email-input" class="form-label">Priority</label>
                                        <select id="Form_Ticket_Priority" class="form-select" readonly="readonly">
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
                                        <input type="text" class="form-control" id="Form_Ticket_Status" readonly="readonly">
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
                                        <label for="workexperience-category-input">Subject</label>
                                        <input type="text" class="form-control" id="Form_Ticket_Subject" placeholder="Subject" readonly="readonly">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Category</label>
                                        <select id="Form_Ticket_Kategori" class="form-select" onchange="Dropdown_SubCategory(1);" readonly="readonly">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">No. Aju</label><label class="float-end" id="errorNoAjo" style="color: red;"></label>
                                        <input type="text" class="form-control" id="Form_Ticket_NoAju" placeholder="No. Aju" readonly="readonly">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Kantor</label>
                                        <input type="text" class="form-control" id="Form_Ticket_Kantor" placeholder="Kantor">
                                        <div id="Div_KantorSearching" class="search-results" style="margin-left: 10px; margin-right: 10px; margin-top: -15px; width: 420px;" readonly="readonly"></div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Sub Category</label>
                                        <select id="Form_Ticket_SubKategori" class="form-select" readonly="readonly">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Nilai Transaksi</label>
                                        <input type="text" class="form-control" id="Form_Ticket_NilaiTransaksi" placeholder="Nilai Transaksi" readonly="readonly">
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="ActionTeamLeader" style="display: none;">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <label for="contact-info-phone-input" class="form-label">Action</label>
                                        <select id="Form_Ticket_Action" class="form-select" onchange="Dropdown_ChangeAction('1')">
                                            <option value="">Select</option>
                                            <option value="1">Send To Team Leader</option>
                                            <option value="2">Save & Close</option>
                                            <option value="3">Convert To Case</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="ObjectEmail">
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">To</label>
                                        <input type="text" class="form-control" id="Form_Ticket_Email_Tujuan" placeholder="To" readonly="readonly">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Subject</label>
                                        <input type="text" class="form-control" id="Form_Ticket_Email_Subject" placeholder="Subject" readonly="readonly">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">To</label>
                                        <input type="text" class="form-control" id="Form_Ticket_Email_CC" placeholder="Ccc" readonly="readonly">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <iframe id="Preview_FrameHTML2" title="description" style="width: 100%;" class="bodyemailread"></iframe>
                                        <div id="Div_Inbox_AttachmentEmail" style="width: 100%; height: 100%; overflow-x: hidden; overflow-y: scroll;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <textarea id="Ticket_NoteAgent" name="Ticket_NoteAgent" class="form-control" rows="20" placeholder="Jawaban.." readonly="readonly"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="mt-3">
                                        <div id="Div_TicketAttachment" style="width: 100%;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="DivAttachmentTicketEmail" style="display: none;">
                                <div class="col-lg-12">
                                    <input type="file" name="files" class="form-control">
                                </div>
                            </div>
                            <div class="mt-3" style="display: none;">
                                <div class="text-end">
                                    <a class="btn btn-soft-danger w-sm" data-bs-toggle="modal" data-bs-target="#addEmailReject" id="ButtonReject"><i class="far fa-times-circle"></i>&nbsp;Reject</a>
                                    <a class="btn btn-soft-primary w-sm" onclick="Proses_ButtonApprove()" id="ButtonProsessApprove"><i class="fa fa-save"></i>&nbsp;Approve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" id="DivBodyEmail">
                    <div class="card-body">
                        <div class="d-flex align-items-start mb-4">
                            <div class="flex-shrink-0 me-3">
                                <img class="rounded-circle avatar-sm" src="assets/images/users/avatar-2.jpg" alt="Generic placeholder image">
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="font-size-14 my-1" id="Profile_NamaCustomer"></h5>
                                <small class="text-muted" id="Profile_EmailCustomer"></small>
                            </div>
                        </div>
                        <iframe id="Preview_FrameHTML1" title="description" style="width: 100%;" class="bodyemailread"></iframe>
                        <div id="Div_Inbox_Attachment" style="width: 100%; height: 100%; overflow-x: hidden; overflow-y: scroll;"></div>
                        <%-- <a href="#" id="ButtonReply" class="btn btn-light mt-4" onclick="Action_Reply()"><i class="mdi mdi-reply"></i>Reply</a>
                        <a href="#" id="ButtonForward" class="btn btn-light mt-4" onclick="Action_Forward()"><i class="mdi mdi-forward"></i>Forward</a>--%>
                    </div>
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

    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var Ticket_NoteAgent = CKEDITOR.replace('Ticket_NoteAgent');
        Ticket_NoteAgent.config.height = 500;
        Ticket_NoteAgent.config.toolbar = 'Basic';
        Ticket_NoteAgent.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-']
            ];
    </script>
</asp:Content>
