$(document).ready(function () {
    $('#monthly').hide();
    $('#mySelect').change(function () {
      
        var selectedValue = $(this).val();

        if (selectedValue == "1") {
            $('#days').show();
            $('#monthly').hide();
        } else {
            $('#monthly').show();
          //  $('#days').hide();
        }
    });

    $('"#example-date-input').datepicker({
        format: 'yyyy-mm-dd', // Format tanggal
        autoclose: true,      // Menutup datepicker setelah tanggal dipilih
        todayHighlight: true  // Menyoroti tanggal hari ini
    });

   
});


function SubmitDataNya() {

    if ($('#mySelect').val() == "2") {
        var x = [];
        var y = [];
        var Limit = [];

        console.log("{TrxID:'" + $("#example-date-input").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'ViewDays'}");
        $.ajax({
            type: "POST",
            url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
            data: "{TrxID:'" + $("#example-date-input").val() + "-" + $("#Endinput").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'ViewMonth'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, result = "";
                console.log(data.d);
                const dataNya = json;
                const uniqueNames = [...new Set(dataNya.map(item => item.NAME))];
                const y = uniqueNames.join(',');

                const uniqueDays = [...new Set(dataNya.map(item => item.DayOfWeek.replace("NextWeek"," ")))];
                const x = uniqueDays.join(',');
                //var x = 'DZA,FER,FID,GLO,BEN,REY,HIL,ARD,DAN,RIZ,ENG,DEL,KUS,LNG'; // Stations
               // var y = ''; // Times
                
                // Load tables
                const countDaysPerName = (data) => {
                    const nameCounts = {};

                    dataNya.forEach(entry => {
                        const { NAME, DateFull } = entry;

                        // Jika nama belum ada dalam objek, inisialisasi dengan Set untuk menyimpan tanggal unik
                        if (!nameCounts[NAME]) {
                            nameCounts[NAME] = new Set();
                        }

                        // Tambahkan tanggal ke Set
                        nameCounts[NAME].add(DateFull);
                    });

                    // Ubah Set menjadi jumlah hari dan format output
                    const result = Object.values(nameCounts).map(set => set.size).join(',');

                    return result;
                };

                const totalDaysPerName = countDaysPerName(data);
                var limit ='1,1,0,1,0,1,1,1,0,0'; // Limits

                console.log(totalDaysPerName);


                loadTablesMonthy(x,y,limit);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })

    } else {
        console.log("{TrxID:'" + $("#example-date-input").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'ViewDays'}");
        $.ajax({
            type: "POST",
            url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
            data: "{TrxID:'" + $("#example-date-input").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'ViewDays'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                console.log(data.d);
                const dataNya = json;
                // Load tables
                loadTables(dataNya);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
}
function createTable(dayName, data) {
    let table = document.createElement('table');
    table.className = 'table';
    let thead = document.createElement('thead');
    thead.className = 'table-light';
    let tbody = document.createElement('tbody');

    // Define time intervals from 08:00 to 17:00 in 30-minute increments
    let timeIntervals = [];
    for (let hour = 8; hour <= 16; hour++) {
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
    dayTitle.textContent = `Channel : ${dayName}`;
    container.appendChild(dayTitle);
    container.appendChild(table);
}

function loadTablesMonthy(x,y,Limit) {

    //var x = 'DZA,FER,FID,GLO,BEN,REY,HIL,ARD,DAN,RIZ,ENG,DEL,KUS,LNG'; // Stations
    //var y = '08:00,08:30,09:00,09:30,10:00,10:30,11:00,11:30,12:00,12:30,13:00,13:30,14:00,14:30,15:00,15:30,16:00,16:30'; // Times
    //var Limit = '4,7,9,8,8,9,9,6,4,5,7,9,8,8,6,8,6,5'; // Limits

    var stations = x.split(',');
    var times = y.split(',');
    var limits = Limit.split(',').map(Number);
    var rowCount = Math.min(times.length, limits.length);

    // Create and set up the table in the specified container
    var tablesContainer = document.getElementById('tables-container');
    var table = document.createElement('table');
    tablesContainer.appendChild(table);

    // Create thead and tbody elements
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    tbody.id = 'table-body'; // Ensure tbody has the correct ID
    table.appendChild(thead);
    table.appendChild(tbody);

    // Create the header row
    var headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')).textContent = 'Name'; // Time Header

    // Add station headers
    stations.forEach(function (station) {
        var th = document.createElement('th');
        th.textContent = station;
        headerRow.appendChild(th);
    });

    // Add Limit header
    var limitHeader = document.createElement('th');
    limitHeader.textContent = 'Limit';
    headerRow.appendChild(limitHeader);

    // Append header row to thead
    thead.appendChild(headerRow);

    // Initialize counters for total ON for each station
    var totalOnPerStation = Array(stations.length).fill(0);
    var maxOnPerStation = 9;  // Maximum allowed ON count per station

    // Function to add rows to the table with a delay
    function addRow(i) {
        if (i >= rowCount) {
           // addTotalRow();
            return;
        }

        var row = document.createElement('tr');
        var timeCell = document.createElement('td');
        timeCell.textContent = times[i];
        row.appendChild(timeCell);

        var limitForCurrentRow = limits[i];
        var selectedIndices = [];
        totalOnPerStation.fill(0); // Reset ON counts for this row

        //while (selectedIndices.length < limitForCurrentRow) {
        //    var randomIndex = Math.floor(Math.random() * stations.length);
        //    if (!selectedIndices.includes(randomIndex) && totalOnPerStation[randomIndex] < maxOnPerStation) {
        //        selectedIndices.push(randomIndex);
        //        totalOnPerStation[randomIndex]++;
        //    }
        //    if (selectedIndices.length >= limitForCurrentRow || selectedIndices.length >= stations.length) break;
        //}




        stations.forEach(function (_, j) {
            var stationCell = document.createElement('td');
            alert(stationCell.textContent);
            //stationCell.textContent = selectedIndices.includes(j) ? "ON" : "OFF";
            //stationCell.classList.add(selectedIndices.includes(j) ? "on-cell" : "off-cell");
            row.appendChild(stationCell);
        });

        var limitCell = document.createElement('td');
        limitCell.textContent = limitForCurrentRow;
        row.appendChild(limitCell);
        tbody.appendChild(row);

        setTimeout(function () {
            addRow(i + 1);
        }, 50);
    }

    // Start adding rows gradually
    addRow(0);

    // Function to add total row for each station
    function addTotalRow() {
        var totalRow = document.createElement('tr');
        totalRow.classList.add('total-row');
        var totalTimeCell = document.createElement('td');
        totalTimeCell.textContent = 'Total';
        totalRow.appendChild(totalTimeCell);

        stations.forEach(function (_, j) {
            var stationTotalCell = document.createElement('td');
            stationTotalCell.textContent = `ON: ${totalOnPerStation[j]}`;
            totalRow.appendChild(stationTotalCell);
        });

        totalRow.appendChild(document.createElement('td')); // Empty cell for Limit
        tbody.appendChild(totalRow);
    }
}

function loadTables(data) {
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
        createTable(dayName, groupedData[dayName]);
    });
}


