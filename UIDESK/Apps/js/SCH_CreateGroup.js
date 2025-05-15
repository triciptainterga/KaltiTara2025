$(document).ready(function () {
    QA_DataLoad();
    listAgent();
    //EDIT_DataLoad(2520);

    var mondayTab = document.querySelector('a.nav-link[href="#Monday"]');
    var tuesdayTab = document.querySelector('a.nav-link[href="#Tuesday"]');
    var wednesdayTab = document.querySelector('a.nav-link[href="#Wednesday"]');
    var thursdayTab = document.querySelector('a.nav-link[href="#Thursday"]');
    var fridayTab = document.querySelector('a.nav-link[href="#Friday"]');
    var saturdayTab = document.querySelector('a.nav-link[href="#Saturday"]');
    var sundayTab = document.querySelector('a.nav-link[href="#Sunday"]');
    // Tambahkan event listener untuk klik
    mondayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Monday clicked!");
        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");
        } else {
            EDIT_DataLoad($('#AgentID').val(), 'monday');
        }

        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    tuesdayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Tuesday clicked!");

        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");
        } else {
            EDIT_DataLoad($('#AgentID').val(), 'tuesday');
        }
        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    wednesdayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Wednesday clicked!");

        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");
        } else {
            EDIT_DataLoad($('#AgentID').val(), 'wednesday');
        }
        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    thursdayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Thursday clicked!");

        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");
        } else {
            EDIT_DataLoad($('#AgentID').val(), 'thursday');
        }
        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    fridayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Friday clicked!");

        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");
        } else {
            EDIT_DataLoad($('#AgentID').val(), 'friday');
        }
        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    saturdayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Saturday clicked!");
        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");
        } else {
            EDIT_DataLoad($('#AgentID').val(), 'saturday');
        }

        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    sundayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Sunday clicked!");

        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");
        } else {
            EDIT_DataLoad($('#AgentID').val(), 'sunday');
        }
        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    //End


    $('#save-schedule-monday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-monday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            var onoffData = $(this).find('select[name^="ONOFF-"]:last').val();

            rowsData.push({
                day: day,
                start_time: startHour + ':' + startMinute,
                end_time: endHour + ':' + endMinute,
                on_off: onoffData
            });
        });
        var agentID = $('#AgentID').val();
        var name = $("#hd_sessionLogin").val();
        var dataToSend = {
            agent_id: agentID,
            name: $("#hd_sessionLogin").val(),
            schedule: rowsData
        };
        console.log(JSON.stringify(dataToSend));

        $.ajax({
            type: "POST",
            url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_InsertAgentSchedule",
            data: "{TrxID:'" + JSON.stringify(dataToSend) + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'INSERT', TrxActionType: 'AgentSchedule'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                console.log(data.d);

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
        // Send data to API
        /*$.ajax({
            url: 'https://api.yourdomain.com/schedules',  // Ganti dengan URL API Anda
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rowsData),
            success: function (response) {
                alert('Schedule saved successfully!');
                // Handle success response
            },
            error: function (xhr, status, error) {
                alert('Failed to save schedule.');
                console.error(error);
                // Handle error response
            }
        });*/
    });

    $('#save-schedule-tuesday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-tuesday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            var onoffData = $(this).find('select[name^="ONOFF-"]:last').val();

            rowsData.push({
                day: day,
                start_time: startHour + ':' + startMinute,
                end_time: endHour + ':' + endMinute,
                on_off: onoffData
            });
        });
        var agentID = $('#AgentID').val();
        var name = $("#hd_sessionLogin").val();
        var dataToSend = {
            agent_id: agentID,
            name: name,
            schedule: rowsData
        };
        console.log(JSON.stringify(dataToSend));

        $.ajax({
            type: "POST",
            url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_InsertAgentSchedule",
            data: "{TrxID:'" + JSON.stringify(dataToSend) + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'INSERT', TrxActionType: 'AgentSchedule'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                console.log(data.d);

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
        // Send data to API
        /*$.ajax({
            url: 'https://api.yourdomain.com/schedules',  // Ganti dengan URL API Anda
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rowsData),
            success: function (response) {
                alert('Schedule saved successfully!');
                // Handle success response
            },
            error: function (xhr, status, error) {
                alert('Failed to save schedule.');
                console.error(error);
                // Handle error response
            }
        });*/
    });

    $('#save-schedule-wednesday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-wednesday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            var onoffData = $(this).find('select[name^="ONOFF-"]:last').val();

            rowsData.push({
                day: day,
                start_time: startHour + ':' + startMinute,
                end_time: endHour + ':' + endMinute,
                on_off: onoffData
            });
        });
        var agentID = $('#AgentID').val();
        var name = $("#hd_sessionLogin").val();
        var dataToSend = {
            agent_id: agentID,
            name: name,
            schedule: rowsData
        };
        console.log(JSON.stringify(dataToSend));

        $.ajax({
            type: "POST",
            url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_InsertAgentSchedule",
            data: "{TrxID:'" + JSON.stringify(dataToSend) + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'INSERT', TrxActionType: 'AgentSchedule'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                console.log(data.d);

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
        // Send data to API
        /*$.ajax({
            url: 'https://api.yourdomain.com/schedules',  // Ganti dengan URL API Anda
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rowsData),
            success: function (response) {
                alert('Schedule saved successfully!');
                // Handle success response
            },
            error: function (xhr, status, error) {
                alert('Failed to save schedule.');
                console.error(error);
                // Handle error response
            }
        });*/
    });

    $('#save-schedule-thursday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-thursday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            var onoffData = $(this).find('select[name^="ONOFF-"]:last').val();

            rowsData.push({
                day: day,
                start_time: startHour + ':' + startMinute,
                end_time: endHour + ':' + endMinute,
                on_off: onoffData
            });
        });
        var agentID = $('#AgentID').val();
        var name = $("#hd_sessionLogin").val();
        var dataToSend = {
            agent_id: agentID,
            name: name,
            schedule: rowsData
        };
        console.log(JSON.stringify(dataToSend));

        $.ajax({
            type: "POST",
            url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_InsertAgentSchedule",
            data: "{TrxID:'" + JSON.stringify(dataToSend) + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'INSERT', TrxActionType: 'AgentSchedule'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                console.log(data.d);

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
        // Send data to API
        /*$.ajax({
            url: 'https://api.yourdomain.com/schedules',  // Ganti dengan URL API Anda
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rowsData),
            success: function (response) {
                alert('Schedule saved successfully!');
                // Handle success response
            },
            error: function (xhr, status, error) {
                alert('Failed to save schedule.');
                console.error(error);
                // Handle error response
            }
        });*/
    });

    $('#save-schedule-friday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-friday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            var onoffData = $(this).find('select[name^="ONOFF-"]:last').val();

            rowsData.push({
                day: day,
                start_time: startHour + ':' + startMinute,
                end_time: endHour + ':' + endMinute,
                on_off: onoffData
            });
        });
        var agentID = $('#AgentID').val();
        var name = $("#hd_sessionLogin").val();
        var dataToSend = {
            agent_id: agentID,
            name: name,
            schedule: rowsData
        };
        console.log(JSON.stringify(dataToSend));

        $.ajax({
            type: "POST",
            url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_InsertAgentSchedule",
            data: "{TrxID:'" + JSON.stringify(dataToSend) + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'INSERT', TrxActionType: 'AgentSchedule'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                console.log(data.d);

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
        // Send data to API
        /*$.ajax({
            url: 'https://api.yourdomain.com/schedules',  // Ganti dengan URL API Anda
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rowsData),
            success: function (response) {
                alert('Schedule saved successfully!');
                // Handle success response
            },
            error: function (xhr, status, error) {
                alert('Failed to save schedule.');
                console.error(error);
                // Handle error response
            }
        });*/
    });

    $('#save-schedule-saturday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-saturday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            var onoffData = $(this).find('select[name^="ONOFF-"]:last').val();

            rowsData.push({
                day: day,
                start_time: startHour + ':' + startMinute,
                end_time: endHour + ':' + endMinute,
                on_off: onoffData
            });
        });
        var agentID = $('#AgentID').val();
        var name = $("#hd_sessionLogin").val();
        var dataToSend = {
            agent_id: agentID,
            name: name,
            schedule: rowsData
        };
        console.log(JSON.stringify(dataToSend));

        $.ajax({
            type: "POST",
            url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_InsertAgentSchedule",
            data: "{TrxID:'" + JSON.stringify(dataToSend) + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'INSERT', TrxActionType: 'AgentSchedule'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                console.log(data.d);

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
        // Send data to API
        /*$.ajax({
            url: 'https://api.yourdomain.com/schedules',  // Ganti dengan URL API Anda
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rowsData),
            success: function (response) {
                alert('Schedule saved successfully!');
                // Handle success response
            },
            error: function (xhr, status, error) {
                alert('Failed to save schedule.');
                console.error(error);
                // Handle error response
            }
        });*/
    });

    $('#save-schedule-sunday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-sunday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            var onoffData = $(this).find('select[name^="ONOFF-"]:last').val();

            rowsData.push({
                day: day,
                start_time: startHour + ':' + startMinute,
                end_time: endHour + ':' + endMinute,
                on_off: onoffData
            });
        });
        var agentID = $('#AgentID').val();
        var name = $("#hd_sessionLogin").val();
        var dataToSend = {
            agent_id: agentID,
            name: name,
            schedule: rowsData
        };
        console.log(JSON.stringify(dataToSend));

        $.ajax({
            type: "POST",
            url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_InsertAgentSchedule",
            data: "{TrxID:'" + JSON.stringify(dataToSend) + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'INSERT', TrxActionType: 'AgentSchedule'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                console.log(data.d);

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
        // Send data to API
        /*$.ajax({
            url: 'https://api.yourdomain.com/schedules',  // Ganti dengan URL API Anda
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rowsData),
            success: function (response) {
                alert('Schedule saved successfully!');
                // Handle success response
            },
            error: function (xhr, status, error) {
                alert('Failed to save schedule.');
                console.error(error);
                // Handle error response
            }
        });*/
    });
});

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('add-row-btn-monday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-monday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
            <select name="start-time-${dayName.toLowerCase()}-hour">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <!-- Other hour options -->
            </select> : 
            <select name="start-time-${dayName.toLowerCase()}-minute">
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
            <select name="end-time-${dayName.toLowerCase()}-hour">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <!-- Other hour options -->
            </select> : 
            <select name="end-time-${dayName.toLowerCase()}-minute">
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        //endSelect.innerHTML = `
        //    <select name="ONOFF-${dayName.toLowerCase()}">
        //        <option value="ON">ON</option>
        //        <option value="OFF">OFF</option>

        //    </select>`;
        endSelect.innerHTML = `
            <input type="checkbox" id="ONOFF-${dayName.toLowerCase()}" name="ONOFF-${dayName.toLowerCase()}" value="ON" onchange="this.value=this.checked ? 'ON' : 'OFF';">`;

        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-monday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-monday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-monday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }



    if (e.target && e.target.classList.contains('add-row-btn-tuesday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-tuesday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
            <select name="start-time-${dayName.toLowerCase()}-hour">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <!-- Other hour options -->
            </select> : 
            <select name="start-time-${dayName.toLowerCase()}-minute">
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
            <select name="end-time-${dayName.toLowerCase()}-hour">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <!-- Other hour options -->
            </select> : 
            <select name="end-time-${dayName.toLowerCase()}-minute">
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        //endSelect.innerHTML = `
        //    <select name="ONOFF-${dayName.toLowerCase()}">
        //        <option value="ON">ON</option>
        //        <option value="OFF">OFF</option>l

        //    </select>`;
        endSelect.innerHTML = `
            <input type="checkbox" id="ONOFF-${dayName.toLowerCase()}" name="ONOFF-${dayName.toLowerCase()}" value="ON" onchange="this.value=this.checked ? 'ON' : 'OFF';">`;

        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-tuesday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-tuesday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-tuesday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }


    if (e.target && e.target.classList.contains('add-row-btn-wednesday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-wednesday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
        <select name="start-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="start-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="end-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="end-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="ONOFF-${dayName.toLowerCase()}">
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
            
        </select>`;
        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-wednesday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-wednesday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-wednesday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }



    if (e.target && e.target.classList.contains('add-row-btn-thursday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-thursday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
        <select name="start-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="start-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="end-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="end-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="ONOFF-${dayName.toLowerCase()}">
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
            
        </select>`;
        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-thursday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-thursday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-thursday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }


    if (e.target && e.target.classList.contains('add-row-btn-friday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-friday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
        <select name="start-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="start-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="end-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="end-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="ONOFF-${dayName.toLowerCase()}">
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
            
        </select>`;
        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-friday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-friday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-friday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }


    if (e.target && e.target.classList.contains('add-row-btn-saturday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-saturday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
        <select name="start-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="start-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="end-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="end-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="ONOFF-${dayName.toLowerCase()}">
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
            
        </select>`;
        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-saturday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-saturday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-saturday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }

    if (e.target && e.target.classList.contains('add-row-btn-sunday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-sunday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
        <select name="start-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="start-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="end-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="end-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="ONOFF-${dayName.toLowerCase()}">
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
            
        </select>`;
        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-sunday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-sunday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-sunday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }
});



function listAgent() {
    var resultHeader = "";
    var result = "";
    console.log("List Agent Dropdown");
    var messageDiv = $('#DataListAgents');
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LISTAGENT', TrxActionType: 'VIEW'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            console.log(data.d);
            messageDiv.empty();
            resultHeader = '<p>' +
                '<input type="search" class="form-control" placeholder="Search..." id="searchDropdown">' +
                '</p>';
            for (i = 0; i < json.length; i++) {
                result +=
                    '<li>' +
                '<label class="dropdown-item">' +
                '<input type="checkbox" class="form-check-input me-2" value="' + json[i].USERID + '"> ' + json[i].USERID + ' - ' + json[i].NAME +
                    '</label>' +
                    '</li>';
                feather.replace();


            }
            messageDiv.append(resultHeader + result);
            // Inisialisasi ulang event listener jika ada
            inisialisasiEventListener();
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    

}

function listAgentSearch(dataCari) {
    var resultHeader = "";
    var result = "";
    var messageDiv = $('#DataListAgents');
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + dataCari + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LISTAGENT', TrxActionType: 'VIEWSEARCH'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            console.log(data.d);
            messageDiv.empty();
            resultHeader = '<li>' +
                '<input type="search" class="form-control" value="' + dataCari + '" placeholder="Search..." id="searchDropdown">' +
                '</li>';
            for (i = 0; i < json.length; i++) {
                result +=
                    '<li>' +
                    '<label class="dropdown-item">' +
                    '<input type="checkbox" class="form-check-input me-2" value="' + json[i].USERID + '"> ' + json[i].USERNAME + ' - ' + json[i].NAME + '<br>' + json[i].LEVELUSER +
                    '</label>' +
                    '</li>';
                feather.replace();


            }
            messageDiv.append(resultHeader + result);
            // Inisialisasi ulang event listener jika ada
            inisialisasiEventListener();
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function inisialisasiEventListener() {
    // Inisialisasi event listener untuk checkbox dan search
    // Contoh untuk checkbox
    $('#DataListAgents input[type="checkbox"]').on('change', function () {
        // Lakukan sesuatu ketika checkbox diubah
        // Kumpulkan nilai checkbox yang dipilih
        var selectedValues = [];
        $('#DataListAgents input[type="checkbox"]:checked').each(function () {
            selectedValues.push($(this).val());
        });

        // Tampilkan nilai yang dipilih (misalnya di input #selectedItems)
        $('#selectedItems').val(selectedValues.join(';'));
        $('#AgentID').val(selectedValues.join(';'));
        // Anda bisa melakukan tindakan lain di sini
        console.log('Checkbox yang dipilih:', selectedValues);
    });

    // Jika ada fungsi pencarian, inisialisasi ulang di sini
    // Contoh:
    $('#searchDropdown').on('input', function () {
        // Implementasikan logika pencarian
        var searchTerm = $(this).val().toLowerCase(); // Ambil teks pencarian dan ubah jadi huruf kecil

        if (searchTerm.length > 3) { // Mulai pencarian jika panjang input lebih dari 3
            $('#DataListAgents li').each(function () {
                var itemText = $(this).find('label').text().toLowerCase(); // Cari teks dalam label

                // Periksa apakah teks dalam label sesuai dengan input pencarian
                if (itemText.includes(searchTerm)) {
                    $(this).show(); // Tampilkan item jika sesuai
                } else {
                    $(this).hide(); // Sembunyikan item jika tidak sesuai
                }

            });
        } else {
            $('#DataListAgents li').show(); // Tampilkan semua item jika input kurang dari 4 karakter
        }
        //var searchTerm = $(this).val().toLowerCase(); // Ambil teks pencarian dan ubah jadi huruf kecil

        //if (searchTerm.length > 3) {
        //   listAgentSearch(searchTerm); // Panggil fungsi pencarian jika panjang input lebih dari 3
        //} else if (searchTerm.length < 1) {
        //   listAgent();
        //} else {
        // $('#DataListAgents li').show(); // Tampilkan semua item jika input kurang dari 4 karakter
        //}
    });
}

function EDIT_DataLoad(AgentID, dayName) {
    // Asumsikan ini adalah data yang diterima dari API
    /*var apiData = [
        { "ID": 124, "ShiftsID": "1", "AgentID": "2520", "dayName": "Monday", "title": "07:00-07:30", "startTime": "07:00", "endTime": "07:30", "className": "bg-primary", "statusTime": "ON", "DateCreate": null, "UserCreate": null, "DateUpdate": null, "UserUpdate": null },
        { "ID": 125, "ShiftsID": "1", "AgentID": "2520", "dayName": "Monday", "title": "07:30-08:00", "startTime": "07:30", "endTime": "08:00", "className": "bg-primary", "statusTime": "ON", "DateCreate": null, "UserCreate": null, "DateUpdate": null, "UserUpdate": null }
    ];*/

    console.log("{TrxID:'" + AgentID + "', TrxUserName: '" + dayName + "', TrxAction: 'LIST', TrxActionType: 'DETAILSCHEDULE'}");
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + AgentID + "', TrxUserName: '" + dayName + "', TrxAction: 'LIST', TrxActionType: 'DETAILSCHEDULE'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log("EditDataLoad");
            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);
            // Target tbody dalam tabel
            var tbody = document.querySelector("#schedule-table-" + dayName + " tbody");

            // Hapus baris yang ada jika ingin menggantinya
            tbody.innerHTML = '';

            // Iterasi melalui data dan buat baris baru untuk setiap item
            json.forEach(function (item) {
                var row = document.createElement("tr");

                row.innerHTML = `
            <td><input type="checkbox" class="form-check-input" name="select-${item.dayName}"></td>
            <td>${item.dayName}</td>
            <td>
                <div class="time-select">
                    <select class="" name="start-time-${item.dayName}-hour" disabled>
                        <option selected>${item.startTime.split(":")[0]}</option>
                    </select> : 
                    <select class="" name="start-time-${item.dayName}-minute" disabled>
                        <option selected>${item.startTime.split(":")[1]}</option>
                    </select>
                </div>
            </td>
            <td>
                <div class="time-select">
                    <select class="" name="end-time-${item.dayName}-hour" disabled>
                        <option selected>${item.endTime.split(":")[0]}</option>
                    </select> : 
                    <select class="" name="end-time-${item.dayName}-minute" disabled>
                        <option selected>${item.endTime.split(":")[1]}</option>
                    </select>
                </div>
            </td>
            <td>
                <div class="time-select">
                    <select class="" name="ONOFF-${item.dayName}">
                        <option value="ON" ${item.statusTime === "ON" ? "selected" : ""}>ON</option>
                        <option value="OFF" ${item.statusTime === "OFF" ? "selected" : ""}>OFF</option>
                    </select>
                </div>
            </td>
            <td><a class="add-row-btn-monday">Add Row</a></td>
        `;

                tbody.appendChild(row);
            });


            /*for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateUpdate);
                var milisegundos = parseInt(json[i].DateUpdate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                //var urlClick = "<div class='dropdown'>" +
                //    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                //    "<div class='dropdown-menu dropdown-menu-right'>" +
                //    "<a class='dropdown-item' href='#' onclick=FormUpdate('" + json[i].ID + "','" + encodeURI(json[i].NamaMaster) + "','" + encodeURI(json[i].Aktif) + "')><i class='fa fa-pencil'></i> Edit</a>" +
                //    "</div>"
                if (json[i].Status == "Y") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                var buttonAction = '<a onclick="Edit(' + json[i].ID + ')"><i class="fas fa-edit"></i></a>  |  <i class="fas fa-trash-alt"></i>';
                myTable.row.add([json[i].ID, json[i].NameShifts, newDate + ' ' + newTime, json[i].UserUpdate, buttonAction]).draw(false);
            }*/

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function QA_DataLoad() {
    var myTable = $('#DataSCH_Shift').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'VIEWGROUP'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);
            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateUpdate);
                var milisegundos = parseInt(json[i].DateUpdate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                //var urlClick = "<div class='dropdown'>" +
                //    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                //    "<div class='dropdown-menu dropdown-menu-right'>" +
                //    "<a class='dropdown-item' href='#' onclick=FormUpdate('" + json[i].ID + "','" + encodeURI(json[i].NamaMaster) + "','" + encodeURI(json[i].Aktif) + "')><i class='fa fa-pencil'></i> Edit</a>" +
                //    "</div>"
                if (json[i].Status == "Y") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                var buttonAction = '<a onclick="Tambah(' + json[i].ID + ')"><i class="fas fa-edit"></i></a>';
                myTable.row.add([json[i].ID, json[i].NameShifts, newDate + ' ' + newTime, json[i].UserUpdate, buttonAction]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Tambah(idGroup) {
    $("#hd_StatusAction").val('add');
    $("#addContactModal").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    $("#ValIDShift").val(idGroup);
    CleanObject()

    var myTable = $('#group-table-agent').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'"+idGroup+"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'DETAILGROUP'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);
            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                
               
                
             //   var buttonAction = '<a onclick="Tambah(' + json[i].ID + ')"><i class="fas fa-user"></i></a> | <a onclick="Edit(' + json[i].ID + ')"><i class="fas fa-edit"></i></a> | <i class="fas fa-trash-alt"></i>';
                myTable.row.add([i + 1, json[i].AgentName, json[i].Site]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    var messageDiv = $('#DivChannelGroupAssign');
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + idGroup + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'VIEWCHANNELGROUP'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            var totalQty = 0;
            messageDiv.empty(); 
            for (i = 0; i < json.length; i++) {
                if (json[i].ChannelName !== "All") {
                    totalQty += +json[i].QtyAgent; // Accumulate QtyAgent for valid channels
                    result +=
                        '<div class="col-md-3">' +
                        '<div class="card mt-4 maintenance-box shadow-none">' +
                        '<div class="card-body">' +
                        '<div class="mb-4">' +
                        '<i class="uil uil-rss-alt h1 text-primary"></i>' +
                        '</div>' +
                        '<center>' +
                        '<h5 class="font-size-15 text-uppercase" style="cursor: pointer;" onclick="actionChange(' + json[i].ID + ',' + json[i].QtyAgent + ')">' +
                        json[i].ChannelName + ' : ' + json[i].QtyAgent +
                        '</h5>' +
                        '</center>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    feather.replace();
                } else {
                    result +=
                        '<div class="col-md-3">' +
                        '<div class="card mt-4 maintenance-box shadow-none">' +
                        '<div class="card-body">' +
                        '<div class="mb-4">' +
                        '<i class="uil uil-rss-alt h1 text-primary"></i>' +
                        '</div>' +
                        '<center>' +
                        '<h5 class="font-size-15 text-uppercase" style="cursor: pointer;" onclick="actionChange(' + json[i].ID + ',' + json[i].QtyAgent + ')">' +
                    json[i].ChannelName + ' : ' + totalQty +
                        '</h5>' +
                        '</center>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    feather.replace();
                }

                // Generate HTML
                
            }
             
            console.log(json);
            messageDiv.append(result);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function actionChange(id,value) {
    $("#addContactModal").modal('hide');

    Swal.fire({
        title: 'Jumlah Value',
        html: `
            <input type="text" id="inputField" class="swal2-input" placeholder="Enter value" value="${value}">
        `,
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            const inputValue = $('#inputField').val();
            if (!inputValue) {
                Swal.showValidationMessage('Please enter a value');
            }
            return inputValue;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const inputValue = $('#inputField').val();
            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
                data: "{TrxID:'" + id + "', TrxUserName: '" + $("#inputField").val() + "', TrxAction: 'LIST', TrxActionType: 'UPDATECHANNELGROUP'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, x, result = "";
                    location.reload();
                    console.log(json);
                   
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            })
           
            //alert('Submitted value:'+ inputValue);
        }
    });
}
function Edit(AgentID) {
    $("#hd_StatusAction").val('edit');
    console.log(AgentID);
    $('#AgentID').val(AgentID);
    $("#addContactModal").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    CleanObject()
}
function TambahAgentShift() {
    $("#addAgentShift").modal('show');
}
function processAddAgents() {
    console.log($("#selectedItems").val());
    //var myTable = $('#listAgentShifts').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + $("#selectedItems").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + ";" + $("#ValIDShift").val() + "', TrxAction: 'ADD', TrxActionType: 'AgentstoShift'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);
            //myTable.clear().draw();
            //for (i = 0; i < json.length; i++) {


            //    var buttonAction = '<i class="fas fa-edit"></i>  |  <i class="fas fa-trash-alt"></i>';
            //    myTable.row.add([json[i].NAME, json[i].EMAIL_ADDRESS, buttonAction]).draw(false);
            //}

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CleanObject() {
    $("#TrxNamaMaster").val("");
    $("#cmbStatus").val("");
    $("#ContentPlaceHolder1_TrxID").val("");
}