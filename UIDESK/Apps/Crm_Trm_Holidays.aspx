<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Holidays.aspx.vb" Inherits="UIDESK.Crm_Trm_Holidays" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Holidays.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Holidays</h4>
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
                                <%--<h5 class="card-title">Data Holidays</h5>--%>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                <div>
                                    <a href="#" class="btn btn-light" data-bs-target="#addContactModal" onclick="Tambah()"><i class="uil uil-plus me-1"></i>+ Add New</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                            <thead>
                                <tr>
                                    <th style="width: 30px; min-width: 30px;">ID</th>
                                    <th style="width: 400px; min-width: 400px;">Name</th>
                                    <th style="width: 200px; min-width: 200px;">Start Date</th>
                                    <th style="width: 200px; min-width: 200px;">End Date</th>
                                    <th style="width: 200px; min-width: 200px;">Status</th>
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
                                    <h5 class="modal-title" id="addContactModalLabel">Form Holidays</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body p-4">
                                    <div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Holiday Name</label>
                                            <input type="text" class="form-control" id="Holiday_Name" placeholder="Holiday Name">
                                        </div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Start Date</label>
                                            <input type="date" class="form-control" id="Holiday_Start" placeholder="Start Date">
                                        </div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">End Date</label>
                                            <input type="date" class="form-control" id="Holiday_End" placeholder="End Date">
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
</asp:Content>
