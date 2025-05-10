<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Modul.aspx.vb" Inherits="UIDESK.Crm_Trm_Modul" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Modul.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="Hd_Site" runat="server" />
     <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                           <%-- <div class="mb-3">
                                <a href="#" class="btn btn-light" onclick="TambahUser()">
                                    <i class="uil uil-plus me-1"></i>+ Add New
                                 </a>
                            </div>--%>
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
                    <div>
                        <div class="row" id="div_HeaderCampaign"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
