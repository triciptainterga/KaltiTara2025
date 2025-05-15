$(document).ready(function () {
    //$("#Loading").css("display", "none");
    DataTables()
    ComboLevelUser()
    ComboStatusTicket()
    $("#Update").hide();
    $("#Delete").hide();
});
function FormTambah() {
    $("#addContactModal").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
}
function UpdateKlik(ID) {
    $("#addContactModal").modal('show');
    $("#ContentPlaceHolder1_TrxID").val(ID)
    $("#Update").show();
    $("#Simpan").hide();
    $("#Delete").hide();
    TrmSelected()
}
function DeleteKlik(ID) {
    $("#addContactModal").modal('show');
    $("#ContentPlaceHolder1_TrxID").val(ID)
    $("#Update").hide();
    $("#Simpan").hide();
    $("#Delete").show();
    TrmSelected()
}
function DataTables() {
    var myTable = $('#DataTableStatus').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Status_User.asmx/Uidesk_Trx_UserStatus",
        data: "{ID:'0', LevelUser: '0', Status: '0', NA: '0', UserName:'" + $("#hd_sessionLogin").val() +"', Action:'Table'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].NA == "Y") {
                    var StatusData = "Active"
                } else {
                    var StatusData = "Non Active"
                }
                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span><span class='badge-soft-primary'><i class='fas fa-trash' onclick=DeleteKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].ID + ') >Edit</a>' +
                    '<a class="dropdown-item" href="#" onclick=DeleteKlik(' + json[i].ID + ') >Delete</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].ID, json[i].LevelUser, json[i].Status, StatusData, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboLevelUser() {
    var CmbLevelUser = $('#CmbLevelUser');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Status_User.asmx/Uidesk_Trx_UserStatus",
        data: "{ID:'0', LevelUser: '0', Status: '0', NA: '0', UserName:'" + $("#hd_sessionLogin").val() + "', Action:'LevelUser'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultLevelUser = "";

            for (i = 0; i < json.length; i++) {

                ResultLevelUser = '<option value="' + json[i].LevelUser + '">' + json[i].LevelUser + '</option>';
                CmbLevelUser.append(ResultLevelUser);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboStatusTicket() {
    var CmbStatus = $('#CmbStatus');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Status_User.asmx/Uidesk_Trx_UserStatus",
        data: "{ID:'0', LevelUser: '0', Status: '0', NA: '0', UserName:'" + $("#hd_sessionLogin").val() + "', Action:'StatusTicket'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultStatus = "";

            for (i = 0; i < json.length; i++) {

                ResultStatus = '<option value="' + json[i].status + '">' + json[i].status + '</option>'; 
                CmbStatus.append(ResultStatus);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelected() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Status_User.asmx/Uidesk_Trx_UserStatus",
        data: "{ID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', LevelUser: '0', Status: '0', NA: '0', UserName:'" + $("#hd_sessionLogin").val() + "', Action:'Select'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#CmbLevelUser").val(json[i].LevelUser)
                $("#CmbStatus").val(json[i].Status)

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
    if ($("#CmbLevelUser").val() == "" || $("#CmbLevelUser").val() == "Select") {
        swal("Level User Empty")
        return false;
    }
    if ($("#CmbStatus").val() == "" || $("#CmbStatus").val() == "Select") {
        swal("Status is empty")
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

                var form_data = JSON.stringify({ ID: "0", LevelUser: $("#CmbLevelUser").val(), Status: $("#CmbStatus").val(), NA: '0', UserName: $("#hd_sessionLogin").val(), Action: 'Insert' });
                $.ajax({
                    url: "asmx/Crm_Trm_Status_User.asmx/Uidesk_Trx_UserStatus",
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
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    DataTables()
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
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
function ActionUpdate() {
    if ($("#CmbLevelUser").val() == "" || $("#CmbLevelUser").val() == "Select") {
        swal("Level User Empty")
        return false;
    }
    if ($("#CmbStatus").val() == "" || $("#CmbStatus").val() == "Select") {
        swal("Status is empty")
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

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), LevelUser: $("#CmbLevelUser").val(), Status: $("#CmbStatus").val(), NA: '0', UserName: $("#hd_sessionLogin").val(), Action: 'Update' });
                $.ajax({
                    url: "asmx/Crm_Trm_Status_User.asmx/Uidesk_Trx_UserStatus",
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
                                    $("#addContactModal").modal('hide');
                                    DataTables()
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
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
function ActionDelete() {
    if ($("#CmbLevelUser").val() == "" || $("#CmbLevelUser").val() == "Select") {
        swal("Level User Empty")
        return false;
    }
    if ($("#CmbStatus").val() == "" || $("#CmbStatus").val() == "Select") {
        swal("Status is empty")
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

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), LevelUser: $("#CmbLevelUser").val(), Status: $("#CmbStatus").val(), NA: '0', UserName: $("#hd_sessionLogin").val(), Action: 'Delete' });
                $.ajax({
                    url: "asmx/Crm_Trm_Status_User.asmx/Uidesk_Trx_UserStatus",
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
                                    $("#addContactModal").modal('hide');
                                    DataTables()
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
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