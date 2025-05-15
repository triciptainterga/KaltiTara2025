Imports DevExpress.Web
Imports System.Data.SqlClient

Public Class ReportDinamisHeader
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Not IsPostBack Then
            BindGridView()
        End If
    End Sub

    Private Sub BindGridView()
        ' Koneksi ke database

        Dim connection As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnectionProd").ConnectionString)

        ' Query SQL
        Dim query As String = "EXEC BRA_PROD_AdherencetoSchedule_Summary" ' Ganti dengan query atau stored procedure Anda

        ' Eksekusi query
        Dim command As New SqlCommand(query, connection)
        Dim dataAdapter As New SqlDataAdapter(command)
        Dim dataTable As New DataTable()

        Try
            connection.Open()
            dataAdapter.Fill(dataTable)
        Catch ex As Exception
            ' Handle error
            Throw ex
        Finally
            connection.Close()
        End Try

        ' Binding ke ASPxGridView
        ASPxGridView1.DataSource = dataTable
        ASPxGridView1.DataBind()
    End Sub

End Class