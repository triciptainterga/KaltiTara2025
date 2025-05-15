Imports System.Data.SqlClient
Imports DevExpress.Web

Public Class Xtra_ReportKualitasDetail
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
    Protected Sub chkWeekend_CheckedChanged(sender As Object, e As EventArgs)
        ' Simpan status checkbox di sesi
        Session("AllowWeekend") = DirectCast(sender, ASPxCheckBox).Checked
        ' Refresh komponen kalender
        dt_strdate.DataBind()
        dt_endate.DataBind()
    End Sub
    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        descweekend = If(chkWeekend.Checked, "True", "False")
        Dim queryInsert As String = "exec [BRA_Prod_ReportKualitas_Detail] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "', '" & descweekend & "'"
        com = New SqlCommand(queryInsert, con)
        Try
            con.Open()
            com.ExecuteNonQuery()
            con.Close()

        Catch ex As Exception
            Response.Write(DirectCast(ex.Message() & "_exec [BRA_Prod_ReportKualitas_Detail] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
        End Try
        ASPxGridView1.DataBind()
    End Sub
    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        descweekend = If(chkWeekend.Checked, "True", "False")
        tempTrxStaff.SelectCommand = "exec [BRA_Prod_ReportKualitas_Detail] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "', '" & descweekend & "'"
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        descweekend = If(chkWeekend.Checked, "True", "False")
        tempTrxStaff.SelectCommand = "exec [BRA_Prod_ReportKualitas_Detail] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "', '" & descweekend & "'"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("ReportKualitasDetail_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("ReportKualitasDetail_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("ReportKualitasDetail_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("ReportKualitasDetail_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("ReportKualitasDetail_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "Word"
                ASPxGridViewExporter1.WriteDocxToResponse("ReportKualitasDetail_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub
    Protected Sub ASPxGridViewDetail_BeforePerformDataSelect(sender As Object, e As EventArgs)
        Dim detailGrid As ASPxGridView = CType(sender, ASPxGridView)
        Dim container As GridViewDetailRowTemplateContainer = CType(detailGrid.NamingContainer, GridViewDetailRowTemplateContainer)
        Dim HeaderID As String = container.KeyValue.ToString()

        detailGrid.DataSource = GetDetailByHeaderID(HeaderID)
    End Sub
    Private Function GetDetailByHeaderID(HeaderID As String) As DataTable
        Dim dt As New DataTable()
        Dim connectionString As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString

        Using conn As New SqlConnection(connectionString)
            Using cmd As New SqlCommand("BRA_Prod_ReportKualitas_Interaction", conn)
                cmd.CommandType = CommandType.StoredProcedure
                cmd.Parameters.AddWithValue("@HeaderID", HeaderID)

                Using adapter As New SqlDataAdapter(cmd)
                    adapter.Fill(dt)
                End Using
            End Using
        End Using

        Return dt
    End Function
End Class