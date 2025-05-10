<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Epic.aspx.vb" Inherits="UIDESK.Crm_Trm_Epic" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Epic.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        .modal-body {
            max-height: 72vh; /* Set max height to 70% of the viewport height */
            overflow-y: auto; /* Enable vertical scrolling */
        }

        .modal-dialog {
            max-width: 70%; /* Adjust this value as needed */
        }
    </style>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Setting Epic</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table align-middle table-nowrap table-check">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>AES</th>
                                            <th>Aes User</th>
                                            <th>Aes Password</th>
                                            <th>Port</th>
                                            <th>IP DB</th>
                                            <th>DB User</th>
                                            <th>DB Password</th>
                                            <th>DB Name</th>
                                            <th>Agent Endpoint</th>
                                            <th>Inbound Endpoint</th>
                                            <th>Browser Path</th>
                                            <th>Theme</th>
                                            <th>ACW</th>
                                            <th>PBX Login</th>
                                            <th>PBX Logout</th>
                                            <th>PBX Aux</th>
                                            <th>PBX Auto In</th>
                                            <th>Action</th>
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
    <!-- Edit Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg mt-5">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Edit Data Setting Epic</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editForm">
                        <div class="row">
                            <div class="col mb-3">
                                <label for="editID" class="form-label">ID</label>
                                <input type="text" class="form-control" id="editID" readonly>
                            </div>
                            <div class="col mb-3">
                                <label for="editAES" class="form-label">AES</label>
                                <input type="text" class="form-control" id="editAES">
                            </div>
                            <div class="col mb-3">
                                <label for="editAesUser" class="form-label">Aes User</label>
                                <input type="text" class="form-control" id="editAesUser">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mb-3">
                                <label for="editAesPassword" class="form-label">Aes Password</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="editAesPassword">
                                    <span class="input-group-text" onclick="togglePassword('editAesPassword')">
                                        <i class="fas fa-eye" id="icon-editAesPassword" style="cursor: pointer;"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="col mb-3">
                                <label for="editPort" class="form-label">Port</label>
                                <input type="text" class="form-control" id="editPort">
                            </div>
                            <div class="col mb-3">
                                <label for="editIPDb" class="form-label">IP DB</label>
                                <input type="text" class="form-control" id="editIPDb">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mb-3">
                                <label for="editDbUser" class="form-label">DB User</label>
                                <input type="text" class="form-control" id="editDbUser">
                            </div>
                            <div class="col mb-3">
                                <label for="editDbPassword" class="form-label">DB Password</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="editDbPassword">
                                    <span class="input-group-text" onclick="togglePassword('editDbPassword')">
                                        <i class="fas fa-eye" id="icon-editDbPassword" style="cursor: pointer;"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="col mb-3">
                                <label for="editDbName" class="form-label">DB Name</label>
                                <input type="text" class="form-control" id="editDbName">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mb-3">
                                <label for="editAgentEndpoint" class="form-label">Agent Endpoint</label>
                                <input type="text" class="form-control" id="editAgentEndpoint">
                            </div>
                            <div class="col mb-3">
                                <label for="editInboundEndpoint" class="form-label">Inbound Endpoint</label>
                                <input type="text" class="form-control" id="editInboundEndpoint">
                            </div>
                            <div class="col mb-3">
                                <label for="editBrowserPath" class="form-label">Browser Path</label>
                                <input type="text" class="form-control" id="editBrowserPath">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mb-3">
                                <label for="editTheme" class="form-label">Theme</label>
                                <input type="text" class="form-control" id="editTheme">
                            </div>
                            <div class="col mb-3">
                                <label for="editACW" class="form-label">ACW</label>
                                <input type="text" class="form-control" id="editACW">
                            </div>
                            <div class="col mb-3">
                                <label for="editPbxLogin" class="form-label">PBX Login</label>
                                <input type="text" class="form-control" id="editPbxLogin">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mb-3">
                                <label for="editPbxLogOut" class="form-label">PBX Logout</label>
                                <input type="text" class="form-control" id="editPbxLogOut">
                            </div>
                            <div class="col mb-3">
                                <label for="editPbxAux" class="form-label">PBX Aux</label>
                                <input type="text" class="form-control" id="editPbxAux">
                            </div>
                            <div class="col mb-3">
                                <label for="editPbxAutoIn" class="form-label">PBX Auto In</label>
                                <input type="text" class="form-control" id="editPbxAutoIn">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="saveChangesBtn">Save changes</button>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
