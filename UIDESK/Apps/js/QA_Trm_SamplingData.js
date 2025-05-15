$(document).ready(function () {
    TrmPeriodeQ2();
    cmbSite();
    DropdownChannel();
});
function TrmPeriodeQ2() {
    var myTable = $('#TrmPeriodeQ2').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK060', TrxActionType: 'TA-01'}",
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
                    '<a class="dropdown-item" href="#" onclick=FormUpdate(' + json[i].ID + ') >Edit</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].Site, json[i].GroupChannel, json[i].SamplingData, urlclick]).draw(false);
            }
            
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function FormUpdate(UpdateID) {
    $("#ContentPlaceHolder1_TrxID").val(UpdateID)
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    FormSelected()
}
function FormSelected() {
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/QA_PeriodeNonCallQ2_Transaction",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxNamaPeriode: '0', TrxSampling: '0', TrxKeterangan: '0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $("#ComboSite").val(json[i].Type);
                $("#ComboChannel").val(json[i].GroupChannel);
                $("#TxtSamplingData").val(json[i].SamplingData);
                $("#cmbStatus").val(json[i].StatusData);
                //CKEDITOR.instances.TrxDescription.setData(json[i].Keterangan);

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
            'Username is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Sampling_Data").val() == "") {
        swal(
            '',
            'Sampling data is empty',
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxNamaPeriode: $("#ComboChannel").val(), TrxSampling: $("#TxtSamplingData").val(), TrxKeterangan: $("#ComboSite").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "UPDATE" });
                $.ajax({
                    url: "asmx/QA_TrmSystem.asmx/QA_PeriodeNonCallQ2_Transaction",
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
                                    window.location.href = "QA_Trm_SamplingData.aspx?"
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
function cmbSite() {
    var ComboSite = $('#ComboSite');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK108'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultSite = "";

            ComboSite.empty();
            ComboSite.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultSite = '<option value="' + json[i].ID + '">' + json[i].Site + '</option>';
                ComboSite.append(resultSite);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdownChannel() {
    var ComboChannel = $('#ComboChannel');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK230'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultChannel = "";

            ComboChannel.empty();
            ComboChannel.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultChannel = '<option value="' + json[i].ChannelName + '">' + json[i].ChannelName + '</option>';
                ComboChannel.append(resultChannel);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}