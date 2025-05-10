<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_Agent_WhatsApp.aspx.vb" Inherits="UIDESK.Crm_Trx_Agent_WhatsApp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_Agent_WhatsApp.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <div class="mb-3">
                            <a href="#" class="btn btn-light" onclick="AddUser()">
                                <i class="uil uil-plus me-1"></i>+ Add New
                                 </a>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end gap-2 mb-3">
                            <div class="search-box ">
                                <div class="position-relative">
                                    <input type="text" class="form-control bg-light border-light rounded" id="TxtSearchingUserName" placeholder="Search...">
                                    <i class="uil uil-search search-icon"></i>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row" id="divUserNotification"></div>
                <div class="table-responsive" style="visibility:hidden;">
                    <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                        <thead>
                            <tr>
                                <th style="width: 30px; min-width: 30px;">ID</th>
                                <th>UserName UIDESK</th>
                                <th>UserName Integration</th>
                                <th>Account Number</th>
                                <th style="width: 100px; min-width: 100px;">Status</th>
                                <th style="width: 30px; min-width: 30px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addContactModalLabel">Account Agent WhatsApp</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div>
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Agent WhatsApp</label>
                                        <select id="CmbAgentWA" class="form-select">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">UserName Integration</label>
                                        <input type="text" class="form-control" id="UserName_Integration" placeholder="UserName Integration">
                                    </div>
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Channel</label>
                                        <select id="CmbChannel" class="form-select">
                                            <option value="">Select</option>
                                            <option value="WA">WA</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Nomor Telepon WhatsApp</label>
                                        <select class="form-select" id="ComboNomorTelepon">
                                            <option value="">Select</option>
                                        </select>
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
                <!-- end row -->

            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->
    </div>
</asp:Content>
