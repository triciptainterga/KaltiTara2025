<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_Agent_SM.aspx.vb" Inherits="UIDESK.Crm_Trx_Agent_SM" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/Crm_Trx_Agent_SM.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxAgentId" runat="server" />
    <asp:HiddenField ID="TrxUserAgentId" runat="server" />
    <asp:HiddenField ID="TrxTransaksiID" runat="server" />
     <asp:HiddenField ID="TrxAccountIDSM" runat="server" />
    <asp:HiddenField ID="TrxTokenMetaAgentSM" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Agent Setting Channel</h4>
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
                                <a href="#" class="btn btn-light" onclick="NewData()">
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
                                        <!-- Cards will be dynamically appended here -->
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
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-agent"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabel">Form Setting Agent Sosial Media Comment And More</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Sosial Media Type <span class="text-danger">*</span></label>
                                    <select class="form-select" id="ComboSosialMedia" onchange="Add_DropdownSosialMedia(1)">
                                        <option>Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Sosial Media Account <span class="text-danger">*</span></label>
                                    <select class="form-select" id="ComboAccount" onchange="Add_DropdownAccountSM(1)">
                                        <option>Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4" style="display:none;">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Maximal Handle Data <span class="text-danger">*</span></label>
                                    <select class="form-select" id="ComboHandle">
                                        <option>Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12" style="overflow-x: scroll;">
                                <table class="table table-primary table-striped mb-0" id="TrxAgent">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px; min-width: 30px;">#</th>
                                            <th style="width: 30px; min-width: 30px;">ID</th>
                                            <th style="width: 150px; min-width: 150px;">UserName</th>
                                            <th style="width: 150px; min-width: 150px;">Name</th>
                                            <th style="width: 150px; min-width: 150px;">Email</th>
                                            <th style="width: 150px; min-width: 150px;">Token</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" id="btnSimpan">Add</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Form Setting Agent Sosial Media Comment And More</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="row">
                            <div class="mb-3">
                                <label for="addcontact-designation-input" class="form-label"></label>
                                <input type="checkbox" id="Agent_Checkbox" class="filled-in" />
                                <label for="Agent_Checkbox">All Agent</label>
                                <input type="hidden" id="HDAgent_Checkbox" runat="server" />
                            </div>
                            <div class="mb-3">
                                <label for="addcontact-designation-input" class="form-label">Sosial Media Type</label>
                                <select class="form-select" id="CmbUpdateSosialMediaType">
                                    <option>Select</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="addcontact-designation-input" class="form-label">Sosial Media Account</label>
                                <select class="form-select" id="CmbUpdateSosialMediaAccount">
                                    <option>Select</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="addcontact-designation-input" class="form-label">Maximal Campaign Data</label>
                                <select class="form-select" id="ComboUpdateHandle">
                                    <option>Select</option>
                                </select>
                            </div>
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
    <div class="modal fade" id="modal-release" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalRelease">Form Release</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-designation-input" class="form-label">Status</label>
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
