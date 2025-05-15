<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="SCH_CreateGroup.aspx.vb" Inherits="UIDESK.SCH_CreateGroup" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/SCH_CreateGroup.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <style>
        
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
    <asp:HiddenField ID="ValIDShift" ClientIDMode="Static" runat="server" />
     <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                           <h5 class="card-title">Group Schedule</h5>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <i class="mdi mdi-information-outline"></i>Group Schedule <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Tambah()"><i class="far fa-calendar-plus"></i> Add Group</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap table-check" id="DataSCH_Shift">
                         <thead>
                                <tr>
                                    <th style="width: 50px;">ID</th>
                                    <th style="width: 150px;">Name Group</th>
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
                    <h5 class="modal-title" id="addContactModalLabel">Create/Edit Group Agent</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
              

                                        <!-- Nav tabs -->
                                        <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-bs-toggle="tab" href="#shift1" role="tab">
                                                    <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                                    <span class="d-none d-sm-block">Assign Agent</span> 
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
                                                        Setup Group (Choose Agent -> Assign to Group) <i class="mdi mdi-information-outline"></i>
                                                    </p>
                                                
                                                    <%--<div class="input-group">
                                                                <input type="text" class="form-control dropdown-toggle" id="selectedItems" placeholder="List Agents..." readonly data-bs-toggle="dropdown" aria-expanded="false">
                                                                <ul class="dropdown-menu w-100" id="DataListAgents">
                                                                    
                                                                 
                                                                </ul>
                                                                <a class="btn btn-primary" id="processButton" onclick="processAddAgents()"><i data-feather="user-plus"></i> Process</a>
                                                            </div>--%>
                                                <br />
                                               
                                               <%-- <p>
                                                    Agent ID *
                                                    <br />
                                                    <input type="text" id="AgentID" class="form-control" />
                                                </p>--%>

                                               <%-- <p>
                                                    Name *
                                                    <br />
                                                    <input type="text" id="TxtName" class="form-control" />
                                                </p>
                                                <p>
                                                    Description
                                                    <br />
                                                    <input type="text" id="TxtDescription" class="form-control" />
                                                </p>
                                               --%>                          
                                            </div>


                                            

                                            <!--<div class="tab-pane" id="agents1" role="tabpanel">
                                               <div class="row">
                                                    <div class="col-md-8">       
                                                       
                                                            
                                                        
                                                    </div>
                                                    
                                                </div>
                                                   <table class="table table-striped mb-0" id="listAgentShifts">
	                                                    <thead>
		                                                    <tr>
			                                                    <th>Agent</th>
			                                                    <th>Email</th>
			                                                    <th>Action</th>
			
		                                                    </tr>
	                                                    </thead>
	                                                    <tbody>
                                                            
	                                                    </tbody>
                                                    </table>
                                               
                                            </div>-->
                                            <p>
                                                Keperluan Parameter data untuk 4 Minggu
                                            </p>
                                            <div class="row" id="DivChannelGroupAssign">
                                                
                                            </div>
                                             <div class="tab-pane active" id="Monday" role="tabpanel">
                                                   <div class="row">
                                                        <div class="col-md-12">    
                                                             <table id="group-table-agent" class="table table-striped mb-0">
                                                                <thead>
                                                                    <tr>
                                                                        
                                                                        <th>No</th>
                                                                        <th>Agent Name</th>
                                                                        <th>Site</th>
                                                                       
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                            
                                                            
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                 <div class="modal-footer" style="display:none;">
                                                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                                    <button type="button" class="btn btn-primary w-sm" id="save-schedule-monday">Add</button>
                                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                                                </div>
                                               </div>
                                             <div class="tab-pane " id="Tuesday" role="tabpanel">
                                                <div class="row">
                                                    <div class="col-md-12">    
                                                            <table id="schedule-table-tuesday" class="table table-striped mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Pilih</th>
                                                            <th>Hari</th>
                                                            <th>Jam Mulai</th>
                                                            <th>Jam Selesai</th>
                                                            <th>ON/OFF</th>
                                                            <th>Action</th>
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
                                                                         <input type="checkbox" name="ONOFF-tuesday" value="ON" onchange="this.value=this.checked ? 'ON' : 'OFF';"> Tuesday
                                                                    </div>
                                                            </td>
                                                            <td><a class="add-row-btn-tuesday">Add Row</a></td>
                                                        </tr>
            
                                                    </tbody>
                                                </table>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                                <button type="button" class="btn btn-primary w-sm" id="save-schedule-tuesday">Add</button>
                                                <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                                            </div>
                                            </div>

                                            <div class="tab-pane" id="Wednesday" role="tabpanel">
                                                <div class="row">
                                                    <div class="col-md-12">    
                                                            <table id="schedule-table-wednesday" class="table table-striped mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Pilih</th>
                                                            <th>Hari</th>
                                                            <th>Jam Mulai</th>
                                                            <th>Jam Selesai</th>
                                                            <th>ON/OFF</th>
                                                            <th>Action</th>
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
                                                                     <input type="checkbox" name="ONOFF-wednesday" value="ON" onchange="this.value=this.checked ? 'ON' : 'OFF';"> Wednesday
                                                                 </div>
                                                            </td>
                                                            <td><a class="add-row-btn-wednesday">Add Row</a></td>
                                                        </tr>
            
                                                    </tbody>
                                                </table>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                                <button type="button" class="btn btn-primary w-sm" id="save-schedule-wednesday">Add</button>
                                                <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                                                </div>
                                            </div>
                                        
                                            <div class="tab-pane" id="Thursday" role="tabpanel">
                                            <div class="row">
                                                <div class="col-md-12">    
                                                    <table id="schedule-table-thursday" class="table table-striped mb-0">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th>Pilih</th>
                                                                                                    <th>Hari</th>
                                                                                                    <th>Jam Mulai</th>
                                                                                                    <th>Jam Selesai</th>
                                                                                                    <th>ON/OFF</th>
                                                                                                    <th>Action</th>
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
                                                                 <input type="checkbox" name="ONOFF-thursday" value="ON" onchange="this.value=this.checked ? 'ON' : 'OFF';"> Thursday
                                                             </div>
                                                        </td>
                                                        <td><a class="add-row-btn-thursday">Add Row</a></td>
                                                    </tr>
                                                    </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                            <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                            <button type="button" class="btn btn-primary w-sm" id="save-schedule-thursday">Add</button>
                                            <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                                            </div>
                                        </div>

                                            <div class="tab-pane" id="Friday" role="tabpanel">
                                                <div class="row">
                                                    <div class="col-md-12">    
                                                    <table id="schedule-table-friday" class="table table-striped mb-0">
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th>Pilih</th>
                                                                                                        <th>Hari</th>
                                                                                                        <th>Jam Mulai</th>
                                                                                                        <th>Jam Selesai</th>
                                                                                                        <th>ON/OFF</th>
                                                                                                        <th>Action</th>
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
                                                                     <input type="checkbox" name="ONOFF-friday" value="ON" onchange="this.value=this.checked ? 'ON' : 'OFF';"> Friday
                                                                 </div>
                                                            </td>
                                                            <td><a class="add-row-btn-friday">Add Row</a></td>
                                                        </tr>
                                                        </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                                <button type="button" class="btn btn-primary w-sm" id="save-schedule-friday">Add</button>
                                                <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="Saturday" role="tabpanel">
                                                <div class="row">
                                                    <div class="col-md-12">    
                                                        <table id="schedule-table-saturday" class="table table-striped mb-0">
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th>Pilih</th>
                                                                                                        <th>Hari</th>
                                                                                                        <th>Jam Mulai</th>
                                                                                                        <th>Jam Selesai</th>
                                                                                                        <th>ON/OFF</th>
                                                                                                        <th>Action</th>
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
                                                                                                                 <input type="checkbox" name="ONOFF-saturday" value="ON" onchange="this.value=this.checked ? 'ON' : 'OFF';"> Saturday
                                                                                                             </div>
                                                                                                        </td>
                                                                                                        <td><a class="add-row-btn-saturday">Add Row</a></td>
                                                                                                    </tr>
            
                                                        </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                                <button type="button" class="btn btn-primary w-sm" id="save-schedule-saturday">Add</button>
                                                <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                                                </div>
                                            </div>

                                            <div class="tab-pane" id="Sunday" role="tabpanel">
                                                <div class="row">
                                                    <div class="col-md-12">    
                                                    <table id="schedule-table-sunday" class="table table-striped mb-0">
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th>Pilih</th>
                                                                                                        <th>Hari</th>
                                                                                                        <th>Jam Mulai</th>
                                                                                                        <th>Jam Selesai</th>
                                                                                                        <th>ON/OFF</th>
                                                                                                        <th>Action</th>
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
                                                                                                                 <input type="checkbox" name="ONOFF-sunday" value="ON" onchange="this.value=this.checked ? 'ON' : 'OFF';"> Sunday
                                                                                                                <%--<select class="" name="ONOFF-sunday">
                                                                                                                    <option value="ON">ON</option>
                                                                                                                    <option value="OFF">OFF</option>
                                                                                                                </select>--%>
                                                                                                             </div>
                                                                                                        </td>
                                                                                                        <td><a class="add-row-btn-sunday">Add Row</a></td>
                                                                                                    </tr>
            
                                                        </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                                <button type="button" class="btn btn-primary w-sm" id="save-schedule-sunday">Add</button>
                                                <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                                                </div>
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
</asp:Content>
