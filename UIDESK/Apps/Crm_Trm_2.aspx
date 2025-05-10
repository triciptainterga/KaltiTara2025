<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_2.aspx.vb" Inherits="UIDESK.Crm_Trm_2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_2.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-lg-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Sub Menu</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <%--<div class="mb-3">
                                <h5 class="card-title">Data Sub Menu Application</h5>
                            </div>--%>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                <div>
                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addContactModal">+ Add New</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                            <thead>
                                <tr>
                                    <th style="width: 30px; min-width: 30px;">ID</th>
                                    <th style="width: 150px; min-width: 150px;">System</th>
                                    <th style="width: 150px; min-width: 150px;">Menu</th>
                                    <th style="width: 150px; min-width: 150px;">Sub Menu Name</th>
                                    <th style="width: 150px; min-width: 150px;">Url</th>
                                    <th style="width: 150px; min-width: 150px;">Icon</th>
                                    <th style="width: 150px; min-width: 150px;">Status</th>
                                    <th style="width: 30px; min-width: 30px;">Action</th>
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
    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Form Sub Menu Application</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-designation-input" class="form-label">System</label>
                            <select id="CmbSystem" class="form-select" onchange="getWS_CmbSystem(1);">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Menu Name</label>
                            <select id="cmbMenu" class="form-select" onchange="getWS_CategoryType(1);">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Sub Menu Name</label>
                            <input type="text" class="form-control" id="TxtSubMenuName" placeholder="Sub Menu Name">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Icon</label>
                            <input type="text" class="form-control" id="TxtIcon" placeholder="Icon">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Type</label>
                            <select id="cmbType" class="form-select">
                                <option value="">Select</option>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Url</label>
                            <input type="text" class="form-control" id="TxtUrl" placeholder="Url">
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
</asp:Content>
