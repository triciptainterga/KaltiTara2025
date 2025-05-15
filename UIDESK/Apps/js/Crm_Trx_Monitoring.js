$(document).ready(function () {
  loadUserLoginData(); // Memuat data "User Login" awal
  // Event listener untuk menangani pencarian dengan enter
  $("#searchUser").keydown(function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Mencegah form untuk melakukan submit
      LoadingUser(currentType); // Panggil fungsi pencarian saat menekan Enter
    }
  });
});

let currentType = "Total User"; // Tracks the active login status type
let selectedSite = ""; // Tracks the selected site

function loadUserLoginData(type) {
  const messageDiv = $("#divCountingDataUser");
  $.ajax({
    type: "POST",
    url: "asmx/Crm_Trx_Monitoring.asmx/BRA_LoginMonitoring",
    data: JSON.stringify({ UserName: $("#hd_sessionLogin").val(), Type: type }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
      const data = JSON.parse(response.d || "[]");
      messageDiv.empty();

      data.forEach((item) => {
        const cardHtml = `
                  <div class="card box box-link-shadow text-left card-item" 
                       data-type="${item.Type}" 
                       style="cursor:pointer; padding: 10px; margin: 0 7.5px; flex: 1 1 calc(50% - 15px); max-width: calc(50% - 15px);">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="flex-grow-1 text-start">
                          <p class="mb-1 text-truncate text-muted" style="font-size: 22px;">${item.Type}</p>
                        </div>
                        <div class="text-center me-3">
                          <div class="avatar">
                            <div class="avatar-title bg-soft-${item.Color} text-${item.Color} rounded-circle font-size-30">
                              <i class="${item.Icon}" style="font-size: 20px;"></i>
                            </div>
                          </div>
                        </div>
                        <div class="text-end">
                          <h5 class="mb-0" style="font-size: 20px;">${item.AgentCounting}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
              `;
        messageDiv.append(cardHtml);
      });

      $(".card-item").on("click", function () {
        $(".card-item").removeClass("active");
        $(this).addClass("active");
        currentType = $(this).data("type");
        loadSiteDataCards();
        showSearchBox(); // Menampilkan search box setelah memuat data
        LoadingUser(currentType); // Memuat user setelah memilih jenis
      });
    },
    error: function (xhr) {
      console.error("Error loading user data:", xhr.responseText);
    },
  });
}

function loadSiteDataCards() {
  const siteDiv = $("#divCardSite");
  $.ajax({
    type: "POST",
    url: "asmx/Crm_Trx_Monitoring.asmx/BRA_UserMonitoring",
    data: JSON.stringify({
      UserID: "0",
      UserName: $("#hd_sessionLogin").val(),
      Type: "1",
      Action: "SELECT",
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (siteResponse) {
      const siteData = JSON.parse(siteResponse.d || "[]");

      // Filter users based on currentType and then count by site
      const siteCounts = {};
      siteData.forEach((user) => {
        // Check and replace null SiteName with "Pusat"
        const siteName = user.SiteName || "Pusat";

        const matchesType =
          currentType === "Total User" ||
          (currentType === "User Login" && user.LOGIN === 1) ||
          (currentType === "User Not Login" && user.LOGIN !== 1) ||
          (currentType === "User Aux" &&
            user.LOGIN === 1 &&
            user.DescAUX !== "Ready");

        if (matchesType) {
          if (siteCounts[siteName]) {
            siteCounts[siteName]++;
          } else {
            siteCounts[siteName] = 1;
          }
        }
      });

      siteDiv.empty();
      const displayedSites = new Set();

      siteData.forEach((site) => {
        // Ensure SiteName is replaced with "Pusat" if it is null
        const siteName = site.SiteName || "Pusat";
        if (!displayedSites.has(siteName)) {
          displayedSites.add(siteName);

          const siteAgentCount = siteCounts[siteName] || 0; // Count filtered by site and type

          let bgClass = "";
          switch (siteName) {
            case "Pusat":
              bgClass = "bg-primary";
              break;
            case "Tanjung Priok":
              bgClass = "bg-danger";
              break;
            case "Pasar Baru":
              bgClass = "bg-success";
              break;
            case "Soekarno Hatta":
              bgClass = "bg-warning";
              break;
            default:
              bgClass = "bg-light";
          }

          const siteCardHtml = `
            <div class="card box box-link-shadow text-left card-site ${bgClass}" 
                 data-site="${siteName}" 
                 style="cursor:pointer; padding: 10px; margin: 0 7.5px; flex: 1 1 calc(50% - 15px); max-width: calc(50% - 15px);">
              <div class="card-body text-white">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="flex-grow-1 text-start">
                    <p class="mb-1 text-truncate text-white" style="font-size: 22px;">${siteName}</p>
                  </div>
                  <div class="text-end">
                    <h5 class="mb-0 text-white" style="font-size: 20px;">${siteAgentCount}</h5>
                  </div>
                </div>
              </div>
            </div>
          `;
          siteDiv.append(siteCardHtml);
        }
      });

      $(".card-site").on("click", function () {
        $(".card-site").removeClass("active");
        $(this).addClass("active");
        selectedSite = $(this).data("site");
        LoadingUser();
      });
    },
    error: function (xhr) {
      console.error("Error loading site data:", xhr.responseText);
    },
  });
}


// Load user cards based on currentType and selectedSite
function LoadingUser() {
  const divUserNotification = $("#divUserNotification");
  divUserNotification.empty();

  const searchQuery = $("#searchUser").val().toLowerCase(); // Menangkap input pencarian

  $.ajax({
    type: "POST",
    url: "asmx/Crm_Trx_Monitoring.asmx/BRA_UserMonitoring",
    data: JSON.stringify({
      UserID: "0",
      UserName: $("#hd_sessionLogin").val(),
      Type: "1",
      Action: "SELECT",
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
      const users = JSON.parse(response.d);

      users.forEach((user) => {
        // Pencocokan dengan search query
        const matchesSearch =
          user.NAME.toLowerCase().includes(searchQuery) ||
          user.USERNAME.toLowerCase().includes(searchQuery);

        const matchesType =
          currentType === "Total User" ||
          (currentType === "User Login" && user.LOGIN === 1) ||
          (currentType === "User Not Login" && user.LOGIN !== 1) ||
          (currentType === "User Aux" &&
            user.LOGIN === 1 &&
            user.DescAUX !== "Ready");

        // Replace null SiteName with "Pusat"
        const siteName = user.SiteName || "Pusat";
        const matchesSite =
          selectedSite === "" || siteName === selectedSite;

        if (matchesSearch && matchesType && matchesSite) {
          const statusBadge =
            user.LOGIN === 1
              ? "<span class='badge rounded-pill badge-soft-success font-size-12'>Login</span>"
              : "<span class='badge rounded-pill badge-soft-danger font-size-12'>Not Login</span>";

          const descAUXBadge =
            user.LOGIN === 1 && user.DescAUX !== "Ready"
              ? `<span class="badge rounded-pill badge-soft-warning font-size-12">${user.DescAUX}</span>`
              : user.LOGIN === 1
              ? `<span class="badge rounded-pill badge-soft-success font-size-12">${user.DescAUX}</span>`
              : "";

          let iconBackgroundColor = "#d3d3d3"; // Default gray background

          if (user.LEVELUSER === "Layer 1") {
            iconBackgroundColor =
              user.STATUS_USER === "1" ? "#28a745" : "#007bff";
          }

          const userCardHtml = `
              <div class="col-xl-3 col-sm-6 mb-3">
                <div class="card border shadow-none">
                  <div class="card-body p-4">
                    <div class="d-flex align-items-start">
                      <div class="flex-shrink-0 icon-user rounded-circle me-3" style="background-color: ${iconBackgroundColor};">
                        <i class="fas fa-user rounded-circle icon-thumbnail"></i>
                      </div>
                      <div class="flex-grow-1 overflow-hidden">
                        <h5 class="font-size-15 mb-1 text-truncate">
                          <a href="#" class="text-dark">${user.NAME}</a>
                        </h5>
                        <p class="text-muted text-truncate mb-0">${user.USERNAME}</p>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer bg-transparent border-top d-flex justify-content-between">
                    <div class="font-size-13 text-muted">${statusBadge} ${descAUXBadge}</div>
                    <span class="badge rounded-pill badge-soft-primary font-size-12">${siteName}</span>
                  </div>
                </div>
              </div>`;
          divUserNotification.append(userCardHtml);
        }
      });
      // Show search box if not already shown
      if ($("#searchContainer").is(":hidden")) {
        $("#searchContainer").show();
      }
    },
    error: function (xhr) {
      console.error("Error loading users:", xhr.responseText);
    },
  });
}

function ButtonEpic(UserID) {
  swal({
    title: "Do you want to process?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      var form_data = JSON.stringify({
        UserID: UserID,
        UserName: $("#hd_sessionLogin").val(),
        Type: "1",
        Action: "RELEASE",
      });
      $.ajax({
        url: "asmx/Crm_Trx_Monitoring.asmx/BRA_UserMonitoringRelease",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
          console.log(form_data);

          var jsonX = JSON.parse(data.d);
          var i,
            x = "";
          var result = "";

          for (i = 0; i < jsonX.length; i++) {
            if (jsonX[i].Result == "True") {
              swal("", "Release Data Has Been Success", "success").then(
                function () {
                  window.location.href = "Crm_Trx_Monitoring.aspx?";
                }
              );
            } else {
              swal("", "Release Data Has Been Failed !", "error").then(
                function () {
                  return false;
                }
              );
              return false;
            }
          }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
          console.log(xmlHttpRequest.responseText);
          console.log(textStatus);
          console.log(errorThrown);
        },
        complete: function () {},
      });
    }
  });
}
