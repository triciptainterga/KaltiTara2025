<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="Uidesk001.aspx.vb" Inherits="UIDESK.Uidesk001" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="col-xxl-12 col-lg-12">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title mb-4">Setting</h5>
                <div class="card border shadow-none mb-5">
                    <div class="card-header d-flex align-items-center">
                        <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                                <div class="avatar-title rounded-circle bg-soft-primary text-primary">
                                    01
                                                           
                                </div>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <h5 class="card-title">General Info</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div>

                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="gen-info-name-input">Name</label>
                                        <input type="text" class="form-control" id="gen-info-name-input" placeholder="Enter Name">
                                    </div>

                                </div>
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="gen-info-designation-input">Designation</label>
                                        <input type="text" class="form-control" id="gen-info-designation-input" placeholder="Enter Designation">
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="gen-info-description-input">Description</label>
                                <textarea class="form-control" placeholder="Enter Description" id="gen-info-description-input" rows="3"></textarea>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end card -->

                <div class="card border shadow-none mb-5">
                    <div class="card-header d-flex align-items-center">
                        <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                                <div class="avatar-title rounded-circle bg-soft-primary text-primary">
                                    02
                                                           
                                </div>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <h5 class="card-title">Contact Info</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="contact-info-email-input">E-mail :</label>
                            <input type="email" class="form-control" id="contact-info-email-input" placeholder="Enter Email">
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-md-0">
                                    <label for="contact-info-website-input" class="form-label">Website</label>
                                    <input type="url" class="form-control" placeholder="Enter website url" id="contact-info-website-input">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-md-0">
                                    <label for="contact-info-location-input" class="form-label">Location</label>
                                    <input type="url" class="form-control" placeholder="Enter Address" id="contact-info-location-input">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end card -->

                <div class="card border shadow-none">
                    <div class="card-header d-flex align-items-center">
                        <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                                <div class="avatar-title rounded-circle bg-soft-primary text-primary">
                                    03
                                                           
                                </div>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <h5 class="card-title">Experience</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label for="workexperience-designation-input">Designation</label>
                                    <input type="text" class="form-control" id="workexperience-designation-input" placeholder="Enter Designation title">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label for="workexperience-companyname-input">Company name</label>
                                    <input type="text" class="form-control" id="workexperience-companyname-input" placeholder="Enter Company name">
                                </div>
                            </div>
                        </div>


                        <div>
                            <label>Years</label>
                            <input type="hidden" class="form-control flatpickr-input" id="datepicker-range"><input class="form-control form-control input" placeholder="" tabindex="0" type="text" readonly="readonly">
                        </div>
                    </div>
                </div>
                <!-- end card -->

                <div class="text-end">
                    <button type="submit" class="btn btn-primary w-sm">Submit</button>
                </div>
                <!-- end form -->
            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->
    </div>
</asp:Content>
