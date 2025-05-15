<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Xtra_ReportSLATicket.aspx.vb" Inherits="UIDESK.Xtra_ReportSLATicket" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-2">
                        <dx:ASPxDateEdit ID="dt_strdate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                            <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                <RequiredField IsRequired="true" ErrorText="Must be filled" />
                            </ValidationSettings>
                        </dx:ASPxDateEdit>
                    </div>
                    <div class="col-md-2">
                        <dx:ASPxDateEdit ID="dt_endate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                            <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                <RequiredField IsRequired="true" ErrorText="Must be filled" />
                            </ValidationSettings>
                        </dx:ASPxDateEdit>
                    </div>
                    <div class="col-md-2" style="margin-top: 5px;">
                        <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                            Height="33px" Width="100%">
                        </dx:ASPxButton>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView" runat="server" Width="100%"
                            DataSourceID="tempTrxSLA" Styles-Header-Font-Bold="true" Font-Size="X-Small" Theme="MetropolisBlue">
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
                                <dx:GridViewDataTextColumn Caption="No" FieldName="No" Width="40px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Interaction ID" FieldName="GenesysID" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Thread ID" FieldName="ThreadID" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Ticket Number" FieldName="TicketNumber" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Account" FieldName="AccountInbound" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Account ID" FieldName="AccountID" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Customer ID" FieldName="NIK" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Customer Name" FieldName="CustomerName" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Phone Number" FieldName="PhoneNumber" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Department" FieldName="Channel_Code" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Category" FieldName="CategoryName" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Enquiry Type" FieldName="Level1" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Enquiry Detail" FieldName="Level2" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Reason" FieldName="Level3" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Description" FieldName="DescriptionNonHtml" PropertiesTextEdit-EncodeHtml="false" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Ticket Status" FieldName="TicketStatus" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Group Name" FieldName="AgentGroupName" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Site Name" FieldName="SiteName" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Created By" FieldName="CreatedBy" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Created Date" FieldName="DateCreate" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Solved By" FieldName="UserSolved" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Solved Date" FieldName="DateSolvedDisplay" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Closed By" FieldName="ClosedBy" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Closed Date" FieldName="DateClose" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="SLA" FieldName="SLA" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Remarks SLA" FieldName="UsedDaySLAOK" Width="150px"></dx:GridViewDataTextColumn>
                                <%--<dx:GridViewDataTextColumn Caption="Within SLA" FieldName="WithinSLA" Width="150px"></dx:GridViewDataTextColumn>--%>
                            </Columns>
                        </dx:ASPxGridView>
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
                <asp:SqlDataSource ID="tempTrxSLA" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
            </div>
        </div>
    </div>
</asp:Content>
