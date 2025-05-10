<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Status_User.aspx.vb" Inherits="UIDESK.Crm_Trm_Status_User" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Status_User.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <a href="#" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addContactModal" onclick="FormTambah()">+ Add New</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <center>
                        <div class="spinner-border text-primary m-1" role="status" id="Loading" style="display: none;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </center>
                    <table class="table align-middle table-nowrap table-check" id="DataTableStatus">
                        <thead>
                            <tr>
                                <th style="width: 100px; min-width: 100px;">ID</th>
                                <th style="width: 250px; min-width: 250px;">Level User</th>
                                <th style="width: 250px; min-width: 250px;">Status Ticket</th>
                                <th style="width: 100px; min-width: 100px;">Status</th>
                                <th style="width: 100px; min-width: 100px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabel">Form Add Status</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="mb-3">
                            <label for="workexperience-enquirydetail-input">Level User</label>
                            <select id="CmbLevelUser" class="form-select">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="workexperience-enquirydetail-input">Status</label>
                            <select id="CmbStatus" class="form-select">
                                <option value="">Select</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Submit</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
