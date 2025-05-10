<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_ExportUser.aspx.vb" Inherits="UIDESK.Crm_Trm_ExportUser" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView" runat="server" Width="100%" Styles-Header-HorizontalAlign="left"
                            Theme="MetropolisBlue" DataSourceID="XtraUser" Styles-Header-Font-Bold="true" Font-Size="X-Small">
                            <SettingsPager>
                                <AllButton Text="All">
                                </AllButton>
                                <NextPageButton Text="Next &gt;">
                                </NextPageButton>
                                <PrevPageButton Text="&lt; Prev">
                                </PrevPageButton>
                                <PageSizeItemSettings Visible="true" Items="10, 15, 20, 50" ShowAllItem="true" />
                            </SettingsPager>
                            <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="false" />
                            <Columns>
                                <%--<dx:GridViewDataTextColumn Caption="ID" FieldName="NoUrut" Width="40px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="User Name" FieldName="USERNAME" Width="205px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Name" FieldName="NAME" Width="205px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Level User" FieldName="LEVELUSER" Width="205px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Email Address" FieldName="EMAIL_ADDRESS" Width="205px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                <%--<dx:GridViewDataTextColumn Caption="Tipe User" FieldName="QA_TYPE" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="Group Channel" FieldName="ORGANIZATION_NAME" Width="205px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Group Layanan" FieldName="NamaGrup" Width="205px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                <%--<dx:GridViewDataTextColumn Caption="Team Layanan" FieldName="LayananTeam" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="Status" FieldName="StatusNya" Width="205px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                            </Columns>
                        </dx:ASPxGridView>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-sm-2">
                        <asp:DropDownList runat="server" ID="ddList" Height="33" CssClass="form-control input-sm">
                            <asp:ListItem Value="xlsx" Text="Excel" />
                            <asp:ListItem Value="xls" Text="Excel 97-2003" />
                            <%--<asp:ListItem Value="pdf" Text="PDF" />--%>
                            <asp:ListItem Value="rtf" Text="RTF" />
                            <asp:ListItem Value="csv" Text="CSV" />
                        </asp:DropDownList>
                    </div>
                    <div class="col-sm-2">
                        <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis"
                            HoverStyle-BackColor="#0072C6" Height="33px" Width="100%" HoverStyle-Border-BorderColor="#0072C6">
                        </dx:ASPxButton>
                    </div>
                </div>
                <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
                <asp:SqlDataSource ID="XtraUser" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
            </div>
        </div>
</asp:Content>
