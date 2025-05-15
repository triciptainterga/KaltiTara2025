$(document).ready(function () {
    TrmSite();
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmSite() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmSite",
        data: "{ID: '0', Site: '" + $("#TxtSite").val() + "', Location: '" + $("#TxtLocation").val() + "', Status: '" + $("#cmbStatus").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'TABLE'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=DeleteKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=Update(' + json[i].ID + ')>Edit</a>' +
                    '<a class="dropdown-item" href="#" onclick=Preview(' + json[i].ID + ')>Preview</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].ID, json[i].Site, json[i].Location, urlclick]).draw(false);
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
    $("#addContactModal").modal('show');
    CleanObject();
}
function Update(ParamID) {
    $("#addContactModal").modal('show');
    $("#ContentPlaceHolder1_TrxID").val(ParamID);
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $('#TxtSite').attr("disabled", false);
    $('#TxtLocation').attr("disabled", false);
    $('#cmbStatus').attr("disabled", false);
    TrmSiteSelected()
}
function Preview(ParamID) {
    $("#addContactModal").modal('show');
    $("#ContentPlaceHolder1_TrxID").val(ParamID);
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").hide();
    $('#TxtSite').attr("disabled", true);
    $('#TxtLocation').attr("disabled", true);
    $('#cmbStatus').attr("disabled", true);
    TrmSiteSelected()
}
function TrmSiteSelected() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmSite",
        data: "{ID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', Site: '" + $("#TxtSite").val() + "', Location: '" + $("#TxtLocation").val() + "', Status: '" + $("#cmbStatus").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
                $('#TxtSite').val(json[i].Site);
                $('#TxtLocation').val(json[i].Location);
                $("#cmbStatus option:selected").text(json[i].Status);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionUpdate() {
    if ($("#hd_sessionLogin").val() == "" || $("#hd_sessionLogin").val() == null) {
        swal(
            '',
            'UserName Kosong, Please Relogin',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_TrxID").val() == "" || $("#ContentPlaceHolder1_TrxID").val() == null) {
        swal(
            '',
            'Data Kosong',
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
                    ID: $("#ContentPlaceHolder1_TrxID").val(), Site: $("#TxtSite").val(),
                    Location: $("#TxtLocation").val(), Status: "Yes",
                    TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'UPDATE'
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmSite",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        console.log(data)
                        console.log(form_data)
                        var json = JSON.parse(data.d);
                        var i = "0";
                        if (json[i].Result == "True") {
                            swal(
                                '',
                                'Update Data Has Been Success',
                                'success'
                            ).then(function () {
                                window.location.href = "Crm_Trm_Site.aspx";
                            });
                        } else {
                            swal(
                                '',
                                'Update Data Has Been Failed !',
                                'error'
                            ).then(function () {
                                window.location.href = "Crm_Trm_Site.aspx";
                            });
                            return false;
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
function ActionSimpan() {
    if ($("#hd_sessionLogin").val() == "" || $("#hd_sessionLogin").val() == null) {
        swal(
            '',
            'UserName Kosong, Please Relogin',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TxtSite").val() == "") {
        swal(
            '',
            'Site Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TxtLocation").val() == "") {
        swal(
            '',
            'Location Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#cmbStatus").val() == "" || $("#cmbStatus").val() == "Select" || $("#cmbStatus").val() == null) {
        swal(
            '',
            'Status Kosong',
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

                $("#LoaderPage").show();
                var form_data = JSON.stringify({
                    ID: "0", Site: $("#TxtSite").val(),
                    Location: $("#TxtLocation").val(), Status: "Yes",
                    TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'INSERT'
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmSite",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        console.log(data)
                        console.log(form_data)
                        var json = JSON.parse(data.d);
                        var i = "0";
                        if (json[i].Result == "True") {
                            swal(
                                '',
                                'Insert Data Has Been Success',
                                'success'
                            ).then(function () {
                                window.location.href = "Crm_Trm_Site.aspx";
                            });
                        } else {
                            swal(
                                '',
                                'Insert Data Has Been Failed !',
                                'error'
                            ).then(function () {
                                window.location.href = "Crm_Trm_Site.aspx";
                            });
                            return false;
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
function CleanObject() {
    $('#TxtSite').val("");
    $('#TxtLocation').val("");
    $("#cmbStatus").val("");
    $('#TxtSite').attr("disabled", false);
    $('#TxtLocation').attr("disabled", false);
    $('#cmbStatus').attr("disabled", false);
}