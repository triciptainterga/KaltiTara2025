$(document).ready(function () {
    MasterCombo()
    TrmSettingChannel()
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmSettingChannel() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK45'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {
              
                if (json[i].Status == "Yes") {
                    var StatusNya = "<span class='badge rounded-pill bg-primary' style='width: 80px;font-size:12px;'>Aktif</span>"
                } else {
                    var StatusNya = "<span class='badge rounded-pill bg-primary' style='width: 80px;font-size:12px;'>Non Aktif</span>"
                }
                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=Update(" + json[i].ID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=Delete(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                myTable.row.add([json[i].ID, json[i].UserName, json[i].SubMenuName, json[i].DetailMenuName, json[i].Url, StatusNya, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function MasterCombo() {
    var Cmb_UserName = $('#Cmb_UserName');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'5', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultAgent = "";

            for (i = 0; i < json.length; i++) {

                ResultAgent = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                Cmb_UserName.append(ResultAgent);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var Cmb_Menu = $('#Cmb_Menu');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK70'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].MenuID + '">' + json[i].MenuName + '</option>';
                Cmb_Menu.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var Cmb_SubMenu = $('#Cmb_SubMenu');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK03'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].SubMenuID + '">' + json[i].SubMenuName + '</option>';
                Cmb_SubMenu.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var Cmb_DetailMenu = $('#Cmb_DetailMenu');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK04'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].SubMenuIDTree + '">' + json[i].MenuTreeName + '</option>';
                Cmb_DetailMenu.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Update(UpdateID) {
    $("#ContentPlaceHolder1_TrxID").val(UpdateID);
    $("#addContactModal").modal('show');
    $("#Update").show();
    $("#Simpan").hide();
    $("#Delete").hide();
}
function Delete(DeleteID) {
    $("#ContentPlaceHolder1_TrxID").val(DeleteID);
    $("#addContactModal").modal('show');
    $("#Update").hide();
    $("#Simpan").hide();
    $("#Delete").show();
}