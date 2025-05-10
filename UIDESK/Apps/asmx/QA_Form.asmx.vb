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
Imports System.Web.HttpException

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class QA_Form1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim Proses As New ClsConn
    Dim VariabelCookiesUsername As HttpCookie = HttpContext.Current.Request.Cookies("CookiesUserName")
    Dim FolderFileComments As String = "~/FileTransaction/FileComments/"
    Dim FolderFileHeaders As String = "~/FileTransaction/FileHeader/"
    Dim FolderFileInteractions As String = "~/FileTransaction/FileInteraction/"
    Public Class resultInsert
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property msgSystem As String
        Public Property TicketNumber As String
        Public Property CustomerID As String
    End Class
    Public Class ResultTransaction
        Public Property Result As String
        Public Property ResultID As String
        Public Property ResultAcraID As String
        Public Property ResultHeaderID As String
        Public Property ResultUser As String
        Public Property ResultQaID As String
        Public Property ResultType As String
        Public Property ResultQAType As String
        Public Property ResultAgent As String
        Public Property ResultStatus As String
        Public Property ResultMessage As String
        Public Property ResultDate As String
        Public Property ResultTableID As String
    End Class
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
    Public Enum StatementTypes
        None = 0
        Procedure = 0
        Alter = 1
        Create = 2
        Delete = 4
        Drop = 8
        Execute = 16
        Insert = 32
        [Select] = 64
        Update = 128
        Union = 256
        Batch = 512
        Merge = 1024 Or Delete Or Insert Or [Select] Or Update
    End Enum
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
    Public Class CommandTextValidator
        Public Shared Sub ValidateStatement(ByVal commandText As String, ByVal authorizedStatements As StatementTypes)
            'Construct Regular Expression To Find Text Blocks, Statement Breaks & SQL Statement Headers
            Dim regExText As String = "('(''|[^'])*')|(;)|(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b)"

            'Remove Authorized Options
            If (authorizedStatements And StatementTypes.Batch) = StatementTypes.Batch Then regExText = regExText.Replace("(;)", String.Empty)
            If (authorizedStatements And StatementTypes.Alter) = StatementTypes.Alter Then regExText = regExText.Replace("ALTER", String.Empty)
            If (authorizedStatements And StatementTypes.Create) = StatementTypes.Create Then regExText = regExText.Replace("CREATE", String.Empty)
            If (authorizedStatements And StatementTypes.Delete) = StatementTypes.Delete Then regExText = regExText.Replace("DELETE", String.Empty)
            If (authorizedStatements And StatementTypes.Delete) = StatementTypes.Delete Then regExText = regExText.Replace("DELETETREE", String.Empty)
            If (authorizedStatements And StatementTypes.Drop) = StatementTypes.Drop Then regExText = regExText.Replace("DROP", String.Empty)
            If (authorizedStatements And StatementTypes.Execute) = StatementTypes.Execute Then regExText = regExText.Replace("EXEC(UTE){0,1}", String.Empty)
            If (authorizedStatements And StatementTypes.Insert) = StatementTypes.Insert Then regExText = regExText.Replace("INSERT( +INTO){0,1}", String.Empty)
            If (authorizedStatements And StatementTypes.Merge) = StatementTypes.Merge Then regExText = regExText.Replace("MERGE", String.Empty)
            If (authorizedStatements And StatementTypes.Select) = StatementTypes.Select Then regExText = regExText.Replace("SELECT", String.Empty)
            If (authorizedStatements And StatementTypes.Union) = StatementTypes.Union Then regExText = regExText.Replace("UNION", String.Empty)
            If (authorizedStatements And StatementTypes.Update) = StatementTypes.Update Then regExText = regExText.Replace("UPDATE", String.Empty)

            'Remove extra separators
            Dim regExOptions As RegexOptions = RegexOptions.IgnoreCase Or RegexOptions.Multiline
            regExText = Regex.Replace(regExText, "\(\|", "(", regExOptions)
            regExText = Regex.Replace(regExText, "\|{2,}", "|", regExOptions)
            regExText = Regex.Replace(regExText, "\|\)", ")", regExOptions)

            'Check for errors
            Dim patternMatchList As MatchCollection = Regex.Matches(commandText, regExText, regExOptions)
            For patternIndex As Integer = patternMatchList.Count - 1 To 0 Step -1
                Dim value As String = patternMatchList.Item(patternIndex).Value.Trim
                If String.IsNullOrWhiteSpace(value) Then
                    'Continue - Not an error.
                ElseIf value.StartsWith("'") AndAlso value.EndsWith("'") Then
                    'Continue - Text Block
                ElseIf value.Trim = ";" Then
                    Throw New System.UnauthorizedAccessException("Batch statements not authorized:" & vbCrLf & commandText)
                Else
                    Throw New System.UnauthorizedAccessException(value.Substring(0, 1).ToUpper & value.Substring(1).ToLower & " statements not authorized:" & vbCrLf & commandText)
                End If
            Next
        End Sub
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
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Q1_Call_InsertTransaction(ByVal Q1_Call_NamaAgent As String, ByVal Q1_Call_CmbChannel As String, ByVal Q1_Call_CmbJenisPermasalahan As String,
                                              ByVal Q1_Call_NoTiket As String, ByVal Q1_Call_Calltype As String, ByVal Q1_Call_NamaNasabah As String,
                                              ByVal Q1_Call_NomorKartu As String, ByVal Q1_Call_WaktuInteraksi As String, ByVal Q1_Call_Durasi As String,
                                              ByVal Q1_Call_NomorTelepon As String, ByVal Q1_Call_PeriodePenilaian As String, Q1_Call_UserType As String, ByVal Q1_Call_Type As String,
                                              ByVal Q1_Call_QaID As String, ByVal Q1_Call_AcraID As String, ByVal Q1_Call_AgentID As String, ByVal Q1_Call_ActionType As String,
                                              ByVal Q1_Call_InteractionHeader As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim QM_HeaderID, QM_ID, QMAcraID, QMQaID, QMTpe, QMQAType, QMAgent, QMStatus As String
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Q1_Call_InsertTransaction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("Q1_Call_NamaAgent", Q1_Call_NamaAgent)
                sqlComm.Parameters.AddWithValue("Q1_Call_CmbChannel", Q1_Call_CmbChannel)
                sqlComm.Parameters.AddWithValue("Q1_Call_CmbJenisPermasalahan", Q1_Call_CmbJenisPermasalahan)
                sqlComm.Parameters.AddWithValue("Q1_Call_NoTiket", Q1_Call_NoTiket)
                sqlComm.Parameters.AddWithValue("Q1_Call_Calltype", Q1_Call_Calltype)
                sqlComm.Parameters.AddWithValue("Q1_Call_NamaNasabah", Q1_Call_NamaNasabah)
                sqlComm.Parameters.AddWithValue("Q1_Call_NomorKartu", Q1_Call_NomorKartu)
                sqlComm.Parameters.AddWithValue("Q1_Call_WaktuInteraksi", Q1_Call_WaktuInteraksi)
                sqlComm.Parameters.AddWithValue("Q1_Call_Durasi", Q1_Call_Durasi)
                sqlComm.Parameters.AddWithValue("Q1_Call_NomorTelepon", Q1_Call_NomorTelepon)
                sqlComm.Parameters.AddWithValue("Q1_Call_PeriodePenilaian", Q1_Call_PeriodePenilaian)
                'sqlComm.Parameters.AddWithValue("Q1_Call_HasilPenilaian", Q1_Call_HasilPenilaian)
                'sqlComm.Parameters.AddWithValue("Q1_Call_FeedbackPenilaian", Q1_Call_FeedbackPenilaian)
                sqlComm.Parameters.AddWithValue("Q1_Call_UserType", Q1_Call_UserType)
                sqlComm.Parameters.AddWithValue("Q1_Call_Type", Q1_Call_Type)
                sqlComm.Parameters.AddWithValue("Q1_Call_QaID", Q1_Call_QaID)
                sqlComm.Parameters.AddWithValue("Q1_Call_AcraID", Q1_Call_AcraID)
                sqlComm.Parameters.AddWithValue("Q1_Call_AgentID", Q1_Call_AgentID)
                sqlComm.Parameters.AddWithValue("Q1_Call_ActionType", Q1_Call_ActionType)
                sqlComm.Parameters.AddWithValue("Q1_Call_InteractionHeader", Q1_Call_InteractionHeader)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    QM_ID = sqldr("ID").ToString
                    QM_HeaderID = sqldr("QM_HeaderID").ToString
                    QMAcraID = sqldr("acra_id").ToString
                    QMQaID = sqldr("qa_id").ToString
                    QMTpe = sqldr("type").ToString
                    QMQAType = sqldr("qa_type").ToString
                    QMAgent = sqldr("agent").ToString
                    QMStatus = sqldr("status_data").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Q1_Call_InsertTransaction '" & Q1_Call_NamaAgent & "','" & Q1_Call_CmbChannel & "','" & Q1_Call_CmbJenisPermasalahan & "','" & Q1_Call_NoTiket & "'," +
                                                       "'" & Q1_Call_Calltype & "','" & Q1_Call_NamaNasabah & "','" & Q1_Call_NomorKartu & "','" & Q1_Call_WaktuInteraksi & "'," +
                                                       "'" & Q1_Call_Durasi & "','" & Q1_Call_NomorTelepon & "','" & Q1_Call_PeriodePenilaian & "',
                                                       '" & Q1_Call_UserType & "','" & Q1_Call_Type & "','" & Q1_Call_QaID & "'," +
                                                       "'" & Q1_Call_AcraID & "','" & Q1_Call_AgentID & "','" & Q1_Call_ActionType & "','" & Q1_Call_InteractionHeader & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultID = QM_HeaderID
            objectTickets.ResultTableID = QM_ID
            objectTickets.ResultAcraID = QMAcraID
            objectTickets.ResultQaID = QMQaID
            objectTickets.ResultType = QMTpe
            objectTickets.ResultQAType = QMQAType
            objectTickets.ResultAgent = QMAgent
            objectTickets.ResultStatus = QMStatus
            objectTickets.ResultMessage = "Data Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec Q1_Call_InsertTransaction '" & Q1_Call_NamaAgent & "','" & Q1_Call_CmbChannel & "','" & Q1_Call_CmbJenisPermasalahan & "','" & Q1_Call_NoTiket & "'," +
                                                       "'" & Q1_Call_Calltype & "','" & Q1_Call_NamaNasabah & "','" & Q1_Call_NomorKartu & "','" & Q1_Call_WaktuInteraksi & "'," +
                                                       "'" & Q1_Call_Durasi & "','" & Q1_Call_NomorTelepon & "','" & Q1_Call_PeriodePenilaian & "',
                                                       '" & Q1_Call_UserType & "','" & Q1_Call_Type & "','" & Q1_Call_QaID & "'," +
                                                       "'" & Q1_Call_AcraID & "','" & Q1_Call_AgentID & "','" & Q1_Call_ActionType & "','" & Q1_Call_InteractionHeader & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Q1_NonCall_InsertTransaction(ByVal Q1_NonCall_NamaAgent As String, ByVal Q1_NonCall_CmbChannel As String, ByVal Q1_NonCall_CmbJenisPermasalahan As String,
                                              ByVal Q1_NonCall_NoTiket As String, ByVal Q1_NonCall_Calltype As String, ByVal Q1_NonCall_NamaNasabah As String,
                                              ByVal Q1_NonCall_NamaAccount As String, ByVal Q1_NonCall_NomorKartu As String, ByVal Q1_NonCall_WaktuInteraksi As String,
                                              ByVal Q1_NonCall_NomorTelepon As String, ByVal Q1_NonCall_PeriodePenilaian As String, Q1_NonCall_UserType As String, ByVal Q1_NonCall_Type As String,
                                              ByVal Q1_NonCall_QaID As String, Q1_NonCall_AcraID As String, Q1_NonCall_AgentID As String, ByVal Q1_NonCall_ActionType As String,
                                              ByVal Q1_NonCall_InteractionHeader As String
                                              ) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim QM_HeaderID, QM_ID, QMAcraID, QMQaID, QMTpe, QMQAType, QMAgent, QMStatus As String
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Q1_NonCall_InsertTransaction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("Q1_NonCall_NamaAgent", Q1_NonCall_NamaAgent)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_CmbChannel", Q1_NonCall_CmbChannel)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_CmbJenisPermasalahan", Q1_NonCall_CmbJenisPermasalahan)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_NoTiket", Q1_NonCall_NoTiket)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_Calltype", Q1_NonCall_Calltype)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_NamaNasabah", Q1_NonCall_NamaNasabah)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_NamaAccount", Q1_NonCall_NamaAccount)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_NomorKartu", Q1_NonCall_NomorKartu)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_WaktuInteraksi", Q1_NonCall_WaktuInteraksi)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_NomorTelepon", Q1_NonCall_NomorTelepon)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_PeriodePenilaian", Q1_NonCall_PeriodePenilaian)
                'sqlComm.Parameters.AddWithValue("Q1_NonCall_HasilPenilaian", Q1_NonCall_HasilPenilaian)
                'sqlComm.Parameters.AddWithValue("Q1_NonCall_FeedbackPenilaian", Q1_NonCall_FeedbackPenilaian)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_UserType", Q1_NonCall_UserType)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_Type", Q1_NonCall_Type)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_QaID", Q1_NonCall_QaID)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_AcraID", Q1_NonCall_AcraID)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_AgentID", Q1_NonCall_AgentID)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_ActionType", Q1_NonCall_ActionType)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_InteractionHeader", Q1_NonCall_InteractionHeader)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    QM_ID = sqldr("ID").ToString
                    QM_HeaderID = sqldr("QM_HeaderID").ToString
                    QMAcraID = sqldr("acra_id").ToString
                    QMQaID = sqldr("qa_id").ToString
                    QMTpe = sqldr("type").ToString
                    QMQAType = sqldr("qa_type").ToString
                    QMAgent = sqldr("agent").ToString
                    QMStatus = sqldr("status_data").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultID = QM_HeaderID
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Q1_NonCall_InsertTransaction '" & Q1_NonCall_NamaAgent & "','" & Q1_NonCall_CmbChannel & "','" & Q1_NonCall_CmbJenisPermasalahan & "','" & Q1_NonCall_NoTiket & "'," +
                                                       "'" & Q1_NonCall_Calltype & "','" & Q1_NonCall_NamaNasabah & "','" & Q1_NonCall_NamaAccount & "','" & Q1_NonCall_NomorKartu & "','" & Q1_NonCall_WaktuInteraksi & "'," +
                                                       "'" & Q1_NonCall_NomorTelepon & "','" & Q1_NonCall_PeriodePenilaian & "','" & Q1_NonCall_UserType & "','" & Q1_NonCall_Type & "','" & Q1_NonCall_QaID & "'," +
                                                       "'" & Q1_NonCall_AcraID & "','" & Q1_NonCall_AgentID & "','" & Q1_NonCall_ActionType & "','" & Q1_NonCall_InteractionHeader & "','" & QM_HeaderID & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultID = QM_HeaderID
            objectTickets.ResultTableID = QM_ID
            objectTickets.ResultAcraID = QMAcraID
            objectTickets.ResultQaID = QMQaID
            objectTickets.ResultType = QMTpe
            objectTickets.ResultQAType = QMQAType
            objectTickets.ResultAgent = QMAgent
            objectTickets.ResultStatus = QMStatus
            objectTickets.ResultMessage = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec Q1_NonCall_InsertTransaction '" & Q1_NonCall_NamaAgent & "','" & Q1_NonCall_CmbChannel & "','" & Q1_NonCall_CmbJenisPermasalahan & "','" & Q1_NonCall_NoTiket & "'," +
                                                       "'" & Q1_NonCall_Calltype & "','" & Q1_NonCall_NamaNasabah & "','" & Q1_NonCall_NamaAccount & "','" & Q1_NonCall_NomorKartu & "','" & Q1_NonCall_WaktuInteraksi & "'," +
                                                       "'" & Q1_NonCall_NomorTelepon & "','" & Q1_NonCall_PeriodePenilaian & "','" & Q1_NonCall_UserType & "','" & Q1_NonCall_Type & "','" & Q1_NonCall_QaID & "'," +
                                                       "'" & Q1_NonCall_AcraID & "','" & Q1_NonCall_AgentID & "','" & Q1_NonCall_ActionType & "','" & Q1_NonCall_InteractionHeader & "','" & QM_HeaderID & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Q2_Call_InsertTransaction(ByVal Q2_Call_NamaAgent As String, ByVal Q2_Call_CmbChannel As String, ByVal Q2_Call_CmbJenisPermasalahan As String,
                                              ByVal Q2_Call_NoTiket As String, ByVal Q2_Call_Calltype As String, ByVal Q2_Call_NamaPekerja As String,
                                              ByVal Q2_Call_KodeUker As String, ByVal Q2_Call_NamaUker As String, ByVal Q2_Call_NamaKanwil As String,
                                              ByVal Q2_Call_WaktuInteraksi As String, ByVal Q2_Call_Durasi As String,
                                              ByVal Q2_Call_NomorTelepon As String, ByVal Q2_Call_PeriodePenilaian As String, ByVal Q2_Call_HasilPenilaian As String,
                                              ByVal Q2_Call_FeedbackPenilaian As String, Q2_Call_UserType As String, ByVal Q2_Call_Type As String,
                                              ByVal Q2_Call_QaID As String, ByVal Q2_Call_AcraID As String, ByVal Q2_Call_AgentID As String, ByVal Q2_Call_ActionType As String,
                                              ByVal Q1_Call_InteractionHeader As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim QM_HeaderID As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Q2_Call_InsertTransaction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("Q2_Call_NamaAgent", Q2_Call_NamaAgent)
                sqlComm.Parameters.AddWithValue("Q2_Call_CmbChannel", Q2_Call_CmbChannel)
                sqlComm.Parameters.AddWithValue("Q2_Call_CmbJenisPermasalahan", Q2_Call_CmbJenisPermasalahan)
                sqlComm.Parameters.AddWithValue("Q2_Call_NoTiket", Q2_Call_NoTiket)
                sqlComm.Parameters.AddWithValue("Q2_Call_Calltype", Q2_Call_Calltype)
                sqlComm.Parameters.AddWithValue("Q2_Call_NamaPekerja", Q2_Call_NamaPekerja)
                sqlComm.Parameters.AddWithValue("Q2_Call_KodeUker", Q2_Call_KodeUker)
                sqlComm.Parameters.AddWithValue("Q2_Call_NamaUker", Q2_Call_NamaUker)
                sqlComm.Parameters.AddWithValue("Q2_Call_NamaKanwil", Q2_Call_NamaKanwil)
                sqlComm.Parameters.AddWithValue("Q2_Call_WaktuInteraksi", Q2_Call_WaktuInteraksi)
                sqlComm.Parameters.AddWithValue("Q2_Call_Durasi", Q2_Call_Durasi)
                sqlComm.Parameters.AddWithValue("Q2_Call_NomorTelepon", Q2_Call_NomorTelepon)
                sqlComm.Parameters.AddWithValue("Q2_Call_PeriodePenilaian", Q2_Call_PeriodePenilaian)
                sqlComm.Parameters.AddWithValue("Q2_Call_HasilPenilaian", Q2_Call_HasilPenilaian)
                sqlComm.Parameters.AddWithValue("Q2_Call_FeedbackPenilaian", Q2_Call_FeedbackPenilaian)
                sqlComm.Parameters.AddWithValue("Q2_Call_UserType", Q2_Call_UserType)
                sqlComm.Parameters.AddWithValue("Q2_Call_Type", Q2_Call_Type)
                sqlComm.Parameters.AddWithValue("Q2_Call_QaID", Q2_Call_QaID)
                sqlComm.Parameters.AddWithValue("Q2_Call_AcraID", Q2_Call_AcraID)
                sqlComm.Parameters.AddWithValue("Q2_Call_AgentID", Q2_Call_AgentID)
                sqlComm.Parameters.AddWithValue("Q2_Call_ActionType", Q2_Call_ActionType)
                sqlComm.Parameters.AddWithValue("Q1_Call_InteractionHeader", Q1_Call_InteractionHeader)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    QM_HeaderID = sqldr("QM_HeaderID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Q2_Call_InsertTransaction '" & Q2_Call_NamaAgent & "','" & Q2_Call_CmbChannel & "','" & Q2_Call_CmbJenisPermasalahan & "','" & Q2_Call_NoTiket & "'," +
                                                       "'" & Q2_Call_Calltype & "','" & Q2_Call_NamaPekerja & "','" & Q2_Call_KodeUker & "','" & Q2_Call_NamaUker & "'," +
                                                       "'" & Q2_Call_NamaKanwil & "','" & Q2_Call_WaktuInteraksi & "'," +
                                                       "'" & Q2_Call_Durasi & "','" & Q2_Call_NomorTelepon & "','" & Q2_Call_PeriodePenilaian & "','" & Q2_Call_HasilPenilaian & "'," +
                                                       "'" & Q2_Call_FeedbackPenilaian & "','" & Q2_Call_UserType & "','" & Q2_Call_Type & "','" & Q2_Call_QaID & "'," +
                                                       "'" & Q2_Call_AcraID & "','" & Q2_Call_AgentID & "','" & Q2_Call_ActionType & "','" & Q1_Call_InteractionHeader & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultID = QM_HeaderID
            objectTickets.ResultMessage = "Data Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec Q2_Call_InsertTransaction '" & Q2_Call_NamaAgent & "','" & Q2_Call_CmbChannel & "','" & Q2_Call_CmbJenisPermasalahan & "','" & Q2_Call_NoTiket & "'," +
                                                       "'" & Q2_Call_Calltype & "','" & Q2_Call_NamaPekerja & "','" & Q2_Call_KodeUker & "','" & Q2_Call_NamaUker & "'," +
                                                       "'" & Q2_Call_NamaKanwil & "','" & Q2_Call_WaktuInteraksi & "'," +
                                                       "'" & Q2_Call_Durasi & "','" & Q2_Call_NomorTelepon & "','" & Q2_Call_PeriodePenilaian & "','" & Q2_Call_HasilPenilaian & "'," +
                                                       "'" & Q2_Call_FeedbackPenilaian & "','" & Q2_Call_UserType & "','" & Q2_Call_Type & "','" & Q2_Call_QaID & "'," +
                                                       "'" & Q2_Call_AcraID & "','" & Q2_Call_AgentID & "','" & Q2_Call_ActionType & "','" & Q1_Call_InteractionHeader & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Q2_NonCall_InsertTransaction(ByVal Q2_NonCall_NamaAgent As String, ByVal Q2_NonCall_CmbChannel As String, ByVal Q2_NonCall_CmbJenisPermasalahan As String,
                                              ByVal Q2_NonCall_NoTiket As String, ByVal Q2_NonCall_Calltype As String, ByVal Q2_NonCall_NamaPekerja As String,
                                              ByVal Q2_NonCall_KodeUker As String, ByVal Q2_NonCall_NamaUker As String, ByVal Q2_NonCall_NamaKanwil As String,
                                              ByVal Q2_NonCall_WaktuInteraksi As String, ByVal Q2_NonCall_PeriodePenilaian As String, ByVal Q2_NonCall_HasilPenilaian As String,
                                              ByVal Q2_NonCall_FeedbackPenilaian As String, Q2_NonCall_UserType As String, ByVal Q2_NonCall_Type As String,
                                              ByVal Q2_NonCall_QaID As String, Q2_NonCall_AcraID As String, Q2_NonCall_AgentID As String, ByVal Q2_NonCall_ActionType As String,
                                              ByVal Q1_NonCall_InteractionHeader As String
                                              ) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim QM_HeaderID As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Q2_NonCall_InsertTransaction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("Q2_NonCall_NamaAgent", Q2_NonCall_NamaAgent)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_CmbChannel", Q2_NonCall_CmbChannel)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_CmbJenisPermasalahan", Q2_NonCall_CmbJenisPermasalahan)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_NoTiket", Q2_NonCall_NoTiket)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_Calltype", Q2_NonCall_Calltype)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_NamaPekerja", Q2_NonCall_NamaPekerja)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_KodeUker", Q2_NonCall_KodeUker)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_NamaUker", Q2_NonCall_NamaUker)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_NamaKanwil", Q2_NonCall_NamaKanwil)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_WaktuInteraksi", Q2_NonCall_WaktuInteraksi)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_PeriodePenilaian", Q2_NonCall_PeriodePenilaian)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_HasilPenilaian", Q2_NonCall_HasilPenilaian)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_FeedbackPenilaian", Q2_NonCall_FeedbackPenilaian)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_UserType", Q2_NonCall_UserType)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_Type", Q2_NonCall_Type)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_QaID", Q2_NonCall_QaID)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_AcraID", Q2_NonCall_AcraID)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_AgentID", Q2_NonCall_AgentID)
                sqlComm.Parameters.AddWithValue("Q2_NonCall_ActionType", Q2_NonCall_ActionType)
                sqlComm.Parameters.AddWithValue("Q1_NonCall_InteractionHeader", Q1_NonCall_InteractionHeader)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    QM_HeaderID = sqldr("QM_HeaderID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultID = QM_HeaderID
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Q2_NonCall_InsertTransaction '" & Q2_NonCall_NamaAgent & "','" & Q2_NonCall_CmbChannel & "','" & Q2_NonCall_CmbJenisPermasalahan & "','" & Q2_NonCall_NoTiket & "'," +
                                                       "'" & Q2_NonCall_Calltype & "','" & Q2_NonCall_NamaPekerja & "','" & Q2_NonCall_KodeUker & "','" & Q2_NonCall_NamaUker & "'," +
                                                       "'" & Q2_NonCall_NamaKanwil & "','" & Q2_NonCall_WaktuInteraksi & "','" & Q2_NonCall_PeriodePenilaian & "','" & Q2_NonCall_HasilPenilaian & "'," +
                                                       "'" & Q2_NonCall_FeedbackPenilaian & "','" & Q2_NonCall_UserType & "','" & Q2_NonCall_Type & "','" & Q2_NonCall_QaID & "'," +
                                                       "'" & Q2_NonCall_AcraID & "','" & Q2_NonCall_AgentID & "','" & Q2_NonCall_ActionType & "','" & Q1_NonCall_InteractionHeader & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultID = QM_HeaderID
            objectTickets.ResultMessage = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec Q2_NonCall_InsertTransaction '" & Q2_NonCall_NamaAgent & "','" & Q2_NonCall_CmbChannel & "','" & Q2_NonCall_CmbJenisPermasalahan & "','" & Q2_NonCall_NoTiket & "'," +
                                                           "'" & Q2_NonCall_Calltype & "','" & Q2_NonCall_NamaPekerja & "','" & Q2_NonCall_KodeUker & "','" & Q2_NonCall_NamaUker & "'," +
                                                           "'" & Q2_NonCall_NamaKanwil & "','" & Q2_NonCall_WaktuInteraksi & "','" & Q2_NonCall_PeriodePenilaian & "','" & Q2_NonCall_HasilPenilaian & "'," +
                                                           "'" & Q2_NonCall_FeedbackPenilaian & "','" & Q2_NonCall_UserType & "','" & Q2_NonCall_Type & "','" & Q2_NonCall_QaID & "'," +
                                                           "'" & Q2_NonCall_AcraID & "','" & Q2_NonCall_AgentID & "','" & Q2_NonCall_ActionType & "','" & Q1_NonCall_InteractionHeader & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QA_TableTesting(ByVal Value1 As String, ByVal Value2 As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim QM_HeaderID As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QA_TableTesting"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("Value1", Value1)
                sqlComm.Parameters.AddWithValue("Value2", Value2)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QA_TableTesting '" & Value1 & "','" & Value2 & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultMessage = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec QA_TableTesting '" & Value1 & "','" & Value2 & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_CancelTransaction(ByVal QM_QaName As String, ByVal QM_UserType As String, ByVal QM_Type As String,
                                          ByVal QM_QaID As String, ByVal QM_AcraID As String, ByVal QM_AgentID As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_CancelTransaction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("QM_QaName", QM_QaName)
                sqlComm.Parameters.AddWithValue("QM_UserType", QM_UserType)
                sqlComm.Parameters.AddWithValue("QM_Type", QM_Type)
                sqlComm.Parameters.AddWithValue("QM_QaID", QM_QaID)
                sqlComm.Parameters.AddWithValue("QM_AcraID", QM_AcraID)
                sqlComm.Parameters.AddWithValue("QM_AgentID", QM_AgentID)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_CancelTransaction '" & QM_QaName & "','" & QM_UserType & "','" & QM_Type & "','" & QM_QaID & "','" & QM_AcraID & "','" & QM_AgentID & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultMessage = "Data Note Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec QM_CancelTransaction '" & QM_QaName & "','" & QM_UserType & "','" & QM_Type & "','" & QM_QaID & "','" & QM_AcraID & "','" & QM_AgentID & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_TrxDetailPenilaian(ByVal QM_HeaderID As String, ByVal QM_AcraID As String, ByVal QM_AgentID As String,
                                           ByVal QM_QaName As String, ByVal QM_UserType As String, ByVal QM_Type As String,
                                           ByVal QM_Channel As String, ByVal QM_QaID As String, ByVal QM_KodeGrup As String,
                                           ByVal QM_KodePertanyaan As String, ByVal QM_KodePenilaian As String,
                                          ByVal QM_Nilai As String, ByVal QM_Action As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim ResultPenilaianID As String = String.Empty
        Dim ResultHeaderID As String = String.Empty
        Dim ResultAcraID As String = String.Empty
        Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
        Dim GenerateAcraID As String = String.Empty
        If QM_AcraID = "-" Then
            GenerateAcraID = strTime & New Random().Next(1000000, 9999999)
        Else
            GenerateAcraID = QM_AcraID
        End If
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_TrxDetailPenilaian"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("QM_HeaderID", QM_HeaderID)
                sqlComm.Parameters.AddWithValue("QM_AcraID", GenerateAcraID)
                sqlComm.Parameters.AddWithValue("QM_AgentID", QM_AgentID)
                sqlComm.Parameters.AddWithValue("QM_QaName", QM_QaName)
                sqlComm.Parameters.AddWithValue("QM_UserType", QM_UserType)
                sqlComm.Parameters.AddWithValue("QM_Type", QM_Type)
                sqlComm.Parameters.AddWithValue("QM_Channel", QM_Channel)
                sqlComm.Parameters.AddWithValue("QM_QaID", QM_QaID)
                sqlComm.Parameters.AddWithValue("QM_KodeGrup", QM_KodeGrup)
                sqlComm.Parameters.AddWithValue("QM_KodePertanyaan", QM_KodePertanyaan)
                sqlComm.Parameters.AddWithValue("QM_KodePenilaian", QM_KodePenilaian)
                sqlComm.Parameters.AddWithValue("QM_Nilai", QM_Nilai)
                sqlComm.Parameters.AddWithValue("QM_Action", QM_Action)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    ResultPenilaianID = sqldr("ResultID").ToString
                    ResultHeaderID = sqldr("HeaderID").ToString
                    ResultAcraID = sqldr("AcraID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxDetailPenilaian '" & QM_HeaderID & "','" & QM_AcraID & "','" & QM_AgentID & "','" & QM_QaName & "','" & QM_UserType & "','" & QM_Type & "'," &
                                                   "'" & QM_Channel & "', '" & QM_QaID & "','" & QM_KodeGrup & "','" & QM_KodePertanyaan & "','" & QM_KodePenilaian & "','" & QM_Nilai & "','" & QM_Action & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultID = ResultPenilaianID
            objectTickets.ResultHeaderID = ResultHeaderID
            objectTickets.ResultAcraID = ResultAcraID
            objectTickets.ResultMessage = "Data Note Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxDetailPenilaian '" & QM_HeaderID & "','" & QM_AcraID & "','" & QM_AgentID & "','" & QM_QaName & "','" & QM_UserType & "','" & QM_Type & "'," &
                                                   "'" & QM_Channel & "', '" & QM_QaID & "','" & QM_KodeGrup & "','" & QM_KodePertanyaan & "','" & QM_KodePenilaian & "','" & QM_Nilai & "','" & QM_Action & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_TrxCommentPenilaian(ByVal QM_HeaderID As String, ByVal QM_AcraID As String,
                                           ByVal QM_DetailID As String, ByVal QM_Comments As String,
                                           ByVal QM_CreatedBy As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_TrxCommentPenilaian"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("QM_HeaderID", QM_HeaderID)
                sqlComm.Parameters.AddWithValue("QM_AcraID", QM_AcraID)
                sqlComm.Parameters.AddWithValue("QM_DetailID", QM_DetailID)
                sqlComm.Parameters.AddWithValue("QM_Comments", QM_Comments)
                sqlComm.Parameters.AddWithValue("QM_CreatedBy", QM_CreatedBy)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxCommentPenilaian '" & QM_HeaderID & "','" & QM_AcraID & "','" & QM_DetailID & "','" & QM_Comments & "','" & QM_CreatedBy & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultMessage = "Data Note Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxCommentPenilaian '" & QM_HeaderID & "','" & QM_AcraID & "','" & QM_DetailID & "','" & QM_Comments & "','" & QM_CreatedBy & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    Public Function UploadFileComments() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim CreatedBy As String = HttpContext.Current.Request.Form("Username")
        Dim HeaderID As String = HttpContext.Current.Request.Form("HeaderID")
        Dim AcraID As String = HttpContext.Current.Request.Form("AcraID")
        Dim DetailID As String = HttpContext.Current.Request.Form("DetailID")
        Dim Type As String = HttpContext.Current.Request.Form("Type")
        Dim SavePath As String = HttpContext.Current.Server.MapPath(FolderFileComments & "" & HeaderID & "/" & DetailID.Replace("..", ""))
        'Dim idHeader As String = HttpContext.Current.Request.Form("idHeader")
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath(FolderFileComments & "" & HeaderID & "/" & DetailID.Replace("..", "")))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        End If

        For i As Integer = 0 To Files.Count - 1

            Dim File As HttpPostedFile = Files(i)
            FileId = Guid.NewGuid()
            FileName = File.FileName
            FileExt = Path.GetExtension(File.FileName)
            FileSizing = File.ContentLength

            Dim validFileTypes As String() = {"bmp", "gif", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "pdf"}
            Dim isValidFile As Boolean = False
            For j As Integer = 0 To validFileTypes.Length - 1
                If FileExt = "." & validFileTypes(j) Then
                    Dim FileMod As DateTime = DateTime.Now
                    Dim FileType As String = File.ContentType
                    Dim FileSize As Long = File.ContentLength / 1024
                    Dim FilePath As String = FolderFileComments & "" & HeaderID & "/" & DetailID.Replace("..", "")
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
            Dim path As String = HttpContext.Current.Server.MapPath(FolderFileComments & "" & HeaderID & "/" & DetailID.Replace("..", "") & "" & String.Concat(FileId, FileExt))
            Dim TrxUrl As String = HeaderID & "/" & DetailID.Replace("..", "") & "/" & String.Concat(FileId, FileExt)

            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "QM_TrxCommentAttachment"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("HeaderID", HeaderID)
                    sqlComm.Parameters.AddWithValue("AcraID", AcraID)
                    sqlComm.Parameters.AddWithValue("DetailID", DetailID)
                    sqlComm.Parameters.AddWithValue("FileNameURL", TrxUrl)
                    sqlComm.Parameters.AddWithValue("FileName", FileName)
                    sqlComm.Parameters.AddWithValue("FileType", FileExt)
                    sqlComm.Parameters.AddWithValue("Type", Type)
                    sqlComm.Parameters.AddWithValue("CreatedBy", CreatedBy)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception
                strExec = "exec QM_TrxCommentAttachment '" & HeaderID & "','" & AcraID & "','" & DetailID & "','" & TrxUrl & "','" & FileName & "','" & FileExt & "','" & Type & "','" & CreatedBy & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                strExec = "exec QM_TrxCommentAttachment '" & HeaderID & "','" & AcraID & "','" & DetailID & "','" & TrxUrl & "','" & FileName & "','" & FileExt & "','" & Type & "','" & CreatedBy & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try
        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Return Response
    End Function
    <WebMethod(EnableSession:=True)>
    Public Function UploadFileHeader() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim CreatedBy As String = HttpContext.Current.Request.Form("Username")
        Dim AcraID As String = HttpContext.Current.Request.Form("AcraID")
        Dim HeaderID As String = HttpContext.Current.Request.Form("HeaderID")
        Dim SavePath As String = HttpContext.Current.Server.MapPath(FolderFileHeaders & "" & HeaderID.Replace("..", "") & "/")
        'Dim idHeader As String = HttpContext.Current.Request.Form("idHeader")
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath(FolderFileHeaders & "" & HeaderID.Replace("..", "")))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        End If
        For i As Integer = 0 To Files.Count - 1
            Dim File As HttpPostedFile = Files(i)
            FileId = Guid.NewGuid()
            FileName = File.FileName
            FileExt = Path.GetExtension(File.FileName)
            FileSizing = File.ContentLength

            Dim validFileTypes As String() = {"bmp", "gif", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "pdf"}
            Dim isValidFile As Boolean = False
            For j As Integer = 0 To validFileTypes.Length - 1
                If FileExt = "." & validFileTypes(j) Then

                    Dim FileMod As DateTime = DateTime.Now
                    Dim FileType As String = File.ContentType
                    Dim FileSize As Long = File.ContentLength / 1024
                    Dim FilePath As String = FolderFileHeaders & "" & HeaderID.Replace("..", "") & "/"
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
            Dim path As String = HttpContext.Current.Server.MapPath(FolderFileHeaders & "" & HeaderID.Replace("..", "") & "/" & String.Concat(FileId, FileExt))
            Dim TrxUrl As String = HeaderID & "/" & String.Concat(FileId, FileExt)

            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "QM_TrxHeaderAttachment"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("HeaderID", HeaderID)
                    sqlComm.Parameters.AddWithValue("AcraID", AcraID)
                    sqlComm.Parameters.AddWithValue("FileNameURL", TrxUrl)
                    sqlComm.Parameters.AddWithValue("FileName", FileName)
                    sqlComm.Parameters.AddWithValue("FileType", FileExt)
                    sqlComm.Parameters.AddWithValue("CreatedBy", CreatedBy)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception
                strExec = "exec QM_TrxHeaderAttachment '" & HeaderID & "','" & AcraID & "','" & TrxUrl & "','" & FileName & "','" & FileExt & "','" & CreatedBy & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                strExec = "exec QM_TrxHeaderAttachment '" & HeaderID & "','" & AcraID & "','" & TrxUrl & "','" & FileName & "','" & FileExt & "','" & CreatedBy & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try
        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Return Response
    End Function
    <WebMethod(EnableSession:=True)>
    Public Function UploadFileInteraction() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim CreatedBy As String = HttpContext.Current.Request.Form("Username")
        Dim AcraID As String = HttpContext.Current.Request.Form("AcraID")
        Dim HeaderID As String = HttpContext.Current.Request.Form("HeaderID")
        Dim SavePath As String = HttpContext.Current.Server.MapPath(FolderFileInteractions & "" & HeaderID.Replace("..", "") & "/")
        'Dim idHeader As String = HttpContext.Current.Request.Form("idHeader")
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath(FolderFileInteractions & "" & HeaderID.Replace("..", "")))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        End If
        For i As Integer = 0 To Files.Count - 1
            Dim File As HttpPostedFile = Files(i)
            FileId = Guid.NewGuid()
            FileName = File.FileName
            FileExt = Path.GetExtension(File.FileName)
            FileSizing = File.ContentLength

            Dim validFileTypes As String() = {"bmp", "gif", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "pdf"}
            Dim isValidFile As Boolean = False
            For j As Integer = 0 To validFileTypes.Length - 1
                If FileExt = "." & validFileTypes(j) Then

                    Dim FileMod As DateTime = DateTime.Now
                    Dim FileType As String = File.ContentType
                    Dim FileSize As Long = File.ContentLength / 1024
                    Dim FilePath As String = FolderFileInteractions & "" & HeaderID.Replace("..", "")
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
            Dim path As String = HttpContext.Current.Server.MapPath(FolderFileInteractions & "" & HeaderID.Replace("..", "") & "/" & String.Concat(FileId, FileExt))
            Dim TrxUrl As String = HeaderID & "/" & String.Concat(FileId, FileExt)

            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "QM_TrxInteractionAttachment"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("HeaderID", HeaderID)
                    sqlComm.Parameters.AddWithValue("AcraID", AcraID)
                    sqlComm.Parameters.AddWithValue("FileNameURL", TrxUrl)
                    sqlComm.Parameters.AddWithValue("FileName", FileName)
                    sqlComm.Parameters.AddWithValue("FileType", FileExt)
                    sqlComm.Parameters.AddWithValue("CreatedBy", CreatedBy)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception
                strExec = "exec QM_TrxInteractionAttachment '" & HeaderID & "','" & AcraID & "','" & TrxUrl & "','" & FileName & "','" & FileExt & "','" & CreatedBy & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                strExec = "exec QM_TrxInteractionAttachment '" & HeaderID & "','" & AcraID & "','" & TrxUrl & "','" & FileName & "','" & FileExt & "','" & CreatedBy & "'"
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
    Public Function QM_TrxInteractionPenilaian(ByVal QM_HeaderID As String, ByVal QM_AcraID As String,
                                          ByVal QM_Status As String, ByVal QM_Description As String, ByVal QM_Kesimpulan As String, ByVal QM_Rating As String,
                                          ByVal QM_CreatedBy As String, ByVal QM_StatusReturn As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim Rating As String = String.Empty
        If QM_Rating = "" Then
            Rating = 0
        Else
            Rating = QM_Rating
        End If
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_TrxInteractionPenilaian"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("QM_HeaderID", QM_HeaderID)
                sqlComm.Parameters.AddWithValue("QM_AcraID", QM_AcraID)
                sqlComm.Parameters.AddWithValue("QM_Description", QM_Description)
                sqlComm.Parameters.AddWithValue("QM_Kesimpulan", QM_Kesimpulan)
                sqlComm.Parameters.AddWithValue("QM_Rating", Rating)
                sqlComm.Parameters.AddWithValue("QM_Status", QM_Status)
                sqlComm.Parameters.AddWithValue("QM_CreatedBy", QM_CreatedBy)
                sqlComm.Parameters.AddWithValue("QM_StatusReturn", QM_StatusReturn)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxInteractionPenilaian '" & QM_HeaderID & "','" & QM_AcraID & "','" & QM_Description & "','" & QM_Kesimpulan & "','" & Rating & "','" & QM_Status & "','" & QM_CreatedBy & "','" & QM_StatusReturn & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultMessage = "Data Note Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxInteractionPenilaian '" & QM_HeaderID & "','" & QM_AcraID & "','" & QM_Description & "','" & QM_Kesimpulan & "','" & Rating & "','" & QM_Status & "','" & QM_CreatedBy & "','" & QM_StatusReturn & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_TrxKesimpulanSaran(ByVal QM_HeaderID As String, ByVal QM_AcraID As String, ByVal QM_Kesimpulan As String, ByVal QM_Rating As String, ByVal QM_CreatedBy As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_TrxKesimpulanSaran"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("QM_HeaderID", QM_HeaderID)
                sqlComm.Parameters.AddWithValue("QM_AcraID", QM_AcraID)
                sqlComm.Parameters.AddWithValue("QM_Kesimpulan", QM_Kesimpulan)
                sqlComm.Parameters.AddWithValue("QM_Rating", QM_Rating)
                sqlComm.Parameters.AddWithValue("QM_CreatedBy", QM_CreatedBy)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxKesimpulanSaran '" & QM_HeaderID & "','" & QM_AcraID & "','" & QM_Kesimpulan & "','" & QM_Rating & "','" & QM_CreatedBy & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultMessage = "Data Note Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxKesimpulanSaran '" & QM_HeaderID & "','" & QM_AcraID & "','" & QM_Kesimpulan & "','" & QM_Rating & "','" & QM_CreatedBy & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_TrxPickup(ByVal QM_HeaderID As String, ByVal QM_StatusData As String, ByVal QM_CreatedBy As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_TrxPickup"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("QM_HeaderID", QM_HeaderID)
                sqlComm.Parameters.AddWithValue("QM_StatusData", QM_StatusData)
                sqlComm.Parameters.AddWithValue("QM_CreatedBy", QM_CreatedBy)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxPickup '" & QM_HeaderID & "','" & QM_StatusData & "','" & QM_CreatedBy & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultMessage = "Data Note Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxPickup '" & QM_HeaderID & "','" & QM_StatusData & "','" & QM_CreatedBy & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_CheckTotalSoal(ByVal QaID As String, ByVal HeaderID As String, ByVal QaName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Try
        '    Using conn As SqlConnection = New SqlConnection(connstring)
        '        conn.Open()

        '        sql = "exec QM_CheckTotalSoal '" & QaID & "','" & HeaderID & "','" & QaName & "'"

        '        Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '        Dim ds As DataSet = New DataSet()
        '        ad.Fill(ds)
        '        dt = ds.Tables(0)
        '        conn.Close()
        '    End Using
        'Catch ex As Exception
        '    LogError(HttpContext.Current.Session("UserName"), ex, sql)
        'Finally
        '    LogSuccess(HttpContext.Current.Session("UserName"), sql)
        'End Try
        'Dim tableJson As String = ConvertDataTabletoString(dt)
        'Return tableJson
        Dim NameSP As String = "Exec QM_CheckTotalSoal"
        Dim sql As String = "" & NameSP & " '" & QaID & "', '" & HeaderID & "', '" & QaName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_CheckTotalSoal", conn)
                sqlComm.Parameters.AddWithValue("@QaID", QaID)
                sqlComm.Parameters.AddWithValue("@HeaderID", HeaderID)
                sqlComm.Parameters.AddWithValue("@QaName", QaName)
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
    Public Function deleteCommentsAttachment(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim _HeaderID As String = String.Empty
        Dim _FileNameURL As String = String.Empty
        Dim _Sfile As String = "SELECT * FROM QA_CommentAttachment WHERE ID='" & TrxID & "'"
        Try
            sqldr = Proses.ExecuteReader(_Sfile)
            If sqldr.HasRows Then
                sqldr.Read()
                _HeaderID = sqldr("HeaderID").ToString
                _FileNameURL = sqldr("FileNameURL").ToString
            Else
            End If
            sqldr.Close()
            LogSuccess(HttpContext.Current.Session("UserName"), _Sfile)
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, _Sfile)
        End Try

        Dim path As String = String.Empty
        path = Server.MapPath("~/FileTransaction/FileComments/" & _FileNameURL)
        Dim file As FileInfo = New FileInfo(path)
        If file.Exists Then
            file.Delete()
        Else
        End If

        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_TrxCommentAttachmentDelete"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxCommentAttachmentDelete '" & TrxID & "','" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultMessage = "File Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxCommentAttachmentDelete '" & TrxID & "','" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function deleteInteractionAttachment(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim _HeaderID As String = String.Empty
        Dim _FileNameURL As String = String.Empty
        Dim _Sfile As String = "SELECT * FROM QA_InteractionAttachment WHERE ID='" & TrxID & "'"
        Try
            sqldr = Proses.ExecuteReader(_Sfile)
            If sqldr.HasRows Then
                sqldr.Read()
                _HeaderID = sqldr("HeaderID").ToString
                _FileNameURL = sqldr("FileNameURL").ToString
            Else
            End If
            sqldr.Close()
            LogSuccess(HttpContext.Current.Session("UserName"), _Sfile)
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, _Sfile)
        End Try

        Dim path As String = String.Empty
        path = Server.MapPath("~/FileTransaction/FileInteraction/" & _FileNameURL)
        Dim file As FileInfo = New FileInfo(path)
        If file.Exists Then
            file.Delete()
        Else
        End If

        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_TrxInteractionAttachmentDelete"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxInteractionAttachmentDelete '" & TrxID & "','" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultMessage = "File Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxInteractionAttachmentDelete '" & TrxID & "','" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_GETTotalNilai(ByVal HeaderID As String, ByVal KodeGrup As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Try
        '    Using conn As SqlConnection = New SqlConnection(connstring)
        '        conn.Open()

        '        sql = "exec QM_GETTotalNilai '" & HeaderID & "', '" & KodeGrup & "'"

        '        Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '        Dim ds As DataSet = New DataSet()
        '        ad.Fill(ds)
        '        dt = ds.Tables(0)
        '        conn.Close()
        '    End Using
        'Catch ex As Exception
        '    LogError(HttpContext.Current.Session("UserName"), ex, sql)
        'Finally
        '    LogSuccess(HttpContext.Current.Session("UserName"), sql)
        'End Try
        'Dim tableJson As String = ConvertDataTabletoString(dt)
        'Return tableJson

        Dim NameSP As String = "Exec QM_GETTotalNilai"
        Dim sql As String = "" & NameSP & " '" & HeaderID & "', '" & KodeGrup & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_GETTotalNilai", conn)
                sqlComm.Parameters.AddWithValue("@HeaderIDNya", HeaderID)
                sqlComm.Parameters.AddWithValue("@KodeNya", KodeGrup)
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
    Public Function QM_GETTotalNilai_Bravo(ByVal HeaderID As String, ByVal KodeGrup As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec QM_GETTotalNilai_Bravo"
        Dim sql As String = "" & NameSP & " '" & HeaderID & "', '" & KodeGrup & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_GETTotalNilai_Bravo", conn)
                sqlComm.Parameters.AddWithValue("@HeaderIDNya", HeaderID)
                sqlComm.Parameters.AddWithValue("@KodeNya", KodeGrup)
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
    Public Function QM_GETTotalNilaiReturn(ByVal HeaderID As String, ByVal KodeGrup As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec QM_GETTotalNilaiReturn"
        Dim sql As String = "" & NameSP & " '" & HeaderID & "', '" & KodeGrup & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_GETTotalNilaiReturn", conn)
                sqlComm.Parameters.AddWithValue("@HeaderIDNya", HeaderID)
                sqlComm.Parameters.AddWithValue("@KodeNya", KodeGrup)
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
    Public Function QM_GETTotalNilaiAll(ByVal HeaderID As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Try
        '    Using conn As SqlConnection = New SqlConnection(connstring)
        '        conn.Open()

        '        sql = "exec QM_GETTotalNilaiAll '" & HeaderID & "'"

        '        Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '        Dim ds As DataSet = New DataSet()
        '        ad.Fill(ds)
        '        dt = ds.Tables(0)
        '        conn.Close()
        '    End Using
        'Catch ex As Exception
        '    LogError(HttpContext.Current.Session("UserName"), ex, sql)
        'Finally
        '    LogSuccess(HttpContext.Current.Session("UserName"), sql)
        'End Try
        'Dim tableJson As String = ConvertDataTabletoString(dt)
        'Return tableJson
        Dim NameSP As String = "Exec QM_GETTotalNilaiAll"
        Dim sql As String = "" & NameSP & " '" & HeaderID & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_GETTotalNilaiAll", conn)
                sqlComm.Parameters.AddWithValue("@HeaderIDNya", HeaderID)
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
    Public Function QM_GETTotalNilaiAll_Bravo(ByVal HeaderID As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec QM_GETTotalNilaiAll_Bravo"
        Dim sql As String = "" & NameSP & " '" & HeaderID & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_GETTotalNilaiAll_Bravo", conn)
                sqlComm.Parameters.AddWithValue("@HeaderIDNya", HeaderID)
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
    Public Function QM_TrxCommentInteraction(ByVal HeaderID As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec QM_TrxCommentInteraction"
        Dim sql As String = "" & NameSP & " '" & HeaderID & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_TrxCommentInteraction", conn)
                sqlComm.Parameters.AddWithValue("@HeaderID", HeaderID)
                'sqlComm.Parameters.AddWithValue("@DetailID", DetailID)
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
    Public Function QM_TrxHistoryPenilaian_Agent(ByVal TrxUserName As String, ByVal TrxAgent As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec QM_TrxHistoryPenilaian_Agent"
        Dim sql As String = "" & NameSP & " '" & TrxUserName & "', '" & TrxAgent & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_TrxHistoryPenilaian_Agent", conn)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAgent", TrxAgent)
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
    Public Function QM_TrxHistoryPenilaian_Return(ByVal TrxUserName As String, ByVal TrxAgent As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec QM_TrxHistoryPenilaian_Return"
        Dim sql As String = "" & NameSP & " '" & TrxUserName & "', '" & TrxAgent & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_TrxHistoryPenilaian_Return", conn)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAgent", TrxAgent)
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
    Public Function QM_Check_Periode(ByVal TrxAgent As String, ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec QM_Check_Periode"
        Dim sql As String = "" & NameSP & " '" & TrxAgent & "','" & TrxUserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_Check_Periode", conn)
                sqlComm.Parameters.AddWithValue("@AgentName", TrxAgent)
                sqlComm.Parameters.AddWithValue("@UserName", TrxUserName)
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
    Public Function QM_Check_Periode_Detail_Q1(ByVal TrxPeriode As String, ByVal TrxAgent As String, ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec QM_Check_Periode_Detail"
        Dim sql As String = "" & NameSP & " '" & TrxPeriode & "','" & TrxAgent & "','" & TrxUserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_Check_Periode_Detail", conn)
                sqlComm.Parameters.AddWithValue("@Periode", TrxPeriode)
                sqlComm.Parameters.AddWithValue("@AgentName", TrxAgent)
                sqlComm.Parameters.AddWithValue("@UserName", TrxUserName)
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
    Public Function QM_Check_Periode_Detail_Q2(ByVal TrxPeriode As String, ByVal TrxAgent As String, ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec QM_Check_Periode_Detail"
        Dim sql As String = "" & NameSP & " '" & TrxPeriode & "','" & TrxAgent & "','" & TrxUserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_Check_Periode_Detail", conn)
                sqlComm.Parameters.AddWithValue("@Periode", TrxPeriode)
                sqlComm.Parameters.AddWithValue("@AgentName", TrxAgent)
                sqlComm.Parameters.AddWithValue("@UserName", TrxUserName)
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
    Public Function UIDESK_TrmMasterCombo(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrmDropdown"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmDropdown", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_TrxDropdown(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxStatus As String, ByVal TrxAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec QM_TrxDropdown"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_TrxDropdown", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecords(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Using conn As SqlConnection = New SqlConnection(connstring)
            conn.Open()
            If tableType = "AllWhereData" Then
                Try
                    CommandTextValidator.ValidateStatement("select * from [" & tableName & "] " & paramQuery & " ", StatementTypes.Select)
                    'System.Diagnostics.Debug.WriteLine("Validation worked. The semicolon and statement are inside a text block.")
                    sql = "select * from [" & tableName & "] " & paramQuery & " "
                    LogSuccess(strLogTime, sql)
                Catch ex As System.Exception
                    LogError(strLogTime, ex, sql)
                    'System.Diagnostics.Debug.WriteLine("Validation failed. The following error was thrown: " & ex.Message)
                End Try
                ' Ori sql = "select * from [" & tableName & "] " & paramQuery & " "
            End If
            Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
            Dim ds As DataSet = New DataSet()
            ad.Fill(ds)
            dt = ds.Tables(0)
            conn.Close()
        End Using
        Dim tableJson As String = ConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_GETTotalNilaiHistory(ByVal HeaderID As String, ByVal KodeGrup As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec QM_GETTotalNilaiHistory"
        Dim sql As String = "" & NameSP & " '" & HeaderID & "', '" & KodeGrup & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QM_GETTotalNilaiHistory", conn)
                sqlComm.Parameters.AddWithValue("@HeaderIDNya", HeaderID)
                sqlComm.Parameters.AddWithValue("@KodeNya", KodeGrup)
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
    Public Function UP_Durasi(ByVal ID As String, ByVal Durasi As String, ByVal DurasiEnd As String, ByVal UserName As String, ByVal Action As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "BRA_TrxDurasi"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("ID", ID)
                sqlComm.Parameters.AddWithValue("Durasi", Durasi)
                sqlComm.Parameters.AddWithValue("DurasiEnd", DurasiEnd)
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                sqlComm.Parameters.AddWithValue("Action", Action)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec BRA_TrxDurasi '" & ID & "','" & Durasi & "','" & DurasiEnd & "','" & UserName & "','" & Action & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec BRA_TrxDurasi '" & ID & "','" & Durasi & "','" & DurasiEnd & "','" & UserName & "','" & Action & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function PublishTransaction(ByVal HeaderID As String, ByVal Status As String, ByVal UserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_PublishTransaction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("HeaderID", HeaderID)
                sqlComm.Parameters.AddWithValue("Status", Status)
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_PublishTransaction '" & HeaderID & "','" & Status & "','" & UserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec QM_PublishTransaction '" & HeaderID & "','" & Status & "','" & UserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_DistributeTicketKategori(ByVal Id As String, ByVal Kategori As String, ByVal UserName As String, ByVal Action As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_DistributeTicketKategori"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("Id", Id)
                sqlComm.Parameters.AddWithValue("Kategori", Kategori)
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                sqlComm.Parameters.AddWithValue("Action", Action)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_DistributeTicketKategori '" & Id & "','" & Kategori & "','" & UserName & "','" & Action & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec QM_DistributeTicketKategori '" & Id & "','" & Kategori & "','" & UserName & "','" & Action & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function BRA_QM_EmailInterval(ByVal Id As String, ByVal Channel As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec BRA_QM_EmailInterval"
        Dim sql As String = "" & NameSP & " '" & Id & "','" & Id & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("BRA_QM_EmailInterval", conn)
                sqlComm.Parameters.AddWithValue("@Id", Id)
                sqlComm.Parameters.AddWithValue("@Channel", Channel)
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
    Public Function QM_TrxInteractionPenilaian_Draft(ByVal QM_HeaderID As String, ByVal QM_AcraID As String, ByVal QM_Description As String, ByVal QM_CreatedBy As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim Rating As String = String.Empty
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_TrxInteractionPenilaian_Draft"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("QM_HeaderID", QM_HeaderID)
                sqlComm.Parameters.AddWithValue("QM_AcraID", QM_AcraID)
                sqlComm.Parameters.AddWithValue("QM_Description", QM_Description)
                sqlComm.Parameters.AddWithValue("QM_CreatedBy", QM_CreatedBy)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxInteractionPenilaian_Draft '" & QM_HeaderID & "','" & QM_AcraID & "','" & QM_Description & "','" & QM_CreatedBy & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultMessage = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec QM_TrxInteractionPenilaian_Draft '" & QM_HeaderID & "','" & QM_AcraID & "','" & QM_Description & "','" & QM_CreatedBy & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class