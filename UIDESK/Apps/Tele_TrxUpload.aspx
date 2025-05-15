<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Tele_TrxUpload.aspx.vb" Inherits="UIDESK.Tele_TrxUpload" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Tele_TrxUpload.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="card">
        <div class="card-header">
            <div class="col-md-12">
                <div class="text-end">
                    <a href="../FileTemplateUpload/Telemarketing.xlsx" class="badge rounded-pill badge-soft-primary">
                        Download Template <span class="badge bg-success ms-1">Excel</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <%--<label>Product Campaign <span class="text-danger">*</span></label>--%>
                        <select id="ComboCampaignTelemarketing" class="form-select">
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <input type="file" name="filesnya" class="form-control">
                </div>
                <div class="col-md-4">
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <select id="ComboUploadID" class="form-select" onchange="OnchangeComboUpload()">
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-md-12">
                    <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView" runat="server" Width="100%" Styles-Header-HorizontalAlign="Center"
                        Theme="MetropolisBlue" DataSourceID="XtraUpload" Styles-Header-Font-Bold="true" Font-Size="X-Small" Settings-HorizontalScrollBarMode="Auto">
                        <SettingsPager>
                            <AllButton Text="All">
                            </AllButton>
                            <NextPageButton Text="Next &gt;">
                            </NextPageButton>
                            <PrevPageButton Text="&lt; Prev">
                            </PrevPageButton>
                            <PageSizeItemSettings Visible="true" Items="10, 15, 20, 50" ShowAllItem="true" />
                        </SettingsPager>
                        <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="false" />
                        <Columns>
                            <%--  <dx:GridViewDataTextColumn Caption="Action" Width="45px" HeaderStyle-HorizontalAlign="Center">
                                            <DataItemTemplate>
                                                <a href="#" onclick="FunctionDelete('<%#Eval("id_run") %>')">Delete</a>
                                            </DataItemTemplate>
                                        </dx:GridViewDataTextColumn>--%>
                            <dx:GridViewDataTextColumn Caption="No" FieldName="RowNumber" Width="50px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Name" FieldName="Name" Width="250px"></dx:GridViewDataTextColumn>
                            <%-- <dx:GridViewDataTextColumn Caption="Gender" FieldName="Gender" Width="200px"></dx:GridViewDataTextColumn>--%>
                            <dx:GridViewDataTextColumn Caption="Telepon" FieldName="Telepon" Width="250px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Product Campaign" FieldName="ProdukCampaign" Width="250px"></dx:GridViewDataTextColumn>
                            <%--<dx:GridViewDataTextColumn Caption="Email" FieldName="Email" Width="200px"></dx:GridViewDataTextColumn>--%>
                            <%--<dx:GridViewDataTextColumn Caption="Due Date" FieldName="Status" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>--%>
                            <dx:GridViewDataTextColumn Caption="Address" FieldName="Address" Width="800px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                            <%--   <dx:GridViewDataTextColumn Caption="Kota" FieldName="Kota" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Provinsi" FieldName="Provinsi" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Negara" FieldName="Negara" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="KodePos" FieldName="KodePos" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>--%>
                            <dx:GridViewDataTextColumn Caption="Upload ID" FieldName="UploadID" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                            <%--<dx:GridViewDataTextColumn Caption="Status" FieldName="Status" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>--%>
                        </Columns>
                    </dx:ASPxGridView>
                    <asp:SqlDataSource ID="XtraUpload" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="text-end">
                <button type="button" class="btn btn-danger w-sm" onclick="ButtonDistributeDelete()" id="Delete">
                    <i class="fa fa-times-circle"></i>&nbsp;Delete</button>
                <button type="button" class="btn btn-primary w-sm" onclick="ButtonDistributeData()" id="Distribute">
                    <i class="fa fa-check-circle"></i>&nbsp;Distribute</button>
            </div>
            <%--<div class="text-end">
                <button type="button" id="Ticket_AddTransaction" class="btn btn-rounded btn-danger btn-outline pull-left" onclick="PublishTransaction()">
                    <i class="fa fa-times-circle"></i>&nbsp;Delete
                </button>
                <button type="button" id="Ticket_PublishTransaction" class="btn btn-rounded btn-success btn-outline float-right" onclick="AddTransaction()">
                    <i class="fa fa-check-circle"></i>&nbsp;Distribute
                </button>
            </div>--%>
        </div>
    </div>
</asp:Content>
