<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="SCH_PrediksiData.aspx.vb" Inherits="UIDESK.SCH_PrediksiData" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/SCH_PrediksiData.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <style>
        .custom-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            table-layout: auto;
        }

            .custom-table,
            .custom-table th,
            .custom-table td {
                border: 1px solid black;
            }

                .custom-table th,
                .custom-table td {
                    padding: 4px; /* Mengurangi padding untuk membuat kolom lebih kompak */
                    text-align: center;
                    white-space: nowrap; /* Mencegah teks terpotong ke baris berikutnya */
                }

        .bg-primary {
            background-color: green;
            color: white;
        }

        .bg-dark {
            background-color: black;
            color: white;
        }

        /* Styling the loader */
        .loader-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .loader {
            border: 8px solid #f3f3f3; /* Light grey */
            border-top: 8px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
        }

        /* Animation for loader spin */
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
    <div class="row">
        <div class="col-7">
            <div class="card">
                <div class="card-body">
                    <h5>Historycal Dates For Forcast</h5>
                    <div class="row" id="divCountingDataCall">
                        <div class="col-xl-3 col-sm-6" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Open&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-primary text-bg-primary rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">Call</p>
                                                <h5 class="font-size-16 mb-0">100</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-3 col-sm-6" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Pending&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-warning text-bg-warning rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">SLA</p>
                                                <h5 class="font-size-16 mb-0">96%</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-3 col-sm-6" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Solved&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-success text-bg-success rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">Abandon</p>
                                                <h5 class="font-size-16 mb-0">5</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-3 col-sm-6" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Closed&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-danger text-bg-danger rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">Agent Handle</p>
                                                <h5 class="font-size-16 mb-0">18</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            <div class="card">
                <div class="card-body">

                    <div class="row" id="divCountingDataCall">
                        <div class="col-xl-3 col-sm-6" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Open&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-primary text-bg-primary rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">Email</p>
                                                <h5 class="font-size-16 mb-0">100</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-3 col-sm-6" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Pending&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-warning text-bg-warning rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">SLA</p>
                                                <h5 class="font-size-16 mb-0">96%</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-3 col-sm-6" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Solved&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-success text-bg-success rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">Abandon</p>
                                                <h5 class="font-size-16 mb-0">5</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-3 col-sm-6" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Closed&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-danger text-bg-danger rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">Agent Handle</p>
                                                <h5 class="font-size-16 mb-0">18</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-5">
            <div class="card">
                <div class="card-body">
                    <h5>Data Parameter</h5>
                    <div class="row">
                        <div class="col-xl-6 col-sm-12" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Open&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-primary text-bg-primary rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">Call</p>
                                                <h5 class="font-size-16 mb-0">100</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-6 col-sm-12" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Open&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-primary text-bg-primary rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">Email</p>
                                                <h5 class="font-size-16 mb-0">100</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-6 col-sm-12" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Open&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-primary text-bg-primary rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">Omnichat</p>
                                                <h5 class="font-size-16 mb-0">100</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-6 col-sm-12" style="cursor: pointer;">
                            <a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=Open&amp;mid=null&amp;smid=null">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-left">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title bg-soft-bg-primary text-bg-primary rounded-circle font-size-18">
                                                        <i class="uil uil-list-ul"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <p class="mb-1 text-truncate text-muted">Comments</p>
                                                <h5 class="font-size-16 mb-0">100</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="card">
            <div class="card-body">
                <h6>Historycal Dates For The Forcast</h6>
                <div class="row">
                    <div class="col-md-2" style="margin-top: 5px;">
                        Start Date
                       <input class="form-control" type="date" id="start-date-input">
                    </div>
                    <div class="col-md-2" style="margin-top: 5px;">
                        End Date
                       <input class="form-control" type="date" id="end-date-input">
                    </div>

                </div>
                <div class="row">
                    <div class="col-md-2" style="margin-top: 5px;">
                        Start Time
                       <input class="form-control" type="time" name="start-time-input" id="start-time-input" value="08:00">
                    </div>
                    <div class="col-md-2" style="margin-top: 5px;">
                        End Time
                       <input class="form-control" type="time" name="end-time-input" id="end-time-input" value="17:00">
                    </div>
                    <div class="col-md-2" style="margin-top: 5px;">
                        Interval
                        <select class="form-control" name="IntervalTime" id="IntervalTime">


                            <option value="30">30 Minutes</option>

                        </select>
                    </div>
                    <div class="col-md-2" style="margin-top: 5px;">
                        <br />
                        <button type="button" class="btn btn-primary w-sm" onclick="SubmitDataNya()" id="SubmitData">Submit</button>
                      
                      
                       
                    </div>
                    <div class="col-md-1" style="margin-top: 5px;">
                           <br />
                      <input class="form-control" type="text" id="valueData" style="width: 100px">
                        
                        
                    </div>
                    <div class="col-md-2" style="margin-top: 5px;">
                           <br />
                       
                         <button type="button" class="btn btn-primary w-sm" onclick="GenerateData()" id="GenData">GenerateData</button>
                    </div>
                    
                </div>
                <br />
                <br />
                <div id="loader" class="loader-container" style="display: none;">
                    <div class="loader"></div>
                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div id="tables-container" class="custom-table"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
