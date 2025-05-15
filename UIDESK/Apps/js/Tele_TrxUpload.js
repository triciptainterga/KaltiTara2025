$(document).ready(function () {
    if (getParameterByName("id") == "" || getParameterByName("id") == null || getParameterByName("id") == "null") {
        $("#Delete").hide();
        $("#Distribute").hide();
    } else {
        $("#Delete").show();
        $("#Distribute").show();
    }
    ComboUploadID()
    CmbProductTele("1");
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
//* Upload Data Telemarketing *//
$('#filesnya').change(function () {
    var filename = $('#filesnya').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='filesnya'] b").html(filename);
    $("label[for='file_name']").text('Selected File: ');

    if (filename == "" || filename == "undefined") {
        $("label[for='file_name']").text('No File Choosen');
    }

});
$(document).on("change", "input[name='filesnya']", function (e) {
    $(".hiddenX").show();

    var fileName = $('#filesnya').val();
    //var fileExtension = fileName.split('.').pop();

    //if (fileExtension == "xlsx" || fileExtension == "xls") {
    //} else {
    //    swal(
    //        '',
    //        'File extension not allowed !',
    //        'error'
    //    ).then(function () {
    //        $('#filesnya').val("")
    //        return false;
    //    });
    //    return false;
    //}

    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var files = $(this).prop("files");
                var data = new FormData();

                var request;
                var result;
                var modal = $(this).closest(".modal");
                var itemid = modal.data("itemid");

                for (var i = 0; i < files.length; i++) {

                    data.append("id", "617367367613876138");
                    data.append("file", files[i]);
                    data.append("Username", $("#hd_sessionLogin").val());
                    data.append("ProdukID", $("#ComboCampaignTelemarketing").val());
                    //data.append("ProdukID", "3");

                    request = $.ajax({
                        type: "POST",
                        enctype: 'multipart/form-data',
                        url: "asmx/Tele_TrxUpload.asmx/TeleUpload_1",
                        data: data,
                        // dataType: "json",
                        contentType: false,
                        processData: false,
                    });
                    request.done(function (response) {
                        $(".hiddenX").hide();
                        $("#removeUpload").show();
                        $("#ContentPlaceHolder1_TrxID").val($(response).find("UploadID").text())
                        swal(
                            '',
                            'Upload Data Telesales Has Been Success',
                            'success'
                        ).then(function () {
                            $("#Delete").show();
                            $("#Distribute").show();
                            location.href = "Tele_TrxUpload.aspx?id=" + $("#ContentPlaceHolder1_TrxID").val() + "";
                        });
                        // result = response.d;
                        // $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
                        //console.log("Success");
                        //console.log($(response).find("Guid").text());
                        //console.log($(response).find("FileExt").text());
                        //moveFileToDatabase('FileWaris/' + $("#ContentPlaceHolder1_TrxUploadID").val() + '.xlsx', 'FileWaris/' + $("#ContentPlaceHolder1_TrxUploadID").val() + '.xlsx');

                    });

                    request.fail(function (response) {
                        console.log(response.responseText);
                        //alert(response.responseText);
                        swal(
                            '',
                            'Upload Data Telemarketing Has Been Failed',
                            'error'
                        ).then(function () {
                            return false;
                        });

                    });

                    request.always(function () {
                        data.delete(itemid);
                        data.delete(files[i]);

                    });

                }


            }
        });

});
function ButtonDistributeData() {
    var TrxUploadID = getParameterByName("id")
    var form_data = JSON.stringify({ TrxUploadID: TrxUploadID, TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "DISTRIBUTE" });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Tele_TrxUpload.asmx/DistributeData",
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
                                    'Data Distribute Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Tele_TrxUpload.aspx?";
                                    //location.href = "Tele_TrxUpload.aspx?p_re=1&id=" + getParameterByName("id") + "";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Distribute Has Been Failed',
                                    'error'
                                ).then(function () {
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
function ButtonDistributeDelete() {
    var TrxUploadID = getParameterByName("id")
    var form_data = JSON.stringify({ TrxUploadID: TrxUploadID, TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "DELETE" });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Tele_TrxUpload.asmx/DistributeDelete",
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
                                    'Data Delete Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Tele_TrxUpload.aspx?p_re=1&id=" + getParameterByName("id") + "";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Delete Has Been Failed',
                                    'error'
                                ).then(function () {
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
function ComboUploadID() {
    var ComboUploadID = $('#ComboUploadID');
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxUpload.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK72'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            ComboUploadID.empty()
            ComboUploadID.append("<option value=''>Select</option>")
            for (i = 0; i < json.length; i++) {
                //if (getParameterByName("id") == "" || getParameterByName("id") == null) {
                result = '<option value="' + json[i].UploadID + '">' + json[i].UploadID + '</option>';
                //} else {
                //    result = '<option value="' + getParameterByName("id") + '" selected=true>' + getParameterByName("id") + '</option>';
                //}
                ComboUploadID.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function OnchangeComboUpload() {
    location.href = "Tele_TrxUpload.aspx?p_re=1&id=" + $("#ComboUploadID").val() + "";
}
function CmbProductTele(ParameterID) {
    var CmbProductTele = $('#ComboCampaignTelemarketing');
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxUpload.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK77'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            CmbProductTele.empty()
            CmbProductTele.append("<option value=''>Select</option>")
            for (i = 0; i < json.length; i++) {

                if (ParameterID == "1") {
                    result = '<option value="' + json[i].ID + '">' + json[i].DetailName + '</option>';
                } else {
                    result = '<option value="' + json[i].ID + '" selected=true>' + json[i].DetailName + '</option>';
                }
                CmbProductTele.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}