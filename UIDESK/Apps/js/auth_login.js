var urlDatakelola;
$(document).ready(function () {
    urlDatakelola = $("#SM_UrlDatakelola").val();
    loadImageSlides();
    //if (getParameterByName("signout") == "api") {
    //    $.ajax({
    //        type: "POST",
    //        url: "Apps/WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
    //        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK220'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (data) {

    //            var json = JSON.parse(data.d);
    //            var i, x, result = "";
    //            if (json.length > 0) {
    //                updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
    //            }
    //        },
    //        error: function (xmlHttpRequest, textStatus, errorThrown) {
    //            console.log(xmlHttpRequest.responseText);
    //            console.log(textStatus);
    //            console.log(errorThrown);
    //        }
    //    })
    //}
});

function loadImageSlides() {
    $.ajax({
        type: "POST",
        url: "Apps/WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({
            TrxID: '0',
            TrxUserName: 'Admin',
            TrxAction: 'UIDESK219'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d); 
            if (json.length > 0) {
                var imageSlides = json.map(item => ({
                    src: item.Path,
                    alt: `Slide ${item.ID}`
                }));
                createSwiperSlides(imageSlides); 
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
function createSwiperSlides(imageSlides) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = ''; // Bersihkan konten sebelumnya

    imageSlides.forEach(slide => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        const imgDiv = document.createElement('div');
        const img = document.createElement('img');
        img.src = slide.src;
        img.alt = slide.alt;
        img.classList.add('img-fluid', 'mx-auto', 'd-block');
        img.style.width = '100%';

        imgDiv.appendChild(img);
        swiperSlide.appendChild(imgDiv);
        swiperWrapper.appendChild(swiperSlide);
    });

    if (imageSlides.length > 1) {
        const swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            loop: true,
            autoplay: {
                delay: 3000,
            },
        });
    } else {
        document.querySelector('.swiper-pagination').style.display = 'none';
    }
}
async function updateAuxDatakelola(token_agent, value, token_company) {
    await fetch("" + urlDatakelola + "/api/agent/aux", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token_agent: token_agent,
            aux: value,
            token: token_company,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            //alert("updateAuxDatakelola says: " + data.message);
        });
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}