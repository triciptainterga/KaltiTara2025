$(document).ready(function () {
    DisplayFilterDate()
    TrmDataCounting()
    TrmInboxEmail()
    ComboFromEmail();
    ComboForwardFromEmail();
    ComboForwardTypeCompose();
    DataListLoginAgent();
    $("#DivObjectReadEmail").hide()
    $("#FormCustomer").hide()
    $("#FormNewPerusahaan").hide()
});

//Action Page Loading
function DisplayFilterDate() {
    var jsonTextTanggal = JSON.stringify({ TrxID: "0", StartDate: "0", EndDate: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "FilterDate" });
    $.ajax({
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrxFilterDate",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonTextTanggal,
        success: function (data) {

            var json = JSON.parse(data.d);
            var j, result = "";

            for (j = 0; j < json.length; j++) {

                //$("#FilterDate").empty()
                //$("#FilterDate").append(json[j].StartDate + " s/d " + json[j].FinishDate)

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
function TrmDataCounting() {
    //$("#LoaderPageCounting").show();
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLevelUser = $("#TrxLayerUser").val();
    var result = "";
    //var messageFolder = $('#FolderEmail');
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/DataTransactionEmailCounting",
        data: "{TrxUserName: '" + TrxUserName + "', TrxLevelUser: '" + TrxLevelUser + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "", resultfolder = "";

            $("#InboxCount").empty();
            $("#DraftCount").empty();
            $("#SpamCount").empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].Folder == "Inbox") {
                    $("#InboxCount").append(json[i].Jumlah);
                    console.log("InboxCount " + json[i].Jumlah)
                } else if (json[i].Folder == "Draft") {
                    $("#DraftCount").append(json[i].Jumlah);
                    console.log("DraftCount " + json[i].Jumlah)
                } else if (json[i].Folder == "Spam") {
                    $("#SpamCount").append(json[i].Jumlah);
                    console.log("SpamCount " + json[i].Jumlah)
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //$("#LoaderPageCounting").hide();
}
function ComboFromEmail() {
    var ComboFrom = $('#ComboFrom');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'4', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK116'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultFrom = "";

            for (i = 0; i < json.length; i++) {

                if ($("#TrxLayerUser").val() == "layer2" || $("#TrxLayerUser").val() == "Admin") {
                    ResultFrom = '<option value="' + json[i].incoming_account_name + '">' + json[i].incoming_account_name + '</option>';
                } else {
                    ResultFrom = '<option value="' + json[i].incoming_account_name + '">' + json[i].incoming_account_name + '</option>';
                }
                ComboFrom.append(ResultFrom);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboForwardFromEmail() {
    var ComboForwardFrom = $('#ForwardComboFrom');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'4', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK117'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultForwardFrom = "";

            for (i = 0; i < json.length; i++) {

                ResultForwardFrom = '<option value="' + json[i].product_campaign + '">' + json[i].product_campaign + '</option>';
                ComboForwardFrom.append(ResultForwardFrom);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboForwardTypeCompose() {
    var ComboFormatCompose = $('#FormatTypeCompose');
    var ComboFormatReply = $('#FormatTypeReply');
    var ComboFormatForward = $('#FormatTypeForward');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK118'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultTypeForward = "";

            for (i = 0; i < json.length; i++) {

                ResultTypeForward = '<option value="' + json[i].ID + '">' + json[i].FORMAT + '</option>';
                ComboFormatCompose.append(ResultTypeForward);
                ComboFormatReply.append(ResultTypeForward);
                ComboFormatForward.append(ResultTypeForward);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
//Action Page Loading


//Action Table Email
function TrmInboxEmail() {
    $(this).addClass('active');
    $("#DivTrmInboxEmail").css("display", "block");
    $("#DivTrmSpamEmail").css("display", "none");
    $("#DivTrmSendingEmail").css("display", "none");
    $("#DivTrmDraftEmail").css("display", "none");
    $("#DivTrmArchiveEmail").css("display", "none");

    var myTable = $('#TrmInboxEmail').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'InboxTable', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlclick = '<div class="flex-shrink - 0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=Spam_Inbox("' + json[i].IVC_ID + '")>Spam</a> ' +
                    '<a class="dropdown-item" href="#" onclick=Reply_Inbox("' + json[i].IVC_ID + '")>Reply</a> ' +
                    '<a class="dropdown-item" href="#" onclick=Forward_Inbox("' + json[i].IVC_ID + '")>Forward</a> ' +
                    '<a class="dropdown-item" href="#" onclick=PreviewTableInbox("' + json[i].EMAIL_ID + '")>Preview</a> ' +
                    '<a class="dropdown-item" href="#" onclick=EmailConversation("' + json[i].RefID + '")>Conversation</a> ' +
                    '<a class="dropdown-item" href="#" onclick=Archive_Inbox("' + json[i].IVC_ID + '")>Archive</a> ' +
                    '<a class="dropdown-item" href="#" onclick=ActionTicket("' + json[i].RefID + '")>Ticket</a> ' +
                    '</div> ' +
                    '</div> '
                if (json[i].FLAG_HANDLING == "Y") {
                    var ResponseStatus = "<span class='badge rounded-pill badge-soft-primary font-size-12'>Response</span>"
                } else {
                    var ResponseStatus = "<span class='badge rounded-pill badge-soft-danger font-size-12'>Not Response</span>"
                }
                //if (json[i].FLAG_HANDLING == "1") {
                //    var ResponseStatus = "<span class='badge badge-pill badge-success' style='width: 85px;'>Response</span>"
                //} else {
                //    var ResponseStatus = "<span class='badge badge-pill badge-danger' style='width: 85px;'>Not Response</span>"
                //}
                if (json[i].Reading == 0 || json[i].Reading == null) {
                    var EmailService = "<a href='#' onclick=ReadingEmail('" + json[i].IVC_ID + "')><b>" + json[i].account.substring(0, 15) + "..</b></a>"
                    var EFROM = "<a href='#'  onclick=ReadingEmail('" + json[i].IVC_ID + "')><b>" + json[i].EFROM.substring(0, 40) + "..</b></a>"
                    var subject = "<a href='#'  onclick=ReadingEmail('" + json[i].IVC_ID + "')><b>" + json[i].ESUBJECT.substring(0, 25) + "..</b></a>"
                    var DateRead = "<a href='#'  onclick=ReadingEmail('" + json[i].IVC_ID + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                } else {
                    var EmailService = "<a href='#' onclick=ReadingEmail('" + json[i].IVC_ID + "')>" + json[i].account.substring(0, 15) + "..</a>"
                    var EFROM = "<a href='#' onclick=ReadingEmail('" + json[i].IVC_ID + "')>" + json[i].EFROM.substring(0, 40) + "..</a>"
                    var subject = "<a href='#' onclick=ReadingEmail('" + json[i].IVC_ID + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                    var DateRead = "<a href='#' onclick=ReadingEmail('" + json[i].IVC_ID + "')>" + newDate + ' ' + newTime + "</a>"
                }
                myTable.row.add([EmailService, EFROM, subject, ResponseStatus, DateRead, urlclick]).draw(false);

                //$("#LoaderPageCounting").hide();
            }


        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })


}
function TrmDraftEmail() {
    $(this).addClass('active');
    $("#DivTrmInboxEmail").css("display", "none");
    $("#DivTrmSpamEmail").css("display", "none");
    $("#DivTrmSendingEmail").css("display", "none");
    $("#DivTrmDraftEmail").css("display", "block");
    $("#DivTrmArchiveEmail").css("display", "none");

    var myTable = $('#TrmDraftEmail').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'DraftTable', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlclick = '<div class="flex-shrink - 0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=DraftSend("' + json[i].IVC_ID + '")>Preview</a> ' +
                    '<a class="dropdown-item" href="#" onclick=DraftDelete("' + json[i].IVC_ID + '")>Delete</a> ' +
                    //'<a class="dropdown-item" href="#" onclick=DraftPreview("' + json[i].IVC_ID + '")>Preview</a> ' +
                    '</div> ' +
                    '</div> '

                myTable.row.add([json[i].EFROM, json[i].ETO, json[i].ESUBJECT.substring(0, 20) + "..", newDate + ' ' + newTime, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSendingEmail() {
    $("#LoaderPageCounting").show();
    $("#DivTrmInboxEmail").css("display", "none");
    $("#DivTrmSpamEmail").css("display", "none");
    $("#DivTrmSendingEmail").css("display", "block");
    $("#DivTrmDraftEmail").css("display", "none");
    $("#DivTrmArchiveEmail").css("display", "none");

    //$("#myLabel").text("Email Sending");
    var myTable = $('#TrmSendingEmail').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'OutboxTable', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlclick = '<div class="flex-shrink - 0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=PreviewTableSending("' + json[i].EMAIL_ID + '")>Preview</a> ' +
                    '</div> ' +
                    '</div> '

                var EmailService = "<a href='#' onclick=Reading_Sending('" + json[i].IVC_ID + "')>" + json[i].EFROM + "</a>"
                var ETO = "<a href='#' onclick=Reading_Sending('" + json[i].IVC_ID + "')>" + json[i].ETO + "</a>"
                var subject = "<a href='#' onclick=Reading_Sending('" + json[i].IVC_ID + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                var DateRead = "<a href='#' onclick=Reading_Sending('" + json[i].IVC_ID + "')>" + newDate + ' ' + newTime + "</a>"

                myTable.row.add([EmailService, ETO, subject, DateRead, urlclick]).draw(false);
                //$("#LoaderPageCounting").hide();
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSpamEmail() {
    $("#DivTrmInboxEmail").css("display", "none");
    $("#DivTrmSpamEmail").css("display", "block");
    $("#DivTrmSendingEmail").css("display", "none");
    $("#DivTrmDraftEmail").css("display", "none");
    $("#DivTrmArchiveEmail").css("display", "none");

    var myTable = $('#TrmSpamEmail').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'SpamTable', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                //var urlClick = "<div class='dropdown'>" +
                //    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                //    "<div class='dropdown-menu dropdown-menu-right'>" +
                //    "<a class='dropdown-item' href='#' onclick=Spam_Reply('" + json[i].IVC_ID + "')><i class='fa fa-reply'></i> Reply</a>" +
                //    "<a class='dropdown-item' href='#' onclick=Spam_Forward('" + json[i].IVC_ID + "')><i class='fa fa-share'></i> Forward</a>" +
                //    "<div class='dropdown-divider'></div>" +
                //    "<a class='dropdown-item' href='#' onclick=PreviewTableInbox('" + json[i].EMAIL_ID + "')><i class='si-arrow-right-circle si'></i> Preview</a>" +
                //    "</div>" +
                //    "</div>"
                var urlclick = '<div class="flex-shrink - 0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=Spam_Reply("' + json[i].IVC_ID + '")>Reply</a> ' +
                    '<a class="dropdown-item" href="#" onclick=Spam_Forward("' + json[i].IVC_ID + '")>Forward</a> ' +
                    '<a class="dropdown-item" href="#" onclick=PreviewTableInbox("' + json[i].EMAIL_ID + '")>Preview</a> ' +
                    '</div> ' +
                    '</div> '

                if (json[i].Reading == 0 || json[i].Reading == null) {
                    var EmailService = "<a href='#'  onclick=ReadingEmail('" + json[i].IVC_ID + "')><b>" + json[i].ETO + "</b></a>"
                    var EFROM = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')><b>" + json[i].EFROM + "</b></a>"
                    var subject = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')><b>" + json[i].ESUBJECT.substring(0, 20) + "..</b></a>"
                    var DateRead = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                } else {
                    var EmailService = "<a href='#'  onclick=ReadingEmail('" + json[i].IVC_ID + "')>" + json[i].ETO + "</a>"
                    var EFROM = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')>" + json[i].EFROM + "</a>"
                    var subject = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                    var DateRead = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')>" + newDate + ' ' + newTime + "</a>"
                }
                myTable.row.add([EmailService, EFROM, subject, DateRead, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmArchiveEmail() {
    $("#DivTrmInboxEmail").css("display", "none");
    $("#DivTrmSpamEmail").css("display", "none");
    $("#DivTrmSendingEmail").css("display", "none");
    $("#DivTrmDraftEmail").css("display", "none");
    $("#DivTrmArchiveEmail").css("display", "block");
    var myTable = $('#TrmArchiveEmail').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'ArchiveTable', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlclick = '<div class="flex-shrink - 0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=Spam_Reply("' + json[i].IVC_ID + '")>Reply</a> ' +
                    '<a class="dropdown-item" href="#" onclick=Spam_Forward("' + json[i].IVC_ID + '")>Forward</a> ' +
                    '<a class="dropdown-item" href="#" onclick=PreviewTableInbox("' + json[i].EMAIL_ID + '")>Preview</a> ' +
                    '</div> ' +
                    '</div> '

                if (json[i].Reading == 0 || json[i].Reading == null) {
                    var EmailService = "<a href='#'  onclick=ReadingEmail('" + json[i].IVC_ID + "')><b>" + json[i].ETO + "</b></a>"
                    var EFROM = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')><b>" + json[i].EFROM + "</b></a>"
                    var subject = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')><b>" + json[i].ESUBJECT.substring(0, 20) + "..</b></a>"
                    var DateRead = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                } else {
                    var EmailService = "<a href='#'  onclick=ReadingEmail('" + json[i].IVC_ID + "')>" + json[i].ETO + "</a>"
                    var EFROM = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')>" + json[i].EFROM + "</a>"
                    var subject = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                    var DateRead = "<a href='#'  onclick=Reading_Spam('" + json[i].IVC_ID + "')>" + newDate + ' ' + newTime + "</a>"
                }
                myTable.row.add([EmailService, EFROM, subject, DateRead, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
//Action Table Email


//Action Table Inbox Email
function Spam_Inbox(SpamID) {
    if (SpamID == '') {
        swal("Email is empty");
        return false
    }
    var form_data = JSON.stringify({
        TrxID: SpamID, TrxUserName: $("#hd_sessionLogin").val(), TrxLayerUser: $("#TrxLayerUser").val()
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
                    url: "asmx/TrmMailSystem.asmx/UpdateEmailSpam",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data Has Been Spam Success',
                                    'success'
                                ).then(function () {
                                    TrmDataCounting();
                                    TrmInboxEmail();
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Has Been Spam Failed !',
                                    'error'
                                ).then(function () {
                                    TrmDataCounting();
                                    TrmInboxEmail();
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
function Reply_Inbox(ReplyID) {
    ReadingEmail(ReplyID)
    $("#ContentPlaceHolder1_TrxID").val(ReplyID);
    $("#modal-reply").modal('show');
    TrmInboxEmailSelected();
    TrmSignature("2");
}
function Forward_Inbox(ForwardID) {
    ReadingEmail(ForwardID)
    $("#ContentPlaceHolder1_TrxID").val(ForwardID)
    $("#modal-forward").modal('show');
    ForwardEmailSelected(ForwardID);
    TrmSignature("3")
}
function PreviewTableInbox(PreviewID) {
    var FileInboxHTML = "" + IPSERVER + "/FileEmail/INBOX"
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/OUTBOX"
    var UrlType = "1";
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/ValidasikFolderFileHTML",
        data: "{Url: '" + UrlType + "', EmailID: '" + PreviewID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {

                    $("#modal-preview").modal('show');
                    document.getElementById("Preview_FrameHTML").src = "" + FileInboxHTML + "/" + PreviewID + "/file.html"
                    PreviewAttachmentEmail(PreviewID)
                    //PreviewAttachmentReplyEmail(PreviewID)

                } else {
                    swal(
                        '',
                        'Data Not Found',
                        'info'
                    ).then(function () {
                        return false;
                    });
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
function EmailConversation(RefID) {
    $("#modal-conversation").modal('show');
    var FileInboxHTML = "" + IPSERVER + "/FileEmail/Inbox"
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/Outbox"
    var filenameimage = "";
    var result = "";
    var result_in = ""
    var messageDiv = $('#Journeymailconversation');
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailConversation",
        data: "{RefID: '" + RefID + "', UserName: '" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;

            messageDiv.empty();
            json.forEach(async (item) => {

                //console.log(item)
                if (item.DIRECTION == "IN") {

                    let imagein = ""
                    await $.ajax({
                        type: "POST",
                        url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailAttachment",
                        data: "{RefID: '" + RefID + "', EmailID: '" + item.EMAIL_ID + "', Direction: 'IN', UserName: '" + $("#hd_sessionLogin").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var j = 0;

                            console.log("Direction in")
                            for (j = 0; j < json.length; j++) {

                                //imagein += '<a href=' + FileInboxHTML + "/" + json[j].URL + ' target="_blank"><i class="fas fa-file"></i></a>'
                                imagein += '<div class="card border shadow-none mb-2">' +
                                    '<div class="p-2">' +
                                    '<div class="d-flex">' +
                                    '<div class="avatar-sm align-self-center me-2">' +
                                    '<div class="avatar-title rounded bg-transparent text-primary font-size-18">' +
                                    '<i class="fas fa-file"></i>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="overflow-hidden me-auto">' +
                                    '<h5 class="font-size-13 text-truncate mb-1">' + json[j].FILENAME + '</h5>' +
                                    '<a href=' + FileInboxHTML + "/" + json[j].URL + ' target="_blank" class="text-body">' +
                                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                                    '</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'

                            }
                            console.log(imagein)
                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                    result = '<div class="timeline-item">' +
                        '<div class="timeline-block">' +
                        '<div class="timeline-box card">' +
                        '<div class="card-body">' +
                        '<div class="timeline-date">' + item.EFROM +'</div>' +
                        '<h5 class="mt-3 font-size-16">' + item.ESUBJECT +'</h5>' +
                        '<div class="text-muted">' +
                        '' + item.EBODY_HTML +'' +
                        '</div>' +
                        '<div class="timeline-album">' +
                        '' + imagein + '' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'

                } else {

                    let imageout = ""
                    await $.ajax({
                        type: "POST",
                        url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailAttachment",
                        data: "{RefID: '" + RefID + "', EmailID: '" + item.EMAIL_ID + "', Direction: 'OUT', UserName: '" + $("#hd_sessionLogin").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var j = 0;

                            console.log("Direction Out")
                            for (j = 0; j < json.length; j++) {

                                //imageout += "<a href='" + FileOutboxHTML + "/" + json[j].URL + "' class='btn btn-default btn-xs pull-right' target='_blank'><i class='fa fa-cloud-download'>111</i></a>"
                                imageout += '<div class="card border shadow-none mb-2">' +
                                    '<div class="p-2">' +
                                    '<div class="d-flex">' +
                                    '<div class="avatar-sm align-self-center me-2">' +
                                    '<div class="avatar-title rounded bg-transparent text-primary font-size-18">' +
                                    '<i class="fas fa-file"></i>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="overflow-hidden me-auto">' +
                                    '<h5 class="font-size-13 text-truncate mb-1">' + json[j].FILENAME + '</h5>' +
                                    '<a href=' + FileOutboxHTML + "/" + json[j].URL + ' target="_blank" class="text-body">' +
                                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                                    '</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'

                            }
                            console.log(imageout)
                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                    result = '<div class="timeline-item">' +
                        '<div class="timeline-block">' +
                        '<div class="timeline-box card">' +
                        '<div class="card-body">' +
                        '<div class="timeline-date">' + item.EFROM + '</div>' +
                        '<h5 class="mt-3 font-size-16">' + item.ESUBJECT + '</h5>' +
                        '<div class="text-muted">' +
                        '' + item.EBODY_HTML + '' +
                        '</div>' +
                        '<div class="timeline-album">' +
                        '' + imageout + '' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'

                }

                messageDiv.append(result);

            })


        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Archive_Inbox(ArchiveID) {
    if (ArchiveID == '') {
        swal("Email is empty");
        return false
    }
    var form_data = JSON.stringify({
        TrxID: ArchiveID, TrxUserName: $("#hd_sessionLogin").val(), TrxLayerUser: $("#TrxLayerUser").val()
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
                    url: "asmx/TrmMailSystem.asmx/UpdateEmailArcive",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data Has Been Spam Success',
                                    'success'
                                ).then(function () {
                                    TrmDataCounting();
                                    TrmArchiveEmail();
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Has Been Spam Failed !',
                                    'error'
                                ).then(function () {
                                    TrmDataCounting();
                                    TrmArchiveEmail();
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
//Action Table Inbox Email

//Action Table Spam Email
function Spam_Reply(ReplyID) {
    $("#ContentPlaceHolder1_TrxID").val(ReplyID);
    $("#modal-reply").modal('show');
    TrmInboxEmailSelected();
    TrmSignature("2");
}
function Spam_Forward(ReplyID) {
    $("#ContentPlaceHolder1_TrxID").val(ReplyID);
    $("#modal-forward").modal('show');
    TrmSignature("3");
    var FileInboxHTML = "" + IPSERVER + "/FileEmail/INBOX"
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxEvent: 'Spam_Forward', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "", resultReplyBody = "", resultReplyBody1 = "", resultReplyBodyFinish = "";

            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                $("#ContentPlaceHolder1_HdForward_From").val(json[i].ETO);
                $("#ForwardComboFrom option:selected").text(json[i].ETO);
                //$("#ForwardTo").val(json[i].EFROM);
                $("#ForwardSubject").val("FWD :" + json[i].ESUBJECT);
                $("#ForwardECC").val(json[i].ECC);
                $("#ContentPlaceHolder1_TrxEmailID").val(json[i].EMAIL_ID);
                PreviewAttachmentInboxEmail(json[i].EMAIL_ID);
                document.getElementById("Forward_FrameHTML").src = "" + FileInboxHTML + "/" + json[i].EMAIL_ID + "/file.html"

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
//Action Table Spam Email

//Action Table Draft Email
function DraftSend(DraftID) {
    $("#ContentPlaceHolder1_DraftID").val(DraftID)
    $("#modal-compose").modal('show');
    $("#DraftSendActionButton").show()
    $("#ComposeActionButton").hide()
    $("#DraftActionButton").hide()
    TrmSignature("1")
    $("#FileUploadDraft").css("display", "block");
    $("#FileUploadCompose").css("display", "none");
    DraftEmailSelected(DraftID)
}
function DraftDelete(DraftID) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxIvcID: DraftID, TrxUserName: $("#hd_sessionLogin").val(),
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailDraft_Delete",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)
                        window.location = "Crm_Trx_MailSystem.aspx";
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
//Action Table Draft Email


//Action Compose Email
function Compose_Add() {
    $("#ComboFrom").val("");
    $("#ComposeETO").val("");
    $("#ComposeESUBJECT").val("");
    $("#ComposeECC").val("");
    //CKEDITOR.instances.Compose_Body.setData("")
    //TrmSignature("1")
    $("#ComposeActionButton").show()
    $("#DraftActionButton").show()
    $("#DraftSendActionButton").hide()
    $("#modal-compose").modal('show');
    $("#FileUploadDraft").css("display", "none");
    $("#FileUploadCompose").css("display", "block");
}
//Action Compose Email


//Action Fungsi Submit
function Compose_ActionButton() {
    if ($("#ComboFrom").val() == 'Select' || $("#ComboFrom").val() == '') {
        swal(
            '',
            'From is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComposeETO").val() == '') {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var CompESubject = $('#ComposeESUBJECT').val();
    if (CompESubject == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    var TrxBodyCompose = $('#Compose_Body').val();
;    if (TrxBodyCompose == '') {
        swal(
            '',
            'Body is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        var maxlength = "7500"
        if (TrxBodyCompose.length > maxlength) {
            swal(
                '',
                'Character Length is over, Maximum Length 7500 Character',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    var form_data = JSON.stringify({
        TrxUserName: $("#hd_sessionLogin").val(), TrxEmailFrom: $("#ComboFrom").val(), TrxTO: $("#ComposeETO").val(), TrxSubject: $("#ComposeESUBJECT").val(),
        TrxCC: $("#ComposeECC").val(), TrxBody: TrxBodyCompose, TrxDirection: "OUT", TrxType: "compose_email"
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
                    url: "asmx/TrmMailSystem.asmx/InsertComposeEmail",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    //CKEDITOR.instances.Compose_Body.setData("");
                                    $('#Compose_Body').val()
                                    window.location = "Crm_Trx_MailSystem.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    //CKEDITOR.instances.Compose_Body.setData("");
                                    $('#Compose_Body').val()
                                    window.location = "Crm_Trx_MailSystem.aspx?";
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
            } else {
                $("#ComposeETO").val("");
                $("#ComposeESUBJECT").val("");
                $("#ComposeECC").val("");
                $("#modal-compose").modal('hide');
            }
        });
}
function DraftSend_ActionButton() {
    if ($("#ComboFrom").text() == 'Select' || $("#ComboFrom").text() == '') {
        swal(
            '',
            'From is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComposeETO").val() == '') {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ComposeESUBJECT = $("#ComposeESUBJECT").val()
    if (ComposeESUBJECT == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    var TrxBodyCompose = $('#Compose_Body').val()
    var maxlength = "7500"
    if (TrxBodyCompose.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBodyCompose == '') {
        swal(
            '',
            'Body is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        TrxDraftID: $("#ContentPlaceHolder1_DraftID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxEmailFrom: $("#ComboFrom").val(), TrxTO: $("#ComposeETO").val(), TrxSubject: $("#ComposeESUBJECT").val(),
        TrxCC: $("#ComposeECC").val(), TrxBody: TrxBodyCompose, TrxDirection: "OUT", TrxType: "compose_email"
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
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailDraftSending",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "Crm_Trx_MailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "Crm_Trx_MailSystem.aspx";
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
            } else {
                $("#ComposeETO").val("");
                $("#ComposeESUBJECT").val("");
                $("#ComposeECC").val("");
                $("#modal-compose").modal('hide');
            }
        });
}
function DraftEvent() {
    if ($("#ComposeETO").val() != '') {
        if ($("#ComposeESUBJECT").val() != '') {
            var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
            var maxlength = "7500"
            if (TrxBodyCompose.length > maxlength) {
                swal(
                    '',
                    'Character Length is over, Maximum Length 7500 Character',
                    'error'
                ).then(function () {
                    return false;
                });
                return false;
            }
            if (TrxBodyCompose != '') {
                if ($("#ContentPlaceHolder1_DraftID").val() == "") {
                    Draft_ActionClose_Insert()
                } else {
                    Draft_ActionClose_Update()
                    //if ($("#ContentPlaceHolder1_TrxID").val() == "") {
                    //    Draft_ActionClose_Insert()
                    //} else {
                    //    Draft_ActionClose_Update()
                    //}
                    //    $("#modal-compose").modal('hide');
                }
            } else {
                $("#modal-compose").modal('hide');
            }
        } else {
            $("#modal-compose").modal('hide');
        }
    } else {
        var form_data = JSON.stringify({
            TrxUserName: $("#hd_sessionLogin").val()
        });
        $.ajax({
            url: "asmx/TrmMailSystem.asmx/CleansingDraftAttachment",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: form_data,
            success: function (data) {
                console.log(form_data)
                window.location = "Crm_Trx_MailSystem.aspx";
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            },
            complete: function () {

            }
        });
        $("#modal-compose").modal('hide');
    }
}
function Draft_ActionClose_Insert() {
    if ($("#ComboFrom").val() == 'Select' || $("#ComboFrom").val() == '') {
        swal(
            '',
            'From is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComposeETO").val() == '') {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ComposeESUBJECT = $("#ComposeESUBJECT").val()
    if (ComposeESUBJECT == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    var maxlength = "7500"
    if (TrxBodyCompose.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBodyCompose == '') {
        swal(
            '',
            'Body is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    swal({
        title: "Do you want to continue this email as a draft ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailDraft",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: "{ TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEmailFrom: ' " + $("#ComboFrom").val() + "', TrxTO: '" + $("#ComposeETO").val() + "', TrxSubject: '" + $("#ComposeESUBJECT").val() + "',TrxCC: '" + $("#ComposeECC").val() + "',TrxBody: '" + TrxBodyCompose + "',TrxDirection: 'DRAFT',TrxType: 'draft_email'}",
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been send to draft success',
                                    'success'
                                ).then(function () {
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "Crm_Trx_MailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been send to draft failed !',
                                    'error'
                                ).then(function () {
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "Crm_Trx_MailSystem.aspx";
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

            } else {

                var form_data = JSON.stringify({
                    TrxUserName: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/CleansingDraftAttachment",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)
                        window.location = "Crm_Trx_MailSystem.aspx";
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
function Draft_ActionClose_Update() {
    if ($("#ComboFrom").text() == 'Select' || $("#ComboFrom").text() == '') {
        swal(
            '',
            'From is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComposeETO").val() == '') {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ComposeESUBJECT = $("#ComposeESUBJECT").val()
    if (ComposeESUBJECT == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    var maxlength = "7500"
    if (TrxBodyCompose.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBodyCompose == '') {
        swal(
            '',
            'Body is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    swal({
        title: "Do you want to continue this email as a draft ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailDraft_Update",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: "{ TrxIvcID: '" + $("#ContentPlaceHolder1_DraftID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEmailFrom: '" + $("#ComboFrom").val() + "', TrxTO: '" + $("#ComposeETO").val() + "',TrxSubject: '" + $("#ComposeESUBJECT").val() + "',TrxCC: '" + $("#ComposeECC").val() + "',TrxBody: '" + TrxBodyCompose + "',TrxDirection: 'DRAFT',TrxType: 'draft_email'}",
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been send to draft success',
                                    'success'
                                ).then(function () {
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    $("#ContentPlaceHolder1_DraftID").val("");
                                    window.location = "Crm_Trx_MailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been send to draft failed !',
                                    'error'
                                ).then(function () {
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "Crm_Trx_MailSystem.aspx";
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

            } else {

                var form_data = JSON.stringify({
                    TrxUserName: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/CleansingDraftAttachment",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)
                        window.location = "TrmMailSystem.aspx";
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
//Action Fungsi Submit


//Action Reading Email
function ReadingEmail(ReadingID) {
    $("#FormNewPerusahaan").hide()
    $("#FormBodyEmail").hide()
    $("#FormReadingEmail").hide()
    $("#FormCustomer").show()
    $("#DivObjectReadEmail").show()
    $("#ContentPlaceHolder1_TrxID").val(ReadingID)
    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxLayerUser: $("#TrxLayerUser").val() });
    console.log("ReadingEmail : " + form_data)
    $.ajax({
        url: "asmx/TrmMailSystem.asmx/UpdateReadingEmail",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                TrmInboxEmail();
                TrmDataCounting();

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
function TrmInboxEmailSelected() {
    var FileInboxHTML = "" + IPSERVER + "/FileEmail/INBOX"
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxEvent: 'InboxSelected', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "", resultReplyBody = "", resultReplyBody1 = "", resultReplyBodyFinish = "";

            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                $("#ReplyEmailService").val(json[i].account);
                $("#ReplyTo").val(ReplaceEmailCC(json[i].EFROM + ";" + json[i].ETO));
                $("#ReplySubject").val("RE :" + json[i].ESUBJECT);
                if (json[i].ECC == "cs@brilife.co.id;" || json[i].ECC == "helpdesk.distribution@brilife.co.id;") {
                    $("#ReplyECC").val("");
                } else {
                    $("#ReplyECC").val(json[i].ECC);
                }
                $("#ContentPlaceHolder1_TrxEmailID").val(json[i].EMAIL_ID);
                ReplyAttachmentInboxEmail(json[i].EMAIL_ID);
                document.getElementById("Reply_FrameHTML").src = "" + FileInboxHTML + "/" + json[i].EMAIL_ID + "/file.html"

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ForwardEmailSelected(ForwardID) {
    var FileInboxHTML = "" + IPSERVER + "/FileEmail/INBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + ForwardID + "', TrxEvent: 'ForwardEmailSelected', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "", resultReplyBody = "", resultReplyBody1 = "", resultReplyBodyFinish = "";

            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                $("#ContentPlaceHolder1_HdForward_From").val(json[i].account);
                $("#ForwardComboFrom option:selected").text(json[i].account);
                //$("#ForwardComboFrom").val(json[i].ETO);
                //$("#ForwardTo").val(json[i].EFROM);
                $("#ForwardSubject").val("FWD :" + json[i].ESUBJECT);
                if (json[i].ECC == "cs@brilife.co.id" || json[i].ECC == "helpdesk.distribution@brilife.co.id") {
                    $("#ForwardECC").val("");
                } else {
                    $("#ForwardECC").val(json[i].ECC);
                }
                PreviewAttachmentInboxEmail(json[i].EMAIL_ID)
                document.getElementById("Forward_FrameHTML").src = "" + FileInboxHTML + "/" + json[i].EMAIL_ID + "/file.html"

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSignature(TrxEventID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK79'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultCallCampaigns = "";

            for (i = 0; i < json.length; i++) {

                if (TrxEventID == "1") {
                    CKEDITOR.instances.Compose_Body.setData(json[i].signature);
                } else if (TrxEventID == "2") {
                    CKEDITOR.instances.Reply_BodyEmail.setData(json[i].signature);
                } else {
                    CKEDITOR.instances.Forward_BodyEmail.setData(json[i].signature);
                }

                $("#ContentPlaceHolder1_HDSignature").val(json[i].signature)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function PreviewAttachmentEmail(TrxEmailID) {
    //$("#LoaderPageAttachment").hide();
    var FileInboxHTML = "" + IPSERVER + "/FileEmail/INBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + TrxEmailID + "', TrxEvent: 'PreviewAttachmentInboxEmail', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultPreviewInboxAttachment = "";

            $('#Div_PreviewAttachment').empty();
            for (i = 0; i < json.length; i++) {

                var color = ""
                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                    color = "success"
                }
                ResultPreviewInboxAttachment = '<div class="card border shadow-none mb-2">' +
                    '<div class="p-2">' +
                    '<div class="d-flex">' +
                    '<div class="avatar-sm align-self-center me-2">' +
                    '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                    '<i class="fas fa-' + FileTypes + '"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="overflow-hidden me-auto">' +
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].FILENAME + '</h5>' +
                    '<a href=' + FileInboxHTML + '/' + json[i].URL + ' target="_blank" class="text-body">' +
                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=deleteAttachment(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#Div_PreviewAttachment').append(ResultPreviewInboxAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //$("#LoaderPageAttachment").hide();
}
function DraftEmailSelected(DraftID) {
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + DraftID + "', TrxEvent: 'DraftSelected', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "", resultReplyBody = "", resultReplyBody1 = "", resultReplyBodyFinish = "";

            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                //$("#ComboFrom").val(json[i].EFROM);
                $("#ComboFrom option:selected").text(json[i].EFROM);
                $("#ComposeETO").val(json[i].ETO);
                $("#ComposeESUBJECT").val(json[i].ESUBJECT);
                $("#ComposeECC").val(json[i].ECC);
                CKEDITOR.instances.Compose_Body.setData(json[i].EBODY_TEXT)
                PreviewAttachmentDraftEmail(json[i].EMAIL_ID)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function PreviewAttachmentDraftEmail(TrxEmailID) {
    //$("#LoaderPageAttachment").hide();
    $("#ContentPlaceHolder1_TrxEmailID").val(TrxEmailID)
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + TrxEmailID + "', TrxEvent: 'PreviewAttachmentReplyEmail', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultPreviewReplyAttachment = "";

            $('#Div_Compose_Attachment').empty();
            for (i = 0; i < json.length; i++) {

                PreviewAttachmentInboxEmail(json[i].ATTACHMENT_ID)

                var color = ""
                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                    color = "success"
                }

                //ResultPreviewReplyAttachment = '<ul class="mailbox-attachments clearfix">' +
                //    '<li>' +
                //    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-danger"></i></span>' +
                //    '<div class="mailbox-attachment-info">' +
                //    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 10) + '</a>' +
                //    '<a href=' + FileOutboxHTML + '/' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachment(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
                //    '</span>' +
                //    '</div>' +
                //    '</li>' +
                //    '<ul>'
                ResultPreviewReplyAttachment = '<div class="card border shadow-none mb-2">' +
                    '<div class="p-2">' +
                    '<div class="d-flex">' +
                    '<div class="avatar-sm align-self-center me-2">' +
                    '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                    '<i class="fas fa-' + FileTypes + '"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="overflow-hidden me-auto">' +
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].FILENAME + '</h5>' +
                    '<a href=' + FileOutboxHTML + '/' + json[i].URL + ' target="_blank" class="text-body">' +
                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=deleteAttachment(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#Div_Compose_Attachment').append(ResultPreviewReplyAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
//    $("#LoaderPageAttachment").hide();
}
//Action Reading Email


//Action Function
function ReplaceEmailCC(AddressEmail) {
    //alert(AddressEmail)
    let dummyString = AddressEmail;
    newString = dummyString.replace('helpdesk.distribution@brilife.co.id;', '').replace('cs@brilife.co.id;', '').replace('Helpdesk.distribution@brilife.co.id;', '').replace('CS@brilife.co.id;', '').replace('Helpdesk.Distribution@brilife.co.id;', '');
    //alert(newString);
    return newString
}
function ChangeComboSignature(val) {
    if ($("#TrxLayerUser").val() === "Admin") {
        CKEDITOR.instances.Compose_Body.setData("");
        CKEDITOR.instances.Reply_BodyEmail.setData("")
        CKEDITOR.instances.Forward_BodyEmail.setData("");
        //alert(val)
        $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
            data: "{TrxID:'" + $("#ComboFrom").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK79'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i = "0";

                for (i = 0; i < json.length; i++) {

                    if (val == "1") {
                        CKEDITOR.instances.Compose_Body.setData(json[i].signature);
                    } else if (val == "2") {
                        CKEDITOR.instances.Reply_BodyEmail.setData(json[i].signature);
                    } else {
                        CKEDITOR.instances.Forward_BodyEmail.setData(json[i].signature);
                    }
                    $("#ContentPlaceHolder1_HDSignature").val(json[i].signature)
                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
    //else if ($("#TrxLayerUser").val() === "layer2") {
    //    //alert("2")
    //    CKEDITOR.instances.Compose_Body.setData("");
    //    CKEDITOR.instances.Reply_BodyEmail.setData("")
    //    CKEDITOR.instances.Forward_BodyEmail.setData("");
    //    $.ajax({
    //        type: "POST",
    //        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
    //        data: "{TrxID:'" + $("#ComboFrom").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK80'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (data) {

    //            var json = JSON.parse(data.d);
    //            var i = "0";

    //            for (i = 0; i < json.length; i++) {

    //                if (val === "1") {
    //                    CKEDITOR.instances.Compose_Body.setData(json[i].signature);
    //                } else if (val === "2") {
    //                    CKEDITOR.instances.Reply_BodyEmail.setData(json[i].signature);
    //                } else {
    //                    CKEDITOR.instances.Forward_BodyEmail.setData(json[i].signature);
    //                }
    //                $("#ContentPlaceHolder1_HDSignature").val(json[i].signature)
    //            }

    //        },
    //        error: function (xmlHttpRequest, textStatus, errorThrown) {
    //            console.log(xmlHttpRequest.responseText);
    //            console.log(textStatus);
    //            console.log(errorThrown);
    //        }
    //    })
    //}
    else {
        TrmSignature(val)
    }
}
function OnchangeFormatTypeCompose(FormatID) {
    if ($('#FormatTypeCompose').val() == "" || $('#FormatTypeCompose').val() == "Select" || $('#FormatTypeCompose').val() == null) {
        TrmSignature("1")
    } else {
        $.ajax({
            type: "POST",
            url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
            data: "{ID:'" + $('#FormatTypeCompose').val() + "', Template:'0', Format:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var json = JSON.parse(data.d);
                var i = "";

                for (i = 0; i < json.length; i++) {

                    var TemplateCompose = json[i].TEMPLATE_RESPONSE + "</br>" + $("#ContentPlaceHolder1_HDSignature").val()
                    //CKEDITOR.instances.Compose_Body.setData(TemplateCompose)
                    $('#Compose_Body').val(TemplateCompose)

                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
}
function OnchangeFormatTypeReply(FormatID) {
    if ($('#FormatTypeReply').val() == "" || $('#FormatTypeReply').val() == "Select" || $('#FormatTypeReply').val() == null) {
        TrmSignature("2")
    } else {
        $.ajax({
            type: "POST",
            url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
            data: "{ID:'" + $('#FormatTypeReply').val() + "', Template:'0', Format:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var json = JSON.parse(data.d);
                var i = "";

                for (i = 0; i < json.length; i++) {

                    var TemplateCompose = json[i].TEMPLATE_RESPONSE + "</br>" + $("#ContentPlaceHolder1_HDSignature").val()
                    //CKEDITOR.instances.Reply_BodyEmail.setData(TemplateCompose)
                    $('#Reply_BodyEmail').val(TemplateCompose)
                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
}
function OnchangeFormatTypeForward(FormatID) {
    if ($('#FormatTypeForward').val() == "" || $('#FormatTypeForward').val() == "Select" || $('#FormatTypeForward').val() == null) {
        TrmSignature("3")
    } else {
        $.ajax({
            type: "POST",
            url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
            data: "{ID:'" + $('#FormatTypeForward').val() + "', Template:'0', Format:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var json = JSON.parse(data.d);
                var i = "";

                for (i = 0; i < json.length; i++) {

                    var TemplateCompose = json[i].TEMPLATE_RESPONSE + "</br>" + $("#ContentPlaceHolder1_HDSignature").val()
                    //CKEDITOR.instances.Forward_BodyEmail.setData(TemplateCompose)
                    $('#Forward_BodyEmail').val(TemplateCompose)

                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
}
//Action Function


//Action Upload Attachment
//* Upload Attachment Compose *//
$('#files').change(function () {
    var filename = $('#files').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='files']", function (e) {
    $(".hiddenX").show();
    //var valnoWA = "628119970460";//$('#tglKejadian').val();

    //$("#LoaderPageCounting").show();
    if ($("#ComposeETO").val() == '') {
        swal("To is empty");
        //$("#LoaderPageCounting").hide();
        return false
    }

    if ($("#ComposeESUBJECT").val() == '') {
        swal("Subject is empty");
        //$("#LoaderPageCounting").hide();
        return false
    }

    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    if (TrxBodyCompose == '') {
        swal("Body is empty");
        //$("#LoaderPageCounting").hide();
        return false
    }

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 10) {
            swal(
                '',
                'Please upload file less than 2 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        data.append("Emailid", $("#ContentPlaceHolder1_TrxEmailID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrmMailSystem.asmx/UploadFile",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());

            ////var TrxMessage = 'Your file has been upload'
            ////AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
            TrmAttachmentEmailCompose($("#hd_sessionLogin").val());

        });

        request.fail(function (response) {

            console.log(response.responseText);
            //alert(response.responseText);

        });

        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});
function TrmAttachmentEmailCompose(TrxUserName) {
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/OUTBOX"
    //$("#LoaderPageCounting").show();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: 'UideskIndonesia', TrxEvent: 'TrmAttachmentEmailCompose', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultComposeBodyAttachment = "";

            $('#Div_Compose_Attachment').empty();
            for (i = 0; i < json.length; i++) {

                var color = ""
                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "zip";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "code";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "zip";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                    color = "success"
                }
                resultComposeBodyAttachment = '<div class="card border shadow-none mb-2">' +
                    '<div class="p-2">' +
                    '<div class="d-flex">' +
                    '<div class="avatar-sm align-self-center me-2">' +
                    '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                    '<i class="fas fa-' + FileTypes + '"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="overflow-hidden me-auto">' +
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].FILENAME + '</h5>' +
                    '<a href=' + FileOutboxHTML + '/' + json[i].URL + ' target="_blank" class="text-body">' +
                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=deleteAttachment(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#Div_Compose_Attachment').append(resultComposeBodyAttachment)

            }
            //$("#LoaderPageCounting").hide();

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function deleteAttachment(DeleteID) {
    if (DeleteID == '') {
        swal("Attachment is empty");
        return false
    }
    var form_data = JSON.stringify({
        TrxID: DeleteID, TrxUserName: $("#hd_sessionLogin").val()
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
                    url: "asmx/TrmMailSystem.asmx/DeleteAttachmentEmail",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        TrmAttachmentEmailCompose($("#hd_sessionLogin").val());

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
// --- Upload Attachment Compose --- //
//Action Upload Attachment


//* Upload Attachment Reply *//
$('#attachmentreply').change(function () {
    var filename = $('#attachmentreply').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='attachmentreply']", function (e) {
    $(".hiddenX").show();
    //var valnoWA = "628119970460";//$('#tglKejadian').val();

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 10) {
            swal(
                '',
                'Please upload file less than 2 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        data.append("Emailid", $("#ContentPlaceHolder1_TrxGenerateEmailID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrmMailSystem.asmx/UploadFile",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());
            ReplyAttachmentReplyEmail($("#ContentPlaceHolder1_TrxGenerateEmailID").val())

        });

        request.fail(function (response) {

            console.log(response.responseText);
            //alert(response.responseText);

        });

        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});
function ReplyAttachmentInboxEmail(TrxEmailID) {
    $("#divInboxAttachment").css("display", "block");
    var FileInboxHTML = "" + IPSERVER + "/FileEmail/INBOX"
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + TrxEmailID + "', TrxEvent: 'ReplyAttachmentInboxEmail', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultInboxAttachment = "";

            $('#Div_Inbox_Attachment').empty();
            for (i = 0; i < json.length; i++) {

                var color = ""
                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                    color = "success"
                }
                if (json[i].DIRECTION = "IN") {
                    var URLFile = FileInboxHTML
                } else if (json[i].DIRECTION = "out") {
                    var URLFile = FileOutboxHTML
                }
                resultInboxAttachment = '<div class="card border shadow-none mb-2">' +
                    '<div class="p-2">' +
                    '<div class="d-flex">' +
                    '<div class="avatar-sm align-self-center me-2">' +
                    '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                    '<i class="fas fa-' + FileTypes + '"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="overflow-hidden me-auto">' +
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].FILENAME + '</h5>' +
                    '<a href=' + URLFile + '/' + json[i].URL + ' target="_blank" class="text-body">' +
                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=deleteAttachment(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#Div_Inbox_Attachment').append(resultInboxAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ReplyAttachmentReplyEmail(TrxEmailID) {
    var FileInboxHTML = "" + IPSERVER + "/FileEmail/INBOX"
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + TrxEmailID + "', TrxEvent: 'ReplyAttachmentReplyEmail', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultReplyAttachment = "";

            $('#Div_Reply_Attachment').empty();
            for (i = 0; i < json.length; i++) {

                var color = ""
                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                    color = "success"
                }
                if (json[i].DIRECTION == "IN") {
                    var URLFile = FileInboxHTML
                } else if (json[i].DIRECTION == "OUT") {
                    var URLFile = FileOutboxHTML
                }
                resultReplyAttachment = '<div class="card border shadow-none mb-2">' +
                    '<div class="p-2">' +
                    '<div class="d-flex">' +
                    '<div class="avatar-sm align-self-center me-2">' +
                    '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                    '<i class="fas fa-' + FileTypes + '"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="overflow-hidden me-auto">' +
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].FILENAME + '</h5>' +
                    '<a href=' + URLFile + '/' + json[i].URL + ' target="_blank" class="text-body">' +
                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=deleteAttachmentReply(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'

                $('#Div_Reply_Attachment').append(resultReplyAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function deleteAttachmentReply(DeleteID, TrxEmailID) {
    if (DeleteID == '') {
        swal("Attachment is empty");
        return false
    }
    var form_data = JSON.stringify({
        TrxID: DeleteID, TrxUserName: $("#hd_sessionLogin").val()
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
                    url: "asmx/TrmMailSystem.asmx/DeleteAttachmentEmail",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        ReplyAttachmentReplyEmail()

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
//* Upload Attachment Reply *//


//* Upload Attachment Forward *//
$('#attachmentforward').change(function () {
    var filename = $('#attachmentforward').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='attachmentforward']", function (e) {
    $(".hiddenX").show();

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 10) {
            swal(
                '',
                'Please upload file less than 2 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        data.append("Emailid", $("#ContentPlaceHolder1_TrxGenerateEmailID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrmMailSystem.asmx/UploadFile",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());

            ForwardAttachment($("#ContentPlaceHolder1_TrxGenerateEmailID").val())

        });
        request.fail(function (response) {
            console.log(response.responseText);

        });
        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});
function ForwardAttachment(ForwardAttachmentID) {
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + ForwardAttachmentID + "', TrxEvent: 'ForwardAttachment', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultForwardAttachment = "";

            $('#Div_ForwardAttachment').empty();
            for (i = 0; i < json.length; i++) {

                var color = ""
                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                    color = "success"
                }
                ResultForwardAttachment = '<div class="card border shadow-none mb-2">' +
                    '<div class="p-2">' +
                    '<div class="d-flex">' +
                    '<div class="avatar-sm align-self-center me-2">' +
                    '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                    '<i class="fas fa-' + FileTypes + '"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="overflow-hidden me-auto">' +
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].FILENAME + '</h5>' +
                    '<a href=' + FileOutboxHTML + '/' + json[i].URL + ' target="_blank" class="text-body">' +
                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=deleteAttachmentForward(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#Div_ForwardAttachment').append(ResultForwardAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function PreviewAttachmentInboxEmail(TrxEmailID) {
    //$("#LoaderPageAttachment").hide();
    var FileInboxHTML = "" + IPSERVER + "/FileEmail/INBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + TrxEmailID + "', TrxEvent: 'PreviewAttachmentInboxEmail', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultPreviewInboxAttachment = "";

            $('#Div_Inbox_Forward_Attachment').empty();
            for (i = 0; i < json.length; i++) {

                var color = ""
                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                    color = "success"
                }
                ResultPreviewInboxAttachment = '<div class="card border shadow-none mb-2">' +
                    '<div class="p-2">' +
                    '<div class="d-flex">' +
                    '<div class="avatar-sm align-self-center me-2">' +
                    '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                    '<i class="fas fa-' + FileTypes + '"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="overflow-hidden me-auto">' +
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].FILENAME + '</h5>' +
                    '<a href=' + FileInboxHTML + '/' + json[i].URL + ' target="_blank" class="text-body">' +
                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=deleteAttachment(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#Div_Inbox_Forward_Attachment').append(ResultPreviewInboxAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //$("#LoaderPageAttachment").hide();
}
function deleteAttachmentForward(DeleteID) {
    if (DeleteID == '') {
        swal("Attachment is empty");
        return false
    }
    var form_data = JSON.stringify({
        TrxID: DeleteID, TrxUserName: $("#hd_sessionLogin").val()
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
                    url: "asmx/TrmMailSystem.asmx/DeleteAttachmentEmail",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        ForwardAttachment($("#ContentPlaceHolder1_TrxGenerateEmailID").val());

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
//* Upload Attachment Forward *//


//* Upload Attachment Draft *//
$('#filesdraft').change(function () {
    var filename = $('#filesdraft').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='filesdraft']", function (e) {
    $(".hiddenX").show();
    //var valnoWA = "628119970460";//$('#tglKejadian').val();

    //$("#LoaderPageCounting").show();
    if ($("#ComposeETO").val() == '') {
        swal("To is empty");
        //$("#LoaderPageCounting").hide();
        return false
    }

    if ($("#ComposeESUBJECT").val() == '') {
        swal("Subject is empty");
        //$("#LoaderPageCounting").hide();
        return false
    }

    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    if (TrxBodyCompose == '') {
        swal("Body is empty");
        //$("#LoaderPageCounting").hide();
        return false
    }

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 10) {
            swal(
                '',
                'Please upload file less than 2 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        data.append("Emailid", $("#ContentPlaceHolder1_TrxEmailID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrmMailSystem.asmx/UploadFile",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());

            ////var TrxMessage = 'Your file has been upload'
            ////AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
            PreviewAttachmentDraftEmail($("#ContentPlaceHolder1_TrxEmailID").val());

        });

        request.fail(function (response) {

            console.log(response.responseText);
            //alert(response.responseText);

        });

        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});
//* Upload Attachment Draft *//

function Filter() {
    $("#addContactModalFilterDate").modal('show');
}
function ActionFilterDate() {
    var TimeStartDate = $("#startdate").val();
    var TimeEndDate = $("#enddate").val();
    if (TimeStartDate != "") {
        if (TimeEndDate == "") {
            swal(
                '',
                'End Date is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        } else {
            if (TimeEndDate < TimeStartDate) {
                swal(
                    '',
                    'End date smaller than start date',
                    'info'
                ).then(function () {
                    return false;
                });
                $("#LoaderPage").hide();
                return false
            }
            // Untuk Checking Filtering Tanggal
            var jsonTextTanggal = JSON.stringify({ TrxID: "0", StartDate: TimeStartDate, EndDate: TimeEndDate, TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "CheckDay" });
            $.ajax({
                url: "asmx/TrmMailSystem.asmx/UIDESK_TrxFilterDate",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: jsonTextTanggal,
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, result = "";

                    for (i = 0; i < json.length; i++) {

                        if (json[i].ResultNya == "Failed") {
                            swal(
                                '',
                                'Date more than days',
                                'error'
                            ).then(function () {
                                return false;
                            });
                            return false;
                        } else {
                            var jsonText = JSON.stringify({ TrxID: "0", StartDate: TimeStartDate, EndDate: TimeEndDate, TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "INSERT" });
                            $.ajax({
                                url: "asmx/TrmMailSystem.asmx/UIDESK_TrxFilterDate",
                                method: "POST",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: jsonText,
                                success: function (data) {

                                    var json = JSON.parse(data.d);
                                    var j, result = "";

                                    for (j = 0; j < json.length; j++) {
                                        window.location = "Crm_Trx_MailSystem.aspx?";
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
    } else {
        swal(
            '',
            'Filter Date is empty',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    $("#addContactModalFilterDate").modal('hide');
}

function DataListLoginAgent() {
    var divLisAgent = $('#divLisAgent');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'6', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultAgentLogin = "";

            divLisAgent.empty();
            if (json.length == 0) {
                resultAgentLogin = '<a href="#"><span class="mdi mdi-circle-outline text-info me-2"></span>Agent Empty</a>';
                divLisAgent.append(resultAgentLogin);
            } else {
                for (i = 0; i < json.length; i++) {
                    if (json[i].LOGIN == "1") {
                        var ColorLogin = "success"
                    } else {
                        var ColorLogin = "danger"
                    }
                    resultAgentLogin = '<a href="#"><span class="mdi mdi-circle text-'+ ColorLogin +' me-2"></span>'+ json[i].NAME +'</a>' 
                    divLisAgent.append(resultAgentLogin);
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

function Reply_ActionButton() {
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal(
            '',
            'Email Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ReplyTo").val() == "") {
        swal(
            '',
            'To is Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ReplySubject = $("#ReplySubject").val()
    if (ReplySubject == "") {
        swal(
            '',
            'Subject is Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxBody = $("#Reply_BodyEmail").val();
    var maxlength = "7500"
    if (TrxBody.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBody == "") {
        swal(
            '',
            'Body is Empty',
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
                    TrxInboxEmailID: $("#ContentPlaceHolder1_TrxID").val(), TrxGenerateEmailID: $("#ContentPlaceHolder1_TrxGenerateEmailID").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxTO: $("#ReplyTo").val(), TrxSubject: $("#ReplySubject").val(),
                    TrxCC: $("#ReplyECC").val(), TrxBody: TrxBody, TrxDirection: "OUT", TrxLayerUser: $("#TrxLayerUser").val()
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailReply_New",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data Has Been Reply Success',
                                    'success'
                                ).then(function () {
                                    $("#ReplyTo").val("");
                                    $("#ReplySubject").val("");
                                    $("#ReplyECC").val("");
                                    $("#ContentPlaceHolder1_TrxEmailID").val("");
                                    $("#ContentPlaceHolder1_TrxID").val("");
                                    window.location = "Crm_Trx_MailSystem.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Reply Failed !',
                                    'error'
                                ).then(function () {
                                    $("#ReplyTo").val("");
                                    $("#ReplySubject").val("");
                                    $("#ReplyECC").val("");
                                    $("#ContentPlaceHolder1_TrxEmailID").val("");
                                    $("#ContentPlaceHolder1_TrxID").val("");
                                    window.location = "Crm_Trx_MailSystem.aspx?";
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

            } else {
                $("#ReplyTo").val("");
                $("#ReplySubject").val("");
                $("#ReplyECC").val("");
                $("#ContentPlaceHolder1_TrxEmailID").val("");
            }
        });
}
function Forward_ActionButton() {
    if ($("#ForwardComboFrom").text() == "") {
        swal(
            '',
            'From is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ForwardTo").val() == "") {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ForwardSubject = $("#ForwardSubject").val()
    if (ForwardSubject == "") {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxBody = $("#Forward_BodyEmail").val();
    var maxlength = "7500"
    if (TrxBody.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBody == "") {
        swal(
            '',
            'Body is empty',
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
                    TrxInboxEmailID: $("#ContentPlaceHolder1_TrxID").val(), TrxGenerateEmailID: $("#ContentPlaceHolder1_TrxGenerateEmailID").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxEmailFrom: $("#ContentPlaceHolder1_HdForward_From").val(), TrxTO: $("#ForwardTo").val(), TrxSubject: $("#ForwardSubject").val(),
                    TrxCC: $("#ForwardECC").val(), TrxBody: TrxBody, TrxDirection: "OUT", TrxLayerUser: $("#TrxLayerUser").val()
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailForward",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data Has Been Forward',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trx_MailSystem.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Forward Failed !',
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

            } else {
                $("#ForwardTo").val("");
                $("#ForwardSubject").val("");
                $("#ForwardECC").val("");
            }
        });
}
function ActionTicket(RefID) {
    $("#addContactModalTicket").modal('show');
}