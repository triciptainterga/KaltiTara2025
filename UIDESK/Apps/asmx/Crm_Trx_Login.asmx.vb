Imports System.ComponentModel
Imports System.Web
Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.Web.Services.Protocols
Imports System.Web.Script.Serialization
Imports System.Data
Imports System.Data.SqlClient
Imports System.Net
Imports System.IO
Imports System.Xml
Imports System.Data.OleDb
Imports System.Data.Common
Imports System.Net.Mail
Imports System.Configuration
Imports System.Net.Configuration
Imports System.Web.Security.AntiXss
Imports MySql.Data.MySqlClient

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class Crm_Trx_Login
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn

    'Private connectionString As String = "Server=localhost;Database=nama_database;Uid=root;Pwd=password;"
    Public Class resultInsert
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property TrxmsgSystem As String
        Public Property TicketNumber As String
        Public Property TrxID As String
        Public Property TrxTo As String
        Public Property TrxSubject As String
        Public Property TrxCC As String
    End Class
    Public Function ConvertDataTabletoString(ByVal dt As DataTable) As String
        Dim serializer As System.Web.Script.Serialization.JavaScriptSerializer = New System.Web.Script.Serialization.JavaScriptSerializer()
        Dim rows As List(Of Dictionary(Of String, Object)) = New List(Of Dictionary(Of String, Object))()
        Dim row As Dictionary(Of String, Object)

        For Each dr As DataRow In dt.Rows
            row = New Dictionary(Of String, Object)()

            For Each col As DataColumn In dt.Columns
                row.Add(col.ColumnName, dr(col))
            Next

            rows.Add(row)
        Next
        Return serializer.Serialize(rows)

    End Function
    Public Sub LogSuccess(ByVal agentName As String, strValue As String)
        Dim message As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
        message += Environment.NewLine
        message += "---------------------------Success-------------------------------------------------------"
        message += Environment.NewLine
        message += String.Format("Message: {0}", strValue)
        message += Environment.NewLine
        message += "---------------------------Success-------------------------------------------------------"
        message += Environment.NewLine

        Try
            Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy")))
            If Not System.IO.Directory.Exists(DirectoryX) Then
                System.IO.Directory.CreateDirectory(DirectoryX)
            End If
        Catch exX As Exception
            ''Try catch untuk error create folder
            Dim pathXX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Dim messageXX As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
            messageXX += Environment.NewLine
            messageXX += "---------------------------Success-------------------------------------------------------"
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", exX.Message)
            messageXX += Environment.NewLine
            messageXX += String.Format("StackTrace: {0}", exX.StackTrace)
            messageXX += Environment.NewLine
            messageXX += String.Format("Source: {0}", exX.Source)
            messageXX += Environment.NewLine
            messageXX += String.Format("TargetSite: {0}", exX.TargetSite.ToString())
            messageXX += Environment.NewLine
            messageXX += "---------------------------Success-------------------------------------------------------"
            messageXX += Environment.NewLine
            Using writer As New StreamWriter(pathXX, True)
                writer.WriteLine(messageXX)
                writer.Close()
            End Using
        Finally
            Dim pathX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Using writer As New StreamWriter(pathX, True)
                writer.WriteLine(message)
                writer.Close()
            End Using
        End Try
    End Sub
    Public Sub LogError(ByVal agentName As String, ex As Exception, strUser As String)
        Dim message As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
        message += Environment.NewLine
        message += "---------------------------Failed-------------------------------------------------------"
        message += Environment.NewLine
        message += String.Format("Message: {0}", strUser)
        message += Environment.NewLine
        message += String.Format("Message: {0}", ex.Message)
        message += Environment.NewLine
        message += String.Format("StackTrace: {0}", ex.StackTrace)
        message += Environment.NewLine
        message += String.Format("Source: {0}", ex.Source)
        message += Environment.NewLine
        message += String.Format("TargetSite: {0}", ex.TargetSite.ToString())
        message += Environment.NewLine
        message += "---------------------------Failed-------------------------------------------------------"
        message += Environment.NewLine

        Try
            Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy")))
            If Not System.IO.Directory.Exists(DirectoryX) Then
                System.IO.Directory.CreateDirectory(DirectoryX)
            End If
        Catch exX As Exception
            ''Try catch untuk error create folder
            Dim pathXX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Dim messageXX As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
            messageXX += Environment.NewLine
            messageXX += "---------------------------Failed-----------------------------------------------"
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", strUser)
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", exX.Message)
            messageXX += Environment.NewLine
            messageXX += String.Format("StackTrace: {0}", exX.StackTrace)
            messageXX += Environment.NewLine
            messageXX += String.Format("Source: {0}", exX.Source)
            messageXX += Environment.NewLine
            messageXX += String.Format("TargetSite: {0}", exX.TargetSite.ToString())
            messageXX += Environment.NewLine
            messageXX += "---------------------------Failed------------------------------------------------"
            messageXX += Environment.NewLine
            Using writer As New StreamWriter(pathXX, True)
                writer.WriteLine(messageXX)
                writer.Close()
            End Using
        Finally
            Dim pathX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Using writer As New StreamWriter(pathX, True)
                writer.WriteLine(message)
                writer.Close()
            End Using
        End Try
    End Sub
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertAgentAux(ByVal TrxAux As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim TrxAuxXSS As String = AntiXssEncoder.HtmlEncode(TrxAux.Trim, True)
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxAgentAux"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxAux", TrxAuxXSS)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxAgentAux '" & TrxAuxXSS & "','" & TrxUserNameXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxAgentAux '" & TrxAuxXSS & "','" & TrxUserNameXSS & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertLoginActivity(ByVal TrxLoginID As String, ByVal TrxLoginUserName As String, ByVal TrxAction As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty

        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_SP_TrxLoginActivity"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxLoginID", TrxLoginID)
                sqlComm.Parameters.AddWithValue("TrxLoginUserName", TrxLoginUserName)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_SP_TrxLoginActivity '" & TrxLoginID & "','" & TrxLoginUserName & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_SP_TrxLoginActivity '" & TrxLoginID & "','" & TrxLoginUserName & "','" & TrxAction & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertLogoutActivity(ByVal TrxLoginID As String, ByVal TrxLoginUserName As String, ByVal TrxAction As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty

        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_SP_TrxLogoutActivity"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxLoginID", TrxLoginID)
                sqlComm.Parameters.AddWithValue("TrxLoginUserName", TrxLoginUserName)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_SP_TrxLogoutActivity '" & TrxLoginID & "','" & TrxLoginUserName & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_SP_TrxLogoutActivity '" & TrxLoginID & "','" & TrxLoginUserName & "','" & TrxAction & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DK_InsertLoginActivity(ByVal username As String) As String
        'Dim connectionString As New MySqlConnection(ConfigurationManager.ConnectionStrings("DKConnection").ConnectionString)
        Dim ScheduleState As Integer
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrmDropdown"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", username)
                sqlComm.Parameters.AddWithValue("TrxUserName", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", "UIDESK240")
                con.Open()
                Using sqldr As SqlDataReader = sqlComm.ExecuteReader()
                    If sqldr.HasRows Then
                        sqldr.Read()
                        ScheduleState = sqldr("ScheduleState").ToString()
                    End If
                End Using
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, "UIDESK240")
        End Try

        If ScheduleState = 1 Then
            'Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "BRA_DK_OpenConnection"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("UserName", username)
                    sqlComm.Parameters.AddWithValue("Type", "ready")
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                    con.Close()
                End Using
            Catch ex As Exception
                LogError(HttpContext.Current.Session("UserName"), ex, "BRA_DK_OpenConnection")
            End Try
            'Dim constrDK As String = ConfigurationManager.ConnectionStrings("DKConnection").ConnectionString
            'Dim result As String = "Login Failed !"
            'Try
            '    Using conn As New MySqlConnection(constrDK)
            '        conn.Open()
            '        Dim query As String = "UPDATE multichat.user_agents SET aux='ready' WHERE username=@username"
            '        Using cmd As New MySqlCommand(query, conn)
            '            cmd.Parameters.AddWithValue("@username", username)
            '            Dim rowsAffected As Integer = cmd.ExecuteNonQuery()
            '            If rowsAffected > 0 Then
            '                result = query & "-" & "Login Successful !"
            '                LogSuccess(HttpContext.Current.Session("UserName"), result)
            '            End If
            '        End Using
            '    End Using
            'Catch ex As Exception
            '    result = "Error: " & ex.Message
            '    LogError(HttpContext.Current.Session("UserName"), ex, result)
            'End Try
            'Return result
        Else
        End If
    End Function
    Public Function DK_InsertLogoutActivity(ByVal username As String) As String
        'Dim connectionString As New MySqlConnection(ConfigurationManager.ConnectionStrings("DKConnection").ConnectionString)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim result As String = "Logout Failed !"
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "BRA_DK_OpenConnection"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("UserName", username)
                sqlComm.Parameters.AddWithValue("Type", "aux")
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, "BRA_DK_OpenConnection")
        End Try
        'Try
        '    Using conn As New MySqlConnection(constr)
        '        conn.Open()
        '        Dim query As String = "UPDATE multichat.user_agents SET aux=NULL WHERE username=@username"
        '        Using cmd As New MySqlCommand(query, conn)
        '            cmd.Parameters.AddWithValue("@username", username)
        '            Dim rowsAffected As Integer = cmd.ExecuteNonQuery()
        '            If rowsAffected > 0 Then
        '                result = query & "-" & "Logout Successful !"
        '            End If
        '        End Using
        '        LogSuccess(HttpContext.Current.Session("UserName"), result)
        '    End Using
        'Catch ex As Exception
        '    result = "Error: " & ex.Message
        '    LogError(HttpContext.Current.Session("UserName"), ex, result)
        'End Try
        'Return result
    End Function
    <WebMethod()>
    Public Function LogMessage(ByVal logData As String) As String
        Try
            ' Menyimpan log ke file .txt
            Dim logFilePath As String = "C:\path\to\your\log.txt"
            Using writer As New StreamWriter(logFilePath, True)
                writer.WriteLine($"{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")} - {logData}")
            End Using

            ' Atau simpan log ke database
            ' Simpan ke database SQL Server
            ' Koneksi ke database dan simpan log
            ' Dim connectionString As String = "Data Source=YOUR_SERVER;Initial Catalog=YOUR_DB;Integrated Security=True"
            ' Using connection As New SqlConnection(connectionString)
            '     connection.Open()
            '     Dim query As String = "INSERT INTO Logs (Message, CreatedAt) VALUES (@Message, @CreatedAt)"
            '     Using command As New SqlCommand(query, connection)
            '         command.Parameters.AddWithValue("@Message", logData)
            '         command.Parameters.AddWithValue("@CreatedAt", DateTime.Now)
            '         command.ExecuteNonQuery()
            '     End Using
            ' End Using

            Return "Log berhasil disimpan"
        Catch ex As Exception
            Return "Error: " & ex.Message
        End Try
    End Function
End Class