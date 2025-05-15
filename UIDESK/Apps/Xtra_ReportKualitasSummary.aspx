<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Xtra_ReportKualitasSummary.aspx.vb" Inherits="UIDESK.Xtra_ReportKualitasSummary" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Report Summary Kualitas</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-2">
                            <label for="addcontact-designation-input" class="form-label">End Date</label>
                            <dx:ASPxDateEdit ID="dt_strdate" runat="server" CssClass="form-control input-sm" Width="100%" AutoPostBack="true" OnCalendarCustomDisabledDate="DateEditWeekRange_CalendarCustomDisabledDate" EditFormatString="yyyy-MM-dd" Height="33px">
                                <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                    <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                </ValidationSettings>
                            </dx:ASPxDateEdit>
                        </div>
                        <div class="col-md-2">
                            <label for="addcontact-designation-input" class="form-label">End Date</label>
                            <dx:ASPxDateEdit ID="dt_endate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd" Height="33px" OnCalendarCustomDisabledDate="DateEditWeekRange_CalendarCustomDisabledDate">
                                <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                    <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                </ValidationSettings>
                            </dx:ASPxDateEdit>

                        </div>

                        <dx:ASPxCheckBox Width="10%" ID="chkWeekend" runat="server" Text="Enable Holiday" AutoPostBack="true" OnCheckedChanged="chkWeekend_CheckedChanged" />
                        <div class="col-md-2" style="margin-top: 3px;">
                            <br />
                            <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                                Height="33px" Width="100%">
                            </dx:ASPxButton>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" DataSourceID="tempTrxStaff" runat="server" Width="100%"
                                Font-Size="12px" Styles-Header-Font-Bold="true" Theme="MetropolisBlue" KeyFieldName="HeaderID"
                                Styles-Header-HorizontalAlign="Center" Styles-Cell-HorizontalAlign="Center">
                                <SettingsPager>
                                    <AllButton Text="All">
                                    </AllButton>
                                    <NextPageButton Text="Next &gt;">
                                    </NextPageButton>
                                    <PrevPageButton Text="&lt; Prev">
                                    </PrevPageButton>
                                    <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                                </SettingsPager>
                                <SettingsDetail ShowDetailRow="false" />
                                <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="true" AutoFilterCondition="Contains" />
                                <Columns>
                                    <dx:GridViewDataTextColumn Caption="Agent Name" FieldName="Name" Width="250px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Channel" FieldName="Channel" Width="250px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Skor" FieldName="Skor" Width="250px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Team Leader" FieldName="TEAMLEADER" Width="250px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Catatan" FieldName="Catatan" Width="800px" 
                                        cellstyle-horizontalalign="Left" PropertiesTextEdit-EncodeHtml="false" 
                                        CellStyle-VerticalAlign="Middle"></dx:GridViewDataTextColumn>
                                </Columns>
<%--                                <Templates>
                                    <DetailRow>
                                        <dx:ASPxGridView ID="ASPxGridViewDetail" runat="server" Width="100%"
                                            AutoGenerateColumns="False" Font-Size="14px" Styles-Header-Font-Bold="true" Theme="MetropolisBlue"
                                            OnBeforePerformDataSelect="ASPxGridViewDetail_BeforePerformDataSelect">
                                            <Columns>
                                                <dx:GridViewDataTextColumn Caption="Interaction Penilaian" FieldName="DescriptionTransaction" Width="90%" PropertiesTextEdit-EncodeHtml="false" />
                                                <dx:GridViewDataDateColumn Caption="Date" FieldName="CreatedDate" Width="10%" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                            </Columns>
                                        </dx:ASPxGridView>
                                    </DetailRow>
                                </Templates>--%>
                            </dx:ASPxGridView>
                        </div>
                    </div>
                    <br />
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
                    <asp:SqlDataSource ID="tempTrxStaff" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
