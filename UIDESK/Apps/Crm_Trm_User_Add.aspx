<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_User_Add.aspx.vb" Inherits="UIDESK.Crm_Trm_User_Add" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_User_Add.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxTokenMeta" runat="server" />
    <style>
        .icon-bg {
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #ccc; /* warna default */
            color: white; /* warna icon */
        }
        .bg-success {
            background-color: #28a745; /* hijau */
        }
        .bg-danger {
            background-color: #dc3545; /* merah */
        }
    </style>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data User Application</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="mb-3">
                                <a href="#" class="btn btn-light" onclick="AddUser()">
                                    <i class="uil uil-plus me-1"></i>+ Add New
                                </a>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end gap-2 mb-3">
                                <div class="search-box ">
                                    <div class="position-relative">
                                        <input type="text" class="form-control bg-light border-light rounded" id="TxtSearchingUserName" placeholder="Search...">
                                        <i class="uil uil-search search-icon"></i>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row" id="DivUserSystem"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-agent"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabel">Form Add User Application</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">User Name</label>
                                    <input type="text" class="form-control" id="TrxUserName" placeholder="User Name">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="TrxPassword" placeholder="Password">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="TrxName" placeholder="Name">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Email</label>
                                    <input type="text" class="form-control" id="TrxEmailAddress" placeholder="Email">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">NIP</label>
                                    <input type="text" class="form-control" id="TrxEmail" placeholder="NIP">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Level User</label>
                                    <select class="form-select" id="cmbLevelUser" onchange="OnchangeCmbLevelUser();">
                                        <option>Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4" style="display: none;">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Department</label>
                                    <select class="form-select" id="cmbDepartment">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Site</label>
                                    <select id="ComboSite" class="form-select" onchange="ChangeSite('1')">
                                        <option value="">Select</option>
                                    </select>
                                    <asp:HiddenField ID="HdSiteUser" runat="server" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Group Agent</label>
                                    <select class="form-select" id="cmbGroupAgent" onchange="ChangeGroupAgent(1)">
                                        <option value="">Select</option>
                                    </select>
                                    <asp:HiddenField ID="HdGroupAgent" runat="server" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Login ID</label>
                                    <input type="text" class="form-control" id="TrxLoginID" placeholder="Login ID">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Status</label>
                                    <select id="cmbStatus" class="form-select">
                                        <option value="">Select</option>
                                        <option value="Y">Active</option>
                                        <option value="N">Non Active</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="divChannel">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <div class="card border shadow-none mb-5">
                                        <div class="card-header d-flex align-items-center">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title rounded-circle bg-soft-primary text-primary">
                                                        <i class="fas fa-list-alt "></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1">
                                                <h5 class="card-title">Channel Transaksi</h5>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <%--     <div class="mb-3">
                                                <label for="contact-info-email-input">E-mail :</label>
                                                <input type="email" class="form-control" id="contact-info-email-input" placeholder="Enter Email">
                                            </div>--%>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input class="form-check-input" type="checkbox" id="checkboxEmail" onclick="EmailCheck(this.checked)">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Email</label>
                                                        <input type="hidden" id="HDEmail" runat="server" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input class="form-check-input" type="checkbox" id="checkboxWA" onclick="WhatsAppCheck(this.checked)">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">WhatsApp</label>
                                                        <input type="hidden" id="HDWA" runat="server" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input class="form-check-input" type="checkbox" id="checkboxInbound" onclick="InboundCheck(this.checked)">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Call</label>
                                                        <input type="hidden" id="HDInbound" runat="server" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input class="form-check-input" type="checkbox" id="checkboxOutbound" onclick="OutboundCheck(this.checked)">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Live Chat</label>
                                                        <input type="hidden" id="HDOutbound" runat="server" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input class="form-check-input" type="checkbox" id="checkboxInstagram" onclick="InstagramCheck(this.checked)">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Instagram</label>
                                                        <input type="hidden" id="HDInstagram" runat="server" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input class="form-check-input" type="checkbox" id="checkboxFacebook" onclick="FacebookCheck(this.checked)">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Facebook</label>
                                                        <input type="hidden" id="HDFacebook" runat="server" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input class="form-check-input" type="checkbox" id="checkboxTwitter" onclick="TwitterCheck(this.checked)">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">X</label>
                                                        <input type="hidden" id="HDTwitter" runat="server" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="margin-top: -10px; display: none;">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <textarea class="form-control" placeholder="Description" id="TrxDescription" name="TrxDescription"></textarea>
                                </div>
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
    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Add Foto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3" style="text-align: center;">
                            <img class="rounded-circle" id="ImageFotoNya" width="300">
                            <%--<img class="rounded-circle" src="../images/card/img3.jpg" alt="Card image cap">--%>
                            <%--<br />
                            <br />
                            <div class="box-body">
                                <div class="text-center">
                                    <h4 class="box-title">
                                        <label id="ValueName"></label>
                                    </h4>
                                </div>
                            </div>--%>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <div class="pull-right">
                        <%--<div class="btn btn-rounded btn-primary btn-file" id="ButtonHeaderAttachment">
                            <i class="fas fa-file-image"></i>&nbsp;Upload<input type="file" name="filesfoto" class="form-control form-control-sm">
                        </div>--%>
                        <input type="file" name="filesfoto" class="form-control">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalagenttype" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelAgentType">Agent Type</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-designation-input" class="form-label">Type</label>
                            <select class="form-select" id="ComboAgentType">
                                <option>Select</option>
                                <option value="1">Senior</option>
                                <option value="0">Junior</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdateAgentType()" id="UpdateAgentType">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalagentalias" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelalias">Form Name Alias</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-designation-input" class="form-label">Name Alias</label>
                               <input type="text" class="form-control" id="TrxNameAlias" placeholder="Name Alias">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdateAgentAlias()" id="UpdateAgentAlias">Submit</button>
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
