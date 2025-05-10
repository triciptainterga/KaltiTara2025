<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Epic_System.aspx.vb" Inherits="UIDESK.Crm_Trm_Epic_System" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Epic_System.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="Hd_Site" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <%--<h5 class="card-title">Configurasi Epic System</h5>--%>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                        <thead>
                            <tr>
                                <th style="width: 30px; min-width: 30px;">ID</th>
                                <th style="width: 150px;">AES</th>
                                <th style="width: 150px;">Aes User</th>
                                <th style="width: 150px;">Aes Password</th>
                                <th style="width: 150px;">Port</th>
                                <th style="width: 150px;">IP Database</th>
                                <th style="width: 150px;">Database User</th>
                                <th style="width: 150px;">Database Password</th>
                                <th style="width: 150px;">Database Name</th>
                                <th style="width: 150px;">Dial Code</th>
                                <th style="width: 150px;">Call History Endpoint</th>
                                <th style="width: 150px;">Agent Endpoint</th>
                                <th style="width: 150px;">Inbound Endpoint</th>
                                <th style="width: 150px;">Outbound Endpoint</th>
                                <th style="width: 150px;">Browser Path</th>
                                <th style="width: 150px;">Theme</th>
                                <th style="width: 150px;">ACW</th>
                                <th style="width: 150px;">PBX Login</th>
                                <th style="width: 150px;">PBX LogOut</th>
                                <th style="width: 150px;">PBX Aux</th>
                                <th style="width: 150px;">PBX AutoIn</th>
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
                                <h5 class="modal-title" id="addContactModalLabel">Form Nomor WhatsApp</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div>
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Nomor Telepon WhatsApp</label>
                                        <input type="text" class="form-control" id="NomorTelepon" placeholder="Nomor Telepon WhatsApp">
                                    </div>
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Site Name</label>
                                        <select id="ComboSite" class="form-select" onchange="OnchangeSite('1')">
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
            </div>
        </div>
    </div>
</asp:Content>
