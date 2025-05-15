$(document).ready(function () {
    ComboCategory();
    TrmCategoryType();
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmCategoryType() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmCategoryType",
        data: "{TrxID:'-', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '-', TrxStatus: '-'}",
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
                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].ID + ') >Edit</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].ID, json[i].CategoryName, json[i].SubName, Status, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectCategoryType() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/SelectedTransactionTrmCategoryType",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '-', TrxStatus: '-'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $('#cmbCategory option:selected').text(json[i].CategoryName);
                $('#TxtCategoryTypeName').val(json[i].SubName);
                $("#cmbStatus").val(json[i].NA);

                $("#ContentPlaceHolder1_Hd_CmbCategory").val(json[i].CategoryID);
                $("#ContentPlaceHolder1_Hd_Status").val(json[i].NA);

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
    $("#addContactModal").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    ComboCategory();
    ClearObject()
}
function UpdateKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectCategoryType()
}
function DeleteKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectCategoryType()
}
function ComboCategory() {
    var cmbCategorySource = $('#cmbCategory');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            cmbCategorySource.empty();
            cmbCategorySource.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbCategorySource.append(resultCategory);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_cmbCategory(value) {
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue)
}
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
}
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
}
function checkInput(string) {
    var regex = /^[^0-9*\\\^\/<>_#']+$/;
    if (regex.test(string)) {
        return string;
    } else {
        console.log(string)
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
function ActionSimpan() {
    var TrxName = $("#TxtCategoryTypeName").val();
    var selectedValue = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxStatus = $("#ContentPlaceHolder1_Hd_Status").val();
    if (selectedValue == '') {
        swal(
            '',
            'Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxStatus == '') {
        swal(
            '',
            'Status is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxName == '') {
        swal(
            '',
            'Category type is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    //else {
    //    var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
    //    if (regex.test(TrxName)) {
    //    } else {
    //        console.log(TrxName)
    //        swal(
    //            '',
    //            'Data has been block',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $("#LoaderPage").show();
                var form_data = JSON.stringify({ TrxCategoryID: selectedValue, TrxName: TrxName, TrxStatus: TrxStatus, TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCategoryType",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";

                        console.log("ddd" + JSON.stringify(data))
                        for (i = 0; i < json.length; i++) {
                            console.log("www" + json[i].Result)
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been succesfully',
                                    'success'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    window.location.href = "Crm_Trm_Category_Type.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been failed !',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    window.location.href = "Crm_Trm_Category_Type.aspx";
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
    var TrxCmbCategory = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();
    var TrxName = $("#TxtCategoryTypeName").val();
    //if (TrxName != '') {
    //    var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
    //    if (regex.test(TrxName)) {
    //    } else {
    //        console.log(TrxName)
    //        swal(
    //            '',
    //            'Data has been block',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $("#LoaderPage").show();
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxCategoryID: TrxCmbCategory, TrxName: TrxName, TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmCategoryType",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
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
                                    'Data has been save succesfully',
                                    'success'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    window.location.href = "Crm_Trm_Category_Type.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been save failed !',
                                    'error'
                                ).then(function () {
                                    $("#addContactModal").modal('hide');
                                    window.location.href = "Crm_Trm_Category_Type.aspx";
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
function ClearObject() {
    //$("#cmbCategory").val("");
    //$('#cmbCategory').text("");
    $('#TxtCategoryTypeName').val("");
    $("#cmbStatus").val("");
    $("#ContentPlaceHolder1_Hd_CmbCategory").val("");
    $("#ContentPlaceHolder1_Hd_Status").val("");
}