<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_Agent_Inbound.aspx.vb" Inherits="UIDESK.Crm_Trx_Agent_Inbound" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/Crm_Trx_Agent_Inbound.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Agent Setting</h4>
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
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row d-flex flex-nowrap justify-content-center" id="divCardSite" style="gap: 15px;">
                                        <!-- Cards will be appended here dynamically -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>       
                    <div class="row" id="divUserNotification"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Agent Call</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-designation-input" class="form-label">Type</label>
                            <select class="form-select" id="cmbType" onchange="Get_TypeAgent(1);">
                                <option>Select</option>
                                <option value="1">Inbound Call</option>
                                <option value="2">Outbound Call</option>
                                <option value="3">Inbound Call & Outbound Call</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-designation-input" class="form-label">Nama Agent</label>
                            <select class="form-select" id="CmbAgent" onchange="Get_CmbAgent(1);">
                                <option>Select</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-file-input" class="form-label">EPIC Password</label>
                            <input type="text" class="form-control" id="EPIC_Password" placeholder="EPIC Password" />
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-file-input" class="form-label">PABX User</label>
                            <input type="text" class="form-control" id="EPIC_PABX_User" placeholder="User PABX" />
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-file-input" class="form-label">PABX Password</label>
                            <input type="text" class="form-control" id="EPIC_PABX_Password" placeholder="Password PABX" />
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-file-input" class="form-label">PABX Pin</label>
                            <input type="text" class="form-control" id="EPIC_PABX_Pin" placeholder="PIN PABX" />
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
    <div class="modal fade" id="modal-release" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalRelease">Form Schedule</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-designation-input" class="form-label">State</label>
                            <select class="form-select" id="CmbState">
                                <option>Select</option>
                                <option value="1">Active</option>
                                <option value="0">Non Active</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionReleaseSchedule()" id="ReleaseSchedule">Submit</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
