<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Adm_Trx_Create_User.aspx.vb" Inherits="UIDESK.Adm_Trx_Create_User" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Adm_Trx_Create_User.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>

    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div>
                        <%--<ul class="wizard-nav mb-5">
                            <li class="wizard-list-item">
                                <div class="list-item active">
                                    <div class="step-icon" data-bs-toggle="tooltip" data-bs-placement="top">
                                        <i class="uil uil-clipboard-notes"></i>
                                    </div>
                                </div>
                            </li>
                            <li class="wizard-list-item">
                                <div class="list-item">
                                    <div class="step-icon" data-bs-toggle="tooltip" data-bs-placement="top">
                                        <i class="uil uil-users-alt"></i>
                                    </div>
                                </div>
                            </li>

                            <li class="wizard-list-item">
                                <div class="list-item">
                                    <div class="step-icon" data-bs-toggle="tooltip" data-bs-placement="top">
                                        <i class="uil uil-paperclip"></i>
                                    </div>
                                </div>
                            </li>
                        </ul>--%>
                        <!-- wizard-nav -->
                        <div class="wizard-tab" style="display: block;">
                            <%-- <div class="text-left mb-4">
                                <h5><i class="uil uil-users-alt"></i>Add User</h5>
                                <p class="card-title-desc">Fill all information below</p>
                                <hr />
                            </div>--%>
                            <div>
                                <div class="mb-3">
                                    <label for="Adm_UserName" class="form-label">Username</label>
                                    <input id="Adm_UserName" type="text" class="form-control" placeholder="Enter Username">
                                </div>
                                <div class="mb-3">
                                    <label for="Adm_Name" class="form-label">Name</label>
                                    <input id="Adm_Name" type="text" class="form-control" placeholder="Enter Name">
                                </div>
                                <div class="mb-3">
                                    <label for="Adm_Email" class="form-label">Email</label>
                                    <input id="Adm_Email" type="text" class="form-control" placeholder="Enter Email">
                                </div>
                                <div class="mb-3">
                                    <label>Level User</label>
                                    <select class="form-select shadow-none" id="Adm_Cmb_LevelUser" onchange="Change_Adm_Cmb_LevelUser('1')">
                                        <option selected="">Select</option>
                                        <option value="Agent">Agent</option>
                                        <option value="Team Leader">Team Leader</option>
                                        <option value="Department">Department</option>
                                        <option value="Supervisor">Supervisor</option>
                                        <option value="QA">QA</option>
                                        <option value="Admin Release">Admin Release</option>
                                        <option value="Sys Admin">Sys Admin</option>
                                        <option value="Super Admin">Super Admin</option>
                                    </select>
                                </div>
                                <div class="mb-3" id="GroupAgentUser">
                                    <label>Group</label>
                                    <select class="form-select shadow-none">
                                        <option selected="">Select</option>
                                        <option value="Bravo">Group Agent A</option>
                                        <option value="Bravo">Group Agent B</option>
                                        <option value="Bravo">Group Agent C</option>
                                    </select>
                                </div>
                                <div class="mb-3" id="Adm_ApplicationSysAdmin">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row" id="Adm_SystemSysAdmin">
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input class="form-check-input" type="checkbox" id="TicketingSwitchCheckChecked" onclick="TicketingSystemChange(this.checked)">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Ticketing System</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input class="form-check-input" type="checkbox" id="QualitySwitchCheckChecked">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Quality Monitoring</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input class="form-check-input" type="checkbox" id="ForecastingSwitchCheckChecked">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Forecasting</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input class="form-check-input" type="checkbox" id="SchedulingSwitchCheckChecked">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Agent Scheduling</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3" id="Adm_ApplicationAgent">
                                    <div class="card">
                                        <div class="card-header justify-content-between d-flex align-items-center">
                                            <h4 class="card-title">Application Channel</h4>
                                        </div>
                                        <div class="card-body">
                                            <!-- Nav tabs -->
                                            <ul class="nav nav-tabs nav-justified" role="tablist">
                                                <li class="nav-item" role="presentation">
                                                    <a class="nav-link active" data-bs-toggle="tab" href="#navtabs2-home" role="tab" aria-selected="true">
                                                        <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                                        <span class="d-none d-sm-block">Ticketing System</span>
                                                    </a>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-profile" role="tab" aria-selected="false" tabindex="-1">
                                                        <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                                        <span class="d-none d-sm-block">Quality Monitoring</span>
                                                    </a>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-messages" role="tab" aria-selected="false" tabindex="-1">
                                                        <span class="d-block d-sm-none"><i class="far fa-envelope"></i></span>
                                                        <span class="d-none d-sm-block">Forecasting</span>
                                                    </a>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-settings" role="tab" aria-selected="false" tabindex="-1">
                                                        <span class="d-block d-sm-none"><i class="fas fa-cog"></i></span>
                                                        <span class="d-none d-sm-block">Agent Scheduling</span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <br />
                                            <div class="tab-content">
                                                <div class="tab-pane active" id="navtabs2-home" role="tabpanel">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row" id="Adm_ChannelAgent">
                                                                <div class="col-md-2">
                                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                                        <input class="form-check-input" type="checkbox" id="CallSwitchCheckChecked" onclick="CheckCall(this.checked)">
                                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Call</label>
                                                                        <input type="hidden" id="HdCall" runat="server" value="NO" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                                        <input class="form-check-input" type="checkbox" id="EmailSwitchCheckChecked" onclick="CheckEmail(this.checked)">
                                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Email</label>
                                                                        <input type="hidden" id="HdEmail" runat="server" value="NO" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                                        <input class="form-check-input" type="checkbox" id="WhatsAppSwitchCheckChecked" onclick="CheckWhatsApp(this.checked)">
                                                                        <label class="form-check-label" for="flexSwitchCheckChecked">WhatsApp</label>
                                                                        <input type="hidden" id="HdWhatsApp" runat="server" value="NO" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                                        <input class="form-check-input" type="checkbox" id="InstagramSwitchCheckChecked" onclick="CheckInstagram(this.checked)">
                                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Instagram</label>
                                                                        <input type="hidden" id="HdInstagram" runat="server" value="NO" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                                        <input class="form-check-input" type="checkbox" id="FacebookSwitchCheckChecked" onclick="CheckFacebook(this.checked)">
                                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Facebook</label>
                                                                        <input type="hidden" id="HdFacebook" runat="server" value="NO" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                                        <input class="form-check-input" type="checkbox" id="ChatSwitchCheckChecked" onclick="CheckChat(this.checked)">
                                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Live Chat</label>
                                                                        <input type="hidden" id="HdChat" runat="server" value="NO" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="navtabs2-profile" role="tabpanel">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <label for="QA_Adm_LoginID" class="form-label">Login ID</label>
                                                                    <input id="QA_Adm_LoginID" type="text" class="form-control" placeholder="Enter Login ID">
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label for="QA_Adm_Extension" class="form-label">Extension</label>
                                                                    <input id="QA_Adm_Extension" type="text" class="form-control" placeholder="Enter Extension">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="navtabs2-messages" role="tabpanel">
                                                </div>
                                                <div class="tab-pane" id="navtabs2-settings" role="tabpanel">
                                                </div>
                                            </div>
                                            <br />
                                            <div class="card">
                                                <div class="table-responsive" id="ResultTableChannel">
                                                    <table class="table mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th style="width: 10%;">#</th>
                                                                <th style="width: 35%;">Channel</th>
                                                                <th style="width: 35%;">Account</th>
                                                                <th style="width: 10%;">Handle</th>
                                                                <th style="width: 10%;">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">1</th>
                                                                <td>Email</td>
                                                                <td>bravo@go.id</td>
                                                                <td>100</td>
                                                                <td><i class="fa fa-times-circle text-danger"></i></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">2</th>
                                                                <td>WhatsApp</td>
                                                                <td>bravo1500</td>
                                                                <td>100</td>
                                                                <td><i class="fa fa-times-circle text-danger"></i></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">3</th>
                                                                <td>Facebook</td>
                                                                <td>bravo1500</td>
                                                                <td>100</td>
                                                                <td><i class="fa fa-times-circle text-danger"></i></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3" id="Adm_ApplicationTeamLeader">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                                <div>
                                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="AddGroupAgent()">+ Add Group Agent</a>
                                                </div>
                                            </div>
                                            <div class="row" id="DivTeamLeaderGroupAgent">
                                                <div class="mb-3">
                                                    <div class="card" style="margin-bottom: -20px;">
                                                        <div class="table-responsive">
                                                            <table class="table mb-0">
                                                                <thead>
                                                                    <tr>
                                                                        <th style="width: 10%;">#</th>
                                                                        <th style="width: 80%;">Group Name</th>
                                                                        <th style="width: 10%;">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">1</th>
                                                                        <td>Group A</td>
                                                                        <td><i class="fa fa-times-circle text-danger"></i></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">2</th>
                                                                        <td>Group B</td>
                                                                        <td><i class="fa fa-times-circle text-danger"></i></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">3</th>
                                                                        <td>Group C</td>
                                                                        <td><i class="fa fa-times-circle text-danger"></i></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3" id="Adm_ApplicationDepartment">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label>Department</label>
                                            <select class="form-select shadow-none">
                                                <option selected="">Select</option>
                                                <option value="Bravo">Department IT</option>
                                                <option value="Bravo">Department Operation</option>
                                                <option value="Bravo">Department Finance</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label>Site</label>
                                    <select class="form-select shadow-none">
                                        <option selected="">Select</option>
                                        <option value="Pusat">Pusat</option>
                                        <option value="Soekarno Hatta">Soekarno Hatta</option>
                                        <option value="Tanjung Priok">Tanjung Priok</option>
                                        <option value="Pasar Baru">Pasar Baru</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <%--  <div class="d-flex align-items-start gap-3 mt-4">
                            <button type="button" class="btn btn-primary w-sm" id="prevBtn" onclick="nextPrev(-1)" style="display: none;">Previous</button>
                            <button type="button" class="btn btn-primary w-sm ms-auto" id="nextBtn" onclick="nextPrev(1)">Next</button>
                        </div>--%>
                        <div class="modal-footer">
                            <div class="btn-group text-right" role="group" aria-label="Button group with nested dropdown">
                                <button type="button" class="btn btn-soft-danger w-sm" onclick="ButtonActionCancel()"><i class="fa fa-times-circle"></i>&nbsp;Cancel</button>
                                <button type="button" class="btn btn-soft-primary w-sm" onclick="ButtonActionSimpanUser('Approved')"><i class="fa fa-save"></i>&nbsp;Submit</button>
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
                    <h5 class="modal-title" id="addContactModalLabel">Form Channel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="row">
                        <div class="mb-3">
                            <label>Account</label>
                            <select class="form-select shadow-none">
                                <option selected="">Select</option>
                                <option value="Bravo">Bravo</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label>Max Handle</label>
                            <select class="form-select shadow-none">
                                <option selected="">Select</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanChannelEmail()" id="SimpanChannelEmail">Add</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModalCall" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalChannelCall">Form Call</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="row">
                        <div class="mb-3">
                            <label for="CRM_Adm_LoginID" class="form-label">Login ID</label>
                            <input id="CRM_Adm_LoginID" type="text" class="form-control" placeholder="Enter Login ID">
                        </div>
                        <div class="mb-3">
                            <label for="CRM_Adm_Extension" class="form-label">Extension</label>
                            <input id="CRM_Adm_Extension" type="text" class="form-control" placeholder="Enter Extension">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanChannelCall()" id="SimpanChannelCall">Add</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModalGroupAgent" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalTLGroupAgent">Form Group Agent</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="row">
                        <div class="mb-3">
                            <label>Group Agent</label>
                            <select class="form-select shadow-none">
                                <option selected="">Select</option>
                                <option value="Bravo">Group Agent A</option>
                                <option value="Bravo">Group Agent B</option>
                                <option value="Bravo">Group Agent C</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" id="TLSimpan" onclick="TeamLeader_AddGroupAgent()">Add</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
