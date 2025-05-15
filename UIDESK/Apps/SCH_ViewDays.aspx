<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Apps/Uidesk.Master" CodeBehind="SCH_ViewDays.aspx.vb" Inherits="UIDESK.SCH_ViewDays" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/SCH_ViewDays.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <style>
        .custom-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            table-layout: auto;
        }

            .custom-table,
            .custom-table th,
            .custom-table td {
                border: 1px solid black;
            }

                .custom-table th,
                .custom-table td {
                    padding: 4px; /* Mengurangi padding untuk membuat kolom lebih kompak */
                    text-align: center;
                    white-space: nowrap; /* Mencegah teks terpotong ke baris berikutnya */
                }

        .bg-primary {
            background-color: green;
            color: white;
        }

        .bg-dark {
            background-color: black;
            color: white;
        }
    </style>
    <div class="card">
        <div class="card-body">


            <div class="row">
                <div class="col-md-2" style="margin-top: 5px;">
                    <select id="mySelect" name="options" style="width: 30%">
                        <option value="1">Daily</option>
                        <option value="2">Monthly</option>

                    </select>
                </div>

                <div class="col-md-2" style="margin-top: 5px;" id="days">
                    <input class="form-control" type="date" id="example-date-input">
                </div>
                <div class="col-md-2" style="margin-top: 5px;" id="monthly">
                     <input class="form-control" type="date" id="Endinput">
                </div>
                <div class="col-md-2" style="margin-top: 5px;">
                    <button type="button" class="btn btn-primary w-sm" onclick="SubmitDataNya()" id="SubmitData">Submit</button>
                </div>

            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div id="tables-container" class="custom-table"></div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
