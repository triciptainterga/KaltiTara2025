$(document).ready(function () {
    DropdownTicket();
    DataTableDurasi()
});
function DataTableDurasi() {
    var myTable = $('#TableKategori').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $('#hd_sessionLogin').val() + "', TrxStatus: '0', TrxAction: 'UIDESK026'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=Delete(' + json[i].id + ') >Delete</a>' +
                    '</div>' +
                    '</div>'

                myTable.row.add([json[i].id, json[i].category_ticket, urlclick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdownTicket() {
    var cmbDataSourceKategori = $('#Ticket_Kategori');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'UideskIndonesia', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK306'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceKategori = "";

            cmbDataSourceKategori.empty();
            cmbDataSourceKategori.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultSourceKategori = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbDataSourceKategori.append(resultSourceKategori);

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
}
function ActionKategori() {
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
    if ($("#Ticket_Kategori").val() == "" || $("#Ticket_Kategori").val() == null) {
        swal(
            '',
            'Kategori is empty',
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
                    Id: $("#ContentPlaceHolder1_TrxID").val(), Kategori: $("#Ticket_Kategori").val(), UserName: $("#hd_sessionLogin").val(), Action:"INSERT"
                });
                $.ajax({
                    url: "asmx/QA_Form.asmx/QM_DistributeTicketKategori",
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
                                'Insert Data Has Been Success',
                                'success'
                            ).then(function () {
                                window.location.href = "QA_TrmTicketDistribute.aspx?";
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
function Delete(DeleteID) {
    $("#ContentPlaceHolder1_TrxID").val(DeleteID)
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
                    Id: $("#ContentPlaceHolder1_TrxID").val(), Kategori: "-", UserName: $("#hd_sessionLogin").val(), Action: "DELETE"
                });
                $.ajax({
                    url: "asmx/QA_Form.asmx/QM_DistributeTicketKategori",
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
                                'Delete Data Has Been Success',
                                'success'
                            ).then(function () {
                                window.location.href = "QA_TrmTicketDistribute.aspx?";
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