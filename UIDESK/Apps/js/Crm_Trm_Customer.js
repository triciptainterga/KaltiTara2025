$(document).ready(function () {
    //$("#Loading").css("display", "none");
    //LoadingCustomer()
    //$("#Update").hide();
    //$("#Delete").hide();
    ListCustomer()
    DropdownCustomerType();
    DropdownPerusahaanType();
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 4) {
            CustomerSearching($(this).val());
        } else if (jumlahString == 0) {
            CustomerSearching($(this).val(""));
        }
    });
    $("#AddCustomer_NamaPerusahaan").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            $("#Div_CustomerSearching").show()
            SearchingPerusahaan($(this).val());
        } else if (jumlahString == 0) {
            $("#FormAddPerusahaan").show()
            $("#FormListPIC").hide()
            $("#Div_CustomerSearching").hide()
            //SearchingUser($(this).val(""));
        }
    });
    $("#TxtSearchingUserName").hide();
    $("#FormNewPerusahaan").hide()
    $("#SimpanPerusahaan").hide()
    $("#CancelCustomer").hide()
    $("#UpdateCustomer").hide()
    $("#FormListPIC").hide()
});
function ListCustomer() {
    let activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        activeLink.classList.remove('active');
    }
    let listLink = document.querySelector('.nav-link[title="List"]');
    if (listLink) {
        listLink.classList.add('active');
    }
    $("#TxtSearchingUserName").hide();
    $("#DivTabelCustomer").show();
    $("#DivBoxCustomer").hide();
    var myTable = $('#TableCustomer').DataTable(
        {
            "order": [[0, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK113'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].HP == "" || json[i].HP == null) {
                    var NomorHP = "-"
                } else {
                    var NomorHP = json[i].HP
                }
                if (json[i].Email == "" || json[i].Email == null) {
                    var EmailAddress = "-"
                } else {
                    var EmailAddress = json[i].Email
                }
                var urlclick = "<i class='bx bxs-edit-alt text-primary' onclick=UpdateKlik(" + json[i].CustomerID + ") style='cursor:pointer;'></i>&nbsp;<i class='bx bxs-user-detail text-primary' onclick=PreviewKlik('" + json[i].CustomerID + "') style='cursor:pointer;'></i>"
                myTable.row.add([json[i].CustomerTypeNya, json[i].Name, json[i].Nama_Perusahaan, json[i].NPWP, NomorHP, EmailAddress, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function BoxCustomer() {
    let activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        activeLink.classList.remove('active');
    }
    let gridLink = document.querySelector('.nav-link[title="Grid"]');
    if (gridLink) {
        gridLink.classList.add('active');
    }
    $("#DivBoxCustomer").show();
    $("#DivTabelCustomer").hide();
    $("#TxtSearchingUserName").show();
    var ValUserID = $("#hd_sessionLogin").val();
    var result = "";
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK113'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#DivUserSystem').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].HP == "" || json[i].HP == null) {
                    var NomorHP = "-"
                } else {
                    var NomorHP = json[i].HP
                }
                if (json[i].Email == "" || json[i].Email == null) {
                    var EmailAddress = "-"
                } else {
                    var EmailAddress = json[i].Email
                }
                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/avatar-1.jpg" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].Name + '</span>' +
                    '</p>' +
                    '<h5 class="font-size-15 mb-1 text-truncate">' + NomorHP + '</h5>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik("' + json[i].CustomerID + '")>Edit</a> ' +
                    //'<a class="dropdown-item" href="#" onclick=DeleteKlik("' + json[i].CustomerID + '")>Delete</a> ' +
                    '<a class="dropdown-item" href="#" onclick=PreviewKlik("' + json[i].CustomerID + '")>Preview</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<div class="font-size-13 text-muted">' + NomorHP + '</div>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + EmailAddress + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#DivUserSystem').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CustomerSearching(ParameterID) {
    if (ParameterID == '') {
        var jsonText = "UideskIndonesia";
    } else {
        var jsonText = ParameterID
    }
    var ValUserID = $("#hd_sessionLogin").val();
    var result = "";
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + jsonText + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK121'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#DivUserSystem').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].HP == "" || json[i].HP == null) {
                    var NomorHP = "-"
                } else {
                    var NomorHP = json[i].HP
                }
                if (json[i].Email == "" || json[i].Email == null) {
                    var EmailAddress = "-"
                } else {
                    var EmailAddress = json[i].Email
                }
                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/avatar-1.jpg" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].Name + '</span>' +
                    '</p>' +
                    '<h5 class="font-size-15 mb-1 text-truncate">' + NomorHP + '</h5>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik("' + json[i].CustomerID + '")>Edit</a> ' +
                    //'<a class="dropdown-item" href="#" onclick=DeleteKlik("' + json[i].CustomerID + '")>Delete</a> ' +
                    '<a class="dropdown-item" href="#" onclick=PreviewKlik("' + json[i].CustomerID + '")>Preview</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<div class="font-size-13 text-muted">' + NomorHP + '</div>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + EmailAddress + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#DivUserSystem').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
//function LoadingCustomer() {
//    var ValUserID = $("#hd_sessionLogin").val();
//    var result = "";
//    $.ajax({
//        type: "POST",
//        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
//        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK113'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            var json = JSON.parse(data.d);
//            var i = "";

//            $('#DivCustomerSystem').empty();
//            for (i = 0; i < json.length; i++) {
//                if (json[i].HP == "" || json[i].HP == null) {
//                    var NomorHP = "-"
//                } else {
//                    var NomorHP = json[i].HP
//                }
//                if (json[i].Email == "" || json[i].Email == null) {
//                    var EmailAddress = "-"
//                } else {
//                    var EmailAddress = json[i].Email
//                }
//                if (json[i].NA == "Y") {
//                    var Status = "Active"
//                    var color = "success"
//                } else {
//                    var Status = "Non Active"
//                    var color = "danger"
//                }
//                var d = new Date(json[i].Birth);
//                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
//                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
//                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

//                resultUserNotification = '<div class="card border shadow-none">'+
//                    '<div class="card-body">'+
//                    '<div class="d-flex">' +
//                    '<div class="flex-grow-1 me-2 flex-wrap">' +
//                    '<h5 class="font-size-15 mb-1"><a href="#" class="text-dark">' + json[i].Name +'</a></h5>' +
//                    '<p class="text-muted mb-0">' + json[i].Alamat +'</p>' +
//                    '</div>' +
//                    '<div class="flex-shrink-0">' +
//                    '<div class="d-flex gap-2">' +
//                    '<div class="dropdown">' +
//                    '<a class="btn btn-light btn-sm dropdown-toggle" href="#" role="button"' +
//                    'data-bs-toggle="dropdown" aria-haspopup="true">' +
//                    '<i class="fa fas fa-ellipsis-h"></i>' +
//                    '</a>' +
//                    '<ul class="dropdown-menu dropdown-menu-end">' +
//                    '<li><a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].CustomerID + ')>Edit</a></li>' +
//                    '<li><a class="dropdown-item" href="#" onclick=DeleteKlik(' + json[i].CustomerID + ')>Delete</a></li>' +
//                    '<li>' +
//                    '<hr class="dropdown-divider">' +
//                    '</li>' +
//                    '<li><a class="dropdown-item" href="#" onclick=PreviewKlik(' + json[i].CustomerID + ')>Preview</a></li>' +
//                    '</ul>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '<div class="">' +
//                    '<div class="row g-0">' +
//                    '<div class="col-xl-3 col-sm-6">' +
//                    '<div class="border p-3 h-100">' +
//                    '<div>' +
//                    '<p class="text-muted font-size-13 mb-2">Nomor Handphone</p>' +
//                    '<div class="badge badge-soft-primary font-size-12">' + NomorHP +'</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '<div class="col-xl-3 col-sm-6">' +
//                    '<div class="border p-3 h-100">' +
//                    '<div>' +
//                    '<p class="text-muted font-size-13 mb-2">Email</p>' +
//                    '<div class="badge badge-soft-primary font-size-12">' + EmailAddress +'</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '<div class="col-xl-3 col-sm-6">' +
//                    '<div class="border p-3 h-100">' +
//                    '<div>' +
//                    '<p class="text-muted font-size-13 mb-2">Tanggal Lahir</p>' +
//                    '<h5 class="font-size-14 mb-0">' + newDate + ' ' + newTime +'</h5>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '<div class="col-xl-3 col-sm-6">' +
//                    '<div class="border p-3 h-100">' +
//                    '<div>' +
//                    '<p class="text-muted font-size-13 mb-2">Status</p>' +
//                    '<div class="badge bg-'+ color +' font-size-12">' + Status +'</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div >'
//                $('#DivCustomerSystem').append(resultUserNotification)

//            }

//        },
//        error: function (xmlHttpRequest, textStatus, errorThrown) {
//            console.log(xmlHttpRequest.responseText);
//            console.log(textStatus);
//            console.log(errorThrown);
//        }
//    })
//}
//function CustomerSearching(ParameterID) {
//    var ValUserID = $("#hd_sessionLogin").val();
//    var result = "";
//    $.ajax({
//        type: "POST",
//        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
//        data: "{TrxID:'" + ParameterID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK121'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            var json = JSON.parse(data.d);
//            var i = "";

//            $('#DivCustomerSystem').empty();
//            for (i = 0; i < json.length; i++) {
//                if (json[i].HP == "" || json[i].HP == null) {
//                    var NomorHP = "-"
//                } else {
//                    var NomorHP = json[i].HP
//                }
//                if (json[i].Email == "" || json[i].Email == null) {
//                    var EmailAddress = "-"
//                } else {
//                    var EmailAddress = json[i].Email
//                }
//                if (json[i].NA == "Y") {
//                    var Status = "Active"
//                    var color = "success"
//                } else {
//                    var Status = "Non Active"
//                    var color = "danger"
//                }
//                var d = new Date(json[i].Birth);
//                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
//                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
//                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

//                resultUserNotification = '<div class="card border shadow-none">' +
//                    '<div class="card-body">' +
//                    '<div class="d-flex">' +
//                    '<div class="flex-grow-1 me-2 flex-wrap">' +
//                    '<h5 class="font-size-15 mb-1"><a href="#" class="text-dark">' + json[i].Name + '</a></h5>' +
//                    '<p class="text-muted mb-0">' + json[i].Alamat + '</p>' +
//                    '</div>' +
//                    '<div class="flex-shrink-0">' +
//                    '<div class="d-flex gap-2">' +
//                    '<div class="dropdown">' +
//                    '<a class="btn btn-light btn-sm dropdown-toggle" href="#" role="button"' +
//                    'data-bs-toggle="dropdown" aria-haspopup="true">' +
//                    '<i class="fa fas fa-ellipsis-h"></i>' +
//                    '</a>' +
//                    '<ul class="dropdown-menu dropdown-menu-end">' +
//                    '<li><a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].CustomerID + ')>Edit</a></li>' +
//                    '<li><a class="dropdown-item" href="#" onclick=DeleteKlik(' + json[i].CustomerID + ')>Delete</a></li>' +
//                    '<li>' +
//                    '<hr class="dropdown-divider">' +
//                    '</li>' +
//                    '<li><a class="dropdown-item" href="#" onclick=PreviewKlik(' + json[i].CustomerID + ')>Preview</a></li>' +
//                    '</ul>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '<div class="">' +
//                    '<div class="row g-0">' +
//                    '<div class="col-xl-3 col-sm-6">' +
//                    '<div class="border p-3 h-100">' +
//                    '<div>' +
//                    '<p class="text-muted font-size-13 mb-2">Nomor Handphone</p>' +
//                    '<div class="badge badge-soft-primary font-size-12">' + NomorHP + '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '<div class="col-xl-3 col-sm-6">' +
//                    '<div class="border p-3 h-100">' +
//                    '<div>' +
//                    '<p class="text-muted font-size-13 mb-2">Email</p>' +
//                    '<div class="badge badge-soft-primary font-size-12">' + EmailAddress + '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '<div class="col-xl-3 col-sm-6">' +
//                    '<div class="border p-3 h-100">' +
//                    '<div>' +
//                    '<p class="text-muted font-size-13 mb-2">Tanggal Lahir</p>' +
//                    '<h5 class="font-size-14 mb-0">' + newDate + ' ' + newTime + '</h5>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '<div class="col-xl-3 col-sm-6">' +
//                    '<div class="border p-3 h-100">' +
//                    '<div>' +
//                    '<p class="text-muted font-size-13 mb-2">Status</p>' +
//                    '<div class="badge bg-' + color + ' font-size-12">' + Status + '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div>' +
//                    '</div >'
//                $('#DivCustomerSystem').append(resultUserNotification)

//            }

//        },
//        error: function (xmlHttpRequest, textStatus, errorThrown) {
//            console.log(xmlHttpRequest.responseText);
//            console.log(textStatus);
//            console.log(errorThrown);
//        }
//    })
//}
function TrmCustomer() {
    $("#Loading").css("display", "block");
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK113'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Birth);
                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].NA == "Y") {
                    var Status = "Aktif"
                } else {
                    var Status = "Non Aktif"
                }
                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].CustomerID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=DeleteKlik(" + json[i].CustomerID + ") style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].CustomerID, json[i].Name, json[i].JenisKelamin, newDate + ' ' + newTime, json[i].HP, json[i].Email, urlclick]).draw(false);

            }
            $("#Loading").css("display", "none");

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
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {


                $("#AddCustomer_Name").val(json[i].Name)
                $("#AddCustomer_NIK").val(json[i].NIK)
                $("#AddCustomer_Type").find("option:selected").text();
                $("#AddCustomer_Type").val(json[i].CompID);
                $("#AddCustomer_NamaPerusahaan").val(json[i].NamaPerusahaan)
                $("#AddCustomer_NPWP").val(json[i].NPWP)
                $("#AddCustomer_Email").val(json[i].Email)
                $("#AddCustomer_HP").val(json[i].HP)
                $("#AddCustomer_Facebook").val(json[i].Facebook)
                $("#AddCustomer_Instagram").val(json[i].Instagram)
                $("#AddCustomer_Twitter").val(json[i].Twitter)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function UpdateKlik(TrxID) {
    $("#modalagent").modal('show');
    $("#SimpanCustomer").hide();
    $("#UpdateCustomer").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelect();
}
function DeleteKlik(TrxID) {
    $("#modalagent").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelect();
}
function PreviewKlik(TrxID) {
    //$("#modalagent").modal('show');
    //$("#Simpan").hide();
    //$("#Update").hide();
    //$("#Delete").hide();
    //$("#ContentPlaceHolder1_TrxID").val(TrxID);
    //TrmSelect();
    location.href = "Crm_Trm_Customer_Detail.aspx?id=" + TrxID +""
}
function TambahUser() {
    $("#modalagent").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val("");
    FormCleansingLoadCustomer();
    //CKEDITOR.instances.Alamat.setData("")
}
function ActionSimpan() {
    if ($("#Name").val() == "") {
        swal(
            '',
            'Name Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboGender").val() == "") {
        swal(
            '',
            'Gender Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Alamat").val() == '') {
        swal(
            '',
            'Address Empty',
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
                    TrxUsername: $("#hd_sessionLogin").val(), TrxCusTomerName: $("#Name").val(), TrxCusTomerEmail: $("#Email").val(),
                    TrxCusTomerPhone: $("#HP").val(), TrxCusTomerGender: $("#ComboGender").val(), TrxCusTomerDate: $("#Birth").val(),
                    TrxCusTomerNIK: $("#NIK").val(), TrxCusTomerAlamat: $("#Alamat").val(), TrxNumberID: "0", TrxCustomerPolisNumber: "0",
                    TrxFacebook: $("#Facebook").val(), TrxInstagram: $("#Instagram").val(), TrxTwitter: $("#Twitter").val()
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/InsertTransactionCustomer",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Customer Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location = "Crm_Trm_Customer.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Customer Has Been Failed !',
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
                    }
                })

            }
        })
}
function ActionUpdate() {
    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
        swal(
            '',
            'Customer Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#hd_sessionLogin").val() == '') {
        swal(
            '',
            'Session Empty, Please Re-Login',
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
                    TrxCustomerID: $("#ContentPlaceHolder1_TrxID").val(), TrxUsername: $("#hd_sessionLogin").val(), TrxCusTomerName: $("#Name").val(), TrxCusTomerEmail: $("#Email").val(),
                    TrxCusTomerPhone: $("#HP").val(), TrxCusTomerGender: $("#ComboGender").val(), TrxCusTomerDate: $("#Birth").val(),
                    TrxCusTomerNIK: $("#NIK").val(), TrxCusTomerAlamat: $("#Alamat").val(), TrxStatus: "Y", TrxFacebook: $("#Facebook").val(),
                    TrxInstagram: $("#Instagram").val(), TrxTwitter: $("#Twitter").val()
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/UpdateTransactionCustomer",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Customer Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location = "Crm_Trm_Customer.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Customer Has Been Failed !',
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
                    }
                })

            }
        })
}
function ActionDelete() {

}
function FormNewPerusahaan() {
    $("#FormNewPerusahaan").show();
    $("#SimpanPerusahaan").show();
    $("#CancelCustomer").show();
    //----
    $("#FormNewCustomer").hide();
    $("#SimpanCustomer").hide();
    $("#CloseCustomer").hide();
    $("#UpdateCustomer").hide();
}
function ActionCancelPerusahaan() {
    $("#FormNewPerusahaan").hide()
    $("#SimpanPerusahaan").hide()
    $("#CancelCustomer").hide()
    //----
    $("#FormNewCustomer").show()
    $("#SimpanCustomer").show()
    $("#CloseCustomer").show()
}
function ActionSimpanCustomer() {
    if ($("#AddCustomer_Name").val() == "") {
        swal(
            '',
            'Name is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AddCustomer_Type").val() == "") {
        swal(
            '',
            'Type is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AddCustomer_NamaPerusahaan").val() == '') {
        swal(
            '',
            'Nama Perusahaan is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AddCustomer_NPWP").val() == '') {
        swal(
            '',
            'NPWP is empty',
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
                    TrxUsername: $("#hd_sessionLogin").val(), TrxCusTomerName: $("#AddCustomer_Name").val(), TrxCusTomerEmail: $("#AddCustomer_Email").val(),
                    TrxCusTomerPhone: $("#AddCustomer_HP").val(), TrxCusTomerType: $("#AddCustomer_Type").val(), TrxCusTomerPerusahaan: $("#AddCustomer_NamaPerusahaan").val(),
                    TrxCusTomerNIK: $("#AddCustomer_NIK").val(), TrxCusTomerAlamat: $("#AddCustomer_Alamat").val(), TrxFacebook: $("#AddCustomer_Facebook").val(),
                    TrxInstagram: $("#AddCustomer_Instagram").val(), TrxTwitter: $("#AddCustomer_Twitter").val(), TrxNPWP: $("#AddCustomer_NPWP").val()
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/BRA_Customer",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Customer Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modalnewcustomer").modal('hide');
                                });
                                FormLoadCustomer(json[i].CustomerID)
                            } else {
                                swal(
                                    '',
                                    'Insert Customer Has Been Failed !',
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
                    }
                })

            }
        })
}
function ActionSimpanPerusahaan() {
    //if ($("#Perusahaan_Nama").val() == "") {
    //    swal(
    //        '',
    //        'Nama Perusahaan/Pemerintah is empty',
    //        'info'
    //    ).then(function () {
    //        return false;
    //    });
    //    return false;
    //}
    //swal({
    //    title: "Do you want to process?",
    //    icon: "warning",
    //    buttons: true,
    //    dangerMode: true,
    //})
    //    .then((willDelete) => {
    //        if (willDelete) {

    //            var form_data = JSON.stringify({
    //                TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Perusahaan_Nama").val(), TrxEmail: $("#AddPerusahaan_Type").val(),
    //                TrxTelepon: "-", TrxNPWP: $("#Perusahaan_NPWP").val(), TrxAction: "INSERT"
    //            });
    //            $.ajax({
    //                type: "POST",
    //                url: "asmx/ServiceCustomer.asmx/BRA_Perusahaan",
    //                contentType: "application/json; charset=utf-8",
    //                dataType: "json",
    //                data: form_data,
    //                success: function (data) {
    //                    var json = JSON.parse(data.d);
    //                    var i, x = "";
    //                    var tblTickets = "";

    //                    for (i = 0; i < json.length; i++) {

    //                        if (json[i].Result == "True") {
    //                            swal(
    //                                '',
    //                                'Insert Perusahaan Has Been Success',
    //                                'success'
    //                            ).then(function () {
    //                                $("#FormNewPerusahaan").hide()
    //                                $("#SimpanPerusahaan").hide()
    //                                $("#CancelCustomer").hide()
    //                                $("#FormNewCustomer").show()
    //                            });
    //                        } else {
    //                            swal(
    //                                '',
    //                                'Insert Perusahaan Has Been Failed !',
    //                                'error'
    //                            ).then(function () {
    //                                return false;
    //                            });
    //                            return false;
    //                        }

    //                    }
    //                },
    //                error: function (xmlHttpRequest, textStatus, errorThrown) {
    //                    console.log(xmlHttpRequest.responseText);
    //                    console.log(textStatus);
    //                    console.log(errorThrown);
    //                }
    //            })

    //        }
    //    })

    if ($("#Perusahaan_Nama").val() == "") {
        swal(
            '',
            'Nama Perusahaan/Pemerintah is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#AddPerusahaan_Type").val() == "") {
        swal(
            '',
            'Type is empty',
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
                    AccountName: $("#Perusahaan_Nama").val()
                    , MainPhone: ""
                    , NPWP: $("#Perusahaan_NPWP").val()
                    , Email: ""
                    , ContactId: ""

                });

                savePerusahaanDynamic(form_data)

            }
        })
}
function ActionUpdateCustomer() {
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal(
            '',
            'Customer is empty',
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
                    TrxCustomerID: $("#ContentPlaceHolder1_TrxID").val(), TrxUsername: $("#hd_sessionLogin").val(), TrxCusTomerName: $("#AddCustomer_Name").val(), TrxCusTomerEmail: $("#AddCustomer_Email").val(),
                    TrxCusTomerPhone: $("#AddCustomer_HP").val(), TrxCusTomerType: $("#AddCustomer_Type").val(), TrxCusTomerPerusahaan: $("#AddCustomer_NamaPerusahaan").val(),
                    TrxCusTomerNIK: $("#AddCustomer_NIK").val(), TrxCusTomerAlamat: $("#AddCustomer_Alamat").val(), TrxFacebook: $("#AddCustomer_Facebook").val(),
                    TrxInstagram: $("#AddCustomer_Instagram").val(), TrxTwitter: $("#AddCustomer_Twitter").val(), TrxNPWP: $("#AddCustomer_NPWP").val()
                });
                $.ajax({
                    type: "POST",
                    url: "asmx/ServiceCustomer.asmx/BRA_Customer_Fetch",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Customer Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modalagent").modal('hide');
                                });
                                FormLoadCustomer(json[i].CustomerID)
                            } else {
                                swal(
                                    '',
                                    'Update Customer Has Been Failed !',
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
                    }
                })

            }
        })
}
function SearchingPerusahaan(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    var ResultCustomerSearching = "";
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK170'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_CustomerSearching').empty();
            var closeButton = '</br><a href="#" class="btn btn-soft-danger btn-sm" onclick="closeDiv()">Close</a>';
            $('#Div_CustomerSearching').append(closeButton);
            for (i = 0; i < json.length; i++) {

                ResultCustomerSearching = '<ul class="list-unstyled chat-list" onclick="PerusahaanSelected(' + json[i].ID + ')">' +
                    '<li class="active">' +
                    '<a href="#">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].Nama_Perusahaan.substr(0, 1).toUpperCase() + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="text-truncate font-size-14 mb-1">' + json[i].Nama_Perusahaan + '</h5>' +
                    '<p class="text-truncate mb-0">' + json[i].NPWP + '</p>' +
                    //'<p class="text-truncate mb-0">' + json[i].Email + '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0">' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
                $('#Div_CustomerSearching').append(ResultCustomerSearching)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function PerusahaanSelected(ID) {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK171'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#AddCustomer_NamaPerusahaan").val(json[i].Nama_Perusahaan)
                $("#AddCustomer_NPWP").val(json[i].NPWP)
                $("#Div_CustomerSearching").hide()

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#FormAddPerusahaan").hide()
    $("#FormListPIC").show()
}
function FormListPIC() {
    $("#Div_CustomerSearchingPIC").show()
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trx_Ticket.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#AddCustomer_NamaPerusahaan").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK174'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_CustomerSearchingPIC').empty();
            var closeButton = '</br><a href="#" class="btn btn-soft-danger btn-sm" onclick="closeDiv()" style="margin-top:-25px;">Close</a>';
            $('#Div_CustomerSearchingPIC').append(closeButton);
            for (i = 0; i < json.length; i++) {

                if (json[i].HP == "" || json[i].HP == null) {
                    var NomorHP = "-"
                } else {
                    var NomorHP = json[i].HP
                }
                if (json[i].Email == "" || json[i].Email == null) {
                    var EmailAddress = "-"
                } else {
                    var EmailAddress = json[i].Email
                }
                ResultCustomerSearching = '<ul class="list-unstyled chat-list" style="margin-top:-10px;" onclick="CustomerSelected(' + json[i].CustomerID + ')">' +
                    '<li class="active">' +
                    '<a href="#">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].Name.substr(0, 1).toUpperCase() + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="text-truncate font-size-14 mb-1">' + json[i].Name + '</h5>' +
                    '<p class="text-truncate mb-0">' + NomorHP + '</p>' +
                    '<p class="text-truncate mb-0">' + EmailAddress + '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0">' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>' 
                $('#Div_CustomerSearchingPIC').append(ResultCustomerSearching)
                
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function closeDiv() {
    $("#Div_CustomerSearchingPIC").hide()
}
function CustomerSelected(CustomerID) {
    $("#ContentPlaceHolder1_TrxCustomerID").val(CustomerID)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $("#AddCustomer_Name").val(json[i].Name)
                $("#AddCustomer_NIK").val(json[i].NIK)
                $("#AddCustomer_Type").find("option:selected").text();
                $("#AddCustomer_Type").val(json[i].CompID);
                $("#AddCustomer_NamaPerusahaan").val(json[i].GroupID)
                $("#AddCustomer_Email").val(json[i].Email)
                $("#AddCustomer_HP").val(json[i].HP)
                $("#AddCustomer_Facebook").val(json[i].Facebook)
                $("#AddCustomer_Instagram").val(json[i].Instagram)
                $("#AddCustomer_Twitter").val(json[i].Twitter)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#Div_CustomerSearchingPIC").hide();
}
function DropdownPerusahaanType() {
    var cmbDataSourcePerusahaanType = $('#AddPerusahaan_Type');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK203'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultPerusahaanType = "";

            var StatusNya
            for (i = 0; i < json.length; i++) {

                resultPerusahaanType = '<option value="' + json[i].ID + '">' + json[i].Type + '</option>';
                cmbDataSourcePerusahaanType.append(resultPerusahaanType);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function FormLoadCustomer(CustomerID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + CustomerID + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK330'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCustomer = "";

            for (i = 0; i < json.length; i++) {
                $("#ContentPlaceHolder1_CustomerID").val(json[i].CustomerID)
                $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].CustomerID)
                $('#Profile_NamaCustomer').append(json[i].Name)
                $('#Profile_NomorTelepon').append(json[i].HP)
                $('#Profile_Email_Customer').append(json[i].Email)
                $('#Profile_Facebook').append(json[i].Facebook)
                $('#Profile_Instagram').append(json[i].Instagram)
                $('#Profile_Twitter').append(json[i].Twitter)
                $("#hd_customerID").val(json[i].CustomerID);
                $('#Profile_NamaPerusahaan').append(json[i].Nama_Perusahaan)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdownCustomerType() {
    var cmbDataSourceCustomerType = $('#AddCustomer_Type');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK180'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultCustomerType = "";

            var StatusNya
            for (i = 0; i < json.length; i++) {

                resultCustomerType = '<option value="' + json[i].ID + '">' + json[i].Type + '</option>';
                cmbDataSourceCustomerType.append(resultCustomerType);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboTypePerusahaan(val) {
    var selectedText = $("#AddCustomer_Type").find("option:selected").text();
    var selectedValue = $("#AddCustomer_Type").val();
    if (selectedValue == "1") {
        $("#AddCustomer_NamaPerusahaan").val("")
        $('#AddCustomer_NamaPerusahaan').attr("disabled", false);
        $('#AddCustomer_NPWP').attr("disabled", false);
    } else if (selectedValue == "2") {
        $('#AddCustomer_NamaPerusahaan').attr("disabled", true);
        $('#AddCustomer_NPWP').attr("disabled", false);
    } else {
        $('#AddCustomer_NamaPerusahaan').attr("disabled", false);
        $('#AddCustomer_NPWP').attr("disabled", false);
    }
}
function savePerusahaanDynamic(form_data) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/CreateDataAccount",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            var json = JSON.parse(data.d.Result);
            var i, x = "";
            var tblTickets = "";

            if (json.Success == true) {
                var AccountId = json.Datas[0].AccountId;
                savePerusahaanCrm(AccountId);
            } else {
                swal(
                    '',
                    'Insert Perusahaan Dynamic Has Been Failed !',
                    'error'
                ).then(function () {
                    savePerusahaanCrm("0");
                });
                return false;
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function savePerusahaanCrm(accountId) {
    var form_data = JSON.stringify({
        TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxNama: $("#Perusahaan_Nama").val(), TrxEmail: $("#AddPerusahaan_Type").val(),
        TrxTelepon: "-", TrxNPWP: $("#Perusahaan_NPWP").val(), TrxAction: "INSERT", AccountId: accountId
    });
    $.ajax({
        type: "POST",
        url: "asmx/ServiceCustomer.asmx/BRA_Perusahaan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";
            var tblTickets = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {
                    if (json[i].msgSystem == "InsertSuccess") {
                        swal(
                            '',
                            'Insert Perusahaan Has Been Success',
                            'success'
                        ).then(function () {
                            //$("#FormNewPerusahaan").hide();
                            //$("#SimpanPerusahaan").hide();
                            //$("#CloseCustomer").hide();
                            //$("#FormNewCustomer").show();
                            //$("#SimpanCustomer").show();
                            //$("#FormNewPerusahaan").hide()
                            $("#SimpanPerusahaan").hide()
                            $("#CancelCustomer").hide()
                            $("#FormNewCustomer").show()
                        });
                    } else {
                        swal(
                            '',
                            'Data Perusahaan/Pemerintah Duplicate',
                            'error'
                        ).then(function () {
                            return false;
                        });
                        return false;
                    }
                } else {
                    swal(
                        '',
                        'Insert Perusahaan Has Been Failed !',
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
        }
    })
}
function FormCleansingLoadCustomer() {
    $("#ContentPlaceHolder1_CustomerID").val("")
    $("#AddCustomer_Name").val("");
    $("#AddCustomer_NIK").val("");
    $("#AddCustomer_HP").val("");
    $("#AddCustomer_Email").val("");
    $("#AddCustomer_Facebook").val("");
    $("#AddCustomer_Instagram").val("");
    $("#AddCustomer_Twitter").val("");
    $("#AddCustomer_Alamat").val("");
    $("#AddCustomer_NPWP").val("");
    $("#AddCustomer_NamaPerusahaan").val("");
    $("#Perusahaan_Nama").val("");
    $("#Perusahaan_NPWP").val("");
    $("#AddPerusahaan_Type").val("");
    $("#Perusahaan_Telepon").val("");
    $("#Perusahaan_Email").val("");
}