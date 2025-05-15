$(document).ready(() => {
    const session_id = $("#hd_sessionLogin").val();
    //console.log("running file js desktop-notification session_id " + session_id);
    //QM_SubmitCounting(session_id)
    //QM_SubmitDetail(session_id)
    socket.on("multichat", (header_id, datas) => {
        //console.log("data incoming socket " + header_id, datas);
        //console.log("data nama agent " + datas.chat_header.agent );
        //console.log("data nama from " + datas.chat_header.chat_from_name );
        //console.log("data nama message " + datas.message );
        //console.log("data sender " + datas.type );
        if (datas.type === "inbox") {
            if ($("#hd_sessionLogin").val() === datas.chat_header.agent) {
                //console.log("data nama channel_id " + datas.sender.channel_id );
                //console.log("sender type " + datas.type)
                if (datas.sender.channel_id == "7") {
                    notifyMe(datas.chat_header.chat_from_name, datas.message, "https://bravo.beacukai.go.id/omni/Images/channel/LiveChat.png");
                } else if (datas.sender.channel_id == "9") {
                    notifyMe(datas.chat_header.chat_from_name, datas.message, "https://bravo.beacukai.go.id/omni/Images/channel/whatsapp.png");
                } else if (datas.sender.channel_id == "1") {
                    notifyMe(datas.chat_header.chat_from_name, datas.message, "https://bravo.beacukai.go.id/omni/Images/channel/facebook.png");
                } else if (datas.sender.channel_id == "2") {
                    notifyMe(datas.chat_header.chat_from_name, datas.message, "https://bravo.beacukai.go.id/omni/Images/channel/instagram.png");
                } else {
                    notifyMe(datas.chat_header.chat_from_name, datas.message, "https://bravo.beacukai.go.id/omni/Images/channel/LiveChat.png");
                }
            }
        }
    });
    socket.on("connect", () => {
        //console.log("connected")
    })
    function notifyMe(
        title,
        body,
        icon
    ) {
        if (!window.Notification) {
            console.log("Browser does not support notifications.");
        } else {

            // check if permission is already granted
            if (Notification.permission === "granted") {
                // show notification here
                var notify = new Notification(title, {
                    body: body,
                    icon: icon,
                });
            } else {
                // request permission from user
                console.log("request permission from user " + title)
                Notification.requestPermission()
                    .then(function (p) {
                        console.log("p " + p)
                        if (p === "granted") {
                            // show notification here
                            console.log("show notification here" + title)
                            var notify = new Notification(title, {
                                body: body,
                                icon: icon,
                            });
                        } else {
                            console.log("User blocked notifications.");
                        }
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }
        }
    }
    function QM_SubmitCounting(val) {
        $.ajax({
            type: "POST",
            url: "asmx/QA_TrxNotificationWindows.asmx/FormActionQuery",
            data: "{TrxUserName:'" + val + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                console.log(json);

                for (i = 0; i < json.length; i++) {

                    $('#notif_counter').text(json[i].TrxmsgSystem)

                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
    function QM_SubmitDetail(val) {
        $.ajax({
            type: "POST",
            url: "asmx/QA_TrxNotificationWindows.asmx/FormActionDetail",
            data: "{TrxUserName:'" + val + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $('.notifications-menu ul.menu').html("");

                var json = JSON.parse(data.d);
                var i, x, result = "";
                console.log(json);

                for (i = 0; i < json.length; i++) {
                    $('.notifications-menu ul.menu').prepend(`<li>
                                                            <a href="#">
                                                                <i class="fa fa-users text-info"></i>${json[i].HeaderID}
                                                            </a>
                                                        </li>`);

                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
});
function requestNotificationPermission() {
    if (!('Notification' in window)) {
        alert('This browser does not support notifications.');
        return;
    }
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else if (permission === 'denied') {
            console.log('Notification permission denied.');
        }
    }).catch(error => {
        console.error('Notification permission request failed:', error);
    });
}