<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Category_Reason.aspx.vb" Inherits="UIDESK.Crm_Trm_Category_Reason" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Category_Reason.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="Hd_CmbCategory" runat="server" />
    <asp:HiddenField ID="Hd_CmbCategoryType" runat="server" />
    <asp:HiddenField ID="Hd_CmbCategoryDetail" runat="server" />
    <asp:HiddenField ID="Hd_EscalationUnit" runat="server" />
    <asp:HiddenField ID="Hd_Status" runat="server" />
    <asp:HiddenField ID="Hd_ComboLayer" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <%--<h5 class="card-title">Data Problem</h5>--%>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Tambah()">+ Add New</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                        <thead>
                            <tr>
                                <th style="width: 30px; min-width: 30px;">ID</th>
                                <th style="width: 150px; min-width: 150px;">Category</th>
                                <th style="width: 150px; min-width: 150px;">Category Type</th>
                                <th style="width: 150px; min-width: 150px;">Category Detail</th>
                                <th style="width: 150px; min-width: 150px;">Category Reason</th>
                                <th style="width: 150px; min-width: 150px;">Escalation Unit</th>
                                <th style="width: 100px; min-width: 100px;">Layer</th>
                                <th style="width: 100px; min-width: 100px;">SLA</th>
                                <th style="width: 100px; min-width: 100px;">Status</th>
                                <th style="width: 50px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addContactModal"
                    aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="myExtraLargeModalLabel">Data Category Problem</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close">
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="addcontact-designation-input" class="form-label">Category</label>
                                            <select class="form-select" id="cmbCategory" onchange="getWS_CategoryType(1)">
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="addcontact-designation-input" class="form-label">Category Type</label>
                                            <select class="form-select" id="cmbCategoryType" onchange="getWS_CategoryTypeDetail(1)">
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Category Detail</label>
                                            <select name="select" id="cmbCategoryDetail" class="form-select" onchange="getWS_CategoryTypeDetail_Value(1)">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <textarea class="form-control" placeholder="Category Problem" id="TxtCategoryReasonName" name="TxtCategoryReasonName" style="height: 150px"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="mb-3">
                                            <label for="addcontact-designation-input" class="form-label">Escalation Unit</label>
                                            <select name="select" id="cmbEscalationUnit" class="form-select" onchange="getWS_EscalationUnit(1)">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="mb-3">
                                            <label for="addcontact-designation-input" class="form-label">Layer</label>
                                            <select name="select" id="ComboLayer" class="form-select" onchange="getWS_ComboLayer(1)">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="mb-3">
                                            <label for="addcontact-designation-input" class="form-label">SLA(Days)</label>
                                            <input type="text" class="form-control" id="TxtSLA" placeholder="SLA">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="mb-3">
                                            <label for="addcontact-designation-input" class="form-label">Status</label>
                                            <select class="form-select" id="cmbStatus" onchange="getWS_Status(1)">
                                                <option>Select</option>
                                                <option value="Y">Active</option>
                                                <option value="N">Non Active</option>
                                            </select>
                                        </div>
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
                <%--<div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered" style="width: 1100px;">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addContactModalLabel">Add Category Detail</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Add</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>--%>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var TrxReason = CKEDITOR.replace('TxtCategoryReasonName');
        TrxReason.config.height = 250;
        TrxReason.config.toolbar = 'Basic';
        TrxReason.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
