<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trx_TicketJourney.aspx.vb" Inherits="UIDESK.Crm_Trx_TicketJourney" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trx_TicketJourney.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxNumberID" runat="server" />
    <asp:HiddenField ID="TrxThreadID" runat="server" />
    <asp:HiddenField ID="TrxChannel" runat="server" />
    <asp:HiddenField ID="TrxTicketNumber" runat="server" />
    <asp:HiddenField ID="TrxStatus" runat="server" />
    <asp:HiddenField ID="HD_API_Gender" runat="server" />
    <asp:HiddenField ID="HD_API_NomorPolis" runat="server" />
    <asp:HiddenField ID="hd_Layer" runat="server" />
    <asp:HiddenField ID="hd_EskalasiDepartment" runat="server" />
    <%--  <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Project Overview</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Projects</a></li>
                        <li class="breadcrumb-item active">Project Overview</li>
                    </ol>
                </div>

            </div>
        </div>
    </div>--%>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body pb-0">
                    <div class="mt-3">
                        <%--<div class="col">
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    <div class="avatar">
                                        <div class="avatar-title bg-soft-primary text-primary font-size-18 rounded">
                                            S                                                           
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <div class="text-muted">
                                        <h5 class="font-size-20 mb-1">Samsu Rizal</h5>
                                        <p class="mb-0">085782431208 - rizalsamsurizal708@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>--%>
                        <div class="card border shadow-none">
                            <div class="card-body">
                                <div class="d-flex">
                                    <%-- <div class="flex-shrink-0">
                                        <div class="avatar">
                                            <div class="avatar-title bg-soft-primary text-primary font-size-18 rounded">
                                                S                                                           
                                            </div>
                                        </div>
                                    </div>--%>
                                    <div class="flex-grow-1 me-2 flex-wrap">
                                        <h5 class="font-size-15 mb-1"><a href="projects-overview.html" class="text-dark">
                                            <p class="text-muted mb-0" id="Profile_Nama"></p>
                                        </a></h5>
                                        <p class="text-muted mb-0" id="Profile_Alamat"></p>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div class="d-flex gap-2">
                                            <%-- <div>
                                                <a href="#" class="btn btn-light btn-sm"><i class="uil uil-pen"></i></a>
                                            </div>--%>
                                            <div class="dropdown">
                                                <a class="btn btn-light btn-sm dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal icon-xs">
                                                        <circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                                </a>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item" href="#" onclick="CustomerOtherChannel()">Channel</a></li>
                                                    <li><a class="dropdown-item" href="#" onclick="CustomerHistoryTicket()">History Ticket</a></li>
                                                    <%--<li>
                                                        <hr class="dropdown-divider">
                                                    </li>
                                                    <li><a class="dropdown-item" href="#">Separated link</a></li>--%>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <div class="row g-0">
                                    <div class="col-xl-3 col-sm-6">
                                        <div class="border p-3 h-100">
                                            <div>
                                                <p class="text-muted font-size-13 mb-2">Nomor Telepon</p>
                                                <h5 class="font-size-14 mb-0" id="Profile_Telepon"></h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-sm-6">
                                        <div class="border p-3 h-100">
                                            <div>
                                                <p class="text-muted font-size-13 mb-2">Email</p>
                                                <h5 class="font-size-14 mb-0" id="Profile_EmailNya"></h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-sm-6">
                                        <div class="border p-3 h-100">
                                            <div>
                                                <p class="text-muted font-size-13 mb-2">Tanggal Lahir</p>
                                                <h5 class="font-size-14 mb-0" id="Profile_TglLahir"></h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-sm-6">
                                        <div class="border p-3 h-100">
                                            <div>
                                                <p class="text-muted font-size-13 mb-2">Status</p>
                                                <div class="badge bg-warning font-size-12">Active</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs nav-tabs-custom" role="tablist">
                            <%-- <li class="nav-item">
                                <a class="nav-link active" data-bs-toggle="tab" href="#overview" role="tab">Overview</a>
                            </li>--%>
                            <li class="nav-item">
                                <a class="nav-link active font-size-16 mb-1" data-bs-toggle="tab" href="#tasks" role="tab">Ticket Properties</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link font-size-16 mb-1" data-bs-toggle="tab" href="#team" role="tab">Ticket Escalation</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link font-size-16 mb-1" data-bs-toggle="tab" href="#interaction" role="tab">Ticket Interaction</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-pane active" id="tasks" role="tabpanel">
                    <div class="card">
                        <div class="card-body">
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
                                                <input type="text" class="form-control" placeholder="Enter Name" id="NamePelapor">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="contact-info-email-input" class="form-label">Email</label>
                                                <input type="text" class="form-control" placeholder="Enter Email" id="EmailPelapor">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="contact-info-phone-input" class="form-label">Phone</label>
                                                <input type="email" class="form-control" placeholder="Enter Phone" id="PhonePelapor">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="contact-info-account-input" class="form-label">Account</label>
                                                <input type="text" class="form-control" placeholder="Enter Account" id="AccountPelapor">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="mb-3">
                                                <textarea id="AlamatPelapor" name="AlamatPelapor" class="form-control" rows="4"></textarea>
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
                                                <input type="text" class="form-control" id="DateofTransaction">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-agentname-input">Agent Name</label>
                                                <input type="text" class="form-control" id="agentname">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-producttype-input">Product Type</label>
                                                <input type="text" class="form-control" placeholder="Enter Phone" id="ProductType">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-productname-input">Product Name</label>
                                                <input type="text" class="form-control" placeholder="Enter Phone" id="ProductName">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-customerstatus-input">Customer Status</label>
                                                <input type="text" class="form-control" placeholder="Enter Phone" id="CustomerStatus">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-customercategori-input">Customer Category</label>
                                                <input type="text" class="form-control" id="CustomerCategory">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-polisnumber-input">Account</label>
                                                <input type="text" class="form-control" id="PolisNumber">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-ticketchannel-input">Ticket Channel</label>
                                                <input type="text" class="form-control" id="TicketChannel">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-category-input">Category</label>
                                                <input type="text" class="form-control" id="Category">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-enquirytype-input">Enquiry Type</label>
                                                <input type="text" class="form-control" id="EnquiryType">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-enquirydetail-input">Enquiry Detail</label>
                                                <input type="text" class="form-control" id="EnquiryDetail">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-problem-input">Problem</label>
                                                <input type="text" class="form-control" id="Problem">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-priorityscale-input">Priority Scale</label>
                                                <input type="text" class="form-control" id="PriorityScale">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-ticketstatus-input">Ticket Status</label>
                                                <input type="text" class="form-control" id="TicketStatus">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-escalationunit-input">Escalation Unit</label>
                                                <input type="text" class="form-control" id="EscalationUnit">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="mb-3">
                                                <label for="workexperience-escalationticket-input">SLA</label>
                                                <input type="text" class="form-control" id="SLA">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <label>Complaint Description</label>
                                            <textarea id="TextProblem" name="TextProblem" class="form-control" style="height: 250px;"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="team" role="tabpanel">
                    <div>
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="workexperience-priorityscale-input">Ticket Status</label>
                                            <select id="EskalasiTicketStatus" class="form-select" onchange="get_EscalationStatus(1)">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="workexperience-priorityscale-input">Ticket Department</label>
                                            <select id="EskalasiTicketDepartment" class="form-select" onchange="ComboEskalasiDepartment()">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="workexperience-ticketstatus-input">Ticket Eskalasi</label>
                                            <select id="EskalasiTicket" class="form-select">
                                                <option value="0">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <label>Problem</label>
                                        <textarea id="EskalasiResponse" name="EskalasiResponse" class="form-control" style="height: 250px;"></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <label></label>
                                        <input type="file" name="files" class="form-control">
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <div id="EskalasiAttachment" style="width: 100%;"></div>
                                </div>
                                <div class="mt-3">
                                    <div class="text-end">
                                        <a href="#" onclick="EskalasiSubmit()" class="btn btn-primary w-sm" id="EskalasiSubmit">Submit</a>
                                        <%--<button type="submit" class="btn btn-primary w-sm" onclick="EskalasiSubmit()">Submit</button>--%>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="interaction" role="tabpanel">
                    <div>
                        <div class="card">
                            <div class="card-body">
                                <div id="TicketInteraction" class="verti-timeline left-timeline"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ContactPreviewChannel" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content" style="width: 800px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelContactPreviewChannel">Form Customer Channel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="card-body">
                        <div id="Div_CustomerChannel" class="row"></div>
                    </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modalHistory"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content" style="width: 1100px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabelHistory">Form History Ticket</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <table class="table align-middle table-nowrap table-check" id="TrmHistory">
                        <thead>
                            <tr>
                                <th style="width: 150px; min-width: 150px;">Ticket Number</th>
                                <th style="width: 150px; min-width: 150px;">Category</th>
                                <th style="width: 150px; min-width: 150px;">Position</th>
                                <th style="width: 50px; min-width: 100px;">Status</th>
                                <th style="width: 150px; min-width: 100px;">SLA</th>
                                <th style="width: 150px; min-width: 150px;">Date Create</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <%--<script>
        CKEDITOR.replace('AlamatPelapor');
        CKEDITOR.replace('EskalasiResponse');
        CKEDITOR.replace('TextProblem');
        CKEDITOR.config.height = 200;
        CKEDITOR.config.toolbar = 'Full';
        CKEDITOR.config.toolbar_Full =
            [
                //{ name: 'snddocument', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates'] },
                //{ name: 'clipboard', items: ['Undo', 'Redo'] },
                ////{ name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },
                //{
                //    name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
                //        'HiddenField']
                //},
                //'/',
                //{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                //{
                //    name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv',
                //        '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
                //},
                //{ name: 'links', items: ['Link', 'Unlink'] },
                //{ name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'PageBreak', 'Iframe'] },
                //'/',
                { name: 'styles', items: ['Styles', 'Format', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] },
                { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
            ];
    </script>--%>
</asp:Content>
