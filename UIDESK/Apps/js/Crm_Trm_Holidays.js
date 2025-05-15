$(document).ready(function () {
    TrmHolidays();
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmHolidays() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmHolidays.asmx/TableHolidays",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].START_DATE);
                var milisegundos = parseInt(json[i].START_DATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var vs_endate = new Date(json[i].END_DATE);
                var enddate_milisegundos = parseInt(json[i].END_DATE.replace("/Date(", "").replace(")/", ""));
                var endate_Date = new Date(enddate_milisegundos).toLocaleDateString("en-UE");
                var endate_Time = new Date(enddate_milisegundos).toLocaleTimeString("en-UE");

                if (json[i].STATUS == "Y") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=DeleteKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
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
                myTable.row.add([json[i].ID, json[i].NAME, newDate + ' ' + newTime, endate_Date + ' ' + endate_Time, Status, urlclick]).draw(false);
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
    TrmSelected()
}
function DeleteKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelected()
}
function TrmSelected() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK138'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].START_DATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var Holiday_Start = newDate.split('/');

                var milisegundos_end = parseInt(json[i].END_DATE.replace("/Date(", "").replace(")/", ""));
                var newDate_end = new Date(milisegundos_end).toLocaleDateString("en-GB");
                var Holiday_End = newDate_end.split('/');
                $("#Holiday_Start").val(Holiday_Start[2] + "-" + Holiday_Start[1] + "-" + Holiday_Start[0]);
                $("#Holiday_End").val(Holiday_End[2] + "-" + Holiday_End[1] + "-" + Holiday_End[0]);
                $("#Holiday_Name").val(json[i].NAME);
                $("#cmbStatus").val(json[i].STATUS);

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
    if ($("#Holiday_Name").val() == "") {
        swal(
            '',
            'Holiday is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } 
    if ($("#Holiday_Start").val() == "") {
        swal(
            '',
            'Holiday Start Date is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Holiday_End").val() == "") {
        swal(
            '',
            'Holiday End Date is empty',
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxName: $("#Holiday_Name").val(), TrxStart: $("#Holiday_Start").val(), TrxEnd: $("#Holiday_End").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: 'INSERT' });
                $.ajax({
                    url: "asmx/TrmHolidays.asmx/InsertHolidays",
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
                                    $("#addContactModal").modal('hide');
                                    window.location.href = "Crm_Trm_Holidays.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
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
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal(
            '',
            'Data Holiday is empty',
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: $("#Holiday_Name").val(), TrxStart: $("#Holiday_Start").val(), TrxEnd: $("#Holiday_End").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: 'UPDATE' });
                $.ajax({
                    url: "asmx/TrmHolidays.asmx/UpdateHolidays",
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
                                    $("#addContactModal").modal('hide');
                                    window.location.href = "Crm_Trm_Holidays.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
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
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal("Data Holiday is empty")
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: $("#Holiday_Name").val(), TrxStart: $("#Holiday_Start").val(), TrxEnd: $("#Holiday_End").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: 'DELETE' });
                $.ajax({
                    url: "asmx/TrmHolidays.asmx/DeleteHolidays",
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
                                    $("#addContactModal").modal('hide');
                                    window.location.href = "Crm_Trm_Holidays.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
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