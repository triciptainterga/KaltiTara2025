Imports System
Imports System.Data
Imports System.Data.SqlClient
Public Class PerusahaanDynamic
    Inherits System.Web.UI.Page

    Dim comm, com, sqlcom, sqlcomTo As SqlCommand
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sql As String = String.Empty
    Dim sqldr, read, sqlDtr As SqlDataReader
    Dim execute As New ClsConn
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub
    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        tempCustomer.SelectCommand = "SELECT * FROM BRA_Nama_Perusahaan ORDER BY Nama_Perusahaan ASC"
    End Sub

    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        tempCustomer.SelectCommand = "SELECT * FROM BRA_Nama_Perusahaan ORDER BY Nama_Perusahaan ASC"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("PerusahaanDynamic_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("PerusahaanDynamic_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("PerusahaanDynamic_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("PerusahaanDynamic_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("PerusahaanDynamic_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub
End Class