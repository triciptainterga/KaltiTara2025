$(document).ready(function () {
    fetchCustomerData()
    startCountdown()
    fetchChannel()
    StatusAgentDK()
});
function fetchChannel() {
    const url = 'WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo';
    const requestData = {
        TrxID: $("#hd_sessionLogin").val(),
        TrxUserName: $("#hd_sessionLogin").val(),
        TrxAction: 'UIDESK241'
    };
    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(requestData),
        success: function (response) {
            const json = JSON.parse(response.d);
            if (json.length > 0) {
                updateIconListChannel(json);
            } else {
                $('#icon-list-container-channel').hide();
                $('#icon-list-container-login-dk').hide();
                //$('#icon-list-container-login-dk').css('visibility', 'hidden');
                $('#status_user').css('visibility', 'hidden');
                $('#page-header-notifications-dropdown').css('visibility', 'hidden');
            }
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
}
function updateIconListChannel(data) {
    const iconListContainer = $('#icon-list-container-channel');
    iconListContainer.empty();
    data.forEach(item => {
        const iconItem = `
            <div class="icon-item ${getAvatarClassChannel(item.Name)}">
                <i class="${getIconClassChannel(item.Name)}"></i>
            </div>
        `;
        iconListContainer.append(iconItem);
    });
}
function getIconClassChannel(sourceName) {
    switch (sourceName) {
        case 'Email': return 'bx bx-envelope';
        case 'Call':
        case 'call': return 'bx bx-phone-incoming';
        case 'Instagram': return 'bx bxl-instagram';
        case 'Facebook': return 'bx bxl-facebook';
        case 'livechat': return 'bx bx-chat';
        case 'Whatsapp':
        case 'WhatsApp': return 'bx bxl-whatsapp';
        case 'Twitter': return 'bx bxl-twitter';
        default: return 'bx bx-phone-incoming';
    }
}
function getAvatarClassChannel(sourceName) {
    switch (sourceName) {
        case 'Email': return 'bg-warning';
        case 'Call':
        case 'call': return 'bg-danger';
        case 'Instagram': return 'bg-danger';
        case 'Facebook': return 'bg-primary';
        case 'Whatsapp':
        case 'livechat': return 'bg-success';
        case 'WhatsApp': return 'bg-success';
        case 'Twitter': return 'bg-primary';
        default: return 'bg-secondary';
    }
}
function StatusAgentDK() {
    const url = 'WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo';
    const requestData = {
        TrxID: $("#hd_sessionLogin").val(),
        TrxUserName: $("#hd_sessionLogin").val(),
        TrxAction: 'UIDESK239'
    };

    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(requestData),
        success: function (response) {
            const json = JSON.parse(response.d);
            if (json.length > 0) {
                updateIconListLoginDK(json);
            } else {
                $('#icon-list-container-login-dk').hide();
            }
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
}
function updateIconListLoginDK(data) {
    const iconListContainer = $('#icon-list-container-login-dk');
    iconListContainer.empty();
    data.forEach(item => {
        const iconItem = `
            <div class="icon-item ${getAvatarClassLoginDK(item.aux)}">
                <i class="bx bx-user"></i>
            </div>
        `;
        iconListContainer.append(iconItem);
    });
}
function getAvatarClassLoginDK(sourceName) {
    switch (sourceName) {
        case 'ready': return 'bg-success';
        case '': return 'bg-danger';
        case 'undefined': return 'bg-danger';
        case null: return 'bg-danger';
        default: return 'bg-danger';
    }
}


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

let countdownTime = 1200;
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

function showWarningPopup() {
    let popupCountdownTime = countdownTime; // Simpan waktu yang tersisa saat popup ditampilkan

    // Menampilkan popup custom sederhana di halaman
    let warningDiv = document.createElement("div");
    warningDiv.id = "warning-popup";
    warningDiv.style.position = "fixed";
    warningDiv.style.top = "50%";
    warningDiv.style.left = "50%";
    warningDiv.style.transform = "translate(-50%, -50%)";
    warningDiv.style.backgroundColor = "white";
    warningDiv.style.padding = "20px";
    warningDiv.style.border = "4px solid #FF3131"; // Border berwarna biru
    warningDiv.style.borderRadius = "10px"; // Border radius
    warningDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Tambahkan sedikit shadow untuk efek 3D
    warningDiv.innerHTML = `
       <div style="display: flex; align-items: center;">
            <img src="../Apps/assets/images/icon/warning.png" alt="Warning Icon" style="width: 100px; height: 100px; margin-right: 10px;">
            <div>
                <p>Sesi Anda akan segera berakhir.</p>
                <p>Anda akan otomatis logout dalam <strong id="popup-countdown">${popupCountdownTime}</strong> detik.</p>
                <button id="reload-btn" style="
                    background-color: #0096FF;
                    color: white;
                    padding: 8px 20px;
                    border: none;
                    border-radius: 5px;
                    justify-content: center;
                    cursor: pointer;
                ">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(warningDiv);

    // Membuat halaman di belakang popup menjadi blur (hanya pada #main-content)
    document.getElementById("layout-wrapper").style.filter = "blur(5px)";

    // Update countdown setiap detik
    let popupCountdownInterval = setInterval(() => {
        popupCountdownTime--;
        document.getElementById("popup-countdown").innerText = popupCountdownTime;

        if (popupCountdownTime <= 0) {
            clearInterval(popupCountdownInterval);
            closeWarningPopup();
            redirectToLogout(); // Logout otomatis jika waktu habis
        }
    }, 1000);

    // Event listener untuk tombol OK
    document.getElementById("reload-btn").addEventListener("click", () => {
        reloadPage();
        clearInterval(popupCountdownInterval); // Berhentikan countdown saat reload
        closeWarningPopup();
    });

    function closeWarningPopup() {
        document.body.removeChild(warningDiv);
        document.getElementById("layout-wrapper").style.filter = "none"; // Hapus blur ketika popup ditutup
    }
}
function reloadPage() {
    location.reload();
}
function redirectToLogout() {
    //$("#SM_MultiChatToken").val()
    //$("#SM_CompanyToken").val()
    //$("#hd_sessionLogin").val()
    //window.location.href = "auth_login.aspx?signout=api"; // URL Logout
}
function resetCountdown() {
    // Reset countdown di background, tapi biarkan popup tetap berjalan
    if (!alertShown) {
        clearInterval(countdownInterval);
        clearTimeout(idleTimeout);
        countdownTime = 1200; // Reset ke 60 detik hanya jika popup belum ditampilkan
        countdownStarted = false;

        idleTimeout = setTimeout(() => {
            startCountdown();
            countdownStarted = true;
        }, 5000); // Mulai countdown setelah 5 detik inaktivitas
    }
}
// Event listener untuk reset countdown saat ada aktivitas, tapi hanya untuk background timer
document.addEventListener("mousemove", resetCountdown);
document.addEventListener("keydown", resetCountdown);

window.onload = resetCountdown;

function UrlLogoutSystem() {
    $.ajax({
        type: "POST",
        url: "apps/asmx/TrmAux.asmx/InsertLogoutActivity",
        data: "{TrxLoginID:'9', TrxLoginUserName: '" + getParameterByName("user") + "', TrxAction: 'Logout'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {
                    //updateAuxDatakelola(getParameterByName("token_agent"), getParameterByName("value"), getParameterByName("token_company"));
                    updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
                    location.href = "auth_login.aspx?signout=api";
                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
async function updateAuxDatakelola(token_agent, value, token_company) {
    //await fetch("https://dk.beacukai.go.id/api/agent/aux", {
    await fetch("https://bc.datakelola.com/home/api/agent/aux", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token_agent: token_agent,
            aux: value,
            token: token_company,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            //alert("updateAuxDatakelola says: " + data.message);
        });
}
 //function ActionReleaseLoginAgentDK() {
//    swal({
//        title: "Do you want to process?",
//        icon: "warning",
//        buttons: true,
//        dangerMode: true,
//    })
//        .then((willDelete) => {
//            if (willDelete) {

//                if ($("#CmbState").val() == "0") {
//                    updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
//                } else {
//                    updateAuxDatakelola($("#SM_MultiChatToken").val(), "ready", $("#SM_CompanyToken").val());
//                }

//            }
//        });
//}
