$(document).ready(function () {
    ComboEskalasiStatus()
    ComboEskalasiDepartment()
    $("#hd_TicketNumber").val(getParameterByName('ticketid'))
    //getWS_DataTicket(getParameterByName('ticketid'));
    getWS_DataTicket();
    getWS_AccessTicket();
    TicketInteraction(getParameterByName('ticketid'))
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
    $("#ContentPlaceHolder1_TrxTicketNumber").val($("#hd_TicketNumber").val());
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

                $("#NamePelapor").val(json[i].NAMA_PELAPOR);
                $("#EmailPelapor").val(json[i].EMAIL_PELAPOR);
                $("#PhonePelapor").val(json[i].PHONE_PELAPOR);
                $("#AccountPelapor").val(json[i].AccountInbound);
                $("#AlamatPelapor").val(json[i].ALAMAT_PELAPOR);

                var milisegundos = parseInt(json[i].TglKejadian.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');

                $("#DateofTransaction").val(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                $("#ProductType").val(json[i].NamaPenyebab);
                $("#ProductName").val(json[i].ProductName);
                $("#agentname").val(json[i].NAME);
                $("#CustomerStatus").val(json[i].StatusName);
                $("#CustomerCategory").val(json[i].JenisNasabah);
                $("#PolisNumber").val(json[i].NomorRekening);
                $("#TicketChannel").val(json[i].SumberInformasi);
                $("#Category").val(json[i].CategoryName);
                $("#EnquiryType").val(json[i].SubCategory1Name);
                $("#EnquiryDetail").val(json[i].SubCategory2Name);
                $("#Problem").val(json[i].SubCategory3Name);
                $("#PriorityScale").val(json[i].SkalaPrioritas);
                $("#TicketStatus").val(json[i].Status);
                $("#EscalationUnit").val(json[i].ORGANIZATION_NAME);
                $('#SLA').val(json[i].SLA);
                //CKEDITOR.instances.TextProblem.setData(json[i].DetailComplaint)
                $("#TextProblem").val(json[i].DetailComplaint);
                //$("#EskalasiTicketStatus").val(json[i].Status);
                //$('#EskalasiTicketStatus option:selected').text(json[i].Status);
                $('#EskalasiTicketDepartment option:selected').text(json[i].ORGANIZATION_NAME);
                $("#ContentPlaceHolder1_hd_EskalasiDepartment").val(json[i].Divisi);
                $("#ContentPlaceHolder1_TrxStatus").val(json[i].Status);
                //$("#ContentPlaceHolder1_TrxCustomerID").val(json[i].NIK)
                $("#EskalasiTicketStatus").find("option:selected").text();
                $("#EskalasiTicketStatus").val(json[i].Status);
                getWS_DataProfile(json[i].NIK);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_DataProfile(value) {
    var selectedValue = value;
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].CustomerID)
                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');

                $('#Profile_Nama').append('<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].Name.substr(0, 1).toUpperCase() + '</span></div></br>' +  json[i].Name);
                $('#Profile_Alamat').append(json[i].Alamat)
                if (json[i].HP == "") {
                    $('#Profile_Telepon').append("-");
                } else {
                    $('#Profile_Telepon').append(json[i].HP);
                }
                if (json[i].Email == "") {
                    $('#Profile_EmailNya').append("-");
                } else {
                    $('#Profile_EmailNya').append(json[i].Email);
                }
                $('#Profile_TglLahir').append(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                //$('#TxtProfilePhone').val(json[i].HP);
                //CKEDITOR.instances.TxtAddress.setData(json[i].Alamat)
                //$('#Journey_PolisNumber').val(json[i].PolisNumber);
                //;

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
        data: "{ID:'" + $("#hd_TicketNumber").val() +"', LevelUser: '0', Status: '0', NA: '0', UserName:'" + $("#hd_sessionLogin").val() + "', Action:'AccessTicket'}",
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

// *Eskalasi Ticket* //
function ComboEskalasiStatus() {
    var CmbEskalasiTicketStatus = $('#EskalasiTicketStatus');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_TicketJourney.asmx/Uidesk_Trx_UserStatus",
        data: "{ID:'0', LevelUser: '0', Status: '0', NA: '0', UserName:'" + $("#hd_sessionLogin").val() + "', Action:'User'}",
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
    var TrxTicketNumber = $("#hd_TicketNumber").val();
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
