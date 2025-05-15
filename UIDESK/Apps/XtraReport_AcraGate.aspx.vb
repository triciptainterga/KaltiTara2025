Imports System
Imports System.Data
Imports System.Data.SqlClient
Public Class XtraReport_AcraGate
    Inherits System.Web.UI.Page

    Dim com As SqlCommand
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        XtraTransaksi.SelectCommand = "exec QM_BRIGate_Table '" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
        ASPxGridView1.DataBind()
    End Sub
    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        'Dim queryInsert As String = "exec QM_BRIGate_Table '" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
        'com = New SqlCommand(queryInsert, con)
        'Try
        '    con.Open()
        '    com.ExecuteNonQuery()
        '    con.Close()
        'Catch ex As Exception
        '    Response.Write(DirectCast(ex.Message() & "_exec QM_BRIGate_Table '" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
        'End Try
        XtraTransaksi.SelectCommand = "exec QM_BRIGate_Table '" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
        ASPxGridView1.DataBind()
    End Sub
    Private Sub dt_strdate_Init(sender As Object, e As EventArgs) Handles dt_strdate.Init
        dt_strdate.Value = DateTime.Now
    End Sub
    Private Sub dt_endate_Init(sender As Object, e As EventArgs) Handles dt_endate.Init
        dt_endate.Value = DateTime.Now
    End Sub
    'Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
    '    XtraTransaksi.SelectCommand = "exec QM_BRIGate_Table '" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
    'End Sub
    'Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
    '    XtraTransaksi.SelectCommand = "exec QM_BRIGate_Table '" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
    'End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("TableTransaksiAcra_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("TableTransaksiAcra_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("TableTransaksiAcra_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("TableTransaksiAcra_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("TableTransaksiAcra_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub

End Class