<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QM_Trx_HistoryPenilaian.aspx.vb" Inherits="UIDESK.QM_Trx_HistoryPenilaian" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QM_Trx_HistoryPenilaian.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data History Penilaian</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
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
                                HoverStyle-BackColor="#0072C6" Height="33px" Width="100%" HoverStyle-Border-BorderColor="#0072C6">
                            </dx:ASPxButton>
                        </div>
                    </div>
                    <hr />
                    <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView" runat="server" Width="100%" Styles-Header-HorizontalAlign="Center"
                        Theme="MetropolisBlue" DataSourceID="XtraHistoryTransaksi" Styles-Header-Font-Bold="true" Font-Size="X-Small">
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
                            <dx:GridViewDataTextColumn Caption="No" FieldName="NoUrut" Width="40px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Channel" FieldName="channel" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Tipe" FieldName="qa_type" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Nama QA" FieldName="NamaQA" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Nama Agent" FieldName="agent_name" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Jenis Permasalahan" FieldName="jenis_permasalahan" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Nomor Tiket" FieldName="nomor_tiket" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Call Type" FieldName="call_type" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Nama Nasabah" FieldName="nama_nasabah" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Nama Account" FieldName="nama_account" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Nomor Kartu" FieldName="nomor_kartu" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataDateColumn Caption="Waktu Interaksi" FieldName="waktu_interaksi" Width="200px" CellStyle-HorizontalAlign="Center" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                            <dx:GridViewDataDateColumn Caption="Durasi" FieldName="durasi" Width="200px" CellStyle-HorizontalAlign="Left" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                            <dx:GridViewDataTextColumn Caption="Nomor Telepon" FieldName="nomor_telepon" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Periode Penilaian" FieldName="periode_penilaian" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Status" FieldName="status_data" Width="200px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Keterangan" FieldName="KeteranganNonHtml" Width="400px" PropertiesTextEdit-EncodeHtml="true"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Refute" FieldName="refute_status" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Return" FieldName="return_status" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Return by" FieldName="return_by" Width="200px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Return Response" FieldName="return_status_response" Width="200px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Bobot" FieldName="summary_bobot" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Skor" FieldName="summary_skor" Width="200px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataDateColumn Caption="Create Date" FieldName="created_date" Width="200px" CellStyle-HorizontalAlign="Center" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                            <dx:GridViewDataDateColumn Caption="Finnish Date" FieldName="created_close_actual" Width="200px" CellStyle-HorizontalAlign="Center" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                            <dx:GridViewDataHyperLinkColumn VisibleIndex="1" Settings-FilterMode="DisplayText" Caption="Header ID" CellStyle-HorizontalAlign="Center"
                                ShowInCustomizationForm="True" FieldName="header_id" Width="200px">
                                <DataItemTemplate>
                                    <dx:ASPxHyperLink ForeColor="#333333" Font-Underline="true" Font-Size="10px" ID="ASPxHyperLinkTest" Target="_blank" runat="server" Text='<%#Eval("header_id") %>'
                                        NavigateUrl='<%#String.Format("QA_Form.aspx?act=edit&headerid={0}&acraid={1}&type={2}&UserType={3}&agentid={4}&status={5}&qaid={6}&id={7}&view=1", Eval("header_id"), Eval("acra_id"), Eval("type"), Eval("qa_type"), Eval("agent"), Eval("status_data"), Eval("qa_id"), Eval("id"))%>'>
                                    </dx:ASPxHyperLink>
                                </DataItemTemplate>
                            </dx:GridViewDataHyperLinkColumn>
                        </Columns>
                    </dx:ASPxGridView>
                    <asp:SqlDataSource ID="XtraHistoryTransaksi" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
