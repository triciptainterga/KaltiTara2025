$(document).ready(function () {
    DataPenilaian();
});
function DataPenilaian() {
    $.ajax({
        type: "POST",
        url: "asmx/QM_Trx_Penilaian.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK141'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultPenilaian, Site, ColorSite = "";

            $('#div_penilaian').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].KodeMasterForm == "PT") {
                    Site = "Pusat"
                } else {
                    Site = "Tanjung Priok"                   
                }
                if (json[i].NamaAlatTest == "Call") {
                    IconSite = "bx bx-phone-incoming"
                    ColorSite = "danger"
                } else if (json[i].NamaAlatTest == "Email") {
                    IconSite = "bx bx-envelope"
                    ColorSite = "warning"
                } else if (json[i].NamaAlatTest == "Live Chat") {
                    IconSite = "bx bx-comment"
                    ColorSite = "success"
                } else {
                    IconSite = "bx bx-phone-outgoing"
                    ColorSite = "primary"
                }
                ResultPenilaian = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<i class="' + IconSite +' rounded-circle icon-bg bg-'+ ColorSite +'"></i>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].NamaAlatTest + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">Penilaian Channel ' + json[i].NamaAlatTest + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    //'<a class="dropdown-item" href="#" onclick=EditUser("' + json[i].TypeID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="QA_Form.aspx?qaid=' + json[i].KodeAlatTest + '&type=' + encodeData(json[i].NamaAlatTest) + '&UserType=' + json[i].KodeMasterForm + '&act=fu&sc=1">Score Card</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12">' + Site + '</span>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].KodeAlatTest + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#div_penilaian').append(ResultPenilaian)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}