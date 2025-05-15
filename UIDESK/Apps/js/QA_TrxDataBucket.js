$(document).ready(function () {
    DataTableBucket()
    DropdownSite();
    //DropdownChannel();
    DropdownChannelNya();
    DropdownAgent();
    DropdownAgentIncomingChannel();
    DropdownBulan();
    DropdownTahun();
    $("#ActionGetDataSelesai").hide();
    DropdownCustomerType();
    if ($("#HD_SiteID").val() == "1") {
        $("#DataOutbound").show();
    } else {
        $("#DataOutbound").hide();
    }
    $('#DeleteProses').hide();
    //renderJourneyTimeline();
});

function markRow(acraID, className) {
    $('#TableBucketIncoming tbody tr').removeClass('row-reject row-preview row-followup');
    $('#TableBucketIncoming tbody tr').each(function () {
        if ($(this).attr('data-acraid') === acraID) {
            $(this).addClass(className);
        }
    });
}

function DataTableBucket() {
    var myTable = $('#TableBucketIncoming').DataTable({
        "order": [[6, "asc"]]
    });

    $.fn.dataTable.ext.errMode = 'none';

    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK013'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            myTable.clear().draw();

            for (var i = 0; i < json.length; i++) {
                var miliseconds = parseInt(json[i].QADateDistribution.replace("/Date(", "").replace(")/", ""));
                var dateObject = new Date(miliseconds);
                var formattedDate = dateObject.getFullYear() + '-' +
                    ('0' + (dateObject.getMonth() + 1)).slice(-2) + '-' +
                    ('0' + dateObject.getDate()).slice(-2);
                var formattedTime = dateObject.toLocaleTimeString("en-GB", {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                var ConverTanggal = formattedDate + ' ' + formattedTime;

                var urlclick = '<div class="d-flex flex-row align-items-center">';

                urlclick +=
                    '<button class="btn btn-icon rounded-circle p-2 bg-danger text-white me-2 action-icon" title="Delete" onclick="Delete(\'' + json[i].AcraID + '\')">' +
                        '<i class="mdi mdi-delete mdi-18px"></i>' +
                    '</button>';

                if (json[i].Channel !== "Outbound") {
                    urlclick +=
                        '<button class="btn btn-icon rounded-circle p-2 bg-warning text-white me-2 action-icon" title="Reject" onclick="Reject(\'' + json[i].AcraID + '\'); markRow(\'' + json[i].AcraID + '\', \'row-reject\')">' +
                            '<i class="mdi mdi-cancel mdi-18px"></i>' +
                        '</button>' +
                        '<button class="btn btn-icon rounded-circle p-2 bg-info text-white me-2 action-icon" title="Preview" onclick="PreviewScreen(\'' + json[i].AcraID + '\'); markRow(\'' + json[i].AcraID + '\', \'row-preview\')">' +
                            '<i class="mdi mdi-eye mdi-18px"></i>' +
                        '</button>';
                }

                urlclick +=
                    '<a href="QA_Form.aspx?qaid=' + json[i].Kode +
                    '&type=' + json[i].Channel +
                    '&UserType=' + json[i].Site +
                    '&act=fu&ticketid=' + json[i].TicketNumber +
                    '&acraid=' + json[i].AcraID + '" ' +
                    'class="btn btn-icon rounded-circle p-2 bg-success text-white action-icon me-2" ' +
                    'title="Follow Up" onclick="markRow(\'' + json[i].AcraID + '\', \'row-followup\')">' +
                        '<i class="mdi mdi-arrow-right-bold-box mdi-18px"></i>' +
                    '</a>';

                urlclick += '</div>';

                // Tambahkan baris dan simpan referensi node untuk set atribut
                var rowNode = myTable.row.add([
                    json[i].AcraID,
                    json[i].Channel,
                    json[i].TicketNumber,
                    json[i].NAME,
                    json[i].Bulan,
                    json[i].NoTelpon,
                    json[i].DataType,
                    ConverTanggal,
                    urlclick
                ]).draw(false).node();

                // Set atribut data-acraid ke <tr>
                $(rowNode).attr('data-acraid', json[i].AcraID);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function PreviewScreen(AcraID) {
    $("#DeleteProsesPreview").css("display", "none")
    $("#PreviewFollowup").css("display", "block")
    $("#ActionProsesFollowup").css("display", "none")
    $("#ContentPlaceHolder1_TrxID").val(AcraID)
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + AcraID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: '0', TrxAction: 'UIDESK016'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].FileExist == null || json[i].FileExist == "") {
                    var FileExits = "0"
                } else {
                    var FileExits = "True"
                }
                if (FileExits == "True") {
                    if (json[i].Channel == "Call") {
                        //$("#addContactModalScreenCall").modal('show');
                        //document.getElementById("FrameAudio").src = "https://bravo.beacukai.go.id/omni/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + json[i].FilePath + ""
                        //location.href ="http://10.216.132.133/qmdata/apps/UI_ACRA_DETAIL.aspx?view=detail&id=" + AcraID +""
                        $('#Journeymailconversationnew').hide();
                        window.open('http://10.216.132.133/qmdata/apps/UI_ACRA_DETAIL.aspx?view=detail&id=' + AcraID + '', '_blank');
                    } else if (json[i].Channel == "Email" || json[i].Channel == "EMAIL") {
                        $("#addContactModalScreenNonCall").modal('show');
                        $('#Journeymailconversationnew').show();
                        renderJourneyTimeline(AcraID, json[i].Channel);
                        EskalasiEmailTeamLeader(json[i].TicketNumber)
                        EmailConversationNew(AcraID)
                        //document.getElementById("FrameNonCall").src = "" + json[i].FilePath + ""
                        $('#FrameNonCall').hide();
                    } else {
                        renderJourneyTimeline(AcraID, json[i].Channel);
                        DataBubleSosialMedia(AcraID)
                        $("#addContactModalScreenNonCall").modal('show');
                        $('#FrameNonCall').show();
                        $('#Journeymailconversationnew').hide();
                        document.getElementById("FrameNonCall").src = "" + json[i].FilePath.replace("DK-", "") + ""
                    }
                } else {
                    swal(
                        '',
                        'File Not Exits',
                        'error'
                    ).then(function () {
                        $("#modal-audio").modal('hide');
                    });

                }
                ////alert("1")
                ////QM_PlayAudio.href = "http://localhost/BriqiStream/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + json[i].FilePath + ""
                //window.open("http://localhost/BriqiStream/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + json[i].FilePath + "", '_blank');
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //$("#addContactModalScreenCall").modal('show');
    //document.getElementById("FrameAudio").src = "http://localhost/Bravo/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + AcraID + ""
}
function GetData() {
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK013'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {



            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function AddManual() {
    $("#addContactModal").modal('show');
    $("#div_manual").show();
    $("#div_upload").hide();
}
function GetIncoming() {
    $("#addContactModalTable").modal('show');
    $("#DivTableNya").hide()
}
function DropdownSite() {
    var ComboSite = $('#ComboSite');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK244'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, resultSite = "";

            // Misalnya, Anda ingin menjadikan Site dengan ID tertentu sebagai default
            var defaultSiteID = "1"; // Ganti dengan ID yang diinginkan

            ComboSite.empty();
            ComboSite.append('<option value="">Select</option>');

            for (i = 0; i < json.length; i++) {
                resultSite = '<option value="' + json[i].ID + '">' + json[i].Site + '</option>';

                // Jika ID dari site sama dengan defaultSiteID, tambahkan atribut 'selected'
                if (json[i].ID == defaultSiteID) {
                    resultSite = '<option value="' + json[i].ID + '" selected>' + json[i].Site + '</option>';
                }

                ComboSite.append(resultSite);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}
function DropdownChannel() {
    var ComboChannel = $('#ComboChannel');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK237'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultChannel = "";

            ComboChannel.empty();
            ComboChannel.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultChannel = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
                ComboChannel.append(resultChannel);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdownChannelNya() {
    var ComboChannelNya = $('#ComboChannelNya');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK230'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultChannel = "";

            ComboChannelNya.empty();
            ComboChannelNya.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultChannel = '<option value="' + json[i].ChannelName + '">' + json[i].ChannelName + '</option>';
                ComboChannelNya.append(resultChannel);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdownAgent() {
    var ComboAgent = $('#ComboAgent');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK027'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultAgent = "";

            ComboAgent.empty();
            ComboAgent.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultAgent = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                ComboAgent.append(resultAgent);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdownBulan() {
    var ComboBulan = $('#ComboBulan');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK022'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultBulan = "";

            // Ambil bulan saat ini dalam format nama bulan (contoh: "Februari")
            var currentMonthName = new Date().toLocaleString('id-ID', { month: 'long' });

            ComboBulan.empty();
            ComboBulan.append('<option value="">Select</option>');

            for (i = 0; i < json.length; i++) {
                resultBulan = '<option value="' + json[i].NamaBulan + '">' + json[i].NamaBulan + '</option>';

                // Cek jika bulan dari server cocok dengan bulan saat ini
                if (json[i].NamaBulan === currentMonthName) {
                    resultBulan = '<option value="' + json[i].NamaBulan + '" selected>' + json[i].NamaBulan + '</option>';
                }

                ComboBulan.append(resultBulan);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}
function DropdownTahun() {
    var ComboTahun = $('#ComboTahun');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK023'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, resultTahun = "";

            // Ambil tahun saat ini
            var currentYear = new Date().getFullYear();

            ComboTahun.empty();
            ComboTahun.append('<option value="">Select</option>');

            for (i = 0; i < json.length; i++) {
                resultTahun = '<option value="' + json[i].Tahun + '">' + json[i].Tahun + '</option>';

                // Cek jika tahun dari server cocok dengan tahun saat ini
                if (json[i].Tahun == currentYear) {
                    resultTahun = '<option value="' + json[i].Tahun + '" selected>' + json[i].Tahun + '</option>';
                }

                ComboTahun.append(resultTahun);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
function ActionSubmitPenilaianManual() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Username is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboSite").val() == "") {
        swal(
            '',
            'Site is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboChannel").val() == "") {
        swal(
            '',
            'Channel is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboAgent").val() == "") {
        swal(
            '',
            'Agent is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#WaktuInteraksi").val() == "") {
        swal(
            '',
            'Waktu interaksi is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboBulan").val() == "") {
        swal(
            '',
            'Bulan is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboTahun").val() == "") {
        swal(
            '',
            'Tahun is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Nama_PIC").val() == "") {
        swal(
            '',
            'Ticket Number CRM Dynamic is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //if ($("#QA_Account").val() == "") {
    //    swal(
    //        '',
    //        'Account is empty',
    //        'info'
    //    ).then(function () {
    //        return false;
    //    });
    //    return false;
    //}
    //if ($("#AddCustomer_Type").val() == "") {
    //    swal(
    //        '',
    //        'Type is empty',
    //        'info'
    //    ).then(function () {
    //        return false;
    //    });
    //    return false;
    //}
    //if ($("#QA_Link").val() == "") {
    //    swal(
    //        '',
    //        'Link is empty',
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
                    ID: "0", Site: $("#ComboSite").val(), Channel: $("#ComboChannel").val(),
                    Agent: $("#ComboAgent").val(), Waktu: $("#WaktuInteraksi").val().replace("T"," "), Bulan: $("#ComboBulan").val(), Tahun: $("#ComboTahun").val(),
                    Account: $("#QA_Account").val(), Link: $("#QA_Link").val(), UserName: $("#hd_sessionLogin").val(), Name: $("#Nama_PIC").val(),
                    Type: $("#AddCustomer_Type").val(), Action: "INSERT"
                });

                $.ajax({
                    url: "asmx/QA_Trx_DataBucket.asmx/SimpanTransaksi",
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
                                PageDirectOutbound();
                                //swal(
                                //    '',
                                //    'Insert Data Has Been Success',
                                //    'success'
                                //).then(function () {
                                //});
                                //window.location.href = "QA_Form.aspx?qaid=" + json[i].KodeAlatTest + "&type=" + $("#ComboChannel").val() + "&UserType=" + json[i].UserType + "&act=fu&ticketid=" + $("#Nama_PIC").val() + "&acraid=" + json[i].AcraID + "";
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed !',
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
function PageDirectOutbound() {
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK029'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultAgent = "";

            for (i = 0; i < json.length; i++) {
                window.location.href = "QA_Form.aspx?qaid=" + json[i].KodeAlatTest + "&type=" + $("#ComboChannel").val() + "&UserType=" + json[i].Site + "&act=fu&ticketid=" + $("#Nama_PIC").val() + "&acraid=" + json[i].AcraID + "";

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function PageDirectFollow(ID) {
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + ID + "', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK030'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultAgent = "";

            for (i = 0; i < json.length; i++) {
                window.location.href = "QA_Form.aspx?qaid=" + json[i].KodeAlatTest + "&type=" + json[i].Channel + "&UserType=" + json[i].Site + "&act=fu&ticketid=" + json[i].TicketNumber + "&acraid=" + json[i].AcraID + "";
                //QA_Form.aspx ? qaid = QA576 & type=Web % 20Socket % 20Chat & UserType=PT & act=fu & ticketid=& acraid=DK - 56378
                //QA_Form.aspx ? qaid = QA576 & type=Web % 20Socket % 20Chat & UserType=PT & act=fu & ticketid=20250415085207032 & acraid=DK - 56378
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionGetDataManual() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Username is empty',
            'warning'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboChannelNya").val() == "") {
        swal(
            '',
            'Channel is empty',
            'warning'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboAgentIncoming").val() == "") {
        swal(
            '',
            'Agent is empty',
            'warning'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#startdate").val() == "") {
        swal(
            '',
            'Start Date is empty',
            'warning'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#enddate").val() == "") {
        swal(
            '',
            'End Date is empty',
            'warning'
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

                var myTable = $('#TableBucket').DataTable({
                    "order": [[0, "asc"]]
                });

                $.fn.dataTable.ext.errMode = 'none';

                $.ajax({
                    type: "POST",
                    url: "asmx/QA_Trx_DataBucket.asmx/BRA_QA_GetDataTransaction",
                    data: "{Channel:'" + $('#ComboChannelNya').val() + "', StarDate: '" + $('#startdate').val() + "', EndDate: '" + $('#enddate').val() + "', Action: '" + $("#ComboAgentIncoming").val() + "', UserName:'" + $('#hd_sessionLogin').val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i = "";

                        myTable.clear().draw();
                        for (i = 0; i < json.length; i++) {

                            if (json[i].local_start_time != null) {
                                var milisegundos = parseInt(json[i].local_start_time.replace(/\/Date\((\d+)\)\//g, "$1"));
                                var date = new Date(milisegundos);
                                var year = date.getFullYear();
                                var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
                                var day = date.getDate().toString().padStart(2, '0');
                                var hours = date.getHours().toString().padStart(2, '0');
                                var minutes = date.getMinutes().toString().padStart(2, '0');
                                var seconds = date.getSeconds().toString().padStart(2, '0');
                                var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                                console.log("Formatted DateTime: " + formattedDateTime);  // Example: 2025-03-15 13:23:52
                            } else {
                                var ConverTanggal = "-"
                            }
                            if (json[i].Channel == "X") {
                                //var urlclick = '<div style="display: flex; justify-content: space-between; width: 100%;">' +
                                //    '<a class="dropdown-item" href="#" onclick="Proses(\'' + json[i].transaction_id + '\')">' +
                                //    '<span class="btn btn-outline-primary">' +
                                //    '<i class="uil uil-check-circle"></i> Follow up' +
                                //    '</span>' +
                                //    '</a>' +
                                //    '<span class="btn btn-outline-success">' +
                                //    '<i class="uil uil-check-circle"></i> Preview' +
                                //    '</span>' +
                                //    '</a>' +
                                //    '</div>';
                                var urlclick =
                                    '<div class="d-flex flex-row align-items-center">' +
                                    '<a class="btn btn-icon rounded-circle p-2 bg-success text-white action-icon me-2" title = "Follow up" onclick = "Proses(\'' + json[i].transaction_id + '\')" > ' +
                                    '<i class="mdi mdi-arrow-right-bold-box mdi-18px"></i>' +
                                    '</a>' +
                                    '<a class="btn btn-icon rounded-circle p-2 bg-info text-white me-2 action-icon" title="Preview" onclick="PreviewScreenIncoming(\'' + json[i].transaction_id + '\',\'' + json[i].sid + '\',\'' + json[i].LinkChat + '\')">' +
                                    '<i class="mdi mdi-eye mdi-18px"></i>' +
                                    '</a></div>';
                            } else {
                                //var urlclick = '<div style="display: flex; justify-content: space-between; width: 100%;">' +
                                //    '<a class="dropdown-item" href="#" onclick="Proses(\'' + json[i].transaction_id + '\')">' +
                                //    '<span class="btn btn-outline-primary">' +
                                //    '<i class="uil uil-check-circle"></i> Follow up' +
                                //    '</span>' +
                                //    '</a>' +
                                //    '<a class="dropdown-item" href="#" onclick="PreviewScreenIncoming(\'' + json[i].transaction_id + '\',\'' + json[i].sid + '\',\'' + json[i].LinkChat + '\')">' +
                                //    '<span class="btn btn-outline-success">' +
                                //    '<i class="uil uil-check-circle"></i> Preview' +
                                //    '</span>' +
                                //    '</a>' +
                                //    '</div>';
                                var urlclick =
                                    '<div class="d-flex flex-row align-items-center">' +                                  
                                    '<a class="btn btn-icon rounded-circle p-2 bg-info text-white me-2 action-icon" title="Preview" onclick="PreviewScreenIncoming(\'' + json[i].transaction_id + '\',\'' + json[i].sid + '\',\'' + json[i].LinkChat + '\')">' +
                                    '<i class="mdi mdi-eye mdi-18px"></i>' +
                                    '</a>' +
                                    '<a class="btn btn-icon rounded-circle p-2 bg-success text-white action-icon me-2" title = "Follow up" onclick = "Proses(\'' + json[i].transaction_id + '\')" > ' +
                                    '<i class="mdi mdi-arrow-right-bold-box mdi-18px"></i>' +
                                    '</a>' +
                                    '</div>';
                            }
                            myTable.row.add([urlclick, json[i].transaction_id, json[i].Channel, json[i].ani, json[i].CategoryName, json[i].AgentName, formattedDateTime]).draw(false);

                        }
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });


                $("#DivTableNya").show()
                $("#TableBucket").show()
            }
        });
}
function Proses(GenesysNumber) {
    var form_data = JSON.stringify({
        ID: GenesysNumber, UserName: $("#hd_sessionLogin").val(), Action: $("#ComboChannelNya").val()
    });
    $.ajax({
        url: "asmx/QA_Trx_DataBucket.asmx/ProsesTransaksi",
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
                        'Proses Data Has Been Success',
                        'success'
                    ).then(function () {
                        //DataTableBucketManual();
                        //DataTableBucket();
                        //$("#ActionGetDataSelesai").show();
                        PageDirectFollow(GenesysNumber)
                    });
                } else {
                    swal(
                        '',
                        'Proses Data Has Been Failed !',
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
function ActionGetDataSelesai() {
    //$("#addContactModalTable").modal('hide');
    //$("#TableBucket").hide()
    window.location.href = "QA_Trx_DataBucket.aspx?"
}
function DataTableBucketManual() {
    var myTable = $('#TableBucket').DataTable({
        "order": [[0, "asc"]]
    });

    $.fn.dataTable.ext.errMode = 'none';

    $.ajax({
        type: "POST",
        url: "asmx/QA_Trx_DataBucket.asmx/BRA_QA_GetDataTransaction",
        data: "{Channel:'" + $('#ComboChannelNya').val() + "', StarDate: '" + $('#startdate').val() + "', EndDate: '" + $('#enddate').val() + "', Action: '" + $("#ComboAgentIncoming").val() + "', UserName:'" + $('#hd_sessionLogin').val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            myTable.clear().draw();

            for (var i = 0; i < json.length; i++) {
                // Format tanggal dan waktu
                var formattedDateTime = "-";
                if (json[i].local_start_time != null) {
                    var milisegundos = parseInt(json[i].local_start_time.replace(/\/Date\((\d+)\)\//g, "$1"));
                    var date = new Date(milisegundos);
                    var year = date.getFullYear();
                    var month = (date.getMonth() + 1).toString().padStart(2, '0');
                    var day = date.getDate().toString().padStart(2, '0');
                    var hours = date.getHours().toString().padStart(2, '0');
                    var minutes = date.getMinutes().toString().padStart(2, '0');
                    var seconds = date.getSeconds().toString().padStart(2, '0');
                    formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                }

                // Buat tombol action (Follow up dan Preview)
                var urlclick = "";
                if (json[i].Channel == "X") {
                    urlclick =
                        '<div class="d-flex flex-row align-items-center">' +
                        '<a class="btn btn-icon rounded-circle p-2 bg-success text-white action-icon me-2" title="Follow up" onclick="Proses(\'' + json[i].transaction_id + '\')">' +
                        '<i class="mdi mdi-arrow-right-bold-box mdi-18px"></i>' +
                        '</a>' +
                        '<a class="btn btn-icon rounded-circle p-2 bg-info text-white me-2 action-icon" title="Preview" onclick="PreviewScreenIncoming(\'' + json[i].transaction_id + '\',\'' + json[i].sid + '\',\'' + json[i].LinkChat + '\')">' +
                        '<i class="mdi mdi-eye mdi-18px"></i>' +
                        '</a></div>';
                } else {
                    urlclick =
                        '<div class="d-flex flex-row align-items-center">' +
                        '<a class="btn btn-icon rounded-circle p-2 bg-info text-white me-2 action-icon" title="Preview" onclick="PreviewScreenIncoming(\'' + json[i].transaction_id + '\',\'' + json[i].sid + '\',\'' + json[i].LinkChat + '\')">' +
                        '<i class="mdi mdi-eye mdi-18px"></i>' +
                        '</a>' +
                        '<a class="btn btn-icon rounded-circle p-2 bg-success text-white action-icon me-2" title="Follow up" onclick="Proses(\'' + json[i].transaction_id + '\')">' +
                        '<i class="mdi mdi-arrow-right-bold-box mdi-18px"></i>' +
                        '</a>' +
                        '</div>';
                }

                // Tambahkan baris ke DataTable
                myTable.row.add([
                    urlclick,
                    json[i].transaction_id,
                    json[i].Channel,
                    json[i].ani,
                    json[i].CategoryName,
                    json[i].AgentName,
                    formattedDateTime
                ]).draw(false);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
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
function Delete(AcraID) {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Username is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (AcraID == "") {
        swal(
            '',
            'Data is empty',
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
                    url: "asmx/QA_Trx_DataBucket.asmx/DataDelete",
                    data: "{AcraID:'" + AcraID + "', UserName: '" + $('#hd_sessionLogin').val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "QA_Trx_DataBucket.aspx?"
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed !',
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
                    }
                })

            }
        });
}
//function Reject(AcraID) {
//    if ($("#hd_sessionLogin").val() == "") {
//        swal(
//            '',
//            'Username is empty',
//            'info'
//        ).then(function () {
//            return false;
//        });
//        return false;
//    }
//    if (AcraID == "") {
//        swal(
//            '',
//            'Data is empty',
//            'info'
//        ).then(function () {
//            return false;
//        });
//        return false;
//    }

//    swal({
//        title: "Do you want to process?",
//        icon: "warning",
//        buttons: true,
//        dangerMode: true,
//    })
//        .then((willDelete) => {
//            if (willDelete) {

//                $.ajax({
//                    type: "POST",
//                    url: "asmx/QA_Trx_DataBucket.asmx/DataReject",
//                    data: "{AcraID:'" + AcraID + "', UserName: '" + $('#hd_sessionLogin').val() + "'}",
//                    contentType: "application/json; charset=utf-8",
//                    dataType: "json",
//                    success: function (data) {
      
//                        var json = JSON.parse(data.d);
//                        var i = "";
//                        for (i = 0; i < json.length; i++) {
//                            if (json[i].Result == "True") {
//                                swal(
//                                    '',
//                                    'Reject Data Has Been Success',
//                                    'success'
//                                ).then(function () {
//                                    window.location.href = "QA_Trx_DataBucket.aspx?"
//                                });
//                            } else {
//                                swal(
//                                    '',
//                                    'Reject Data Has Been Failed !',
//                                    'error'
//                                ).then(function () {
//                                    return false
//                                });
//                                return false
//                            }

//                        }

//                    },
//                    error: function (xmlHttpRequest, textStatus, errorThrown) {
//                        console.log(xmlHttpRequest.responseText);
//                        console.log(textStatus);
//                        console.log(errorThrown);
//                    }
//                })

//            }
//        });
//}
function ChangeAgentNya(val) {
    var selectedText = $("#ComboSite").find("option:selected").text();
    var selectedValue = $("#ComboSite").val();
    var ComboAgent = $('#ComboAgent');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK025'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultAgent = "";

            ComboAgent.empty();
            ComboAgent.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultAgent = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                ComboAgent.append(resultAgent);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdownAgentIncomingChannel() {
    var ComboAgentIncoming = $('#ComboAgentIncoming');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK021'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultAgent = "";

            ComboAgentIncoming.empty();
            ComboAgentIncoming.append('<option value="">Select</option>');

            // Tambahkan opsi "All"
            ComboAgentIncoming.append('<option value="all">All</option>');

            for (i = 0; i < json.length; i++) {
                resultAgent = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                ComboAgentIncoming.append(resultAgent);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}
let isLoading = false;
async function EmailConversationNew(refID) {
    if (isLoading) return; // Jika sudah loading, hentikan pemanggilan
    isLoading = true;
    const messageDiv = $('#Journeymailconversationnew');
    messageDiv.empty();

    try {
        // Mengambil percakapan berdasarkan refID yang diterima
        const conversationsResponse = await $.ajax({
            type: "POST",
            url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailConversation",
            data: JSON.stringify({
                RefID: refID.replace("DK-", ""),
                UserName: $("#hd_sessionLogin").val(),
                Action: 'SELECT'
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        const conversations = JSON.parse(conversationsResponse.d || conversationsResponse);

        if (!conversations || conversations.length === 0) {
            messageDiv.html("<p>No conversations found.</p>");
            return; // Keluar jika tidak ada percakapan
        }

        for (const conversation of conversations) {
            const emailId = conversation.EMAIL_ID;
            const direction = conversation.DIRECTION;

            // Format tanggal
            const formattedDate = formatDate(conversation.DateNya);
            const attachments = await fetchEmailAttachments(refID, emailId, direction);

            const emailClass = direction !== 'OUT' ? 'email-left' : 'email-right';

            const result = `
             <div class='email-wrapper'>
                 <div class='email-container ${emailClass}'>
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
    } finally {
        isLoading = false; // Reset flag setelah selesai
    }
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
                Direction: direction,
                UserName: $("#hd_sessionLogin").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        const attachments = JSON.parse(attachmentsResponse.d || attachmentsResponse);
        let attachmentHtml = '';

        const filteredAttachments = attachments.filter(attachment => {
            const attachmentDirection = attachment.DIRECTION ? attachment.DIRECTION.trim().toUpperCase() : '';
            const targetDirection = direction ? direction.trim().toUpperCase() : '';
            return attachmentDirection === targetDirection;
        });

        filteredAttachments.forEach(attachment => {
            const fileUrl = attachment.DIRECTION === 'IN' ? fileInboxHTML : fileOutboxHTML;
            const iconClass = attachment.FILETYPE === '.jpg' ? 'image-o' : 'pdf-o';

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
function formatDate(dateString) {
    const timestamp = parseInt(dateString.match(/\/Date\((\d+)\)\//)[1], 10);
    const date = new Date(timestamp);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year} ${hours}:${minutes} `;
}
async function renderJourneyTimeline(acraid, channel) {
    const container = document.querySelector('.journey-timeline');

    // Validasi `acraid` dan `channel`
    if (!acraid || !channel) {
        container.innerHTML = '<p>Invalid data. Please ensure the ID and Channel are available.</p>';
        return;
    }

    // Format `refID` untuk hanya menyimpan angka
    let refID = acraid.replace(/\D/g, ''); // Menghapus semua karakter non-digit

    // Reset semua kelas
    container.className = 'journey-timeline'; // Reset classes

    // Map channel ke kelas CSS
    switch (channel.toLowerCase()) {
        case 'email':
            container.classList.add('email');
            break;
        case 'web socket chat':
        case 'multichat': // Alias untuk WebSocket Chat
            container.classList.add('websocket', 'multichat');
            break;
        case 'instagram':
            container.classList.add('instagram');
            break;
        case 'whatsapp':
            container.classList.add('whatsapp');
            break;
        case 'facebook':
            container.classList.add('facebook');
            break;
        case 'call':
            container.classList.add('hidden');
            return; // Keluar karena "call" disembunyikan
        default:
            // Tidak ada channel tertentu, gunakan gaya default
            break;
    }

    try {
        const response = await $.ajax({
            type: "POST",
            url: "asmx/qa_form.asmx/BRA_QM_EmailInterval",
            data: JSON.stringify({
                Id: refID,
                Channel: channel
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });

        const data = JSON.parse(response.d || response);
        if (!data || data.length === 0) {
            container.innerHTML = '<p>No data available for the journey.</p>';
            return;
        }

        const item = data[0];
        let steps = [];

        if (channel.toLowerCase() === 'email') {
            steps = [
                { date: item.InboxDate ? formatDate(item.InboxDate) : "-", label: "Received Data" },
                { date: item.DateDistribute ? formatDate(item.DateDistribute) : "-", label: "Distributed to Agent" },
                { interval: item.IntervalResponseAgentFormatted ? item.IntervalResponseAgentFormatted : "-", isInterval: true },
                { date: item.DateAgent ? formatDate(item.DateAgent) : "-", label: "Handled by Agent" },
            ];
        } else {
            steps = [
                { date: item.InboxDate ? formatDate(item.InboxDate) : "-", label: "Received Data" },
                { date: item.DateDistribute ? formatDate(item.DateDistribute) : "-", label: "Distributed to Agent" },
                { interval: item.IntervalResponseAgentFormatted ? item.IntervalResponseAgentFormatted : "-", isInterval: true },
                { date: item.DateAgent ? formatDate(item.DateAgent) : "-", label: "Handled by Agent" },
                { interval: item.IntervalFinishAgentFormatted ? item.IntervalFinishAgentFormatted : "-", isInterval: true },
                { date: item.DateFinish ? formatDate(item.DateFinish) : "-", label: "Finish by Agent" },
            ];
        }


        // Tambahkan langkah untuk channel 'email'
        if (channel.toLowerCase() === 'email') {
            steps.push(
                { interval: item.IntervalResponseTLFormatted || "Not Available", isInterval: true },
                { date: item.DateTeamLeader ? formatDate(item.DateTeamLeader) : "Not Assigned", label: "Reviewed by Team Leader" }
            );
        }

        let stopGraying = false;

        const timelineHTML = steps.map((step, index) => {
            if (step.isInterval) {
                const isNotAvailable = step.interval === "Not Available";

                // Update stopGraying berdasarkan ketersediaan interval
                if (isNotAvailable) {
                    stopGraying = true;
                }

                return `
                    <div class="journey-interval ${isNotAvailable ? 'not-available' : ''}">
                        ${step.interval}
                    </div>
                    ${index < steps.length - 1 ? '<div class="journey-line ' + (stopGraying ? 'not-available' : '') + '"></div>' : '' }
                `;
            }

            return `
                <div class="journey-step">
                    <div class="journey-date">${step.date}</div>
                    <div class="journey-circle"></div>
                    <div class="journey-label">${step.label}</div>
                </div>
                ${index < steps.length - 1 ? '<div class="journey-line"></div>' : '' }
            `;
        }).join("");

        container.innerHTML = timelineHTML;
    } catch (error) {
        console.error('Error fetching journey data:', error);
        container.innerHTML = '<p>Error loading journey timeline. Please try again later.</p>';
    }
}
function formatDate(dateString) {
    const timestamp = parseInt(dateString.replace(/\/Date\((\d+)\)\//, '$1'), 10);
    const date = new Date(timestamp);

    // Format tanggal
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Format waktu (24 jam)
    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    return `${formattedDate} ${formattedTime}`;
}
function EskalasiEmailTeamLeader(TicketNumber) {
    var messageDiv = $('#EskalasiEmailTeamLeader');
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID: '" + TicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK072', TrxActionType: 'CMB001'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;

            messageDiv.empty();
            if (json.length != "") {
                for (i = 0; i < json.length; i++) {
                    var ReasonNya
                    if (json[i].Reason != null) {
                        ReasonNya = '<div class="text-muted">' +
                            '' + json[i].Reason + '' +
                            '</div>'
                    } else {
                        ReasonNya = ''
                    }
                    var StatusNya = "";
                    if (json[i].Status == "Eskalasi Team Leader") {
                        StatusNya = 'sent to team leader'
                    } else {
                        StatusNya = json[i].Status
                    }
                    ResultTicketActivity = '<div class="timeline-item">' +
                        '<div class="timeline-block">' +
                        '<div class="timeline-box card">' +
                        '<div class="card-body">' +
                        '<div class="timeline-date">' + json[i].TanggalNya + '</div>' +
                        '<h5 class="mt-3 font-size-14">' + StatusNya + '</h5>' +
                        //'<div class="text-muted">' +
                        //'' + json[i].Reason + '' +
                        //'</div>' +
                        '' + ReasonNya + '' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    messageDiv.append(ResultTicketActivity);

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
function DataBubleSosialMedia(AcraID) {
    var messageDiv = $('#EskalasiEmailTeamLeader');
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID: '" + AcraID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK073', TrxActionType: 'CMB001'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;

            messageDiv.empty();
            if (json.length != "") {
                for (i = 0; i < json.length; i++) {
                    var ReasonNya
                    if (json[i].Jumlah != null) {
                        ReasonNya = '<div class="text-muted">' +
                            '' + json[i].Jumlah + '' +
                            '</div>'
                    } else {
                        ReasonNya = ''
                    }
                    ResultTicketActivity = '<div class="timeline-item">' +
                        '<div class="timeline-block">' +
                        '<div class="timeline-box card">' +
                        '<div class="card-body">' +
                        //'<div class="timeline-date">' + json[i].TanggalNya + '</div>' +
                        '<h5 class="mt-3 font-size-14">' + json[i].Type + '</h5>' +
                        //'<div class="text-muted">' +
                        //'' + json[i].Reason + '' +
                        //'</div>' +
                        '' + ReasonNya + '' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    messageDiv.append(ResultTicketActivity);

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
function PreviewScreenIncoming(AcraID, TicketNumber, Url) {
    //alert(AcraID)
    //alert(Url)
    //return false
    //$('#DeleteProses').show();
    $("#PreviewFollowup").css("display", "none")
    $("#DeleteProsesPreview").css("display", "block")
    $("#ActionProsesFollowup").css("display", "block")
    $("#ContentPlaceHolder1_TrxID").val(AcraID)
    if ($("#ComboChannelNya").val() == "Email" || $("#ComboChannelNya").val() == "email") {
        $("#addContactModalScreenNonCall").modal('show');
        $('#Journeymailconversationnew').show();
        renderJourneyTimeline(AcraID, $("#ComboChannelNya").val());
        EskalasiEmailTeamLeader(TicketNumber)
        EmailConversationNew(AcraID)
        $('#FrameNonCall').hide();
    } else if ($("#ComboChannelNya").val() == "Call") {
        $('#Journeymailconversationnew').hide();
    } else {        
        renderJourneyTimeline(AcraID, $("#ComboChannelNya").val());
        DataBubleSosialMedia(AcraID)
        $("#addContactModalScreenNonCall").modal('show');
        $('#FrameNonCall').show();
        $('#Journeymailconversationnew').hide();
        document.getElementById("FrameNonCall").src = Url.replace("DK-", "")
    }
    //$.ajax({
    //    type: "POST",
    //    url: "asmx/QA_Form.asmx/QM_TrxDropdown",
    //    data: "{TrxID:'" + AcraID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: '0', TrxAction: 'UIDESK016'}",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {

    //        var json = JSON.parse(data.d);
    //        var i, x, result = "";

    //        for (i = 0; i < json.length; i++) {

    //            if (json[i].FileExist == null || json[i].FileExist == "") {
    //                var FileExits = "0"
    //            } else {
    //                var FileExits = "True"
    //            }
    //            if (FileExits == "True") {
    //                if (json[i].Channel == "Call") {
    //                    //$("#addContactModalScreenCall").modal('show');
    //                    //document.getElementById("FrameAudio").src = "https://bravo.beacukai.go.id/omni/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + json[i].FilePath + ""
    //                    //location.href ="http://10.216.132.133/qmdata/apps/UI_ACRA_DETAIL.aspx?view=detail&id=" + AcraID +""
    //                    $('#Journeymailconversationnew').hide();
    //                    window.open('http://10.216.132.133/qmdata/apps/UI_ACRA_DETAIL.aspx?view=detail&id=' + AcraID + '', '_blank');
    //                } else if (json[i].Channel == "Email" || json[i].Channel == "EMAIL") {
    //                    $("#addContactModalScreenNonCall").modal('show');
    //                    $('#Journeymailconversationnew').show();
    //                    renderJourneyTimeline(AcraID, json[i].Channel);
    //                    EskalasiEmailTeamLeader(json[i].TicketNumber)
    //                    EmailConversationNew(AcraID)
    //                    //document.getElementById("FrameNonCall").src = "" + json[i].FilePath + ""
    //                    $('#FrameNonCall').hide();
    //                } else {
    //                    renderJourneyTimeline(AcraID, json[i].Channel);
    //                    DataBubleSosialMedia(AcraID)
    //                    $("#addContactModalScreenNonCall").modal('show');
    //                    $('#FrameNonCall').show();
    //                    $('#Journeymailconversationnew').hide();
    //                    document.getElementById("FrameNonCall").src = "" + json[i].FilePath.replace("DK-", "") + ""
    //                }
    //            } else {
    //                swal(
    //                    '',
    //                    'File Not Exits',
    //                    'error'
    //                ).then(function () {
    //                    $("#modal-audio").modal('hide');
    //                });

    //            }
    //            ////alert("1")
    //            ////QM_PlayAudio.href = "http://localhost/BriqiStream/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + json[i].FilePath + ""
    //            //window.open("http://localhost/BriqiStream/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + json[i].FilePath + "", '_blank');
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
    ////$("#addContactModalScreenCall").modal('show');
    ////document.getElementById("FrameAudio").src = "http://localhost/Bravo/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + AcraID + ""
}
function ActionProses() {
    var form_data = JSON.stringify({
        ID: $("#ContentPlaceHolder1_TrxID").val(), UserName: $("#hd_sessionLogin").val(), Action: $("#ComboChannelNya").val()
    });
    $.ajax({
        url: "asmx/QA_Trx_DataBucket.asmx/ProsesTransaksi",
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
                        'Proses Data Has Been Success',
                        'success'
                    ).then(function () {
                        DataTableBucketManual();
                        DataTableBucket();
                        $("#ActionGetDataSelesai").show();
                        PageDirectFollow($("#ContentPlaceHolder1_TrxID").val())
                    });
                } else {
                    swal(
                        '',
                        'Data already exits',
                        'info'
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
function Reject(AcraID) {
    const sessionUser = $('#hd_sessionLogin').val();
    if (!sessionUser) {
        return showAlert('Username is empty', 'info');
    }
    if (!AcraID) {
        return showAlert('Data is empty', 'info');
    }
    $.ajax({
        type: "POST",
        url: "asmx/QA_Trx_DataBucket.asmx/QA_CheckingDataReject",
        data: JSON.stringify({ AcraID: AcraID, UserName: sessionUser }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            let response;
            try {
                response = JSON.parse(data.d);
            } catch (e) {
                return showAlert('Respon server tidak valid', 'error');
            }

            if (response.length === 0 || response[0].Result !== "Ready") {
                return showAlert('Data tidak tersedia', 'info');
            }

            Swal.fire({
                title: "Do you want to process?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                dangerMode: true
            }).then((result) => {
                if (result.isConfirmed) {
                    processReject(AcraID, sessionUser);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error("Error Checking Data:", error);
            showAlert('Terjadi kesalahan saat memeriksa data', 'error');
        }
    });
}
function processReject(AcraID, userName) {
    $.ajax({
        type: "POST",
        url: "asmx/QA_Trx_DataBucket.asmx/DataReject",
        data: JSON.stringify({ AcraID: AcraID, UserName: userName }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            let response;
            try {
                response = JSON.parse(data.d);
            } catch (e) {
                return showAlert('Respon server tidak valid saat reject', 'error');
            }

            if (response.length > 0 && response[0].Result === "True") {
                Swal.fire({
                    icon: 'success',
                    title: 'Reject Data Has Been Success',
                    showConfirmButton: true
                }).then(() => {
                    window.location.href = "QA_Trx_DataBucket.aspx";
                });
            } else {
                showAlert('Reject Data Has Been Failed!', 'error');
            }
        },
        error: function (xhr, status, error) {
            console.error("Error Rejecting Data:", error);
            showAlert('Terjadi kesalahan saat proses reject', 'error');
        }
    });
}
function showAlert(message, type = 'info') {
    Swal.fire({
        icon: type,
        title: '',
        text: message
    });
}
function DeleteProsesPreview() {
    $.ajax({
        type: "POST",
        url: "asmx/QA_Trx_DataBucket.asmx/DeleteAcraID",
        data: JSON.stringify({ AcraID: $("#ContentPlaceHolder1_TrxID").val(), UserName: $("#hd_sessionLogin").val() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            let response;
            try {
                response = JSON.parse(data.d);
            } catch (e) {
                return showAlert('Respon server tidak valid saat reject', 'error');
            }

            if (response.length > 0 && response[0].Result === "True") {
                swal(
                    '',
                    'Delete Data Has Been Success',
                    'success'
                ).then(function () {
                    $("#addContactModalScreenNonCall").modal('hide');
                    DataTableBucketManual();
                });
            } else {
                showAlert('Delete Data Has Been Failed!', 'error');
            }
        },
        error: function (xhr, status, error) {
            console.error("Error Rejecting Data:", error);
            showAlert('Terjadi kesalahan saat proses reject', 'error');
        }
    });
}
function CheckingProsesData() {
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK021'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultAgent = "";

            for (i = 0; i < json.length; i++) {
                resultAgent = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                ComboAgentIncoming.append(resultAgent);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
function PreviewFollowup() {
    PageDirectFollow($("#ContentPlaceHolder1_TrxID").val())
}