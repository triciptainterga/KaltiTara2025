<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="SCH_MonitorSchedule.aspx.vb" Inherits="UIDESK.SCH_MonitorSchedule" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- fullcalendar css -->
    <link href="assets/libs/fullcalendar/main.min.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <!-- Icons Css -->
    <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <!-- Icons Css -->
    <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
     <link  href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet" type="text/css">
     <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>
    <style>
        .custom-icon1 {
            color: blue; /* Set the icon color to blue */
        }

        .custom-icon2 {
            color: red; /* Set the icon color to blue */
        }

        .hide-column {
            display: none;
        }
    </style>

    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                    <h4 class="mb-0">SPV Monitoring</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Apps</a></li>
                            <li class="breadcrumb-item active">Calendar</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>

        <div class="row" id="divListData">
            <div class="col-12">
                <div class="row">
                    <!-- end col-->
                    <div class="card card-h-100">
                        <div class="card-body">
                            <h2>List Data</h2>
                            <table id="tableLististdata" class="table table-responsive">
                                <thead>
                                    <tr>

                                        <th>Agent Request</th>
                                        <th>Agent Target </th>
                                        <th>DateScheduled</th>

                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>


        </div>


        <div id="divdetail" style="display: none">
            <div class="row">
                <div class="col-6">
                    <div class="row">
                        <!-- end col-->
                        <div class="card card-h-100">
                            <div class="card-body">
                                <%--<div class="col-12">
                                    <h2>Jadwal Awal</h2>
                                      <i class="fa fa-arrow-right fa-1x" aria-hidden="true"></i>
                                </div>--%>
                                <div class="row">
                                    <div class="col-11">
                                        <h2>Jadwal Awal</h2>
                                    </div>
                                    <div class="col-1 text-end">
                                        <i class="fa fa-arrow-right fa-3x custom-icon1" aria-hidden="true"></i>
                                    </div>
                                </div>

                                <table id="tableAgentRequest" class="table table-responsive">
                                    <thead>
                                        <tr>

                                            <th class="hide-column">ID</th>
                                            <th class="hide-column">Agent ID</th>
                                            <th>AgentName</th>
                                            <th>dayName</th>
                                            <th>DateScheduled</th>
                                            <th>StartTime</th>
                                            <th>EndTime</th>
                                            <th>StatusTime</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>

                                <div class="row">
                                    <div class="col-11">
                                        <h2>Mendapatkan Jadwal</h2>
                                    </div>
                                    <div class="col-1 text-end">
                                        <i class="fa fa-arrow-left fa-3x custom-icon2" aria-hidden="true"></i>
                                    </div>
                                </div>


                                <table id="tableTargetChange" class="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th class="hide-column">ID</th>
                                            <th class="hide-column">Agent ID</th>
                                            <th>AgentName</th>
                                            <th>dayName</th>
                                            <th>DateScheduled</th>
                                            <th>StartTime</th>
                                            <th>EndTime</th>

                                            <th>StatusTime</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>


                            </div>
                        </div>
                    </div>
                </div>




                <div class="col-6">
                    <div class="row">
                        <!-- end col-->
                        <div class="card card-h-100">
                            <div class="card-body">


                                <div class="col-11">
                                    <h2>Permintaan Tukar</h2>
                                </div>

                                <table id="tableAgentTarget" class="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th class="hide-column">ID</th>
                                            <th class="hide-column">Agent ID</th>
                                            <th>AgentName</th>
                                            <th>dayName</th>
                                            <th>DateScheduled</th>
                                            <th>StartTime</th>
                                            <th>EndTime</th>

                                            <th>StatusTime</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>

                                <h2>Menyesuaikan Jadwal</h2>

                                <table id="tableTargetRequest" class="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th class="hide-column">ID</th>
                                            <th class="hide-column">Agent ID</th>
                                            <th>AgentName</th>
                                            <th>dayName</th>
                                            <th>DateScheduled</th>
                                            <th>StartTime</th>
                                            <th>EndTime</th>

                                            <th>StatusTime</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-12">



                        <div class="d-flex justify-content-end" style="gap: 10px;">
                            <button type="button" class="btn btn-success" onclick="ActionApprove()">Approve</button>
                            <button type="button" class="btn btn-danger" onclick="ActionReject()">Reject</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
        <script src="js/SCH_MonitorSchedule.js"></script>
</asp:Content>
