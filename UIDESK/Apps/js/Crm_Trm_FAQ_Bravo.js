// Event listener untuk tombol Search
$(document).ready(function () {

    $('#FAQBravoSearch').on('keyup', function () {
        $('#searchButton').prop('disabled', $(this).val().trim() === '');
    });

    $('#DataPeraturanSearch').on('keyup', function () {
        $('#searchButton2').prop('disabled', $(this).val().trim() === '');
    });


    $('#searchButton').on('click', function () {
        if ($('#FAQBravoSearch').val().trim() !== "") {
            ListFAQBravo();
        }
    });

    $('#searchButton2').on('click', function () {
        if ($('#DataPeraturanSearch').val().trim() !== "") {
            ListDataPeraturan();
        }
    });
});

// FAQ Bravo
function ListFAQBravo() {
    var searchQuery = $('#FAQBravoSearch').val() || "";
    var entriesPerPage = $('#entries').val() || 10;

    $.ajax({
        type: "POST",
        url: "asmx/KM_Feature.asmx/BRA_KM_FAQ_Searching",
        data: JSON.stringify({
            ParamSearching: searchQuery,
            EntriesPerPage: entriesPerPage
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            let parsedData = JSON.parse(response.d);
            populateFAQTable(parsedData);

            // Tampilkan tabel setelah data berhasil diambil
            if (parsedData.length > 0) {
                $('#showEntriesSection').show();
                $('#faqTable').show();
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function populateFAQTable(data) {
    let faqTableBody = $("#faqTableBody");
    faqTableBody.empty(); // Clear previous content

    if (data.length > 0) {
        data.forEach((item, index) => {
            // Convert item.Value6 to dd-mm-yyyy format
            let timestamp = parseInt(item.Value6.match(/\d+/)[0]); // Extract the timestamp
            let date = new Date(timestamp);
            let day = String(date.getDate()).padStart(2, '0');
            let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            let year = date.getFullYear();
            let formattedDate = `${day}-${month}-${year}`;

            //let faqItem = `
            //    <tr>
            //        <td>${index + 1}</td>
            //        <td>
            //            <div class="faq-item">
            //                <div class="d-flex justify-content-between">
            //                    <div>
            //                        <span class="faq-icon"><i class="fas fa-sync-alt"></i></span>
            //                        <span class="faq-title">${item.Value1} > ${item.Value2}</span>
            //                    </div>
            //                <div class="faq-date">${formattedDate}</div>
            //                </div>
            //                <div class="mt-2">
            //                    <p>${item.Value3}</p>
            //                    ${item.Value4}
            //                </div>
            //                <br>
            //                 <button class="btn btn-primary view-pdf-btn" data-pdf-url="http://split.customs.go.id/DASHBOARD/_UPLOAD_DATA/PERATURAN/180926-140941-A11_3_4-PER-19-BC-2013.pdf">
            //                    <i class="fas fa-file-pdf"></i> View PDF
            //                 </button>
            //            </div>
            //        </td>
            //    </tr>
            //`;
            let faqItem = `
                <tr>
                    <td>${index + 1}</td>
                    <td>
                        <div class="faq-item">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <span class="faq-icon"><i class="fas fa-sync-alt"></i></span>
                                    <span class="faq-title">${item.Value1} > ${item.Value2}</span>
                                </div>
                            <div class="faq-date">${formattedDate}</div>
                            </div>
                            <div class="mt-2">
                                <p>${item.Value3}</p>
                                ${item.Value4}
                            </div>
                            <br>
                             <a class="btn btn-primary view-pdf-btn" target="_blank" href="http://split.customs.go.id/DASHBOARD/_UPLOAD_DATA/PERATURAN/${item.Value5}">
                                <i class="fas fa-file-pdf"></i> View PDF
                             </a>
                        </div>
                    </td>
                </tr>
            `;
            faqTableBody.append(faqItem);
        });
    } else {
        faqTableBody.append('<tr><td colspan="2">No FAQ data available.</td></tr>');
    }
}

// Event listener for the "View PDF" button
$(document).on('click', '.view-pdf-btn', function () {
    var pdfUrl = $(this).attr('data-pdf-url');

    $('#pdfIframe').attr('src', pdfUrl);

    var pdfModal = new bootstrap.Modal(document.getElementById('pdfModal'));
    pdfModal.show();
});

$('#pdfModal').on('hidden.bs.modal', function () {
    $('#pdfIframe').attr('src', '');
});

$(document).on('click', '.modal-backdrop, .btnclosemodalpdf', function () {
    $('body').addClass('right-bar-enabled');
});

// End FAQ Bravo


//  Data Peraturan
function ListDataPeraturan() {
    var searchQuery = $('#DataPeraturanSearch').val() || "";
    var entriesPerPage = $('#entries2').val() || 10;

    $.ajax({
        type: "POST",
        url: "asmx/KM_Feature.asmx/BRA_KM_Peraturan_Searching",
        data: JSON.stringify({
            ParamSearching: searchQuery,
            EntriesPerPage: entriesPerPage
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            let parsedData = JSON.parse(response.d);
            populateDataPeraturanTable(parsedData);

            // Show the table when data is successfully fetched
            if (parsedData.length > 0) {
                $('#showEntriesSection2').show();
                $('#regulationTable').show();
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function populateDataPeraturanTable(data) {
    let peraturanTableBody = $("#peraturanTableBody");
    peraturanTableBody.empty(); // Clear previous content

    if (data.length > 0) {
        data.forEach((item, index) => {
            // Convert item.Value6 to dd-mm-yyyy format
            let timestamp = parseInt(item.Value9.match(/\d+/)[0]); // Extract the timestamp
            let date = new Date(timestamp);
            let day = String(date.getDate()).padStart(2, '0');
            let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            let year = date.getFullYear();
            let formattedDate = `${day}-${month}-${year}`;
            //let peraturanItem = `
            //    <tr>
            //        <td>${index + 1}</td>
            //        <td>
            //            <div class="faq-item">
            //                <div class="d-flex justify-content-between">
            //                    <div>
            //                        <span class="faq-icon"><i class="fas fa-sync-alt"></i></span>
            //                        <span class="faq-title">${item.Value1} > ${item.Value2} > ${item.Value3} > ${item.Value4}</span>
            //                    </div>
            //                    <div class="faq-date">${formattedDate}</div>
            //                </div>
            //                <div class="mt-2">
            //                    <h5>${item.Value5}</h5>
            //                    <h4>${item.Value6}</h4>
            //                    <p>${item.Value7}</p>
            //                </div>
            //                <br>
            //                 <button class="btn btn-primary view-pdf-btn" data-pdf-url="http://split.customs.go.id/DASHBOARD/_UPLOAD_DATA/PERATURAN/180926-140941-A11_3_4-PER-19-BC-2013.pdf">
            //                    <i class="fas fa-file-pdf"></i> View PDF
            //                 </button>
            //            </div>
            //        </td>
            //    </tr>
            //`;
            let peraturanItem = `
                <tr>
                    <td>${index + 1}</td>
                    <td>
                        <div class="faq-item">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <span class="faq-icon"><i class="fas fa-sync-alt"></i></span>
                                    <span class="faq-title">${item.Value1} > ${item.Value2} > ${item.Value3} > ${item.Value4}</span>
                                </div>
                                <div class="faq-date">${formattedDate}</div>
                            </div>
                            <div class="mt-2">
                                <h5>${item.Value5}</h5>
                                <h4>${item.Value6}</h4>
                                <p>${item.Value7}</p>
                            </div>
                            <br>
                             <a class="btn btn-primary view-pdf-btn" target="_blank" href="http://split.customs.go.id/DASHBOARD/_UPLOAD_DATA/PERATURAN/${item.Value8}">
                                <i class="fas fa-file-pdf"></i> View PDF
                             </a>
                        </div>
                    </td>
                </tr>
            `;
            peraturanTableBody.append(peraturanItem);
        });
    } else {
        peraturanTableBody.append('<tr><td colspan="2">No Data Peraturan available.</td></tr>');
    }
}
// End Data Peraturan


