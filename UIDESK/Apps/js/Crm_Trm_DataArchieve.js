$(document).ready(function () {
    DataTableArchieve();
    $("#Update").hide();
    $("#Delete").hide();
    $("#Simpan").hide();
});
function DataTableArchieve() {
    var myTable = $('#DataTablesArchieve').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK227'}",
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
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].ID + ') >Edit</a>' +
                    '<a class="dropdown-item" href="#" onclick=DeleteKlik(' + json[i].ID + ') >Delete</a>' +
                    '</div>' +
                    '</div>'

                myTable.row.add([json[i].ID, json[i].MarkAsName, json[i].Number, urlclick]).draw(false);
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
    var Name = $("#TxtMarkAsName").val();
    var Nomor = $("#TxtNomor").val();
    if (Name == '') {
        swal(
            '',
            'Mark As Name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (Nomor == '') {
        swal(
            '',
            'Nomor is empty',
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

                var form_data = JSON.stringify({ ID: "0", UserName: $("#hd_sessionLogin").val(), Name: Name, Nomor: Nomor, Action: "INSERT" });
                $.ajax({
                    url: "asmx/Crm_Trm_DataArchieve.asmx/InsertArchieve",
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
                                    window.location.href = "Crm_Trm_DataArchieve.aspx?";
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
function ActionUpdate() {
    var Name = $("#TxtMarkAsName").val();
    var Nomor = $("#TxtNomor").val();
    if (Name == '') {
        swal(
            '',
            'Mark As Name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (Nomor == '') {
        swal(
            '',
            'Nomor is empty',
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
                var form_data = JSON.stringify({
                    ID: $("#ContentPlaceHolder1_TrxID").val(),
                    UserName: $("#hd_sessionLogin").val(), Name: Name,
                    Nomor: Nomor, Action:"UPDATE"
                });
                $.ajax({
                    url: "asmx/Crm_Trm_DataArchieve.asmx/InsertArchieve",
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
                                    window.location.href = "Crm_Trm_DataArchieve.aspx?";
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
function ActionDelete() {
    var Name = $("#TxtMarkAsName").val();
    var Nomor = $("#TxtNomor").val();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    ID: $("#ContentPlaceHolder1_TrxID").val(),
                    UserName: $("#hd_sessionLogin").val(), Name: Name,
                    Nomor: Nomor, Action: "DELETE"
                });
                $.ajax({
                    url: "asmx/Crm_Trm_DataArchieve.asmx/InsertArchieve",
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
                                    window.location.href = "Crm_Trm_DataArchieve.aspx?";
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
function Tambah() {
    $("#addContactModal").modal('show');
    $("#Update").hide();
    $("#Delete").hide();
    $("#Simpan").show();
}
function UpdateKlik(ID) {
    $("#ContentPlaceHolder1_TrxID").val(ID);
    $("#addContactModal").modal('show');
    $("#Update").show();
    $("#Delete").hide();
    $("#Simpan").hide();
    TrmSelect();
}
function DeleteKlik(ID) {
    $("#ContentPlaceHolder1_TrxID").val(ID);
    $("#addContactModal").modal('show');
    $("#Update").hide();
    $("#Delete").show();
    $("#Simpan").hide();
    TrmSelect();
}
function TrmSelect() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK228'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#TxtMarkAsName").val(json[i].MarkAsName)
                $("#TxtNomor").val(json[i].Number)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}