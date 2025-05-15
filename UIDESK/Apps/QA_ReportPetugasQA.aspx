<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_ReportPetugasQA.aspx.vb" Inherits="UIDESK.QA_ReportPetugasQA" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Report Petugas QA</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-2">
                            <label for="addcontact-designation-input" class="form-label">Site<span class="text-danger">*</span></label>
                            <dx:ASPxComboBox ID="ComboTypeQA" runat="server" DataSourceID="DataSourceTypeQA"
                                ValueField="ID" TextField="TypeQA" CssClass="form-control"
                                EnableCallbackMode="false" AutoPostBack="true" Width="100%" Height="33px">
                                <Items>
                                    <dx:ListEditItem Value="ID" Text="TypeQA" />
                                </Items>
                                <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                    <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                </ValidationSettings>
                                <ClientSideEvents SelectedIndexChanged="function(s, e) { OnProductChanged(s); }"></ClientSideEvents>
                            </dx:ASPxComboBox>
                        </div>
                        <div class="col-sm-2">
                            <label for="addcontact-designation-input" class="form-label">Start Date</label>
                            <dx:ASPxDateEdit ID="dt_strdate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd" Height="33px">
                                <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                    <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                </ValidationSettings>
                            </dx:ASPxDateEdit>
                        </div>
                        <div class="col-sm-2">
                            <label for="addcontact-designation-input" class="form-label">End Date</label>
                            <dx:ASPxDateEdit ID="dt_endate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd" Height="33px">
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
                        <br />
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView" runat="server" Width="100%" Styles-Header-HorizontalAlign="Center"
                                Theme="MetropolisBlue" Styles-Header-Font-Bold="true" Font-Size="X-Small" DataSourceID="XtraPetugasQA">
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
                                    <dx:GridViewDataTextColumn Caption="No" FieldName="NoUrut" Width="40px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Transaksi ID" FieldName="header_id" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Personal Number" FieldName="qa_name" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Name" FieldName="qa_fullname" Width="300px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Rating" FieldName="Rating" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Kesimpulan & Saran" FieldName="KesimpulanSaranNonHtml" PropertiesTextEdit-EncodeHtml="true" Width="500px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Rating by" FieldName="CreatedBy" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataDateColumn Caption="Create Date" FieldName="CreatedDate" Width="200px" CellStyle-HorizontalAlign="Left" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                </Columns>
                            </dx:ASPxGridView>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <asp:DropDownList runat="server" ID="ddList" Height="33" CssClass="form-control input-sm">
                                <asp:ListItem Value="xlsx" Text="Excel" />
                                <asp:ListItem Value="xls" Text="Excel 97-2003" />
                                <asp:ListItem Value="pdf" Text="PDF" />
                                <asp:ListItem Value="rtf" Text="RTF" />
                                <asp:ListItem Value="csv" Text="CSV" />
                            </asp:DropDownList>
                        </div>
                        <div class="col-sm-2">
                            <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis" ValidationGroup="SMLvalidationGroup"
                                HoverStyle-BackColor="#0072C6" Height="33px" Width="100%" HoverStyle-Border-BorderColor="#0072C6">
                            </dx:ASPxButton>
                        </div>
                    </div>
                    <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
                    <asp:SqlDataSource ID="XtraPetugasQA" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                    <asp:SqlDataSource ID="DataSourceTypeQA" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
