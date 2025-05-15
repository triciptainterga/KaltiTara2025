$(document).ready(function () {
    TrmMenu()
    CmbApplicationSystem();
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmMenu() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0002', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK36'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].Param == "Y") {
                    var StatusNya = "<span class='badge rounded-pill bg-primary' style='width: 80px;font-size:12px;'>Yes</span>"
                } else {
                    var StatusNya = "<span class='badge rounded-pill bg-primary' style='width: 80px;font-size:12px;'>No</span>"
                }
                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=showUpdate(" + json[i].SubMenuID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=showdDelete(" + json[i].SubMenuID + ") style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].SubMenuID, json[i].SystemName, json[i].MenuName, json[i].SubMenuName, json[i].Url, json[i].Icon, StatusNya, urlclick]).draw(false);

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
function getWS_CmbSystem() {
    var selectedText = $("#CmbSystem").find("option:selected").text();
    var selectedValue = $("#CmbSystem").val();
    var cmbMenu = $('#cmbMenu');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + selectedValue + "', TrxAction: 'UIDESK199'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultMenu = "";

            cmbMenu.empty();
            cmbMenu.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultMenu = '<option value="' + json[i].MenuID + '">' + json[i].MenuName + '</option>';
                cmbMenu.append(resultMenu);
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
    if ($("#cmbMenu").val() == '3026') {
        $("#cmbChannel").css("display", "block");
        $("#TxtSubMenuName").css("display", "none");
    } else {
        $("#TxtSubMenuName").css("display", "block");
        $("#cmbChannel").css("display", "none");
    }
    var selectedText = $("#cmbMenu").find("option:selected").text();
    var selectedValue = $("#cmbMenu").val();
    var cmbChannel = $('#cmbChannel');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0001', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK32'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultChannel = "";

            cmbChannel.empty();
            cmbChannel.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultChannel = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
                cmbChannel.append(resultChannel);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function showUpdate(TrxID) {
    $('#cmbMenu').attr('disabled', true);
    $('#TxtSubMenuName').attr('disabled', false);
    $('#cmbType').attr('disabled', false);
    $('#TxtUrl').attr('disabled', false);
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#cmbChannel").css("display", "none");
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function showdDelete(TrxID) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $('#cmbMenu').attr('disabled', true);
    $('#TxtSubMenuName').attr('disabled', true);
    $('#cmbType').attr('disabled', true);
    $('#TxtUrl').attr('disabled', true);
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan() {
    if ($("#cmbMenu").val() == '') {
        swal(
            '',
            'Menu is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    if ($("#cmbMenu").val() == "3026") {
        if ($("#cmbChannel").val() == '') {
            swal(
                '',
                'Sub Menu Name is empty',
                'info'
            ).then(function () {
                return false
            });
            return false
        } else {
            var TrxSubName = $("#cmbChannel").val()
        }
    } else {
        if ($("#TxtSubMenuName").val() == '') {
            swal(
                '',
                'Sub Menu Name is empty',
                'info'
            ).then(function () {
                return false
            });
            return false
        } else {
            var TrxSubName = $("#TxtSubMenuName").val()
        }
    }
    if ($("#TxtIcon").val() == '') {
        swal(
            '',
            'Icon is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    if ($("#cmbType").val() == '') {
        swal(
            '',
            'Type is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxMenuName: $("#cmbMenu").val(), TrxSubMenuName: TrxSubName, TrxUrl: $("#TxtUrl").val(), Icon: $("#TxtIcon").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionSubMenuApplication",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#cmbMenu").val("");
                                    $("#TxtUrl").val("");
                                    $("#TxtSubMenuName").val("");
                                    $("#cmbType").val("");
                                    $("#addContactModal").modal('hide');
                                    TrmMenu();
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    TrmMenu();
                                });
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxSubMenuName: $("#TxtSubMenuName").val(), TrxUrl: $("#TxtUrl").val(), Icon: $("#TxtIcon").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionSubMenuApplication",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#cmbMenu").val("");
                                    $("#TxtUrl").val("");
                                    $("#TxtSubMenuName").val("");
                                    $("#cmbType").val("");
                                    $("#addContactModal").modal('hide');
                                    TrmMenu();
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    TrmMenu();
                                });
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/DeleteTransactionSubMenuApplication",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#cmbMenu").val("");
                                    $("#TxtUrl").val("");
                                    $("#TxtSubMenuName").val("");
                                    $("#cmbType").val("");
                                    $("#addContactModal").modal('hide');
                                    TrmMenu();
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    TrmMenu();
                                });
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
function TrmSelect(TrxSubMenuID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxSubMenuID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK37'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#cmbMenu").val(json[i].MenuID);
                $("#TxtUrl").val(json[i].Url);
                $("#TxtSubMenuName").val(json[i].SubMenuName);
                $("#cmbType").val(json[i].Param);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}