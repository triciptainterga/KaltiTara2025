$(document).ready(function () {
    QA_DataLoadPenilaian();
    ComboMasterQA();
});
function QA_DataLoadPenilaian() {
    var myTable = $('#DataQA_MasterForm').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK015', TrxActionType: 'TA-01'}",
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
                //    "<a class='dropdown-item' href='#' onclick=FormUpdate('" + json[i].ID + "','" + json[i].NoUrut + "')><i class='fa fa-pencil'></i> Edit</a>" +
                //    //"<a class='dropdown-item' href='#' onclick=FormDelete('" + json[i].ID + "','" + json[i].NoUrut + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                //    "</div>" +
                //    "</div>"
                var urlClick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=FormUpdate(' + json[i].ID + ',' + json[i].NoUrut + ')>Edit</a>' +
                    '<a class="dropdown-item" href="#" onclick=FormDelete(' + json[i].ID + ',' + json[i].NoUrut + ')>Delete</a>' +
                    '</div>' +
                    '</div>'

                if (json[i].Aktif == "Y") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                myTable.row.add([json[i].ID, json[i].KodePenilaian, json[i].NamaMaster, json[i].NamaAlatTest, json[i].ItemGrup, json[i].ItemPertanyaan, json[i].BobotGrup, json[i].NamaPenilaian, json[i].Nilai, Status, newDate + ' ' + newTime, urlClick]).draw(false);
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
    CleanObject();
}
function FormUpdate(TrxID, NoUrut) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    FormSelected($("#ContentPlaceHolder1_TrxID").val(), NoUrut);
}
function FormDelete(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    FormSelected($("#ContentPlaceHolder1_TrxID").val(), NoUrut);
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
    var ComboJenisQA = $('#ComboMasterJenisQA');
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
            ComboJenisQA.append('<option value="">Select</option>');
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
    var ComboAspekCallmonQA = $('#ComboMasterJenisCallmon');
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
            ComboAspekCallmonQA.append('<option value="">Select</option>');
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
function ComboDetailAspekCallmonQA(Req_ID) {
    var ComboDetailAspekCallmonQA = $('#ComboMasterDetailJenisCallmon');
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + Req_ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK014', TrxActionType: 'CMB-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            ComboDetailAspekCallmonQA.empty()
            ComboDetailAspekCallmonQA.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].KodePertanyaan + '">' + json[i].ItemPertanyaan + '</option>';
                ComboDetailAspekCallmonQA.append(result);

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
    var ComboJenisQAText = $("#ComboMasterJenisQA").find("option:selected").text();
    var ComboJenisQAValue = $("#ComboMasterJenisQA").val();
    ComboAspekCallmonQA(ComboJenisQAValue);
}
function Add_ComboDetailAspekCallmon(Req_ID) {
    var ComboMasterJenisCallmonText = $("#ComboMasterJenisCallmon").find("option:selected").text();
    var ComboMasterJenisCallmonValue = $("#ComboMasterJenisCallmon").val();
    ComboDetailAspekCallmonQA(ComboMasterJenisCallmonValue);
}
function FormSelected(TrxID, NoUrut) {
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + TrxID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK018', TrxActionType: '" + NoUrut + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var j, x, result = "";
            var KodeMasterForm, KodeAlatTest, KodeGrup = ""

            for (j = 0; j < json.length; j++) {

                $("#TrxNamaPenilaian").val(json[j].NamaPenilaian);
                $("#TrxNilai").val(json[j].Nilai);
                $("#cmbStatus").val(json[j].Aktif);
                KodeMasterForm = json[j].KodeMasterForm;
                KodeAlatTest = json[j].KodeAlatTest;
                //Perubahan master question
                KodeGrup = json[j].KodeGrup;


                $('#ComboMasterQA').attr('disabled', true);
                $('#ComboMasterJenisQA').attr('disabled', true);

                var ComboMasterJenisQA = $('#ComboMasterJenisQA');
                var JenisKondisi = "AllWhereData";
                var NamaTable = "QA_mAlatTest";
                var KondisiData = "Where KodeAlatTest='" + json[j].KodeAlatTest + "'";
                var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
                $.ajax({
                    type: "POST",
                    url: "asmx/QA_TrmItemNilai.asmx/GetWhereRecords",
                    data: jsonText,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x, result = "";

                        ComboMasterJenisQA.empty()
                        for (i = 0; i < json.length; i++) {

                            result = '<option value="' + json[i].KodeAlatTest + '">' + json[i].NamaAlatTest + '</option>';
                            ComboMasterJenisQA.append(result);

                            var ComboMasterQA = $('#ComboMasterQA');
                            $.ajax({
                                type: "POST",
                                url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                                data: "{TrxID:'" + KodeMasterForm + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK005', TrxActionType: 'CMB-01'}",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (data) {

                                    var json = JSON.parse(data.d);
                                    var i, x, result = "";

                                    ComboMasterQA.empty()
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

                            //alert(KodeGrup)
                            //Perubahan master question
                            var ComboMasterJenisCallmon = $('#ComboMasterJenisCallmon');
                            $.ajax({
                                type: "POST",
                                url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                                data: "{TrxID:'" + KodeGrup + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK013', TrxActionType: 'CMB-02'}",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (data) {

                                    var json = JSON.parse(data.d);
                                    var i, x, result = "";

                                    ComboMasterJenisCallmon.empty()
                                    for (i = 0; i < json.length; i++) {

                                        result = '<option value="' + json[i].KodeGrup + '" selected=true>' + json[i].ItemGrup + '</option>';
                                        ComboMasterJenisCallmon.append(result);

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

                var ComboMasterDetailJenisCallmon = $('#ComboMasterDetailJenisCallmon');
                $.ajax({
                    type: "POST",
                    url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                    data: "{TrxID:'" + json[j].KodePertanyaan + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK019', TrxActionType: '" + json[j].NoUrut + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i, x, result = "";

                        ComboMasterDetailJenisCallmon.empty()
                        for (i = 0; i < json.length; i++) {

                            result = '<option value="' + json[i].KodePertanyaan + '" selected=true>' + json[i].ItemPertanyaan + '</option>';
                            ComboMasterDetailJenisCallmon.append(result);

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
function ActionSimpan() {
    if ($("#ComboMasterJenisQA").val() == '' || $("#ComboMasterJenisQA").val() == 'Select') {
        swal(
            '',
            'Jenis Penilaian is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboMasterJenisCallmon").val() == '' || $("#ComboMasterJenisCallmon").val() == 'Select') {
        swal(
            '',
            'Aspek Penilaian is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TrxNamaPenilaian").val() == '') {
        swal(
            '',
            'Nama Penilaian is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TrxNilai").val() == '') {
        swal(
            '',
            'Nilai is empty',
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
                    TrxID: "0", TrxAlatTest: $("#ComboMasterJenisQA").val(), TrxKodeGroup: $("#ComboMasterJenisCallmon").val(), TrxKodePertanyaan: $("#ComboMasterDetailJenisCallmon").val(), TrxNamaPenilaian: $("#TrxNamaPenilaian").val(), TrxNilai: $("#TrxNilai").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Insert"
                });
                $.ajax({
                    url: "asmx/QA_TrmItemNilai.asmx/FormAction",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i;

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "QA_TrmItemNilai.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed !',
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxAlatTest: $("#ComboMasterJenisQA").val(), TrxKodeGroup: $("#ComboMasterJenisCallmon").val(), TrxKodePertanyaan: $("#ComboMasterDetailJenisCallmon").val(), TrxNamaPenilaian: $("#TrxNamaPenilaian").val(), TrxNilai: $("#TrxNilai").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Update"
                });
                $.ajax({
                    url: "asmx/QA_TrmItemNilai.asmx/FormAction",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i;

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "QA_TrmItemNilai.aspx";
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxAlatTest: $("#ComboMasterJenisQA").val(), TrxKodeGroup: $("#ComboMasterJenisCallmon").val(), TrxKodePertanyaan: $("#ComboMasterDetailJenisCallmon").val(), TrxNamaPenilaian: $("#TrxNamaPenilaian").val(), TrxNilai: $("#TrxNilai").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Delete"
                });
                $.ajax({
                    url: "asmx/QA_TrmItemNilai.asmx/FormAction",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i;

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "QA_TrmItemNilai.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed !',
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
function CleanObject() {
    $("#ComboMasterQA").val("");
    $("#ComboMasterJenisQA").val("");
    $("#ComboAspekCallmonQA").val("");
    $("#ComboMasterJenisCallmon").val("");
    $("#ComboMasterDetailJenisCallmon").val("");
    $("#TrxNamaPenilaian").val("");
    $("#TrxNilai").val("");
    $("#cmbStatus").val("");
}