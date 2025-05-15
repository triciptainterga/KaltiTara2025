$(document).ready(function () {
    DataListKantor();    
    $("#UpdateKantor").hide();
});
function DataListKantor() {
    var myTable = $('#TableKantor').DataTable(
        {
            "order": [[0, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK176'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-primary'><i class='fas fa-eye' onclick=PreviewKlik('" + json[i].ID + "') style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-primary'><i class='fas fa-trash' onclick=DeleteKlik('" + json[i].ID + "') style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].ID, json[i].NamaKantor, json[i].Telepon, json[i].Email, json[i].Alamat, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function FormKantor() {
    EnableKantor();
    $("#FormKantor").modal('show');
    $("#SimpanKantor").show();
    $("#UpdateKantor").hide();
    $("#DeleteKantor").hide();
}
function EnableKantor() {
    $("#Kantor_Nama").val("");
    $("#Kantor_Email").val("");
    $("#Kantor_Telepon").val("");
    $("#Kantor_Alamat").val("");
}
function UpdateKlik(TrxID) {
    $("#FormKantor").modal('show');
    $("#SimpanKantor").hide();
    $("#UpdateKantor").show();
    $("#DeleteKantor").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelect();
}
function PreviewKlik(TrxID){
    $("#FormKantor").modal('show');
    $("#SimpanKantor").hide();
    $("#UpdateKantor").hide();
    $("#DeleteKantor").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelect();
}
function DeleteKlik(TrxID) {
    $("#FormKantor").modal('show');
    $("#SimpanKantor").hide();
    $("#UpdateKantor").hide();
    $("#DeleteKantor").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelect();
}
function TrmSelect() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK176'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {


                $("#Kantor_Nama").val(json[i].NamaKantor);
                $("#Kantor_Email").val(json[i].Email);
                $("#Kantor_Telepon").val(json[i].Telepon);
                $("#Kantor_Alamat").val(json[i].Alamat);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionSimpanKantor() {
    if ($("#Kantor_Nama").val() == "") {
        swal(
            '',
            'Name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //if ($("#Kantor_Email").val() == "") {
    //    swal(
    //        '',
    //        'Email is empty',
    //        'info'
    //    ).then(function () {
    //        return false;
    //    });
    //    return false;
    //}
    //if ($("#Kantor_Telepon").val() == '') {
    //    swal(
    //        '',
    //        'Telepon is empty',
    //        'info'
    //    ).then(function () {
    //        return false;
    //    });
    //    return false;
    //}
    //if ($("#Kantor_Alamat").val() == '') {
    //    swal(
    //        '',
    //        'Telepon is empty',
    //        'info'
    //    ).then(function () {
    //        return false;
    //    });
    //    return false;
    //}
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Kantor_Nama").val(), TrxEmail: $("#Kantor_Email").val(), TrxTelepon: $("#Kantor_Telepon").val(),
                    TrxAlamat: $("#Kantor_Alamat").val(), TrxAction: "INSERT"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/BRA_Kantor",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Kantor Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trm_Kantor.aspx?"
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Kantor Has Been Failed !',
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
                    }
                })

            }
        })
}
function ActionUpdateKantor() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Kantor_Nama").val(), TrxEmail: $("#Kantor_Email").val(), TrxTelepon: $("#Kantor_Telepon").val(),
                    TrxAlamat: $("#Kantor_Alamat").val(), TrxAction: "UPDATE"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/BRA_Kantor",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Kantor Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trm_Kantor.aspx?"
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Kantor Has Been Failed !',
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
                    }
                })

            }
        })
}
function ActionDeleteKantor() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Kantor_Nama").val(), TrxEmail: $("#Kantor_Email").val(), TrxTelepon: $("#Kantor_Telepon").val(),
                    TrxAlamat: $("#Kantor_Alamat").val(), TrxAction: "DELETE"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/BRA_Kantor",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Kantor Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trm_Kantor.aspx?"
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Kantor Has Been Failed !',
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
                    }
                })

            }
        })
}