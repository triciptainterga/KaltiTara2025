<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Perusahaan.aspx.vb" Inherits="UIDESK.Crm_Trm_Perusahaan" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Perusahaan.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Perusahaan</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table align-middle table-nowrap table-check" id="TablePerusahaan">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px; min-width: 30px;">ID</th>
                                            <th>Perusahaan</th>
                                            <th style="width: 250PX; min-width: 250PX;">Nomor Telepon</th>
                                            <th style="width: 250PX; min-width: 250PX;">Email</th>
                                            <th style="width: 250PX; min-width: 250PX;">NPWP</th>
                                            <%--<th style="width: 30px; min-width: 30px;">Action</th>--%>
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
                                    <h5 class="modal-title" id="addContactModalLabel">Form Perusahaan</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body p-4">
                                    <div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Nama</label>
                                            <input type="text" class="form-control" id="Nama">
                                        </div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Nomor Telepon</label>
                                            <input type="text" class="form-control" id="NomorTelepon">
                                        </div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Email</label>
                                            <input type="text" class="form-control" id="Email">
                                        </div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">NPWP</label>
                                            <input type="text" class="form-control" id="NPWP">
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
