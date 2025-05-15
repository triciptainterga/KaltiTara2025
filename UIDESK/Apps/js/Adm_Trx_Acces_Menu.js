$(document).ready(function () {
    $("#Update").hide();
    $("#Delete").hide();
    CmbApplicationSystem();
    cmbLevelUser();
    DataTableTicketing();
    DataTableQualityMonitoring();
    DataTableDataScheduling();
});
function cmbLevelUser() {
    var cmbLevelUser = $('#cmbLevelUser');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK202'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultLevelUser = "";

            cmbLevelUser.empty();
            cmbLevelUser.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultLevelUser = '<option value="' + json[i].LevelUserID + '">' + json[i].Description + '</option>';
                cmbLevelUser.append(resultLevelUser);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbApplicationSystem() {
    var CmbSystem = $('#CmbSystem');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK198'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultSystem = "";

            CmbSystem.empty();
            CmbSystem.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultSystem = '<option value="' + json[i].System + '">' + json[i].SystemName + '</option>';
                CmbSystem.append(resultSystem);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_CmbSystem(value) {
    var selectedText = $("#CmbSystem").find("option:selected").text();
    var selectedValue = $("#CmbSystem").val();
    var cmbMenu1 = $('#cmbMenu1');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK199'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultMenu1 = "";

            cmbMenu1.empty();
            cmbMenu1.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultMenu1 = '<option value="' + json[i].MenuID + '">' + json[i].MenuName + '</option>';
                cmbMenu1.append(resultMenu1);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_CategoryType(value) {
    var selectedText = $("#cmbMenu1").find("option:selected").text();
    var selectedValue = $("#cmbMenu1").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    var cmbMenuLevel2 = $('#cmbMenu2');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK03'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultMenuLevel2 = "";

            cmbMenuLevel2.empty();
            cmbMenuLevel2.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultMenuLevel2 = '<option value="' + json[i].SubMenuID + '">' + json[i].SubMenuName + '</option>';
                cmbMenuLevel2.append(resultMenuLevel2);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_CategoryTypeDetail(value) {
    var selectedText = $("#cmbMenu2").find("option:selected").text();
    var selectedValue = $("#cmbMenu2").val();
    var cmbMenuLevel3 = $('#cmbMenu3');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK04'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultMenuLevel3 = "";

            cmbMenuLevel3.empty();
            cmbMenuLevel3.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultMenuLevel3 = '<option value="' + json[i].SubMenuIDTree + '">' + json[i].MenuTreeName + '</option>';
                cmbMenuLevel3.append(resultMenuLevel3);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function AddRoleUser() {
    $("#addContactModal").modal('show');
}
function DataTableTicketing() {
    var myTable = $('#TableTicketing').DataTable(
        {
            "order": [[1, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'1', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK209'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlclick = "<span class='badge-soft-danger'><i class='fas fa-trash' onclick=showdDelete('" + json[i].ID + "','" + encodeURI(json[i].MenuName) + "','" + encodeURI(json[i].SubMenuName) + "','" + encodeURI(json[i].MenuTreeName) + "','" + encodeURI(json[i].Description) + "') style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].ID, json[i].UserID, json[i].MenuName, json[i].SubMenuName, json[i].MenuTreeName, json[i].UserCreate, newDate + ' ' + newTime, urlclick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DataTableQualityMonitoring() {
    var myTable = $('#TableQM').DataTable(
        {
            "order": [[1, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'2', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK208'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlclick = "<span class='badge-soft-danger'><i class='fas fa-trash' onclick=showdDelete('" + json[i].ID + "','" + encodeURI(json[i].MenuName) + "','" + encodeURI(json[i].SubMenuName) + "','" + encodeURI(json[i].MenuTreeName) + "','" + encodeURI(json[i].Description) + "') style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].ID, json[i].UserID, json[i].MenuName, json[i].SubMenuName, json[i].MenuTreeName, json[i].UserCreate, newDate + ' ' + newTime, urlclick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DataTableDataScheduling() {
    var myTable = $('#DataScheduling').DataTable(
        {
            "order": [[1, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'4', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK211'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlclick = "<span class='badge-soft-danger'><i class='fas fa-trash' onclick=showdDelete('" + json[i].ID + "','" + encodeURI(json[i].MenuName) + "','" + encodeURI(json[i].SubMenuName) + "','" + encodeURI(json[i].MenuTreeName) + "','" + encodeURI(json[i].Description) + "') style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].ID, json[i].UserID, json[i].MenuName, json[i].SubMenuName, json[i].MenuTreeName, json[i].UserCreate, newDate + ' ' + newTime, urlclick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}