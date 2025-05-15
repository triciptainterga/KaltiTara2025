$(document).ready(function () {
    //$("#QA_Name").val($("#hd_NameKaryawan").val())
    //$("#divRatingPenilaian").hide()
    //$("#divKesimpulanSaran").hide()

    MasterCustomer();
    MasterDropdown();
    //MasterHeader(getParameterByName("qaid"))
    if (getParameterByName("act") == "edit") {

        //$("#alerttopright").hide();
        //$("#ButtonAction").css("display", "none")
        //$("#ButtonActionUpdate").css("display", "none")
        //$("#ButtonHeaderAttachment").hide()
        //$("#DivTotalSkor").show()
        //$("#DivInteraction").show()
        //$("#THInteraction_Header").css("display", "none")
        //CKEDITOR.instances.Interaction_Header.disabled
        //JourNeyInteraction(getParameterByName("headerid"))
        //$("#DivHistoryPenilaian").show()

        MasterHeader(getParameterByName("qaid"));

        $("#Div_Interaction_Header").hide()
        $("#Div_File_Interaction_Header").hide()
        $("#Div_Button_Interaction_Header").hide()
        $("#DivTotalSkor").show()
        $("#DivInteraction").show()
        $("#DivHistoryPenilaian").show()

        //if (getParameterByName("UserType") == "PT") {
        if (getParameterByName("type") == "Call") {
            $("#QM_PlayAudio").show();
            $("#Q1_Internal_NonCall").show();
            TransactionSelected("Q1_Call");
            MasterChannelSelected("Q1_Call", 0)
            $('#Q1_Call_CmbChannel').attr("disabled", true);
        } else {
            TransactionSelected("Q1_NonCall");
            MasterChannelSelected("Q1_NonCall", 0)
            $("#Q1_Internal_NonCall").show();
        }
        //}

        //$("#QA_Name").val($("#hd_NameKaryawan").val())
        if (getParameterByName("status") != "Finnished") {
            if ($("#QM_LevelUser").val() != "Administrator" || $("#QM_LevelUser").val() != "Admin_Release") {
                InsertDataPickup()
            }
        }

    } else {

        MasterCustomer();
        MasterHeader(getParameterByName("qaid"));

        $("#Div_Interaction_Header").show()
        $("#Div_File_Interaction_Header").show()
        $("#Div_Button_Interaction_Header").show()
        $("#DivTotalSkor").hide()
        $("#DivInteraction").hide()
        $("#DivHistoryPenilaian").hide()

        //if (getParameterByName("UserType") == "PT") {
        if (getParameterByName("type") == "Call") {
            DataAcraSelected("Q1_Call", getParameterByName("acraid"))
            $("#Q1_Internal_NonCall").show();
            MasterChannelSelected("Q1_Call", 0)
        } else {
            $("#Q1_Internal_NonCall").show();
        }
        //}

    }
    if (getParameterByName("status") == "Finnished") {
        if ($("#QM_LevelUser").val() == "Admin_Release") {
            $("#DivInteraction").show()
        } else {
            $("#DivInteraction").hide()
        }
    } else {
        $("#TambahKesimpulanSaran").hide();
    }
    $("#Div_Button_Interaction_Header").hide();
    $("#ButtonActionInteractionSubmit").hide();
    $("#ButtonInteractionAttachment").hide();
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    //return $ESAPI.encoder().encodeForHTML(results[2].replace(/\+/g, " "))
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
    //return $ESAPI.encoder().encodeForHTML(decodeURIComponent(results[2].replace(/\+/g, ' ')));
}
// * Source Master Data * //
function MasterCustomer() {
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + getParameterByName("ticketid") + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: '0', TrxAction: 'UIDESK014'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                var str, year, month, day, hour, minute, d, finalDate;
                str = json[i].DateTimeStart.replace(/\D/g, "");
                d = new Date(parseInt(str));

                year = d.getFullYear();
                month = pad(d.getMonth() + 1);
                day = pad(d.getDate());
                hour = pad(d.getHours());
                minutes = pad(d.getMinutes());

                finalDate = year + "-" + month + "-" + day + " " + hour + ":" + minutes;

                var strTicket, yearTicket, monthTicket, dayTicket, hourTicket, minuteTicket, dTicket, finalDateTicket;
                strTicket = json[i].DateCreate.replace(/\D/g, "");
                dTicket = new Date(parseInt(str));

                yearTicket = d.getFullYear();
                monthTicket = pad(d.getMonth() + 1);
                dayTicket = pad(d.getDate());
                hourTicket = pad(d.getHours());
                minuteTicket = pad(d.getMinutes());

                finalDateTicket = yearTicket + "-" + monthTicket + "-" + dayTicket + " " + hourTicket + ":" + minuteTicket;

                 //Form Penilaian
                $("#ContentPlaceHolder1_QM_AgentID").val(json[i].AgentID)
                $("#QA_Agent_New").val(json[i].NAME)
                $("#QA_Channel_New").val(json[i].TicketSourceName)
                $("#QA_JenisPermasalahan_New").val(json[i].CategoryName)
                $("#QA_NomorTicket_New").val(json[i].TicketNumber)
                $("#QA_Type").val(json[i].CustomerType)
                $("#QA_NamaNasabah").val(json[i].NamaCustomer)
                $("#QA_NamaUser").val(json[i].NamaPerusahaan)
                $("#QA_NomorKartu").val(json[i].NomorRekening)
                $("#QA_NomorTelepon").val(json[i].NoTelpon)
                $("#QA_WaktuInteraksi").val(finalDate)
                $("#QA_PeriodePenilaian").val(json[i].Bulan)

                //Form Pencatatan
                $("#QA_NomorTicket_New").val(json[i].TicketNumber)
                $("#QA_TanggalTicket").val(finalDateTicket)
                $("#QA_JenisPermasalahan_New").val(json[i].CategoryName)
                $("#QA_SubCategory").val(json[i].SubCategory1Name)
                $("#QA_Subject").val(json[i].SubCategory3Name)
                $("#QA_Kantor").val(json[i].VendorName)
                $("#QA_NilaiTransaksi").val(json[i].SumberInformasi)
                $("#QA_NomorKartu").val(json[i].NomorRekening)
                $("#Ticket_Pertanyaan").val(json[i].DetailComplaint)
                $("#Ticket_Jawaban").val(json[i].ResponComplaint)
                $("#Ticket_TeamLeader").val(json[i].CatatanTeamLeader)
                $("#Ticket_Resolusi").val(json[i].Resolusi)
                $("#Ticket_Deskripsi").val(json[i].Deskripsi)
                $("#Ticket_Dynamic").val(json[i].TicketDynamic)
                $("#Ticket_TicketIKC").val(json[i].TicketIKC)
                $("#Ticket_Nama_Agent_Outbound").val(json[i].NamaAgentOutbound)
                $("#Ticket_Tanggal_Update").val(json[i].DateUpdateOutbound)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function MasterDropdown() {
    var DropdownAgent = $('#QA_Agent');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: 'Dropdown', TrxAction: 'UIDESK001'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                DropdownAgent.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var DropdownChannel = $('#QA_Channel');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: 'Dropdown', TrxAction: 'UIDESK002'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultchannel = "";

            for (i = 0; i < json.length; i++) {

                resultchannel = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
                DropdownChannel.append(resultchannel);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var DropdownJenisPermasalahan = $('#QA_JenisPermasalahan');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: 'Dropdown', TrxAction: 'UIDESK003'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultjenispermasalahan = "";

            for (i = 0; i < json.length; i++) {

                resultjenispermasalahan = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
                DropdownJenisPermasalahan.append(resultjenispermasalahan);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var Interaction_ComboStatus = $('#Interaction_ComboStatus');
    //var JenisKondisi = "AllWhereData";
    //var NamaTable = "UIDESK_QM_TrmStatus";
    //if (getParameterByName("status") == "Return") {
    //    var KondisiData = "Where type='" + $("#QM_LevelUser").val() + "' and status='" + getParameterByName("status") + "'";
    //} else {
    //    var KondisiData = "Where type='" + $("#QM_LevelUser").val() + "'";
    //}
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + $("#QM_LevelUser").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: '" + getParameterByName("status") + "', TrxAction: 'UIDESK006'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].status + '">' + json[i].status + '</option>';
                Interaction_ComboStatus.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

}
function GetNomorTicketAgent(ParamID) {
    var DropdownNomorTicket = $('#QA_NomorTicket');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + $('#QA_Agent').val() + "', TrxUserName: '" + $('#QA_Channel').val() + "', TrxStatus: '" + $('#QA_JenisPermasalahan').val() + "', TrxAction: 'UIDESK004'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultnomorticket = "";

            DropdownNomorTicket.empty()
            DropdownNomorTicket.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultnomorticket = '<option value="' + json[i].TicketNumber + '">' + json[i].TicketNumber + '</option>';
                DropdownNomorTicket.append(resultnomorticket);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
// * Source Master Data * //

// * Template Transaksi Data Penilaian * //
function MasterHeader(qaid) {
    if (getParameterByName("act") == "edit") {
        var TotalPersen
        var jsonTextPersenTable = JSON.stringify({ HeaderID: getParameterByName("headerid"), KodeGrup: "PersenNya" });
        $.ajax({
            type: "POST",
            url: "asmx/QA_Form.asmx/QM_GETTotalNilaiHistory",
            data: jsonTextPersenTable,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsonPersenTable = JSON.parse(data.d);
                var i = "";
                if (jsonPersenTable.length != "") {
                    for (i = 0; i < jsonPersenTable.length; i++) {
                        TotalPersen = jsonPersenTable[i].ValueIjo
                    }
                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })

        var jsonTextSkorTable = JSON.stringify({ HeaderID: getParameterByName("headerid"), KodeGrup: "TotalNya" });
        $.ajax({
            type: "POST",
            url: "asmx/QA_Form.asmx/QM_GETTotalNilaiHistory",
            data: jsonTextSkorTable,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsonSkorTable = JSON.parse(data.d);
                var i = "";
                if (jsonSkorTable.length != "") {
                    for (i = 0; i < jsonSkorTable.length; i++) {

                        if (TotalPersen == "undifined" || TotalPersen == null) {
                            var HasilTotalPersen = jsonSkorTable[i].ValueIjo
                        } else {
                            var HasilTotalPersen = TotalPersen
                        }
                        $('#TrxTotalSkor').append($('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">Bobot</td>')
                            .append('<td scope="col" style="width: 100px; text-align: center;">' + HasilTotalPersen + ' %</td>'),
                            $('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">Skor</td>')
                                .append('<td scope="col" style="width: 100px; text-align: center;">' + jsonSkorTable[i].ValueIjo + '</td>'));
                        //.append('<td scope="col" style="width: 100px; text-align: center;">100</td></tr>'));
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
    var JenisKondisi = "AllWhereData";
    var NamaTable = "QA_mGrupPertanyaan";
    var KondisiData = "Where KodeAlatTest='" + qaid + "' order by id asc";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
    var NilaiInput;
    var idkodeitempertanyaan;
    var idkodeitempenilaian;
    //console.log("Table Channel Information " + NamaTable + KondisiData + jsonText)
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/GetWhereRecords",
        data: jsonText,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "", resultNilai = "";

            //console.log(json);
            var dataHeaderNya = "";
            for (i = 0; i < json.length; i++) {

                /*var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");*/

                var TotalNilaiSkor = "0";
                $('#tableForm1').append($('<tr id="' + json[i].KodeGrup + '" class="table-light" style="background-color:gray">')
                    .append('<td style="width: 50px;"></td>')
                    .append('<td style="width: 900px; font-weight: bold; font-style: italic; text-align: left;">' + json[i].ItemGrup + '</td>')
                    .append('<td style="width: 100px; text-align: center;"></td>')
                    .append('<td style="width: 100px; text-align: center;"><span class="badge rounded-pill badge-soft-primary font-size-14" style="text-align:center;">' + json[i].BobotGrup + '</span></td>')
                    .append('<td style="width: 200px;"></td>')
                    .append('<td><div id="TotalSkor_' + json[i].KodeGrup + '"></div></td></tr>'));

                if (getParameterByName("act") == "edit") {
                    var jsonTextSkor = JSON.stringify({ HeaderID: getParameterByName("headerid"), KodeGrup: "" + json[i].KodeGrup + "" });
                    //alert(jsonTextSkor)
                    $.ajax({
                        type: "POST",
                        url: "asmx/QA_Form.asmx/QM_GETTotalNilaiHistory",
                        data: jsonTextSkor,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var jsonSkor = JSON.parse(data.d);
                            var xx = 0;

                            if (jsonSkor.length != "") {

                                //alert(TotalNilaiSkor)
                                TotalNilaiSkor = "<span class='badge rounded-pill badge-soft-primary font-size-14'>" + jsonSkor[xx].ValueIjo + "</span>"
                                $("#TotalSkor_" + jsonSkor[xx].KodeGroupNya).append(TotalNilaiSkor);

                            }

                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    })

                } else {
                    TotalNilaiSkor = "<span class='badge rounded-pill badge-soft-primary font-size-14'>0</span>"
                    $("#TotalSkor_" + json[i].KodeGrup).append(TotalNilaiSkor);
                }

                var jsonTextSub = JSON.stringify({ tableType: "AllWhereData", tableName: "QA_mItemPertanyaan", paramQuery: "where KodeGrup='" + json[i].KodeGrup + "' ORDER BY NoUrut Desc" });
                var dataSubNya = ""
                $.ajax({
                    type: "POST",
                    url: "asmx/QA_Form.asmx/GetWhereRecords",
                    data: jsonTextSub,
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (dataSub) {
                        var jsonSub = JSON.parse(dataSub.d);
                        var iSub, xSub, resultSub = "";
                        var UrutNya = 0;
                        let xx = 0;

                        //console.log("Sub : " + jsonSub);
                        for (iSub = 0; iSub < jsonSub.length; iSub++) {

                            //if (jsonSub[iSub].TittlePertanyaan == "" || jsonSub[iSub].TittlePertanyaan == null) {
                            //    var Tittle = jsonSub[iSub].TittlePertanyaan;
                            //} else {
                            //    var Tittle = "";
                            //}
                            //console.log("Nilai " + resultNilai);
                            UrutNya = UrutNya + 1;
                            var html = '<tr>' +
                                '<td style="width: 50px;">' + jsonSub[iSub].NoUrut + '</td> ' +
                                '<td style="width: 900px;cursor:pointer;" onclick=TittleIndikator(' + jsonSub[iSub].ID + ')>' + jsonSub[iSub].ItemPertanyaan + '</td> ' +
                                '<td style="width: 100px; text-align: center;"><a href="#" onclick=UserCommentTransaction("' + jsonSub[iSub].KodePertanyaan + '")><i class="fa fa-plus"></i></a></td> ' +
                                '<td style="width: 100px; text-align: center;"></td> ' +
                                '<td style="width: 200px;" colspan="2"><div id="isiData_' + jsonSub[iSub].KodePertanyaan + '"></div>' +
                                '</td>' +
                                '</tr>';
                            //Ini Untuk masukin sub question ke headernya
                            jQuery("#" + jsonSub[iSub].KodeGrup + "").after(html);

                            var KodeGrupNya = jsonSub[iSub].KodeGrup

                            if (jsonSub[iSub].GroupingNilai == "Y") {
                                var NamaTable = "vRentangNilai_GroupingNilai"
                            } else {
                                var NamaTable = "vRentangNilai"
                            }
                            //Object Rentang Nilai
                            var jsonTextNilai = JSON.stringify({ tableType: "AllWhereData", tableName: NamaTable, paramQuery: "where Expr2='" + jsonSub[iSub].KodePertanyaan + "'" });
                            var resultNilai = "";
                            //console.log("Table Json Nilai" + jsonTextNilai)

                            $.ajax({
                                type: "POST",
                                url: "asmx/QA_Form.asmx/GetWhereRecords",
                                data: jsonTextNilai,
                                async: false,
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (dataNilai) {
                                    var jsonNilai = JSON.parse(dataNilai.d);
                                    var iNilai, xNilai;

                                    for (iNilai = 0; iNilai < jsonNilai.length; iNilai++) {
                                        //console.log("NilaiObject" + jsonNilai[iNilai].KodePertanyaan);

                                        if (getParameterByName("act") == "edit") {
                                            //console.log("NilaiMaster : " + jsonNilai[iNilai].Nilai);
                                            //var responseX = CheckedRadioButton(jsonNilai[iNilai].KodePenilaian);
                                            //console.log("NilaiInput : " + responseX);

                                            //Test Coba Restu
                                            var DetailPenilaianID
                                            var NamaTableS = "QA_TrxDetailPenilaianHistory"
                                            var jsonTextNilaiEdit = JSON.stringify({ tableType: "AllWhereData", tableName: NamaTableS, paramQuery: "where Header_ID='" + getParameterByName("headerid") + "' And kodeitempertanyaan='" + jsonNilai[iNilai].KodePertanyaan + "' order by id asc" });
                                            var resultNilai = "";
                                            var checkedNyaNih = "";
                                            //console.log("Table Json Nilai QA_TrxDetailPenilaian" + jsonTextNilaiEdit)
                                            //var NilaiInput = 0;
                                            $.ajax({
                                                type: "POST",
                                                url: "asmx/QA_Form.asmx/GetWhereRecords",
                                                data: jsonTextNilaiEdit,
                                                async: false,
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                success: function (data) {
                                                    var jsonNilaiEdit = JSON.parse(data.d);
                                                    var iNilaiEdit, xNilai;

                                                    if (jsonNilaiEdit.length != "") {

                                                        DetailPenilaianID = jsonNilaiEdit[0].ID;
                                                        NilaiInput = jsonNilaiEdit[0].nilai;
                                                        idkodeitempertanyaan = jsonNilaiEdit[0].kodeitempertanyaan;
                                                        idkodeitempenilaian = jsonNilaiEdit[0].kodeitempenilaian;
                                                        //console.log("NilaiInput Dari QA : " + idkodeitempertanyaan + "-" + NilaiInput);
                                                        /*if (NilaiInput == jsonNilai[iNilai].Nilai) {
                                                            checkedNyaNih = "Checked";
                                                        }*/
                                                        $("#ContentPlaceHolder1_QM_ResultPenilaianID").val(json[i].ID)
                                                        //alert("1" + NilaiInput)
                                                    } else {
                                                        //alert("2" + NilaiInput)
                                                    }

                                                },
                                                error: function (xmlHttpRequest, textStatus, errorThrown) {
                                                    console.log(xmlHttpRequest.responseText);
                                                    console.log(textStatus);
                                                    console.log(errorThrown);
                                                }
                                            })
                                            //Test End

                                            ////if (CheckedRadioButton(jsonNilai[iNilai].KodePenilaian) == "1") {
                                            ////alert(NilaiInput)
                                            ////alert(jsonNilai[iNilai].Nilai)
                                            //console.log("NilaiInput Dari QA : " + idkodeitempertanyaan + "-" + NilaiInput);
                                            //console.log("NilaiInput Dari Master : " + jsonNilai[iNilai].Nilai);
                                            //console.log(NilaiInput + "-" + jsonNilai[iNilai].Nilai);
                                            if ($("#QM_LevelUser").val() != "QA") {
                                                var disabled = "disabled=disabled"
                                                //var disabled = ""
                                                //alert("1 " + disabled)
                                            } else {
                                                if (getParameterByName("status") != "Draft" && getParameterByName("status") != "Return") {
                                                    var disabled = "disabled=disabled"
                                                    //var disabled = ""
                                                    //    alert("2 " + disabled)
                                                } else {
                                                    var disabled = ""
                                                    //alert("3 " + disabled)
                                                }
                                            }
                                            //console.log("idkodeitempenilaian " + idkodeitempenilaian)
                                            //console.log("KodePenilaian " + jsonNilai[iNilai].KodePenilaian)
                                            if (idkodeitempenilaian == jsonNilai[iNilai].KodePenilaian) {
                                                if (NilaiInput == jsonNilai[iNilai].Nilai) {
                                                    //console.log("idkodeitempenilaian " + idkodeitempenilaian + " " + jsonNilai[iNilai].KodePenilaian)
                                                    //console.log("nilai Cocok" + NilaiInput + " " + jsonNilai[iNilai].Nilai);
                                                    resultNilai = "<input name='group1_" + jsonNilai[iNilai].KodePertanyaan + "' onclick=ButtonActionNilai('" + KodeGrupNya + "','" + jsonNilai[iNilai].KodePertanyaan + "','" + jsonNilai[iNilai].KodePenilaian + "','" + jsonNilai[iNilai].Nilai + "','2','" + DetailPenilaianID + "') type='radio' id='radio_" + jsonNilai[iNilai].KodePenilaian + "' Checked='' " + disabled + "> " +
                                                        "<label for='radio_" + jsonNilai[iNilai].KodePenilaian + "'>" + jsonNilai[iNilai].Nilai + "&nbsp;</label>";
                                                    //$("#radio_" + jsonNilai[iNilai].KodePenilaian).css('color', 'red');
                                                    $("#isiData_" + jsonNilai[iNilai].Expr2).append(resultNilai);

                                                } else {
                                                    //alert("False 1")
                                                    //console.log("idkodeitempenilaian " + idkodeitempenilaian + " " + jsonNilai[iNilai].KodePenilaian)
                                                    //console.log("nilai nggk Cocok" + NilaiInput + " " + jsonNilai[iNilai].Nilai);
                                                    resultNilai = "<input name='group1_" + jsonNilai[iNilai].KodePertanyaan + "' onclick=ButtonActionNilai('" + KodeGrupNya + "','" + jsonNilai[iNilai].KodePertanyaan + "','" + jsonNilai[iNilai].KodePenilaian + "','" + jsonNilai[iNilai].Nilai + "','2','" + DetailPenilaianID + "') type='radio' id='radio_" + jsonNilai[iNilai].KodePenilaian + "' " + disabled + "> " +
                                                        "<label for='radio_" + jsonNilai[iNilai].KodePenilaian + "'>" + jsonNilai[iNilai].Nilai + "&nbsp;</label>";
                                                    $("#isiData_" + jsonNilai[iNilai].Expr2).append(resultNilai);
                                                }
                                            } else {
                                                //console.log("idkodeitempenilaian " + idkodeitempenilaian + " " + jsonNilai[iNilai].KodePenilaian)
                                                //console.log("nilai nggk Cocok" + NilaiInput + " " + jsonNilai[iNilai].Nilai);
                                                resultNilai = "<input name='group1_" + jsonNilai[iNilai].KodePertanyaan + "' onclick=ButtonActionNilai('" + KodeGrupNya + "','" + jsonNilai[iNilai].KodePertanyaan + "','" + jsonNilai[iNilai].KodePenilaian + "','" + jsonNilai[iNilai].Nilai + "','2','" + DetailPenilaianID + "') type='radio' id='radio_" + jsonNilai[iNilai].KodePenilaian + "' " + disabled + "> " +
                                                    "<label for='radio_" + jsonNilai[iNilai].KodePenilaian + "'>" + jsonNilai[iNilai].Nilai + "&nbsp;</label>";
                                                $("#isiData_" + jsonNilai[iNilai].Expr2).append(resultNilai);
                                            }

                                            //if (NilaiInput == jsonNilai[iNilai].Nilai) {
                                            //    console.log("idkodeitempenilaian " + idkodeitempenilaian + " " + jsonNilai[iNilai].KodePenilaian)
                                            //    console.log("nilai Cocok" + NilaiInput + " " + jsonNilai[iNilai].Nilai);
                                            //    resultNilai = "<input name='group1_" + jsonNilai[iNilai].KodePertanyaan + "' onclick=ButtonActionNilai('" + KodeGrupNya + "','" + jsonNilai[iNilai].KodePertanyaan + "','" + jsonNilai[iNilai].KodePenilaian + "','" + jsonNilai[iNilai].Nilai + "','2') type='radio' id='radio_" + jsonNilai[iNilai].KodePenilaian + "' Checked='' " + disabled + "> " +
                                            //        "<label for='radio_" + jsonNilai[iNilai].KodePenilaian + "'>" + jsonNilai[iNilai].Nilai + "</label>";
                                            //    //$("#radio_" + jsonNilai[iNilai].KodePenilaian).css('color', 'red');
                                            //    $("#isiData_" + jsonNilai[iNilai].Expr2).append(resultNilai);

                                            //} else {
                                            //    //alert("False 1")
                                            //    console.log("idkodeitempenilaian " + idkodeitempenilaian + " " + jsonNilai[iNilai].KodePenilaian)
                                            //    console.log("nilai nggk Cocok" + NilaiInput + " " + jsonNilai[iNilai].Nilai);
                                            //    resultNilai = "<input name='group1_" + jsonNilai[iNilai].KodePertanyaan + "' onclick=ButtonActionNilai('" + KodeGrupNya + "','" + jsonNilai[iNilai].KodePertanyaan + "','" + jsonNilai[iNilai].KodePenilaian + "','" + jsonNilai[iNilai].Nilai + "','2') type='radio' id='radio_" + jsonNilai[iNilai].KodePenilaian + "' " + disabled + "> " +
                                            //        "<label for='radio_" + jsonNilai[iNilai].KodePenilaian + "'>" + jsonNilai[iNilai].Nilai + "</label>";
                                            //    $("#isiData_" + jsonNilai[iNilai].Expr2).append(resultNilai);
                                            //}

                                        } else {

                                            resultNilai = "<input name='group1_" + jsonNilai[iNilai].KodePertanyaan + "' onclick=ButtonActionNilai('" + KodeGrupNya + "','" + jsonNilai[iNilai].KodePertanyaan + "','" + jsonNilai[iNilai].KodePenilaian + "','" + jsonNilai[iNilai].Nilai + "','1','0') type='radio' id='radio_" + jsonNilai[iNilai].KodePenilaian + "'> " +
                                                "<label for='radio_" + jsonNilai[iNilai].KodePenilaian + "'>" + jsonNilai[iNilai].Nilai + "&nbsp;</label>";
                                            $("#isiData_" + jsonNilai[iNilai].Expr2).append(resultNilai);
                                        }


                                    }

                                    //console.log("#isiData_" + jsonNilai[iNilai].KodePertanyaan);
                                },
                                error: function (xmlHttpRequest, textStatus, errorThrown) {
                                    console.log(xmlHttpRequest.responseText);
                                    console.log(textStatus);
                                    console.log(errorThrown);
                                }
                            })
                            //End Object
                            /*$('#tableForm1').append($('<tr> ' +
                                '<td style="width: 50px;">' + jsonSub[iSub].KodeGrup +'</td> ' +
                                '<td style="width: 900px;">' + jsonSub[iSub].ItemPertanyaan + '</td> ' +
                                '<td style="width: 100px; text-align: center;"></td> ' +
                                '<td style="width: 200px;" colspan="2"> ' +
                                '<input name="group1" type="radio" id="radio_1" checked=""> ' +
                                '<label for="radio_1">5</label> ' +
                                '<input name="group1" type="radio" id="radio_2"> ' +
                                '<label for="radio_2">15</label> ' +
                                '<input name="group1" type="radio" id="radio_3"> ' +
                                '<label for="radio_3">20</label> ' +
                                '</td>' +
                                '</tr>'));*/
                            /*dataSubNya += '<tr> ' +
                                '<td style="width: 50px;">1 - ' + iSub + '</td> ' +
                                '<td style="width: 900px;">' + jsonSub[iSub].ItemPertanyaan + '</td> ' +
                                '<td style="width: 100px; text-align: center;"></td> ' +
                                '<td style="width: 200px;" colspan="2"> ' +
                                '<input name="group1" type="radio" id="radio_1" checked=""> ' +
                                '<label for="radio_1">5</label> ' +
                                '<input name="group1" type="radio" id="radio_2"> ' +
                                '<label for="radio_2">15</label> ' +
                                '<input name="group1" type="radio" id="radio_3"> ' +
                                '<label for="radio_3">20</label> ' +
                                '</td>' +
                                '</tr>';*/
                        }
                        //testParsing(dataSubNya);
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                })

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

}
// * Template Transaksi Data Penilaian * //

// * Data Load Transaksi Penilaian * //
function MasterChannelSelected(ComboType, channel) {
    //var Q1_Call_CmbChannel = $('#Q1_Call_CmbChannel');
    //var Q2_Call_CmbChannel = $('#Q2_Call_CmbChannel');
    var Q1_NonCall_CmbChannel = $('#QA_Channel');
    //var Q2_NonCall_CmbChannel = $('#Q2_NonCall_CmbChannel');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + channel + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: 'Dropdown', TrxAction: 'UIDESK005'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                if (ComboType == "Q1_Call") {
                    $("#Q1_Call_CmbChannel option:selected").val("Call");
                    $("#Q1_Call_CmbChannel option:selected").text("Call");
                    Q1_Call_CmbChannel.append(result);
                } else if (ComboType == "Q2_Call") {
                    $("#Q2_Call_CmbChannel option:selected").val("Call");
                    $("#Q2_Call_CmbChannel option:selected").text("Call");
                    Q2_Call_CmbChannel.append(result);
                } else if (ComboType == "Q1_NonCall") {
                    result = '<option value="' + json[i].Name + '" selected=true>' + json[i].Name + '</option>';
                    $('#QA_Channel').attr('disabled', true);
                    $('#QA_Channel').append(result);
                } else if (ComboType == "Q2_NonCall") {
                    result = '<option value="' + json[i].CHANNEL + '" selected=true>' + json[i].CHANNEL + '</option>';
                    $('#Q2_NonCall_CmbChannel').attr('disabled', true);
                    $('#Q2_NonCall_CmbChannel').append(result);
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
function TransactionSelected(QA_UserType) {
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + getParameterByName("id") + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK050', TrxActionType: 'CMB-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                var str, year, month, day, hour, minute, d, finalDate;
                str = json[i].waktu_interaksi.replace(/\D/g, "");
                d = new Date(parseInt(str));

                year = d.getFullYear();
                month = pad(d.getMonth() + 1);
                day = pad(d.getDate());
                hour = pad(d.getHours());
                minutes = pad(d.getMinutes());

                finalDate = year + "-" + month + "-" + day + " " + hour + ":" + minutes;
                d.setMinutes(d.getMinutes() - d.getTimezoneOffset());

                if (json[i].return_status == "1") {
                    if (json[i].return_status_response == null || json[i].return_status_response == "" || json[i].return_status_response == "-") {
                        $("#ColumnStatusReturn").show();
                        $("#Interaction_StatusReturn").val("Select");
                    } else {
                        $("#ColumnStatusReturn").show();
                        $("#Interaction_StatusReturn option:selected").text(json[i].return_status_response);
                    }
                } else {
                    $("#ColumnStatusReturn").hide();
                    $("#Interaction_StatusReturn").val("Select");
                }
                if (QA_UserType == "Q1_Call") {

                    //var str, year, month, day, hour, minute, d, finalDate;
                    //str = json[i].waktu_interaksi.replace(/\D/g, "");
                    //d = new Date(parseInt(str));

                    //year = d.getFullYear();
                    //month = pad(d.getMonth() + 1);
                    //day = pad(d.getDate());
                    //hour = pad(d.getHours());
                    //minutes = pad(d.getMinutes());

                    //finalDate = year + "-" + month + "-" + day + " " + hour + ":" + minutes;                  
                    if ($("#QM_LevelUser").val() == "QA" || $("#QM_LevelUser").val() == "Supervisor_QA" || $("#QM_LevelUser").val() == "Supervisor_Agent" || $("#QM_LevelUser").val() == "Admin_Release" || $("#QM_LevelUser").val() == "Administrator") {
                        $("#QA_Name").val(json[i].qa_fullname)
                    } else {
                        $("#QA_Name").val("**********")
                    }
                    $("#QA_Channel_New").val(json[i].channel)
                    //MasterJenisPermasalahanSelected("Q1_Call", json[i].jenis_permasalahan)
                    //$("#Q1_Call_NoTiket").val(json[i].nomor_tiket)
                    //$("#Q1_Call_Calltype").val(json[i].call_type)
                    //$("#Q1_Call_NamaNasabah").val(json[i].nama_nasabah)
                    //$("#Q1_Call_NomorKartu").val(json[i].nomor_kartu)
                    //$("#Q1_Call_WaktuInteraksi").val(d.toISOString().slice(0, 16))
                    //$("#Q1_Call_Durasi").val(json[i].durasi)
                    //$("#Q1_Call_NomorTelepon").val(json[i].nomor_telepon)
                    //$("#Q1_Call_PeriodePenilaian").val(json[i].periode_penilaian)

                    $("#QA_Agent_New").val(json[i].agent_name)
                    $("#QA_Channel_New").val(json[i].channel)
                    $("#QA_JenisPermasalahan_New").val(json[i].jenis_permasalahan)
                    $("#QA_NomorTicket_New").val(json[i].nomor_tiket)
                    $("#QA_Type").val(json[i].call_type)
                    $("#QA_NamaNasabah").val(json[i].nama_nasabah)
                    $("#QA_NamaUser").val(json[i].nama_nasabah)
                    $("#QA_NomorKartu").val(json[i].nomor_kartu)
                    $("#QA_NomorTelepon").val(json[i].nomor_telepon)
                    $("#QA_WaktuInteraksi").val(d.toISOString().slice(0, 16))
                    $("#QA_PeriodePenilaian").val(json[i].periode_penilaian)
                    //CKEDITOR.instances.Q1_Call_HasilPenilaian.setData(json[i].hasil_penilaian)
                    //CKEDITOR.instances.Q1_Call_FeedbackPenilaian.setData(json[i].feedback_penilaian);
                    $("#Interaction_ComboStatus option:selected").text(json[i].status_data);

                } else if (QA_UserType == "Q1_NonCall") {

                    //var str, year, month, day, hour, minute, d, finalDate;
                    //str = json[i].waktu_interaksi.replace(/\D/g, "");
                    //d = new Date(parseInt(str));

                    //year = d.getFullYear();
                    //month = pad(d.getMonth() + 1);
                    //day = pad(d.getDate());
                    //hour = pad(d.getHours());
                    //minutes = pad(d.getMinutes());

                    //finalDate = year + "-" + month + "-" + day + " " + hour + ":" + minutes;

                    if ($("#QM_LevelUser").val() == "QA" || $("#QM_LevelUser").val() == "Supervisor_QA" || $("#QM_LevelUser").val() == "Supervisor_Agent" || $("#QM_LevelUser").val() == "Admin_Release" || $("#QM_LevelUser").val() == "Administrator") {
                        $("#QA_Name").val(json[i].qa_fullname)
                    } else {
                        $("#QA_Name").val("**********")
                    }
                    //$("#Q1_NonCall_CmbAgent").val(json[i].agent)
                    //$("#Q1_NonCall_CmbChannel").val(json[i].channel)
                    //$.ajax({
                    //    type: "POST",
                    //    url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                    //    data: "{TrxID:'" + json[i].agent + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK051', TrxActionType: 'CMB-01'}",
                    //    contentType: "application/json; charset=utf-8",
                    //    dataType: "json",
                    //    success: function (data) {

                    //        var json = JSON.parse(data.d);
                    //        var i, x, ResultAgent = "";

                    //        for (i = 0; i < json.length; i++) {

                    //            ResultAgent = '<option value="' + json[i].USERNAME + '" selected=true>' + json[i].NAME + '</option>';
                    //            $('#QA_Agent').attr('disabled', true);
                    //            $('#QA_Agent').append(ResultAgent);

                    //        }

                    //    },
                    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
                    //        console.log(xmlHttpRequest.responseText);
                    //        console.log(textStatus);
                    //        console.log(errorThrown);
                    //    }
                    //})
                    //MasterChannelSelected("Q1_NonCall", json[i].channel)
                    //MasterJenisPermasalahanSelected("Q1_NonCall", json[i].jenis_permasalahan)
                    //$("#QA_NomorTicket option:selected").val(json[i].nomor_tiket);
                    //$("#QA_NomorTicket option:selected").text(json[i].nomor_tiket);
                    //$('#QA_NomorTicket').attr("disabled", true);
                    ////$("#QA_NomorTicket").val(json[i].nomor_tiket)
                    $("#QA_Type").val(json[i].call_type)
                    $("#QA_NamaNasabah").val(json[i].nama_nasabah)
                    $("#QA_NamaUser").val(json[i].nama_account)
                    $("#QA_NomorKartu").val(json[i].nomor_kartu)
                    $("#QA_WaktuInteraksi").val(d.toISOString().slice(0, 16))
                    $("#QA_NomorTelepon").val(json[i].nomor_telepon)
                    $("#QA_PeriodePenilaian").val(json[i].periode_penilaian)
                    //CKEDITOR.instances.Q1_NonCall_HasilPenilaian.setData(json[i].hasil_penilaian)
                    //CKEDITOR.instances.Q1_NonCall_FeedbackPenilaian.setData(json[i].feedback_penilaian);
                    $("#Interaction_ComboStatus option:selected").text(json[i].status_data);

                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    if ($("#QM_LevelUser").val() != "QA") {
        $("#Interaction_StatusReturn").attr('disabled', 'disabled');
    } else {
        $("#Interaction_StatusReturn").attr('enabled', 'enabled');
    }

}
function MasterJenisPermasalahanSelected(ComboType, ComboValue) {
    var QA_JenisPermasalahan = $('#QA_JenisPermasalahan');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: 'Dropdown', TrxAction: 'UIDESK007'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                if (ComboType == "Q1_Call") {
                    $("#Q1_Call_CmbJenisPermasalahan option:selected").val(ComboValue);
                    $("#Q1_Call_CmbJenisPermasalahan option:selected").text(ComboValue);
                    $('#Q1_Call_CmbJenisPermasalahan').attr("disabled", true);
                    Q1_Call_CmbJenisPermasalahan.append(result);
                } else {
                    $("#QA_JenisPermasalahan option:selected").val(ComboValue);
                    $("#QA_JenisPermasalahan option:selected").text(ComboValue);
                    $('#QA_JenisPermasalahan').attr("disabled", true);
                    QA_JenisPermasalahan.append(result);
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
// * Data Load Transaksi Penilaian * //

// * Action Transaksi Header * //
function ButtonActionSimpan(ActionType) {
    if (getParameterByName("UserType") == "PT") {
        if (getParameterByName("type") == "Call") {
            Q1_Call_InsertTransaction(ActionType);
        } else {
            Q1_NonCall_InsertTransaction(ActionType);
        }
    } else {
        if (getParameterByName("type") == "Call") {
            Q2_Call_InsertTransaction(ActionType);
        } else {
            Q2_NonCall_InsertTransaction(ActionType);
        }
    }
}
function Q1_Call_InsertTransaction() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Session Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_Name").val() == "") {
        swal(
            '',
            'Nama Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_Agent_New").val() == "") {
        swal(
            '',
            'Agent Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_Channel_New").val() == "") {
        swal(
            '',
            'Channel Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_JenisPermasalahan_New").val() == "") {
        swal(
            '',
            'Jenis Permasalahan Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_NomorTicket_New").val() == "") {
        swal(
            '',
            'Nomor Ticket Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_Type").val() == "") {
        swal(
            '',
            'Type Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_NamaNasabah").val() == "") {
        swal(
            '',
            'Nama Nasabah Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_WaktuInteraksi").val() == "") {
        swal(
            '',
            'Waktu Interaksi Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_NomorTelepon").val() == "") {
        swal(
            '',
            'Nomor Telepon Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_PeriodePenilaian").val() == "") {
        swal(
            '',
            'Periode Penilaian Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (getParameterByName("UserType") == "") {
        swal(
            '',
            'Question Kosong Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (getParameterByName("type") == "") {
        swal(
            '',
            'Question Type Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (getParameterByName("qaid") == "") {
        swal(
            '',
            'Question ID Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (getParameterByName("acraid") == "") {
        swal(
            '',
            'Acra ID Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_QM_AgentID").val() == "") {
        swal(
            '',
            'Agent ID Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var Q1_Call_InteractionHeader = CKEDITOR.instances.Interaction_Header.getData();
    if (Q1_Call_InteractionHeader == "") {
        swal(
            '',
            'Keterangan Penilaian Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_CheckTotalSoal",
        data: "{QaID: '" + getParameterByName("qaid") + "', HeaderID: '" + $("#ContentPlaceHolder1_QM_HeaderID").val() + "', QaName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;

            for (i = 0; i < json.length; i++) {

                if (json[i].ResultType == "1") {

                    var form_data = JSON.stringify({
                        Q1_Call_NamaAgent: $("#hd_sessionLogin").val(), Q1_Call_CmbChannel: $("#QA_Channel_New").val(), Q1_Call_CmbJenisPermasalahan: $("#QA_JenisPermasalahan_New").val(),
                        Q1_Call_NoTiket: $("#QA_NomorTicket_New").val(), Q1_Call_Calltype: $("#QA_Type").val(), Q1_Call_NamaNasabah: $("#QA_NamaNasabah").val(),
                        Q1_Call_NomorKartu: $("#QA_NomorKartu").val(), Q1_Call_WaktuInteraksi: $("#QA_WaktuInteraksi").val(), Q1_Call_Durasi: $("#QA_NamaUser").val(),
                        Q1_Call_NomorTelepon: $("#QA_NomorTelepon").val(), Q1_Call_PeriodePenilaian: $("#QA_PeriodePenilaian").val(), Q1_Call_UserType: getParameterByName("UserType"), Q1_Call_Type: getParameterByName("type"),
                        Q1_Call_QaID: getParameterByName("qaid"), Q1_Call_AcraID: getParameterByName("acraid"), Q1_Call_AgentID: $("#ContentPlaceHolder1_QM_AgentID").val(), Q1_Call_ActionType: "Approved",
                        Q1_Call_InteractionHeader: Q1_Call_InteractionHeader
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
                                    url: "asmx/QA_Form.asmx/Q1_Call_InsertTransaction",
                                    method: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    data: form_data,
                                    success: function (data) {
                                        console.log(form_data)

                                        var json = JSON.parse(data.d);
                                        var i = "", ResultID = "";
                                        for (i = 0; i < json.length; i++) {

                                            ResultID = json[i].ResultID
                                            if (json[i].Result == "True") {
                                                swal(
                                                    '',
                                                    'Insert Transaction Has Been Success',
                                                    'success'
                                                ).then(function () {
                                                    $("#ContentPlaceHolder1_QM_HeaderID").val(ResultID)
                                                    //$("#ButtonActionUpdate").css("display", "none")
                                                    ////$("#ButtonActionCancel").css("display", "none")
                                                    //$("#ButtonAction").css("display", "none")
                                                    ////$("#DivTotalSkor").show()
                                                    //$("#ButtonHeaderAttachment").hide()
                                                    //$("#ButtonAction").attr("disabled", "disabled")
                                                    //if (ActionType != "Draft") {
                                                    //    TotalSkorPenilaian($("#ContentPlaceHolder1_QM_HeaderID").val())
                                                    //} else {
                                                    //    window.location.href = "QA_Taskboard_Penilaian.aspx?"
                                                    //}
                                                    $("#DivTotalSkor").show()
                                                    TotalSkorPenilaian($("#ContentPlaceHolder1_QM_HeaderID").val())
                                                    //window.location.href = "QA_Taskboard_Penilaian.aspx?"
                                                });
                                            } else {
                                                swal(
                                                    '',
                                                    'Insert Transaction Has Been Failed !',
                                                    'error'
                                                ).then(function () {

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

                } else {
                    swal(
                        '',
                        '' + json[i].ResultName + '',
                        'error'
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
function Q1_NonCall_InsertTransaction(ActionType) {
    if ($("#QA_Name").val() == "") {
        swal(
            '',
            'Nama Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_Agent").val() == "") {
        swal(
            '',
            'Agent Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_Channel").val() == "") {
        swal(
            '',
            'Channel Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_JenisPermasalahan").val() == "") {
        swal(
            '',
            'Jenis Permasalahan Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_NomorTicket").val() == "") {
        swal(
            '',
            'Nomor Ticket Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_Type").val() == "") {
        swal(
            '',
            'Type Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_NamaNasabah").val() == "") {
        swal(
            '',
            'Nama Nasabah Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_WaktuInteraksi").val() == "") {
        swal(
            '',
            'Waktu Interaksi Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_NomorTelepon").val() == "") {
        swal(
            '',
            'Nomor Telepon Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#QA_PeriodePenilaian").val() == "") {
        swal(
            '',
            'Periode Penilaian Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (getParameterByName("UserType") == "") {
        swal(
            '',
            'Question Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (getParameterByName("type") == "") {
        swal(
            '',
            'Question Type Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (getParameterByName("qaid") == "") {
        swal(
            '',
            'Question ID Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_QM_AcraID").val() == "") {
        if (getParameterByName("acraid") == null) {
            var AcraID = "-"
        } else {
            var AcraID = getParameterByName("acraid")
        }
    } else {
        var AcraID = $("#ContentPlaceHolder1_QM_AcraID").val();
    }
    var Q1_NonCall_InteractionHeader = CKEDITOR.instances.Interaction_Header.getData();
    if (Q1_NonCall_InteractionHeader == "") {
        swal(
            '',
            'Keterangan Penilaian Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }

    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_CheckTotalSoal",
        data: "{QaID: '" + getParameterByName("qaid") + "', HeaderID: '" + $("#ContentPlaceHolder1_QM_HeaderID").val() + "', QaName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;

            for (i = 0; i < json.length; i++) {

                if (json[i].ResultType == "1") {

                    var form_data = JSON.stringify({
                        Q1_NonCall_NamaAgent: $("#hd_sessionLogin").val(), Q1_NonCall_CmbChannel: $("#QA_Channel").val(), Q1_NonCall_CmbJenisPermasalahan: $("#QA_JenisPermasalahan").val(),
                        Q1_NonCall_NoTiket: $("#QA_NomorTicket").val(), Q1_NonCall_Calltype: $("#QA_Type").val(), Q1_NonCall_NamaNasabah: $("#QA_NamaNasabah").val(),
                        Q1_NonCall_NamaAccount: $("#QA_NamaUser").val(), Q1_NonCall_NomorKartu: $("#QA_NomorKartu").val(), Q1_NonCall_WaktuInteraksi: $("#QA_WaktuInteraksi").val(),
                        Q1_NonCall_NomorTelepon: $("#QA_NomorTelepon").val(), Q1_NonCall_PeriodePenilaian: $("#QA_PeriodePenilaian").val(),
                        Q1_NonCall_UserType: getParameterByName("UserType"), Q1_NonCall_Type: getParameterByName("type"),
                        Q1_NonCall_QaID: getParameterByName("qaid"), Q1_NonCall_AcraID: AcraID, Q1_NonCall_AgentID: $("#QA_Agent").val(), Q1_NonCall_ActionType: ActionType,
                        Q1_NonCall_InteractionHeader: Q1_NonCall_InteractionHeader
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
                                    url: "asmx/QA_Form.asmx/Q1_NonCall_InsertTransaction",
                                    method: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    data: form_data,
                                    success: function (data) {
                                        //console.log(form_data)

                                        var json = JSON.parse(data.d);
                                        var i = "", ResultID = "";
                                        for (i = 0; i < json.length; i++) {

                                            ResultID = json[i].ResultID
                                            $("#ContentPlaceHolder1_QM_HeaderID").val(json[i].ResultID)
                                            if (json[i].Result == "True") {
                                                swal(
                                                    '',
                                                    'Insert Transaction Has Been Success',
                                                    'success'
                                                ).then(function () {
                                                    //$("#ContentPlaceHolder1_QM_HeaderID").val(ResultID)
                                                    $("#ButtonActionUpdate").css("display", "none")
                                                    $("#ButtonAction").css("display", "none")
                                                    //$("#DivTotalSkor").show()
                                                    $("#ButtonHeaderAttachment").hide()
                                                    $("#ButtonAction").attr("disabled", "disabled")
                                                    if (ActionType != "Draft") {
                                                        TotalSkorPenilaian($("#ContentPlaceHolder1_QM_HeaderID").val())
                                                    } else {
                                                        window.location.href = "QA_Taskboard_Penilaian.aspx"
                                                        //window.location.href = encodeURI("QC_List.aspx");
                                                        //window.location = $ESAPI.encoder().encodeForURL("QC_List.aspx");
                                                    }
                                                });
                                            } else {
                                                swal(
                                                    '',
                                                    'Insert Transaction Has Been Failed',
                                                    'error'
                                                ).then(function () {

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

                } else {
                    swal(
                        '',
                        '' + json[i].ResultName + '',
                        'error'
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
function InsertDataPickup() {
    var form_data = JSON.stringify({
        QM_HeaderID: getParameterByName("headerid"), QM_StatusData: getParameterByName("status"),
        QM_CreatedBy: $("#hd_sessionLogin").val()
    });
    $.ajax({
        url: "asmx/QA_Form.asmx/QM_TrxPickup",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function () {
            console.log(form_data)

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
$('#filesHeader').change(function () {
    var filename = $('#filesHeader').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='filesHeader']", function (e) {
    $(".hiddenX").show();

    //var Interaction_Header = CKEDITOR.instances.Interaction_Header.getData()
    //if (Interaction_Header == '') {
    //    swal("Keterangan Kosong");
    //    return false
    //}

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    if ($("#ContentPlaceHolder1_QM_HeaderID").val() == "") {
        swal(
            '',
            'Penilaian kosong, silahkan lakukan penilaian terlebih dahulu',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
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
        if ($("#ContentPlaceHolder1_QM_AcraID").val() == "") {
            if (getParameterByName("acraid") == null) {
                var AcraID = "-"
            } else {
                var AcraID = getParameterByName("acraid")
            }
        } else {
            var AcraID = $("#ContentPlaceHolder1_QM_AcraID").val();
        }
        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        var allowExtension = "xls, xlsx, doc, docx, csv, pdf, png, jpg, gif, bmp"
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP" || fileextension == "csv") {

        } else {
            swal(
                '',
                'File extension not allowed ! \r\n allow extension \r\n (xls, xlsx, doc, docx, csv, pdf, png, jpg, gif, bmp)',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#hd_sessionLogin").val());
        data.append("AcraID", AcraID);
        data.append("HeaderID", $("#ContentPlaceHolder1_QM_HeaderID").val());
        data.append("InteractionID", "55");
        data.append("Type", "comments");

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/QA_Form.asmx/UploadFileInteraction",
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

            PreviewAttachmentHeader($("#ContentPlaceHolder1_QM_HeaderID").val());

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
function PreviewAttachmentHeader(HeaderID) {
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + HeaderID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: 'Dropdown', TrxAction: 'UIDESK008'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultHeaderAttachment = "";

            $('#HeaderAttachment').empty();
            for (i = 0; i < json.length; i++) {

                var color = ""
                if (json[i].FileType == ".doc") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == ".docx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == ".pdf" || json[i].FileType == ".pdf") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == ".xls") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == ".xlsx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == ".png" || json[i].FileType == ".PNG" || json[i].FileType == ".jpg" || json[i].FileType == ".JPG" || json[i].FileType == ".jpeg" || json[i].FileType == ".JPEG" || json[i].FileType == ".gif" || json[i].FileType == ".GIF" || json[i].FileType == ".BMP" || json[i].FileType == ".bmp") {
                    var FileTypes = "image";
                    color = "success"
                }
                ResultHeaderAttachment = '<div class="card border shadow-none mb-2">' +
                    '<div class="p-2">' +
                    '<div class="d-flex">' +
                    '<div class="avatar-sm align-self-center me-2">' +
                    '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                    //'<i class="fas fa-' + FileTypes + '"></i>' +
                    '<a href="http://' + IPSERVER + '/FileTransaction/FileComments/' + json[i].FileNameURL + ' target="_blank"><i class="fas fa-' + FileTypes + '"></i></a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="overflow-hidden me-auto">' +
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].FileNames.substring(0, 10) + '</h5>' +
                    '<a href="http://' + IPSERVER + '/FileTransaction/FileComments/' + json[i].FileNameURL + ' target="_blank">' +
                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=deleteAttachmentComment(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#HeaderAttachment').append(ResultHeaderAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function deleteHeaderAttachment(DeleteID) {
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
                    url: "asmx/QA_Form.asmx/deleteInteractionAttachment",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i;

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete file Has Been Success',
                                    'success'
                                ).then(function () {
                                    PreviewAttachmentHeader($("#ContentPlaceHolder1_QM_HeaderID").val());
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete file Has Been Failed',
                                    'error'
                                ).then(function () {
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
// * Action Transaksi Header *//

// * Action Transaksi Penilaian * //
function ButtonActionNilai(KodeGrup, KodePertanyaan, KodeNilai, Nilai, Action, DetailPenilaianID) {

    if (DetailPenilaianID != "0" || DetailPenilaianID != "") {
        $("#ContentPlaceHolder1_QM_ResultPenilaianID").val(DetailPenilaianID)
    }
    if (getParameterByName("act") == "edit") {
        if (getParameterByName("status") == "Draft" || getParameterByName("status") == "Return") {
            if ($("#QM_LevelUser").val() == "QA") {
                if (getParameterByName("UserType") == "PT") {
                    if (getParameterByName("type") == "Call") {
                        Q1_Call_InsertNilai(KodeGrup, KodePertanyaan, KodeNilai, Nilai, Action);
                    } else {
                        Q1_NonCall_InsertNilai(KodeGrup, KodePertanyaan, KodeNilai, Nilai, Action);
                    }
                } else {
                    if (getParameterByName("type") == "Call") {
                        Q1_Call_InsertNilai(KodeGrup, KodePertanyaan, KodeNilai, Nilai, Action);
                    } else {
                        Q1_NonCall_InsertNilai(KodeGrup, KodePertanyaan, KodeNilai, Nilai, Action);
                    }
                }
            } else {
                swal(
                    '',
                    'Hanya level user QA yang bisa melakukan penilaian',
                    'error'
                ).then(function () {
                    window.location.reload();

                });
            }
        } else {
            swal(
                '',
                'Data Penilain sudah tidak bisa dirubah',
                'error'
            ).then(function () {
                window.location.reload();

            });
        }
    } else {
        if ($("#QM_LevelUser").val() == "QA") {
            if (getParameterByName("UserType") == "PT") {
                if (getParameterByName("type") == "Call") {
                    Q1_Call_InsertNilai(KodeGrup, KodePertanyaan, KodeNilai, Nilai, Action);
                } else {
                    Q1_NonCall_InsertNilai(KodeGrup, KodePertanyaan, KodeNilai, Nilai, Action);
                }
            } else {
                if (getParameterByName("type") == "Call") {
                    Q2_Call_InsertNilai(KodeGrup, KodePertanyaan, KodeNilai, Nilai, Action);
                } else {
                    Q2_NonCall_InsertNilai(KodeGrup, KodePertanyaan, KodeNilai, Nilai, Action);
                }
            }
        } else {
            swal(
                '',
                'Hanya level user QA yang bisa melakukan penilaian',
                'error'
            ).then(function () {
                window.location.reload();

            });
        }
    }
    // ini fungsi untuk readonly setelah buat penilaian
    //$("#radio_" + KodeNilai).prop("disabled", true);
}
function Q1_Call_InsertNilai(KodeGrup, KodePertanyaan, KodeNilai, Nilai, Action) {
    if (getParameterByName("act") == "edit") {

    } else {
        $("#DivJourNeyComments").hide();
        if ($("#hd_sessionLogin").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Session Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_Agent_New").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Agent Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_Channel_New").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Channel Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_JenisPermasalahan_New").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Jenis Permasalahan Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_NomorTicket_New").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Nomor Ticket Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_Type").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Call Type Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_NamaNasabah").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Nama Nasabah Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        //if ($("#Q1_Call_NomorKartu").val() == "") {
        //    swal("Nomor Kartu Kosong")
        //    return false;
        //}
        if ($("#QA_WaktuInteraksi").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Waktu Interaksi Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_NamaUser").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Durasi Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_NomorTelepon").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Nomor Telepon Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_PeriodePenilaian").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Periode Penilaian Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        //var Q1_Call_HasilPenilaian = CKEDITOR.instances.Q1_Call_HasilPenilaian.getData();
        //if (Q1_Call_HasilPenilaian == "") {
        //    swal("Hasil Penilaian Kosong")
        //    return false;
        //}
        //var Q1_Call_FeedbackPenilaian = CKEDITOR.instances.Q1_Call_FeedbackPenilaian.getData();
        //if (Q1_Call_FeedbackPenilaian == "") {
        //    swal("Feedback Penilaian Kosong")
        //    return false;
        //}
        if (getParameterByName("UserType") == "") {
            ClearRadioButton();
            swal(
                '',
                'Question Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if (getParameterByName("type") == "") {
            ClearRadioButton();
            swal(
                '',
                'Question Type Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if (getParameterByName("qaid") == "") {
            ClearRadioButton();
            swal(
                '',
                'Question ID Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if (getParameterByName("acraid") == "") {
            ClearRadioButton();
            swal(
                '',
                'Acra ID Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#ContentPlaceHolder1_QM_AcraID").val() == "") {
        if (getParameterByName("acraid") == null) {
            var AcraID = "-"
        } else {
            var AcraID = getParameterByName("acraid")
        }
    } else {
        var AcraID = $("#ContentPlaceHolder1_QM_AcraID").val();
    }
    if ($("#ContentPlaceHolder1_QM_HeaderID").val() == "") {
        if (getParameterByName("headerid") == null) {
            var QM_HeaderID = "-"
        } else {
            var QM_HeaderID = getParameterByName("headerid")
        }
    } else {
        var QM_HeaderID = $("#ContentPlaceHolder1_QM_HeaderID").val()
    }
    var form_data = JSON.stringify({
        QM_HeaderID: QM_HeaderID, QM_AcraID: AcraID, QM_AgentID: $("#QA_Agent_New").val(),
        QM_QaName: $("#hd_sessionLogin").val(), QM_UserType: getParameterByName("UserType"), QM_Type: getParameterByName("type"),
        QM_Channel: $("#QA_Channel_New").val(), QM_QaID: getParameterByName("qaid"), QM_KodeGrup: KodeGrup, QM_KodePertanyaan: KodePertanyaan, QM_KodePenilaian: KodeNilai,
        QM_Nilai: Nilai, QM_Action: Action
    });
    $.ajax({
        url: "asmx/QA_Form.asmx/QM_TrxDetailPenilaian",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            console.log(form_data)

            var json = JSON.parse(data.d);
            var i = "";
            if (Action == "1") {
                var Message = "Insert"
            } else {
                var Message = "Update"
            }
            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {
                    if ($("#ContentPlaceHolder1_QM_ResultPenilaianID").val() == "" || $("#ContentPlaceHolder1_QM_ResultPenilaianID").val() == "0") {
                        $("#ContentPlaceHolder1_QM_ResultPenilaianID").val(json[i].ResultID)
                    }
                    $("#ContentPlaceHolder1_QM_AcraID").val(json[i].ResultAcraID)
                    $("#ContentPlaceHolder1_QM_HeaderID").val(json[i].ResultHeaderID)
                    //swal(
                    //    '',
                    //    '' + Message + ' Nilai Has Been Success',
                    //    'success'
                    //).then(function () {
                    if (Nilai == "0") {
                        $("#modal-comments").modal('show');
                    } else {
                        $("#modal-comments").modal('hide');
                    }
                    $("#ButtonFileCommentAttachment").show()
                    $("#ButtonActionComment").css("display", "block")
                    //    //location.href = "qc_list.aspx?status=draft";
                    //});
                } else {
                    swal(
                        '',
                        '' + Message + ' Nilai Has Been Failed',
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
function Q1_NonCall_InsertNilai(KodeGrup, KodePertanyaan, KodeNilai, Nilai, Action) {
    if (getParameterByName("act") == "edit") {

    } else {
        $("#DivJourNeyComments").hide();
        if ($("#hd_sessionLogin").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Session Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_Name").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Nama Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_Agent").val() == "" || $("#QA_Agent").val() == "Select") {
            ClearRadioButton();
            swal(
                '',
                'Agent Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_Channel").val() == "" || $("#QA_Channel").val() == "Select") {
            ClearRadioButton();
            swal(
                '',
                'Channel Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_JenisPermasalahan").val() == "" || $("#QA_JenisPermasalahan").val() == "Select") {
            ClearRadioButton();
            swal(
                '',
                'Jenis Permasalahan Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_NomorTicket").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Nomor Ticket Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_Type").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Type Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_NamaNasabah").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Nama Nasabah Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_WaktuInteraksi").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Waktu Interaksi Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#QA_NomorPengaduan").val() == "") {
            ClearRadioButton();
            swal(
                '',
                'Periode Penilaian Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if (getParameterByName("UserType") == "") {
            ClearRadioButton();
            swal(
                '',
                'Question Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if (getParameterByName("type") == "") {
            ClearRadioButton();
            swal(
                '',
                'Question Type Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if (getParameterByName("qaid") == "") {
            ClearRadioButton();
            swal(
                '',
                'Question ID Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#ContentPlaceHolder1_QM_AcraID").val() == "") {
        if (getParameterByName("acraid") == null) {
            var AcraID = "-"
        } else {
            var AcraID = getParameterByName("acraid")
        }
    } else {
        var AcraID = $("#ContentPlaceHolder1_QM_AcraID").val();
    }
    if ($("#ContentPlaceHolder1_QM_HeaderID").val() == "") {
        if (getParameterByName("headerid") == null) {
            var QM_HeaderID = "-"
        } else {
            var QM_HeaderID = getParameterByName("headerid")
        }
    } else {
        var QM_HeaderID = $("#ContentPlaceHolder1_QM_HeaderID").val();
    }
    var form_data = JSON.stringify({
        QM_HeaderID: QM_HeaderID, QM_AcraID: AcraID, QM_AgentID: $("#QA_Agent").val(),
        QM_QaName: $("#hd_sessionLogin").val(), QM_UserType: getParameterByName("UserType"), QM_Type: getParameterByName("type"),
        QM_Channel: $("#QA_Channel").val(), QM_QaID: getParameterByName("qaid"), QM_KodeGrup: KodeGrup, QM_KodePertanyaan: KodePertanyaan,
        QM_KodePenilaian: KodeNilai,
        QM_Nilai: Nilai, QM_Action: Action
    });
    $.ajax({
        url: "asmx/QA_Form.asmx/QM_TrxDetailPenilaian",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            console.log(form_data)

            var json = JSON.parse(data.d);
            var i = "";
            if (Action == "1") {
                var Message = "Insert"
            } else {
                var Message = "Update"
            }
            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {
                    if ($("#ContentPlaceHolder1_QM_ResultPenilaianID").val() == "" || $("#ContentPlaceHolder1_QM_ResultPenilaianID").val() == "0") {
                        $("#ContentPlaceHolder1_QM_ResultPenilaianID").val(json[i].ResultID)
                    }
                    $("#ContentPlaceHolder1_QM_AcraID").val(json[i].ResultAcraID)
                    $("#ContentPlaceHolder1_QM_HeaderID").val(json[i].ResultHeaderID)
                    //swal(
                    //    '',
                    //    '' + Message + ' Nilai Has Been Success',
                    //    'success'
                    //).then(function () {
                    if (Nilai == "0") {
                        $("#modal-comments").modal('show');
                    } else {
                        $("#modal-comments").modal('hide');
                    }
                    $("#ButtonFileCommentAttachment").show()
                    $("#ButtonActionComment").css("display", "block")
                    //location.href = "qc_list.aspx?status=draft";
                    //});
                } else {
                    swal(
                        '',
                        '' + Message + ' Nilai Has Been Failed',
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
// * Action Transaksi Penilaian * //

// * Button Komentar * //
function UserCommentTransaction(KodeID) {
    var StatusTransaksi = getParameterByName("status")
    var CommentHeaderID = getParameterByName("headerid")
    if (getParameterByName("acraid") == null || getParameterByName("acraid") == "") {
        var CommentAcraID = $("#ContentPlaceHolder1_QM_AcraID").val()
    } else {
        var CommentAcraID = getParameterByName("acraid")
    }
    var CommentQaid = getParameterByName("qaid")
    if (StatusTransaksi != "Finnished") {
        $("#ButtonFileCommentAttachment").show()
        $("#ButtonActionComment").css("display", "block")
        if (CommentHeaderID == "" || CommentHeaderID == null) {
            var HeaderID = $("#ContentPlaceHolder1_QM_HeaderID").val()
        } else {
            var HeaderID = CommentHeaderID
        }
        $.ajax({
            type: "POST",
            url: "asmx/QA_TrmSystem.asmx/QM_TrxDetailPenilaianSelected",
            //data: "{HeaderID:'HDRMaker1_Q120220618061350', AcraID: '202206180613479819348602', kodealat: 'QA507', kodeitempertanyaan: 'KP510', TrxUserName: 'Supervisor_1'}",
            data: "{HeaderID:'" + HeaderID + "', AcraID: '" + CommentAcraID + "', kodealat: '" + CommentQaid + "', kodeitempertanyaan: '" + KodeID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("QM_TrxDetailPenilaianSelected " + data)
                var json = JSON.parse(data.d);
                var i, x;

                if (json.length != "") {
                    for (i = 0; i < json.length; i++) {

                        $("#ContentPlaceHolder1_QM_ResultPenilaianID").val(json[i].ID)
                        $("#modal-comments").modal('show');
                        JourNeyComments(json[i].ID)

                    }
                } else {
                    swal(
                        '',
                        'Penilaian belum ada, Komentar tidak bisa dibuat',
                        'error'
                    ).then(function () {
                        return false
                    });
                    return false
                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })

    } else {

        swal(
            '',
            'Penilaian sudah selesai, Komentar tidak bisa dibuat',
            'error'
        ).then(function () {

        });

    }
}
function ButtonActionComment() {
    var valuetextcomments = CKEDITOR.instances.textcomments.getData();
    if (valuetextcomments == "") {
        swal(
            '',
            'Komentar Kosong',
            'info'
        ).then(function () {
            return false;
        });
    }
    if ($("#ContentPlaceHolder1_QM_HeaderID").val() == "") {
        if (getParameterByName("headerid") == null) {
            var HeaderID = "-"
        } else {
            var HeaderID = getParameterByName("headerid")
        }
    } else {
        var HeaderID = $("#ContentPlaceHolder1_QM_HeaderID").val();
    }
    if (getParameterByName("acraid") == null) {
        var AcraID = $("#ContentPlaceHolder1_QM_AcraID").val()
    } else {
        var AcraID = getParameterByName("acraid")
    }
    //alert($("#ContentPlaceHolder1_QM_ResultPenilaianID").val())
    //return false
    var form_data = JSON.stringify({
        QM_HeaderID: HeaderID, QM_AcraID: AcraID,
        QM_DetailID: $("#ContentPlaceHolder1_QM_ResultPenilaianID").val(),
        QM_Comments: valuetextcomments, QM_CreatedBy: $("#hd_sessionLogin").val()
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
                    url: "asmx/QA_Form.asmx/QM_TrxCommentPenilaian",
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
                                    'Insert Comment Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#ButtonFileCommentAttachment").hide()
                                    $("#ButtonActionComment").css("display", "none")
                                    CKEDITOR.instances.textcomments.setData("")
                                    JourNeyComments($("#ContentPlaceHolder1_QM_ResultPenilaianID").val())
                                    $("#modal-comments").modal('hide');
                                    $("#UploadAttachmentComments").hide()

                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Comment Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#modal-comments").modal('hide');
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
function JourNeyComments(CommentID) {
    var dataJourNeyComments = "";
    var iconChannel = "";
    var channelDesc = "";
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + CommentID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK053', TrxActionType: 'CMB-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            if (json.length != "") {
                $("#DivJourNeyComments").show()
                $('#JourNeyComments').empty();
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].created_date);
                    var milisegundos = parseInt(json[i].created_date.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    if ($("#QM_LevelUser").val() == "Administrator") {
                        var KomentarBy = "" + json[i].created_by + ""
                    } else {
                        var KomentarBy = "**********"
                    }
                    if (json[i].status_file == "1") {
                        var file = "<span class='mailbox-attachment-icon pull-left' style='margin-left:-10px;cursor:pointer;' onclick=PreviewAttachmentCommentSide(" + json[i].ID + ")><i class='fa fa-file-image-o text-primary'></i></span>"
                    } else {
                        var file = ""
                    }
                    if (json[i].comments == null) {
                        var comments = "";
                    } else {
                        var comments = '<div class="timeline-item">' +
                            '<div class="timeline-point">' +
                            '<i class="fa fa-circle"></i>' +
                            '</div>' +
                            '<div class="timeline-event">' +
                            //'<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].ThreadCustomerName +'</p>' +
                            '<div class="timeline-body">' +
                            '' + json[i].comments + '' +
                            '</div>' +
                            '<div class="timeline-footer">' +
                            '<p class="pull-right text-fade" style="font-size:12px;">' + newDate + ' ' + newTime + '</p>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                    dataJourNeyComments +=
                        '<span class="timeline-label">' +
                        '<span class="badge badge-pill badge-primary badge-lg">Komentar</span>' +
                        '</span>' +
                        '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="ion ion-chatbubble-working"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + KomentarBy + '</p>' +
                        '<div class="timeline-body">' +
                        '' + json[i].comments + '' +
                        '</div>' +
                        '<div class="timeline-footer">' +
                        '' + file + '' +
                        '</br>' +
                        '</br>' +
                        '</br>' +
                        '<p class="pull-right text-fade" style="font-size:12px;">' + newDate + ' ' + newTime + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>'

                }
                $('#JourNeyComments').append(dataJourNeyComments);

            } else {
                $("#DivJourNeyComments").hide()
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
$('#filesComment').change(function () {
    var filename = $('#filesComment').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='filesComment']", function (e) {
    $(".hiddenX").show();

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    var valuetextcomments = CKEDITOR.instances.textcomments.getData();
    if (valuetextcomments == "") {
        swal(
            '',
            'Komentar Kosong',
            'info'
        ).then(function () {
            return false;
        });
    }
    for (var i = 0; i < files.length; i++) {

        if ($("#ContentPlaceHolder1_QM_HeaderID").val() == "") {
            if (getParameterByName("headerid") == null) {
                var HeaderID = "-"
            } else {
                var HeaderID = getParameterByName("headerid")
            }
        } else {
            var HeaderID = $("#ContentPlaceHolder1_QM_HeaderID").val();
        }
        if ($("#ContentPlaceHolder1_QM_AcraID").val() == "") {
            if (getParameterByName("acraid") == null) {
                var AcraID = "-"
            } else {
                var AcraID = getParameterByName("acraid")
            }
        } else {
            var AcraID = $("#ContentPlaceHolder1_QM_AcraID").val();
        }
        //if (getParameterByName("acraid") == null) {
        //    var AcraID = $("#ContentPlaceHolder1_QM_AcraID").val()
        //} else {
        //    var AcraID = getParameterByName("acraid")
        //}

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
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP" || fileextension == "csv") {

        } else {
            swal(
                '',
                'File extension not allowed ! \r\n allow extension \r\n (xls, xlsx, doc, docx, csv, pdf, png, jpg, gif, bmp)',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#hd_sessionLogin").val());
        data.append("HeaderID", HeaderID);
        data.append("AcraID", AcraID);
        data.append("DetailID", $("#ContentPlaceHolder1_QM_ResultPenilaianID").val());
        data.append("Type", "comments");

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/QA_Form.asmx/UploadFileComments",
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

            //$("#DivJourNeyComments").hide()
            PreviewAttachmentComments($("#ContentPlaceHolder1_QM_ResultPenilaianID").val());

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
function PreviewAttachmentComments(PreviewID) {
    //$("#LoaderPageAttachment").show();
    //$("#modal-preview-file").modal('show');
    $("#CommentAttachment").show()
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + PreviewID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK054', TrxActionType: 'CMB-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultAttachmentComments = "";

            $('#CommentAttachment').empty();
            for (i = 0; i < json.length; i++) {

                var color = ""
                if (json[i].FileType == ".doc") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == ".docx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == ".pdf" || json[i].FileType == ".pdf") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == ".xls") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == ".xlsx") {
                    var FileTypes = "file";
                    color = "primary"
                }
                else if (json[i].FileType == ".png" || json[i].FileType == ".PNG" || json[i].FileType == ".jpg" || json[i].FileType == ".JPG" || json[i].FileType == ".jpeg" || json[i].FileType == ".JPEG" || json[i].FileType == ".gif" || json[i].FileType == ".GIF" || json[i].FileType == ".BMP" || json[i].FileType == ".bmp") {
                    var FileTypes = "image";
                    color = "success"
                }

                ResultAttachmentComments = '<div class="card border shadow-none mb-2">' +
                    '<div class="p-2">' +
                    '<div class="d-flex">' +
                    '<div class="avatar-sm align-self-center me-2">' +
                    '<div class="avatar-title rounded bg-transparent text-' + color + ' font-size-18">' +
                    //'<i class="fas fa-' + FileTypes + '"></i>' +
                    '<a href="http://' + IPSERVER + '/FileTransaction/FileComments/' + json[i].FileNameURL + ' target="_blank"><i class="fas fa-' + FileTypes + '"></i></a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="overflow-hidden me-auto">' +
                    '<h5 class="font-size-13 text-truncate mb-1">' + json[i].FileName.substring(0, 10) + '</h5>' +
                    '<a href="http://' + IPSERVER + '/FileTransaction/FileComments/' + json[i].FileNameURL + ' target="_blank">' +
                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="ms-2">' +
                    '<a href="#" class="text-body" onclick=deleteAttachmentComment(' + json[i].ID + ')>' +
                    '<p class="text-danger"><i class="bx bx-trash font-size-16 align-middle me-2"></i></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#CommentAttachment').append(ResultAttachmentComments)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function deleteAttachmentComment(DeleteID) {
    if (DeleteID == '') {
        swal(
            '',
            'attachment Kosong',
            'info'
        ).then(function () {
            return false;
        });
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
                    url: "asmx/QA_Form.asmx/deleteCommentsAttachment",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i;

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete file Has Been Success',
                                    'success'
                                ).then(function () {
                                    PreviewAttachmentComments($("#ContentPlaceHolder1_QM_ResultPenilaianID").val());
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete file Has Been Failed',
                                    'error'
                                ).then(function () {
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
function JourNeyHistoryComments() {
    //$("#LoaderJourNeyHistoryComments").show();
    var dataJourNeyHistoryComments = "";
    var messageDiv = $('#JourneyHistoryKomentar');
    var PathTicket = "" + IPSERVER + "/FileTransaction/FileComments"
    var jsonTextComment = JSON.stringify({ HeaderID: getParameterByName("headerid") });
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxCommentInteraction",
        data: jsonTextComment,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsonComment = JSON.parse(data.d);
            var j;

            //$('#JourneyHistoryKomentar').empty();
            //for (j = 0; j < jsonComment.length; j++) {

            //    if ($("#QM_LevelUser").val() == "Administrator") {
            //        var QAName = jsonComment[j].qa_name
            //        var created_by = jsonComment[j].created_name
            //    } else {
            //        var QAName = "**********"
            //        var created_by = "**********"
            //    }
            //    if (jsonComment[j].status_file == "1") {
            //        var file = "<span class='mailbox-attachment-icon pull-left' style='margin-left:-10px;cursor:pointer;margin-top:-50px;' onclick=PreviewAttachmentCommentSide(" + jsonComment[j].ID + ")><i class='fa fa-file-image-o text-primary'></i></span>"
            //    } else {
            //        var file = ""
            //    }
            //    dataJourNeyHistoryComments += '<div class="timeline5">' +
            //        '<div class="timeline__group">' +
            //        '<span class="timeline__year">' + jsonComment[j].KodeGru + ' - ' + jsonComment[j].KodePert + '</span>' +
            //        '<div class="timeline__box">' +
            //        '<div class="timeline__date">' +
            //        '<span class="timeline__day">' + jsonComment[j].Tanggal + '</span>' +
            //        '<span class="timeline__month">' + jsonComment[j].Bulan + '</span>' +
            //        //'<span class="timeline__month">' + jsonComment[j].Tahun + '</span>' +
            //        '</div>' +
            //        '<div class="timeline__post">' +
            //        '<div class="timeline__content">' +
            //        '<h4 class="timeline-title"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + created_by + '</h4>' +
            //        '<p>' + jsonComment[j].comments + '</p > ' +
            //        '</br>' +
            //        '</br>' +
            //        '<p class="text-left">' + file + '</p>' +
            //        '<p class="text-right">' + jsonComment[j].DateComment + '</p>' +
            //        '</div>' +
            //        '</div>' +
            //        '</div>' +
            //        '</div>' +
            //        '</div>'

            //}
            //$('#JourneyHistoryKomentar').append(dataJourNeyHistoryComments);
            ////$("#LoaderJourNeyHistoryComments").hide();

            messageDiv.empty();
            jsonComment.forEach(async (item) => {

                //console.log(item)
                let imagein = ""
                await $.ajax({
                    type: "POST",
                    url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                    data: "{TrxID:'" + item.ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK070', TrxActionType: 'TA-01'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var j = 0;

                        console.log("Comments" + item.ID)
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
                                '<h5 class="font-size-13 text-truncate mb-1">' + json[j].FileName + '</h5>' +
                                '<a href=' + PathTicket + "/" + json[j].FileNameURL + ' target="_blank" class="text-body">' +
                                '<p class="text-muted text-truncate mb-0">Download</p>' +
                                '</a>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>'

                        }

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
                    '<div class="timeline-date">' + item.DateComment + '</div>' +
                    '<h5 class="mt-3 font-size-16">' + item.KodeGru + ' - ' + item.KodePert + ' (' + item.created_by +')</h5>' +
                    '<div class="text-muted">' +
                    '' + item.comments + '' +
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
            console.log("Response " + xmlHttpRequest.responseText);
            console.log("Text " + textStatus);
            console.log("Err " + errorThrown);
        }
    })
}
// * Button Komentar * //

// * Skor Penilaian * //
function TotalSkorPenilaian(HeaderID) {
    $("#modal-skor").modal('show');
    //$("#loaderSkor").show();
    if (HeaderID == "") {
        var TrxHeaderID = getParameterByName("headerid")
    } else {
        var TrxHeaderID = HeaderID
    }
    var jsonTextGroupTable = JSON.stringify({ HeaderID: TrxHeaderID });
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_GETTotalNilaiAll_Bravo",
        data: jsonTextGroupTable,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsonGrupTable = JSON.parse(data.d);
            var i = "";
            if (jsonGrupTable.length != "") {
                for (i = 0; i < jsonGrupTable.length; i++) {
                    $('#TrmGrupingPenilaian').append($('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">' + jsonGrupTable[i].NamaGroupNya + '</td>')
                        .append('<td scope="col" style="width: 100px; text-align: center;">' + jsonGrupTable[i].ValueIjo + '</td>'));
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var TotalPersen
    var jsonTextPersenTable = JSON.stringify({ HeaderID: TrxHeaderID, KodeGrup: "PersenNya" });
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_GETTotalNilai_Bravo",
        data: jsonTextPersenTable,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsonPersenTable = JSON.parse(data.d);
            var i = "";
            if (jsonPersenTable.length != "") {

                var jsonTextSkorTable = JSON.stringify({ HeaderID: TrxHeaderID, KodeGrup: "TotalNya" });
                $.ajax({
                    type: "POST",
                    url: "asmx/QA_Form.asmx/QM_GETTotalNilai_Bravo",
                    data: jsonTextSkorTable,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var jsonSkorTable = JSON.parse(data.d);
                        var i = "";
                        if (jsonSkorTable.length != "") {
                            for (i = 0; i < jsonSkorTable.length; i++) {
                                if (jsonPersenTable[i].ValueIjo == "undifined" || jsonPersenTable[i].ValueIjo == null || jsonPersenTable[i].ValueIjo == "") {
                                    var HasilTotalPersen = jsonSkorTable[i].ValueIjo
                                } else {
                                    var HasilTotalPersen = jsonPersenTable[i].ValueIjo
                                }

                                $('#TrmModalSkorPenilaian').append($('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">Bobot</td>')
                                    .append('<td scope="col" style="width: 100px; text-align: center;">' + HasilTotalPersen + '%</td>'),
                                    $('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">Skor</td>')
                                        .append('<td scope="col" style="width: 100px; text-align: center;">' + jsonSkorTable[i].ValueIjo + '</td>'));
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

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    $('#TrmGrupingPenilaian tbody tr').remove();
    $('#TrmModalSkorPenilaian tbody tr').remove();
    $("#loaderSkor").hide();
}
function CloseTotalSkorPenilaian() {
    window.location.href = "QA_Taskboard_Penilaian.aspx?status=Approved"
    //window.location.href = encodeURI("QC_List.aspx");
    //window.location = $ESAPI.encoder().encodeForURL("QC_List.aspx");
}
function TotalPreviewSkorPenilaian(HeaderID) {
    $("#modal-skorpreview").modal('show');
    if (HeaderID == "") {
        var TrxHeaderID = getParameterByName("headerid")
    } else {
        var TrxHeaderID = HeaderID
    }
    var TotalPersen
    var jsonTextPersenTable = JSON.stringify({ HeaderID: TrxHeaderID, KodeGrup: "PersenNya" });
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_GETTotalNilai_Bravo",
        data: jsonTextPersenTable,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsonPersenTable = JSON.parse(data.d);
            var i = "";

            if (jsonPersenTable.length != "") {
                //for (i = 0; i < jsonPersenTable.length; i++) {
                //    $("#ContentPlaceHolder1_QM_Persen").val(jsonPersenTable[i].ValueIjo)
                //    //TotalPersen = jsonPersenTable[i].ValueIjo
                //}
                var jsonTextSkorTable = JSON.stringify({ HeaderID: TrxHeaderID, KodeGrup: "TotalNya" });
                $.ajax({
                    type: "POST",
                    url: "asmx/QA_Form.asmx/QM_GETTotalNilai_Bravo",
                    data: jsonTextSkorTable,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {


                        var jsonSkorTable = JSON.parse(data.d);
                        var i = "";
                        if (jsonSkorTable.length != "") {

                            for (i = 0; i < jsonSkorTable.length; i++) {
                                if (jsonPersenTable[i].ValueIjo == "" || jsonPersenTable[i].ValueIjo == null) {
                                    var TotalPersenPreview = jsonSkorTable[i].ValueIjo
                                } else {
                                    var TotalPersenPreview = jsonPersenTable[i].ValueIjo
                                }
                                $('#TrmModalPreviewSkorPenilaian').append($('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">Bobot</td>')
                                    .append('<td scope="col" style="width: 100px; text-align: center;">' + TotalPersenPreview + '%</td>'),
                                    $('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">Skor</td>')
                                        .append('<td scope="col" style="width: 100px; text-align: center;">' + jsonSkorTable[i].ValueIjo + '</td>'));

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

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $('#TrmModalPreviewSkorPenilaian tbody tr').remove();
}
// * Skor Penilaian * //

// * Skor Penilaian Return* //
function TotalPreviewSkorPenilaianReturn(HeaderID) {
    $("#modal-skorpreview-return").modal('show');
    if (HeaderID == "") {
        var TrxHeaderID = getParameterByName("headerid")
    } else {
        var TrxHeaderID = HeaderID
    }
    var TotalPersen
    var jsonTextPersenTable = JSON.stringify({ HeaderID: TrxHeaderID, KodeGrup: "PersenNya" });
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_GETTotalNilaiReturn",
        data: jsonTextPersenTable,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsonPersenTable = JSON.parse(data.d);
            var i = "";

            if (jsonPersenTable.length != "") {
                //for (i = 0; i < jsonPersenTable.length; i++) {
                //    $("#ContentPlaceHolder1_QM_Persen").val(jsonPersenTable[i].ValueIjo)
                //    //TotalPersen = jsonPersenTable[i].ValueIjo
                //}
                var jsonTextSkorTable = JSON.stringify({ HeaderID: TrxHeaderID, KodeGrup: "TotalNya" });
                $.ajax({
                    type: "POST",
                    url: "asmx/QA_Form.asmx/QM_GETTotalNilaiReturn",
                    data: jsonTextSkorTable,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {


                        var jsonSkorTable = JSON.parse(data.d);
                        var i = "";
                        if (jsonSkorTable.length != "") {

                            for (i = 0; i < jsonSkorTable.length; i++) {
                                if (jsonPersenTable[i].ValueIjo == "" || jsonPersenTable[i].ValueIjo == null) {
                                    var TotalPersenPreview = jsonSkorTable[i].ValueIjo
                                } else {
                                    var TotalPersenPreview = jsonPersenTable[i].ValueIjo
                                }
                                $('#TrmModalPreviewSkorPenilaianReturn').append($('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">Bobot</td>')
                                    .append('<td scope="col" style="width: 100px; text-align: center;">' + TotalPersenPreview + '%</td>'),
                                    $('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">Skor</td>')
                                        .append('<td scope="col" style="width: 100px; text-align: center;">' + jsonSkorTable[i].ValueIjo + '</td>'));

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

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $('#TrmModalPreviewSkorPenilaianReturn tbody tr').remove();
}
// * Skor Penilaian Return* //
// * Button Interaction * //
function ButtonActionInteractionSubmit() {
    if ($("#Interaction_ComboStatus").val() == "" || $("#Interaction_ComboStatus").val() == "Select") {
        swal(
            '',
            'Status Kosong',
            'info'
        ).then(function () {
            return false;
        });
    }
    //if ($("#Interaction_Header").val() == "") {
    //    swal(
    //        '',
    //        'Interaction Kosong',
    //        'info'
    //    ).then(function () {
    //        return false;
    //    });
    //}
    var refute_status = "", return_status = "";
    if ($("#QM_LevelUser").val() == "Agent") {

        if ($("#Interaction_ComboStatus").val() == "Refute") {

            $.ajax({
                type: "POST",
                url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                data: "{TrxID:'" + getParameterByName("headerid") + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK047', TrxActionType: 'TA-01'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, x, result = "";

                    for (i = 0; i < json.length; i++) {
                        if (json[i].refute_status == "1") {
                            swal(
                                '',
                                'Data Sudah Pernah Di Refute',
                                'error'
                            ).then(function () {
                                return false;
                            });
                        } else {
                            if (json[i].return_status == "1") {
                                swal(
                                    '',
                                    'Data Sudah Pernah Di Return',
                                    'error'
                                ).then(function () {
                                    return false;
                                });
                            }
                        }

                    }

                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            })

        } else {

            refute_status = "0"

        }

    }

    if ($("#QM_LevelUser").val() != "QA" || $("#QM_LevelUser").val() != "Agent") {

        if ($("#Interaction_ComboStatus").val() == "Return") {

            $.ajax({
                type: "POST",
                url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                data: "{TrxID:'" + getParameterByName("headerid") + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK047', TrxActionType: 'TA-01'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, x, result = "";

                    for (i = 0; i < json.length; i++) {

                        if (json[i].return_status == "1") {
                            swal(
                                '',
                                'Data Sudah Pernah Di Return',
                                'error'
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

        } else {

            return_status = "0"

        }

    }

    if ($("#Interaction_ComboStatus").val() == "Finnished") {
        if (CKEDITOR.instances.Interaction_KesimpulanSaran.getData() != "" || CKEDITOR.instances.Interaction_KesimpulanSaran.getData() != null) {
            var KesimpulanSaran = CKEDITOR.instances.Interaction_KesimpulanSaran.getData();
        } else {
            swal(
                '',
                'Kesimpulan Dan Saran Kosong',
                'info'
            ).then(function () {
                return false;
            });
        }
        if ($("#RatingPenilaian").val() == "" || $("#RatingPenilaian").val() == null) {
            swal(
                '',
                'Rating Kosong',
                'info'
            ).then(function () {
                return false;
            });
            var RatingPenilaian = $("#RatingPenilaian").val();
        } else {
            var RatingPenilaian = "0";
        }
        var RatingPenilaian = "0";
    } else {
        var RatingPenilaian = "0";
        var KesimpulanSaran = "-";
    }

    if ($("#Interaction_ComboStatus").val() == "Return") {
        if ($("#QM_LevelUser").val() == "QA") {
            if ($("#Interaction_StatusReturn").val() == "" || $("#Interaction_StatusReturn").val() == "Select" || $("#Interaction_StatusReturn").val() == "-") {
                swal("Status Return Kosong");
                return false;
            }
            var StatusReturn = $("#Interaction_StatusReturn").val();
        } else {
            var StatusReturn = "-";
        }
    } else {
        if ($("#Interaction_StatusReturn").val() == "Select" || $("#Interaction_StatusReturn").val() == "-") {
            var StatusReturn = "-";
        } else {
            var StatusReturn = $("#Interaction_StatusReturn").val();
        }
    }

    var ValueInteraction_Description = CKEDITOR.instances.Interaction_Description.getData();
    if (ValueInteraction_Description == "" || ValueInteraction_Description == " ") {
        swal(
            '',
            'Description Kosong',
            'info'
        ).then(function () {
            return false;
        });
    }
    var form_data = JSON.stringify({
        QM_HeaderID: getParameterByName("headerid"), QM_AcraID: getParameterByName("acraid"),
        QM_Status: $("#Interaction_ComboStatus").val(), QM_Kesimpulan: KesimpulanSaran, QM_Rating: RatingPenilaian,
        QM_Description: ValueInteraction_Description, QM_CreatedBy: $("#hd_sessionLogin").val(), QM_StatusReturn: StatusReturn,
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
                    url: "asmx/QA_Form.asmx/QM_TrxInteractionPenilaian",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(data)
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        console.log(json[0].Result)

                        var i = 0;
                        if (json[i].Result === "True") {
                            //SocketNotification(getParameterByName("headerid"))
                            swal(
                                '',
                                'Insert Interaction Has Been Success',
                                'success'
                            ).then(function () {
                                if ($("#QM_LevelUser").val() == "QA") {
                                    if ($("#Interaction_ComboStatus").val() == "Approved") {
                                        if ($("#Interaction_StatusReturn").val() == "Approved") {
                                            TotalSkorPenilaian(getParameterByName("headerid"))
                                        }
                                    } else {
                                        window.location.href = "QA_Taskboard_Penilaian.aspx?";
                                    }
                                } else {
                                    if ($("#Interaction_ComboStatus").val() == "Finnished") {
                                        $("#modal-kesimpulan").modal('show');
                                    } else {
                                        window.location.href = "QA_Taskboard_Penilaian.aspx?";
                                    }
                                }
                                $("#ButtonActionInteractionSubmit").css("display", "none")
                                $("#ButtonInteractionAttachment").css("display", "none")
                                CKEDITOR.instances.Interaction_Description.setData("")
                                if (getParameterByName("headerid") != null) {
                                    JourNeyInteraction(getParameterByName("headerid"))
                                }
                            });
                        } else {

                            swal(
                                '',
                                'Insert Interaction Has Been Failed !',
                                'error'
                            ).then(function () {
                                return false
                            });
                            return false
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
function JourNeyInteraction(HeaderID) {
    //$("#LoaderJourNeyInteraction").show();
    //$("#DivHistoryPenilaian").show()
    //$("#JourNeyInteraction").show()
    if (HeaderID == "" || HeaderID == null || HeaderID == "undefined") {
        var GHeaderID = getParameterByName("headerid")
    } else {
        var GHeaderID = HeaderID
    }
    var dataJourNeyInteraction = "";
    var iconChannel = "";
    var channelDesc = "";
    var messageDiv = $('#JourneyHistoryInteraction');
    var PathTicket = "" + IPSERVER + "/FileTransaction/FileInteraction"
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + GHeaderID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK046', TrxActionType: 'TA-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            messageDiv.empty();
            json.forEach(async (item) => {

                //console.log(item)
                let imagein = ""
                await $.ajax({
                    type: "POST",
                    url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                    data: "{TrxID:'" + item.ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK069', TrxActionType: 'TA-01'}",
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
                                '<h5 class="font-size-13 text-truncate mb-1">' + json[j].FileNames + '</h5>' +
                                '<a href=' + PathTicket + "/" + json[j].FileNameURL + ' target="_blank" class="text-body">' +
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
                    '<div class="timeline-date">' + item.DateInteraction + '</div>' +
                    '<h5 class="mt-3 font-size-16">' + item.CreatedBy + '</h5>' +
                    '<div class="text-muted">' +
                    '' + item.DescriptionTransaction + '' +
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
// * Button Interaction * //

// * Function Javascript * //
function onChangeStatusTransaksi(StatusID) {
    //if ($("#Interaction_ComboStatus").val() == "Finnished") {
    //    $("#modal-kesimpulan").modal('show');
    //} else {
    //    $("#modal-kesimpulan").modal('hide');
    //}
    //if ($("#Interaction_ComboStatus").val() == "Finnished") {
    //    $("#DivKesimpulanSaran").hide()
    //    $("#TRKesimpulanSaran").show()
    //} else {
    //    $("#DivKesimpulanSaran").hide()
    //    //$("#Interaction_KesimpulanSaran").hide()
    //    $("#TRKesimpulanSaran").hide()
    //}
}
function onChangeStatus(StatusID) {
    if ($("#Interaction_StatusReturn").val() == "Approved") {
        $("#Interaction_ComboStatus option:selected").text("Approved");
        //$("#Interaction_ComboStatus option:selected").text("Refute");
    } else if ($("#Interaction_StatusReturn").val() == "Reject") {
        $("#Interaction_ComboStatus option:selected").text("Refute");
    } else if ($("#Interaction_StatusReturn").val() == "Select") {
        $("#Interaction_ComboStatus option:selected").text("Return");
    } else {
        var Interaction_ComboStatus = $('#Interaction_ComboStatus');
        var JenisKondisi = "AllWhereData";
        var NamaTable = "UIDESK_QM_TrmStatus";
        var KondisiData = "Where type='" + $("#QM_LevelUser").val() + "'";
        var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
        $.ajax({
            type: "POST",
            url: "asmx/QA_Form.asmx/GetWhereRecords",
            data: jsonText,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var json = JSON.parse(data.d);
                var i, x, result = "";

                Interaction_ComboStatus.empty()
                for (i = 0; i < json.length; i++) {

                    result = '<option value="' + json[i].status + '">' + json[i].status + '</option>';
                    Interaction_ComboStatus.append(result);

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
function SocketNotification(HeaderID) {
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + HeaderID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK056', TrxActionType: 'TA-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                if ($("#QM_LevelUser").val() == "Supervisor_QA" && $("#Interaction_ComboStatus").val() == "Approved") {
                    ; socket.emit("to-socket-bri", {
                        HeaderID: json[i].agent,
                        UserName: HeaderID,
                        LevelUser: "Supervisor_QA",
                        StatusTransaksiType: 1,
                        NotifTitle: "Halo " + json[i].agent_name + "",
                        NotifBody: "Data Penilaian Quality Monitoring"
                    });
                } else if ($("#QM_LevelUser").val() == "Agent_Leader" && $("#Interaction_ComboStatus").val() == "Return") {
                    ; socket.emit("to-socket-bri", {
                        HeaderID: json[i].qa_name,
                        UserName: HeaderID,
                        LevelUser: "Agent_Leader",
                        StatusTransaksiType: 1,
                        NotifTitle: "Halo " + json[i].qa_fullname + "",
                        NotifBody: "Data Penilaian Quality Monitoring"
                    });
                } else if ($("#QM_LevelUser").val() == "Supervisor_Agent" && $("#Interaction_ComboStatus").val() == "Return") {
                    ; socket.emit("to-socket-bri", {
                        HeaderID: json[i].qa_name,
                        UserName: HeaderID,
                        LevelUser: "Supervisor_Agent",
                        StatusTransaksiType: 1,
                        NotifTitle: "Halo " + json[i].qa_fullname + "",
                        NotifBody: "Data Penilaian Quality Monitoring"
                    });
                } else if ($("#QM_LevelUser").val() == "Admin_Release" && $("#Interaction_ComboStatus").val() == "Return") {
                    ; socket.emit("to-socket-bri", {
                        HeaderID: json[i].qa_name,
                        UserName: HeaderID,
                        LevelUser: "Admin_Release",
                        StatusTransaksiType: 1,
                        NotifTitle: "Halo " + json[i].qa_fullname + "",
                        NotifBody: "Data Penilaian Quality Monitoring"
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
function TittleIndikator(ID) {
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK044', TrxActionType: 'CMB-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            $("#ItemPertanyaan").empty()
            $("#DetailPertanyaan").empty()
            for (i = 0; i < json.length; i++) {

                if (json[i].TittlePertanyaan != "" && json[i].TittlePertanyaan != null) {
                    $("#alerttopright").show();
                    $("#ItemPertanyaan").append(json[i].ItemPertanyaan);
                    $("#DetailPertanyaan").append(json[i].TittlePertanyaan);
                } else {
                    $("#alerttopright").hide();
                    swal(
                        '',
                        'Deskripsi ' + json[i].ItemPertanyaan + ' Kosong',
                        'info'
                    )
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
function pad(num) {
    num = "0" + num;
    return num.slice(-2);
}
function ClearRadioButton() {
    var ele = document.querySelectorAll("input[type=radio]");
    for (var i = 0; i < ele.length; i++) {
        ele[i].checked = false;
    }
}
// * Function Javascript * //

// * History Penilaian * //
function JourNeyHistoryPenilaian() {
    var messageDiv = $('#JourNeyHistoryPenilaian');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxHistoryPenilaian_Agent",
        data: "{TrxUserName:'" + $("#hd_sessionLogin").val() + "', TrxAgent: '" + getParameterByName("agentid") + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, ResultJourNeyHistoryPenilaian = "";

            messageDiv.empty();
            for (i = 0; i < json.length; i++) {

                ResultJourNeyHistoryPenilaian = '<div class="col-xl-4 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/avatar-1.jpg" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].header_id + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].HeaderDate + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=TotalPreviewSkorPenilaian("' + json[i].header_id + '")>Skor</a> ' +
                    '<a class="dropdown-item" href="QA_form.aspx?id=' + json[i].ID + '&act=edit&qaid=' + json[i].qa_id + '&type=' + json[i].type + '&UserType=' + json[i].qa_type + '&headerid=' + json[i].header_id + '&acraid=' + json[i].acra_id + '&agentid=' + json[i].agent + '&status=' + json[i].status_data + '&view=1">Detail Penilaian</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12">' + json[i].channel + '</span>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].status_data + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                messageDiv.append(ResultJourNeyHistoryPenilaian)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //var AgentID = getParameterByName("agentid")
    //$("#TrmHistoryPenilaian").show();
    //var jsonText = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxAgent: AgentID });
    //var myTable = $('#TrmHistoryPenilaian').DataTable();
    //$.ajax({
    //    type: "POST",
    //    url: "asmx/QA_Form.asmx/QM_TrxHistoryPenilaian_Agent",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, resultnya = "";

    //        if (json.length != 0) {
    //            myTable.clear().draw();
    //            for (i = 0; i < json.length; i++) {
    //                if (json[i].channel == 'Call') {
    //                    var icon = "mdi mdi-phone";
    //                    var color = "primary";
    //                    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
    //                } else if (json[i].channel == 'Video Banking Assistant') {
    //                    var icon = "mdi mdi-camera";
    //                    var color = "danger";
    //                    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
    //                } else if (json[i].channel == 'Instagram') {
    //                    var icon = "mdi mdi-instagram";
    //                    var color = "success";
    //                    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
    //                } else {
    //                    var icon = "mdi mdi-record";
    //                    var color = "warning";
    //                    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
    //                }
    //                if (json[i].status_data == 'Draft') {
    //                    var colorstatus = "success"
    //                } else if (json[i].status_data == 'Pending Approved') {
    //                    var colorstatus = "info"
    //                } else if (json[i].status_data == 'Approved') {
    //                    var colorstatus = "primary"
    //                } else if (json[i].status_data == 'Refute') {
    //                    var colorstatus = "warning"
    //                } else if (json[i].status_data == 'Return') {
    //                    var colorstatus = "primary"
    //                } else if (json[i].status_data == 'Finnished') {
    //                    var colorstatus = "danger"
    //                } else {
    //                    var colorstatus = "success"
    //                }
    //                if ($("#QM_LevelUser").val() == "Administrator") {
    //                    var QAName = json[i].qa_name
    //                    var AgentName = json[i].AgentName
    //                } else {
    //                    var QAName = "**********"
    //                    var AgentName = "**********"
    //                }
    //                var Action = "<div class='dropdown'>" +
    //                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
    //                    "<div class='dropdown-menu dropdown-menu-right'>" +
    //                    "<a class='dropdown-item' href='#' onclick=TotalPreviewSkorPenilaian('" + json[i].header_id + "')><span class='font-size-16 text-info'><i class='mdi mdi-note-text text-primary'></i></span>Lihat Nilai</a>" +
    //                    "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&view=1' target='_blank'' onclick=showUpdate('" + json[i].MenuID + "')><i class='font-size-16 mdi mdi-arrow-right-bold-circle-outline text-primary'></i>Detail Penilaian</a>" +
    //                    "</div>" +
    //                    "</div>"
    //                //var Action = "<a href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&view=1' target='_blank'><i class='font-size-24 mdi mdi-arrow-right-bold-circle-outline text-primary'></i></a>"
    //                //var Skor = "<a href='#' onclick=TotalPreviewSkorPenilaian('" + json[i].header_id + "')><span class='font-size-24 text-info'><i class='mdi mdi-note-text text-primary'></i></span></a>"
    //                myTable.row.add([url, json[i].header_id, "<span class='badge badge-pill badge-" + colorstatus + "'>" + json[i].status_data + "</span>", json[i].HeaderDate, Action]).draw(false);
    //            }

    //        } else {
    //            swal(
    //                '',
    //                'Data Kosong',
    //                'error'
    //            ).then(function () {
    //                return false
    //            });
    //        }
    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
// * History Penilaian * //
// * History Return * //
function JourNeyHistoryReturn() {
    var messageDiv = $('#JourNeyHistoryReturn');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxHistoryPenilaian_Return",
        data: "{TrxUserName:'" + $("#hd_sessionLogin").val() + "', TrxAgent: '" + getParameterByName("agentid") + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, ResultJourNeyHistoryReturn = "";

            messageDiv.empty();
            for (i = 0; i < json.length; i++) {

                ResultJourNeyHistoryReturn = '<div class="col-xl-4 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/avatar-1.jpg" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].header_id + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].HeaderDate + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=TotalPreviewSkorPenilaianReturn("' + json[i].header_id + '")>Skor</a> ' +
                    '<a class="dropdown-item" href="QA_FormHistory.aspx?id=' + json[i].ID + '&act=edit&qaid=' + json[i].qa_id + '&type=' + json[i].type + '&UserType=' + json[i].qa_type + '&headerid=' + json[i].header_id + '&acraid=' + json[i].acra_id + '&agentid=' + json[i].agent + '&status=' + json[i].status_data + '&view=1">Detail Penilaian</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12">' + json[i].channel + '</span>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].status_data + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                messageDiv.append(ResultJourNeyHistoryReturn)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
// * History Return * //

// * Kesimpulan Dan Saran * //
function JourNeyKesimpulanSaran(HeaderID) {
    if (HeaderID == "" || HeaderID == null || HeaderID == "undefined") {
        var GHeaderID = getParameterByName("headerid")
    } else {
        var GHeaderID = HeaderID
    }
    var dataJourNeyKesimpulanSaran = "";
    var iconChannel = "";
    var channelDesc = "";
    var ResultJourneyKesimpulanSaran = "";
    var messageDiv = $('#JourneyKesimpulanSaran');
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + GHeaderID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK043', TrxActionType: 'CMB-01'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            //$('#JourneyKesimpulanSaran').empty();
            //if (json.length != "") {
            //    for (i = 0; i < json.length; i++) {

            //        var d = new Date(json[i].CreatedDate);
            //        var milisegundos = parseInt(json[i].CreatedDate.replace("/Date(", "").replace(")/", ""));
            //        var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
            //        var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

            //        if ($("#QM_LevelUser").val() == "Administrator") {
            //            var InteractionBy = "" + json[i].CreatedBy + ""
            //        } else {
            //            var InteractionBy = "**********"
            //        }
            //        if (json[i].StatusFile == "1") {
            //            var file = "<span class='mailbox-attachment-icon pull-left' style='margin-left:-10px;' onclick=PreviewInteractionAttachmentSide(" + json[i].InteractionID + ")><i class='fa fa-file-image-o text-primary'></i></span>"
            //        } else {
            //            var file = ""
            //        }
            //        if (json[i].Rating == "1") {
            //            var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>'
            //        } else if (json[i].Rating == "2") {
            //            var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>'

            //        } else if (json[i].Rating == "3") {
            //            var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>'

            //        } else if (json[i].Rating == "4") {
            //            var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>'

            //        } else if (json[i].Rating == "5") {
            //            var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>'
            //        } else {
            //            var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
            //                '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>'
            //        }
            //        //if (json[i].StatusData == "Draft") {
            //        //    var Color = "success"
            //        //}
            //        //if (json[i].StatusData == "Draft") {
            //        //    var Color = "success"
            //        //} else if (json[i].StatusData == "Pending Approved") {
            //        //    var Color = "info"
            //        //} else if (json[i].StatusData == "Approved") {
            //        //    var Color = "primary"
            //        //} else if (json[i].StatusData == "Refute") {
            //        //    var Color = "warning"
            //        //} else if (json[i].StatusData == "Return") {
            //        //    var Color = "primary"
            //        //} else if (json[i].StatusData == "Finnished") {
            //        //    var Color = "danger"
            //        //}
            //        Color = "info"
            //        if (json[i].KesimpulanSaran == null) {
            //            var interaction = "";
            //        } else {
            //            var interaction = '<div class="timeline-item">' +
            //                '<div class="timeline-point">' +
            //                '<i class="fa fa-circle"></i>' +
            //                '</div>' +
            //                '<div class="timeline-event">' +
            //                '<div class="timeline-body">' +
            //                '' + json[i].KesimpulanSaran + '' +
            //                '</div>' +
            //                '<div class="timeline-footer">' +
            //                '<p class="pull-right text-fade" style="font-size:12px;">' + newDate + ' ' + newTime + '</p>' +
            //                '</div>' +
            //                '</div>' +
            //                '</div>';
            //        }
            //        dataJourNeyKesimpulanSaran +=
            //            '<span class="timeline-label">' +
            //            '</span>' +
            //            '<div class="timeline-item">' +
            //            '<div class="timeline-point">' +
            //            '<i class="ion ion-chatbubble-working"></i>' +
            //            '</div>' +
            //            '<div class="timeline-event">' +
            //            '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + InteractionBy + '</p>' +
            //            '<div class="timeline-body">' +
            //            '' + json[i].KesimpulanSaran + '' +
            //            '</div>' +
            //            '<div class="timeline-footer">' +
            //            '' + file + '' +
            //            '</br>' +
            //            '</br>' +
            //            '</br>' +
            //            '' + Rating + '' +
            //            '<p class="pull-right text-fade" style="font-size:12px;">' + newDate + ' ' + newTime + '</p>' +
            //            '</div>' +
            //            '</div>' +
            //            '</div>'

            //    }
            //    $('#JourneyKesimpulanSaran').append(dataJourNeyKesimpulanSaran);
            //} 

            messageDiv.empty();
            if (json.length != "") {
                for (i = 0; i < json.length; i++) {

                    if (json[i].Rating == "1") {
                        var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>'
                    } else if (json[i].Rating == "2") {
                        var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>'

                    } else if (json[i].Rating == "3") {
                        var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>'

                    } else if (json[i].Rating == "4") {
                        var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>'

                    } else if (json[i].Rating == "5") {
                        var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:#ffa800;"></i>'
                    } else {
                        var Rating = '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>' +
                            '<i class="fa fa-star font-size-24" aria-hidden="true" style="color:black;"></i>'
                    }
                    ResultJourneyKesimpulanSaran = '<div class="timeline-item">' +
                        '<div class="timeline-block">' +
                        '<div class="timeline-box card">' +
                        '<div class="card-body">' +
                        '<div class="timeline-date">' + json[i].DateKesimpulan + '</div>' +
                        '<h5 class="mt-3 font-size-16">' + json[i].CreatedBy + '</h5>' +
                        '<div class="text-muted">' +
                        '' + json[i].KesimpulanSaran + '' +
                        '</div>' +
                        '<hr>' +
                        '<div class="text-muted">' +
                        '' + Rating + '' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'

                    messageDiv.append(ResultJourneyKesimpulanSaran);

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
function ButtonCancelkesimpulan() {
    window.location.href = "QA_Taskboard_Penilaian.aspx";
}
function ButtonActionKesimpulanSaran() {
    var KesimpulanSaran = CKEDITOR.instances.Interaction_KesimpulanSaran.getData();
    if (KesimpulanSaran == "") {
        swal(
            '',
            'Kesimpulan & Saran Kosong',
            'info'
        ).then(function () {
            return false;
        });
    }
    if ($("#RatingPenilaian2").val() == "" || $("#RatingPenilaian2").val() == null) {
        swal(
            '',
            'Rating Kosong',
            'info'
        ).then(function () {
            return false;
        });
    }
    var form_data = JSON.stringify({
        QM_HeaderID: getParameterByName("headerid"), QM_AcraID: getParameterByName("acraid"),
        QM_Kesimpulan: KesimpulanSaran, QM_Rating: $("#RatingPenilaian2").val(), QM_CreatedBy: $("#hd_sessionLogin").val()
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
                    url: "asmx/QA_Form.asmx/QM_TrxKesimpulanSaran",
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
                                    'Insert Kesimpulan dan Saran Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modal-kesimpulan").modal('hide');
                                    CKEDITOR.instances.Interaction_KesimpulanSaran.setData("")
                                    if (getParameterByName("headerid") != null) {
                                        JourNeyKesimpulanSaran(getParameterByName("headerid"))
                                        location.href = "QA_Taskboard_Penilaian.aspx?";
                                    }
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Kesimpulan dan Saran Has Been Failed !',
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
function ClearRadioButton() {
    var ele = document.querySelectorAll("input[type=radio]");
    for (var i = 0; i < ele.length; i++) {
        ele[i].checked = false;
    }
}
// * Kesimpulan Dan Saran * //
function PreviewScreen() {
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + getParameterByName("acraid") + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: '0', TrxAction: 'UIDESK015'}",
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
                        $("#addContactModalScreenCall").modal('show');
                        document.getElementById("FrameAudio").src = "https://cloud.uidesk.id/bravo/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + json[i].FilePath + ""
                    } else if (json[i].Channel == "Email") {
                        $("#addContactModalScreenNonCall").modal('show');
                        document.getElementById("FrameNonCall").src = "" + json[i].FilePath + ""
                    } else if (json[i].Channel == "LiveChat") {
                        $("#addContactModalScreenNonCall").modal('show');
                        document.getElementById("FrameNonCall").src = "" + json[i].FilePath + ""
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
    //$("#addContactModalScreen").modal('show');
    //document.getElementById("FrameAudio").src = "http://localhost/Bravo/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + getParameterByName("acraid") + ""
}
function ButtonActionCancel() {
    location.href = "QA_Trx_DataBucket.aspx?";
}
function click1() {
    $(".fa-star").css("color", "black");
    $("#s1").css("color", "#ffa800");
    $("#RatingPenilaian2").val("1")
    //alert($("#RatingPenilaian").val())
}
function click2() {
    $(".fa-star").css("color", "black");
    $("#s1,#s2").css("color", "#ffa800");
    $("#RatingPenilaian2").val("2")
    //alert($("#RatingPenilaian").val())
}
function click3() {
    $(".fa-star").css("color", "black");
    $("#s1,#s2,#s3").css("color", "#ffa800");
    $("#RatingPenilaian2").val("3")
    //alert($("#RatingPenilaian").val())
}
function click4() {
    $(".fa-star").css("color", "black");
    $("#s1,#s2,#s3,#s4").css("color", "#ffa800");
    $("#RatingPenilaian2").val("4")
    //alert($("#RatingPenilaian").val())
}
function click5() {
    $(".fa-star").css("color", "black");
    $("#s1,#s2,#s3,#s4,#s5").css("color", "#ffa800");
    $("#RatingPenilaian2").val("5")
    //alert($("#RatingPenilaian").val())
}
function click11() {
    $(".fa-star").css("color", "black");
    $("#s11").css("color", "#ffa800");
    $("#RatingPenilaian2").val("1")
    //alert($("#RatingPenilaian").val())
}
function click12() {
    $(".fa-star").css("color", "black");
    $("#s11,#s12").css("color", "#ffa800");
    $("#RatingPenilaian2").val("2")
    //alert($("#RatingPenilaian").val())
}
function click13() {
    $(".fa-star").css("color", "black");
    $("#s11,#s12,#s13").css("color", "#ffa800");
    $("#RatingPenilaian2").val("3")
    //alert($("#RatingPenilaian").val())
}
function click14() {
    $(".fa-star").css("color", "black");
    $("#s11,#s12,#s13,#s14").css("color", "#ffa800");
    $("#RatingPenilaian2").val("4")
    //alert($("#RatingPenilaian").val())
}
function click15() {
    $(".fa-star").css("color", "black");
    $("#s11,#s12,#s13,#s14,#s15").css("color", "#ffa800");
    $("#RatingPenilaian2").val("5")
    //alert($("#RatingPenilaian").val())
}
function ButtonActionPenilaianUlang() {

}