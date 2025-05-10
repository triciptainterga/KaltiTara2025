<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_Ticket.aspx.vb" Inherits="UIDESK.Crm_Trx_Ticket" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_Ticket.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="CustomerID" runat="server" />
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxNumberID" runat="server" />
    <asp:HiddenField ID="TrxThreadID" runat="server" />
    <asp:HiddenField ID="TrxChannel" runat="server" />
    <asp:HiddenField ID="TrxTicketNumber" runat="server" />
    <asp:HiddenField ID="TrxStatus" runat="server" />
    <asp:HiddenField ID="HD_API_Gender" runat="server" />
    <asp:HiddenField ID="HD_API_NomorPolis" runat="server" />
    <asp:HiddenField ID="hd_Layer" runat="server" />
    <%--    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Form Ticket</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Apps</a></li>
                        <li class="breadcrumb-item active">Ticket</li>
                    </ol>
                </div>

            </div>
        </div>
    </div>--%>
    <%--<a href="#" onclick="Test()">Testing</a>--%>

    XXX
    <div class="row">
        <div class="col-xxl-3 col-lg-4">
            <div class="card">
                <div class="card-body">
                    <%-- <div class="profile-bg position-relative overflow-hidden rounded-top" style="height: 150px;">
                        <div class="bg-overlay bg-dark bg-gradient"></div>
                         <div class="position-relative p-3 text-end">
                            <button type="button" class="btn btn-primary btn-sm"><i class="mdi mdi-pencil me-1"></i>Edit</button>
                        </div>
                    </div>--%>
                    <a class="btn btn-primary w-sm" onclick="goBack()">Back</a>
                    <br />
                    <br />
                    <div class="d-flex border-top p-0">
                        <div class="search-box" style="width: 100%">
                            <input type="text" class="form-control bg-light border-light rounded" id="TxtSearchingCustomer" placeholder="Search Customer">
                            <i class="uil uil-search search-icon"></i>
                        </div>
                    </div>
                    <br />
                    <div class="card" id="divHeaderSearching" style="display: none;text-align:center;">
                        <div class="card-body">
                            <div class="card-header d-flex align-items-center" style="border: hidden;">
                                <div class="flex-shrink-0 me-1">
                                    <div class="avatar-sm">
                                        <div class="avatar-title rounded-circle bg-soft-primary text-primary">
                                            <h1 id="InisialName" class="card-title" onclick="ShowCustomerEdit()" style="cursor: pointer;"></h1>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                </div>
                            </div>
                            <h5 class="card-title" id="Ticket_CustomerName"></h5>
                        </div>
                    </div>
                    <div id="divSearchingCustomer" style="display: none;" class="chat-message-list" data-simplebar>
                        <div class="p-4">
                            <div>
                                <div class="d-flex">
                                    <div class="ms-auto">
                                        <div class="avatar-group-item" id="ActionNewCustomer">
                                            <a href="#" class="d-block" data-bs-toggle="tooltip" data-placement="top" onclick="ActionNewCustomer()">
                                                <div class="avatar-sm">
                                                    <div class="avatar-title rounded-circle bg-primary text-light pull-right">
                                                        <i class="mdi mdi-plus fs-5"></i>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex">
                                </div>
                                <div id="Div_CustomerSearching"></div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div class="card">
                        <div class="card-body">
                            <ul class="list-unstyled mb-0">
                                <li class="pb-3">
                                    <div class="d-flex align-items-center">
                                        <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                            <i class="uil uil-globe"></i>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-1 font-size-13">Mobile Phone</p>
                                            <h5 class="mb-0 font-size-14">081584841592</h5>
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3">
                                    <div class="d-flex align-items-center">
                                        <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                            <i class="uil uil-envelope-alt"></i>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-1 font-size-13">E-mail</p>
                                            <h5 class="mb-0 font-size-14">muhammadadam849@gmail.com</h5>
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3">
                                    <div class="d-flex align-items-center">
                                        <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                            <i class="uil uil-map-marker"></i>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-1 font-size-13">Address</p>
                                            <h5 class="mb-0 font-size-14">Waringin Jaya Lebak, Bojong Gede Bogor</h5>
                                        </div>
                                    </div>
                                </li>
                                <%-- <li class="pt-3">
                                    <div class="d-flex align-items-center">
                                        <div class="font-size-20 text-primary flex-shrink-0 me-3">
                                            <i class="uil uil-user"></i>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-1 font-size-13">Experience</p>
                                            <h5 class="mb-0 font-size-14">4 Years</h5>
                                        </div>
                                    </div>
                                </li>--%>
                            </ul>
                        </div>
                    </div>
                    <br />
                    <div class="col-xl-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="d-flex align-items-start">
                                    <div class="flex-grow-1">
                                        <h5 class="card-title">History Ticket</h5>
                                    </div>

                                    <div class="flex-shrink-0">
                                        <div class="dropdown">
                                            <a class="font-size-16 text-muted dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="mdi mdi-dots-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="#">Action</a>
                                                <%-- <a class="dropdown-item" href="#">Another action</a>--%>
                                                <a class="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pb-4">
                                <div class="chat-message-list widget-chat-list" data-simplebar>
                                    <div class="px-4">
                                        <ul class="list-unstyled chat-list">
                                            <li class="active">
                                                <a href="#" class="mt-0">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                            <div class="avatar-sm align-self-center">
                                                                <span class="avatar-title rounded-circle bg-success text-success"></span>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="text-truncate font-size-14 mb-1">20211216022013759</h5>
                                                            <p class="text-truncate mb-0">Open</p>
                                                        </div>
                                                        <div class="flex-shrink-0">
                                                            <div class="font-size-11">Follow Up</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="active">
                                                <a href="#" class="mt-0">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                            <div class="avatar-sm align-self-center">
                                                                <span class="avatar-title rounded-circle bg-warning text-warning"></span>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="text-truncate font-size-14 mb-1">20211216022310034</h5>
                                                            <p class="text-truncate mb-0">Pending</p>
                                                        </div>
                                                        <div class="flex-shrink-0">
                                                            <div class="font-size-11">Follow Up</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="active">
                                                <a href="#" class="mt-0">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                            <div class="avatar-sm align-self-center">
                                                                <span class="avatar-title rounded-circle bg-danger text-danger"></span>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="text-truncate font-size-14 mb-1">20211216022620814</h5>
                                                            <p class="text-truncate mb-0">Closed</p>
                                                        </div>
                                                        <div class="flex-shrink-0">
                                                            <div class="font-size-11">Follow Up</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="active">
                                                <a href="#" class="mt-0">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                            <div class="avatar-sm align-self-center">
                                                                <span class="avatar-title rounded-circle bg-success text-success"></span>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="text-truncate font-size-14 mb-1">20211216024342145</h5>
                                                            <p class="text-truncate mb-0">Open</p>
                                                        </div>
                                                        <div class="flex-shrink-0">
                                                            <div class="font-size-11">Follow Up</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="active">
                                                <a href="#" class="mt-0">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                            <div class="avatar-sm align-self-center">
                                                                <span class="avatar-title rounded-circle bg-success text-success"></span>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="text-truncate font-size-14 mb-1">20211216024400125</h5>
                                                            <p class="text-truncate mb-0">Open</p>
                                                        </div>
                                                        <div class="flex-shrink-0">
                                                            <div class="font-size-11">Follow Up</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="active">
                                                <a href="#" class="mt-0">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                            <div class="avatar-sm align-self-center">
                                                                <span class="avatar-title rounded-circle bg-success text-success"></span>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="text-truncate font-size-14 mb-1">20211216024926947</h5>
                                                            <p class="text-truncate mb-0">Open</p>
                                                        </div>
                                                        <div class="flex-shrink-0">
                                                            <div class="font-size-11">Follow Up</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="active">
                                                <a href="#" class="mt-0">
                                                    <div class="d-flex align-items-start">
                                                        <div class="flex-shrink-0 user-img online align-self-center me-3">
                                                            <div class="avatar-sm align-self-center">
                                                                <span class="avatar-title rounded-circle bg-success text-success"></span>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 overflow-hidden">
                                                            <h5 class="text-truncate font-size-14 mb-1">20211216031811993</h5>
                                                            <p class="text-truncate mb-0">Open</p>
                                                        </div>
                                                        <div class="flex-shrink-0">
                                                            <div class="font-size-11">Follow Up</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xxl-9 col-lg-8">
            <div class="card">
                <div class="card-body">
                    <%--<div class="card">
                        <div class="card-body pb-0">
                            <div class="mt-3">
                                <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-bs-toggle="tab" href="#incoming" role="tab"><i class="fas fa-user-tag"></i>&nbsp;Incoming Information</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-bs-toggle="tab" href="#history" role="tab"><i class="fas fa-history"></i>&nbsp;History Ticketing</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-bs-toggle="tab" href="#channel" role="tab"><i class="fas fa-user-tag"></i>&nbsp;Customer Other Channel</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-bs-toggle="tab" href="#greeting" role="tab"><i class="fas fa-laptop-code"></i>&nbsp;Channel Greeting Script</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-bs-toggle="tab" href="#faq" role="tab"><i class="fas fa-book-open"></i>&nbsp;FAQ Information</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content">
                        <div class="tab-pane active" id="incoming" role="tabpanel">
                            <div>
                            </div>
                        </div>
                        <div class="tab-pane" id="history" role="tabpanel">
                            <div>
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-3">
                                            </div>
                                            <div class="col-md-9">
                                                <div class="d-flex flex-wrap align-items-start justify-content-md-end gap-2 mb-3">
                                                    <div class="search-box ">
                                                        <div class="position-relative">
                                                            <input type="text" class="form-control bg-light border-light rounded" id="TxtSearchingTicket" placeholder="Search Ticket">
                                                            <i class="uil uil-search search-icon"></i>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div id="Div_HistoryTicket" class="row"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="channel" role="tabpanel">
                            <div>
                                <div class="card">
                                    <div class="card-body">
                                        <div id="Div_CustomerChannel" class="row"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="greeting" role="tabpanel">
                            <div>
                                <div class="card">
                                    <div class="card-body">
                                        <div id="Div_ScriptGreeting" class="row"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="faq" role="tabpanel">
                            <div>
                                <div class="card">
                                    <div class="card-body">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>--%>

                    <%--<h5 class="card-title mb-4">Setting</h5>--%>
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <label for="contact-info-name" class="form-label">Incoming Account</label>
                                        <input type="text" class="form-control" placeholder="Incoming Account" id="Incoming_Information">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card border shadow-none">
                        <div class="card-header d-flex align-items-center">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm">
                                    <div class="avatar-title rounded-circle bg-soft-primary text-primary">
                                        01                                                           
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="card-title">Contact Reported</h5>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="contact-info-name" class="form-label">Name</label>
                                        <input type="text" class="form-control" placeholder="Enter Name" id="Reported_Name">
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="contact-info-email-input" class="form-label">Email</label>
                                        <input type="text" class="form-control" placeholder="Enter Email" id="Reported_Email">
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="contact-info-phone-input" class="form-label">Mobile Phone</label>
                                        <input type="email" class="form-control" placeholder="Enter Phone" id="Reported_Phone">
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="contact-info-account-input" class="form-label">Account</label>
                                        <input type="text" class="form-control" placeholder="Enter Account" id="Reported_Account">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <textarea id="Reported_Address" name="Reported_Address" class="form-control" rows="6"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card border shadow-none">
                        <div class="card-header d-flex align-items-center">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm">
                                    <div class="avatar-title rounded-circle bg-soft-primary text-primary">
                                        02                                                           
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="card-title">Ticket Properties</h5>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Date of Transaction</label>
                                        <input type="date" class="form-control" id="Ticket_DateofTransaction" placeholder="Date of Transaction" required>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-agentname-input">Agent Name</label>
                                        <input type="text" class="form-control" id="Ticket_AgentName">
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-producttype-input">Product Type</label>
                                        <select id="Ticket_ProductType" class="form-select" onchange="getWS_ProductName(1)" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-productname-input">Product Name</label>
                                        <select id="Ticket_ProductName" class="form-select" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-customerstatus-input">Customer Status</label>
                                        <select id="Ticket_UserStatus" class="form-select" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-customercategori-input">Customer Category</label>
                                        <select id="Ticket_UserCategory" class="form-select" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <%-- <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-polisnumber-input">Polis Number</label>
                                        <input type="text" class="form-control" id="Ticket_BankAccount" required>
                                    </div>
                                </div>--%>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-ticketchannel-input">Ticket Channel</label>
                                        <select id="Ticket_SourceChannel" class="form-select" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-priorityscale-input">Priority Scale</label>
                                        <select id="Ticket_Priority" class="form-select" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-ticketstatus-input">Ticket Status</label>
                                        <select id="Ticket_Status" class="form-select" onchange="getWS_EscalationStatus();" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-category-input">Category</label>
                                        <select id="Ticket_Category" class="form-select" onchange="getWS_CategoryType(1);" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-enquirytype-input">Enquiry Type</label>
                                        <select id="Ticket_Enquiry" class="form-select" onchange="getWS_CategoryTypeDetail(1);" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-enquirydetail-input">Enquiry Detail</label>
                                        <select id="Ticket_EnquiryDetail" class="form-select" onchange="getWS_CategoryTypeReason(1);" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <label for="workexperience-problem-input">Problem</label>
                                        <select id="Ticket_EnquiryReason" class="form-select" onchange="getWS_SLAReason(1);" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-escalationunit-input">Escalation Unit</label>
                                        <select id="Ticket_Escalation" class="form-select" required>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-escalationticket-input">Escalation Layer</label>
                                        <input type="text" class="form-control" id="Ticket_EscalationLevelUser" required>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-escalationticket-input">Escalation Ticket</label>
                                        <select id="Ticket_EscalationLayer" class="form-select" required>
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="workexperience-escalationticket-input">SLA</label>
                                        <input type="text" class="form-control" id="Ticket_SLA" required>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <%--<label>Problem</label>--%>
                                    <textarea id="Ticket_Complaints" name="Ticket_Complaints" class="form-control" rows="8"></textarea>
                                </div>
                                <div class="col-lg-6">
                                    <%--<label>Response</label>--%>
                                    <textarea id="Ticket_NoteAgent" name="Ticket_NoteAgent" class="form-control" rows="8"></textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <label></label>
                                    <input type="file" name="files" class="form-control">
                                </div>
                            </div>
                            <div class="mt-3">
                                <div id="TicketAttachment" style="width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="text-end">
                        <%--<a class="btn btn-primary w-sm" onclick="ActionCreateTicket()">Submit</a>--%>
                        <button type="button" class="btn btn-soft-primary w-sm" onclick="ActionCreateTicket"><i class="fa fa-save"></i>&nbsp;Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ContactChannel" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Form Channel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <label for="addcontact-name-input" class="form-label">Account</label>
                            <input type="text" class="form-control" id="ValueChannel" placeholder="Account">
                        </div>
                        <div class="mb-3">
                            <label for="addcontact-designation-input" class="form-label">Channel</label>
                            <select class="form-select" id="AddComboChannel">
                                <option>Select</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdateChannel()" id="UpdateChannel">Update</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanChannel()" id="SimpanChannel">Submit</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionDeleteChannel()" id="DeleteChannel">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modalcustomer"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalCustomer">Form Customer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="AddCustomer_Name" placeholder="Name">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Gender</label>
                                    <select id="AddCustomer_ComboGender" class="form-select">
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Birth</label>
                                    <input type="date" class="form-control" id="AddCustomer_Birth" placeholder="Birth">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">NIK</label>
                                    <input type="text" class="form-control" id="AddCustomer_NIK" placeholder="NIK">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Mobile Phone</label>
                                    <input type="text" class="form-control" id="AddCustomer_HP" placeholder="Mobile Phone">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Email</label>
                                    <input type="text" class="form-control" id="AddCustomer_Email" placeholder="Email">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Facebook</label>
                                    <input type="text" class="form-control" id="AddCustomer_Facebook" placeholder="Facebook">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Instagram</label>
                                    <input type="text" class="form-control" id="AddCustomer_Instagram" placeholder="Instagram">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Twitter</label>
                                    <input type="text" class="form-control" id="AddCustomer_Twitter" placeholder="Twitter">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Address</label>
                                    <textarea class="form-control" placeholder="Address" id="AddCustomer_Alamat" name="AddCustomer_Alamat" style="height: 300px;"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdateCustomer()" id="UpdateCustomer">Update</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanCustomer()" id="SimpanCustomer">Add</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-list-transaction-ticket"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="transaction-ticket">Data Transaction Ticket</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <table id="ListTransactionTicket" class="table align-middle table-nowrap table-check" style="width: 100%;" data-page-size="5">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;">Action</th>
                                            <th style="width: 150px;">Date</th>
                                            <th style="width: 150px;">Ticket Number</th>
                                            <th style="width: 150px;">Kategori</th>
                                            <th style="width: 150px;">Created By</th>
                                            <th style="width: 70px;">Status</th>
                                            <th style="width: 70px;">SLA</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <%--<button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>--%>
                    <%--<h4>Do you want to add ticket?</h4>--%>
                    <div class="flex-grow-1">
                        <button type="button" id="Ticket_AddTransaction" class="btn btn-rounded btn-danger btn-outline full-left" onclick="PublishTransaction()">
                            <i class="fa fa-times-circle"></i>&nbsp;Selesai
                        </button>
                    </div>
                    <button type="button" id="Ticket_PublishTransaction" class="btn btn-rounded btn-success btn-outline float-right" onclick="AddTransaction()">
                        <i class="fa fa-check-circle"></i>&nbsp;Add Ticket
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- en card -->
    <script src="js/ckeditor/ckeditor.js"></script>
    <%-- <script>
        CKEDITOR.replace('Ticket_Complaints');
        CKEDITOR.replace('Ticket_NoteAgent');
        CKEDITOR.config.height = 150;
        CKEDITOR.config.toolbar = 'Full';
        CKEDITOR.config.toolbar_Full =
            [
                {
                    name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
                        'HiddenField']
                },
                '/',
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                {
                    name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv',
                        '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
                },
                { name: 'links', items: ['Link', 'Unlink'] },
                { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'PageBreak', 'Iframe'] },
                '/',
                { name: 'styles', items: ['Styles', 'Format', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] },
                { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
            ];

        CKEDITOR.replace('Reported_Address');
        CKEDITOR.config.height = 150;
        CKEDITOR.config.toolbar = 'Full';
        CKEDITOR.config.toolbar_Full =
            [
                { name: 'colors', items: ['TextColor', 'BGColor'] },
                { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                {
                    name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv',
                        '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
                },
            ];
    </script>--%>
</asp:Content>
