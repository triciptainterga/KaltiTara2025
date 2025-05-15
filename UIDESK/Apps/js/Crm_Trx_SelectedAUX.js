var urlDatakelola;
$(document).ready(function () {
    //ModalSelectedAUX()
    urlDatakelola = $("#SM_UrlDatakelola").val();
    if (getParameterByName("signout") == "yes") {
        UrlLogoutSystem();
    } else {
        CheckingLogin();
        if (getParameterByName("api") == "1") {
            $.ajax({
                type: "POST",
                url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
                data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK220'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, x, result = "";
                    if (json.length == 0) {
                    } else {
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Login != "1") {
                                updateAuxDatakelola($("#SM_MultiChatToken").val(), "ready", $("#SM_CompanyToken").val());
                            }
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
        //else {
        //    $.ajax({
        //        type: "POST",
        //        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        //        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK220'}",
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (data) {

        //            var json = JSON.parse(data.d);
        //            var i, x, result = "";
        //            if (json.length == 0) {
        //                updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
        //            }
        //        },
        //        error: function (xmlHttpRequest, textStatus, errorThrown) {
        //            console.log(xmlHttpRequest.responseText);
        //            console.log(textStatus);
        //            console.log(errorThrown);
        //        }
        //    })
        //}
    }  
});
function ModalSelectedAUX() {
    $("#SelectedAUX").modal('show');
    DropDownSelectAUX()
}
function DropDownSelectAUX() {
    var cmbAux = $('#selectAUX');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK66'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            cmbAux.empty();
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].ID + '">' + json[i].Deskripsi + '</option>';
                cmbAux.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionAux() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Username is empty, Please relogin',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    if ($("#selectAUX").val() == "" || $("#selectAUX").val() == "Select") {
        swal(
            '',
            'Aux reason is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    VoiceCommand($("#selectAUX").val())
    if ($("#selectAUX").val() == "9") {

        swal({
            title: "Do you want to process?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    var form_data = JSON.stringify({ TrxAux: $("#selectAUX").val(), TrxUserName: $("#hd_sessionLogin").val() });
                    $.ajax({
                        url: "asmx/TrmAux.asmx/InsertAgentAux",
                        method: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: form_data,
                        success: function (data) {
                            console.log(form_data)

                            var jsonX = JSON.parse(data.d);
                            var i, x = "";
                            var result = "";
                            for (i = 0; i < jsonX.length; i++) {
                                if (jsonX[i].Result == "True") {

                                    swal(
                                        '',
                                        'Insert Data Has Been Success',
                                        'success'
                                    ).then(function () {
                                        $("#selectAUX").val("");
                                        window.location.href = "Crm_Trx_Taskboard.aspx?status=Open"
                                    });

                                } else {
                                    swal(
                                        '',
                                        'Insert Data Has Been Failed !',
                                        'error'
                                    ).then(function () {
                                        return false
                                    });
                                    return false
                                }
                            }

                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        },
                        complete: function () {

                        }
                    });

                }
            });

    } else {

        $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
            data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";

                for (i = 0; i < json.length; i++) {
                    if (json[i].DescAUX != "Ready") {
                        swal(
                            '',
                            'The user is already in aux position',
                            'info'
                        ).then(function () {
                            return false
                        });
                        return false
                    } else {

                        swal({
                            title: "Do you want to process?",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                            .then((willDelete) => {
                                if (willDelete) {

                                    var form_data = JSON.stringify({ TrxAux: $("#selectAUX").val(), TrxUserName: $("#hd_sessionLogin").val() });
                                    $.ajax({
                                        url: "asmx/TrmAux.asmx/InsertAgentAux",
                                        method: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        data: form_data,
                                        success: function (data) {
                                            console.log(form_data)

                                            var jsonX = JSON.parse(data.d);
                                            var i, x = "";
                                            var result = "";
                                            for (i = 0; i < jsonX.length; i++) {
                                                if (jsonX[i].Result == "True") {

                                                    swal(
                                                        '',
                                                        'Insert Data Has Been Success',
                                                        'success'
                                                    ).then(function () {
                                                        $("#selectAUX").val("");
                                                        window.location.href = "Crm_Trx_Taskboard.aspx?status=Open"
                                                    });

                                                    swal(
                                                        '',
                                                        'Insert Data Has Been Success',
                                                        'success'
                                                    ).then(function () {
                                                        $("#selectAUX").val("");
                                                        window.location.href = "Crm_Trx_Taskboard.aspx?status=Open"
                                                    });

                                                } else {
                                                    swal(
                                                        '',
                                                        'Insert Data Has Been Failed !',
                                                        'error'
                                                    ).then(function () {
                                                        return false
                                                    });
                                                    return false
                                                }
                                            }

                                        },
                                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                                            console.log(xmlHttpRequest.responseText);
                                            console.log(textStatus);
                                            console.log(errorThrown);
                                        },
                                        complete: function () {

                                        }
                                    });

                                }
                            });

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
}
function CheckingLogin() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            if (json.length > 0) {
                var descAUX = json[0].DescAUX;

                $("#Aux_State").text(descAUX);

                if (descAUX === "Ready") {
                    $("#Aux_State").text("Available");
                    $("#statusCircle").css("background-color", "#0FFF50");
                } else {
                    $("#statusCircle").css("background-color", "#FF0000");
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
//async function updateAuxDatakelola(token_agent, value, token_company) {
//    console.log('Fungsi updateAuxDatakelola dimulai');  // Log awal
//    try {
//        // Kirim log sebelum melakukan permintaan fetch
//        await logToASMX('Mengirim request ke API dengan parameter: ' + JSON.stringify({ token_agent, aux: value, token: token_company }));
//        // Melakukan request fetch untuk update data
//        const response = await fetch("https://bc.datakelola.com/home/api/agent/aux", {
//            method: "POST",
//            headers: {
//                "Content-Type": "application/json",
//            },
//            body: JSON.stringify({
//                token_agent: token_agent,
//                aux: value,
//                token: token_company,
//            }),
//        });
//        console.log('Request berhasil dikirim, menunggu response...');
//        const data = await response.json();
//        console.log('Data yang diterima:', data);  // Log data yang diterima dari server
//        // Kirim log setelah menerima data dari API
//        await logToASMX('Response dari API: ' + JSON.stringify(data));
//        if (data && data.message) {
//            console.log('Pesan dari server:', data.message);  // Log pesan dari server
//        }
//    } catch (error) {
//        console.error('Terjadi error:', error);
//        await logToASMX('Terjadi error: ' + error.message);  // Log error jika ada
//    }
//}
function LogoutSystem() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmAux.asmx/InsertLogoutActivity",
        data: "{TrxLoginID:'9', TrxLoginUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'Logout'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {
                    updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
                    location.href = "../auth_login.aspx?signout=api";
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
function UrlLogoutSystemEPIC() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + getParameterByName("user") + "', TrxAction: 'UIDESK125'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                updateAuxDatakelola(json[i].TokenMeta, "logout", json[i].TokenCompany);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CheckingState() {
    console.log("State Checking...");
    var isiNya = "";
    var imageState = "";
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK132'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#dataState").empty();
            var json = JSON.parse(data.d);
            console.log(json);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {
                //isiNya += '<li class="btn-group nav-item d-none d-lg-inline-block">' &
                //      '<a href="#" title="">' &
                //      '<img src="../images/state/wamax.png" width="32" alt="">&nbsp;' &
                //      '</a>' &
                //      '</li>' &
                //      '<li class="btn-group nav-item d-none d-lg-inline-block">' &
                //      '<a href="#"> ' &
                //      '<img src="../images/state/callon.png" width ="32">& nbsp;' &
                //      '</a> ' &
                //      '</li> ' &
                //      '<li class="btn-group nav-item d-none d-lg-inline-block">' &
                //      '<a href="mailbox_inbox.html"> ' &
                //      '<img src="../images/state/emailoff.png" width ="32">& nbsp;' &
                //      '</a>'&
                //      '</li>';
                //  console.log(isiNya);
                //Mapping Image Name

                if (json[i].ChannelName == "E-mail") {
                    imageState = "email";
                    if (json[i].ConditionResult == "READYLOGIN") {
                        imageState = imageState + "on";
                    } else if (json[i].ConditionResult == "READYLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGIN") {
                        imageState = imageState + "max";
                    }
                } else if (json[i].ChannelName == "INBOUND") {
                    imageState = "call";
                    if (json[i].ConditionResult == "READYLOGIN") {
                        imageState = imageState + "on";
                    } else if (json[i].ConditionResult == "READYLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGIN") {
                        imageState = imageState + "max";
                    }
                } else if (json[i].ChannelName == "WhatsApp") {
                    imageState = "wa";
                    if (json[i].ConditionResult == "READYLOGIN") {
                        imageState = imageState + "on";
                    } else if (json[i].ConditionResult == "READYLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGIN") {
                        imageState = imageState + "max";
                    }
                }
                //End
                isiNya += '<li class="btn-group nav-item d-none d-lg-inline-block"><a href="#" title=""><img src="../images/state/' + imageState + '.png" width="32" alt="">&nbsp;</a></li>';

            }
            isiNya += '<li class="btn-group nav-item d-none d-lg-inline-block"><a href="#" onclick="CheckingState()" title=""><img src="../images/state/refresh.png" width="32" alt="">&nbsp;</a></li>';
            $("#dataState").append(isiNya);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function generateDetailsString(data, name) {
    let detailsString = "";
    const filteredPersons = data.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    data.forEach((person, index) => {
        const firstName = person.name.split(' ')[0];
        if (firstName == name) {
            //detailsString += `Person ${index + 1}:\n`;
            //detailsString += `Name: ${person.name}\n`;
            //detailsString += `Local: ${person.local}\n`;
            detailsString += `${person.statuscall}`;
            //detailsString += `Calls Taken: ${person.callstaken}\n`;
            //detailsString += `Last Call Time: ${person.lastcalltime}\n\n`;
        }

    });
    return detailsString;
}
function VoiceCommand(TypeAux) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TypeAux + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK216'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            if (json.length == 0) {
                //updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
            } else {
                for (i = 0; i < json.length; i++) {

                    if (TypeAux == "33") {
                        updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
                        const Http = new XMLHttpRequest();
                        const url = "http://localhost:60024/aux/3"
                        console.log("url" + url)
                        Http.open("GET", url);
                        Http.send();
                        Http.onreadystatechange = (e) => {
                            console.log(Http.responseText)
                        }
                    } else if (TypeAux == "34") {
                        updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
                        const Http = new XMLHttpRequest();
                        const url = "http://localhost:60024/aux/2"
                        console.log("url" + url)
                        Http.open("GET", url);
                        Http.send();
                        Http.onreadystatechange = (e) => {
                            console.log(Http.responseText)
                        }
                    } else if (TypeAux == "35") {
                        updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
                        const Http = new XMLHttpRequest();
                        const url = "http://localhost:60024/aux/0"
                        console.log("url" + url)
                        Http.open("GET", url);
                        Http.send();
                        Http.onreadystatechange = (e) => {
                            console.log(Http.responseText)
                        }
                    } else if (TypeAux == "36") {
                        updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
                        const Http = new XMLHttpRequest();
                        const url = "http://localhost:60024/aux/1"
                        console.log("url" + url)
                        Http.open("GET", url);
                        Http.send();
                        Http.onreadystatechange = (e) => {
                            console.log(Http.responseText)
                        }
                    } else if (TypeAux == "9") {
                        updateAuxDatakelola($("#SM_MultiChatToken").val(), "ready", $("#SM_CompanyToken").val());
                        const Http = new XMLHttpRequest();
                        const url = "http://localhost:60024/pbxin"
                        console.log("url" + url)
                        Http.open("GET", url);
                        Http.send();
                        Http.onreadystatechange = (e) => {
                            console.log(Http.responseText)
                        }
                    }

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
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function logToASMX(logMessage) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'WebServiceGetDataMaster.asmx/LogMessage',  // URL ASMX Web Service Anda
            type: 'POST',
            data: JSON.stringify({ logData: logMessage }),
            contentType: 'application/json',
            success: function (response) {
                console.log('Log berhasil disimpan:', response);
                resolve(response);
            },
            error: function (error) {
                console.error('Error menyimpan log:', error);
                reject(error);
            }
        });
    });
}


function showMessage(message, icon, type) {
    swal('', message, icon).then(function () {
        return type;
    });
}
function ajaxRequest(url, method, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        method: method,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: successCallback,
        error: errorCallback
    });
}
function ActionAuxOpenConnection() {
    const sessionLogin = $("#hd_sessionLogin").val();
    const auxValue = $("#selectAUX").val();
    if (sessionLogin === "") {
        showMessage('Username is empty, Please relogin', 'info', false);
        return false;
    }
    if (auxValue === "" || auxValue === "Select") {
        showMessage('Aux reason is empty', 'info', false);
        return false;
    }
    VoiceCommand(auxValue);
    if (auxValue === "9") {
        swal({
            title: "Do you want to process?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const formData = JSON.stringify({ TrxAux: auxValue, TrxUserName: sessionLogin });
                ajaxRequest("asmx/TrmAux.asmx/InsertAgentAux", "POST", formData, function (data) {
                    const jsonX = JSON.parse(data.d);
                    jsonX.forEach(item => {
                        if (item.Result === "True") {
                            ajaxRequest("apps/asmx/Crm_Trx_Login.asmx/DK_InsertLoginActivity", "POST",
                                JSON.stringify({ username: sessionLogin }),
                                function (data) {
                                    showMessage('Insert Data Has Been Success', 'success', true);
                                    $("#selectAUX").val("");
                                    window.location.href = "Crm_Trx_Taskboard.aspx?status=Open";
                                },
                                function (error) {
                                    console.error(error);
                                }
                            );
                        } else {
                            showMessage('Insert Data Has Been Failed !', 'error', false);
                        }
                    });
                }, function (error) {
                    console.error(error);
                });
            }
        });
    } else {
        ajaxRequest("WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo", "POST",
            JSON.stringify({ TrxID: 'UideskIndonesia', TrxUserName: sessionLogin, TrxAction: 'UIDESK14' }),
            function (data) {
                const json = JSON.parse(data.d);
                const userStatus = json[0].DescAUX;

                if (userStatus !== "Ready") {
                    showMessage('The user is already in aux position', 'info', false);
                    return false;
                }

                swal({
                    title: "Do you want to process?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        const formData = JSON.stringify({ TrxAux: auxValue, TrxUserName: sessionLogin });

                        ajaxRequest("asmx/TrmAux.asmx/InsertAgentAux", "POST", formData, function (data) {
                            const jsonX = JSON.parse(data.d);
                            jsonX.forEach(item => {
                                if (item.Result === "True") {
                                    ajaxRequest("apps/asmx/Crm_Trx_Login.asmx/DK_InsertLogoutActivity", "POST",
                                        JSON.stringify({ username: sessionLogin }),
                                        function (data) {
                                            showMessage('Insert Data Has Been Success', 'success', true);
                                            $("#selectAUX").val("");
                                            window.location.href = "Crm_Trx_Taskboard.aspx?status=Open";
                                        },
                                        function (error) {
                                            console.error(error);
                                        }
                                    );
                                } else {
                                    showMessage('Insert Data Has Been Failed !', 'error', false);
                                }
                            });
                        }, function (error) {
                            console.error(error);
                        });
                    }
                });
            },
            function (error) {
                console.error(error);
            }
        );
    }
}
