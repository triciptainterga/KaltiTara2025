<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Xtra_ReportTransactionMultichat.aspx.vb" Inherits="UIDESK.Xtra_ReportTransactionMultichat" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

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
                                Height="32px" Width="100%">
                            </dx:ASPxButton>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" runat="server" Font-Size="X-Small"
                                DataSourceID="TempBaseTrx" Width="100%" Styles-Header-Font-Bold="true" Theme="MetropolisBlue">
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
                                    <dx:GridViewDataTextColumn Caption="No" FieldName="No" Width="40px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Ticket Number" FieldName="TicketNumber" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Channel" FieldName="TicketSourceName" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataDateColumn Caption="Date" FieldName="CreatedDate" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                    <dx:GridViewDataTextColumn Caption="Customer Name" FieldName="CreatedByNew" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Lokasi Kantor" FieldName="Kantor" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Email Address" FieldName="Email" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Phone" FieldName="HP" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Topik" FieldName="Level3" Width="300px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Category" FieldName="CategoryName" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Sub Category" FieldName="Level1" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Site" FieldName="SiteName" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataDateColumn Caption="Chat Time" FieldName="ChatTime" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                                    <dx:GridViewDataDateColumn Caption="Distribute Time" FieldName="Distribute" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                                    <dx:GridViewDataDateColumn Caption="FRT" FieldName="Frt" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                                    <dx:GridViewDataDateColumn Caption="Handling" FieldName="HandlingTime" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                                    <dx:GridViewDataTextColumn Caption="Total" FieldName="Total" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Agent Name" FieldName="ClosedByNew" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Incoming" FieldName="Incoming" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Incoming Chat" FieldName="PertanyaanPJ" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Out Going" FieldName="OutGoingChat" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Out Going Chat" FieldName="JawabanAgent" Width="150px"></dx:GridViewDataTextColumn>

                                    <%--
								   
								   <dx:GridViewDataTextColumn Caption="Enquiry Detail" FieldName="Level2" Width="300px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Pertanyaan" FieldName="DescriptionNonHtml" PropertiesTextEdit-EncodeHtml="false" Width="650px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Jawaban" FieldName="ResponComplaint" PropertiesTextEdit-EncodeHtml="false" Width="650px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Priority" FieldName="SkalaPrioritas" HeaderStyle-HorizontalAlign="left" Width="150px"></dx:GridViewDataTextColumn>
                                   <dx:GridViewDataTextColumn Caption="Name" FieldName="CustomerName" Width="150px"></dx:GridViewDataTextColumn>
                                   <dx:GridViewDataTextColumn Caption="Email Type" FieldName="EmailType" Width="150px"></dx:GridViewDataTextColumn>
                               
                                    <dx:GridViewDataTextColumn Caption="Ticket Status" FieldName="Status" Width="150px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Group Name" FieldName="AgentGroupName" Width="150px"></dx:GridViewDataTextColumn>
                                  
                                     <dx:GridViewDataDateColumn Caption="Closed Date" FieldName="ClosedDate" Width="150px" ></dx:GridViewDataDateColumn>
                                     <dx:GridViewDataTextColumn Caption="Time Start to Distribute" FieldName="StartToDistribute" Width="150px" ></dx:GridViewDataTextColumn>
                                     <dx:GridViewDataTextColumn Caption="EndChat" FieldName="EndChat" Width="150px" ></dx:GridViewDataTextColumn>
                                     
                                    
                                    <dx:GridViewDataTextColumn Caption="Incoming" FieldName="PertanyaanPJ" Width="150px"></dx:GridViewDataTextColumn>
                                       <dx:GridViewDataTextColumn Caption="Solved By" FieldName="NewSolvedBy" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Solved Date" FieldName="NewDateSolved" Width="150px"></dx:GridViewDataTextColumn>--%>
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
                    <asp:SqlDataSource ID="TempBaseTrx" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
