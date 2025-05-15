<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master"
    CodeBehind="QA_TrmMonitoringPenilaian.aspx.vb" Inherits="UIDESK.QA_TrmMonitoringPenilaian" %>

    <asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <script src="js/jquery-1.9.1.min.js"></script>
        <script src="js/QA_TrmMonitoringPenilaian.js"></script>
        <script src="js/sweetalert.min.js"></script>
        <!-- Font Awesome CDN -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-KMZ8BDuMcZ4qTzX5C+Q5gLrmcKyZdBfuCaB0+UkMnVDP4qfvv6ScEohpspBVV8+yUpqXa+TcIgjwdb2opjqBlw=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />
        <!-- DataTables JS -->
        <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

        <style>
            body {
                background-color: #f7f8fa;
            }

            .filter-button {
                position: fixed;
                right: 20px;
                /* Jarak dari tepi kanan */
                top: 20px;
                /* Jarak dari atas */
                z-index: 1050;
                /* Agar berada di atas elemen lainnya */
            }

            @media (max-width: 768px) {
                .filter-button {
                    right: 10px;
                    /* Penyesuaian jarak untuk layar kecil */
                    top: 10px;
                }
            }

            .modal-body {
                max-height: 72vh;
                /* Set max height to 70% of the viewport height */
                overflow-y: auto;
                /* Enable vertical scrolling */
            }

            .modal-dialog {
                max-width: 70%;
                /* Adjust this value as needed */
            }

            .card-margin {
                margin-left: 15px;
                /* Ubah sesuai kebutuhan */
                margin-right: 15px;
                /* Ubah sesuai kebutuhan */
            }

            .position-relative {
                position: relative;
            }

            #TxtSearchingUserName {
                padding-right: 2.5rem;
                /* Adds space for the icon */
            }

            .search-icon {
                position: absolute;
                top: 50%;
                right: 12px;
                /* Adjusts horizontal distance from the input field's right edge */
                transform: translateY(-50%);
                /* Centers vertically */
                color: #adb5bd;
                /* Icon color */
                font-size: 1rem;
                /* Adjust icon size */
                pointer-events: none;
                /* Allows input interactions without affecting the icon */
            }

            /* Ensure icon is centered and has appropriate size inside the circular div */
            .icon-thumbnail {
                font-size: 28px;
                /* Adjust the size of the icon */
                width: 50px;
                /* Adjust the width of the circle */
                height: 50px;
                /* Adjust the height of the circle */
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                color: white;
                /* Set icon color */
            }

            /* Gaya untuk tombol */
            .btn-custom {
                background-color: white;
                /* Warna latar tombol */
                color: black;
                /* Warna teks tombol */
                border: 1px solid #ddd;
                /* Warna border */
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                /* Bayangan pada tombol */
                padding: 8px 15px;
                /* Padding tombol */
                border-radius: 5px;
                /* Membuat sudut tombol sedikit melengkung */
                transition: all 0.3s ease;
                /* Transisi untuk hover */
            }

            /* Efek hover untuk tombol */
            .btn-custom:hover {
                background-color: #f0f2f5;
                /* Warna latar saat hover */
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                /* Bayangan lebih tebal saat hover */
                color: #000;
                /* Warna teks tetap hitam */
                border-color: #ccc;
                /* Warna border saat hover */
            }
        </style>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }

            th,
            td {
                border: 1px solid black;
                padding: 8px;
                text-align: center;
                /* Teks horizontal di tengah */
                vertical-align: middle;
                /* Teks vertikal di tengah */
            }

            th {
                background-color: #f2f2f2;
                /* Memberi warna latar belakang pada header */
            }
        </style>

        <body>

            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-flex align-items-center justify-content-between">
                        <h4 class="mb-0">Data Distribute & Penilaian</h4>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col text-end">
                    <a href="#" class="btn btn-custom" data-bs-toggle="modal" data-bs-target="#filterModal">Filter Date
                    </a>
                </div>
            </div>

            <div class="container">
                <!-- Filter Date Modal -->
                <div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" style="max-width: 500px;">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="filterModalLabel">Select Month and Year</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="bulan">Bulan</label>
                                    <select id="bulan" class="form-control">
                                        <option value="">Pilih Bulan</option>
                                        <option value="01">Januari</option>
                                        <option value="02">Februari</option>
                                        <option value="03">Maret</option>
                                        <option value="04">April</option>
                                        <option value="05">Mei</option>
                                        <option value="06">Juni</option>
                                        <option value="07">Juli</option>
                                        <option value="08">Agustus</option>
                                        <option value="09">September</option>
                                        <option value="10">Oktober</option>
                                        <option value="11">November</option>
                                        <option value="12">Desember</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="tahun">Tahun</label>
                                    <select id="tahun" class="form-control">
                                        <option value="">Pilih Tahun</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="applyFilterBtn">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-2">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body" style="overflow-x: auto; overflow-y: auto;">
                            <table class="table align-middle table-nowrap table-check" id="monitoringTable"
                                style="width: 100%; overflow-y: auto; overflow-x: auto;">
                                <thead>
                                    <tr>
                                        <th rowspan="2" style="width: 50px; font-weight: bold;">No</th>
                                        <th rowspan="2" style="width: 200px; text-align: center; font-weight: bold;">
                                            Agent Name</th>
                                        <th rowspan="2" style="width: 100px; text-align: center; font-weight: bold;">
                                            Site</th>
                                        <th colspan="4" style="width: 300px; text-align: center; font-weight: bold;">
                                            Inbound</th>
                                        <th colspan="4" style="width: 300px; text-align: center; font-weight: bold;">
                                            Email</th>
                                        <th colspan="4" style="width: 300px; text-align: center; font-weight: bold;">
                                            Multichat</th>
                                        <th colspan="4" style="width: 300px; text-align: center; font-weight: bold;">
                                            Sosmed</th>
                                        <th colspan="4" style="width: 300px; text-align: center; font-weight: bold;">
                                            Outbound</th>
                                    </tr>
                                    <tr>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Penilaian</th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Sample</th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Minimal Sampling
                                        </th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Indikator</th>

                                        <th style="width: 50px; text-align: center; font-weight: bold;">Penilaian</th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Sample</th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Minimal Sampling
                                        </th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Indikator</th>

                                        <th style="width: 50px; text-align: center; font-weight: bold;">Penilaian</th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Sample</th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Minimal Sampling
                                        </th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Indikator</th>

                                        <th style="width: 50px; text-align: center; font-weight: bold;">Penilaian</th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Sample</th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Minimal Sampling
                                        </th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Indikator</th>

                                        <th style="width: 50px; text-align: center; font-weight: bold;">Penilaian</th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Sample</th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Minimal Sampling
                                        </th>
                                        <th style="width: 50px; text-align: center; font-weight: bold;">Indikator</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" id="indikatorWarnaSection" style="display: none;">
                <div class="col-6">
                    <div class="card">
                        <div class="card-body" style="overflow-x: auto; overflow-y: auto;">
                            <table class="table align-middle table-nowrap table-check mb-0">
                                <thead>
                                    <tr>
                                        <th style="width: 100px; font-weight: bold; text-align: center;">Indikator Warna</th>
                                        <th style="font-weight: bold;">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="background-color: gray; text-align: center;"></td>
                                        <td>Data Sample Belum Ada</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: red; text-align: center;"></td>
                                        <td>Data Sample sudah ada, tetapi sample tersebut sama sekali belum dinilai</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: green; text-align: center;"></td>
                                        <td>Data sudah dinilai sesuai dengan maksimal sample</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: yellow; text-align: center;"></td>
                                        <td>Data sample sudah ada, Data sample sudah dinilai tetapi belum sesuai max sample</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        </body>

        <script>
            document.addEventListener("DOMContentLoaded", function () {
                const tahunSelect = document.getElementById("tahun");
                const currentYear = new Date().getFullYear();
                const previousYear = currentYear - 1;
                const years = [previousYear, currentYear];

                years.forEach(function (year) {
                    const option = document.createElement("option");
                    option.value = year;
                    option.textContent = year;
                    tahunSelect.appendChild(option);
                });
            });
        </script>
    </asp:Content>