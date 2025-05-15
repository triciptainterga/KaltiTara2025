$(document).ready(function () {
    urlDatakelola = $("#SM_UrlDatakelola").val();
    if (getParameterByName("api") == "1") {
        $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
            data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK220'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                if (json.length == 0) {
                } else {
                    for (i = 0; i < json.length; i++) {
                        if (json[i].ScheduleState == "1") {
                            if (json[i].Login == "1") {
                                updateAuxDatakelola($("#SM_MultiChatToken").val(), "ready", $("#SM_CompanyToken").val());
                            }
                        } else {
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
        $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
            data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK220'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                if (json.length == 0) {
                    updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
    valueProductivity();
    valueQuality();
    valuePerformance();
    valueIncommingChannel();
    valueDataTicket();
    valueTotalOccupancyRate();
    valueDetailOccupancyRate();
    valueServicePerAgent();
    valueDetailServicePerAgent();
    valueAgentServiceLevel();
    valueDetailServiceLevel();
});
async function updateAuxDatakelola(token_agent, value, token_company) {
    await fetch("" + urlDatakelola + "/api/agent/aux", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token_agent: token_agent,
            aux: value,
            token: token_company,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            //alert("updateAuxDatakelola says: " + data.message);
        });
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Productivity
async function valueProductivity() {
    try {
        let response = await $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/BRA_Dash_Performance",
            data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Action: "Productivity" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
        
        let json = JSON.parse(response.d);
        
        if (json.length > 0) {
            let nilai = json[0].NilaiProduktivitas;
            let displayValue = (parseFloat(nilai) === 0) ? '-' : parseFloat(nilai).toFixed(1).replace(".", ",");
            $("#valueProductivity").text(displayValue);
        }
    } catch (error) {
        console.log("Error:", error.responseText);
    }
}

// Quality
async function valueQuality() {
    try {
        let response = await $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/BRA_Dash_Performance",
            data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Action: "Quality" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
        
        let json = JSON.parse(response.d);
        
        if (json.length > 0) {
            let nilai = json[0].NilaiProduktivitas;
            let displayValue = (parseFloat(nilai) === 0) ? '-' : parseFloat(nilai).toFixed(1).replace(".", ",");
            $("#valueQuality").text(displayValue);
        }
    } catch (error) {
        console.log("Error:", error.responseText);
    }
}

// Performance
async function valuePerformance() {
    try {
        let response = await $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/BRA_Dash_Performance",
            data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Action: "Performance" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
        
        let json = JSON.parse(response.d);
        
        if (json.length > 0) {
            let nilai = json[0].NilaiProduktivitas;
            let displayValue = (parseFloat(nilai) === 0) ? '-' : parseFloat(nilai).toFixed(1).replace(".", ",");
            $("#valuePerformance").text(displayValue);
        }
    } catch (error) {
        console.log("Error:", error.responseText);
    }
}

// Incomming Channel
async function valueIncommingChannel() {
    try {
        let response = await $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/BRA_Dash_Performance",
            data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Action: "IncomingChannel" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        let json = JSON.parse(response.d);

        if (json.length > 0) {
            let channelMap = {
                "Call": "valueCall",
                "Email": "valueEmail",
                "Instagram": "valueInstagram",
                "Facebook": "valueFacebook",
                "livechat": "valueLiveChat",
                "Whatsapp": "valueWhatsapp",
                "X": "valueX"
            };

            json.forEach(item => {
                let id = channelMap[item.ChannelData];
                if (id) {
                    let displayValue = (item.JumlahData == 0) ? '-' : item.JumlahData;
                    $("#" + id).text(displayValue);
                }
            });
        }
    } catch (error) {
        console.log("Error:", error.responseText);
    }
}

async function valueDataTicket() {
    try {
        let response = await $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/BRA_Dash_Performance",
            data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Action: "Ticket" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        let json = JSON.parse(response.d);

        let statusMap = {
            "Open": "ticketOpen",
            "Pending": "ticketPending",
            "Solved": "ticketSolved",
            "Closed": "ticketClosed"
        };

        json.forEach(item => {
            let id = statusMap[item.StatusData];
            if (id) {
                let displayValue = (parseInt(item.JumlahData) === 0) ? '-' : item.JumlahData;
                $("#" + id).text(displayValue);
            }
        });
    } catch (error) {
        console.log("Error:", error.responseText);
    }
}

async function valueTotalOccupancyRate() {
    try {
        let response = await $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/BRA_Dash_Performance",
            data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Action: "TotalOR" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        let json = await JSON.parse(response.d);

        if (json.length > 0) {
            let rawValue = json[0].AvgResult;
            let AvgResult = parseFloat(rawValue);

            let displayValue = (!rawValue || isNaN(AvgResult) || AvgResult === 0)
                ? "-"
                : AvgResult.toFixed(1).replace(".", ",") + "%";

            $("#valueTotalOccupancyRate").text(displayValue);
        } else {
            $("#valueTotalOccupancyRate").text("-");
        }
    } catch (error) {
        console.log("Error:", error.responseText);
        $("#valueTotalOccupancyRate").text("-");
    }
}


// Detail Occupancy Rate
async function valueDetailOccupancyRate() {
    try {
        let response = await $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/BRA_Dash_Performance",
            data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Action: "TotalORDaily" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        let json = JSON.parse(response.d);
        // console.log("Response Data:", json); // Debugging

        if (json.length > 0) {
            let data = json[0];

            // Update nilai berdasarkan data dari API, dengan pengecekan nilai 0
            let handlingTime = data.HandlingTimeFormatted || "00:00:00";
            let staffedTime = data.StaffedTimeFormatted || "00:00:00";

            // Jika waktu adalah "00:00:00", tampilkan "-"
            $("#valueHandlingTime").text(handlingTime === "00:00:00" ? "-" : handlingTime);
            $("#valueStaffedTime").text(staffedTime === "00:00:00" ? "-" : staffedTime);
            
            // Update nilai OccupancyRate jika tidak 0
            let ORRESLT = parseFloat(data.ORRESLT);
            let occupancyRate = (isNaN(ORRESLT) || ORRESLT === 0) ? "-" : ORRESLT.toFixed(2).replace(".", ",") + "%";
            $("#valueOccupancyRate").text(occupancyRate);

            // Simulasi nilai perubahan dari periode sebelumnya
            let previousRate = (Math.random() * 10).toFixed(1); // Contoh random perubahan 0-10%
            $("#valuePreviousRate").html(previousRate + "% <i class='mdi mdi-arrow-up'></i>");
        }
    } catch (error) {
        console.log("Error:", error.responseText);
        $("#valueHandlingTime").text("-");
        $("#valueStaffedTime").text("-");
        $("#valueOccupancyRate").text("-");
    }
}


// Total Service Per Agent
async function valueServicePerAgent() {
    try {
        let response = await $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/BRA_Dash_Performance",
            data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Action: "TotalSPA" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        let json = await JSON.parse(response.d);
        console.log("Response Data:", json); // Debugging

        if (json.length > 0 && json[0].TotalPercentage) {
            let TotalPercentage = parseFloat(json[0].TotalPercentage);
            if (!isNaN(TotalPercentage)) {
                $("#valueServicePerAgent").text(TotalPercentage.toFixed(1).replace(".", ",") + "%");
            } else {
                console.warn("TotalPercentage is not a valid number:", json[0].AvgResult);
            }
        }
    } catch (error) {
        console.log("Error:", error.responseText);
    }
}

// Detail Service Per Agent
async function valueDetailServicePerAgent() {
    try {
        let response = await $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/BRA_Dash_Performance",
            data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Action: "TotalSPADaily" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        let json = JSON.parse(response.d);
        console.log("Response Data:", json); // Debugging

        if (json.length > 0) {
            let data = json[0];

            // Update nilai dari API
            $("#valueServicePerDay").text(data.DataDikerjakan || 0);
            $("#valueTargetPerDay").text(data.TargetNya || 0);

            let callPercentage = parseFloat(data.CallPercentage);
            if (!isNaN(callPercentage)) {
                $("#valueServicePercentage").text(callPercentage.toFixed(2).replace(".", ",") + "%");
            }

            // Simulasi perubahan target per hari (bisa diganti dengan data dari API jika tersedia)
            let targetAchievement = ((data.DataDikerjakan / data.TargetNya) * 100).toFixed(1);
            $("#valueTargetAchievement").html(targetAchievement + "% <i class='mdi mdi-arrow-up'></i>");
        }
    } catch (error) {
        console.log("Error:", error.responseText);
    }
}

// Total Agent Service Level
async function valueAgentServiceLevel() {
    try {
        let response = await $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/BRA_Dash_Performance",
            data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Action: "TotalSL" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        let json = await JSON.parse(response.d);
        console.log("Response Data:", json); // Debugging

        if (json.length > 0 && json[0].ASL) {
            let ASL = parseFloat(json[0].ASL);
            if (!isNaN(ASL)) {
                $("#valueAgentServiceLevel").text(ASL.toFixed(1).replace(".", ",") + "%");
            } else {
                console.warn("ASL is not a valid number:", json[0].AvgResult);
            }
        }
    } catch (error) {
        console.log("Error:", error.responseText);
    }
}

// Detail Service Level
async function valueDetailServiceLevel() {
    try {
        let response = await $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/BRA_Dash_Performance",
            data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Action: "TotalSLDaily" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        let json = JSON.parse(response.d);
        console.log("Response Data:", json); 

        if (json.length > 0) {
            let data = json[0];

            // Tampilkan "-" jika 0 atau tidak ada data
            $("#valueServiceInSL").text(parseInt(data.WithinSL) === 0 ? "-" : data.WithinSL);
            $("#valueAnsweredService").text(parseInt(data.TotalIncoming) === 0 ? "-" : data.TotalIncoming);

            let ASL = parseFloat(data.ASL);
            let displayASL = (!data.ASL || isNaN(ASL) || ASL === 0)
                ? "-"
                : ASL.toFixed(2).replace(".", ",") + "%";
            $("#valueAgentServiceLevel").text(displayASL);

            // Simulasi perubahan rate sebelumnya
            let previousRate = (Math.random() * 10).toFixed(1);
            $("#valuePreviousServiceLevel").html(previousRate + "% <i class='mdi mdi-arrow-up'></i>");
        }
    } catch (error) {
        console.log("Error:", error.responseText);
    }
}

