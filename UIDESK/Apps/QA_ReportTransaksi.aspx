<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_ReportTransaksi.aspx.vb" Inherits="UIDESK.QA_ReportTransaksi" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Report Transaction</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="box">
                                <%--<div class="box-header with-border">
                                <h4 class="box-title">Data Report Transaksi</h4>
                            </div>--%>
                                <div class="box-body">
                                    <div class="row" style="margin-bottom: -15px;">
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
                                                HoverStyle-BackColor="#0072C6" Height="32px" Width="100%" HoverStyle-Border-BorderColor="#0072C6">
                                            </dx:ASPxButton>
                                        </div>
                                    </div>
                                    <br />
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
                                            <%--<dx:GridViewDataTextColumn Caption="ID" FieldName="NoUrut" Width="40px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>--%>
                                            <dx:GridViewDataTextColumn Caption="Header ID" FieldName="header_id" Width="200px"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Channel" FieldName="channel" Width="200px"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="QA Type" FieldName="qa_type" Width="200px"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Type" FieldName="type" Width="200px"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Nama QA" FieldName="qa_fullname" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Nama Agent" FieldName="agent_name" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <%--<dx:GridViewDataTextColumn Caption="Group Agent" FieldName="Layanan" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Team Layanan" FieldName="LayananTeam" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>--%>
                                            <dx:GridViewDataTextColumn Caption="Jenis Permasalahan" FieldName="jenis_permasalahan" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Nomor Tiket" FieldName="nomor_tiket" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Call Type" FieldName="call_type" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Nama Nasabah" FieldName="nama_nasabah" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Nama Account" FieldName="nama_account" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Nomor Kartu" FieldName="nomor_kartu" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataDateColumn Caption="Waktu Interaksi" FieldName="waktu_interaksi" Width="200px" CellStyle-HorizontalAlign="Left" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                            <dx:GridViewDataDateColumn Caption="Durasi" FieldName="durasi" Width="200px" CellStyle-HorizontalAlign="Left" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                            <dx:GridViewDataTextColumn Caption="Nomor Telepon" FieldName="nomor_telepon" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Periode Penilaian" FieldName="periode_penilaian" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Status" FieldName="status_data" Width="200px"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Keterangan" FieldName="KeteranganNonHtml" Width="400px"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Refute" FieldName="refute_status" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Return" FieldName="return_status" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Return by" FieldName="return_by" Width="200px"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Return Response" FieldName="return_status_response" Width="200px"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Bobot" FieldName="summary_bobot" Width="200px"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataTextColumn Caption="Skor" FieldName="summary_skor" Width="200px"></dx:GridViewDataTextColumn>
                                            <dx:GridViewDataDateColumn Caption="Create Date" FieldName="created_date" Width="200px" CellStyle-HorizontalAlign="Left" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                            <dx:GridViewDataDateColumn Caption="Finnish Date" FieldName="created_close_actual" Width="200px" CellStyle-HorizontalAlign="Left" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                        </Columns>
                                    </dx:ASPxGridView>
                                    <br />
                                    <div class="row">
                                        <div class="col-sm-2">
                                            <asp:DropDownList runat="server" ID="ddList" Height="33" CssClass="form-control input-sm">
                                                <asp:ListItem Value="xlsx" Text="Excel" />
                                                <asp:ListItem Value="xls" Text="Excel 97-2003" />
                                                <asp:ListItem Value="pdf" Text="PDF" />
                                                <asp:ListItem Value="rtf" Text="RTF" />
                                                <asp:ListItem Value="csv" Text="CSV" />
                                                 <asp:ListItem Value="Word" Text="Word" />
                                            </asp:DropDownList>
                                        </div>
                                        <div class="col-sm-2">
                                            <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis" ValidationGroup="SMLvalidationGroup"
                                                HoverStyle-BackColor="#0072C6" Height="33px" Width="100%" HoverStyle-Border-BorderColor="#0072C6">
                                            </dx:ASPxButton>
                                        </div>
                                    </div>
                                    <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
                                    <asp:SqlDataSource ID="XtraTransaksi" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                                </div>
                                <div class="box-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
