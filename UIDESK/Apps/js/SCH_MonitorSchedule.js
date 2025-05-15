var DateRequest = $("#hd_DateRequest").val();
var DateTarget = $("#hd_DateChangeTarget").val();
var AgentTarget = $("#hd_AgentTarget").val();
var AgentRequest = $("#hd_AgentScheduleID").val();
var JamRequest = $("#hd_JamRequest").val();
var JamTarget = $("#hd_JamTarget").val();
console.log(DateRequest);
console.log(DateTarget);
console.log(AgentTarget);
console.log(AgentRequest);
console.log(JamRequest);
console.log(JamTarget);
// Helper untuk mengonversi format tanggal dari /Date(...)/

console.log("{TrxID:'" + $("#hd_AgentScheduleID").val() + "', TrxUserName: '" + JamRequest + "', TrxAction: '" + JamTarget + "', TrxActionType: 'SELECT_DATALIST', Param1: '" + DateRequest + "', Param2: '" + DateTarget + "', Param3: '" + AgentRequest + "', Param4: '" + AgentTarget + "'}");

$.ajax({
    type: "POST",
    url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
    data: "{TrxID:'" + $("#hd_AgentScheduleID").val() + "', TrxUserName: '" + JamRequest + "', TrxAction: '" + JamTarget + "', TrxActionType: 'SELECT_DATALIST', Param1: '" + DateRequest + "', Param2: '" + DateTarget + "', Param3: '" + AgentRequest + "', Param4: '" + AgentTarget + "'}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
        json = JSON.parse(data.d);
        console.log(json);

        var table = '<table class="table table-light table-striped">';
        // Membuat baris header
        table += '<tr>' +
            '<th scope="col">Schedule Id</th>' +
            '<th scope="col">Nama Agent</th>' +
            '<th scope="col">Target Agent</th>' +
            '<th scope="col">Date Schedule</th>' +
            '<th scope="col">Action</th>' +

            '</tr>';


        $.each(json, function (index, item) {




            var urlClick = "<td> <a  href='#' onclick=Detail('" + item.ScheduleID + "') > <i class='fa fa-eye text-primary'></i></a > ";

            table += '<tr>';
            table += '<td>' + item.ScheduleID + '</td>';
            table += '<td>' + item.AgentName + '</td>';
            table += '<td>' + item.agenttarget + '</td>';
            table += '<td>' + item.DateScheduledFormatted + '</td>';
            table += '<td>' + urlClick + '</td>';
            table += '</tr>';



        });
        $('#tableLististdata').html(table);









    },
    error: function (xhr, status, error) {
        console.error("Error: " + status + " " + error);
        failureCallback(error);
    }
});

function ActionApprove() {

    //jam["08:00", "08:30", "09:00"]
    var JamRequest = [];
    var JamTarget = [];
    var DateRequest = [];
    var DateTarget = [];
    var AgentRequest;
    var AgentTarget;

    $('#tableAgentRequest tbody tr').each(function () {
        var row = $(this);
        var id = row.find('td').eq(0).text();
        var agentId = row.find('td').eq(1).text();
        var jam = row.find('td').eq(5).text();
        JamRequest.push('"' + jam + '"');
        DateRequest.push('"' + id + '"');
        AgentRequest = agentId;


    });

    $('#tableAgentTarget tbody tr').each(function () {
        var row = $(this);
        var idtarget = row.find('td').eq(0).text();
        var agentT = row.find('td').eq(1).text();
        var jamChange = row.find('td').eq(5).text();
        JamTarget.push('"' + jamChange + '"');
        DateTarget.push('"' + idtarget + '"');
        AgentTarget = agentT;


    });


    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
        data: "{TrxID:'" + $("#hd_AgentScheduleID").val() + "', TrxUserName: '[" + JamRequest + "]', TrxAction: '[" + JamTarget + "]', TrxActionType: 'UPDATE_DATACHANGESCHEDULE_APPROVED', Param1: '[" + DateRequest + "]', Param2: '[" + DateTarget + "]', Param3: '" + AgentRequest + "', Param4: '" + AgentTarget + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            location.reload();

            json = JSON.parse(data.d);
            console.log(json);


        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + " " + error);
            failureCallback(error);
        }
    });

}

function ActionReject() {


    //swal({
    //    title: "Input something",
    //    text: "Please enter your input:",
    //    content: {
    //        element: "input",
    //        attributes: {
    //            placeholder: "Type here",
    //            type: "text",
    //        },
    //    },
    //    button: {
    //        text: "Submit",
    //        closeModal: false,
    //    },
    //}).then((value) => {
        // Handle the input value
       
            //$.ajax({
            //    type: "POST",
            //    url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
            //    data: "{TrxID:'" + $("#hd_AgentScheduleID").val() + "', TrxUserName: '" + JamRequest + "', TrxAction: '" + JamTarget + "', TrxActionType: 'UPDATE_DATACHANGESCHEDULE_REJECT', Param1: '" + DateRequest + "', Param2: '" + DateTarget + "', Param3: '" + AgentRequest + "', Param4: '" + AgentTarget + "'}",
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (data) {
            //        location.reload();
            //        json = JSON.parse(data.d);
            //        console.log(json);


            //    },
            //    error: function (xhr, status, error) {
            //        console.error("Error: " + status + " " + error);
            //        failureCallback(error);
            //    }
            //});
           
      
    //    else {
    //        swal("You didn't enter anything!");
    //    }
    //});
    //jam["08:00", "08:30", "09:00"]
    var JamRequest = [];
    var JamTarget = [];
    var DateRequest = [];
    var DateTarget = [];
    var AgentRequest;
    var AgentTarget;

    $('#tableAgentRequest tbody tr').each(function () {
        var row = $(this);
        var id = row.find('td').eq(0).text();
        var agentId = row.find('td').eq(1).text();
        var jam = row.find('td').eq(5).text();
        JamRequest.push('"' + jam + '"');
        DateRequest.push('"' + id + '"');
        AgentRequest = agentId;


    });

    $('#tableAgentTarget tbody tr').each(function () {
        var row = $(this);
        var idtarget = row.find('td').eq(0).text();
        var agentT = row.find('td').eq(1).text();
        var jamChange = row.find('td').eq(5).text();
        JamTarget.push('"' + jamChange + '"');
        DateTarget.push('"' + idtarget + '"');
        AgentTarget = agentT;


    });


    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
        data: "{TrxID:'" + $("#hd_AgentScheduleID").val() + "', TrxUserName: '[" + JamRequest + "]', TrxAction: '[" + JamTarget + "]', TrxActionType: 'UPDATE_DATACHANGESCHEDULE_REJECT', Param1: '[" + DateRequest + "]', Param2: '[" + DateTarget + "]', Param3: '" + AgentRequest + "', Param4: '" + AgentTarget + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            location.reload();

            json = JSON.parse(data.d);
            console.log(json);


        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + " " + error);
            failureCallback(error);
        }
    });
   

}
function Detail(scheduleId) {



    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_TrxChangeSchedule",
        data: "{TrxID:'" + scheduleId + "', TrxUserName: '" + JamRequest + "', TrxAction: '" + JamTarget + "', TrxActionType: 'SELECT_DATACHANGESCHEDULE', Param1: '" + DateRequest + "', Param2: '" + DateTarget + "', Param3: '" + AgentRequest + "', Param4: '" + AgentTarget + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            json = JSON.parse(data.d);
            console.log(json);




            const dataNya = json;
            function parseDate(jsonDate) {
                const timestamp = parseInt(jsonDate.replace(/\/Date\((\d+)\)\//, "$1"));
                return new Date(timestamp).toLocaleDateString();
            }

            function populateTable(tableId, filter) {
                const tableBody = document.getElementById(tableId).querySelector("tbody");
                tableBody.innerHTML = ""; // Kosongkan table sebelum mengisi

                dataNya.filter(item => item.Keterangan === filter).forEach(item => {
                    const row = document.createElement("tr");
                    row.innerHTML = `

                        <td class="hide-column">${item.ID}</td>
                        <td class="hide-column">${item.AgentID}</td>
                        <td>${item.AgentName}</td>
                        <td>${item.daysName}</td>
                        <td>${parseDate(item.DateScheduled)}</td>
                        <td>${item.startDate}</td>
                        <td>${item.endDate}</td>

                        <td>${item.statusTime}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }


            // Memuat data ke dalam masing-masing tabel
            populateTable("tableAgentRequest", "AgentRequest");
            populateTable("tableAgentTarget", "AgentTarget");
            populateTable("tableTargetChange", "TargetChange");
            populateTable("tableTargetRequest", "TargetRequest");
            $('#divListData').hide();
            $('#divdetail').show();

        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + " " + error);
            failureCallback(error);
        }
    });
}

