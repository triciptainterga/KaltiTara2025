<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_TrmRefute.aspx.vb" Inherits="UIDESK.QA_TrmRefute" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QA_TrmRefute.js"></script>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Refute</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="card border shadow-none mb-2">
                        <a href="javascript: void(0);" class="text-body">
                            <div class="p-2">
                                <div class="d-flex">
                                    <div class="avatar-sm align-self-center me-2">
                                        <div class="avatar-title rounded bg-transparent text-primary font-size-18">
                                            <i class="fas fa-user"></i>
                                        </div>
                                    </div>
                                    <div class="overflow-hidden me-auto">
                                        <h5 class="font-size-16 text-truncate mb-1" style="margin-top: 5px;">Status Refute</h5>
                                        <%--<p class="text-muted text-truncate mb-0">System</p>--%>
                                    </div>
                                    <div class="d-flex flex-wrap gap-2">
                                        <input type="checkbox" id="SettingTicketCreate" switch="primary" checked="checked" onclick="RefuteSLA(this.checked)">
                                        <label for="SettingTicketCreate" data-on-label="On" data-off-label="Off" class="mb-0"></label>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
