$(document).ready(function () {
    FormCleansingLoadCustomer();
    FormLoadCustomer(getParameterByName("id"))
    FormLoadJourney(getParameterByName("id"))
    FormLoadHistoryTicket(getParameterByName("id"))
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function FormLoadCustomer(CustomerID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + CustomerID + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK330'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCustomer = "";

            for (i = 0; i < json.length; i++) {
                $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].CustomerID)
                $('#ProfileDetail_NamaCustomer').append(json[i].Name)
                $('#ProfileDetail_NamaPerusahaan').append(json[i].Nama_Perusahaan)
                $('#ProfileDetail_NomorTelepon').append(json[i].HP)
                $('#ProfileDetail_Email').append(json[i].Email)
                $('#ProfileDetail_Facebook').append(json[i].Facebook)
                $('#ProfileDetail_Instagram').append(json[i].Instagram)
                $('#ProfileDetail_Twitter').append(json[i].Twitter)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function FormLoadJourney(CustomerID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: JSON.stringify({
            TrxID: CustomerID,
            TrxSearching: 'UideskIndonesia',
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'UIDESK332'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var json = JSON.parse(response.d);
            var resultSourceCustomer = "";

            $(".swiper-wrapper").empty();

            // Fungsi untuk format tanggal
            function formatDate(date) {
                var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
                var day = date.getDate();
                var month = months[date.getMonth()];
                var year = date.getFullYear().toString().slice(-2); // Ambil 2 digit terakhir dari tahun
                return `${day} ${month} ${year}`;
            }

            // Fungsi untuk format waktu
            function formatTime(date) {
                var hours = String(date.getHours()).padStart(2, '0');
                var minutes = String(date.getMinutes()).padStart(2, '0');
                var seconds = String(date.getSeconds()).padStart(2, '0');
                return `${hours}:${minutes}:${seconds}`;
            }

            for (var i = 0; i < json.length; i++) {
                var item = json[i];

                //var date = new Date(parseInt(item.DateCreate.match(/\d+/)[0]));
                //var optionsDate = { day: '2-digit', month: 'long', year: 'numeric' };
                //var formattedDate = date.toLocaleDateString('id-ID', optionsDate);

                //var optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
                //var formattedTime = date.toLocaleTimeString('id-ID', optionsTime);
                //formattedTime = formattedTime.replace(/\./g, ':');

                var date = new Date(parseInt(item.DateCreate.match(/\d+/)[0]));

                var formattedDate = formatDate(date);
                var formattedTime = formatTime(date);

                var iconValue, iconColor;
                switch (item.ValueThread) {
                    case "Call":
                        iconValue = "fas fa-phone";
                        iconColor = "danger";
                        break;
                    case "Email":
                        iconValue = "far fa-envelope";
                        iconColor = "warning";
                        break;
                    case "Facebook":
                        iconValue = "fab fa-facebook";
                        iconColor = "primary";
                        break;
                    case "Instagram":
                        iconValue = "fab fa-instagram";
                        iconColor = "primary";
                        break;
                    case "WA":
                        iconValue = "far fa-envelope";
                        iconColor = "success";
                        break;
                    case "Live Chat":
                        iconValue = "far fa-envelope";
                        iconColor = "success";
                        break;
                    default:
                        iconValue = "fab fa-viber";
                        iconColor = "success";
                        break;
                }

                resultSourceCustomer += `
                        <div class="swiper-slide" style="width: 335.25px;">
                            <div class="event-list">
                                 <div class="p-2 bg-${iconColor}">
                                    <div class="d-flex">
                                        <div class="avatar-sm align-self-center me-2">
                                            <div class="avatar-title rounded bg-transparent text-white font-size-18">
                                                <i class="${iconValue}"></i>
                                            </div>
                                        </div>
                                        <div class="overflow-hidden me-auto">
                                            <p class="font-size-13 text-white" style="margin-left: 60px; margin-top: 10px;">${formattedDate} ${formattedTime}</p>
                                        </div>
                                        <div class="ms-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
            }

            $(".swiper-wrapper").html(resultSourceCustomer);

            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 'auto',
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
function FormLoadHistoryTicket(CustomerID) {
    var myTable = $('#DataTableHistory').DataTable(
        {
            "order": [[0, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + CustomerID + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK333'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                myTable.row.add([json[i].nomor_urut, json[i].TicketSourceName, json[i].TicketNumber, json[i].SkalaPrioritas, json[i].NAME, json[i].Status ]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function FormCleansingLoadCustomer() {
    $("#ContentPlaceHolder1_TrxCustomerID").empty()
    $('#ProfileDetail_NamaCustomer').empty()
    $('#ProfileDetail_NamaPerusahaan').empty()
    $('#ProfileDetail_NomorTelepon').empty()
    $('#ProfileDetail_Email').empty()
    $('#ProfileDetail_Facebook').empty()
    $('#ProfileDetail_Instagram').empty()
    $('#ProfileDetail_Twitter').empty()
}