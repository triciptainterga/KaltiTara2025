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
Public Class QA_TrmSystem
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
    Public Function UIDESK_TrmMasterTransaction(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxAction As String, ByVal TrxActionType As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrmMasterTransaction"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','" & TrxAction & "','" & TrxActionType & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmMasterTransaction", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                sqlComm.Parameters.AddWithValue("@TrxActionType", TrxActionType)
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_TrxDetailPenilaianSelected(ByVal HeaderID As String, ByVal AcraID As String, ByVal kodealat As String, ByVal kodeitempertanyaan As String, ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec QM_TrxDetailPenilaianSelected"
        Dim ExecSP = "" & NameSP & " '" & HeaderID & "','" & AcraID & "','" & kodealat & "','" & kodeitempertanyaan & "','" & TrxUserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_TrxDetailPenilaianSelected", conn)
                sqlComm.Parameters.AddWithValue("@HeaderID", HeaderID)
                sqlComm.Parameters.AddWithValue("@AcraID", AcraID)
                sqlComm.Parameters.AddWithValue("@Kodealat", kodealat)
                sqlComm.Parameters.AddWithValue("@kodeitempertanyaan", kodeitempertanyaan)
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

        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    Public Function UploadFoto() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim UserName As String = HttpContext.Current.Request.Form("UserName")
        Dim UserCreate As String = HttpContext.Current.Request.Form("UserCreate")
        Dim SavePath As String = HttpContext.Current.Server.MapPath(FolderFoto & "" & UserName.Replace("..", "") & "/")
        'Dim idHeader As String = HttpContext.Current.Request.Form("idHeader")
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath(FolderFoto & "" & UserName.Replace("..", "")))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        End If
        For i As Integer = 0 To Files.Count - 1
            Dim File As HttpPostedFile = Files(i)
            FileId = Guid.NewGuid()
            FileName = File.FileName
            FileExt = Path.GetExtension(File.FileName)
            FileSizing = File.ContentLength

            Dim validFileTypes As String() = {"bmp", "gif", "png", "jpg", "jpeg"}
            Dim isValidFile As Boolean = False
            For j As Integer = 0 To validFileTypes.Length - 1
                If FileExt = "." & validFileTypes(j) Then

                    Dim FileMod As DateTime = DateTime.Now
                    Dim FileType As String = File.ContentType
                    Dim FileSize As Long = File.ContentLength / 1024
                    Dim FilePath As String = FolderFoto & "" & UserName.Replace("..", "")
                    File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
                    'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))

                    If FileSize > 2 Then
                        Response.Guid = FileId
                        Response.FileName = FileName
                        Response.FileExt = FileExt
                        Response.FileSizing = FileSizing
                        Response.ResultUpload = "Please upload file less than 2 MB. Thanks!"
                    Else
                        File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
                    End If

                Else
                    'Exit Function
                End If
            Next

        Next
        Response.Guid = FileId
        Response.FileName = FileName
        Response.FileExt = FileExt
        Response.FileSizing = FileSizing
        'SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; 
        'HDR=NO; IMEX=1; Database=\\ptmkpwa12dev08.pertamina.com\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx', 'SELECT * FROM [Sheet1$]')

        ''Coba new
        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        Try
            Dim path As String = HttpContext.Current.Server.MapPath(FolderFoto & "" & UserName.Replace("..", "") & "/" & String.Concat(FileId, FileExt))
            Dim TrxUrl As String = UserName & "/" & String.Concat(FileId, FileExt)

            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "QM_TrxFoto"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("UserName", UserName)
                    sqlComm.Parameters.AddWithValue("Url", TrxUrl)
                    sqlComm.Parameters.AddWithValue("UserCreate", UserCreate)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception
                strExec = "exec QM_TrxFoto '" & UserName & "','" & TrxUrl & "','" & FileName & "','" & FileExt & "','" & UserCreate & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                strExec = "exec QM_TrxFoto '" & UserName & "','" & TrxUrl & "','" & FileName & "','" & FileExt & "','" & UserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try
        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Return Response
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Function_GetACRA(ByVal TrxUserName As String) As String
        Dim context As System.Web.HttpContext = System.Web.HttpContext.Current
        Dim sIPAddress As String = context.Request.ServerVariables("HTTP_X_FORWARDED_FOR")
        Dim IPAddress As String = ""
        If String.IsNullOrEmpty(sIPAddress) Then
            IPAddress = context.Request.ServerVariables("REMOTE_ADDR")
        Else
            IPAddress = sIPAddress
        End If
        If String.IsNullOrEmpty(sIPAddress) Then
            IPAddress = context.Request.ServerVariables("REMOTE_ADDR")
        Else
            IPAddress = sIPAddress
        End If
        Dim responstring As String = ""
        Dim dataResult As Linq.JObject
        Dim ret As String = ""
        'ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        Try
            'Dim apiurl As String = "http://api.close.dev.bri.co.id:5557/gateway/apiActiveDirectory/1.0/ADAuthentication2"
            Dim apiurl As String = GetACRA
            Dim uri As New Uri(apiurl)
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
            Dim req As WebRequest = WebRequest.Create(uri)
            'Dim json As String = "{""userLogin"":""" & UserName & """,""password"":""" & Password & """,""channelId"":""BRIQIS"",""userAgent"":""" & BrowserName & """,""ipAddress"":""" & IPAddress & """}"
            'Dim json As String = "{""userLogin"":""00203754"",""password"":""P@ssw0rd"",""channelId"":""BRIQIS"",""userAgent"":""" & BrowserName & """,""ipAddress"":""" & IPAddress & """}"
            Dim json As String = ""
            Dim data = Encoding.UTF8.GetBytes(json)

            req.ContentType = "application/json"
            req.Method = "GET"
            req.ContentLength = data.Length
            'req.Headers.Add("Authorization", "Basic Y29udGFjdENlbnRlcjpDMG50NGN0QzNudGVyITE0MDE3")
            req.Headers.Add("Authorization", "Basic " & ACRAAuthorization & "")
            'Dim result_post = SendRequest(uri, data, "application/json", "POST")

            'Dim stream = req.GetRequestStream()
            'stream.Write(data, 0, data.Length)
            'stream.Close()

            Dim response = req.GetResponse().GetResponseStream()

            Dim reader As New StreamReader(response)
            Dim res = reader.ReadToEnd()
            reader.Close()
            response.Close()

            If Not IsNothing(res) And res <> "" Then
                dataResult = Linq.JObject.Parse(res)
                If dataResult.Value(Of String)("status") = "OK" Then
                    'ret = "auth_login.aspx?val1=" & dataResult.Value(Of String)("responseMessage") & "&browser=" & BrowserName & "&ipaddress=127"
                Else
                    'ret = "auth_login.aspx?val2=" & dataResult.Value(Of String)("responseMessage") & "&browser=" & BrowserName & "&ipaddress=127"
                End If
            End If
            LogSuccess(HttpContext.Current.Session("UserName"), GetACRA)
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, GetACRA)
        End Try
        'Dim tableJson As String = BigConvertDataTabletoString(dt)
        'Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Function_CheckingACRA(ByVal UserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec QM_ACRA_TableChecking"
        Dim sql As String = "" & NameSP & " '" & UserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_ACRA_TableChecking", conn)
                sqlComm.Parameters.AddWithValue("@UserName", UserName)
                sqlComm.CommandType = CommandType.StoredProcedure
                Dim da As SqlDataAdapter = New SqlDataAdapter()
                Dim ds As DataSet = New DataSet()
                da.SelectCommand = sqlComm
                da.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = ConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QA_PeriodeNonCallQ1_Transaction(ByVal TrxID As String, ByVal TrxNamaPeriode As String, ByVal TrxSampling As String, ByVal TrxKeterangan As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        If TrxAction = "SELECT" Or TrxAction = "TABLE" Then
            Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Dim dt As DataTable = New DataTable()

            Dim NameSP = "Exec QM_Input_PeriodeNonCallQ1"
            Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxNamaPeriode & "','" & TrxSampling & "','" & TrxKeterangan & "','" & TrxUserName & "','" & TrxAction & "'"
            Try
                Using conn As SqlConnection = New SqlConnection(connstring)
                    conn.Open()
                    Dim sqlComm As SqlCommand = New SqlCommand("QM_Input_PeriodeNonCallQ1", conn)
                    sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("@TrxNamaPeriode", TrxNamaPeriode)
                    sqlComm.Parameters.AddWithValue("@TrxSampling", TrxSampling)
                    sqlComm.Parameters.AddWithValue("@TrxKeterangan", TrxKeterangan)
                    sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                    sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
            Dim TrxNamaPeriodeXSS As String = AntiXssEncoder.HtmlEncode(TrxNamaPeriode.Trim, True)
            Dim TrxSamplingXSS As String = AntiXssEncoder.HtmlEncode(TrxSampling.Trim, True)
            Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "QM_Input_PeriodeNonCallQ1"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("TrxNamaPeriode", TrxNamaPeriodeXSS)
                    sqlComm.Parameters.AddWithValue("TrxSampling", TrxSamplingXSS)
                    sqlComm.Parameters.AddWithValue("TrxKeterangan", TrxKeterangan)
                    sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
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
                strExec = "exec QM_Input_PeriodeNonCallQ1 '" & TrxID & "','" & TrxNamaPeriodeXSS & "','" & TrxSamplingXSS & "','" & TrxKeterangan & "','" & TrxUserNameXSS & "','" & TrxAction & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Has Been " & TrxAction & ""
                listTickets.Add(objectTickets)
                strExec = "exec QM_Input_PeriodeNonCallQ1 '" & TrxID & "','" & TrxNamaPeriodeXSS & "','" & TrxSamplingXSS & "','" & TrxKeterangan & "','" & TrxUserNameXSS & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try
            Dim js As JavaScriptSerializer = New JavaScriptSerializer()
            Return js.Serialize(listTickets)
        End If
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QA_PeriodeNonCallQ2_Transaction(ByVal TrxID As String, ByVal TrxNamaPeriode As String, ByVal TrxSampling As String, ByVal TrxKeterangan As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        If TrxAction = "SELECT" Or TrxAction = "TABLE" Then
            Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Dim dt As DataTable = New DataTable()

            Dim NameSP = "Exec QM_Input_PeriodeNonCallQ2"
            Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxNamaPeriode & "','" & TrxSampling & "','" & TrxKeterangan & "','" & TrxUserName & "','" & TrxAction & "'"
            Try
                Using conn As SqlConnection = New SqlConnection(connstring)
                    conn.Open()
                    Dim sqlComm As SqlCommand = New SqlCommand("QM_Input_PeriodeNonCallQ2", conn)
                    sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("@TrxNamaPeriode", TrxNamaPeriode)
                    sqlComm.Parameters.AddWithValue("@TrxSampling", TrxSampling)
                    sqlComm.Parameters.AddWithValue("@TrxKeterangan", TrxKeterangan)
                    sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                    sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
            Dim TrxNamaPeriodeXSS As String = AntiXssEncoder.HtmlEncode(TrxNamaPeriode.Trim, True)
            Dim TrxSamplingXSS As String = AntiXssEncoder.HtmlEncode(TrxSampling.Trim, True)
            Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "QM_Input_PeriodeNonCallQ2"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("TrxNamaPeriode", TrxNamaPeriodeXSS)
                    sqlComm.Parameters.AddWithValue("TrxSampling", TrxSamplingXSS)
                    sqlComm.Parameters.AddWithValue("TrxKeterangan", TrxKeterangan)
                    sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
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
                strExec = "exec QM_Input_PeriodeNonCallQ2 '" & TrxID & "','" & TrxNamaPeriodeXSS & "','" & TrxSamplingXSS & "','" & TrxKeterangan & "','" & TrxUserNameXSS & "','" & TrxAction & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Has Been " & TrxAction & ""
                listTickets.Add(objectTickets)
                strExec = "exec QM_Input_PeriodeNonCallQ2 '" & TrxID & "','" & TrxNamaPeriodeXSS & "','" & TrxSamplingXSS & "','" & TrxKeterangan & "','" & TrxUserNameXSS & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try
            Dim js As JavaScriptSerializer = New JavaScriptSerializer()
            Return js.Serialize(listTickets)
        End If
    End Function
End Class