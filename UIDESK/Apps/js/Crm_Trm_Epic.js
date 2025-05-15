$(document).ready(function () {
    DataTableEpic();
});

function DataTableEpic() {
    $("#Loading").css("display", "block");

    var myTable = $('.table').DataTable({
        "order": [[0, "asc"]],
        "scrollX": true
    });

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK229'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = JSON.parse(response.d);
            myTable.clear();

            $.each(data, function (index, item) {
                myTable.row.add([
                    item.ID,
                    item.AES,
                    item.AesUser,
                    generatePasswordField(item.AesPassword, 'aesPassword_' + index), // Aes Password
                    item.port,
                    item.iPDb,
                    item.dbUser,
                    generatePasswordField(item.dbPassword, 'dbPassword_' + index),  // DB Password
                    item.dbName,
                    item.agentEndpoint,
                    item.inboundEndpoint,
                    item.browserPath,
                    item.Theme,
                    item.ACW,
                    item.pbxLogin,
                    item.pbxLogOut,
                    item.pbxAux,
                    item.pbxAutoIn,
                    `<button type="button" class="btn btn-primary btn-sm" onclick="editItem(${item.ID})">Edit</button>`
                ]).draw();
            });

            $("#Loading").css("display", "none");
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.error(xmlHttpRequest.responseText);
            console.error(textStatus);
            console.error(errorThrown);
            $("#Loading").css("display", "none");
        }
    });
}

// Menghasilkan field password dengan ikon mata
function generatePasswordField(password, fieldId) {
    return `
        <div style="display: flex; align-items: center;">
            <input type="password" value="${password}" id="${fieldId}" class="form-control" readonly style="width: auto; margin-right: 5px; border: none; background-color: transparent;"/>
            <i id="icon-${fieldId}" class="fas fa-eye" style="cursor: pointer;" onclick="togglePassword('${fieldId}')"></i>
        </div>
    `;
}

// Fungsi toggle untuk menampilkan/menyembunyikan password
function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const icon = document.getElementById(`icon-${fieldId}`);

    if (passwordField.type === "password") {
        passwordField.type = "text"; // Menampilkan password
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash'); // Mengubah ikon menjadi 'eye-slash'
    } else {
        passwordField.type = "password"; // Menyembunyikan password
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye'); // Mengubah ikon kembali ke 'eye'
    }
}


function editItem(id) {
    const table = $('.table').DataTable();
    const row = $(`button[onclick="editItem(${id})"]`).closest('tr');
    const rowData = table.row(row).data();

    if (rowData) {
        $('#editID').val(rowData[0]);
        $('#editAES').val(rowData[1]);
        $('#editAesUser').val(rowData[2]);

        // Extract the value from the password input for AES Password
        const aesPasswordField = $(row).find(`#aesPassword_${row.index()}`);
        $('#editAesPassword').val(aesPasswordField.val());

        $('#editPort').val(rowData[4]);
        $('#editIPDb').val(rowData[5]);
        $('#editDbUser').val(rowData[6]);

        // Extract the value from the password input for DB Password
        const dbPasswordField = $(row).find(`#dbPassword_${row.index()}`);
        $('#editDbPassword').val(dbPasswordField.val());

        $('#editDbName').val(rowData[8]);
        $('#editAgentEndpoint').val(rowData[9]);
        $('#editInboundEndpoint').val(rowData[10]);
        $('#editBrowserPath').val(rowData[11]);
        $('#editTheme').val(rowData[12]);
        $('#editACW').val(rowData[13]);
        $('#editPbxLogin').val(rowData[14]);
        $('#editPbxLogOut').val(rowData[15]);
        $('#editPbxAux').val(rowData[16]);
        $('#editPbxAutoIn').val(rowData[17]);

        // Show the modal after populating fields
        $('#editModal').modal('show');
    } else {
        console.error('Row data not found for ID:', id);
    }
}

