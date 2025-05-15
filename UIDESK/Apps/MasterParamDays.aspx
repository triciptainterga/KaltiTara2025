<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="MasterParamDays.aspx.vb" Inherits="UIDESK.MasterParamDays" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/MasterParamDays.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <style>
        .time-select {
            display: inline-block;
            margin-right: 5px; /* Optional: add some space between the select boxes */
        }

        select {
            border-radius: 12px; /* Creates an oval shape */
            padding: 5px; /* Increases the size of the dropdown */
            font-size: 16px; /* Makes the text larger */
            border: 1px solid #ccc;
            width: 70px; /* Set a fixed width */
        }

        .dropdown-checkbox {
            width: 100%;
            border: 1px solid #ced4da;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
        }

            .dropdown-checkbox .dropdown-menu {
                width: 100%;
                max-height: 250px;
                overflow-y: auto;
            }

            .dropdown-checkbox input[type="search"] {
                margin-bottom: 10px;
                width: 100%;
                padding: 5px;
                box-sizing: border-box;
            }

        .input-group {
            display: flex;
            align-items: center;
        }

        .tab-navigation {
            position: relative;
            display: flex;
            align-items: center;
        }

        #tabs-container {
            display: flex;
            overflow-x: hidden; /* Prevent scrollbars */
            white-space: nowrap;
            flex-grow: 1;
            scroll-behavior: smooth; /* Smooth scrolling */
        }

        .scroll-left, .scroll-right {
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            padding: 5px 10px;
            cursor: pointer;
            user-select: none;
        }

        .navTabs li {
            list-style-type: none; /* Menghilangkan marker bullet */
            margin-right: 10px; /* Memberikan jarak antar tab */
            flex: 0 0 auto; /* Agar setiap tab tetap memiliki ukuran yang sesuai */
        }

            /* Gaya dasar untuk tab */
            .navTabs li a {
                display: block;
                padding: 10px 15px;
                background-color: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 4px;
                color: #495057;
                text-decoration: none;
                transition: background-color 0.3s ease, color 0.3s ease;
            }

                /* Gaya saat tab di-hover */
                .navTabs li a:hover {
                    background-color: #e9ecef;
                    color: #007bff;
                }

            /* Gaya untuk tab aktif */
            .navTabs li.active a {
                background-color: #343a40; /* Warna latar belakang menjadi lebih gelap */
                color: white; /* Warna teks menjadi putih */
                border-color: #343a40; /* Border warna gelap */
            }

                /* Gaya saat tab aktif di-hover */
                .navTabs li.active a:hover {
                    background-color: #23272b; /* Warna latar belakang menjadi lebih gelap lagi */
                    color: white;
                }

        .nav-link.active {
            color: #fff; /* Warna teks saat aktif */
            background-color: #f7cc53; /* Background saat aktif */
            border-radius: 4px; /* Opsional, untuk sudut bulat */
            font-weight: bold; /* Teks tebal */
        }
    </style>
    <asp:HiddenField ID="hd_StatusAction" ClientIDMode="Static" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h5 class="card-title">Master Param Group</h5>
                            <input type="hidden" id="hfId" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <i class="mdi mdi-information-outline"></i>Agent Master <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Tambah()"><i class="far fa-calendar-plus"></i>Add Data</a>
                            </div>
                        </div>
                    </div>
                </div>
                 

                <div class="table-responsive">
                    <table class="table align-middle table-nowrap table-check" id="DataSCH_Shift">
                        <thead>
                            <tr>
                                <th style="width: 50px;">ID</th>
                                <th style="width: 50px;">Day Name</th>
                                <th style="width: 150px;">Channel Name</th>
                                <th style="width: 50px;">Qty</th>
                                
                                <th style="width: 150px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addContactModal"
    aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content p-4"> <!-- Added padding here -->
            <div class="row">

                <!-- First column for Group Agent (Channel Select) -->
                <div class="col-12 col-md-4 mb-3">
                    <label for="SelectDataHari">Hari</label>
                    <div class="input-group">
                        <select id="SelectDataHari" name="options" class="form-control">
                            <option value="">Select a channel</option>
                            <option value="Senin">Senin</option>
                            <option value="Selasa">Selasa</option>
                            <option value="Rabu">Rabu</option>
                            <option value="Kamis">Kamis</option>
                            <option value="Jumat">Jumat</option>
                            <option value="Sabtu">Sabtu</option>
                            <option value="Minggu">Minggu</option>
                        </select>
                    </div>
                </div>

                <!-- Second column for Group Agent Type (Senior/Junior Select) -->
                <div class="col-12 col-md-4 mb-3">
                    <label for="mySelect">Channel</label>
                    <select id="mySelect" name="options" class="form-control">
                        <option value="">Select a channel</option>
                        <option value="Voice">Voice</option>
                        <option value="Email">Email</option>
                        <option value="Omnichat">Omnichat</option>
                        <option value="Comments & More">Comments & More</option>
                    </select>
                </div>

                <!-- Third column for Quantity -->
                <div class="col-12 col-md-4 mb-3">
                    <label for="Qty">Qty</label>
                    <input type="text" id="Qty" class="form-control" />
                </div>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                <button type="button" class="btn btn-primary w-sm" onclick="ActionSave()" id="Save">Add</button>
            </div>
        </div>
    </div>
</div>

    <!-- staticBackdrop Modal -->

   
</asp:Content>
