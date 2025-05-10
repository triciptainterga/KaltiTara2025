<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_HistoryTicket.aspx.vb" Inherits="UIDESK.Crm_Trm_HistoryTicket" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_HistoryTicket.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data History Ticket</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <%--<h5 class="card-title">Data Priority</h5>--%>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                <div>
                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Filter()"><i class="fas fa-search"></i>&nbsp;Filter Date</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <center>
                                    <div class="spinner-border text-primary m-1" role="status" id="Loading">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </center>
                                <table class="table align-middle table-nowrap table-check" id="TrmHistory">
                                    <thead>
                                        <tr>
                                            <th style="width: 150px; min-width: 150px;">Ticket Number</th>
                                            <th style="width: 250px; min-width: 150px;">Name</th>
                                            <th style="width: 250px; min-width: 150px;">Kategori</th>
                                            <th style="width: 150px; min-width: 150px;">Agent</th>
                                            <th style="width: 150px; min-width: 150px;">Position</th>
                                            <th style="width: 150px; min-width: 100px;">Status</th>
                                            <th style="width: 150px; min-width: 150px;">Date Create</th>
                                            <th style="width: 100px; min-width: 100px;">Action</th>
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
    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Filter Date</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Filter Type</label>
                            <select id="ComboType" class="form-select" onchange="FilterComboType(1)" required>
                                <option value="">Select</option>
                                <option value="1">Date</option>
                                <option value="2">Ticket Number OR Customer Channel</option>
                                <option value="3">Agent & Date</option>
                            </select>
                        </div>
                        <div id="ParameterDate" style="display: none;">
                            <div class="mb-3">
                                <label for="addcontact-name-input" class="form-label">Start Date</label>
                                <input type="date" class="form-control" id="startdate" placeholder="startdate" required>
                            </div>
                            <div class="mb-3">
                                <label for="addcontact-name-input" class="form-label">End Date</label>
                                <input type="date" class="form-control" id="enddate" placeholder="enddate" required>
                            </div>
                        </div>
                        <div id="ParameterCustomer" style="display: none;">
                            <div class="mb-3">
                                <label for="addcontact-name-input" class="form-label">Ticket Number OR Customer Channel</label>
                                <input type="text" class="form-control" id="Customer">
                            </div>
                        </div>
                        <div class="mb-3" id="ParameterAgent" style="display: none;">
                            <label for="agentSelect" class="form-label">Select Agent</label>
                            <select id="agentSelect" class="form-select">
                                <option value="">Select Agent</option>
                            </select>
                            <small id="agentError" class="text-danger" style="display: none;"></small>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionFilter()" id="Update">Submit</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
