<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_KnowledgeBase.aspx.vb" Inherits="UIDESK.Crm_Trm_KnowledgeBase" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <dx:ASPxFileManager ID="fileManager" runat="server" Width="100%" Theme="MetropolisBlue">
                            <Settings RootFolder="~/apps/DocumentKnowledge" ThumbnailFolder="~/tmp/Thumbnails"
                                AllowedFileExtensions=".doc,.docx,.xls,.xlsx,.jpg,.pdf,.PNG"
                                InitialFolder="DocumentBC" />
                            <SettingsFileList View="Details">
                                <DetailsViewSettings AllowColumnResize="true" AllowColumnDragDrop="true" 
                                    AllowColumnSort="true" ShowHeaderFilterButton="true" />
                            </SettingsFileList>
                            <SettingsEditing AllowDownload="true" />
                        </dx:ASPxFileManager>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
