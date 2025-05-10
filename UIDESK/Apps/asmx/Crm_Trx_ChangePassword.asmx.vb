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

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class Crm_Trx_ChangePassword
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim Proses As New ClsConn
    Public Class resultInsert
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property TrxmsgSystem As String
        Public Property TicketNumber As String
        Public Property TrxID As String
        Public Property TrxTo As String
        Public Property TrxSubject As String
        Public Property msgSystem As String

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

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        js.MaxJsonLength = Int32.MaxValue
        Return js.Serialize(rows)
    End Function
    Public Function BigConvertDataTabletoString(ByVal dt As DataTable) As String
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

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        js.MaxJsonLength = Int32.MaxValue
        Return js.Serialize(rows)
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
    Public Function ChangePassword(ByVal TrxPassword As String, ByVal TrxNewPassword As String, ByVal TrxUserName As String, ByVal TrxUserCreated As String) As String
        Dim TrxPasswordXSS As String = AntiXssEncoder.HtmlEncode(TrxPassword.Trim, True)
        Dim TrxNewPasswordXSS As String = AntiXssEncoder.HtmlEncode(TrxNewPassword.Trim, True)
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxUserCreatedXSS As String = AntiXssEncoder.HtmlEncode(TrxUserCreated.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim _Result As String = String.Empty
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxChangePassword"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxPassword", TrxPasswordXSS)
                sqlComm.Parameters.AddWithValue("TrxNewPassword", TrxNewPasswordXSS)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxUserCreated", TrxUserCreatedXSS)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("TrxResult").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxChangePassword " & "'" & TrxPasswordXSS & "'," & "'" & TrxNewPasswordXSS & "'," & "'" & TrxUserNameXSS & "'," & "'" & TrxUserCreatedXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.msgSystem = "Change Password Success"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxChangePassword " & "'" & TrxPasswordXSS & "'," & "'" & TrxNewPasswordXSS & "'," & "'" & TrxUserNameXSS & "'," & "'" & _Result & "'," & "'" & TrxUserCreatedXSS & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.msgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxChangePassword " & "'" & TrxPasswordXSS & "'," & "'" & TrxNewPasswordXSS & "'," & "'" & TrxUserNameXSS & "'," & "'" & _Result & "'," & "'" & TrxUserCreatedXSS & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End If
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class