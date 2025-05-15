<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Exp_DK.aspx.vb" Inherits="UIDESK.Exp_DK" %>
<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Kantor</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" runat="server" Font-Size="X-Small"
                                DataSourceID="DSource" Width="100%" Styles-Header-Font-Bold="true" Theme="MetropolisBlue">
                                <SettingsPager>
                                    <AllButton Text="All">
                                    </AllButton>
                                    <NextPageButton Text="Next &gt;">
                                    </NextPageButton>
                                    <PrevPageButton Text="&lt; Prev">
                                    </PrevPageButton>
                                    <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                                </SettingsPager>
                                <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowFilterBar="Hidden" EnableFilterControlPopupMenuScrolling="true"
                                    ShowVerticalScrollBar="false" ShowFooter="false" ShowHorizontalScrollBar="true" />
                                <Columns>
                                    <dx:GridViewDataTextColumn Caption="ID" FieldName="ID" Width="100px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Nama Kantor" FieldName="NamaKantor" Width="350px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Telepon" FieldName="Telepon" Width="350px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Email" FieldName="Email" Width="350px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Created By" FieldName="CreatedBy" Width="350px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataDateColumn Caption="Created Date" FieldName="CreatedDate" Width="350px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                    <dx:GridViewDataTextColumn Caption="Alamat" FieldName="Alamat" Width="350px"></dx:GridViewDataTextColumn>
                                </Columns>
                            </dx:ASPxGridView>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-2">
                            <asp:DropDownList runat="server" ID="ddList" Height="33" CssClass="form-control input-sm">
                                <asp:ListItem Value="xlsx" Text="Excel" />
                                <asp:ListItem Value="xls" Text="Excel 97-2003" />
                                <asp:ListItem Value="pdf" Text="PDF" />
                                <asp:ListItem Value="rtf" Text="RTF" />
                                <asp:ListItem Value="csv" Text="CSV" />
                                <asp:ListItem Value="Word" Text="Word" />
                            </asp:DropDownList>
                        </div>
                        <div class="col-md-2">
                            <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis" ValidationGroup="SMLvalidationGroup"
                                Height="33px" Width="100%">
                            </dx:ASPxButton>
                        </div>
                    </div>
                    <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server"></dx:ASPxGridViewExporter>
                    <asp:SqlDataSource ID="DSource" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
