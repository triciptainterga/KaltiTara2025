<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="SCH_Callendar_Schedule.aspx.vb" Inherits="UIDESK.SCH_Callendar_Schedule" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- ============================================================== -->
    <!-- fullcalendar css -->
    <link href="assets/libs/fullcalendar/main.min.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <!-- Icons Css -->
    <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <!-- Icons Css -->
    <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
      <link  href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet" type="text/css">
    <style>
    .modal-xl-custom {
        max-width: 90%; /* Ubah nilai ini sesuai kebutuhan */
    }

  
    
</style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>
    <script>

        document.addEventListener('DOMContentLoaded', function () {
            document.getElementById('txtSearch').addEventListener('input', fetchAgentData);
        });
        function fetchAgentData() {

            const messageDiv = $('#listAgent');
            const searchValue = $("#txtSearch").val();
            const sessionLogin = $("#hd_sessionLogin").val();

            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
                data: "{TrxID:'" + searchValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LISTAGENT', TrxActionType: 'SEARCH'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, x, result = "";

                    console.log(data.d);
                    messageDiv.empty();
                    for (i = 0; i < json.length; i++) {
                        result = '<div class="card-body p-4">' +
                            '<div class="d-flex align-items-start">' +
                            '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                            '<img src="assets/images/users/avatar-2.jpg" alt="" class="img-fluid rounded-circle" />' +
                            '</div>' +
                            '<div class="flex-grow-1 overflow-hidden">' +
                            '<h5 class="font-size-15 mb-1 text-truncate"><a onclick="viewJadwalAgentTanggal(' + json[i].USERID + ')" class="text-dark">' + json[i].NAME + '</a></h5>' +
                            '<p class="text-muted text-truncate mb-0">' + json[i].LEVELUSER + '</p>' +
                            '</div>' +
                            '<div class="flex-shrink-0 dropdown">' +
                            '<a class="text-body dropdown-toggle font-size-16" href="#" onclick="viewJadwalAgentTanggal(' + json[i].USERID + ')" role="button" data-bs-toggle="dropdown" aria-haspopup="true">' +
                            '<i data-feather="arrow-right-circle"></i>' +
                            '</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

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
        




        document.addEventListener("DOMContentLoaded", function () {
            var images = document.querySelectorAll(".toggle-image");
            var imageStatus = {}; // Objek untuk menampung status gambar

            images.forEach(function (image) {
                // Inisialisasi status gambar di objek
                var alt = image.alt;
                imageStatus[alt] = image.getAttribute("src").includes("-on") ? "on" : "off";

                image.addEventListener("click", function () {
                    var src = image.getAttribute("src");
                    const currentAlt = image.alt;

                    if (src.includes("-on")) {
                        image.setAttribute("src", src.replace("-on", "-off"));
                        imageStatus[currentAlt] = "off"; // Update status di objek
                        console.log("Current Image Alt: " + currentAlt + "_off");
                    } else {
                        image.setAttribute("src", src.replace("-off", "-on"));
                        imageStatus[currentAlt] = "on"; // Update status di objek
                        console.log("Current Image Alt: " + currentAlt + "_on");
                    }
                });
            });

            // Menampilkan data dalam format JSON ketika tombol diklik
            document.getElementById("showDataBtn").addEventListener("click", function () {
                var textboxValue = document.getElementById("event-id").value; // Mengambil nilai dari textbox
                var textboxTime = document.getElementById("event-title").value; // Mengambil nilai dari textbox
                var textboxDate = document.getElementById("event-date").value; // Mengambil nilai dari textbox
                var textboxAgentID = document.getElementById("hd_AgentScheduleID").value; // Mengambil nilai dari textbox
                imageStatus["ShiftID"] = textboxValue;
                imageStatus["DateShift"] = textboxDate;
                imageStatus["TimeShift"] = textboxTime;
                imageStatus["AgentID"] = textboxAgentID;
                var jsonData = JSON.stringify(imageStatus, null, 2); // Mengonversi objek ke JSON
                console.log("Image Status JSON:", jsonData);

                $.ajax({
                    type: "POST",
                    url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_InsertAgentSchedule",
                    data: "{TrxID:'" + jsonData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'INSERT', TrxActionType: 'AgentScheduleChannel'}",
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

                // console.log("Image Status JSON: " + jsonData);
            });



            var messageDiv = $('#listAgent');
            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
                data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LISTAGENT', TrxActionType: 'VIEWORI'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, x, result = "";

                    console.log(data.d);
                    messageDiv.empty();
                    for (i = 0; i < json.length; i++) {
                        result = '<div class="card-body p-4">' +
                            '<div class="d-flex align-items-start">' +
                            '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                            '<img src="assets/images/users/user.png" alt="" class="img-fluid rounded-circle" />' +
                            '</div>' +
                            '<div class="flex-grow-1 overflow-hidden">' +
                            '<h5 class="font-size-15 mb-1 text-truncate"><a onclick="viewJadwalAgentTanggal(' + json[i].USERID + ')" class="text-dark">' + json[i].NAME + '</a></h5>' +
                            '<p class="text-muted text-truncate mb-0">' + json[i].LEVELUSER + '</p>' +
                            '</div>' +
                            '<div class="flex-shrink-0 dropdown">' +
                            '<a class="text-body dropdown-toggle font-size-16" href="#" onclick="viewJadwalAgentTanggal(' + json[i].USERID + ')" role="button" data-bs-toggle="dropdown" aria-haspopup="true">' +
                            '<i data-feather="arrow-right-circle"></i>' +
                            '</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

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


            //manage view untuk view agent dan admin berbeda
            if ($('#TrxLayerUser').val() == "layer 1") {
                $('#listAgent').hide();
                $('#LabelListAgent').hide();
                console.log("Layer 1");
                viewJadwalAgentTanggal($('#hd_AgentScheduleID').val());
            } else {
                $('#external-events').hide();
            }
        });


        function getChannelAgent(TanggalStart, TanggalEnd, IDnya) {
            console.log("GetTanggal");
            console.log(TanggalStart);
            console.log(TanggalEnd);
            console.log(IDnya);
            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
                data: "{TrxID:'" + $('#hd_AgentScheduleID').val() + "', TrxUserName: '" + TanggalStart + ";" + TanggalEnd + "', TrxAction: 'LIST', TrxActionType: 'AGENTTOSHIFT'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, x, result = "";

                    console.log(json);
                    // Menghapus karakter newline dan whitespace ekstra dari ChannelCode
                    json.forEach(item => {
                        item.ChannelCode = JSON.stringify(JSON.parse(item.ChannelCode));
                        console.log(item.ChannelCode);
                        var images = document.querySelectorAll(".toggle-image");
                        let channelDataX = { "call": "off", "email": "off", "fb": "on", "ig": "on", "chat": "on", "tw": "on", "wi": "on", "ShiftID": "159", "DateShift": "2024-08-31", "TimeShift": "21:30-22:00", "AgentID": "2463" };
                        let imageStatus = {}; // Inisialisasi objek untuk menyimpan status gambar
                        let channelData = JSON.parse(item.ChannelCode);
                        // Atur gambar berdasarkan status dari channelData
                        if (item.ChannelCode == "null") {
                            console.log("aaa");
                            let channelDataOff = {
                                "call": "on",
                                "email": null, // Contoh channel dengan null
                                "fb": "on",
                                "ig": "on",
                                "chat": "on",
                                "tw": "on",
                                "wi": "on"
                            };

                            images.forEach(function (image) {
                                var alt = image.alt;
                                var statusX = channelDataOff[alt]; // Ambil status dari channelData
                                image.setAttribute("src", image.getAttribute("src").replace("-on", "-off"));
                                imageStatus[alt] = "off"; // Simpan status sebagai "off"
                            });
                        } else {
                            images.forEach(function (image) {
                                var alt = image.alt;
                                var status = channelData[alt]; // Ambil status dari channelData
                                console.log("kabar" + status)
                                if (status === "on") {
                                    image.setAttribute("src", image.getAttribute("src").replace("-off", "-on"));
                                    imageStatus[alt] = "on"; // Simpan status sebagai "on"
                                } else {
                                    image.setAttribute("src", image.getAttribute("src").replace("-on", "-off"));
                                    imageStatus[alt] = "off"; // Simpan status sebagai "off"
                                }

                                imageStatus[alt] = status; // Simpan status di imageStatus
                            });
                        }


                    });


                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });

        }
        function ActionFormExtend() {
            var imageStatus = {};
            imageStatus["agentid"] = $('#hd_AgentScheduleID').val();
            imageStatus["keyname"] = $('#Form_Keyname').val();
            imageStatus["alasan"] = $('#Form_Alasan').val();
            imageStatus["startdate"] = $('#Form_startDate').val();
            imageStatus["enddate"] = $('#Form_endDate').val();
            imageStatus["classname"] = 'bg-danger';
            var jsonData = JSON.stringify(imageStatus, null, 2); // Mengonversi objek ke JSON
            console.log("Form Extend JSON:", jsonData);
            console.log($('#Form_Keyname').val());
            console.log($('#Form_Alasan').val());
            console.log($('#Form_startDate').val());
            console.log($('#Form_endDate').val());

            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_InsertAgentSchedule",
                data: "{TrxID:'" + jsonData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'INSERT', TrxActionType: 'AgentChangeSchedule'}",
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


        }

        function viewJadwalAgentTanggal(AgentID) {

            $("#hd_AgentScheduleID").val(AgentID)


            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                timeZone: 'local',
                dateClick: function (info) {

                    // Get all values from dateClick event
                    console.log('Date Clicked: ', info.dateStr);
                    console.log('Date Object: ', info.date);
                    console.log('All Event Info: ', info);
                    //$('#eventModal').modal('show');
                    $('#eventIzinCuti').modal('show');
                },
                events: function (fetchInfo, successCallback, failureCallback) {
                    $.ajax({
                        type: "POST",
                        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
                        data: "{TrxID:'" + AgentID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'DETAILTANGGAL'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            json = JSON.parse(data.d);
                            console.log(json);
                            var eventsNya = json;

                            // Mapping data JSON ke event FullCalendar menggunakan dayName sebagai tanggal event
                            var mappedEvents = eventsNya.map(function (event) {
                                return {
                                    id: event.ID,
                                    title: event.title,
                                    start: event.dayName,  // Menggunakan dayName sebagai start date
                                    end: event.dayName,    // Menggunakan dayName sebagai end date (jika diperlukan)
                                    className: event.className
                                };
                            });

                            successCallback(mappedEvents);
                        },
                        error: function (xhr, status, error) {
                            console.error("Error: " + status + " " + error);
                            failureCallback(error);
                        }
                    });
                },
                eventClick: function (info) {
                    // Ambil data event yang diklik
                    var clickedDateNya = info.event.startStr;
                    var dateNya = clickedDateNya;
                    var clickedDate = dateNya.substring(0, 10);


                    var eventObj = info.event;
                    console.log("Event Clicked:", clickedDate);
                    var eventDate = new Date(clickedDate);
                    var dayName = eventDate.toLocaleDateString('en-US', { weekday: 'long' });
                    //alert('Nama Hari: ' + dayName);
                    // Isi form di modal dengan data dari event
                    document.getElementById('eventTitle').value = eventObj.title;
                    document.getElementById('eventStart').value = clickedDate;
                    document.getElementById('eventEnd').value = eventObj.end ? eventObj.end.toISOString().substring(0, 10) : '';
                    $('#eventModal').modal('show');
                }
            });

            calendar.render();


        }

        function viewJadwalAgent(AgentID) {
            var json = "";

            document.getElementById("hd_AgentScheduleID").value = AgentID;
            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
                data: "{TrxID:'" + AgentID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'DETAIL'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    json = JSON.parse(data.d);
                    console.log(json);
                    var eventsData = json;



                    var n = new bootstrap.Modal(document.getElementById("event-modal"), {
                        keyboard: !1
                    }),
                        t = (document.getElementById("event-modal"), document.getElementById("modal-title")),
                        a = document.getElementById("form-event"),
                        l = null,
                        d = null,
                        i = document.getElementsByClassName("needs-validation"),
                        l = null,
                        d = null,
                        e = new Date,
                        s = e.getDate(),
                        o = e.getMonth(),
                        e = e.getFullYear(),
                        s = (new FullCalendar.Draggable(document.getElementById("external-events"), {
                            itemSelector: ".external-event",
                            eventData: function (e) {
                                return {
                                    title: e.innerText,
                                    start: new Date,
                                    className: e.getAttribute("data-class")
                                }
                            }
                        }));

                    // Fungsi untuk mengonversi nama hari menjadi array tanggal-tanggal dalam bulan ini
                    function getDatesByDayName(dayName, startDate, endDate) {
                        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        var dayIndex = days.indexOf(dayName);

                        var dates = [];
                        var currentDate = new Date(startDate);

                        // Maju ke minggu pertama yang mengandung hari yang diinginkan
                        currentDate.setDate(currentDate.getDate() + (dayIndex - currentDate.getDay()));

                        // Loop sampai akhir bulan
                        while (currentDate <= endDate) {
                            if (currentDate.getMonth() === startDate.getMonth()) {
                                dates.push(new Date(currentDate));
                            }
                            currentDate.setDate(currentDate.getDate() + 7);  // Lompat ke minggu berikutnya
                        }
                        return dates;
                    }



                    // Periode waktu yang diinginkan (dalam bulan ini)
                    var startDate = new Date(e, o, 1); // Awal bulan ini
                    var endDate = new Date(e, o + 1, 0); // Akhir bulan ini// Mengonversi nama hari menjadi array event dengan tanggal yang diulang setiap minggu dalam bulan ini
                    var s = [];
                    eventsData.forEach(function (event) {
                        //var dates = getDatesByDayName(event.dayName, startDate, endDate);
                        var dates = [];

                        //if (event.start) {
                        //    // Jika 'start' terisi, gunakan 'start' sebagai tanggal
                        //    dates.push(new Date(event.start));
                        //} else {
                        //    // Jika 'start' tidak terisi, gunakan 'dayName'
                        //    dates = getDatesByDayName(event.dayName, startDate, endDate);
                        //}
                        if (event.start && event.end) {
                            // Jika 'start' dan 'end' terisi, gunakan rentang tanggal tersebut
                            var start = new Date(event.start);
                            var end = new Date(event.end);

                            while (start <= end) {
                                dates.push(new Date(start));
                                start.setDate(start.getDate() + 1); // Tambah satu hari untuk mendapatkan semua tanggal di antara start dan end
                            }
                        } else if (event.start) {
                            // Jika hanya 'start' terisi, gunakan 'start' sebagai tanggal
                            dates.push(new Date(event.start));
                        } else {
                            // Jika 'start' tidak terisi, gunakan 'dayName'
                            dates = getDatesByDayName(event.dayName, startDate, endDate);
                        }

                        dates.forEach(function (date) {
                            var startTimeParts = event.startTime.split(":");
                            var endTimeParts = event.endTime.split(":");

                            s.push({
                                id: event.ID,
                                title: event.title,
                                start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), startTimeParts[0], startTimeParts[1]),
                                end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), endTimeParts[0], endTimeParts[1]),
                                className: event.className,
                                dataLengkap: event.ChannelCode
                            });
                        });
                    });

                    var e = document.getElementById("calendar");

                    function r(e) {
                        n.show(), a.classList.remove("was-validated"), a.reset(), l = null, t.innerText = "Add Event", d = e
                    }

                    function c() {
                        return 768 <= window.innerWidth && window.innerWidth < 1200 ? "timeGridWeek" : window.innerWidth <= 768 ? "listMonth" : "dayGridMonth"
                    }

                    var m = new FullCalendar.Calendar(e, {
                        timeZone: "local",
                        editable: !0,
                        droppable: !0,
                        selectable: !0,
                        initialView: c(),
                        themeSystem: "bootstrap",
                        headerToolbar: {
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                        },
                        windowResize: function (e) {
                            var t = c();
                            m.changeView(t)
                        },
                        eventDidMount: function (e) {
                            "done" === e.event.extendedProps.status && (e.el.style.backgroundColor = "red", (e = e.el.getElementsByClassName("fc-event-dot")[0]) && (e.style.backgroundColor = "white"))
                        },
                        eventClick: function (e) {
                            console.log("click date 1");

                            // Ambil tanggal yang diklik
                            //var clickedDate = e.event.start.toISOString().split('T')[0];
                            var clickedDateNya = e.event.startStr;
                            var dateNya = clickedDateNya;
                            var clickedDate = dateNya.substring(0, 10);

                            var dataLengkapNya = e.event.dataLengkap;

                            console.log(dataLengkapNya); // Output: "2024-08-13"
                            // atau bisa menggunakan e.event.start untuk mendapatkan objek Date
                            var timeRange = e.event.title;
                            var times = timeRange.split("-");

                            var startTimeNya = times[0]; // "21:00"
                            var endTimeNya = times[1];   // "21:30"

                            getChannelAgent(clickedDate + ' ' + startTimeNya, clickedDate + ' ' + endTimeNya, e.event.id);
                            // Menampilkan tanggal yang diklik
                            //console.log("Clicked Date:", e.event.className[0]);
                            //a.reset(),
                            document.getElementById("event-title").value[0] = "",
                                l = e.event,
                                document.getElementById("event-date").value = clickedDate,
                                document.getElementById("event-id").value = e.event.id,
                                //document.getElementById("event-title").value = l.title,
                                document.getElementById("event-title").value = "08:00-17:00",
                                document.getElementById("event-category").value = l.classNames[0],
                                d = null,
                                t.innerText = "Edit Schedule",
                                d = null

                            console.log("Clicked " + l.title);
                            if (l.classNames[0] == "bg-dark" || l.classNames[0] == "bg-danger" || l.classNames[0] == "bg-warning") {
                                if (l.title == "CUTI" || l.title == "Cuti") {
                                    n.hide()
                                    $("#modal-followup").modal('show');

                                    $("#Form_Keyname").val(l.title);
                                } else if (l.title == "TRAINING") {
                                    n.show()
                                    //$("#modal-training").modal('show');
                                    //$("#Form_Keyname").val(l.title);
                                } else {
                                    n.hide()
                                }

                            } else {
                                n.show()
                            }
                        },

                        events: s,
                        dayCellDidMount: function (info) {
                            var today = new Date();
                            var cellDate = info.date;
                            //Sementara ini di komen untuk data sample dulu
                            // Membandingkan tanggal sel dengan hari ini
                            /*if (cellDate < today.setHours(0, 0, 0, 0)) {
                                // Tambahkan kelas 'readonly' untuk tanggal yang sudah lewat
                                info.el.classList.add('readonly-day');
                                // Menonaktifkan klik pada hari yang sudah lewat
                                info.el.style.pointerEvents = 'none';
                                info.el.style.backgroundColor = '#e9ecef'; // Opsional, untuk memberi tanda
                                info.el.style.color = '#6c757d'; // Opsional, untuk memberi tanda
                            }*/
                        }
                    });
                    m.render(), a.addEventListener("submit", function (e) {
                        e.preventDefault();
                        var e = document.getElementById("event-title").value,
                            t = document.getElementById("event-category").value;
                        !1 === i[0].checkValidity() ? i[0].classList.add("was-validated") : (l ? (l.setProp("title", e), l.setProp("classNames", [t])) : (e = {
                            title: e,
                            start: d.date,
                            allDay: d.allDay,
                            className: t
                        }, m.addEvent(e)), n.hide())
                    }), document.getElementById("btn-delete-event").addEventListener("click", function (e) {
                        l && (l.remove(), (l = null).hide())
                    }), document.getElementById("btn-new-event").addEventListener("click", function (e) {
                        r({
                            date: new Date,
                            allDay: !0
                        })
                    })
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }
    </script>
    <asp:HiddenField ID="hd_DateRequest" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hd_AgentTarget" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hd_DateChangeTarget" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hd_JamRequest" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hd_JamTarget" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hd_ChannelTarget" ClientIDMode="Static" runat="server" />
    <div>
        <div class="container-fluid">

            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-flex align-items-center justify-content-between">
                        <h4 class="mb-0">Agent Scheduling</h4>

                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Apps</a></li>
                                <li class="breadcrumb-item active">Calendar</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <!-- end col-->

                        <div class="col-xl-3">

                            <div class="card card-h-100">
                                <div class="card-body" id="external-events">

                                    <div >
                                        <div class="chat-message-list widget-chat-list" data-simplebar>
                                            <div class="px-4">
                                                <ul class="list-unstyled chat-list" id="chat-list"></ul>
                                            </div>
                                        </div>
                                        <%--     <br>
                                                    <p class="text-muted">Drag and drop your event or click in the calendar</p>
                                                    <div class="external-event fc-event bg-success" data-class="bg-success">
                                                        <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>SURATTUGAS
                                                    </div>
                                                    <div class="external-event fc-event bg-info" data-class="bg-info">
                                                        <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>IZIN
                                                    </div>
                                                    <div class="external-event fc-event bg-warning" data-class="bg-warning">
                                                        <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>TRAINING
                                                    </div>
                                                    <div class="external-event fc-event bg-danger" data-class="bg-danger">
                                                        <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>CUTI
                                                    </div>--%>
                                    </div>

                                </div>
                                <div class="card-body">
                                    <!--Start Contact-->
                                     <p id="LabelListAgent">List Agent </p>
                                    <input type="text" class="form-control" id="txtSearch" placeholder="Key">
                                   

                                    <div id="listAgent"></div>

                                    <!--<div class="card-body p-4">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 avatar rounded-circle me-3">
                                                            <img src="assets/images/users/avatar-2.jpg" alt=""
                                                                class="img-fluid rounded-circle">
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="font-size-15 mb-1 text-truncate"><a
                                                                    href="pages-profile.html" class="text-dark">Philip
                                                                    Theroux</a></h5>
                                                            <p class="text-muted text-truncate mb-0">UI/UX Designer</p>
                                                        </div>
                                                        <div class="flex-shrink-0 dropdown">
                                                            <a class="text-body dropdown-toggle font-size-16" href="#"
                                                                role="button" data-bs-toggle="dropdown"
                                                                aria-haspopup="true">
                                                                <i class="icon-xs" data-feather="more-horizontal"></i>
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Action</a>
                                                                <a class="dropdown-item" href="#">Remove</a>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                                <div class="card-body p-4">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 avatar rounded-circle me-3">
                                                            <img src="assets/images/users/avatar-2.jpg" alt=""
                                                                class="img-fluid rounded-circle">
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="font-size-15 mb-1 text-truncate"><a
                                                                    href="pages-profile.html" class="text-dark">Philip
                                                                    Theroux</a></h5>
                                                            <p class="text-muted text-truncate mb-0">UI/UX Designer</p>
                                                        </div>
                                                        <div class="flex-shrink-0 dropdown">
                                                            <a class="text-body dropdown-toggle font-size-16" href="#"
                                                                role="button" data-bs-toggle="dropdown"
                                                                aria-haspopup="true">
                                                                <i class="icon-xs" data-feather="more-horizontal"></i>
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Action</a>
                                                                <a class="dropdown-item" href="#">Remove</a>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                                <div class="card-body p-4">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 avatar rounded-circle me-3">
                                                            <img src="assets/images/users/avatar-2.jpg" alt=""
                                                                class="img-fluid rounded-circle">
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="font-size-15 mb-1 text-truncate"><a
                                                                    href="pages-profile.html" class="text-dark">Philip
                                                                    Theroux</a></h5>
                                                            <p class="text-muted text-truncate mb-0">UI/UX Designer</p>
                                                        </div>
                                                        <div class="flex-shrink-0 dropdown">
                                                            <a class="text-body dropdown-toggle font-size-16" href="#"
                                                                role="button" data-bs-toggle="dropdown"
                                                                aria-haspopup="true">
                                                                <i class="icon-xs" data-feather="more-horizontal"></i>
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Action</a>
                                                                <a class="dropdown-item" href="#">Remove</a>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                                <div class="card-body p-4">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 avatar rounded-circle me-3">
                                                            <img src="assets/images/users/avatar-2.jpg" alt=""
                                                                class="img-fluid rounded-circle">
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="font-size-15 mb-1 text-truncate"><a
                                                                    href="pages-profile.html" class="text-dark">Philip
                                                                    Theroux</a></h5>
                                                            <p class="text-muted text-truncate mb-0">UI/UX Designer</p>
                                                        </div>
                                                        <div class="flex-shrink-0 dropdown">
                                                            <a class="text-body dropdown-toggle font-size-16" href="#"
                                                                role="button" data-bs-toggle="dropdown"
                                                                aria-haspopup="true">
                                                                <i class="icon-xs" data-feather="more-horizontal"></i>
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Action</a>
                                                                <a class="dropdown-item" href="#">Remove</a>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                                <div class="card-body p-4">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 avatar rounded-circle me-3">
                                                            <img src="assets/images/users/avatar-2.jpg" alt=""
                                                                class="img-fluid rounded-circle">
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="font-size-15 mb-1 text-truncate"><a
                                                                    href="pages-profile.html" class="text-dark">Philip
                                                                    Theroux</a></h5>
                                                            <p class="text-muted text-truncate mb-0">UI/UX Designer</p>
                                                        </div>
                                                        <div class="flex-shrink-0 dropdown">
                                                            <a class="text-body dropdown-toggle font-size-16" href="#"
                                                                role="button" data-bs-toggle="dropdown"
                                                                aria-haspopup="true">
                                                                <i class="icon-xs" data-feather="more-horizontal"></i>
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Action</a>
                                                                <a class="dropdown-item" href="#">Remove</a>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                                <div class="card-body p-4">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 avatar rounded-circle me-3">
                                                            <img src="assets/images/users/avatar-2.jpg" alt=""
                                                                class="img-fluid rounded-circle">
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="font-size-15 mb-1 text-truncate"><a
                                                                    href="pages-profile.html" class="text-dark">Philip
                                                                    Theroux</a></h5>
                                                            <p class="text-muted text-truncate mb-0">UI/UX Designer</p>
                                                        </div>
                                                        <div class="flex-shrink-0 dropdown">
                                                            <a class="text-body dropdown-toggle font-size-16" href="#"
                                                                role="button" data-bs-toggle="dropdown"
                                                                aria-haspopup="true">
                                                                <i class="icon-xs" data-feather="more-horizontal"></i>
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <a class="dropdown-item" href="#">Edit</a>
                                                                <a class="dropdown-item" href="#">Action</a>
                                                                <a class="dropdown-item" href="#">Remove</a>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                -->
                                    <!--  end card -->
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-9">
                            <div class="card card-h-100">
                                <div class="card-body">
                                    <div id="calendar"></div>
                                </div>
                            </div>
                        </div>
                        <!-- end col -->
                    </div>

                    <div style='clear: both'></div>

                    <!-- Add New Event MODAL Channel Assign-->
                    <div class="modal fade" id="event-modal" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header py-3 px-4 border-bottom-0">
                                    <h5 class="modal-title" id="modal-title">Event</h5>

                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-hidden="true">
                                    </button>

                                </div>
                                <div class="modal-body p-4">
                                    <form class="needs-validation" name="event-form" id="form-event" novalidate>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Shift ID</label>
                                                    <input class="form-control" placeholder="ShiftID"
                                                        type="text" name="title" id="event-id" required value="" />

                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Shift Date</label>
                                                    <input class="form-control" placeholder="Shift Date"
                                                        type="text" name="title" id="event-date" required value="" />

                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Shift Name</label>
                                                    <input class="form-control" placeholder="Insert Shift Name"
                                                        type="text" name="title" id="event-title" required value="" />
                                                    <div class="invalid-feedback">Please provide a valid event name</div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Channel</label>
                                                    <div class="row">
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/call-off.png" alt="call" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/email-off.png" alt="email" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/fb-off.png" alt="fb" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/ig-off.png" alt="ig" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/chat-off.png" alt="chat" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/tw-off.png" alt="tw" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/wi-off.png" alt="wi" width="32" class="toggle-image">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Category</label>
                                                    <select class="form-select shadow-none" name="category"
                                                        id="event-category" required>
                                                        <option value="bg-danger" selected>Danger</option>
                                                        <option value="bg-success">Success</option>
                                                        <option value="bg-primary">Primary</option>
                                                        <option value="bg-info">Info</option>
                                                        <option value="bg-dark">Dark</option>
                                                        <option value="bg-purple">Purple</option>
                                                        <option value="bg-warning">Warning</option>
                                                    </select>
                                                    <div class="invalid-feedback">Please select a valid event category</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-6">
                                                <a class="btn btn-danger" id="btn-delete-event">Delete</a>
                                            </div>
                                            <div class="col-6 text-end">
                                                <a class="btn btn-light me-1" data-bs-dismiss="modal">Close</a>
                                                <a class="btn btn-success" id="showDataBtn">Save</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- end modal-content-->
                        </div>
                        <!-- end modal dialog-->
                    </div>
                    <!-- end modal-->

                    <!-- New Modal-->
                    <!-- Modal HTML -->
                    <div class="modal fade bs-example-modal-xl" id="eventModal" tabindex="-1" role="dialog" aria-labelledby="eventModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-fullscreen" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="eventModalLabel">Schedule Details</h5>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                    <div class="form-group">
                                        <label for="eventTitle">Channel</label>
                                        <input type="text" class="form-control" id="eventTitle" readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="eventStart">Date</label>
                                        <input type="text" class="form-control" id="eventStart" readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="eventStart">Change To</label>
                                        <select class="form-select" id="ChoiceChangeType" aria-label="Floating label select example">
                                            <option selected>Please choice one : </option>
                                            <option value="CDSC">Change Days Same Channel</option>
                                            <option value="CDOC">Change Days Other Channel</option>
                                            <option value="CS">Change Session</option>
                                        </select>
                                    </div>
                                    <div class="form-group" style="display: none;">
                                        <label for="eventEnd">End Date</label>
                                        <input type="text" class="form-control" id="eventEnd" readonly>
                                    </div>
                                    <!-- Tambahkan input lain yang diperlukan -->
                                    <div class="mt-5" style="display: none;" id="viewCDSC">

                                        <%--<div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="d-flex flex-wrap gap-2">
                                                                <button type="button" class="btn btn-outline-primary"><i class="uil uil-user me-2"></i>SURAT TUGAS</button>
                                                                <button type="button" class="btn btn-outline-success"><i class="uil uil-check me-2"></i> PELATIHAN</button>
                                                                <button type="button" class="btn btn-outline-warning"><i class="uil uil-exclamation-triangle me-2"></i> CUTI</button>
                                                                <button type="button" class="btn btn-outline-info"><i class="uil uil-info-circle me-2"></i> PERSIAPAN LOMBA</button>
                                                         
                                                            </div>
                                                        </div>
                                                    </div>--%>
                                        <div class="row">
                                            <div class="col-lg-4">

                                                <div class="table-responsive">
                                                    <table class="table align-middle table-nowrap table-check">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" style="width: 50px;">
                                                                    <div class="form-check font-size-16">

                                                                        <label class="form-check-label" for="checkAll"></label>
                                                                    </div>
                                                                </th>
                                                                <th scope="col">
                                                                    <h2>List Agent</h2>
                                                                </th>

                                                            </tr>
                                                            <!-- end tr -->
                                                        </thead>
                                                        <!-- end thead -->
                                                        <tbody id="tglviewCDSC">
                                                            <!-- Data akan dimuat di sini -->
                                                        </tbody>

                                                    </table>
                                                    <!-- end table -->
                                                </div>
                                                <!-- end table responsive -->


                                            </div>
                                            <div class="col-lg-4">

                                                <table class="table align-middle table-nowrap table-check">
                                                    <thead>
                                                        <tr>
                                                            <th colspan="3">
                                                                <h2>Friend Schedule</h2>
                                                            </th>
                                                        </tr>
                                                        <tr>

                                                            <th>Start Time</th>
                                                            <th>End Time</th>
                                                            <!--<th>Class Name</th>-->
                                                            <th>Status Time</th>
                                                            <!--<th>Change Schedule</th>-->
                                                        </tr>
                                                    </thead>
                                                    <tbody id="shiftTableFriendBody">
                                                        <!-- Data akan dimuat di sini -->
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="container mt-5" id="formCutiCDSC" style="display: none;">
                                                    <div class="form-group">
                                                        <label for="jenisCuti">Jenis Cuti</label>
                                                        <select class="form-control" id="jenisCutiDays">
                                                            <option value="" disabled selected>Pilih jenis cuti</option>
                                                            <option value="ST">Surat Tugas</option>
                                                            <option value="PJJ">Pelatihan</option>
                                                            <option value="CUTI">Cuti</option>
                                                            <option value="LOMBA">Persiapan Lomba</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="alasan">Alasan Cuti</label>
                                                        <textarea class="form-control" id="alasanDays" rows="3" placeholder="Masukkan alasan cuti"></textarea>
                                                    </div>
                                                    <br />
                                                    <a onclick="submitDays()" class="btn btn-primary">Prosess</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-5" style="display: none;" id="viewCDOC">

                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="d-flex flex-wrap gap-2">
                                                    <button type="button" class="btn btn-outline-primary"><i class="uil uil-user me-2"></i>SURAT TUGAS</button>
                                                    <button type="button" class="btn btn-outline-success"><i class="uil uil-check me-2"></i>PELATIHAN</button>
                                                    <button type="button" class="btn btn-outline-warning"><i class="uil uil-exclamation-triangle me-2"></i>CUTI</button>
                                                    <button type="button" class="btn btn-outline-info"><i class="uil uil-info-circle me-2"></i>PERSIAPAN LOMBA</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-5" style="display: none;" id="viewCS">

                                        <div class="mt-5"></div>
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <h2>Your Schedule</h2>
                                                <table class="table table-bordered">
                                                    <thead>
                                                        <tr>

                                                            <th>Start Time</th>
                                                            <th>End Time</th>
                                                            <!--<th>Class Name</th>-->
                                                            <th>Status Time</th>
                                                            <th>Change Schedule</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="shiftTableBody">
                                                        <!-- Data akan dimuat di sini -->
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="col-lg-3">
                                                <h2>Team Available Schedule</h2>
                                                <div class="table-responsive">
                                                    <table class="table align-middle table-nowrap table-check">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" style="width: 50px;">
                                                                    <div class="form-check font-size-16">
                                                                        <input type="checkbox" class="form-check-input" id="checkAll">
                                                                        <label class="form-check-label" for="checkAll"></label>
                                                                    </div>
                                                                </th>
                                                                <th scope="col">Name</th>


                                                            </tr>
                                                            <!-- end tr -->
                                                        </thead>
                                                        <!-- end thead -->
                                                        <tbody id="shiftTableAgentAvail">
                                                            <tr>
                                                                <th scope="row"></th>
                                                                <td>
                                                                    <%--<img src="assets/images/users/avatar-1.jpg" alt="" class="avatar-sm rounded-circle me-2">--%>
                                                                    <a href="#" class="text-body fw-medium">Empty Data </a>
                                                                    <br />
                                                                    <cite title="Source Title"></cite>
                                                                </td>
                                                            </tr>
                                                            <!-- end tr -->

                                                        </tbody>
                                                        <!-- end tbody -->
                                                    </table>
                                                    <!-- end table -->
                                                </div>
                                                <!-- end table responsive -->
                                            </div>
                                            <div class="col-lg-3">
                                                <h2>Friend Schedule</h2>
                                                <table class="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Start Time</th>
                                                            <th>End Time</th>
                                                            <th>Status Time</th>
                                                            <th>Change Schedule</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="shiftTableBodyAvail">
                                                        <!-- Data akan dimuat di sini -->
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="col-lg-3">
                                                <div class="container mt-5" id="formCutiSession" style="display: none;">
                                                    <div class="form-group">
                                                        <label for="jenisCuti">Jenis Cuti</label>
                                                        <select class="form-control" id="jenisCutiSession">
                                                            <option value="" disabled selected>Pilih jenis cuti</option>
                                                            <option value="ST">Surat Tugas</option>
                                                            <option value="PJJ">Pelatihan</option>
                                                            <option value="CUTI">Cuti</option>
                                                            <option value="LOMBA">Persiapan Lomba</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="alasan">Alasan Cuti</label>
                                                        <textarea class="form-control" id="alasanSession" rows="3" placeholder="Masukkan alasan cuti"></textarea>
                                                    </div>
                                                    <br />
                                                    <a onclick="submitSession()" class="btn btn-primary">Ajukan Cuti</a>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <!-- Tambahkan button untuk aksi lain seperti simpan -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- End -->

                    <!-- Form Cuti Modal-->
                    <%--<div class="modal fade bs-example-modal-center" id="eventIzinCuti" tabindex="-1" role="dialog"
                        aria-labelledby="mySmallModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Form Cuti-PJJ-ST-Periapan Lomba</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close">
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p>
                                        Cras mattis consectetur purus sit amet fermentum.
                                                    Cras justo odio, dapibus ac facilisis in,
                                                    egestas eget quam. Morbi leo risus, porta ac
                                                    consectetur ac, vestibulum at eros.
                                    </p>
                                    <p>
                                        Praesent commodo cursus magna, vel scelerisque
                                                    nisl consectetur et. Vivamus sagittis lacus vel
                                                    augue laoreet rutrum faucibus dolor auctor.
                                    </p>
                                    <p class="mb-0">
                                        Aenean lacinia bibendum nulla sed consectetur.
                                                    Praesent commodo cursus magna, vel scelerisque
                                                    nisl consectetur et. Donec sed odio dui. Donec
                                                    ullamcorper nulla non metus auctor
                                                    fringilla.
                                    </p>
                                </div>
                            </div>
                            <!-- /.modal-content -->
                        </div>--%>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->
                    <!-- End -->
                </div>
            </div>

        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->

    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-followup"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabelfollow">Form Cuti</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="workexperience-category-input">Key Name</label>
                                    <input type="text" class="form-control" id="Form_Keyname" placeholder="Key">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="workexperience-category-input">Alasan</label>
                                    <input type="text" class="form-control" id="Form_Alasan" placeholder="Alasan">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <div class="form-group">
                                        <label for="startDate">Start Date</label>
                                        <input type="date" class="form-control" id="Form_startDate" name="startDate">
                                    </div>
                                    <div class="form-group">
                                        <label for="endDate">End Date</label>
                                        <input type="date" class="form-control" id="Form_endDate" name="endDate">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionFormExtend()" id="ActionSimpanFormExtend">Submit</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-training"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModaltraining">Form Training</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="workexperience-category-input">Key Name</label>
                                    <input type="text" class="form-control" id="Form_Keyname" placeholder="Key">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="workexperience-category-input">Alasan</label>
                                    <input type="text" class="form-control" id="Form_Alasan" placeholder="Alasan">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <div class="form-group">
                                        <label for="startDate">Start Date</label>
                                        <input type="date" class="form-control" id="Form_startDate" name="startDate">
                                    </div>
                                    <div class="form-group">
                                        <label for="endDate">End Date</label>
                                        <input type="date" class="form-control" id="Form_endDate" name="endDate">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionFormExtend()" id="ActionSimpanFormExtend">Submit</button>
                </div>
            </div>
        </div>
    </div>

   <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="list-training"
     aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-xl-custom"> <!-- Tambahkan kelas kustom di sini -->
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">List Data Agent</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-6">
                    <div class="row">
                        <!-- end col-->
                        <div class="card card-h-100">
                            <div class="card-body">
                                <%--<div class="col-12">
                                    <h2>Jadwal Awal</h2>
                                      <i class="fa fa-arrow-right fa-1x" aria-hidden="true"></i>
                                </div>--%>
                                <div class="row">
                                    <div class="col-11">
                                        <h2>Jadwal Awal</h2>
                                    </div>
                                    <div class="col-1 text-end">
                                        <i class="fa fa-arrow-right fa-3x custom-icon1" aria-hidden="true"></i>
                                    </div>
                                </div>

                                <table id="tableAgentRequest" class="table table-responsive">
                                    <thead>
                                        <tr>

                                            <th class="hide-column">ID</th>
                                            <th class="hide-column">Agent ID</th>
                                            <th>AgentName</th>
                                            <th>dayName</th>
                                            <th>DateScheduled</th>
                                            <th>StartTime</th>
                                            <th>EndTime</th>
                                            <th>StatusTime</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>

                                <div class="row">
                                    <div class="col-11">
                                        <h2>Mendapatkan Jadwal</h2>
                                    </div>
                                    <div class="col-1 text-end">
                                        <i class="fa fa-arrow-left fa-3x custom-icon2" aria-hidden="true"></i>
                                    </div>
                                </div>


                                <table id="tableTargetChange" class="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th class="hide-column">ID</th>
                                            <th class="hide-column">Agent ID</th>
                                            <th>AgentName</th>
                                            <th>dayName</th>
                                            <th>DateScheduled</th>
                                            <th>StartTime</th>
                                            <th>EndTime</th>

                                            <th>StatusTime</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>


                            </div>
                        </div>
                    </div>
                </div>




                <div class="col-6">
                    <div class="row">
                        <!-- end col-->
                        <div class="card card-h-100">
                            <div class="card-body">


                                <div class="col-11">
                                    <h2>Permintaan Tukar</h2>
                                </div>

                                <table id="tableAgentTarget" class="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th class="hide-column">ID</th>
                                            <th class="hide-column">Agent ID</th>
                                            <th>AgentName</th>
                                            <th>dayName</th>
                                            <th>DateScheduled</th>
                                            <th>StartTime</th>
                                            <th>EndTime</th>

                                            <th>StatusTime</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>

                                <h2>Menyesuaikan Jadwal</h2>

                                <table id="tableTargetRequest" class="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th class="hide-column">ID</th>
                                            <th class="hide-column">Agent ID</th>
                                            <th>AgentName</th>
                                            <th>dayName</th>
                                            <th>DateScheduled</th>
                                            <th>StartTime</th>
                                            <th>EndTime</th>

                                            <th>StatusTime</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>

               
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


    <!-- plugin js -->
    <script src="assets/libs/fullcalendar/main.min.js"></script>s
    <script src="assets/libs/feather-icons/feather.min.js"></script>

    <!-- Calendar init -->
    <script src="js/SCH_Callendar_Schedule.js"></script>


    <!-- end main content-->
</asp:Content>

