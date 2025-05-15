$(document).ready(function () {
    ComboCategory();
    TrmCategoryDetail();
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmCategoryDetail() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmCategoryDetail",
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
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].ID + ') >Edit</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].ID, json[i].CategoryName, json[i].CategoryType, json[i].SubName, Status, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectCategoryDetail() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/SelectedTransactionTrmCategoryDetail",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '-', TrxStatus: '-'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $('#cmbCategory option:selected').text(json[i].CategoryName);
                $("#cmbCategoryType option:selected").text(json[i].CategoryType);
                $('#TxtCategoryTypeName').val(json[i].SubName);
                $("#cmbStatus option:selected").text(json[i].Status);

                $("#ContentPlaceHolder1_Hd_CmbCategory").val(json[i].CategoryID);
                $("#ContentPlaceHolder1_Hd_CmbCategoryType").val(json[i].SubCategory1ID);
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
function cmbCategoryChange() {
    var JenisKondisi = "AllWhereData";
    var cmbCategoryType = $('#cmbCategoryType');
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue);

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/OnChangeTransactionTrmCategoryType",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryType = "";

            cmbCategoryType.empty();
            cmbCategoryType.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultCategoryType = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                cmbCategoryType.append(resultCategoryType);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_cmbCategoryType(value) {
    var selectedText = $("#cmbCategoryType").find("option:selected").text();
    var selectedValue = $("#cmbCategoryType").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_CmbCategoryType").val(selectedValue)
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
}
function Tambah() {
    $("#addContactModal").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    ClearObject()
    ComboCategory()
    cmbCategoryChange()
}
function UpdateKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectCategoryDetail()
}
function ActionSimpan() {
    var TrxName = $('#TxtCategoryTypeName').val();
    var TrxCmbCategory = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxCmbCategoryType = $("#ContentPlaceHolder1_Hd_CmbCategoryType").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();

    if (TrxCmbCategory == '') {
        swal(
            '',
            'Category is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxCmbCategoryType == '') {
        swal(
            '',
            'Category type is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxCmbStatus == '') {
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
            'Category detail is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxCategoryID: TrxCmbCategory, TrxSubCategory1ID: TrxCmbCategoryType, TrxName: TrxName,
                    TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCategoryDetail",
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
                                    'Insert data has been success',
                                    'success'
                                ).then(function () {
                                    $("#addContactModalLabel").modal('hide');
                                    window.location.href = "Crm_Trm_Category_Detail.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert data has been failed !',
                                    'error'
                                ).then(function () {
                                    $("#addContactModalLabel").modal('hide');
                                    return false
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
    var TrxName = $('#TxtCategoryTypeName').val();
    if (TrxName != '') {
        var regex = /^[^0-9*\\\^\/<>_#']+$/;
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
    var TrxCmbCategory = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxCmbCategoryType = $("#ContentPlaceHolder1_Hd_CmbCategoryType").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();

    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxCategoryID: TrxCmbCategory, TrxSubCategory1ID: TrxCmbCategoryType, TrxName: TrxName, TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmCategoryDetail",
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
                                    'Update data has been success',
                                    'success'
                                ).then(function () {
                                    $("#addContactModalLabel").modal('hide');
                                    window.location.href = "Crm_Trm_Category_Detail.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update data has been failed !',
                                    'error'
                                ).then(function () {
                                    $("#addContactModalLabel").modal('hide');
                                    return false
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
function ClearObject() {
    $("#TxtCategoryTypeName").val("");
    $("#cmbCategory").val("")
    $("#cmbCategoryType").val("");
    $("#ContentPlaceHolder1_Hd_CmbCategory").val("");
    $("#ContentPlaceHolder1_Hd_CmbCategoryType").val("");
    $("#ContentPlaceHolder1_Hd_Status").val("")
    $("#cmbStatus").val("");
}