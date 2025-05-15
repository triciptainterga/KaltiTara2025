Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports DevExpress.Web

Public Class Xtra_ReportAgentServicesLevel
    Inherits System.Web.UI.Page

    Dim comm, com, sqlcom, sqlcomTo As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlConnect As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sql As String = String.Empty
    Dim sqldr, read, sqlDtr As SqlDataReader
    Dim execute As New ClsConn
    Dim descweekend As String
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Not IsPostBack Then
        End If
    End Sub

    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        '' Stored procedure membutuhkan 4 parameter: @UserName, @XStartDate, @XEndDate, dan @Action
        'tempTrxEmail.SelectCommand = "exec GetInboxEmailsWithJoin @UserName, @XStartDate, @XEndDate, @Action"
        '' Tambahkan parameter yang diperlukan
        'tempTrxEmail.SelectParameters.Add("UserName", TypeCode.String, HttpContext.Current.User.Identity.Name)
        'tempTrxEmail.SelectParameters.Add("XStartDate", TypeCode.String, DateTime.Now.ToString("yyyy-MM-dd"))
        'tempTrxEmail.SelectParameters.Add("XEndDate", TypeCode.String, DateTime.Now.ToString("yyyy-MM-dd"))
        'tempTrxEmail.SelectParameters.Add("Action", TypeCode.String, "SELECT")
        descweekend = If(chkWeekend.Checked, "True", "False")
        tempTrxEmail.SelectCommand = "exec [BRA_Report_AgentSevices_Level] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "','" & descweekend & "'"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim fileFormat As String = ddList.SelectedValue

        Select Case fileFormat
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("Report_AgentSevices_Level_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("Report_AgentSevices_Level_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("Report_AgentSevices_Level_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("Report_AgentSevices_Level_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("Report_AgentSevices_Level_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub

    Protected Sub DateEditWeekRange_CalendarCustomDisabledEndDate(sender As Object, e As CalendarCustomDisabledDateEventArgs)
        Dim isWeekendEnabled As Boolean = If(Session("AllowWeekend") IsNot Nothing, CBool(Session("AllowWeekend")), False)

        If Not isWeekendEnabled AndAlso (e.Date.DayOfWeek = DayOfWeek.Saturday OrElse e.Date.DayOfWeek = DayOfWeek.Sunday) Then
            e.IsDisabled = True
        Else
            e.IsDisabled = False ' Pastikan semua tanggal aktif jika weekend diaktifkan
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
        Dim queryInsert As String = "exec [BRA_Report_AgentSevices_Level] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "','" & descweekend & "'"
        com = New SqlCommand(queryInsert, con)
        Try
            con.Open()
            com.ExecuteNonQuery()
            con.Close()
        Catch ex As Exception
            Response.Write(DirectCast(ex.Message() & "_exec [BRA_Report_AgentSevices_Level] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
        End Try
        ASPxGridView1.DataBind()
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        descweekend = If(chkWeekend.Checked, "True", "False")
        tempTrxEmail.SelectCommand = "exec [BRA_Report_AgentSevices_Level] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "','" & descweekend & "'"
    End Sub
End Class
