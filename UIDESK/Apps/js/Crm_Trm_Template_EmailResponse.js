$(document).ready(function () {
    DataTables()
});
function DataTables() {
    var myTable = $('#TableResponse').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
        data: "{ID:'0', Template:'0', Format:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'TABLE'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].STATE == "Y") {
                    var TrxParam = "Active"
                } else {
                    var TrxParam = "Non Active"
                }
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateTransaction(' + json[i].ID + ') >Edit</a>' +
                    '<a class="dropdown-item" href="#" onclick=DeleteTransaction(' + json[i].ID + ') >Delete</a>' +
                    '</div>' +
                    '</div>'
                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateTransaction(" + json[i].ID + ") style='cursor:pointer;'></i></span><span class='badge-soft-primary'><i class='fas fa-trash' onclick=DeleteTransaction(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].ID, json[i].TEMPLATE_RESPONSE.substring(0, 100) + "..", json[i].FORMAT, TrxParam, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function NewTransaction() {
    Cleansing()
    $("#addContactModal").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
}
function UpdateTransaction(ID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(ID);
    TrmSelect()
}
function DeleteTransaction(ID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(ID);
    TrmSelect()
}
function ActionSimpan() {
    var ResponseEmail = CKEDITOR.instances.TemplateResponseEmail.getData()
    if (ResponseEmail == "") {
        swal("Template Response Email Empty")
        return false;
    } else {
        var maxlength = "7500"
        if (ResponseEmail.length > maxlength) {
            swal(
                '',
                'Character Length is over, Maximum Length 7500 Character',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#FormatType").val() == "") {
        swal("Format Type Empty")
        return false;
    }
    if ($("#cmbStatus").val() == "" || $("#cmbStatus").val() == "Select") {
        swal("State empty")
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

                var form_data = JSON.stringify({ ID: "0", Template: ResponseEmail, Format: $ESAPI.encoder().encodeForHTML($("#FormatType").val()), State: $("#cmbStatus").val(), User: $("#hd_sessionLogin").val(), Action: 'INSERT' });
                $.ajax({
                    url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
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
                                    Cleansing()
                                    DataTables()
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
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
function ActionUpdate() {
    var ResponseEmail = CKEDITOR.instances.TemplateResponseEmail.getData()
    if (ResponseEmail != "") {
        var maxlength = "7500"
        if (ResponseEmail.length > maxlength) {
            swal(
                '',
                'Character Length is over, Maximum Length 7500 Character',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), Template: ResponseEmail, Format: $("#FormatType").val(), State: $("#cmbStatus").val(), User: $("#hd_sessionLogin").val(), Action: 'UPDATE' });
                $.ajax({
                    url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
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
                                    Cleansing()
                                    DataTables()
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
    var ResponseEmail = CKEDITOR.instances.TemplateResponseEmail.getData()
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), Template: ResponseEmail, Format: $ESAPI.encoder().encodeForHTML($("#FormatType").val()), State: $("#cmbStatus").val(), User: $("#hd_sessionLogin").val(), Action: 'DELETE' });
                $.ajax({
                    url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
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
                                    Cleansing()
                                    DataTables()
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
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
function TrmSelect() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
        data: "{ID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', Template:'0', Format:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                CKEDITOR.instances.TemplateResponseEmail.setData(json[i].TEMPLATE_RESPONSE)
                $("#FormatType").val(json[i].FORMAT)
                $("#cmbStatus").val(json[i].STATE)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Cleansing() {
    CKEDITOR.instances.TemplateResponseEmail.setData("")
    $("#FormatType").val("")
    $("#cmbStatus").val("")
}