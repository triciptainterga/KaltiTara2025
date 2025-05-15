$(document).ready(function () {
    QA_DataLoadItemPertanyaan();
    ComboMasterQA();
    //ComboAspekCallmonQA();
});
function QA_DataLoadItemPertanyaan() {
    var myTable = $('#DataQA_MasterForm').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK020', TrxActionType: 'TA-01'}",
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
                    '<a class="dropdown-item" href="#" onclick=FormDelete(' + json[i].ID + ')>Delete</a>' +
                    '</div>' +
                    '</div>'

                if (json[i].Aktif == "Y") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                myTable.row.add([json[i].ID, json[i].KodePertanyaan, json[i].NamaMaster, json[i].NamaAlatTest, json[i].ItemGrup, json[i].ItemPertanyaan, json[i].NoUrut, Status, newDate + ' ' + newTime, urlclick]).draw(false);
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
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK005', TrxActionType: 'CMB-01'}",
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
function ComboJenisQA(Req_ID) {
    var ComboJenisQA = $('#ComboJenisQA');
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + Req_ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK012', TrxActionType: 'CMB-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            ComboJenisQA.empty()
            ComboJenisQA.append("<option value=''>Select</option>")
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].KodeAlatTest + '">' + json[i].NamaAlatTest + '</option>';
                ComboJenisQA.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboAspekCallmonQA(Req_ID) {
    var ComboAspekCallmonQA = $('#ComboAspekCallmonQA');
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + Req_ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK013', TrxActionType: 'CMB-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            ComboAspekCallmonQA.empty()
            ComboAspekCallmonQA.append("<option value=''>Select</option>")
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].KodeGrup + '">' + json[i].ItemGrup + '</option>';
                ComboAspekCallmonQA.append(result);

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
    ComboJenisQA(ComboMasterQAValue);
}
function Add_ComboAspekCallmon(Req_ID) {
    var ComboJenisQAText = $("#ComboJenisQA").find("option:selected").text();
    var ComboJenisQAValue = $("#ComboJenisQA").val();
    ComboAspekCallmonQA(ComboJenisQAValue);
}
function Tambah() {
    $("#addContactModal").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
}
function FormUpdate(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    FormSelected($("#ContentPlaceHolder1_TrxID").val());
}
function FormDelete(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    FormSelected($("#ContentPlaceHolder1_TrxID").val());
}
function CleanObject() {
    $("#ComboMasterQA").val("");
    $("#ComboJenisQA").val("");
    $("#ComboAspekCallmonQA").val("");
    $("#TrxDetailCallmon").val("");
    $("#TrxNomorUrut").val("");
    $("#cmbStatus").val("");
}
function FormSelected(TrxID) {
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + TrxID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK020', TrxActionType: 'CMB-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                var ComboMasterQA = $('#ComboMasterQA');
                $.ajax({
                    type: "POST",
                    url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                    data: "{TrxID:'" + json[i].KodeMasterForm + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK005', TrxActionType: 'CMB-01'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i, x, result = "";
                        for (i = 0; i < json.length; i++) {

                            result = '<option value="' + json[i].KodeMasterForm + '" selected=true>' + json[i].NamaMaster + '</option>';
                            ComboMasterQA.append(result);

                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                })

                var ComboJenisQA = $('#ComboJenisQA');
                $.ajax({
                    type: "POST",
                    url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                    data: "{TrxID:'" + json[i].KodeAlatTest + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK012', TrxActionType: 'CMB-02'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i, x, result = "";

                        ComboJenisQA.empty()
                        for (i = 0; i < json.length; i++) {

                            result = '<option value="' + json[i].KodeAlatTest + '" selected=true>' + json[i].NamaAlatTest + '</option>';
                            ComboJenisQA.append(result);

                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                })

                var ComboAspekCallmonQA = $('#ComboAspekCallmonQA');
                $.ajax({
                    type: "POST",
                    url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                    data: "{TrxID:'" + json[i].KodeGrup + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK013', TrxActionType: 'CMB-02'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i, x, result = "";

                        ComboAspekCallmonQA.empty()
                        for (i = 0; i < json.length; i++) {

                            result = '<option value="' + json[i].KodeGrup + '" selected=true>' + json[i].ItemGrup + '</option>';
                            ComboAspekCallmonQA.append(result);

                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                })

                $("#TrxDetailCallmon").val(json[i].ItemPertanyaan);
                $("#TrxNomorUrut").val(json[i].NoUrut);
                $("#cmbStatus").val(json[i].Aktif);
                CKEDITOR.instances.DeskripsiItemIndikator.setData(json[i].TittlePertanyaan);

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
    if ($("#ComboAspekCallmonQA").val() == '' || $("#ComboAspekCallmonQA").val() == 'Select') {
        swal(
            '',
            'Aspek Penilaian is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TrxDetailCallmon").val() == '') {
        swal(
            '',
            'Detail Aspek Penilaian is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TrxNomorUrut").val() == '') {
        swal(
            '',
            'Nomor Urut is empty',
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
    var Deskripsi = CKEDITOR.instances.DeskripsiItemIndikator.getData();
    if (Deskripsi == "") {
        swal(
            '',
            'Deskripsi Indikator Item is empty',
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
                    TrxID: "0", TrxKodeGroup: $("#ComboAspekCallmonQA").val(), TrxItemPertanyaan: $("#TrxDetailCallmon").val(), TrxNomorUrut: $("#TrxNomorUrut").val(),
                    TrxDeskripsi: Deskripsi, TrxUserName: $("#hd_sessionLogin").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Insert"
                });
                $.ajax({
                    url: "asmx/QA_TrmItemPertanyaan.asmx/FormAction",
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
                                    window.location.href = "QA_TrmItemPertanyaan.aspx";
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
    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
        swal(
            '',
            'Data is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var Deskripsi = CKEDITOR.instances.DeskripsiItemIndikator.getData();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxKodeGroup: $("#ComboAspekCallmonQA").val(), TrxItemPertanyaan: $("#TrxDetailCallmon").val(), TrxNomorUrut: $("#TrxNomorUrut").val(),
                    TrxDeskripsi: Deskripsi, TrxUserName: $("#hd_sessionLogin").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Update"
                });
                $.ajax({
                    url: "asmx/QA_TrmItemPertanyaan.asmx/FormAction",
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
                                    window.location.href = "QA_TrmItemPertanyaan.aspx";
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
    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
        swal(
            '',
            'Data is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var Deskripsi = CKEDITOR.instances.DeskripsiItemIndikator.getData();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxKodeGroup: $("#ComboAspekCallmonQA").val(), TrxItemPertanyaan: $("#TrxDetailCallmon").val(), TrxNomorUrut: $("#TrxNomorUrut").val(),
                    TrxDeskripsi: Deskripsi, TrxUserName: $("#hd_sessionLogin").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Delete"
                });
                $.ajax({
                    url: "asmx/QA_TrmItemPertanyaan.asmx/FormAction",
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
                                    window.location.href = "QA_TrmItemPertanyaan.aspx";
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