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
Imports System.Text
Imports System.Configuration
Imports System.Security.Cryptography
Imports System.Web.Security.AntiXss
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class Crm_Trm_Master_Report1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim Proses As New ClsConn
    Dim FolderFoto As String = "~/FileFoto/"
    Dim GetACRA As String = ConfigurationManager.AppSettings("ACRA")
    Dim ACRAAuthorization As String = ConfigurationManager.AppSettings("ACRAAuthorization")
    Private TripleDes As New TripleDESCryptoServiceProvider
    Public Class Response
        Public Guid As Guid
        Public Toggle As Boolean
        Public DateNya As String
        Public FileName As String
        Public FileExt As String
        Public FileSizing As String
        Public ResultUpload As String
    End Class
    Public Class listFileUpload
        Public Property Result As String
        Public Property NameNya As String
        Public Property StatusNya As String
        Public Property FileId As Guid
        Public Property FileExt As String
    End Class
    Public Class resultInsert
        Public Property Result As String
        Public Property TrxID As String
        Public Property TrxUserName As String
        Public Property TrxStatus As String
        Public Property TrxUser As String
        Public Property TrxDate As String
        Public Property TrxmsgSystem As String
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
    Public Function BRA_Configuration_Report(ByVal TrxID As String, ByVal TrxTypeReport As String, ByVal TrxTarget As String, ByVal TrxSite As String,
                                             ByVal TrxPresentase As String, ByVal TrxAction As String, ByVal TrxUserName As String) As String
        If TrxAction = "SELECT" Or TrxAction = "TABLE" Then
            Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Dim dt As DataTable = New DataTable()

            Dim NameSP = "Exec BRA_Configuration_Report"
            Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxTypeReport & "','" & TrxTarget & "','" & TrxSite & "','" & TrxPresentase & "','" & TrxAction & "', '" & TrxUserName & "'"
            Try
                Using conn As SqlConnection = New SqlConnection(connstring)
                    conn.Open()
                    Dim sqlComm As SqlCommand = New SqlCommand("BRA_Configuration_Report", conn)
                    sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("@TrxTypeReport", TrxTypeReport)
                    sqlComm.Parameters.AddWithValue("@TrxTarget", TrxTarget)
                    sqlComm.Parameters.AddWithValue("@TrxSite", TrxSite)
                    sqlComm.Parameters.AddWithValue("@TrxPresentase", TrxPresentase)
                    sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                    sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                    sqlComm.CommandType = CommandType.StoredProcedure
                    Dim da As SqlDataAdapter = New SqlDataAdapter()
                    Dim ds As DataSet = New DataSet()
                    da.SelectCommand = sqlComm
                    da.Fill(ds)
                    dt = ds.Tables(0)
                    conn.Close()
                End Using
            Catch ex As Exception
                LogError(HttpContext.Current.Session("UserName"), ex, ExecSP)
            Finally
                LogSuccess(HttpContext.Current.Session("UserName"), ExecSP)
            End Try
            Dim tableJson As String = ConvertDataTabletoString(dt)
            Return tableJson

        Else

            Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
            Dim strExec As String = String.Empty
            Dim TrxTypeReportXSS As String = AntiXssEncoder.HtmlEncode(TrxTypeReport.Trim, True)
            Dim TrxTargetXSS As String = AntiXssEncoder.HtmlEncode(TrxTarget.Trim, True)
            Dim TrxSiteXSS As String = AntiXssEncoder.HtmlEncode(TrxSite.Trim, True)
            Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
            Dim TrxPresentaseXSS As String = AntiXssEncoder.HtmlEncode(TrxPresentase.Trim, True)
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "BRA_Configuration_Report"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("@TrxTypeReport", TrxTypeReportXSS)
                    sqlComm.Parameters.AddWithValue("@TrxTarget", TrxTargetXSS)
                    sqlComm.Parameters.AddWithValue("@TrxSite", TrxSiteXSS)
                    sqlComm.Parameters.AddWithValue("@TrxPresentase", TrxPresentaseXSS)
                    sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                    sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserNameXSS)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                    con.Close()
                End Using
            Catch ex As Exception
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "False"
                objectTickets.TrxmsgSystem = ex.Message()
                listTickets.Add(objectTickets)
                strExec = "exec BRA_Configuration_Report '" & TrxID & "','" & TrxTypeReportXSS & "','" & TrxTargetXSS & "','" & TrxSiteXSS & "','" & TrxPresentaseXSS & "','" & TrxAction & "','" & TrxUserNameXSS & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Has Been " & TrxAction & ""
                listTickets.Add(objectTickets)
                strExec = "exec BRA_Configuration_Report '" & TrxID & "','" & TrxTypeReportXSS & "','" & TrxTargetXSS & "','" & TrxSiteXSS & "','" & TrxPresentaseXSS & "','" & TrxAction & "','" & TrxUserNameXSS & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try

            Dim js As JavaScriptSerializer = New JavaScriptSerializer()
            Return js.Serialize(listTickets)
        End If
    End Function

    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function BRA_MasterReport(ByVal TrxID As String, ByVal TrxTypeReport As String, ByVal TrxStatus As String, ByVal TrxAction As String, ByVal TrxUserName As String) As String
        If TrxAction = "SELECT" Or TrxAction = "TABLE" Or TrxAction = "DROPDOWN" Or TrxAction = "DROPDOWN_TYPE" Then
            Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Dim dt As DataTable = New DataTable()

            Dim NameSP = "Exec BRA_MasterReport"
            Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxTypeReport & "','" & TrxStatus & "','" & TrxAction & "', '" & TrxUserName & "'"
            Try
                Using conn As SqlConnection = New SqlConnection(connstring)
                    conn.Open()
                    Dim sqlComm As SqlCommand = New SqlCommand("BRA_MasterReport", conn)
                    sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("@TrxTypeReport", TrxTypeReport)
                    sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                    sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                    sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                    sqlComm.CommandType = CommandType.StoredProcedure
                    Dim da As SqlDataAdapter = New SqlDataAdapter()
                    Dim ds As DataSet = New DataSet()
                    da.SelectCommand = sqlComm
                    da.Fill(ds)
                    dt = ds.Tables(0)
                    conn.Close()
                End Using
            Catch ex As Exception
                LogError(HttpContext.Current.Session("UserName"), ex, ExecSP)
            Finally
                LogSuccess(HttpContext.Current.Session("UserName"), ExecSP)
            End Try
            Dim tableJson As String = ConvertDataTabletoString(dt)
            Return tableJson

        Else

            Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
            Dim strExec As String = String.Empty
            Dim TrxTypeReportXSS As String = AntiXssEncoder.HtmlEncode(TrxTypeReport.Trim, True)
            Dim TrxStatusXSS As String = AntiXssEncoder.HtmlEncode(TrxStatus.Trim, True)
            Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "BRA_MasterReport"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("@TrxTypeReport", TrxTypeReportXSS)
                    sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatusXSS)
                    sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                    sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserNameXSS)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                    con.Close()
                End Using
            Catch ex As Exception
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "False"
                objectTickets.TrxmsgSystem = ex.Message()
                listTickets.Add(objectTickets)
                strExec = "exec BRA_MasterReport '" & TrxID & "','" & TrxTypeReportXSS & "','" & TrxStatusXSS & "','" & TrxAction & "', '" & TrxUserNameXSS & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Has Been " & TrxAction & ""
                listTickets.Add(objectTickets)
                strExec = "exec BRA_MasterReport '" & TrxID & "','" & TrxTypeReportXSS & "','" & TrxStatusXSS & "','" & TrxAction & "', '" & TrxUserNameXSS & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try

            Dim js As JavaScriptSerializer = New JavaScriptSerializer()
            Return js.Serialize(listTickets)
        End If
    End Function

    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function BRA_MasterReportInsert(ByVal TrxID As String, ByVal TrxTypeReport As String, ByVal TrxStatus As String, ByVal TrxAction As String, ByVal TrxUserName As String) As String
        If TrxAction = "INSERT" Then
            Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
            Dim strExec As String = String.Empty
            Dim TrxTypeReportXSS As String = AntiXssEncoder.HtmlEncode(TrxTypeReport.Trim, True)
            Dim TrxStatusXSS As String = AntiXssEncoder.HtmlEncode(TrxStatus.Trim, True)
            Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString

            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "BRA_MasterReport"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("@TrxTypeReport", TrxTypeReportXSS)
                    sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatusXSS)
                    sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                    sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserNameXSS)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                    con.Close()
                End Using

                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Has Been Inserted"
                listTickets.Add(objectTickets)
                strExec = "exec BRA_MasterReport '" & TrxID & "','" & TrxTypeReportXSS & "','" & TrxStatusXSS & "','" & TrxAction & "', '" & TrxUserNameXSS & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)

            Catch ex As Exception
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "False"
                objectTickets.TrxmsgSystem = ex.Message()
                listTickets.Add(objectTickets)
                strExec = "exec BRA_MasterReport '" & TrxID & "','" & TrxTypeReportXSS & "','" & TrxStatusXSS & "','" & TrxAction & "', '" & TrxUserNameXSS & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            End Try

            Dim js As JavaScriptSerializer = New JavaScriptSerializer()
            Return js.Serialize(listTickets)
        End If
    End Function

    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function BRA_MasterReportUpdate(ByVal TrxID As String, ByVal TrxTypeReport As String, ByVal TrxStatus As String, ByVal TrxAction As String, ByVal TrxUserName As String) As String
        If TrxAction = "UPDATE" Then
            Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Dim dt As DataTable = New DataTable()

            Dim NameSP = "Exec BRA_MasterReport"
            Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxTypeReport & "','" & TrxStatus & "','" & TrxAction & "', '" & TrxUserName & "'"
            Try
                Using conn As SqlConnection = New SqlConnection(connstring)
                    conn.Open()
                    Dim sqlComm As SqlCommand = New SqlCommand("BRA_MasterReportUpdate", conn)
                    sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("@TrxTypeReport", TrxTypeReport)
                    sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                    sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                    sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                    sqlComm.CommandType = CommandType.StoredProcedure
                    Dim da As SqlDataAdapter = New SqlDataAdapter()
                    Dim ds As DataSet = New DataSet()
                    da.SelectCommand = sqlComm
                    da.Fill(ds)
                    dt = ds.Tables(0)
                    conn.Close()
                End Using
            Catch ex As Exception
                LogError(HttpContext.Current.Session("UserName"), ex, ExecSP)
            Finally
                LogSuccess(HttpContext.Current.Session("UserName"), ExecSP)
            End Try
            Dim tableJson As String = ConvertDataTabletoString(dt)
            Return tableJson
        Else
            Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
            Dim strExec As String = String.Empty
            Dim TrxTypeReportXSS As String = AntiXssEncoder.HtmlEncode(TrxTypeReport.Trim, True)
            Dim TrxStatusXSS As String = AntiXssEncoder.HtmlEncode(TrxStatus.Trim, True)
            Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "BRA_MasterReport"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("@TrxTypeReport", TrxTypeReportXSS)
                    sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatusXSS)
                    sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                    sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserNameXSS)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                    con.Close()
                End Using
            Catch ex As Exception
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "False"
                objectTickets.TrxmsgSystem = ex.Message()
                listTickets.Add(objectTickets)
                strExec = "exec BRA_MasterReport '" & TrxID & "','" & TrxTypeReportXSS & "','" & TrxStatusXSS & "','" & TrxAction & "', '" & TrxUserNameXSS & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Has Been Updated"
                listTickets.Add(objectTickets)
                strExec = "exec BRA_MasterReport '" & TrxID & "','" & TrxTypeReportXSS & "','" & TrxStatusXSS & "','" & TrxAction & "', '" & TrxUserNameXSS & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try

            Dim js As JavaScriptSerializer = New JavaScriptSerializer()
            Return js.Serialize(listTickets)
        End If
    End Function
End Class