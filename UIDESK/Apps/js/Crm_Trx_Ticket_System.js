$(document).ready(function () {
    //$("#modalnewcustomer").modal('show');
    FormLoadTicket();
    DropdownTicket();
    DropdownPerusahaanType();
    var ParameterAccount = getParameterByName("account")
    if (ParameterAccount != "") {
        FormAccountCustomer(ParameterAccount)
    }
    $("#Form_Ticket_Kantor").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            $("#Div_KantorSearching").show()
            SearchingKantor($(this).val());
        } else if (jumlahString == 0) {
            $("#Div_KantorSearching").hide()
            //SearchingUser($(this).val(""));
        }
    });
    $("#AddCustomer_NamaPerusahaan").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            $("#Div_CustomerSearching").show()
            SearchingPerusahaan($(this).val());
        } else if (jumlahString == 0) {
            //$("#FormAddPerusahaan").show()
            $("#FormListPIC").hide()
            $("#Div_CustomerSearching").hide()
            //SearchingUser($(this).val(""));
        }
    });
    $("#Ticket_Nama_Perusahaan").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            $("#Div_NamaPerusahaan").show()
            SearchingPerusahaanConvertCase($(this).val());
        } else if (jumlahString == 0) {
            $("#Div_NamaPerusahaan").hide()
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
        $(this).val(FormatRupiah(value, 'Rp '));
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
    DropdownStatus();
    DropdownPriority();
    DropdownCustomerType();
    DropdownChannelType();
    FormLoadJourney();
    $("#FormListPIC").hide()
    if ($("#HD_SiteID").val() == "1") {
        $("#ButtonConvertToCase").show();
    } else {
        $("#ButtonConvertToCase").hide();
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
function ActionCreateTicketClose() {
    var ChannelAccount = getParameterByName("account")
    var ChannelIncoming = getParameterByName("channel")
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
    if ($("#Form_Ticket_NoAju").val() == '' || $("#Form_Ticket_NoAju").val() == null) {
        $("#Form_Ticket_NoAju").val("-")
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
    if ($("#Form_Ticket_NilaiTransaksi").val() == '' || $("#Form_Ticket_NilaiTransaksi").val() == null) {
        $("#Form_Ticket_NilaiTransaksi").val("0")
    }
    //if ($("#Form_Ticket_NilaiTransaksi").val() == '') {
    //    swal(
    //        '',
    //        'Nilai Transaksi is empty',
    //        'info'
    //    ).then(function () {
    //        return false;
    //    });
    //    return false;
    //}
    if ($("#Ticket_Complaints").val() == '') {
        swal(
            '',
            'Pertanyaan is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Ticket_NoteAgent").val() == '') {
        swal(
            '',
            'Jawaban is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (getParameterByName("numberid") == "" || getParameterByName("numberid") == null) {
        var NumberValueIDClose = "0"
    } else {
        var NumberValueIDClose = getParameterByName("numberid")
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
                    GenesysNumber: NumberValueIDClose, ThreadID: "0", Account: ChannelAccount, Channel: ChannelIncoming,
                    CustomerID: $("#ContentPlaceHolder1_CustomerID").val(), UserName: $("#hd_sessionLogin").val(), Priority: $("#Form_Ticket_Priority").val(), Status: "Closed", Subject: $("#Form_Ticket_Subject").val(),
                    Kategori: $("#Form_Ticket_Kategori").val(), SubKategori: $("#Form_Ticket_SubKategori").val(), NoAju: $("#Form_Ticket_NoAju").val(), Kantor: $("#Form_Ticket_Kantor").val(), NilaiTransaksi: $("#Form_Ticket_NilaiTransaksi").val(),
                    Pertanyaan: $("#Ticket_Complaints").val(), Jawaban: $("#Ticket_NoteAgent").val(), Posisi: "1", Tujuan: "-", Cc: "-", Action: "INSERT"
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
                                    'Insert Ticket Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trx_Taskboard.aspx?status=Open"
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
                    }
                })

            }
        })
}
function ActionCreateTicketEskalasi() {
    var ChannelAccount = getParameterByName("account")
    var ChannelIncoming = getParameterByName("channel")
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
    if ($("#Form_Ticket_NoAju").val() == '' || $("#Form_Ticket_NoAju").val() == null) {
        $("#Form_Ticket_NoAju").val("-")
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
    if ($("#Form_Ticket_NilaiTransaksi").val() == '' || $("#Form_Ticket_NilaiTransaksi").val() == null) {
        $("#Form_Ticket_NilaiTransaksi").val("0")
    }
    if ($("#Ticket_Complaints").val() == '') {
        swal(
            '',
            'Pertanyaan is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Ticket_NoteAgent").val() == '') {
        swal(
            '',
            'Jawaban is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Ticket_Nama_Perusahaan").val() == "") {
        var NamaPerusahaan = "0"
    } else {
        var NamaPerusahaan = $("#Ticket_Nama_Perusahaan").val()
    }
    if ($("#ContentPlaceHolder1_DynamicAccountID").val() == "") {
        var DynamicAccountID = "0"
    } else {
        var DynamicAccountID = $("#ContentPlaceHolder1_DynamicAccountID").val()
    }
    if (getParameterByName("numberid") == "" || getParameterByName("numberid") == null) {
        var NumberValueIDConvert = "0"
    } else {
        var NumberValueIDConvert = getParameterByName("numberid")
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
                    GenesysNumber: NumberValueIDConvert, ThreadID: "0", Account: ChannelAccount, Channel: ChannelIncoming,
                    CustomerID: $("#ContentPlaceHolder1_CustomerID").val(), UserName: $("#hd_sessionLogin").val(), Priority: $("#Form_Ticket_Priority").val(), Status: "Pending", Subject: $("#Form_Ticket_Subject").val(),
                    Kategori: $("#Form_Ticket_Kategori").val(), SubKategori: $("#Form_Ticket_SubKategori").val(), NoAju: $("#Form_Ticket_NoAju").val(), Kantor: $("#Form_Ticket_Kantor").val(), NilaiTransaksi: $("#Form_Ticket_NilaiTransaksi").val(),
                    Pertanyaan: $("#Ticket_Complaints").val(), Jawaban: $("#Ticket_NoteAgent").val(), Posisi: "2", NamaPerusahaan: NamaPerusahaan, EmailPerusahaan: "-", TeleponPerusahaan: "-",
                    NPWPPerusahaan: $("#Ticket_NPWP_Perusahaan").val(), Action: "INSERT"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_CreateTicket",
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
                                    'Insert Ticket Has Been Success',
                                    'success'
                                ).then(function () {
                                    //const strTime = getFormattedDateTime();

                                    var DescriptionNya = "Nama Agent : " + $("#hd_NameKaryawan").val() + " \n " + $("#Ticket_Complaints").val()
                                    var form_data_dinamic = JSON.stringify({
                                        NamaKantor: $("#Form_Ticket_Kantor").val()
                                        , NamaKategory: $('#Form_Ticket_Kategori').find('option:selected').text()
                                        , NamaSubCategory: $('#Form_Ticket_SubKategori').find('option:selected').text()
                                        , AccountId: DynamicAccountID
                                        , ContactId: $("#ContentPlaceHolder1_DynamicContactID").val()
                                        , Origin: "Phone"
                                        , Priority: $("#Form_Ticket_Priority").val()
                                        , Judul: $("#Form_Ticket_Subject").val()
                                        , NoTicket: $("#ContentPlaceHolder1_TrxTicketNumber").val()
                                        , description: DescriptionNya
                                    });
                                    SaveToDynamic(form_data_dinamic);
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
                    }
                })

            }
        })
}
function modalnewcustomer() {
    $("#modalnewcustomer").modal('show');
    $("#UpdateCustomer").hide()
    $("#SubmitCustomer").hide()
    $("#SimpanCustomer").show()
}
function SearchingPerusahaan(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    var ResultCustomerSearching = "";
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK170'}",
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
                    ResultCustomerSearching = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="PerusahaanSelected(' + json[i].ID + ')">' +
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
function SearchingPerusahaanConvertCase(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    var ResultCustomerSearchingConvertCase = "";
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK170'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_NamaPerusahaan').empty();
            var closeButton = '</br><a href="#" class="btn btn-soft-danger btn-sm" onclick="closeDivTicketPerusahaan()" style="margin-top:-25px;">Close</a>';
            $('#Div_NamaPerusahaan').append(closeButton);
            if (json.length > 0) {
                for (i = 0; i < json.length; i++) {
                    ResultCustomerSearchingConvertCase = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="TicketPerusahaanSelected(' + json[i].ID + ')">' +
                        '<li class="active">' +
                        '<a href="#">' +
                        '<div class="d-flex align-items-start">' +
                        '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                        '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].Nama_Perusahaan.substr(0, 1).toUpperCase() + '</span></div>' +
                        '</div>' +
                        '<div class="flex-grow-1 overflow-hidden">' +
                        '<h5 class="text-truncate font-size-14 mb-1">' + json[i].Nama_Perusahaan + '</h5>' +
                        '<p class="text-truncate mb-0">' + json[i].NomorTelepon + '</p>' +
                        '<p class="text-truncate mb-0">' + json[i].Email + '</p>' +
                        '</div>' +
                        '<div class="flex-shrink-0">' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</li>'
                    $('#Div_NamaPerusahaan').append(ResultCustomerSearchingConvertCase)
                }
            } else {
                ResultCustomerSearchingConvertCase = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="dataPerusahaanNotFound()">' +
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
                $('#Div_NamaPerusahaan').append(ResultCustomerSearchingConvertCase)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SearchingKantor(ParameterID) {
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

                    ResultKantorSearching = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="KantorSelected(' + json[i].ID + ')">' +
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
function PerusahaanSelected(ID) {
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
                $("#ContentPlaceHolder1_DynamicAccountID").val(json[i].AccountID)
                $("#Div_CustomerSearching").hide()

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#FormAddPerusahaan").hide()
    //$("#FormListPIC").show()
    //FormListPIC();
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function ComboTypePerusahaan(val) {
    var selectedText = $("#AddCustomer_Type").find("option:selected").text();
    var selectedValue = $("#AddCustomer_Type").val();
    if (selectedValue == "1") {
        $("#AddCustomer_NamaPerusahaan").val("")
        $('#AddCustomer_NamaPerusahaan').attr("disabled", false);
        $('#AddCustomer_NPWP').attr("disabled", false);
    } else if (selectedValue == "2") {
        $('#AddCustomer_NamaPerusahaan').attr("disabled", true);
        $('#AddCustomer_NPWP').attr("disabled", false);
    } else {
        $('#AddCustomer_NamaPerusahaan').attr("disabled", false);
        $('#AddCustomer_NPWP').attr("disabled", false);
    }
}
function DropdownStatus() {
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
function DropdownPriority() {
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

                // Set the selected value (change "SomeValue" to the desired value)
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
function DropdownTicket() {
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
function DropdownSubKategori(value) {
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
function DropdownChannelType() {
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
function KantorSelected(ID) {
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
function FormLoadTicket() {
    $("#Form_Ticket_Agent_Name").val($("#hd_NameKaryawan").val())
    $('#Form_Ticket_Agent_Name').attr("disabled", true);
    $("#FormNewPerusahaan").hide()
    $("#SimpanPerusahaan").hide()
    $("#CancelCustomer").hide()
    $("#UpdateCustomer").hide()
    $("#SubmitCustomer").hide()
}
function FormKantor() {
    EnableKantor();
    $("#FormKantor").modal('show');
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
function FormAccountCustomer(ChannelAccount) {
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
                        $("#DivObjectCustomer").hide()
                        $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].TrxCustomerID)
                        FormLoadCustomer($("#ContentPlaceHolder1_TrxCustomerID").val())
                        FormLoadHistoryTicket($("#ContentPlaceHolder1_TrxCustomerID").val())
                        FormLoadReported($("#ContentPlaceHolder1_TrxCustomerID").val())
                        FormLoadChannelCustomer($("#ContentPlaceHolder1_TrxCustomerID").val());
                        if (getParameterByName("channel") == "X") {
                            $("#AddCustomer_Twitter").val(ChannelAccount)
                        } else {
                            $("#AddCustomer_HP").val(ChannelAccount)
                        }
                    } else {
                        //$("#modalnewcustomer").modal('show');
                        $("#DivObjectCustomer").show()
                        if (getParameterByName("channel") == "X") {
                            $("#AddCustomer_Twitter").val(ChannelAccount)
                        } else {
                            $("#AddCustomer_HP").val(ChannelAccount)
                        }
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
function FormLoadCustomer(CustomerID) {
    FormCleansingLoadCustomer();
    FormLoadChannelCustomer(CustomerID)
    $("#ValueChannel").val(getParameterByName("account"));
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
                $('#Profile_NamaCustomer').append(json[i].Name)
                $('#Profile_NomorTelepon').append(json[i].HP)
                $('#Profile_Email_Customer').append(json[i].Email)
                $('#Profile_Facebook').append(json[i].Facebook)
                $('#Profile_Instagram').append(json[i].Instagram)
                $('#Profile_Twitter').append(json[i].Twitter)
                $("#hd_customerID").val(json[i].CustomerID);
                $('#Profile_NamaPerusahaan').append(json[i].Nama_Perusahaan)
                $("#ContentPlaceHolder1_DynamicContactID").val(json[i].ContactDynamicID)
                $("#ContentPlaceHolder1_DynamicAccountID").val(json[i].CIF)
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
    $("#ContentPlaceHolder1_CustomerID").empty()
    $('#Profile_NamaCustomer').empty()
    $('#Profile_NamaPerusahaan').empty()
    $('#Profile_NomorTelepon').empty()
    $('#Profile_Email').empty()
    $('#Profile_Facebook').empty()
    $('#Profile_Instagram').empty()
    $('#Profile_Twitter').empty()
    $("#hd_customerID").empty()
}
function FormNewPerusahaan() {
    $("#FormNewPerusahaan").show()
    $("#SimpanPerusahaan").show()
    $("#CancelCustomer").show()
    //----
    $("#FormNewCustomer").hide()
    $("#SimpanCustomer").hide()
    $("#CloseCustomer").hide()
}
function FormLoadHistoryTicket(CustomerID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: JSON.stringify({
            TrxID: CustomerID,
            TrxSearching: 'UideskIndonesia',
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'UIDESK331'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var chatList = $("#chat-list");

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

            json.forEach(function (item) {

                //var date = new Date(parseInt(item.DateCreate.match(/\d+/)[0]));
                //var optionsDate = { day: '2-digit', month: 'long', year: 'numeric' };
                //var formattedDate = date.toLocaleDateString('id-ID', optionsDate);


                //var optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
                //var formattedTime = date.toLocaleTimeString('id-ID', optionsTime);

                var date = new Date(parseInt(item.DateCreate.match(/\d+/)[0]));

                var formattedDate = formatDate(date);
                var formattedTime = formatTime(date);

                var statusColor;
                var imgChannel;
                switch (item.TicketSourceName) {
                    case "Email":
                        imgChannel = "bx bx-envelope";
                        statusColor = "warning";
                        break;
                    case "Call":
                    case "call":
                        imgChannel = "bx bx-phone-incoming";
                        statusColor = "danger";
                        break;
                    case "Instagram":
                        imgChannel = "bx bxl-instagram";
                        statusColor = "primary";
                        break;
                    case "Facebook":
                        imgChannel = "bx bxl-facebook";
                        statusColor = "primary";
                        break;
                    case "Whatsapp":
                    case "WhatsApp":
                    case "WA":
                        imgChannel = "bx bxl-whatsapp";
                        statusColor = "success";
                        break;
                    case "Twitter":
                        imgChannel = "bx bxl-twitter";
                        statusColor = "primary";
                        break;
                    default:
                        imgChannel = "bx bx-phone-incoming";
                        break;
                }

                var listItem = `
                <li class="active">
                    <a href="#" class="mt-0" onclick=DirectHistory(${item.TicketNumber})>
                        <div class="d-flex align-items-start">
                            <div class="flex-shrink-0 user-img online align-self-center me-3">
                                <div class="avatar-sm align-self-center bg-${statusColor} text-${statusColor} rounded-circle font-size-22 text-center">
                                    <i class="${imgChannel} text-light"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1 overflow-hidden">
                                <h5 class="text-truncate font-size-14 mb-1">${item.TicketNumber}</h5>
                                <p class="text-truncate mb-0">${item.AgentName}</p><p class="text-truncate mb-0">${item.Status}</p>
                            </div>
                            <div class="flex-shrink-0">
                                <div class="font-size-11">${formattedDate} ${formattedTime}</div>
                            </div>
                        </div>
                    </a>
                </li>
            `;
                chatList.append(listItem);
            });
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
function FormLoadJourney() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: JSON.stringify({
            TrxID: getParameterByName("account"),
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
function ActionCancelPerusahaan() {
    $("#FormNewPerusahaan").hide()
    $("#SimpanPerusahaan").hide()
    $("#CancelCustomer").hide()
    //----
    $("#FormNewCustomer").show()
    $("#SimpanCustomer").show()
    $("#CloseCustomer").show()
}
function ActionSimpanCustomer() {
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
        if ($("#ContentPlaceHolder1_DynamicAccountID").val() == '') {
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
        $("#ContentPlaceHolder1_DynamicAccountID").val("0")
    }
    if (getParameterByName("channel") == "Call") {
        if ($("#AddCustomer_HP").val() == "") {
            swal(
                '',
                'Nomor Telepon is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if (getParameterByName("channel") == "X") {
        if ($("#AddCustomer_Twitter").val() == "") {
            swal(
                '',
                'Data X is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
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
                //    TrxCusTomerNIK: $("#AddCustomer_NIK").val(), TrxCusTomerAlamat: $("#AddCustomer_Alamat").val(), TrxFacebook: $("#AddCustomer_Facebook").val(),
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
                //                    $("#modalnewcustomer").modal('hide');
                //                });
                //                FormLoadCustomer(json[i].CustomerID)
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
}
function ActionSimpanKantor() {
    if ($("#Kantor_Nama").val() == "") {
        swal(
            '',
            'Name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Kantor_Email").val() == "") {
        swal(
            '',
            'Email is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Kantor_Telepon").val() == '') {
        swal(
            '',
            'Telepon is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Kantor_Alamat").val() == '') {
        swal(
            '',
            'Telepon is empty',
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
                    TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Kantor_Nama").val(), TrxEmail: $("#Kantor_Email").val(), TrxTelepon: $("#Kantor_Telepon").val(),
                    TrxAlamat: $("#Kantor_Alamat").val(), TrxAction: "INSERT"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/BRA_Kantor",
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
                                    'Insert Kantor Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#FormKantor").modal('hide');
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Kantor Has Been Failed !',
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
function ActionSimpanPerusahaan() {
    if ($("#Perusahaan_Nama").val() == "") {
        swal(
            '',
            'Nama Perusahaan/Pemerintah is empty',
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
    //if ($("#Perusahaan_NPWP").val() == "") {
    //    swal(
    //        '',
    //        'Telepon is empty',
    //        'info'
    //    ).then(function () {
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
}
function ActionSimpanPelapor() {
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
    if ($("#Form_Ticket_Reported").val() == "") {
        swal(
            '',
            'Nama is empty',
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
                    TrxID: $("#ContentPlaceHolder1_TrxCustomerID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Form_Ticket_Reported").val(), TrxAction: "INSERT"
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_Ticket.asmx/BRA_Pelapor",
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
                                    'Insert Pelapor Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#Form_Ticket_Reported").val("");
                                    FormLoadReported($("#ContentPlaceHolder1_TrxCustomerID").val())
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Pelapor Has Been Failed !',
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
                    TrxCusTomerNIK: $("#AddCustomer_NIK").val(), TrxCusTomerAlamat: $("#AddCustomer_Alamat").val(), TrxFacebook: $("#AddCustomer_Facebook").val(),
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
                                    //$("#modalnewcustomer").modal('hide');
                                    $("#DivObjectCustomer").hide()
                                    FormLoadCustomer($("#ContentPlaceHolder1_TrxCustomerID").val())
                                    FormLoadHistoryTicket($("#ContentPlaceHolder1_TrxCustomerID").val())
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
function FormDataAttachment(TrxUserName) {
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
                    '<a href="#" class="text-body" onclick=FormDeleteAttachment(' + json[i].ID + ')>' +
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
function FormDeleteAttachment(TrxID) {
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
                                    FormDataAttachment($("#hd_sessionLogin").val());
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
function DirectHistory(TicketNumber) {
    console.log(TicketNumber)
    location.href = "Crm_Trx_TicketJourneySystem.aspx?ticketid=" + TicketNumber + ""
}
function FormListPIC() {
    if ($("#AddCustomer_NamaPerusahaan").val() === "" || $("#AddCustomer_NamaPerusahaan").val() === null) {
        swal(
            '',
            'Please select Perusahaan',
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
                ResultCustomerSearchingPIC = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="CustomerSelected(' + json[i].CustomerID + ')">' +
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
function closeDiv() {
    $("#Div_CustomerSearching").hide()
}
function closeDivPIC() {
    $("#Div_CustomerSearchingPIC").hide()
}
function closeDivKantor() {
    $("#Div_KantorSearching").hide()
}
function CustomerSelected(CustomerID) {
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
                $("#AddCustomer_Facebook").val(json[i].Facebook)
                $("#AddCustomer_Instagram").val(json[i].Instagram)
                $("#AddCustomer_Twitter").val(json[i].Twitter)
                $("#AddCustomer_HP").val(json[i].HP)
                //if (getParameterByName("channel") != "" && getParameterByName("channel") != null) {                 
                //} else {
                    
                //}

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#UpdateCustomer").hide()
    $("#SimpanCustomer").hide()
    $("#SubmitCustomer").show()
    $("#Div_CustomerSearchingPIC").hide()
}
function FormLoadReported(CustomerID) {
    $("#ContentPlaceHolder1_TrxCustomerID").val(CustomerID)
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + CustomerID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK175'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_CustomerReported').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].TicketNumber === null || json[i].TicketNumber === "") {
                    var TicketNumber = "-"
                } else {
                    var TicketNumber = json[i].TicketNumber
                }
                ResultReportedSearching = '<ul class="list-unstyled chat-list" onclick="CustomerSelected(' + json[i].CustomerID + ')">' +
                    '<li class="active">' +
                    '<a href="#" style="cursor:none">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].Nama.substr(0, 1).toUpperCase() + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="text-truncate font-size-14 mb-1">' + json[i].Nama + '</h5>' +
                    '<p class="text-truncate mb-0">' + TicketNumber + '</p>' +
                    //'<p class="text-truncate mb-0">' + EmailAddress + '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0">' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
                $('#Div_CustomerReported').append(ResultReportedSearching)

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function EnableKantor() {
    $("#Kantor_Nama").val("");
    $("#Kantor_Email").val("");
    $("#Kantor_Telepon").val("");
    $("#Kantor_Alamat").val("");
}
function dataPerusahaanNotFound() {
    $("#AddCustomer_NamaPerusahaan").val("")
    $("#Div_CustomerSearching").hide()
}
function dataKantorNotFound() {
    $("#Form_Ticket_Kantor").val("")
    $("#Div_KantorSearching").hide()
}
function ActionConvertToCase() {
    var ChannelAccount = getParameterByName("account")
    var ChannelIncoming = getParameterByName("channel")
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
    if ($("#Ticket_Complaints").val() == '') {
        swal(
            '',
            'Pertanyaan is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Ticket_NoteAgent").val() == '') {
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
        title: "Pastikan Kantor Sudah terdaftar pada Applikasi CRM Dynamic",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $("#modal-conver-case").modal('show');
                $.ajax({
                    type: "POST",
                    url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
                    data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK192'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x, result = "";

                        for (i = 0; i < json.length; i++) {


                            $("#Ticket_Nama_Perusahaan").val(json[i].Nama_Perusahaan)
                            $("#Ticket_Email_Perusahaan").val(json[i].Email)
                            $("#Ticket_Telepon_Perusahaan").val(json[i].NomorTelepon);
                            $("#Ticket_NPWP_Perusahaan").val(json[i].NPWP);

                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                })

            }
        });  
}
function TambahTicketPerusahaan() {
    $("#Ticket_Nama_Perusahaan").val("")
    $("#Ticket_Email_Perusahaan").val("")
    $("#Ticket_Telepon_Perusahaan").val("");
    $("#Ticket_NPWP_Perusahaan").val("");
    $("#AddTicketPerusahaan").show();
    $("#SubmitConvertToCase").hide();
}
function TicketPerusahaanSelected(ID) {
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

                $("#Ticket_Nama_Perusahaan").val(json[i].Nama_Perusahaan)
                $("#Ticket_NPWP_Perusahaan").val(json[i].NPWP)
                $("#Ticket_Telepon_Perusahaan").val(json[i].NomorTelepon)
                $("#Ticket_Email_Perusahaan").val(json[i].Email)
                $("#ContentPlaceHolder1_DynamicAccountID").val(json[i].AccountID)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#Div_NamaPerusahaan").hide();
}
function closeDivTicketPerusahaan() {
    $("#Div_NamaPerusahaan").hide();
}
function ActionSimpanTicketPerusahaan() {
    if ($("#Ticket_Nama_Perusahaan").val() == "") {
        swal(
            '',
            'Nama Perusahaan is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //if ($("#Ticket_Telepon_Perusahaan").val() == "") {
    //    swal(
    //        '',
    //        'Telepon is empty',
    //        'info'
    //    ).then(function () {
    //        return false;
    //    });
    //    return false;
    //}
    //if ($("#Ticket_Email_Perusahaan").val() == '') {
    //    swal(
    //        '',
    //        'Email is empty',
    //        'info'
    //    ).then(function () {
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

                //var form_data = JSON.stringify({
                //    TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Ticket_Nama_Perusahaan").val(), TrxEmail: $("#Ticket_Email_Perusahaan").val(),
                //    TrxTelepon: $("#Ticket_Telepon_Perusahaan").val(), TrxNPWP: $("#Ticket_NPWP_Perusahaan").val(), TrxAction: "INSERT"
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
                //                swal(
                //                    '',
                //                    'Insert Perusahaan Has Been Success',
                //                    'success'
                //                ).then(function () {
                //                    $("#AddTicketPerusahaan").hide();
                //                    $("#SubmitConvertToCase").show();
                //                });
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
                    AccountName: $("#Ticket_Nama_Perusahaan").val()
                    , MainPhone: ""
                    , NPWP: $("#Ticket_NPWP_Perusahaan").val()
                    , Email: ""
                    , ContactId: ""

                });

                savePerusahaanTicketDynamic(form_data)

            }
        })
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

        if ($("#ContentPlaceHolder1_CustomerID").val() == "") {
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
        data.append("numberid", getParameterByName('numberid'));
        data.append("customerid", $("#ContentPlaceHolder1_TrxCustomerID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "WebServiceTransaction.asmx/UploadFileAttachmentTicket",
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
            FormDataAttachment($("#hd_sessionLogin").val());

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
function AddCustomer() {
    //$("#modalnewcustomer").modal('show');
    $("#DivObjectCustomer").show()
    $("#AddCustomer_Type").val("");
    $("#AddCustomer_NamaPerusahaan").val("");
    $("#AddCustomer_NPWP").val("");
    $("#AddCustomer_Email").val("");
    $("#AddCustomer_HP").val("");
    $("#AddCustomer_Facebook").val("");
    $("#AddCustomer_Instagram").val("");
    $("#AddCustomer_Twitter").val("");
    $("#SimpanCustomer").show()
    $("#UpdateCustomer").hide()
    $("#SubmitCustomer").hide()
}
function EditCustomer() {
    if ($("#ContentPlaceHolder1_TrxCustomerID").val() == "" || $("#ContentPlaceHolder1_TrxCustomerID").val() == null) {
        swal(
            '',
            'Data Customer is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //$("#modalnewcustomer").modal('show');
    $("#DivObjectCustomer").show()
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
                $("#AddCustomer_NPWP").val(json[i].NPWP)
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
    $("#SubmitCustomer").hide()
}
function ActionSubmitCustomer() {
    //$("#modalnewcustomer").modal('hide');
    $("#DivObjectCustomer").hide()
    FormLoadCustomer($("#ContentPlaceHolder1_TrxCustomerID").val())
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
                ResultCustomerChannel = '<div class="col-xl-12 col-sm-12">' +
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
    //$("#ValueChannel").val("")
    $("#AddComboChannel").val("")
    if (getParameterByName("account") != "" && getParameterByName("account") != null) {
    } else {
        $("#ValueChannel").val("")
    }
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
        TrxCusTomerNIK: $("#AddCustomer_NIK").val(), TrxCusTomerAlamat: $("#AddCustomer_Alamat").val(), TrxFacebook: $("#AddCustomer_Facebook").val(),
        TrxInstagram: $("#AddCustomer_Instagram").val(), TrxTwitter: $("#AddCustomer_Twitter").val(), TrxNPWP: $("#AddCustomer_NPWP").val(), ContactId: contactId,
        AccountID: $("#ContentPlaceHolder1_DynamicAccountID").val()
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
                    swal(
                        '',
                        'Insert Customer Has Been Success',
                        'success'
                    ).then(function () {
                        //$("#modalnewcustomer").modal('hide');
                        $("#DivObjectCustomer").hide()
                    });
                    FormLoadCustomer(json[i].CustomerID)
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
//function getFormattedDateTime() {
//    const now = new Date();

//    const year = now.getFullYear();
//    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//    const day = String(now.getDate()).padStart(2, '0');
//    const hours = String(now.getHours()).padStart(2, '0');
//    const minutes = String(now.getMinutes()).padStart(2, '0');
//    const seconds = String(now.getSeconds()).padStart(2, '0');
//    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

//    return ${ year } ${ month } ${ day } ${ hours } ${ minutes } ${ seconds } ${ milliseconds };
//}
function SaveToDynamic(form_data) {
    try {
        $.ajax({
            url: 'WebServiceGetDataMaster.asmx/SendTicketDataAsync', // Replace with your API endpoint URL
            type: 'POST',
            contentType: 'application/json',
            data: form_data,  // Ensure form_data is valid
            success: function (data) {
                try {
                    var json = JSON.parse(data.d.Result); // Parse the response data
                    if (json.Success == true) {
                        var TicketMsDynamic = json.Datas[0].TicketDynamic;
                        UpdateTicketDynamic(TicketMsDynamic);
                        swal(
                            '',
                            'Eskalasi To Dynamic Has Been Success',
                            'success'
                        ).then(function () {
                            location.href = "Crm_Trx_Taskboard.aspx?status=Pending";
                        });
                    } else {
                        //swal(
                        //    '',
                        //    'Eskalasi To Dynamic Has Been Failed!',
                        //    'error'
                        //).then(function () {
                        //    return false;
                        //});
                        console.error('Error parsing response:', e.message);
                        swal(
                            'Error',
                            'Terjadi kesalahan saat memproses data: ' + e.message,
                            'error'
                        );
                    }
                } catch (e) {
                    console.error('Error parsing response:', e.message);
                    swal(
                        'Error',
                        'Terjadi kesalahan saat memproses data: ' + e.message,
                        'error'
                    );
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX Error:', status, error);
                swal(
                    'Error',
                    'Terjadi kesalahan saat menghubungi server.',
                    'error'
                );
            }
        });
    } catch (error) {
        console.error('Unexpected Error:', error.message);
        swal(
            'Error',
            'Terjadi kesalahan: ' + error.message,
            'error'
        );
    }

    //try {
    //    $.ajax({
    //        url: 'WebServiceGetDataMaster.asmx/SendTicketDataAsync', // Replace with your API endpoint URL
    //        type: 'POST',
    //        contentType: 'application/json',
    //        data: form_data,
    //        success: function (data) {
    //            var json = JSON.parse(data.d.Result);
    //            var i, x = "";
    //            var tblTickets = "";

    //            if (json.Success == true) {
    //                var TicketMsDynamic = json.Datas.TicketDynamic
    //                UpdateTicketDynamic($("#ContentPlaceHolder1_TrxTicketNumber").val(), TicketMsDynamic)
    //                swal(
    //                    '',
    //                    'Eskalasi To Dynamic Has Been Success',
    //                    'success'
    //                ).then(function () {
    //                    location.href = "Crm_Trx_Taskboard.aspx?status=Pending"
    //                });
    //            } else {
    //                swal(
    //                    '',
    //                    'Eskalasi To Dynamic Has Been Failed !',
    //                    'error'
    //                ).then(function () {
    //                    return false;
    //                });
    //                return false;
    //            }

    //        },
    //        error: function (xhr, status, error) {
    //            console.error('Error:', status, error);
    //        }
    //    });  
    //} catch (error) {
    //    swal(
    //        'Error',
    //        'Terjadi kesalahan: ' + error.message,
    //        'error'
    //    );
    //}  
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
                $("#ContentPlaceHolder1_DynamicAccountID").val(AccountId)
                savePerusahaanCrm(AccountId);
            } else {
                swal(
                    '',
                    'Insert Perusahaan Dynamic Has Been Failed !',
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
                            $("#AddCustomer_NamaPerusahaan").val($("#Perusahaan_Nama").val());
                            $("#FormNewPerusahaan").hide();
                            $("#SimpanPerusahaan").hide();
                            $("#CloseCustomer").hide();
                            $("#FormNewCustomer").show();
                            $("#SimpanCustomer").show();
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
function savePerusahaanTicketDynamic(form_data) {
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
                $("#ContentPlaceHolder1_DynamicAccountID").val(AccountId)
                savePerusahaanTicketCrm(AccountId);
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
function savePerusahaanTicketCrm(accountId) {
    var form_data = JSON.stringify({
        TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Ticket_Nama_Perusahaan").val(), TrxEmail: "-",
        TrxTelepon: "-", TrxNPWP: $("#Ticket_NPWP_Perusahaan").val(), TrxAction: "INSERT"
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
                        'Insert Perusahaan Has Been Success',
                        'success'
                    ).then(function () {
                        $("#AddTicketPerusahaan").hide();
                        $("#SubmitConvertToCase").show();
                    });
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
                ResultCustomerSearchingPIC = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="CustomerSelected(' + json[i].CustomerID + ')">' +
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