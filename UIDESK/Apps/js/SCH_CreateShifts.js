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
                        var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                       // alert(onoffData);
                        rowsData.push({
                            day: day,
                            start_time: startHour + ':' + startMinute,
                            end_time: endHour + ':' + endMinute,
                            on_off: onoffData
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
                    var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                    // alert(onoffData);
                    rowsData.push({
                        day: day,
                        start_time: startHour + ':' + startMinute,
                        end_time: endHour + ':' + endMinute,
                        on_off: onoffData
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
                        var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                        // alert(onoffData);
                        rowsData.push({
                            day: day,
                            start_time: startHour + ':' + startMinute,
                            end_time: endHour + ':' + endMinute,
                            on_off: onoffData
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
                        var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                        // alert(onoffData);
                        rowsData.push({
                            day: day,
                            start_time: startHour + ':' + startMinute,
                            end_time: endHour + ':' + endMinute,
                            on_off: onoffData
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
                        var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                        // alert(onoffData);
                        rowsData.push({
                            day: day,
                            start_time: startHour + ':' + startMinute,
                            end_time: endHour + ':' + endMinute,
                            on_off: onoffData
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
                        var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
                        // alert(onoffData);
                        rowsData.push({
                            day: day,
                            start_time: startHour + ':' + startMinute,
                            end_time: endHour + ':' + endMinute,
                            on_off: onoffData
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
    //End


    $('#save-schedule-monday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-monday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            //var onoffData = $(this).find('select[name^="ONOFF-"]:last').val();
            var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();
            //var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').each(function () {
            //    // Get the name of the checkbox
            //    var name = $(this).attr('name');

            //    // Determine if the checkbox is checked
            //    var isChecked = $(this).is(':checked');

            //    // Add the name and checked state to the onoffData object
            //    onoffData[name] = isChecked;
            //});
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
                if (json[0].MessageNya == "Success") {
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

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
        
    });

    $('#save-schedule-tuesday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-tuesday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();

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
                if (json[0].MessageNya == "Success") {
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

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
       
    });

    $('#save-schedule-wednesday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-wednesday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();

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
                if (json[0].MessageNya == "Success") {
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

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
      
    });

    $('#save-schedule-thursday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-thursday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();

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
                if (json[0].MessageNya == "Success") {
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
            var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();

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
                if (json[0].MessageNya == "Success") {
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
            var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();

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
                if (json[0].MessageNya == "Success") {
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

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
       
    });

    $('#save-schedule-sunday').on('click', function () {
        var rowsData = [];

        $('#schedule-table-sunday tbody tr').each(function () {
            var day = $(this).find('td:eq(1)').text();
            var startHour = $(this).find('select[name^="start-time-"]:first').val();
            var startMinute = $(this).find('select[name^="start-time-"]:last').val();
            var endHour = $(this).find('select[name^="end-time-"]:first').val();
            var endMinute = $(this).find('select[name^="end-time-"]:last').val();
            var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();

            rowsData.push({
                day: day,
                start_time: startHour + ':' + startMinute,
                end_time: endHour + ':' + endMinute,
                on_off: onoffData
            });

            var agentID = $('#AgentID').val();
            var name = $("#hd_sessionLogin").val();
            var dataToSend = {
                agent_id: agentID,
                name: name,
                schedule: rowsData
            };

        });
       
        
       
    });


    $('#save-schedule').on('click', function () {
        var daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        daysOfWeek.forEach(function (days) {
            var rowsData = [];
            $('#schedule-table-' + days + ' tbody tr').each(function () {

                var day = $(this).find('td:eq(1)').text();
                var startHour = $(this).find('select[name^="start-time-"]:first').val();
                var startMinute = $(this).find('select[name^="start-time-"]:last').val();
                var endHour = $(this).find('select[name^="end-time-"]:first').val();
                var endMinute = $(this).find('select[name^="end-time-"]:last').val();
                var onoffData = $(this).find('input[type="checkbox"][name^="ONOFF-"]').val();

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
                    if (json[0].MessageNya == "Success") {
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

                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            })
        });
           
        });

});





function listAgent() {
    var resultHeader = "";
    var result = "";
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
                    '<input type="checkbox" class="form-check-input me-2" value="' + json[i].USERID + '"> ' + json[i].USERNAME + ' - ' + json[i].NAME + 
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
                <input type="checkbox" name="ONOFF-${dayName}" id="ONOFF-${dayName}-${item.ID}" 
                    value="${selectedValues[item.ID].statusTime}" 
                    onchange="this.value=this.checked ? 'ON' : 'OFF'" 
                    ${selectedValues[item.ID].statusTime === "ON" ? "checked" : ""}>
            </div>
        </td>
       
    `;

        tbody.appendChild(row);
    });

}

function EDIT_DataLoad(AgentID, dayName) {
    // Asumsikan ini adalah data yang diterima dari API
    /*var apiData = [
        { "ID": 124, "ShiftsID": "1", "AgentID": "2520", "dayName": "Monday", "title": "07:00-07:30", "startTime": "07:00", "endTime": "07:30", "className": "bg-primary", "statusTime": "OFF", "DateCreate": null, "UserCreate": null, "DateUpdate": null, "UserUpdate": null },
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

            if (json.length > 0) {
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
                                <select class="" name="start-time-${item.dayName}-hour">
                                    <option selected>${item.startTime.split(":")[0]}</option>
                                </select> : 
                                <select class="" name="start-time-${item.dayName}-minute">
                                    <option selected>${item.startTime.split(":")[1]}</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div class="time-select">
                                <select class="" name="end-time-${item.dayName}-hour">
                                    <option selected>${item.endTime.split(":")[0]}</option>
                                </select> : 
                                <select class="" name="end-time-${item.dayName}-minute">
                                    <option selected>${item.endTime.split(":")[1]}</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div class="time-select">
                                <input type="checkbox" name="ONOFF-${item.dayName}" id="ONOFF-${item.dayName}" value="${item.statusTime}" onchange="this.value=this.checked ? 'ON' : 'OFF'" ${item.statusTime === "ON" ? "checked" : ""}>
                            </div>
                        </td>
                        
                    `;

                    tbody.appendChild(row);
                });
            } else {
                Add_NewData(AgentID, dayName)
            }


           

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
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'VIEW'}",
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
                // var buttonAction = '<a onclick="<a onclick="Edit(' + json[i].ID + ')"><i class="fas fa-edit"></i></a>  |  <i class="fas fa-trash-alt"></i>';
                var buttonAction = `<a onclick="Edit(${json[i].ID})"><i class="fas fa-edit"></i></a> | <a onclick="Delete(${json[i].ID})"><i class="fas fa-trash-alt"></i></a>`;
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
function Tambah() {
    $("#hd_StatusAction").val('add');
    $("#addContactModal").modal('show');
    $("#AgentID").val("");
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    CleanObject()
}
function ViewData(AgentID) {

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

function Delete(AgentID) {

    swal({
        title: "Do you want to delete?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                //
                 $.ajax({
                    type: "POST",
                    url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
                    data: "{TrxID:'" + AgentID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'DELETE'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        window.location.reload();
                      

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                })
                            //
                
            } else {
                window.location.reload();
            }
        });

    //var myTable = $('#DataSCH_Shift').DataTable();
    
  
}
function TambahAgentShift() {
    $("#addAgentShift").modal('show');
}
function processAddAgents() {
    console.log($("#selectedItems").val());
    var myTable = $('#listAgentShifts').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + $("#selectedItems").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'ADD', TrxActionType: 'AgentstoShift'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);
            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {


                var buttonAction = '<i class="fas fa-edit"></i>  |  <i class="fas fa-trash-alt"></i>';
                myTable.row.add([json[i].NAME, json[i].EMAIL_ADDRESS, buttonAction]).draw(false);
            }

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