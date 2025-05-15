$(document).ready(function () {
    DropdownSite();
    TrmGroupAgent();
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmGroupAgent() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmGroupAgent",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].NA == "Y") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=DeleteKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].IdGrup + ') >Edit</a>' +
                    //'<a class="dropdown-item" href="#" onclick=DeleteKlik(' + json[i].IdGrup + ') >Delete</a>' +
                    '</div>' +
                    '</div>'

                myTable.row.add([json[i].IdGrup, json[i].Site, json[i].NamaGrup, Status, urlclick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectGroupAgent(TrxID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/SelectTransactionTrmGroupAgent",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxSite:'" + $("#ComboSite").val() + "', TrxName:'" + $("#TxtGroupAgent").val() + "', TrxStatus:'" + $("#TxtGroupAgent").val() + "', TrxAction:'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#ComboSite").val(json[i].SiteID);
                $("#TxtGroupAgent").val(json[i].NamaGrup);
                $("#cmbStatus").val(json[i].NA);

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
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    $("#TxtGroupAgent").val("")
    $("#cmbStatus").val("")
}
function UpdateKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectGroupAgent()
}
function DeleteKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectGroupAgent()
}
function ActionSimpan() {
    if ($("#ComboSite").val() == '') {
        swal(
            '',
            'Site is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TxtGroupAgent").val() == '') {
        swal(
            '',
            'Group Agent is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#cmbStatus").val() == "" || $("#cmbStatus").val() == "Select") {
        swal(
            '',
            'Status is empty',
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
                    TrxUserName: $("#hd_sessionLogin").val(), TrxSite: $("#ComboSite").val(), TrxName: $("#TxtGroupAgent").val(),
                    TrxStatus: $("#cmbStatus").val()
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmGroupAgent",
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
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trm_Group_Agent.aspx?";
                                });
                            } else if (json[i].Result == "Exits") {
                                swal(
                                    '',
                                    '' + $("#TxtGroupAgent").val() +' already exits',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    return false;
                                });
                                return false;
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
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
    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
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

                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(),
                    TrxSite: $("#ComboSite").val(), TrxName: $("#TxtGroupAgent").val(), TrxStatus: $("#cmbStatus").val()
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmGroupAgent",
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
                                    window.location.href = "Crm_Trm_Group_Agent.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
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
function ActionCheck() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/SelectTransactionTrmGroupAgent",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxSite:'" + $("#ComboSite").val() + "', TrxName:'" + $("#TxtGroupAgent").val() + "', TrxStatus:'" + $("#cmbStatus").val() + "', TrxAction:'CHECK'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            if (json.length == 0) {
                swal(
                    '',
                    '' + $("#TxtGroupAgent").val() +' already exits',
                    'error'
                ).then(function () {
                    return false;
                });
                return false;
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdownSite() {
    var ComboSite = $('#ComboSite');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK108'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, Site = "";

            ComboSite.empty();
            ComboSite.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                Site = '<option value="' + json[i].ID + '">' + json[i].Site + '</option>';
                ComboSite.append(Site);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}