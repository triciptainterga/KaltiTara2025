$(document).ready(function () {
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").hide();
    LoadingScript();
    ComboChannel();
});
function LoadingScript() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_ScriptGreeting.asmx/ActionScript",
        data: "{ID:'0', Channel:'0', Header:'0', Status:'0', Greeting:'0', UserName: '" + $("#hd_sessionLogin").val() + "', Action: 'Table'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#DivCustomerSystem').empty();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                var ConverTanggal = newDate + ' ' + newTime

                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/avatar-1.jpg" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].HeaderName + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].Channel + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=ActionPreviewScript("' + json[i].ID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=ButtonDelete("' + json[i].ID + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12"></span>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + newDate + ' ' + newTime + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#DivCustomerSystem').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionPreviewScript(ParamID) {
    $("#ContentPlaceHolder1_TrxID").val(ParamID)
    $("#modalscript").modal('show')
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();

    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_ScriptGreeting.asmx/ActionScript",
        data: "{ID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', Channel:'0', Header:'0', Status:'0', Greeting:'0', UserName: '" + $("#hd_sessionLogin").val() + "', Action: 'Select'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {

                $("#ComboChannel").val(json[i].Channel)
                $("#HeaderScript").val(json[i].HeaderName)
                $("#ComboStatus").val(json[i].NA)
                CKEDITOR.instances.ScriptGreeting.setData(json[i].GreetingScript)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TambahScript() {
    $("#modalscript").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    $("#ComboChannel").val("")
    $("#HeaderScript").val("")
    $("#ComboStatus").val("")
    CKEDITOR.instances.ScriptGreeting.setData("")
}
function ComboChannel() {
    var ComboChannelType = $('#ComboChannel');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_ScriptGreeting.asmx/ActionScript",
        data: "{ID:'0', Channel:'0', Header:'0', Status:'0', Greeting:'0', UserName: '" + $("#hd_sessionLogin").val() + "', Action: 'Channel'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultComboChannel = "";

            for (i = 0; i < json.length; i++) {

                ResultComboChannel = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
                ComboChannelType.append(ResultComboChannel);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function EditScript(ParameterID) {
    $("#modalscript").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
}
function ActionSimpan() {
    if ($("#ComboChannel").val() == "" || $("#ComboChannel").val() == "Select" || $("#ComboChannel").val() == null) {
        swal(
            '',
            'Channel Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#HeaderScript").val() == "") {
        swal(
            '',
            'Header Name Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }   
    if ($("#ComboStatus").val() == "" || $("#ComboStatus").val() == "Select" || $("#ComboStatus").val() == null) {
        swal(
            '',
            'Status Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var CampaignScript = CKEDITOR.instances.ScriptGreeting.getData();
    if (CampaignScript == "") {
        swal(
            '',
            'Greeting Script Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        ID: "0", Channel: $("#ComboChannel").val(), Header: $("#HeaderScript").val(),
        Status: $("#ComboStatus").val(), Greeting: CampaignScript,
        UserName: $("#hd_sessionLogin").val(), Action: "Insert"
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Crm_Trm_ScriptGreeting.asmx/ActionScript",
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
                                    'Insert Greeting Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_ScriptGreeting.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Greeting Has Been Failed',
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
    var CampaignScript = CKEDITOR.instances.ScriptGreeting.getData();
    var form_data = JSON.stringify({
        ID: $("#ContentPlaceHolder1_TrxID").val(), Channel: $("#ComboChannel").val(), Header: $("#HeaderScript").val(),
        Status: $("#ComboStatus").val(), Greeting: CampaignScript,
        UserName: $("#hd_sessionLogin").val(), Action: "Update"
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Crm_Trm_ScriptGreeting.asmx/ActionScript",
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
                                    'Update Greeting Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_ScriptGreeting.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Greeting Has Been Failed !',
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
function ButtonDelete(ParameterID) {
    var CampaignScript = CKEDITOR.instances.ScriptGreeting.getData();
    var form_data = JSON.stringify({
        ID: $("#ContentPlaceHolder1_TrxID").val(), Channel: $("#ComboChannel").val(), Header: $("#HeaderScript").val(),
        Status: $("#ComboStatus").val(), Greeting: CampaignScript,
        UserName: $("#hd_sessionLogin").val(), Action: "Delete"
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Crm_Trm_ScriptGreeting.asmx/ActionScript",
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
                                    'Delete Greeting Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Crm_Trm_ScriptGreeting.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Greeting Has Been Failed !',
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