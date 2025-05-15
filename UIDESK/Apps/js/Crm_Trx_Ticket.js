$(document).ready(function () {
    $("#Ticket_AgentName").val($("#hd_NameKaryawan").val())
    //$("#Ticket_AgentName").addClass('form-control');
    //$('#Ticket_AgentName').prop('disabled', true);
    $("#Incoming_Information").val(getParameterByName("account"))
    $("#ActionNewCustomer").hide()
    var ParameterAccount = getParameterByName("account")
    if (ParameterAccount != "") {
        ValidasiDataCustomer(ParameterAccount)
        $("#UpdateCustomer").hide()
        $("#SimpanCustomer").show()
    }
    $("#divHeaderSearching").hide()
    $("#TxtSearchingCustomer").on("input", function () {
        $("#divHeaderSearching").show()
        $("#divSearchingCustomer").show()
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            SearchingUser($(this).val());
        } else if (jumlahString == 0) {
            SearchingUser($(this).val(""));
            $("#ActionNewCustomer").hide()
        }
    });
    $("#TxtSearchingTicket").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            SearchingTicket($(this).val());
        } else if (jumlahString == 0) {
            HistoryTicket($("#ContentPlaceHolder1_CustomerID").val())
        }
    });
    getWS_MasterLoad();
    ScriptGreeting()
});
function Test() {
    $("#modal-list-transaction-ticket").modal('show');
    TableListDataTransaction("231003124911")
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// *Properties Ticket* //
function getWS_MasterLoad() {
    var cmbData = $('#Ticket_ProductType');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK301'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].ID + '">' + json[i].NamaPenyebab + '</option>';
                cmbData.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    var cmbDataStatus = $('#Ticket_UserStatus');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK302'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultStatus = "";

            for (i = 0; i < json.length; i++) {

                resultStatus = '<option value="' + json[i].ID + '">' + json[i].StatusName + '</option>';
                cmbDataStatus.append(resultStatus);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })


    var cmbDataPriority = $('#Ticket_Priority');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK303'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultPriority = "";

            for (i = 0; i < json.length; i++) {

                resultPriority = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
                cmbDataPriority.append(resultPriority);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var cmbDataUserCategory = $('#Ticket_UserCategory');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK304'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultUserCategory = "";

            for (i = 0; i < json.length; i++) {

                resultUserCategory = '<option value="' + json[i].Type + '">' + json[i].Type + '</option>';
                cmbDataUserCategory.append(resultUserCategory);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var ParameterChannel = getParameterByName("channel")
    if (ParameterChannel == null) {
        var TrxWhere = "-"
    } else {
        var TrxWhere = ParameterChannel
    }
    var cmbDataSourceChannel = $('#Ticket_SourceChannel');
    var cmbChannelHistory = $('#Select_Channel_History');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + TrxWhere + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK305'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceChannel = "", resultSourceChannelType = "", resultSourceChannelHistory = "";

            for (i = 0; i < json.length; i++) {

                if (getParameterByName("channel") == null) {
                    resultSourceChannel = '<option value="' + json[i].TicketIDCode + '">' + json[i].Name + '</option>';
                } else {
                    resultSourceChannel = '<option value="' + json[i].TicketIDCode + '" selected=true>' + json[i].Name + '</option>';
                    //$('#Ticket_SourceChannel').attr('disabled', true);
                }
                cmbDataSourceChannel.append(resultSourceChannel);
                resultSourceChannelHistory = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
                cmbChannelHistory.append(resultSourceChannelHistory);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var cmbDataSourceCategory = $('#Ticket_Category');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK306'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCategory = "";

            for (i = 0; i < json.length; i++) {

                resultSourceCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbDataSourceCategory.append(resultSourceCategory);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var cmbDataSourceUser = $('#Ticket_AgentName');
    $('#Ticket_AgentName').append('<option selected="selected" value="' + $("#hd_sessionLogin").val() + '">' + $("#hd_sessionLogin").val() + '</option>');
    var cmbDataSourceStatus = $('#Ticket_Status');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK307'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceStatus = "";

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
function getWS_CategoryType(value) {
    var selectedText = $("#Ticket_Category").find("option:selected").text();
    var selectedValue = $("#Ticket_Category").val();
    var cmbDataSourceEnquiry = $('#Ticket_Enquiry');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK308'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiry = "";

            cmbDataSourceEnquiry.empty();
            cmbDataSourceEnquiry.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultSourceEnquiry = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                cmbDataSourceEnquiry.append(resultSourceEnquiry);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_CategoryTypeDetail(value) {
    var selectedText = $("#Ticket_Enquiry").find("option:selected").text();
    var selectedValue = $("#Ticket_Enquiry").val();
    var cmbDataSourceEnquiryDetail = $('#Ticket_EnquiryDetail');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK309'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryDetail = "";

            cmbDataSourceEnquiryDetail.empty();
            cmbDataSourceEnquiryDetail.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultSourceEnquiryDetail = '<option value="' + json[i].SubCategory2ID + '">' + json[i].SubName + '</option>';
                cmbDataSourceEnquiryDetail.append(resultSourceEnquiryDetail);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_CategoryTypeReason(value) {
    var selectedText = $("#Ticket_EnquiryDetail").find("option:selected").text();
    var selectedValue = $("#Ticket_EnquiryDetail").val();
    var cmbDataSourceEnquiryReason = $('#Ticket_EnquiryReason');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK310'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            cmbDataSourceEnquiryReason.empty();
            cmbDataSourceEnquiryReason.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultSourceEnquiryReason = '<option value="' + json[i].SubCategory3ID + '">' + json[i].SubName + '</option>';
                cmbDataSourceEnquiryReason.append(resultSourceEnquiryReason);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_SLAReason(value) {
    var selectedText = $("#Ticket_EnquiryReason").find("option:selected").text();
    var selectedValue = $("#Ticket_EnquiryReason").val();
    var slaSpanData = $('#Ticket_SLA');
    var TicketLayer = $('#Ticket_Layer');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK314'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                $("#hd_SLA").val(json[i].SLA);
                $("#Ticket_SLA").val(json[i].SLA);
                //$('#Ticket_SLA').attr('disabled', true);
                getWS_EscalationUnit(json[i].TujuanEskalasi)
                $("#Ticket_EscalationLevelUser").val("Layer " + json[i].Layer)
                //$('#Ticket_EscalationLevelUser').attr('disabled', true);
                $("#ContentPlaceHolder1_hd_Layer").val(json[i].Layer);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_EscalationUnit(TrxValue) {
    var cmbDataSourceEscalation = $('#Ticket_Escalation');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + TrxValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK311'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEscalation = "";

            for (i = 0; i < json.length; i++) {

                resultSourceEscalation = '<option value="' + json[i].ORGANIZATION_ID + '" selected=true>' + json[i].ORGANIZATION_NAME + '</option>';
                cmbDataSourceEscalation.append(resultSourceEscalation);
                //$('#Ticket_Escalation').attr('disabled', true);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_EscalationStatus() {
    if ($("#Ticket_Status").val() == "Closed") {
        //$("#Ticket_EscalationLayer").val("1")
        $("#Ticket_EscalationLayer").val("No")
        $('#Ticket_EscalationLayer').attr('disabled', true);
    } else {
        $("#Ticket_EscalationLayer").val("")
        $('#Ticket_EscalationLayer').attr('disabled', false);
    }
}
function getWS_ProductName(TrxID) {
    var selectedText = $("#Ticket_ProductType").find("option:selected").text();
    var selectedValue = $("#Ticket_ProductType").val();
    var cmbProductName = $('#Ticket_ProductName');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK327'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            cmbProductName.empty()
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].Product_Name + '">' + json[i].Product_Name + '</option>';
                cmbProductName.append(result);

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
            TrxAttachmentTicket($("#hd_sessionLogin").val());

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
function TrxAttachmentTicket(TrxUserName) {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxUserName: '" + TrxUserName + "', TrxAction: 'UIDESK62'}",
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
                    '<a href="#" class="text-body" onclick=deleteAttachment(' + json[i].ID + ')>' +
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
                                    'Delete File Has Been Success',
                                    'success'
                                ).then(function () {
                                    TrxAttachmentTicket($("#hd_sessionLogin").val());
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete File Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    TrxAttachmentTicket($("#hd_sessionLogin").val());
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
function ActionCreateTicket() {
    var TrxUsername = $("#hd_sessionLogin").val();
    var TrxCustomerID = $("#hd_customerID").val();
    var TrxGenesysID = getParameterByName("numberid");
    var TxtThreadID = getParameterByName("threadid");
    var TxtAccount = $("#Reported_Account").val();
    var TxtContactID = $("#Reported_Account").val();
    var TrxPelapor = $("#Reported_Name").val();
    var TrxPelaporEmail = $("#Reported_Email").val();
    var TrxPelaporPhone = $("#Reported_Phone").val();
    var TrxPelaporAddress = $("#Reported_Address").val();
    var TrxKejadian = $("#Ticket_DateofTransaction").val();
    var TrxPenyebab = $("#Ticket_ProductType").val();
    var TrxProductName = $("#Ticket_ProductName").val();
    var TrxPenerimaPengaduan = $("#Ticket_AgentName").val();
    var TrxStatusPelapor = $("#Ticket_UserStatus").val();
    var TrxSkalaPrioritas = $("#Ticket_Priority").val();
    var TrxJenisNasabah = $("#Ticket_UserCategory").val();
    var TrxNomorRekening = "0";
    var TrxSumberInformasi = $("#Ticket_SourceChannel").val();
    var TrxCategory = $("#Ticket_Category").val();
    var TrxLevel1 = $("#Ticket_Enquiry").val();
    var TrxLevel2 = $("#Ticket_EnquiryDetail").val();
    var TrxLevel3 = $("#Ticket_EnquiryReason").val();
    //var TrxConvertComplaint = CKEDITOR.instances.Ticket_Complaints.getData();
    //var TrxConvertResponse = CKEDITOR.instances.Ticket_NoteAgent.getData();
    var TrxConvertComplaint = $("#Ticket_Complaints").val();
    var TrxConvertResponse = $("#Ticket_NoteAgent").val();
    var TrxChannel = $("#Ticket_SourceChannel").val();
    var TrxStatus = $("#Ticket_Status").val();
    var TrxEskalasi = $("#Ticket_Escalation").val();
    var TrxSLA = $("#hd_SLA").val();
    if ($("#Ticket_EscalationLayer").val() == "Yes") {
        var TrxLayer = $("#ContentPlaceHolder1_hd_Layer").val();
    } else {
        var TrxLayer = "1";
    }
    var TrxExtendCategory = "0";
    var TrxIDchannel = getParameterByName("channel");
    if (TrxUsername == "") {
        swal(
            '',
            'Session Timeout, Please Re-login',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxConvertResponse == "") {
        swal(
            '',
            'Response Agent Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxKejadian == null || TrxKejadian == "1900-01-01" || TrxKejadian == "") {
        swal(
            '',
            'Date of Transaction is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxCustomerID == "") {
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
                    TrxUsername: TrxUsername, TrxCustomerID: TrxCustomerID, TxtAccount: TxtAccount,
                    TrxPelapor: encodeData(TrxPelapor), TrxPelaporEmail: TrxPelaporEmail, TrxPelaporPhone: TrxPelaporPhone,
                    TrxPelaporAddress: encodeData(TrxPelaporAddress), TrxKejadian: TrxKejadian, TrxPenyebab: TrxPenyebab,
                    TrxPenerimaPengaduan: TrxPenerimaPengaduan, TrxStatusPelapor: TrxStatusPelapor, TrxSkalaPrioritas: TrxSkalaPrioritas,
                    TrxJenisNasabah: TrxJenisNasabah, TrxNomorRekening: TrxNomorRekening, TrxSumberInformasi: TrxSumberInformasi,
                    TrxCategory: TrxCategory, TrxLevel1: TrxLevel1, TrxLevel2: TrxLevel2, TrxLevel3: TrxLevel3,
                    TrxComplaint: encodeData(TrxConvertComplaint), TrxResponse: encodeData(TrxConvertResponse), TrxChannel: TrxChannel,
                    TrxStatus: TrxStatus, TrxEskalasi: TrxEskalasi, TrxSLA: TrxSLA, TrxExtendCategory: TrxExtendCategory, TrxLayer: TrxLayer,
                    TrxThreadID: TxtThreadID, TxtThreadID: TxtThreadID, TrxGenesysID: TrxGenesysID, TxtContactID: TxtContactID, TrxIDchannel: TrxIDchannel,
                    TrxProductName: TrxProductName
                });
                $.ajax({
                    url: "asmx/Crm_Trx_Ticket.asmx/Insert_TransactionTicket",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        console.log("Insert_TransactionTicket : " + form_data)

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Ticket Has Been Success',
                                    'success'
                                ).then(function () {
                                    TableListDataTransaction($("#hd_customerID").val());
                                    $("#modal-list-transaction-ticket").modal('show');
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Ticket Has Been Failed !',
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
function TableListDataTransaction(ParamID) {
    var TrxCustomerID = ParamID;
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxNumberID = getParameterByName("numberid");
    var myListTransactionTicket = $('#ListTransactionTicket').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/ListDataTransactionTicket",
        data: "{TrxCustomerID: '" + TrxCustomerID + "',TrxUserName: '" + TrxUserName + "',TrxNumberID: '" + TrxNumberID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            myListTransactionTicket.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    if (json[i].Status == "Open") {
                        var TrxStatus = "<span class='badge badge-soft-primary font-size-12'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Pending") {
                        var TrxStatus = "<span class='badge badge-soft-warning font-size-12'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Solved") {
                        var TrxStatus = "<span class='badge badge-soft-success font-size-12'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Closed") {
                        var TrxStatus = "<span class='badge badge-soft-danger font-size-12'>" + json[i].Status + "</span>"
                    }


                    var urlaction = "<div class='dropdown'>" +
                        "<a class='btn btn-light btn-sm dropdown-toggle' href='#' role='button'" +
                    "data-bs-toggle='dropdown' aria-haspopup='true'>" +
                    "<i class='fa fas fa-ellipsis-h'></i>" +
                    "</a>" +
                    "<ul class='dropdown-menu dropdown-menu-end'>" +
                    "<li><a class='dropdown-item' href='#' onclick=PublishTransactionTicketNumber(" + json[i].ID + ")>Publish</a></li>" +
                    "</ul>" +
                        "</div>" 
                    myListTransactionTicket.row.add([urlaction, newDate + ' ' + newTime, json[i].TicketNumber, json[i].CategoryName, json[i].UserCreate, TrxStatus, json[i].SLA]).draw(false);

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
function PublishTransaction() {
    var TrxCustomerID = $("#hd_customerID").val();
    var TrxUserName = $("#hd_sessionLogin").val();
    var form_data = JSON.stringify({ TrxCustomerID: TrxCustomerID, TrxUserName: TrxUserName });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Crm_Trx_Ticket.asmx/UIDESKPublishTransaction",
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
                                    'Transaction Ticket Has Been Publish',
                                    'success'
                                ).then(function () {
                                    $("#modal-list-transaction-ticket").modal('hide');
                                    window.location.href = "Crm_Trx_Thread.aspx";
                                });                            
                            } else {
                                swal(
                                    '',
                                    'Publish Ticket Has Been Failed !',
                                    'success'
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
function PublishTransactionTicketNumber(ParamID) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxTicketNumber: ParamID });
                $.ajax({
                    url: "asmx/Crm_Trx_Ticket.asmx/UIDESKPublishTransactionTicketNumber",
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
                                    'Transaction Ticket Has Been Publish',
                                    'success'
                                ).then(function () {
                                    TableListDataTransaction($("#hd_customerID").val());
                                });
                            } else {
                                swal(
                                    '',
                                    'Publish Ticket Has Been Failed !',
                                    'success'
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
function AddTransaction() {
    $("#modal-list-transaction-ticket").modal('hide');
    $("#Ticket_EscalationLayer").val("");
    $("#Ticket_DateofTransaction").val("");
    $("#Ticket_ProductType").val("");
    $("#Ticket_UserStatus").val("");
    $("#Ticket_Priority").val("");
    $("#Ticket_UserCategory").val("");
    $("#Reported_Account").val("");
    //$("#Ticket_SourceChannel").val("");
    $("#Ticket_Category").val("");
    $("#Ticket_Enquiry").val("");
    $("#Ticket_EnquiryDetail").val("");
    $("#Ticket_EnquiryReason").val("");
    $("#Ticket_Status").val("");
    $("#Ticket_Escalation").val("");
    CKEDITOR.instances.Ticket_Complaints.setData("");
    CKEDITOR.instances.Ticket_NoteAgent.setData("");
    $("#Ticket_SLA").val("");
    $("#hd_SLA").val("");
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
// *Properties Ticket* //

// *Customer Channel* //
function ChannelCustomer(ParameterID) {
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

                ResultCustomerChannel = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].FlagChannel.substr(0, 1).toUpperCase() + '</span></div>' +
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
    ChannelSelect($("#ContentPlaceHolder1_TrxID").val())
}
function DeleteChannel(ParamID) {
    $("#ContentPlaceHolder1_TrxID").val(ParamID)
    $("#ContactChannel").modal('show');
    $("#SimpanChannel").hide()
    $("#UpdateChannel").hide()
    $("#DeleteChannel").show()
    ChannelSelect($("#ContentPlaceHolder1_TrxID").val())
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
                                ChannelCustomer($("#ContentPlaceHolder1_CustomerID").val())
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
                                ChannelCustomer($("#ContentPlaceHolder1_CustomerID").val())
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
                                ChannelCustomer($("#ContentPlaceHolder1_CustomerID").val())
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
function ChannelSelect(ParamID) {
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
// *Customer Channel* //

// *History Ticket* //
function HistoryTicket(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    var ResultHistoryTicket = "";
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK126'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            $('#Div_HistoryTicket').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].Status == "Open") {
                    var color = "primary"
                    var linkTicket = '<a class="dropdown-item" href="Crm_Trx_TicketJourney.aspx?ticketid=' + json[i].TicketNumber + '&numberid=0&threadid=0&status=' + json[i].Status + '">Edit</a>'
                } else if (json[i].Status == "Closed") {
                    var color = "danger"
                    var linkTicket = '<a class="dropdown-item" href="#" onclick=LinkTicket(' + json[i].TicketNumber + ')>Edit</a>'
                } else if (json[i].Status == "Pending") {
                    var color = "warning"
                    var linkTicket = '<a class="dropdown-item" href="Crm_Trx_TicketJourney.aspx?ticketid=' + json[i].TicketNumber + '&numberid=0&threadid=0&status=' + json[i].Status + '">Edit</a>'
                } else if (json[i].Status == "Solved") {
                    var color = "success"
                    var linkTicket = '<a class="dropdown-item" href="Crm_Trx_TicketJourney.aspx?ticketid=' + json[i].TicketNumber + '&numberid=0&threadid=0&status=' + json[i].Status + '">Edit</a>'
                }
                ResultHistoryTicket = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].TicketSourceName.substr(0, 1).toUpperCase() + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="font-size-15 mb-1 text-truncate"><a href="#" class="text-dark">' + json[i].TicketNumber + '</a></h5>' +
                    '<p class="badge badge-soft-' + color + ' font-size-12">' + json[i].Status + '</p>' +
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
                $('#Div_HistoryTicket').append(ResultHistoryTicket)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SearchingTicket(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    var ResultCustomerSearching = "";
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK127'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_HistoryTicket').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].Status == "Open") {
                    var color = "primary"
                    var linkTicket = '<a class="dropdown-item" href="Crm_Trx_TicketJourney.aspx?ticketid=' + json[i].TicketNumber + '&numberid=0&threadid=0&status=' + json[i].Status + '">Edit</a>'
                } else if (json[i].Status == "Closed") {
                    var color = "danger"
                    var linkTicket = '<a class="dropdown-item" href="#" onclick=LinkTicket(' + json[i].TicketNumber + ')>Edit</a>'
                } else if (json[i].Status == "Pending") {
                    var color = "warning"
                    var linkTicket = '<a class="dropdown-item" href="Crm_Trx_TicketJourney.aspx?ticketid=' + json[i].TicketNumber + '&numberid=0&threadid=0&status=' + json[i].Status + '">Edit</a>'
                } else if (json[i].Status == "Solved") {
                    var color = "success"
                    var linkTicket = '<a class="dropdown-item" href="Crm_Trx_TicketJourney.aspx?ticketid=' + json[i].TicketNumber + '&numberid=0&threadid=0&status=' + json[i].Status + '">Edit</a>'
                }
                ResultHistoryTicket = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].TicketSourceName.substr(0, 1).toUpperCase() + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="font-size-15 mb-1 text-truncate"><a href="#" class="text-dark">' + json[i].TicketNumber + '</a></h5>' +
                    '<p class="badge badge-soft-' + color + ' font-size-12">' + json[i].Status + '</p>' +
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
                $('#Div_HistoryTicket').append(ResultHistoryTicket)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function LinkTicket(ParameterID) {
    swal(
        '',
        'Ticket Has Been Closed',
        'info'
    ).then(function () {
        return false;
    });
    return false;
}
// *History Ticket* //

// *Customer Popup* //
function ValidasiDataCustomer(ChannelAccount) {
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
                        getWS_MasterCustomerSelected($("#ContentPlaceHolder1_TrxCustomerID").val())
                        ProfileSelect($("#ContentPlaceHolder1_TrxCustomerID").val())

                    } else if (json[i].Result == "DataAdaDiUpload") {

                        $("#Ticket_SearchCustomer").val(ChannelAccount)
                        UIDESK_TrmCustomerUpload(ChannelAccount)
                        $("#modal-SearchUser").modal('show');

                    } else if (json[i].Result == "DataGkAdaDiUpload") {

                        $("#modalcustomer").modal('show');
                        $("#AddCustomer_HP").val(ChannelAccount)

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
function getWS_MasterCustomerSelected(custNik) {
    $("#ButtonSaveDataProfile").css("display", "none")
    var selectedValue = custNik;
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK313'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCustomer = "", jenisKelamin;

            for (i = 0; i < json.length; i++) {
                alert("1")
                $("#ContentPlaceHolder1_CustomerID").val(json[i].CustomerID)
                $('#InisialName').append(json[i].Name.substr(0, 1).toUpperCase())
                $('#Ticket_CustomerName').append(json[i].Name)
                $("#hd_customerID").val(json[i].CustomerID);
                //$('#Ticket_CustomerName').empty().append(json[i].Name);
                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');
                //$('#Ticket_CustomerBirth').empty().append(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);

                $("#Reported_Name").val(json[i].Name);
                $("#Reported_Phone").val(json[i].HP);
                $("#Reported_Email").val(json[i].Email);
                $("#Reported_Address").val(json[i].Alamat);
                //CKEDITOR.instances.Reported_Address.setData(json[i].Alamat)
                $("#modal-searching-other").modal('hide');
                $("#modal-SearchUser").modal('hide');
                
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
// *Customer Popup* //

// *Customer Searching* //
function SearchingUser(ParameterID) {
    $("#ActionNewCustomer").show()
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    var ResultCustomerSearching = "";
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK121'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_CustomerSearching').empty();
            for (i = 0; i < json.length; i++) {

                ResultCustomerSearching = '<ul class="list-unstyled chat-list" onclick="ProfileSelect(' + json[i].CustomerID + ')">' +
                    '<li class="active">' +
                    '<a href="#">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].Name.substr(0, 1).toUpperCase() + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="text-truncate font-size-14 mb-1">' + json[i].Name + '</h5>' +
                    '<p class="text-truncate mb-0">' + json[i].HP + '</p>' +
                    '<p class="text-truncate mb-0">' + json[i].Email + '</p>' +
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
function ProfileSelect(ParamID) {
    $("#ContentPlaceHolder1_CustomerID").val(ParamID)
    var selectedValue = ParamID;
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');

                $("#hd_customerID").val($("#ContentPlaceHolder1_CustomerID").val())
                $("#ContentPlaceHolder1_TrxCustomerID").val($("#ContentPlaceHolder1_CustomerID").val())
                //$('#Ticket_CustomerName').empty().append(json[i].Name);
                $('#InisialName').append(json[i].Name.substr(0, 1).toUpperCase())
                $('#Ticket_CustomerName').append(json[i].Name)
                //$('#Ticket_CustomerBirth').empty().append(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                $("#Reported_Name").val(json[i].Name);
                $("#Reported_Phone").val(json[i].HP);
                $("#Reported_Email").val(json[i].Email);
                $("#Reported_Address").val(json[i].Alamat);
                //CKEDITOR.instances.Reported_Address.setData(json[i].Alamat)
                $("#divSearchingCustomer").hide()

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#TxtSearchingCustomer").val("")
    $('#Div_CustomerSearching').empty()
    ChannelCustomer(selectedValue);
    HistoryTicket(selectedValue)
    $("#ActionNewCustomer").hide()
}
// *Customer Searching* //

// *CRUD Data Customer* //
function ActionNewCustomer() {
    $("#modalcustomer").modal('show');
}
function ShowCustomerEdit() {
    if ($("#hd_customerID").val() == "") {
        swal(
            '',
            'Customer Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        $("#modalcustomer").modal('show');
        TrmSelect($("#hd_customerID").val())
        $("#UpdateCustomer").show()
        $("#SimpanCustomer").hide()
    }
}
function TrmSelect(ParamID) {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + ParamID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');

                $("#AddCustomer_Birth").val(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                $("#AddCustomer_Name").val(json[i].Name)
                $("#AddCustomer_ComboGender").val(json[i].JenisKelamin)
                $("#AddCustomer_NIK").val(json[i].NIK)
                $("#AddCustomer_HP").val(json[i].HP)
                $("#AddCustomer_Email").val(json[i].Email)
                $("#AddCustomer_Alamat").val(json[i].Alamat)
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
}
function ActionSimpanCustomer() {
    if ($("#AddCustomer_Name").val() == "") {
        swal(
            '',
            'Name Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AddCustomer_ComboGender").val() == "") {
        swal(
            '',
            'Gender Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AddCustomer_Alamat").val() == '') {
        swal(
            '',
            'Address Empty',
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
                    TrxUsername: $("#hd_sessionLogin").val(), TrxCusTomerName: $("#AddCustomer_Name").val(), TrxCusTomerEmail: $("#AddCustomer_Email").val(),
                    TrxCusTomerPhone: $("#AddCustomer_HP").val(), TrxCusTomerGender: $("#AddCustomer_ComboGender").val(), TrxCusTomerDate: $("#AddCustomer_Birth").val(),
                    TrxCusTomerNIK: $("#AddCustomer_NIK").val(), TrxCusTomerAlamat: $("#AddCustomer_Alamat").val(), TrxNumberID: "0", TrxCustomerPolisNumber: "0",
                    TrxFacebook: $("#AddCustomer_Facebook").val(), TrxInstagram: $("#AddCustomer_Instagram").val(), TrxTwitter: $("#AddCustomer_Twitter").val()
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/InsertTransactionCustomer",
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
                                    'Insert Customer Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modalcustomer").modal('hide');
                                });
                                getWS_MasterCustomerSelected(json[i].CustomerID)
                                ProfileSelect(json[i].CustomerID)
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
                    }
                })

            }
        })
}
function ActionUpdateCustomer() {
    if ($("#hd_customerID").val() == '') {
        swal(
            '',
            'Customer Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#hd_sessionLogin").val() == '') {
        swal(
            '',
            'Session Empty, Please Re-Login',
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
                    TrxCustomerID: $("#hd_customerID").val(), TrxUsername: $("#hd_sessionLogin").val(), TrxCusTomerName: $("#AddCustomer_Name").val(), TrxCusTomerEmail: $("#AddCustomer_Email").val(),
                    TrxCusTomerPhone: $("#AddCustomer_HP").val(), TrxCusTomerGender: $("#AddCustomer_ComboGender").val(), TrxCusTomerDate: $("#AddCustomer_Birth").val(),
                    TrxCusTomerNIK: $("#AddCustomer_NIK").val(), TrxCusTomerAlamat: $("#AddCustomer_Alamat").val(), TrxStatus: "Y", TrxFacebook: $("#AddCustomer_Facebook").val(),
                    TrxInstagram: $("#AddCustomer_Instagram").val(), TrxTwitter: $("#AddCustomer_Twitter").val()
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/UpdateTransactionCustomer",
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
                                    $("#modalcustomer").modal('hide');
                                });
                                ProfileSelect($("#hd_customerID").val())
                                getWS_MasterCustomerSelected($("#hd_customerID").val())
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
// *CRUD Data Customer* //

// *Script Greeting* //
function ScriptGreeting() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_ScriptGreeting.asmx/ActionScript",
        data: "{ID:'0', Channel:'" + getParameterByName("channel") +"', Header:'0', Status:'0', Greeting:'0', UserName: '" + $("#hd_sessionLogin").val() + "', Action: 'Ticket'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultComboChannel = "";

            for (i = 0; i < json.length; i++) {

                $('#Div_ScriptGreeting').append(json[i].GreetingScript)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    
}
// *Script Greeting* //

function goBack() {
    window.history.back();
    // atau
    // window.history.go(-1);
}