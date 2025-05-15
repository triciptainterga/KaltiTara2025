<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="SCH_Callender.aspx.vb" Inherits="UIDESK.SCH_Callender" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- ============================================================== -->
    <!-- fullcalendar css -->
    <link href="assets/libs/fullcalendar/main.min.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-1.9.1.min.js"></script>

    <style>
        .scrollable-container {
            max-height: 1000px; /* Adjust the height as needed */
            overflow-y: auto; /* Enable vertical scrolling */
        }
    </style>

    <!-- Icons Css -->
    <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <script>
        // document.getElementById('txtSearch').addEventListener('change', fetchAgentData);
        document.addEventListener('DOMContentLoaded', function () {
            document.getElementById('txtSearch').addEventListener('input', fetchAgentData);
        });
        function fetchAgentData() {
            const messageDiv = $('#listAgent');
            const searchValue = $("#txtSearch").val();
            const sessionLogin = $("#hd_sessionLogin").val();

            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
                data: "{TrxID:'" + searchValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LISTAGENT', TrxActionType: 'SEARCH'}",

                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    const json = JSON.parse(data.d);
                    let result = "";

                    messageDiv.empty();

                    for (i = 0; i < json.length; i++) {

                        result = `
                            <div class="scrollable-container" style="max-height: 400px; overflow-y: auto;">
                                <div class="card-body p-4">
                                    <div class="d-flex align-items-start">
                                        <div class="flex-shrink-0 avatar rounded-circle me-3">
                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="img-fluid rounded-circle" />
                                        </div>
                                        <div class="flex-grow-1 overflow-hidden">
                                            <h5 class="font-size-15 mb-1 text-truncate">
                                                <a href="#" class="text-dark">${json[i].USERNAME} </a>
                                            </h5>
                                            <p class="text-muted text-truncate mb-0">${json[i].NAME}</p>
                                        </div>
                                        <div class="flex-shrink-0 dropdown">
                                            <a class="text-body dropdown-toggle font-size-16" 
                                               href="#" 
                                             onclick="viewJadwalAgent('${json[i].USERID}', '${json[i].NAME}')"
                                               role="button" 
                                               data-bs-toggle="dropdown" 
                                               aria-haspopup="true">
                                                <i data-feather="arrow-right-circle"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        messageDiv.append(result);
                        feather.replace();
                    }
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.error("Error:", textStatus, errorThrown);
                    alert("An error occurred while fetching data. Please try again."); // User feedback
                }
            
                
            });
        }
       
           




      
    </script>
    <div>
        <div class="container-fluid">
            <asp:HiddenField ID="hd_AgentScheduleID" ClientIDMode="Static" runat="server" />
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-flex align-items-center justify-content-between">
                        <h4 class="mb-0">Agent Scheduling</h4>

                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Apps</a></li>

                                <li class="breadcrumb-item active">Calendar</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <!-- end col-->

                        <div class="col-xl-3">

                            <div class="card card-h-100">
                                <div class="card-body" style="display: none">

                                    <div id="external-events">
                                        <%-- <br>
                                        <p class="text-muted">Drag and drop your event or click in the calendar</p>
                                        <div class="external-event fc-event bg-success" data-class="bg-success">
                                            <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>SURATTUGAS
                                        </div>
                                        <div class="external-event fc-event bg-info" data-class="bg-info">
                                            <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>IZIN
                                        </div>
                                        <div class="external-event fc-event bg-warning" data-class="bg-warning">
                                            <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>TRAINING
                                        </div>
                                        <div class="external-event fc-event bg-danger" data-class="bg-danger">
                                            <i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>CUTI
                                        </div>--%>
                                    </div>

                                </div>

                                <div class="card-body scrollable-container">
                                    <p id="LabelListAgent">List Agent </p>

                                    <input type="text" class="form-control" id="txtSearch" placeholder="Key">
                                    <div id="listAgent"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-9">
                            <div class="card card-h-100">
                                <div class="card-body">

                                    <h2><span id="txtTitle"></span></h2>
                                    <div id="calendar"></div>
                                </div>
                            </div>
                        </div>
                        <!-- end col -->
                    </div>

                    <div style='clear: both'></div>

                    <!-- Add New Event MODAL -->
                    <div class="modal fade" id="event-modal" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header py-3 px-4 border-bottom-0">
                                    <h5 class="modal-title" id="modal-title">Event</h5>

                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-hidden="true">
                                    </button>

                                </div>
                                <div class="modal-body p-4">
                                    <form class="needs-validation" name="event-form" id="form-event" novalidate>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Shift ID</label>
                                                    <input class="form-control" placeholder="ShiftID"
                                                        type="text" name="title" id="event-id" required value="" />

                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Shift Date</label>
                                                    <input class="form-control" placeholder="Shift Date"
                                                        type="text" name="title" id="event-date" required value="" />

                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Shift Name</label>
                                                    <input class="form-control" placeholder="Insert Shift Name"
                                                        type="text" name="title" id="event-title" required value="" />
                                                    <div class="invalid-feedback">Please provide a valid event name</div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Channel</label>
                                                    <div class="row">
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/call-off.png" alt="call" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/email-off.png" alt="email" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/fb-off.png" alt="fb" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/ig-off.png" alt="ig" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/chat-off.png" alt="chat" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/tw-off.png" alt="tw" width="32" class="toggle-image">
                                                        </div>
                                                        <div class="col-auto">
                                                            <img src="assets/images/icon/wi-off.png" alt="wi" width="32" class="toggle-image">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Category</label>
                                                    <select class="form-select shadow-none" name="category"
                                                        id="event-category" required>
                                                        <option value="bg-danger" selected>Danger</option>
                                                        <option value="bg-success">Success</option>
                                                        <option value="bg-primary">Primary</option>
                                                        <option value="bg-info">Info</option>
                                                        <option value="bg-dark">Dark</option>
                                                        <option value="bg-purple">Purple</option>
                                                        <option value="bg-warning">Warning</option>
                                                    </select>
                                                    <div class="invalid-feedback">Please select a valid event category</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-6">
                                                <a class="btn btn-danger" id="btn-delete-event">Delete</a>
                                            </div>
                                            <div class="col-6 text-end">
                                                <a class="btn btn-light me-1" data-bs-dismiss="modal">Close</a>
                                                <a class="btn btn-success" id="showDataBtn">Save</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- end modal-content-->
                        </div>
                        <!-- end modal dialog-->
                    </div>
                    <!-- end modal-->
                </div>
            </div>

        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->

    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-followup"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabelfollow">Form Cuti</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="workexperience-category-input">Key Name</label>
                                    <input type="text" class="form-control" id="Form_Keyname" placeholder="Key">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="workexperience-category-input">Alasan</label>
                                    <input type="text" class="form-control" id="Form_Alasan" placeholder="Alasan">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <div class="form-group">
                                        <label for="startDate">Start Date</label>
                                        <input type="date" class="form-control" id="Form_startDate" name="startDate">
                                    </div>
                                    <div class="form-group">
                                        <label for="endDate">End Date</label>
                                        <input type="date" class="form-control" id="Form_endDate" name="endDate">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionFormExtend()" id="ActionSimpanFormExtend">Submit</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-training"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModaltraining">Form Training</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="workexperience-category-input">Key Name</label>
                                    <input type="text" class="form-control" id="Form_Keyname" placeholder="Key">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="workexperience-category-input">Alasan</label>
                                    <input type="text" class="form-control" id="Form_Alasan" placeholder="Alasan">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <div class="form-group">
                                        <label for="startDate">Start Date</label>
                                        <input type="date" class="form-control" id="Form_startDate" name="startDate">
                                    </div>
                                    <div class="form-group">
                                        <label for="endDate">End Date</label>
                                        <input type="date" class="form-control" id="Form_endDate" name="endDate">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionFormExtend()" id="ActionSimpanFormExtend">Submit</button>
                </div>
            </div>
        </div>
    </div>

    <!-- plugin js -->
    <script src="assets/libs/fullcalendar/main.min.js"></script>
    <script src="assets/libs/feather-icons/feather.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Calendar init -->
    <script src="assets/js/pages/calendar.init.js"></script>


    <!-- end main content-->
</asp:Content>
