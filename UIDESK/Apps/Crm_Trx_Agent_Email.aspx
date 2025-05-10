<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_Agent_Email.aspx.vb" Inherits="UIDESK.Crm_Trx_Agent_Email" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_Agent_Email.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxAgentId" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Setting Agent Email</h4>
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
                                <a href="#" class="btn btn-light" onclick="Tambah()">
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
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-agent"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabel">Form Setting Agent Email</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <%--<div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Account Email</label>
                                    <select class="form-select" id="CmbAccountEmail">
                                        <option>Select</option>
                                    </select>
                                </div>
                            </div>--%>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Handle Data Email</label>
                                    <select class="form-select" id="CmbMaxCampaign">
                                        <option>Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-primary table-striped mb-0" id="TrxAgent">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px; min-width: 30px;">#</th>
                                            <th style="width: 30px; min-width: 30px;">ID</th>
                                            <th style="width: 250px; min-width: 250px;">UserName</th>
                                            <th style="width: 250px; min-width: 250px;">Name</th>
                                            <th style="width: 250px; min-width: 250px;">Email</th>
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
                    <h5 class="modal-title" id="addContactModalLabel">Form Setting Agent Email</h5>
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
                                <label for="addcontact-designation-input" class="form-label">Account</label>
                                <%-- <select class="form-select" id="CmbUpdateAccountEmail">
                                    <option>Select</option>
                                </select>--%>
                                <input type="text" class="form-control" id="CmbUpdateAccountEmail">
                            </div>
                            <div class="mb-3">
                                <label for="addcontact-designation-input" class="form-label">Maximal Data</label>
                                <select class="form-select" id="CmbUpdateMaxCampaign">
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
                            <label for="addcontact-designation-input" class="form-label">Sosial Media Type</label>
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
