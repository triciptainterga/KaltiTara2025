$(document).ready(function () {
   

    

    Dropdown_Status();
    Dropdown_Priority();
    Dropdown_Action();
  //  Dropdown_Template();
    DropdownCustomerType();
    DropdownPerusahaanType();
    Div_Disable();
    Dropdown_Category();
    Summary_EmailCounting();
    Table_InboxEmail();
    DataListLoginAgent();
    DataListLoginTeamLeader();
    Dropdown_Channel();
    MarkasEmail();
    $("#Form_Ticket_Agent_Name").val($("#hd_NameKaryawan").val())
    $('#Form_Ticket_Agent_Name').attr("disabled", true);
    $('#Form_Ticket_Status').attr("disabled", true);
    $("#Form_Ticket_Kantor").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            $("#Div_KantorSearching").show()
            Searching_Kantor($(this).val());
        } else if (jumlahString == 0) {
            $("#Div_KantorSearching").hide()
        }
    });
    $("#AddCustomer_NamaPerusahaan").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            $("#Div_CustomerSearching").show()
            Searching_Perusahaan($(this).val());
        } else if (jumlahString == 0) {
            $("#FormAddPerusahaan").show()
            $("#FormListPIC").hide()
            $("#Div_CustomerSearching").hide()
        }
    });

    $("#AddCustomer_Name").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            $("#Div_CustomerSearchingPIC").show()
            SearchingNamaCustomer($(this).val());
        } else if (jumlahString == 0) {
            $("#Div_CustomerSearchingPIC").hide()
        }
    });

    $('#Form_Ticket_NilaiTransaksi').on('keyup', function () {
        var value = $(this).val();
        $(this).val(Onchange_FormatRupiah(value, 'Rp '));
    });
    //$('#Form_Ticket_NoAju').on('blur', function () {
    //    var value = $(this).val();
    //    if (value.length === 26) {
    //        $("#errorNoAjo").empty();
    //    } else {
    //        $("#errorNoAjo").empty();
    //        $("#errorNoAjo").append(" * Format No. Aju harus 26 Digit")
    //    }
    //});
    if ($("#HD_SiteID").val() == "1") {
        $("#DivAction").show();
    } else {
        $("#DivAction").hide();
        $("#ObjectEmail").hide();
        $("#FolderDraft").hide();
        $("#FolderSendTeamLeader").hide();
        $("#FolderCase").hide();
    }
});
function Click_ReadingEmail(IvcID, EmailID, EFROM) {
    Clear_Object_Ticket();
    $("#ContentPlaceHolder1_TrxID").val(IvcID);
    $("#ContentPlaceHolder1_TrxEmailID").val(EmailID);
    $("#ContentPlaceHolder1_TrxEmailAccount").val(EFROM);

    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxLayerUser: $("#TrxLayerUser").val() });
    $.ajax({
        url: "asmx/TrmMailSystem.asmx/UpdateReadingEmail",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function () {

        }
    });

    function makeAjaxCall(url, data, successCallback) {
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successCallback,
            error: function (xhr, status, error) {
                console.error(xhr.responseText, status, error);
            }
        });
    }

    makeAjaxCall("asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo", {
        TrxID: IvcID,
        TrxUserName: $("#hd_sessionLogin").val(),
        TrxAction: 'UIDESK193'
    }, function (response) {
        var json = JSON.parse(response.d);

        if (json.some(item => item.Jumlah > 1)) {
            $("#DivTableIncomingEmail").hide();
            $("#DivBodyEmailDuplicate").show();
            $("#Profile_EmailCustomer").text(EFROM);
            $("#AddCustomer_Email").val(EFROM).attr("disabled", true);
            Customer_Check(EFROM);
            Preview_InboxEmail(EmailID);
            TableDuplicateIncomingEmail(IvcID);
        } else {
            $("#DivBodyEmailDuplicate").hide();

            makeAjaxCall("WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo", {
                TrxID: IvcID,
                TrxUserName: $("#hd_sessionLogin").val(),
                TrxAction: 'UIDESK177'
            }, function (response) {
                var json = JSON.parse(response.d);

                if (json.length > 0) {
                    json.forEach(function (item) {
                        if (item.Status === "Closed") {
                            $("#DivTableIncomingEmail").hide();
                            Click_ReadingTicket(IvcID, EmailID, item.TicketNumber);
                            $("#ButtonProsesUpdateEmail").hide();
                        } else {
                            $("#DivTableIncomingEmail").hide();
                            Click_ReadingTicket(IvcID, EmailID, item.TicketNumber);
                            $("#ButtonProsesUpdateEmail").show();
                        }
                    });
                } else {
                    $("#Profile_EmailCustomer").text(EFROM);
                    $("#AddCustomer_Email").val(EFROM).attr("disabled", true);
                    Customer_Check(EFROM);
                    Preview_InboxEmail(EmailID);
                }
            });
        }
    });
    Table_InboxEmail();
}
function Click_ReadingTicket(IvcID, EmailID, TicketNumber) {
    $("#ContentPlaceHolder1_TrxID").val(IvcID)
    $("#ContentPlaceHolder1_TrxTicketNumber").val(TicketNumber)
    //alert($("#ContentPlaceHolder1_TrxTicketNumber").val())
    //alert(TicketNumber)
    if (TicketNumber === "null" || TicketNumber == null) {
        $("#DivObjectCompose").hide();
        $("#DivObjectTicket").hide();
        $("#DivTableOutgoingSendingEmail").hide()
        $("#DivFilterDate").hide()
        Preview_OutboxEmail(EmailID)
        Preview_OutboxEmailDetail("1", EmailID);
        $("#ButtonProsesCompose").hide()
        $("#ComposeETO").hide()
        $("#ComposeESUBJECT").hide()
        $("#ComposeECC").hide()
        $("#cke_Compose_Body").hide();
        $("input[name='composefiles']").hide();
        $("#Preview_FrameHTML3").show();
    } else {
        //alert("1")
        $("#DivTableOutgoingEmail").hide()
        $("#DivTableOutgoingSendingEmail").hide()
        $("#DivObjectTicket").show();
        Preview_InboxEmail(EmailID)
        Ticket_Detail();
        Preview_AttachmentTicketExisting();
        $("#DivJourneyReject").show();
        Email_JourneyEskalasi();
        DisableObjectTicket();
    }
}
function Click_ReadingArchieve(IvcID, EmailID, EFROM) {
    //Customer_Check(EFROM);
    $("#ContentPlaceHolder1_TrxID").val(IvcID);
    $("#ContentPlaceHolder1_TrxEmailID").val(EmailID);
    $("#ContentPlaceHolder1_TrxEmailAccount").val(EFROM);
    var form_data = JSON.stringify({ filterData: EFROM });
    $.ajax({
        url: "asmx/ServiceCustomer.asmx/ValidasiDataCustomer",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "PopupKK") {
                    $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].TrxCustomerID)
                    Customer_Load($("#ContentPlaceHolder1_TrxCustomerID").val())
                    $("#DivTableIncomingEmail").hide();
                    $("#DivTableOutgoingEmail").hide();
                    $("#DivBodyEmail").show();
                } else {
                    $("#Profile_NamaCustomer").append("-")
                    $("#DivObjectCustomer").hide();
                    $("#DivTableIncomingEmail").hide();
                    $("#DivTableOutgoingEmail").hide();
                    $("#DivBodyEmail").show();
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
    Preview_InboxEmail(EmailID);
    $("#Profile_EmailCustomer").text(EFROM);
    $("#AddCustomer_Email").val(EFROM).attr("disabled", true);
    $("#DivHeader").hide();
    $("#ButtonReply").hide();
    $("#ButtonForward").hide();
}
function setActive(element) {
    // Menghapus kelas 'active' dari semua tautan
    const links = document.querySelectorAll('.mail-list a');
    links.forEach(link => {
        link.classList.remove('active');
    });

    // Menambahkan kelas 'active' pada elemen yang diklik
    element.classList.add('active');
}
function OnclickInbox() {
    Clear_Object_Perusahaan();
    Clear_Object_Customer();
    Clear_Object_Ticket();
    Div_Disable();
    $("#DivTableIncomingEmail").show();
    $("#DivTableOutgoingEmail").hide();
    $("#DivTableOutgoingSendingEmail").hide();
    Table_InboxEmail();
    setActive(document.getElementById('InboxClass'));
    $("#DivFilterDate").hide();
}
function OnclickDraft() {
    Clear_Object_Perusahaan();
    Clear_Object_Customer();
    Clear_Object_Ticket();
    Div_Disable();
    $("#DivTableIncomingEmail").hide();
    $("#DivTableOutgoingEmail").show();
    $("#DivTableOutgoingSendingEmail").hide();
    Table_DraftEmail();
    setActive(document.getElementById('FolderDraft'));
    $("#DivFilterDate").hide();
}
function OnclickSendMail() {
    Clear_Object_Perusahaan();
    Clear_Object_Customer();
    Clear_Object_Ticket();
    Div_Disable();
    $("#DivTableIncomingEmail").hide();
    $("#DivTableOutgoingEmail").hide();
    $("#DivTableOutgoingSendingEmail").show();
    Table_SendEmail();
    $("#ButtonProsesSaveTemplate").hide();
    $("#ButtonProsesInsertTemplate").hide();
    $("#ButtonProsesUpdateEmail").hide();
    $("#ButtonProsesSubmitEmail").hide();
    $("#ButtonProsesForwardEmail").hide();
    $("#ButtonProsesForwardEmailTeamLeader").hide();
    $("#ButtonProsesFollowupTicket").hide();
    setActive(document.getElementById('FolderSendEmail'));
    $("#DivFilterDate").show();
    $("#FilterDateEmailArchieve").hide();
    $("#FilterDateEmailSendingEmail").show();
}
function OnclickSendLeader() {
    Clear_Object_Perusahaan();
    Clear_Object_Customer();
    Clear_Object_Ticket();
    Div_Disable();
    $("#DivTableIncomingEmail").hide();
    $("#DivTableOutgoingEmail").hide();
    $("#DivTableOutgoingSendingEmail").show();
    Table_SendTeamLeader();
    setActive(document.getElementById('FolderSendTeamLeader'));
    $("#DivFilterDate").hide();
}
function OnclickCase() {
    Clear_Object_Perusahaan();
    Clear_Object_Customer();
    Clear_Object_Ticket();
    Div_Disable();
    $("#DivTableIncomingEmail").hide();
    $("#DivTableOutgoingEmail").show();
    Table_CaseEmail();
    $("#ButtonProsesSaveTemplate").hide();
    $("#ButtonProsesInsertTemplate").hide();
    $("#ButtonProsesUpdateEmail").hide();
    $("#ButtonProsesSubmitEmail").hide();
    $("#ButtonProsesForwardEmail").hide();
    $("#ButtonProsesForwardEmailTeamLeader").hide();
    $("#ButtonProsesFollowupTicket").hide();
    setActive(document.getElementById('FolderCase'));
    $("#DivFilterDate").hide();
}
function OnclickArchieve() {
    Clear_Object_Perusahaan();
    Clear_Object_Customer();
    Clear_Object_Ticket();
    Div_Disable();
    $("#DivTableIncomingEmail").show();
    $("#DivTableOutgoingEmail").hide();
    Table_ArchiveEmail();
    setActive(document.getElementById('FolderArchieve'));
    $("#DivFilterDate").show();
    $("#FilterDateEmailArchieve").show();
    $("#FilterDateEmailSendingEmail").hide();
}
function Summary_EmailCounting() {
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLevelUser = $("#TrxLayerUser").val();
    var result = "";
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
            $("#SentMailCount").empty();
            $("#SentLeaderCount").empty();
            $("#CaseCount").empty();
            $("#ArchieveCount").empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].Folder == "Inbox") {
                    $("#InboxCount").append(json[i].Jumlah);
                } else if (json[i].Folder == "Draft") {
                    $("#DraftCount").append(json[i].Jumlah);
                } else if (json[i].Folder == "Sent") {
                    $("#SentMailCount").append(json[i].Jumlah);
                } else if (json[i].Folder == "Leader") {
                    $("#SentLeaderCount").append(json[i].Jumlah);
                } else if (json[i].Folder == "Case") {
                    $("#CaseCount").append(json[i].Jumlah);
                } else if (json[i].Folder == "Archieve") {
                    $("#ArchieveCount").append(json[i].Jumlah);
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
function Table_InboxEmail() {
    var myTable = $('#TableIncomingEmail').DataTable(
        {
            "order": [[3, "desc"]] // Order by the fourth column (Email_Date) in descending order
        }
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'InboxTable', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            myTable.clear().draw();

            for (var i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var dateObj = new Date(milisegundos);
                var hours = dateObj.getHours().toString().padStart(2, '0');
                var minutes = dateObj.getMinutes().toString().padStart(2, '0');
                var seconds = dateObj.getSeconds().toString().padStart(2, '0');
                var newTime = `${hours}: ${minutes}: ${seconds}`;

                var ResponseStatus = "<span class='badge rounded-pill badge-soft-danger font-size-12'>Not Response</span>";
                if (json[i].FLAG_HANDLING == "1") {
                    ResponseStatus = (json[i].Status == "Pending" || json[i].Status == "Closed")
                        ? "<span class='badge rounded-pill badge-soft-success font-size-12'>Done</span>"
                        : "<span class='badge rounded-pill badge-soft-warning font-size-12'>On Progress</span>";
                }

                var EFROM, subject, DateRead;
                if (json[i].Reading == 0 || json[i].Reading == null) {
                    ResponseStatus = "<span class='badge rounded-pill badge-soft-danger font-size-12'>Un Read</span>";
                    EFROM = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].EFROM.substring(0, 40) + "..</b></a>";
                    subject = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].ESUBJECT.substring(0, 25) + "..</b></a>";
                    DateRead = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + newDate + ' ' + newTime + "</b></a>";
                } else {
                    ResponseStatus = "<span class='badge rounded-pill badge-soft-primary font-size-12'>Read</span>";
                    EFROM = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].EFROM.substring(0, 40) + "..</a>";
                    subject = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>";
                    DateRead = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + newDate + ' ' + newTime + "</a>";
                }
                myTable.row.add([EFROM, subject, ResponseStatus, DateRead, DateRead]).draw(false);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
//function Table_InboxEmail() {
//    var myTable = $('#TableIncomingEmail').DataTable(
//        {
//            "order": [[3, "desc"]]
//        },
//    );
//    $.fn.dataTable.ext.errMode = 'none';
//    $.ajax({
//        type: "POST",
//        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
//        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'InboxTable', TrxAction: 'UIDESK100'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {

//            var json = JSON.parse(data.d);
//            var i, x, result = "";

//            myTable.clear().draw();
//            for (i = 0; i < json.length; i++) {


//                var d = new Date(json[i].Email_Date);
//                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
//                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
//                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

//                if (json[i].FLAG_HANDLING == "1") {
//                    if (json[i].Status == "Pending" || json[i].Status == "Closed") {
//                        var ResponseStatus = "<span class='badge rounded-pill badge-soft-success font-size-12'>Done</span>"
//                    } else {
//                        var ResponseStatus = "<span class='badge rounded-pill badge-soft-warning font-size-12'>On Progress</span>"
//                    }
//                } else {
//                    var ResponseStatus = "<span class='badge rounded-pill badge-soft-danger font-size-12'>Not Response</span>"
//                }
//                if (json[i].Reading == 0 || json[i].Reading == null) {
//                    var ResponseStatus = "<span class='badge rounded-pill badge-soft-danger font-size-12'>Un Read</span>"
//                    var EFROM = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].EFROM.substring(0, 40) + "..</b></a>"
//                    var subject = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].ESUBJECT.substring(0, 25) + "..</b></a>"
//                    var DateRead = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + newDate + ' ' + newTime + "</b></a>"
//                } else {
//                    var ResponseStatus = "<span class='badge rounded-pill badge-soft-primary font-size-12'>Read</span>"
//                    var EFROM = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].EFROM.substring(0, 40) + "..</a>"
//                    var subject = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
//                    var DateRead = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + newDate + ' ' + newTime + "</a>"
//                }
//                myTable.row.add([EFROM, subject, ResponseStatus, DateRead, DateRead]).draw(false);

//            }
//        },
//        error: function (xmlHttpRequest, textStatus, errorThrown) {
//            console.log(xmlHttpRequest.responseText);
//            console.log(textStatus);
//            console.log(errorThrown);
//        }
//    })
//}
function Table_DraftEmail() {
    var myTable = $('#TableOutgoingEmail').DataTable(
        {
            "order": [[3, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
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

                var d = new Date(json[i].DateModified);
                var milisegundos = parseInt(json[i].DateModified.replace("/Date(", "").replace(")/", ""));
                var DateX = new Date(milisegundos).toLocaleDateString("en-UE");
                var DateY = new Date(milisegundos).toLocaleTimeString("en-UE");

                //if (json[i].FLAG_HANDLING == "Y") {
                //    var ResponseStatus = "<span class='badge rounded-pill badge-soft-primary font-size-12'>Response</span>"
                //} else {
                //    var ResponseStatus = "<span class='badge rounded-pill badge-soft-danger font-size-12'>Not Response</span>"
                //}
                //if (json[i].Reading == 0 || json[i].Reading == null) {
                //    var EFROM = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].ETO + "')><b>" + json[i].ETO.substring(0, 40) + "..</b></a>"
                //    var subject = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].ETO + "')><b>" + json[i].ESUBJECT.substring(0, 25) + "..</b></a>"
                //    var DateRead = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].ETO + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                //} else {
                //    var EFROM = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].ETO + "')>" + json[i].ETO.substring(0, 40) + "..</a>"
                //    var subject = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].ETO + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                //    var DateRead = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].ETO + "')>" + newDate + ' ' + newTime + "</a>"
                //}
                if (json[i].HANDLED == 0) {
                    var EFROM = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + json[i].ETO.substring(0, 40) + "..</b></a>"
                    var subject = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + json[i].ESUBJECT.substring(0, 20) + "..</b></a>"
                    var DateRead = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                    var DateResponse = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + DateX + ' ' + DateY + "</b></a>"
                } else {
                    var EFROM = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ETO.substring(0, 40) + "..</a>"
                    var subject = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                    var DateRead = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + newDate + ' ' + newTime + "</a>"
                    var DateResponse = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + DateX + ' ' + DateY + "</a>"
                }
                myTable.row.add([EFROM, subject, DateRead, DateResponse]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Table_SendTeamLeader() {
    var myTable = $('#TableOutgoingSendingEmail').DataTable();
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'SendToTeamLeader', TrxAction: 'UIDESK100'}",
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

                //if (json[i].Reading == 0 || json[i].Reading == null) {
                //    var EFROM = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + json[i].ETO.substring(0, 40) + "..</b></a>"
                //    var subject = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + json[i].ESUBJECT + "..</b></a>"
                //    var DateRead = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                //} else {
                //    var EFROM = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ETO.substring(0, 40) + "..</a>"
                //    var subject = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                //    var DateRead = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + newDate + ' ' + newTime + "</a>"
                //}
                var EFROM = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ETO.substring(0, 40) + "..</a>"
                var subject = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                var DateRead = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + newDate + ' ' + newTime + "</a>"
                myTable.row.add([EFROM, subject, json[i].PICTujuanNya, DateRead]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Table_SendEmail() {
    var myTable = $('#TableOutgoingSendingEmail').DataTable(
        {
            "order": [[2, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'SendingEmailAgent', TrxAction: 'UIDESK100'}",
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

                //if (json[i].Reading == 0 || json[i].Reading == null) {
                //    var EFROM = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ETO.substring(0, 40) + "</a>"
                //    var subject = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ESUBJECT + "</a>"
                //    var DateRead = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + newDate + ' ' + newTime + "</a>"
                //} else {
                //    var EFROM = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ETO.substring(0, 40) + "..</a>"
                //    var subject = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                //    var DateRead = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + newDate + ' ' + newTime + "</a>"
                //}
                if ($("#HD_SiteID").val() == "1") {
                    var TujuanNya = json[i].PICTujuanNya;
                } else {
                    var TujuanNya = json[i].AgentNya;
                }
                var EFROM = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ETO.substring(0, 40) + "</a>"
                var subject = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ESUBJECT + "</a>"
                var DateRead = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + newDate + ' ' + newTime + "</a>"
                myTable.row.add([EFROM, subject, TujuanNya, DateRead]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Table_ArchiveEmail() {
    var myTable = $('#TableIncomingEmail').DataTable(
        {
            "order": [[3, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
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

                if (json[i].Reading == 0 || json[i].Reading == null) {
                    var EFROM = "<a href='#'  onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].EFROM.substring(0, 40) + "..</b></a>"
                    var subject = "<a href='#'  onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].ESUBJECT.substring(0, 25) + "..</b></a>"
                    var DateRead = "<a href='#'  onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                } else {
                    var EFROM = "<a href='#' onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].EFROM.substring(0, 40) + "..</a>"
                    var subject = "<a href='#' onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                    var DateRead = "<a href='#' onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + newDate + ' ' + newTime + "</a>"
                }
                myTable.row.add([EFROM, subject, "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].DIRECTION + "</span>", DateRead]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Table_CaseEmail() {
    var myTable = $('#TableOutgoingEmail').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'CaseDynamic', TrxAction: 'UIDESK100'}",
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

                //if (json[i].Reading == 0 || json[i].Reading == null) {
                //    var EFROM = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + json[i].ETO.substring(0, 40) + "..</b></a>"
                //    var subject = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + json[i].ESUBJECT + "..</b></a>"
                //    var DateRead = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                //} else {
                //    var EFROM = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ETO.substring(0, 40) + "..</a>"
                //    var subject = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                //    var DateRead = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + newDate + ' ' + newTime + "</a>"
                //}
                var EFROM = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ETO.substring(0, 40) + "..</a>"
                var subject = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                var DateRead = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + newDate + ' ' + newTime + "</a>"
                myTable.row.add([EFROM, subject, json[i].Status, DateRead]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Customer_Check(ChannelAccount) {
    if (ChannelAccount == null || ChannelAccount == "") {
    } else {
        var form_data = JSON.stringify({ filterData: ChannelAccount });
        $.ajax({
            url: "asmx/ServiceCustomer.asmx/ValidasiDataCustomer",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: form_data,
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x = "";

                for (i = 0; i < json.length; i++) {

                    if (json[i].Result == "PopupKK") {
                        $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].TrxCustomerID)
                        Customer_Load($("#ContentPlaceHolder1_TrxCustomerID").val())
                        $("#DivHeader").show();
                        $("#DivTableIncomingEmail").hide();
                        $("#DivTableOutgoingEmail").hide();
                        $("#DivBodyEmail").show();
                    } else {
                        $("#Profile_NamaCustomer").empty();
                        $("#ContentPlaceHolder1_TrxCustomerID").val("");
                        $("#Profile_NamaCustomer").append("-")
                        $("#DivObjectCustomer").show();
                        $("#DivHeader").show();
                        $("#DivTableIncomingEmail").hide();
                        $("#DivTableOutgoingEmail").hide();
                        $("#DivBodyEmail").show();
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
}
function Customer_Load(CustomerID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + CustomerID + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK330'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCustomer = "";

            for (i = 0; i < json.length; i++) {
                $("#ContentPlaceHolder1_CustomerID").val(json[i].CustomerID)
                $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].CustomerID)
                $("#ContentPlaceHolder1_TrxEmailAccount").val(json[i].Email)
                $("#ContentPlaceHolder1_DynamicEmailAccountID").val(json[i].CIF)
                $("#ContentPlaceHolder1_DynamicEmailContactID").val(json[i].ContactDynamicID)
                $("#Profile_NamaCustomer").empty()
                $("#Profile_NamaCustomer").append(json[i].Name)
                $("#btnReply").show()
                $("#btnForward").show()
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Customer_Close() {
    $("#DivObjectCustomer").hide();
}
function Preview_InboxEmail(PreviewID) {
    $("#footerButtonAction").show()
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

                    //document.getElementById("EmailPertanyaan").src = "" + FileInboxHTML + "/" + PreviewID + "/file.html"
                    document.getElementById("Preview_FrameHTML1").src = "" + FileInboxHTML + "/" + PreviewID + "/file.html"
                    document.getElementById("Preview_FrameHTML2").src = "" + FileInboxHTML + "/" + PreviewID + "/file.html"
                    Preview_InboxEmailAttachment(PreviewID)

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
function Preview_InboxEmailDetail(Type, PreviewID) {
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

                $("#Form_Ticket_Subject").val(json[i].ESUBJECT)
                $("#ContentPlaceHolder1_TrxEmailID").val(json[i].EMAIL_ID);
                $("#Form_Ticket_Email_CC").val(json[i].ECC)
                if (Type == "1") {
                    $("#Form_Ticket_Email_Tujuan").val(json[i].EFROM)
                    $("#Form_Ticket_Email_Subject").val("RE: " + json[i].ESUBJECT)
                } else {
                    $("#Form_Ticket_Email_Tujuan").val("")
                    $("#Form_Ticket_Email_Subject").val("FWD: " + json[i].ESUBJECT)
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
function Preview_InboxEmailAttachment(TrxEmailID) {
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

            $('#Div_Inbox_AttachmentEmail').empty();
            $('#Div_Inbox_AttachmentEmailReply').empty();
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
                    color = "danger"
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "file";
                    color = "success"
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "file";
                    color = "success"
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "file";
                    color = "secondary"
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "file";
                    color = "secondary"
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "file";
                    color = "secondary"
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                    color = "warning"
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
                    '<a href=' + URLFile + '/' + json[i].URL + ' target="_blank" class="fw-semibold font-size-13 text-reset">Download <i class="bx bxs-download align-middle"></i></a>' +
                    //'<p class="text-muted text-truncate mb-0">Download</p>' +
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
                $('#Div_Inbox_AttachmentEmail').append(resultInboxAttachment)
                $('#Div_Inbox_AttachmentEmailReply').append(resultInboxAttachment)
                //$('#Div_Inbox_AttachmentEmailReply').append(resultInboxAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Searching_Kantor(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    var ResultKantorSearching = "";
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK173'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_KantorSearching').empty();
            var closeButton = '</br><a href="#" class="btn btn-soft-danger btn-sm" onclick="closeDivKantor()">Close</a><a href="Crm_Trm_Kantor.aspx?" class="btn btn-soft-success btn-sm float-end">More</a>';
            $('#Div_KantorSearching').append(closeButton);
            if (json.length > 0) {
                for (i = 0; i < json.length; i++) {

                    ResultKantorSearching = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="Kantor_Selected(' + json[i].ID + ')">' +
                        '<li class="active">' +
                        '<a href="#">' +
                        '<div class="d-flex align-items-start">' +
                        '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                        '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].NamaKantor.substr(0, 1).toUpperCase() + '</span></div>' +
                        '</div>' +
                        '<div class="flex-grow-1 overflow-hidden">' +
                        '<h5 class="text-truncate font-size-14 mb-1">' + json[i].NamaKantor + '</h5>' +
                        '<p class="text-truncate mb-0">' + json[i].Alamat + '</p>' +
                        //'<p class="text-truncate mb-0">' + json[i].Email + '</p>' +
                        '</div>' +
                        '<div class="flex-shrink-0">' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</li>'
                    $('#Div_KantorSearching').append(ResultKantorSearching)

                }
            } else {
                ResultKantorSearching = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="dataKantorNotFound()">' +
                    '<li class="active">' +
                    '<a href="#">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">X</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="text-truncate font-size-14 mb-1" style="margin-top:7px;">Data Kantor Not Found</h5>' +
                    '<p class="text-truncate mb-0"></p>' +
                    //'<p class="text-truncate mb-0">' + json[i].Email + '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0">' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
                $('#Div_KantorSearching').append(ResultKantorSearching)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Searching_Perusahaan(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    var ResultCustomerSearching = "";
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#AddCustomer_Type").val() + "', TrxAction: 'UIDESK170'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_CustomerSearching').empty();
            var closeButton = '</br><a href="#" class="btn btn-soft-danger btn-sm" onclick="closeDiv()" style="margin-top:-25px;">Close</a>';
            $('#Div_CustomerSearching').append(closeButton);
            if (json.length > 0) {
                for (i = 0; i < json.length; i++) {

                    if (json[i].NPWP == null) {
                        var NpwpNya = "-"
                    } else {
                        var NpwpNya = json[i].NPWP
                    }
                    if (json[i].Email == null) {
                        var EmailNya = "-"
                    } else {
                        var EmailNya = json[i].Email
                    }
                    if (json[i].NomorTelepon == null) {
                        var NomorTelepon = "-"
                    } else {
                        var NomorTelepon = json[i].NomorTelepon
                    }
                    ResultCustomerSearching = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="Perusahaan_Selected(' + json[i].ID + ')">' +
                        '<li class="active">' +
                        '<a href="#">' +
                        '<div class="d-flex align-items-start">' +
                        '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                        '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].Nama_Perusahaan.substr(0, 1).toUpperCase() + '</span></div>' +
                        '</div>' +
                        '<div class="flex-grow-1 overflow-hidden">' +
                        '<h5 class="text-truncate font-size-14 mb-1">' + json[i].Nama_Perusahaan + '</h5>' +
                        '<p class="text-truncate mb-0">' + NpwpNya + '</p>' +
                        '<p class="text-truncate mb-0">' + EmailNya + '</p>' +
                        '<p class="text-truncate mb-0">' + NomorTelepon + '</p>' +
                        '</div>' +
                        '<div class="flex-shrink-0">' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</li>'
                    $('#Div_CustomerSearching').append(ResultCustomerSearching)
                }
            } else {
                ResultCustomerSearching = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="dataPerusahaanNotFound()">' +
                    '<li class="active">' +
                    '<a href="#">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">X</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="text-truncate font-size-14 mb-1" style="margin-top:7px;">Data Perusahaan Not Found</h5>' +
                    //'<p class="text-truncate mb-0">' + json[i].NomorTelepon + '</p>' +
                    //'<p class="text-truncate mb-0">' + json[i].Email + '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0">' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
                $('#Div_CustomerSearching').append(ResultCustomerSearching)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Dropdown_Template() {
    // Hapus select2 jika sudah ada
    if ($.fn.select2 && $('#ComboTemplateName').hasClass("select2-hidden-accessible")) {
        $('#ComboTemplateName').select2('destroy');
    }

    // Inisialisasi Select2
    $('#ComboTemplateName').select2({
        placeholder: 'Select template...',
        width: '100%',
        dropdownParent: $('#FormTemplate'), // penting agar dropdown tampil di atas modal
        allowClear: true,
        ajax: {
            url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            delay: 250,
            data: function (params) {
                // Tentukan TrxAction berdasarkan apakah ada params.term atau tidak
                var trxAction = params.term ? 'UIDESK182A' : 'UIDESK182';

                return JSON.stringify({
                    TrxID: params.term ||'0',
                    TrxUserName: $("#hd_sessionLogin").val(),
                    TrxAction: trxAction, // Pilih action yang sesuai
                    Search: params.term || "0" // Kirim keyword pencarian
                });
            },
            processResults: function (data) {
                var json = JSON.parse(data.d);
                return {
                    results: $.map(json, function (item) {
                        return {
                            id: item.ID,
                            text: item.FORMAT
                        };
                    })
                };
            },
            cache: true
        }
    });

    // Event ketika dipilih
    $('#ComboTemplateName').on('select2:select', function (e) {
        var data = e.params.data;
        $('#HiddenTemplateID').val(data.id); // optional jika ingin menyimpan ID
        ChangeTemplateResponse(data.id);     // fungsi untuk load deskripsi CKEditor
    });
}

// Fungsi ini bisa kamu modifikasi untuk memicu perubahan seperti sebelumnya (ChangeTemplateResponse)
function filterTemplates(selectedValue) {
    // Misal: panggil fungsi seperti sebelumnya dengan ID, atau ubah logic-nya
    console.log("Selected:", selectedValue);
    ChangeTemplateResponse('1'); // atau sesuaikan logika ini
}


function Dropdown_Status() {
    var cmbDataSourceStatus = $('#Form_Ticket_Status');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK307'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceStatus = "";

            var StatusNya
            for (i = 0; i < json.length; i++) {

                resultSourceStatus = '<option value="' + json[i].lblStatus + '" selected>' + json[i].lblStatus + '</option>';
                cmbDataSourceStatus.append(resultSourceStatus);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Dropdown_Priority() {
    var cmbDataSourcePriority = $('#Form_Ticket_Priority');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK340'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourcePriority = "";

            for (i = 0; i < json.length; i++) {

                resultSourcePriority = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
                cmbDataSourcePriority.append(resultSourcePriority);

                var selectedValue = "Medium"; // Example value you want to set as selected
                cmbDataSourcePriority.val(selectedValue);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Dropdown_Action() {
    var cmbDataSourceAction = $('#Form_Ticket_Action');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK341'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceAction = "";

            for (i = 0; i < json.length; i++) {

                resultSourceAction = '<option value="' + json[i].ID + '">' + json[i].NameAction + '</option>';
                cmbDataSourceAction.append(resultSourceAction);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Dropdown_TypePerusahaan(val) {
    var selectedText = $("#AddCustomer_Type").find("option:selected").text();
    var selectedValue = $("#AddCustomer_Type").val();
    if (selectedValue == "1") {
        $("#AddCustomer_NamaPerusahaan").val("")
        $('#AddCustomer_NamaPerusahaan').attr("disabled", false);
        $('#AddCustomer_NPWP').attr("disabled", false);
    } else if (selectedValue == "2") {
        $("#AddCustomer_NamaPerusahaan").val("")
        $("#AddCustomer_NPWP").val("")
        $('#AddCustomer_NamaPerusahaan').attr("disabled", true);
        $('#AddCustomer_NPWP').attr("disabled", false);
    } else {
        $('#AddCustomer_NamaPerusahaan').attr("disabled", false);
        $('#AddCustomer_NPWP').attr("disabled", false);
    }
}
function Dropdown_Category() {
    var cmbDataSourceKategori = $('#Form_Ticket_Kategori');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK306'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceKategori = "";

            cmbDataSourceKategori.empty();
            cmbDataSourceKategori.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultSourceKategori = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbDataSourceKategori.append(resultSourceKategori);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Dropdown_SubCategory(value) {
    var selectedText = $("#Form_Ticket_Kategori").find("option:selected").text();
    var selectedValue = $("#Form_Ticket_Kategori").val();
    var cmbDataSourceSubKategori = $('#Form_Ticket_SubKategori');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK308'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSubKategori = "";

            cmbDataSourceSubKategori.empty();
            cmbDataSourceSubKategori.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultSubKategori = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                cmbDataSourceSubKategori.append(resultSubKategori);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Dropdown_Channel() {
    var ComboChannel = $('#AddComboChannel');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0001', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK32'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultChannelCombo = "";

            for (i = 0; i < json.length; i++) {

                ResultChannelCombo = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
                ComboChannel.append(ResultChannelCombo);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdownCustomerType() {
    var cmbDataSourceCustomerType = $('#AddCustomer_Type');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK180'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultCustomerType = "";

            var StatusNya
            for (i = 0; i < json.length; i++) {

                resultCustomerType = '<option value="' + json[i].ID + '">' + json[i].Type + '</option>';
                cmbDataSourceCustomerType.append(resultCustomerType);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdownPerusahaanType() {
    var cmbDataSourcePerusahaanType = $('#AddPerusahaan_Type');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK203'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultPerusahaanType = "";

            var StatusNya
            for (i = 0; i < json.length; i++) {

                resultPerusahaanType = '<option value="' + json[i].ID + '" selected>' + json[i].Type + '</option>';
                cmbDataSourcePerusahaanType.append(resultPerusahaanType);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Dropdown_ChangeAction(val) {
    var selectedText = $("#Form_Ticket_Action").find("option:selected").text();
    var selectedValue = $("#Form_Ticket_Action").val();
    if (selectedValue == "1") {
        $("#ObjectEmail").show();
    } else if (selectedValue == "2") {
        $("#ObjectEmail").hide();
    } else {
        $("#ObjectEmail").hide();
    }
}
function Proses_SubmitEmail() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Session is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_CustomerID").val() == "") {
        swal(
            '',
            'Customer is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ChannelAccount = $("#ContentPlaceHolder1_TrxEmailAccount").val()
    var ChannelIncoming = "Email";
    var StatusTicket;
    var Posisi;
    if ($("#HD_SiteID").val() == "1") {
        if ($("#Form_Ticket_Action").val() == "") {
            swal(
                '',
                'Action is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        } else {
            //if ($('#Form_Ticket_Action').val() == 2) {
            //    StatusTicket = "Closed"
            //    Posisi = "1";
            //}
            if ($('#Form_Ticket_Action').val() == 1) {
                StatusTicket = "Open";
                Posisi = "1";
                if ($('#Form_Ticket_Email_Tujuan').val() == "") {
                    swal(
                        '',
                        'To is empty',
                        'info'
                    ).then(function () {
                        return false;
                    });
                    return false;
                }
            }
            if ($('#Form_Ticket_Action').val() == 3) {
                StatusTicket = "Pending";
                Posisi = "2";
                if ($('#Form_Ticket_Email_Tujuan').val() == "") {
                    swal(
                        '',
                        'To is empty',
                        'info'
                    ).then(function () {
                        return false;
                    });
                    return false;
                }
            }
        }
    } else {
        StatusTicket = "Closed"
        Posisi = "1";
    }
    if ($("#Form_Ticket_Priority").val() == '') {
        swal(
            '',
            'Priority is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Kategori").val() == '') {
        swal(
            '',
            'Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_SubKategori").val() == '') {
        swal(
            '',
            'Sub Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Kantor").val() == '') {
        swal(
            '',
            'Kantor is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Subject").val() == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var NoteAgent = CKEDITOR.instances.Ticket_NoteAgent.getData();
    if (NoteAgent == '') {
        swal(
            '',
            'Jawaban is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //if ($("#Form_Ticket_Email_Tujuan").val() == "") {
    //    var Tujuan = "-"
    //} else {
    //    var Tujuan = $("#Form_Ticket_Email_Tujuan").val()
    //}
    //if ($("#Form_Ticket_Email_CC").val() == "") {
    //    var Cc = "-"
    //} else {
    //    var Cc = $("#Form_Ticket_Email_CC").val()
    //}
    if ($("#ContentPlaceHolder1_DynamicEmailAccountID").val() == "") {
        var DynamicAccountID = "0"
    } else {
        var DynamicAccountID = $("#ContentPlaceHolder1_DynamicEmailAccountID").val()
    }
    if ($('#Form_Ticket_Action').val() == 3) {
        var messageaction = "Pastikan Kantor Sudah terdaftar pada Applikasi CRM Dynamic"
    } else {
        var messageaction = "Do you want to process?"
    }
    swal({
        title: "" + messageaction + "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    GenesysNumber: $("#ContentPlaceHolder1_TrxID").val(), ThreadID: "", Account: ChannelAccount, Channel: ChannelIncoming,
                    CustomerID: $("#ContentPlaceHolder1_CustomerID").val(), UserName: $("#hd_sessionLogin").val(), Priority: $("#Form_Ticket_Priority").val(), Status: StatusTicket, Subject: $("#Form_Ticket_Subject").val(),
                    Kategori: $("#Form_Ticket_Kategori").val(), SubKategori: $("#Form_Ticket_SubKategori").val(), NoAju: $("#Form_Ticket_NoAju").val(), Kantor: $("#Form_Ticket_Kantor").val(), NilaiTransaksi: $("#Form_Ticket_NilaiTransaksi").val(),
                    Pertanyaan: NoteAgent, Jawaban: NoteAgent, Posisi: Posisi, Tujuan: $("#Form_Ticket_Email_Tujuan").val(), Cc: $("#Form_Ticket_Email_CC").val(), Action: "INSERT"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_CreateTicketEmail",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                $("#ContentPlaceHolder1_TrxTicketNumber").val(json[i].TrxTicketNumber)
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    if ($('#Form_Ticket_Action').val() == 3) {

                                        var DescriptionNya = "Nama Agent : " + $("#hd_NameKaryawan").val() + "</br></br>" + NoteAgent
                                        var form_data_dinamic = JSON.stringify({
                                            NamaKantor: $("#Form_Ticket_Kantor").val()
                                            , NamaKategory: $('#Form_Ticket_Kategori').find('option:selected').text()
                                            , NamaSubCategory: $('#Form_Ticket_SubKategori').find('option:selected').text()
                                            , AccountId: DynamicAccountID
                                            , ContactId: $("#ContentPlaceHolder1_DynamicEmailContactID").val()
                                            , Origin: "Email"
                                            , Priority: $("#Form_Ticket_Priority").val()
                                            , Judul: $("#Form_Ticket_Subject").val()
                                            , NoTicket: $("#ContentPlaceHolder1_TrxTicketNumber").val()
                                            , description: DescriptionNya

                                        });
                                        SaveToDynamic(form_data_dinamic);

                                    } else {
                                        location.href = "Crm_Trm_Inbox_EmailSystem.aspx?"
                                    }
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
                    }
                })

            }
        })
}
function Proses_UpdateEmail() {
    if ($("#Form_Ticket_Action").val() == "") {
        swal(
            '',
            'Action is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        if ($('#Form_Ticket_Action').val() == 2) {
            StatusTicket = "Closed"
            Posisi = "1";
            ActionProses = "SaveClosed"
        }
        if ($('#Form_Ticket_Action').val() == 1) {
            StatusTicket = "Open";
            Posisi = "1";
            ActionProses = "UpdateOpen"
        }
        if ($('#Form_Ticket_Action').val() == 3) {
            StatusTicket = "Pending";
            Posisi = "2";
            ActionProses = "ConvertToCase"
        }
    }
    var NoteAgent = CKEDITOR.instances.Ticket_NoteAgent.getData();
    if (NoteAgent == '') {
        swal(
            '',
            'Jawaban is empty',
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
                    TicketNumber: $("#ContentPlaceHolder1_TrxTicketNumber").val(), Status: StatusTicket, Reason: NoteAgent, ETo: $("#Form_Ticket_Email_Tujuan").val(),
                    ESubject: $("#Form_Ticket_Email_Subject").val(), Ecc: $("#Form_Ticket_Email_CC").val(), UserCreate: $("#hd_sessionLogin").val(), Action: ActionProses
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_TeamLeaderEmail",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_Inbox_EmailSystem.aspx?"
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
                    }
                })

            }
        })
}
function Proses_SimpanCustomer() {
    if ($("#AddCustomer_Type").val() == "") {
        swal(
            '',
            'Type is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AddCustomer_Type").val() == "1") {
        if ($("#AddCustomer_NamaPerusahaan").val() == '') {
            swal(
                '',
                'Nama Perusahaan is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#ContentPlaceHolder1_DynamicEmailAccountID").val() == '') {
            swal(
                '',
                'Acount id perusahaan is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    } else {
        if ($("#AddCustomer_Name").val() == "") {
            swal(
                '',
                'Name is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        $("#ContentPlaceHolder1_DynamicEmailAccountID").val("0")
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                //var form_data = JSON.stringify({
                //    TrxUsername: $("#hd_sessionLogin").val(), TrxCusTomerName: $("#AddCustomer_Name").val(), TrxCusTomerEmail: $("#AddCustomer_Email").val(),
                //    TrxCusTomerPhone: $("#AddCustomer_HP").val(), TrxCusTomerType: $("#AddCustomer_Type").val(), TrxCusTomerPerusahaan: $("#AddCustomer_NamaPerusahaan").val(),
                //    TrxCusTomerNIK: "0", TrxCusTomerAlamat: $("#AddCustomer_Alamat").val(), TrxFacebook: $("#AddCustomer_Facebook").val(),
                //    TrxInstagram: $("#AddCustomer_Instagram").val(), TrxTwitter: $("#AddCustomer_Twitter").val(), TrxNPWP: $("#AddCustomer_NPWP").val()
                //});
                //$.ajax({
                //    type: "POST",
                //    url: "asmx/ServiceCustomer.asmx/BRA_Customer",
                //    contentType: "application/json; charset=utf-8",
                //    dataType: "json",
                //    data: form_data,
                //    success: function (data) {
                //        var json = JSON.parse(data.d);
                //        var i, x = "";
                //        var tblTickets = "";

                //        for (i = 0; i < json.length; i++) {

                //            if (json[i].Result == "True") {
                //                swal(
                //                    '',
                //                    'Insert Customer Has Been Success',
                //                    'success'
                //                ).then(function () {
                //                    Customer_Check($("#AddCustomer_Email").val())
                //                    $("#DivObjectCustomer").hide();
                //                });
                //            } else {
                //                swal(
                //                    '',
                //                    'Insert Customer Has Been Failed !',
                //                    'error'
                //                ).then(function () {
                //                    return false;
                //                });
                //                return false;
                //            }

                //        }
                //    },
                //    error: function (xmlHttpRequest, textStatus, errorThrown) {
                //        console.log(xmlHttpRequest.responseText);
                //        console.log(textStatus);
                //        console.log(errorThrown);
                //    }
                //})
                var form_data = JSON.stringify({
                    BusinessPhone: $("#AddCustomer_HP").val()
                    , Email: $("#AddCustomer_Email").val()
                    , FacebookId: $("#AddCustomer_Facebook").val()
                    , TwitterId: $("#AddCustomer_Twitter").val()
                    , InstagramId: $("#AddCustomer_Instagram").val()
                    , Name: $("#AddCustomer_Name").val()

                });
                saveDinamic(form_data)

            }
        })
    FormLoadChannelCustomer($("#ContentPlaceHolder1_TrxCustomerID").val())
}
function Proses_UpdateCustomer() {
    if ($("#ContentPlaceHolder1_TrxCustomerID").val() == "") {
        swal(
            '',
            'Customer is empty',
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
                    TrxCustomerID: $("#ContentPlaceHolder1_TrxCustomerID").val(), TrxUsername: $("#hd_sessionLogin").val(), TrxCusTomerName: $("#AddCustomer_Name").val(), TrxCusTomerEmail: $("#AddCustomer_Email").val(),
                    TrxCusTomerPhone: $("#AddCustomer_HP").val(), TrxCusTomerType: $("#AddCustomer_Type").val(), TrxCusTomerPerusahaan: $("#AddCustomer_NamaPerusahaan").val(),
                    TrxCusTomerNIK: "0", TrxCusTomerAlamat: $("#AddCustomer_Alamat").val(), TrxFacebook: $("#AddCustomer_Facebook").val(),
                    TrxInstagram: $("#AddCustomer_Instagram").val(), TrxTwitter: $("#AddCustomer_Twitter").val(), TrxNPWP: $("#AddCustomer_NPWP").val()
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/BRA_Customer_Fetch",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Customer Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#DivObjectCustomer").hide();
                                    Customer_Load($("#ContentPlaceHolder1_TrxCustomerID").val())
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Customer Has Been Failed !',
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
                    }
                })

            }
        })
}
function Proses_SimpanPerusahaan() {
    if ($("#Perusahaan_Nama").val() == "") {
        swal(
            '',
            'Name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AddPerusahaan_Type").val() == "") {
        swal(
            '',
            'Type is empty',
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

                //var form_data = JSON.stringify({
                //    TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Perusahaan_Nama").val(), TrxEmail: $("#AddPerusahaan_Type").val(), TrxTelepon: "-", TrxNPWP: $("#Perusahaan_NPWP").val(), TrxAction: "INSERT"
                //});
                //$.ajax({
                //    type: "POST",
                //    url: "asmx/ServiceCustomer.asmx/BRA_Perusahaan",
                //    contentType: "application/json; charset=utf-8",
                //    dataType: "json",
                //    data: form_data,
                //    success: function (data) {
                //        var json = JSON.parse(data.d);
                //        var i, x = "";
                //        var tblTickets = "";

                //        for (i = 0; i < json.length; i++) {

                //            if (json[i].Result == "True") {
                //                if (json[i].msgSystem == "InsertSuccess") {
                //                    swal(
                //                        '',
                //                        'Insert Perusahaan Has Been Success',
                //                        'success'
                //                    ).then(function () {
                //                    });
                //                } else {
                //                    swal(
                //                        '',
                //                        'Data Perusahaan/Pemerintah Duplicate',
                //                        'error'
                //                    ).then(function () {
                //                        return false;
                //                    });
                //                    return false;
                //                }                              
                //            } else {
                //                swal(
                //                    '',
                //                    'Insert Perusahaan Has Been Failed !',
                //                    'error'
                //                ).then(function () {
                //                    return false;
                //                });
                //                return false;
                //            }

                //        }
                //    },
                //    error: function (xmlHttpRequest, textStatus, errorThrown) {
                //        console.log(xmlHttpRequest.responseText);
                //        console.log(textStatus);
                //        console.log(errorThrown);
                //    }
                //})

                var form_data = JSON.stringify({
                    AccountName: $("#Perusahaan_Nama").val()
                    , MainPhone: ""
                    , NPWP: $("#Perusahaan_NPWP").val()
                    , Email: ""
                    , ContactId: ""

                });

                savePerusahaanDynamic(form_data)

            }
        })
    $("#DivObjectPerusahaan").show();
}
function Proses_CancelPerusahaan() {
    $("#DivObjectCustomer").hide();
}
function Action_Reply() {
    if ($("#ContentPlaceHolder1_CustomerID").val() == "" || $("#ContentPlaceHolder1_CustomerID").val() == null) {
        swal(
            '',
            'Customer not registered',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        $("#DivAction").show();
        $("#ButtonProsesSubmitEmail").show();
        $("#ButtonProsesUpdateEmail").hide();
        Preview_InboxEmailDetail("1", $("#ContentPlaceHolder1_TrxEmailID").val());
        $("#DivBodyEmail").hide();
        $("#DivObjectTicket").show();
    }

    if ($("#HD_SiteID").val() == "1") {
        $("#DivAction").show();
    } else {
        $("#DivAction").hide();
        $("#FolderDraft").hide();
        $("#FolderSendTeamLeader").hide();
        $("#FolderCase").hide();
    }
}
function Action_Forward() {
    if ($("#HD_SiteID").val() == "1") {
        $("#DivAction").show();
    } else {
        $("#DivAction").hide();
        $("#FolderDraft").hide();
        $("#FolderSendTeamLeader").hide();
        $("#FolderCase").hide();
    }
    Clear_Object_Ticket();
    if ($("#ContentPlaceHolder1_CustomerID").val() == "" || $("#ContentPlaceHolder1_CustomerID").val() == null) {
        swal(
            '',
            'Customer not registered',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        $("#ObjectEmail").show();
        $("#ButtonProsesForwardEmail").show();
        $("#ButtonProsesSubmitEmail").hide();
        $("#ButtonProsesUpdateEmail").hide();
        Preview_InboxEmailDetail("2", $("#ContentPlaceHolder1_TrxEmailID").val());
        $("#Form_Ticket_Email_Tujuan").val("")
        $("#DivBodyEmail").hide();
        $("#DivObjectTicket").show();
        $("#DivObjectCustomer").hide();
        $("#DivAction").hide();
    }
}
function Perusahaan_AddNew() {
    $('.navtabs2-customer').removeClass('active');
    $("#DivObjectPerusahaan").hide();
    DisplayPerusahaan();
}
function Perusahaan_Selected(ID) {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK171'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#AddCustomer_NamaPerusahaan").val(json[i].Nama_Perusahaan)
                $("#AddCustomer_NPWP").val(json[i].NPWP)
                $('#AddCustomer_NPWP').attr("disabled", true);
                $("#Div_CustomerSearching").hide()
                $("#ContentPlaceHolder1_DynamicEmailAccountID").val(json[i].AccountID)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#FormAddPerusahaan").hide()
    $("#FormListPIC").show()
}
function Perusahaan_ListPIC() {
    if ($("#AddCustomer_NamaPerusahaan").val() === "" || $("#AddCustomer_NamaPerusahaan").val() === null) {
        swal(
            '',
            'Please select perusahaan',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    $("#Div_CustomerSearchingPIC").show()
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#AddCustomer_NamaPerusahaan").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK174'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_CustomerSearchingPIC').empty();
            var closeButton = '</br><a href="#" class="btn btn-soft-danger btn-sm" onclick="PIC_Closed()" style="margin-top:-25px;">Close</a>';
            $('#Div_CustomerSearchingPIC').append(closeButton);
            for (i = 0; i < json.length; i++) {

                if (json[i].HP == "" || json[i].HP == null) {
                    var NomorHP = "-"
                } else {
                    var NomorHP = json[i].HP
                }
                if (json[i].Email == "" || json[i].Email == null) {
                    var EmailAddress = "-"
                } else {
                    var EmailAddress = json[i].Email
                }
                ResultCustomerSearchingPIC = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="PIC_Selected(' + json[i].CustomerID + ')">' +
                    '<li class="active">' +
                    '<a href="#">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].Name.substr(0, 1).toUpperCase() + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="text-truncate font-size-14 mb-1">' + json[i].Name + '</h5>' +
                    '<p class="text-truncate mb-0">' + NomorHP + '</p>' +
                    '<p class="text-truncate mb-0">' + EmailAddress + '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0">' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
                $('#Div_CustomerSearchingPIC').append(ResultCustomerSearchingPIC)

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function PIC_Selected(CustomerID) {
    $("#ContentPlaceHolder1_TrxCustomerID").val(CustomerID)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $("#AddCustomer_Name").val(json[i].Name)
                $("#AddCustomer_NIK").val(json[i].NIK)
                $("#AddCustomer_Type").find("option:selected").text();
                $("#AddCustomer_Type").val(json[i].CompID);
                $("#AddCustomer_NamaPerusahaan").val(json[i].Nama_Perusahaan)
                $("#AddCustomer_Email").val(json[i].Email)
                $("#AddCustomer_HP").val(json[i].HP)
                $("#AddCustomer_Facebook").val(json[i].Facebook)
                $("#AddCustomer_Instagram").val(json[i].Instagram)
                $("#AddCustomer_Twitter").val(json[i].Twitter)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#UpdateCustomer").show()
    $("#SimpanCustomer").hide()
    $("#Div_CustomerSearchingPIC").hide()
}
function PIC_Closed() {
    $("#Div_CustomerSearchingPIC").hide()
}
function Kantor_Selected(ID) {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK172'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#Form_Ticket_Kantor").val(json[i].NamaKantor)
                $("#Div_KantorSearching").hide()

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Onchange_FormatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp ' + rupiah : '');
}
function Ticket_Detail() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTicketNumber").val() + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK335'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCustomer = "";

            for (i = 0; i < json.length; i++) {
                $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].NIK)
                $("#ContentPlaceHolder1_CustomerID").val(json[i].NIK)
                $("#Form_Ticket_Priority").val(json[i].SkalaPrioritas)
                $("#Form_Ticket_Status").val(json[i].Status)
                $("#Form_Ticket_Subject").val(json[i].SubCategory3Name)
                $("#Form_Ticket_Kategori option:selected").text(json[i].CategoryName);
                $('#Form_Ticket_Kategori').prop('disabled', true);
                $("#Form_Ticket_NoAju").val(json[i].NomorRekening)
                $("#Form_Ticket_Kantor").val(json[i].VendorName)
                $("#Form_Ticket_SubKategori option:selected").text(json[i].SubCategory1Name);
                $("#Form_Ticket_SubKategori").val(json[i].SubCategory1ID)
                $('#Form_Ticket_SubKategori').prop('disabled', true);
                $("#Form_Ticket_NilaiTransaksi").val(json[i].SumberInformasi)
                //$("#Ticket_NoteAgent").val(json[i].ResponComplaint)
                CKEDITOR.instances.Ticket_NoteAgent.setData(json[i].ResponComplaint)
                if (json[i].JENIS_EMAIL_INTERNAL == "Team_Leader") {
                    $("#Form_Ticket_Action").val("1")
                    $("#Form_Ticket_Email_Tujuan").val(json[i].ETO)
                    if (json[i].StatusTeamLeader == "Forward") {
                        $("#Form_Ticket_Email_Subject").val("FWD: " + json[i].ESUBJECT)
                    } else {
                        $("#Form_Ticket_Email_Subject").val(json[i].ESUBJECT)
                    }
                    $("#Form_Ticket_Email_CC").val(json[i].ECC)
                } else {
                    $("#Form_Ticket_Action").val("2")
                }
                if (json[i].Status == "Closed" || json[i].Status == "Pending") {
                    $("#ButtonProsesSubmitEmail").hide();
                    $("#ButtonProsesUpdateEmail").hide();
                    $('#DivAttachmentTicketEmail').hide();
                } else {
                    $('#DivAttachmentTicketEmail').show();
                    $("#ButtonProsesSubmitEmail").hide();
                    $("#ButtonProsesUpdateEmail").show();
                    $("#ButtonProsesForwardEmailTeamLeader").hide();
                    $("#ButtonProsesFollowupTicket").hide();
                }
                if (json[i].StatusTeamLeader == "Forward") {
                    $("#ButtonProsesUpdateEmail").hide();
                    $("#ButtonProsesFollowupTicket").hide();
                    $("#ButtonProsesForwardEmailTeamLeader").show();
                    $("#Form_Ticket_Email_Tujuan").val("")
                } else {
                    $("#ButtonProsesForwardEmailTeamLeader").hide();
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
function Preview_AttachmentTicketExisting() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTicketNumber").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK178'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultTicketAttachmentExisting = "";

            $('#TicketAttachmentExisting').empty();
            if (json.length > 0) {
                $("#Div_TicketAttachmentExisting").show();
                for (i = 0; i < json.length; i++) {

                    var color = ""
                    if (json[i].FileType == "doc") {
                        var FileTypes = "file";
                        color = "primary"
                    }
                    else if (json[i].FileType == "docx") {
                        var FileTypes = "file";
                        color = "primary"
                    }
                    else if (json[i].FileType == "pdf" || json[i].FileType == ".pdf") {
                        var FileTypes = "file";
                        color = "danger"
                    }
                    else if (json[i].FileType == "xls") {
                        var FileTypes = "file";
                        color = "success"
                    }
                    else if (json[i].FileType == "xlsx") {
                        var FileTypes = "file";
                        color = "success"
                    }
                    else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "JPG" || json[i].FileType == "jpeg" || json[i].FileType == "JPEG" || json[i].FileType == "gif" || json[i].FileType == "GIF" || json[i].FileType == "BMP" || json[i].FileType == "bmp") {
                        var FileTypes = "image";
                        color = "warning"
                    }
                    resultTicketAttachmentExisting = '<div class="card border shadow-none mb-2">' +
                        '<div class="p-2">' +
                        '<div class="d-flex">' +
                        '<div class="avatar-sm align-self-center me-2">' +
                        '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                        '<i class="fas fa-' + FileTypes + '"></i>' +
                        '</div>' +
                        '</div>' +
                        '<div class="overflow-hidden me-auto">' +
                        '<h5 class="font-size-13 text-truncate mb-1">' + json[i].Filename + '</h5>' +
                        '<a href=' + json[i].Path + ' target="_blank" class="text-body">' +
                        '<p class="text-muted text-truncate mb-0">Download</p>' +
                        '</a>' +
                        '</div>' +
                        '<div class="ms-2">' +
                        '<a href="#" class="text-body" onclick=Delete_AttachmentTicketExisting(' + json[i].ID + ')>' +
                        '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    $('#TicketAttachmentExisting').append(resultTicketAttachmentExisting)

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
function Div_Disable() {
    $("#UpdatePerusahaan").hide()
    $("#NomorTicketFollowup").empty();
    $("#DivNomorTicketFollowup").hide();
    $("#DivTableOutgoingSendingEmail").hide();
    $("#DivBodyEmailDuplicate").hide();
    $("#ButtonProsesFollowupTicket").hide();
    $("#ButtonProsesForwardEmailTeamLeader").hide();
    $("#DivHideShowTeamLeader").hide();
    $("#DivObjectCompose").hide();
    $("#DivHeader").hide();
    $("#DivObjectPerusahaan").hide();
    $("#DivObjectCustomer").hide();
    $("#DivObjectTicket").hide();
    $("#DivBodyEmail").hide();
    $("#DivJourneyReject").hide();
    $("#ObjectEmail").hide();
    $("#DivTableOutgoingEmail").hide();
    $("#Div_TicketAttachmentExisting").hide();
    $("#UpdateCustomer").hide();
    $("#ButtonProsesUpdateEmail").hide();
    $("#DivRejectTeamLeader").hide();
    $("#ButtonProsesForwardEmail").hide();
    $("#DivFilterDate").hide();
}
function Clear_Object_Perusahaan() {
    $("#Perusahaan_Nama").val("")
    $("#Perusahaan_Telepon").val("")
    $("#Perusahaan_NPWP").val("")
    $("#Perusahaan_Email").val("")
}
function Clear_Object_Customer() {
    $("#Perusahaan_Nama").val("")
    $("#Perusahaan_Telepon").val("")
    $("#Perusahaan_NPWP").val("")
    $("#Perusahaan_Email").val("")
    $("#AddCustomer_Nama").val("")
    $("#AddCustomer_NamaPerusahaan").val("")
    $("#AddCustomer_NPWP").val("")
    $("#AddCustomer_Name").val("")
    $("#AddCustomer_HP").val("")
    $("#AddCustomer_Email").val("")
    $("#AddCustomer_Facebook").val("")
    $("#AddCustomer_Instagram").val("")
    $("#AddCustomer_Twitter").val("")
}
function Clear_Object_Ticket() {
    $("#Form_Ticket_Priority").val("")
    $("#Form_Ticket_Subject").val("")
    $("#Form_Ticket_Kategori").val("")
    $("#Form_Ticket_NoAju").val("")
    $("#Form_Ticket_Kantor").val("")
    $("#Form_Ticket_SubKategori").val("")
    $("#Form_Ticket_NilaiTransaksi").val("")
    $("#Form_Ticket_Action").val("")
    $("#Form_Ticket_Email_Tujuan").val("")
    $("#Form_Ticket_Email_Subject").val("")
    $("#Form_Ticket_Email_CC").val("")
    //$("#Ticket_NoteAgent").val("")
    CKEDITOR.instances.Ticket_NoteAgent.setData()
}
function DataListLoginAgent() {
    var divLisAgent = $('#divLisAgent');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'6', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK234'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultAgentLogin = "";

            divLisAgent.empty();
            if (json.length == 0) {
                resultAgentLogin = '<a href="#"><span class="mdi mdi-circle-outline text-info me-2"></span>Agent Empty</a>';
                divLisAgent.append(resultAgentLogin);
                //resultAgentLogin = '<div class="agent-row"><div class="agent-icon"><span class="mdi mdi-circle-outline text-info"></span></div><div class="agent-name">Agent Empty</div></div>';
                //divLisAgent.append(resultAgentLogin);
            } else {
                for (i = 0; i < json.length; i++) {
                    console.log("xxx" + json[i].Login)
                    if (json[i].Login == 1) {
                        var ColorLogin = "success"
                    } else {
                        var ColorLogin = "danger"
                    }
                    if (json[i].NAME.length > 10) {
                        var NameNya = json[i].NAME.substring(0, 10) + ".."
                    } else {
                        var NameNya = json[i].NAME
                    }
                    resultAgentLogin = '<a href="#"><span class="mdi mdi-circle text-' + ColorLogin + ' me-2"></span>' + NameNya + '</a>'
                    divLisAgent.append(resultAgentLogin);

                    //var ColorLogin = (json[i].IdAUX == "9") ? "success" : "danger";
                    //resultAgentLogin = '<div class="agent-row"><div class="agent-icon"><span class="mdi mdi-circle text-' + ColorLogin + '"></span></div><div class="agent-name">' + json[i].NAME + '</div></div>';
                    //divLisAgent.append(resultAgentLogin);

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
function DataListLoginTeamLeader() {
    var divLisTeamLeader = $('#divLisTeamLeader');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'6', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK184'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultLoginTeamLeader = "";

            divLisTeamLeader.empty();
            if (json.length == 0) {
                resultLoginTeamLeader = '<a href="#"><span class="mdi mdi-circle-outline text-info me-2"></span>Agent Empty</a>';
                divLisTeamLeader.append(resultLoginTeamLeader);
            } else {
                for (i = 0; i < json.length; i++) {
                    if (json[i].Login == "1") {
                        var ColorLogin = "success"
                    } else {
                        var ColorLogin = "danger"
                    }
                    resultLoginTeamLeader = '<a href="#"><span class="mdi mdi-circle text-' + ColorLogin + ' me-2"></span>' + json[i].NAME + '</a>'
                    divLisTeamLeader.append(resultLoginTeamLeader);
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
function Email_JourneyEskalasi() {
    $("#DivHideShowTeamLeader").show();
    $("#DivRejectTeamLeader").show();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: JSON.stringify({
            TrxID: $("#ContentPlaceHolder1_TrxTicketNumber").val(),
            TrxSearching: 'UideskIndonesia',
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'UIDESK336'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var json = JSON.parse(response.d);
            var resultSourceCustomer = "";

            //function formatDate(date) {
            //    var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
            //    var day = date.getDate();
            //    var month = months[date.getMonth()];
            //    var year = date.getFullYear();
            //    return `${day} ${month} ${year}`;
            //}
            //function formatTime(date) {
            //    var hours = String(date.getHours()).padStart(2, '0');
            //    var minutes = String(date.getMinutes()).padStart(2, '0');
            //    var seconds = String(date.getSeconds()).padStart(2, '0');
            //    return `${hours}:${minutes}:${seconds}`;
            //}
            $("#RejectTeamLeader").empty()
            if (json.length === 0) {
                resultSourceCustomer = `<div class="alert alert-info" role="alert">
                    Tidak ada data yang tersedia untuk ditampilkan.
                </div>`;
            } else {
                for (var i = 0; i < json.length; i++) {
                    var item = json[i];
                    //var date = new Date(parseInt(item.DateCreate.match(/\d+/)[0]));
                    //var formattedDate = formatDate(date);
                    //var formattedTime = formatTime(date);

                    var iconValue, iconColor;
                    switch (item.Status) {
                        case "Approved":
                            iconColor = "success";
                            break;
                        case "Eskalasi":
                            iconColor = "warning";
                            break;
                        case "Revisi":
                            iconColor = "primary";
                            $("#ObjectEmail").show();
                            $('#Form_Ticket_Action').prop('disabled', false);
                            $('#Ticket_NoteAgent').prop('disabled', false);
                            break;
                        case "Close Ticket":
                            iconColor = "danger";
                            $('#Form_Ticket_Action').prop('disabled', false);
                            $('#Ticket_NoteAgent').prop('disabled', false);
                            break;
                        case "Forward":
                            iconColor = "secondary";
                            $("#Form_Ticket_Email_Tujuan").val("")
                            $("#DivAction").hide();
                            $("#ObjectEmail").show();
                            $("#ButtonProsesSubmitEmail").hide();
                            $("#ButtonProsesUpdateEmail").hide();
                            $("#ButtonProsesForwardEmail").hide();
                            $("#ButtonProsesForwardEmailTeamLeader").show();
                            break;
                        default:
                            iconColor = "secondary";
                            break;
                    }
                    //resultSourceCustomer += `
                    //    <div class="col-lg-4">
                    //        <div class="card border border-danger">
                    //            <div class="card-header bg-transparent border-danger">
                    //                <h6 class="my-0 text-danger">${item.Status}</h6>
                    //            </div>
                    //            <div class="card-body">
                    //                //<h5 class="card-title mb-1">${item.Status}</h5>
                    //                <p class="card-text">${item.Reason}</p>
                    //            </div>
                    //        </div>
                    //      </div >
                    //`;
                    resultSourceCustomer += `
                        <div class="col-lg-6">
                            <div class="card border border-danger">
                                <div class="card-header bg-transparent border-danger">
                                    <h6 class="my-0 text-danger">${item.Status}</h6>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">${item.Reason}</p>
                                </div>
                            </div>
                          </div >
                    `;

                }
                $("#customSwitchsizesm").prop('checked', true);
                $("#RejectTeamLeader").html(resultSourceCustomer);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
function Preview_AttachmentTicketUpload() {
    if ($("#ContentPlaceHolder1_TrxTicketNumber").val() != "" && $("#ContentPlaceHolder1_TrxTicketNumber").val() != null) {
        var NumberID = $("#ContentPlaceHolder1_TrxTicketNumber").val()
        var UideskCode = "UIDESK178"
    } else {
        var NumberID = $("#ContentPlaceHolder1_TrxCustomerID").val()
        var UideskCode = "UIDESK62"
    }
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + NumberID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: '" + UideskCode + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultTicketAttachment = "";

            $('#TicketAttachment').empty();
            for (i = 0; i < json.length; i++) {

                var color = ""
                if (json[i].FileType == "doc") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == "docx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == "pdf" || json[i].FileType == ".pdf") {
                    var FileTypes = "file";
                    color = "danger"
                }
                else if (json[i].FileType == "xls") {
                    var FileTypes = "file";
                    color = "success"
                }
                else if (json[i].FileType == "xlsx") {
                    var FileTypes = "file";
                    color = "success"
                }
                else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "JPG" || json[i].FileType == "jpeg" || json[i].FileType == "JPEG" || json[i].FileType == "gif" || json[i].FileType == "GIF" || json[i].FileType == "BMP" || json[i].FileType == "bmp") {
                    var FileTypes = "image";
                    color = "warning"
                }
                resultTicketAttachment = '<div class="card border shadow-none mb-2">' +
                    '<div class="p-2">' +
                    '<div class="d-flex">' +
                    '<div class="avatar-sm align-self-center me-2">' +
                    '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                    '<i class="fas fa-' + FileTypes + '"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="overflow-hidden me-auto">' +
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].Filename + '</h5>' +
                    '<a href=' + json[i].Path + ' target="_blank" class="text-body">' +
                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=Delete_AttachmentTicket(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#TicketAttachment').append(resultTicketAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Delete_AttachmentTicket(TrxID) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: TrxID });
                $.ajax({
                    url: "WebServiceTransaction.asmx/DeleteAttachmentTicket",
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
                                    'Delete File Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("file_name").empty();
                                    Preview_AttachmentTicketUpload($("#hd_sessionLogin").val());
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete File Has Been Failed !',
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
function Delete_AttachmentTicketExisting(TrxID) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: TrxID });
                $.ajax({
                    url: "WebServiceTransaction.asmx/DeleteAttachmentTicket",
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
                                    'Delete File Has Been Success',
                                    'success'
                                ).then(function () {
                                    Preview_AttachmentTicketExisting();
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete File Has Been Failed !',
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



function SaveTemplate() {
    var JawabaNyaAgent = CKEDITOR.instances.Ticket_NoteAgent.getData();
    var TemplateDescription = CKEDITOR.instances.Template_Description.setData(JawabaNyaAgent);


    $("#TemplateTextboxtSubject").val("")
    $("#Template_Description").val("")
    $("#FormTemplate").modal('show');
    $("#TemplateTextboxtSubject").show()
    $("#TemplateDropdownSubject").hide()
    $("#SimpanTemplate").show()
    $("#GetTemplate").hide()
    Dropdown_Template();
    //var JawabaNyaAgent = $("#Ticket_NoteAgent").val()
    //$("#Template_Description").val(JawabaNyaAgent)
    
}
function InsertTemplate() {


    // Show the modal
    $("#FormTemplate").modal('show');
    Dropdown_Template();

    // Hide template textbox subject and show the dropdown
    $("#TemplateTextboxtSubject").hide();
    $("#TemplateDropdownSubject").show();

    // Hide "Submit" button and show "Get" button
    $("#SimpanTemplate").hide();
    $("#GetTemplate").show();

    // Clear values in the input fields
    $("#TemplateTextboxtSubject").val("");
    CKEDITOR.instances.Template_Description.setData("");

    // Destroy any existing autocomplete instance to avoid conflict
    
}



function DeleteTemplate() {


    if ($("#ComboTemplateName").val() == "") {
        swal(
            '',
            'Template name is empty',
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
                var id = $("#HiddenTemplateID").val();
                var form_data = JSON.stringify({ ID: id, Template: '', Format: '', State: "Y", User: $("#hd_sessionLogin").val(), Action: 'DELETE' });
                $.ajax({
                    url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
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
                                    $("#FormTemplate").modal('hide');
                                 
                                    //window.location.reload();
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    //$("#FormTemplate").modal('hide');
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

function ActionSimpanTemplate() {
    if ($("#Template_Name").val() == "") {
        swal(
            '',
            'Template name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var Template_Description = CKEDITOR.instances.Template_Description.getData();
    if (Template_Description == "") {
        swal(
            '',
            'Template description is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //else {
    //    var maxlength = "7500"
    //    if (Template_Description.val().length > maxlength) {
    //        swal(
    //            '',
    //            'Character Length is over, Maximum Length 7500 Character',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ ID: "0", Template: Template_Description, Format: $("#Template_Name").val(), State: "Y", User: $("#hd_sessionLogin").val(), Action: 'INSERT' });
                $.ajax({
                    url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
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
                                    $("#FormTemplate").modal('hide');
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#FormTemplate").modal('hide');
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
function ChangeTemplateResponse(val) {
   
    
   // alert(selectedId);
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + val + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK183'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSubKategori = "";

            for (i = 0; i < json.length; i++) {

                //$("#Template_Description").val(json[i].TEMPLATE_RESPONSE)
                CKEDITOR.instances.Template_Description.setData(json[i].TEMPLATE_RESPONSE);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionGetTemplate() {
    var JawabaNyaAgent = CKEDITOR.instances.Template_Description.getData();
    CKEDITOR.instances.Ticket_NoteAgent.setData(JawabaNyaAgent);
    $("#FormTemplate").modal('hide');
}



    //$("#Template_Description").val(JawabaNyaAgent)




function Proses_ForwardEmail() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Session is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_CustomerID").val() == "") {
        swal(
            '',
            'Customer is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Email_Tujuan").val() == "") {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ChannelAccount = $("#Form_Ticket_Email_Tujuan").val()
    var ChannelIncoming = "Email";
    var StatusTicket = "Forward"
    var Posisi = "1"
    var NoteAgent = CKEDITOR.instances.Ticket_NoteAgent.getData();
    if (NoteAgent == '') {
        swal(
            '',
            'Jawaban is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //if ($("#Form_Ticket_Email_Tujuan").val() == "") {
    //    var Tujuan = "-"
    //} else {
    //    var Tujuan = $("#Form_Ticket_Email_Tujuan").val()
    //}
    //if ($("#Form_Ticket_Email_CC").val() == "") {
    //    var Cc = "-"
    //} else {
    //    var Cc = $("#Form_Ticket_Email_CC").val()
    //}
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    GenesysNumber: $("#ContentPlaceHolder1_TrxID").val(), ThreadID: $("#ContentPlaceHolder1_TrxEmailID").val(), Account: ChannelAccount, Channel: ChannelIncoming,
                    CustomerID: $("#ContentPlaceHolder1_CustomerID").val(), UserName: $("#hd_sessionLogin").val(), Priority: $("#Form_Ticket_Priority").val(), Status: StatusTicket, Subject: $("#Form_Ticket_Subject").val(),
                    Kategori: $("#Form_Ticket_Kategori").val(), SubKategori: $("#Form_Ticket_SubKategori").val(), NoAju: $("#Form_Ticket_NoAju").val(), Kantor: $("#Form_Ticket_Kantor").val(), NilaiTransaksi: $("#Form_Ticket_NilaiTransaksi").val(),
                    Pertanyaan: NoteAgent, Jawaban: NoteAgent, Posisi: Posisi, Tujuan: $("#Form_Ticket_Email_Tujuan").val(), Cc: $("#Form_Ticket_Email_CC").val(), Action: "INSERT"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_CreateTicketEmail",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_Inbox_EmailSystem.aspx?"
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
                    }
                })

            }
        })
}
function CheckedTeamleader(checked) {
    if (checked) {
        $("#DivRejectTeamLeader").show();
    } else {
        $("#DivRejectTeamLeader").hide();
    }
}
function Proses_ForwardEmailTeamLeader() {
    if ($("#Form_Ticket_Email_Tujuan").val() == "") {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Email_Subject").val() == "") {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var NoteAgent = CKEDITOR.instances.Ticket_NoteAgent.getData();
    if (NoteAgent == "") {
        swal(
            '',
            'Jawaban is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ActionProses = "ForwardClosed";
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TicketNumber: $("#ContentPlaceHolder1_TrxTicketNumber").val(), Status: "Closed", Reason: NoteAgent, ETo: $("#Form_Ticket_Email_Tujuan").val(),
                    ESubject: $("#Form_Ticket_Email_Subject").val(), Ecc: $("#Form_Ticket_Email_CC").val(), UserCreate: $("#hd_sessionLogin").val(), Action: ActionProses
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_TeamLeaderEmail",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Send Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_Inbox_EmailSystem.aspx?"
                                });
                            } else {
                                swal(
                                    '',
                                    'Send Data Has Been Failed !',
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
                    }
                })

            }
        })
}
function MarkasEmail() {
    var divMarkAsEmail = $('#DivMarkAsEmail');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK191'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultMarkAsEmail = "";

            divMarkAsEmail.empty();
            for (i = 0; i < json.length; i++) {

                resultMarkAsEmail = '<a class="dropdown-item" href="#" onclick=MarkArchieve("' + json[i].ID + '")>' + json[i].MarkAsName + '</a>'
                divMarkAsEmail.append(resultMarkAsEmail);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function MarkArchieve(val) {
    //if (val == "4") {
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
    //    data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK342'}",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {

    //        var json = JSON.parse(data.d);
    //        var i, x, resultSourceCustomer = "";

    //        if (json.length === 0) {
    //            swal(
    //                '',
    //                'Ticket is empty',
    //                'info'
    //            ).then(function () {
    //                return false;
    //            });
    //            return false;
    //        } else {
    //            $("#modal-followup").modal('show');
    //            DropdownTicketFollowup();
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
    //} else {
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal(
            '',
            'Email is empty',
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
                    IvcID: $("#ContentPlaceHolder1_TrxID").val(), UserName: $("#hd_sessionLogin").val(), Action: val
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/ArchieveIncomingEmail",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    '' + json[i].msgSystem + '',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_Inbox_EmailSystem.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    '' + json[i].msgSystem + '',
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
                    }
                })

            }
        })
    //}
}
function DropdownTicketFollowup() {
    var cmbDataSourceTicketNumber = $('#TicketNumberFollowup');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK338'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceTicketNumber = "";

            cmbDataSourceTicketNumber.empty();
            for (i = 0; i < json.length; i++) {

                resultSourceTicketNumber = '<option value="' + json[i].TicketNumber + '">' + json[i].TicketNumber + '</option>';
                cmbDataSourceTicketNumber.append(resultSourceTicketNumber);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ChangeTicketFollowup(val) {
    var selectedText = $("#TicketNumberFollowup").find("option:selected").text();
    var selectedValue = $("#TicketNumberFollowup").val();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK339'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceTicketNumber = "";

            var StatusNya
            for (i = 0; i < json.length; i++) {

                $("#TicketStatusFollowup").val(json[i].Status)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Submitfollowup() {
    $("#NomorTicketFollowup").empty();
    $("#modal-followup").modal('hide');
    $("#DivNomorTicketFollowup").show();
    $("#NomorTicketFollowup").append("Nomor Ticket : " + $("#TicketNumberFollowup").val());
    $("#ContentPlaceHolder1_TrxTicketNumber").val()
    Preview_InboxEmailDetail("1", $("#ContentPlaceHolder1_TrxEmailID").val());
    $("#DivAction").hide();
    $("#DivBodyEmail").hide();
    $("#DivObjectTicket").show();
    $("#ButtonProsesSubmitEmail").hide();
    $("#ButtonProsesUpdateEmail").hide();
    $("#ButtonProsesForwardEmail").hide();
    $("#ButtonProsesForwardEmailTeamLeader").hide();
    $("#ButtonProsesFollowupTicket").show();
    if ($("#TicketNumberFollowup").val() == '') {
        swal(
            '',
            'Ticket is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + $("#TicketNumberFollowup").val() + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK335'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCustomer = "";

            for (i = 0; i < json.length; i++) {
                $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].NIK)
                $("#ContentPlaceHolder1_CustomerID").val(json[i].NIK)
                $("#Form_Ticket_Priority").val(json[i].SkalaPrioritas)
                $("#Form_Ticket_Status").val(json[i].Status)
                $("#Form_Ticket_Subject").val(json[i].SubCategory3Name)
                $("#Form_Ticket_Kategori option:selected").text(json[i].CategoryName);
                $('#Form_Ticket_Kategori').prop('disabled', true);
                $("#Form_Ticket_NoAju").val(json[i].NomorRekening)
                $("#Form_Ticket_Kantor").val(json[i].VendorName)
                $("#Form_Ticket_SubKategori option:selected").text(json[i].SubCategory1Name);
                $("#Form_Ticket_SubKategori").val(json[i].SubCategory1ID)
                $('#Form_Ticket_SubKategori').prop('disabled', true);
                $("#Form_Ticket_NilaiTransaksi").val(json[i].SumberInformasi)
                //$("#Ticket_NoteAgent").val(json[i].ResponComplaint)

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Proses_FollowupTicket() {
    if ($("#Form_Ticket_Email_Tujuan").val() == '') {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($('#Form_Ticket_Email_Subject').val() == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //var TrxBodyCompose = $('#Ticket_NoteAgent').val();
    var TrxBodyCompose = CKEDITOR.instances.Ticket_NoteAgent.getData();
    ; if (TrxBodyCompose == '') {
        swal(
            '',
            'Body is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //else {
    //    var maxlength = "7500"
    //    if (TrxBodyCompose.length > maxlength) {
    //        swal(
    //            '',
    //            'Character Length is over, Maximum Length 7500 Character',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    var form_data = JSON.stringify({
        TrxUserName: $("#hd_sessionLogin").val(), TrxEmailFrom: "0", TrxTO: $("#Form_Ticket_Email_Tujuan").val(), TrxSubject: $('#Form_Ticket_Email_Subject').val(),
        TrxCC: $("#Form_Ticket_Email_CC").val(), TrxBody: TrxBodyCompose, TrxDirection: "OUT", TrxEmailID: $("#ContentPlaceHolder1_TrxEmailID").val(), TicketNumber: $("#TicketNumberFollowup").val(), TrxType: "follow_up_email"
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
                    url: "asmx/TrmMailSystem.asmx/BRA_FollowUpEmail",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

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
                                    $("#Form_Ticket_Email_Tujuan").val("");
                                    $("#Form_Ticket_Email_Subject").val("");
                                    $("#Form_Ticket_Email_CC").val("");
                                    CKEDITOR.instances.Ticket_NoteAgent.setData("")
                                    location.href = "Crm_Trm_Inbox_EmailSystem.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Has Been Failed !',
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
function CheckDuplicateIncomingEmail() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK193'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceTemplate = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].Jumlah > 1) {
                    $("#DivBodyEmailDuplicate").show();
                    TableDuplicateIncomingEmail($("#ContentPlaceHolder1_TrxID").val());
                } else {
                    $("#DivBodyEmailDuplicate").hide();
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
function TableDuplicateIncomingEmail(IvcID) {
    var myTable = $('#TableDuplicateIncomingEmail').DataTable(
        {
            "order": [[4, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + IvcID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK194'}",
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

                var urlaction = '<div class="flex-shrink - 0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=PreviewEmai("' + json[i].EMAIL_ID + '")>Preview</a> ' +
                    '</div> ' +
                    '</div> '
                if (json[i].FLAG_HANDLING == 1) {
                    if (json[i].DIRECTION != "IN") {
                        var Progress = json[i].DIRECTION
                    } else {
                        var Progress = "Send To Team Leader"
                    }
                } else {
                    if (json[i].DIRECTION != "IN") {
                        var Progress = json[i].DIRECTION
                    } else {
                        if (json[i].Reading == 1) {
                            var Progress = "Read"
                        } else {
                            var Progress = "Un Read"
                        }
                    }
                }
                myTable.row.add([json[i].EFROM.substring(0, 40), json[i].ESUBJECT, json[i].NameNya, Progress, newDate + ' ' + newTime, urlaction]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function PreviewEmai(EmailID) {
    $("#modal-preview-email").modal('show');
    document.getElementById("FramePreviewEmail").src = "" + IPSERVER + "/FileEmail/Inbox/" + EmailID + "/file.html"
}
function Compose_Add() {
    Div_Disable();
    $("#DivTableIncomingEmail").hide();
    $("#DivObjectCompose").show();
    $("#ComposeETO").show()
    $("#ComposeESUBJECT").show()
    $("#ComposeECC").show()
    $("#cke_Compose_Body").show();
    $("input[name='composefiles']").show();
    $("#Preview_FrameHTML3").hide();
}
function Proses_ComposeEmail() {
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
    if ($("#ComposeCc").val() == '') {
        swal(
            '',
            'Cc is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //var TrxBodyCompose = $('#Compose_Body').val();
    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData();
    ; if (TrxBodyCompose == '') {
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
        TrxUserName: $("#hd_sessionLogin").val(), TrxEmailFrom: "0", TrxTO: $("#ComposeETO").val(), TrxSubject: $("#ComposeESUBJECT").val(),
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
                                    //$('#Compose_Body').val()
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "Crm_Trm_Inbox_EmailSystem.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Has Been Failed !',
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
                $("#ComposeETO").val("");
                $("#ComposeESUBJECT").val("");
                $("#ComposeECC").val("");
                window.location = "Crm_Trm_Inbox_EmailSystem.aspx?";
            }

        });
}
$('#files').change(function () {
    var filename = $('#files').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    }
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='files']", function (e) {
    $(".hiddenX").show();

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        if ($("#ContentPlaceHolder1_TrxCustomerID").val() == "") {
            swal(
                '',
                'Customer Empty',
                'info'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }
        var NoteAgent = CKEDITOR.instances.Ticket_NoteAgent.getData();
        if (NoteAgent == "") {
            swal(
                '',
                'Body Empty',
                'info'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }
        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 5) {
            swal(
                '',
                'Please upload file less than 5 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "pdf" || fileextension == "png" || fileextension == "doc" || fileextension == "docx" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg") {

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

        if ($("#ContentPlaceHolder1_TrxTicketNumber").val() === "") {
            var NumberID = $("#ContentPlaceHolder1_TrxEmailID").val()
        } else {
            var NumberID = $("#ContentPlaceHolder1_TrxTicketNumber").val()
        }
        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#hd_sessionLogin").val());
        data.append("numberid", NumberID);
        data.append("customerid", $("#ContentPlaceHolder1_TrxCustomerID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "WebServiceTransaction.asmx/UploadFileAttachmentEmailTicket",
            data: data,
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());
            Preview_AttachmentTicketUpload();

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
$('#composefiles').change(function () {
    var filename = $('#composefiles').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    }
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='composefiles']", function (e) {
    $(".hiddenX").show();

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        if ($("#ComposeETO").val() == "") {
            swal(
                '',
                'To is empty',
                'info'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }
        if ($("#ComposeESUBJECT").val() == "") {
            swal(
                '',
                'Subject is empty',
                'info'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }
        var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData();
        if (TrxBodyCompose == "") {
            swal(
                '',
                'Body is empty',
                'info'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }
        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 5) {
            swal(
                '',
                'Please upload file less than 5 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "pdf" || fileextension == "png" || fileextension == "doc" || fileextension == "docx" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg") {

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
        data.append("Username", $("#hd_sessionLogin").val());
        data.append("Emailid", "");

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrmMailSystem.asmx/UploadFile",
            data: data,
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());
            Preview_AttachmentComposeEmail();

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
function Preview_AttachmentComposeEmail() {
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '0', TrxEvent: 'TrmAttachmentEmailCompose', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultPreviewComposeEmail = "";

            $('#ComposeTicketAttachment').empty();
            for (i = 0; i < json.length; i++) {

                var color = ""
                if (json[i].FileType == "doc") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == "docx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == "pdf" || json[i].FileType == ".pdf") {
                    var FileTypes = "file";
                    color = "danger"
                }
                else if (json[i].FileType == "xls") {
                    var FileTypes = "file";
                    color = "success"
                }
                else if (json[i].FileType == "xlsx") {
                    var FileTypes = "file";
                    color = "success"
                }
                else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "JPG" || json[i].FileType == "jpeg" || json[i].FileType == "JPEG" || json[i].FileType == "gif" || json[i].FileType == "GIF" || json[i].FileType == "BMP" || json[i].FileType == "bmp") {
                    var FileTypes = "image";
                    color = "warning"
                }
                ResultPreviewComposeEmail = '<div class="card border shadow-none mb-2">' +
                    '<div class="p-2">' +
                    '<div class="d-flex">' +
                    '<div class="avatar-sm align-self-center me-2">' +
                    '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                    '<i class="fas fa-' + FileTypes + '"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="overflow-hidden me-auto">' +
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].FILENAME.substring(0, 10) + '</h5>' +
                    '<a href=' + FileOutboxHTML + '/' + json[i].URL + ' target="_blank" class="text-body">' +
                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=deleteAttachmentCompose(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#ComposeTicketAttachment').append(ResultPreviewComposeEmail)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function deleteAttachmentCompose(DeleteID) {
    if (DeleteID == '') {
        swal(
            '',
            'Attachment is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
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
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Attachment Has Been Success',
                                    'success'
                                ).then(function () {
                                    Preview_AttachmentComposeEmail()
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Attachment Has Been Failed !',
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
function FormLoadChannelCustomer(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    var ResultCustomerChannel = "";
    $.ajax({
        type: "POST",
        url: "asmx/ServiceCustomer.asmx/ChannelCustomer",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxSearching: 'Channel', TrxAction: 'Channel'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_CustomerChannel').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].FlagChannel === "Email") {
                    var icon = "<i class='bx bx-envelope'></i>"
                    var color = "warning"
                } else if (json[i].FlagChannel === "Voice" || json[i].FlagChannel === "Voip") {
                    var icon = "<i class='bx bx-phone-incoming'></i>"
                    var color = "danger"
                } else if (json[i].FlagChannel === "Whatsapp") {
                    var icon = "<i class='bx bxl-whatsapp'></i>"
                    var color = "success"
                } else if (json[i].FlagChannel === "Facebook") {
                    var icon = "<i class='bx bxl-facebook'></i>"
                    var color = "primary"
                } else if (json[i].FlagChannel === "Twitter") {
                    var icon = "<i class='bx bxl-twitter'></i>"
                    var color = "primary"
                } else if (json[i].FlagChannel === "Instagram") {
                    var icon = "<i class='bx bxl-instagram'></i>"
                    var color = "primary"
                } else {
                    var icon = "<i class='bx bx-phone-incoming'></i>"
                }
                ResultCustomerChannel = '<div class="col-xl-3 col-sm-3">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-' + color + ' text-light">' + icon + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="font-size-15 mb-1 text-truncate"><a href="#" class="text-dark">' + json[i].ValueChannel + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' + json[i].FlagChannel + '</p>' +
                    '</div>' +
                    '<div class="dropdown">' +
                    '<a class="btn btn-light btn-sm dropdown-toggle" href="#" role="button"' +
                    'data-bs-toggle="dropdown" aria-haspopup="true">' +
                    '<i class="fa fas fa-ellipsis-h"></i>' +
                    '</a>' +
                    '<ul class="dropdown-menu dropdown-menu-end">' +
                    '<li><a class="dropdown-item" href="#" onclick=TambahChannel()>Add</a></li>' +
                    '<li><a class="dropdown-item" href="#" onclick=UpdateChannel(' + json[i].ID + ')>Edit</a></li>' +
                    '<li><a class="dropdown-item" href="#" onclick=DeleteChannel(' + json[i].ID + ')>Delete</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#Div_CustomerChannel').append(ResultCustomerChannel)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function PreviewDataCustomer() {
    $('.tab').removeClass('active');
    $('.tab-content').removeClass('active');
    $("#DivObjectCustomer").show();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $("#ContentPlaceHolder1_TrxPerusahaanID").val(json[i].GroupID)
                $("#AddCustomer_Name").val(json[i].Name)
                $("#AddCustomer_NIK").val(json[i].NIK)
                $("#AddCustomer_Type").find("option:selected").text();
                $("#AddCustomer_Type").val(json[i].CompID);
                $("#AddCustomer_NamaPerusahaan").val(json[i].Nama_Perusahaan)
                $("#AddCustomer_NPWP").val(json[i].NPWP)
                $("#AddCustomer_Email").val(json[i].Email)
                $("#AddCustomer_HP").val(json[i].HP)
                $("#AddCustomer_Facebook").val(json[i].Facebook)
                $("#AddCustomer_Instagram").val(json[i].Instagram)
                $("#AddCustomer_Twitter").val(json[i].Twitter)
                $("#Perusahaan_Nama").val(json[i].Nama_Perusahaan)
                $("#Perusahaan_NPWP").val(json[i].NPWP)
                $("#AddPerusahaan_Type").find("option:selected").text();
                $("#AddPerusahaan_Type").val(json[i].CompID);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $('#AddCustomer_NamaPerusahaan').attr("disabled", false);
    $('#AddCustomer_NPWP').attr("disabled", false);
    $('#AddCustomer_Email').attr("disabled", false);
    $('#AddCustomer_HP').attr("disabled", false);
    $('#AddCustomer_Facebook').attr("disabled", false);
    $('#AddCustomer_Instagram').attr("disabled", false);
    $('#AddCustomer_Twitter').attr("disabled", false);
    $("#SimpanCustomer").hide();
    $("#UpdateCustomer").show();
    $("#SimpanPerusahaan").hide();
    $("#UpdatePerusahaan").show();
    FormLoadChannelCustomer($("#ContentPlaceHolder1_TrxCustomerID").val());
}
function ActionSimpanChannel() {
    if ($("#ContentPlaceHolder1_CustomerID").val() == "") {
        swal(
            '',
            'Customer Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ValueChannel").val() == "") {
        swal(
            '',
            'Channel Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AddComboChannel").val() == "") {
        swal(
            '',
            'Type Channel Empty',
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
                    ID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxCustomerID: $("#ContentPlaceHolder1_CustomerID").val(),
                    TrxChannelValue: $("#ValueChannel").val(), TrxChannelType: $("#AddComboChannel").val(), Action: "INSERT"
                });
                $.ajax({
                    url: "asmx/Crm_Trx_Ticket.asmx/InsertChannelCustomer",
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
                                    'Insert Channel Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#ContactChannel").modal('hide');
                                });
                                FormLoadChannelCustomer($("#ContentPlaceHolder1_CustomerID").val())
                            } else {
                                swal(
                                    '',
                                    'Insert Channel Has Been Failed',
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
function ActionUpdateChannel() {
    if ($("#ContentPlaceHolder1_CustomerID").val() == "") {
        swal(
            '',
            'Customer Empty',
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
                    ID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxCustomerID: $("#ContentPlaceHolder1_CustomerID").val(),
                    TrxChannelValue: $("#ValueChannel").val(), TrxChannelType: $("#AddComboChannel").val(), Action: "UPDATE"
                });
                $.ajax({
                    url: "asmx/Crm_Trx_Ticket.asmx/InsertChannelCustomer",
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
                                    'Update Channel Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#ContactChannel").modal('hide');
                                });
                                FormLoadChannelCustomer($("#ContentPlaceHolder1_CustomerID").val())
                            } else {
                                swal(
                                    '',
                                    'Update Channel Has Been Failed',
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
function ActionDeleteChannel() {
    if ($("#ContentPlaceHolder1_CustomerID").val() == "") {
        swal(
            '',
            'Customer Empty',
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
                    ID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxCustomerID: $("#ContentPlaceHolder1_CustomerID").val(),
                    TrxChannelValue: $("#ValueChannel").val(), TrxChannelType: $("#AddComboChannel").val(), Action: "DELETE"
                });
                $.ajax({
                    url: "asmx/Crm_Trx_Ticket.asmx/InsertChannelCustomer",
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
                                    'Delete Channel Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#ContactChannel").modal('hide');
                                });
                                FormLoadChannelCustomer($("#ContentPlaceHolder1_CustomerID").val())
                            } else {
                                swal(
                                    '',
                                    'Delete Channel Has Been Failed',
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
function ChannelSelected(ParamID) {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + ParamID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK130'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $("#ValueChannel").val(json[i].ValueChannel)
                $("#AddComboChannel").val(json[i].FlagChannel)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TambahChannel() {
    $("#ContactChannel").modal('show');
    $("#SimpanChannel").show()
    $("#UpdateChannel").hide()
    $("#DeleteChannel").hide()
    $("#ValueChannel").val("")
    $("#AddComboChannel").val("")
}
function UpdateChannel(ParamID) {
    $("#ContentPlaceHolder1_TrxID").val(ParamID)
    $("#ContactChannel").modal('show');
    $("#SimpanChannel").hide()
    $("#UpdateChannel").show()
    $("#DeleteChannel").hide()
    ChannelSelected($("#ContentPlaceHolder1_TrxID").val())
}
function DeleteChannel(ParamID) {
    $("#ContentPlaceHolder1_TrxID").val(ParamID)
    $("#ContactChannel").modal('show');
    $("#SimpanChannel").hide()
    $("#UpdateChannel").hide()
    $("#DeleteChannel").show()
    ChannelSelected($("#ContentPlaceHolder1_TrxID").val())
}
function DisplayPerusahaan() {
    $("#DivObjectPerusahaan").show();
    var tab = new bootstrap.Tab(document.querySelector('a[href="#navtabs2-perusahaan"]'));
    tab.show();
}
function Proses_CancelCustomer() {
    $("#DivObjectCustomer").hide();
}
function Proses_UpdatePerusahaan() {
    if ($("#Perusahaan_Nama").val() == "") {
        swal(
            '',
            'Name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AddPerusahaan_Type").val() == "") {
        swal(
            '',
            'Type is empty',
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
                    TrxID: $("#ContentPlaceHolder1_TrxPerusahaanID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Perusahaan_Nama").val(),
                    TrxEmail: $("#AddPerusahaan_Type").val(), TrxTelepon: "-", TrxNPWP: $("#Perusahaan_NPWP").val(), TrxAction: "UPDATE"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/BRA_Perusahaan",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Perusahaan Has Been Success',
                                    'success'
                                ).then(function () {
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Perusahaan Has Been Failed !',
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
                    }
                })

            }
        })
    $("#SimpanPerusahaan").hide();
}
function DisableObjectTicket() {
    $('#Form_Ticket_Priority').attr("disabled", true);
    $('#Form_Ticket_Subject').attr("disabled", true);
    $('#Form_Ticket_Kategori').attr("disabled", true);
    $('#Form_Ticket_NoAju').attr("disabled", true);
    $('#Form_Ticket_Kantor').attr("disabled", true);
    $('#Form_Ticket_SubKategori').attr("disabled", true);
    $('#Form_Ticket_NilaiTransaksi').attr("disabled", true);
    $('#Form_Ticket_Action').attr("disabled", true);
    $('#Form_Ticket_Email_Tujuan').attr("disabled", false);
    $('#Form_Ticket_Email_Subject').attr("disabled", false);
    $('#Form_Ticket_Email_CC').attr("disabled", false);
    //$('#Ticket_NoteAgent').attr("disabled", true);
}
function saveDinamic(form_data) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/CreateDataContact",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            var json = JSON.parse(data.d.Result);

            if (json.Success == true) {
                var contactId = json.Datas[0].ContactId;
                saveDb(contactId);
            } else {
                swal(
                    '',
                    'Insert Customer Dynamic Has Been Failed !',
                    'error'
                ).then(function () {
                    saveDb("0");
                });
                return false;
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        },

    })
}
function saveDb(contactId) {
    var form_data = JSON.stringify({
        TrxUsername: $("#hd_sessionLogin").val(), TrxCusTomerName: $("#AddCustomer_Name").val(), TrxCusTomerEmail: $("#AddCustomer_Email").val(),
        TrxCusTomerPhone: $("#AddCustomer_HP").val(), TrxCusTomerType: $("#AddCustomer_Type").val(), TrxCusTomerPerusahaan: $("#AddCustomer_NamaPerusahaan").val(),
        TrxCusTomerNIK: "0", TrxCusTomerAlamat: $("#AddCustomer_Alamat").val(), TrxFacebook: $("#AddCustomer_Facebook").val(),
        TrxInstagram: $("#AddCustomer_Instagram").val(), TrxTwitter: $("#AddCustomer_Twitter").val(), TrxNPWP: $("#AddCustomer_NPWP").val(), ContactId: contactId,
        AccountID: $("#ContentPlaceHolder1_DynamicEmailAccountID").val()
    });
    $.ajax({
        type: "POST",
        url: "asmx/ServiceCustomer.asmx/BRA_Customer",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";
            var tblTickets = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {
                    Customer_Load(json[i].CustomerID)
                    swal(
                        '',
                        'Insert Customer Has Been Success',
                        'success'
                    ).then(function () {
                        $("#DivObjectCustomer").hide();
                    });
                } else {
                    swal(
                        '',
                        'Insert Customer Has Been Failed !',
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
    })
}
function SaveToDynamic(form_data) {
    $.ajax({
        url: 'WebServiceGetDataMaster.asmx/SendTicketDataAsync', // Replace with your API endpoint URL
        type: 'POST',
        contentType: 'application/json',
        data: form_data,
        success: function (data) {
            var json = JSON.parse(data.d.Result);
            var i, x = "";
            var tblTickets = "";

            if (json.Success == true) {
                //var TicketMsDynamic = json.Datas[0].TicketDynamic;
                //UpdateTicketDynamic(TicketMsDynamic);
                swal(
                    '',
                    'Eskalasi To Dynamic Has Been Success',
                    'success'
                ).then(function () {
                    location.href = "Crm_Trm_Inbox_EmailSystem.aspx?"
                });
            } else {
                swal(
                    '',
                    'Eskalasi To Dynamic Has Been Failed !',
                    'error'
                ).then(function () {
                    return false;
                });
                return false;
            }

        },
        error: function (xhr, status, error) {
            console.error('Error:', status, error);
        }
    });
}
function savePerusahaanDynamic(form_data) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/CreateDataAccount",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            var json = JSON.parse(data.d.Result);
            var i, x = "";
            var tblTickets = "";


            if (json.Success == true) {
                var AccountId = json.Datas[0].AccountId;
                $("#ContentPlaceHolder1_DynamicEmailAccountID").val(AccountId)
                savePerusahaanCrm(AccountId);
            } else {
                swal(
                    '',
                    'Insert Customer Dynamic Has Been Failed !',
                    'error'
                ).then(function () {
                    savePerusahaanCrm("0");
                });
                return false;
            }


        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function savePerusahaanCrm(accountId) {
    var form_data = JSON.stringify({
        TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Perusahaan_Nama").val(), TrxEmail: $("#AddPerusahaan_Type").val(),
        TrxTelepon: "-", TrxNPWP: $("#Perusahaan_NPWP").val(), TrxAction: "INSERT", AccountId: accountId
    });
    $.ajax({
        type: "POST",
        url: "asmx/ServiceCustomer.asmx/BRA_Perusahaan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";
            var tblTickets = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {
                    if (json[i].msgSystem == "InsertSuccess") {
                        swal(
                            '',
                            'Insert Perusahaan Has Been Success',
                            'success'
                        ).then(function () {
                            $("#AddCustomer_NamaPerusahaan").val($("#Perusahaan_Nama").val())
                            $("#DivObjectCustomer").show();
                        });
                    } else {
                        swal(
                            '',
                            'Data Perusahaan/Pemerintah Duplicate',
                            'error'
                        ).then(function () {
                            return false;
                        });
                        return false;
                    }
                } else {
                    swal(
                        '',
                        'Insert Perusahaan Has Been Failed !',
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
        }
    })
}
function SearchingNamaCustomer(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK224'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_CustomerSearchingPIC').empty();
            var closeButton = '</br><a href="#" class="btn btn-soft-danger btn-sm" onclick="closeDivPIC()" style="margin-top:-25px;">Close</a>';
            $('#Div_CustomerSearchingPIC').append(closeButton);
            for (i = 0; i < json.length; i++) {

                if (json[i].HP == "" || json[i].HP == null) {
                    var NomorHP = "-"
                } else {
                    var NomorHP = json[i].HP
                }
                if (json[i].Email == "" || json[i].Email == null) {
                    var EmailAddress = "-"
                } else {
                    var EmailAddress = json[i].Email
                }
                ResultCustomerSearchingPIC = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="PIC_Selected(' + json[i].CustomerID + ')">' +
                    '<li class="active">' +
                    '<a href="#">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].Name.substr(0, 1).toUpperCase() + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="text-truncate font-size-14 mb-1">' + json[i].Name + '</h5>' +
                    '<p class="text-truncate mb-0">' + NomorHP + '</p>' +
                    '<p class="text-truncate mb-0">' + EmailAddress + '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0">' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
                $('#Div_CustomerSearchingPIC').append(ResultCustomerSearchingPIC)

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SaveClose() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Session is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_CustomerID").val() == "") {
        swal(
            '',
            'Customer is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ChannelAccount = $("#ContentPlaceHolder1_TrxEmailAccount").val()
    var ChannelIncoming = "Email";
    var StatusTicket;
    var Posisi;
    //if ($("#HD_SiteID").val() == "1") {
    //    if ($("#Form_Ticket_Action").val() == "") {
    //        swal(
    //            '',
    //            'Action is empty',
    //            'info'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    } else {
    //        if ($('#Form_Ticket_Action').val() == 2) {
    //            StatusTicket = "Closed"
    //            Posisi = "1";
    //        }
    //        if ($('#Form_Ticket_Action').val() == 1) {
    //            StatusTicket = "Open";
    //            Posisi = "1";
    //        }
    //        if ($('#Form_Ticket_Action').val() == 3) {
    //            StatusTicket = "Pending";
    //            Posisi = "2";
    //        }
    //    }
    //} else {
    //    StatusTicket = "Closed"
    //    Posisi = "1";
    //}
    if ($("#Form_Ticket_Priority").val() == '') {
        swal(
            '',
            'Priority is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Kategori").val() == '') {
        swal(
            '',
            'Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_SubKategori").val() == '') {
        swal(
            '',
            'Sub Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Kantor").val() == '') {
        swal(
            '',
            'Kantor is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Subject").val() == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var NoteAgent = CKEDITOR.instances.Ticket_NoteAgent.getData();
    if (NoteAgent == '') {
        swal(
            '',
            'Jawaban is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_DynamicEmailAccountID").val() == "") {
        var DynamicAccountID = "0"
    } else {
        var DynamicAccountID = $("#ContentPlaceHolder1_DynamicEmailAccountID").val()
    }
    if ($('#Form_Ticket_Action').val() == 3) {
        var messageaction = "Pastikan Kantor Sudah terdaftar pada Applikasi CRM Dynamic"
    } else {
        var messageaction = "Do you want to process?"
    }
    swal({
        title: "" + messageaction + "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    GenesysNumber: $("#ContentPlaceHolder1_TrxID").val(), ThreadID: "", Account: ChannelAccount, Channel: ChannelIncoming,
                    CustomerID: $("#ContentPlaceHolder1_CustomerID").val(), UserName: $("#hd_sessionLogin").val(), Priority: $("#Form_Ticket_Priority").val(), Status: "Closed", Subject: $("#Form_Ticket_Subject").val(),
                    Kategori: $("#Form_Ticket_Kategori").val(), SubKategori: $("#Form_Ticket_SubKategori").val(), NoAju: $("#Form_Ticket_NoAju").val(), Kantor: $("#Form_Ticket_Kantor").val(), NilaiTransaksi: $("#Form_Ticket_NilaiTransaksi").val(),
                    Pertanyaan: NoteAgent, Jawaban: NoteAgent, Posisi: "1", Tujuan: $("#Form_Ticket_Email_Tujuan").val(), Cc: $("#Form_Ticket_Email_CC").val(), Action: "INSERT"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_CreateTicketEmail",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                $("#ContentPlaceHolder1_TrxTicketNumber").val(json[i].TrxTicketNumber)
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_Inbox_EmailSystem.aspx?"
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
                    }
                })

            }
        })
}
function ConvertToCase() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Session is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_CustomerID").val() == "") {
        swal(
            '',
            'Customer is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ChannelAccount = $("#ContentPlaceHolder1_TrxEmailAccount").val()
    var ChannelIncoming = "Email";
    var StatusTicket;
    var Posisi;
    if ($("#HD_SiteID").val() == "1") {
        if ($("#Form_Ticket_Action").val() == "") {
            swal(
                '',
                'Action is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        } else {
            if ($('#Form_Ticket_Action').val() == 2) {
                StatusTicket = "Closed"
                Posisi = "1";
            }
            if ($('#Form_Ticket_Action').val() == 1) {
                StatusTicket = "Open";
                Posisi = "1";
            }
            if ($('#Form_Ticket_Action').val() == 3) {
                StatusTicket = "Pending";
                Posisi = "2";
            }
        }
    } else {
        StatusTicket = "Closed"
        Posisi = "1";
    }
    if ($("#Form_Ticket_Priority").val() == '') {
        swal(
            '',
            'Priority is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Kategori").val() == '') {
        swal(
            '',
            'Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_SubKategori").val() == '') {
        swal(
            '',
            'Sub Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Kantor").val() == '') {
        swal(
            '',
            'Kantor is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Subject").val() == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var NoteAgent = CKEDITOR.instances.Ticket_NoteAgent.getData();
    if (NoteAgent == '') {
        swal(
            '',
            'Jawaban is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_DynamicEmailAccountID").val() == "") {
        var DynamicAccountID = "0"
    } else {
        var DynamicAccountID = $("#ContentPlaceHolder1_DynamicEmailAccountID").val()
    }
    if ($('#Form_Ticket_Action').val() == 3) {
        var messageaction = "Pastikan Kantor Sudah terdaftar pada Applikasi CRM Dynamic"
    } else {
        var messageaction = "Do you want to process?"
    }
    swal({
        title: "" + messageaction + "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    GenesysNumber: $("#ContentPlaceHolder1_TrxID").val(), ThreadID: "", Account: ChannelAccount, Channel: ChannelIncoming,
                    CustomerID: $("#ContentPlaceHolder1_CustomerID").val(), UserName: $("#hd_sessionLogin").val(), Priority: $("#Form_Ticket_Priority").val(), Status: "Pending", Subject: $("#Form_Ticket_Subject").val(),
                    Kategori: $("#Form_Ticket_Kategori").val(), SubKategori: $("#Form_Ticket_SubKategori").val(), NoAju: $("#Form_Ticket_NoAju").val(), Kantor: $("#Form_Ticket_Kantor").val(), NilaiTransaksi: $("#Form_Ticket_NilaiTransaksi").val(),
                    Pertanyaan: NoteAgent, Jawaban: NoteAgent, Posisi: "2", Tujuan: $("#Form_Ticket_Email_Tujuan").val(), Cc: $("#Form_Ticket_Email_CC").val(), Action: "INSERT"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_CreateTicketEmail",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                $("#ContentPlaceHolder1_TrxTicketNumber").val(json[i].TrxTicketNumber)
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    if ($('#Form_Ticket_Action').val() == 3) {

                                        var form_data_dinamic = JSON.stringify({
                                            NamaKantor: $("#Form_Ticket_Kantor").val()
                                            , NamaKategory: $('#Form_Ticket_Kategori').find('option:selected').text()
                                            , NamaSubCategory: $('#Form_Ticket_SubKategori').find('option:selected').text()
                                            , AccountId: DynamicAccountID
                                            , ContactId: $("#ContentPlaceHolder1_DynamicEmailContactID").val()
                                            , Origin: "Email"
                                            , Priority: $("#Form_Ticket_Priority").val()
                                            , Judul: $("#Form_Ticket_Subject").val()
                                            , NoTicket: $("#ContentPlaceHolder1_TrxTicketNumber").val()
                                            , description: NoteAgent
                                        });
                                        SaveToDynamic(form_data_dinamic);

                                    } else {
                                        location.href = "Crm_Trm_Inbox_EmailSystem.aspx?"
                                    }
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
                    }
                })

            }
        })
}
function SendToLeader() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Session is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_CustomerID").val() == "") {
        swal(
            '',
            'Customer is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ChannelAccount = $("#ContentPlaceHolder1_TrxEmailAccount").val()
    var ChannelIncoming = "Email";
    var StatusTicket;
    var Posisi;
    if ($("#Form_Ticket_Priority").val() == '') {
        swal(
            '',
            'Priority is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Kategori").val() == '') {
        swal(
            '',
            'Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_SubKategori").val() == '') {
        swal(
            '',
            'Sub Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Kantor").val() == '') {
        swal(
            '',
            'Kantor is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Ticket_Subject").val() == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var NoteAgent = CKEDITOR.instances.Ticket_NoteAgent.getData();
    if (NoteAgent == '') {
        swal(
            '',
            'Jawaban is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_DynamicEmailAccountID").val() == "") {
        var DynamicAccountID = "0"
    } else {
        var DynamicAccountID = $("#ContentPlaceHolder1_DynamicEmailAccountID").val()
    }
    if ($('#Form_Ticket_Action').val() == 3) {
        var messageaction = "Pastikan Kantor Sudah terdaftar pada Applikasi CRM Dynamic"
    } else {
        var messageaction = "Do you want to process?"
    }
    swal({
        title: "" + messageaction + "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    GenesysNumber: $("#ContentPlaceHolder1_TrxID").val(), ThreadID: "", Account: ChannelAccount, Channel: ChannelIncoming,
                    CustomerID: $("#ContentPlaceHolder1_CustomerID").val(), UserName: $("#hd_sessionLogin").val(), Priority: $("#Form_Ticket_Priority").val(), Status: "Open", Subject: $("#Form_Ticket_Subject").val(),
                    Kategori: $("#Form_Ticket_Kategori").val(), SubKategori: $("#Form_Ticket_SubKategori").val(), NoAju: $("#Form_Ticket_NoAju").val(), Kantor: $("#Form_Ticket_Kantor").val(), NilaiTransaksi: $("#Form_Ticket_NilaiTransaksi").val(),
                    Pertanyaan: NoteAgent, Jawaban: NoteAgent, Posisi: "1", Tujuan: $("#Form_Ticket_Email_Tujuan").val(), Cc: $("#Form_Ticket_Email_CC").val(), Action: "INSERT"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_CreateTicketEmail",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                $("#ContentPlaceHolder1_TrxTicketNumber").val(json[i].TrxTicketNumber)
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_Inbox_EmailSystem.aspx?"
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
                    }
                })

            }
        })
}
function FollowUp() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK342'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCustomer = "";

            if (json.length === 0) {
                swal(
                    '',
                    'Ticket is empty',
                    'info'
                ).then(function () {
                    return false;
                });
                return false;
            } else {
                $("#modal-followup").modal('show');
                DropdownTicketFollowup();
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function EmailConversation() {
    $("#popupemail").modal('show');
    EmailConversationNew($("#ContentPlaceHolder1_TrxID").val());
}
async function EmailConversationNew(refID) {
    $("#Div_Conversation").show();
    const fileInboxHTML = `${IPSERVER}/FileEmail/Inbox`;
    const fileOutboxHTML = `${IPSERVER}/FileEmail/Outbox`;
    const messageDiv = $('#Journeymailconversationnew');

    messageDiv.empty();

    try {
        //const refID = 'ReplyID-085339938'; // You might want to pass this as an argument too
        const refID = $("#ContentPlaceHolder1_TrxID").val();
        const conversationsResponse = await $.ajax({
            type: "POST",
            url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailConversation",
            data: JSON.stringify({
                RefID: refID,
                UserName: $("#hd_sessionLogin").val(),
                Action: 'SELECT'
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
        const conversations = JSON.parse(conversationsResponse.d || conversationsResponse);
        if (!conversations || conversations.length === 0) {
            messageDiv.html("<p>No conversations found.</p>");
            return; // Exit early
        }

        for (const conversation of conversations) {
            const emailId = conversation.EMAIL_ID;
            const direction = conversation.DIRECTION;

            // Format the date
            const formattedDate = formatDate(conversation.DateNya);
            const attachments = await fetchEmailAttachments(refID, emailId, direction);
            const result = `
             <div class='email-wrapper'>
                 <div class='email-container email-${direction === 'IN' ? 'left' : 'right'}'>
                     <div class='email-card'>
                         <div class='email-header'>
                             <span class='email-title'>${conversation.EFROM}</span>
                             <span class='email-date'>${formattedDate}</span>
                         </div>
                         <div class='email-subject'>
                             <strong>${conversation.ESUBJECT}</strong>
                         </div>
                         <div class='email-body'>
                             <p>${conversation.EBODY_HTML}</p>
                         </div>
                         <div class='divider'></div>
                         <div class='email-footer'>
                             <ul class='email-attachments'>${attachments}</ul>
                             <div class='email-signature'>
                                 <p>Salam,</p>
                                 <p><strong>${conversation.EFROM}</strong></p>
                                 <img src='../images/signature.png' alt='Company Logo' class='company-logo'>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>`;

            messageDiv.append(result);
        }
    } catch (error) {
        console.error("Error loading conversation:", error);
        messageDiv.html("<p>Error loading conversation. Please try again later.</p>");
    }
}
function formatDate(dateString) {
    const timestamp = parseInt(dateString.match(/\/Date\((\d+)\)\//)[1], 10);
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
async function fetchEmailAttachments(refID, emailId, direction) {
    const fileInboxHTML = `${IPSERVER}/FileEmail/Inbox`;
    const fileOutboxHTML = `${IPSERVER}/FileEmail/Outbox`;

    try {
        const attachmentsResponse = await $.ajax({
            type: "POST",
            url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailAttachment",
            data: JSON.stringify({
                RefID: refID,
                EmailID: emailId,
                Direction: 'ALL',
                UserName: $("#hd_sessionLogin").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        const attachments = JSON.parse(attachmentsResponse.d || attachmentsResponse);
        let attachmentHtml = '';

        console.log("Fetched Attachments:", attachments);

        const filteredAttachments = attachments.filter(attachment => {
            const attachmentDirection = attachment.DIRECTION ? attachment.DIRECTION.trim().toUpperCase() : '';
            const targetDirection = direction ? direction.trim().toUpperCase() : '';
            return attachmentDirection === targetDirection;
        });

        console.log("Filtered Attachments:", filteredAttachments);

        filteredAttachments.forEach(attachment => {
            const fileUrl = attachment.DIRECTION === 'IN' ? fileInboxHTML : fileOutboxHTML;
            const iconClass = attachment.FILETYPE === 'png' ? 'image-o' : 'pdf-o';

            attachmentHtml += `
                <li>
                    <div class='mailbox-attachment-info'>
                        <span class='mailbox-attachment-icon'><i class='fa fa-file-${iconClass}'></i></span>
                        <button class='btn btn-primary btn-sm'>
                            <a href='${fileUrl}/${attachment.URL}' class='mailbox-attachment-name text-white' target='_blank'>
                                <i class='fa fa-download'></i> ${attachment.FILENAME}
                            </a>
                        </button>
                    </div>
                </li>`;
        });

        return attachmentHtml || "<li>No attachments found.</li>";
    } catch (error) {
        console.error("Error fetching attachments:", error);
        return "<li>No attachments found.</li>";
    }
}
function FilterDateEmailArchieve() {
    $("#addContactModalFilterDateArchieve").modal('show');
}
function FilterDateEmailSendingEmail() {
    $("#addContactModalFilterDateSendingEmail").modal('show');
}
function ActionFilterDateArchieve() {
    var startDate = document.getElementById('startdate').value;
    var endDate = document.getElementById('enddate').value;
    if (!startDate || !endDate) {
        dateError.style.display = 'block';
        dateError.innerHTML = 'Please select both Start Date and End Date.';
        return false;
    }

    var start = new Date(startDate);
    var end = new Date(endDate);

    if (start > end) {
        dateError.style.display = 'block';
        dateError.innerHTML = 'End Date cannot be earlier than Start Date.';
        return false;
    }

    var differenceInTime = end.getTime() - start.getTime();
    var differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays > 30) {
        dateError.style.display = 'block';
        dateError.innerHTML = 'End Date cannot be more than 30 days from the Start Date.';
        return false;
    }
    var myTable = $('#TableIncomingEmail').DataTable(
        {
            "order": [[3, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdownFilter",
        data: "{ID:'0', Param: '0', StartDate: '" + $("#startdate").val() + "', Enddate: '" + $("#enddate").val() + "', UserName: '" + $("#hd_sessionLogin").val() + "', Action: 'Uidesk1002'}",
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

                if (json[i].Reading == 0 || json[i].Reading == null) {
                    var EFROM = "<a href='#'  onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].EFROM.substring(0, 40) + "..</b></a>"
                    var subject = "<a href='#'  onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].ESUBJECT.substring(0, 25) + "..</b></a>"
                    var DateRead = "<a href='#'  onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                } else {
                    var EFROM = "<a href='#' onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].EFROM.substring(0, 40) + "..</a>"
                    var subject = "<a href='#' onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                    var DateRead = "<a href='#' onclick=Click_ReadingArchieve('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + newDate + ' ' + newTime + "</a>"
                }
                myTable.row.add([EFROM, subject, "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].DIRECTION + "</span>", DateRead]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#addContactModalFilterDateArchieve").modal('hide');
}
function ActionFilterDateSendingEmail() {
    var startDate = document.getElementById('startdateSendingEmail').value;
    var endDate = document.getElementById('enddateSendingEmail').value;
    if (!startDate || !endDate) {
        dateError.style.display = 'block';
        dateError.innerHTML = 'Please select both Start Date and End Date.';
        return false;
    }

    var start = new Date(startDate);
    var end = new Date(endDate);

    if (start > end) {
        dateError.style.display = 'block';
        dateError.innerHTML = 'End Date cannot be earlier than Start Date.';
        return false;
    }

    var differenceInTime = end.getTime() - start.getTime();
    var differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays > 30) {
        dateError.style.display = 'block';
        dateError.innerHTML = 'End Date cannot be more than 30 days from the Start Date.';
        return false;
    }
    var myTable = $('#TableOutgoingSendingEmail').DataTable(
        {
            "order": [[2, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdownFilter",
        data: "{ID:'0', Param: '0', StartDate: '" + $("#startdateSendingEmail").val() + "', Enddate: '" + $("#enddateSendingEmail").val() + "', UserName: '" + $("#hd_sessionLogin").val() + "', Action: 'Uidesk1001'}",
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

                if ($("#HD_SiteID").val() == "1") {
                    var TujuanNya = json[i].PICTujuanNya;
                } else {
                    var TujuanNya = json[i].AgentNya;
                }
                var EFROM = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ETO.substring(0, 40) + "</a>"
                var subject = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ESUBJECT + "</a>"
                var DateRead = "<a href='#'  onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + newDate + ' ' + newTime + "</a>"
                myTable.row.add([EFROM, subject, TujuanNya, DateRead]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#addContactModalFilterDateSendingEmail").modal('hide');
}
function clearFormFields() {
    // Reset all input fields
    document.getElementById('startdateSendingEmail').value = '';
    document.getElementById('enddateSendingEmail').value = '';
    document.getElementById('startdate').value = '';
    document.getElementById('enddate').value = '';
    document.getElementById('AccountEmail').value = '';
    document.getElementById('agentSelect').selectedIndex = 0;

    // Hide all error messages
    document.getElementById('dateError').style.display = 'none';
    document.getElementById('dateErrorSendingEmail').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('agentError').style.display = 'none';
    document.getElementById('typeError').style.display = 'none';

    // Hide all conditional fields
    document.getElementById('dateFields').style.display = 'none';
    document.getElementById('endDateFields').style.display = 'none';
    document.getElementById('accountField').style.display = 'none';
    document.getElementById('agentField').style.display = 'none';
}
function Preview_OutboxEmail(PreviewID) {
    $("#footerButtonAction").show()
    var FileInboxHTML = "" + IPSERVER + "/FileEmail/INBOX"
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/OUTBOX"
    var UrlType = "2";
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


                    document.getElementById("Preview_FrameHTML3").src = "" + FileOutboxHTML + "/" + PreviewID + "/file.html"
                    Preview_AttachmentComposeEmail(PreviewID)

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
function Preview_OutboxEmailDetail(Type, PreviewID) {
    var FileInboxHTML = "" + IPSERVER + "/FileEmail/INBOX"
    var FileOutboxHTML = "" + IPSERVER + "/FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxEvent: 'OutboxSelected', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "", resultReplyBody = "", resultReplyBody1 = "", resultReplyBodyFinish = "";

            for (i = 0; i < json.length; i++) {

                $("#ComposeETO").val(json[i].EFROM)
                $("#ComposeESUBJECT").val(json[i].ESUBJECT)
                $("#ContentPlaceHolder1_TrxEmailID").val(json[i].EMAIL_ID);
                $("#ComposeECC").val(json[i].ECC)
                $("#ContentPlaceHolder1_ComposeType").val("2");

                $("#Form_Ticket_Subject").val(json[i].ESUBJECT)
                $("#ContentPlaceHolder1_TrxEmailID").val(json[i].EMAIL_ID);
                $("#Form_Ticket_Email_CC").val(json[i].ECC)
                if (Type == "1") {
                    $("#Form_Ticket_Email_Tujuan").val(json[i].EFROM)
                    $("#Form_Ticket_Email_Subject").val("RE: " + json[i].ESUBJECT)
                } else {
                    $("#Form_Ticket_Email_Tujuan").val("")
                    $("#Form_Ticket_Email_Subject").val("FWD: " + json[i].ESUBJECT)
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
function UpdateTicketDynamic(TicketDynamic) {
    var form_data = JSON.stringify({
        TicketUidesk: $("#ContentPlaceHolder1_TrxTicketNumber").val(), TicketDynamic: TicketDynamic
    });
    $.ajax({
        url: "asmx/Crm_Trx_Ticket.asmx/BRA_TicketDynamic",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            console.log("TicketUidesk " + form_data)

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
//function Click_ReadingEmail(IvcID, EmailID, EFROM) {
//    Clear_Object_Ticket();
//    $("#ContentPlaceHolder1_TrxID").val(IvcID)
//    $("#ContentPlaceHolder1_TrxEmailID").val(EmailID)
//    $("#ContentPlaceHolder1_TrxEmailAccount").val(EFROM)
//    $.ajax({
//        type: "POST",
//        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
//        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK177'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            var json = JSON.parse(data.d);
//            var i, x, result = "";

//            if (json.length > 0) {
//                for (i = 0; i < json.length; i++) {
//                    if (json[i].Status == "Closed") {
//                        $("#DivTableIncomingEmail").hide();
//                        Click_ReadingTicket(IvcID, EmailID, json[i].TicketNumber)
//                        $("#ButtonProsesUpdateEmail").hide();
//                    } else {
//                        $("#DivTableIncomingEmail").hide();
//                        Click_ReadingTicket(IvcID, EmailID, json[i].TicketNumber)
//                        $("#ButtonProsesUpdateEmail").show();
//                    }
//                }
//            } else {
//                $("#Profile_EmailCustomer").empty()
//                $("#Profile_EmailCustomer").append(EFROM)
//                $("#AddCustomer_Email").val(EFROM)
//                $('#AddCustomer_Email').attr("disabled", true);
//                Customer_Check(EFROM)
//                Preview_InboxEmail(EmailID)
//            }

//        },
//        error: function (xmlHttpRequest, textStatus, errorThrown) {
//            console.log(xmlHttpRequest.responseText);
//            console.log(textStatus);
//            console.log(errorThrown);
//        }
//    })
//}
