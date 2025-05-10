<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Crm_Trm_Template_AutoReply.aspx.vb" Inherits="UIDESK.Crm_Trm_Template_AutoReply" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/Crm_Trm_Template_AutoReply.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Data Template Auto Reply</h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table align-middle table-nowrap table-check" id="TableAuto">
                            <thead>
                                <tr>
                                    <th style="width: 50px;">ID</th>
                                    <th>Template Auto Reply</th>
                                    <th style="width: 150px;">Account</th>
                                    <%--<th style="width: 150px;">Status</th>--%>
                                    <th style="width: 50px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal fade bs-example-modal-xl" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="addContactModalLabel">Form Template Auto Reply</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body p-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="addcontact-name-input" class="form-label">Template Auto Reply (Maksimal 7000 Character) <span class="text-danger">*</span></label>
                                                <textarea id="TemplateAutoReply" name="TemplateAutoReply" class="form-control"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label for="addcontact-name-input" class="form-label">Email Address</label>
                                            <select name="select" id="CmbAccount" class="form-select">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="addcontact-designation-input" class="form-label">Status</label>
                                            <select class="form-select" id="cmbStatus">
                                                <option>Select</option>
                                                <option value="Y">Active</option>
                                                <option value="N">Non Active</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('TemplateAutoReply');
        CKEDITOR.config.height = 250;
        CKEDITOR.config.toolbar = 'Full';
        CKEDITOR.config.toolbar_Full =
            [
                //{ name: 'snddocument', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates'] },
                //{ name: 'clipboard', items: ['Undo', 'Redo'] },
                //{ name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },
                {
                    name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
                        'HiddenField']
                },
                '/',
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                {
                    name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv',
                        '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
                },
                { name: 'links', items: ['Link', 'Unlink'] },
                { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'PageBreak', 'Iframe'] },
                '/',
                { name: 'styles', items: ['Styles', 'Format', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] },
                { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
            ];
    </script>
</asp:Content>
