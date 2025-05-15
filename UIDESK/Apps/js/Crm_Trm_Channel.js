$(document).ready(function () {
    TrmChannel();
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmChannel() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmChannel",
        data: "{TrxID: '-', TrxName: '-', TrxStatus: '-', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].NA == "Y") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].TypeID + ') >Edit</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].TypeID, json[i].Name, Status, urlclick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Tambah() {
    $("#addContactModal").modal('show');
    $("#ContentPlaceHolder1_TrxID").val("");
    $("#TxtChannel").val("")
    $("#cmbStatus").val("")
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
}
function UpdateKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelected()
}
function ActionUpdate() {
    var TrxName = $("#TxtChannel").val();
    var TrxStatus = $("#cmbStatus").val();
    if (TrxName == '') {
        swal(
            '',
            'Channel is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TrxName)) {
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
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + TrxName + "', TrxAction: 'UIDESK145'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length != 0) {
                swal(
                    '',
                    '' + TrxName + ' already exits',
                    'error'
                ).then(function () {
                    window.location.href = "Crm_Trm_Channel.aspx";
                });
                return false;
            } else {
                swal({
                    title: "Do you want to process?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {

                            var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxStatus: TrxStatus });
                            $.ajax({
                                url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmChannel",
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
                                                window.location.href = "Crm_Trm_Channel.aspx";
                                            });
                                        } else {
                                            swal(
                                                '',
                                                'Update Data Has Been Failed !',
                                                'error'
                                            ).then(function () {
                                                return false
                                            });
                                            return false
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

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })   
}
function ActionSimpan() {
    var TrxStatus = $("#cmbStatus").val();
    if ($("#TxtChannel").val() == '') {
        swal(
            '',
            'Channel transaction is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtChannel").val())) {
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
    if ($("#cmbStatus").val() == '') {
        swal(
            '',
            'Status is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxName = $("#TxtChannel").val();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxName + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK144'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length != 0) {
                swal(
                    '',
                    '' + TrxName + ' already exits',
                    'error'
                ).then(function () {
                    window.location.href = "Crm_Trm_Channel.aspx";
                });
                return false;
            } else {
                swal({
                    title: "Do you want to process?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {

                            var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxStatus: TrxStatus });
                            $.ajax({
                                url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmChannel",
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
                                                window.location.href = "Crm_Trm_Channel.aspx";
                                            });
                                        } else {
                                            swal(
                                                '',
                                                'Insert Data Has Been Failed !',
                                                'error'
                                            ).then(function () {
                                                return false
                                            });
                                            return false
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

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/DeleteTransactionTrmChannel",
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
                                    window.location.href = "Crm_Trm_Channel.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    return false
                                });
                                return false
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
function TrmSelected() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK114'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#TxtChannel").val(json[i].Name)
                $("#cmbStatus").val(json[i].NA)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function ActionCheck() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK144'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length != 0) {
                swal(
                    '',
                    '' + TrxName + ' already exits',
                    'error'
                ).then(function () {
                    window.location.href = "Crm_Trm_Channel.aspx";
                });
                return false;
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}