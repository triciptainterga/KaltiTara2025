$(document).ready(function () {
    $("#DivAssignValue").hide();
    //$("#DivAssignDate").hide();
    //$("#DivAssignAgentFrom").hide();
    //$("#DivAssignAgentTo").hide();
    MasterCombo();
    DataTableAssign();
});
function MasterCombo() {
    var AssignAgentFrom = $('#AssignAgentFrom');
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxAssign.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK133'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultAgentFrom = "";

            for (i = 0; i < json.length; i++) {

                ResultAgentFrom = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                AssignAgentFrom.append(ResultAgentFrom);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    var AssignAgentTo = $('#AssignAgentTo');
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxAssign.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK133'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultAgentTo = "";

            for (i = 0; i < json.length; i++) {

                ResultAgentTo = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                AssignAgentTo.append(ResultAgentTo);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function FilterAssign() {
    $("#modal-assign").modal('show');
}
function ButtonAssignAll() {

}
//function ChangeAssignType(Type) {
//    if ($('#AssignType').val() == "Bucket") {
//        $("#DivAssignAgentTo").hide();
//    } else {
//        $("#DivAssignAgentTo").show();
//    }
//}
//function ChangeCategory(Type) {
//    if ($('#AssignCategory').val() == "Date") {
//        $("#DivAssignDate").show();
//        $("#DivAssignValue").hide();
//        //$("#DivAssignAgentFrom").hide();
//        //$("#DivAssignAgentTo").hide();
//    } else if ($('#AssignCategory').val() == "Nomor Telepon") {
//        $("#DivAssignDate").hide();
//        $("#DivAssignValue").show();
//        //$("#DivAssignAgentFrom").hide();
//        //$("#DivAssignAgentTo").hide();
//    } else {
//        $("#DivAssignDate").hide();
//        $("#DivAssignValue").hide();
//    }
//}
function ActionSubmit() {
    if ($("#AssignAgentFrom").val() == "" || $("#AssignAgentFrom").val() == "Select" || $("#AssignAgentFrom").val() == null) {
        swal(
            '',
            'Agent Name Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($('#AssignDate').val() == "") {
        swal(
            '',
            'Assign Date Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    $("#modal-assign").modal('hide');
    DataTableAssign()
}
function DataTableAssign() {
    var myTable = $('#TrmTeleHeader').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxAssign.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + $("#AssignDate").val() + "', TrxUserName: '" + $("#AssignAgentFrom").val() + "', TrxAction:'UIDESK134'}",
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
                var ConverTanggal = newDate + ' ' + newTime

                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=ReleaseCall(' + json[i].ID + ') >Release</a>' +
                    '<a class="dropdown-item" href="#" onclick=ReleaseBucket(' + json[i].ID + ') >Release Bucket</a>' +
                    '<a class="dropdown-item" href="#" onclick=AssignCall(' + json[i].ID + ') >Assign To Agent</a>' +
                    '</div>' +
                    '</div>'

                myTable.row.add([json[i].ID, json[i].Name, json[i].Telepon, json[i].Address, urlclick]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ReleaseCall(ParamID) {
    $("#ContentPlaceHolder1_TrxID").val(ParamID)
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal(
            '',
            'Data Empty',
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

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), Value: "0", UserName: $("#hd_sessionLogin").val(), Action:"Release" });
                $.ajax({
                    url: "asmx/Tele_TrxAssign.asmx/ReleaseTele",
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
                                    'Release Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    DataTableAssign();
                                });
                            } else {
                                swal(
                                    '',
                                    'Release Data Has Been Failed',
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
function ReleaseBucket(ParamID) {
    $("#ContentPlaceHolder1_TrxID").val(ParamID)
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal(
            '',
            'Data Empty',
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

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), Value: "0", UserName: $("#hd_sessionLogin").val(), Action: "ReleaseBucket" });
                $.ajax({
                    url: "asmx/Tele_TrxAssign.asmx/ReleaseTele",
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
                                    'Release Bucket Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    DataTableAssign();
                                });
                            } else {
                                swal(
                                    '',
                                    'Release Bucket Data Has Been Failed',
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
function AssignCall(ParamID) {
    $("#ContentPlaceHolder1_TrxID").val(ParamID)
    $("#modal-action-assign").modal('show');
}
function ActionSubmitAssign() {
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal(
            '',
            'Data Empty',
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

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), Value: $("#AssignAgentTo").val(), UserName: $("#hd_sessionLogin").val(), Action: "Assign" });
                $.ajax({
                    url: "asmx/Tele_TrxAssign.asmx/ReleaseTele",
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
                                    'Assign Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    DataTableAssign();
                                    $("#modal-action-assign").modal('hide');
                                });
                            } else {
                                swal(
                                    '',
                                    'Assign Data Has Been Failed',
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