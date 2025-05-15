<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="QA_TrmItemPertanyaan.aspx.vb" Inherits="UIDESK.QA_TrmItemPertanyaan" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/QA_TrmItemPertanyaan.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <%--<h5 class="card-title">Data Channel</h5>--%>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                            <div>
                                <a href="#" class="btn btn-light" data-bs-toggle="modal" onclick="Tambah()">+ Add New</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table align-middle table-nowrap table-check" id="DataQA_MasterForm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Kode</th>
                                <th style="width: 100px;">Kategori Penilaian</th>
                                <th style="width: 200px;">Jenis Penilaian</th>
                                <th style="width: 200px;">Aspek Penilaian</th>
                                <th style="width: 300px;">Detail Aspek Penilaian</th>
                                <th>Urutan</th>
                                <th>Status</th>
                                <th style="width: 150px;">Date Create</th>
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
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="addContactModal"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel">Form Detail Aspek Penilaian</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label>Master QA</label>
                                    <select name="select" id="ComboMasterQA" class="form-select" onchange="Add_ComboJenisQA('1');">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label>Jenis QA</label>
                                    <select name="select" id="ComboJenisQA" class="form-select" onchange="Add_ComboAspekCallmon('1');">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label>Nama Aspek Penilaian</label>
                                    <select name="select" id="ComboAspekCallmonQA" required class="form-select">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label>Nama Detail Aspek Penilaian</label>
                                    <input type="text" class="form-control" id="TrxDetailCallmon">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label>Nomor Urut Aspek Penilaian</label>
                                    <input type="number" class="form-control" id="TrxNomorUrut">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label>Status</label>
                                    <select class="form-select" id="cmbStatus">
                                        <option>Select</option>
                                        <option value="Y">Active</option>
                                        <option value="N">Non Active</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label>Deskripsi Item Indikator</label>
                                    <textarea rows="2" id="DeskripsiItemIndikator" name="DeskripsiItemIndikator" style="width: 100%;"></textarea>
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
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var DeskripsiItemIndikator = CKEDITOR.replace('DeskripsiItemIndikator');
        DeskripsiItemIndikator.config.height = 200;
        DeskripsiItemIndikator.config.toolbar = 'Basic';
        DeskripsiItemIndikator.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-']
            ];

    </script>
</asp:Content>
