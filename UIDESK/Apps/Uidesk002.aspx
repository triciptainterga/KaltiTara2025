<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Uidesk002.aspx.vb" Inherits="UIDESK.Uidesk002" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- JAVASCRIPT -->
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Uidesk002.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h5 class="card-title">Data Category</h5>
                        </div>
                    </div>
                    <!-- end col -->

                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <%--                        <div>
                                <ul class="nav nav-pills">
                                    <li class="nav-item">
                                        <a class="nav-link active" href="contacts-list.html" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="List"><i class="uil uil-list-ul"></i></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="contacts-grid.html" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Grid"><i class="uil uil-apps"></i></a>
                                    </li>
                                </ul>
                            </div>--%>
                            <div>
                                <a href="#" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addContactModal"><i class="uil uil-plus me-1"></i>+ Add New</a>
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
                            <!-- end dropdown -->
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                        <thead>
                            <tr>
                                <th style="width: 80px; min-width: 80px;">ID</th>
                                <th scope="col">Category</th>
                                <th style="width: 80px; min-width: 80px;">Action</th>
                            </tr>
                            <!-- end tr -->
                        </thead>
                        <!-- end thead -->
                        <tbody>
                            <%--<tr>
                                <td>
                                    <img src="assets/images/users/avatar-1.jpg" alt="" class="avatar-sm rounded-circle me-2">
                                    <a href="pages-profile.html" class="text-body fw-medium">Donald Risher</a>
                                </td>
                                <td>UI/UX Designer</td>
                                <td>DonaldRisher@Dashonic.com</td>
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
                            </tr>--%>
                            <!-- end tr -->
                        </tbody>
                        <!-- end tbody -->
                    </table>
                    <!-- end table -->
                </div>
                <!-- end table responsive -->

                <div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addContactModalLabel">Add Category</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div>
                                    <div class="mb-3">
                                        <label for="addcontact-name-input" class="form-label">Category Name</label>
                                        <input type="text" class="form-control" id="TxtCategoryName" placeholder="Category Name">
                                    </div>
                                    <div class="mb-3">
                                        <label for="addcontact-designation-input" class="form-label">Status</label>
                                        <select class="form-select" id="cmbStatus">
                                            <option>Select</option>
                                            <option value="Y">Aktif</option>
                                            <option value="N">No Aktif</option>
                                        </select>
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
                </div>
                <!-- end row -->

            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->
    </div>
</asp:Content>
