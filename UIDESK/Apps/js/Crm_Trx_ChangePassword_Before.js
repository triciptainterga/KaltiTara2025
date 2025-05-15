$(document).ready(function () {
    fetchCustomerData();
    startCountdown();
    injectCustomCSS();
});
function ModalChangePassword() {
    $("#ContactModalPassword").modal('show');
}
function ActionSubmit() {
    if ($("#hd_sessionLogin").val() == '') {
        swal(
            '',
            'Session is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ChangePassword").val() == '') {
        swal(
            '',
            'Password is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ChangeNewPassword").val() == '') {
        swal(
            '',
            'New password is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        var passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
        if ($("#ChangeNewPassword").val().match(passwordformat)) {
        } else {
            swal(
                '',
                'Format password is not valid',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#ChangeNewPassword").val() != $("#ChangeConfirmPassword").val()) {
        swal(
            '',
            'New password is not match',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ChangeConfirmPassword").val() == '') {
        swal(
            '',
            'Confirm password is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        var passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
        if ($("#ChangeConfirmPassword").val().match(passwordformat)) {
        } else {
            swal(
                '',
                'Format password is not valid',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxPassword: $("#ChangePassword").val(), TrxNewPassword: $("#ChangeNewPassword").val(), TrxUserCreated: $("#hd_sessionLogin").val() });
                $.ajax({
                    type: "POST",
                    url: "asmx/Crm_Trx_ChangePassword.asmx/ChangePassword",
                    data: form_data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result === 'True') {
                                swal(
                                    '',
                                    'Change Password Success',
                                    'success'
                                ).then(function () {
                                    $("#ChangePassword").val("");
                                    $("#ChangeNewPassword").val("")
                                    $("#ChangeConfirmPassword").val("")
                                    location.href = "../auth_login.aspx";
                                });

                            } else {
                                swal(
                                    '',
                                    'Change Password Failed !',
                                    'error'
                                ).then(function () {
                                    $("#ContactModalPassword").modal('hide')
                                    return false;
                                });
                                return false;
                            }

                        }
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });

            }
        });
}
function EyePassword() {
    var temp = document.getElementById("ChangePassword");
    if (temp.type === "password") {
        temp.type = "text";
    }
    else {
        temp.type = "password";
    }
}
function EyeNewPassword() {
    var temp = document.getElementById("ChangeNewPassword");
    if (temp.type === "password") {
        temp.type = "text";
    }
    else {
        temp.type = "password";
    }
}
function EyeConfirmPassword() {
    var temp = document.getElementById("ChangeConfirmPassword");
    if (temp.type === "password") {
        temp.type = "text";
    }
    else {
        temp.type = "password";
    }
}
function fetchCustomerData() {
    const url = 'WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket'; // Ganti dengan URL API yang sesuai
    const requestData = {
        TrxID: "0",
        TrxSearching: 'UideskIndonesia',
        TrxUserName: $("#hd_sessionLogin").val(),
        TrxAction: 'UIDESK334'
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            const json = JSON.parse(data.d); // Menguraikan data yang diterima
            updateDropdownMenu(json); // Memperbarui dropdown menu
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
function updateDropdownMenu(data) {
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = ''; // Clear existing items

    data.forEach(item => {
        const url = `Crm_Trx_Ticket_System.aspx?id=${item.CustomerID}&channel=${item.ValueThread}&n=1&threadid=${item.ThreadID}&numberid=${item.GenesysNumber}&account=${item.Account}&title=${encodeURIComponent(item.ValueThread)}`;
        const listItem = `
            <a href="${url}" class="text-reset notification-item">
                <div class="d-flex border-bottom align-items-start">
                    <div class="flex-shrink-0">
                        <div class="avatar-sm me-3">
                            <span class="avatar-title ${getAvatarClass(item.ValueThread)} rounded-circle font-size-16">
                                <i class="${getIconClass(item.ValueThread)}"></i>
                            </span>
                        </div>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.Account}</h6>
                        <div class="text-muted">
                            <p class="mb-0 font-size-10 text-uppercase fw-bold">
                                <i class="mdi mdi-clock-outline"></i>${formatTimeAgo(item.DateCreate)}
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        `;
        notificationList.insertAdjacentHTML('beforeend', listItem);
    });
}

// Helper functions
function getAvatarClass(sourceName) {
    switch (sourceName) {
        case 'Email': return 'bg-warning';
        case 'Call':
        case 'call': return 'bg-danger';
        case 'Instagram': return 'bg-primary';
        case 'Facebook': return 'bg-primary';
        case 'Whatsapp':
        case 'WhatsApp': return 'bg-success';
        case 'Twitter': return 'bg-primary';
        default: return 'bg-secondary';
    }
}

function getIconClass(sourceName) {
    switch (sourceName) {
        case 'Email': return 'bx bx-envelope';
        case 'Call':
        case 'call': return 'bx bx-phone-incoming';
        case 'Instagram': return 'bx bxl-instagram';
        case 'Facebook': return 'bx bxl-facebook';
        case 'Whatsapp':
        case 'WhatsApp': return 'bx bxl-whatsapp';
        case 'Twitter': return 'bx bxl-twitter';
        default: return 'bx bx-phone-incoming';
    }
}

function formatTimeAgo(dateString) {
    const date = new Date(parseInt(dateString.match(/\d+/)[0]));
    const hoursAgo = Math.floor((new Date() - date) / (1000 * 60 * 60));
    return `${hoursAgo} hours ago`;
}

let countdownTime = 120;
let warningTime = 30;
let countdownInterval;
let alertShown = false;
let countdownStarted = false;
let idleTimeout;

function startCountdown() {
    document.getElementById("countdown-timer").style.display = 'block';

    countdownInterval = setInterval(() => {
        countdownTime--;

        //console.log(`Countdown: ${countdownTime} detik tersisa`);
        document.getElementById("countdown-timer").innerText = `Waktu reload tersisa: ${countdownTime} Detik`;

        if (countdownTime <= warningTime && countdownTime > 0 && !alertShown) {
            showWarningPopup();
            alertShown = true; // Hanya tampilkan popup sekali
        }

        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            redirectToLogout();
        }
    }, 1000);
}

function injectCustomCSS() {
    const style = document.createElement('style');
    style.innerHTML = `
         .small-swal-popup {
            border-radius: 8px !important; /* Radius sudut popup */
            height: 230px !important;
            max-width: 450px !important;   /* Atur lebar maksimum popup */
            padding: 12px !important;      /* Tambahkan padding */
        }
        .small-swal-title {
            font-size: 14px !important;   /* Ukuran font untuk judul */
        }
        .small-swal-content {
            font-size: 10px !important;   /* Ukuran font untuk konten teks */
            margin-bottom: 2px !important;
        }
        .swal2-confirm {
            font-size: 12px !important;   /* Ukuran font tombol */
            margin-top: 2px !important;  /* Kurangi jarak atas tombol */
        }
        .small-swal-content p {
            font-size: 6px !important;  /* Ukuran font untuk elemen <p> */
            margin: 2px !important;       /* Atur ulang margin elemen <p> */
        }
        .small-swal-content strong {
            font-size: 12px !important; /* Ukuran font untuk elemen <strong> */
        }
    `;
    document.head.appendChild(style);
}

injectCustomCSS(); // Panggil fungsi ini untuk memasukkan CSS

function showWarningPopup() {
    let popupCountdownTime = countdownTime; // Simpan waktu yang tersisa saat popup ditampilkan

    Swal.fire({
        title: "Warning!",
        html: `
            <p>Your session is about to expire.</p>
            <p>You will be logged out in <strong>${popupCountdownTime}</strong> seconds.</p>
        `,
        confirmButtonText: "OK",
        allowOutsideClick: false, // Cegah menutup dengan klik luar
        allowEscapeKey: false,    // Cegah menutup dengan tombol ESC
        customClass: {
            popup: 'small-swal-popup',  // Tambahkan kelas khusus untuk memperkecil popup
            title: 'small-swal-title',  // Tambahkan kelas khusus untuk memperkecil judul
            content: 'small-swal-content', // Tambahkan kelas khusus untuk memperkecil konten
        },
        didOpen: () => {
            // Perbarui countdown di dalam popup setiap detik
            const popupTimerInterval = setInterval(() => {
                if (popupCountdownTime > 0) {
                    popupCountdownTime--;
                    Swal.getHtmlContainer().querySelector('strong').textContent = popupCountdownTime;
                }
                if (popupCountdownTime <= 0) {
                    clearInterval(popupTimerInterval);
                    Swal.close();
                    redirectToLogout(); // Logout jika waktu habis
                }
            }, 1000);
        }
    }).then((result) => {
        if (result.isConfirmed) {
            reloadPage(); // Reload halaman jika pengguna menekan "OK"
        }
    });
}

function reloadPage() {
    location.reload();
}

function redirectToLogout() {
    window.location.href = "https://cloud.uidesk.id/bravo"; // URL Logout
}

function resetCountdown() {
    // Reset countdown di background, tapi biarkan popup tetap berjalan
    if (!alertShown) {
        clearInterval(countdownInterval);
        clearTimeout(idleTimeout);
        countdownTime = 120; // Reset ke 120 detik hanya jika popup belum ditampilkan
        countdownStarted = false;

        idleTimeout = setTimeout(() => {
            startCountdown();
            countdownStarted = true;
        }, 1000); // Mulai countdown setelah 5 detik inaktivitas
    }
}

// Event listener untuk reset countdown saat ada aktivitas, tapi hanya untuk background timer
document.addEventListener("mousemove", resetCountdown);
document.addEventListener("keydown", resetCountdown);

window.onload = resetCountdown;