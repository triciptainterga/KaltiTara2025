<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Customer.aspx.vb" Inherits="UIDESK.Crm_Trm_Customer" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Crm_Trm_Customer.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <style>
        .nav-link.active {
            background-color: #038edc !important;
            color: white !important;
        }
    </style>
    <style>
        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            max-height: 160px;
            overflow-y: auto;
            background-color: white;
            border: 0px solid #ccc;
            z-index: 1000; /* Ensure it's above other elements */
        }
    </style>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="Hd_Site" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Customer</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" runat="server" Font-Size="X-Small"
                            DataSourceID="DSource" Width="100%" Styles-Header-Font-Bold="true" Theme="MetropolisBlue">
                            <SettingsPager>
                                <AllButton Text="All">
                                </AllButton>
                                <NextPageButton Text="Next &gt;">
                                </NextPageButton>
                                <PrevPageButton Text="&lt; Prev">
                                </PrevPageButton>
                                <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                            </SettingsPager>
                            <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowFilterBar="Hidden" EnableFilterControlPopupMenuScrolling="true"
                                ShowVerticalScrollBar="false" ShowFooter="false" ShowHorizontalScrollBar="true" />
                            <Columns>
                                <dx:GridViewDataTextColumn Caption="No" FieldName="ID" Width="40px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="CIF" FieldName="CIF" Width="40px" CellStyle-HorizontalAlign="Center" Visible="false"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Group ID" FieldName="GroupID" Width="40px" CellStyle-HorizontalAlign="Center" Visible="false"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Id Customer" FieldName="CustomerID" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Nama Customer" FieldName="Name" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Comapany ID" FieldName="CompID" Width="200px" Visible="false"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Nama Perusahaan" FieldName="NamaPerusahaan" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Account ID" FieldName="AccountID" Width="200px" Visible="false"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Email" FieldName="Email" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Alamat" FieldName="Alamat" Width="200px"></dx:GridViewDataTextColumn>
                                <%--<dx:GridViewDataTextColumn Caption="NPWP" FieldName="NPWP" Width="200px"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="Facebook" FieldName="Facebook" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Twitter" FieldName="Twitter" PropertiesTextEdit-EncodeHtml="false" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Nomor Handphone" FieldName="HP" PropertiesTextEdit-EncodeHtml="false" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Status" FieldName="Status" Width="150px" Visible="false"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="User Create Customer" FieldName="UserCreateCustomer" HeaderStyle-HorizontalAlign="left" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Date Create Customer" FieldName="DateCreateCustomer" HeaderStyle-HorizontalAlign="left" Width="200px"></dx:GridViewDataTextColumn>
                            </Columns>
                        </dx:ASPxGridView>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="mb-3">
                            </div>
                        </div>
                        <div class="col-md-10">
                            <%--                            <div class="d-flex flex-wrap align-items-start justify-content-md-end gap-2 mb-3">
                            </div>--%>
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                <div class="search-box">
                                    <div class="position-relative">
                                        <input type="text" class="form-control bg-light border-light rounded" id="TxtSearchingUserName" placeholder="Search...">
                                        <i class="uil uil-search search-icon"></i>
                                    </div>
                                </div>
                                <div>
                                    <ul class="nav nav-pills">
                                        <li class="nav-item">
                                            <a class="nav-link active" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="List" onclick="ListCustomer()"><i class="fas fa-list"></i></a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Card" onclick="BoxCustomer()"><i class="fas fa-user"></i></a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="TambahUser()"><i class="fas fa-plus me-1"></i>Add New</a>
                                </div>
                                <div class="dropdown">
                                    <a class="btn btn-link text-dark dropdown-toggle shadow-none" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="uil uil-ellipsis-h"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <%--<div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="addContactModalLabel">Add Contact</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body p-4">
                                    <div>
                                        <div class="mb-3">
                                            <label for="addcontact-name-input" class="form-label">Name</label>
                                            <input type="text" class="form-control" id="addcontact-name-input" placeholder="Enter Name">
                                        </div>
                                        <div class="mb-3">
                                            <label for="addcontact-designation-input" class="form-label">Designation</label>
                                            <input type="text" class="form-control" id="addcontact-designation-input" placeholder="Enter Designation">
                                        </div>
                                        <div class="mb-3">
                                            <label for="addcontact-file-input" class="form-label">User Image</label>
                                            <input type="file" class="form-control" id="addcontact-file-input">
                                        </div>

                                        <div class="mb-3">
                                            <label for="addcontact-email-input" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="addcontact-email-input" placeholder="Enter Email">
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary w-sm">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>--%>
                    <div id="DivTabelCustomer">
                        <div class="card">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table align-middle table-nowrap table-check" id="TableCustomer">
                                        <thead>
                                            <tr>
                                                <%--<th style="width: 150px; min-width: 150px;">Ticket Number</th>--%>
                                                <th scope="col" style="width: 250px;">Type</th>
                                                <th scope="col" style="width: 250px;">Nama/PIC</th>
                                                <th scope="col" style="width: 250px;">Perusahaan</th>
                                                <th scope="col" style="width: 250px;">NPWP</th>
                                                <th scope="col" style="width: 250px;">Nomor Telepon</th>
                                                <th scope="col" style="width: 250px;">Email</th>
                                                <th scope="col">Action</th>
                                                <%--<th style="width: 50px; min-width: 100px;">Action</th>--%>
                                                <%--<th style="width: 150px; min-width: 100px;">SLA</th>
                                        <th style="width: 150px; min-width: 150px;">Date Create</th>--%>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <%--<table class="table align-middle table-nowrap table-check">
                                <thead>
                                    <tr>
                                        <th scope="col" style="width: 50px;">
                                            <div class="form-check font-size-16">
                                                <input type="checkbox" class="form-check-input" id="checkAll">
                                                <label class="form-check-label" for="checkAll"></label>
                                            </div>
                                        </th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Tags</th>
                                        <th style="width: 80px; min-width: 80px;">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div class="form-check font-size-16">
                                                <input type="checkbox" class="form-check-input" id="contacusercheck1">
                                                <label class="form-check-label" for="contacusercheck1"></label>
                                            </div>
                                        </th>
                                        <td>
                                            <img src="assets/images/users/avatar-1.jpg" alt="" class="avatar-sm rounded-circle me-2">
                                            <a href="pages-profile.html" class="text-body fw-medium">Donald Risher</a>
                                        </td>
                                        <td>UI/UX Designer</td>
                                        <td>DonaldRisher@Dashonic.com</td>
                                        <td>
                                            <div class="d-flex gap-2">
                                                <a href="#" class="badge badge-soft-primary">Photoshop</a>
                                                <a href="#" class="badge badge-soft-primary">illustrator</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="dropdown">
                                                <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="uil uil-ellipsis-h"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="form-check font-size-16">
                                                <input type="checkbox" class="form-check-input" id="contacusercheck2">
                                                <label class="form-check-label" for="contacusercheck2"></label>
                                            </div>
                                        </th>
                                        <td>
                                            <img src="assets/images/users/avatar-2.jpg" alt="" class="avatar-sm rounded-circle me-2">
                                            <a href="pages-profile.html" class="text-body fw-medium">Helen Barron</a>
                                        </td>
                                        <td>Frontend Developer</td>
                                        <td>HelenBarron@Dashonic.com</td>
                                        <td>
                                            <div class="d-flex gap-2">
                                                <a href="#" class="badge badge-soft-primary font-size-11">Html</a>
                                                <a href="#" class="badge badge-soft-primary font-size-11">Css</a>
                                                <a href="#" class="badge badge-soft-primary font-size-11">2 + more</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="dropdown">
                                                <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="uil uil-ellipsis-h"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="form-check font-size-16">
                                                <input type="checkbox" class="form-check-input" id="contacusercheck3">
                                                <label class="form-check-label" for="contacusercheck3"></label>
                                            </div>
                                        </th>
                                        <td>
                                            <img src="assets/images/users/avatar-3.jpg" alt="" class="avatar-sm rounded-circle me-2">
                                            <a href="pages-profile.html" class="text-body fw-medium">Philip Theroux</a>
                                        </td>
                                        <td>Backend Developer</td>
                                        <td>PhilipTheroux@Dashonic.com</td>
                                        <td>
                                            <div class="d-flex gap-2">
                                                <a href="#" class="badge badge-soft-primary font-size-11">Php</a>
                                                <a href="#" class="badge badge-soft-primary font-size-11">Java</a>
                                                <a href="#" class="badge badge-soft-primary font-size-11">Python</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="dropdown">
                                                <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="uil uil-ellipsis-h"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="DivBoxCustomer">
                        <div class="row" id="DivUserSystem"></div>
                    </div>
                    <%--<div class="row g-0 text-center text-sm-start">
                        <div class="col-sm-6">
                            <div>
                                <p class="mb-sm-0">Showing 1 to 10 of 57 entries</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <ul class="pagination pagination-rounded justify-content-center justify-content-sm-end mb-sm-0">
                                <li class="page-item disabled">
                                    <a href="#" class="page-link"><i class="mdi mdi-chevron-left"></i></a>
                                </li>
                                <li class="page-item">
                                    <a href="#" class="page-link">1</a>
                                </li>
                                <li class="page-item active">
                                    <a href="#" class="page-link">2</a>
                                </li>
                                <li class="page-item">
                                    <a href="#" class="page-link">3</a>
                                </li>
                                <li class="page-item">
                                    <a href="#" class="page-link">4</a>
                                </li>
                                <li class="page-item">
                                    <a href="#" class="page-link">5</a>
                                </li>
                                <li class="page-item">
                                    <a href="#" class="page-link"><i class="mdi mdi-chevron-right"></i></a>
                                </li>
                            </ul>
                        </div>
                        <!-- end col -->
                    </div>--%>
                </div>
            </div>
        </div>
    </div>
    <asp:SqlDataSource ID="DSource" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>

    <%--<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="mb-3">
                                <a href="#" class="btn btn-light" onclick="TambahUser()">
                                    <i class="uil uil-plus me-1"></i>+ Add New
                                 </a>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="d-flex flex-wrap align-items-start justify-content-md-end gap-2 mb-3">
                                <div class="search-box ">
                                    <div class="position-relative">
                                        <input type="text" class="form-control bg-light border-light rounded" id="TxtSearchingUserName" placeholder="Search...">
                                        <i class="uil uil-search search-icon"></i>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="row" id="DivCustomerSystem"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>
    <%-- <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="TambahUser()">+ Add New</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive" style="visibility: hidden;">
                    <center>
                        <div class="spinner-border text-primary m-1" role="status" id="Loading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </center>
                    <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                        <thead>
                            <tr>
                                <th style="width: 50px; min-width: 50px;">CustomerID</th>
                                <th style="width: 200px; min-width: 200px;">Name</th>
                                <th style="width: 150px; min-width: 150px;">Jenis Kelamin</th>
                                <th style="width: 150px; min-width: 150px;">Birth</th>
                                <th style="width: 150px; min-width: 150px;">HP</th>
                                <th style="width: 200px; min-width: 200px;">Email</th>
                                <th style="width: 50px; min-width: 50px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    </div>--%>
    <%--<div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modalagent"
                    aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addContactModalLabel">Form Customer</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-name-input" class="form-label">Name</label>
                                                <input type="text" class="form-control" id="Name" placeholder="Name">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-name-input" class="form-label">Gender</label>
                                                <select id="ComboGender" class="form-select">
                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Birth</label>
                                                <input type="date" class="form-control" id="Birth" placeholder="Birth">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">NIK</label>
                                                <input type="text" class="form-control" id="NIK" placeholder="NIK">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">HP</label>
                                                <input type="text" class="form-control" id="HP" placeholder="HP">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Email</label>
                                                <input type="text" class="form-control" id="Email" placeholder="Email">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Facebook</label>
                                                <input type="text" class="form-control" id="Facebook" placeholder="Facebook">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Instagram</label>
                                                <input type="text" class="form-control" id="Instagram" placeholder="Instagram">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Twitter</label>
                                                <input type="text" class="form-control" id="Twitter" placeholder="Twitter">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <label for="addcontact-designation-input" class="form-label">Address</label>
                                                <textarea class="form-control" placeholder="Address" id="Alamat" name="Alamat" style="height: 200px;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Add</button>
                                <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>--%>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modalagent"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalCustomer">Form Customer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div id="FormNewPerusahaan">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Nama Perusahaan/Pemerintah <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="Perusahaan_Nama" placeholder="Nama">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">NPWP</label>
                                    <input type="text" class="form-control" id="Perusahaan_NPWP" placeholder="NPWP">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Tipe <span class="text-danger">*</span></label>
                                    <select id="AddPerusahaan_Type" class="form-select">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4" style="display: none;">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Telepon</label>
                                    <input type="text" class="form-control" id="Perusahaan_Telepon" placeholder="Telepon">
                                </div>
                            </div>
                            <div class="col-md-4" style="display: none;">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Email</label>
                                    <input type="text" class="form-control" id="Perusahaan_Email" placeholder="Email">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="FormNewCustomer">
                        <%-- <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Nama</label>
                                    <input type="text" class="form-control" id="AddCustomer_Name" placeholder="Nama">
                                </div>
                            </div>
                        </div>--%>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Tipe</label>
                                    <select id="AddCustomer_Type" class="form-select" onchange="ComboTypePerusahaan('1')">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <%--<label for="addcontact-designation-input" class="form-label">Nama Perusahaan</label><a href="#" class="btn btn-sm btn-soft-primary float-end" onclick="FormListPIC()" id="FormListPIC"><i class="fas fa-user-circle"></i></a>&nbsp;&nbsp;<a href="#" class="btn btn-sm btn-soft-primary float-end" onclick="FormNewPerusahaan()" id="FormAddPerusahaan"><i class="fas fa-plus-circle"></i></a>
                                    <input type="text" class="form-control" id="AddCustomer_NamaPerusahaan" placeholder="Nama Perusahaan">
                                    <div id="Div_CustomerSearching" class="search-results" style="margin-left: 10px; margin-right: 10px; margin-top: -15px; width: 350px;"></div>--%>
                                    <label for="addcontact-designation-input" class="form-label">Nama Perusahaan <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <div class="input-group-text bg-soft-primary" style="cursor: pointer;" onclick="FormNewPerusahaan()"><i class="fas fa-plus-circle"></i></div>
                                        <input type="text" class="form-control" id="AddCustomer_NamaPerusahaan" placeholder="Nama Perusahaan">
                                    </div>
                                    <div id="Div_CustomerSearching" class="search-results" style="margin-left: 10px; margin-right: 10px; margin-top: -15px; width: 350px;"></div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">NPWP</label>
                                    <input type="text" class="form-control" id="AddCustomer_NPWP" placeholder="NPWP">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3" style="display: none;">
                                    <label for="addcontact-designation-input" class="form-label">NIK</label>
                                    <input type="text" class="form-control" id="AddCustomer_NIK" placeholder="NIK">
                                </div>
                                <div class="mb-3">
                                    <label for="addcontact-name-input" class="form-label">Nama/PIC</label>
                                    <%--<input type="text" class="form-control" id="AddCustomer_Name" placeholder="Nama">--%>
                                    <div class="input-group">
                                        <div class="input-group-text bg-soft-primary" onclick="FormListPIC()" style="cursor: pointer;"><i class="fas fa-user-circle"></i></div>
                                        <input type="text" class="form-control" id="AddCustomer_Name" placeholder="Nama">
                                    </div>
                                    <div id="Div_CustomerSearchingPIC" class="search-results" style="margin-left: 10px; margin-right: 10px; margin-top: -15px; width: 350px;"></div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Nomor Telepon</label>
                                    <input type="text" class="form-control" id="AddCustomer_HP" placeholder="Nomor Telepon">
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
                        <div class="row" style="display: none;">
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
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal" id="CloseCustomer">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdateCustomer()" id="UpdateCustomer">Update</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanCustomer()" id="SimpanCustomer">Add</button>
                    <button type="button" class="btn btn-light w-sm" onclick="ActionCancelPerusahaan()" id="CancelCustomer">Cancel</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpanPerusahaan()" id="SimpanPerusahaan">Add</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
