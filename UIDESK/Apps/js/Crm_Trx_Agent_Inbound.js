$(document).ready(function () {
    LoadingUser();
    ComboAgent();
    $("#Update").hide();
    $("#Delete").hide();
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            SearchingUser($(this).val());
        } else if (jumlahString == 0) {
            SearchingUser($(this).val(""));
        }
    });
    loadSiteDataCards();
});

function loadSiteDataCards() {
    const siteDiv = $("#divCardSite");
    const currentType = "Total User";
    const allSites = ["Pusat", "Tanjung Priok", "Pasar Baru", "Soekarno Hatta"]; 

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({
            TrxID: 'UideskIndonesia',
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'UIDESK10'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (siteResponse) {
            const siteData = siteResponse?.d ? JSON.parse(siteResponse.d) : [];

            const siteCounts = {};
            siteData.forEach((user) => {
                const siteName = user.Site || "Pusat"; 

                const matchesType =
                    currentType === "Total User" ||
                    (currentType === "User Login" && user.Login === 1) ||
                    (currentType === "User Not Login" && user.Login !== 1) ||
                    (currentType === "User Aux" && user.Login === 1 && user.DescAUX !== "Ready");

                if (matchesType) {
                    siteCounts[siteName] = (siteCounts[siteName] || 0) + 1;
                }
            });

            siteDiv.empty();

            allSites.forEach((siteName) => {
                const siteAgentCount = siteCounts[siteName] || 0; 

                let bgClass = "";
                switch (siteName) {
                    case "Pusat":
                        bgClass = "bg-primary";
                        break;
                    case "Tanjung Priok":
                        bgClass = "bg-danger";
                        break;
                    case "Pasar Baru":
                        bgClass = "bg-success";
                        break;
                    case "Soekarno Hatta":
                        bgClass = "bg-warning";
                        break;
                    default:
                        bgClass = "bg-light";
                }

                const siteCardHtml = `
                    <div class="card box box-link-shadow text-left card-site ${bgClass}" 
                         data-site="${siteName}" 
                         style="cursor:pointer; padding: 10px; margin: 0 7.5px; flex: 1 1 calc(50% - 15px); max-width: calc(50% - 15px);">
                        <div class="card-body text-white">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="flex-grow-1 text-start">
                                    <p class="mb-1 text-truncate text-white" style="font-size: 22px;">${siteName}</p>
                                </div>
                                <div class="text-end">
                                    <h5 class="mb-0 text-white" style="font-size: 20px;">${siteAgentCount}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                siteDiv.append(siteCardHtml);
            });

            $(".card-site").on("click", function () {
                $(".card-site").removeClass("active");
                $(this).addClass("active");
                const selectedSite = $(this).data("site");
                LoadingUser(selectedSite);
            });
        },
        error: function (xhr) {
            console.error("Error loading site data:", xhr.responseText);
            alert("Failed to load data. Please try again.");
        },
    });
}

function LoadingUser(selectedSite) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({
            TrxID: 'UideskIndonesia',
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'UIDESK10'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            const json = JSON.parse(data.d);
            const groupedData = {};

            json.forEach(user => {
                const siteName = user.Site || "Pusat"; 

                if (siteName === selectedSite) {
                    if (!groupedData[siteName]) {
                        groupedData[siteName] = [];
                    }
                    groupedData[siteName].push(user);
                }
            });

            $('#divUserNotification').empty();

            Object.keys(groupedData).forEach(site => {
                const siteUsers = groupedData[site];

                // Removed siteHeader block, no need to append site name here

                siteUsers.forEach(function (user) {
                    const TypeCall = user.type === "1" ? "Inbound Call" :
                                     user.type === "2" ? "Outbound Call" : "Inbound & Outbound Call";

                    const StatusNya = user.EpicLogin === "0" ? 
                                      "<span class='badge rounded-pill badge-soft-danger font-size-12'>Non Active</span>" : 
                                      "<span class='badge rounded-pill badge-soft-success font-size-12'>Active</span>";

                    const ScheduleStateColor = user.ScheduleState === "1" ? "success" : "danger";

                    const resultUserNotification = ` 
                        <div class="col-xl-3 col-sm-6">
                            <div class="card border shadow-none">
                                <div class="card-body p-4">
                                    <div class="d-flex align-items-start">
                                        <div class="flex-shrink-0 avatar rounded-circle me-3">
                                            <img src="assets/images/users/user.png" alt="" class="img-fluid rounded-circle">
                                        </div>
                                        <div class="flex-grow-1 overflow-hidden">
                                            <h5 class="font-size-15 mb-1 text-truncate">
                                                <a href="#" class="text-dark">${user.NAME} ${user.Alias ? ` (${user.Alias})` : ""}</a>
                                            </h5>
                                            <p class="text-muted text-truncate mb-0">
                                                <span class="text-dark">${user.pbxUser}</span>
                                            </p>
                                            <p class="text-muted text-truncate mb-0">
                                                <span class="mdi mdi-circle text-${ScheduleStateColor} me-2" 
                                                      style="cursor:pointer;" onclick="ReleaseSchedule('${user.id}')">
                                                </span>
                                            </p>
                                        </div>
                                        <div class="flex-shrink-0 dropdown">
                                            <a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                <i class="fa fas fa-ellipsis-h"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="#" onclick="EditUser('${user.id}')">Edit</a>
                                                <a class="dropdown-item" href="#" onclick="DeleteUser('${user.id}')">Delete</a>
                                                <a class="dropdown-item" href="#" onclick="ButtonEpic('${user.id}')">Release</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer bg-transparent border-top d-flex">
                                    <div class="flex-grow-1">
                                        <div class="font-size-13 text-muted">${StatusNya}</div>
                                    </div>
                                    <div class="flex-shrink-0 ms-2">
                                        <span class="badge rounded-pill badge-soft-primary font-size-12">${user.Site}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    $('#divUserNotification').append(resultUserNotification);
                });
            });
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}


function SearchingUser(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK123'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].type == "1") {
                    var TypeCall = "Inbound Call"
                } else if (json[i].type == "2") {
                    var TypeCall = "Outbound Call"
                } else {
                    var TypeCall = "Inbound & Outbound Call"
                }
                if (json[i].EpicLogin == "0") {
                    var StatusNya = "<span class='badge rounded-pill badge-soft-danger font-size-12'>Non Active</span>"
                } else {
                    var StatusNya = "<span class='badge rounded-pill badge-soft-success font-size-12'>Active</span>"
                }
                if (json[i].ScheduleState == "1") {
                    var ScheduleStateColor = "success"
                } else {
                    var ScheduleStateColor = "danger"
                }
                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/user.png" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].NAME + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].pbxUser + '</span>' +
                    '</p>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="mdi mdi-circle text-' + ScheduleStateColor + ' me-2" style="cursor:pointer;" onclick=ReleaseSchedule("' + json[i].id + '")></span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=EditUser("' + json[i].id + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=DeleteUser("' + json[i].id + '")>Delete</a> ' +
                    '<a class="dropdown-item" href="#" onclick=ButtonEpic("' + json[i].id + '")>Release</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<div class="font-size-13 text-muted">' + StatusNya + '</div>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].Site + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#divUserNotification').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboAgent() {
    var CmbAgent = $('#CmbAgent');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK11'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            CmbAgent.empty();
            for (i = 0; i < json.length; i++) {
                result = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                CmbAgent.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Get_CmbAgent() {
    var selectedText = $("#CmbAgent").find("option:selected").text();
    var selectedValue = $("#CmbAgent").val();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {
                $("#EPIC_Password").val(json[i].PASSWORD)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Get_TypeAgent() {
    $('#CmbAgent').attr("disabled", false);
    var selectedText = $("#cmbType").find("option:selected").text();
    var selectedValue = $("#cmbType").val();
    var CmbAgent = $('#CmbAgent');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK11'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            CmbAgent.empty();
            for (i = 0; i < json.length; i++) {
                result = '<option value="' + json[i].USERNAME + '"> ' + json[i].NAME + '</option>';
                CmbAgent.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function AddUser() {
    $("#addContactModal").modal('show');
    $('#cmbType').val("");
    $('#CmbAgent').val("");
    $('#CmbAgent').attr("disabled", false);
    $('#EPIC_PABX_User').val("");
    $('#EPIC_Password').val("");
    $('#EPIC_PABX_Password').val("");
    $('#EPIC_PABX_Pin').val("");
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    ComboAgent();
}
function EditUser(ID) {
    $("#addContactModal").modal('show');
    $("#Update").show();
    $("#Delete").hide();
    $("#Simpan").hide();
    $("#ContentPlaceHolder1_TrxID").val(ID);
    EpicSelected($("#ContentPlaceHolder1_TrxID").val())
}
function DeleteUser(ID) {
    $("#addContactModal").modal('show');
    $("#Update").hide();
    $("#Delete").show();
    $("#Simpan").hide();
    $("#ContentPlaceHolder1_TrxID").val(ID);
    EpicSelected($("#ContentPlaceHolder1_TrxID").val())
}
function RefreshUser(ID) {
    $("#addContactModal").modal('show');
    $('#cmbType').val("");
    $('#CmbAgent').val("");
    $('#CmbAgent').attr("disabled", false);
    $('#EPIC_PABX_User').val("");
    $('#EPIC_Password').val("");
    $('#EPIC_PABX_Password').val("");
    $('#EPIC_PABX_Pin').val("");
    ComboAgent();
}
function EpicSelected(TrxID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK12'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $('#cmbType').val(json[i].type);
                //$("#CmbAgent").find("option:selected").text(json[i].username + '-' + json[i].NAME );
                //$('#CmbAgent').attr("disabled", true);
                $('#EPIC_PABX_User').val(json[i].pbxUser);
                $('#EPIC_Password').val(json[i].password);
                $('#EPIC_PABX_Password').val(json[i].pbxPassword);
                $('#EPIC_PABX_Pin').val(json[i].pin);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionSimpan() {
    if ($("#cmbType").val() == "") {
        swal(
            'Call Type is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#CmbAgent").val() == "") {
        swal(
            'Agent is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#EPIC_PABX_User").val() == "") {
        swal(
            'PABX User is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    checkingPBXuser($("#EPIC_PABX_User").val())
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxID: "0", TrxCallType: $("#cmbType").val(), TrxUserName: $("#CmbAgent").val(), TrxUserCreated: $("#hd_sessionLogin").val(), TrxPABXUser: $("#EPIC_PABX_User").val(),
                    TrxPABXPassword: $("#EPIC_PABX_Password").val(), TrxPABXPin: $("#EPIC_PABX_Pin").val(), TrxAction: "Insert"
                });

                $.ajax({
                    url: "asmx/TrxAgentInbound.asmx/InsertSettingAgentInbound",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trx_Agent_Inbound.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed !',
                                    'error'
                                ).then(function () {
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
                    },
                    complete: function () {

                    }
                });

            }
        });
}
function checkingPBXuser(pbxUserValue) {
    $.ajax({
        type: "POST",
        url: "asmx/TrxAgentInbound.asmx/CheckAgentCall",
        data: "{pbxUser:'" + pbxUserValue + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].result == "1") {
                    swal("PABX User already exits")
                    return false;
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
function ButtonEpic(TrxID) {
    swal({
        title: "Do you want to release login epic?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ pbxUser: TrxID, release_by: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/TrxAgentInbound.asmx/ReleaseEpic",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Release Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trx_Agent_Inbound.aspx?"
                                });
                            } else {
                                swal(
                                    '',
                                    'Release Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "Crm_Trx_Agent_Inbound.aspx?"
                                });
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
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function ActionDelete() {
    swal({
        title: "Do you want to delete login epic?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/TrxAgentInbound.asmx/DeleteSettingAgentInbound",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trx_Agent_Inbound.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed !',
                                    'error'
                                ).then(function () {
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
                    },
                    complete: function () {

                    }
                });

            }
        });
}
function ActionUpdate() {
    if ($("#CmbAgent").val() == "") {
        swal(
            'Agent is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#EPIC_PABX_User").val() == "") {
        swal(
            'PABX User is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxCallType: $("#cmbType").val(), TrxUserName: $("#CmbAgent").val(),
                    TrxUserCreated: $("#hd_sessionLogin").val(), TrxPABXUser: $("#EPIC_PABX_User").val(),
                    TrxPABXPassword: $("#EPIC_PABX_Password").val(), TrxPABXPin: $("#EPIC_PABX_Pin").val(), TrxAction: "Update"
                });
                $.ajax({
                    url: "asmx/TrxAgentInbound.asmx/InsertSettingAgentInbound",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trx_Agent_Inbound.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed !',
                                    'error'
                                ).then(function () {
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
                    },
                    complete: function () {

                    }
                });

            }
        });
}
function ReleaseSchedule(ParamID) {
    $("#ContentPlaceHolder1_TrxID").val(ParamID);
    $("#modal-release").modal('show');
}
function ActionReleaseSchedule() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    ID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), Value: $("#CmbState").val(),
                });
                $.ajax({
                    url: "asmx/Crm_Trx_Agent_SM.asmx/ReleaseScheduleCall",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trx_Agent_Inbound.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed !',
                                    'error'
                                ).then(function () {
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
                    },
                    complete: function () {

                    }
                });

            }
        });
}