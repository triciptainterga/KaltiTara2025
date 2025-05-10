<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master"
    CodeBehind="Crm_Trm_Master_Report.aspx.vb" Inherits="UIDESK.Crm_Trm_Master_Report" %>
    <asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <link href="css/alertify.css" rel="stylesheet" />
        <link href="css/alertify.min.css" rel="stylesheet" />
        <script src="js/jquery-1.9.1.min.js"></script>
        <script src="js/Crm_Trm_Master_Report.js"></script>
        <script src="js/sweetalert.min.js"></script>
        <script src="js/alertify.min.js"></script>
        <script src="js/alertify.js"></script>
        <asp:HiddenField ID="TrxID" runat="server" />
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                    <h4 class="mb-0">Data Master Report</h4>
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
                                    <%--<h5 class="card-title">Data Master Report</h5>--%>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div
                                    class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                    <div>
                                        <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Tambah()">+
                                            Add New</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table align-middle table-nowrap table-check" id="MasterConfig"
                                style="table-layout: fixed; width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>TypeReport</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Data dinamis akan ditambahkan di sini -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Add New Data -->
        <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addContactModalLabel">Add Master Report</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div>
                            <div class="mb-3">
                                <label for="addcontact-name-input" class="form-label">Master Report Name</label>
                                <input type="text" class="form-control" id="MasterConfigName"
                                    placeholder="Master Report">
                            </div>
                            <div class="mb-3">
                                <label for="addcontact-designation-input" class="form-label">Status</label>
                                <select class="form-select" id="cmbStatus">
                                    <option>Select</option>
                                    <option value="Y">Active</option>
                                    <option value="N">Non Active</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()"
                            id="Update">Update</button>
                        <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()"
                            id="Simpan">Add</button>
                        <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()"
                            id="Delete">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Update Data -->
        <div class="modal fade" id="updateContactModal" tabindex="-1" aria-labelledby="updateContactModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateContactModalLabel">Update Master Report</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div>
                            <input type="hidden" id="ContentPlaceHolder1_TrxID" /> <!-- Hidden field for TrxID -->
                            <div class="mb-3">
                                <label for="updateMasterConfigName" class="form-label">Master Report Name</label>
                                <input type="text" class="form-control" id="updateMasterConfigName"
                                    placeholder="Master Report">
                            </div>
                            <div class="mb-3">
                                <label for="updateStatus" class="form-label">Status</label>
                                <select class="form-select" id="updateStatus">
                                    <option>Select</option>
                                    <option value="Y">Active</option>
                                    <option value="N">Non Active</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()">Update</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Delete Data -->
        <div class="modal fade" id="deleteContactModal" tabindex="-1" aria-labelledby="deleteContactModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteContactModalLabel">Delete Master Report</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div>
                            <input type="hidden" id="deleteTrxID" />
                            <div class="mb-3">
                                <label class="form-label">Master Report Name</label>
                                <input type="text" class="form-control" id="deleteMasterConfigName" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Status</label>
                                <input type="text" class="form-control" id="deleteStatus" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger w-sm" onclick="ActionDeleteKlik()">Delete</button>
                    </div>
                </div>
            </div>
        </div>



    </asp:Content>