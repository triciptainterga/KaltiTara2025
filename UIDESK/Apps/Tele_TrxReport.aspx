<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Tele_TrxReport.aspx.vb" Inherits="UIDESK.Tele_TrxReport" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-2">
                    <label>Start Date</label>
                    <dx:ASPxDateEdit ID="dt_strdate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                        <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                            <RequiredField IsRequired="true" ErrorText="Must be filled" />
                        </ValidationSettings>
                    </dx:ASPxDateEdit>
                </div>
                <div class="col-md-2">
                    <label>End Date</label>
                    <dx:ASPxDateEdit ID="dt_endate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                        <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                            <RequiredField IsRequired="true" ErrorText="Must be filled" />
                        </ValidationSettings>
                    </dx:ASPxDateEdit>
                </div>
                <div class="col-md-2">
                    <label>Agent Name</label>
                    <dx:ASPxComboBox ID="ComboAgent" runat="server" DataSourceID="DataSourceAgent" Width="100%"
                        ValueField="USERNAME" TextField="NAME" CssClass="form-control input-sm">
                        <Items>
                            <dx:ListEditItem Value="USERNAME" Text="NAME" />
                        </Items>
                        <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                            <RequiredField IsRequired="true" ErrorText="Must be filled" />
                        </ValidationSettings>
                    </dx:ASPxComboBox>
                </div>
                <div class="col-md-2" style="margin-top: 5px;">
                    <br />
                    <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                        Height="36px" Width="100%">
                    </dx:ASPxButton>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
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
                            <dx:GridViewDataTextColumn Caption="Tanggal & Jam Dial" FieldName="DateCreate" Width="200px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Nama Nasabah" FieldName="Name" Width="200px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Tempat & Tanggal Lahir" FieldName="BirthDate" Width="200px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Agent ID" FieldName="Agent" Width="200px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Agent Name" FieldName="AgentName" Width="200px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Telepon" FieldName="Telepon" Width="200px"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Due Date" FieldName="Status" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Reason Call" FieldName="CallReason" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Status Call" FieldName="CallSelesai" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="URL Recording" FieldName="RecordingURL" Width="400px" PropertiesTextEdit-EncodeHtml="true" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Note" FieldName="Keterangan" Width="300px" PropertiesTextEdit-EncodeHtml="false" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                        </Columns>
                    </dx:ASPxGridView>
                    <dx:ASPxGridViewExporter ID="ASPxGridViewExporter2" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
                    <asp:SqlDataSource ID="XtraHistoryTransaksi" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-md-2">
                    <asp:DropDownList runat="server" ID="ddList" Height="33" CssClass="form-control input-sm">
                        <asp:ListItem Value="xlsx" Text="Excel" />
                        <asp:ListItem Value="xls" Text="Excel 97-2003" />
                        <asp:ListItem Value="pdf" Text="PDF" />
                        <asp:ListItem Value="rtf" Text="RTF" />
                        <asp:ListItem Value="csv" Text="CSV" />
                    </asp:DropDownList>
                </div>
                <div class="col-md-2">
                    <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis" ValidationGroup="SMLvalidationGroup"
                        Height="33px" Width="100%">
                    </dx:ASPxButton>
                </div>
            </div>
            <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server"></dx:ASPxGridViewExporter>
            <asp:SqlDataSource ID="DataSourceAgent" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
        </div>
    </div>
</asp:Content>
