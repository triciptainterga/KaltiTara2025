<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Xtra_ReportAdherenceSchedule_Tgl.aspx.vb" Inherits="UIDESK.Xtra_ReportAdherenceSchedule_Tgl" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Report Adherence Schedule Tanggal</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-2">
                            <label for="addcontact-designation-input" class="form-label">Start Date</label>
                            <dx:ASPxDateEdit ID="dt_strdate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd" Height="33px">
                                <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                    <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                </ValidationSettings>
                            </dx:ASPxDateEdit>
                        </div>
                        <div class="col-md-2">
                            <label for="addcontact-designation-input" class="form-label">End Date</label>
                            <dx:ASPxDateEdit ID="dt_endate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd" Height="33px">
                                <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                    <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                </ValidationSettings>
                            </dx:ASPxDateEdit>
                        </div>
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
                                Font-Size="14px" Styles-Header-Font-Bold="true" Theme="MetropolisBlue">
                                <SettingsPager>
                                    <AllButton Text="All">
                                    </AllButton>
                                    <NextPageButton Text="Next &gt;">
                                    </NextPageButton>
                                    <PrevPageButton Text="&lt; Prev">
                                    </PrevPageButton>
                                    <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                                </SettingsPager>
                                <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="true" />
                                <Columns>
                                    <dx:GridViewDataTextColumn Caption="ID" FieldName="LoginUserName" Width="250px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataColumn Caption="Nama Agent" FieldName="NamaAgent" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Site" FieldName="SiteName" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="TanggalJadwal" FieldName="LoginDate" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Kode Jadwal" FieldName="KodeJadwal" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Channel" FieldName="Channel" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 08:00" FieldName="Jam8_00" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 08:30" FieldName="Jam8_30" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 09:00" FieldName="Jam9_00" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 09:30" FieldName="Jam9_30" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 10:00" FieldName="Jam10_00" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 10:30" FieldName="Jam10_30" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 11:00" FieldName="Jam11_00" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 11:30" FieldName="Jam11_30" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 12:00" FieldName="Jam12_00" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 12:30" FieldName="Jam12_30" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 13:00" FieldName="Jam13_00" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 13:30" FieldName="Jam13_30" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 14:00" FieldName="Jam14_00" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 14:30" FieldName="Jam14_30" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 15:00" FieldName="Jam15_00" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 15:30" FieldName="Jam15_30" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 16:00" FieldName="Jam16_00" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Jam 16:30" FieldName="Jam16_30" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Total" FieldName="Total" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Standar" FieldName="Standar" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="% ATS" FieldName="PersenATS" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="Sesi" FieldName="Sesi" Width="250px"></dx:GridViewDataColumn>
                                    <dx:GridViewDataColumn Caption="% Sesi" FieldName="PersenSesi" Width="250px"></dx:GridViewDataColumn>
                                </Columns>
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
