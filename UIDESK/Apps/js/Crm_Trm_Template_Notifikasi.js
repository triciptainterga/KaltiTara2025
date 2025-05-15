$(document).ready(function () {
    TrmNotificationTemplate();
    $("#Update").hide();
});
function TrmNotificationTemplate() {
    var myTable = $('#TrmNotificationTemplate').DataTable();
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK225'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var urlclick = '<div class="flex-shrink - 0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=showUpdate("' + json[i].ID + '") style="cursor: pointer;">Edit</a> ' +
                    '</div> ' +
                    '</div> '
                myTable.row.add([json[i].ID, json[i].SUBJECT, json[i].BODY, json[i].CATEGORY, urlclick]).draw(false);
                //myTable.row.add([json[i].ID, json[i].SUBJECT, json[i].BODY, urlclick]).draw(false);

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
    $("#ModalChannel").modal('show');
    $("#Update").show();
    $("#cmbCategory").attr("disabled", true);
    $('#cmbType').attr("disabled", true);
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function TrmSelect(TrxID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK226'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $("#TrxSubject").val(json[i].SUBJECT);
                $("#TrxBody").val(json[i].BODY);
                $("#cmbCategory").val(json[i].CATEGORY);
                $("#cmbType").find("option:selected").text(json[i].TYPE);
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
function ActionUpdateNotif() {
    if ($("#TrxBody").val() == '') {
        swal(
            '',
            'Body is empty',
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
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxSubject: $("#TrxSubject").val(),
                    TrxBody: $("#TrxBody").val(), TrxFooter: $("#cmbCategory").val(), TrxType: $("#cmbType").val(), TrxStatus: $("#cmbStatus").val()
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateNotificationTemplate",
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
                                    'Update Data Has Been Success ',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trm_Template_Notifikasi.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed !',
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
                    },
                    complete: function () {

                    }
                });

            } 
        });
}