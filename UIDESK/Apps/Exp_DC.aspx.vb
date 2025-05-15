Public Class Exp_DC
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub
    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        DSource.SelectCommand = "exec BRA_ExportCustomer"
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        DSource.SelectCommand = "exec BRA_ExportCustomer"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("DC_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("DC_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("DC_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("DC_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("DC_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "Word"
                ASPxGridViewExporter1.WriteDocxToResponse("DC_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub
End Class