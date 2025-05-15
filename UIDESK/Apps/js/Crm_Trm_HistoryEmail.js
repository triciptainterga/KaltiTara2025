$(document).ready(function () {
    //DataTableHistory();
});
function DataTableHistory() {
    $("#Loading").css("display", "block");
    var myTable = $('#TrmHistory').DataTable(
        {
            "order": [[4, "desc"]]
        },
    );
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK120'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].DIRECTION == "Archive") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + json[i].DIRECTION + "</span>"
                } else if (json[i].DIRECTION == "IN") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].DIRECTION + "</span>"
                } else if (json[i].DIRECTION == "Spam") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].DIRECTION + "</span>"
                } else {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-warning font-size-12'>" + json[i].DIRECTION + "</span>"
                }
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].IVC_ID + ') >Conversation</a>' +
                    //'<a class="dropdown-item" href="#" onclick=DeleteKlik(' + json[i].IVC_ID + ') >Delete</a>' +
                    '</div>' +
                    '</div>'
                myTable.row.add([json[i].IVC_ID, json[i].EFROM, json[i].ESUBJECT, TrxParam, newDate + ' ' + newTime, urlclick]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function UpdateKlik(IVC_ID) {
    EmailConversationNew(IVC_ID);
    $('#popupemail').modal('show');
}

function Filter() {
    $("#addContactModalFilterDate").modal('show');
}

function ActionFilterDate() {
    var filterType = document.getElementById('Ticket_ProductType').value;
    var startDate = document.getElementById('startdate').value;
    var endDate = document.getElementById('enddate').value;
    var accountEmail = document.getElementById('AccountEmail').value;
    var selectedAgent = document.getElementById('agentSelect').value;
    var dateError = document.getElementById('dateError');
    var emailError = document.getElementById('emailError');
    var agentError = document.getElementById('agentError');
    var typeError = document.getElementById('typeError');

    dateError.style.display = 'none';
    dateError.innerHTML = '';
    emailError.style.display = 'none';
    emailError.innerHTML = '';
    agentError.style.display = 'none';
    agentError.innerHTML = '';
    typeError.style.display = 'none';
    typeError.innerHTML = '';

    if (!filterType) {
        typeError.style.display = 'block';
        typeError.innerHTML = 'Please select a Type.';
        return false;
    }

    if (filterType === '1' || filterType === '3') {
        if (!startDate || !endDate) {
            dateError.style.display = 'block';
            dateError.innerHTML = 'Please select both Start Date and End Date.';
            return false;
        }

        var start = new Date(startDate);
        var end = new Date(endDate);

        if (start > end) {
            dateError.style.display = 'block';
            dateError.innerHTML = 'End Date cannot be earlier than Start Date.';
            return false;
        }

        var differenceInTime = end.getTime() - start.getTime();
        var differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if (differenceInDays > 30) {
            dateError.style.display = 'block';
            dateError.innerHTML = 'End Date cannot be more than 30 days from the Start Date.';
            return false;
        }
    }

    if (filterType === '2' && !accountEmail) {
        emailError.style.display = 'block';
        emailError.innerHTML = 'Please enter an Email Address.';
        return false;
    }

    if (filterType === '3' && !selectedAgent) {
        agentError.style.display = 'block';
        agentError.innerHTML = 'Please select an Agent.';
        return false;
    }

    if ($.fn.DataTable.isDataTable('#TrmHistory')) {
        $('#TrmHistory').DataTable().clear().destroy();
    }

    $("#addContactModalFilterDate").modal('hide');

    var myTable = $('#TrmHistory').DataTable({
        "order": [[4, "desc"]]
    });

    var dynamicAccount = '';
    if (filterType === '2') {
        dynamicAccount = accountEmail;
    } else if (filterType === '3') {
        dynamicAccount = selectedAgent;
    }

    $.ajax({
        type: "POST",
        url: "asmx/Crm_Trm_HistoryEmail.asmx/DataHistoryEmail",
        data: JSON.stringify({
            Type: filterType,
            StartDate: startDate,
            EndDate: endDate,
            Account: dynamicAccount,
            UserName: $("#hd_sessionLogin").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            console.log('Raw data:', json);
            myTable.clear().draw();

            // Uncomment to filter by agent if needed
            // if (selectedAgent) {
            //     json = json.filter(item => item.NameAgent === selectedAgent);
            // }

            console.log('Filtered data:', json);

            for (var i = 0; i < json.length; i++) {
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-GB");

                var TrxParam = json[i].DIRECTION === "IN"
                    ? "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].DIRECTION + "</span>"
                    : "<span class='badge rounded-pill badge-soft-warning font-size-12'>" + json[i].DIRECTION + "</span>";

                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].IVC_ID + ') >Conversation</a>' +
                    '</div>' +
                    '</div>';

                var flagHandlingText = json[i].FLAG_HANDLING === "1" ? "Yes" : "No";

                myTable.row.add([
                    json[i].IVC_ID,
                    json[i].SiteName,
                    json[i].EFROM,
                    json[i].ESUBJECT.substring(0, 100),
                    json[i].NameAgent,
                    flagHandlingText,
                    TrxParam,
                    newDate + ' ' + newTime,
                    urlclick
                ]).draw(false);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}


function updateAgentSelect(agentNames) {
    var agentSelect = document.getElementById('agentSelect');
    agentSelect.innerHTML = '<option value="">Select Agent</option>'; // Reset the options

    agentNames.forEach(function (name) {
        var option = document.createElement('option');
        option.value = name;
        option.text = name;
        agentSelect.appendChild(option);
    });
}

function fetchAgents() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({
            TrxID: '0',
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'UIDESK233'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var agentSelect = document.getElementById('agentSelect');
            agentSelect.innerHTML = '<option value="">Select Agent</option>'; 

            for (var i = 0; i < json.length; i++) {
                var option = document.createElement('option');
                option.value = json[i].USERNAME;
                option.text = json[i].NAME;
                agentSelect.appendChild(option);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function ChangeFilter(val) {
    document.getElementById('startdate').value = '';
    document.getElementById('enddate').value = '';
    document.getElementById('AccountEmail').value = '';
    document.getElementById('agentSelect').selectedIndex = 0;

    document.getElementById('dateError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('agentError').style.display = 'none';
    document.getElementById('typeError').style.display = 'none';

    document.getElementById('dateFields').style.display = 'none';
    document.getElementById('endDateFields').style.display = 'none';
    document.getElementById('accountField').style.display = 'none';
    document.getElementById('agentField').style.display = 'none';

    if (val === '1') { // Date
        document.getElementById('dateFields').style.display = 'block';
        document.getElementById('endDateFields').style.display = 'block';
    } else if (val === '2') { // Account
        document.getElementById('accountField').style.display = 'block';
    } else if (val === '3') { // Agent & Date
        document.getElementById('dateFields').style.display = 'block';
        document.getElementById('endDateFields').style.display = 'block';
        document.getElementById('agentField').style.display = 'block';
        fetchAgents(); // Load agents if needed
    }
}

function clearFormFields() {
    // Reset all input fields
    document.getElementById('Ticket_ProductType').selectedIndex = 0; // Reset select to default option
    document.getElementById('startdate').value = '';
    document.getElementById('enddate').value = '';
    document.getElementById('AccountEmail').value = '';
    document.getElementById('agentSelect').selectedIndex = 0;

    // Hide all error messages
    document.getElementById('dateError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('agentError').style.display = 'none';
    document.getElementById('typeError').style.display = 'none';

    // Hide all conditional fields
    document.getElementById('dateFields').style.display = 'none';
    document.getElementById('endDateFields').style.display = 'none';
    document.getElementById('accountField').style.display = 'none';
    document.getElementById('agentField').style.display = 'none';
}

function EmailConversation() {
    $("#popupemail").modal('show');
    EmailConversationNew($("#ContentPlaceHolder1_TrxID").val());
}

async function EmailConversationNew(refID) {
    $("#Div_Conversation").show();
    const messageDiv = $('#Journeymailconversationnew');
    messageDiv.empty();

    try {
        // Mengambil percakapan berdasarkan refID yang diterima
        const conversationsResponse = await $.ajax({
            type: "POST",
            url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailConversation",
            data: JSON.stringify({
                RefID: refID,
                UserName: $("#hd_sessionLogin").val(),
                Action: 'SELECT'
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        const conversations = JSON.parse(conversationsResponse.d || conversationsResponse);

        if (!conversations || conversations.length === 0) {
            messageDiv.html("<p>No conversations found.</p>");
            return; // Keluar jika tidak ada percakapan
        }

        for (const conversation of conversations) {
            const emailId = conversation.EMAIL_ID;
            const direction = conversation.DIRECTION;

            // Format tanggal
            const formattedDate = formatDate(conversation.DateNya);
            const attachments = await fetchEmailAttachments(refID, emailId, direction);

            const emailClass = direction !== 'OUT' ? 'email-left' : 'email-right';

            const result = `
             <div class='email-wrapper'>
                 <div class='email-container ${emailClass}'>
                     <div class='email-card'>
                         <div class='email-header'>
                             <span class='email-title'>${conversation.EFROM}</span>
                             <span class='email-date'>${formattedDate}</span>
                         </div>
                         <div class='email-subject'>
                             <strong>${conversation.ESUBJECT}</strong>
                         </div>
                         <div class='email-body'>
                             <p>${conversation.EBODY_HTML}</p>
                         </div>
                         <div class='divider'></div>
                         <div class='email-footer'>
                             <ul class='email-attachments'>${attachments}</ul>
                             <div class='email-signature'>
                                 <p>Salam,</p>
                                 <p><strong>${conversation.EFROM}</strong></p>
                                 <img src='../images/signature.png' alt='Company Logo' class='company-logo'>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>`;

            messageDiv.append(result);
        }
    } catch (error) {
        console.error("Error loading conversation:", error);
        messageDiv.html("<p>Error loading conversation. Please try again later.</p>");
    }
}

function formatDate(dateString) {
    const timestamp = parseInt(dateString.match(/\/Date\((\d+)\)\//)[1], 10);
    const date = new Date(timestamp);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year} ${hours}:${minutes} `;
}

async function fetchEmailAttachments(refID, emailId, direction) {
    const fileInboxHTML = `${IPSERVER}/FileEmail/Inbox`;
    const fileOutboxHTML = `${IPSERVER}/FileEmail/Outbox`;

    try {
        const attachmentsResponse = await $.ajax({
            type: "POST",
            url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailAttachment",
            data: JSON.stringify({
                RefID: refID,
                EmailID: emailId,
                Direction: direction,
                UserName: $("#hd_sessionLogin").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        const attachments = JSON.parse(attachmentsResponse.d || attachmentsResponse);
        let attachmentHtml = '';

        const filteredAttachments = attachments.filter(attachment => {
            const attachmentDirection = attachment.DIRECTION ? attachment.DIRECTION.trim().toUpperCase() : '';
            const targetDirection = direction ? direction.trim().toUpperCase() : '';
            return attachmentDirection === targetDirection;
        });

        filteredAttachments.forEach(attachment => {
            const fileUrl = attachment.DIRECTION === 'IN' ? fileInboxHTML : fileOutboxHTML;
            const iconClass = attachment.FILETYPE === '.jpg' ? 'image-o' : 'pdf-o';

            attachmentHtml += `
                <li>
                    <div class='mailbox-attachment-info'>
                        <span class='mailbox-attachment-icon'><i class='fa fa-file-${iconClass}'></i></span>
                        <button class='btn btn-primary btn-sm'>
                            <a href='${fileUrl}/${attachment.URL}' class='mailbox-attachment-name text-white' target='_blank'>
                                <i class='fa fa-download'></i> ${attachment.FILENAME}
                            </a>
                        </button>
                    </div>
                </li>`;
        });

        return attachmentHtml || "<li>No attachments found.</li>";
    } catch (error) {
        console.error("Error fetching attachments:", error);
        return "<li>No attachments found.</li>";
    }
}