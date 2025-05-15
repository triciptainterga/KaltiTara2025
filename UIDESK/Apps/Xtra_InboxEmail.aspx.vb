Imports System
Imports System.Data
Imports System.Data.SqlClient
Public Class Xtra_InboxEmail
    Inherits System.Web.UI.Page

    Dim comm, com, sqlcom, sqlcomTo As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlConnect As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sql As String = String.Empty
    Dim sqldr, read, sqlDtr As SqlDataReader
    Dim execute As New ClsConn
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
        tempTrxEmail.SelectCommand = "exec [GetInboxEmailsWithJoin] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "','SELECT'"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim fileFormat As String = ddList.SelectedValue

        Select Case fileFormat
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("ReportInboxEmail_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("ReportInboxEmail_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("ReportInboxEmail_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("ReportInboxEmail_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("ReportInboxEmail_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub
    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        Dim queryInsert As String = "exec [GetInboxEmailsWithJoin] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "','INSERT'"
        com = New SqlCommand(queryInsert, con)
        com.CommandTimeout = 480
        Try
            con.Open()
            com.ExecuteNonQuery()
            con.Close()
        Catch ex As Exception
            Response.Write(DirectCast(ex.Message() & "_exec [GetInboxEmailsWithJoin] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
        End Try
        ASPxGridView1.DataBind()
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        tempTrxEmail.SelectCommand = "exec [GetInboxEmailsWithJoin] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "','SELECT'"
    End Sub
End Class
