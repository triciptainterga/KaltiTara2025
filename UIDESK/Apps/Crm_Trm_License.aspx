<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_License.aspx.vb" Inherits="UIDESK.Crm_Trm_License" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_License.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <h5>System License</h5>
                <div class="row">
                    
                    <div class="col-xl-12">
                        <div class="row" id="tampungShowLicense">

                            <%--<div class="col-md-3">
                                <center>
                                    <div class="card mt-4 maintenance-box shadow-none">
                                        <div class="card-body">
                                            <div class="mb-4">
                                                <img src="assets/images/lic/call.png" width="64" />
                                            </div>
                                                
                                            <h5 class="font-size-15 text-uppercase" id="callAgents">0 Agents</h5>
                                            <p class="text-muted mb-0">Fitur petugas layanan kanal voice.</p>
                                        </div>
                                    </div>
                                </center>
                            </div>
                            <div class="col-md-3">
                                <center>
                                    <div class="card mt-4 maintenance-box shadow-none">
                                        <div class="card-body">
                                            <div class="mb-4">
                                                <img src="assets/images/lic/email.png" width="64" />
                                            </div>
                                                
                                            <h5 class="font-size-15 text-uppercase" id="emailAgents">0 Agents</h5>
                                            <p class="text-muted mb-0">Fitur petugas layanan kanal email.</p>
                                        </div>
                                    </div>
                                </center>
                            </div>
                            <div class="col-md-3">
                                <center>
                                    <div class="card mt-4 maintenance-box shadow-none">
                                        <div class="card-body">
                                            <div class="mb-4">
                                                <img src="assets/images/lic/wa.png" width="64" />
                                            </div>
                                                
                                            <h5 class="font-size-15 text-uppercase" id="chatAgents">0 Agents</h5>
                                            <p class="text-muted mb-0">Fitur petugas layanan kanal chat.</p>
                                        </div>
                                    </div>
                                </center>
                            </div>
                            <div class="col-md-3">
                                <center>
                                    <div class="card mt-4 maintenance-box shadow-none">
                                        <div class="card-body">
                                            <div class="mb-4">
                                                <img src="assets/images/lic/fb.png" width="64" />
                                            </div>
                                                
                                            <h5 class="font-size-15 text-uppercase" id="sosmedAgents">0 Agents</h5>
                                            <p class="text-muted mb-0">Fitur petugas layanan kanal media sosial.</p>
                                        </div>
                                    </div>
                                </center>
                            </div>
                            <div class="col-md-3">
                                <center>
                                    <div class="card mt-4 maintenance-box shadow-none">
                                        <div class="card-body">
                                            <div class="mb-4">
                                                <img src="assets/images/lic/ig.png" width="64" />
                                            </div>
                                                
                                            <h5 class="font-size-15 text-uppercase" id="qmAgents">0 Agents</h5>
                                            <p class="text-muted mb-0">Fitur petugas layanan kanal quality monitoring</p>
                                        </div>
                                    </div>
                                </center>
                            </div>
                            <div class="col-md-3">
                                <center>
                                    <div class="card mt-4 maintenance-box shadow-none">
                                        <div class="card-body">
                                            <div class="mb-4">
                                                <img src="assets/images/lic/lc.png" width="64" />
                                            </div>
                                                
                                            <h5 class="font-size-15 text-uppercase" id="lcAgents">0 Agents</h5>
                                            <p class="text-muted mb-0">Fitur petugas layanan kanal live chat</p>
                                        </div>
                                    </div>
                                </center>
                            </div>
                            <div class="col-md-3">
                                <center>
                                    <div class="card mt-4 maintenance-box shadow-none">
                                        <div class="card-body">
                                            <div class="mb-4">
                                                <img src="assets/images/lic/x.png" width="64" />
                                            </div>
                                                
                                            <h5 class="font-size-15 text-uppercase" id="xAgents">0 Agents</h5>
                                            <p class="text-muted mb-0">Fitur petugas layanan kanal x.</p>
                                        </div>
                                    </div>
                                </center>
                            </div>
                            <div class="col-md-3">
                                <center>
                                    <div class="card mt-4 maintenance-box shadow-none">
                                        <div class="card-body">
                                            <div class="mb-4">
                                                <img src="assets/images/lic/qa.png" width="64" />
                                            </div>
                                                
                                            <h5 class="font-size-15 text-uppercase" id="qaAgents">0 Agents</h5>
                                            <p class="text-muted mb-0">Fitur petugas layanan Quality Monitoring.</p>
                                        </div>
                                    </div>
                                </center>
                            </div>--%>
                        
                        </div>
                    </div>
                    <%--<div class="col-xl-6">
                        <div class="row">

                        </div>
                    </div>--%>
                </div>
                <!--<div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <%--<h5 class="card-title">Taskboard Ticket</h5>--%>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table align-middle table-nowrap table-check" id="TaskboardTicket">
                                    <thead>
                                        <tr>
                                            <th style="width: 150px; min-width: 150px;">Ticket Number</th>
                                            <th style="width: 150px; min-width: 150px;">Name/PIC</th>
                                            <th style="width: 150px; min-width: 150px;">Kategori</th>
                                            <th style="width: 150px; min-width: 150px;">Sub Kategori</th>
                                           
                                            <th style="width: 150px; min-width: 150px;">Position</th>
                                            <th style="width: 150px; min-width: 150px;">Status</th>
                                            <th style="width: 150px; min-width: 150px;">Date Create</th>
                                            <th style="width: 30px; min-width: 30px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>-->
               
            </div>
        </div>
    </div>
</asp:Content>
