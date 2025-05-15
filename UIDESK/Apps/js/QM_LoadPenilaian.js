
$(document).ready(function () {
   
});
function MasterHeader(qaid) {
    if (getParameterByName("act") == "edit") {
        var TotalPersen
        var jsonTextPersenTable = JSON.stringify({ HeaderID: getParameterByName("headerid"), KodeGrup: "PersenNya" });
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
            url: "asmx/QA_Form.asmx/QM_GETTotalNilai_Bravo",
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

            var dataHeaderNya = "";
            for (i = 0; i < json.length; i++) {


                var TotalNilaiSkor = "0";
                $('#tableForm1').append($('<tr id="' + json[i].KodeGrup + '" class="table-light" style="background-color:gray">')
                    .append('<td style="width: 50px;"></td>')
                    .append('<td style="width: 700px; font-weight: bold; font-style: italic; text-align: left;">' + json[i].ItemGrup + '</td>')
                    .append('<td style="width: 100px; text-align: center;"></td>')
                    .append('<td style="width: 100px; text-align: center;"><span class="badge rounded-pill badge-soft-primary font-size-14" style="text-align:center;">' + json[i].BobotGrup + '</span></td>')
                    .append('<td style="width: 400px;"></td>')
                    .append('<td><div id="TotalSkor_' + json[i].KodeGrup + '"></div></td></tr>'));

                if (getParameterByName("act") == "edit") {
                    var jsonTextSkor = JSON.stringify({ HeaderID: getParameterByName("headerid"), KodeGrup: "" + json[i].KodeGrup + "" });
                    //alert(jsonTextSkor)
                    $.ajax({
                        type: "POST",
                        url: "asmx/QA_Form.asmx/QM_GETTotalNilai_Bravo",
                        data: jsonTextSkor,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var jsonSkor = JSON.parse(data.d);
                            var xx = 0;

                            if (jsonSkor.length != "") {

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

                            UrutNya = UrutNya + 1;
                            var html = '<tr>' +
                                '<td style="width: 50px;">' + jsonSub[iSub].NoUrut + '</td> ' +
                                '<td style="width: 700px;cursor:pointer;" onclick=TittleIndikator(' + jsonSub[iSub].ID + ')>' + jsonSub[iSub].ItemPertanyaan + '</td> ' +
                                '<td style="width: 100px; text-align: center;"><a href="#" onclick=UserCommentTransaction("' + jsonSub[iSub].KodePertanyaan + '")><i class="fa fa-plus"></i></a></td> ' +
                                '<td style="width: 400px; text-align: center;"></td> ' +
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

                            var jsonTextNilai = JSON.stringify({ tableType: "AllWhereData", tableName: NamaTable, paramQuery: "where Expr2='" + jsonSub[iSub].KodePertanyaan + "' order by Nilai asc" });
                            var resultNilai = "";

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

                                        if (getParameterByName("act") == "edit") {

                                            var DetailPenilaianID
                                            var NamaTableS = "QA_TrxDetailPenilaian"
                                            var jsonTextNilaiEdit = JSON.stringify({ tableType: "AllWhereData", tableName: NamaTableS, paramQuery: "where Header_ID='" + getParameterByName("headerid") + "' And kodeitempertanyaan='" + jsonNilai[iNilai].KodePertanyaan + "' order by id asc" });
                                            var resultNilai = "";
                                            var checkedNyaNih = "";

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

                                                        $("#ContentPlaceHolder1_QM_ResultPenilaianID").val(json[i].ID)

                                                    } else {

                                                    }

                                                },
                                                error: function (xmlHttpRequest, textStatus, errorThrown) {
                                                    console.log(xmlHttpRequest.responseText);
                                                    console.log(textStatus);
                                                    console.log(errorThrown);
                                                }
                                            })

                                            if ($("#QM_LevelUser").val() != "QA") {
                                                var disabled = "disabled=disabled"
                                                //var disabled = ""
                                                //alert("1 " + disabled)
                                            } else {
                                                if (getParameterByName("status") != "Draft" && getParameterByName("status") != "Return") {
                                                    var disabled = "disabled=disabled"

                                                } else {
                                                    var disabled = ""

                                                }
                                            }

                                            if (idkodeitempenilaian == jsonNilai[iNilai].KodePenilaian) {
                                                if (NilaiInput == jsonNilai[iNilai].Nilai) {

                                                    if (jsonNilai[iNilai].Nilai < 0) {
                                                        var NilaiQM = "NA"
                                                    } else {
                                                        var NilaiQM = jsonNilai[iNilai].Nilai
                                                    }
                                                    resultNilai = "<input name='group1_" + jsonNilai[iNilai].KodePertanyaan + "' onclick=ButtonActionNilai('" + KodeGrupNya + "','" + jsonNilai[iNilai].KodePertanyaan + "','" + jsonNilai[iNilai].KodePenilaian + "','" + jsonNilai[iNilai].Nilai + "','2','" + DetailPenilaianID + "') type='radio' id='radio_" + jsonNilai[iNilai].KodePenilaian + "' Checked='' " + disabled + "> " +
                                                        "<label for='radio_" + jsonNilai[iNilai].KodePenilaian + "'>" + NilaiQM + "&nbsp;</label>";
                                                    //$("#radio_" + jsonNilai[iNilai].KodePenilaian).css('color', 'red');
                                                    $("#isiData_" + jsonNilai[iNilai].Expr2).append(resultNilai);

                                                } else {
                                                    if (jsonNilai[iNilai].Nilai < 0) {
                                                        var NilaiQM = "NA"
                                                    } else {
                                                        var NilaiQM = jsonNilai[iNilai].Nilai
                                                    }
                                                    resultNilai = "<input name='group1_" + jsonNilai[iNilai].KodePertanyaan + "' onclick=ButtonActionNilai('" + KodeGrupNya + "','" + jsonNilai[iNilai].KodePertanyaan + "','" + jsonNilai[iNilai].KodePenilaian + "','" + jsonNilai[iNilai].Nilai + "','2','" + DetailPenilaianID + "') type='radio' id='radio_" + jsonNilai[iNilai].KodePenilaian + "' " + disabled + "> " +
                                                        "<label for='radio_" + jsonNilai[iNilai].KodePenilaian + "'>" + NilaiQM + "&nbsp;</label>";
                                                    $("#isiData_" + jsonNilai[iNilai].Expr2).append(resultNilai);
                                                }
                                            } else {
                                                if (jsonNilai[iNilai].Nilai < 0) {
                                                    var NilaiQM = "NA"
                                                } else {
                                                    var NilaiQM = jsonNilai[iNilai].Nilai
                                                }
                                                resultNilai = "<input name='group1_" + jsonNilai[iNilai].KodePertanyaan + "' onclick=ButtonActionNilai('" + KodeGrupNya + "','" + jsonNilai[iNilai].KodePertanyaan + "','" + jsonNilai[iNilai].KodePenilaian + "','" + jsonNilai[iNilai].Nilai + "','2','" + DetailPenilaianID + "') type='radio' id='radio_" + jsonNilai[iNilai].KodePenilaian + "' " + disabled + "> " +
                                                    "<label for='radio_" + jsonNilai[iNilai].KodePenilaian + "'>" + NilaiQM + "&nbsp;</label>";
                                                $("#isiData_" + jsonNilai[iNilai].Expr2).append(resultNilai);
                                            }

                                        } else {
                                            if (jsonNilai[iNilai].Nilai < 0) {
                                                var NilaiQM = "NA"
                                            } else {
                                                var NilaiQM = jsonNilai[iNilai].Nilai
                                            }
                                            resultNilai = "<input name='group1_" + jsonNilai[iNilai].KodePertanyaan + "' onclick=ButtonActionNilai('" + KodeGrupNya + "','" + jsonNilai[iNilai].KodePertanyaan + "','" + jsonNilai[iNilai].KodePenilaian + "','" + jsonNilai[iNilai].Nilai + "','1','0') type='radio' id='radio_" + jsonNilai[iNilai].KodePenilaian + "'> " +
                                                "<label for='radio_" + jsonNilai[iNilai].KodePenilaian + "'>" + NilaiQM + "&nbsp;</label>";
                                            $("#isiData_" + jsonNilai[iNilai].Expr2).append(resultNilai);

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

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}