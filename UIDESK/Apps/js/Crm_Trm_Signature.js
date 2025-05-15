$(document).ready(function () {
    TrmSignature()
});
function TrmSignature() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK48'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {
              
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].rec_id + ') >Edit</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].rec_id, json[i].signature, urlclick]).draw(false);
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
    $("#modal-agent").modal('show');
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmUpdateSignature()
}
function TrmUpdateSignature() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK48'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultCallCampaigns = "";

            for (i = 0; i < json.length; i++) {

                CKEDITOR.instances.Signature.setData(json[i].signature);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionSignature() {
    $("#ContentPlaceHolder1_TrxID").val();
    var TrxSignature = CKEDITOR.instances.Signature.getData();
    if (TrxSignature == "") {
        swal(
            '',
            'Signature is empty',
            'info'
        ).then(function () {
            return false
        });
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxSignature: TrxSignature });
                $.ajax({
                    url: "asmx/TrmSignature.asmx/UpdateSignature",
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
                                    window.location = "Crm_Trm_Signature.aspx?";
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