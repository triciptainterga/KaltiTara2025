<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Tele_TrxTransaksi.aspx.vb" Inherits="UIDESK.Tele_TrxTransaksi" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Tele_TrxTransaksi.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxUploadID" runat="server" />
    <asp:HiddenField ID="TrxPolisNumber" runat="server" />
    <asp:HiddenField ID="TrxTelepon" runat="server" />
    <asp:HiddenField ID="TrxTransaksiID" runat="server" />
    <asp:HiddenField ID="TrxScript" runat="server" />
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
                                    <div class="flex-shrink-0" id="DiallingCall">
                                        <div class="d-flex gap-2">
                                            <button type="button" class="btn btn-outline-light"><i class="uil uil-user"></i><i class="fas fa-phone font-size-24 text-success"></i></button>
                                        </div>
                                    </div>
                                    <div class="flex-shrink-0" id="DropCall">
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
                                <a class="nav-link active font-size-16 mb-1" data-bs-toggle="tab" href="#tasks" role="tab">Interaction Note</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link font-size-16 mb-1" data-bs-toggle="tab" href="#interaction" role="tab">History Interaction</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link font-size-16 mb-1" data-bs-toggle="tab" href="#history" role="tab">History Telephony</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link font-size-16 mb-1" data-bs-toggle="tab" href="#greeting" role="tab">Script Greeting</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-pane active" id="tasks" role="tabpanel">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <label>Note Interaction</label>
                                    <textarea id="TextProblem" name="TextProblem" class="form-control" style="height: 250px;"></textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <label>Reason Call</label>
                                    <select id="InteractionReason" class="form-select">
                                        <option value="">Select</option>
                                        <option value="Answer">Answer</option>
                                        <option value="Reject">Reject</option>
                                        <option value="No Answer">No Answer</option>
                                        <option value="Busy">Busy</option>
                                        <option value="Wrong Number">Wrong Number</option>
                                        <option value="Unregistered">Unregistered</option>
                                    </select>
                                </div>
                                <div class="col-lg-4">
                                    <label for="workexperience-priorityscale-input">Status Call</label>
                                    <select id="InteractionStatus" class="form-select">
                                        <option value="">Select</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Not Confirmed">Not Confirmed</option>
                                    </select>
                                </div>
                                 <div class="col-lg-4">
                                    <label for="workexperience-priorityscale-input">Status Transaksi</label>
                                    <select id="InteractionTransaksi" class="form-select">
                                        <option value="">Select</option>
                                        <option value="Done">Done</option>
                                        <option value="Not Done">Not Done</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="text-end">
                                <a href="#" onclick="SubmitBackCall()" class="btn btn-light w-sm" id="SubmitBack">Cancel</a>
                                <a href="#" onclick="SubmitInteractionCall()" class="btn btn-primary w-sm" id="SubmitInteraction">Submit</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="interaction" role="tabpanel">
                    <div>
                        <div class="card">
                            <div class="card-body">
                                <div id="InteractionNote" class="verti-timeline left-timeline"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="history" role="tabpanel">
                    <div>
                        <div class="card">
                            <div class="card-body">
                                <div id="HistoryTelephony" class="row"></div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="greeting" role="tabpanel">
                </div>
            </div>
        </div>
    </div>
</asp:Content>
