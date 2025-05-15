$(document).ready(function () {
    DataTableDurasi();
});
function DataTableDurasi() {
    var myTable = $('#TableDurasi').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK024'}",
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
                    '<a class="dropdown-item" href="#" onclick=updateclick(' + json[i].ID + ') >Edit</a>' +
                    '</div>' +
                    '</div>'

                myTable.row.add([json[i].ID, json[i].SiteName, json[i].Durasi, json[i].DurasiEnd, urlclick]).draw(false);
            }
            
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function updateclick(val) {
    $("#addContactModal").modal('show');
    $("#ContentPlaceHolder1_TrxID").val(val)
    TrmSelectDepartment()
}
function TrmSelectDepartment() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK231'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $('#Site').val(json[i].Site);
                $('#DurasiNya').val(json[i].Durasi);
                $('#DurasiEnd').val(json[i].DurasiEnd);
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
    if ($("#DurasiNya").val() == "" || $("#DurasiNya").val() == null) {
        swal(
            '',
            'Durasi Start is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#DurasiEnd").val() == "" || $("#DurasiEnd").val() == null) {
        swal(
            '',
            'Durasi End is empty',
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
                    ID: $("#ContentPlaceHolder1_TrxID").val(), Durasi: $("#DurasiNya").val(), DurasiEnd: $("#DurasiEnd").val(), UserName: $("#hd_sessionLogin").val(), Action: 'UPDATE'
                });
                $.ajax({
                    url: "asmx/QA_Form.asmx/UP_Durasi",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "0";
                        if (json[i].Result == "True") {
                            swal(
                                '',
                                'Update Data Has Been Success',
                                'success'
                            ).then(function () {
                                window.location.href = "QM_TrmDurasi.aspx?";
                            });
                        } else {
                            swal(
                                '',
                                'Update Data Has Been Failed !',
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
                    },
                    complete: function () {

                    }
                });

            }
        });
}