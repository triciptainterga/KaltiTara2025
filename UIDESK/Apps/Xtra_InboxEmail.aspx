﻿<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Xtra_InboxEmail.aspx.vb" Inherits="UIDESK.Xtra_InboxEmail" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Report Inbox Email</h4>
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
                        <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" DataSourceID="tempTrxEmail" runat="server" Width="100%"
                            Font-Size="Small" Styles-Header-Font-Bold="true" Theme="MetropolisBlue" Styles-Cell-HorizontalAlign="Center" Styles-Header-HorizontalAlign="Center">
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
                                <dx:GridViewDataTextColumn Caption="ID" FieldName="IVC_ID" Width="60px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Site" FieldName="SiteNya" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Ticket Number" FieldName="TicketNumber" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Agent" FieldName="AgentName" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Type" FieldName="Type" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Detail Type" FieldName="DetailType" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="From" FieldName="EFROM" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="To" FieldName="ETO" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Subject" FieldName="ESUBJECT" Width="500px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataDateColumn Caption="Date Email" FieldName="Email_Date" Width="250px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                                <dx:GridViewDataDateColumn Caption="Date Distribusi Agent" FieldName="DATE_BLENDING" Width="250px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                                <dx:GridViewDataDateColumn Caption="Date Agent Read" FieldName="AgentRead" Width="250px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                                <dx:GridViewDataDateColumn Caption="Date Send Team Leader" FieldName="DateSentLeader" Width="250px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                                <dx:GridViewDataDateColumn Caption="Date Read Team Leader" FieldName="DateReadLeader" Width="250px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                                <dx:GridViewDataDateColumn Caption="Date Send Email To PJ" FieldName="DateSendPJ" Width="250px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                            </Columns>
                        </dx:ASPxGridView>
                        <hr />
                        <div class="row">
                            <div class="col-sm-2">
                                <asp:DropDownList runat="server" ID="ddList" Height="30" CssClass="form-control input-sm">
                                    <asp:ListItem Value="xlsx" Text="Excel" />
                                    <asp:ListItem Value="xls" Text="Excel 97-2003" />
                                    <%--<asp:ListItem Value="pdf" Text="PDF" />
                                    <asp:ListItem Value="rtf" Text="RTF" />--%>
                                    <asp:ListItem Value="csv" Text="CSV" />
                                </asp:DropDownList>
                            </div>
                            <div class="col-sm-2">
                                <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis"
                                    HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                                </dx:ASPxButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
    <asp:SqlDataSource ID="tempTrxEmail" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
</asp:Content>
