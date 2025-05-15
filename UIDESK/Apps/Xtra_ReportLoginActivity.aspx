<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Xtra_ReportLoginActivity.aspx.vb" Inherits="UIDESK.Xtra_ReportLoginActivity" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Report Login Activity</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row" style="margin-bottom: -15px;">
                        <div class="col-sm-2">
                            <label>Start Date</label>
                            <dx:ASPxDateEdit ID="dt_strdate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd" Height="30">
                                <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                    <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                </ValidationSettings>
                            </dx:ASPxDateEdit>
                        </div>
                        <div class="col-sm-2">
                            <label>End Date</label>
                            <dx:ASPxDateEdit ID="dt_endate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd" Height="30">
                                <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                    <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                </ValidationSettings>
                            </dx:ASPxDateEdit>
                        </div>
                        <div class="col-sm-2" style="margin-top: 5px;">
                            <br />
                            <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                                HoverStyle-BackColor="#EE4D2D" Height="34px" Width="100%">
                            </dx:ASPxButton>
                        </div>
                    </div>
                    <hr />
                    <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" DataSourceID="DSChannel" runat="server" Width="100%"
                        Font-Size="Small" Styles-Header-Font-Bold="true" Theme="MetropolisBlue" Styles-Cell-HorizontalAlign="left" Styles-Header-HorizontalAlign="left">
                        <SettingsPager>
                            <AllButton Text="All">
                            </AllButton>
                            <NextPageButton Text="Next &gt;">
                            </NextPageButton>
                            <PrevPageButton Text="&lt; Prev">
                            </PrevPageButton>
                            <PageSizeItemSettings Visible="true" Items="10, 25, 50, 100" ShowAllItem="true" />
                        </SettingsPager>
                        <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="false" />
                        <Columns>
                            <dx:GridViewDataTextColumn Caption="ID" FieldName="ID" Width="50px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Agent" FieldName="Agent" Width="200px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Description" FieldName="Description" Width="300px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataDateColumn Caption="Date Login" FieldName="DateLogin" Width="200px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                            <dx:GridViewDataTextColumn Caption="Channel" FieldName="Channel" Width="200px"></dx:GridViewDataTextColumn>
                        </Columns>
                    </dx:ASPxGridView>
                    <hr />
                    <div class="row">
                        <div class="col-sm-2">
                            <asp:DropDownList runat="server" ID="ddList" Height="30" CssClass="form-control input-sm">
                                <asp:ListItem Value="xlsx" Text="Excel" />
                                <asp:ListItem Value="xls" Text="Excel 97-2003" />
                                <asp:ListItem Value="csv" Text="CSV" />
                            </asp:DropDownList>
                        </div>
                        <div class="col-sm-2">
                            <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis"
                                HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                            </dx:ASPxButton>
                        </div>
                    </div>
                </div>
            </div>
            <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
        </div>
    </div>
    <asp:SqlDataSource ID="DSChannel" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
</asp:Content>
