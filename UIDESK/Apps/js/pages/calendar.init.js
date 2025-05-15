document.addEventListener("DOMContentLoaded", function () {

    var messageDiv = $('#listAgent');
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
                for (i = 0; i < json.length; i++) {
                result='<div class="card-body p-4">' + 
                        '<div class="d-flex align-items-start">' + 
                            '<div class="flex-shrink-0 avatar rounded-circle me-3">' + 
                            '<img src="assets/images/users/avatar-2.jpg" alt="" class="img-fluid rounded-circle" />' + 
                            '</div>' + 
                            '<div class="flex-grow-1 overflow-hidden">' + 
                            '<h5 class="font-size-15 mb-1 text-truncate"><a href="#" class="text-dark">' + json[i].USERNAME + ' - ' + json[i].NAME + '</a></h5>' + 
                            '<p class="text-muted text-truncate mb-0">' + json[i].LEVELUSER + '</p>' +
                            '</div>' + 
                            '<div class="flex-shrink-0 dropdown">' + 
                            '<a class="text-body dropdown-toggle font-size-16" href="#" onclick="viewJadwalAgent(' + json[i].USERID + ')" role="button" data-bs-toggle="dropdown" aria-haspopup="true">' + 
                            '<i data-feather="arrow-right-circle"></i>' + 
                            '</a>' + 
                            '</div>' + 
                        '</div>' + 
                        '</div>';
                    feather.replace();
                    messageDiv.append(result);
            
                }

    },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })



});


function getChannelAgent(TanggalStart,TanggalEnd,IDnya) {
    console.log(TanggalStart);
    console.log(TanggalEnd);
    console.log(IDnya);
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + IDnya + "', TrxUserName: '" + TanggalStart + ";"+ TanggalEnd + "', TrxAction: 'LIST', TrxActionType: 'AGENTTOSHIFT'}",
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
                e = new Date,
                o = e.getMonth(),
                e = e.getFullYear();

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

            // Contoh data events dengan nama hari dan jam spesifik
            /*var eventsData = [
            {
                title: "Event on Monday",
                    dayName: "Monday",
                    startTime: "10:00", // 10:00 AM
                    endTime: "12:00",   // 12:00 PM
                    className: "bg-primary"
                    },
            {
                title: "Event on Wednesday",
                    dayName: "Wednesday",
                startTime: "14:00", // 2:00 PM
                endTime: "16:00",   // 4:00 PM
                className: "bg-warning"
                    },
            {
                title: "Event on Friday",
                    dayName: "Friday",
                startTime: "09:00", // 9:00 AM 
                endTime: "11:00",   // 11:00 AM
                className: "bg-success"
                    }
                ];*/

            /*var eventsData = [{
                title: "Event on Monday",
                dayName: "Monday",
                startTime: "09:00", // 9:00 AM 
                endTime: "11:00",   // 11:00 AM
                className: "bg-purple"
            },
            {
                title: "Event on Wednesday",
                dayName: "Wednesday",
                startTime: "09:00", // 9:00 AM 
                endTime: "11:00",   // 11:00 AM
                className: "bg-info"
            },
            {
                title: "Event on Friday",
                dayName: "Friday",
                startTime: "09:00", // 9:00 AM 
                endTime: "11:00",   // 11:00 AM
                className: "bg-success"
            },
            {
                title: "Event on Sunday",
                dayName: "Sunday",
                startTime: "06:00", // 9:00 AM 
                endTime: "10:00",   // 11:00 AM
                className: "bg-secondary"
            },
            {
                title: "Event on Tuesday",
                dayName: "Tuesday",
                startTime: "09:00", // 9:00 AM 
                endTime: "11:00",   // 11:00 AM
                className: "bg-primary"
            },
            {
                title: "Event on Thursday",
                dayName: "Thursday",
                startTime: "09:00", // 9:00 AM 
                endTime: "11:00",   // 11:00 AM
                className: "bg-dark"
            }
                ,
            {
                title: "Event on Saturday",
                dayName: "Saturday",
                startTime: "09:00", // 9:00 AM 
                endTime: "11:00",   // 11:00 AM
                className: "bg-danger"
            }
        
            ];*/

            // Periode waktu yang diinginkan (dalam bulan ini)
            var startDate = new Date(e, o, 1); // Awal bulan ini
            var endDate = new Date(e, o + 1, 0); // Akhir bulan ini// Mengonversi nama hari menjadi array event dengan tanggal yang diulang setiap minggu dalam bulan ini
            var s = [];
            eventsData.forEach(function (event) {
                var dates = getDatesByDayName(event.dayName, startDate, endDate);
                dates.forEach(function (date) {
                    var startTimeParts = event.startTime.split(":");
                    var endTimeParts = event.endTime.split(":");

                    s.push({
                        id:event.ID,
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
                        document.getElementById("event-title").value = l.title,
                        document.getElementById("event-category").value = l.classNames[0],
                        d = null,
                        t.innerText = "Edit Schedule",
                        d = null

                    console.log("Clicked" + l.classNames[0]);
                    if (l.classNames[0] == "bg-dark") {
                        n.hide()
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