Imports System
Imports System.Data
Imports System.Data.SqlClient
Public Class Xtra_Report_Incoming_chat_BOT
    Inherits System.Web.UI.Page

    Dim comm, com, sqlcom, sqlcomTo As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlConnect As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sql As String = String.Empty
    Dim sqldr, read, sqlDtr As SqlDataReader
    Dim execute As New ClsConn
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'tempTrxStaff.SelectCommand = "exec [BRA_Prod_Report_Incoming_chat_BOT] 'Admin','2024-11-09','2024-12-09'"
    End Sub
    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        Dim queryInsert As String = "exec [BRA_Prod_Report_Incoming_chat_BOT] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
        com = New SqlCommand(queryInsert, con)
        Try
            con.Open()
            com.ExecuteNonQuery()
            con.Close()

        Catch ex As Exception
            Response.Write(DirectCast(ex.Message() & "_exec [BRA_Prod_Report_Incoming_chat_BOT] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
        End Try
        ASPxGridView1.DataBind()
    End Sub
    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        tempTrxStaff.SelectCommand = "exec [BRA_Prod_Report_Incoming_chat_BOT] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        tempTrxStaff.SelectCommand = "exec [BRA_Prod_Report_Incoming_chat_BOT] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("ReportSPADaily_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("ReportSPADaily_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("ReportSPADaily_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("ReportSPADaily_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("ReportSPADaily_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "Word"
                ASPxGridViewExporter1.WriteDocxToResponse("ReportSPADaily_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub

End Class