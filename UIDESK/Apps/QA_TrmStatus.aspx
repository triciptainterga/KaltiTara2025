<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_TrmStatus.aspx.vb" Inherits="UIDESK.QA_TrmStatus" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QA_TrmStatus.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="card">
        <div class="card-body">
     <%--       <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                        <div>
                            <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Tambah()">+ Add New</a>
                        </div>
                    </div>
                </div>
            </div>--%>
            <div class="table-responsive">
                <table id="TableStatusQM" class="table align-middle table-nowrap table-check" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                    <thead>
                        <tr>
                            <th style="width: 30px;">ID</th>
                            <th style="width: 500px;">Status</th>
                            <th style="width: 200px;">User Create</th>
                            <th style="width: 200px;">Date Create</th>
                            <%--<th style="width: 50px;">Action</th>--%>
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
                    <h5 class="modal-title" id="addContactModalLabel">Form Status</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Status</label>
                             <input type="text" class="form-control" id="txt_status" placeholder="Status">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Add</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
