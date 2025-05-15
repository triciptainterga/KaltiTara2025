Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports System.Globalization
Public Class QA_ReportPetugasQA
    Inherits System.Web.UI.Page

    Dim com As SqlCommand
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim _ClassFunction As New WebServiceTransaction
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim StarDateNya As String = DateTime.Now.ToString("yyyy-MM-dd")
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        DataSourceTypeQA.SelectCommand = "Exec QM_TypeQA"
        'If Request.QueryString("Xtra") = "1" Then
        '    If Not IsPostBack Then
        '        Dim StarDateNya As DateTime = DateTime.ParseExact(Request.QueryString("st"), "yyyy-MM-dd", CultureInfo.InvariantCulture)
        '        Dim d As DateTime = DateTime.ParseExact(Request.QueryString("dateTime"), "dd/MM/yyyy", CultureInfo.InvariantCulture)
        '        dt_strdate.Value = Request.QueryString("st")
        '        dt_endate.Value = Request.QueryString("dt")
        '        ComboTypeQA.Value = Request.QueryString("type")
        '        ASPxGridView1.DataSource = GetDataTable("exec Report_Monthly '0','0','Petugas QA','" & ComboTypeQA.Value & "','','" & dt_strdate.Value & "','" & dt_endate.Value & "'", CommandType.Text)
        '        ASPxGridView1.DataBind()
        '    End If
        'Else
        'End If
    End Sub
    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        Dim queryInsert As String = "exec QM_XtraReport_PetugasQA '" & Session("UserName") & "','" & ComboTypeQA.Value & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
        com = New SqlCommand(queryInsert, con)
        Try
            con.Open()
            com.ExecuteNonQuery()
            con.Close()
            _ClassFunction.LogSuccess(strLogTime, queryInsert)
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, queryInsert)
            Response.Write(DirectCast(ex.Message() & "_exec QM_XtraReport_PetugasQA '" & Session("UserName") & "','" & ComboTypeQA.Value & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
        End Try
        ASPxGridView1.DataBind()
        'Response.Redirect("XtraReport_Petugas_QA.aspx?Xtra=1&st=" & dt_strdate.Value & "&dt=" & dt_endate.Value & "&type=" & ComboTypeQA.Value & "")
    End Sub
    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        XtraPetugasQA.SelectCommand = "SELECT ROW_NUMBER() OVER(ORDER BY ID DESC) AS NoUrut, dbo.udf_StripHTML([KesimpulanSaran]) as KesimpulanSaranNonHtml, * FROM QA_XtraReport_PetugasQA WHERE UserName='" & Session("UserName") & "' and CreatedDate between '" & Format(dt_strdate.Value, "yyyy-MM-dd") & " 00:00:00'  and '" & Format(dt_endate.Value, "yyyy-MM-dd") & " 23:00:00'"
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        XtraPetugasQA.SelectCommand = "SELECT ROW_NUMBER() OVER(ORDER BY ID DESC) AS NoUrut, dbo.udf_StripHTML([KesimpulanSaran]) as KesimpulanSaranNonHtml, * FROM QA_XtraReport_PetugasQA WHERE UserName='" & Session("UserName") & "' and CreatedDate between '" & Format(dt_strdate.Value, "yyyy-MM-dd") & " 00:00:00'  and '" & Format(dt_endate.Value, "yyyy-MM-dd") & " 23:00:00'"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("XtraReportPetugasQA_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("XtraReportPetugasQA_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("XtraReportPetugasQA_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("XtraReportPetugasQA_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("XtraReportPetugasQA_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub
    Private Sub dt_strdate_Init(sender As Object, e As EventArgs) Handles dt_strdate.Init
        dt_strdate.Value = DateTime.Now
    End Sub
    Private Sub dt_endate_Init(sender As Object, e As EventArgs) Handles dt_endate.Init
        dt_endate.Value = DateTime.Now
    End Sub
    Private Function GetDataTable(query As String, commandType As CommandType) As DataTable
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Using con As New SqlConnection(constr)
            Using cmd As New SqlCommand(query)
                Using sda As New SqlDataAdapter()
                    cmd.CommandType = commandType
                    cmd.Connection = con
                    sda.SelectCommand = cmd
                    Using dt As New DataTable()
                        sda.Fill(dt)
                        Return dt
                    End Using
                End Using
            End Using
        End Using
    End Function

End Class