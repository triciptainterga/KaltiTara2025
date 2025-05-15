Imports System
Imports System.Data
Imports System.Data.SqlClient
Public Class QM_Trx_HistoryPenilaian
    Inherits System.Web.UI.Page


    Dim com As SqlCommand
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
    End Sub
    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        Dim queryInsert As String = "exec QM_XtraHistory_Transaksi '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
        com = New SqlCommand(queryInsert, con)
        Try
            con.Open()
            com.ExecuteNonQuery()
            con.Close()
        Catch ex As Exception
            Response.Write(DirectCast(ex.Message() & "_exec QM_XtraHistory_Transaksi '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
        End Try
        ASPxGridView1.DataBind()
    End Sub

    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        If Session("lvluser") = "Agent" Then
            XtraHistoryTransaksi.SelectCommand = "SELECT ROW_NUMBER() OVER(ORDER BY ID DESC) AS NoUrut, '*******' As NamaQA, dbo.udf_StripHTML([keterangan]) as KeteranganNonHtml, * FROM QA_XtraHistory_Transaksi WHERE UserName='" & Session("UserName") & "' and agent='" & Session("UserName") & "'"
        Else
            XtraHistoryTransaksi.SelectCommand = "SELECT ROW_NUMBER() OVER(ORDER BY ID DESC) AS NoUrut, qa_fullname As NamaQA, dbo.udf_StripHTML([keterangan]) as KeteranganNonHtml, * FROM QA_XtraHistory_Transaksi WHERE UserName='" & Session("UserName") & "'"
        End If
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        If Session("lvluser") = "Agent" Then
            XtraHistoryTransaksi.SelectCommand = "SELECT ROW_NUMBER() OVER(ORDER BY ID DESC) AS NoUrut, '*******' As NamaQA, dbo.udf_StripHTML([keterangan]) as KeteranganNonHtml, * FROM QA_XtraHistory_Transaksi WHERE UserName='" & Session("UserName") & "' and agent='" & Session("UserName") & "'"
        Else
            XtraHistoryTransaksi.SelectCommand = "SELECT ROW_NUMBER() OVER(ORDER BY ID DESC) AS NoUrut, qa_fullname As NamaQA, dbo.udf_StripHTML([keterangan]) as KeteranganNonHtml, * FROM QA_XtraHistory_Transaksi WHERE UserName='" & Session("UserName") & "'"
        End If
    End Sub


End Class