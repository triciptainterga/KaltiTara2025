<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Tele_TrxTaskboard.aspx.vb" Inherits="UIDESK.Tele_TrxTaskboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <link href="css/alertify.min.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Tele_TrxTaskboard.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/alertify.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <asp:HiddenField ID="TrxLevelUser" runat="server" />
    <asp:HiddenField ID="TrxTelepon" runat="server" />
    <asp:HiddenField ID="StatusID" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row" id="divCountingDataCall"></div>
                <div class="card">
                    <br />
                    <div class="d-flex justify-content-right align-items-right" id="divstatusdata">
                        <div class="form-check form-switch font-size-20 ms-3">
                            <input class="form-check-input" type="checkbox" id="checkboxEmail" onclick="CheckTaskboard(this.checked)">
                            <label class="form-check-label" for="flexSwitchCheckChecked"></label>
                            <input type="hidden" id="HDEmail" runat="server" />
                        </div>
                    </div>
                    <hr />
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <table id="TrmTeleHeader" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;">ID</th>
                                            <th style="width: 200px;">Name</th>
                                            <%--<th style="width: 150px;">Email</th>--%>
                                            <th style="width: 200px;">Nomor Telepon</th>
                                            <%--<th style="width: 300px;">Produk</th>--%>
                                            <th style="width: 200px;">Produk Campaign</th>
                                            <th style="width: 300px;">Address</th>
                                            <th style="width: 150px;">Date</th>
                                            <th style="width: 50px;">Called</th>
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
            </div>
            <div class="card-footer">
                <div class="text-end">
                    <button type="button" class="btn btn-primary " data-bs-target="#exampleModalScrollable" onclick="ModalActivity()">Today Call Activity</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-note"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabel">Internal Note</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <%--<label for="addcontact-designation-input" class="form-label">Note</label>--%>
                                    <textarea class="form-control" placeholder="Leave a comment here" id="Note" name="Note" style="height: 250px"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ModalActivity" tabindex="-1" aria-labelledby="exampleModalScrollableTitle" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalScrollableTitle">Form Activity</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="Div_CustomerSearching"></div>
                    <%--  <ul class="list-unstyled chat-list" onclick="ProfileSelect(211216145450)">
                        <li class="active"><a href="#">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                    <div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-1">ADAM </h5>
                                    <p class="text-truncate mb-0">0215806589</p>
                                    <p class="text-truncate mb-0">muhammadadam849@gmail.com</p>
                                </div>
                                <div class="flex-shrink-0"></div>
                            </div>
                        </a></li>
                    </ul>
                    <ul class="list-unstyled chat-list" onclick="ProfileSelect(211216145450)">
                        <li class="active"><a href="#">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                    <div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-1">ADAM </h5>
                                    <p class="text-truncate mb-0">0215806589</p>
                                    <p class="text-truncate mb-0">muhammadadam849@gmail.com</p>
                                </div>
                                <div class="flex-shrink-0"></div>
                            </div>
                        </a></li>
                    </ul>
                    <ul class="list-unstyled chat-list" onclick="ProfileSelect(211216145450)">
                        <li class="active"><a href="#">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                    <div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-1">ADAM </h5>
                                    <p class="text-truncate mb-0">0215806589</p>
                                    <p class="text-truncate mb-0">muhammadadam849@gmail.com</p>
                                </div>
                                <div class="flex-shrink-0"></div>
                            </div>
                        </a></li>
                    </ul>
                    <ul class="list-unstyled chat-list" onclick="ProfileSelect(211216145450)">
                        <li class="active"><a href="#">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                    <div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-1">ADAM </h5>
                                    <p class="text-truncate mb-0">0215806589</p>
                                    <p class="text-truncate mb-0">muhammadadam849@gmail.com</p>
                                </div>
                                <div class="flex-shrink-0"></div>
                            </div>
                        </a></li>
                    </ul>
                    <ul class="list-unstyled chat-list" onclick="ProfileSelect(211216145450)">
                        <li class="active"><a href="#">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                    <div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-1">ADAM </h5>
                                    <p class="text-truncate mb-0">0215806589</p>
                                    <p class="text-truncate mb-0">muhammadadam849@gmail.com</p>
                                </div>
                                <div class="flex-shrink-0"></div>
                            </div>
                        </a></li>
                    </ul>
                    <ul class="list-unstyled chat-list" onclick="ProfileSelect(211216145450)">
                        <li class="active"><a href="#">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                    <div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-1">ADAM </h5>
                                    <p class="text-truncate mb-0">0215806589</p>
                                    <p class="text-truncate mb-0">muhammadadam849@gmail.com</p>
                                </div>
                                <div class="flex-shrink-0"></div>
                            </div>
                        </a></li>
                    </ul>
                    <ul class="list-unstyled chat-list" onclick="ProfileSelect(211216145450)">
                        <li class="active"><a href="#">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                    <div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-1">ADAM </h5>
                                    <p class="text-truncate mb-0">0215806589</p>
                                    <p class="text-truncate mb-0">muhammadadam849@gmail.com</p>
                                </div>
                                <div class="flex-shrink-0"></div>
                            </div>
                        </a></li>
                    </ul>
                    <ul class="list-unstyled chat-list" onclick="ProfileSelect(211216145450)">
                        <li class="active"><a href="#">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                    <div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-1">ADAM </h5>
                                    <p class="text-truncate mb-0">0215806589</p>
                                    <p class="text-truncate mb-0">muhammadadam849@gmail.com</p>
                                </div>
                                <div class="flex-shrink-0"></div>
                            </div>
                        </a></li>
                    </ul>
                    <ul class="list-unstyled chat-list" onclick="ProfileSelect(211216145450)">
                        <li class="active"><a href="#">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                    <div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-1">ADAM </h5>
                                    <p class="text-truncate mb-0">0215806589</p>
                                    <p class="text-truncate mb-0">muhammadadam849@gmail.com</p>
                                </div>
                                <div class="flex-shrink-0"></div>
                            </div>
                        </a></li>
                    </ul>
                    <ul class="list-unstyled chat-list" onclick="ProfileSelect(211216145450)">
                        <li class="active"><a href="#">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                    <div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-1">ADAM </h5>
                                    <p class="text-truncate mb-0">0215806589</p>
                                    <p class="text-truncate mb-0">Answer</p>
                                    <p class="text-truncate mb-0">Confirmed</p>
                                    <p class="text-truncate mb-0">Done</p>
                                    <p class="text-truncate mb-0">Jam 10:02</p>
                                </div>
                                <div class="flex-shrink-0"></div>
                            </div>
                        </a></li>
                    </ul>
                    <ul class="list-unstyled chat-list" onclick="ProfileSelect(211216145450)">
                        <li class="active"><a href="#">
                            <div class="d-flex align-items-start">
                                <div class="flex-shrink-0 user-img online align-self-center me-3">
                                    <div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-1">ADAM </h5>
                                    <p class="text-truncate mb-0">0215806589</p>
                                    <p class="text-truncate mb-0">muhammadadam849@gmail.com</p>
                                </div>
                                <div class="flex-shrink-0"></div>
                            </div>
                        </a></li>
                    </ul>--%>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Export</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</asp:Content>
