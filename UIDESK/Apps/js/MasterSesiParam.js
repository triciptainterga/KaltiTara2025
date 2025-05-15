$(document).ready(function () {
    LIstData();
    // GetDataChannel();

    var mondayTab = document.querySelector('a.nav-link[href="#Monday"]');
    var tuesdayTab = document.querySelector('a.nav-link[href="#Tuesday"]');
    var wednesdayTab = document.querySelector('a.nav-link[href="#Wednesday"]');
    var thursdayTab = document.querySelector('a.nav-link[href="#Thursday"]');
    var fridayTab = document.querySelector('a.nav-link[href="#Friday"]');
    var saturdayTab = document.querySelector('a.nav-link[href="#Saturday"]');
    var sundayTab = document.querySelector('a.nav-link[href="#Sunday"]');

    Add_NewData($('#AgentID').val(), 'monday');
    $('#addContactModal').on('show.bs.modal', function (e) {
        // Lakukan sesuatu saat modal akan ditampilkan
        console.log('Modal akan ditampilkan' + $("#AgentID").val());
        $('.nav-link').removeClass('active');
        $('#Monday').removeClass('active');

        //$('.tab-pane').removeClass('active');
        //$("#save-schedule").hide();
        //$("#Update").show();
    });
    $('#addContactModal').on('hidden.bs.modal', function () {
        location.reload(); // Refresh the page when the modal is closed
    });
    // Tambahkan event listener untuk klik
    mondayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Monday clicked!");

        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");

            if ($('#AgentID').val() == "") {
                swal(
                    '',
                    'Silahkan isi agent Id!',
                    'error'
                ).then(function () {
                    return false;
                });

            } else {
                var rowCount = $('#schedule-table-monday tbody tr').length;

                if (rowCount == 1) {
                    Add_NewData($('#AgentID').val(), 'monday');
                } else {
                    $('#schedule-table-monday tbody tr').each(function () {
                        var day = $(this).find('td:eq(1)').text();
                        var startHour = $(this).find('select[name^="start-time-"]:first').val();
                        var startMinute = $(this).find('select[name^="start-time-"]:last').val();
                        var endHour = $(this).find('select[name^="end-time-"]:first').val();
                        var endMinute = $(this).find('select[name^="end-time-"]:last').val();
                        //var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                        var valueData = $(this).find('input[type="text"]').val();
                        // alert(onoffData);
                        rowsData.push({
                            day: day,
                            start_time: startHour + ':' + startMinute,
                            end_time: endHour + ':' + endMinute,
                            valueChannel: valueData
                        });
                    });
                }
            }


        } else {
            var rowCount = $('#schedule-table-monday tbody tr').length;

            if (rowCount == 1) {
                EDIT_DataLoad($('#AgentID').val(), 'monday');
            } else {
                $('#schedule-table-monday tbody tr').each(function () {
                    var day = $(this).find('td:eq(1)').text();
                    var startHour = $(this).find('select[name^="start-time-"]:first').val();
                    var startMinute = $(this).find('select[name^="start-time-"]:last').val();
                    var endHour = $(this).find('select[name^="end-time-"]:first').val();
                    var endMinute = $(this).find('select[name^="end-time-"]:last').val();
                    //var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                    var valueData = $(this).find('input[type="text"]').val();
                    // alert(onoffData);
                    rowsData.push({
                        day: day,
                        start_time: startHour + ':' + startMinute,
                        end_time: endHour + ':' + endMinute,
                        valueChannel: valueData
                    });
                });
            }
        }

        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    tuesdayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Tuesday clicked!");

        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");

            if ($('#AgentID').val() == "") {
                swal(
                    '',
                    'Silahkan isi agent Id!',
                    'error'
                ).then(function () {
                    return false;
                });

            } else {
                var rowCount = $('#schedule-table-tuesday tbody tr').length;

                if (rowCount == 1) {
                    Add_NewData($('#AgentID').val(), 'tuesday');
                } else {
                    $('#schedule-table-tuesday tbody tr').each(function () {
                        var day = $(this).find('td:eq(1)').text();
                        var startHour = $(this).find('select[name^="start-time-"]:first').val();
                        var startMinute = $(this).find('select[name^="start-time-"]:last').val();
                        var endHour = $(this).find('select[name^="end-time-"]:first').val();
                        var endMinute = $(this).find('select[name^="end-time-"]:last').val();
                        //var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                        var valueData = $(this).find('input[type="text"]').val();
                        // alert(onoffData);
                        rowsData.push({
                            day: day,
                            start_time: startHour + ':' + startMinute,
                            end_time: endHour + ':' + endMinute,
                            valueChannel: valueData
                        });
                    });
                }
            }

        } else {

            var rowCount = $('#schedule-table-tuesday tbody tr').length;

            if (rowCount == 1) {
                Add_NewData($('#AgentID').val(), 'tuesday');
            } else {
                EDIT_DataLoad($('#AgentID').val(), 'tuesday');
            }

        }
        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    wednesdayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Wednesday clicked!");

        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");
            if ($('#AgentID').val() == "") {
                swal(
                    '',
                    'Silahkan isi agent Id!',
                    'error'
                ).then(function () {
                    return false;
                });

            } else {
                // Add_NewData($('#AgentID').val(), 'wednesday');
                var rowCount = $('#schedule-table-wednesday tbody tr').length;

                if (rowCount == 1) {
                    Add_NewData($('#AgentID').val(), 'wednesday');
                } else {
                    $('#schedule-table-wednesday tbody tr').each(function () {
                        var day = $(this).find('td:eq(1)').text();
                        var startHour = $(this).find('select[name^="start-time-"]:first').val();
                        var startMinute = $(this).find('select[name^="start-time-"]:last').val();
                        var endHour = $(this).find('select[name^="end-time-"]:first').val();
                        var endMinute = $(this).find('select[name^="end-time-"]:last').val();
                        //var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                        var valueData = $(this).find('input[type="text"]').val();
                        // alert(onoffData);
                        rowsData.push({
                            day: day,
                            start_time: startHour + ':' + startMinute,
                            end_time: endHour + ':' + endMinute,
                            valueChannel: valueData
                        });
                    });
                }
            }

        } else {
            // EDIT_DataLoad($('#AgentID').val(), 'wednesday');
            var rowCount = $('#schedule-table-wednesday tbody tr').length;

            if (rowCount == 1) {
                Add_NewData($('#AgentID').val(), 'wednesday');
            } else {
                EDIT_DataLoad($('#AgentID').val(), 'wednesday');
            }
        }
        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    thursdayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Thursday clicked!");

        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");
            if ($('#AgentID').val() == "") {
                swal(
                    '',
                    'Silahkan isi agent Id!',
                    'error'
                ).then(function () {
                    return false;
                });

            } else {
                // Add_NewData($('#AgentID').val(), 'thursday');
                var rowCount = $('#schedule-table-thursday tbody tr').length;

                if (rowCount == 1) {
                    Add_NewData($('#AgentID').val(), 'thursday');
                } else {
                    $('#schedule-table-thursday tbody tr').each(function () {
                        var day = $(this).find('td:eq(1)').text();
                        var startHour = $(this).find('select[name^="start-time-"]:first').val();
                        var startMinute = $(this).find('select[name^="start-time-"]:last').val();
                        var endHour = $(this).find('select[name^="end-time-"]:first').val();
                        var endMinute = $(this).find('select[name^="end-time-"]:last').val();
                        //var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                        var valueData = $(this).find('input[type="text"]').val();
                        // alert(onoffData);
                        rowsData.push({
                            day: day,
                            start_time: startHour + ':' + startMinute,
                            end_time: endHour + ':' + endMinute,
                            valueChannel: valueData
                        });
                    });
                }
            }
        } else {
            // EDIT_DataLoad($('#AgentID').val(), 'thursday');
            var rowCount = $('#schedule-table-thursday tbody tr').length;
            if (rowCount == 1) {
                Add_NewData($('#AgentID').val(), 'thursday');
            } else {
                EDIT_DataLoad($('#AgentID').val(), 'thursday');
            }

        }
        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    fridayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Friday clicked!");

        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");
            if ($('#AgentID').val() == "") {
                swal(
                    '',
                    'Silahkan isi agent Id!',
                    'error'
                ).then(function () {
                    return false;
                });

            } else {
                // Add_NewData($('#AgentID').val(), 'friday');
                var rowCount = $('#schedule-table-friday tbody tr').length;

                if (rowCount == 1) {
                    Add_NewData($('#AgentID').val(), 'friday');
                } else {
                    $('#schedule-table-friday tbody tr').each(function () {
                        var day = $(this).find('td:eq(1)').text();
                        var startHour = $(this).find('select[name^="start-time-"]:first').val();
                        var startMinute = $(this).find('select[name^="start-time-"]:last').val();
                        var endHour = $(this).find('select[name^="end-time-"]:first').val();
                        var endMinute = $(this).find('select[name^="end-time-"]:last').val();
                        //var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                        var valueData = $(this).find('input[type="text"]').val();
                        // alert(onoffData);
                        rowsData.push({
                            day: day,
                            start_time: startHour + ':' + startMinute,
                            end_time: endHour + ':' + endMinute,
                            valueChannel: valueData
                        });
                    });
                }
            }
        } else {
            // EDIT_DataLoad($('#AgentID').val(), 'friday');
            var rowCount = $('#schedule-table-friday tbody tr').length;

            if (rowCount == 1) {
                Add_NewData($('#AgentID').val(), 'friday');
            } else {
                EDIT_DataLoad($('#AgentID').val(), 'friday');

            }
        }
        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    saturdayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Saturday clicked!");
        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");

            if ($('#AgentID').val() == "") {
                swal(
                    '',
                    'Silahkan isi agent Id!',
                    'error'
                ).then(function () {
                    return false;
                });

            } else {
                // Add_NewData($('#AgentID').val(), 'saturday');
                var rowCount = $('#schedule-table-saturday tbody tr').length;

                if (rowCount == 1) {
                    Add_NewData($('#AgentID').val(), 'saturday');
                } else {
                    EDIT_DataLoad($('#AgentID').val(), 'saturday');

                }
            }
        } else {
            var rowCount = $('#schedule-table-saturday tbody tr').length;

            if (rowCount == 1) {
                Add_NewData($('#AgentID').val(), 'saturday');
            } else {
                EDIT_DataLoad($('#AgentID').val(), 'saturday');

            }
        }

        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });
    sundayTab.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah aksi default (misalnya mengubah URL hash)
        console.log("Tab for Sunday clicked!");

        if ($("#hd_StatusAction").val() == "add") {
            console.log("The value of #AgentID is null");
            if ($('#AgentID').val() == "") {
                swal(
                    '',
                    'Silahkan isi agent Id!',
                    'error'
                ).then(function () {
                    return false;
                });

            } else {
                Add_NewData($('#AgentID').val(), 'sunday');


            }
        } else {
            var rowCount = $('#schedule-table-sunday tbody tr').length;

            if (rowCount == 1) {
                Add_NewData($('#AgentID').val(), 'sunday');
            } else {
                EDIT_DataLoad($('#AgentID').val(), 'sunday');

            }
        }
        // Kamu bisa menambahkan aksi lain di sini, misalnya:
        // Memuat konten untuk tab "Tuesday", melakukan AJAX call, dll.
    });

    $('#save-schedule').on('click', function () {
        var daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
       
        if ($("#myMonth").val() == "") {
            swal(
                '',
                'Bulan Tidak boleh kosong.',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }

        if ($("#SelectChannel").val() == "") {
            swal(
                '',
                'Channel Tidak boleh kosong.',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }

        daysOfWeek.forEach(function (days) {
            var rowsData = [];

            $('#schedule-table-' + days + ' tbody tr').each(function () {

                var day = $(this).find('td:eq(1)').text();
                var startHour = $(this).find('select[name^="start-time-"]:first').val();
                var startMinute = $(this).find('select[name^="start-time-"]:last').val();
                var endHour = $(this).find('select[name^="end-time-"]:first').val();
                var endMinute = $(this).find('select[name^="end-time-"]:last').val();

                var valueData = $(this).find('input[type="text"]').val();

                if (startHour != "00") {
                    // alert(onoffData);
                    rowsData.push({
                        day: day,
                        start_time: startHour + ':' + startMinute,
                        end_time: endHour + ':' + endMinute,
                        valueChannel: valueData
                    });
                }


            });
            var agentID = $('#AgentID').val();
            var name = $("#hd_sessionLogin").val();
            var channel = $("#SelectChannel").val();
            var dataToSend = {
                agent_id: agentID,
                name: channel,
                schedule: rowsData
            };
            console.log(JSON.stringify(dataToSend));
            var json;
            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/InsertMasterTrxChangeSchedule",

                data: "{TrxID:'" + JSON.stringify(rowsData) + "', TrxUserName: '" + $('#myMonth').val() + "', TrxAction: '" + $('#mySelect').val() + "', TrxActionType: 'AgentScheduleNew', Param1: '" + channel + "', Param2: '', Param3: '', Param4: ''}",
                //  data: "{TrxID:'" + JSON.stringify(dataToSend) + "', TrxUserName: '" + $("#myMonth").val() + "', TrxAction: 'INSERT', TrxActionType: 'AgentScheduleNew'}",

                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                     json = JSON.parse(data.d);
               
                    console.log(data.d);
                   

                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                },
                complete: function () {
                    // This block runs after both success or error
                    if (json.status == "Success") {
                        swal(
                            '',
                            'Data berhasil di simpan!',
                            'success'
                        ).then(function () {
                            location.reload();
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
                }
            })

           
        });
      

    });

});



function Add_NewData(AgentID, dayName) {



    var json = [{ "ID": 19, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "08:00-08:30", "startTime": "08:00", "endTime": "08:30", "className": "bg-primary", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 20, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "08:30-09:00", "startTime": "08:30", "endTime": "09:00", "className": "bg-primary", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 21, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "09:00-09:30", "startTime": "09:00", "endTime": "09:30", "className": "bg-primary", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 22, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "09:30-10:00", "startTime": "09:30", "endTime": "10:00", "className": "bg-dark", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 23, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "10:00-10:30", "startTime": "10:00", "endTime": "10:30", "className": "bg-dark", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 24, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "10:30-11:00", "startTime": "10:30", "endTime": "11:00", "className": "bg-dark", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 25, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "11:00-11:30", "startTime": "11:00", "endTime": "11:30", "className": "bg-primary", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 26, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "11:30-12:00", "startTime": "11:30", "endTime": "12:00", "className": "bg-primary", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 27, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "12:00-12:30", "startTime": "12:00", "endTime": "12:30", "className": "bg-primary", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 28, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "12:30-13:00", "startTime": "12:30", "endTime": "13:00", "className": "bg-dark", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 29, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "13:00-13:30", "startTime": "13:00", "endTime": "13:30", "className": "bg-dark", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 30, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "13:30-14:00", "startTime": "13:30", "endTime": "14:00", "className": "bg-dark", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 31, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "14:00-14:30", "startTime": "14:00", "endTime": "14:30", "className": "bg-primary", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 32, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "14:30-15:00", "startTime": "14:30", "endTime": "15:00", "className": "bg-primary", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 33, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "15:00-15:30", "startTime": "15:00", "endTime": "15:30", "className": "bg-primary", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 34, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "15:30-16:00", "startTime": "15:30", "endTime": "16:00", "className": "bg-dark", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 35, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "16:00-16:30", "startTime": "16:00", "endTime": "16:30", "className": "bg-dark", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }, { "ID": 36, "ShiftsID": "1", "AgentID": "2646", "dayName": "Friday", "title": "16:30-17:00", "startTime": "16:30", "endTime": "17:00", "className": "bg-dark", "statusTime": "OFF", "DateCreate": "\/Date(1729052871090)\/", "UserCreate": "Admin", "DateUpdate": "\/Date(1729052871090)\/", "UserUpdate": "Admin" }]

    var tbody = document.querySelector("#schedule-table-" + dayName + " tbody");
    if (!tbody) {
        console.error(`Table body not found for day: ${dayName}`);
        return;
    }

    tbody.innerHTML = '';
    var No = 1;

    // Store previously selected values
    var selectedValues = {};

    json.forEach(function (item) {
        var startHour = item.startTime.split(":")[0];
        var startMinute = item.startTime.split(":")[1];
        var endHour = item.endTime.split(":")[0];
        var endMinute = item.endTime.split(":")[1];

        // Keep track of selected values for the current row
        selectedValues[item.ID] = {
            startHour: startHour,
            startMinute: startMinute,
            endHour: endHour,
            endMinute: endMinute,
            statusTime: item.statusTime
        };

        var row = document.createElement("tr");
        row.innerHTML = `
        <td>${No++}</td>
        <td>${dayName}</td>
        <td>
            <div class="time-select">
                <select name="start-time-${dayName}-hour">
                    <option selected>${selectedValues[item.ID].startHour}</option>
                    ${Array.from({ length: 24 }, (_, i) => `<option>${String(i).padStart(2, '0')}</option>`).join('')}
                </select> : 
                <select name="start-time-${dayName}-minute">
                    <option selected>${selectedValues[item.ID].startMinute}</option>
                    <option>00</option><option>15</option><option>30</option><option>45</option>
                </select>
            </div>
        </td>
        <td>
            <div class="time-select">
                <select name="end-time-${dayName}-hour">
                    <option selected>${selectedValues[item.ID].endHour}</option>
                    ${Array.from({ length: 24 }, (_, i) => `<option>${String(i).padStart(2, '0')}</option>`).join('')}
                </select> : 
                <select name="end-time-${dayName}-minute">
                    <option selected>${selectedValues[item.ID].endMinute}</option>
                    <option>00</option><option>15</option><option>30</option><option>45</option>
                </select>
            </div>
        </td>
        <td>
            <div class="time-select">

                <input type="text" value="0"  id="value-${dayName}-${item.ID}" >
            </div>
        </td>
       
    `;

        tbody.appendChild(row);
    });

}


function LIstData() {
    var myTable = $('#DataSCH_Shift').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'MASTER', TrxActionType: 'ListSesiParam'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var buttonAction = "<a href='javascript:void(0);' onclick=\"Edit('" + json[i].ID + "')\"><i class='fas fa-edit'></i></a> | " +
                    "<a href='javascript:void(0);' onclick=\"Delete(" + json[i].ID + ")\"><i class='fas fa-trash-alt'></i></a>";

                myTable.row.add([json[i].ID, json[i].Hari, json[i].MonthName, json[i].Channel, json[i].ValueParam, buttonAction]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function Edit(Id) {

    $("#Save").hide();
    $("#Update").show();
    $("#addContactModal").modal('show');


    CleanObject()
    viewData(Id);
}

function viewData(id) {

    var myTable = $('#DataSCH_Shift').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + id + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'MASTER', TrxActionType: 'ListGroupByIdSesi'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            for (i = 0; i < json.length; i++) {
                $('#hfId').val(json[i].ID);
                $('#SelectSesi').val(json[i].Hari);
                $('#myBulan').val(json[i].Month);
                $('#mySelect').val(json[i].Channel);
                $('#Qty').val(json[i].ValueParam);

            }



        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function Delete(id) {
    const selectedData = [];

    Swal.fire({
        title: 'Are you sure?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/InsertMasterTrxChangeSchedule",
                data: "{TrxID:'" + id + "', TrxUserName: '', TrxAction: '', TrxActionType: 'DELETESesi', Param1: '', Param2: '', Param3: '', Param4: ''}",

                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, x, result = "";
                    console.log(data.d);


                    if (json.status == "Success") {
                        swal(
                            '',
                            'Data berhasil di hapus!',
                            'success'
                        ).then(function () {
                            location.reload();

                        });

                    } else {
                        swal(
                            '',
                            'Mohon maaf data melebihi dari ' + json[i].JumlahParam + ' jumlah maksimal!',
                            'error'
                        ).then(function () {
                            return false;
                        });
                        return false;
                    }


                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    swal(
                        '',
                        xmlHttpRequest.responseText,
                        'error'
                    ).then(function () {
                        return false;
                    });
                    return false;
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            })
        }
    });




    // Kirim data ke API menggunakan fetch (atau Anda bisa menggunakan axios)





}

function ActionSave() {
    const selectedData = [];


    if ($("#SelectSesi").val() == "") {
        swal(
            '',
            'Sesi Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#myBulan").val() == "") {
        swal(
            '',
            'Bulan Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }

    if ($("#mySelect").val() == "") {
        swal(
            '',
            'Channel Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Qty").val() == "") {
        swal(
            '',
            'Quantity Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }



    // Kirim data ke API menggunakan fetch (atau Anda bisa menggunakan axios)
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/InsertMasterTrxChangeSchedule",

        data: "{TrxID:'" + $('#SelectSesi').val() + "', TrxUserName: '" + $('#myBulan').val() + "', TrxAction: '" + $('#mySelect').val() + "', TrxActionType: 'InsertSesi', Param1: '" + $('#Qty').val() + "', Param2: '', Param3: '', Param4: ''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);


            if (json.status == "Success") {
                swal(
                    '',
                    'Data berhasil di input!',
                    'success'
                ).then(function () {
                    location.reload();

                });

            } else {
                swal(
                    '',
                    'Mohon maaf data melebihi dari  jumlah maksimal!',
                    'error'
                ).then(function () {
                    return false;
                });
                return false;
            }


        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            swal(
                '',
                xmlHttpRequest.responseText,
                'error'
            ).then(function () {
                return false;
            });
            return false;
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })




}

function ActionUpdate() {
    const selectedData = [];

    if ($("#SelectSesi").val() == "") {
        swal(
            '',
            'Sesi Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Date").val() == "") {
        swal(
            '',
            'date Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }

    if ($("#mySelect").val() == "") {
        swal(
            '',
            'Channel Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Qty").val() == "") {
        swal(
            '',
            'Quantity Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }


    // Kirim data ke API menggunakan fetch (atau Anda bisa menggunakan axios)
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/InsertMasterTrxChangeSchedule",

        //data: "{TrxID:'" + $('#SelectSesi').val() + "', TrxUserName: '" + $('#Date').val() + "', TrxAction: '" + $('#mySelect').val() + "', TrxActionType: 'UpdateDataSesi', Param1: '" + $('#Qty').val() + "', Param2: '" + $('#hfId').val() + "', Param3: '', Param4: ''}",
        data: "{TrxID:'" + $('#SelectSesi').val() + "', TrxUserName: '" + $('#myBulan').val() + "', TrxAction: '" + $('#mySelect').val() + "', TrxActionType: 'UpdateDataSesi', Param1: '" + $('#Qty').val() + "', Param2: '" + $('#hfId').val() + "', Param3: '', Param4: ''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);


            if (json.status == "Success") {
                swal(
                    '',
                    'Data berhasil di update!',
                    'success'
                ).then(function () {
                    location.reload();

                });

            } else {
                swal(
                    '',
                    'Mohon maaf data melebihi dari ' + json[i].JumlahParam + ' jumlah maksimal!',
                    'error'
                ).then(function () {
                    return false;
                });
                return false;
            }


        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            swal(
                '',
                xmlHttpRequest.responseText,
                'error'
            ).then(function () {
                return false;
            });
            return false;
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })




}
function GetDataChannel() {
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: JSON.stringify({
            TrxID: "",
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'MASTER',
            TrxActionType: 'LISTChannel'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (dataResponse) {
            console.log("AJAX request for days successful.");
            let channels = JSON.parse(dataResponse.d);


            $("#channelSelect").empty();

            $("#channelSelect").append('<option value="">Select a channel</option>');

            channels.forEach(function (channel) {
                $("#channelSelect").append(
                    '<option value="' + channel.ID + '">' + channel.ChannelName + '</option>'
                );
            });

            let selectedChannelId = 2; // Change this to your desired ID

            $("#channelSelect").val(selectedChannelId);







        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.error("Failed to fetch days:", xmlHttpRequest.responseText);
            alert("Error fetching days. Please try again.");
        }
    });
}


function CleanObject() {
    $("#TrxNamaMaster").val("");
    $("#cmbStatus").val("");
    $("#ContentPlaceHolder1_TrxID").val("");
}
function Tambah() {
    $("#hd_StatusAction").val('add');
    $("#addContactModalNew").modal('show');
    $("#save-schedule").show();
    $("#Update").hide();

    CleanObject();

}


