﻿<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Xtra_ReportInteractionBOT.aspx.vb" Inherits="UIDESK.Xtra_ReportInteractionBOT" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Report Interaction BOT</h4>
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
                            <dx:ASPxGridView ID="ASPxGridView1" runat="server" KeyFieldName="ID" Theme="MetropolisBlue"
                                Width="100%" DataSourceID="tempTrxInteraction" Styles-Header-Font-Bold="true" Font-Size="X-Small"
                                SettingsPager-PageSize="10">
                                <SettingsPager>
                                    <AllButton Text="All">
                                    </AllButton>
                                    <NextPageButton Text="Next &gt;">
                                    </NextPageButton>
                                    <PrevPageButton Text="&lt; Prev">
                                    </PrevPageButton>
                                    <PageSizeItemSettings Visible="true" Items="15, 20, 25" ShowAllItem="true" />
                                </SettingsPager>
                                <SettingsEditing Mode="Inline" />
                                <Settings ShowFilterRow="false" ShowFilterRowMenu="false"
                                    ShowVerticalScrollBar="false" ShowHorizontalScrollBar="true" />
                                <SettingsBehavior ConfirmDelete="true" />
                                <Columns>
                                    <dx:GridViewDataTextColumn Caption="ID" FieldName="ID" ReadOnly="true" Width="50px" Visible="false"
                                        PropertiesTextEdit-ReadOnlyStyle-BackColor="LightGray">
                                    </dx:GridViewDataTextColumn>
                                    <%--id interaksi, bot mana, channel, chat bybuser or bot, messagenya,--%>
                                    <dx:GridViewDataTextColumn Caption="Session Id" FieldName="bot_session_id" Visible="false" Width="150px" GroupIndex="1" VisibleIndex="0"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Interaction ID" FieldName="Id_interaksi" Width="200px" VisibleIndex="2"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Bot" FieldName="Bot" Width="160px" VisibleIndex="3"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Channel" FieldName="channel" Width="300px" VisibleIndex="4"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Chat by user or bot" FieldName="sender" Width="160px" VisibleIndex="5"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Message" FieldName="message" Width="160px" VisibleIndex="6"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Date" FieldName="created_at" Width="160px" VisibleIndex="7"></dx:GridViewDataTextColumn>
                                </Columns>
                                <SettingsBehavior AutoExpandAllGroups="true" />
                                <Settings ShowGroupedColumns="True" />
                                <Settings ShowGroupPanel="True" />
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
                    <asp:SqlDataSource ID="tempTrxInteraction" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
