<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Monitoring.aspx.vb" Inherits="UIDESK.Crm_Trm_Monitoring" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Monitoring.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="Hd_Site" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="mb-3">
                    <div class="row" id="2_TampungKotakAtas"></div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px; min-width: 30px;">ID</th>
                                            <th style="width: 200px; min-width: 170px;">UserName</th>
                                            <th style="width: 200px; min-width: 170px;">Name</th>
                                            <th style="width: 200px; min-width: 170px;">Email Address</th>
                                            <th style="width: 200px; min-width: 170px;">Level User</th>
                                            <th style="width: 200px; min-width: 170px;">AUX Description</th>
                                            <th style="width: 30px; min-width: 30px;">Action</th>
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
</asp:Content>
