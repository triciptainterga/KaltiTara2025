<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_LevelUser.aspx.vb" Inherits="UIDESK.Crm_LevelUser" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_LevelUser.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                           <%-- <div class="mb-3">
                                <h5 class="card-title">Level User</h5>
                            </div>--%>
                        </div>
<%--                        <div class="col-md-6">
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                <div>
                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addContactModal" onclick="AddUser()"><i class="uil uil-plus me-1"></i>Add New</a>
                                </div>
                            </div>
                        </div>--%>
                    </div>
                    <div class="row" id="divUserNotification"></div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
