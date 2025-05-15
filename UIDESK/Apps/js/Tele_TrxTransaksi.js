$(document).ready(function () {
    Profiling()
    InteractionTransaksi(getParameterByName("id"))
    HistoryTelephone(getParameterByName("ph"))
    $('#DiallingCall').click(function (e) {
        swal({
            title: "Do you want to call?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log("Dial Call");

                    const Http = new XMLHttpRequest();
                    const url = "http://localhost:60024/dial/telp=" + getParameterByName("ph")
                    console.log("url" + url)
                    Http.open("GET", url);
                    Http.send();

                    Http.onreadystatechange = (e) => {
                        console.log(Http.responseText)

                        $("#DiallingCall").empty()
                        var drop = ""
                            drop = '<div class="flex-shrink-0" id="DropCall">' +
                                    '<div class="d-flex gap-2">' +
                                    '<button type="button" class="btn btn-outline-light"><i class="fas fa-phone font-size-24 text-danger"></i></button>' +
                                    '</div>' +
                                    '</div>'
                        $("#DropCall").append(drop)


                    }
                } else {
                    window.location.reload();
                }
            });
    });

    $('#DropCall').click(function (e) {
        swal({
            title: "Do you want to drop?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    console.log("Drop Call");
                    const Http = new XMLHttpRequest();
                    const url = "http://localhost:60024/drop/telp=" + getParameterByName("ph")
                    Http.open("GET", url);
                    Http.send();

                    Http.onreadystatechange = (e) => {
                        console.log(Http.responseText)
                        //location.reload();

                        $("#DropCall").empty()
                        var drop = ""
                        drop = '<div class="flex-shrink-0" id="DiallingCall">' +
                            '<div class="d-flex gap-2">' +
                            '<button type="button" class="btn btn-outline-light"><i class="fas fa-phone font-size-24 text-success"></i></button>' +
                            '</div>' +
                            '</div>'
                        $("#DiallingCall").append(drop)

                    }

                } else {
                    location.reload();
                }
            });

    });

});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function Profiling() {
    var selectedValue = getParameterByName("id");
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTransaksi.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK73'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                $('#Profile_Nama').append('<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].Name.substr(0, 1).toUpperCase() + '</span></div></br>' + json[i].Name);
                $('#Profile_Alamat').append(json[i].Address);
                $('#Profile_Telepon').append(json[i].Telepon);
                $('#Profile_EmailNya').append(json[i].Email);

                //if (json[i].Gender == "Pria") {
                //    $("#ComboGender option:selected").val("1");
                //} else {
                //    $("#ComboGender option:selected").val("2");
                //}
                //$('#TeleAlamat').val(json[i].Address);
                //$('#TeleNegara').val(json[i].Negara);
                //$('#TeleProvinsi').val(json[i].Provinsi);
                //$('#TeleKota').val(json[i].Kota);
                //$('#TeleZipCode').val(json[i].KodePos);
                //$("#ContentPlaceHolder1_TrxTransaksiID").val(json[i].ID)
                //$("#ContentPlaceHolder1_TrxScript").val(json[i].ProdukID)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function InteractionTransaksi(ParameterID) {
    var PathTicket = "" + IPSERVER + "/Apps"
    var filenameimage = "";
    var result = "";
    var result_in = ""
    var messageDiv = $('#InteractionNote');
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTransaksi.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + ParameterID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK88'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;

            messageDiv.empty();
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<div class="timeline-item">' +
                    '<div class="timeline-block">' +
                    '<div class="timeline-box card">' +
                    '<div class="card-body">' +
                    //'<div class="timeline-date">' + item.DateCreate + '</div>' +
                    '<h5 class="mt-3 font-size-16">' + json[i].CreateBy + '</h5>' +
                    '<div class="text-muted">' +
                    '' + json[i].Note + '' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'

                messageDiv.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function HistoryTelephone(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    var ResultHistoryTicket = "";
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTransaksi.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK131'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            $('#HistoryTelephony').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].CallSelesai == "0") {
                    var color = "primary"
                    var linkTicket = '<a class="dropdown-item" href="Tele_TrxTransaksi.aspx?id=' + json[i].ID + '&name=' + json[i].Name + '&ph=' + json[i].Telepon + '&mail=' + json[i].Email + '">Edit</a>'
                } else if (json[i].CallSelesai == "1") {
                    var color = "danger"
                    var linkTicket = '<a class="dropdown-item" href="#" onclick=LinkTicket(' + json[i].ID + ')>Edit</a>'
                } 

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                var ConverTanggal = newDate + ' ' + newTime

                ResultHistoryTicket = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].ProdukCampaign.substr(0, 1).toUpperCase() + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="font-size-15 mb-1 text-truncate"><a href="#" class="text-dark">' + json[i].ProdukCampaign + '</a></h5>' +
                    '<p class="badge badge-soft-' + color + ' font-size-12">' + newDate + ' ' + newTime + '</p>' +
                    '</div>' +
                    '<div class="dropdown">' +
                    '<a class="btn btn-light btn-sm dropdown-toggle" href="#" role="button"' +
                    'data-bs-toggle="dropdown" aria-haspopup="true">' +
                    '<i class="fa fas fa-ellipsis-h"></i>' +
                    '</a>' +
                    '<ul class="dropdown-menu dropdown-menu-end">' +
                    '<li>' + linkTicket + '</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#HistoryTelephony').append(ResultHistoryTicket)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SubmitInteractionCall() {
    if ($("#TextProblem").val() == "") {
        swal(
            '',
            'Note Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#InteractionReason").val() == "" || $("#InteractionReason").val() == null) {
        swal(
            '',
            'Reason Call Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#InteractionStatus").val() == "" || $("#InteractionStatus").val() == null) {
        swal(
            '',
            'Status Call Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#InteractionTransaksi").val() == "" || $("#InteractionTransaksi").val() == null) {
        swal(
            '',
            'Status Transaksi Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    
    if (getParameterByName("id") == null || getParameterByName("id") == "") {
        var TrxID = $("#ContentPlaceHolder1_TrxTransaksiID").val()
    } else {
        var TrxID = getParameterByName("id")
    }
    var form_data = JSON.stringify({
        TrxID: TrxID, TrxNote: $("#TextProblem").val(),
        TrxStatus: $("#InteractionStatus").val(), TrxReason: $("#InteractionReason").val(),
        TrxTransaksi: $("#InteractionTransaksi").val(), TrxCreateBy: $("#hd_sessionLogin").val()
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Tele_TrxTransaksi.asmx/SimpanNotes",
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
                                    'Insert Note Has Been Success',
                                    'success'
                                ).then(function () {
                                    CleanScript()
                                    /*InteractionTransaksi(getParameterByName("id"))*/
                                    location.href = "Tele_TrxTaskboard.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Note Has Been Failed',
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
function DiallCall() {
    swal({
        title: "Do you want to call?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                console.log("Dial Call");
                return false

                const Http = new XMLHttpRequest();
                const url = "http://localhost:60024/dial/telp=" + getParameterByName("ph")
                console.log("url" + url)
                Http.open("GET", url);
                Http.send();

                Http.onreadystatechange = (e) => {
                    console.log(Http.responseText)
                    var drop = ""
                    drop = '<div id="chat-box-bodyDrop">' +
                        '<div id ="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-danger l-h-70">' +
                        '<div id="chat-overlay"></div>' +
                        '<span class="mdi mdi-phone-locked font-size-30"></span>' +
                        '</div>' +
                        '</div>'
                    $("#chat-box-bodyDrop").append(drop)
                }
            } else {
                window.location.reload();
            }
        });
}
function CleanScript() {
    $("#TextProblem").val("")
    $("#InteractionReason").val("")
    $("#InteractionStatus").val("")
    $("#InteractionTransaksi").val("")
}