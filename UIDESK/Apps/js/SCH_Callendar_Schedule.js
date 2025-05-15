// Fungsi untuk mengambil semua checkbox yang dicentang

$(document).ready(function () {

    //alert("ini error")
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/GetDataHistory",
        data: "{TrxID:'" + $("#hd_AgentScheduleID").val() + "',Status:'',TrxAction:'STATUS',AgentId:''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            json = JSON.parse(data.d);
            console.log(json);
            var chatList = $("#chat-list");
            json.forEach(function (item) {
                var listItem = `
               <li class="active">
                    <a href="#" class="mt-0" onclick="DirectHistory(${item.ScheduleID})">
                      
                            
                    <div class="avatar-sm align-self-center
                        ${item.StatusRequest === 'APPROVED' ? 'bg-success' : item.StatusRequest === 'OPEN' ? 'bg-info' : item.StatusRequest === 'Rejected' ? 'bg-danger' : 'bg-secondary'} text-danger rounded-circle font-size-22 text-center">

                            <i class="${item.StatusRequest === 'APPROVED' ? 'bx bx-check' : item.StatusRequest === 'OPEN' ? 'bx bx-folder-open' : item.StatusRequest === 'Rejected' ? 'bx bx-x' : 'bx bx-question-mark'} text-light"></i>
                                
                                <span class="ml-3 text-dark" style="margin-left: 50px;font-size:12px">Agent Name : ${item.AgentName}</span>
                                <br>
                                <span class="ml-3 text-red" style="margin-left: 80px;font-size:12px">Agent Target : ${item.agenttarget}</span>

                            </div>
                            <div class="flex-grow-1 overflow-hidden">
                                <h5 class="text-truncate font-size-14 mb-1">${item.StatusRequest}</h5>
                               
                            </div>
                           
                        
                    </a>
                </li>
            `;
                chatList.append(listItem);
            });
        }
    });

});
function DirectHistory(scheduleId) {
    $("#list-training").modal('show');

    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
        data: "{TrxID:'" + scheduleId + "', TrxUserName: '', TrxAction: '', TrxActionType: 'SELECT_DATACHANGESCHEDULE', Param1: '', Param2: '', Param3: '', Param4: ''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            json = JSON.parse(data.d);
            console.log(json);




            const dataNya = json;
            function parseDate(jsonDate) {
                const timestamp = parseInt(jsonDate.replace(/\/Date\((\d+)\)\//, "$1"));
                return new Date(timestamp).toLocaleDateString();
            }

            function populateTable(tableId, filter) {
                const tableBody = document.getElementById(tableId).querySelector("tbody");
                tableBody.innerHTML = ""; // Kosongkan table sebelum mengisi

                dataNya.filter(item => item.Keterangan === filter).forEach(item => {
                    const row = document.createElement("tr");
                    row.innerHTML = `

                        <td class="hide-column">${item.ID}</td>
                        <td class="hide-column">${item.AgentID}</td>
                        <td>${item.AgentName}</td>
                        <td>${item.daysName}</td>
                        <td>${parseDate(item.DateScheduled)}</td>
                        <td>${item.startDate}</td>
                        <td>${item.endDate}</td>

                        <td>${item.statusTime}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }


            // Memuat data ke dalam masing-masing tabel
            populateTable("tableAgentRequest", "AgentRequest");
            populateTable("tableAgentTarget", "AgentTarget");
            populateTable("tableTargetChange", "TargetChange");
            populateTable("tableTargetRequest", "TargetRequest");
          

        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + " " + error);
            failureCallback(error);
        }
    });
    
    
}
function getCheckedCheckboxes() {
    var checkedValues = [];
    //var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked[id^="checkboxasal_"]');

    checkboxes.forEach(function (checkbox) {
        checkedValues.push(checkbox.value); // Atau ambil data lain sesuai kebutuhan
    });

    return checkedValues;
}

function getCheckedCheckboxesTarget() {
    var checkedValues = [];

    // Mengambil semua checkbox yang dicentang dengan ID yang dimulai dengan "checkbox_"
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked[id^="checkbox_"]');

    checkboxes.forEach(function (checkbox) {
        checkedValues.push(checkbox.value); // Atau ambil data lain sesuai kebutuhan
    });

    return checkedValues;
}
function findConsecutiveShifts(count, status, shifts) {
    // Filter data yang sesuai dengan `statusTime`
    //console.log("DataNya : " + shifts);
    const filteredShifts = shifts.filter(shift => shift.statusTime === status);

    // Sort berdasarkan startTime agar berurutan
    filteredShifts.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.startTime}:00`);
        const timeB = new Date(`1970-01-01T${b.startTime}:00`);
        return timeA - timeB;
    });

    const result = [];
    const usedStartTimes = new Set(); // Menyimpan startTime yang sudah digunakan

    // Loop untuk mencari shift berurutan
    for (let i = 0; i <= filteredShifts.length - count; i++) {
        let consecutive = true;
        const currentShifts = [];

        for (let j = 0; j < count; j++) {
            const currentShift = filteredShifts[i + j];

            // Cek apakah startTime sudah digunakan sebelumnya
            if (usedStartTimes.has(currentShift.startTime)) {
                consecutive = false;
                break;
            }

            if (j > 0) {
                const prevShift = new Date(`1970-01-01T${filteredShifts[i + j - 1].endTime}:00`);
                const currShift = new Date(`1970-01-01T${currentShift.startTime}:00`);

                // Cek apakah startTime dan endTime berurutan
                if (prevShift.getTime() !== currShift.getTime()) {
                    consecutive = false;
                    break;
                }
            }

            // Jika berurutan, tambahkan ke list sementara
            currentShifts.push(currentShift);
        }

        if (consecutive) {
            // Tambahkan shifts ke hasil jika berurutan
            result.push(currentShifts);

            // Tandai startTime yang sudah digunakan
            currentShifts.forEach(shift => usedStartTimes.add(shift.startTime));
        }
    }

    return result;
}
function logicSessionChangeSchedule(DateRequest, AgentTarget, AgentRequest, DayName, DateScheduled) {
    console.log(DateRequest);
    console.log(AgentTarget);
    console.log(AgentRequest);

    var parsedArray = JSON.parse(DateRequest);

    // Hitung jumlah elemen dalam array
    var countDataGet = parsedArray.length;
    console.log("data count : " + countDataGet);
    console.log("{TrxID:'" + DateRequest + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'CHANGESCHEDULE', TrxActionType: 'CHANGESCHEDULEVIEWDAYSDETAIL', Param1: '" + DateScheduled + "', Param2: '" + AgentRequest + "', Param3: '" + AgentTarget + "', Param4: '" + DayName + "'}");
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
        data: "{TrxID:'" + DateRequest + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'CHANGESCHEDULE', TrxActionType: 'CHANGESCHEDULEVIEWDAYSDETAIL', Param1: '" + DateScheduled + "', Param2: '" + AgentRequest + "', Param3: '" + AgentTarget + "', Param4: '" + DayName + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            json = JSON.parse(data.d);
            console.log(json);
            jsonData = JSON.parse(data.d);
            // console.log(data.d);
            const resultOff = findConsecutiveShifts(countDataGet, 'ON', jsonData);
            console.log(resultOff);
        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + " " + error);
            failureCallback(error);
        }
    });
}
function submitDays() {
    var DateRequest = $("#eventStart").val();
    var DateTarget = $("#eventStart").val();
    var AgentTarget = $("#hd_AgentTarget").val();
    var AgentRequest = $("#hd_AgentScheduleID").val();
    var JamRequest = $("#eventTitle").val();
    var JamTarget = $("#hd_JamTarget").val();
    var JenisRequest = $("#jenisCutiDays").val();
    var AlasanRequest = $("#alasanDays").val();
    var TargetChannel = $("#hd_ChannelTarget").val();

    console.log(DateRequest);
    console.log(DateTarget);
    console.log(AgentTarget);
    console.log(AgentRequest);
    console.log(JamRequest);
    console.log(JamTarget);
    console.log(JenisRequest);
    console.log(AlasanRequest);
    console.log(TargetChannel);
    console.log("{TrxID:'" + JenisRequest + ";" + AlasanRequest + "', TrxUserName: '" + JamRequest + "', TrxAction: '" + JamTarget + "', TrxActionType: 'INSERT_DATACHANGESCHEDULE_NONSESSION', Param1: '" + DateRequest + "', Param2: '" + DateTarget + "', Param3: '" + AgentRequest + "', Param4: '" + AgentTarget + "'}");
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule_NonSession",
        data: "{TrxID:'" + JenisRequest + ";" + AlasanRequest + "', TrxUserName: '" + JamRequest + "', TrxAction: '" + JamTarget + "', TrxActionType: 'INSERT_DATACHANGESCHEDULE_NONSESSION', Param1: '" + DateRequest + "', Param2: '" + DateTarget + "', Param3: '" + AgentRequest + "', Param4: '" + AgentTarget + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            json = JSON.parse(data.d);
            console.log(json);
            if (json[0].MessageNya == "Success") {
                swal(
                    '',
                    'Data berhasil di simpan!',
                    'success'
                ).then(function () {

                });

            } else {
                swal(
                    '',
                    'Mohon maaf data gagal di simpan!',
                    'error'
                ).then(function () {
                    return false;
                });
                return false;
            }
        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + " " + error);
            failureCallback(error);
        }
    });
}
function submitSession() {
    var DateRequest = $("#hd_DateRequest").val();
    var DateTarget = $("#hd_DateChangeTarget").val();
    var AgentTarget = $("#hd_AgentTarget").val();
    var AgentRequest = $("#hd_AgentScheduleID").val();
    var JamRequest = $("#hd_JamRequest").val();
    var JamTarget = $("#hd_JamTarget").val();
    var JenisRequest = $("#jenisCutiSession").val();
    var AlasanRequest = $("#alasanSession").val();

    console.log(DateRequest);
    console.log(DateTarget);
    console.log(AgentTarget);
    console.log(AgentRequest);
    console.log(JamRequest);
    console.log(JamTarget);
    console.log(JenisRequest);
    console.log(AlasanRequest);

    console.log("{TrxID:'" + JenisRequest + ";" + AlasanRequest + "', TrxUserName: '" + JamRequest + "', TrxAction: '" + JamTarget + "', TrxActionType: 'INSERT_DATACHANGESCHEDULE', Param1: '" + DateRequest + "', Param2: '" + DateTarget + "', Param3: '" + AgentRequest + "', Param4: '" + AgentTarget + "'}");
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
        data: "{TrxID:'" + JenisRequest + ";" + AlasanRequest + "', TrxUserName: '" + JamRequest + "', TrxAction: '" + JamTarget + "', TrxActionType: 'INSERT_DATACHANGESCHEDULE', Param1: '" + DateRequest + "', Param2: '" + DateTarget + "', Param3: '" + AgentRequest + "', Param4: '" + AgentTarget + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            json = JSON.parse(data.d);

            if (json[0].MessageNya == "Success") {
                location.reload();
            }
            console.log(json);
        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + " " + error);
            failureCallback(error);
        }
    });

}
function handleCheckboxChange(checkedCheckbox) {
    // Ambil nama grup dari checkbox yang sedang diproses
    const groupName = checkedCheckbox.name;
    //console.log("dada");
    // Ambil semua checkbox dengan nama grup yang sama
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);

    // Jika checkbox ini dicentang, uncheck semua checkbox lainnya dalam grup yang sama
    checkboxes.forEach(checkbox => {
        if (checkbox !== checkedCheckbox) {
            checkbox.checked = false;
        }
    });
    const checkedValue = checkedCheckbox.checked ? checkedCheckbox.value : null;

    //showScheduleFriend

    var jsonData = "";
    var AgentID = checkedValue;

    var eventDate = new Date($("#eventStart").val());
    var dayName = eventDate.toLocaleDateString('en-US', { weekday: 'long' });
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
        data: "{TrxID:'" + AgentID + "', TrxUserName: '" + dayName + "', TrxAction: 'LIST', TrxActionType: 'VIEWDAYSDETAILFRIEND', Param1: '" + $("#eventStart").val() + "', Param2: 'LIST', Param3: 'LIST', Param4: 'LIST'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            json = JSON.parse(data.d);
            console.log(json);

            if (Object.keys(json).length === 0) {
                console.log("JSON object is empty");
                $("#formCutiCDSC").hide();
            } else {
                console.log("JSON object is not empty");
                $("#formCutiCDSC").show();
            }
            jsonData = JSON.parse(data.d);

            // Fungsi untuk memuat data JSON ke dalam tabel

            var tableBody = document.getElementById('shiftTableFriendBody');
            var tableBodyClean = $('#shiftTableFriendBody');
            tableBodyClean.empty();
            jsonData.forEach(function (item) {
                var row = document.createElement('tr');

                //var dayNameCell = document.createElement('td');
                //dayNameCell.textContent = item.dayName;
                //row.appendChild(dayNameCell);

                var startTimeCell = document.createElement('td');
                startTimeCell.textContent = item.startTime;
                row.appendChild(startTimeCell);

                var endTimeCell = document.createElement('td');
                endTimeCell.textContent = item.endTime;
                row.appendChild(endTimeCell);

                //var classNameCell = document.createElement('td');
                //classNameCell.textContent = item.className;
                //row.appendChild(classNameCell);

                var statusTimeCell = document.createElement('td');
                statusTimeCell.textContent = item.statusTime;
                statusTimeCell.className = item.className; // Menambahkan class ke sel
                row.appendChild(statusTimeCell);
                $("#hd_ChannelTarget").val(item.Channel);
                $("#hd_AgentTarget").val(item.AgentID);
                // Membuat kolom untuk checkbox
                var checkboxCell = document.createElement('td');
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = item.ID + ';' + item.startTime; // Tambahkan value sesuai dengan data item
                checkbox.id = 'checkbox_' + item.ID; // ID dinamis, misalnya "checkbox_123"
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        abcd('Checkbox is checked. Value:', this.value);
                        // Tambahkan tindakan yang ingin dilakukan saat checkbox dicentang
                    } else {
                        abcd('Checkbox is unchecked. Value:', this.value);
                        // Tambahkan tindakan yang ingin dilakukan saat checkbox tidak dicentang
                    }
                });
                //checkboxCell.appendChild(checkbox);
                //row.appendChild(checkboxCell);

                tableBody.appendChild(row);
            });


            // Panggil fungsi untuk memuat data ke tabel saat halaman dimuat
            //loadTableData(jsonData);
            // Tampilkan modal
            $('#eventModal').modal('show');
        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + " " + error);
            failureCallback(error);
        }
    });

    //End

}
$('#ChoiceChangeType').on('change', function () {
    var selectedValue = $(this).val();
    var ParamAction = "";
    var paramChannel = "";
    console.log(selectedValue);
    if (selectedValue == "CDSC") {
        $('#viewCDSC').show();
        $('#viewCDOC').hide();
        $('#viewCS').hide();
        ParamAction = "LISTAGENTCHANGESCHEDULESAME";
    } else if (selectedValue == "CDOC") {
        $('#viewCDSC').show();
        $('#viewCDOC').hide();
        $('#viewCS').hide();
        ParamAction = "LISTAGENTCHANGESCHEDULEOTHER";
    } else if (selectedValue == "CS") {
        $('#viewCS').show();
        $('#viewCDSC').hide();
        $('#viewCDOC').hide();
        ParamAction = "VIEWMEDAYSDETAIL";
        var messageDivTable = $('#shiftTableBodyAvail');
        messageDivTable.empty();
        var messageDivTableAvail = $('#shiftTableAgentAvail');
        messageDivTableAvail.empty();

        // Data JSON yang diberikan
        var jsonData = "";
        console.log("{TrxID:'" + $("#hd_AgentScheduleID").val() + "', TrxUserName: '" + $('#eventStart').val() + "', TrxAction: 'LIST', TrxActionType: 'VIEWDAYSDETAIL'}");
        $.ajax({
            type: "POST",
            //url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
            //data: "{TrxID:'" + $("#hd_AgentScheduleID").val() + "', TrxUserName: '" + $('#eventStart').val() + "', TrxAction: 'LIST', TrxActionType: 'VIEWDAYSDETAIL'}",
            url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
            data: "{TrxID:'" + $("#hd_AgentScheduleID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: '" + ParamAction + "', Param1: '" + $("#hd_AgentScheduleID").val() + "', Param2: '" + $('#eventTitle').val() + "', Param3: '" + $('#eventStart').val() + "', Param4: 'LIST'}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                json = JSON.parse(data.d);
                console.log(json);
                jsonData = JSON.parse(data.d);

                // Fungsi untuk memuat data JSON ke dalam tabel

                var tableBody = document.getElementById('shiftTableBody');
                var tableBodyClean = $('#shiftTableBody');
                tableBodyClean.empty();
                jsonData.forEach(function (item) {
                    var row = document.createElement('tr');

                    //var dayNameCell = document.createElement('td');
                    //dayNameCell.textContent = item.dayName;
                    //row.appendChild(dayNameCell);

                    var startTimeCell = document.createElement('td');
                    startTimeCell.textContent = item.startTime;
                    row.appendChild(startTimeCell);

                    var endTimeCell = document.createElement('td');
                    endTimeCell.textContent = item.endTime;
                    row.appendChild(endTimeCell);

                    //var classNameCell = document.createElement('td');
                    //classNameCell.textContent = item.className;
                    //row.appendChild(classNameCell);

                    var statusTimeCell = document.createElement('td');
                    statusTimeCell.textContent = item.statusTime;
                    statusTimeCell.className = item.className; // Menambahkan class ke sel
                    row.appendChild(statusTimeCell);

                    // Membuat kolom untuk checkbox
                    var checkboxCell = document.createElement('td');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = item.ID + ';' + item.startTime; // Tambahkan value sesuai dengan data item
                    checkbox.id = 'checkboxasal_' + item.ID; // ID dinamis, misalnya "checkbox_123"
                    checkbox.addEventListener('change', function () {
                        if (this.checked) {
                            abcd( this.value);
                            // Tambahkan tindakan yang ingin dilakukan saat checkbox dicentang
                        } else {
                            abcd( this.value);
                            // Tambahkan tindakan yang ingin dilakukan saat checkbox tidak dicentang
                        }
                    });
                    checkboxCell.appendChild(checkbox);
                    row.appendChild(checkboxCell);

                    tableBody.appendChild(row);
                });


                // Panggil fungsi untuk memuat data ke tabel saat halaman dimuat
                //loadTableData(jsonData);
                // Tampilkan modal

            },
            error: function (xhr, status, error) {
                console.error("Error: " + status + " " + error);
                failureCallback(error);
            }
        });
    }


    var messageDiv = $('#tglviewCDSC');
    //LISTAGENTCHANGESCHEDULESAMEv

    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
        data: "{TrxID:'" + $("#hd_AgentScheduleID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: '" + ParamAction + "', Param1: '" + $("#hd_AgentScheduleID").val() + "', Param2: '" + $('#eventTitle').val() + "', Param3: '" + $('#eventStart').val() + "', Param4: 'LIST'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            messageDiv.empty();
            console.log("{TrxID:'" + $("#hd_AgentScheduleID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: '" + ParamAction + "', Param1: '" + $("#hd_AgentScheduleID").val() + "', Param2: '" + $('#eventTitle').val() + "', Param3: '" + $('#eventStart').val() + "', Param4: 'LIST'}");
            console.log(json);
            for (i = 0; i < json.length; i++) {
                result = '<tr>' +
                    '<th scope="row">' +
                    '<div class="form-check font-size-16">' +
                    '<input type="checkbox" class="form-check-input" name="CheckChangeDays" onchange="handleCheckboxChange(this)" id="CheckChangeDays_' + json[i].USERID + '" value="' + json[i].USERID + '">' +
                    '<label class="form-check-label" for="contacusercheck1"></label>' +
                    '</div>' +
                    '</th>' +
                    '<td>' +
                    '<!--<img src="assets/images/users/avatar-1.jpg" alt="" class="avatar-sm rounded-circle me-2">-->' +
                    '<a class="text-body fw-medium">' + json[i].NAME + '</a>' +
                    '<br><a href="#" class="badge badge-soft-primary">' + json[i].Channel + '</a>' +
                    '</td>' +
                    '</tr>';
                messageDiv.append(result);
                feather.replace();
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })


});

function abcd(idNya) {
    console.log(idNya)
    var checkedValues = getCheckedCheckboxes();
    console.log('Checked values:', checkedValues);

    var DataID = [];
    var DataWaktu = [];

    checkedValues.forEach(function (item) {
        var parts = item.split(";"); // Pisahkan string menjadi dua bagian berdasarkan ";"

        DataID.push(parts[0]);  // Tambahkan bagian pertama (ID) ke array DataID
        DataWaktu.push(parts[1]); // Tambahkan bagian kedua (Waktu) ke array DataWaktu
    });

    console.log("DataID =", DataID);
    console.log("DataWaktu =", DataWaktu);

    const jsonStringID = JSON.stringify(DataID);
    const JamStringID = JSON.stringify(DataWaktu);
    var messageDiv = $('#shiftTableAgentAvail');

    $("#hd_DateRequest").val(jsonStringID);
    $("#hd_JamRequest").val(JamStringID);
    $.ajax({
        type: "POST",
        //url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + jsonStringID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'VIEWAVAILAGENT', Param1: 'LIST', Param2: 'LIST', Param3: 'LIST', Param4: 'LIST'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            messageDiv.empty();
            console.log("{TrxID:'" + jsonStringID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'VIEWAVAILAGENT'}");
            console.log(json);
            for (i = 0; i < json.length; i++) {
                result = '<tr>' +
                    '<th scope="row">' +
                    '<div class="form-check font-size-16">' +
                    '<a onclick="showAgentAvailToChangeSchedule(' + json[i].AgentID + ')"><i class="mdi mdi-eye"></i></a>' +
                    '</div>' +
                    '</th>' +
                    '<td>' +
                    '<a onclick="showAgentAvailToChangeSchedule(' + json[i].AgentID + ')" class="text-body fw-medium">' + json[i].AgentName + '</a><br /><cite title="Source Title">' + json[i].GroupName + '</cite>' +
                    '</td>' +
                    '</tr>';
                messageDiv.append(result);
                feather.replace();
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function getTargetSchedule(idNya) {
    console.log("Data Target : " + idNya)
    var checkedValues = getCheckedCheckboxesTarget();
    console.log('Checked values:', checkedValues);

    var DataID = [];
    var DataWaktu = [];

    checkedValues.forEach(function (item) {
        var parts = item.split(";"); // Pisahkan string menjadi dua bagian berdasarkan ";"

        DataID.push(parts[0]);  // Tambahkan bagian pertama (ID) ke array DataID
        DataWaktu.push(parts[1]); // Tambahkan bagian kedua (Waktu) ke array DataWaktu
    });

    console.log("DataIDTarget =", DataID);
    console.log("DataWaktuTarget =", DataWaktu);

    const jsonStringID = JSON.stringify(DataID);
    const jamStringID = JSON.stringify(DataWaktu);
    $("#hd_DateChangeTarget").val(jsonStringID);
    $("#hd_JamTarget").val(jamStringID);
    //const jsonStringID = JSON.stringify(checkedValues);
    //var messageDiv = $('#shiftTableAgentAvail');

    //$("#hd_DateRequest").val(jsonStringID);
    //$.ajax({
    //    type: "POST",
    //    url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
    //    data: "{TrxID:'" + jsonStringID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'VIEWAVAILAGENT', Param1: 'LIST', Param2: 'LIST', Param3: 'LIST', Param4: 'LIST'}",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {

    //        var json = JSON.parse(data.d);
    //        var i, x, result = "";
    //        messageDiv.empty();
    //        console.log("{TrxID:'" + jsonStringID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'VIEWAVAILAGENT'}");
    //        console.log(json);
    //        for (i = 0; i < json.length; i++) {
    //            result = '<tr>' +
    //                '<th scope="row">' +
    //                '<div class="form-check font-size-16">' +
    //                '<a onclick="showAgentAvailToChangeSchedule(' + json[i].AgentID + ')"><i class="mdi mdi-eye"></i></a>' +
    //                '</div>' +
    //                '</th>' +
    //                '<td>' +
    //                '<a onclick="showAgentAvailToChangeSchedule(' + json[i].AgentID + ')" class="text-body fw-medium">' + json[i].AgentName + '</a><br /><cite title="Source Title">' + json[i].GroupName + '</cite>' +
    //                '</td>' +
    //                '</tr>';
    //            messageDiv.append(result);
    //            feather.replace();
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}


function showAgentAvailToChangeSchedule(idNya) {
    $("#hd_AgentTarget").val(idNya);
    console.log(idNya);
    // Data JSON yang diberikan
    var jsonData = "";
    var jsonDataCompare = "";
    var eventDate = new Date($("#eventStart").val());
    var dayName = eventDate.toLocaleDateString('en-US', { weekday: 'long' });
    $("#formCutiSession").show();
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
        data: "{TrxID:'" + idNya + "', TrxUserName: '" + dayName + "', TrxAction: 'LIST', TrxActionType: 'VIEWDAYSDETAIL', Param1: '" + $("#eventStart").val() + "', Param2: 'LIST', Param3: 'LIST', Param4: 'LIST'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            json = JSON.parse(data.d);
            //console.log(json);
            jsonData = JSON.parse(data.d);


            console.log("asli loh : " + jsonData);
            //console.log(AgentTarget);
            //console.log(AgentRequest);

            var parsedArray = JSON.parse($("#hd_DateRequest").val());
            //$("#hd_DateRequest").val(), $("#hd_AgentTarget").val(), $("#hd_AgentScheduleID").val(), dayName, $("#eventStart").val()
            // Hitung jumlah elemen dalam array
            var countDataGet = parsedArray.length;
            console.log("data count : " + countDataGet);
            console.log("Compare {TrxID:'" + $("#hd_DateRequest").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'CHANGESCHEDULE', TrxActionType: 'CHANGESCHEDULEVIEWDAYSDETAIL', Param1: '" + $("#eventStart").val() + "', Param2: '" + $("#hd_DateRequest").val() + "', Param3: '" + $("#hd_AgentTarget").val() + "', Param4: '" + dayName + "'}");
            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
                data: "{TrxID:'" + $("#hd_DateRequest").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'CHANGESCHEDULE', TrxActionType: 'CHANGESCHEDULEVIEWDAYSDETAIL', Param1: '" + $("#eventStart").val() + "', Param2: '" + $("#hd_DateRequest").val() + "', Param3: '" + $("#hd_AgentTarget").val() + "', Param4: '" + dayName + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    //json = JSON.parse(data.d);
                    console.log(json);
                    jsonDataCompare = JSON.parse(data.d);
                    // console.log(data.d);
                    const resultOff = findConsecutiveShifts(countDataGet, 'ON', jsonDataCompare);
                    console.log("DataAsli : " + JSON.stringify(jsonData));
                    console.log("dataCompare : " + JSON.stringify(resultOff));


                    // Fungsi untuk mencocokkan startTime dan endTime, dan mengganti className
                    jsonData.forEach(asli => {
                        resultOff.forEach(updateSet => {
                            updateSet.forEach(update => {
                                if (asli.startTime === update.startTime && asli.endTime === update.endTime) {
                                    asli.className = update.classNameNew;
                                }
                            });
                        });
                    });

                    console.log(jsonData);

                    // Fungsi untuk memuat data JSON ke dalam tabel

                    var tableBody = document.getElementById('shiftTableBodyAvail');
                    var tableBodyClean = $('#shiftTableBodyAvail');
                    tableBodyClean.empty();
                    jsonData.forEach(function (item) {
                        var row = document.createElement('tr');

                        //var dayNameCell = document.createElement('td');
                        //dayNameCell.textContent = item.dayName;
                        //row.appendChild(dayNameCell);

                        var startTimeCell = document.createElement('td');
                        startTimeCell.textContent = item.startTime;
                        row.appendChild(startTimeCell);

                        var endTimeCell = document.createElement('td');
                        endTimeCell.textContent = item.endTime;
                        row.appendChild(endTimeCell);

                        //var classNameCell = document.createElement('td');
                        //classNameCell.textContent = item.className;
                        //row.appendChild(classNameCell);

                        var statusTimeCell = document.createElement('td');
                        statusTimeCell.textContent = item.statusTime;
                        statusTimeCell.className = item.className; // Menambahkan class ke sel
                        row.appendChild(statusTimeCell);

                        // Membuat kolom untuk checkbox
                        var checkboxCell = document.createElement('td');
                        var checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.value = item.ID + ';' + item.startTime;// Tambahkan value sesuai dengan data item
                        checkbox.id = 'checkbox_' + item.ID; // ID dinamis, misalnya "checkbox_123"
                        checkbox.addEventListener('change', function () {
                            if (this.checked) {
                                getTargetSchedule( this.value);
                                // Tambahkan tindakan yang ingin dilakukan saat checkbox dicentang
                            } else {
                                getTargetSchedule( this.value);
                                // Tambahkan tindakan yang ingin dilakukan saat checkbox tidak dicentang
                            }
                        });

                        if (item.className == "bg-success") {
                            checkboxCell.appendChild(checkbox);
                            row.appendChild(checkboxCell);
                        } else {

                        }


                        tableBody.appendChild(row);
                    });

                },
                error: function (xhr, status, error) {
                    console.error("Error: " + status + " " + error);
                    failureCallback(error);
                }
            });



            // Panggil fungsi untuk memuat data ke tabel saat halaman dimuat
            //loadTableData(jsonData);
            // Tampilkan modal
            $('#eventModal').modal('show');
        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + " " + error);
            failureCallback(error);
        }
    });

    //logicSessionChangeSchedule($("#hd_DateRequest").val(), $("#hd_AgentTarget").val(), $("#hd_AgentScheduleID").val(), dayName, $("#eventStart").val());
}

