<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Kantor.aspx.vb" Inherits="UIDESK.Crm_Trm_Kantor" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Kantor.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-lg-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Kantor</h4>
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
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                <div>
                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="FormKantor()">+ Add New</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-mb-3">
                            <div class="table-responsive">
                                <table class="table align-middle table-nowrap table-check" id="TableKantor">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px; min-width: 30px;">ID</th>
                                            <th scope="col" style="width: 300px;">Nama Kantor</th>
                                            <th scope="col" style="width: 300px;">Telepon</th>
                                            <th scope="col" style="width: 300px;">Email</th>
                                            <th scope="col" style="width: 300px;">Alamat</th>
                                            <th scope="col" style="width: 50px;">Action</th>
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
    <div class="modal fade" id="FormKantor" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalKantor">Form Kantor</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Nama</label>
                            <input type="text" class="form-control" id="Kantor_Nama" placeholder="Nama">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Email</label>
                            <input type="text" class="form-control" id="Kantor_Email" placeholder="Email">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Telepon</label>
                            <input type="text" class="form-control" id="Kantor_Telepon" placeholder="Telepon">
                        </div>
                        <div class="mb-3">
                            <%--<label for="addcontact-name-input" class="form-label">Telepon</label>--%>
                            <%--                            <textarea class="form-control" id="Kantor_Alamat" name="Kantor_Alamat" placeholder="Alamat" row="8"/>--%>
                            <textarea id="Kantor_Alamat" name="Kantor_Alamat" class="form-control" rows="10" placeholder="Alamat.."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanKantor()" id="SimpanKantor">Submit</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdateKantor()" id="UpdateKantor">Update</button>
                     <button type="button" class="btn btn-primary w-sm" onclick="ActionDeleteKantor()" id="DeleteKantor">Delete</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
