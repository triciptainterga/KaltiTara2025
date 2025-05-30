﻿$(document).ready(function () {
    DataTableHour();
    $("#Simpan").hide();
    $("#Delete").hide();
});
function DataTableHour() {
    var myTable = $('#TableHours').DataTable();
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/JamOperasionalSite",
        data: "{ID:'0', Site:'0', Channel:'0', Hari:'0', StartTime:'0', EndTime:'0', Status:'0', UserName: '" + $("#hd_sessionLogin").val() + "', Action:'TABLE'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {
                //if (json[i].NA == "Y") {
                //    var Status = "Active"
                //} else {
                //    var Status = "Non Active"
                //}
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=EditJam(' + json[i].ID + ') >Edit</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].ID, json[i].Site, json[i].Channel, json[i].Hari, json[i].StartTime, json[i].EndTime, urlclick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function EditJam(ID) {
    $("#ContentPlaceHolder1_TrxID").val(ID);
    $("#Simpan").hide();
    $("#Delete").hide();
    $("#Update").show();
    $("#addContactModal").modal('show');
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/JamOperasionalSite",
        data: "{ID:'" + $("#ContentPlaceHolder1_TrxID").val() +"', Site:'0', Channel:'0', Hari:'0', StartTime:'0', EndTime:'0', Status:'0', UserName: '" + $("#hd_sessionLogin").val() + "', Action:'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $('#Site').val(json[i].Site)
                $('#Hari').val(json[i].Hari)
                $('#Jam_Mulai').val(json[i].StartTimeNya)
                $('#Jam_Selesai').val(json[i].EndTimeNya)
                //$('#cmbStatus').val(json[i].NA)

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
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Username is empty, Please relogin',
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

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), StartTime: $("#Jam_Mulai").val(), EndTime: $("#Jam_Selesai").val(), Status: $("#cmbStatus").val(), UserName: $("#hd_sessionLogin").val(), Action: "UPDATE" });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/JamOperasionalSite",
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
                                    window.location.href = "Crm_Trm_Operasional_MC.aspx?"
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
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