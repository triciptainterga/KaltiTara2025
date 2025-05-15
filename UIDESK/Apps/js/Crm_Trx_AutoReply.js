$(document).ready(function () {
    DataTables();
});
function DataTables() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmTemplateAutoReply.asmx/AHU_Uidesk_TrxEmailAutoReply_Setting",
        data: "{ID:'1', Template:'0', Account:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'TABLE'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            myTable.clear().draw();
            for (var i = 0; i < json.length; i++) {
                var statusSwitch;

                // Jika status "Y" (Active)
                if (json[i].FLAG == "Y") {
                    statusSwitch =
                        "<div class='d-flex justify-content-center'>" +
                        "<label class='switch'>" +
                        "<input type='checkbox' class='status-toggle' checked data-id='" + json[i].ID + "'>" +
                        "<span class='slider round'></span>" +
                        "</label>" +
                        "</div>";
                }
                // Jika status "N" (Non Active)
                else {
                    statusSwitch =
                        "<div class='d-flex justify-content-center'>" +
                        "<label class='switch'>" +
                        "<input type='checkbox' class='status-toggle' data-id='" + json[i].ID + "'>" +
                        "<span class='slider round'></span>" +
                        "</label>" +
                        "</div>";
                }

                myTable.row.add([json[i].ID, json[i].SETTING_TYPE, statusSwitch]).draw(false);
            }

            // Event handler untuk toggle switch
            $('.status-toggle').on('change', function () {
                var isChecked = $(this).is(':checked');
                var rowId = $(this).data('id');

                // Callback function untuk menangani perubahan status
                if (isChecked) {
                    ReplyOn(rowId);
                } else {
                    ReplyOff(rowId);
                }
            });
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ReplyOn(checked) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                if (checked) {
                    var Flaging = "1"
                } else {
                    var Flaging = "0"
                }
                var form_data = JSON.stringify({ ID: "0", Template: Flaging, Account: "", State: "", User: $("#hd_sessionLogin").val(), Action: "UPDATE" });
                $.ajax({
                    type: "POST",
                    url: "asmx/TrmTemplateAutoReply.asmx/AHU_Uidesk_TrxEmailAutoReply_Setting",
                    data: form_data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);

                        var i, x, result = "";
                        for (i = 0; i < json.length; i++) {

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
}
function ReplyOff(checked) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                if (checked) {
                    var Flaging = "1"
                } else {
                    var Flaging = "0"
                }
                var form_data = JSON.stringify({ ID: "0", Template: Flaging, Account: "", State: "", User: $("#hd_sessionLogin").val(), Action: "UPDATE" });
                $.ajax({
                    type: "POST",
                    url: "asmx/TrmTemplateAutoReply.asmx/AHU_Uidesk_TrxEmailAutoReply_Setting",
                    data: form_data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);

                        var i, x, result = "";
                        for (i = 0; i < json.length; i++) {

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
}