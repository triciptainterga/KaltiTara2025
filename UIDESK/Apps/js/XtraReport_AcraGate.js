$(document).ready(function () {

});
function SubmitAcra() {
    swal({
        title: "Do you want to process ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    UserName: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "asmx/QA_TrmSystem.asmx/Function_CheckingACRA",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i;

                        for (i = 0; i < json.length; i++) {
                            if (json[i].TotalACRA > 0) {
                                swal(
                                    '',
                                    'Data Recording ACRA Already Exits',
                                    'info'
                                ).then(function () {
                                    location.href = "XtraReport_BRIGate.aspx";
                                });
                            } else {
                                var form_data = JSON.stringify({
                                    TrxUserName: $("#hd_sessionLogin").val()
                                });
                                $.ajax({
                                    url: "asmx/QA_TrmSystem.asmx/Function_GetACRA",
                                    method: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    data: form_data,
                                    success: function () {

                                        console.log(form_data)

                                    },
                                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                                        console.log(xmlHttpRequest.responseText);
                                        console.log(textStatus);
                                        console.log(errorThrown);
                                    },
                                    complete: function () {
                                        swal(
                                            '',
                                            'Data Recording Success',
                                            'success'
                                        ).then(function () {
                                            location.href = "XtraReport_BRIGate.aspx";
                                        });
                                    }
                                });
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