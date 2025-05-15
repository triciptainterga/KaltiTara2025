$(document).ready(function () {
    GetSettingMenu();
});

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function GetSettingMenu() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({ TrxID: getParameterByName("menuid"), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'UIDESK188' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var jsonString = response.d;
            if (typeof jsonString !== 'string') {
                console.error("response.d bukan string:", jsonString);
                return;
            }

            try {
                var data = JSON.parse(jsonString);

                if (!Array.isArray(data)) {
                    console.error("Data yang diterima bukan array:", data);
                    return;
                }

                $('#menuContainer').empty();
                $.each(data, function (index, item) {
                    var menuItem = `
                        <div class="boxicon" data-submenuid="${item.SubMenuID}" style="cursor:pointer;">
                            <i class="${item.Icon}"></i>
                            <p class="icon-title">${item.SubMenuName}</p>
                        </div>
                    `;
                    $('#menuContainer').append(menuItem);
                });

                // Tambahkan event click pada setiap item menu
                $('#menuContainer').on('click', '.boxicon', function () {
                    var submenuId = $(this).data('submenuid');
                    GetSubMenu(submenuId);
                });

            } catch (e) {
                console.error("Gagal parsing JSON:", e);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
function GetSubMenu(subMenuID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({ TrxID: subMenuID, TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'UIDESK189' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var jsonString = response.d;
            if (typeof jsonString !== 'string') {
                console.error("response.d bukan string:", jsonString);
                return;
            }

            try {
                var data = JSON.parse(jsonString);

                if (!Array.isArray(data)) {
                    console.error("Data yang diterima bukan array:", data);
                    return;
                }

                $('#submenuContainer').empty();
                $.each(data, function (index, item) {
                    var subMenuItem = `
                        <a href="${item.Url}" class="boxicon">
                            <i class="${item.Icon}"></i>
                            <span class="icon-title">${item.MenuTreeName}</span>
                        </a>
                    `;
                    $('#submenuContainer').append(subMenuItem);
                });

                $('#submenuContainer').show();

            } catch (e) {
                console.error("Gagal parsing JSON:", e);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
