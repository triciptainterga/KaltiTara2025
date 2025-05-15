$(document).ready(function () {
    LoadingUser();
    //CmbAccountEmail();
    CmbMaximalHandle();
    TrxAgent();
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
function TrxAgent() {
    var myTable = $('#TrxAgent').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'6', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var TrxParam = '<input type = "checkbox" class="checkbox" name="checkbox' + json[i].USERID + '" id = "checkbox' + json[i].USERID + '" >' +
                    '<label class="checkbox" for="checkbox' + json[i].USERID + '"></label>'
                myTable.row.add([TrxParam, json[i].USERID, json[i].USERNAME, json[i].NAME, json[i].EMAIL_ADDRESS]).draw(false);


            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#LoaderPage").hide();
}

function loadSiteDataCards() {
    const siteDiv = $("#divCardSite");
    const currentType = "Total User"; // Contoh definisi; pastikan ini sesuai kebutuhan Anda
    const allSites = ["Pusat", "Tanjung Priok", "Pasar Baru", "Soekarno Hatta"]; // Daftar semua site yang akan ditampilkan

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({
            TrxID: "0",
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: "UIDESK51",
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (siteResponse) {
            const siteData = JSON.parse(siteResponse?.d || "[]");

            // Hitung jumlah agen per site sesuai tipe
            const siteCounts = {};
            siteData.forEach((user) => {
                const siteName = user.Site || "Pusat"; // Ganti null dengan "Pusat"

                const matchesType =
                    currentType === "Total User" ||
                    (currentType === "User Login" && user.Login === 1) ||
                    (currentType === "User Not Login" && user.Login !== 1) ||
                    (currentType === "User Aux" && user.Login === 1 && user.DescAUX !== "Ready");

                if (matchesType) {
                    siteCounts[siteName] = (siteCounts[siteName] || 0) + 1;
                }
            });

            // Kosongkan container kartu
            siteDiv.empty();

            // Pastikan kartu untuk semua site di-loop, termasuk yang tidak ada data
            allSites.forEach((siteName) => {
                const siteAgentCount = siteCounts[siteName] || 0; // Gunakan 0 jika tidak ada agen untuk site tersebut

                // Tentukan kelas latar belakang berdasarkan SiteName
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

                // Template kartu
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

            // Tambahkan event listener pada kartu
            $(".card-site").on("click", function () {
                $(".card-site").removeClass("active");
                $(this).addClass("active");
                const selectedSite = $(this).data("site");
                LoadingUser(selectedSite); // Mengirimkan site yang dipilih
            });
        },
        error: function (xhr) {
            console.error("Error loading site data:", xhr.responseText);
            alert("Gagal memuat data. Silakan coba lagi.");
        },
    });
}


function LoadingUser(selectedSite) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({
            TrxID: "0",
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: "UIDESK51",
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            const json = JSON.parse(data.d);
            const filteredData = json.filter(user => user.Site === selectedSite || (!user.Site && selectedSite === "Pusat")); // Pastikan data difilter sesuai site

            $('#divUserNotification').empty();
            filteredData.forEach((user) => {
                const scheduleStateColor = user.ScheduleState === "1" ? "success" : "danger";

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
                                            <a href="#" class="text-dark">${user.NAME} (${user.Alias})</a>
                                        </h5>
                                        <p class="text-muted text-truncate mb-0">
                                            <h6 class="font-size-13 mb-1 text-truncate">
                                                <span class="text-dark">${user.agent_name}</span>
                                            </h6>
                                            <span class="text-dark">${user.product_campaign}</span>
                                        </p>
                                        <p class="text-muted text-truncate mb-0">
                                            <span class="mdi mdi-circle text-${scheduleStateColor} me-2" 
                                                style="cursor:pointer;" 
                                                onclick="ReleaseSchedule('${user.id}')">
                                            </span>
                                        </p>
                                    </div>
                                    <div class="flex-shrink-0 dropdown"> 
                                        <a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                            <i class="fa fas fa-ellipsis-h"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end"> 
                                            <a class="dropdown-item" href="#" onclick="EditUser('${user.id}')">Edit</a> 
                                            <a class="dropdown-item" href="#" onclick="ButtonDelete('${user.id}')">Delete</a> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent border-top d-flex">
                                <div class="flex-grow-1">
                                    <span class="badge rounded-pill badge-soft-success font-size-12">${user.maxhandle}</span>
                                    <span class="badge rounded-pill badge-soft-danger font-size-12">${user.nowhandle}</span>
                                    <span class="badge rounded-pill badge-soft-primary font-size-12">${user.nowhandletoday}</span>
                                </div>
                                <div class="flex-shrink-0 ms-2">
                                    <span class="badge rounded-pill badge-soft-primary font-size-12">${user.LevelUser}</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
                $('#divUserNotification').append(resultUserNotification);
            });
        },
        error: function (xhr) {
            console.error("Error loading user data:", xhr.responseText);
        },
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
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK51'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {

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
                    '<h6 class="font-size-13 mb-1 text-truncate"><span class="text-dark">' + json[i].agent_name + '</span></h6>' +
                    '<span class="text-dark">' + json[i].product_campaign + '</span>' +
                    '</p>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="mdi mdi-circle text-' + ScheduleStateColor + ' me-2" style="cursor:pointer;" onclick=ReleaseSchedule("' + json[i].id + '")></span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=EditUser("' + json[i].id + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=ButtonDelete("' + json[i].id + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12">' + json[i].maxhandle + '</span><span class="badge rounded-pill badge-soft-danger font-size-12">' + json[i].nowhandle + '</span><span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].nowhandletoday + '</span>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].LevelUser + '</span>' +
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
function Tambah() {
    $("#modal-agent").modal('show');
    $("#btnSimpan").show();
    $("#Update").hide();
    $("#Delete").hide();
}
function EditUser(ID) {
    $("#addContactModal").modal('show');
    $("#ContentPlaceHolder1_TrxID").val(ID);
    $("#Update").show();
    $("#Delete").hide();
    SelectDetailProduct();
}
function SelectDetailProduct() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK27'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $('#CmbUpdateAccountEmail').val(json[i].product_campaign);
                $('#CmbUpdateAccountEmail').attr("disabled", true);
                $('#CmbUpdateMaxCampaign').val(json[i].maxhandle);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbAccountEmail() {
    var CmbAccountEmail = $('#CmbAccountEmail');
    var CmbUpdateAccountEmail = $('#CmbUpdateAccountEmail');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK47'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].incoming_account_name + '">' + json[i].incoming_account_name + '</option>';
                CmbAccountEmail.append(result);
                CmbUpdateAccountEmail.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbMaximalHandle() {
    var CmbMaximalHandle = $('#CmbMaxCampaign');
    var CmbUpdateMaxCampaign = $('#CmbUpdateMaxCampaign');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK25'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].max_handle + '">' + json[i].max_handle + '</option>';
                CmbMaximalHandle.append(result);
                CmbUpdateMaxCampaign.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ButtonDelete(rec_id) {
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/Crm_Trx_Agent_Email.asmx/DeleteAgentDistributionData",
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
                                    window.location.href = "Crm_Trx_Agent_Email.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
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
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal(
            '',
            'Agent is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#CmbUpdateAccountEmail").val() == "Select" || $("#CmbUpdateAccountEmail").val() == "") {
        swal(
            '',
            'Account email is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#CmbUpdateMaxCampaign").val() == "" || $("#CmbUpdateMaxCampaign").val() == "Select") {
        swal(
            '',
            'Maximal distribution data is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxFlag = $("#ContentPlaceHolder1_HDAgent_Checkbox").val();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAccount: $("#CmbUpdateAccountEmail").val(), TrxData: $("#CmbUpdateMaxCampaign").val(), TrxFlag: TrxFlag });
                $.ajax({
                    url: "asmx/Crm_Trx_Agent_Email.asmx/UpdateAgentDistributionData",
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
                                    $("#addContactModal").modal('hide');
                                    CleanObject()
                                    window.location.href = "Crm_Trx_Agent_Email.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
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
$(function () {
    //Assign Click event to Button.
    $("#btnSimpan").click(function () {
        //var message = "Id Name                  Country\n";
        var message = ""
        //Loop through all checked CheckBoxes in GridView.
        $("#TrxAgent input[type=checkbox]:checked").each(function () {
            var row = $(this).closest("tr")[0];
            message += row.cells[1].innerHTML + ",";
            //message += "   " + row.cells[2].innerHTML;
            //message += "   " + row.cells[3].innerHTML;
            //message += "\n";
        });
        $("#ContentPlaceHolder1_TrxAgentId").val(message)
        if ($("#ContentPlaceHolder1_TrxAgentId").val() == "") {
            swal(
                '',
                'Data Agent is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#CmbAccountEmail").val() == "Select" || $("#CmbAccountEmail").val() == "") {
            swal(
                '',
                'Account email is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#CmbMaxCampaign").val() == "Select" || $("#CmbMaxCampaign").val() == "") {
            swal(
                '',
                'Maximal distribution data is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#ContentPlaceHolder1_TrxAgentId").val() == "") {
            swal(
                '',
                'Agent is empty',
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

                    $.ajax({
                        type: "POST",
                        url: "asmx/Crm_Trx_Agent_Email.asmx/InsertAgentDistributionData",
                        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxData: '" + encodeData($("#ContentPlaceHolder1_TrxAgentId").val()) + "', TrxCampaign: '0', MaxCampaign: '" + $("#CmbMaxCampaign").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {

                            var json = JSON.parse(data.d);
                            var i = "";
                            for (i = 0; i < json.length; i++) {
                                if (json[i].Result == "True") {
                                    swal(
                                        '',
                                        'Insert Data Has Been Success',
                                        'success'
                                    ).then(function () {
                                        $("#modal-agent").modal('hide');
                                        CleanObject()
                                        window.location.href = "Crm_Trx_Agent_Email.aspx";
                                    });
                                } else {
                                    swal(
                                        '',
                                        'Insert Data Has Been Failed',
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
                        }
                    })

                }
            });

    });
});
function CleanObject() {
    $("#CmbUpdateAccountEmail").val("");
    $("#CmbUpdateMaxCampaign").val("")
    $("#ContentPlaceHolder1_HDAgent_Checkbox").val("")
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
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
                                    window.location.href = "Crm_Trx_Agent_Email.aspx?";
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