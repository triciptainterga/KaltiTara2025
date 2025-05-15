<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Exp_DC.aspx.vb" Inherits="UIDESK.Exp_DC" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Customers</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" runat="server" Font-Size="X-Small"
                                DataSourceID="DSource" Width="100%" Styles-Header-Font-Bold="true" Theme="MetropolisBlue">
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
                                    <dx:GridViewDataTextColumn Caption="No" FieldName="ID" Width="40px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="CIF" FieldName="CIF" Width="40px" CellStyle-HorizontalAlign="Center" Visible="false"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Group ID" FieldName="GroupID" Width="40px" CellStyle-HorizontalAlign="Center" Visible="false"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Id Customer" FieldName="CustomerID" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Nama Customer" FieldName="Name" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Comapany ID" FieldName="CompID" Width="200px" Visible="false"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Nama Perusahaan" FieldName="NamaPerusahaan" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Account ID" FieldName="AccountID" Width="200px" Visible="false"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Email" FieldName="Email" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Alamat" FieldName="Alamat" Width="200px"></dx:GridViewDataTextColumn>
                                    <%--<dx:GridViewDataTextColumn Caption="NPWP" FieldName="NPWP" Width="200px"></dx:GridViewDataTextColumn>--%>
                                    <dx:GridViewDataTextColumn Caption="Facebook" FieldName="Facebook" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Twitter" FieldName="Twitter" PropertiesTextEdit-EncodeHtml="false" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Nomor Handphone" FieldName="HP" PropertiesTextEdit-EncodeHtml="false" Width="200px"></dx:GridViewDataTextColumn>                                  
                                    <dx:GridViewDataTextColumn Caption="Status" FieldName="Status" Width="150px" Visible="false"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="User Create Customer" FieldName="UserCreateCustomer" HeaderStyle-HorizontalAlign="left" Width="200px"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Date Create Customer" FieldName="DateCreateCustomer" HeaderStyle-HorizontalAlign="left" Width="200px"></dx:GridViewDataTextColumn>
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
                    <asp:SqlDataSource ID="DSource" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
