<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_User_Management.aspx.vb" Inherits="UIDESK.QA_User_Management" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QA_User_Management.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data User Access</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="mb-3">
                                <%--<label for="addcontact-designation-input" class="form-label">Level User</label>--%>
                                <select class="form-select" id="cmbLevelUser" onchange="OnchangeCmbLevelUser();">
                                    <option>Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                <div>
                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="AddUser()">+ Add New</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mb-3">
                                <div class="table-responsive">
                                    <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                                        <thead>
                                            <tr>
                                                <th style="width: 30px; min-width: 30px;">ID</th>
                                                <th style="width: 150px; min-width: 150px;">Level User</th>
                                                <th style="width: 150px; min-width: 150px;">Menu Level 1</th>
                                                <th style="width: 150px; min-width: 150px;">Menu Level 2</th>
                                                <th style="width: 150px; min-width: 150px;">Menu Level 3</th>
                                                <th style="width: 150px; min-width: 150px;">User Create</th>
                                                <th style="width: 150px; min-width: 150px;">Date Create</th>
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
    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Form Setting Menu Application</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="mb-3">
                        <label for="addcontact-designation-input" class="form-label">System</label>
                        <select id="CmbSystem" class="form-select" onchange="getWS_CmbSystem(1);">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="addcontact-designation-input" class="form-label">Menu</label>
                        <select id="cmbMenu1" class="form-select" onchange="getWS_CategoryType(1);">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="addcontact-designation-input" class="form-label">Sub Menu</label>
                        <select id="cmbMenu2" class="form-select" onchange="getWS_CategoryTypeDetail(1);">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3" style="display: none;">
                        <label for="addcontact-designation-input" class="form-label">Menu Level 3</label>
                        <select id="cmbMenu3" class="form-select">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mb-3">
                                <label for="addcontact-designation-input" class="form-label">Description</label>
                                <textarea class="form-control" placeholder="Description" id="TrxDescription" name="TrxDescription"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Add</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var TrxDescription = CKEDITOR.replace('TrxDescription');
        TrxDescription.config.height = 150;
        TrxDescription.config.toolbar = 'Basic';
        TrxDescription.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
