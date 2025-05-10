Imports System
Imports System.Web.UI
Imports System.Data.SqlClient
Public Class Dash_PerformanceAgent
    Inherits System.Web.UI.Page

    Public AddCookiess As String = ConfigurationManager.AppSettings.Item("AddCookiess")

    Dim Proses As New ClsConn
    Dim sqldr, readLDAP, _reading As SqlDataReader
    Dim sql As String
    Dim connString As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    Dim recLDAP As Integer
    Dim recCount As Integer
    Dim _ClassFunction As New WebServiceTransaction
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim VariabelCookiesUsername As New HttpCookie("CookiesUserName")
    Dim leveluser As String

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub
    Function AccessLoginEpic(ByVal UserName As String)
        Dim Login_True As String = ""
        Sql = "exec SP_LOGIN_APPLIKASI_EPIC  '" & UserName & "'"
        Try
            sqldr = Proses.ExecuteReader(Sql)
            If sqldr.HasRows Then
                sqldr.Read()
                leveluser = sqldr("LAYER").ToString
                Session("UserName") = sqldr("UserName").ToString
                Session("lblUserName") = sqldr("UserName").ToString
                Session("UnitKerja") = sqldr("UNITKERJA").ToString
                Session("Org") = sqldr("ORGANIZATION_NAME").ToString
                Session("NameKaryawan") = sqldr("NAME").ToString
                Session("LoginType") = sqldr("LAYER").ToString
                Session("lvluser") = sqldr("LevelUser").ToString
                Session("channel_code") = sqldr("CHANNEL_CODE").ToString
                Session("organization") = sqldr("ORGANIZATION").ToString
                Session("orgSupervisor") = sqldr("ORGANIZATION").ToString
                Session("lokasiPengaduan") = ""
                Session("sessionchat") = sqldr("CHAT").ToString
                Session("unitkerjaagent") = sqldr("IdGrup").ToString
                Session("ROLE") = sqldr("LEVELUSER").ToString
                Session("LEVELUSERID") = sqldr("ROLE_ID").ToString
                Session("LoginTypeAngka") = sqldr("NumberNya").ToString
                Session("_LoginState") = sqldr("LoginState").ToString
                Session("NamaGrup") = sqldr("NamaGrup").ToString
                Session("EscalationIdentity") = sqldr("EscalationIdentity").ToString
                Session("EscalationTo") = sqldr("EscalationTo").ToString
                Session("LevelUserID") = sqldr("LevelUserID").ToString
                Session("EmailAddress") = sqldr("EMAIL_ADDRESS").ToString
                Session("Foto") = sqldr("URL").ToString
                Session("authority") = sqldr("authority").ToString
                Session("SIPuser") = sqldr("authority").ToString
                Session("MultiChatToken") = sqldr("TokenMeta").ToString
                Session("UrlDatakelola") = sqldr("UrlDatakelola").ToString
                Session("CompanyToken") = sqldr("CompanyToken").ToString
                Session("SiteID") = sqldr("SITE_ID").ToString
                Session("USERID") = sqldr("USERID").ToString

                VariabelCookiesUsername.Values("CookiesUserName") = sqldr("UserName").ToString
                VariabelCookiesUsername.Expires = DateTime.Now.AddDays(AddCookiess)
                Response.Cookies.Add(VariabelCookiesUsername)
                Login_True = "YesExist"
            End If
            sqldr.Close()
            _ClassFunction.LogSuccess(strLogTime, Sql)
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, Sql)
            Response.Write(ex.Message)
        End Try
        If Login_True = "YesExist" Then
            Response.Redirect("apps/Crm_Trx_Taskboard.aspx?status=Open")
        Else
        End If
    End Function
End Class