<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Template_Notifikasi.aspx.vb" Inherits="UIDESK.Crm_Trm_Template_Notifikasi" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Template_Notifikasi.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Template Notification Email</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <table class="table align-middle table-nowrap table-check" id="TrmNotificationTemplate" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                        <thead>
                            <tr>
                                <th style="width: 30px;">ID</th>
                                <th style="width: 200px;">Subject</th>
                                <th style="width: 300px;">Template</th>
                                <th style="width: 200px;">Category</th>
                                <%--<th style="width: 50px;">Type</th>--%>
                                <%--<th style="width: 50px;">Status</th>--%>
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
    <div class="modal fade bs-example-modal-xl" id="ModalChannel" tabindex="-1" role="dialog" id="modal-list-transaction-ticket"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="transaction-ticket">Data Template Notification Email</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="row">
                            <div class="mb-3">
                                <div class="form-group">
                                    <label for="addcontact-name-input" class="form-label">Subject</label>
                                    <input type="text" class="form-control" id="TrxSubject" placeholder="Subject">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mb-3">
                                <div class="form-group">
                                    <textarea class="form-control" id="TrxBody" name="TrxBody" placeholder="Body" rows="14"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mb-3">
                                <div class="form-group">
                                    <label for="addcontact-name-input" class="form-label">Category</label>
                                    <select name="select" id="cmbCategory" class="form-control" onchange="cmbTypeOnchange(1);">
                                        <option value="">Select</option>
                                        <option value="SYSTEM">SYSTEM</option>
                                        <option value="CUSTOMER">CUSTOMER</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mb-3">
                                <div class="form-group">
                                    <label for="addcontact-name-input" class="form-label">Type</label>
                                    <select name="select" id="cmbType" class="form-control">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mb-3">
                                <div class="form-group">
                                    <label for="addcontact-name-input" class="form-label">Status</label>
                                    <select name="select" id="cmbStatus" class="form-control">
                                        <option value="">Select</option>
                                        <option value="YES">YES</option>
                                        <option value="N0">NO</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdateNotif()" id="Update">Submit</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
