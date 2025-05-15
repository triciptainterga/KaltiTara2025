<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="XtraReport_AcraGate.aspx.vb" Inherits="UIDESK.XtraReport_AcraGate" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/XtraReport_AcraGate.js"></script>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data List Acra</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <%--<div class="row">
                        <div class="box-header with-border">
                            <h4 class="box-title">Data Transaksi Recording (BRIGate)</h4>
                            <div class="box-controls pull-right">
                                <button type="button" id="Button2" class="btn btn-rounded btn-primary btn-outline pull-left" onclick="SubmitAcra()" style="margin-top: -5px;">
                                    <i class="ti-import"></i>&nbsp;Get Data From ACRA H-1                                              
                                </button>
                            </div>
                        </div>
                    </div>--%>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <%--<h5 class="card-title">Data Group Agent</h5>--%>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                <div>
                                    <a href="#" class="btn btn-light" onclick="SubmitAcra()">Get Data From ACRA H-1 </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="box-body">
                            <div class="row" style="margin-bottom: -15px;">
                                <div class="col-sm-2">
                                    <label>Start Date</label>
                                    <dx:ASPxDateEdit ID="dt_strdate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd" Height="32">
                                        <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                            <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                        </ValidationSettings>
                                    </dx:ASPxDateEdit>
                                </div>
                                <div class="col-sm-2">
                                    <label>End Date</label>
                                    <dx:ASPxDateEdit ID="dt_endate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd" Height="32">
                                        <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                            <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                        </ValidationSettings>
                                    </dx:ASPxDateEdit>
                                </div>
                                <div class="col-sm-2" style="margin-top: 5px;">
                                    <br />
                                    <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                                        HoverStyle-BackColor="#0072C6" Height="33px" Width="100%" HoverStyle-Border-BorderColor="#0072C6">
                                    </dx:ASPxButton>
                                </div>
                            </div>
                            <hr />
                            <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView" runat="server" Width="100%" Styles-Header-HorizontalAlign="Center"
                                Theme="MetropolisBlue" DataSourceID="XtraTransaksi" Styles-Header-Font-Bold="true" Font-Size="X-Small">
                                <SettingsPager>
                                    <AllButton Text="All">
                                    </AllButton>
                                    <NextPageButton Text="Next &gt;">
                                    </NextPageButton>
                                    <PrevPageButton Text="&lt; Prev">
                                    </PrevPageButton>
                                    <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                                </SettingsPager>
                                <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="false" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="true" />
                                <Columns>
                                    <dx:GridViewDataTextColumn Caption="ID" FieldName="ID" Width="60px" CellStyle-HorizontalAlign="Center" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Acra ID" FieldName="AcraID" Width="250px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Group Agent" FieldName="AcraGroupAgent" Width="250px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Nomor Telepon" FieldName="NoTelp" Width="250px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Extension" FieldName="Extension" Width="250px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Durasi" FieldName="Duration" Width="250px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="FilePath" FieldName="FilePath" Width="250px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Status" FieldName="StatusData" Width="250px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataDateColumn Caption="Date Time Start" FieldName="DateTimeStart" Width="250px" CellStyle-HorizontalAlign="Left" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                    <dx:GridViewDataDateColumn Caption="Date Time End" FieldName="DateTimeEnd" Width="250px" CellStyle-HorizontalAlign="Left" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                </Columns>
                            </dx:ASPxGridView>
                            <hr />
                            <div class="row">
                                <div class="col-sm-2">
                                    <asp:DropDownList runat="server" ID="ddList" Height="30" CssClass="form-control input-sm">
                                        <asp:ListItem Value="xlsx" Text="Excel" />
                                        <asp:ListItem Value="xls" Text="Excel 97-2003" />
                                        <%--<asp:ListItem Value="pdf" Text="PDF" />--%>
                                        <asp:ListItem Value="rtf" Text="RTF" />
                                        <asp:ListItem Value="csv" Text="CSV" />
                                    </asp:DropDownList>
                                </div>
                                <div class="col-sm-2">
                                    <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis" ValidationGroup="SMLvalidationGroup"
                                        HoverStyle-BackColor="#0072C6" Height="30px" Width="100%" HoverStyle-Border-BorderColor="#0072C6">
                                    </dx:ASPxButton>
                                </div>
                            </div>
                            <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
                            <asp:SqlDataSource ID="XtraTransaksi" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%--<div class="row">
        <div class="col-12">
            <div class="box">
                <div class="box-header with-border">
                    <h4 class="box-title">Data Transaksi Recording (BRIGate)</h4>
                    <div class="box-controls pull-right">
                        <button type="button" id="Button2" class="btn btn-rounded btn-primary btn-outline pull-left" onclick="SubmitAcra()" style="margin-top: -5px;">
                            <i class="ti-import"></i>&nbsp;Get Data From ACRA H-1                                              
                        </button>
                    </div>
                </div>

                <div class="box-footer">
                </div>
            </div>
        </div>
    </div>--%>
</asp:Content>
