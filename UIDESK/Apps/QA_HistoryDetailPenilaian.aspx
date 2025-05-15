<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_HistoryDetailPenilaian.aspx.vb" Inherits="UIDESK.QA_HistoryDetailPenilaian" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QA_HistoryDetailPenilaian.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <div class="row">
        <div class="col-12" id="HistoryDataNonCall">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">History Data Penilaian</h4>
            </div>
        </div>
        <div class="col-12" id="HistoryDataCall">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">History Data Penilaian Call</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="card">
                        <div class="card-body" id="DataNonCall" style="overflow-x: auto; overflow-y: auto;">
                            <div class="row">
                                <div class="col-md-12">
                                    <table class="table align-middle table-nowrap table-check" id="TrmHistoryTransactionNonCall">
                                        <thead>
                                            <tr>
                                                <th style="width: 30px;">ID</th>
                                                <th style="width: 150px;">ID Penilaian</th>
                                                <th style="width: 250px;">Nama Nasabah</th>
                                                <th style="width: 150px;">Kategori</th>
                                                <th style="width: 150px;">Agent</th>
                                                <th style="width: 100px;">Type</th>
                                                <th style="width: 100px;">Status</th>
                                                <th style="width: 100px;">Performance</th>
                                                <th style="width: 150px;">Date Create</th>
                                                <th style="width: 30px;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="card-body" id="DataCall" style="overflow-x: auto; overflow-y: auto;">
                            <div class="row">
                                <div class="col-md-12">
                                    <table class="table align-middle table-nowrap table-check" id="TrmHistoryTransactionCall">
                                        <thead>
                                            <tr>
                                                <th style="width: 100px;">SID</th>
                                                <th style="width: 30px;">Site</th>
                                                <th style="width: 150px;">Agent</th>
                                                <th style="width: 250px;">Login ID</th>
                                                <th style="width: 150px;">Nama Customer</th>
                                                <th style="width: 150px;">Nomor Telepon</th>
                                                <th style="width: 100px;">Date Score</th>
                                                <th style="width: 100px;">Score</th>
                                                <th style="width: 150px;">Start Time Telepon</th>
                                                <th style="width: 150px;">End Time Telepon</th>
                                                <th style="width: 100px;">Total Hold Time</th>
                                                <th style="width: 100px;">Duration Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
