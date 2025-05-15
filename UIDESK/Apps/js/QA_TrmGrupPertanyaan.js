$(document).ready(function () {
    QA_DataLoadAlatTest();
    ComboMasterQA();
    ComboMasterJenisQA();
});
function QA_DataLoadAlatTest() {
    var myTable = $('#DataQA_MasterForm').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK017', TrxActionType: 'TA-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                //var urlClick = "<div class='dropdown'>" +
                //    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                //    "<div class='dropdown-menu dropdown-menu-right'>" +
                //    "<a class='dropdown-item' href='#' onclick=FormUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                //    //"<a class='dropdown-item' href='#' onclick=FormDelete('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                //    "</div>"
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=FormUpdate(' + json[i].ID + ')>Edit</a>' +
                    '</div>' +
                    '</div>'

                if (json[i].Aktif == "Y") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                if (json[i].GroupingNilai == "N") {
                    var TipePertanyaan = "Grup"
                } else {
                    var TipePertanyaan = "Non Grup"
                }
                myTable.row.add([json[i].ID, json[i].KodeGrup, json[i].NamaMaster, json[i].NamaAlatTest, json[i].ItemGrup, json[i].BobotGrup, TipePertanyaan, Status, newDate + ' ' + newTime, urlclick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboMasterQA() {
    var ComboMasterQA = $('#ComboMasterQA');
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmGrupPertanyaan.asmx/QM_TrxDropdown",
        data: "{TrxID: '0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus:'Dropdown', TrxAction:'UIDESK011'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].KodeMasterForm + '">' + json[i].NamaMaster + '</option>';
                ComboMasterQA.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Add_ComboJenisQA(Req_ID) {
    var ComboMasterQAText = $("#ComboMasterQA").find("option:selected").text();
    var ComboMasterQAValue = $("#ComboMasterQA").val();
    ComboMasterJenisQA(ComboMasterQAValue);
}
function ComboMasterJenisQA(Req_ID) {
    var ComboMasterJenisQA = $('#ComboMasterJenisQA');
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmGrupPertanyaan.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + Req_ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus:'Dropdown', TrxAction: 'UIDESK012'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            ComboMasterJenisQA.empty()
            ComboMasterJenisQA.append("<option value=''>Select</option>")
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].KodeAlatTest + '">' + json[i].NamaAlatTest + '</option>';
                ComboMasterJenisQA.append(result);

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
    CleanObject()
}
function FormUpdate(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    FormSelected();
}
function FormSelected() {
    var NamaView = "QM_TrvMasterAspekCallmon";
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK017', TrxActionType: 'CMB-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $("#ComboMasterQA").val(json[i].KodeMasterForm);
                $("#TrxNamaAspek").val(json[i].ItemGrup);
                $("#TrxBobot").val(json[i].BobotGrup);
                $("#CmbTipePertanyaan").val(json[i].GroupingNilai);
                $("#cmbStatus").val(json[i].Aktif);

                var ComboMasterJenisQA = $('#ComboMasterJenisQA');
                $.ajax({
                    type: "POST",
                    url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                    data: "{TrxID:'" + json[i].KodeAlatTest + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK012', TrxActionType: 'CMB-02'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i, x, result = "";

                        ComboMasterJenisQA.empty()
                        for (i = 0; i < json.length; i++) {

                            result = '<option value="' + json[i].KodeAlatTest + '">' + json[i].NamaAlatTest + '</option>';
                            ComboMasterJenisQA.append(result);

                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                })

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CleanObject() {
    $("#ComboMasterQA").val("");
    $("#ComboMasterJenisQA").val("");
    $("#TrxNamaAspek").val("");
    $("#TrxBobot").val("");
    $("#CmbTipePertanyaan").val("");
    $("#cmbStatus").val("");
}
function ActionSimpan() {
    if ($("#ComboMasterJenisQA").val() == '' || $("#ComboMasterJenisQA").val() == 'Select') {
        swal(
            '',
            'Jenis QA is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TrxNamaAspek").val() == '') {
        swal(
            '',
            'Nama Aspek Penilaian is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TrxBobot").val() == '') {
        swal(
            '',
            'Bobot Penilaian is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#CmbTipePertanyaan").val() == '' || $("#CmbTipePertanyaan").val() == 'Select') {
        swal(
            '',
            'Tipe Pertanyaan Penilaian is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#cmbStatus").val() == '' || $("#cmbStatus").val() == 'Select') {
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
                var form_data = JSON.stringify({
                    TrxID: "0", TrxKodeAlat: $("#ComboMasterJenisQA").val(), TrxItemGroup: $("#TrxNamaAspek").val(), TrxBobotGroup: $("#TrxBobot").val(), TrxTipePertanyaan: $("#CmbTipePertanyaan").val(),
                    TrxStatus: $("#cmbStatus").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "Insert"
                });
                $.ajax({
                    url: "asmx/QA_TrmGrupPertanyaan.asmx/FormAction",
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
                                    window.location.href = "QA_TrmGrupPertanyaan.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed !',
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
function ActionUpdate() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxKodeAlat: $("#ComboMasterJenisQA").val(), TrxItemGroup: $("#TrxNamaAspek").val(), TrxBobotGroup: $("#TrxBobot").val(),
                    TrxTipePertanyaan: $("#CmbTipePertanyaan").val(), TrxStatus: $("#cmbStatus").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "Update"
                });
                $.ajax({
                    url: "asmx/QA_TrmGrupPertanyaan.asmx/FormAction",
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
                                    window.location.href = "QA_TrmGrupPertanyaan.aspx";
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
function ActionDelete() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxKodeAlat: $("#ComboMasterJenisQA").val(), TrxItemGroup: $("#TrxNamaAspek").val(), TrxBobotGroup: $("#TrxBobot").val(),
                    TrxTipePertanyaan: $("#CmbTipePertanyaan").val(), TrxStatus: $("#cmbStatus").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "Delete"
                });
                $.ajax({
                    url: "asmx/QA_TrmGrupPertanyaan.asmx/FormAction",
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
                                    window.location.href = "QA_TrmGrupPertanyaan.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed !',
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