$(document).ready(function () {
    DataTables()
});
function DataTables() {
    var myTable = $('#DataTableCampaign').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Modul_Detail.asmx/DataTable",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK26'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].Status == "Yes") {
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
                    '<a class="dropdown-item" href="#">View</a>' +
                    '<a class="dropdown-item" href="#">Edit</a>' +
                    '<a class="dropdown-item" href="#">Delete</a>' +
                    '</div>' +
                    '</div>' 
                myTable.row.add([json[i].ID, json[i].DetailName, json[i].DetailDescription, Status, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}