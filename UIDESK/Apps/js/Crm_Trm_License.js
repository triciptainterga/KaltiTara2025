$(document).ready(function () {
    //document.getElementById("callAgents").innerHTML = "40 AGENTS";
    //document.getElementById("emailAgents").innerHTML = "40 AGENTS";
    //document.getElementById("chatAgents").innerHTML = "40 AGENTS";
    //document.getElementById("sosmedAgents").innerHTML = "40 AGENTS";
    //document.getElementById("qmAgents").innerHTML = "40 AGENTS";
    //document.getElementById("lcAgents").innerHTML = "40 AGENTS";
    //document.getElementById("xAgents").innerHTML = "40 AGENTS";
    requestData('SHOW','ALL');
});
function requestData(keterangan,kanal) {
    var resultHeader = "";
    var result = "";
    const boxLicense = $('#tampungShowLicense');
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_License.asmx/UIDESK_LIC_BRA",
        data: "{keterangan:'" + keterangan + "', kanal: '" + kanal + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            console.log(data.d);
           
           
            //document.getElementById("callAgents").innerHTML = "40 AGENTS";
            //document.getElementById("emailAgents").innerHTML = "40 AGENTS";
            //document.getElementById("chatAgents").innerHTML = "40 AGENTS";
            //document.getElementById("sosmedAgents").innerHTML = "40 AGENTS";
            //document.getElementById("qmAgents").innerHTML = "40 AGENTS";
            //document.getElementById("lcAgents").innerHTML = "40 AGENTS";
            //document.getElementById("xAgents").innerHTML = "40 AGENTS";

            for (i = 0; i < json.length; i++) {
                result +=                   
                    '<div class="col-md-3">' +
                        '<center>' +
                            '<div class="card mt-4 maintenance-box shadow-none">' +
                            '<div class="card-body">' +
                            '<div class="mb-4">' +
                            '<img src="assets/images/lic/' + json[i].Kanal + '.png" width="64" />' +
                            '</div>' +
                            '<h5 class="font-size-15 text-uppercase" id="callAgents">' + json[i].Total + ' Agents</h5>' +
                            '<p class="text-muted mb-0">Fitur petugas layanan kanal ' + json[i].Kanal + '.</p>' +
                            '<div class="bg-light rounded-3 text-center overflow-hidden">'+
                            '<div class="row g-0">' +
                                '<div class="col-xl-6">' +
                                '<div class="bg-soft-primary d-flex align-items-center justify-content-center" style="height: 50px;"><h5 class="font-size-15 text-uppercase">Available : ' + json[i].Sisa + '</h5></div>' +
                                '</div>' +
                                '<div class="col-xl-6">' +
                                '<div class="bg-primary d-flex align-items-center justify-content-center" style="height: 50px;"><h5 class="font-size-15 text-uppercase">Used : ' + json[i].LoginUser + '</h5></div>' +
                                '</div>' +
                                '</div>' +    
                            '</div>' +   
                            '</div>' +
                            '</div>' +
                        '</center>' +
                    '</div>';
                feather.replace();
            }
            boxLicense.append(result);
            // Inisialisasi ulang event listener jika ada
            inisialisasiEventListener();
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}