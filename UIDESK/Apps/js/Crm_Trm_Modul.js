$(document).ready(function () {
    HeaderCampaign()
});
function HeaderCampaign() {
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Modul.asmx/DataTable",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK26'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultHeaderCampaign = "";

            $('#div_HeaderCampaign').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].StatusActive == "YES" || json[i].StatusActive == "Yes") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                ResultHeaderCampaign = '<div class="card task-box">'+
                    '<div class="card-body">' +
                    '<div class="d-flex mb-2 align-items-start">' +
                    '<div class="flex-grow-1">' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#">View</a>' +
                    '<a class="dropdown-item" href="#">Edit</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<h5 class="font-size-14 mb-1">' + json[i].CampaignName + '</h5>' +
                    '<p class="text-muted text-truncate">' + json[i].CampaignDescription + '</p>' +
                    '<div class="avatar-group">' +
                    '<div class="avatar-group-item">' +
                    '<a href="javascript: void(0);" class="d-block" data-bs-toggle="tooltip" data-bs-placement="top">' +
                    '</a>' +
                    '</div>' +
                    '<div class="avatar-group-item">' +
                    '<a href="javascript: void(0);" class="d-block" data-bs-toggle="tooltip" data-bs-placement="top">' +
                    '<div class="avatar-sm">' +
                    '<div class="avatar-title rounded-circle bg-info">' +
                    '' + json[i].CampaignName.substr(0, 1).toUpperCase() +''+
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<div class="font-size-13 text-muted"><span class="badge badge-soft-primary font-size-12">' + Status +'</span></div>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge badge-soft-primary font-size-12">' + json[i].Channel + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                //ResultHeaderCampaign = '<div class="col-md-12 col-lg-3">' +
                //    '<div class="box box-default" style="margin-left:15px;margin-right:65px;">' +
                //    '<div class="fx-card-item">' +
                //    '<div class="fx-card-avatar fx-overlay-1">' +
                //    '<img src=' + ImageNya + '>' +
                //    '<div class="fx-overlay">' +
                //    '<ul class="fx-info">' +
                //    '<li><a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="ActionTambahHeader(' + json[i].ID + ')"><i class="fa fa-plus"></i></a></li>' +
                //    '<li><a class="btn default btn-outline" href="#" onclick="ActionUpdateModul(' + json[i].ID + ');"><i class="fa fa-pencil"></i></a></li>' +
                //    //'<li><a class="btn default btn-outline" href="#" onclick="ButtonDelete(' + json[i].ID + ');"><i class="fa fa-trash-o"></i></a></li>' +
                //    '<li><a class="btn default btn-outline" href="#" onclick="ActionPreviewModul(' + json[i].ID + ');"><i class="fa fa-eye"></i></a></li>' +
                //    '</ul>' +
                //    '</div>' +
                //    '</div>' +
                //    '<div class="fx-card-content">' +
                //    '<h4 class="box-title">' + json[i].CampaignName + '</h4>' +
                //    '<small>' + json[i].CampaignDescription + '</small><br>' +
                //    //'<span class="badge badge-pill badge-primary badge-lg"><small>Max Handle ' + json[i].maxhandle + ' - Now Handle ' + json[i].nowhandle + '</small></span>' +
                //    '</div>' +
                //    '</div>' +
                //    '</div>' +
                //    '</div>'
                $('#div_HeaderCampaign').append(ResultHeaderCampaign)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}