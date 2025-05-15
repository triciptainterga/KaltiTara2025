$(document).ready(function () {
    DataTableAccount()
    ComboSite()
});
function DataTableAccount() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK139'}",
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
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].rec_id + ') >Edit</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].incoming_account_name, json[i].Site, json[i].Location, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelect() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK140'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#Account_Email_Corporate").val(json[i].incoming_account_name);
                $('#ComboSite').val(json[i].SiteID);
                $("#ComboSite").find("option:selected").text(json[i].Site);
                $('#Location').val(json[i].Location);

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
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal("Data is empty")
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
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxAccount: $("#Account_Email_Corporate").val(), TrxSite: $("#ComboSite").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'Update'
                });
                $.ajax({
                    url: "asmx/TrmAccountEmail.asmx/UpdateDataTableEmailAccounts",
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
                                    'Data Has Been Update Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Crm_Trm_Account_Email.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Update failed !',
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
function ComboSite() {
    var ComboSiteName = $('#ComboSite');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK108'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultNya = "";

            for (i = 0; i < json.length; i++) {

                ResultNya = '<option value="' + json[i].ID + '">' + json[i].Site + '</option>';
                ComboSiteName.append(ResultNya);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function UpdateKlik(rec_id) {
    $("#addContactModal").modal('show');
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    TrmSelect();
}