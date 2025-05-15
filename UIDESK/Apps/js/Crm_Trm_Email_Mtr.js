$(document).ready(function () {
    loadEmailQueueCards();
});

function loadEmailQueueCards() {
    const siteDiv = $("#divCardSite");
    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Email_Mtr.asmx/BRA_EmailMonitoring",
        data: "{UserName: '" + $("#hd_sessionLogin").val() + "'}", 
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const emailData = JSON.parse(response.d || "[]");
            
            const productCounts = {};
            emailData.forEach((email) => {
                const productID = email.ProductID;
                productCounts[productID] = (productCounts[productID] || 0) + 1;
            });

            siteDiv.empty();
            const productNames = {
                "17": "Pasar Baru",
                "18": "Kantor Pusat",
                "19": "Soekarno Hatta",
            };

            const bgClasses = {
                "17": "bg-success",
                "18": "bg-warning",
                "19": "bg-primary",
            };

            Object.keys(productCounts).forEach((productID) => {
                const productName = productNames[productID] || "Unknown";
                const emailCount = productCounts[productID];
                const bgClass = bgClasses[productID] || "bg-light";

                const siteCardHtml = `
                  <div class="card box box-link-shadow text-left card-site ${bgClass}" 
                       data-product-id="${productID}" 
                       style="cursor:pointer; padding: 10px; width: 420px; margin: 0 7.5px;">
                    <div class="card-body text-white">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="flex-grow-1 text-start">
                          <p class="mb-1 text-truncate text-white" style="font-size: 22px;">${productName}</p>
                        </div>
                        <div class="text-center" style="margin-right: 80px;">
                          <i class="fas fa-envelope text-white" style="font-size: 24px;"></i>
                        </div>
                        <div class="text-end">
                          <h5 class="mb-0 text-white" style="font-size: 20px;">${emailCount}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
                siteDiv.append(siteCardHtml);
            });

            $(".card-site").on("click", function () {
                $(".card-site").removeClass("active");
                $(this).addClass("active");
                const selectedProductID = $(this).data("product-id");
                console.log("Selected ProductID:", selectedProductID);
                LoadingEmailQueue(selectedProductID);
            });
        },
        error: function (xhr) {
            console.error("Error loading email queue data:", xhr.responseText);
        },
    });
}

function LoadingEmailQueue(productID) {
    console.log("Loading email queue for ProductID:", productID);
    
    if ($.fn.dataTable.isDataTable('#emailQueueTable')) {
        $('#emailQueueTable').DataTable().clear().destroy();
    }

    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_Email_Mtr.asmx/BRA_EmailMonitoring",
        data: JSON.stringify({ UserName: $("#hd_sessionLogin").val() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log("Response Data:", response.d);
            const emailData = JSON.parse(response.d || "[]");
            console.log("Parsed Email Data:", emailData);

            const filteredEmails = emailData.filter(email => email.ProductID === productID.toString());
            console.log("Filtered Emails:", filteredEmails);

            const tableBody = $("#emailQueueTable tbody");
            tableBody.empty();

            filteredEmails.forEach((email, index) => {
                const emailDate = email.Email_Date
                    ? new Date(parseInt(email.Email_Date.match(/\d+/)[0])).toLocaleString()
                    : "Invalid Date";

                const rowHtml = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${email.EFROM || "Unknown"}</td>
                        <td>${email.ESUBJECT || "No Subject"}</td>
                        <td>${emailDate}</td>
                    </tr>
                `;
                tableBody.append(rowHtml);
            });

            $('#emailQueueTable').DataTable({
                "paging": true,          // Enable pagination
                "searching": true,       // Enable search functionality
                "lengthChange": true,    // Allow changing the number of rows per page
                "pageLength": 10,        // Default number of rows per page
                "ordering": true,        // Enable column ordering
                "info": true,            // Show table info
                "autoWidth": false,      // Disable auto width for columns
                "responsive": true       // Make the table responsive
            });
        },
        error: function (xhr) {
            console.error("Error loading email queue data:", xhr.responseText);
        }
    });
}