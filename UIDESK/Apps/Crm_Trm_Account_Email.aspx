<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Account_Email.aspx.vb" Inherits="UIDESK.Crm_Trm_Account_Email" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Account_Email.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Account Email</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                            <thead>
                                <tr>
                                    <th style="width: 300px; min-width: 300px;">Account Email</th>
                                    <th style="width: 300px; min-width: 300px;">Site</th>
                                    <th style="width: 300px; min-width: 300px;">Location</th>
                                    <th style="width: 30px; min-width: 30px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="addContactModalLabel">Data Account Email</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body p-4">
                                    <div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Account</label>
                                            <input type="text" class="form-control" id="Account_Email_Corporate" placeholder="Account Email Corporate" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                                        </div>
                                        <div class="mb-3">
                                            <label for="addcontact-designation-input" class="form-label">Site</label>
                                            <select id="ComboSite" class="form-select">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                         <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Location</label>
                                            <input type="text" class="form-control" id="Location" placeholder="Location">
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
                </div>
            </div>
        </div>
    </div>
</asp:Content>
