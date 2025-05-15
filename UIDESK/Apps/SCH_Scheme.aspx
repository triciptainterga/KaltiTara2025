<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master"
    CodeBehind="SCH_Scheme.aspx.vb" Inherits="UIDESK.SCH_Scheme" %>

    <asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <script src="js/jquery-1.9.1.min.js"></script>
        <script src="js/SCH_Scheme.js"></script>
        <script src="js/sweetalert.min.js"></script>
        <style>
            .time-select {
                display: inline-block;
                margin-right: 5px;
                /* Optional: add some space between the select boxes */
            }

            select {
                border-radius: 12px;
                /* Creates an oval shape */
                padding: 5px;
                /* Increases the size of the dropdown */
                font-size: 16px;
                /* Makes the text larger */
                border: 1px solid #ccc;
                width: 70px;
                /* Set a fixed width */
            }

            .dropdown-checkbox {
                width: 100%;
                border: 1px solid #ced4da;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
            }

            .dropdown-checkbox .dropdown-menu {
                width: 100%;
                max-height: 250px;
                overflow-y: auto;
            }

            .dropdown-checkbox input[type="search"] {
                margin-bottom: 10px;
                width: 100%;
                padding: 5px;
                box-sizing: border-box;
            }

            .input-group {
                display: flex;
                align-items: center;
            }

            .tab-navigation {
                position: relative;
                display: flex;
                align-items: center;
            }

            #tabs-container {
                display: flex;
                overflow-x: hidden;
                /* Prevent scrollbars */
                white-space: nowrap;
                flex-grow: 1;
                scroll-behavior: smooth;
                /* Smooth scrolling */
            }

            .scroll-left,
            .scroll-right {
                background-color: #f0f0f0;
                border: 1px solid #ccc;
                padding: 5px 10px;
                cursor: pointer;
                user-select: none;
            }

            .navTabs li {
                list-style-type: none;
                /* Menghilangkan marker bullet */
                margin-right: 10px;
                /* Memberikan jarak antar tab */
                flex: 0 0 auto;
                /* Agar setiap tab tetap memiliki ukuran yang sesuai */
            }

            /* Gaya dasar untuk tab */
            .navTabs li a {
                display: block;
                padding: 10px 15px;
                background-color: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 4px;
                color: #495057;
                text-decoration: none;
                transition: background-color 0.3s ease, color 0.3s ease;
            }

            /* Gaya saat tab di-hover */
            .navTabs li a:hover {
                background-color: #e9ecef;
                color: #007bff;
            }

            /* Gaya untuk tab aktif */
            .navTabs li.active a {
                background-color: #343a40;
                /* Warna latar belakang menjadi lebih gelap */
                color: white;
                /* Warna teks menjadi putih */
                border-color: #343a40;
                /* Border warna gelap */
            }

            /* Gaya saat tab aktif di-hover */
            .navTabs li.active a:hover {
                background-color: #23272b;
                /* Warna latar belakang menjadi lebih gelap lagi */
                color: white;
            }

            .nav-link.active {
                color: #fff;
                /* Warna teks saat aktif */
                background-color: #f7cc53;
                /* Background saat aktif */
                border-radius: 4px;
                /* Opsional, untuk sudut bulat */
                font-weight: bold;
                /* Teks tebal */
            }
        </style>
        <asp:HiddenField ID="hd_StatusAction" ClientIDMode="Static" runat="server" />
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <h5 class="card-title">Agent Scheme</h5>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div
                                class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                <div>
                                    <i class="mdi mdi-information-outline"></i>Agent Scheme <a href="#"
                                        class="btn btn-light" data-bs-toggle="modal" onclick="Tambah()"><i
                                            class="far fa-calendar-plus"></i>Add Scheme</a>
                                </div>
                                <div>
                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Filter()"><i
                                            class="fas fa-search"></i>&nbsp;Filter Data</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap table-check" id="DataSCH_Shift">
                        <thead>
                            <tr>
                                <th style="width: 50px;">Agent ID</th>
                                <th style="width: 150px;">Name Agent</th>
                                <th style="width: 150px;">SITE</th>
                                <th style="width: 150px;">Channel</th>
                                <th style="width: 50px;">Periode Start</th>
                                <th style="width: 50px;">Periode End</th>

                                <th style="width: 400px;">Last Modified Time</th>

                                <th style="width: 150px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
        <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addContactModal"
            aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addContactModalLabel">Create/Edit Scheme</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">


                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-bs-toggle="tab" href="#shift1" role="tab">
                                    <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                    <span class="d-none d-sm-block">Create Agent Scheme</span>
                                </a>
                            </li>
                            <!--<li class="nav-item">
                                                <a class="nav-link" data-bs-toggle="tab" href="#agents1" role="tab">
                                                    <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                                    <span class="d-none d-sm-block">Agents</span> 
                                                </a>
                                            </li>-->

                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content p-3 text-muted">
                            <div class="tab-pane active" id="shift1" role="tabpanel">
                                <p class="mb-0">
                                    Data agent sekema*
                                </p>
                                <p>
                                    Agent akan di assign kepada channel dan di jadwalkan pada tanggal yang dipilih! <i
                                        class="mdi mdi-information-outline"></i>
                                </p>
                                Type Agent *

                                <br />
                                <select id="mySelect" name="options" style="width:30%">
                                    <option value="1">Senior</option>
                                    <option value="2">Junior</option>

                                </select>

                                <br />
                                Channel

                                <br />
                                <select id="myChannel" name="options" style="width:30%">

                                </select>

                                <br />
                                <span style="display: inline-block;">Agent Terpilih: <div id="selectedCount"
                                        style="display: inline;">0</div></span>
                                <span style="display: inline-block; display:none;" id="maxChannel">Maximal: <div
                                        id="selectedMax" style="display: inline;"></div></span>
                                <br />
                                <div class="input-group">
                                    <input type="text" class="form-control dropdown-toggle" id="selectedItems"
                                        placeholder="List Agents..." readonly data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                    <ul class="dropdown-menu w-100" id="DataListAgents">


                                    </ul>
                                    <%--<a class="btn btn-primary" id="processButton" onclick="processAddAgents()"><i
                                            data-feather="user-plus"></i> Process</a>--%>
                                </div>
                                <br />

                                <div class="row">
                                    <div class="col-4">
                                        <p>
                                            Agent ID *

                                            <br />
                                            <input type="text" id="AgentID" class="form-control" readonly />
                                            <asp:HiddenField ID="hd_DateParamStart" ClientIDMode="Static"
                                                runat="server" />
                                        </p>
                                    </div>

                                    <div class="col-4 mb-4">
                                        <br />
                                        <button style="display:none" type="button" class="btn btn-primary w-sm"
                                            onclick="ActionGenerate()" id="btnGenerate">Generate</button>
                                    </div>
                                </div>

                                <div class="tab-navigation">
                                    <a class="scroll-left">&laquo;</a>
                                    <ul class="navTabs" role="tablist" id="tabs-container">
                                        <!-- Tabs will be inserted here by JavaScript -->
                                    </ul>
                                    <a class="scroll-right">&raquo;</a>
                                </div>

                            </div>
                            <div class="tab-content" id="tab-content-container">
                                <!-- Tab content will be inserted here by JavaScript -->
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()"
                                    id="Update">Update</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="saveSchedule()"
                                    id="save-schedule">Add</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()"
                                    id="Delete">Delete</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <!-- staticBackdrop Modal -->

        <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addAgentShift"
            aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                            I will not close if you click outside me. Don't even try to press
                            escape key.
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                            Close</button>
                        <button type="button" class="btn btn-primary">Understood</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filter Data Modal -->
        <div class="modal fade" id="filterdata" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addContactModalLabel">Filter Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div class="mb-3">
                            <label for="filterType" class="form-label">Filter By</label>
                            <select id="filterType" class="form-select" onchange="toggleFilter()">
                                <option value="" selected disabled>Select Filter Type</option>
                                <option value="site">Site</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <!-- Site Filter -->
                        <div class="mb-3" id="siteFilterDiv" style="display:none;">
                            <label for="siteSelect" class="form-label">Site</label>
                            <select id="siteSelect" class="form-select">
                            </select>
                        </div>

                        <!-- User Filter -->
                        <div class="mb-3" id="userFilterDiv" style="display:none;">
                            <label for="statusUserSelect" class="form-label">Status User</label>
                            <select id="statusUserSelect" class="form-select">
                                <option value="">Select Status</option>
                            </select>
                            <label for="userSelect" class="form-label mt-2">Name Shifts</label>
                            <select id="userSelect" class="form-select">
                                <option value="">Select Name Shifts</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary w-sm" onclick="ActionFilter()">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <script>
            $(document).ready(function () {
                // Handle checkbox selection and display in the textbox
                $('.dropdown-item input[type="checkbox"]').on('change', function () {
                    let selected = [];
                    $('.dropdown-item input[type="checkbox"]:checked').each(function () {
                        selected.push($(this).val());
                    });
                    $('#selectedItems').val(selected.join(';'));
                });

                // Implement search functionality within the dropdown
                $('#searchDropdown').on('keyup', function () {
                    var value = $(this).val().toLowerCase();
                    $('.dropdown-item').filter(function () {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                    });
                });
            });
        </script>
    </asp:Content>