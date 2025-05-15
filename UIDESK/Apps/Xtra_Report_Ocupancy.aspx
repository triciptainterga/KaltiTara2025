<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Xtra_Report_Ocupancy.aspx.vb" Inherits="UIDESK.Xtra_Report_Ocupancy" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Report Occupancy Email</h4>
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
                        <div class="col-md-2" style="margin-top: 5px;">
                            <br />
                            <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                                Height="33px" Width="100%">
                            </dx:ASPxButton>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" runat="server" Font-Size="X-Small"
                                DataSourceID="TempBaseAUX" Width="100%" Styles-Header-Font-Bold="true" Theme="MetropolisBlue">
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
                                    <dx:GridViewDataTextColumn Caption="No" FieldName="NoUrut" Width="50px" CellStyle-HorizontalAlign="left"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="TicketNumber" FieldName="TicketNumber" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataDateColumn Caption="Waktu Distribusi" FieldName="AgentDistribusi" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                    <dx:GridViewDataDateColumn Caption="Waktu Read" FieldName="AgentRead" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                    <dx:GridViewDataDateColumn Caption="Dikirim" FieldName="Dikirim" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                    <dx:GridViewDataTextColumn Caption="Jenis Pengguna Jasa" FieldName="Type" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Email  Tujuan" FieldName="EFROM" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Email  CC" FieldName="ECC" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Kantor Layanan" FieldName="VendorName" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Nama Team Leader" FieldName="NamaTeamLeader" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Nama Agent Layanan" FieldName="NAME" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Kategori" FieldName="CategoryName" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Sub Kategori" FieldName="SubCategory1Name" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Penyelesaian" FieldName="EmailType" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Waktu Read" FieldName="WaktuRead" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Waktu Dikirim" FieldName="WaktuDikirim" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Waktu Dikirim - Read" FieldName="selisih" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Capaian (%)" FieldName="time_ratio" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Jam Staffed" FieldName="jam" Width="200px"></dx:GridViewDataTextColumn>
                                    <%--<dx:GridViewDataTextColumn Caption="AUX State" FieldName="AuxState" Width="200px"></dx:GridViewDataTextColumn>--%>
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
                    <asp:SqlDataSource ID="TempBaseAUX" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
