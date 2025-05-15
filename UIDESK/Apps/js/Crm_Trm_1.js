$(document).ready(function () {
    TrmMenu();
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmMenu() {
    var myTable = $('#DataTableMenu').DataTable(
        {
            "order": [[0, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0001', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK36'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].MenuID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=DeleteKlik(" + json[i].MenuID + ") style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].MenuID, json[i].MenuName, json[i].Url, json[i].Number, json[i].Icon, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function UpdateKlik(TrxID) {
    $('#TxtName').attr('disabled', false);
    $('#TxtUrl').attr('disabled', false);
    $('#TxtNumber').attr('disabled', false);
    $('#TxtIcon').attr('disabled', false);
    $('#cmbType').attr('disabled', false);
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function DeleteKlik(TrxID) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $('#TxtName').attr('disabled', true);
    $('#TxtUrl').attr('disabled', true);
    $('#TxtNumber').attr('disabled', true);
    $('#TxtIcon').attr('disabled', true);
    $('#cmbType').attr('disabled', true);
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan() {
    if ($("#TxtName").val() == '') {
        swal("Name is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtName").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#TxtNumber").val() == '') {
        swal("Number is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtNumber").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#TxtIcon").val() == '') {
        swal("Icon is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtIcon").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#cmbType").val() == '') {
        swal("Type is empty");
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
                var form_data = JSON.stringify({ TrxName: $("#TxtName").val(), TrxUrl: $("#TxtUrl").val(), TrxNumber: $("#TxtNumber").val(), TrxIcon: $("#TxtIcon").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionMenuApplication",
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
                                    $("#TxtName").val("");
                                    $("#TxtUrl").val("");
                                    $("#TxtNumber").val("");
                                    $("#TxtIcon").val("");
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
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxName: $("#TxtName").val(), TrxUrl: $("#TxtUrl").val(), TrxNumber: $("#TxtNumber").val(), TrxIcon: $("#TxtIcon").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionMenuApplication",
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
                                    $("#TxtName").val("");
                                    $("#TxtUrl").val("");
                                    $("#TxtNumber").val("");
                                    $("#TxtIcon").val("");
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
                    url: "WebServiceGetDataMaster.asmx/DeleteTransactionMenuApplication",
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
                                    $("#TxtName").val("");
                                    $("#TxtUrl").val("");
                                    $("#TxtNumber").val("");
                                    $("#TxtIcon").val("");
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
function TrmSelect(TrxMenuID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxMenuID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK36'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#TxtName").val(json[i].MenuName);
                $("#TxtUrl").val(json[i].Url);
                $("#TxtNumber").val(json[i].Number);
                $("#TxtIcon").val(json[i].Icon);
                $("#cmbType").val(json[i].Activity);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}