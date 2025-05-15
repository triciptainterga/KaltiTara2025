$(document).ready(function () {
    QA_DataLoadAlatTest();
    ComboMasterQA();
});
function QA_DataLoadAlatTest() {
    var myTable = $('#DataQA_MasterForm').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK009', TrxActionType: 'TA-01'}",
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
                //    "<a class='dropdown-item' href='#' onclick=FormUpdate('" + json[i].ID + "','" + encodeURI(json[i].KodeAlatTest) + "','" + encodeURI(json[i].KodeMasterForm) + "','" + encodeURI(json[i].NamaMaster) + "','" + encodeURI(json[i].NamaAlatTest) + "','" + encodeURI(json[i].Aktif) + "')><i class='fa fa-pencil'></i> Edit</a>" +
                //    //"<a class='dropdown-item' href='#' onclick=FormDelete('" + json[i].ID + "','" + encodeURI(json[i].KodeAlatTest) + "','" + encodeURI(json[i].KodeMasterForm) + "','" + encodeURI(json[i].NamaMaster) + "','" + encodeURI(json[i].NamaAlatTest) + "','" + encodeURI(json[i].Aktif) + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                //    "</div>" +
                //    "</div>"
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=Update(' + json[i].ID + ')>Edit</a>' +
                    '</div>' +
                    '</div>'

                if (json[i].Aktif == "Y") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                myTable.row.add([json[i].ID, json[i].KodeAlatTest, json[i].NamaMaster, json[i].NamaAlatTest, Status, newDate + ' ' + newTime, urlclick]).draw(false);

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
        url: "asmx/QA_TrmAlatTest.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus:'Dropdown', TrxAction:'UIDESK011'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            ComboMasterQA.empty()
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
function Tambah() {
    $("#addContactModal").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    CleanObject()
}
function Update(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelected()
}
function TrmSelected() {
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmAlatTest.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus:'Dropdown', TrxAction:'UIDESK009'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#ComboMasterQA").val(json[i].KodeMasterForm)
                $("#TrxJenisMasterQA").val(json[i].NamaAlatTest)
                $("#cmbStatus").val(json[i].Aktif)

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
    if ($("#ComboMasterQA").val() == '' || $("#ComboMasterQA").val() == 'Select') {
        swal(
            '',
            'Master QA is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TrxJenisMasterQA").val() == '') {
        swal(
            '',
            'Jenis Master QA is empty',
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
                    TrxID: "0", TrxKodeMaster: $("#ComboMasterQA").val(), TrxNamaJenisQA: $("#TrxJenisMasterQA").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Insert"
                });
                $.ajax({
                    url: "asmx/QA_TrmAlatTest.asmx/FormAction",
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
                                    QA_DataLoadAlatTest();
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
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
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
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxKodeMaster: $("#ComboMasterQA").val(), TrxNamaJenisQA: $("#TrxJenisMasterQA").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Update"
                });
                $.ajax({
                    url: "asmx/QA_TrmAlatTest.asmx/FormAction",
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
                                    QA_DataLoadAlatTest();
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
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
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
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxKodeMaster: $("#ComboMasterQA").val(), TrxNamaJenisQA: $("#TrxJenisMasterQA").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Delete"
                });
                $.ajax({
                    url: "asmx/QA_TrmAlatTest.asmx/FormAction",
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
                                    QA_DataLoadAlatTest();
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
function CleanObject() {
    $("#ComboMasterQA").val("");
    $("#TrxJenisMasterQA").val("");
    $("#cmbStatus").val("");
    $("#ContentPlaceHolder1_TrxID").val("");
}