$(document).ready(function () {
    $("#TxtSearchingUserName").val("")
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            SearchingUser($(this).val());
            console.log('Textbox value:', $(this).val());
        } else if (jumlahString == 0) {
            SearchingUser($(this).val(""));
            console.log('Textbox value:', $(this).val());
            $("#TxtSearchingUserName").val("")
        }
    });
    LoadingUser();
    DataListQA();
});
function LoadingUser() {
    var ValUserID = $("#hd_sessionLogin").val();
    var result = "";
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrxSetting.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK205'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#DivUserSystem').empty();
            for (i = 0; i < json.length; i++) {

                var Status;
                if (json[i].Status == "Yes") {
                    Status = "<span class='badge rounded-pill badge-soft-success font-size-12'>Active</span>"
                } else {
                    Status = "<span class='badge rounded-pill badge-soft-danger font-size-12'>Non Active</span>"
                }
                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/user.png" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].UserName + '</span>' +
                    '</p>' +
                    '<h5 class="font-size-15 mb-1 text-truncate">' + json[i].NAME + '</h5>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    //'<a class="dropdown-item" href="#" onclick=UpdateKlik("' + json[i].ID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=ButtonDelete("' + json[i].ID + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<div class="font-size-13 text-muted">' + Status + '</div>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].SiteName + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#DivUserSystem').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SearchingUser(ParameterID) {
    if (ParameterID == '') {
        var jsonText = "UideskIndonesia";
    } else {
        var jsonText = ParameterID
    }
    var ValUserID = $("#hd_sessionLogin").val();
    var result = "";
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrxSetting.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + jsonText + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK205'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#DivUserSystem').empty();
            for (i = 0; i < json.length; i++) {

                var Status;
                if (json[i].Status == "Yes") {
                    Status = "<span class='badge rounded-pill badge-soft-success font-size-12'>Active</span>"
                } else {
                    Status = "<span class='badge rounded-pill badge-soft-danger font-size-12'>Non Active</span>"
                }
                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/user.png" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].UserName + '</span>' +
                    '</p>' +
                    '<h5 class="font-size-15 mb-1 text-truncate">' + json[i].NAME + '</h5>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    //'<a class="dropdown-item" href="#" onclick=UpdateKlik("' + json[i].ID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=ButtonDelete("' + json[i].ID + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<div class="font-size-13 text-muted">' + Status + '</div>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].SiteName + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#DivUserSystem').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DataListQA() {
    var myTable = $('#DataTableQA').DataTable(
        {
            "order": [[0, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrxSetting.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK206'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                //var CheckBoxNya = "<input type = 'checkbox' class='checkbox' name='checkbox" + json[i].USERID + "' id = 'checkbox" + json[i].USERID + "' onclick=AgentCheck('" + json[i].USERID + "')>" +
                //    "<label class='checkbox' for='checkbox" + json[i].USERID + "'></label>"
                var CheckBoxNya = '<input type = "checkbox" class="checkbox" name="checkbox' + json[i].USERID + '" id = "checkbox' + json[i].USERID + '" >' +
                    '<label class="checkbox" for="checkbox' + json[i].USERID + '"></label>'
                myTable.row.add([CheckBoxNya, json[i].USERID, json[i].USERNAME, json[i].NAME]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function AddUser() {
    $("#FormQA").modal('show');
}
$(function () {
    $("#btnSimpan").click(function () {
        //var message = "Id Name                  Country\n";
        var message = ""
        //Loop through all checked CheckBoxes in GridView.
        $("#DataTableQA input[type=checkbox]:checked").each(function () {
            var row = $(this).closest("tr")[0];
            message += row.cells[1].innerHTML + ",";
            //message += "   " + row.cells[2].innerHTML;
            //message += "   " + row.cells[3].innerHTML;
            //message += "\n";
        });
        $("#ContentPlaceHolder1_TrxQAId").val(message)
        if ($("#ContentPlaceHolder1_TrxQAId").val() == "") {
            swal(
                '',
                'Data QA is empty',
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
                        url: "asmx/QA_TrxSetting.asmx/InsertSettingQA",
                        data: "{UserID: '" + encodeData($("#ContentPlaceHolder1_TrxQAId").val()) + "', CreatedBy: '" + $("#hd_sessionLogin").val() + "', Action: 'INSERT'}",
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
                                        $("#FormQA").modal('hide');
                                        window.location.href = "QA_TrxSetting.aspx?";
                                    });
                                } else {
                                    swal(
                                        '',
                                        'Insert Data Has Been Failed !',
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

                var form_data = JSON.stringify({ UserID: $("#ContentPlaceHolder1_TrxID").val(), CreatedBy: $("#hd_sessionLogin").val(), Action: "DELETE" });
                $.ajax({
                    url: "asmx/QA_TrxSetting.asmx/InsertSettingQA",
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
                                    $("#FormQA").modal('hide');
                                    window.location.href = "QA_TrxSetting.aspx?";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed !',
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
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}