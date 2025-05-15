$(document).ready(function () {
    TrmCategory();
    $("#Update").hide();
    $("#Delete").hide();
});

function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
}

function TrmCategory() {
    // Initialize DataTable with column width settings
    var myTable = $('#MasterConfig').DataTable({
        destroy: true,
        paging: true,
        searching: true,
        info: true,
        autoWidth: false,
        columns: [
            { width: '10%' },  // No column width
            { width: '40%' },  // TypeReport column width
            { width: '40%' },  // Status column width
            { width: '10%' }   // Action column width
        ]
    });

    // AJAX Request
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Master_Report.asmx/BRA_MasterReport",
        data: JSON.stringify({
            TrxID: '0',
            TrxTypeReport: '0',
            TrxStatus: '0',
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'TABLE'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            // Clear existing table data
            myTable.clear().draw();

            // Loop through the data and add rows
            json.forEach((item, index) => {
                var Status = item.Status === "Y" ? "Active" : "Non Active"; // Fixed to match the correct field
                var actionHtml = `
                <div class="flex-shrink-0 ms-2">
                    <div class="dropdown">
                        <a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="mdi mdi-dots-horizontal"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="#" onclick="UpdateKlik('${item.ID}')">Edit</a>
                            <a class="dropdown-item" href="#" onclick="ShowDeleteModal('${item.ID}')">Delete</a>
                        </div>
                    </div>
                </div>`;

                // Add row to DataTable
                myTable.row.add([
                    index + 1,
                    item.TypeReport,
                    Status,
                    actionHtml,
                ]).draw(false);
            });
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.error(xmlHttpRequest.responseText);
            console.error(textStatus);
            console.error(errorThrown);
        }
    });
}

function Tambah() {
    $('#MasterConfigName').attr("disabled", false).val("");
    $("#addContactModal").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    ClearObject();
}

function UpdateKlik(TrxID) {
    $("#updateContactModal").modal("show");
    $("#ContentPlaceHolder1_TrxID").val(TrxID); 

    $.ajax({
        url: "asmx/Crm_Trm_Master_Report.asmx/BRA_MasterReport",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            TrxID: TrxID,
            TrxTypeReport: "0",
            TrxStatus: "0",
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: "SELECT"
        }),
        success: function (data) {
            var json = JSON.parse(data.d);
            if (json.length > 0) {
                var report = json[0];
                $("#updateMasterConfigName").val(report.TypeReport);
                $("#updateStatus").val(report.Status);
            }
        },
        error: function (error) {
            console.error(error.responseText);
        }
    });
}

function ActionUpdate() {
    console.log("TrxID:", $("#ContentPlaceHolder1_TrxID").val());
    console.log("Master Report Name:", $("#updateMasterConfigName").val());
    console.log("Status:", $("#updateStatus").val());

    if ($("#updateMasterConfigName").val().trim() === "") {
        swal("", "Master Report Name is empty", "info");
        return false;
    }

    if ($("#updateStatus").val() === "" || $("#updateStatus").val() === "Select") {
        swal("", "Status is empty", "info");
        return false;
    }

    // Confirmation dialog before update
    swal({
        title: "Do you want to update this data?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willUpdate) => {
        if (willUpdate) {
            $.ajax({
                url: "asmx/Crm_Trm_Master_Report.asmx/BRA_MasterReport",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(),
                    TrxTypeReport: $("#updateMasterConfigName").val(),
                    TrxStatus: $("#updateStatus").val(),
                    TrxUserName: $("#hd_sessionLogin").val(),
                    TrxAction: "UPDATE"
                }),
                success: function (data) {
                    var json = JSON.parse(data.d);
                    if (json[0].Result === "True") {
                        swal("", "Update Data Has Been Success", "success").then(() => {
                            TrmCategory(); // Reload table data
                            $("#updateContactModal").modal("hide"); // Close modal
                        });
                    } else {
                        swal("", "Update Data Has Been Failed", "error");
                    }
                },
                error: function (error) {
                    console.error(error.responseText);
                }
            });
        }
    });
}

function ActionSimpan() {
    if ($("#MasterConfigName").val() === '') {
        swal('', 'Master Report Name is empty', 'info');
        return false;
    }

    var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
    if (!regex.test($("#MasterConfigName").val())) {
        swal('', 'Invalid characters in Master Report Name', 'error');
        return false;
    }

    if ($("#cmbStatus").val() === '' || $("#cmbStatus").val() === 'Select') {
        swal('', 'Status is empty', 'info');
        return false;
    }

    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            var form_data = JSON.stringify({
                TrxUserName: $("#hd_sessionLogin").val(),
                TrxName: $("#MasterConfigName").val(),
                TrxStatus: $("#cmbStatus").val(),
            });

            $.ajax({
                url: "asmx/Crm_Trm_Master_Report.asmx/BRA_MasterReport",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    TrxID: '0',
                    TrxTypeReport: $("#MasterConfigName").val(),
                    TrxStatus: $("#cmbStatus").val(),
                    TrxUserName: $("#hd_sessionLogin").val(),
                    TrxAction: 'INSERT',
                    TrxName: $("#MasterConfigName").val()
                }),
                success: function (data) {
                    var json = JSON.parse(data.d);
                    json.forEach((item) => {
                        if (item.Result === "True") {
                            swal('', 'Insert Data Has Been Success', 'success').then(() => {
                                location.href = "Crm_Trm_Master_Report.aspx";
                            });
                        } else {
                            swal('', 'Insert Data Has Been Failed', 'error');
                        }
                    });
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.error(xmlHttpRequest.responseText);
                }
            });
        }
    });
}

function ShowDeleteModal(TrxID) {
    $("#deleteContactModal").modal("show");
    $("#deleteTrxID").val(TrxID);

    $.ajax({
        url: "asmx/Crm_Trm_Master_Report.asmx/BRA_MasterReport",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            TrxID: TrxID,
            TrxTypeReport: "0",
            TrxStatus: "0",
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: "SELECT"
        }),
        success: function (data) {
            var json = JSON.parse(data.d);
            if (json.length > 0) {
                var report = json[0];
                $("#deleteMasterConfigName").val(report.TypeReport); // Nama
                $("#deleteStatus").val(report.Status === "Y" ? "Active" : "Non Active"); // Status
            }
        },
        error: function (error) {
            console.error(error.responseText);
        }
    });
}

function ActionDeleteKlik() {
    const TrxID = $("#deleteTrxID").val();
    const TrxUserName = $("#hd_sessionLogin").val();

    if (!TrxID) {
        swal("", "No data selected for deletion", "info");
        return false;
    }

    swal({
        title: "Do you want to delete this data?",
        text: "Once deleted, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "asmx/Crm_Trm_Master_Report.asmx/BRA_MasterReport",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    TrxID: TrxID,
                    TrxTypeReport: "0",
                    TrxStatus: "0",
                    TrxUserName: TrxUserName,
                    TrxAction: "DELETE"
                }),
                success: function (data) {
                    var json = JSON.parse(data.d);
                    if (json[0].Result === "True") {
                        swal("", "Delete Data Has Been Success", "success").then(() => {
                            TrmCategory(); // Reload table
                            $("#deleteContactModal").modal("hide"); // Close modal
                        });
                    } else {
                        swal("", "Delete Data Has Been Failed", "error");
                    }
                },
                error: function (error) {
                    console.error(error.responseText);
                    swal("", "An error occurred while processing your request", "error");
                }
            });
        }
    });
}


