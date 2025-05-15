$(document).ready(function () {
    $("#Update").hide();
    $("#Delete").hide();
    DataTablePerusahaan();
});
function DataTablePerusahaan() {
    var myTable = $('#TablePerusahaan').DataTable(
        {
            "order": [[0, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK179'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].NomorTelepon == "" || json[i].NomorTelepon == null) {
                    var NomorHP = "-"
                } else {
                    var NomorHP = json[i].NomorTelepon
                }
                if (json[i].Email == "" || json[i].Email == null) {
                    var EmailAddress = "-"
                } else {
                    var EmailAddress = json[i].Email
                }
                //var urlclick = "<i class='bx bxs-edit-alt text-primary' onclick=UpdateKlik(" + json[i].PerusahaanID + ") style='cursor:pointer;'></i>&nbsp;<i class='bx bxs-user-detail text-primary' onclick=PreviewKlik('" + json[i].PerusahaanID + "') style='cursor:pointer;'></i>"
                myTable.row.add([json[i].ID, json[i].Nama_Perusahaan, NomorHP, EmailAddress, json[i].NPWP]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}