<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Notification.aspx.vb" Inherits="UIDESK.Crm_Trm_Notification" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Notification.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxDepartmentID" runat="server" />
    <asp:HiddenField ID="TrxVendorID" runat="server" />
    <%--  <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Ticket Notification System</h4>
            </div>
        </div>
    </div>--%>
    <div class="d-xl-flex">
        <div class="w-100">
            <div class="d-md-flex">
                <div class="card filemanager-sidebar me-md-3">
                    <div class="card-body">
                        <div class="d-flex flex-column h-100">
                            <div class="card border shadow-none mb-2">
                                <a href="javascript: void(0);" class="text-body">
                                    <div class="p-2">
                                        <div class="d-flex">
                                            <div class="avatar-sm align-self-center me-2">
                                                <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                    <i class="fas fa-folder-plus"></i>
                                                </div>
                                            </div>
                                            <div class="overflow-hidden me-auto">
                                                <h5 class="font-size-13 text-truncate mb-1">Ticket Create</h5>
                                                <p class="text-muted text-truncate mb-0">System</p>
                                            </div>
                                            <div class="d-flex flex-wrap gap-2">
                                                <input type="checkbox" id="SettingTicketCreate" switch="success" checked="checked" onclick="TicketCreate(this.checked)">
                                                <label for="SettingTicketCreate" data-on-label="On" data-off-label="Off" class="mb-0"></label>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="card border shadow-none mb-2" style="display:none;">
                                <a href="javascript: void(0);" class="text-body">
                                    <div class="p-2">
                                        <div class="d-flex">
                                            <div class="avatar-sm align-self-center me-2">
                                                <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                    <i class="fas fa-circle-notch"></i>
                                                </div>
                                            </div>
                                            <div class="overflow-hidden me-auto">
                                                <h5 class="font-size-13 text-truncate mb-1">Ticket Over SLA</h5>
                                                <p class="text-muted text-truncate mb-0">System</p>
                                            </div>
                                            <div class="d-flex flex-wrap gap-2">
                                                <input type="checkbox" id="SettingTicketOver" switch="success" checked="checked" onclick="TicketOver(this.checked)">
                                                <label for="SettingTicketOver" data-on-label="On" data-off-label="Off" class="mb-0"></label>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="card border shadow-none mb-2">
                                <a href="javascript: void(0);" class="text-body">
                                    <div class="p-2">
                                        <div class="d-flex">
                                            <div class="avatar-sm align-self-center me-2">
                                                <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                    <i class="fas fa-check-circle"></i>
                                                </div>
                                            </div>
                                            <div class="overflow-hidden me-auto">
                                                <h5 class="font-size-13 text-truncate mb-1">Ticket Close</h5>
                                                <p class="text-muted text-truncate mb-0">System</p>
                                            </div>
                                            <div class="d-flex flex-wrap gap-2">
                                                <input type="checkbox" id="SettingTicketClosed" switch="success" checked="checked" onclick="TicketClosed(this.checked)">
                                                <label for="SettingTicketClosed" data-on-label="On" data-off-label="Off" class="mb-0"></label>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="card border shadow-none mb-2" style="display:none;">
                                <a href="javascript: void(0);" class="text-body">
                                    <div class="p-2">
                                        <div class="d-flex">
                                            <div class="avatar-sm align-self-center me-2">
                                                <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                    <i class="far fa-clone"></i>
                                                </div>
                                            </div>
                                            <div class="overflow-hidden me-auto">
                                                <h5 class="font-size-13 text-truncate mb-1">Ticket Escalation</h5>
                                                <p class="text-muted text-truncate mb-0">System</p>
                                            </div>
                                            <div class="d-flex flex-wrap gap-2">
                                                <input type="checkbox" id="SettingTicketEskalasi" switch="success" checked="checked" onclick="TicketEskalasi(this.checked)">
                                                <label for="SettingTicketEskalasi" data-on-label="On" data-off-label="Off" class="mb-0"></label>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="card border shadow-none mb-2">
                                <a href="javascript: void(0);" class="text-body">
                                    <div class="p-2">
                                        <div class="d-flex">
                                            <div class="avatar-sm align-self-center me-2">
                                                <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                    <i class="fas fa-folder-plus"></i>
                                                </div>
                                            </div>
                                            <div class="overflow-hidden me-auto">
                                                <h5 class="font-size-13 text-truncate mb-1">Ticket Create</h5>
                                                <p class="text-muted text-truncate mb-0">Customer</p>
                                            </div>
                                            <div class="d-flex flex-wrap gap-2">
                                                <input type="checkbox" id="switch5" switch="success" checked="">
                                                <label for="switch5" data-on-label="On" data-off-label="Off" class="mb-0"></label>
                                                <%--      <input type="checkbox" id="switch4" switch="success" checked="">
                                                    <label for="switch4" data-on-label="Yes" data-off-label="No" class="mb-0"></label>--%>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="card border shadow-none mb-2">
                                <a href="javascript: void(0);" class="text-body">
                                    <div class="p-2">
                                        <div class="d-flex">
                                            <div class="avatar-sm align-self-center me-2">
                                                <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                                    <i class="fas fa-check-circle"></i>
                                                </div>
                                            </div>
                                            <div class="overflow-hidden me-auto">
                                                <h5 class="font-size-13 text-truncate mb-1">Ticket Close</h5>
                                                <p class="text-muted text-truncate mb-0">Customer</p>
                                            </div>
                                            <div class="d-flex flex-wrap gap-2">
                                                <input type="checkbox" id="switch6" switch="success" checked="">
                                                <label for="switch6" data-on-label="On" data-off-label="Off" class="mb-0"></label>
                                                <%--      <input type="checkbox" id="switch4" switch="success" checked="">
                                                    <label for="switch4" data-on-label="Yes" data-off-label="No" class="mb-0"></label>--%>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-100">
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
                            <div>
                                <div class="row" id="divUserNotification"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-agent"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabel">Form Email Notification Address</h5>
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
                                    <select id="cmbUserName" class="form-select" onchange="getWS_CategoryType(1);">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Email Address</label>
                                    <input type="text" class="form-control" id="TxtEmailAddress" placeholder="Email Address">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Status</label>
                                    <select id="cmbStatus" class="form-select">
                                        <option value="">Select</option>
                                        <option value="YES">Yes</option>
                                        <option value="NO">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Level User</label>
                                    <input type="text" class="form-control" id="TxtLevelUser" placeholder="Level User">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Department</label>
                                    <input type="text" class="form-control" id="TxtDepartment" placeholder="Department">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Group Agent</label>
                                    <input type="text" class="form-control" id="TxtVendor" placeholder="Group Agent">
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
                                                <h5 class="card-title">Ticket Notification</h5>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input type="checkbox" id="checkboxCreate" class="form-check-input" onclick="CheckCreate(this.checked)">
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Ticket Create</label>
                                                        <input type="hidden" id="HdTicketCreate" runat="server" value="NO" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3" style="display:none;">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input type="checkbox" class="form-check-input" id="checkboxOver" onclick="CheckOver(this.checked)">
                                                        <label for="flexSwitchCheckChecked" class="form-check-label">Ticket Over SLA</label>
                                                        <input type="hidden" id="HdTicketOverSLA" runat="server" value="NO" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input type="checkbox" class="form-check-input" id="checkboxClosed" onclick="CheckClosed(this.checked)">
                                                        <label for="flexSwitchCheckChecked" class="form-check-label">Ticket Closed</label>
                                                        <input type="hidden" id="HdTicketClosed" runat="server" value="NO" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3" style="display:none;">
                                                    <div class="form-check form-switch form-switch-md mb-2">
                                                        <input type="checkbox" class="form-check-input" id="checkboxEscalation" onclick="CheckEscalation(this.checked)">
                                                        <label for="flexSwitchCheckChecked" class="form-check-label">Ticket Escalation</label>
                                                        <input type="hidden" id="HdTicketEscalation" runat="server" value="NO" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
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
</asp:Content>
