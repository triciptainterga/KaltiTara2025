$(document).ready(function () {
    function DataTableMonitoringUserDK() {
        var myTable = $('#DataTableMonitoringUserDK').DataTable();
        $.ajax({
            type: "POST",
            url: "Crm_Trm_Login_DK_CRM.asmx/BRA_LoginDK_CRM",
            data: JSON.stringify({
                UserName: $("#hd_sessionLogin").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var json = JSON.parse(data.d);
                myTable.clear().draw();

                json.forEach(function (item) {
                    var LoginCRMColor = item.Login_CRM === 1 ? "success" : "danger";
                    var LoginDKColor = item.Login_DK === "ready" ? "success" : (item.Login_DK === null || item.Login_DK === "" ? "danger" : "warning");
                    var statusCRM = `<div class="flex-grow-1">
                                    <span class="mdi mdi-circle text-${LoginCRMColor} me-2" style="cursor:pointer;" onclick="ReleaseSchedule('${item.agent_name}')"></span>
                                  </div>`;
                    var statusDK = `<div class="flex-grow-1">
                                    <span class="mdi mdi-circle text-${LoginDKColor} me-2" style="cursor:pointer;" onclick="ReleaseSchedule('${item.agent_name}')"></span>
                                  </div>`;
                    myTable.row.add([item.SiteName, item.agent_name, item.NAME, item.SIP_User, statusCRM, statusDK]).draw(false);
                });

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("Error:", xmlHttpRequest.responseText);
                console.log("Status:", textStatus);
                console.log("Error Thrown:", errorThrown);
            }
        });
    }

    function generateDropdownMenu(itemId) {
        return `
        <div class="flex-shrink-0 ms-2">
            <div class="dropdown">
                <a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="mdi mdi-dots-horizontal"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="#" onclick="UpdateKlik(${itemId})">Edit</a>
                </div>
            </div>
        </div>
    `;
    }
    DataTableMonitoringUserDK();
});