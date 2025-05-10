<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_MySql_Connection.aspx.vb" Inherits="UIDESK.Crm_MySql_Connection" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-2">
                </div>
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="addcontact-designation-input" class="form-label">UserName Login</label>
                        <input type="text" class="form-control" id="LoginValue" runat="server"/>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="addcontact-designation-input" class="form-label">UserName Logout</label>
                        <input type="text" class="form-control" id="LogoutValue" runat="server"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <button runat="server" id="Button_MySqlConnection" class="btn btn-primary w-sm" onserverclick="Button_MySqlConnection_ServerClick">Test Connection</button>
                </div>
                <div class="col-md-2">
                    <button runat="server" id="TestingLogin" class="btn btn-primary w-sm" onserverclick="TestingLogin_ServerClick">Testing Login</button>
                </div>
                 <div class="col-md-2">
                    <button runat="server" id="TestingLogout" class="btn btn-primary w-sm" onserverclick="TestingLogout_ServerClick">Testing Logout</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
