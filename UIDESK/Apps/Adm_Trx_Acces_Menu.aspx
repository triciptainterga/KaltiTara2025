<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Adm_Trx_Acces_Menu.aspx.vb" Inherits="UIDESK.Adm_Trx_Acces_Menu" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Adm_Trx_Acces_Menu.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="mt-2">
                        <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
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
                                <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-settings" role="tab" aria-selected="false" tabindex="-1">
                                    <span class="d-block d-sm-none"><i class="fas fa-cog"></i></span>
                                    <span class="d-none d-sm-block">Agent Scheduling</span>
                                </a>
                            </li>
                            <%--<li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" href="#navtabs2-messages" role="tab" aria-selected="false" tabindex="-1">
                                    <span class="d-block d-sm-none"><i class="far fa-envelope"></i></span>
                                    <span class="d-none d-sm-block">Forecasting</span>
                                </a>
                            </li>--%>
                        </ul>
                    </div>
                    <br />
                    <div class="tab-content">
                        <div class="tab-pane active" id="navtabs2-home" role="tabpanel">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <div class="btn-group me-2 mb-2 mb-sm-0">
                                                <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa fa-user"></i>&nbsp;Level User <i class="mdi mdi-dots-vertical ms-2"></i>
                                                </button>
                                                <div id="divTicket" class="dropdown-menu" style="">
                                                    <div><a class="dropdown-item" href="#" onclick="ActionTenant(1)">All <span class="badge rounded-pill bg-primary">8</span></a></div>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(3)">Layer 1 <span class="badge rounded-pill bg-primary">0</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(4)">Layer 2 <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Team Leader <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Supervisor <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Manager <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Sys Admin <span class="badge rounded-pill bg-primary">4</span></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-10">
                                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                                <div>
                                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="AddRoleUser()">+ Add New</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <div class="table-responsive">
                                                    <table class="table align-middle table-nowrap table-check" id="TableTicketing">
                                                        <thead>
                                                            <tr>
                                                                <th style="width: 30px; min-width: 30px;">ID</th>
                                                                <th style="width: 150px; min-width: 150px;">Level User</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 1</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 2</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 3</th>
                                                                <th style="width: 150px; min-width: 150px;">User Create</th>
                                                                <th style="width: 150px; min-width: 150px;">Date Create</th>
                                                                <th style="width: 30px;">Action</th>
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
                        <div class="tab-pane" id="navtabs2-profile" role="tabpanel">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <div class="btn-group me-2 mb-2 mb-sm-0">
                                                <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa fa-user"></i>&nbsp;Level User <i class="mdi mdi-dots-vertical ms-2"></i>
                                                </button>
                                                <div id="divQM" class="dropdown-menu" style="">
                                                    <div><a class="dropdown-item" href="#" onclick="ActionTenant(1)">All <span class="badge rounded-pill bg-primary">8</span></a></div>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(3)">Layer 1 <span class="badge rounded-pill bg-primary">0</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(4)">QA <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Team Leader <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Admin Release <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Supervisor <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Manager <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Sys Admin <span class="badge rounded-pill bg-primary">4</span></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-10">
                                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                                <div>
                                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="AddRoleUser()">+ Add New</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <div class="table-responsive">
                                                    <table class="table align-middle table-nowrap table-check" id="TableQM">
                                                        <thead>
                                                            <tr>
                                                                <th style="width: 30px; min-width: 30px;">ID</th>
                                                                <th style="width: 150px; min-width: 150px;">Level User</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 1</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 2</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 3</th>
                                                                <th style="width: 150px; min-width: 150px;">User Create</th>
                                                                <th style="width: 150px; min-width: 150px;">Date Create</th>
                                                                <th style="width: 30px;">Action</th>
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
                        <div class="tab-pane" id="navtabs2-settings" role="tabpanel">
                            <div class="card">
                                <div class="card-body">
                                     <div class="row">
                                        <div class="col-md-2">
                                            <div class="btn-group me-2 mb-2 mb-sm-0">
                                                <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa fa-user"></i>&nbsp;Level User <i class="mdi mdi-dots-vertical ms-2"></i>
                                                </button>
                                                <div id="divSchedule" class="dropdown-menu" style="">
                                                    <div><a class="dropdown-item" href="#" onclick="ActionTenant(1)">All <span class="badge rounded-pill bg-primary">8</span></a></div>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(3)">Layer 1 <span class="badge rounded-pill bg-primary">0</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Team Leader <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Supervisor <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Manager <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Sys Admin <span class="badge rounded-pill bg-primary">4</span></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-10">
                                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                                <div>
                                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="AddRoleUser()">+ Add New</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <div class="table-responsive">
                                                    <table class="table align-middle table-nowrap table-check" id="DataForeCasting">
                                                        <thead>
                                                            <tr>
                                                                <th style="width: 30px; min-width: 30px;">ID</th>
                                                                <th style="width: 150px; min-width: 150px;">Level User</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 1</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 2</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 3</th>
                                                                <th style="width: 150px; min-width: 150px;">User Create</th>
                                                                <th style="width: 150px; min-width: 150px;">Date Create</th>
                                                                <th style="width: 30px;">Action</th>
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
                        <div class="tab-pane" id="navtabs2-messages" role="tabpanel">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <%--<div class="btn-group me-2 mb-2 mb-sm-0">
                                                <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa fa-user"></i>&nbsp;Level User <i class="mdi mdi-dots-vertical ms-2"></i>
                                                </button>
                                                <div id="divScheduling" class="dropdown-menu" style="">
                                                    <div><a class="dropdown-item" href="#" onclick="ActionTenant(1)">All <span class="badge rounded-pill bg-primary">8</span></a></div>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(3)">Agent <span class="badge rounded-pill bg-primary">0</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Team Leader <span class="badge rounded-pill bg-primary">4</span></a>
                                                    <a class="dropdown-item" href="#" onclick="ActionTenant(6)">Sys Admin <span class="badge rounded-pill bg-primary">4</span></a>
                                                </div>
                                            </div>--%>
                                        </div>
                                        <div class="col-md-10">
                                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                                <div>
                                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="AddRoleUser()">+ Add Role</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <div class="table-responsive">
                                                    <table class="table align-middle table-nowrap table-check" id="DataScheduling">
                                                        <thead>
                                                            <tr>
                                                                <th style="width: 30px; min-width: 30px;">ID</th>
                                                                <th style="width: 150px; min-width: 150px;">Level User</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 1</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 2</th>
                                                                <th style="width: 150px; min-width: 150px;">Menu Level 3</th>
                                                                <th style="width: 150px; min-width: 150px;">User Create</th>
                                                                <th style="width: 150px; min-width: 150px;">Date Create</th>
                                                                <th style="width: 30px;">Action</th>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Form Role Menu</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="mb-3">
                        <label for="addcontact-designation-input" class="form-label">Level User</label>
                        <select class="form-select" id="cmbLevelUser">
                            <option>Select</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="addcontact-designation-input" class="form-label">System</label>
                        <select id="CmbSystem" class="form-select" onchange="getWS_CmbSystem(1);">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="addcontact-designation-input" class="form-label">Menu</label>
                        <select id="cmbMenu1" class="form-select" onchange="getWS_CategoryType(1);">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="addcontact-designation-input" class="form-label">Sub Menu</label>
                        <select id="cmbMenu2" class="form-select" onchange="getWS_CategoryTypeDetail(1);">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="mb-3" style="display: none;">
                        <label for="addcontact-designation-input" class="form-label">Menu Level 3</label>
                        <select id="cmbMenu3" class="form-select">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mb-3">
                                <label for="addcontact-designation-input" class="form-label">Description</label>
                                <textarea class="form-control" placeholder="Description" id="TrxDescription" name="TrxDescription" rows="6"></textarea>
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
