$(document).ready(function () {
    CmbApplicationSystem();
    cmbLevelUser();
    TrmUserManagement("0");
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmUserManagement(TrxLevelUser) {
    if (TrxLevelUser == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = TrxLevelUser;
    }
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        //url: "WebServiceGetDataMaster.asmx/TableTransactionTrmSettingUser",
        //data: "{LevelUserID: '" + KondisiData + "',TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK211'}",
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

                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-trash' onclick=showdDelete('" + json[i].ID + "','" + encodeURI(json[i].MenuName) + "','" + encodeURI(json[i].SubMenuName) + "','" + encodeURI(json[i].MenuTreeName) + "','" + encodeURI(json[i].Description) + "') style='cursor:pointer;'></i></span>"
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
function cmbLevelUser() {
    var cmbLevelUser = $('#cmbLevelUser');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK210'}",
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
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK213'}",
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
function OnchangeCmbLevelUser() {
    var selectedText = $("#cmbLevelUser").find("option:selected").text();
    var selectedValue = $("#cmbLevelUser").val();
    TrmUserManagement($("#cmbLevelUser").val())
}
function AddUser() {
    $("#addContactModal").modal('show');
}
function showdDelete(TrxID, MenuName, SubMenuName, MenuTreeName, Description) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#cmbMenu1 option:selected").text(decodeURI(SubMenuName));
    $('#cmbMenu1').attr('disabled', true);
    if (decodeURI(MenuTreeName) == '' || decodeURI(MenuTreeName) == 'null') {
        $("#cmbMenu2 option:selected").text("Select");
        $('#cmbMenu2').attr('disabled', true);
    } else {
        $("#cmbMenu2 option:selected").text(decodeURI(MenuTreeName));
        $('#cmbMenu2').attr('disabled', true);
    }
    if (decodeURI(MenuTreeName) == '' || decodeURI(MenuTreeName) == 'null') {
        $("#cmbMenu3 option:selected").text("Select");
        $('#cmbMenu3').attr('disabled', true);
    } else {
        $("#cmbMenu3 option:selected").text(decodeURI(MenuTreeName));
        $('#cmbMenu3').attr('disabled', true);
    }
    if (decodeURI(Description) == '' || decodeURI(Description) == 'null') {
        $("#TxtDescription").val("");
    } else {
        $("#TxtDescription").val(decodeURI(Description));
    }
}
function ActionSimpan() {
    var CmbLevelUserText = $("#cmbLevelUser").find("option:selected").text();
    var CmbLevelUserValue = $("#cmbLevelUser").val();
    var CmbSystemText = $("#CmbSystem").find("option:selected").text();
    var CmbSystemValue = $("#CmbSystem").val();
    var CmbMenu1Text = $("#cmbMenu1").find("option:selected").text();
    var CmbMenu1Value = $("#cmbMenu1").val();
    var CmbMenu2Text = $("#cmbMenu2").find("option:selected").text();
    var CmbMenu2Value = $("#cmbMenu2").val();
    var CmbMenu3Text = $("#cmbMenu3").find("option:selected").text();
    var CmbMenu3Value = $("#cmbMenu3").val();
    var TrxDescription = $("#TxtDescription").val();

    if (CmbLevelUserValue == '') {
        swal(
            '',
            'Level User is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (CmbMenu1Value == '') {
        swal(
            '',
            'Menu Level 1 is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxDescription = CKEDITOR.instances.TrxDescription.getData();
    if (TrxDescription == '') {
        swal(
            '',
            'Description is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxSystem: CmbSystemValue, TrxMenuID: CmbMenu1Value, TrxSubMenuID: CmbMenu2Value, TrxTreeMenuID: CmbMenu3Value, TrxLevelUserID: CmbLevelUserValue, TrxDescription: TrxDescription, TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmSettingUser",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#TxtDescription").val("");
                                    $("#addContactModal").modal('hide');
                                    location.href = "Crm_Trm_User_Management.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    return false;
                                });
                                return false;
                            }
                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });
            }
        });
}
function ActionUpdate() {
    var CmbLevelUserText = $("#cmbLevelUser").find("option:selected").text();
    var CmbLevelUserValue = $("#cmbLevelUser").val();
    var TrxID = $("#ContentPlaceHolder1_TrxID").val();
    var TrxDescription = $("#TxtDescription").val();
    if (TrxDescription == '') {
        swal(
            '',
            'Description is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: TrxID, TrxDescription: TrxDescription, TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmSettingUser",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#TxtDescription").text("");
                                    $("#addContactModal").modal('hide');
                                    location.href = "Crm_Trm_User_Management.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    return false;
                                });
                                return false;
                            }
                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });
            }
        });
}
function ActionDelete() {
    var CmbLevelUserText = $("#cmbLevelUser").find("option:selected").text();
    var CmbLevelUserValue = $("#cmbLevelUser").val();
    var TrxID = $("#ContentPlaceHolder1_TrxID").val();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: TrxID, TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/DeleteTransactionTrmSettingUser",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#TxtDescription").val("");
                                    $("#addContactModal").modal('hide');
                                    location.href = "Crm_Trm_User_Management.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    return false;
                                });
                                return false;
                            }
                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });
            }
        });
}