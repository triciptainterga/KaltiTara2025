<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Dash_PerformanceAgent.aspx.vb" Inherits="UIDESK.Dash_PerformanceAgent" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>

    <script src="js/sweetalert.min.js"></script>
    <style>
        .card-bodyNew {
            display: flex;
            align-items: center;
        }

            .card-bodyNew img {
                width: 50px; /* Adjust size as needed */
                height: 50px; /* Adjust size as needed */
                object-fit: cover;
                margin-right: 20px;
            }

            .card-bodyNew .card-text {
                flex: 1;
                text-align: center;
            }

            .card-bodyNew .value {
                font-size: 2rem;
                font-weight: bold;
                margin-left: 20px;
            }
    </style>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Dashboard</h4>
                <%-- <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Dashonic</a></li>
                        <li class="breadcrumb-item active">Sales Analytics</li>
                    </ol>
                </div>--%>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-3 col-sm-6">
            <!-- Card -->
            <div class="card" style="background-image: url('assets/images/dashboard/IconQuality.png'); background-size: 50%; background-position: left bottom; background-repeat: no-repeat;">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h6 class="font-size-xs text-uppercase">QUALITY</h6>
                            <h1 class="mt-4 font-weight-bold mb-2 d-flex align-items-center" style="color: #299FE1;" id="valueQuality">-
                            </h1>

                        </div>
                        <div>
                            <div class="dropdown">
                                <a class="dropdown-toggle btn btn-light btn-sm" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false"><span class="text-muted">Monthly<i
                                        class="mdi mdi-chevron-down ms-1"></i></span>
                                </a>

                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Monthly</a>
                                    <a class="dropdown-item" href="#">Yearly</a>
                                    <a class="dropdown-item" href="#">Weekly</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="apex-charts mt-3" id="sparkline-quality"></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <!-- Card -->
            <div class="card" style="background-image: url('assets/images/dashboard/IconProductivity.png'); background-size: 50%; background-position: left bottom; background-repeat: no-repeat;">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h6 class="font-size-xs text-uppercase">PRODUCTIVITY</h6>
                            <h1 class="mt-4 font-weight-bold mb-2 d-flex align-items-center" style="color: #299FE1;" id="valueProductivity">-
                            </h1>

                        </div>
                        <div>
                            <div class="dropdown">
                                <a class="dropdown-toggle btn btn-light btn-sm" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false"><span class="text-muted">Monthly<i
                                        class="mdi mdi-chevron-down ms-1"></i></span>
                                </a>

                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Monthly</a>
                                    <a class="dropdown-item" href="#">Yearly</a>
                                    <a class="dropdown-item" href="#">Weekly</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="apex-charts mt-3" id="sparkline-productivity"></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <!-- Card -->
            <div class="card" style="background-image: url('assets/images/dashboard/IconDiscipline.png'); background-size: 50%; background-position: left bottom; background-repeat: no-repeat;">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h6 class="font-size-xs text-uppercase">DISCIPLINE</h6>
                            <h1 class="mt-4 font-weight-bold mb-2 d-flex align-items-center" style="color: #299FE1;">-
                            </h1>

                        </div>
                        <div>
                            <div class="dropdown">
                                <a class="dropdown-toggle btn btn-light btn-sm" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false"><span class="text-muted">Monthly<i
                                        class="mdi mdi-chevron-down ms-1"></i></span>
                                </a>

                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Monthly</a>
                                    <a class="dropdown-item" href="#">Yearly</a>
                                    <a class="dropdown-item" href="#">Weekly</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="apex-charts mt-3" id="sparkline-discipline"></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <!-- Card -->
            <div class="card" style="background-image: url('assets/images/dashboard/IconPerformance.png'); background-size: 50%; background-position: left bottom; background-repeat: no-repeat;">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h6 class="font-size-xs text-uppercase">PERFORMANCE</h6>
                            <h1 class="mt-4 font-weight-bold mb-2 d-flex align-items-center" style="color: #299FE1;" id="valuePerformance">-
                            </h1>

                        </div>
                        <div>
                            <div class="dropdown">
                                <a class="dropdown-toggle btn btn-light btn-sm" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false"><span class="text-muted">Monthly<i
                                        class="mdi mdi-chevron-down ms-1"></i></span>
                                </a>

                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Monthly</a>
                                    <a class="dropdown-item" href="#">Yearly</a>
                                    <a class="dropdown-item" href="#">Weekly</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="apex-charts mt-3" id="sparkline-performance"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Incoming Channel</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-bodyNew">
                    <img src="assets/images/icon/bcphone.png" alt="Image Description">
                    <div class="card-text">Phone</div>
                    <div class="value" id="valueCall">-</div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-bodyNew">
                    <img src="assets/images/icon/bcemail.png" alt="Image Description">
                    <div class="card-text">Email</div>
                    <div class="value" id="valueEmail">-</div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-bodyNew">
                    <img src="assets/images/icon/bcig.png" alt="Image Description">
                    <div class="card-text">Instagram</div>
                    <div class="value" id="valueInstagram">-</div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-bodyNew">
                    <img src="assets/images/icon/bcfb.png" alt="Image Description">
                    <div class="card-text">Facebook</div>
                    <div class="value" id="valueFacebook">-</div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-bodyNew">
                    <img src="assets/images/icon/bcchat.png" alt="Image Description">
                    <div class="card-text">Live Chat</div>
                    <div class="value" id="valueLiveChat">-</div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-bodyNew">
                    <img src="assets/images/icon/bcchat.png" alt="Image Description">
                    <div class="card-text">WhatsApp</div>
                    <div class="value" id="valueWhatsapp">-</div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-bodyNew">
                    <img src="assets/images/icon/xlogo.png" alt="Image Description">
                    <div class="card-text">X</div>
                    <div class="value" id="valueX">-</div>
                </div>
            </div>
        </div>
    </div>    
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Ticket</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-bodyNew">
                    <img src="assets/images/icon/totalticket.png" alt="Image Description">
                    <div class="card-text">Ticket Open</div>
                    <div class="value" id="ticketOpen">-</div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-bodyNew">
                    <img src="assets/images/icon/process.png" alt="Image Description">
                    <div class="card-text">Ticket Pending</div>
                    <div class="value" id="ticketPending">-</div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-bodyNew">
                    <img src="assets/images/icon/solved.png" alt="Image Description">
                    <div class="card-text">Ticket Solved</div>
                    <div class="value" id="ticketSolved">-</div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card">
                <div class="card-bodyNew">
                    <img src="assets/images/icon/totaltickets.png" alt="Image Description">
                    <div class="card-text">Ticket Closed</div>
                    <div class="value" id="ticketClosed">-</div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-4 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="">
                        <div>
                            <h6 class="font-size-xs text-uppercase">Total Occupancy Rate</h6>
                            <h4 class="mt-4 font-weight-bold mb-2 d-flex align-items-center" id="valueTotalOccupancyRate">-</h4>
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title mb-4">Detail Occupancy Rate</h4>
                                    <div class="row align-items-center">
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Handling<br>Time</p>
                                                    <h5 id="valueHandlingTime">-</h5>
                                                </div>
                                
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Staffed<br>Time</p>
                                                    <h5 id="valueStaffedTime">-</h5>
                                                </div>
                                
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Occupancy Rate</p>
                                                    <h5 id="valueOccupancyRate">-</h5>
                                                </div>
                                            </div>
                                            <p class="text-muted">
                                                <span class="text-success me-1" id="valuePreviousRate">-<i class="mdi mdi-arrow-up"></i></span>From previous period
                                            </p>
                                
                                            <!-- <div class="mt-4">
                                                <a href="#" class="btn btn-soft-secondary btn-sm">Detail Reports <i class="mdi mdi-arrow-right ms-1"></i></a>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="">
                        <div>
                            <h6 class="font-size-xs text-uppercase">% Service per agent</h6>
                            <h4 class="mt-4 font-weight-bold mb-2 d-flex align-items-center" id="valueServicePerAgent">-</h4>
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title mb-4">Detail Service per agent</h4>
                                    <div class="row align-items-center">
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Service per Day</p>
                                                    <h5 id="valueServicePerDay">-</h5>
                                                </div>
                            
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Target<br>per Day</p>
                                                    <h5 id="valueTargetPerDay">-</h5>
                                                </div>
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">% Service per agent</p>
                                                    <h5 id="valueServicePercentage">-</h5>
                                                </div>
                                            </div>
                                            <p class="text-muted">
                                                <span class="text-success me-1" id="valueTargetAchievement">- <i class="mdi mdi-arrow-up"></i></span>Dari target per hari
                                            </p>
                            
                                            <!-- <div class="mt-4">
                                                <a href="#" class="btn btn-soft-secondary btn-sm">Detail Reports <i class="mdi mdi-arrow-right ms-1"></i></a>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="">
                        <div>
                            <h6 class="font-size-xs text-uppercase">% Agent Service Level</h6>
                            <h4 class="mt-4 font-weight-bold mb-2 d-flex align-items-center" id="valueAgentServiceLevel">-</h4>
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title mb-4">Detail Service Level</h4>
                            
                                    <div class="row align-items-center">
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Service<br>in SL</p>
                                                    <h5 id="valueServiceInSL">-</h5>
                                                </div>
                            
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Answered<br>Service</p>
                                                    <h5 id="valueAnsweredService">-</h5>
                                                </div>
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">% Agent Service Level</p>
                                                    <h5 id="valueAgentServiceLevel">-</h5>
                                                </div>
                                            </div>
                                            <p class="text-muted">
                                                <span class="text-success me-1" id="valuePreviousServiceLevel">- <i class="mdi mdi-arrow-up"></i></span>From previous period
                                            </p>
                            
                                            <!-- <div class="mt-4">
                                                <a href="#" class="btn btn-soft-secondary btn-sm">Detail Reports <i class="mdi mdi-arrow-right ms-1"></i></a>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%--    <div class="row">
        <div class="col-xl-3">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                                <div class="avatar-title rounded-circle font-size-12">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <p class="text-muted mb-1">
                                <h4 class="font-weight-bold d-flex align-items-center">Quality</h4>
                            </p>
                            <h5 class="font-size-16 mb-0">-</h5>
                        </div>
                        <div class="flex-shrink-0 align-self-end">
                            <div class="badge badge-soft-success ms-2">-<i class="uil uil-arrow-up-right text-success ms-1"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                                <div class="avatar-title rounded-circle font-size-12">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <p class="text-muted mb-1">
                                <h4 class="font-weight-bold d-flex align-items-center">Productivity</h4>
                            </p>
                            <h5 class="font-size-16 mb-0">-</h5>
                        </div>
                        <div class="flex-shrink-0 align-self-end">
                            <div class="badge badge-soft-success ms-2">-<i class="uil uil-arrow-up-right text-success ms-1"></i></div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <div class="col-xl-3">
            <div class="card">
                <div class="card-header">


                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                                <div class="avatar-title rounded-circle font-size-12">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <p class="text-muted mb-1">
                                <h4 class="font-weight-bold d-flex align-items-center">Discipline</h4>
                            </p>
                            <h5 class="font-size-16 mb-0">-</h5>
                        </div>
                        <div class="flex-shrink-0 align-self-end">
                            <div class="badge badge-soft-success ms-2">- <i class="uil uil-arrow-up-right text-success ms-1"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3">
            <div class="card">
                <div class="card-header">


                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                                <div class="avatar-title rounded-circle font-size-12">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <p class="text-muted mb-1">
                                <h4 class="font-weight-bold d-flex align-items-center">Performance</h4>
                            </p>
                            <h5 class="font-size-16 mb-0">-</h5>
                        </div>
                        <div class="flex-shrink-0 align-self-end">
                            <div class="badge badge-soft-success ms-2">- <i class="uil uil-arrow-up-right text-success ms-1"></i></div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-4 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="">
                        <div>
                            <h6 class="font-size-xs text-uppercase">Total Occupancy Rate</h6>
                            <h4 class="mt-4 font-weight-bold mb-2 d-flex align-items-center" id="valueTotalOccupancyRate">-</h4>
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title mb-4">Detail Occupancy Rate</h4>
                                    <div class="row align-items-center">
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Handling<br>Time</p>
                                                    <h5 id="valueHandlingTime">-</h5>
                                                </div>
                            
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Staffed<br>Time</p>
                                                    <h5 id="valueStaffedTime">-</h5>
                                                </div>
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Occupancy Rate</p>
                                                    <h5 id="valueOccupancyRate">-</h5>
                                                </div>
                                            </div>
                                            <p class="text-muted">
                                                <span class="text-success me-1" id="valuePreviousRate">-<i class="mdi mdi-arrow-up"></i></span>From previous period
                                            </p>
                            
                                            <!-- <div class="mt-4">
                                                <a href="#" class="btn btn-soft-secondary btn-sm">Detail Reports <i class="mdi mdi-arrow-right ms-1"></i></a>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="">
                        <div>
                            <h6 class="font-size-xs text-uppercase">% Service per agent</h6>
                            <h4 class="mt-4 font-weight-bold mb-2 d-flex align-items-center" id="valueServicePerAgent">-</h4>
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title mb-4">Detail Service per agent</h4>
                                    <div class="row align-items-center">
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Service per Day</p>
                                                    <h5 id="valueServicePerDay">-</h5>
                                                </div>
                            
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Target<br>per Day</p>
                                                    <h5 id="valueTargetPerDay">-</h5>
                                                </div>
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">% Service per agent</p>
                                                    <h5 id="valueServicePercentage">-</h5>
                                                </div>
                                            </div>
                                            <p class="text-muted">
                                                <span class="text-success me-1" id="valueTargetAchievement">- <i class="mdi mdi-arrow-up"></i></span>Dari target per hari
                                            </p>
                            
                                            <!-- <div class="mt-4">
                                                <a href="#" class="btn btn-soft-secondary btn-sm">Detail Reports <i class="mdi mdi-arrow-right ms-1"></i></a>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="">
                        <div>
                            <h6 class="font-size-xs text-uppercase">% Agent Service Level</h6>
                            <h4 class="mt-4 font-weight-bold mb-2 d-flex align-items-center">-
                            </h4>
                            <div class="card">
                                <div class="card-body">


                                    <h4 class="card-title mb-4">Detail Service Level</h4>

                                    <div class="row align-items-center">
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Service<br>
                                                        in SL</p>
                                                    <h5>-</h5>
                                                </div>

                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">Answered
                                                        <br>
                                                        Service</p>
                                                    <h5>-</h5>
                                                </div>
                                                <div class="col-lg-4">
                                                    <p class="text-muted mb-2">% Agent Service Level</p>
                                                    <h5>-</h5>
                                                </div>
                                            </div>
                                            <p class="text-muted">
                                                <span class="text-success me-1">-<i
                                                    class="mdi mdi-arrow-up"></i></span>From previous period
                                            </p>

                                            <!-- <div class="mt-4">
                                                <a href="#" class="btn btn-soft-secondary btn-sm">Detail Reports <i
                                                    class="mdi mdi-arrow-right ms-1"></i></a>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>

    <!-- apexcharts -->
    <script src="assets/libs/apexcharts/apexcharts.min.js"></script>
    <script src="assets/js/pages/Dash_PerformanceAgent.js"></script>
    <script src="js/Dash_PerformanceAgent.js"></script>
</asp:Content>
