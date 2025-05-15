<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="SCH_CreateShifts.aspx.vb" Inherits="UIDESK.SCH_CreateShifts" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/SCH_CreateShifts.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <style>

        /* Style untuk input group */
.input-group {
    position: relative;
    width: 100%;
}

/* Style untuk input text */
.form-control.dropdown-toggle {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
}

/* Style untuk dropdown menu */
.dropdown-menu {
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    max-height: 300px; /* Maksimal tinggi dropdown */
    overflow-y: auto; /* Scroll jika terlalu banyak item */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000; /* Pastikan di atas elemen lainnya */
}

/* Style untuk item dropdown */
.dropdown-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    color: #333;
    text-decoration: none;
}

/* Hover effect untuk item dropdown */
.dropdown-item:hover {
    background-color: #f1f1f1;
}

/* Style untuk checkbox */
.form-check-input {
    margin-right: 8px; /* Jarak antara checkbox dan label */
}

/* Style untuk input search */
#searchDropdown {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    width: calc(100% - 16px); /* Menghindari overflow */
    margin-bottom: 10px; /* Jarak antara input search dan item dropdown */
}
        
        .time-select {
            display: inline-block;
            margin-right: 5px; /* Optional: add some space between the select boxes */
        }
        select {
            border-radius: 12px; /* Creates an oval shape */
            padding: 5px;       /* Increases the size of the dropdown */
            font-size: 16px;     /* Makes the text larger */
            border: 1px solid #ccc;
            width: 70px;         /* Set a fixed width */
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
    </style>
    <asp:HiddenField ID="hd_StatusAction" ClientIDMode="Static" runat="server" />
     <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                           <h5 class="card-title">Agent Schedule</h5>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <i class="mdi mdi-information-outline"></i>Agent Schedule <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Tambah()"><i class="far fa-calendar-plus"></i> Add Shift</a>
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
                                    <th style="width: 400px;">Last Modified Time</th>
                                    <th style="width: 150px;">Last Modified By</th>
                                    <th style="width: 150px;"></th>
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
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Create/Edit Shift</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
              

                                        <!-- Nav tabs -->
                                        <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-bs-toggle="tab" href="#shift1" role="tab">
                                                    <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                                    <span class="d-none d-sm-block">Create Agent Schedule</span> 
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
                                                   Operational Hours*
                                                </p>
                                                <p>
                                                    Business Hours (Choose work days/hours) <i class="mdi mdi-information-outline"></i>
                                                </p>
                                                
                                                    <div class="input-group">
                                                                <input type="text" class="form-control dropdown-toggle" id="selectedItems" placeholder="List Agents..." readonly data-bs-toggle="dropdown" aria-expanded="false">
                                                                <ul class="dropdown-menu w-100" id="DataListAgents">
                                                                    
                                                                    <%--<li>
                                                                        <label class="dropdown-item">
                                                                            <input type="checkbox" class="form-check-input me-2" value="60001"> Agent 1 <br />agent1@bravo.go.id
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <label class="dropdown-item">
                                                                            <input type="checkbox" class="form-check-input me-2" value="60002"> Agent 2 <br />agent2@bravo.go.id
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <label class="dropdown-item">
                                                                            <input type="checkbox" class="form-check-input me-2" value="60003"> Agent 3 <br />agent3@bravo.go.id
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <label class="dropdown-item">
                                                                            <input type="checkbox" class="form-check-input me-2" value="60004"> Agent 4 <br />agent4@bravo.go.id
                                                                        </label>
                                                                    </li>--%>
                                                                </ul>
                                                                <%--<a class="btn btn-primary" id="processButton" onclick="processAddAgents()"><i data-feather="user-plus"></i> Process</a>--%>
                                                            </div>
                                                <br />
                                               
                                                <p>
                                                    Agent ID *
                                                    <br />
                                                    <input type="text" id="AgentID" class="form-control" />
                                                </p>

                                                <%--<p>
                                                    Name *
                                                    <br />
                                                    <input type="text" id="TxtName" class="form-control" />
                                                </p>
                                                <p>
                                                    Description
                                                    <br />
                                                    <input type="text" id="TxtDescription" class="form-control" />
                                                </p>--%>
                                               
                                               
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
                                                                <th>ON/OFF</th>
                                                               
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td><input type="checkbox" class="form-check-input" name="select-monday"></td>
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
                                                                        </select> : 
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
                                                                        </select> : 
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
                                                                        <%--<select class="" name="ONOFF-monday">
                                                                            <option value="ON">ON</option>
                                                                            <option value="OFF">OFF</option>
                                                                        </select>--%>
                                                                         <%--<input type="checkbox" name="ONOFF-monday" checked value="OFF" onchange="this.value=this.checked ? 'OFF' : 'ON';">--%>
                                                                     </div>
                                                                </td>
                                                            </tr>
                                                            
                                                        </tbody>
                                                    </table>
                                                        </div>
                                                    </div>
                                                 <%--<div class="modal-footer">
                                                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                                    <button type="button" class="btn btn-primary w-sm" id="save-schedule-monday">Add</button>
                                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                                                </div>--%>
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
                                                            <th>ON/OFF</th>
                                                           
                                                        </tr>
                                                    </thead>
                                                    <tbody>
            
                                                        <tr>
                                                            <td><input type="checkbox" class="form-check-input" name="select-tuesday"></td>
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
                                                                    </select> : 
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
                                                                    </select> : 
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
                                                                         <input type="checkbox" name="ONOFF-tuesday" value="ON" checked onchange="this.value=this.checked ? 'ON' : 'OFF';"> 
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
                                                            <th>ON/OFF</th>
                                                           
                                                        </tr>
                                                    </thead>
                                                    <tbody>
            
                                                        <tr>
                                                            <td><input type="checkbox" class="form-check-input" name="select-wednesday"></td>
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
                                                                    </select> : 
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
                                                                    </select> : 
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
                                                                     <input type="checkbox" name="ONOFF-wednesday" value="ON" checked onchange="this.value=this.checked ? 'ON' : 'OFF';"> 
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
                                                                                                    <th>ON/OFF</th>
                                                                                                   
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                    <tr>
                                                        <td><input type="checkbox" class="form-check-input" name="select-thursday"></td>
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
                                                                </select> : 
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
                                                                </select> : 
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
                                                                 <input type="checkbox" name="ONOFF-thursday" value="ON" checked onchange="this.value=this.checked ? 'ON' : 'OFF';"> 
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
                                                                                                        <th>ON/OFF</th>
                                                                                                       
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                        <tr>
                                                            <td><input type="checkbox" class="form-check-input" name="select-friday"></td>
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
                                                                    </select> : 
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
                                                                    </select> : 
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
                                                                     <input type="checkbox" name="ONOFF-friday" value="ON" checked onchange="this.value=this.checked ? 'ON' : 'OFF';">
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
                                                                                                        <th>ON/OFF</th>
                                                                                                       
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td><input type="checkbox" class="form-check-input" name="select-saturday"></td>
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
                                                                                                                </select> : 
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
                                                                                                                </select> : 
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
                                                                                                                 <input type="checkbox" name="ONOFF-saturday" value="ON" checked onchange="this.value=this.checked ? 'ON' : 'OFF';">
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
                                                                                                        <th>ON/OFF</th>
                                                                                                       
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td><input type="checkbox" class="form-check-input" name="select-sunday"></td>
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
                                                                                                                </select> : 
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
                                                                                                                </select> : 
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
                                                                                                                 <input type="checkbox" name="ONOFF-sunday" value="ON" checked onchange="this.value=this.checked ? 'ON' : 'OFF';">
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
                                                <%--<button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>--%>
                                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>--%>
                                                <%--<button type="button" class="btn btn-primary w-sm" id="save-schedule-sunday">Add</button>--%>
                                                <%--<button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>--%>
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
    <!-- staticBackdrop Modal -->

    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addAgentShift"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <p>I will not close if you click outside me. Don't even try to press
                        escape key.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light"
                        data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
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
     <%--<!-- gridjs css -->
     <link rel="stylesheet" href="assets/libs/gridjs/theme/mermaid.min.css">


    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header justify-content-between d-flex align-items-center">
                    <h4 class="card-title">Fixed Header</h4>
                    <a href="https://gridjs.io/docs/examples/fixed-header" target="_blank" class="btn btn-sm btn-soft-secondary">Docs <i class="mdi mdi-arrow-right align-middle"></i></a>
                </div><!-- end card header -->
                <div class="card-body">
                    <div id="table-fixed-header" class="table"></div>
                </div>
                <!-- end card body -->
            </div>
            <!-- end card -->
        </div>
        <!-- end col -->
    </div>

    <!-- gridjs js -->
    <script src="assets/libs/gridjs/gridjs.umd.js"></script>

    <script src="assets/js/pages/gridjs.init.js"></script>

    <script src="assets/js/app.js"></script>--%>
</asp:Content>
