$(document).ready(function () {
    TrmAuxReason();
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmAuxReason() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmAuxReason.asmx/TableMasterAuxReason",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
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
                    //'<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].ID + ') >Edit</a>' +
                    '<a class="dropdown-item" href="#" onclick=DeleteKlik(' + json[i].ID + ') >Delete</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].ID, json[i].Deskripsi, Status, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectAuxReason() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmAuxReason.asmx/SelectedMasterAuxReason",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
                $("#Aux_Reason").val(json[i].Deskripsi);
                $("#cmbStatus").val(json[i].NA);
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
    TrmSelectAuxReason()
}
function DeleteKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectAuxReason()
}
function ActionSimpan() {
    if ($("#Aux_Reason").val() == "") {
        swal(
            '',
            'Aux Reason is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#cmbStatus").val() == "" || $("#cmbStatus").val() == "Select") {
        swal(
            '',
            'Status is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        TrxID: "0", TrxAuxReason: $("#Aux_Reason").val(), TrxAuxStatus: $("#cmbStatus").val(),
        TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'CHECK'
    });
    $.ajax({
        type: "POST",
        url: "asmx/TrmAuxReason.asmx/MasterAuxReason",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            if (json.length != 0) {

                swal(
                    '',
                    '' + $("#Aux_Reason").val() + ' already exits',
                    'error'
                ).then(function () {
                    window.location.href = "Crm_Trm_Aux_Reason.aspx";
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

                            var form_data = JSON.stringify({
                                TrxID: "0", TrxAuxReason: $("#Aux_Reason").val(), TrxAuxStatus: $("#cmbStatus").val(),
                                TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'INSERT'
                            });
                            $.ajax({
                                url: "asmx/TrmAuxReason.asmx/MasterAuxReason",
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
                                                window.location.href = "Crm_Trm_Aux_Reason.aspx";
                                            });
                                        } else {
                                            swal(
                                                '',
                                                'Insert Data Has Been Failed !',
                                                'error'
                                            ).then(function () {
                                                $("#addContactModal").modal('hide');
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

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    }) 
}
function ActionUpdate() {
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal(
            '',
            'Aux reason is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxAuxReason: $("#Aux_Reason").val(), TrxAuxStatus: $("#cmbStatus").val(),
        TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'CHECK_UPDATE'
    });
    $.ajax({
        type: "POST",
        url: "asmx/TrmAuxReason.asmx/MasterAuxReason",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            if (json.length != 0) {

                swal(
                    '',
                    '' + $("#Aux_Reason").val() + ' already exits',
                    'error'
                ).then(function () {
                    window.location.href = "Crm_Trm_Aux_Reason.aspx";
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

                            var form_data = JSON.stringify({
                                TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxAuxReason: $("#Aux_Reason").val(),
                                TrxAuxStatus: $("#cmbStatus").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'UPDATE'
                            });
                            $.ajax({
                                url: "asmx/TrmAuxReason.asmx/MasterAuxReason",
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
                                                window.location.href = "Crm_Trm_Aux_Reason.aspx";
                                            });
                                        } else {
                                            swal(
                                                '',
                                                'Update Data Has Been Failed !',
                                                'error'
                                            ).then(function () {
                                                $("#addContactModal").modal('hide');
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

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })   
}
function ActionDelete() {
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal(
            '',
            'Aux reason is empty',
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxAuxReason: $("#Aux_Reason").val(), TrxAuxStatus: $("#cmbStatus").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'DELETE' });
                $.ajax({
                    url: "asmx/TrmAuxReason.asmx/MasterAuxReason",
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
                                    window.location.href = "Crm_Trm_Aux_Reason.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
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
function ActionCheck() {
    
}