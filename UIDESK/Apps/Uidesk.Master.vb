Imports System
Imports System.IO
Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.UI
Imports System.Security.Cryptography
Public Class Uidesk
    Inherits System.Web.UI.MasterPage

    Dim _ClassFunction As New WebServiceTransaction
    Dim _sqlconn, _sqlconnect, _sqlconnections, _sqlconnAdditional As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim connstring1 As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    Dim connstring2 As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    Dim connstring3 As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    Dim connstring4 As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    Dim _read, _reader, _reading, _sqlreader As SqlDataReader
    Dim _sqlcomm, _sqlcommands, _sqlcommander As SqlCommand
    Dim _strsql, _strselect, _strsqlselect As String
    Dim _write As String
    'Dim _ClassAux As New TrmAux
    Dim Proses As New ClsConn

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim TrxCookiesUserName As String = String.Empty
        Dim VariabelCookiesUsername As HttpCookie = HttpContext.Current.Request.Cookies("CookiesUserName")
        TrxCookiesUserName = If(VariabelCookiesUsername IsNot Nothing, VariabelCookiesUsername.Value.Split("="c)(1), "undefined")
        If TrxCookiesUserName = "undefined" Then
            Response.Redirect("~/auth_login.aspx")
        Else
            _PageSession()
            ''_PageMastering()
            'GenerateMenu()
            _LeftMasterSide()
            Dim MidCurrentPage As String = System.IO.Path.GetFileName(Request.Url.AbsolutePath)
            If Request.QueryString("mid") Is Nothing Then
                'Response.Write("currentPage " + MidCurrentPage)
                If Session("lvluser") = "Layer 1" Then
                    Dim strSqlChannel As String = "SELECT * FROM USER_SettingChannel Where UserName='" & Session("UserName") & "' And Url='" & MidCurrentPage & "'"
                    Try
                        _sqlreader = Proses.ExecuteReader(strSqlChannel)
                        If _sqlreader.HasRows Then
                            _sqlreader.Read()
                        Else
                            _ClassFunction.LogSuccess(Session("UserName"), strSqlChannel)
                            Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                            Try
                                _sqlreader = Proses.ExecuteReader(strSql)
                                If _sqlreader.HasRows Then
                                    _sqlreader.Read()
                                Else
                                    _ClassFunction.LogSuccess(Session("UserName"), strSql)
                                    RemoveCookies()
                                    Response.Redirect("error-500-cover.html")
                                End If
                                _sqlreader.Close()
                            Catch ex As Exception
                                Response.Write(ex.Message)
                            End Try
                        End If
                        _sqlreader.Close()
                    Catch ex As Exception
                        Response.Write(ex.Message)
                    End Try
                Else
                    Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                    Try
                        _sqlreader = Proses.ExecuteReader(strSql)
                        If _sqlreader.HasRows Then
                            _sqlreader.Read()
                        Else
                            _ClassFunction.LogSuccess(Session("UserName"), strSql)
                            RemoveCookies()
                            Response.Redirect("~/auth_login.aspx")
                        End If
                        _sqlreader.Close()
                    Catch ex As Exception
                        Response.Write(ex.Message)
                    End Try
                End If
            Else
                If Session("lvluser") = "Layer 1" Then
                    Dim strSqlChannel As String = "SELECT * FROM USER_SettingChannel Where UserName='" & Session("UserName") & "' And Url='" & MidCurrentPage & "'"
                    Try
                        _sqlreader = Proses.ExecuteReader(strSqlChannel)
                        If _sqlreader.HasRows Then
                            _sqlreader.Read()
                            _ClassFunction.LogSuccess(Session("UserName"), strSqlChannel)
                        Else
                            _ClassFunction.LogSuccess(Session("UserName"), strSqlChannel)
                            Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                            Try
                                _sqlreader = Proses.ExecuteReader(strSql)
                                If _sqlreader.HasRows Then
                                    _sqlreader.Read()
                                Else
                                    _ClassFunction.LogSuccess(Session("UserName"), strSql)
                                    RemoveCookies()
                                    Response.Redirect("~/auth_login.aspx")
                                End If
                                _sqlreader.Close()
                            Catch ex As Exception
                                Response.Write(ex.Message)
                            End Try
                        End If
                        _sqlreader.Close()
                    Catch ex As Exception
                        Response.Write(ex.Message)
                    End Try
                Else
                    Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                    Try
                        _sqlreader = Proses.ExecuteReader(strSql)
                        If _sqlreader.HasRows Then
                            _sqlreader.Read()
                        Else
                            _ClassFunction.LogSuccess(Session("UserName"), strSql)
                            RemoveCookies()
                            Response.Redirect("~/auth_login.aspx")
                        End If
                        _sqlreader.Close()
                    Catch ex As Exception
                        Response.Write(ex.Message)
                    End Try
                End If
            End If
        End If
        'If Session("UserName") = "" Then
        '    Response.Redirect("../auth_login.aspx")
        'Else
        '    _PageSession()
        '    _PageMastering()
        'End If
    End Sub
    Private Sub _PageMastering()
        Dim _additionalQuery As String = "SELECT DISTINCT User0.* FROM User0 INNER JOIN USER4 ON User0.System = USER4.CoreSystem WHERE LevelUserID='" & Session("LevelUserID") & "'"
        Dim _additionalCommand As New SqlCommand(_additionalQuery, _sqlconnAdditional)
        _sqlconnAdditional.Open()
        Dim _additionalReader As SqlDataReader = _additionalCommand.ExecuteReader()
        While _additionalReader.Read

            Dim _strsql As String = "GetMenuData"
            _sqlcomm = New SqlCommand(_strsql, _sqlconn)
            _sqlcomm.CommandType = CommandType.StoredProcedure
            _sqlcomm.Parameters.AddWithValue("@LevelUserID", Session("LevelUserID"))
            _sqlcomm.Parameters.AddWithValue("@System", _additionalReader("System").ToString)

            _sqlconn.Open()
            _read = _sqlcomm.ExecuteReader()
            _write &= "<ul class='metismenu list-unstyled' id='side-menu'><li class='menu-title' data-key='t-" & _additionalReader("SystemName").ToString & "'>" & _additionalReader("SystemName").ToString & "</li>"
            While _read.Read
                Dim _IclassRead As String = If(_read("Activity") = "N", "class='has-arrow'", "")
                Dim Parameter As String = If(_read("DivID") = "1", "&mid=" & _read("MenuID").ToString, "?mid=" & _read("MenuID").ToString)
                Dim Urlpaging As String = If(_read("Url").ToString = "", "javascript:void(0);", _read("Url").ToString & Parameter)
                Dim Onclicking As String = If(_read("Url").ToString = "", "", "onclick=directPage('" & _read("Url").ToString & "')")

                _write &= "<li><a " & Onclicking & " " & _IclassRead & " style='cursor:pointer;'> " &
                          "<i class='icon nav-icon' data-feather='" & _read("icon").ToString & "'></i> " &
                          "<span class='menu-item' data-key='t-sales'>" & _read("MenuName").ToString & "</span></a>"

                Dim _strselect As String = "GetSubMenuData"
                _sqlcommands = New SqlCommand(_strselect, _sqlconnect)
                _sqlcommands.CommandType = CommandType.StoredProcedure
                _sqlcommands.Parameters.AddWithValue("@LevelUserID", Session("LevelUserID"))
                _sqlcommands.Parameters.AddWithValue("@MenuID", _read("MenuID").ToString)
                _sqlcommands.Parameters.AddWithValue("@System", _read("System").ToString)

                _sqlconnect.Open()
                _reader = _sqlcommands.ExecuteReader()
                _write &= "<ul class='sub-menu'>"

                While _reader.Read
                    Dim _Iclass As String = If(_reader("Param") = "Y", "class='has-arrow'", "")
                    Dim Onclicking2 As String = If(_reader("Param") = "Y", "", "onclick=directPage('" & _reader("Url").ToString & "')")
                    Dim Parameter2 As String = If(_read("MenuID").ToString <> "3026" AndAlso _reader("DivID").ToString = "0", "?mid=" & _reader("MenuID").ToString, "&mid=" & _reader("MenuID").ToString)

                    _write &= "<li><a " & Onclicking2 & " " & _Iclass & " style='cursor:pointer;' data-key='t-font-awesome'>" & _reader("SubMenuName") & "</a></li>"

                    Dim _strsqlselect As String = If(Session("lvluser") = "Layer 1",
                        "SELECT distinct USER_SettingChannel.UserName, USER_SettingChannel.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree, user3.MenuTreeName, User3.Url FROM USER_SettingChannel left outer join user3 on.user3.SubMenuID=USER_SettingChannel.SubMenuID left outer join user2 on.USER_SettingChannel.SubMenuID = user2.SubMenuID left outer join User1 on USER_SettingChannel.MenuID = user1.MenuID where user3.SubMenuID='" & _reader("SubMenuID").ToString & "' and USER_SettingChannel.UserName='" & Session("UserName") & "'",
                        "SELECT distinct user4.UserID, user4.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree, user3.MenuTreeName, User3.Url, User3.DivID from user4 left outer join user3 on.user3.SubMenuID=user4.SubMenuID left outer join user2 on.user4.SubMenuID = user2.SubMenuID left outer join User1 on user4.MenuID = user1.MenuID where user3.SubMenuID='" & _reader("SubMenuID").ToString & "' and user4.leveluserid='" & Session("LevelUserID") & "' And user4.Access='1'"
                        )

                    _sqlcommander = New SqlCommand(_strsqlselect, _sqlconnections)
                    _sqlconnections.Open()
                    _reading = _sqlcommander.ExecuteReader()
                    _write &= "<ul class='sub-menu'>"
                    While _reading.Read

                        _write &= "<li><a href=" & _reading("Url").ToString & "?mid=" & _reading("MenuID").ToString & "><i class='ti-more'></i>" & _reading("MenuTreeName").ToString & "</a></li>"

                    End While
                    _reading.Close()
                    _sqlconnections.Close()
                    _write &= "</ul>"

                End While
                _reader.Close()
                _sqlconnect.Close()
                _write &= "</ul>"
                aspxLiteral.Text = _write

            End While
            _read.Close()
            _sqlconn.Close()
            _write &= "</li></ul>"

        End While
        _additionalReader.Close()
        _sqlconnAdditional.Close()

        'Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        'Try
        '    Using con As New SqlConnection(constr)
        '        Dim sqlComm As New SqlCommand()
        '        sqlComm.Connection = con
        '        sqlComm.CommandText = "Uidesk_LifeSideBar"
        '        sqlComm.CommandType = CommandType.StoredProcedure
        '        sqlComm.Parameters.AddWithValue("Response", aspxLiteral.Text)
        '        con.Open()
        '        sqlComm.ExecuteNonQuery()
        '        con.Close()
        '    End Using
        'Catch ex As Exception

        'End Try
    End Sub

    'Private Sub _PageMastering()
    '    Dim _additionalQuery As String = "SELECT * FROM User0"
    '    Dim _additionalCommand As New SqlCommand(_additionalQuery, _sqlconnAdditional)
    '    _sqlconnAdditional.Open()
    '    Dim _additionalReader As SqlDataReader = _additionalCommand.ExecuteReader()
    '    While _additionalReader.Read
    '        _strsql = "select User0.SystemName, user1.Number, MenuName, user1.Url, user1.Icon, user1.DivID, user1.Activity, user4.MenuID from user4 " &
    '              "left outer join User1 on user4.MenuID = user1.MenuID " &
    '              "left outer join User0 on user1.CoreSystem = User0.System " &
    '              "where user4.leveluserid='" & Session("LevelUserID") & "' AND User4.CoreSystem='" & _additionalReader("System") & "' And user4.Access='1'" &
    '              "group by User0.SystemName, MenuName, user4.MenuID, Number, user1.url, user1.Icon, user1.DivID, user1.Activity " &
    '              "order by user1.number asc"
    '        _sqlcomm = New SqlCommand(_strsql, _sqlconn)
    '        _sqlconn.Open()
    '        _read = _sqlcomm.ExecuteReader()
    '        _write &= "<ul class='metismenu list-unstyled' id='side-menu'><li class='menu-title' data-key='t-dashboards'>" & _additionalReader("SystemName").ToString & "</li>"
    '        While _read.Read
    '            Dim _IclassRead As String = ""
    '            If _read("Activity") = "N" Then
    '                _IclassRead = "class='has-arrow'"
    '            Else
    '                _IclassRead = ""
    '            End If
    '            Dim Parameter As String = String.Empty
    '            Dim Urlpaging As String = String.Empty
    '            Dim Onclicking As String = String.Empty
    '            If _read("DivID") = "1" Then
    '                Parameter = "&mid=" & _read("MenuID").ToString & ""
    '            Else
    '                Parameter = "?mid=" & _read("MenuID").ToString & ""
    '            End If
    '            If _read("Url").ToString = "" Then
    '                Urlpaging = "javascript:void(0);"
    '                Onclicking = ""
    '            Else
    '                Urlpaging = _read("Url").ToString & Parameter
    '                Onclicking = "onclick=directPage('" & _read("Url").ToString & "')"
    '            End If
    '            _write &= "<li><a " & Onclicking & " " & _IclassRead & " style='cursor:pointer;'> " &
    '                                "<i class='icon nav-icon' data-feather='" & _read("icon").ToString & "'></i> " &
    '                                "<span class='menu-item' data-key='t-sales'>" & _read("MenuName").ToString & "</span>" &
    '                            "</a>"
    '            If Session("lvluser") = "Layer 1" Then
    '                If _read("MenuID").ToString = "3026" Then
    '                    _strselect = "SELECT *, DetailMenuName as MenuTreeName FROM USER_SettingChannel where UserName='" & Session("UserName") & "' And DetailMenuName IS NULL"
    '                Else
    '                    _strselect = "SELECT distinct user4.MenuID, user4.SubMenuID, user2.SubMenuName, User2.Url, user2.Param, user2.Activity, " &
    '                        "User2.DivID FROM USER4 INNER JOIN User2 ON USER4.SubMenuID = USER2.SubMenuID " &
    '                        "INNER JOIN User1 ON USER4.MenuID = USER1.MenuID " &
    '                        "WHERE USER4.leveluserid='" & Session("LevelUserID") & "' AND USER4.MenuID='" & _read("MenuID") & "'  AND User4.CoreSystem='" & _additionalReader("System") & "' And user4.Access='1' order by menuid asc"
    '                End If
    '            Else
    '                _strselect = "SELECT distinct user4.MenuID, user4.SubMenuID, user2.SubMenuName, User2.Url, user2.Param, user2.Activity, " &
    '                        "User2.DivID FROM USER4 INNER JOIN User2 ON USER4.SubMenuID = USER2.SubMenuID " &
    '                        "INNER JOIN User1 ON USER4.MenuID = USER1.MenuID " &
    '                        "WHERE USER4.leveluserid='" & Session("LevelUserID") & "' AND USER4.MenuID='" & _read("MenuID") & "' AND User4.CoreSystem='" & _additionalReader("System") & "' And user4.Access='1' order by menuid asc"
    '            End If
    '            _sqlcommands = New SqlCommand(_strselect, _sqlconnect)
    '            _sqlconnect.Open()
    '            _reader = _sqlcommands.ExecuteReader()
    '            _write &= "<ul class='sub-menu'>"
    '            While _reader.Read

    '                Dim _Iclass As String = ""
    '                Dim Onclicking2 As String = String.Empty
    '                If _reader("Param") = "Y" Then
    '                    _Iclass = "class='has-arrow'"
    '                    Onclicking2 = ""
    '                Else
    '                    _Iclass = ""
    '                    Onclicking2 = "onclick=directPage('" & _reader("Url").ToString & "')"
    '                End If
    '                Dim Parameter2 As String = String.Empty
    '                If _read("MenuID").ToString <> "3026" Then
    '                    If _reader("DivID").ToString = "0" Then
    '                        Parameter2 = "?mid=" & _reader("MenuID").ToString & ""
    '                    Else
    '                        Parameter2 = "&mid=" & _reader("MenuID").ToString & ""
    '                    End If
    '                Else
    '                    Parameter2 = "&mid=" & _reader("MenuID").ToString & ""
    '                End If
    '                _write &= "<li><a " & Onclicking2 & " " & _Iclass & " style='cursor:pointer;' data-key='t-font-awesome'>" & _reader("SubMenuName") & "</a>"

    '                If Session("lvluser") = "Layer 1" Then
    '                    _strsqlselect = "SELECT distinct USER_SettingChannel.UserName, USER_SettingChannel.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree," &
    '                                    "user3.MenuTreeName, User3.Url FROM USER_SettingChannel " &
    '                                    "left outer join " &
    '                                    "user3 on.user3.SubMenuID=USER_SettingChannel.SubMenuID left outer join user2 on.USER_SettingChannel.SubMenuID = user2.SubMenuID " &
    '                                    "left outer join User1 on USER_SettingChannel.MenuID = user1.MenuID " &
    '                                    "where user3.SubMenuID='" & _reader("SubMenuID") & "' and USER_SettingChannel.UserName='" & Session("UserName") & "' "
    '                    '"where user3.SubMenuID='" & _reader("SubMenuID") & "' and USER_SettingChannel.UserName='Agent1' "
    '                    '_strsqlselect = "SELECT *, DetailMenuName as MenuTreeName FROM USER_SettingChannel where UserName='" & Session("UserName") & "' And SubMenuID='" & _reader("SubMenuID") & "' And DetailMenuName IS NOT NULL"
    '                Else
    '                    _strsqlselect = "select distinct user4.UserID, user4.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree, " &
    '                                "user3.MenuTreeName, User3.Url, User3.DivID " &
    '                                "from user4 left outer join " &
    '                                "user3 on.user3.SubMenuID=user4.SubMenuID left outer join user2 on.user4.SubMenuID = user2.SubMenuID " &
    '                                "left outer join User1 on user4.MenuID = user1.MenuID " &
    '                                "where user3.SubMenuID='" & _reader("SubMenuID").ToString & "' and user4.leveluserid='" & Session("LevelUserID") & "' And user4.Access='1'"
    '                End If

    '                _sqlcommander = New SqlCommand(_strsqlselect, _sqlconnections)
    '                _sqlconnections.Open()
    '                _reading = _sqlcommander.ExecuteReader()
    '                _write &= "<ul class='sub-menu'>"
    '                While _reading.Read
    '                    _write &= "<li>" &
    '                                "<a href=" & _reading("Url").ToString & "?mid=" & _reading("MenuID").ToString & "><i class='ti-more'></i>" & _reading("MenuTreeName").ToString & "</a>" &
    '                              "</li>"
    '                End While
    '                _reading.Close()
    '                _sqlconnections.Close()
    '                _write &= "</ul>"

    '            End While
    '            _reader.Close()
    '            _sqlconnect.Close()
    '            _write &= "</li></ul>"

    '        End While
    '        _read.Close()
    '        _sqlconn.Close()
    '        _write &= "</li></ul>"

    '    End While
    '    _additionalReader.Close()
    '    _sqlconnAdditional.Close()
    '    _write &= "</li></ul>"
    '    aspxLiteral.Text = _write
    'End Sub
    Private Sub _PageSession()
        hd_sessionLogin.Value = Session("UserName")
        TrxLoginTypeAngka.Value = Session("LoginTypeAngka")
        TrxLayerUser.Value = Session("LoginType")
        TrxDivisi.Value = Session("organization")
        hd_OtherSystem.Value = Guid.NewGuid.ToString().Replace("-", "").Substring(0, 10)
        hd_ThreadSystem.Value = Guid.NewGuid.ToString().Replace("-", "").Substring(0, 10)
        hd_AccountChannelUser.Value = "AccountChannel"
        hd_AccountContactUser.Value = "ContactChannel"
        hd_EscalationIdentity.Value = Session("EscalationIdentity")
        hd_EscalationTo.Value = Session("EscalationTo")
        hd_NameKaryawan.Value = Session("NameKaryawan")
        hd_LevelUser.Value = Session("lvluser")
        hd_EmailUserLogin.Value = Session("EmailAddress")
        SM_AccountID.Value = Session("accountid")
        SM_AccountName.Value = Session("accountname")
        SM_AccountToken.Value = Session("token")
        SM_AccountURL.Value = Session("accounturl")
        SM_Webhook.Value = Session("webhookurl")
        QM_LevelUser.Value = Session("lvluser")
        QM_GroupQA.Value = Session("organization")
        QM_GroupAgent.Value = Session("UnitKerja")
        QM_TypeCall.Value = Session("Org")
        QM_GroupLayanan.Value = Session("NamaGrup")
        HD_CookiesVariabel.Value = Session("authority")
        hd_SIP.Value = Session("SIPuser")
        SM_MultiChatToken.Value = Session("MultiChatToken")
        SM_UrlDatakelola.Value = Session("UrlDatakelola")
        SM_CompanyToken.Value = Session("CompanyToken")
        HD_SiteID.Value = Session("SiteID")
        hd_AgentScheduleID.Value = Session("USERID")
        'QM_TeamLayanan.Value = Session("LayananTeam")
        'If Session("Foto") = "" Then
        '    ImageFoto.Src = "../images/avatar/7.jpg"
        'Else
        '    ImageFoto.Src = "../FileFoto/" & Session("Foto")
        'End If
    End Sub
    Private Sub RemoveCookies()
        Dim nameCookie As HttpCookie = Request.Cookies("CookiesUserName")
        nameCookie.Expires = DateTime.Now.AddDays(-1)
        Response.Cookies.Add(nameCookie)
        Session.RemoveAll()
    End Sub
    Public Sub GenerateMenu()
        If Session("LevelUserID") = "" Then
            Response.Redirect("~/auth_login.aspx")
        Else
            Dim _write As New StringBuilder()
            Dim _additionalQuery As String = "SELECT DISTINCT User0.* FROM User0 INNER JOIN USER4 ON User0.System = USER4.CoreSystem WHERE LevelUserID=@LevelUserID ORDER BY SystemNumber ASC"
            Using _sqlconnAdditional As New SqlConnection(connstring1),
                  _additionalCommand As New SqlCommand(_additionalQuery, _sqlconnAdditional)
                _additionalCommand.Parameters.AddWithValue("@LevelUserID", Session("LevelUserID"))
                _sqlconnAdditional.Open()
                Using _additionalReader As SqlDataReader = _additionalCommand.ExecuteReader()
                    While _additionalReader.Read()
                        Dim system As String = _additionalReader("System").ToString()
                        Dim systemName As String = _additionalReader("SystemName").ToString()

                        _write.Append("<ul class='metismenu list-unstyled' id='side-menu'><li class='menu-title' data-key='t-")
                        _write.Append(systemName)
                        _write.Append("'>")
                        _write.Append(systemName)
                        _write.Append("</li>")

                        GetMenuData(_write, system)

                        _write.Append("</ul>")
                    End While
                End Using
            End Using
            aspxLiteral.Text = _write.ToString()
        End If
    End Sub
    Private Sub GetMenuData(ByRef _write As StringBuilder, ByVal system As String)
        Dim _strsql As String = "GetMenuData"
        Using _sqlconn As New SqlConnection(connstring2),
              _sqlcomm As New SqlCommand(_strsql, _sqlconn)
            _sqlcomm.CommandType = CommandType.StoredProcedure
            _sqlcomm.Parameters.AddWithValue("@LevelUserID", Session("LevelUserID"))
            _sqlcomm.Parameters.AddWithValue("@System", system)
            _sqlconn.Open()
            Using _read As SqlDataReader = _sqlcomm.ExecuteReader()
                While _read.Read()
                    Dim menuID As String = _read("MenuID").ToString()
                    Dim menuName As String = _read("MenuName").ToString()
                    Dim activity As String = _read("Activity").ToString()
                    Dim icon As String = _read("icon").ToString()
                    Dim url As String = _read("Url").ToString()
                    Dim divID As String = _read("DivID").ToString()

                    Dim collapseID As String = "collapseMenu" & menuID
                    ' Deklarasikan variabel untuk menyimpan class berdasarkan nilai activity
                    Dim _IclassRead As String
                    If activity = "N" Then
                        _IclassRead = "class='has-arrow'"
                    Else
                        _IclassRead = ""
                    End If

                    ' Deklarasikan variabel untuk menyimpan parameter berdasarkan nilai divID
                    Dim parameter As String
                    If divID = "1" Then
                        parameter = "&mid=" & menuID
                    Else
                        parameter = "?mid=" & menuID
                    End If

                    ' Deklarasikan variabel untuk menyimpan URL dengan paging
                    Dim urlPaging As String
                    If String.IsNullOrEmpty(url) Then
                        urlPaging = "javascript:void(0);"
                    Else
                        urlPaging = url & parameter
                    End If

                    ' Deklarasikan variabel untuk menyimpan atribut onclick
                    Dim onClicking As String
                    If String.IsNullOrEmpty(url) Then
                        onClicking = ""
                    Else
                        onClicking = "onclick=directPage('" & urlPaging & "')"
                    End If

                    _write.Append("<li class='")
                    _write.Append(If(activity = "Y", "has-submenu", ""))
                    _write.Append("'><a ")

                    ' Jika URL tidak kosong, gunakan URL dan onclick untuk direct
                    If Not String.IsNullOrEmpty(url) Then
                        _write.Append("href='")
                        _write.Append(urlPaging)
                        _write.Append("' ")
                        _write.Append(onClicking)
                    Else
                        ' Jika URL kosong, gunakan fungsi collapse
                        _write.Append("href='#")
                        _write.Append(collapseID)
                        _write.Append("' data-bs-toggle='collapse' aria-expanded='false' ")
                        _write.Append(_IclassRead)
                    End If

                    _write.Append(" style='cursor:pointer;'><i class='icon nav-icon' data-feather='")
                    _write.Append(icon)
                    _write.Append("'></i><span class='menu-item' data-key='t-sales'>")
                    _write.Append(menuName)
                    _write.Append("</span></a>")

                    ' Submenu hanya ditampilkan jika URL kosong (collapse)
                    If String.IsNullOrEmpty(url) Then
                        _write.Append("<ul class='collapse list-unstyled' id='")
                        _write.Append(collapseID)
                        _write.Append("'>")

                        GetSubMenuData(_write, system, menuID)

                        _write.Append("</ul>")
                    End If

                    _write.Append("</li>")

                End While
            End Using
        End Using
    End Sub
    Private Sub GetSubMenuData(ByRef _write As StringBuilder, ByVal system As String, ByVal menuID As String)
        Dim _strselect As String = "GetSubMenuData"
        Using _sqlconnect As New SqlConnection(connstring3),
          _sqlcommands As New SqlCommand(_strselect, _sqlconnect)
            _sqlcommands.CommandType = CommandType.StoredProcedure
            _sqlcommands.Parameters.AddWithValue("@LevelUserID", Session("LevelUserID"))
            _sqlcommands.Parameters.AddWithValue("@MenuID", menuID)
            _sqlcommands.Parameters.AddWithValue("@System", system)
            _sqlconnect.Open()
            Using _reader As SqlDataReader = _sqlcommands.ExecuteReader()
                While _reader.Read()
                    Dim subMenuID As String = _reader("SubMenuID").ToString()
                    Dim subMenuName As String = _reader("SubMenuName").ToString()
                    Dim param As String = _reader("Param").ToString()
                    Dim divID As String = _reader("DivID").ToString()
                    Dim subUrl As String = _reader("Url").ToString()

                    ' Log untuk debugging
                    Debug.WriteLine("SubMenuID: " & subMenuID)
                    Debug.WriteLine("SubMenuName: " & subMenuName)
                    Debug.WriteLine("Param: " & param)
                    Debug.WriteLine("DivID: " & divID)
                    Debug.WriteLine("SubUrl: " & subUrl)

                    Dim _Iclass As String = If(param = "Y", "class='has-arrow'", "")
                    Dim onClicking2 As String = If(param = "Y", "", "onclick=directPage('" & subUrl & "')")
                    Dim parameter2 As String = If(menuID <> "3026" AndAlso divID = "0", "?mid=" & subMenuID, "&mid=" & subMenuID)

                    ' Hardcoded icon (replace with your desired icon class or HTML)
                    Dim iconHtml As String = "<i class='icon nav-icon fas fa-circle' style='font-size: 0.50rem;'></i>"

                    Dim SubcollapseID As String = "collapseSubMenu" & subMenuID
                    Dim dataToggle As String = ""

                    If String.IsNullOrEmpty(subUrl) Then
                        onClicking2 = "data-bs-toggle='collapse' aria-expanded='false'"
                        dataToggle = "class='has-arrow'"
                    Else
                        onClicking2 = "onclick=directPage('" & subUrl & "')"
                        dataToggle = ""
                    End If

                    _write.Append("<li style='padding-left: 5px;width:100%;'>")
                    _write.Append("<a href='#' " & onClicking2 & " " & dataToggle & " data-key='t-font-awesome'>")
                    _write.Append(iconHtml)
                    _write.Append(subMenuName)
                    _write.Append("</a>")

                    ' Submenu collapsible
                    _write.Append("<ul class='collapse list-unstyled' id='")
                    _write.Append(SubcollapseID)
                    _write.Append("'>")
                    GetMenuTreeData(_write, subMenuID) ' Panggil fungsi untuk menampilkan submenu tree
                    _write.Append("</ul>")

                    _write.Append("</li>")

                End While
            End Using
        End Using
    End Sub
    Private Sub GetMenuTreeData(ByRef _write As StringBuilder, ByVal subMenuID As String)
        Dim _strsqlselect As String = If(Session("lvluser") = "Layer 1",
            "SELECT DISTINCT USER_SettingChannel.UserName, USER_SettingChannel.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree, user3.MenuTreeName, user3.Url FROM USER_SettingChannel LEFT OUTER JOIN user3 ON user3.SubMenuID=USER_SettingChannel.SubMenuID LEFT OUTER JOIN user2 ON USER_SettingChannel.SubMenuID=user2.SubMenuID LEFT OUTER JOIN User1 ON USER_SettingChannel.MenuID=User1.MenuID WHERE user3.SubMenuID=@SubMenuID AND USER_SettingChannel.UserName=@UserName",
            "SELECT DISTINCT user4.UserID, user4.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree, user3.MenuTreeName, user3.Url, user3.DivID FROM user4 LEFT OUTER JOIN user3 ON user3.SubMenuID=user4.SubMenuID LEFT OUTER JOIN user2 ON user4.SubMenuID=user2.SubMenuID LEFT OUTER JOIN User1 ON user4.MenuID=User1.MenuID WHERE user3.SubMenuID=@SubMenuID AND user4.leveluserid=@LevelUserID AND user4.Access='1'")

        Using _sqlconnections As New SqlConnection(connstring4),
            _sqlcommander As New SqlCommand(_strsqlselect, _sqlconnections)
            _sqlcommander.Parameters.AddWithValue("@SubMenuID", subMenuID)

            If Session("lvluser") = "Layer 1" Then
                _sqlcommander.Parameters.AddWithValue("@UserName", Session("UserName"))
            Else
                _sqlcommander.Parameters.AddWithValue("@LevelUserID", Session("LevelUserID"))
            End If

            _sqlconnections.Open()

            Using _reading As SqlDataReader = _sqlcommander.ExecuteReader()
                _write.Append("<ul class='collapse list-unstyled' id='submenu")
                _write.Append(subMenuID)
                _write.Append("'>")

                While _reading.Read()
                    Dim menuID As String = _reading("MenuID").ToString()
                    Dim menuTreeName As String = _reading("MenuTreeName").ToString()
                    Dim url As String = _reading("Url").ToString()

                    _write.Append("<li><a href='")
                    _write.Append(url)
                    _write.Append("?mid=")
                    _write.Append(menuID)
                    _write.Append("'><i class='ti-more'></i>")
                    _write.Append(menuTreeName)
                    _write.Append("</a></li>")
                End While

                _write.Append("</ul>")
            End Using
        End Using


    End Sub
    'Private Sub _LeftMasterSide()

    '    Dim _additionalQuery As String = "SELECT DISTINCT User0.* FROM User0 INNER JOIN USER4 ON User0.System = USER4.CoreSystem WHERE LevelUserID='" & Session("LevelUserID") & "'"
    '    Dim _additionalCommand As New SqlCommand(_additionalQuery, _sqlconnAdditional)
    '    _sqlconnAdditional.Open()
    '    Dim _additionalReader As SqlDataReader = _additionalCommand.ExecuteReader()
    '    While _additionalReader.Read

    '        _strsql = "select user1.Number, user4.MenuID, MenuName, user1.Url, user1.Icon, user1.DivID, user1.Activity from user4 left outer join User1 " &
    '        "on user4.MenuID=user1.MenuID " &
    '        "where user4.leveluserid='" & Session("LevelUserID") & "' AND User4.CoreSystem='" & _additionalReader("System") & "' And user4.Access='1'" &
    '        "group by MenuName, user4.MenuID, Number, user1.url, user1.Icon, user1.DivID, user1.Activity " &
    '        "order by user1.number asc"
    '        _sqlcomm = New SqlCommand(_strsql, _sqlconn)
    '        _sqlconn.Open()
    '        _read = _sqlcomm.ExecuteReader()
    '        _write &= "<ul class='metismenu list-unstyled' id='side-menu'><li class='menu-title' data-key='t-" & _additionalReader("SystemName").ToString & "'>" & _additionalReader("SystemName").ToString & "</li>"
    '        While _read.Read

    '            Dim _IclassRead As String = ""
    '            If _read("Activity") = "N" Then
    '                _IclassRead = "class='has-arrow'"
    '            Else
    '                _IclassRead = ""
    '            End If

    '            Dim Parameter As String = String.Empty
    '            Dim Urlpaging As String = String.Empty
    '            Dim Onclicking As String = String.Empty
    '            If _read("DivID") = "1" Then
    '                Parameter = "&mid=" & _read("MenuID").ToString & ""
    '            Else
    '                Parameter = "?mid=" & _read("MenuID").ToString & ""
    '            End If
    '            If _read("Url").ToString = "" Then
    '                Urlpaging = "javascript:void(0);"
    '                Onclicking = ""
    '            Else
    '                Urlpaging = _read("Url").ToString & Parameter
    '                Onclicking = "onclick=directPage('" & _read("Url").ToString & "menuid=" & _read("MenuID").ToString & "')"
    '            End If
    '            _write &= "<li><a " & Onclicking & " " & _IclassRead & " style='cursor:pointer;'> " &
    '                                "<i class='icon nav-icon' data-feather='" & _read("icon").ToString & "'></i> " &
    '                                "<span class='menu-item' data-key='t-sales'>" & _read("MenuName").ToString & "</span>" &
    '                            "</a>"

    '            If Session("lvluser") = "Layer 1" Then
    '                If _read("MenuID").ToString = "3026" Then
    '                    _strselect = "SELECT *, DetailMenuName as MenuTreeName FROM USER_SettingChannel where UserName='" & Session("UserName") & "' And DetailMenuName IS NULL"
    '                Else
    '                    _strselect = "SELECT distinct user4.MenuID, user4.SubMenuID, user2.SubMenuName, User2.Url, user2.Param, user2.Activity, User2.Icon, " &
    '                        "User2.DivID FROM USER4 INNER JOIN User2 ON USER4.SubMenuID = USER2.SubMenuID " &
    '                        "INNER JOIN User1 ON USER4.MenuID = USER1.MenuID " &
    '                        "WHERE USER4.leveluserid='" & Session("LevelUserID") & "' AND USER4.MenuID='" & _read("MenuID") & "' And user4.Access='1' ORDER BY User2.Icon ASC"
    '                End If
    '            Else
    '                _strselect = "SELECT distinct user4.MenuID, user4.SubMenuID, user2.SubMenuName, User2.Url, user2.Param, user2.Activity, User2.Icon, " &
    '                        "User2.DivID FROM USER4 INNER JOIN User2 ON USER4.SubMenuID = USER2.SubMenuID " &
    '                        "INNER JOIN User1 ON USER4.MenuID = USER1.MenuID " &
    '                        "WHERE USER4.leveluserid='" & Session("LevelUserID") & "' AND USER4.MenuID='" & _read("MenuID") & "' And user4.Access='1' ORDER BY User2.Icon ASC"
    '            End If
    '            _sqlcommands = New SqlCommand(_strselect, _sqlconnect)
    '            _sqlconnect.Open()
    '            _reader = _sqlcommands.ExecuteReader()
    '            _write &= "<ul class='sub-menu'><li>"
    '            While _reader.Read

    '                _write &= "<a href=" & _reader("Url").ToString & ">" & _reader("SubMenuName") & "</a>"

    '            End While
    '            _reader.Close()
    '            _sqlconnect.Close()
    '            _write &= "</li></ul>"

    '        End While
    '        _read.Close()
    '        _sqlconn.Close()
    '        _write &= " </li></ul>"
    '        aspxLiteral.Text = _write

    '    End While
    '    _additionalReader.Close()
    '    _sqlconnAdditional.Close()

    'End Sub
    Private Sub _LeftMasterSide()
        Dim _additionalQuery As String = "SELECT DISTINCT User0.* FROM User0 INNER JOIN USER4 ON User0.System = USER4.CoreSystem WHERE LevelUserID='" & Session("LevelUserID") & "'"
        Dim _additionalCommand As New SqlCommand(_additionalQuery, _sqlconnAdditional)
        _sqlconnAdditional.Open()
        Dim _additionalReader As SqlDataReader = _additionalCommand.ExecuteReader()
        _write &= "<ul class='metismenu list-unstyled' id='side-menu'>"
        While _additionalReader.Read

            '_strsql = "select user1.Number, user4.MenuID, MenuName, user1.Url, user1.Icon, user1.DivID, user1.Activity from user4 left outer join User1 " &
            '"on user4.MenuID=user1.MenuID " &
            '"where user4.leveluserid='" & Session("LevelUserID") & "' AND User4.CoreSystem='" & _additionalReader("System") & "' And user4.Access='1'" &
            '"group by MenuName, user4.MenuID, Number, user1.url, user1.Icon, user1.DivID, user1.Activity " &
            '"order by user1.number asc"
            _strsql = "DECLARE @ExcludedValues NVARCHAR(MAX) " &
                    "select @ExcludedValues=Channel from SCH_AgentToShift where AgentID='" & Session("USERID") & "' and  GETDATE() between DateTimeStart and DateTimeEnd ;" &
                    "WITH SplitValues AS ( " &
                        "SELECT value AS ID " &
                        "FROM STRING_SPLIT(@ExcludedValues, ';') " &
                    ") " &
                    "select user1.Number, user4.MenuID, MenuName, user1.Url, user1.Icon, user1.DivID, user1.Activity from user4 left outer join User1  " &
                    "on user4.MenuID=user1.MenuID  " &
                    "where user4.leveluserid='" & Session("LevelUserID") & "' AND User4.CoreSystem='" & _additionalReader("System") & "' And user4.Access='1' AND user4.MenuID NOT IN (SELECT ID FROM SplitValues) " &
                    "group by MenuName, user4.MenuID, Number, user1.url, user1.Icon, user1.DivID, user1.Activity  " &
                    "order by user1.number asc"
            _sqlcomm = New SqlCommand(_strsql, _sqlconn)
            _sqlconn.Open()
            _read = _sqlcomm.ExecuteReader()
            _write &= "<li class='menu-title' data-key='t-" & _additionalReader("SystemName").ToString & "'>" & _additionalReader("SystemName").ToString & "</li>"
            '_write &= "<ul class='metismenu list-unstyled' id='side-menu'><li class='menu-title' data-key='t-dashboards'>Uidesk Application System</li>"
            '_write &= "<ul class='metismenu list-unstyled' id='side-menu'><li class='menu-title' data-key='t-" & _additionalReader("SystemName").ToString & "'>" & _additionalReader("SystemName").ToString & "</li>"

            While _read.Read
                _write &= "<li>"
                Dim _IclassRead As String = ""
                If _read("Activity") = "N" Then
                    _IclassRead = "class='has-arrow'"
                Else
                    _IclassRead = ""
                End If

                Dim Parameter As String = String.Empty
                Dim Urlpaging As String = String.Empty
                Dim Onclicking As String = String.Empty
                If _read("DivID") = "1" Then
                    Parameter = "&mid=" & _read("MenuID").ToString & ""
                Else
                    Parameter = "?mid=" & _read("MenuID").ToString & ""
                End If
                If _read("Url").ToString = "" Then
                    Urlpaging = "javascript:void(0);"
                    Onclicking = ""
                Else
                    Urlpaging = _read("Url").ToString & Parameter
                    Onclicking = "onclick=directPage('" & _read("Url").ToString & "menuid=" & _read("MenuID").ToString & "')"
                End If
                _write &= "<a href=" & Urlpaging & " " & Onclicking & " " & _IclassRead & " style='cursor:pointer;'> " &
                                    "<i class='icon nav-icon' data-feather='" & _read("icon").ToString & "'></i> " &
                                    "<span class='menu-item' data-key='t-sales'>" & _read("MenuName").ToString & "</span>" &
                                "</a>"
                '_write &= "<a href=" & _read("Url").ToString & "&menuid=" & _read("MenuID").ToString & " " & _IclassRead & " style='cursor:pointer;'> " &
                '                    "<i class='icon nav-icon' data-feather='" & _read("icon").ToString & "'></i> " &
                '                    "<span class='menu-item' data-key='t-sales'>" & _read("MenuName").ToString & "</span>" &
                '                "</a>"

                If Session("lvluser") = "Layer 1" Then
                    If _read("MenuID").ToString = "3026" Then
                        _strselect = "SELECT *, DetailMenuName as MenuTreeName FROM USER_SettingChannel where UserName='" & Session("UserName") & "' And DetailMenuName IS NULL"
                    Else
                        _strselect = "SELECT distinct user4.MenuID, user4.SubMenuID, user2.SubMenuName, User2.Url, user2.Param, user2.Activity, User2.Icon, " &
                            "User2.DivID FROM USER4 INNER JOIN User2 ON USER4.SubMenuID = USER2.SubMenuID " &
                            "INNER JOIN User1 ON USER4.MenuID = USER1.MenuID " &
                            "WHERE USER4.leveluserid='" & Session("LevelUserID") & "' AND USER4.MenuID='" & _read("MenuID") & "' And user4.Access='1' ORDER BY User2.Icon ASC"
                    End If
                Else
                    _strselect = "SELECT distinct user4.MenuID, user4.SubMenuID, user2.SubMenuName, User2.Url, user2.Param, user2.Activity, User2.Icon, " &
                            "User2.DivID FROM USER4 INNER JOIN User2 ON USER4.SubMenuID = USER2.SubMenuID " &
                            "INNER JOIN User1 ON USER4.MenuID = USER1.MenuID " &
                            "WHERE USER4.leveluserid='" & Session("LevelUserID") & "' AND USER4.MenuID='" & _read("MenuID") & "' AND USER4.MenuID<>'5057' AND USER4.MenuID<>'5071' And user4.Access='1' ORDER BY User2.Icon ASC"
                End If
                _sqlcommands = New SqlCommand(_strselect, _sqlconnect)
                _sqlconnect.Open()
                _reader = _sqlcommands.ExecuteReader()
                _write &= "<ul class='sub-menu'>"
                While _reader.Read

                    Dim _Iclass As String = ""
                    Dim Onclicking2 As String = String.Empty
                    'If _reader("Param") = "Y" Then
                    '    _Iclass = "class='has-arrow' style='cursor:pointer;' data-key='t-font-awesome'"
                    '    Onclicking2 = ""
                    'Else
                    '    _Iclass = ""
                    '    Onclicking2 = "onclick=directPage('" & _reader("Url").ToString & "')"
                    'End If
                    Onclicking2 = "onclick=directPage('" & _reader("Url").ToString & "')"
                    Dim Parameter2 As String = String.Empty
                    If _read("MenuID").ToString <> "3026" Then
                        If _reader("DivID").ToString = "0" Then
                            Parameter2 = "?mid=" & _reader("MenuID").ToString & ""
                        Else
                            Parameter2 = "&mid=" & _reader("MenuID").ToString & ""
                        End If
                    Else
                        Parameter2 = "&mid=" & _reader("MenuID").ToString & ""
                    End If
                    _write &= "<li><a href=" & _reader("Url").ToString & " " & _Iclass & ">" & _reader("SubMenuName") & "</a></li>"

                    'If Session("lvluser") = "Layer 1" Then
                    '    _strsqlselect = "SELECT distinct USER_SettingChannel.UserName, USER_SettingChannel.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree," &
                    '                    "user3.MenuTreeName, User3.Url FROM USER_SettingChannel " &
                    '                    "left outer join " &
                    '                    "user3 on.user3.SubMenuID=USER_SettingChannel.SubMenuID left outer join user2 on.USER_SettingChannel.SubMenuID = user2.SubMenuID " &
                    '                    "left outer join User1 on USER_SettingChannel.MenuID = user1.MenuID " &
                    '                    "where user3.SubMenuID='" & _reader("SubMenuID") & "' and USER_SettingChannel.UserName='" & Session("UserName") & "' "
                    '    '"where user3.SubMenuID='" & _reader("SubMenuID") & "' and USER_SettingChannel.UserName='Agent1' "
                    '    '_strsqlselect = "SELECT *, DetailMenuName as MenuTreeName FROM USER_SettingChannel where UserName='" & Session("UserName") & "' And SubMenuID='" & _reader("SubMenuID") & "' And DetailMenuName IS NOT NULL"
                    'Else
                    '    _strsqlselect = "select distinct user4.UserID, user4.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree, " &
                    '                "user3.MenuTreeName, User3.Url, User3.DivID " &
                    '                "from user4 left outer join " &
                    '                "user3 on.user3.SubMenuID=user4.SubMenuID left outer join user2 on.user4.SubMenuID = user2.SubMenuID " &
                    '                "left outer join User1 on user4.MenuID = user1.MenuID " &
                    '                "where user3.SubMenuID='" & _reader("SubMenuID").ToString & "' and user4.leveluserid='" & Session("LevelUserID") & "' And user4.Access='1'"
                    'End If

                    '_sqlcommander = New SqlCommand(_strsqlselect, _sqlconnections)
                    '_sqlconnections.Open()
                    '_reading = _sqlcommander.ExecuteReader()
                    '_write &= "<ul class='sub-menu'>"
                    'While _reading.Read
                    '    _write &= "<li>" &
                    '                "<a href=" & _reading("Url").ToString & "?mid=" & _reading("MenuID").ToString & "><i class='ti-more'></i>" & _reading("MenuTreeName").ToString & "</a>" &
                    '              "</li>"
                    'End While
                    '_reading.Close()
                    '_sqlconnections.Close()


                End While
                _write &= "</ul>"
                _reader.Close()
                _sqlconnect.Close()
                '_write &= "</li></ul>"
                _write &= "</li>"
            End While

            _read.Close()
            _sqlconn.Close()
            '_write &= "</li></ul>"


        End While
        _write &= "</ul>"
        aspxLiteral.Text = _write
        _additionalReader.Close()
        _sqlconnAdditional.Close()
    End Sub
End Class