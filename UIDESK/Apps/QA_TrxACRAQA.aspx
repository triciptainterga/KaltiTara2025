<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_TrxACRAQA.aspx.vb" Inherits="UIDESK.QA_TrxACRAQA" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QA_TrxACRAQA.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6" id="HeaderAcraRecording">
                        <div class="mb-3">
                            <div class="btn-group me-2 mb-2 mb-sm-0">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Action <i class="mdi mdi-dots-vertical ms-2"></i>
                                </button>
                                <div class="dropdown-menu" style="">
                                    <a class="dropdown-item" href="#"><span class="mdi mdi-circle-outline text-success me-2"></span>Add More</a>
                                    <a class="dropdown-item" href="#"><span class="mdi mdi-circle-outline text-warning me-2"></span>Request Share</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <%-- <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Tambah()">+ Add New</a>
                            </div>
                        </div>
                    </div>--%>
                </div>
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap table-check" id="TrmTransaction">
                        <thead>
                            <tr>
                                <th>Acra ID</th>
                                <th>Group Agent</th>
                                <th>Extension</th>
                                <th>Date Interaction</th>
                                <%--<th>DateTimeEnd</th>--%>
                                <th>AgentID</th>
                                <th>LoginID</th>
                                <th>Duration</th>
                                <th>Status</th>
                                <th style="width: 50px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Audio Recording</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="mb-3">
                            <iframe id="FrameAudio" title="description" style="width: 100%; height: 400px;"></iframe>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionButtonShare()" id="ButtonShare">Share</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionButtonReject()" id="ButtonReject">Reject</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
