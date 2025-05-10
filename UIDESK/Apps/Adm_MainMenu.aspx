<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Adm_MainMenu.aspx.vb" Inherits="UIDESK.Adm_MainMenu" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Adm_MainMenu.js"></script>
<script>
    $(document).ready(function () {
        var originalJson = JSON.parse($('#originalJson').text());

        // Convert original JSON to "json four"
        var jsonFour = {};


        $.each(originalJson, function (index, item) {
            var systemName = item.SystemName;
            var menuName = item.MenuName;
            var submenuId = item.SubMenuID;
            var submenuName = item.SubMenuName;
            var url = item.Url_Dua;

            if (!(systemName in jsonFour)) {
                jsonFour[systemName] = {};
            }

            if (!(menuName in jsonFour[systemName])) {
                jsonFour[systemName][menuName] = {};
                jsonFour[systemName][menuName]["Menus"] = [];
            }

            var menuExists = false;
            $.each(jsonFour[systemName][menuName]["Menus"], function (idx, menu) {
                if (menu.SubMenuID === submenuId) {
                    menuExists = true;
                    return false; // Exit each loop
                }
            });

            if (!menuExists) {
                jsonFour[systemName][menuName]["Menus"].push({
                    "SubMenuID": submenuId,
                    "SubMenuName": submenuName,
                    "Url": url
                });
            }
        });

        // Convert JSON object to string for display
        var jsonFourString = JSON.stringify(jsonFour, null, 2);
        $('#jsonFour').text(jsonFourString);
    });
</script>

<pre id="originalJson">
[
  {
    "System": 1,
    "SystemName": "Ticketing System",
    "MenuID": 1008,
    "MenuName": "Master Data",
    "IconMenu": "database",
    "Url_Satu": "",
    "Number": 3,
    "SubMenuID": 4801,
    "SubMenuName": "Data Category",
    "Url_Dua": "Crm_Trm_Category.aspx",
    "SubMenuIDTree": null,
    "MenuTreeName": null,
    "Url_Tiga": null
  },
  {
    "System": 1,
    "SystemName": "Ticketing System",
    "MenuID": 1008,
    "MenuName": "Master Data",
    "IconMenu": "database",
    "Url_Satu": "",
    "Number": 3,
    "SubMenuID": 4801,
    "SubMenuName": "Data Category",
    "Url_Dua": "Crm_Trm_Category.aspx",
    "SubMenuIDTree": null,
    "MenuTreeName": null,
    "Url_Tiga": null
  },
  {
    "System": 1,
    "SystemName": "Ticketing System",
    "MenuID": 1008,
    "MenuName": "Master Data",
    "IconMenu": "database",
    "Url_Satu": "",
    "Number": 3,
    "SubMenuID": 4802,
    "SubMenuName": "Data Enquiry Type",
    "Url_Dua": "Crm_Trm_Category_Type.aspx",
    "SubMenuIDTree": null,
    "MenuTreeName": null,
    "Url_Tiga": null
  },
  {
    "System": 1,
    "SystemName": "Ticketing System",
    "MenuID": 1008,
    "MenuName": "Master Data",
    "IconMenu": "database",
    "Url_Satu": "",
    "Number": 3,
    "SubMenuID": 4803,
    "SubMenuName": "Data Enquiry Detail",
    "Url_Dua": "Crm_Trm_Category_Detail.aspx",
    "SubMenuIDTree": null,
    "MenuTreeName": null,
    "Url_Tiga": null
  },
  // Additional items...
]
</pre>

<pre id="jsonFour">
  <!-- JSON "four" will be generated here -->
</pre>

</asp:Content>
