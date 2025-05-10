<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_HistoryEmail.aspx.vb" Inherits="UIDESK.Crm_Trm_HistoryEmail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_HistoryEmail.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <style>
        /* Mengatur kontainer agar scroll muncul ketika tabel melebihi lebar */
        .table-responsive {
            overflow-x: auto; /* Mengaktifkan scroll horizontal */
            width: 100%; /* Memastikan kontainer mengisi seluruh lebar */
        }

        table {
            width: 100%; /* Lebar tabel mengikuti kontainer */
        }
    </style>
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
    </style>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data History Email</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                <div>
                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Filter()">Filter Date</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table align-middle table-nowrap table-check" id="TrmHistory">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px; min-width: 30px;">ID</th>
                                            <th style="width: 250px; min-width: 250px;">Site</th>
                                            <th style="width: 250px; min-width: 250px;">From</th>
                                            <th style="width: 450px; min-width: 450px;">Subject</th>
                                            <th style="width: 150px; min-width: 150px;">Agent</th>
                                            <th style="width: 150px; min-width: 150px;">On Handling</th>
                                            <th style="width: 150px; min-width: 150px;">Type</th>
                                            <th style="width: 150px; min-width: 150px;">Date Create</th>
                                            <th style="width: 50px; min-width: 50px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="addContactModalLabel">Add Department</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body p-4">
                                    <div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Department</label>
                                            <input type="text" class="form-control" id="TxtDepartment" placeholder="Department">
                                        </div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Email Address</label>
                                            <input type="text" class="form-control" id="TxtEmail" placeholder="Email Address">
                                        </div>
                                        <div class="mb-3">
                                            <label for="addcontact-designation-input" class="form-label">Status</label>
                                            <select class="form-select" id="cmbStatus">
                                                <option>Select</option>
                                                <option value="Y">Aktif</option>
                                                <option value="N">No Aktif</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Add</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addContactModalFilterDate" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelHistory">Filter Date</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="clearFormFields()"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="Ticket_ProductType" class="form-label">Type</label>
                            <select id="Ticket_ProductType" class="form-select" onchange="ChangeFilter(this.value)">
                                <option value="">Select</option>
                                <option value="1">Date</option>
                                <option value="2">Account</option>
                                <option value="3">Agent & Date</option>
                            </select>
                            <small id="typeError" class="text-danger" style="display: none;"></small>
                        </div>

                        <div class="mb-3" id="dateFields" style="display: none;">
                            <label for="startdate" class="form-label">Start Date</label>
                            <input type="date" class="form-control" id="startdate" required>
                        </div>
                        <div class="mb-3" id="endDateFields" style="display: none;">
                            <label for="enddate" class="form-label">End Date</label>
                            <input type="date" class="form-control" id="enddate" required>
                        </div>
                        <small id="dateError" class="text-danger" style="display: none;"></small>

                        <div class="mb-3" id="accountField" style="display: none;">
                            <label for="AccountEmail" class="form-label">Email Address</label>
                            <input type="text" class="form-control" id="AccountEmail" placeholder="Email Address">
                            <small id="emailError" class="text-danger" style="display: none;"></small>
                        </div>
                        <div class="mb-3" id="agentField" style="display: none;">
                            <label for="agentSelect" class="form-label">Select Agent</label>
                            <select id="agentSelect" class="form-select">
                                <option value="">Select Agent</option>
                            </select>
                            <small id="agentError" class="text-danger" style="display: none;"></small>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal" onclick="clearFormFields()">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionFilterDate()" id="Submit">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Conversation -->
    <div class="modal fade" id="popupemail" tabindex="-1" aria-labelledby="emailModalLabel" aria-hidden="true" style="margin-top: 50px;">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="emailModalLabel">Email History Conversation</h5>
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

<%--    <script>
        new DataTable('#TrmHistory', {
            scrollX: true
        });
    </script>--%>

</asp:Content>
