$(document).ready(function () {
    TrmTabelTransaction();
    if ($("#QM_LevelUser").val() == "Administrator") {
        $("#HeaderAcraRecording").hide();
    } else {
        $("#HeaderAcraRecording").show();
    }
});
function TrmTabelTransaction() {
    var myTable = $('#TrmTransaction').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK023', TrxActionType: '" + $("#QM_LevelUser").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i;

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateTimeStart);
                var milisegundos = parseInt(json[i].DateTimeStart.replace("/Date(", "").replace(")/", ""));
                var DateTimeStart_1 = new Date(milisegundos).toLocaleDateString("en-UE");
                var DateTimeStart_2 = new Date(milisegundos).toLocaleTimeString("en-UE");

                var seconds = json[i].DurationInt;
                // multiply by 1000 because Date() requires miliseconds
                var date = new Date(seconds * 1000);
                var hh = date.getUTCHours();
                var mm = date.getUTCMinutes();
                var ss = date.getSeconds();
                // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
                // if (hh > 12) {hh = hh % 12;}
                // These lines ensure you have two-digits
                if (hh < 10) { hh = "0" + hh; }
                if (mm < 10) { mm = "0" + mm; }
                if (ss < 10) { ss = "0" + ss; }
                // This formats your string to HH:MM:SS
                var HasilConvert = hh + ":" + mm + ":" + ss;
                //document.write(t);
                //console.log("duration " + t)

                if (json[i].FileExist == null || json[i].FileExist == "") {
                    var FileExits = "0"
                } else {
                    var FileExits = "True"
                }
                //var urlClick = "<div class='dropdown'>" +
                //    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                //    "<div class='dropdown-menu dropdown-menu-right'>" +
                //    /* "<a class='dropdown-item' href='http://localhost/BriqiStream/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + json[i].FilePath + "' target='_blank')><i class='fa fa-play-circle'></i> Play</a>" +*/
                //    "<a class='dropdown-item' href='#' onclick=ActionPlay('" + json[i].FilePath + "')><i class='fa fa-play-circle'></i> Play</a>" +
                //    "<a class='dropdown-item' href='#' onclick=ActionShare('" + json[i].AcraID + "')><i class='fa fa-share-alt'></i> Share</a>" +
                //    "<a class='dropdown-item' href='#' onclick=ActionReject('" + json[i].AcraID + "')><i class='fa fa-times-circle'></i> Reject</a>" +
                //    "<div class='dropdown-divider'></div>" +
                //    "<a class='dropdown-item' href='QA_form.aspx?qaid=" + json[i].KodeAlatTest + "&type=Call&UserType=" + json[i].AcraGroupAgent + "&acraid=" + json[i].AcraID + "&agentid=" + json[i].AgentName + "&act=fu'><i class='fa fa-arrow-circle-right '></i> Follow</a>" +
                //    "</div>" +
                //    "</div>"

                var urlClick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=ActionPlay("' + json[i].FilePath + '")>Play</a>' +
                    '<a class="dropdown-item" href="#" onclick=ActionShare("' + json[i].AcraID + '")>Share</a>' +
                    '<a class="dropdown-item" href="#" onclick=ActionReject("' + json[i].AcraID + '")>Reject</a>' +
                    '<a class="dropdown-item" href="QA_form.aspx?qaid=' + json[i].KodeAlatTest + '&type=Call&UserType=' + json[i].AcraGroupAgent + '&acraid=' + json[i].AcraID + '&agentid=' + json[i].AgentName + '&act=fu">Follow up</a>' +
                    '</div>' +
                    '</div>'

                if (json[i].StatusData == "New") {
                    var Status = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].StatusData + "</span>"
                } else {
                    var Status = "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].StatusData + "</span>"
                }
                if ($("#QM_LevelUser").val() == "Administrator") {
                    var AgentID = json[i].AgentName
                    var LoginID = json[i].LoginID
                    var urlClick = '<div class="flex-shrink-0 ms-2">' +
                        '<div class="dropdown">' +
                        '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                        '<i class="mdi mdi-dots-horizontal"></i>' +
                        '</a>' +
                        '<div class="dropdown-menu dropdown-menu-end">' +
                        '<a class="dropdown-item" href="#" onclick=ActionPlay("' + json[i].FilePath + '")>Play</a>' +
                        '</div>' +
                        '</div>'
                } else {
                    var AgentID = "********"
                    var LoginID = "********"
                }
                myTable.row.add([json[i].AcraID, json[i].AcraGroupAgent, json[i].Extension, DateTimeStart_1 + ' ' + DateTimeStart_2, AgentID, LoginID, HasilConvert, Status, urlClick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionPlay(FilePathID) {
    var FileExist = "-"
    if (FileExist == "-") {
        $("#addContactModal").modal('show');
        $("#ButtonShare").hide()
        $("#ButtonReject").hide()
        //document.getElementById("FrameAudio").src = "http://localhost/BriqisPentes/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + FilePathID + ""
        //document.getElementById("FrameAudio").src = "http://localhost/BriqisPentes/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + FilePathID + ""
        document.getElementById("FrameAudio").src = "" + IPSERVER + "/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + FilePathID + ""
    } else {
        swal(
            '',
            'File Not Exist !',
            'info'
        ).then(function () {
            $("#addContactModal").modal('hide');
        });
    }
}
function ActionShare(ShareID) {
    $("#ContentPlaceHolder1_TrxID").val(ShareID)
    $("#ButtonShare").show()
    $("#ButtonReject").hide()
    $("#addContactModal").modal('show');
}
function ActionReject(RejectID) {
    $("#ContentPlaceHolder1_TrxID").val(RejectID)
    $("#ButtonShare").hide()
    $("#ButtonReject").show()
    $("#addContactModal").modal('show');
}
function ActionAddMore() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Login Session Timeout, Please Re Login',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#HD_UserType").val() == "") {
        swal(
            '',
            'User Type is empty, Please Re Login',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        QM_Type: $("#HD_UserType").val(), QM_QaName: $("#hd_sessionLogin").val()
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
                    url: "asmx/QA_TrxACRAQA.asmx/QM_AddMore",
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
                                    '' + json[i].ResultMessage + '',
                                    'success'
                                ).then(function () {
                                    window.location.href = "QA_TrxACRAQA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    '' + json[i].ResultMessage + '',
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
function ActionRequestShare() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Login Session Timeout, Please Re Login',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        QM_AcraID: "0", QM_QaName: $("#hd_sessionLogin").val(), QM_Status: "RequestShare"
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
                    url: "asmx/QA_TrxACRAQA.asmx/QM_RequestShare_Achieve",
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
                                    '' + json[i].ResultMessage + '',
                                    'success'
                                ).then(function () {
                                    window.location.href = "QA_TrxACRAQA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    '' + json[i].ResultMessage + '',
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
function ActionButtonReject() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Login Session Timeout, Please Re Login',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        QM_AcraID: $("#ContentPlaceHolder1_TrxID").val(), QM_QaName: $("#hd_sessionLogin").val(), QM_Status: "Rejected"
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
                    url: "asmx/QA_TrxACRAQA.asmx/QM_RejectData",
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
                                    'Reject Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "QA_TrxACRAQA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Reject Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#modal-audio").modal('hide');
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
function ActionButtonShare() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Login Session Timeout, Please Re Login',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        QM_AcraID: $("#ContentPlaceHolder1_TrxID").val(), QM_QaName: $("#hd_sessionLogin").val(), QM_Status: "ShareThis"
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
                    url: "asmx/QA_TrxACRAQA.asmx/QM_RequestShare",
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
                                    'Share Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "QA_TrxACRAQA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Share Data Has Been Failed !',
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