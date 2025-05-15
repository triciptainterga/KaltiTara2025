$(document).ready(function () {
    //ComboEskalasiStatus()
    //ComboEskalasiDepartment()
    $("#ContentPlaceHolder1_TrxTicketNumber").val(getParameterByName('ticketid'))
    ChannelTicketEmailDynamic();
    DropdownStatus();
    getWS_DataTicket();
    //getWS_DataTicket();
    ////getWS_AccessTicket();
    //TicketInteraction(getParameterByName('ticketid'))
    if ($("#TrxLoginTypeAngka").val() == "1") {
        $('#Ticket_Pertanyaan').attr('disabled', false);
        $('#Ticket_Jawaban').attr('disabled', false);
        $('#Ticket_TeamLeader').attr('disabled', true);
    } else if ($("#TrxLoginTypeAngka").val() == "2") {
        $('#Ticket_Pertanyaan').attr('disabled', true);
        $('#Ticket_Jawaban').attr('disabled', true);
        $('#Ticket_TeamLeader').attr('disabled', false);
    }
    if (getParameterByName('ht') == "1") {
        if (getParameterByName('Status') == "Closed") {
            $("#ConvertToCase").hide();
            $("#UpdateTicketProperties").hide();
            $("#UpdateClosed").hide();
        } else {
            $("#ConvertToCase").show();
            $("#UpdateTicketProperties").show();
            $("#UpdateClosed").show();
        }
    }
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getWS_DataTicket() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTicketNumber").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK55'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {
               
                FormLoadCustomer(json[i].NIK);
                FormLoadJourney(json[i].NIK);

                if (json[i].DateUpdateOutbound != null) {
                    var d = new Date(json[i].DateUpdateOutbound);
                    var milisegundos = parseInt(json[i].DateUpdateOutbound.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime
                } else {
                    var ConverTanggal = "-"
                }
                
                $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].NIK)
                $("#Ticket_Number").val(getParameterByName('ticketid'));
                $("#Ticket_Nama_Agent").val(json[i].NAME);
                $("#Ticket_Priority").val(json[i].SkalaPrioritas);
                $("#Ticket_Status").val(json[i].Status);
                $("#Ticket_Subject").val(json[i].SubCategory3Name);
                $("#Ticket_Kategori").val(json[i].CategoryName);
                $("#Ticket_Sub_Kategori").val(json[i].SubCategory1Name);
                $("#Ticket_Kantor").val(json[i].VendorName);
                $("#Ticket_NoAju").val(json[i].NomorRekening);
                $("#Ticket_NilaiTransaksi").val(json[i].SumberInformasi);
                //$("#Ticket_Pertanyaan").val(json[i].DetailComplaint);
                //$("#Ticket_Jawaban").val(json[i].ResponComplaint);
                //$("#Ticket_TeamLeader").val(json[i].CatatanTeamLeader);
                CKEDITOR.instances.Ticket_Pertanyaan.setData(json[i].DetailComplaint)
                CKEDITOR.instances.Ticket_Jawaban.setData(json[i].ResponComplaint)
                CKEDITOR.instances.Ticket_TeamLeader.setData(json[i].CatatanTeamLeader)
                $("#ContentPlaceHolder1_hd_EmailID").val(json[i].IdTabel);
                $("#Ticket_Dynamic").val(json[i].TicketDynamic);
                $("#Ticket_TicketIKC").val(json[i].TicketIKC);
                $("#Ticket_Resolusi").val(json[i].Resolusi);
                //$("#Ticket_Deskripsi").val(json[i].Deskripsi);
                CKEDITOR.instances.Ticket_Deskripsi.setData(json[i].Deskripsi)
                $("#Ticket_Nama_Agent_Outbound").val(json[i].NamaAgentOutbound);
                $("#Ticket_Tanggal_Update").val(ConverTanggal);
                $("#ContentPlaceHolder1_TrxChannel").val(json[i].TicketSourceName);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ChannelTicketEmailDynamic() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTicketNumber").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK185'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            if (json.length > 0) {
                $("#ConvertToCase").hide();
                $("#UpdateClosed").hide();
            } else {
                if (getParameterByName("status") === "Closed") {
                    $("#ConvertToCase").hide();
                    $("#UpdateClosed").hide();
                } else {
                    $("#ConvertToCase").hide();
                    $("#UpdateClosed").show();
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
function getWS_DataProfile() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTicketNumber").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                FormLoadCustomer($("#ContentPlaceHolder1_TrxCustomerID").val());

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_AccessTicket() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_TicketJourney.asmx/Uidesk_Trx_UserStatus",
        data: "{ID:'" + $("#ContentPlaceHolder1_TrxTicketNumber").val() + "', LevelUser: '0', Status: '0', NA: '0', UserName:'" + $("#hd_sessionLogin").val() + "', Action:'AccessTicket'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].AccessTicket == "True") {
                    $("#EskalasiSubmit").show();
                } else {
                    $("#EskalasiSubmit").hide();
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
function FormLoadJourney(CustomerID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: JSON.stringify({
            TrxID: CustomerID,
            TrxSearching: 'UideskIndonesia',
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'UIDESK332'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var json = JSON.parse(response.d);
            var resultSourceCustomer = "";

            $(".swiper-wrapper").empty();

            // Fungsi untuk format tanggal
            function formatDate(date) {
                var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
                var day = date.getDate();
                var month = months[date.getMonth()];
                var year = date.getFullYear().toString().slice(-2); // Ambil 2 digit terakhir dari tahun
                return `${day} ${month} ${year}`;
            }

            // Fungsi untuk format waktu
            function formatTime(date) {
                var hours = String(date.getHours()).padStart(2, '0');
                var minutes = String(date.getMinutes()).padStart(2, '0');
                var seconds = String(date.getSeconds()).padStart(2, '0');
                return `${hours}:${minutes}:${seconds}`;
            }

            for (var i = 0; i < json.length; i++) {
                var item = json[i];

                //var date = new Date(parseInt(item.DateCreate.match(/\d+/)[0]));
                //var optionsDate = { day: '2-digit', month: 'long', year: 'numeric' };
                //var formattedDate = date.toLocaleDateString('id-ID', optionsDate);

                //var optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
                //var formattedTime = date.toLocaleTimeString('id-ID', optionsTime);
                //formattedTime = formattedTime.replace(/\./g, ':');

                var date = new Date(parseInt(item.DateCreate.match(/\d+/)[0]));

                var formattedDate = formatDate(date);
                var formattedTime = formatTime(date);

                var iconValue, iconColor;
                switch (item.ValueThread) {
                    case "Call":
                        iconValue = "fas fa-phone";
                        iconColor = "danger";
                        break;
                    case "Email":
                    case "EMAIL":
                        iconValue = "far fa-envelope";
                        iconColor = "warning";
                        break;
                    case "Facebook":
                        iconValue = "fab fa-facebook";
                        iconColor = "primary";
                        break;
                    case "Instagram":
                        iconValue = "fab fa-instagram";
                        iconColor = "primary";
                        break;
                    case "WA":
                        iconValue = "bx bxl-whatsapp";
                        iconColor = "success";
                        break;
                    case "Live Chat":
                        iconValue = "bx bx-message-rounded-dots";
                        iconColor = "success";
                        break;
                    default:
                        iconValue = "bx bxl-whatsapp";
                        iconColor = "success";
                        break;
                }

                resultSourceCustomer += `
                        <div class="swiper-slide" style="width: 335.25px;">
                            <div class="event-list">
                                <div class="p-2 bg-${iconColor}">
                                    <div class="d-flex">
                                        <div class="avatar-sm align-self-center me-2">
                                            <div class="avatar-title rounded bg-transparent text-white font-size-18">
                                                <i class="${iconValue}"></i>
                                            </div>
                                        </div>
                                        <div class="overflow-hidden me-auto">
                                            <p class="font-size-13 text-white" style="margin-left: 60px; margin-top: 10px;">${formattedDate} ${formattedTime}</p>
                                        </div>
                                        <div class="ms-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
            }

            $(".swiper-wrapper").html(resultSourceCustomer);

            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 'auto',
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
// *Eskalasi Ticket* //
function ComboEskalasiStatus() {
    var CmbEskalasiTicketStatus = $('#EskalasiTicketStatus');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_TicketJourney.asmx/Uidesk_Trx_UserStatus",
        data: "{ID:'0', LevelUser: '0', Status: '" + getParameterByName("status") + "', NA: '0', UserName:'" + $("#hd_sessionLogin").val() + "', Action:'User'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultEskalasiTicketStatus = "";

            for (i = 0; i < json.length; i++) {

                ResultEskalasiTicketStatus = '<option value="' + json[i].Status + '">' + json[i].Status + '</option>';
                CmbEskalasiTicketStatus.append(ResultEskalasiTicketStatus);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboEskalasiDepartment() {
    var CmbEskalasiDepartment = $('#EskalasiTicketDepartment');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_TicketJourney.asmx/Uidesk_Trx_UserStatus",
        data: "{ID:'0', LevelUser: '0', Status: '0', NA: '0', UserName:'" + $("#hd_sessionLogin").val() + "', Action:'Department'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultEskalasiTicketDepartment = "";

            for (i = 0; i < json.length; i++) {
                ResultEskalasiTicketDepartment = '<option value="' + json[i].ORGANIZATION_ID + '">' + json[i].ORGANIZATION_NAME + '</option>';
                CmbEskalasiDepartment.append(ResultEskalasiTicketDepartment);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
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

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 2) {
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
        data.append("Username", $("#hd_sessionLogin").val());
        data.append("numberid", getParameterByName('numberid'));
        data.append("customerid", $("#ContentPlaceHolder1_TrxCustomerID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "WebServiceTransaction.asmx/UploadFileAttachmentTicket",
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
            TrxAttachmentInteractionTicket($("#hd_sessionLogin").val());

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
function TrxAttachmentInteractionTicket(TrxUserName) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxUserName: '" + TrxUserName + "', TrxAction: 'UIDESK62'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultComposeBodyAttachment = "";

            $('#EskalasiAttachment').empty();
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
                    color = "primary"
                }
                else if (json[i].FileType == "xls") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == "xlsx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "JPG" || json[i].FileType == "jpeg" || json[i].FileType == "JPEG" || json[i].FileType == "gif" || json[i].FileType == "GIF" || json[i].FileType == "BMP" || json[i].FileType == "bmp") {
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
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].Filename + '</h5>' +
                    '<a href=' + json[i].Path + ' target="_blank" class="text-body">' +
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
                $('#EskalasiAttachment').append(resultComposeBodyAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function deleteAttachment(TrxID) {
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
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    //TrxAttachmentTicket($("#hd_TicketNumber").val());
                                    TrxAttachmentInteractionTicket($("#hd_sessionLogin").val());
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#ModalChannel").modal('hide');
                                    //TrxAttachmentTicket($("#hd_TicketNumber").val());
                                    TrxAttachmentInteractionTicket($("#hd_sessionLogin").val());
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
function EskalasiSubmit() {
    var TrxTicketNumber = $("#TrxTicketNumber").val();
    var TrxUsername = $("#hd_sessionLogin").val();
    if (getParameterByName('channel') != null) {
        var TrxChannel = getParameterByName('channel');
    } else {
        var TrxChannel = "0";
    }
    if (TrxChannel === '') {
        swal(
            '',
            'Channel is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxThreadID = getParameterByName('threadid');
    var TrxGenesysID = getParameterByName('numberid');
    if ($("#EskalasiTicketStatus").val() == "" || $("#EskalasiTicketStatus").val() == "Select") {
        var TrxStatus = $("#ContentPlaceHolder1_TrxStatus").val();
    } else {
        var TrxStatus = $("#EskalasiTicketStatus").val();
    }
    if (TrxStatus === '' || TrxStatus === 'Select') {
        swal(
            '',
            'Ticket is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#EskalasiTicketDepartment").val() == "" || $("#EskalasiTicketDepartment").val() == "Select") {
        var TrxEskalasiTicketDepartment = $("#ContentPlaceHolder1_hd_EskalasiDepartment").val();
    } else {
        var TrxEskalasiTicketDepartment = $("#EskalasiTicketDepartment").val();
    }
    if (TrxEskalasiTicketDepartment === '' || TrxEskalasiTicketDepartment === 'Select') {
        swal(
            '',
            'Eskalasi Department is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxEskalasiTicket = $("#EskalasiTicket").val();
    if (TrxEskalasiTicket === '' || TrxEskalasiTicket === '0' || TrxEskalasiTicket === 'Select') {
        swal(
            '',
            'Eskalasi Ticket is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //var TrxResponse = CKEDITOR.instances.EskalasiResponse.getData();
    var TrxResponse = $("#EskalasiResponse").val()
    if (TrxResponse === '') {
        swal(
            '',
            'Description is empty',
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

                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_TicketJourney.asmx/Update_TransactionTicket_New_Eskalasi",
                    data: "{ TrxTicketNumber: '" + TrxTicketNumber + "', TrxResponse: '" + TrxResponse + "', TrxStatus: '" + TrxStatus + "', TrxUsername: '" + TrxUsername + "', TrxThreadID: '" + TrxThreadID + "', TrxGenesysID: '" + TrxGenesysID + "', TrxEscalasiUnit:'" + TrxEskalasiTicketDepartment + "', TrxEscalasiStatus:'" + TrxEskalasiTicket + "', TrxChannel: '" + TrxChannel + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
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
                                    $("#EskalasiResponse").val("")
                                    //window.location = "Crm_Trx_TicketJourney.aspx?ticketid=" + getParameterByName("ticketid") + "&status=" + TrxStatus + "";
                                    window.location = "Crm_Trx_Taskboard.aspx?status=" + TrxStatus + "";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#EskalasiResponse").val("")
                                    window.location = "Crm_Trx_Taskboard.aspx?status=" + TrxStatus + "";
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
        })
}
function TicketInteraction(ParameterID) {
    var PathTicket = "" + IPSERVER + "/Apps"
    var filenameimage = "";
    var result = "";
    var result_in = ""
    var messageDiv = $('#TicketInteraction');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_TicketJourney.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + ParameterID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK128'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;

            messageDiv.empty();
            json.forEach(async (item) => {

                //console.log(item)
                let imagein = ""
                await $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_TicketJourney.asmx/UIDESK_TrmMasterCombo",
                    data: "{TrxID: '" + item.ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK129'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var j = 0;

                        console.log("InteractionID" + item.ID)
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
                                '<h5 class="font-size-13 text-truncate mb-1">' + json[j].Filename + '</h5>' +
                                '<a href=' + PathTicket + "/" + json[j].Path + ' target="_blank" class="text-body">' +
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
                    //'<div class="timeline-date">' + item.DateCreate + '</div>' +
                    '<h5 class="mt-3 font-size-16">' + item.NAME + '</h5>' +
                    '<div class="text-muted">' +
                    '' + item.ResponseComplaint + '' +
                    '</div>' +
                    '<div class="timeline-album">' +
                    '' + imagein + '' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'

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
// *Eskalasi Ticket* //
function get_EscalationStatus(TrxValues) {
    if ($("#EskalasiTicketStatus").val() == "Closed") {
        $("#EskalasiTicket").val("No");
        $('#EskalasiTicket').attr('disabled', true);
        $('#EskalasiTicketDepartment').attr('disabled', true);
    } else {
        $("#EskalasiTicket").val("");
        $('#EskalasiTicket').attr('disabled', false);
        $('#EskalasiTicketDepartment').attr('disabled', false);
    }
}
function CustomerHistoryTicket() {
    $("#modalHistory").modal('show');
    var myTable = $('#TrmHistory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK163'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                var ConverTanggal = newDate + ' ' + newTime

                if (json[i].Status == "Open") {
                    var Status = "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + json[i].Status + "</span>"
                } else if (json[i].Status == "Pending") {
                    var Status = "<span class='badge rounded-pill badge-soft-warning font-size-12'>" + json[i].Status + "</span>"
                } else if (json[i].Status == "Solved") {
                    var Status = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].Status + "</span>"
                } else if (json[i].Status == "Closed") {
                    var Status = "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].Status + "</span>"
                }

                if (json[i].TicketPosition == "1") {
                    var TrxPosition = "Layer 1"
                } else if (json[i].TicketPosition == "2") {
                    var TrxPosition = "Layer 2"
                } else if (json[i].TicketPosition == "3") {
                    var TrxPosition = "Layer 3"
                } else if (json[i].TicketPosition == "4") {
                    var TrxPosition = "Eksternal/Vendor"
                }

                myTable.row.add([json[i].TicketNumber, json[i].CategoryName, TrxPosition, Status, json[i].SLA, ConverTanggal]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CustomerOtherChannel() {
    $("#ContactPreviewChannel").modal('show');
    var ResultCustomerChannel = "";
    $.ajax({
        type: "POST",
        url: "asmx/ServiceCustomer.asmx/ChannelCustomer",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxSearching: 'Channel', TrxAction: 'Channel'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_CustomerChannel').empty();
            for (i = 0; i < json.length; i++) {

                ResultCustomerChannel = '<div class="col-xl-6 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-success text-success">' + json[i].FlagChannel.substr(0, 1).toUpperCase() + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="font-size-15 mb-1 text-truncate"><a href="#" class="text-dark">' + json[i].ValueChannel + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' + json[i].FlagChannel + '</p>' +
                    '</div>' +
                    //'<div class="dropdown">' +
                    //'<a class="btn btn-light btn-sm dropdown-toggle" href="#" role="button"' +
                    //'data-bs-toggle="dropdown" aria-haspopup="true">' +
                    //'<i class="fa fas fa-ellipsis-h"></i>' +
                    //'</a>' +
                    //'</div>' +
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
function ActionUpdateTicketClose() {
    var TicketInteractonReason = CKEDITOR.instances.Ticket_InteractonReason.getData();
    if ($("#Ticket_InteractonStatus").val() == '') {
        swal(
            '',
            'Status is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Ticket_ReasonInteracton").val() == '') {
        swal(
            '',
            'Response Agent is empty',
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
                    UserName: $("#hd_sessionLogin").val(), TicketNumber: $("#ContentPlaceHolder1_TrxTicketNumber").val(),
                    Status: $("#Ticket_InteractonStatus").val(), ResponseAgent: TicketInteractonReason
                });

                $.ajax({
                    url: "asmx/Crm_Trx_TicketJourney.asmx/BRA_FollowUpTicket",
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
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#Ticket_InteractonStatus").val("");
                                    $("#Ticket_InteractonReason").val("");
                                    //TicketInteraction();
                                    location.href = "Crm_Trx_Taskboard.aspx";
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
        })
}
function FormatRupiah(angka, prefix) {
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
function FormLoadCustomer(CustomerID) {
    FormCleansingLoadCustomer();
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
                $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].CustomerID)
                $('#Profile_NamaCustomer').append(json[i].Name)
                $('#Profile_NomorTelepon').append(json[i].HP)
                $('#Profile_Email_Customer').append(json[i].Email)
                $('#Profile_Facebook').append(json[i].Facebook)
                $('#Profile_Instagram').append(json[i].Instagram)
                $('#Profile_Twitter').append(json[i].Twitter)
                $('#Profile_NamaPerusahaan').append(json[i].Nama_Perusahaan)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function FormCleansingLoadCustomer() {
    $("#ContentPlaceHolder1_TrxCustomerID").empty()
    $('#Profile_NamaCustomer').empty()
    $('#Profile_NamaPerusahaan').empty()
    $('#Profile_NomorTelepon').empty()
    $('#Profile_Email').empty()
    $('#Profile_Facebook').empty()
    $('#Profile_Instagram').empty()
    $('#Profile_Twitter').empty()
}
function TicketActivity() {
    var ResultTicketActivity = "";
    var messageDiv = $('#DivTicketActivity');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_TicketJourney.asmx/TicketActivity",
        data: "{TicketNumber:'" + getParameterByName("ticketid") + "', UserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultTicketReminder="";

            messageDiv.empty();
            if (json.length != "") {
                for (i = 0; i < json.length; i++) {

                    ResultTicketReminder = '<div class="timeline-item">' +
                        '<div class="timeline-block">' +
                        '<div class="timeline-box card">' +
                        '<div class="card-body">' +
                        '<div class="timeline-date">' + json[i].DateActivityNya + '</div>' +
                        '<h5 class="mt-3 font-size-12">' + json[i].Name + '</h5>' +
                        '<div class="text-muted">' +
                        '' + json[i].Activity + '' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'

                    messageDiv.append(ResultTicketReminder);


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
function TicketInteraction() {
    //var ResultTicketInteraction = "";
    //var messageDiv = $('#DivTicketInteraction');
    //$.ajax({
    //    type: "POST",
    //    url: "asmx/Crm_Trx_TicketJourney.asmx/TicketInteraction",
    //    data: "{TicketNumber:'" + getParameterByName("ticketid") + "', UserName: '" + $("#hd_sessionLogin").val() + "'}",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {

    //        var json = JSON.parse(data.d);
    //        var i, x;

    //        messageDiv.empty();
    //        if (json.length != "") {
    //            for (i = 0; i < json.length; i++) {
    //                if (json[i].Status == "Solved") {
    //                    var Nama = json[i].AgentCreate
    //                } else {
    //                    var Nama = json[i].NameNya
    //                }
    //                ResultTicketInteraction = '<div class="timeline-item">' +
    //                    '<div class="timeline-block">' +
    //                    '<div class="timeline-box card">' +
    //                    '<div class="card-body">' +
    //                    '<div class="timeline-date">' + json[i].DateInteractionNya + '</div>' +
    //                    '<h5 class="mt-3 font-size-12">' + Nama + '</h5>' +
    //                    '<div class="text-muted">' +
    //                    '' + json[i].ResponseComplaint + '' +
    //                    '</div>' +
    //                    '</div>' +
    //                    '</div>' +
    //                    '</div>' +
    //                    '</div>'

    //                messageDiv.append(ResultTicketInteraction);

    //            }
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
    var PathTicket = "" + IPSERVER + "/Apps"
    var filenameimage = "";
    var result = "";
    var result_in = ""
    var messageDiv = $('#DivTicketInteraction');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_TicketJourney.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxTicketNumber").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK128'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;

            messageDiv.empty();
            json.forEach(async (item) => {

                let imagein = ""
                await $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_TicketJourney.asmx/UIDESK_TrmMasterCombo",
                    data: "{TrxID: '" + item.ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK129'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var j = 0;

                        //console.log("InteractionID" + item.ID)
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
                                '<h5 class="font-size-13 text-truncate mb-1">' + json[j].Filename + '</h5>' +
                                '<a href=' + PathTicket + "/" + json[j].Path + ' target="_blank" class="text-body">' +
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
                    '<h5 class="mt-3 font-size-16">' + item.NAME + '</h5>' +
                    '<div class="text-muted">' +
                    '' + item.ResponseComplaint + '' +
                    '</div>' +
                    '<div class="timeline-album">' +
                    '' + imagein + '' +
                    '</div>' +
                    '</br>' +
                    '</br>' +
                    '<div class="timeline-date">' + item.TanggalInteraction + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'

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
function PreviewConversation() {
    if ($("#ContentPlaceHolder1_TrxChannel").val() == "Email" || $("#ContentPlaceHolder1_TrxChannel").val() == "EMAIL" || $("#ContentPlaceHolder1_TrxChannel").val() == "email") {
        document.getElementById("FramePreview").src = "" + IPSERVER + "/FileEmail/Inbox/" + $("#ContentPlaceHolder1_hd_EmailID").val() + "/file.html"
    }
}
function DropdownStatus() {
    var cmbDataSourceStatus = $('#Ticket_InteractonStatus');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK337'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceStatus = "";

            var StatusNya
            for (i = 0; i < json.length; i++) {

                resultSourceStatus = '<option value="' + json[i].lblStatus + '">' + json[i].lblStatus + '</option>';
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
function ActionUpdateTicketProperties() {
    var TicketPertanyaan = CKEDITOR.instances.Ticket_Pertanyaan.getData();
    var TicketTeamLeader = CKEDITOR.instances.Ticket_TeamLeader.getData();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    UserName: $("#hd_sessionLogin").val(), TicketNumber: $("#ContentPlaceHolder1_TrxTicketNumber").val(), Pertanyaan: TicketPertanyaan,
                    Jawaban: $('#Ticket_Jawaban').val(), CatatanTeamLeader: TicketTeamLeader
                });
                $.ajax({
                    url: "asmx/Crm_Trx_TicketJourney.asmx/BRA_TicketProperties",
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
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    getWS_DataTicket();
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
        })
}