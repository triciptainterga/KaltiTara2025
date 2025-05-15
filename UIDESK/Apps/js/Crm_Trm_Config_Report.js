$(document).ready(function () {
  TrmCategory();
  loadDropdowns();
  $("#Update").hide();
  $("#Delete").hide();
});

function htmlEncode(str) {
  return String(str).replace(/[^\w. ]/gi, function (c) {
    return "&#" + c.charCodeAt(0) + ";";
  });
}

var myTable; 
function TrmCategory() {
  myTable = $("#MasterConfig").DataTable({
    destroy: true,
    paging: true,
    searching: true,
    info: true,
    autoWidth: false,
    columns: [
      { width: "10%" },
      { width: "30%" },
      { width: "15%" },
      { width: "20%" },
      { width: "15%" },
      { width: "10%" },
    ],
  });

  $.ajax({
    type: "POST",
    url: "asmx/Crm_Trm_Config_Report.asmx/BRA_Configuration_Report",
    data: JSON.stringify({
      TrxID: "0",
      TrxTypeReport: "0",
      TrxTarget: "0",
      TrxSite: "0",
      TrxPresentase: "0",
      TrxAction: "TABLE",
      TrxUserName: $("#hd_sessionLogin").val(),
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      var json = JSON.parse(data.d);
      myTable.clear().draw();

      json.forEach((item, index) => {
        var Status = item.Status === "Y" ? "Active" : "Non Active";
        var actionHtml = `
          <div class="flex-shrink-0 ms-2">
              <div class="dropdown">
                  <a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="mdi mdi-dots-horizontal"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                      <a class="dropdown-item" href="#" onclick="UpdateKlik('${item.ID}')">Edit</a>
                      <a class="dropdown-item" href="#" onclick="ShowDeleteModal('${item.ID}')">Delete</a>
                  </div>
              </div>
          </div>`;

        myTable.row
          .add([
            index + 1,
            item.TypeReport,
            item.Target,
            item.Site,
            item.Presentase + "%",
            actionHtml,
          ])
          .draw(false);
      });
    },
    error: function (xmlHttpRequest, textStatus, errorThrown) {
      console.error(xmlHttpRequest.responseText);
      console.error(textStatus);
      console.error(errorThrown);
    },
  });
}


function Tambah() {
  $("#MasterConfigName").attr("disabled", false).val("");
  $("#addContactModal").modal("show");
  $("#Simpan").show();
  $("#Update").hide();
  $("#Delete").hide();
  ClearObject();
}

function loadDropdowns() {
  // Load TypeReport Dropdown
  $.ajax({
    url: "asmx/Crm_Trm_Config_Report.asmx/BRA_MasterReport",
    type: "POST",
    data: JSON.stringify({
      TrxID: "0",
      TrxTypeReport: "0",
      TrxStatus: "0",
      TrxUserName: $("#hd_sessionLogin").val(),
      TrxAction: "DROPDOWN",
    }),
    contentType: "application/json",
    success: function (data) {
      var json = JSON.parse(data.d);
      var typeReportDropdown = $("#dropdown-TypeReport");
      typeReportDropdown.empty(); // Clear existing options
      typeReportDropdown.append("<option>Select</option>"); // Default option

      // Populate the TypeReport dropdown with data
      json.forEach(function (item) {
        typeReportDropdown.append(
          '<option value="' +
            item.TypeReport +
            '">' +
            item.TypeReport +
            "</option>"
        );
      });
    },
    error: function (xmlHttpRequest, textStatus, errorThrown) {
      console.error(
        "Error loading TypeReport dropdown: ",
        xmlHttpRequest.responseText
      );
    },
  });

  // Load Site Dropdown
  $.ajax({
    url: "asmx/Crm_Trm_Config_Report.asmx/BRA_MasterReport",
    type: "POST",
    data: JSON.stringify({
      TrxID: "0",
      TrxTypeReport: "0",
      TrxStatus: "0",
      TrxUserName: $("#hd_sessionLogin").val(),
      TrxAction: "DROPDOWN_TYPE",
    }),
    contentType: "application/json",
    success: function (data) {
      var json = JSON.parse(data.d);
      var siteDropdown = $("#dropdown-Site");
      siteDropdown.empty(); // Clear existing options
      siteDropdown.append("<option>Select</option>"); // Default option

      // Populate the Site dropdown with data
      json.forEach(function (item) {
        siteDropdown.append(
          '<option value="' + item.Site + '">' + item.Site + "</option>"
        );
      });
    },
    error: function (xmlHttpRequest, textStatus, errorThrown) {
      console.error(
        "Error loading Site dropdown: ",
        xmlHttpRequest.responseText
      );
    },
  });
}

function ActionSimpan() {
  if ($("#MasterConfigName").val() === "") {
    swal("", "Master Report Name is empty", "info");
    return false;
  }

  var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
  if (!regex.test($("#MasterConfigName").val())) {
    swal("", "Invalid characters in Master Report Name", "error");
    return false;
  }

  if ($("#cmbStatus").val() === "" || $("#cmbStatus").val() === "Select") {
    swal("", "Status is empty", "info");
    return false;
  }

  // Get the selected values from the dropdowns
  var typeReport = $("#dropdown-TypeReport").val();
  var target = $("#TxtTarget").val();
  var site = $("#dropdown-Site").val();
  var presentase = $("#TXTPresentase").val();
  var trxID = $("#TrxID").val() || "0"; // Ensure TrxID is set to 0 if not available

  // Basic validation for required fields
  if (typeReport === "" || site === "" || presentase === "") {
    swal("", "Please fill in all fields", "info");
    return false;
  }

  swal({
    title: "Do you want to process?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      var form_data = JSON.stringify({
        TrxID: trxID, // Pass TrxID as part of the data
        TrxUserName: $("#hd_sessionLogin").val(),
        TrxTypeReport: typeReport,
        TrxTarget: target,
        TrxSite: site,
        TrxPresentase: presentase,
        TrxAction: "INSERT",
      });

      $.ajax({
        url: "asmx/Crm_Trm_Config_Report.asmx/BRA_Configuration_Report",
        type: "POST",
        data: form_data,
        contentType: "application/json",
        success: function (data) {
          var json = JSON.parse(data.d);
          json.forEach((item) => {
            if (item.Result === "True") {
              swal("", "Insert Data Has Been Success", "success").then(() => {
                location.href = "Crm_Trm_Config_Report.aspx";
              });
            } else {
              swal("", "Insert Data Has Been Failed", "error");
            }
          });
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
          console.error(xmlHttpRequest.responseText);
        },
      });
    }
  });
}

function UpdateKlik(TrxID) {
  $("#addContactModal").modal("show");
  $("#Simpan").hide();
  $("#Update").show();
  $("#Delete").hide();
  $("#ContentPlaceHolder1_TrxID").val(TrxID); // Set the TrxID to the hidden field
  // TrmSelected();  // Ensure this function properly loads the relevant data to edit
}

function ActionUpdate() {
  var TrxID = $("#ContentPlaceHolder1_TrxID").val(); // Get TrxID from hidden field
  var MasterConfigName = $("#dropdown-TypeReport").val(); // Get the selected report type
  var Target = $("#TxtTarget").val().trim(); // Get target input value and trim it
  var Site = $("#dropdown-Site").val(); // Get site selection
  var Presentase = $("#TXTPresentase").val(); // Get presentase input value
  var cmbStatus = $("#cmbStatus").val(); // Get the selected status

  // Validate the form inputs
  if (MasterConfigName === "" || MasterConfigName === "Select") {
    swal("", "Master Report Name is empty or not selected", "info");
    return false;
  }

  if (Target === "") {
    swal("", "Target is empty", "info");
    return false;
  }

  if (Site === "" || Site === "Select") {
    swal("", "Site is empty or not selected", "info");
    return false;
  }

  if (Presentase === "") {
    swal("", "Presentase is empty", "info");
    return false;
  }

  if (cmbStatus === "" || cmbStatus === "Select") {
    swal("", "Status is empty or not selected", "info");
    return false;
  }

  swal({
    title: "Do you want to update the data?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willUpdate) => {
    if (willUpdate) {
      console.log("TrxID:", TrxID);
      console.log("MasterConfigName:", MasterConfigName);
      console.log("Target:", Target);
      console.log("Site:", Site);
      console.log("Presentase:", Presentase);
      console.log("cmbStatus:", cmbStatus);

      $.ajax({
        url: "asmx/Crm_Trm_Config_Report.asmx/BRA_Configuration_Report",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
          TrxID: TrxID, // The ID of the record to update
          TrxTypeReport: MasterConfigName,
          TrxTarget: Target, // The target input value
          TrxSite: Site, // The site selection
          TrxPresentase: Presentase, // The presentase input value
          TrxStatus: cmbStatus, // The selected status (Y or N)
          TrxName: MasterConfigName, // Master Report Name
          TrxUserName: $("#hd_sessionLogin").val(), // User session information
          TrxAction: "UPDATE", // Action type for update
        }),
        success: function (data) {
          var json = data.d ? JSON.parse(data.d) : []; // Handle response correctly
          json.forEach((item) => {
            if (item.Result === "True") {
              swal("", "Update Data Has Been Success", "success").then(() => {
                location.reload(); // Reload the page to reflect the updated data
              });
            } else {
              swal("", "Update Data Has Been Failed", "error");
            }
          });
        },
        error: function (xhr, textStatus, errorThrown) {
          console.error(xhr.responseText);
          console.error(textStatus);
          console.error(errorThrown);
          swal(
            "",
            "An error occurred while updating the data. Please try again.",
            "error"
          );
        },
      });
    }
  });
}

function ShowDeleteModal(TrxID) {
  $.ajax({
    type: "POST",
    url: "asmx/Crm_Trm_Master_Report.asmx/BRA_Configuration_Report",
    data: JSON.stringify({
      TrxID: TrxID,
      TrxTarget: "0",
      TrxTypeReport: "0",
      TrxSite: "0",
      TrxPresentase: "0",
      TrxStatus: "0",
      TrxAction: "SELECT",
      TrxUserName: $("#hd_sessionLogin").val(),
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      var json = JSON.parse(data.d);
      if (json.length > 0) {
        var item = json[0];
        $("#delete-TypeReport").val(item.TypeReport);
        $("#delete-TxtTarget").val(item.Target);
        $("#delete-Site").val(item.Site);
        $("#delete-TXTPresentase").val(item.Presentase + "%");
        $("#deleteContactModal").modal("show");
        $("#ContentPlaceHolder1_TrxID").val(TrxID);
      }
    },
    error: function (xmlHttpRequest, textStatus, errorThrown) {
      console.error(xmlHttpRequest.responseText, textStatus, errorThrown);
    },
  });
}

function ActionDelete() {
    var TrxID = $("#ContentPlaceHolder1_TrxID").val(); 
    if (TrxID === "") {
      swal("", "No record selected for deletion", "info");
      return false;
    }
  
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $.ajax({
          url: "asmx/Crm_Trm_Config_Report.asmx/BRA_Configuration_Report",
          method: "POST",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          data: JSON.stringify({
            TrxID: TrxID, 
            TrxTarget: "0",
            TrxTypeReport: "0",
            TrxSite: "0",
            TrxPresentase: "0",
            TrxStatus: "0",
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: "DELETE",
          }),
          success: function (data) {
            var json = JSON.parse(data.d);
            json.forEach((item) => {
              if (item.Result === "True") {
                swal("", "Delete Data Has Been Success", "success").then(() => {
                  if (myTable) {  
                    myTable.rows().every(function () {
                      var data = this.data();
                      if (data.includes(TrxID)) {
                        this.remove();
                      }
                    });
                    myTable.draw();
                  }
                  $("#deleteContactModal").modal("hide"); 
  
                  setTimeout(function() {
                    location.reload();
                  }, 500); 
                });
              } else {
                swal("", "Delete Data Has Been Failed", "error");
              }
            });
          },
          error: function (xhr, textStatus, errorThrown) {
            console.error("Error occurred:", xhr.responseText, textStatus, errorThrown);
            swal("", "An error occurred during deletion. Please try again.", "error");
          },
        });
      }
    });
  }
  

function TrmSelected() {
  $.ajax({
    type: "POST",
    url: "asmx/Crm_Trm_Config_Report.asmx/BRA_MasterReport",
    data: JSON.stringify({
      TrxID: $("#ContentPlaceHolder1_TrxID").val(),
      TrxUserName: $("#hd_sessionLogin").val(),
      TrxAction: "SELECT",
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      var json = JSON.parse(data.d);
      json.forEach((item) => {
        $("#MasterConfigName").val(item.TrxName);
        $("#cmbStatus").val(item.TrxStatus);
      });
    },
    error: function (xmlHttpRequest, textStatus, errorThrown) {
      console.error(xmlHttpRequest.responseText);
    },
  });
}

function ClearObject() {
  $("#MasterConfigName").val("");
  $("#cmbStatus").val("");
}
