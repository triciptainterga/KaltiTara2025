$(document).ready(function () {
    TrmCategory() 
    $("#Update").hide();
    $("#Delete").hide();
});
function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
}
function TrmCategory() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/SelectTransactionTrmCategory",
        data: "{TrxID:'-', TrxUserName: 'Admin', TrxName: '-', TrxStatus: '-'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].Status == "Aktif") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=DeleteKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].ID, json[i].Name, urlclick]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function showAdd() {
    $('#TxtCategoryName').attr("disabled", false);
    $("#TxtCategoryName").val("");
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
}
function UpdateKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    //$("#TxtCategoryName").val(decodeURI(Name));
    //$("#cmbStatus").find("option:selected").text();
    //$("#cmbStatus").val(Status);
}
function DeleteKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    //$("#TxtCategoryName").val(decodeURI(Name));
    //$("#cmbStatus").find("option:selected").text();
    //$("#cmbStatus").val(Status);
}
function ActionSimpan() {
    if ($("#TxtCategoryName").val() == '') {
        swal(
            '',
            'Category Name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        //alert(htmlEncode(TrxName))
        //var regex = /^[^0-9*\\\^\/<>_#']+$/;
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtCategoryName").val())) {
        } else {
            console.log($("#TxtCategoryName").val())
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#cmbStatus").val() == '' || $("#cmbStatus").val() == 'Select') {
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
                var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxName: $("#TxtCategoryName").val(), TrxStatus: $("#cmbStatus").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCategory",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Transaction Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Uidesk002.aspx";
                                });
                            } else {
                                alert(json[i].Result)
                                swal(
                                    '',
                                    'Transaction Failed',
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
    var TrxName = $("#TxtCategoryName").val();
    if (TrxName != '') {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TrxName)) {
        } else {
            console.log(TrxName)
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    $("#cmbStatus").find("option:selected").text();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxStatus: $("#cmbStatus").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmCategory",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Transaction Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Uidesk002.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Transaction Failed',
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
function AutoValidasiSuccess(TrxCreatedby, Message) {
    $.toast({
        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-right',
        loaderBg: '#ff6849',
        icon: 'success',
        hideAfter: 3500,
        stack: 6
    });
    //return false
}