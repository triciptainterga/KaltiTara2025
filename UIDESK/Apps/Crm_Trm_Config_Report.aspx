<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master"
    CodeBehind="Crm_Trm_Config_Report.aspx.vb" Inherits="UIDESK.Crm_Trm_Config_Report" %>
    <asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <link href="css/alertify.css" rel="stylesheet" />
        <link href="css/alertify.min.css" rel="stylesheet" />
        <script src="js/jquery-1.9.1.min.js"></script>
        <script src="js/Crm_Trm_Config_Report.js"></script>
        <script src="js/sweetalert.min.js"></script>
        <script src="js/alertify.min.js"></script>
        <script src="js/alertify.js"></script>
        <asp:HiddenField ID="TrxID" runat="server" />
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                    <h4 class="mb-0">Data Config Report</h4>
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
                                    <%--<h5 class="card-title">Data Config Report</h5>--%>
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
                                        <th>Target</th>
                                        <th>Site</th>
                                        <th>Presentase</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Dynamic rows will be added here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addContactModalLabel">Add Config Report</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div>
                            <div class="mb-3">
                                <label for="addcontact-designation-input" class="form-label">TypeReport</label>
                                <select class="form-select" id="dropdown-TypeReport">
                                    <option>Select</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="addcontact-name-input" class="form-label">Target</label>
                                <input type="text" class="form-control" id="TxtTarget" placeholder="Target">
                            </div>
                            <div class="mb-3">
                                <label for="addcontact-designation-input" class="form-label">Site</label>
                                <select class="form-select" id="dropdown-Site">
                                    <option>Select</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="addcontact-name-input" class="form-label">Presentase</label>
                                <input type="text" class="form-control" id="TXTPresentase" placeholder="Presentase">
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

        <!-- Delete Modal -->
        <div class="modal fade" id="deleteContactModal" tabindex="-1" aria-labelledby="deleteContactModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteContactModalLabel">Delete Config Report</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <p>Are you sure you want to delete this record?</p>
                        <div class="mb-3">
                            <label for="delete-TypeReport" class="form-label">TypeReport</label>
                            <input type="text" class="form-control" id="delete-TypeReport" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="delete-TxtTarget" class="form-label">Target</label>
                            <input type="text" class="form-control" id="delete-TxtTarget" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="delete-Site" class="form-label">Site</label>
                            <input type="text" class="form-control" id="delete-Site" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="delete-TXTPresentase" class="form-label">Presentase</label>
                            <input type="text" class="form-control" id="delete-TXTPresentase" readonly>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger w-sm" onclick="ActionDelete()">Delete</button>
                    </div>
                </div>
            </div>
        </div>


    </asp:Content>