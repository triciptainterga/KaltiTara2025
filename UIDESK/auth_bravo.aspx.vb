Imports System
Imports System.Web.UI
Imports System.Data.SqlClient
Imports Microsoft.VisualBasic
Public Class auth_bravo
    Inherits System.Web.UI.Page

    Public AddCookiess As String = ConfigurationManager.AppSettings.Item("AddCookiess")

    Dim Proses As New ClsConn
    Dim sqldr, readLDAP, _reading As SqlDataReader
    Dim sql As String
    Dim valuesatu As Integer = 1
    Dim valuedua As Integer = 2
    Dim valuetiga As Integer = 3
    Dim ValueEmpat As Integer = 4
    Dim valueLima As Integer = 5
    Dim valueTest As Integer = 10

    Dim valueDispatchLayer2 As Integer = 2
    Dim valueDispatchLayer3 As Integer = 3
    Dim valueReassignLayer1 As Integer = 1

    Dim leveluser As String
    Dim value As String
    Dim CountLDAP As String = String.Empty
    Dim Con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlconaux As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim com, sqlcom, sqlcomaux As SqlCommand

    Dim connString As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    Dim recLDAP As Integer
    Dim recCount As Integer
    Dim _ClassFunction As New WebServiceTransaction
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim _ClassAux As New Crm_Trx_Login
    Dim VariabelCookiesUsername As New HttpCookie("CookiesUserName")
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

End Class