$(document).ready(function () {
    $('"#start-date-input').datepicker({
        format: 'yyyy-mm-dd', // Format tanggal
        autoclose: true,      // Menutup datepicker setelah tanggal dipilih
        todayHighlight: true  // Menyoroti tanggal hari ini
    });
});


function GenerateData() {

    var value = $('#valueData').val();
    if (value == '') {
        swal("Data is empty")
        return false;
    } else {


        var row = $("#tables-container tbody tr").eq(2);

        $("#tables-container tbody tr").each(function (index) {

            //==call==
            var inputValue = parseFloat(value) / 100; 
            console.log(inputValue);         
            var currentValue = parseFloat($(this).find("td").eq(2).text()) || 0;
            var newValue = currentValue + (currentValue * inputValue); 
            $(this).find("td").eq(3).html("<strong>" + Math.round(newValue) + "</strong>");

            //omnichat
            var currentValue2 = parseFloat($(this).find("td").eq(5).text()) || 0;
            var newValue2 = currentValue2 + (currentValue2 * inputValue);
            $(this).find("td").eq(6).html("<strong>" + Math.round(newValue2) + "</strong>");

            //email
            var currentValue3 = parseFloat($(this).find("td").eq(8).text()) || 0;
            var newValue3 = currentValue3 + (currentValue3 * inputValue);
            $(this).find("td").eq(9).html("<strong>" + Math.round(newValue3) + "</strong>");


        });

        //var endTimeValue = $('#end-time-input').val();
        //console.log(endTimeValue);  // This will output the selected time, e.g., "14:30"
        //console.log("{StartDateNya:'" + $("#start-date-input").val() + "', EndDateNya: '" + $("#end-date-input").val() + "', StartTimeNya: '" + $("#start-time-input").val() + "', EndTimeNya: '" + $("#end-time-input").val() + "', IntervalNya: '" + $("#IntervalTime").val() + "', TrxAction: 'LIST', TrxActionType: 'Forecast_ViewDays'}");
        //// Show loader before AJAX request
        //$('#loader').show();

        //$.ajax({
        //    type: "POST",
        //    url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_ForecastData",
        //    data: "{StartDateNya:'" + $("#start-date-input").val() + "', EndDateNya: '" + $("#end-date-input").val() + "', StartTimeNya: '" + $("#start-time-input").val() + "', EndTimeNya: '" + $("#end-time-input").val() + "', IntervalNya: '" + $("#IntervalTime").val() + "', TrxAction: 'LIST', TrxActionType: 'Forecast_ViewDays'}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (data) {
        //        $('#loader').hide();

        //        var json = JSON.parse(data.d);
        //        var i, x, result = "";
        //        console.log(data.d);
        //        const dataNya = json;
        //        // Load tables
        //        loadTables(dataNya, $("#start-time-input").val(), $("#end-time-input").val(), $("#IntervalTime").val());
        //    },
        //    error: function (xmlHttpRequest, textStatus, errorThrown) {
        //        $('#loader').hide();
        //        console.log(xmlHttpRequest.responseText);
        //        console.log(textStatus);
        //        console.log(errorThrown);
        //    }
        //})
    }


}

function SubmitDataNya() {
    var endTimeValue = $('#end-time-input').val();
    console.log(endTimeValue);  // This will output the selected time, e.g., "14:30"
    console.log("{StartDateNya:'" + $("#start-date-input").val() + "', EndDateNya: '" + $("#end-date-input").val() + "', StartTimeNya: '" + $("#start-time-input").val() + "', EndTimeNya: '" + $("#end-time-input").val() + "', IntervalNya: '" + $("#IntervalTime").val() + "', TrxAction: 'LIST', TrxActionType: 'Forecast_ViewDays'}");
    // Show loader before AJAX request
    $('#loader').show();

    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_ForecastData",
        data: "{StartDateNya:'" + $("#start-date-input").val() + "', EndDateNya: '" + $("#end-date-input").val() + "', StartTimeNya: '" + $("#start-time-input").val() + "', EndTimeNya: '" + $("#end-time-input").val() + "', IntervalNya: '" + $("#IntervalTime").val() + "', TrxAction: 'LIST', TrxActionType: 'Forecast_ViewDays'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#loader').hide();

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);
            const dataNya = json;
            // Load tables
            loadTables(dataNya, $("#start-time-input").val(), $("#end-time-input").val(), $("#IntervalTime").val());
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            $('#loader').hide();
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function createTable(dayName, data, startTime, endTime, interval) {
    let table = document.createElement('table');
    table.className = 'table';
    let thead = document.createElement('thead');
    thead.className = 'table-light';
    let tbody = document.createElement('tbody');

    // Example value from the input
    var timeValue = startTime;  // Time in HH:MM format

    // Split the time into hours and minutes
    var [hours, minutes] = timeValue.split(':');

    // Convert to single digits (remove leading zeros)
    hours = parseInt(hours, 10);   // "09" becomes 9

    // Example value from the input
    var timeValueEnd = endTime;  // Time in HH:MM format

    // Split the time into hours and minutes
    var [hoursEnd, minutesEnd] = timeValueEnd.split(':');

    // Convert to single digits (remove leading zeros)
    hoursEnd = parseInt(hoursEnd, 10);   // "09" becomes 9

    // Define time intervals from 08:00 to 17:00 in 30-minute increments
    let timeIntervals = [];
    for (let hour = hours; hour <= hoursEnd - 1; hour++) {
        timeIntervals.push(`${String(hour).padStart(2, '0')}:00-${String(hour).padStart(2, '0')}:30`);
        timeIntervals.push(`${String(hour).padStart(2, '0')}:30-${String(hour + 1).padStart(2, '0')}:00`);
    }

    // Create table header with AgentIDs and "Jumlah" column
    let agentIDs = [...new Set(data.map(row => row.AgentID))];

    // Create the first row with time intervals and colspan for each AgentID
    let headerRow = `<tr><th width="100">Time</th>`;
   /* let headerjumlah = `<tr><th width="100">Total Agent</th>`;*/
    agentIDs.forEach(agentId => {
        headerRow += `<th colspan="3" width="300">${agentId}</th>`;  // Add colspan of 3 for each AgentID
    });
   // headerRow += `<th width="100">Needs</th><th width="100">Sum</th><th width="100">Selisih</th></tr>`;
    thead.innerHTML = headerRow;

    // Create a second header row to specify the columns for each AgentID
    let subHeaderRow = '<tr><th></th>';
    agentIDs.forEach(() => {
        //subHeaderRow += '<th>Call</th><th>Social Media</th><th>Ticketing</th><th>Current</th><th>Forecast</th>';  // Define the 3 columns for each AgentID
        subHeaderRow += '<th>%SLA</th><th>Current</th><th>Agent</th>';  // Define the 3 columns for each AgentID
    });
    //subHeaderRow += '<th></th><th></th><th></th></tr>';
    thead.innerHTML += subHeaderRow;

    let totalcallTotal = 0; // Deklarasi variabel untuk total omniTotal
    // Create table body with time intervals and status
    timeIntervals.forEach(interval => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${interval}</td>`;
        let rowTotal = 0;
        agentIDs.forEach(agentId => {
         
            
            //let startTime = cellData ? cellData.startTime : '';
            //let endTime = cellData ? cellData.endTime : '';
            //let channelNya = cellData ? cellData.AgentID : '';
            //let callTotal = cellData ? cellData.TotalTicket : '';
            //let agentTotal = cellData ? cellData.TotalAgent : '';
            //let ticketTotal = cellData ? cellData.TotalTicket : '';
            //let omniTotal = cellData ? cellData.TotalOmni : '';
            let cellData = data.find(row => row.AgentID === agentId && `${row.startTime}-${row.endTime}` === interval);
            let className = cellData ? cellData.className : '';

            let startTime = cellData ? cellData.startTime : '';
            let endTime = cellData ? cellData.endTime : '';
            let channelNya = cellData ? cellData.AgentID : '';
            let slacrm = cellData ? cellData.TotalTicket : '';
            let omniTotal = cellData ? cellData.TotalOmni : '';
             let agentTotal = cellData ? cellData.TotalAgent : '';

            //getValueSlaDanDetail($("#start-date-input").val(), $("#end-date-input").val(), channelNya, startTime, endTime, function (totalData) {
            //    //console.log("Total Data: " + totalData);
            //     slacrm = totalData;
            //});
            // getValueSlaDanDetail($("#start-date-input").val(), $("#end-date-input").val(), channelNya, startTime, endTime);
            // Add 3 columns for each AgentID, fill with dynamic data
            //<td class="${className}">${className === 'bg-primary' ? 'ON' : 'OFF'}</td>
            //getValueSlaDanDetail(channelNya, startTime, endTime)
            //tr.innerHTML += `
            //<td>${slacrm}</td>
            //<td>${omniTotal}</td>
            //<td>${endTime}</td>
            //<td>${endTime}</td>
            //<td>${channelNya}</td>





            tr.innerHTML += `
            <td>${slacrm}</td>
            <td>${agentTotal}</td>
         
            <td>${agentTotal}</td>
          
            
            `;
            if (className === 'bg-primary') {
                rowTotal++;
            }
        });
        const needsValue = parseInt(4 - rowTotal);
       // tr.innerHTML += `<td>4</td><td>${rowTotal}</td><td>${needsValue}</td>`;
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    // Append table to the container
    let container = document.getElementById('tables-container');
    let dayTitle = document.createElement('h4');
    dayTitle.textContent = `Periode Forecast : ${dayName}`;
    container.appendChild(dayTitle);
    container.appendChild(table);

}

function getValueSlaDanDetail(tanggalStart, tanggalEnd, channel, waktuMulai, waktuEnd) {
   // return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_ForecastData",
            data: "{StartDateNya:'" + $("#start-date-input").val() + "', EndDateNya: '" + $("#end-date-input").val() + "', StartTimeNya: '" + $("#start-time-input").val() + "', EndTimeNya: '" + $("#end-time-input").val() + "', IntervalNya: '" + $("#IntervalTime").val() + "', TrxAction: '" + channel + "', TrxActionType: 'Forecast_CountData'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var json = JSON.parse(data.d);
                var totalDataNya = json[0].TotalData;
                console.log("Get Value " + tanggalStart + "-" + tanggalEnd + "-" + channel + "-" + waktuMulai + "-" + waktuEnd + "-" + totalDataNya );
                //resolve(totalDataNya); // Mengembalikan hasil dari Promise
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
                reject(errorThrown); // Kembalikan error jika terjadi masalah
            }
        });

   // return "Get Value " + tanggalStart + "-" + tanggalEnd + "-" + channel + "-" + waktuMulai + "-" + waktuEnd;
   // });
}

//function getValueSlaDanDetail(tanggalStart, tanggalEnd, channel, waktuMulai, waktuEnd, callback) {
//    $.ajax({
//        type: "POST",
//        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_ForecastData",
//        data: "{StartDateNya:'" + $("#start-date-input").val() + "', EndDateNya: '" + $("#end-date-input").val() + "', StartTimeNya: '" + $("#start-time-input").val() + "', EndTimeNya: '" + $("#end-time-input").val() + "', IntervalNya: '" + $("#IntervalTime").val() + "', TrxAction: '" + channel + "', TrxActionType: 'Forecast_CountData'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            var json = JSON.parse(data.d);
//            var totalDataNya = json[0].TotalData;
//            console.log("Get Value " + totalDataNya);
//            callback(totalDataNya); // Panggil callback dengan nilai totalDataNya
//        },
//        error: function (xmlHttpRequest, textStatus, errorThrown) {
//            console.log(xmlHttpRequest.responseText);
//            console.log(textStatus);
//            console.log(errorThrown);
//        }
//    });
//}

//function getValueSlaDanDetail(tanggalStart, tanggalEnd, channel, waktuMulai, waktuEnd) {
//    var totalDataNya = 0;
//    console.log("{StartDateNya:'" + $("#start-date-input").val() + "', EndDateNya: '" + $("#end-date-input").val() + "', StartTimeNya: '" + $("#start-time-input").val() + "', EndTimeNya: '" + $("#end-time-input").val() + "', IntervalNya: '" + $("#IntervalTime").val() + "', TrxAction: 'LIST', TrxActionType: 'Forecast_ViewDays'}");
//    $.ajax({
//        type: "POST",
//        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_ForecastData",
//        data: "{StartDateNya:'" + $("#start-date-input").val() + "', EndDateNya: '" + $("#end-date-input").val() + "', StartTimeNya: '" + $("#start-time-input").val() + "', EndTimeNya: '" + $("#end-time-input").val() + "', IntervalNya: '" + $("#IntervalTime").val() + "', TrxAction: '" + channel +"', TrxActionType: 'Forecast_CountData'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {

//            var json = JSON.parse(data.d);
//            var i, x, result = "";
//            console.log(data.d);
//            totalDataNya = json[0].TotalData;
//            //console.log(totalDataNya);
//            return "Get Value " + totalDataNya;
//        },
//        error: function (xmlHttpRequest, textStatus, errorThrown) {
//            console.log(xmlHttpRequest.responseText);
//            console.log(textStatus);
//            console.log(errorThrown);
//        }
//    })
   
//}

//old
/*
function createTable(dayName, data, startTime, endTime, interval) {
    let table = document.createElement('table');
    table.className = 'table';
    let thead = document.createElement('thead');
    thead.className = 'table-light';
    let tbody = document.createElement('tbody');

    // Example value from the input
    var timeValue = startTime;  // Time in HH:MM format

    // Split the time into hours and minutes
    var [hours, minutes] = timeValue.split(':');

    // Convert to single digits (remove leading zeros)
    hours = parseInt(hours, 10);   // "09" becomes 9

    // Example value from the input
    var timeValueEnd = endTime;  // Time in HH:MM format

    // Split the time into hours and minutes
    var [hoursEnd, minutesEnd] = timeValueEnd.split(':');

    // Convert to single digits (remove leading zeros)
    hoursEnd = parseInt(hoursEnd, 10);   // "09" becomes 9



    console.log("Single digit hours:", hours);   // Output: 9
    console.log("Single digit minutes:", hoursEnd); // Output: 5
    // Define time intervals from 08:00 to 17:00 in 30-minute increments
    let timeIntervals = [];
    for (let hour = hours; hour <= hoursEnd-1; hour++) {
        timeIntervals.push(`${String(hour).padStart(2, '0')}:00-${String(hour).padStart(2, '0')}:30`);
        timeIntervals.push(`${String(hour).padStart(2, '0')}:30-${String(hour + 1).padStart(2, '0')}:00`);
    }
   

    // Create table header with AgentIDs and "Jumlah" column
    let agentIDs = [...new Set(data.map(row => row.AgentID))];
    let headerRow = `<tr><th width="100">Time</th>`;
    agentIDs.forEach(agentId => {
        headerRow += `<th width="100">${agentId}</th>`;
    });
    headerRow += `<th width="100">Needs</th><th width="100">Sum</th><th width="100">Selisih</th></tr>`;
    thead.innerHTML = headerRow;

    // Create table body with time intervals and status
    timeIntervals.forEach(interval => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${interval}</td>`;
        let rowTotal = 0;
        agentIDs.forEach(agentId => {
            let cellData = data.find(row => row.AgentID === agentId && `${row.startTime}-${row.endTime}` === interval);
            let className = cellData ? cellData.className : '';
            tr.innerHTML += `<td class="${className}"></td>`;
            if (className === 'bg-primary') {
                rowTotal++;
            }
        });
        const needsValue = parseInt(4 - rowTotal);
        tr.innerHTML += `<td>4</td><td>${rowTotal}</td><td>${needsValue}</td>`;
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    // Append table to the container
    let container = document.getElementById('tables-container');
    let dayTitle = document.createElement('h4');
    dayTitle.textContent = `Periode Forecast : ${dayName}`;
    container.appendChild(dayTitle);
    container.appendChild(table);
}
*/
async function loadTables(data, startTime, endTime, interval) {
    // Group data by dayName
    $("#tables-container").empty();
    let groupedData = data.reduce((acc, current) => {
        if (!acc[current.dayName]) {
            acc[current.dayName] = [];
        }
        acc[current.dayName].push(current);
        return acc;
    }, {});

    // Define order of days
    let daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Sort keys by the defined order
    let sortedDays = Object.keys(groupedData).sort((a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b));

    // Create table for each dayName in the sorted order
    sortedDays.forEach(dayName => {
        createTable(dayName, groupedData[dayName], startTime, endTime, interval);
    });
}

