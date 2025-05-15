$(document).ready(function () {
    TrmMenu()
    cmbMenuApplication()
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmMenu() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0003', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK36'}",
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
                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=showUpdate(" + json[i].SubMenuIDTree + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=showdDelete(" + json[i].SubMenuIDTree + ") style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].SubMenuIDTree, json[i].MenuName, json[i].SubMenuName, json[i].MenuTreeName, json[i].Url, json[i].Icon, StatusNya, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function cmbMenuApplication() {
    var cmbMenu = $('#cmbMenu1');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0001', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK36'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultMenu1 = "";

            for (i = 0; i < json.length; i++) {
                resultMenu1 = '<option value="' + json[i].MenuID + '">' + json[i].MenuName + '</option>';
                cmbMenu.append(resultMenu1);
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
    var cmbMenuLevel2 = $('#cmbMenu2');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK38'}",
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
function showUpdate(TrxID) {
    $('#cmbMenu1').attr('disabled', true);
    $('#cmbMenu2').attr('disabled', true);
    $('#TxtDetailMenu').attr('disabled', false);
    $('#cmbType').attr('disabled', false);
    $('#TxtUrl').attr('disabled', false);
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#addContactModal").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function showdDelete(TrxID) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#addContactModal").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    $('#cmbMenu1').attr('disabled', true);
    $('#cmbMenu2').attr('disabled', true);
    $('#TxtDetailMenu').attr('disabled', true);
    $('#cmbType').attr('disabled', true);
    $('#TxtUrl').attr('disabled', true);
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan() {
    if ($("#cmbMenu1").val() == '') {
        swal("Menu is empty");
        return false
    }
    if ($("#cmbMenu2").val() == '') {
        swal("Sub Menu Name is empty");
        return false
    }
    if ($("#TxtDetailMenu").val() == '') {
        swal("Detail Menu is empty");
        return false
    }
    if ($("#cmbType").val() == '') {
        swal("Type is empty");
        return false
    }
    if ($("#TxtUrl").val() == '') {
        swal("Url is empty");
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
                var form_data = JSON.stringify({ TrxMenuName: $("#cmbMenu1").val(), TrxSubMenuName: $("#cmbMenu2").val(), TrxDetailMenuName: $("#TxtDetailMenu").val(), TrxUrl: $("#TxtUrl").val(), Icon: $("#TxtIcon").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionDetailMenuApplication",
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
                                    $("#cmbMenu1").val("");
                                    $("#cmbMenu2").val("");
                                    $("#TxtDetailMenu").val("");
                                    $("#TxtUrl").val("");
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
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxDetailMenuName: $("#TxtDetailMenu").val(), TrxUrl: $("#TxtUrl").val(), Icon: $("#TxtIcon").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionDetailMenuApplication",
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
                                    $("#cmbMenu1").val("");
                                    $("#cmbMenu2").val("");
                                    $("#TxtDetailMenu").val("");
                                    $("#TxtUrl").val("");
                                    $("#cmbType").val("");
                                    $("#addContactModal").modal('hide');
                                    location.href = "Crm_Trm_3.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    location.href = "Crm_Trm_3.aspx";
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
                    url: "WebServiceGetDataMaster.asmx/DeleteTransactionDetailMenuApplication",
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
                                    $("#cmbMenu1").val("");
                                    $("#cmbMenu2").val("");
                                    $("#TxtDetailMenu").val("");
                                    $("#TxtUrl").val("");
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
        data: "{TrxID:'" + TrxSubMenuID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK39'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#cmbMenu1").val(json[i].MenuID);
                $("#cmbMenu2").find("option:selected").text(json[i].SubMenuName)
                $("#TxtDetailMenu").val(json[i].MenuTreeName);
                $("#cmbType").val(json[i].Param);
                $("#TxtUrl").val(json[i].Url);
                $("#TxtIcon").val(json[i].Icon);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}