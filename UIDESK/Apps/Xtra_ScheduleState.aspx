<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Xtra_ScheduleState.aspx.vb" Inherits="UIDESK.Xtra_ScheduleState" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Schedule State</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" runat="server" Font-Size="Small"
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
                                     <dx:GridViewDataTextColumn Caption="No" FieldName="Nomor" Width="50px" CellStyle-HorizontalAlign="left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Channel" FieldName="Channel" Width="240px" CellStyle-HorizontalAlign="left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Account" FieldName="Account" Width="240px" CellStyle-HorizontalAlign="left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Site" FieldName="SiteName" Width="240px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="NIP" FieldName="NIP" Width="240px" CellStyle-HorizontalAlign="left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Agent Name" FieldName="AgentName" Width="240px" CellStyle-HorizontalAlign="left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Alias" FieldName="Alias" Width="240px" CellStyle-HorizontalAlign="left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Max Handle" FieldName="maxhandle" Width="240px" CellStyle-HorizontalAlign="left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Level User" FieldName="LevelUser" Width="240px"></dx:GridViewDataTextColumn>
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
