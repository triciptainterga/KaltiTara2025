<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Out_TrxTaskboard.aspx.vb" Inherits="UIDESK.Out_TrxTaskboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/Out_TrxTaskboard.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <asp:HiddenField ID="TrxLevelUser" runat="server" />
    <asp:HiddenField ID="TrxTelepon" runat="server" />
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="mb-3">
                            <h5 class="card-title">Taskboard Outbound Call</h5>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="row" id="divCountingDataCall"></div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <table class="table align-middle table-nowrap table-check" id="TrmCategory">
                            <thead>
                                <tr>
                                    <th style="width: 30px; min-width: 30px;">ID</th>
                                    <th style="width: 150px; min-width: 150px;">Name</th>
                                    <th style="width: 150px; min-width: 150px;">Email</th>
                                    <th style="width: 150px; min-width: 150px;">Telepon</th>
                                    <th style="width: 150px; min-width: 150px;">Job Tittle</th>
                                    <th style="width: 150px; min-width: 150px;">Address</th>
                                    <th style="width: 150px; min-width: 150px;">Date Create</th>
                                    <th style="width: 30px; min-width: 30px;">Called</th>
                                    <th style="width: 30px; min-width: 30px;">Action</th>
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
    <div class="modal fade bs-example-modal-xl" tabindex="-1" role="dialog" id="modal-agent"
        aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myExtraLargeModalLabel"> Call Outbound Note</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Note</label>
                                    <textarea class="form-control" placeholder="Leave a comment here" id="Note" name="Note" style="height: 200px"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Status Call</label>
                                    <select class="form-select" id="ComboStatusCall">
                                        <option value="">Select</option>
                                        <option value="Anser">Anser</option>
                                        <option value="Reject">Reject</option>
                                        <option value="No Anser">No Anser</option>
                                        <option value="Busy">Busy</option>
                                        <option value="Wrong Number">Wrong Number</option>
                                        <option value="Unregistered">Unregistered</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Status Transaksi</label>
                                    <select id="ComboStatusData" class="form-select">
                                        <option value="">Select</option>
                                        <option value="Progress">Progress</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="addcontact-designation-input" class="form-label">Tanggal</label>
                                    <input type="date" class="form-control" id="Tanggal">
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row" style="overflow-y:scroll;overflow-x:hidden;height:280px;">
                            <div class="col-xl-12">
                                <div class="p-4">
                                    <div class="verti-timeline left-timeline">
                                        <div class="timeline-item left">
                                            <div class="timeline-block">
                                                <div class="time-show-btn mt-0">
                                                    <a href="#" class="btn btn-danger btn-rounded w-lg">Start</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="timeline-item">
                                            <div class="timeline-block">
                                                <div class="timeline-box card">
                                                    <div class="card-body">
                                                        <div class="timeline-date">28 April</div>
                                                        <h5 class="mt-3 font-size-16">Timeline Event One</h5>
                                                        <div class="text-muted">
                                                            <p class="mb-0">It will be as simple as occidental in fact. To an english person, it will seem like simplified English, as a skeptical friend</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="timeline-item left">
                                            <div class="timeline-block">
                                                <div class="timeline-box card">
                                                    <div class="card-body">
                                                        <div class="timeline-date">21 April</div>
                                                        <h5 class="mt-3 font-size-16">Timeline Event Two</h5>
                                                        <div class="text-muted">
                                                            <p class="mb-0">To achieve this, it would be necessary to have more common words.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="timeline-item">
                                            <div class="timeline-block">
                                                <div class="timeline-box card">
                                                    <div class="card-body">
                                                        <div class="timeline-date">15 April</div>
                                                        <h5 class="mt-3 font-size-16">Timeline Event Three</h5>
                                                        <div class="text-muted">
                                                            <p>The new common language will be more simple and regular than the existing European languages be as simple as occidental</p>

                                                        </div>
                                                        <div class="timeline-album">
                                                            <a href="#">
                                                                <img src="assets/images/small/img-2.jpg" alt="">
                                                            </a>
                                                            <a href="#">
                                                                <img src="assets/images/small/img-3.jpg" alt="">
                                                            </a>
                                                            <a href="#">
                                                                <img src="assets/images/small/img-4.jpg" alt="">
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end item -->
                                        <div class="timeline-item left">
                                            <div class="timeline-block">
                                                <div class="timeline-box card">
                                                    <div class="card-body">
                                                        <div class="timeline-date">09 April</div>
                                                        <h5 class="mt-3 font-size-16">Timeline Event Four</h5>
                                                        <div class="text-muted">
                                                            <p class="mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, ab illo inventore veritatis et</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end item -->
                                        <div class="timeline-item">
                                            <div class="timeline-block">
                                                <div class="timeline-box card">
                                                    <div class="card-body">
                                                        <div class="timeline-date">02 April</div>
                                                        <h5 class="mt-3 font-size-16">Timeline Event Five</h5>
                                                        <div class="text-muted">
                                                            <p class="mb-0">Itaque earum rerum hic tenetur a sapiente delectus, ut aut doloribus asperiores.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end item -->
                                    </div>
                                </div>
                            </div>
                            <!-- end col -->
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary w-sm" onclick="ActionSimpan()" id="Simpan">Add</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
