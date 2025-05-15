$(document).ready(function () {
    TrmWhatsApp()
    LoadingComboSite()
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmWhatsApp() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK109'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].Status == "Yes") {
                    var StatusNya = "Aktif"
                } else {
                    var StatusNya = "Non Aktif"
                }
                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=DeleteKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].ID, json[i].NomorWA, json[i].SiteName, StatusNya, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmWhatsAppSelected() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmNomorWA.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK109'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
                $('#NomorTelepon').val(json[i].NomorWA);
                $("#ComboSite option:selected").text(json[i].SiteName);
                $("#ContentPlaceHolder1_Hd_Site").val(json[i].Site);
                //$('#ComboSite').val(json[i].Site);
                if (json[i].Status == "Yes") {
                    $("#cmbStatus option:selected").text("Aktif");
                    $("#cmbStatus").val("Yes");
                } else {
                    $("#cmbStatus option:selected").text("No Aktif");
                    $("#cmbStatus").val("No");
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
function LoadingComboSite() {
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
function UpdateKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmWhatsAppSelected();
}
function DeleteKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmWhatsAppSelected();
}
function OnchangeSite(SiteID) {
    var selectedText = $("#ComboSite").find("option:selected").text();
    var selectedValue = $("#ComboSite").val();
    $("#ContentPlaceHolder1_Hd_Site").val(selectedValue);
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

                $("#LoaderPage").show();
                var form_data = JSON.stringify({
                    ID: $("#ContentPlaceHolder1_TrxID").val(), NomorTelepon: $("#NomorTelepon").val(),
                    Site: $("#ContentPlaceHolder1_Hd_Site").val(), Status: $("#cmbStatus").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'UPDATE'
                });
                $.ajax({
                    url: "asmx/TrmNomorWA.asmx/UpdateTable",
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
                                    window.location.href = "Crm_Trm_Nomor_WhatsApp.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "Crm_Trm_Nomor_WhatsApp.aspx";
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

                $("#LoaderPage").show();
                var form_data = JSON.stringify({
                    ID: $("#ContentPlaceHolder1_TrxID").val(), NomorTelepon: $("#NomorTelepon").val(),
                    Site: $("#ComboSite").val(), Status: $("#cmbStatus").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'DELETE'
                });
                $.ajax({
                    url: "asmx/TrmNomorWA.asmx/UpdateTable",
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
                                    window.location.href = "Crm_Trm_Nomor_WhatsApp.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "Crm_Trm_Nomor_WhatsApp.aspx";
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