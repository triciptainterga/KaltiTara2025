﻿Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports DevExpress.Web
Imports DevExpress.Web.GridViewDataColumn

Public Class Xtra_ReportPerformance
    Inherits System.Web.UI.Page

    Dim comm, com, sqlcom, sqlcomTo As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlConnect As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sql As String = String.Empty
    Dim sqldr, read, sqlDtr As SqlDataReader
    Dim execute As New ClsConn
    Dim descweekend As String
    Dim descchannel As String
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'If Not IsPostBack Then
        '    If Session("showhidechannel") IsNot Nothing Then
        '        Channel.Checked = CBool(Session("showhidechannel"))
        '    End If
        'End If
    End Sub
    Protected Sub DateEditWeekRange_CalendarCustomDisabledDate(sender As Object, e As CalendarCustomDisabledDateEventArgs)
        Dim isWeekendEnabled As Boolean = If(Session("AllowWeekend") IsNot Nothing, CBool(Session("AllowWeekend")), False)

        If Not isWeekendEnabled AndAlso (e.Date.DayOfWeek = DayOfWeek.Saturday OrElse e.Date.DayOfWeek = DayOfWeek.Sunday) Then
            e.IsDisabled = True
        Else
            e.IsDisabled = False ' Pastikan semua tanggal aktif jika weekend diaktifkan
        End If
    End Sub
    Protected Sub DateEditWeekRange_CalendarCustomDisabledEndDate(sender As Object, e As CalendarCustomDisabledDateEventArgs)
        Dim isWeekendEnabled As Boolean = If(Session("AllowWeekend") IsNot Nothing, CBool(Session("AllowWeekend")), False)

        If Not isWeekendEnabled AndAlso (e.Date.DayOfWeek = DayOfWeek.Saturday OrElse e.Date.DayOfWeek = DayOfWeek.Sunday) Then
            e.IsDisabled = True
        Else
            e.IsDisabled = False ' Pastikan semua tanggal aktif jika weekend diaktifkan
        End If
    End Sub
    Protected Sub Channel_CheckedChanged(sender As Object, e As EventArgs)
        Dim isChecked As Boolean = Channel.Checked
        Session("showhidechannel") = isChecked
        If isChecked Then
            ASPxGridView1.Columns("Channel").Visible = True
        Else
            ASPxGridView1.Columns("Channel").Visible = False
        End If
    End Sub
    Protected Sub chkWeekend_CheckedChanged(sender As Object, e As EventArgs)
        ' Simpan status checkbox di sesi
        Session("AllowWeekend") = DirectCast(sender, ASPxCheckBox).Checked
        ' Refresh komponen kalender
        dt_strdate.DataBind()
        dt_endate.DataBind()
    End Sub
    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        descweekend = If(chkWeekend.Checked, "True", "False")
        descchannel = If(Channel.Checked, "True", "False")
        Dim queryInsert As String = "exec [BRA_Report_Performance] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "', '" & descweekend & "', '" & descchannel & "'"
        com = New SqlCommand(queryInsert, con)
        Try
            con.Open()
            com.ExecuteNonQuery()
            con.Close()

        Catch ex As Exception
            Response.Write(DirectCast(ex.Message() & "_exec [BRA_Report_Performance] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
        End Try
        ASPxGridView1.DataBind()
    End Sub
    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        descweekend = If(chkWeekend.Checked, "True", "False")
        descchannel = If(Channel.Checked, "True", "False")
        tempTrxStaff.SelectCommand = "exec [BRA_Report_Performance] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "', '" & descweekend & "', '" & descchannel & "'"
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        descweekend = If(chkWeekend.Checked, "True", "False")
        descchannel = If(Channel.Checked, "True", "False")
        tempTrxStaff.SelectCommand = "exec [BRA_Report_Performance] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "', '" & descweekend & "', '" & descchannel & "'"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("BRA_Report_Performance_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("BRA_Report_Performance_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("BRA_Report_Performance_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("BRA_Report_Performance_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("BRA_Report_Performance_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "Word"
                ASPxGridViewExporter1.WriteDocxToResponse("BRA_Report_Performance_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub

End Class