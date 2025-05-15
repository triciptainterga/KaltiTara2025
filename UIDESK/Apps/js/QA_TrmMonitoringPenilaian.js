$(document).ready(function () {
    $('#monitoringTable').hide();
    $('#applyFilterBtn').click(function () {
        $('#filterModal').modal('hide');
        DataPenilaianQM();
    });
});

function DataPenilaianQM() {
    const bulan = $('#bulan').val();
    const tahun = $('#tahun').val();

    if (!bulan || !tahun) {
        alert("Please select both month and year.");
        return;
    }

    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmMonitoringPenilaian.asmx/QM_TrmMonitoringPenilaian",
        data: JSON.stringify({ tahun: tahun, bulan: bulan, username: $("#hd_sessionLogin").val() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log("Response Data:", response.d);

            const data = JSON.parse(response.d || "[]");

            const tableBody = $("#monitoringTable tbody");
            tableBody.empty();

            if ($.fn.DataTable.isDataTable('#monitoringTable')) {
                $('#monitoringTable').DataTable().clear().destroy();
            }

            if (data.length > 0) {
                $("#indikatorWarnaSection").show();
            } else {
                $("#indikatorWarnaSection").hide();
            }            

            data.forEach((item, index) => {
                let groupName = "Unknown";
                switch (item.agent_group) {
                    case "1":
                        groupName = "Pusat";
                        break;
                    case "2":
                        groupName = "Pasar Baru";
                        break;
                    case "3":
                        groupName = "Tanjung Priok";
                        break;
                    case "4":
                        groupName = "Soekarno Hatta";
                        break;
                }

                let scheduleStateColorCall;
                if (item.Call == 0) {
                    scheduleStateColorCall = "background-color: gray;";
                } else if (item.Call > 0 && item.Call_TotalPenilaian == 0) {
                    scheduleStateColorCall = "background-color: red;";
                } else if (item.Call_TotalPenilaian >= item.SamplingCall) {
                    scheduleStateColorCall = "background-color: green;";
                } else if (item.Call_TotalPenilaian <= item.SamplingCall) {
                    scheduleStateColorCall = "background-color: yellow;";
                }
                let scheduleStateColorEmail;
                if (item.Email == 0) {
                    scheduleStateColorEmail = "background-color: gray;";
                } else if (item.Email > 0 && item.Email_TotalPenilaian == 0) {
                    scheduleStateColorEmail = "background-color: red;";
                } else if (item.Email_TotalPenilaian >= item.SamplingEmail) {
                    scheduleStateColorEmail = "background-color: green;";
                } else if (item.Email_TotalPenilaian <= item.SamplingEmail) {
                    scheduleStateColorEmail = "background-color: yellow;";
                }
                let scheduleStateColorOutbound;
                if (item.Outbound == 0) {
                    scheduleStateColorOutbound = "background-color: gray;";
                } else if (item.Outbound > 0 && item.Outbound_TotalPenilaian == 0) {
                    scheduleStateColorOutbound = "background-color: red;";
                } else if (item.Outbound_TotalPenilaian >= item.SamplingOutbound) {
                    scheduleStateColorOutbound = "background-color: green;";
                } else if (item.Outbound_TotalPenilaian <= item.SamplingOutbound) {
                    scheduleStateColorOutbound = "background-color: yellow;";
                }
                let scheduleStateColorWebSocketChat; // Deklarasikan variabel di luar blok if-else
                if (item.WebSocketChat == 0) {
                    scheduleStateColorWebSocketChat = "background-color: gray;";
                } else if (item.WebSocketChat > 0 && item.WebSocketChat_TotalPenilaian == 0) {
                    scheduleStateColorWebSocketChat = "background-color: red;";
                } else if (item.WebSocketChat_TotalPenilaian >= item.SamplingOmnichat) {
                    scheduleStateColorWebSocketChat = "background-color: green;";
                } else if (item.WebSocketChat_TotalPenilaian <= item.SamplingOmnichat) {
                    scheduleStateColorWebSocketChat = "background-color: yellow;";
                }
                let scheduleStateColorSosialMedia; // Deklarasikan variabel di luar blok if-else
                if (item.SosialMedia == 0) {
                    scheduleStateColorSosialMedia = "background-color: gray;";
                } else if (item.SamplingSosmed > 0 && item.SosialMedia_TotalPenilaian == 0) {
                    scheduleStateColorSosialMedia = "background-color: red;";
                } else if (item.SosialMedia_TotalPenilaian >= item.SamplingSosmed) {
                    scheduleStateColorSosialMedia = "background-color: green;";
                } else if (item.SosialMedia_TotalPenilaian <= item.SamplingSosmed) {
                    scheduleStateColorSosialMedia = "background-color: yellow;";
                }
                ////let channelEmail = item.Email + " | " + item.Email_TotalPenilaian + " | " + scheduleStateColorEmail
                ////let channelOutbound = item.Outbound + " | " + item.Outbound_TotalPenilaian + " | " + scheduleStateColorOutbound
                ////let channelWebSocketChat = item.WebSocketChat + " | " + item.WebSocketChat_TotalPenilaian + " | " + scheduleStateColorWebSocketChat
                const rowHtml = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.agent_name || "Unknown"}</td>
                        <td>${groupName}</td>
                        <td><a href="QA_HistoryDetailPenilaian.aspx?user=${item.USERNAME}&channel=call&tahun=${tahun}&bulan=${bulan}" target="_blank">${item.Call_TotalPenilaian || 0}</a></td>
                        <td>${item.Call || 0}</td>
                        <td>${item.SamplingCall || 0}</td>
                        <td style="${scheduleStateColorCall}"></td>
                        <td><a href="QA_HistoryDetailPenilaian.aspx?user=${item.USERNAME}&channel=email&tahun=${tahun}&bulan=${bulan}" target="_blank">${item.Email_TotalPenilaian || 0}</a></td>
                        <td>${item.Email || 0}</td>
                        <td>${item.SamplingEmail || 0}</td>
                        <td style="${scheduleStateColorEmail}"></td>
                        <td><a href="QA_HistoryDetailPenilaian.aspx?user=${item.USERNAME}&channel=multichat&tahun=${tahun}&bulan=${bulan}" target="_blank">${item.WebSocketChat_TotalPenilaian || 0}</a></td>
                        <td>${item.WebSocketChat || 0}</td>
                        <td>${item.SamplingOmnichat || 0}</td>
                        <td style="${scheduleStateColorWebSocketChat}"></td>
                        <td><a href="QA_HistoryDetailPenilaian.aspx?user=${item.USERNAME}&channel=sosmed&tahun=${tahun}&bulan=${bulan}" target="_blank">${item.SosialMedia_TotalPenilaian || 0}</a></td>
                        <td>${item.SosialMedia || 0}</td>
                        <td>${item.SamplingSosmed || 0}</td>
                        <td style="${scheduleStateColorSosialMedia}"></td>
                        <td><a href="QA_HistoryDetailPenilaian.aspx?user=${item.USERNAME}&channel=outbound&tahun=${tahun}&bulan=${bulan}" target="_blank">${item.Outbound_TotalPenilaian || 0}</a></td>
                        <td>${item.Outbound || 0}</td>
                        <td>${item.SamplingOutbound || 0}</td>
                        <td style="${scheduleStateColorOutbound}"></td>
                    </tr>
                `;
                tableBody.append(rowHtml);
            });

            $('#monitoringTable').show();

            if ($.fn.dataTable.isDataTable('#monitoringTable')) {
                $('#monitoringTable').DataTable().clear().destroy();
            }

            $('#monitoringTable').DataTable({
                "paging": true,
                "searching": true,
                "lengthChange": true,
                "pageLength": 10,
                "ordering": true,
                "info": true,
                "autoWidth": false,
                "responsive": true
            });
        },
        error: function (xhr) {
            console.error("Error loading monitoring data:", xhr.responseText);
        }
    });
}
