var idWA = "3";
var noWA = "08170154444";
var apiKeyWA = "qRbkioekrn2xVSUwQWWiBzet03ysIhhUZZD";
var urlDatakelola;
var companyToken;
$(document).ready(function () {
    urlDatakelola = $("#SM_UrlDatakelola").val();
    companyToken = $("#SM_CompanyToken").val();
    MasterCombo();
    LoadingUser()
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            SearchingUser($(this).val());
        } else if (jumlahString == 0) {
            SearchingUser($(this).val(""));
        }
    });
    $('#Agent_Checkbox').click(function () {
        if ($(this).is(':checked')) {
            $("#ContentPlaceHolder1_HDUserAgent_Checkbox").val("1")
        } else {
            $("#ContentPlaceHolder1_HDUserAgent_Checkbox").val("0")
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
        url: "asmx/Crm_Trx_Agent_SM.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({
            TrxID: 'Comment',
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'UIDESK51'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const siteData = response?.d ? JSON.parse(response.d) : [];
            const siteCounts = {};

            siteData.forEach(user => {
                const siteName = user.Site || "Pusat";
                if (currentType === "Total User") {
                    siteCounts[siteName] = (siteCounts[siteName] || 0) + 1;
                }
            });

            siteDiv.empty();

            allSites.forEach(siteName => {
                const siteAgentCount = siteCounts[siteName] || 0;

                const bgClass = {
                    "Pusat": "bg-primary",
                    "Tanjung Priok": "bg-danger",
                    "Pasar Baru": "bg-success",
                    "Soekarno Hatta": "bg-warning"
                }[siteName] || "bg-light";

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

            $(".card-site").off("click").on("click", function () {
                $(".card-site").removeClass("active");
                $(this).addClass("active");
                const selectedSite = $(this).data("site");
                LoadingUser(selectedSite);
            });
        },
        error: function (xhr) {
            console.error("Error loading site data:", xhr.responseText);
            alert("Failed to load data. Please try again.");
        }
    });
}
function LoadingUser(selectedSite) {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Agent_SM.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({
            TrxID: 'Comment',
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'UIDESK51'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            const json = JSON.parse(data.d);
            const filteredData = json.filter(user => user.Site === selectedSite || selectedSite === "Pusat");
            $('#divUserNotification').empty();

            filteredData.forEach(user => {
                const Channel = user.ChannelName || "0";
                const ScheduleStateColor = user.ScheduleState === "1" ? "success" : "danger";
                let Channeltype;
                switch (user.channelid) {
                    case 5:
                        Channeltype = "Direct Message";
                        break;
                    case 9:
                        Channeltype = "Direct Message";
                        break;
                    case 1017:
                        Channeltype = "Comment & More";
                        break;
                    case 1018:
                        Channeltype = "Comment & More";
                        break;
                    default:
                        Channeltype = "Direct Message";
                }
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
                                            <a href="#" class="text-dark">${user.NAME}</a>
                                        </h5>
                                        <p class="text-muted text-truncate mb-0">
                                            <span class="text-dark">${user.product_campaign}</span>
                                        </p>
                                        <p class="text-muted text-truncate mb-0">
                                            <span class="text-dark" style="font-weight:bold;">${Channeltype}</span>
                                        </p>
                                    </div>
                                    <div class="flex-shrink-0 dropdown">
                                        <a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                            <i class="fa fas fa-ellipsis-h"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="#" onclick="DeleteUser('${user.id}', '${user.channelid}')">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent border-top d-flex">
                                <div class="flex-grow-1">
                                    <span class="mdi mdi-circle text-${ScheduleStateColor} me-2" style="cursor:pointer;" onclick="ReleaseSchedule('${user.id}')"></span>
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
        },
        error: function (xhr) {
            console.error("Error loading user data:", xhr.responseText);
            alert("Failed to load user data. Please try again.");
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
        url: "asmx/Crm_Trx_Agent_SM.asmx/BRA_SearchingDigitalChannelAgent",
        data: "{Type:'Comment', Value: '" + KondisiData + "', UserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].ChannelName == null) {
                    var Channel = "0"
                } else {
                    var Channel = json[i].ChannelName
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
                    '<span class="text-dark">' + json[i].product_campaign + '</span>' +
                    '</p>' +
                    //'<p class="text-muted text-truncate mb-0">' +
                    //'<span class="mdi mdi-circle text-' + ScheduleStateColor + ' me-2" style="cursor:pointer;" onclick=ReleaseSchedule("' + json[i].id + '")></span>' +
                    //'</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    //'<a class="dropdown-item" href="#" onclick=EditUser("' + json[i].id + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=DeleteUser("' + json[i].id + '","' + json[i].channelid + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="mdi mdi-circle text-' + ScheduleStateColor + ' me-2" style="cursor:pointer;" onclick=ReleaseSchedule("' + json[i].id + '")></span>' +
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
function DataTableAgent(TrxValue) {
    var myTable = $('#TrxAgent').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Agent_SM.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'1', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK31'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var TrxParam = '<input type = "checkbox" class="checkbox" name="checkbox' + json[i].USERID + '" id = "checkbox' + json[i].USERID + '" >' +
                    '<label class="checkbox" for="checkbox' + json[i].USERID + '"></label>'
                myTable.row.add([TrxParam, json[i].USERID, json[i].USERNAME, json[i].NAME, json[i].EMAIL_ADDRESS, json[i].TokenMeta]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function NewData() {
    $("#modal-agent").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
}
function EditUser(ParamID) {
    $("#ContentPlaceHolder1_TrxTransaksiID").val(ParamID);
    $("#addContactModal").modal('show');
    SelectDetailProduct();
}
function DeleteUser(ParamID, ChannelID) {
    $("#ContentPlaceHolder1_TrxTransaksiID").val(ParamID)
    if ($("#ContentPlaceHolder1_TrxTransaksiID").val() == "") {
        swal(
            '',
            'Data is empty',
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxTransaksiID").val(), TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/Crm_Trx_Agent_SM.asmx/DeleteAgentDistributionData",
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
                                    window.location = "Crm_Trx_Agent_SM.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    window.location = "Crm_Trx_Agent_SM.aspx";
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
    //$("#ContentPlaceHolder1_TrxTransaksiID").val(ParamID)
    //if ($("#ContentPlaceHolder1_TrxTransaksiID").val() == "") {
    //    swal(
    //        '',
    //        'Data is empty',
    //        'info'
    //    ).then(function () {
    //        return false;
    //    });
    //    return false;
    //}
    //swal({
    //    title: "Do you want to process?",
    //    icon: "warning",
    //    buttons: true,
    //    dangerMode: true,
    //})
    //    .then((willDelete) => {
    //        if (willDelete) {

    //            if (ChannelID == "5" || ChannelID == "4") {
    //                strType = "Page";
    //            } else if (ChannelID == "9") {
    //                strType = "Account";
    //            } else if (ChannelID == "18") {
    //                strType = "Page";
    //            } else if (ChannelID == "11") {
    //                strType = "Page";
    //            } else {
    //                strType = "Account";
    //            }
    //            var settings = {
    //                "url": urlDatakelola + "api/agent/unassign-multiple",
    //                "method": "POST",
    //                "timeout": 0,
    //                "headers": {
    //                    "Accept": "/",
    //                    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //                    "Content-Type": "application/json"
    //                },
    //                "data": JSON.stringify({
    //                    "token": companyToken,
    //                    "account_id": $("#ContentPlaceHolder1_TrxAccountIDSM").val(),
    //                    "type": strType,
    //                    "agent_tokens": [$('#ContentPlaceHolder1_TrxTokenMetaAgentSM').val()]
    //                }),
    //            };

    //            $.ajax(settings).done(function (response) {
    //                console.log(response);

    //                if (response.success == true) {

    //                    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxTransaksiID").val(), TrxUserName: $("#hd_sessionLogin").val() });
    //                    $.ajax({
    //                        url: "asmx/Crm_Trx_Agent_SM.asmx/DeleteAgentDistributionData",
    //                        method: "POST",
    //                        contentType: "application/json; charset=utf-8",
    //                        dataType: "json",
    //                        data: form_data,
    //                        success: function (data) {
    //                            console.log(form_data)

    //                            var json = JSON.parse(data.d);
    //                            var i = "";
    //                            for (i = 0; i < json.length; i++) {
    //                                if (json[i].Result == "True") {
    //                                    swal(
    //                                        '',
    //                                        'Delete Data Has Been Success',
    //                                        'success'
    //                                    ).then(function () {
    //                                        window.location = "Crm_Trx_Agent_SM.aspx";
    //                                    });
    //                                } else {
    //                                    swal(
    //                                        '',
    //                                        'Delete Data Has Been Failed !',
    //                                        'error'
    //                                    ).then(function () {
    //                                        window.location = "Crm_Trx_Agent_SM.aspx";
    //                                    });
    //                                    return false;
    //                                }
    //                            }

    //                        },
    //                        error: function (xmlHttpRequest, textStatus, errorThrown) {
    //                            console.log(xmlHttpRequest.responseText);
    //                            console.log(textStatus);
    //                            console.log(errorThrown);
    //                        },
    //                        complete: function () {

    //                        }
    //                    });

    //                }


    //            });

    //        }
    //    });
}
function MasterCombo() {
    var ComboSosialMedia = $('#ComboSosialMedia');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Agent_SM.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK232'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultSosialMedia = "";

            for (i = 0; i < json.length; i++) {

                ResultSosialMedia = '<option value="' + json[i].TypeID + '">' + json[i].Name + '</option>';
                ComboSosialMedia.append(ResultSosialMedia);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var ComboHandle = $('#ComboHandle');
    var ComboUpdateHandle = $('#ComboUpdateHandle');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Agent_SM.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK25'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].max_handle + '">' + json[i].max_handle + '</option>';
                ComboHandle.append(result);
                ComboUpdateHandle.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbSosialMediaAccount(TrxValue) {
    //Facebook 5 -> Page
    //Instagram 9 -> Account
    console.log("Get Data Multichat List FB/IG" + TrxValue);
    //https://multichat-2.uidesk.id/api/chat/lists?token=01H8X14ZNY1CQAAQ7ZF51J17Z9
    var settings = {
        "url": urlDatakelola + "api/channel/accounts?token=" + $("#SM_CompanyToken").val() + "",
        "method": "GET",
        "timeout": 0,
    };
    var CmbSosialMediaTransaksi = $('#ComboAccount');
    $.ajax(settings).done(function (response) {

        console.log(response);
        var json = response.data;
        var i, x, result = "";

        CmbSosialMediaTransaksi.empty();
        for (i = 0; i < json.length; i++) {
            if (TrxValue == "5" && json[i].channel_id == "1") {
                result = '<option value="' + json[i].channel_id + '|' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "9" && json[i].channel_id == "2") {
                result = '<option value="' + json[i].channel_id + '|' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "4" && json[i].channel_id == "8") {
                result = '<option value="' + json[i].channel_id + '|' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "5" && json[i].channel_id == "5") {
                result = '<option value="' + json[i].channel_id + '|' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "14" && json[i].channel_id == "14") {
                result = '<option value="' + json[i].channel_id + '|' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "15" && json[i].channel_id == "15") {
                result = '<option value="' + json[i].channel_id + '|' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "16" && json[i].channel_id == "16") {
                result = '<option value="' + json[i].channel_id + '|' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "18" && json[i].channel_id == "3") {
                result = '<option value="' + json[i].channel_id + '|' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "11" && json[i].channel_id == "7") {
                result = '<option value="' + json[i].channel_id + '|' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "1017" && json[i].channel_id == "1") {
                result = '<option value="' + json[i].channel_id + '|' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            } else if (TrxValue == "1018" && json[i].channel_id == "2") {
                result = '<option value="' + json[i].channel_id + '|' + json[i].account_id + '">' + json[i].name + '</option>';
                CmbSosialMediaTransaksi.append(result);
            }
        }
    });
}
function Add_DropdownSosialMedia(smID) {
    var TrxText = $("#ComboSosialMedia").find("option:selected").text();
    var TrxValue = $("#ComboSosialMedia").val();
    CmbSosialMediaAccount(TrxValue);
    DataTableAgent(TrxValue);
}
function Add_DropdownAccountSM(smID) {
    var TrxText = $("#ComboAccount").find("option:selected").text();
	let comboValue = $("#ComboAccount").val(); // Ambil nilai
					let [channelID, accountID] = comboValue.split("|"); // Split nilai dengan "|"
    var TrxValue = accountID;
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
$(function () {
    //Assign Click event to Button.
    $("#btnSimpan").click(function () {
        //var message = "Id Name                  Country\n";
        var message = ""
        var varToken = [];
        //Loop through all checked CheckBoxes in GridView.
        $("#TrxAgent input[type=checkbox]:checked").each(function () {
            var row = $(this).closest("tr")[0];
            message += row.cells[1].innerHTML + ",";
            varToken.push(row.cells[5].innerHTML);
            //message += "   " + row.cells[2].innerHTML;
            //message += "   " + row.cells[3].innerHTML;
            //message += "\n";
        });
        console.log("token ", varToken)
        //Display selected Row data in Alert Box.
        //alert(message);
        //return false;
        $("#ContentPlaceHolder1_TrxUserAgentId").val(message)

        if ($("#ComboSosialMedia").val() == "Select" || $("#ComboSosialMedia").val() == "") {
            swal(
                '',
                'Sosial Media Type is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#ComboAccount").val() == "Select" || $("#ComboAccount").val() == "") {
            swal(
                '',
                'Sosial Media Account is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        //if ($("#ComboHandle").val() == "Select" || $("#ComboHandle").val() == "") {
        //    swal(
        //        '',
        //        'Maximal Handle Data is empty',
        //        'info'
        //    ).then(function () {
        //        return false;
        //    });
        //    return false;
        //}
        if ($("#ContentPlaceHolder1_TrxUserAgentId").val() == "") {
            swal(
                '',
                'Agent is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        var strType = "";
        swal({
            title: "Do you want to process?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    //Post Data To Multichat
                    //Facebook 5,WA 4 -> Page
                    //Instagram 9 -> Account
                    if ($("#ComboSosialMedia").val() == "5" || $("#ComboSosialMedia").val() == "4") {
                        strType = "Page";
                    } else if ($("#ComboSosialMedia").val() == "9") {
                        strType = "Account";
                    } else if ($("#ComboSosialMedia").val() == "18") {
                        strType = "Page";
                    } else if ($("#ComboSosialMedia").val() == "11") {
                        strType = "Page";
                    } else if ($("#ComboSosialMedia").val() == "1017") {
                        strType = "Page";
                    } else if ($("#ComboSosialMedia").val() == "1018") {
                        strType = "Account";
                    } else {
                        strType = "Account";
                    }
					let comboValue = $("#ComboAccount").val(); // Ambil nilai
					let [channelID, accountID] = comboValue.split("|"); // Split nilai dengan "|"

					console.log("Kode ID:", channelID);
					console.log("Nama Kode:", accountID);
                    var settings = {
                        "url": urlDatakelola + "api/agent/assign-multiple",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "Accept": "/",
                            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                            "Content-Type": "application/json"
                        },
                        "data": JSON.stringify({
                            "token": companyToken,
                            "account_id": accountID,
							"channel_id": channelID,
                            "type": strType,
                            "agent_tokens": varToken
                        }),
                    };

                    //http://dk.beacukai.go.id/api/agent/max_handle
                    $.ajax(settings).done(function (response) {
                        console.log(response);

                        if (response.success == true) {

                            var form_data = JSON.stringify({
                                TrxUserName: $("#hd_sessionLogin").val(), TrxData: $("#ContentPlaceHolder1_TrxUserAgentId").val(), TrxSosialMedia: $("#ComboSosialMedia").val(),
                                TrxCampaign: accountID, TrxAccountName: $("#ComboAccount option:selected").text(), MaxCampaign: "0", sm_type: "1"
                            });
                            $.ajax({
                                url: "asmx/Crm_Trx_Agent_SM.asmx/InsertAgentDistributionData",
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
                                                'Insert Data Has Been Success ',
                                                'success'
                                            ).then(function () {
                                                window.location.href = "Crm_Trx_Agent_SM.aspx?";
                                            });
                                        } else {
                                            swal(
                                                '',
                                                'Insert Data Has Been Failed !',
                                                'error'
                                            ).then(function () {
                                                window.location = "Crm_Trx_Agent_SM.aspx?";
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

                        var settings = {
                            "url": "https://dk.beacukai.go.id/api/agent/max-handle-comment",
                            "method": "POST",
                            "timeout": 0,
                            "headers": {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Authorization": "Bearer " + companyToken + "",
                                "Cookie": "cookiesession1=678B2924C4A68D40F5CE4B3B62DE25C6; cookiesession1=678B2924A848D084E27047F1128F6DD8; cookiesession1=678B292491F6FC9402082E042F27CFC8"
                            },
                            "data": {
                                "token_agent": varToken,
                                "max_handle": $("#ComboHandle").val()
                            }
                        };

                        $.ajax(settings).done(function (response) {
                            console.log(response);
                        });

                    });


                }

            });

    });
});
function ActionUpdate() {
    if ($("#ContentPlaceHolder1_TrxTransaksiID").val() == "") {
        swal(
            '',
            'Agent is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxFlag = $("#ContentPlaceHolder1_HDUserAgent_Checkbox").val();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxTransaksiID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxSosialMedia: $("#CmbUpdateSosialMediaType").val(), TrxAccount: $("#CmbUpdateSosialMediaAccount").val(), TrxData: $("#CmbUpdateMaxCampaign").val(), TrxFlag: TrxFlag });
                $.ajax({
                    url: "asmx/TrxAgentSM.asmx/UpdateAgentDistributionData",
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
                                    $("#CmbUpdateSosialMedia").val("");
                                    $("#CmbUpdateMaxCampaign").val("")
                                    $("#ContentPlaceHolder1_HDUserAgent_Checkbox").val("")
                                    $("#modalright").modal('hide');
                                    window.location.href = "Crm_Trx_Agent_SM.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    window.location = "Crm_Trx_Agent_SM.aspx";
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
function SelectDetailProduct() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Agent_SM.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTransaksiID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK27'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $('#CmbUpdateSosialMediaType').val(json[i].channelid);
                $('#ContentPlaceHolder1_TrxAccountIDSM').val(json[i].product_id);
                $('#ComboUpdateHandle').val(json[i].maxhandle);
                $('#ContentPlaceHolder1_TrxTokenMetaAgentSM').val(json[i].TokenMeta);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbUpdateSosialMediaType(TrxChannelID) {
    $('#CmbUpdateSosialMediaType').attr("disabled", true);
    var CmbUpdateSosialMediaType = $('#CmbUpdateSosialMediaType');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Agent_SM.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxChannelID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK32'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            CmbUpdateSosialMediaType.empty();
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].TypeID + '">' + json[i].Name + '</option>';
                CmbUpdateSosialMediaType.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbUpdateSosialMediaAccount(TrxProductID) {
    $('#CmbUpdateSosialMediaAccount').attr("disabled", true);
    var CmbUpdateSosialMediaAccount = $('#CmbUpdateSosialMediaAccount');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Agent_SM.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxProductID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK144'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            CmbUpdateSosialMediaAccount.empty();
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].product_id + '">' + json[i].product_campaign + '</option>';
                CmbUpdateSosialMediaAccount.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
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
                    url: "asmx/Crm_Trx_Agent_SM.asmx/ReleaseSchedule",
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
                                    window.location.href = "Crm_Trx_Agent_SM.aspx?";
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