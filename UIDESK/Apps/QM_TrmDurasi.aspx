<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QM_TrmDurasi.aspx.vb" Inherits="UIDESK.QM_TrmDurasi" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QM_TrmDurasi.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Durasi</h4>
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
                                <table class="table align-middle table-nowrap table-check" id="TableDurasi">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px; min-width: 30px;">ID</th>
                                            <th style="width: 300px; min-width: 300px;">Site</th>
                                            <th style="width: 300px; min-width: 300px;">Durasi Start</th>
                                            <th style="width: 300px; min-width: 300px;">Durasi End</th>
                                            <th style="width: 30px; min-width: 30px;">Action</th>
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
                                    <h5 class="modal-title" id="addContactModalLabel">Form Durasi</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body p-4">
                                    <div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Site</label>
                                            <input type="text" class="form-control" id="Site" placeholder="Site">
                                        </div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Durasi Start</label>
                                            <input type="text" class="form-control" id="DurasiNya" placeholder="Durasi Start">
                                        </div>
                                         <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Durasi End</label>
                                            <input type="text" class="form-control" id="DurasiEnd" placeholder="Durasi End">
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
