$(document).ready(function () {
    ////const apiUrl = 'https://cloud.uidesk.id/bravo/Apps/asmx/Adm_MasterMenu.asmx/UIDESK_TrmMasterCombo?TrxID=0&TrxUserName=Admin&TrxAction=UIDESK169'; // Ganti dengan URL API yang sesuai
    //const apiUrl = 'http://localhost/bravo/Apps/asmx/json/ListMenu.json'; // Ganti dengan URL API yang sesuai
    //$.ajax({
    //    url: apiUrl,
    //    type: 'GET',
    //    dataType: 'json',
    //    success: function (data) {
    //        alert("1")
    //        // Proses data setelah berhasil diambil
    //        const sideMenu = $('#side-menu');

    //        // Loop untuk menambahkan setiap item menu dari data JSON
    //        data.forEach(system => {
    //            const systemTitle = $('<li>').addClass('menu-title').attr('data-key', system.SystemName).text(system.SystemName);
    //            sideMenu.append(systemTitle);

    //            system.menus.forEach(menu => {
    //                const menuItem = $('<li>');
    //                const menuLink = $('<a>').attr('href', menu.Url);
    //                const menuIcon = $('<i>').addClass('icon nav-icon').attr('data-feather', menu.IconMenu);
    //                const menuText = $('<span>').addClass('menu-item').attr('data-key', menu.MenuName).text(menu.MenuName);
    //                const badge = $('<span>').addClass('badge rounded-pill badge-soft-secondary').text('5+'); // Ganti dengan badge yang sesuai dari data

    //                menuLink.append(menuIcon, menuText, badge);
    //                menuItem.append(menuLink);

    //                if (menu.submenus && menu.submenus.length > 0) {
    //                    const subMenuList = $('<ul>').addClass('sub-menu').attr('aria-expanded', 'false');
    //                    menu.submenus.forEach(submenu => {
    //                        const subMenuItem = $('<li>');
    //                        const subMenuLink = $('<a>').attr('href', submenu.Url).attr('data-key', submenu.SubMenuName).text(submenu.SubMenuName);
    //                        subMenuItem.append(subMenuLink);
    //                        subMenuList.append(subMenuItem);
    //                    });
    //                    menuItem.append(subMenuList);
    //                }

    //                sideMenu.append(menuItem);
    //            });
    //        });
    //    },
    //    error: function (jqXHR, textStatus, errorThrown) {
    //        console.error('Request failed:', textStatus, errorThrown);
    //    }
    //});
    fetchingjquery()
});

function fetching() {
    const apiUrl = 'https://cloud.uidesk.id/bravo/Apps/asmx/Adm_MasterMenu.asmx/UIDESK_TrmMasterCombo?TrxID=0&TrxUserName=Admin&TrxAction=UIDESK169'; // Ganti dengan URL API yang sesuai
    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Proses data setelah berhasil diambil
            const sideMenu = $('#side-menu');

            // Loop untuk menambahkan setiap item menu dari data JSON
            data.forEach(system => {
                const systemTitle = $('<li>').addClass('menu-title').attr('data-key', system.SystemName).text(system.SystemName);
                sideMenu.append(systemTitle);

                system.menus.forEach(menu => {
                    const menuItem = $('<li>');
                    const menuLink = $('<a>').attr('href', menu.Url);
                    const menuIcon = $('<i>').addClass('icon nav-icon').attr('data-feather', menu.IconMenu);
                    const menuText = $('<span>').addClass('menu-item').attr('data-key', menu.MenuName).text(menu.MenuName);
                    const badge = $('<span>').addClass('badge rounded-pill badge-soft-secondary').text('5+'); // Ganti dengan badge yang sesuai dari data

                    menuLink.append(menuIcon, menuText, badge);
                    menuItem.append(menuLink);

                    if (menu.submenus && menu.submenus.length > 0) {
                        const subMenuList = $('<ul>').addClass('sub-menu').attr('aria-expanded', 'false');
                        menu.submenus.forEach(submenu => {
                            const subMenuItem = $('<li>');
                            const subMenuLink = $('<a>').attr('href', submenu.Url).attr('data-key', submenu.SubMenuName).text(submenu.SubMenuName);
                            subMenuItem.append(subMenuLink);
                            subMenuList.append(subMenuItem);
                        });
                        menuItem.append(subMenuList);
                    }

                    sideMenu.append(menuItem);
                });
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Request failed:', textStatus, errorThrown);
        }
    });
}
function fetchingjquery() {
    //$.ajax({
    //    url: 'http://localhost/bravo/Apps/asmx/json/ListMenu.json', // Replace with your actual API endpoint
    //    method: 'GET',
    //    dataType: 'json',
    //    success: function (data) {
    //        // Handle the successful retrieval of data
    //        console.log(data);

    //        // Example: Displaying data in console
    //        data.systems.forEach(function (system) {
    //            console.log('System Name: ' + system.SystemName);
    //            system.menus.forEach(function (menu) {
    //                console.log('  Menu Name: ' + menu.MenuName);
    //                menu.submenus.forEach(function (submenu) {
    //                    console.log('    SubMenu Name: ' + submenu.SubMenuName + ', URL: ' + submenu.Url);
    //                });
    //            });
    //        });
    //    },
    //    error: function (xhr, status, error) {
    //        // Handle any errors
    //        console.error('Error fetching data: ', error);
    //    }
    //});
    $.ajax({
        url: 'http://localhost/bravo/Apps/asmx/json/ListMenu.json', // Ganti dengan endpoint API Anda
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var menuContainer = $('#side-menu');

            // Iterate over each system in the JSON data
            data.systems.forEach(function (system) {
                // Create and append a system menu title
                var systemTitle = $('<li class="menu-title"></li>').text(system.SystemName);
                menuContainer.append(systemTitle);

                // Iterate over each menu in the current system
                system.menus.forEach(function (menu) {
                    // Create and append a main menu item
                    var mainMenuItem = $('<li></li>');
                    var mainMenuLink = $('<a href="javascript:void(0);" class="has-arrow"></a>');
                    var mainMenuIcon = $('<i class="icon nav-icon" data-feather="' + menu.IconMenu + '"></i>');
                    var mainMenuSpan = $('<span class="menu-item"></span>').text(menu.MenuName);

                    mainMenuLink.append(mainMenuIcon).append(mainMenuSpan);
                    mainMenuItem.append(mainMenuLink);

                    // Create a sub-menu container
                    var subMenuContainer = $('<ul class="sub-menu"></ul>');

                    // Iterate over each submenu in the current menu
                    menu.submenus.forEach(function (submenu) {
                        // Create and append a sub-menu item
                        var subMenuItem = $('<li></li>');
                        var subMenuLink = $('<a></a>').attr('href', submenu.Url).text(submenu.SubMenuName);
                        subMenuItem.append(subMenuLink);
                        subMenuContainer.append(subMenuItem);
                    });

                    mainMenuItem.append(subMenuContainer);
                    menuContainer.append(mainMenuItem);

                    // Initially hide sub-menu
                    subMenuContainer.hide();

                    // Toggle sub-menu on main menu item click
                    mainMenuLink.on('click', function (e) {
                        e.preventDefault();
                        var isOpen = mainMenuItem.hasClass('open');
                        menuContainer.find('.open').removeClass('open').find('.sub-menu').slideUp(200);
                        if (!isOpen) {
                            mainMenuItem.addClass('open');
                            subMenuContainer.stop(true, true).slideDown(200);
                        }
                    });
                });
            });

            // Optionally, re-initialize any plugins (e.g., feather icons) after dynamically adding content
            feather.replace();
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data: ', error);
        }
    });
}