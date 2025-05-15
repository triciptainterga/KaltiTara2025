$(document).ready(function () {
    SummaryIncoming();
    DataTables();
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function SummaryIncoming() {
    var ValUserID = $("#hd_sessionLogin").val();
    var ValLayerID = $("#TrxLoginTypeAngka").val();
    var ValSpv = $("#TrxLayerUser").val();
    var resultStart = "";
    var resultEnd = "";
    var result = "";
    var messageDiv = $('#DivIncomingData');
    $.ajax({
        type: "POST",
        url: "asmx/ServiceThread.asmx/ActionTransactionKotak",
        data: "{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            messageDiv.empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].ChannelData == "E-mail" || json[i].ChannelData == "Email" || json[i].ChannelData == "email") {
                    var TrxColor = "warning";
                    var imgChannel = "bx bx-envelope";
                    var sizeImg = "36";
                } else if (json[i].ChannelData == "Call" || json[i].ChannelData == "call" || json[i].ChannelData == "Voip Call" || json[i].ChannelData == "Video Call") {
                    var TrxColor = "danger";
                    var imgChannel = "bx bx-phone-incoming";
                    var sizeImg = "36";
                } else if (json[i].ChannelData == "Instagram") {
                    var TrxColor = "primary";
                    var imgChannel = "bx bxl-instagram";
                    var sizeImg = "36";
                } else if (json[i].ChannelData == "Facebook") {
                    var TrxColor = "primary";
                    var imgChannel = "bx bxl-facebook";
                    var sizeImg = "36";
                } else if (json[i].ChannelData == "Whatsapp" || json[i].ChannelData == "WhatsApp") {
                    var TrxColor = "success";
                    var imgChannel = "bx bxl-whatsapp";
                    var sizeImg = "36";
                } else if (json[i].ChannelData == "Twitter" || json[i].ChannelData == "X") {
                    var TrxColor = "primary";
                    var imgChannel = "bx bxl-twitter";
                } else if (json[i].ChannelData == "Video" || json[i].ChannelData == "video") {
                    var TrxColor = "danger";
                    var imgChannel = "bx bx-phone-incoming";
                    var sizeImg = "36";
                } else if (json[i].ChannelData == "voice") {
                    var TrxColor = "danger";
                    var imgChannel = "bx bx-phone-incoming";
                    var sizeImg = "46";
                } else if (json[i].ChannelData == "voip" || json[i].ChannelData == "Voip") {
                    var TrxColor = "danger";
                    var imgChannel = "bx bx-phone-incoming";
                    var sizeImg = "46";
                } else if (json[i].ChannelData == "livechat" || json[i].ChannelData == "Live Chat") {
                    var TrxColor = "success";
                    var imgChannel = "bx bxs-chat";
                    var sizeImg = "46";
                } else if (json[i].ChannelData == "WalkIN") {
                    var TrxColor = "primary";
                    var imgChannel = "walkin.png";
                    var sizeImg = "46";
                } else if (json[i].ChannelData == "Multichat") {
                    var TrxColor = "primary";
                    var imgChannel = "messenger.png";
                    var sizeImg = "46";
                }
                if (json[i].ChannelData == "Twitter") {
                    var ChannelName = "X"
                } else {
                    var ChannelName = json[i].ChannelData
                }
                result = '<div class="col-xl-3 col-sm-6" style="cursor:pointer;"> ' +
                    '<a class="box box-link-shadow text-left" href="Crm_Trx_Thread.aspx?mid=1009&name=' + json[i].ChannelData + '"> ' +
                    '<div class="card">' +
                    '<div class="card-body">' +
                    '<div class="d-flex align-items-left">' +
                    '<div class="flex-shrink-0 me-3">' +
                    '<div class="avatar-sm">' +
                    '<div class="avatar-title bg-' + TrxColor + ' text-' + TrxColor + ' rounded-circle font-size-18">' +
                    '<i class="' + imgChannel + ' text-light"></i>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<p class="mb-1 text-truncate text-muted">' + ChannelName + '</p>' +
                    '<h5 class="font-size-16 mb-0">' + json[i].JumlahData + '</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</a> ' +
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
function DataTables() {
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxUnitKerja = $("#ContentPlaceHolder1_TrxUnitKerja").val();
    var TrxLevelUser = $("#ContentPlaceHolder1_TrxLevelUser").val();
    var result = "";
    var myTable = $('#TicketThread').DataTable(
        {
            "order": [[4, "desc"]]
        }
    );
    if (getParameterByName("name") != null) {
        myTable.search(getParameterByName("name")).draw();
    }
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/ServiceThread.asmx/DataTableThread",
        data: "{TrxUserName: '" + TrxUserName + "',TrxUnitKerja: '" + TrxUnitKerja + "',TrxLevelUser: '" + TrxLevelUser + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            myTable.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime

                    if (json[i].DatePickup == null) {
                        var EmailDate = "-"
                    } else {
                        var d = new Date(json[i].DatePickup);
                        var milisegundos = parseInt(json[i].DatePickup.replace("/Date(", "").replace(")/", ""));
                        var newDatePickup = new Date(milisegundos).toLocaleDateString("en-UE");
                        var newTimeDatePickup = new Date(milisegundos).toLocaleTimeString("en-UE");
                        var EmailDate = newDatePickup + ' ' + newTimeDatePickup
                    }
                    if (json[i].ValueThread == "FBcommentcomment" || json[i].ValueThread == "FBcommentpost" || json[i].ValueThread == "FBcommentreply" || json[i].ValueThread == "FBmentions") {
                        var FollowThread = "Facebook"
                    } else {
                        var FollowThread = json[i].ValueThread
                    }
                    if (json[i].CustomerID == null) {
                        var CustomerID = "-"
                    } else {
                        var CustomerID = json[i].CustomerID
                    }
                    if (json[i].ThreadCustomerName == null) {
                        var CustomerName = "-"
                    } else {
                        var CustomerName = json[i].ThreadCustomerName
                    }
                    if (json[i].Subject == null) {
                        var CustomerSubject = "-"
                    } else {
                        var maxlength = "80"
                        if (json[i].Subject.length > maxlength) {
                            var CustomerSubject = json[i].Subject.substring(0, 80) + ".."
                        } else {
                            var CustomerSubject = json[i].Subject
                        }
                    }
                    if (json[i].ValueThread == "Email" || json[i].ValueThread == "EMAIL" || json[i].ValueThread == "email") {
                        var TrxColor = "info";
                        var urlClick = "<div class='flex-shrink-0 dropdown'> " +
                            "<a class='text-body dropdown-toggle font-size-16' href='#' role='button' data-bs-toggle='dropdown' aria-haspopup='true'><i class='mdi mdi-dots-vertical ms-2'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-end'> " +
                            //"<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')>Spam</a> " +
                            //"<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Solved')>Solved</a> " +
                            "<a class='dropdown-item' href='Crm_Trx_Ticket_System.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "&title=" + json[i].ValueThread + "'>Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    } else if (json[i].ValueThread == "Call" || json[i].ValueThread == "call" || json[i].ValueThread == "voice") {
                        var TrxColor = "danger";
                        var urlClick = "<div class='flex-shrink-0 dropdown'> " +
                            "<a class='text-body dropdown-toggle font-size-16' href='#' role='button' data-bs-toggle='dropdown' aria-haspopup='true'><i class='mdi mdi-dots-vertical ms-2'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-end'> " +
                            //"<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Prank&nbsp;Call')>Prank Call</a> " +
                            //"<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Ignore')>Ignore</a> " +
                            "<a class='dropdown-item' href='Crm_Trx_Ticket_System.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "&title=" + json[i].ValueThread + "'>Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    } else if (json[i].ValueThread == "Facebook") {
                        var TrxColor = "primary";
                    } else if (json[i].ValueThread == "Instagram") {
                        var TrxColor = "warning";
                    } else if (json[i].ValueThread == "Facebook") {
                        var TrxColor = "primary";
                    } else if (json[i].ValueThread == "Whatsapp") {
                        var TrxColor = "success";
                        var urlClick = "<div class='flex-shrink-0 dropdown'> " +
                            "<a class='text-body dropdown-toggle font-size-16' href='#' role='button' data-bs-toggle='dropdown' aria-haspopup='true'><i class='mdi mdi-dots-vertical ms-2'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-end'> " +
                            //"<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')>Spam</a> " +
                            //"<a class='dropdown-item' href='#' onclick=PreviewWhatsApp('" + json[i].GenesysNumber + "','Ignore')>Preview WA</a> " +
                            //"<a class='dropdown-item' href='#' onclick=PreviewSosmed('" + json[i].GenesysNumber + "')>Preview Sosmed</a> " +
                            "<a class='dropdown-item' href='Crm_Trx_Ticket_System.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "&title=" + json[i].ValueThread + "'>Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    } else if (json[i].ValueThread == "Twitter") {
                        var TrxColor = "primary";
                    } else if (json[i].ValueThread == "Outbound Call") {
                        var FollowThread = "Outbound Call"
                        var TrxColor = "danger";
                        var urlClick = "<div class='flex-shrink-0 dropdown'> " +
                            "<a class='text-body dropdown-toggle font-size-16' href='#' role='button' data-bs-toggle='dropdown' aria-haspopup='true'><i class='mdi mdi-dots-vertical ms-2'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-end'> " +
                            //"<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')>Spam</a> " +
                            "<a class='dropdown-item' href='Crm_Trx_Ticket_System.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "&title=" + json[i].ValueThread + "'>Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    } else {
                        var TrxColor = "success";
                        var urlClick = "<div class='flex-shrink-0 dropdown'> " +
                            "<a class='text-body dropdown-toggle font-size-16' href='#' role='button' data-bs-toggle='dropdown' aria-haspopup='true'><i class='mdi mdi-dots-vertical ms-2'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-end'> " +
                            //"<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')>Spam</a> " +
                            "<a class='dropdown-item' href='Crm_Trx_Ticket_System.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "&title=" + json[i].ValueThread + "'>Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    }
                    if (json[i].AgentName == "" || json[i].AgentName == null) {
                        var TrxAgent = "<center>-</center>";
                    } else {
                        var TrxAgent = "<span class='badge badge-pill badge-warning' style='width: 100px;color:white;'>" + json[i].AgentName + "</span>";
                    }
                    var Accountlength = "40"
                    if (json[i].Account.length > Accountlength) {
                        var AccountEmail = json[i].Account.substring(0, 40) + ".."
                    } else {
                        var AccountEmail = json[i].Account
                    }

                    myTable.row.add([json[i].ValueThread, CustomerName, AccountEmail, ConverTanggal, urlClick]).draw(false);

                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionType(TrxID, TrxType) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#ContentPlaceHolder1_TrxType").val(TrxType);
    $("#hd_sessionLogin").val();
    $("#addContactModal").modal('show');
    console.log("session : " + $("#hd_sessionLogin").val());
    console.log("TrxID : " + $("#ContentPlaceHolder1_TrxID").val());
    console.log("TrxType : " + $("#ContentPlaceHolder1_TrxType").val());

    var result = "";
    var messageDiv = $('#divInstanNote');
    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxType: 'Thread' });
    $.ajax({
        url: "asmx/ServiceThread.asmx/ThreadDataSelectInstanNote",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
        data: form_data,
        success: function (data) {
            console.log("Action Select Instan Note : " + form_data)

            messageDiv.empty();
            var json = JSON.parse(data.d);
            var i, x = "";
            for (i = 0; i < json.length; i++) {
                //alert(json[i].TrxNote)
                //$("#divInstanNote").val(json[i].TrxNote);
                result = '<div class="post clearfix">' +
                    '<div class="user-block">' +
                    '<img class="img-bordered-sm rounded-circle" src="../images/user7-128x128.jpg" alt="user image">' +
                    '<span class="username">' +
                    '<a href="#">' + json[i].TrxUserCreate + '</a>' +
                    '</span>' +
                    '<span class="description" style="font-size:11px;">' + json[i].TrxDateView + '</span>' +
                    '</div>' +
                    '<div class="activitytimeline">' +
                    '<p>' +
                    '' + json[i].TrxNote + '' +
                    '</p>' +
                    '<div class="form-horizontal form-element">' +
                    '<div class="form-group row no-gutters">' +
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
        },
        complete: function () {

        }
    });
}
function ActionSubmit() {
    var ReasonThread = CKEDITOR.instances.ReasonThread.getData();
    if (ReasonThread == "") {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>thread reason</b> is empty ")
        return false
    }
    var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxType: $("#ContentPlaceHolder1_TrxType").val(), TrxReason: ReasonThread });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/ServiceThread.asmx/UpdateDataThread",
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
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trx_Thread.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "Crm_Trx_Thread.aspx";
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