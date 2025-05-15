$(document).ready(function () {
    LIstData();
   // GetDataChannel();

  });


function LIstData() {
    var myTable = $('#DataSCH_Shift').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'MASTER', TrxActionType: 'ListGroupDays'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            
            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var buttonAction = "<a href='javascript:void(0);' onclick=\"Edit('" + json[i].ID + "')\"><i class='fas fa-edit'></i></a> | " +
                    "<a href='javascript:void(0);' onclick=\"Delete(" + json[i].ID + ")\"><i class='fas fa-trash-alt'></i></a>";

                myTable.row.add([json[i].ID, json[i].DayName, json[i].ChannelName, json[i].QtyAgent, buttonAction]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function Edit(Id) {

    $("#Save").hide();
    $("#Update").show();
    $("#addContactModal").modal('show');
    

    CleanObject()
    viewData(Id);
}

function viewData(id) {

    var myTable = $('#DataSCH_Shift').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + id +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'MASTER', TrxActionType: 'ListGroupByIdDays'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            for (i = 0; i < json.length; i++) {
                $('#hfId').val(json[i].ID);
                $('#mySelect').val(json[i].ChannelName);
                $('#SelectDataHari').val(json[i].DayName);
                $('#Qty').val(json[i].QtyAgent);
               
            }

           

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function Delete(id) {
    const selectedData = [];

    Swal.fire({
        title: 'Are you sure?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/InsertMasterTrxChangeSchedule",
                data: "{TrxID:'" + id + "', TrxUserName: '', TrxAction: '', TrxActionType: 'DELETEDays', Param1: '', Param2: '', Param3: '', Param4: ''}",

                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, x, result = "";
                    console.log(data.d);


                    if (json.status == "Success") {
                        swal(
                            '',
                            'Data berhasil di hapus!',
                            'success'
                        ).then(function () {
                            location.reload();

                        });

                    } else {
                        swal(
                            '',
                            'Mohon maaf data melebihi dari ' + json[i].JumlahParam + ' jumlah maksimal!',
                            'error'
                        ).then(function () {
                            return false;
                        });
                        return false;
                    }


                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    swal(
                        '',
                        xmlHttpRequest.responseText,
                        'error'
                    ).then(function () {
                        return false;
                    });
                    return false;
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            })
        } 
    });

   
    

    // Kirim data ke API menggunakan fetch (atau Anda bisa menggunakan axios)
   



   
}

function ActionSave() {
    const selectedData = [];

    if ($("#SelectDataHari").val() == "") {
        swal(
            '',
            'Hari Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }

    if ($("#mySelect").val() == "") {
        swal(
            '',
            'Channel Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Qty").val() == "") {
        swal(
            '',
            'Quantity Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }


    // Kirim data ke API menggunakan fetch (atau Anda bisa menggunakan axios)
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/InsertMasterTrxChangeSchedule",

        data: "{TrxID:'" + $('#SelectDataHari').val() + "', TrxUserName: '" + $('#mySelect').val() + "', TrxAction: '', TrxActionType: 'InsertDataDays', Param1: '" + $('#Qty').val() + "', Param2: '', Param3: '', Param4: ''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);


            if (json.status == "Success") {
                swal(
                    '',
                    'Data berhasil di input!',
                    'success'
                ).then(function () {
                    location.reload();

                });

            } else {
                swal(
                    '',
                    'Mohon maaf data melebihi dari ' + json[i].JumlahParam + ' jumlah maksimal!',
                    'error'
                ).then(function () {
                    return false;
                });
                return false;
            }


        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            swal(
                '',
                xmlHttpRequest.responseText,
                'error'
            ).then(function () {
                return false;
            });
            return false;
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })




}

function ActionUpdate() {
    const selectedData = [];


    if ($("#SelectDataHari").val() == "") {
        swal(
            '',
            'Hari Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }

    if ($("#mySelect").val() == "") {
        swal(
            '',
            'Channel Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Qty").val() == "") {
        swal(
            '',
            'Quantity Tidak boleh kosong.',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }



    // Kirim data ke API menggunakan fetch (atau Anda bisa menggunakan axios)
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/InsertMasterTrxChangeSchedule",

        data: "{TrxID:'" + $('#mySelect').val() + "', TrxUserName: '" + $('#SelectDataHari').val() + "', TrxAction: '', TrxActionType: 'UpdateDataDays', Param1: '" + $('#Qty').val() + "', Param2: '" + $('#hfId').val() + "', Param3: '', Param4: ''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);


            if (json.status == "Success") {
                swal(
                    '',
                    'Data berhasil di update!',
                    'success'
                ).then(function () {
                    location.reload();

                });

            } else {
                swal(
                    '',
                    'Mohon maaf data melebihi dari ' + json[i].JumlahParam + ' jumlah maksimal!',
                    'error'
                ).then(function () {
                    return false;
                });
                return false;
            }


        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            swal(
                '',
                xmlHttpRequest.responseText,
                'error'
            ).then(function () {
                return false;
            });
            return false;
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })




}
function GetDataChannel() {
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: JSON.stringify({
            TrxID: "",
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'MASTER',
            TrxActionType: 'LISTChannel'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (dataResponse) {
            console.log("AJAX request for days successful.");
            let channels = JSON.parse(dataResponse.d);


            $("#channelSelect").empty();

            $("#channelSelect").append('<option value="">Select a channel</option>');

            channels.forEach(function (channel) {
                $("#channelSelect").append(
                    '<option value="' + channel.ID + '">' + channel.ChannelName + '</option>'
                );
            });

            let selectedChannelId = 2; // Change this to your desired ID

            $("#channelSelect").val(selectedChannelId);







        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.error("Failed to fetch days:", xmlHttpRequest.responseText);
            alert("Error fetching days. Please try again.");
        }
    });
}


function CleanObject() {
    $("#TrxNamaMaster").val("");
    $("#cmbStatus").val("");
    $("#ContentPlaceHolder1_TrxID").val("");
}
function Tambah() {
    $("#hd_StatusAction").val('add');
    $("#addContactModal").modal('show');
    $("#save-schedule").show();
    $("#Update").hide();
    
    CleanObject();
   
}