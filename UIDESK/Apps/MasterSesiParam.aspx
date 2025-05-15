<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="MasterSesiParam.aspx.vb" Inherits="UIDESK.MasterSesiParam" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/MasterSesiParam.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <style>
        .time-select {
            display: inline-block;
            margin-right: 5px; /* Optional: add some space between the select boxes */
        }

        select {
            border-radius: 12px; /* Creates an oval shape */
            padding: 5px; /* Increases the size of the dropdown */
            font-size: 16px; /* Makes the text larger */
            border: 1px solid #ccc;
            width: 70px; /* Set a fixed width */
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
            overflow-x: hidden; /* Prevent scrollbars */
            white-space: nowrap;
            flex-grow: 1;
            scroll-behavior: smooth; /* Smooth scrolling */
        }

        .scroll-left, .scroll-right {
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            padding: 5px 10px;
            cursor: pointer;
            user-select: none;
        }

        .navTabs li {
            list-style-type: none; /* Menghilangkan marker bullet */
            margin-right: 10px; /* Memberikan jarak antar tab */
            flex: 0 0 auto; /* Agar setiap tab tetap memiliki ukuran yang sesuai */
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
                background-color: #343a40; /* Warna latar belakang menjadi lebih gelap */
                color: white; /* Warna teks menjadi putih */
                border-color: #343a40; /* Border warna gelap */
            }

                /* Gaya saat tab aktif di-hover */
                .navTabs li.active a:hover {
                    background-color: #23272b; /* Warna latar belakang menjadi lebih gelap lagi */
                    color: white;
                }

        .nav-link.active {
            color: #fff; /* Warna teks saat aktif */
            background-color: #f7cc53; /* Background saat aktif */
            border-radius: 4px; /* Opsional, untuk sudut bulat */
            font-weight: bold; /* Teks tebal */
        }
    </style>
    <asp:HiddenField ID="hd_StatusAction" ClientIDMode="Static" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h5 class="card-title">Master Param Group</h5>
                            <input type="hidden" id="hfId" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <i class="mdi mdi-information-outline"></i>Agent Master <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Tambah()"><i class="far fa-calendar-plus"></i>Add Data</a>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="table-responsive">
                    <table class="table align-middle table-nowrap table-check" id="DataSCH_Shift">
                        <thead>
                            <tr>
                                <th style="width: 2px;">ID</th>
                                <th style="width: 150px;">Hari</th>
                                <th style="width: 250px;">Bulan</th>
                                <th style="width: 250px;">Channel Name</th>
                                <th style="width: 50px;">Qty</th>

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

    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addContactModalNew"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Create/Edit Shift</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">


                    <!-- Nav tabs -->


                    <!-- Tab panes -->
                    <div class="tab-content p-3 text-muted">
                        <div class="tab-pane active" id="shift1" role="tabpanel">
                           
                            <label for="myBulan">Month</label>
                            <select id="myMonth" name="options" class="form-control">
                                <option value="">Select Month</option>
                                <option value="1">Januari</option>
                                <option value="2">Februari</option>
                                <option value="3">Maret</option>
                                <option value="4">April</option>
                                <option value="5">Mei</option>
                                <option value="6">Juni</option>
                                <option value="7">Juli</option>
                                <option value="8">Agustus</option>
                                <option value="9">September</option>
                                <option value="10">Oktober</option>
                                <option value="11">November</option>
                                <option value="12">Desember</option>

                            </select>

                             <label for="myBulan">Channel</label>
                            <select id="SelectChannel" name="options" class="form-control">
                                <option value="">Select a channel</option>
                                <option value="Voice">Voice</option>
                                <option value="Email">Email</option>
                                <option value="Omnichat">Omnichat</option>
                                <option value="Comments & More">Comments & More</option>
                            </select>

                            <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-bs-toggle="tab" href="#Monday" role="tab">
                                        <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                        <span class="d-none d-sm-block">Monday</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#Tuesday" role="tab">
                                        <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                        <span class="d-none d-sm-block">Tuesday</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#Wednesday" role="tab">
                                        <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                        <span class="d-none d-sm-block">Wednesday</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#Thursday" role="tab">
                                        <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                        <span class="d-none d-sm-block">Thursday</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#Friday" role="tab">
                                        <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                        <span class="d-none d-sm-block">Friday</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#Saturday" role="tab">
                                        <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                        <span class="d-none d-sm-block">Saturday</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#Sunday" role="tab">
                                        <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                        <span class="d-none d-sm-block">Sunday</span>
                                    </a>
                                </li>
                            </ul>



                        </div>


                        <div class="tab-pane active" id="Monday" role="tabpanel">
                            <div class="row">
                                <div class="col-md-12">
                                    <table id="schedule-table-monday" class="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Hari</th>
                                                <th>Jam Mulai</th>
                                                <th>Jam Selesai</th>
                                                <th>Value Channel</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" name="select-monday" id="value-monday"></td>
                                                <td>Monday</td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="start-time-monday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                        <select class="" name="start-time-monday-minute">

                                                                            <!-- Time options from 00 to 23 -->
                                                                            <option value="00">00</option>
                                                                            <option value="15">15</option>
                                                                            <option value="30">30</option>
                                                                            <option value="45">45</option>

                                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="end-time-monday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                        <select class="" name="end-time-monday-minute">

                                                                            <!-- Time options from 00 to 23 -->
                                                                            <option value="00">00</option>
                                                                            <option value="15">15</option>
                                                                            <option value="30">30</option>
                                                                            <option value="45">45</option>

                                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-pane " id="Tuesday" role="tabpanel">
                            <div class="row">
                                <div class="col-md-12">
                                    <table id="schedule-table-tuesday" class="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Hari</th>
                                                <th>Jam Mulai</th>
                                                <th>Jam Selesai</th>
                                                <th>Value Channel</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" name="select-tuesday"></td>
                                                <td>Tuesday</td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="start-time-tuesday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                    <select class="" name="start-time-tuesday-minute">

                                                                        <!-- Time options from 00 to 23 -->
                                                                        <option value="00">00</option>
                                                                        <option value="15">15</option>
                                                                        <option value="30">30</option>
                                                                        <option value="45">45</option>

                                                                    </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="end-time-tuesday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                    <select class="" name="end-time-tuesday-minute">

                                                                        <!-- Time options from 00 to 23 -->
                                                                        <option value="00">00</option>
                                                                        <option value="15">15</option>
                                                                        <option value="30">30</option>
                                                                        <option value="45">45</option>

                                                                    </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <%--    <select class="" name="ONOFF-tuesday">
                                                                            <option value="ON">ON</option>
                                                                            <option value="OFF">OFF</option>
                                                                        </select>--%>
                                                        <input type="text" name="value-tuesday" id="value-tuesday">
                                                    </div>
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <%--<button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" id="save-schedule-tuesday">Add</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>--%>
                            </div>
                        </div>

                        <div class="tab-pane" id="Wednesday" role="tabpanel">
                            <div class="row">
                                <div class="col-md-12">
                                    <table id="schedule-table-wednesday" class="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Hari</th>
                                                <th>Jam Mulai</th>
                                                <th>Jam Selesai</th>
                                               <th>Value Channel</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" name="select-wednesday"></td>
                                                <td>Wednesday</td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="start-time-wednesday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                    <select class="" name="start-time-wednesday-minute">

                                                                        <!-- Time options from 00 to 23 -->
                                                                        <option value="00">00</option>
                                                                        <option value="15">15</option>
                                                                        <option value="30">30</option>
                                                                        <option value="45">45</option>

                                                                    </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="end-time-wednesday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                    <select class="" name="end-time-wednesday-minute">

                                                                        <!-- Time options from 00 to 23 -->
                                                                        <option value="00">00</option>
                                                                        <option value="15">15</option>
                                                                        <option value="30">30</option>
                                                                        <option value="45">45</option>

                                                                    </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <%--<select class="" name="ONOFF-wednesday">
                                                                        <option value="ON">ON</option>
                                                                        <option value="OFF">OFF</option>
                                                                    </select>--%>
                                                        <input type="text" name="value-wednesday" id="value-wednesday">
                                                    </div>
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <%--<button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" id="save-schedule-wednesday">Add</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>--%>
                            </div>
                        </div>

                        <div class="tab-pane" id="Thursday" role="tabpanel">
                            <div class="row">
                                <div class="col-md-12">
                                    <table id="schedule-table-thursday" class="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Hari</th>
                                                <th>Jam Mulai</th>
                                                <th>Jam Selesai</th>
                                                <th>Value Channel</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" name="select-thursday"></td>
                                                <td>Thursday</td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="start-time-thursday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                <select class="" name="start-time-thursday-minute">

                                                                    <!-- Time options from 00 to 23 -->
                                                                    <option value="00">00</option>
                                                                    <option value="15">15</option>
                                                                    <option value="30">30</option>
                                                                    <option value="45">45</option>

                                                                </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="end-time-thursday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                <select class="" name="end-time-thursday-minute">

                                                                    <!-- Time options from 00 to 23 -->
                                                                    <option value="00">00</option>
                                                                    <option value="15">15</option>
                                                                    <option value="30">30</option>
                                                                    <option value="45">45</option>

                                                                </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <%--<select class="" name="ONOFF-thursday">
                                                                    <option value="ON">ON</option>
                                                                    <option value="OFF">OFF</option>
                                                                </select>--%>
                                                        <%--<input type="checkbox" name="ONOFF-thursday" value="ON" checked onchange="this.value=this.checked ? 'ON' : 'OFF';">--%>
                                                        <input type="text" name="value-thursday" id="value-thursday">
                                                    </div>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <%--<button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" id="save-schedule-thursday">Add</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>--%>
                            </div>
                        </div>

                        <div class="tab-pane" id="Friday" role="tabpanel">
                            <div class="row">
                                <div class="col-md-12">
                                    <table id="schedule-table-friday" class="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Hari</th>
                                                <th>Jam Mulai</th>
                                                <th>Jam Selesai</th>
                                                <th>Value Channel</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" name="select-friday"></td>
                                                <td>Friday</td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="start-time-friday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                    <select class="" name="start-time-friday-minute">

                                                                        <!-- Time options from 00 to 23 -->
                                                                        <option value="00">00</option>
                                                                        <option value="15">15</option>
                                                                        <option value="30">30</option>
                                                                        <option value="45">45</option>

                                                                    </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="end-time-friday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                    <select class="" name="end-time-friday-minute">

                                                                        <!-- Time options from 00 to 23 -->
                                                                        <option value="00">00</option>
                                                                        <option value="15">15</option>
                                                                        <option value="30">30</option>
                                                                        <option value="45">45</option>

                                                                    </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <%--<select class="" name="ONOFF-friday">
                                                                        <option value="ON">ON</option>
                                                                        <option value="OFF">OFF</option>
                                                                    </select>--%>
                                                        <%--<input type="checkbox" name="ONOFF-friday" value="ON" checked onchange="this.value=this.checked ? 'ON' : 'OFF';">--%>
                                                        <input type="text" name="value-friday" id="value-friday">
                                                    </div>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <%--<button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" id="save-schedule-friday">Add</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>--%>
                            </div>
                        </div>
                        <div class="tab-pane" id="Saturday" role="tabpanel">
                            <div class="row">
                                <div class="col-md-12">
                                    <table id="schedule-table-saturday" class="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Hari</th>
                                                <th>Jam Mulai</th>
                                                <th>Jam Selesai</th>
                                                <th>Value Channel</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" name="select-saturday"></td>
                                                <td>Saturday</td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="start-time-saturday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                                                                <select class="" name="start-time-saturday-minute">

                                                                                                                    <!-- Time options from 00 to 23 -->
                                                                                                                    <option value="00">00</option>
                                                                                                                    <option value="15">15</option>
                                                                                                                    <option value="30">30</option>
                                                                                                                    <option value="45">45</option>

                                                                                                                </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="end-time-saturday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                                                                <select class="" name="end-time-saturday-minute">

                                                                                                                    <!-- Time options from 00 to 23 -->
                                                                                                                    <option value="00">00</option>
                                                                                                                    <option value="15">15</option>
                                                                                                                    <option value="30">30</option>
                                                                                                                    <option value="45">45</option>

                                                                                                                </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <%--<select class="" name="ONOFF-saturday">
                                                                                                                    <option value="ON">ON</option>
                                                                                                                    <option value="OFF">OFF</option>
                                                                                                                </select>--%>
                                                        <input type="text" name="value-saturday" id="value-saturday">
                                                        <%--<input type="checkbox" name="ONOFF-saturday" value="ON" checked onchange="this.value=this.checked ? 'ON' : 'OFF';">--%>
                                                    </div>
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <%--<button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" id="save-schedule-saturday">Add</button>--%>
                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>--%>
                            </div>
                        </div>

                        <div class="tab-pane" id="Sunday" role="tabpanel">
                            <div class="row">
                                <div class="col-md-12">
                                    <table id="schedule-table-sunday" class="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Hari</th>
                                                <th>Jam Mulai</th>
                                                <th>Jam Selesai</th>
                                                 <th>Value Channel</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="form-check-input" name="select-sunday"></td>
                                                <td>Sunday</td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="start-time-sunday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                                                                <select class="" name="start-time-sunday-minute">

                                                                                                                    <!-- Time options from 00 to 23 -->
                                                                                                                    <option value="00">00</option>
                                                                                                                    <option value="15">15</option>
                                                                                                                    <option value="30">30</option>
                                                                                                                    <option value="45">45</option>

                                                                                                                </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <select class="" name="end-time-sunday-hour">

                                                            <!-- Time options from 00 to 23 -->
                                                            <option value="00">00</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                        </select>
                                                        : 
                                                                                                                <select class="" name="end-time-sunday-minute">

                                                                                                                    <!-- Time options from 00 to 23 -->
                                                                                                                    <option value="00">00</option>
                                                                                                                    <option value="15">15</option>
                                                                                                                    <option value="30">30</option>
                                                                                                                    <option value="45">45</option>

                                                                                                                </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="time-select">
                                                        <input type="text" name="value-sunday" id="value-sunday">
                                                        <%--<input type="checkbox" name="ONOFF-sunday" value="ON" checked onchange="this.value=this.checked ? 'ON' : 'OFF';">--%>
                                                                                                              saturday
                                                                                                                 
                                                                                                                 <%--<select class="" name="ONOFF-sunday">
                                                                                                                    <option value="ON">ON</option>
                                                                                                                    <option value="OFF">OFF</option>
                                                                                                                </select>--%>
                                                    </div>
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                        <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>--%>
                        <button type="button" class="btn btn-primary w-sm" id="save-schedule">Add</button>
                        <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>--%>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addContactModal"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog " style="max-width: 70%;">
            <div class="modal-content">
                <div class="row">

                    <!-- First column for Group Agent (Channel Select) -->
                    <div class="col-12 col-md-4 mb-3">
                        <label for="SelectSesi">Sesi </label>
                        <div class="input-group">
                            <select id="SelectSesi" name="options" class="form-control">
                                <option value="">Select Hari</option>

                                <option value="Senin">Senin</option>
                                <option value="Selasa">Selasa</option>
                                <option value="Rabu">Rabu</option>
                                <option value="Kamis">Kamis</option>
                                <option value="Jumat">Jumat</option>
                                <option value="Sabtu">Sabtu</option>
                                <option value="Minggu">Minggu</option>

                            </select>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 mb-3">
                        <label for="myBulan">Group Agent *</label>
                        <select id="myBulan" name="options" class="form-control">
                            <option value="">Select Bulan</option>
                            <option value="1">Januari</option>
                            <option value="2">Februari</option>
                            <option value="3">Maret</option>
                            <option value="4">April</option>
                            <option value="5">Mei</option>
                            <option value="6">Juni</option>
                            <option value="7">Juli</option>
                            <option value="8">Agustus</option>
                            <option value="9">September</option>
                            <option value="10">Oktober</option>
                            <option value="11">November</option>
                            <option value="12">Desember</option>

                        </select>
                    </div>

                    <%-- <div class="col-12 col-md-4 mb-3">
            <label for="date">Date</label>
            <input type="date" id="Date" class="form-control" style="display:none" />
        </div>--%>

                    <!-- Second column for Group Agent Type (Senior/Junior Select) -->
                    <div class="col-12 col-md-4 mb-3">
                        <label for="mySelect">Group Agent *</label>
                        <select id="mySelect" name="options" class="form-control">
                            <option value="">Select a channel</option>
                            <option value="Voice">Voice</option>
                            <option value="Email">Email</option>
                            <option value="Omnichat">Omnichat</option>
                            <option value="Comments & More">Comments & More</option>
                        </select>
                    </div>
                    <!-- Third column for Quantity -->
                    <div class="col-12 col-md-4 mb-3">
                        <label for="Qty">Value Param</label>
                        <input type="text" id="Qty" class="form-control" />
                    </div>


                    <div class="modal-footer">
                        <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                        <button type="button" class="btn btn-primary w-sm" onclick="ActionSave()" id="Save">Add</button>
                    </div>

                </div>




            </div>
        </div>
    </div>
    <!-- staticBackdrop Modal -->


</asp:Content>
