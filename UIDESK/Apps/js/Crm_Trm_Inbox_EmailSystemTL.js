$(document).ready(function () {
    Div_Disable()
    Summary_EmailCounting();
    DataListLoginAgent();
    Table_InboxEmail();
    DataListLoginTeamLeader();
    DropdownAgent();
    $('#Form_Ticket_Priority').prop('disabled', true);
});
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
            $("#ArchieveCount").empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].Folder == "Inbox") {
                    $("#InboxCount").append(json[i].Jumlah);
                } else if (json[i].Folder == "Draft") {
                    $("#DraftCount").append(json[i].Jumlah);
                } else if (json[i].Folder == "Sent") {
                    $("#SentMailCount").append(json[i].Jumlah);
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
    Clear_Object_Ticket();
    Div_Disable();
    $("#DivTableIncomingEmail").show();
    $("#DivTableOutgoingEmail").hide();
    Table_InboxEmail();
    setActive(document.getElementById('InboxClass'));
}
function OnclickDraft() {
    Clear_Object_Ticket();
    Div_Disable();
    $("#DivTableIncomingEmail").hide();
    $("#DivTableOutgoingEmail").show();
    Table_DraftEmail();
    setActive(document.getElementById('FolderDraft'));
}
function OnclickSendMail() {
    Clear_Object_Ticket();
    Div_Disable();
    $("#DivTableIncomingEmail").hide();
    $("#DivTableOutgoingEmail").show();
    Table_SendEmail();
    setActive(document.getElementById('FolderSendEmail'));
}
function OnclickArchieve() {
    Clear_Object_Ticket();
    Div_Disable();
    $("#DivTableIncomingEmail").show();
    $("#DivTableOutgoingEmail").hide();
    Table_ArchiveEmail();
    setActive(document.getElementById('FolderArchieve'));
}
function Table_InboxEmail() {
    var myTable = $('#TableIncomingEmail').DataTable(
        {
            "order": [[4, "desc"]]
        },
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
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                // Format time to 24-hour format with seconds
                var dateObj = new Date(milisegundos);
                var hours = dateObj.getHours().toString().padStart(2, '0');
                var minutes = dateObj.getMinutes().toString().padStart(2, '0');
                var seconds = dateObj.getSeconds().toString().padStart(2, '0');
                var newTime = `${hours}:${minutes}:${seconds}`;

                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=ModalAssign(' + json[i].IVC_ID + ')>Assign</a>' +
                    '</div>' +
                    '</div>'

                if (json[i].FLAG_HANDLING == "1") {
                    if (json[i].Status == "Pending" || json[i].Status == "Closed") {
                        var ResponseStatus = "<span class='badge rounded-pill badge-soft-success font-size-12'>Done</span>"
                    } else {
                        var ResponseStatus = "<span class='badge rounded-pill badge-soft-warning font-size-12'>On Progress</span>"
                    }
                } else {
                    var ResponseStatus = "<span class='badge rounded-pill badge-soft-danger font-size-12'>Not Response</span>"
                }
                if (json[i].Reading == 0 || json[i].Reading == null) {
                    var EFROM = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].EFROM.substring(0, 40) + "..</b></a>"
                    var subject = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].ESUBJECT.substring(0, 25) + "..</b></a>"
                    var DateRead = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                } else {
                    var EFROM = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].EFROM.substring(0, 40) + "..</a>"
                    var subject = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                    var DateRead = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + newDate + ' ' + newTime + "</a>"
                }
                //myTable.row.add([EFROM, subject, json[i].NameNya, json[i].TLNya, ResponseStatus, DateRead, urlclick]).draw(false);
                myTable.row.add([EFROM, subject, json[i].NameNya, ResponseStatus, DateRead, urlclick]).draw(false);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Table_DraftEmail() {
    var myTable = $('#TableOutgoingEmail').DataTable(
        {
            "order": [[4, "desc"]]
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

                if (json[i].Status == null) {
                    var StatusNya = "-"
                } else {
                    var StatusNya = json[i].Status
                }
                if (json[i].HANDLED == 0) {
                    var EFROM = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ETO.substring(0, 40) + "..</a>"
                    var subject = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ESUBJECT.substring(0, 100) + "..</a>"
                    var AgentName = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].NAME + "</a>"
                    var DateRead = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + newDate + ' ' + newTime + "</a>"
                } else {
                    var EFROM = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + json[i].ETO.substring(0, 40) + "..</b></a>"
                    var subject = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + json[i].ESUBJECT.substring(0, 100) + "..</b></a>"
                    var AgentName = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + json[i].NAME + "</a></b>"
                    var DateRead = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')><b>" + newDate + ' ' + newTime + "</a></b>"
                }
                myTable.row.add([EFROM, subject, json[i].NAME, json[i].TLNya, "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + StatusNya + "</span>", DateRead]).draw(false);

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
    var myTable = $('#TableOutgoingEmail').DataTable(
        {
            "order": [[4, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
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

                var EFROM = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ETO.substring(0, 40) + "..</a>"
                var subject = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                var DateRead = "<a href='#' onclick=Click_ReadingTicket('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].TicketNumber + "')>" + newDate + ' ' + newTime + "</a>"
                myTable.row.add([EFROM, subject, json[i].NameNya, json[i].TLNya, "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + json[i].Status + "</span>", DateRead]).draw(false);

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
                    var EFROM = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].EFROM.substring(0, 40) + "..</b></a>"
                    var subject = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + json[i].ESUBJECT.substring(0, 25) + "..</b></a>"
                    var DateRead = "<a href='#'  onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                } else {
                    var EFROM = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].EFROM.substring(0, 40) + "..</a>"
                    var subject = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                    var DateRead = "<a href='#' onclick=Click_ReadingEmail('" + json[i].IVC_ID + "','" + json[i].EMAIL_ID + "','" + json[i].EFROM + "')>" + newDate + ' ' + newTime + "</a>"
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
function Click_ReadingEmail(IvcID, EmailID, EFROM) {
    $("#ContentPlaceHolder1_TrxID").val(IvcID)
    $("#ContentPlaceHolder1_TrxEmailID").val(EmailID)
    $("#ContentPlaceHolder1_TrxEmailAccount").val(EFROM)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK177'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length > 0) {
                for (i = 0; i < json.length; i++) {
                    if (json[i].Status == "Closed") {
                        $("#DivTableIncomingEmail").hide();
                        Click_ReadingTicket(IvcID, EmailID, json[i].TicketNumber)
                        $("#ButtonProsesUpdateEmail").hide();
                    } else {
                        $("#DivTableIncomingEmail").hide();
                        Click_ReadingTicket(IvcID, EmailID, json[i].TicketNumber)
                        $("#ButtonProsesUpdateEmail").show();
                    }
                }
            } else {
                $("#Profile_EmailCustomer").empty()
                $("#Profile_EmailCustomer").append(EFROM)
                $("#AddCustomer_Email").val(EFROM)
                $('#AddCustomer_Email').attr("disabled", true);
                Customer_Check(EFROM)
                Preview_InboxEmail(EmailID)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Click_ReadingTicket(IvcID, EmailID, TicketNumber) {
    $("#ContentPlaceHolder1_TrxID").val(IvcID)
    $("#ContentPlaceHolder1_TrxTicketNumber").val(TicketNumber)
    //alert(IvcID)
    //alert(TicketNumber)
    $("#DivTableIncomingEmail").hide()
    $("#DivTableOutgoingEmail").hide()
    $("#DivObjectTicket").show();
    Preview_InboxEmail(EmailID)
    Email_JourneyEskalasi();
    Ticket_Detail();
    Preview_AttachmentTicket();
    //$("#DivJourneyReject").show();
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
                        $("#Profile_NamaCustomer").append("-")
                        //$("#DivObjectCustomer").show();
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
                $("#ContentPlaceHolder1_TrxEmailAccount").val(json[i].Email)
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

            $('#Div_Inbox_Attachment').empty();
            $('#Div_Inbox_AttachmentEmail').empty();
            for (i = 0; i < json.length; i++) {

                var color = ""
                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "file";
                    color = "primary"
                } else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "file";
                    color = "primary"
                } else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "file";
                    color = "danger"
                } else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "file";
                    color = "success"
                } else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "file";
                    color = "success"
                } else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "file";
                    color = "secondary"
                } else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "file";
                    color = "light"
                } else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "file";
                    color = "secondary"
                } else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
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
                $('#Div_Inbox_Attachment').append(resultInboxAttachment)
                $('#Div_Inbox_AttachmentEmail').append(resultInboxAttachment)
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
                $("#Form_Ticket_Agent_Name").val(json[i].NAME)
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
                    $("#Form_Ticket_Email_Subject").val(json[i].ESUBJECT)
                    $("#Form_Ticket_Email_CC").val(json[i].ECC)
                } else {
                    $("#Form_Ticket_Action").val("2")
                }
                if (json[i].Status == "Closed" || json[i].Status == "Pending") {
                    $("#ButtonReject").hide();
                    $("#ButtonProsessApprove").hide();
                } else {
                    $("#ButtonReject").show();
                    $("#ButtonProsessApprove").show();
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
function Preview_AttachmentTicket() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTicketNumber").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK178'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultTicketAttachment = "";

            $('#Div_TicketAttachment').empty();
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
                    '<p class="text-muted text-truncate mb-0">Download <i class="bx bxs-download align-middle"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=FormDeleteAttachment(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#Div_TicketAttachment').append(resultTicketAttachment)

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
    $("#DivHeader").hide();
    $("#DivObjectTicket").hide();
    $("#DivBodyEmail").hide();
    $("#ObjectEmail").show();
    $("#DivTableOutgoingEmail").hide();
    //$("#DivJourneyReject").hide();
    $("#DivHideShowTeamLeader").hide();
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
    CKEDITOR.instances.Ticket_NoteAgent.setData("")
}
function Proses_ButtonReject() {
    if ($("#Form_Email_Reject").val() == '') {
        swal(
            '',
            'Type is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Email_Reject_Reason").val() == '') {
        swal(
            '',
            'Reason is empty',
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
                    TicketNumber: $("#ContentPlaceHolder1_TrxTicketNumber").val(), Status: $("#Form_Email_Reject").val(), Reason: $("#Form_Email_Reject_Reason").val(),
                    UserCreate: $("#hd_sessionLogin").val(), Action: "Reject"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_TeamLeaderEmail_ActionTL",
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
                                    'Data Has Been Reject',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_Inbox_EmailSystemTL.aspx?"
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
                    }
                })

            }
        })
}
function Proses_ButtonApprove() {
    var NoteAgent = CKEDITOR.instances.Ticket_NoteAgent.getData();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TicketNumber: $("#ContentPlaceHolder1_TrxTicketNumber").val(), Status: "Approved", Reason: NoteAgent,
                    UserCreate: $("#hd_sessionLogin").val(), Action: "Approved"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_TeamLeaderEmail_ActionTL",
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
                                    'Data Has Been Approved',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_Inbox_EmailSystemTL.aspx?"
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
                    }
                })

            }
        })
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
                resultAgentLogin = '<div class="agent-row"><div class="agent-icon"><span class="mdi mdi-circle-outline text-info"></span></div><div class="agent-name">Agent Empty</div></div>';
                divLisAgent.append(resultAgentLogin);
                //resultAgentLogin = '<div class="agent-row"><div class="agent-icon"><span class="mdi mdi-circle-outline text-info"></span></div><div class="agent-name">Agent Empty</div></div>';
                //divLisAgent.append(resultAgentLogin);
            } else {
                for (i = 0; i < json.length; i++) {
                    if (json[i].Login == "1") {
                        var ColorLogin = "success"
                    } else {
                        var ColorLogin = "danger"
                    }
                    if (json[i].NAME.length > 15) {
                        var NameNya = json[i].NAME.substring(0, 15) + ".."
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
                resultLoginTeamLeader = '<div class="team-leader-row"><div class="team-leader-icon"><span class="mdi mdi-circle-outline text-info"></span></div><div class="team-leader-name">Team Leader Empty</div></div>';
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
function Email_JourneyEskalasi(TicketNumber) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: JSON.stringify({
            TrxID: TicketNumber,
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
                            break;
                        case "Close Ticket":
                            iconColor = "danger";
                            break;
                        case "Forward":
                            iconColor = "secondary";
                            break;
                        default:
                            iconColor = "secondary";
                            break;
                    }
                    resultSourceCustomer += `
                        <div class="card bg-${iconColor} text-white" style="margin-bottom: 10px; padding: 10px;">
                            <div class="card-header bg-${iconColor} text-white text-center">
                                ${item.Status}
                            </div>
                            <div class="card-body">
                                <p class="card-text">${item.Reason}</p>
                            </div>
                        </div>
                    `;
                }

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
function setActive(element) {
    const links = document.querySelectorAll('.mail-list a');
    links.forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
}
function DropdownAgent() {
    var CmbAgentSelect = $('#AgentSelect');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK221'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultAgentSelect = "";

            CmbAgentSelect.empty();
            CmbAgentSelect.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultAgentSelect = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                CmbAgentSelect.append(resultAgentSelect);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ModalAssign(IvcID) {
    $("#AgentSelectModal").modal('show');
    $("#ContentPlaceHolder1_TrxID").val(IvcID)
}
function ActionAssign() {
    if ($("#AgentSelect").val() == "" || $("#AgentSelect").val() == "Select") {
        swal(
            '',
            'Agent is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TextReason").val() == "") {
        swal(
            '',
            'Reason assign is empty',
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
                    Access: "1", IvcID: $("#ContentPlaceHolder1_TrxID").val(),
                    Agent: $("#AgentSelect").val(), ReasonAssign: $("#TextReason").val(),
                    User: $("#hd_sessionLogin").val()
                });

                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/AHU_Uidesk_TrxAssignEmail",
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
                                    'Assign Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#AgentSelectModal").modal('hide');
                                    $("#AgentSelect").val("")
                                    $("#TextReason").val("")
                                });
                            } else {
                                swal(
                                    '',
                                    'Assign Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#AgentSelectModal").modal('hide');
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
                            break;
                        case "Close Ticket":
                            iconColor = "danger";
                            break;
                        case "Forward":
                            iconColor = "secondary";
                            break;
                        default:
                            iconColor = "secondary";
                            break;
                    }
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
function CheckedTeamleader(checked) {
    if (checked) {
        $("#DivRejectTeamLeader").show();
    } else {
        $("#DivRejectTeamLeader").hide();
    }
}
function ActionEditRedaksi() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTicketNumber").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK236'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                CKEDITOR.instances.RedaksiEmail.setData(json[i].ResponComplaint)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#ModalRedaksiEmail").modal('show');
}
function ActionUpdateRedaksiEmail() {
    if ($("#ContentPlaceHolder1_TrxTicketNumber").val() == '') {
        swal(
            '',
            'Email is empty',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    var RedaksiEmailNya = CKEDITOR.instances.RedaksiEmail.getData()
    if (RedaksiEmailNya == '') {
        swal(
            '',
            'Redaksi Email is empty',
            'error'
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
                    TicketNumber: $("#ContentPlaceHolder1_TrxTicketNumber").val(), RedaksiEmail: RedaksiEmailNya, UserName: $("#hd_sessionLogin").val(),
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_TL_UpdateRedaksiEmail",
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
                                    'Data Has Been Update',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_Inbox_EmailSystemTL.aspx?"
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Update Has Been Failed !',
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