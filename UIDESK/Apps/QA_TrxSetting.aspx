<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_TrxSetting.aspx.vb" Inherits="UIDESK.QA_TrxSetting" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QA_TrxSetting.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxQAId" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data QA Setting</h4>
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
                    <div class="row" id="DivUserSystem"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="FormQA" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalKantor">Data User QA</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <table class="table table-primary table-striped mb-0" id="DataTableQA">
                            <thead>
                                <tr>
                                    <th style="width: 30px; min-width: 30px;">#</th>
                                    <th style="width: 30px; min-width: 30px;">ID</th>
                                    <th style="width: 250px; min-width: 250px;">UserName</th>
                                    <th style="width: 250px; min-width: 250px;">Name</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" id="btnSimpan">Submit</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
