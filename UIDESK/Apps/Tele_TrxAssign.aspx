<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Tele_TrxAssign.aspx.vb" Inherits="UIDESK.Tele_TrxAssign" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Tele_TrxAssign.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <%--<div class="card-header">
               
            </div>--%>

            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <%--<h5 class="card-title">Data Channel</h5>--%>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div class="mb-3">
                                <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="FilterAssign()">+ Assign Filter</a>
                            </div>
                        </div>
                    </div>
                </div>
                <table id="TrmTeleHeader" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                    <thead>
                        <tr>
                            <th style="width: 50px;">ID</th>
                            <th style="width: 150px;">Nama</th>
                            <th style="width: 150px;">Nomor Telepon</th>
                            <%--<th style="width: 200px;">Produk Campaign</th>--%>
                            <th style="width: 700px;">Address</th>
                            <%--<th style="width: 150px;">Date</th>
                            <th style="width: 50px;">Called</th>--%>
                            <th style="width: 50px;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <%-- <div class="card-footer">
                <div class="text-end">
                    <button type="button" class="btn btn-primary " data-bs-target="#exampleModalScrollable" onclick="ButtonAssignAll()">Assign</button>
                </div>
            </div>--%>
        </div>
    </div>
    <div class="modal fade" id="modal-assign" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabel">Form Assign Filter</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <%--                        <div class="col-md-4" id="DivAssignCategory">
                            <label>Assign Category</label>
                            <select id="AssignCategory" class="form-select">
                                <option value="">Select</option>
                                <option value="Date">Date</option>
                                <option value="Nomor Telepon">Nomor Telepon</option>
                            </select>
                        </div>--%>
                        <div class="col-md-6" id="DivAssignValue">
                            <label>Assign Value</label>
                            <input type="text" class="form-control" id="AssignValue" placeholder="Nomor Telepon">
                        </div>
                        <div class="col-md-6" id="DivAssignAgentFrom">
                            <label>Agent Name</label>
                            <select id="AssignAgentFrom" class="form-select">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <div class="col-md-6" id="DivAssignDate">
                            <label>Assign Date</label>
                            <input type="date" class="form-control" id="AssignDate">
                        </div>
                        <%-- <div class="col-md-4" id="DivAssignType">
                            <label>Assign Type</label>
                            <select id="AssignType" class="form-select" onchange="ChangeAssignType('1')">
                                <option value="">Select</option>
                                <option value="Bucket">Bucket</option>
                                <option value="Agent">Agent</option>
                            </select>
                        </div>--%>
                    </div>
                    <br />
                    <%-- <br />
                    <div class="row">
                       
                        <div class="col-md-4" id="DivAssignAgentTo">
                            <label>Assign Agent To</label>
                            <select id="AssignAgentTo" class="form-select">
                                <option value="">Select</option>
                            </select>
                        </div>
                    </div>
                    <br />--%>
                    <%--<div class="row">
                        <div class="col-md-12">
                            <textarea class="form-control" placeholder="Assign Description" id="Assign Description" name="Assign Description" style="height: 250px"></textarea>
                        </div>
                    </div>--%>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSubmit()" id="Simpan">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-action-assign" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabelassign">Form Assign</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
<%--                        <div class="col-md-6">
                            <label>Assign Type</label>
                            <select id="AssignType" class="form-select" onchange="ChangeAssignType('1')">
                                <option value="">Select</option>
                                <option value="Bucket">Bucket</option>
                                <option value="Agent">Agent</option>
                            </select>
                        </div>--%>
                        <div class="col-md-12" id="DivAssignAgentTo">
                            <label>Agent To</label>
                            <select id="AssignAgentTo" class="form-select">
                                <option value="">Select</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSubmitAssign()" id="SubmitAssign">Submit</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
