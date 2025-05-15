$(document).ready(function () {
    DataTables()
    ComboAccount();
    $("#Update").hide();
});
function DataTables() {
    var myTable = $('#TableAuto').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmTemplateAutoReply.asmx/AHU_Uidesk_TrxEmailAutoReply_TSIUD",
        data: "{ID:'0', Template:'0', Account:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'TABLE'}",
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
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].ID, json[i].TEMPLATE_REPLY.substring(0, 100) + "..", json[i].ACCOUNT, urlclick]).draw(false);

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
    $("#addContactModal").modal('show');
}
function UpdateTransaction(ID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#ContentPlaceHolder1_TrxID").val(ID);
    TrmSelect()
}
function ComboAccount() {
    var ComboAccountEmail = $('#CmbAccount');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK47'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultFrom = "";

            for (i = 0; i < json.length; i++) {

                ResultFrom = '<option value="' + json[i].incoming_account_name + '">' + json[i].incoming_account_name + '</option>';
                ComboAccountEmail.append(ResultFrom);

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
    var AutoReply = CKEDITOR.instances.TemplateAutoReply.getData()
    if (AutoReply == "") {
        swal("Template Auto Reply Empty")
        return false;
    } else {
        var maxlength = "7500"
        if (AutoReply.length > maxlength) {
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
    if ($("#CmbAccount").val() == "") {
        swal("Account Email Empty")
        return false;
    }
    if ($("#cmbStatus").val() == "" || $("#cmbStatus").val() == "Select") {
        swal("Status is empty")
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

                var form_data = JSON.stringify({ ID: "0", Template: AutoReply, Account: $("#CmbAccount").val(), State: $("#cmbStatus").val(), User: $("#hd_sessionLogin").val(), Action: 'INSERT' });
                $.ajax({
                    url: "asmx/TrmTemplateAutoReply.asmx/AHU_Uidesk_TrxEmailAutoReply_TSIUD",
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
    var AutoReply = CKEDITOR.instances.TemplateAutoReply.getData()
    if (AutoReply != "") {
        var maxlength = "7500"
        if (AutoReply.length > maxlength) {
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

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), Template: AutoReply, Account: $("#CmbAccount").val(), State: $("#cmbStatus").val(), User: $("#hd_sessionLogin").val(), Action: 'UPDATE' });
                $.ajax({
                    url: "asmx/TrmTemplateAutoReply.asmx/AHU_Uidesk_TrxEmailAutoReply_TSIUD",
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
function TrmSelect() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmTemplateAutoReply.asmx/AHU_Uidesk_TrxEmailAutoReply_TSIUD",
        data: "{ID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', Template:'0', Account:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                CKEDITOR.instances.TemplateAutoReply.setData(json[i].TEMPLATE_REPLY)
                $("#CmbAccount").val(json[i].ACCOUNT)
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
    CKEDITOR.instances.TemplateAutoReply.setData("")
    $("#CmbAccount").val("")
    $("#cmbStatus").val("")
}