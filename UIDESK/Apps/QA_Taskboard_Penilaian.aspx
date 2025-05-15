<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_Taskboard_Penilaian.aspx.vb" Inherits="UIDESK.QA_Taskboard_Penilaian" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QA_Taskboard_Penilaian.js"></script>
    <script src="js/sweetalert.min.js"></script>
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
            margin-bottom: 0; /* Remove bottom margin */
            margin-top: -20px; /* Adjust spacing above the line (negative margin) */
            font-size: 14px;
            color: #333; /* Text color */
            text-align: center; /* Center the text horizontally */
            position: relative; /* Allow for precise positioning */
            top: -15px; /* Move the text upward */
        }

        .journey-line {
            height: 2px;
            background-color: #007bff; /* Adjust the line color */
            margin: 5px 0; /* Vertical spacing for better appearance */
            width: 60px; /* Ensure the line spans full width */
            display: block; /* Ensure it's a block-level element */
        }

        .journey-timeline.hidden {
            display: none;
        }
    </style>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Taskboard Penilaian</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row" id="Div_HeaderCounting"></div>
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <%--<h5 class="card-title">Taskboard Ticket</h5>--%>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <table class="table align-middle table-nowrap table-check" id="TrmTransaction">
                                        <thead>
                                            <tr>
                                                <th style="width: 30px;">ID</th>
                                                <th style="width: 150px;">ID Penilaian</th>
                                                <th style="width: 250px;">Nama Nasabah</th>
                                                <th style="width: 150px;">Kategori</th>
                                                <th style="width: 150px;">Agent</th>
                                                <%--<th style="width: 100px;">Skill</th>--%>
                                                <th style="width: 100px;">Type</th>
                                                <th style="width: 100px;">Status</th>
                                                <th style="width: 100px;">Performance</th>
                                                <th style="width: 150px;">Date Create</th>
                                                <th style="width: 30px;">Action</th>
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
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-note"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabel">Internal Note</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <%--<label for="addcontact-designation-input" class="form-label">Note</label>--%>
                                    <textarea class="form-control" placeholder="Leave a comment here" id="Note" name="Note" style="height: 250px"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addContactModalScreenNonCall"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content" style="width: 1100px;">
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
                    <div id="Journeymailconversationnew"></div>
                    <iframe id="FrameNonCall" title="description" style="width: 100%; height: 750px;"></iframe>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addContactModalComment"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content" style="width: 1100px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelComment">Comment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div id="JourneyHistoryKomentar" class="verti-timeline left-timeline"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-skor" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addContactModalSkor">Form Skor Penilaian</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div>
                            <div class="mb-3">
                                <table class="table" id="TrmGrupingPenilaian">
                                    <thead>
                                        <tr class="table-light">
                                            <th scope="col" style="width: 1000px;">Aspek Callmoon</th>
                                            <th scope="col" style="width: 100px;">Skor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                <hr />
                                <table class="table" id="TrmModalSkorPenilaian">
                                    <thead>
                                        <tr class="table-light">
                                            <th scope="col" style="width: 1000px;">Total Skor</th>
                                            <th scope="col" style="width: 100px;"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
</asp:Content>
