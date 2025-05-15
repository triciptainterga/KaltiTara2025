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
' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class WebServiceTransaction
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn
    Dim _reading As SqlDataReader
    Dim _RootAttachmentInboxEmail As String = "~/FileEmail/INBOX/"
    Dim _RootAttachmentOutboxEmail As String = "~/FileEmail/OUTBOX/"

    ''1_docalendar.aspx''
    Public Class listDataCalendar
        Public Property titleNya As String
        Public Property startNya As String
        Public Property endNya As String
        Public Property className As String
    End Class

    ''End''
    Public Class resultInsert
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property ChatID As String
        Public Property msgSystem As String
        Public Property CustomerID As String
        Public Property TicketNumber As String
        Public Property TrxGenerateNumberID As String
        Public Property TrxGenerateThreadID As String
        Public Property TrxGenerateCustomerID As String
    End Class
    Public Class listKategori
        Public Property Result As String
        Public Property CategoriID As String
        Public Property CategoriName As String
        Public Property CategoriLevel1ID As String
        Public Property CategoriLevel1Name As String
        Public Property CategoriLevel2ID As String
        Public Property CategoriLevel2Name As String
        Public Property CategoriLevel3ID As String
        Public Property CategoriLevel3Name As String
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
    Public Class ResponseDelete
        Public Guid As Guid
        Public ResultNya As String
        Public FileName As String
        Public FileExt As String
    End Class
    Public Class listUser
        Public Property Result As String
        Public Property UserName As String
    End Class
    Public Class listOrganization
        Public Property Result As String
        Public Property OrganizationID As String
        Public Property OrganizationName As String
    End Class
    Public Class listCounting
        Public Property Result As String
        Public Property Counting As String
    End Class
    Public Class listCustomer
        Public Property Result As String
        Public Property CustomerID As String
        Public Property CustomerName As String
        Public Property CustomerEmail As String
        Public Property CustomerHP As String
        Public Property CustomerGender As String
        Public Property CustomerBirth As String
        Public Property CustomerCIF As String
        Public Property CustomerNIK As String
        Public Property CustomerAddress As String
        Public Property CustomerTahunlahir As String
        Public Property CustomerBulanlahir As String
        Public Property CustomerHarilahir As String
        Public Property ChannelValue As String
        Public Property ChannelType As String
    End Class
    Public Class listTransaction
        Public Property Result As String
        Public Property TrxID As String
        Public Property TrxCustomerid As String
        Public Property TrxCustomerName As String
        Public Property TrxTicketNumber As String
        Public Property TrxTicketSourceName As String
        Public Property TrxCategoryID As String
        Public Property TrxCategoryName As String
        Public Property TrxLevel1ID As String
        Public Property TrxLevel1Name As String
        Public Property TrxLevel2ID As String
        Public Property TrxLevel2Name As String
        Public Property TrxLevel3ID As String
        Public Property TrxLevel3Name As String
        Public Property TrxDetailComplaint As String
        Public Property TrxResponComplaint As String
        Public Property TrxDivisi As String
        Public Property TrxSLA As String
        Public Property TrxStatus As String
        Public Property TrxUserCreate As String
        Public Property TxtThreadID As String
        Public Property TrxInteractionAccount As String
        Public Property TrxNamaPelapor As String
        Public Property TrxEmailPelapor As String
        Public Property TrxPhonePelapor As String
        Public Property TrxAlamatPelapor As String
        Public Property TrxNomorRekening As String
        Public Property TrxSumberInformasi As String
        Public Property TrxEskalasiUnit As String
        Public Property TrxKejadian As String
        Public Property TrxPenyebab As String
        Public Property TrxStatusPelapor As String
        Public Property TrxPenerimaPengaduan As String
        Public Property TrxSkalaPrioritas As String
        Public Property TrxJenisNasabah As String
        Public Property TrxThreadID As String
        Public Property TrxGenesysID As String
        Public Property TrxExtendID As String
        Public Property TrxExtendSLA As String
        Public Property TrxExtendName As String
        Public Property TrxTicketPosition As String
        Public Property TrxTahun As String
        Public Property TrxBulan As String
        Public Property TrxHari As String
        Public Property TrxReleaseUser As String
        Public Property TrxmsgSystem As String
        Public Property TrxDateCreate As String
        Public Property TrxDateClose As String
    End Class
    Public Class listExtendSLA
        Public Property Result As String
        Public Property TrxExtendSLA As String
        Public Property TrxNameExtend As String
    End Class
    Public Class listEmailOut
        Public Property Result As String
        Public Property TrxBodyHTML As String
        Public Property TrxIVCID As String
    End Class
    Public Class listTransactionThread
        Public Property Result As String
        Public Property TrxThreadChannel As String
        Public Property TrxIconThreadChannel As String
        Public Property TrxThreadID As String
        Public Property TrxThreadNumberID As String
        Public Property TrxThreadAccount As String
        Public Property TrxThreadContactID As String
        Public Property TrxThreadaAgentID As String
        Public Property TrxThreadSubject As String
        Public Property TrxThreadTicketNumber As String
        Public Property TrxThreadCustomer As String
        Public Property TrxThreadaDateCreate As String
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
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function insert_Sample(ByVal Name As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strExec As String = String.Empty
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "insert_sample"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("Name", Name)
                con.Open()
                sqlComm.ExecuteNonQuery()
                strExec = "exec insert_sample " & "'" & Name & "'"
                LogSuccess(strLogTime, strExec)
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec insert_sample " & "'" & Name & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Berhasil Insert Customer "
            listTickets.Add(objectTickets)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Insert_TransactionTicket(ByVal TrxUsername As String, ByVal TrxCustomerID As String, ByVal TxtThreadID As String, ByVal TxtAccount As String, ByVal TrxPelapor As String, ByVal TrxPelaporEmail As String,
                                             ByVal TrxPelaporPhone As String, ByVal TrxPelaporAddress As String, ByVal TrxKejadian As String, ByVal TrxPenyebab As String, ByVal TrxPenerimaPengaduan As String, ByVal TrxStatusPelapor As String,
                                             ByVal TrxSkalaPrioritas As String, ByVal TrxJenisNasabah As String, ByVal TrxNomorRekening As String, ByVal TrxSumberInformasi As String, ByVal TrxCategory As String, ByVal TrxLevel1 As String,
                                             ByVal TrxLevel2 As String, ByVal TrxLevel3 As String, ByVal TrxComplaint As String, ByVal TrxResponse As String, ByVal TrxChannel As String, ByVal TrxStatus As String, ByVal TrxEskalasi As String,
                                             ByVal TrxSLA As String, ByVal TrxExtendCategory As String, ByVal TrxLayer As String, ByVal TrxThreadID As String, ByVal TrxGenesysID As String, ByVal TxtContactID As String, ByVal TrxIDchannel As String, ByVal TrxProductName As String) As String
        Dim listTickets As List(Of listTransaction) = New List(Of listTransaction)()
        Dim query As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strExec As String = String.Empty
        Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
        Dim strTrxGenesysID, strTrxThreadID, strTrxAccount, strTrxContactID, strTrxIDchannel As String
        If TrxGenesysID = "" Then
            strTrxThreadID = strTime & New Random().Next(1000000, 9999999)
            strTrxGenesysID = strTime & New Random().Next(100000000, 999999999)
            strTrxAccount = "-"
            strTrxContactID = "-"
            strTrxIDchannel = "-"
        Else
            strTrxThreadID = TxtThreadID
            strTrxGenesysID = TrxGenesysID
            strTrxAccount = TxtAccount
            strTrxContactID = TxtContactID
            strTrxIDchannel = TrxIDchannel
        End If
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Insert_Transaction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("Customerid", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TicketNumber", strTime)
                sqlComm.Parameters.AddWithValue("TicketSourceName", TrxChannel)
                sqlComm.Parameters.AddWithValue("CategoryID", TrxCategory)
                sqlComm.Parameters.AddWithValue("SubCategory1ID", TrxLevel1)
                sqlComm.Parameters.AddWithValue("SubCategory2ID", TrxLevel2)
                sqlComm.Parameters.AddWithValue("SubCategory3ID", TrxLevel3)
                sqlComm.Parameters.AddWithValue("DetailComplaint", HttpUtility.UrlDecode(TrxComplaint))
                sqlComm.Parameters.AddWithValue("ResponComplaint", HttpUtility.UrlDecode(TrxResponse))
                sqlComm.Parameters.AddWithValue("SLA", TrxSLA)
                sqlComm.Parameters.AddWithValue("Status", TrxStatus)
                sqlComm.Parameters.AddWithValue("UserCreate", HttpContext.Current.Session("UserName"))
                sqlComm.Parameters.AddWithValue("IdTabel", strTrxThreadID)
                sqlComm.Parameters.AddWithValue("NamaPelapor", HttpUtility.UrlDecode(TrxPelapor))
                sqlComm.Parameters.AddWithValue("EmailPelapor", TrxPelaporEmail)
                sqlComm.Parameters.AddWithValue("PhonePelapor", TrxPelaporPhone)
                sqlComm.Parameters.AddWithValue("AlamatPelapor", HttpUtility.UrlDecode(TrxPelaporAddress))
                sqlComm.Parameters.AddWithValue("NomorRekening", TrxNomorRekening)
                sqlComm.Parameters.AddWithValue("SkalaPrioritas", TrxSkalaPrioritas)
                sqlComm.Parameters.AddWithValue("JenisNasabah", TrxJenisNasabah)
                sqlComm.Parameters.AddWithValue("IDLevel3", TrxLevel3)
                sqlComm.Parameters.AddWithValue("SumberInformasi", TrxSumberInformasi)
                sqlComm.Parameters.AddWithValue("TrxKejadian", TrxKejadian)
                sqlComm.Parameters.AddWithValue("TrxPenyebab", TrxPenyebab)
                sqlComm.Parameters.AddWithValue("TrxStatusPelapor", TrxStatusPelapor)
                sqlComm.Parameters.AddWithValue("TrxPenerimaPengaduan", TrxPenerimaPengaduan)
                sqlComm.Parameters.AddWithValue("TrxEscalationUnit", TrxEskalasi)
                sqlComm.Parameters.AddWithValue("TrxLayer", TrxLayer)
                sqlComm.Parameters.AddWithValue("TrxThreadID", strTrxThreadID)
                sqlComm.Parameters.AddWithValue("TrxGenesysID", strTrxGenesysID)
                sqlComm.Parameters.AddWithValue("TxtContactID", strTrxContactID)
                sqlComm.Parameters.AddWithValue("AccountInbound", strTrxAccount)
                sqlComm.Parameters.AddWithValue("IDExtend", TrxExtendCategory)
                sqlComm.Parameters.AddWithValue("TrxIDchannel", strTrxIDchannel)
                sqlComm.Parameters.AddWithValue("TrxProductName", TrxProductName)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            'Response.Write(ex.Message)
            Dim objectTickets As listTransaction = New listTransaction()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Insert_Transaction " & "'" & TrxCustomerID & "'," & "'" & strTime & "'," & "'" & TrxChannel & "'," & "'" & TrxCategory & "'," & "'" & TrxLevel1 & "'," & "'" & TrxLevel2 & "'," & "'" & TrxLevel3 & "'," & "'" & HttpUtility.UrlDecode(TrxComplaint) & "'," & "'" & HttpUtility.UrlDecode(TrxResponse) & "'," & "'" & TrxSLA & "'," & "'" & TrxStatus & "'," & "'" & TrxUsername & "'," &
                      "" & "'" & strTrxThreadID & "'," & "'" & TrxPelapor & "'," & "'" & TrxPelaporEmail & "'," & "'" & TrxPelaporPhone & "'," & "'" & HttpUtility.UrlDecode(TrxPelaporAddress) & "'," & "'" & strTrxAccount & "'," & "'" & TrxNomorRekening & "'," & "'" & TrxSkalaPrioritas & "'," & "'" & TrxJenisNasabah & "'," & "'" & TrxLevel3 & "'," & "'" & TrxSumberInformasi & "'," &
                      "" & "'" & TrxKejadian & "'," & "'" & TrxPenyebab & "'," & "'" & TrxStatusPelapor & "'," & "'" & TrxPenerimaPengaduan & "'," & "'" & TrxEskalasi & "'," & "'" & TrxLayer & "'," & "'" & strTrxThreadID & "', " & "'" & strTrxGenesysID & "', " & "'" & strTrxContactID & "'," & "'" & TrxExtendCategory & "'," & "'" & strTrxIDchannel & "'," & "'" & TrxProductName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As listTransaction = New listTransaction()
            objectTickets.Result = "True"
            objectTickets.TrxTicketNumber = strTime
            objectTickets.TrxmsgSystem = "Transaction Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec Insert_Transaction " & "'" & TrxCustomerID & "'," & "'" & strTime & "'," & "'" & TrxChannel & "'," & "'" & TrxCategory & "'," & "'" & TrxLevel1 & "'," & "'" & TrxLevel2 & "'," & "'" & TrxLevel3 & "'," & "'" & HttpUtility.UrlDecode(TrxComplaint) & "'," & "'" & HttpUtility.UrlDecode(TrxResponse) & "'," & "'" & TrxSLA & "'," & "'" & TrxStatus & "'," & "'" & TrxUsername & "'," &
                         "" & "'" & strTrxThreadID & "'," & "'" & TrxPelapor & "'," & "'" & TrxPelaporEmail & "'," & "'" & TrxPelaporPhone & "'," & "'" & HttpUtility.UrlDecode(TrxPelaporAddress) & "'," & "'" & strTrxAccount & "'," & "'" & TrxNomorRekening & "'," & "'" & TrxSkalaPrioritas & "'," & "'" & TrxJenisNasabah & "'," & "'" & TrxLevel3 & "'," & "'" & TrxSumberInformasi & "'," &
                         "" & "'" & TrxKejadian & "'," & "'" & TrxPenyebab & "'," & "'" & TrxStatusPelapor & "'," & "'" & TrxPenerimaPengaduan & "'," & "'" & TrxEskalasi & "'," & "'" & TrxLayer & "'," & "'" & strTrxThreadID & "', " & "'" & strTrxGenesysID & "', " & "'" & strTrxContactID & "'," & "'" & TrxExtendCategory & "'," & "'" & strTrxIDchannel & "'," & "'" & TrxProductName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Update_Publish_TransactionTicket(ByVal TrxUsername As String, ByVal TrxCustomerID As String, ByVal TrxGenesysID As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Publish_Transaction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxGenesysID", TrxGenesysID)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsername)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Publish_Transaction " & "'" & TrxGenesysID & "','" & TrxCustomerID & "'," & "'" & TrxUsername & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Publish"
            listTickets.Add(objectTickets)
            strExec = "exec Publish_Transaction " & "'" & TrxGenesysID & "','" & TrxCustomerID & "'," & "'" & TrxUsername & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Update_TransactionTicket(ByVal TrxTicketNumber As String, ByVal TrxResponse As String, ByVal TrxStatus As String, ByVal TrxUsername As String, ByVal TrxChannel As String, ByVal TrxThreadID As String, ByVal TrxGenesysID As String, ByVal TrxEscalasiUnit As String, ByVal DispatchType As String, ByVal TrxDispatchToLayer As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Update_TransactionTicket_New"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxTicketNumber", TrxTicketNumber)
                sqlComm.Parameters.AddWithValue("TrxResponse", HttpUtility.UrlDecode(TrxResponse))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsername)
                sqlComm.Parameters.AddWithValue("TrxChannel", TrxChannel)
                sqlComm.Parameters.AddWithValue("TrxThreadID", TrxThreadID)
                sqlComm.Parameters.AddWithValue("TrxGenesysID", TrxGenesysID)
                sqlComm.Parameters.AddWithValue("TrxEscalasiUnit", TrxEscalasiUnit)
                sqlComm.Parameters.AddWithValue("DispatchType", DispatchType)
                sqlComm.Parameters.AddWithValue("TrxDispatchToLayer", TrxDispatchToLayer)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Update_TransactionTicket_New " & "'" & TrxTicketNumber & "'," & "'" & HttpUtility.UrlDecode(TrxResponse) & "'," & "'" & TrxStatus & "'," & "'" & TrxUsername & "', " & "'" & TrxChannel & "'," & "'" & TrxThreadID & "', " & "'" & TrxGenesysID & "', " & "'" & TrxEscalasiUnit & "', " & "'" & DispatchType & "', " & "'" & TrxDispatchToLayer & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec Update_TransactionTicket_New " & "'" & TrxTicketNumber & "'," & "'" & HttpUtility.UrlDecode(TrxResponse) & "'," & "'" & TrxStatus & "'," & "'" & TrxUsername & "', " & "'" & TrxChannel & "'," & "'" & TrxThreadID & "', " & "'" & TrxGenesysID & "', " & "'" & TrxEscalasiUnit & "', " & "'" & DispatchType & "', " & "'" & TrxDispatchToLayer & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Select_Data_TransactionTicket(ByVal filterData As String) As String
        Dim listTickets As List(Of listTransaction) = New List(Of listTransaction)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "Exec SP_SelectDataTransaction '" & filterData & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransaction = New listTransaction()
                    objectTickets.Result = "True"
                    objectTickets.TrxID = rdr("ID").ToString()
                    objectTickets.TrxCustomerid = rdr("NIK").ToString()
                    objectTickets.TrxTicketNumber = rdr("TicketNumber").ToString()
                    objectTickets.TrxTicketSourceName = rdr("TicketSourceName").ToString()
                    objectTickets.TrxCategoryID = rdr("CategoryID").ToString()
                    objectTickets.TrxCategoryName = rdr("CategoryName").ToString()
                    objectTickets.TrxLevel1ID = rdr("SubCategory1ID").ToString()
                    objectTickets.TrxLevel1Name = rdr("SubCategory1Name").ToString()
                    objectTickets.TrxLevel2ID = rdr("SubCategory2ID").ToString()
                    objectTickets.TrxLevel2Name = rdr("SubCategory2Name").ToString()
                    objectTickets.TrxLevel3ID = rdr("SubCategory3ID").ToString()
                    objectTickets.TrxLevel3Name = rdr("SubCategory3Name").ToString()
                    objectTickets.TrxDetailComplaint = rdr("DetailComplaint").ToString()
                    objectTickets.TrxResponComplaint = rdr("ResponComplaint").ToString()
                    objectTickets.TrxDivisi = rdr("Divisi").ToString()
                    objectTickets.TrxSLA = rdr("SLA").ToString()
                    objectTickets.TrxStatus = rdr("Status").ToString()
                    objectTickets.TrxUserCreate = rdr("UserCreate").ToString()
                    objectTickets.TxtThreadID = rdr("IdTabel").ToString()
                    objectTickets.TrxInteractionAccount = rdr("AccountInbound").ToString()
                    objectTickets.TrxNamaPelapor = rdr("NAMA_PELAPOR").ToString()
                    objectTickets.TrxEmailPelapor = rdr("EMAIL_PELAPOR").ToString()
                    objectTickets.TrxPhonePelapor = rdr("PHONE_PELAPOR").ToString()
                    objectTickets.TrxAlamatPelapor = rdr("ALAMAT_PELAPOR").ToString()
                    objectTickets.TrxNomorRekening = rdr("NomorRekening").ToString()
                    objectTickets.TrxSumberInformasi = rdr("SumberInformasi").ToString()
                    objectTickets.TrxEskalasiUnit = rdr("ORGANIZATION_NAME").ToString()
                    objectTickets.TrxSkalaPrioritas = rdr("SkalaPrioritas").ToString()
                    objectTickets.TrxJenisNasabah = rdr("JenisNasabah").ToString()
                    objectTickets.TrxStatusPelapor = rdr("StrStatusPelapor").ToString()
                    objectTickets.TrxKejadian = rdr("TglKejadian").ToString()
                    objectTickets.TrxPenyebab = rdr("StrPenyebab").ToString()
                    objectTickets.TrxPenerimaPengaduan = rdr("StrPenerima").ToString()
                    objectTickets.TrxThreadID = rdr("ThreadID").ToString()
                    objectTickets.TrxGenesysID = rdr("GenesysID").ToString()
                    objectTickets.TrxTicketPosition = rdr("TicketPosition").ToString()
                    objectTickets.TrxTicketPosition = rdr("TicketPosition").ToString()
                    objectTickets.TrxExtendID = rdr("ExtendID").ToString()
                    objectTickets.TrxExtendSLA = rdr("ExtendSLA").ToString()
                    objectTickets.TrxExtendName = rdr("ExtendName").ToString()
                    objectTickets.TrxReleaseUser = rdr("ReleaseUser").ToString()
                    objectTickets.TrxTahun = rdr("tahun").ToString()
                    objectTickets.TrxBulan = rdr("bulan").ToString()
                    objectTickets.TrxHari = rdr("hari").ToString()
                    listTickets.Add(objectTickets)
                End While
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
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

        'Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        'Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Using conn As SqlConnection = New SqlConnection(connstring)

        '    conn.Open()
        '    If tableType = "AllWhereData" Then
        '        sql = "select * from [" & tableName & "] " & paramQuery & " "
        '    End If
        '    Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '    Dim ds As DataSet = New DataSet()
        '    ad.Fill(ds)
        '    dt = ds.Tables(0)
        '    conn.Close()

        'End Using
        'Dim tableJson As String = ConvertDataTabletoString(dt)
        'Return tableJson
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetExtendCategory(ByVal paramQuery As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""

        Using conn As SqlConnection = New SqlConnection(connstring)
            conn.Open()
            sql = "select * from Temp_ExtendSubCategory where CategoryID='" & paramQuery & "'"
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
    Public Function SelectKategori(ByVal filterData As String) As String
        Dim listTickets As List(Of listKategori) = New List(Of listKategori)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "Exec SP_SelectMasterCategory"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listKategori = New listKategori()
                    objectTickets.Result = "True"
                    objectTickets.CategoriID = rdr("CategoryID").ToString()
                    objectTickets.CategoriName = rdr("Name").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectKategoriPermasalahan(ByVal filterData As String) As String
        Dim listTickets As List(Of listKategori) = New List(Of listKategori)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "Exec SP_SelectReasonCode '" & filterData & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listKategori = New listKategori()
                    objectTickets.Result = "True"
                    objectTickets.CategoriID = rdr("CategoryID").ToString()
                    objectTickets.CategoriName = rdr("Name").ToString()
                    objectTickets.CategoriLevel1ID = rdr("SubCategory1ID").ToString()
                    objectTickets.CategoriLevel1Name = rdr("NameLevel1").ToString()
                    objectTickets.CategoriLevel2ID = rdr("SubCategory2ID").ToString()
                    objectTickets.CategoriLevel2Name = rdr("NameLevel2").ToString()
                    objectTickets.CategoriLevel3ID = rdr("SubCategory3ID").ToString()
                    objectTickets.CategoriLevel3Name = rdr("SubName").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectUserLogin(ByVal filterData As String) As String
        Dim listTickets As List(Of listUser) = New List(Of listUser)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        If filterData = "1" Then
            LevelUser = "Agent"
        ElseIf filterData = "2" Then
            LevelUser = "Layer 2"
        ElseIf filterData = "3" Then
            LevelUser = "Unit Kerja"
        ElseIf filterData = "4" Then
            LevelUser = "Supervisor"
        End If
        If CountingAgentLogin(LevelUser) = True Then
            Try
                strQuery = "select * from msUser where LevelUser='" & LevelUser & "' and login='1'"
                Using con As SqlConnection = New SqlConnection(cs)
                    Dim cmd As SqlCommand
                    cmd = New SqlCommand(strQuery, con)
                    cmd.CommandType = CommandType.Text
                    con.Open()
                    Dim rdr As SqlDataReader = cmd.ExecuteReader()

                    While rdr.Read
                        Dim objectTickets As listUser = New listUser()
                        objectTickets.Result = "True"
                        objectTickets.UserName = rdr("UserName").ToString()
                        listTickets.Add(objectTickets)
                    End While

                End Using
            Catch ex As Exception
                LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
                Dim objectTickets As listUser = New listUser()
                objectTickets.Result = "False"
                objectTickets.UserName = "Data user login is empty."
                listTickets.Add(objectTickets)
            Finally
                LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
            End Try

        Else
            Dim objectTickets As listUser = New listUser()
            objectTickets.Result = "False"
            listTickets.Add(objectTickets)
            LogSuccess(HttpContext.Current.Session("UserName"), "Data user login is empty.")
        End If
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ReleaseTransaction(ByVal TrxTicketNumber As String, ByVal ReleaseFromLayer As String, ByVal ReleaseToLayer As String, ByVal ReleaseUser As String, ByVal ReleaseReason As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Tr_Release_Transaction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxTicketNumber", TrxTicketNumber)
                sqlComm.Parameters.AddWithValue("ReleaseType", "Release")
                sqlComm.Parameters.AddWithValue("ReleaseUser", ReleaseUser)
                sqlComm.Parameters.AddWithValue("ReleaseFromLayer", ReleaseFromLayer)
                sqlComm.Parameters.AddWithValue("ReleaseToLayer", ReleaseToLayer)
                sqlComm.Parameters.AddWithValue("ReleaseReason", ReleaseReason)
                sqlComm.Parameters.AddWithValue("ReleaseBy", TrxUserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Tr_Release_Transaction " & "'" & TrxTicketNumber & "'," & "'" & ReleaseUser & "'," & "'" & ReleaseFromLayer & "'," & "'" & ReleaseToLayer & "', " & "'" & ReleaseReason & "', " & "'" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Transaction Has Been Release"
            listTickets.Add(objectTickets)
            strExec = "exec Tr_Release_Transaction " & "'" & TrxTicketNumber & "'," & "'" & ReleaseUser & "'," & "'" & ReleaseFromLayer & "'," & "'" & ReleaseToLayer & "', " & "'" & ReleaseReason & "', " & "'" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertDataCustomer(ByVal TrxCustomerID As String, ByVal TrxName As String, ByVal TrxEmail As String, ByVal TrxPhone As String, ByVal TrxGender As String, ByVal TrxCIF As String, ByVal TrxNIK As String, ByVal TrxBirth As String, ByVal TrxAddress As String, ByVal TrxUserName As String, ByVal TrxMenu As String, ByVal TrxGenesysID As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Email As String = String.Empty
        Dim _Phone As String = String.Empty
        Dim _CIF As String = String.Empty
        Dim _NIK As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Tr_Customer"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxEmail", TrxEmail)
                sqlComm.Parameters.AddWithValue("TrxPhone", TrxPhone)
                sqlComm.Parameters.AddWithValue("TrxGender", TrxGender)
                sqlComm.Parameters.AddWithValue("TrxBirth", TrxBirth)
                sqlComm.Parameters.AddWithValue("TrxCIF", TrxCIF)
                sqlComm.Parameters.AddWithValue("TrxNIK", TrxNIK)
                sqlComm.Parameters.AddWithValue("TrxAddress", AntiXssEncoder.HtmlEncode(TrxAddress.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxMenu", TrxMenu)
                sqlComm.Parameters.AddWithValue("TrxGenesysID", TrxGenesysID)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _CustomerID &= sqldr("CustomerID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Tr_Customer " & "'" & HttpUtility.UrlDecode(TrxName) & "'," & "'" & TrxEmail & "'," & "'" & TrxPhone & "'," & "'" & TrxGender & "', " & "'" & TrxCIF & "', " & "'" & TrxNIK & "', " & "'" & TrxBirth & "', " & "'" & HttpUtility.UrlDecode(TrxAddress) & "',  " & "'" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "InsertSuccess" Then
                objectTickets.Result = "True"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = "Data has been save"
                listTickets.Add(objectTickets)
                strExec = "exec Tr_Customer - " & "'" & HttpUtility.UrlDecode(TrxName) & "'," & "'" & TrxEmail & "'," & "'" & TrxPhone & "'," & "'" & TrxGender & "', " & "'" & TrxCIF & "', " & "'" & TrxNIK & "', " & "'" & TrxBirth & "', " & "'" & HttpUtility.UrlDecode(TrxAddress) & "',  " & "'" & TrxUserName & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec Tr_Customer - " & "'" & HttpUtility.UrlDecode(TrxName) & "'," & "'" & TrxEmail & "'," & "'" & TrxPhone & "'," & "'" & TrxGender & "', " & "'" & TrxCIF & "', " & "'" & TrxNIK & "', " & "'" & TrxBirth & "', " & "'" & HttpUtility.UrlDecode(TrxAddress) & "',  " & "'" & TrxUserName & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _Result)
            End If
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectDataCustomer(ByVal TrxCustomerID As String) As String
        Dim listTickets As List(Of listCustomer) = New List(Of listCustomer)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "Exec SP_SelectDataCustomer '" & TrxCustomerID & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listCustomer = New listCustomer()
                    objectTickets.Result = "True"
                    objectTickets.CustomerID = rdr("CustomerID").ToString()
                    objectTickets.CustomerName = rdr("Name").ToString()
                    objectTickets.CustomerEmail = rdr("Email").ToString()
                    objectTickets.CustomerHP = rdr("HP").ToString()
                    objectTickets.CustomerGender = rdr("JenisKelamin").ToString()
                    objectTickets.CustomerBirth = rdr("Birth").ToString()
                    objectTickets.CustomerCIF = rdr("CIF").ToString()
                    objectTickets.CustomerNIK = rdr("NIK").ToString()
                    objectTickets.CustomerAddress = rdr("Alamat").ToString()
                    objectTickets.CustomerTahunlahir = rdr("tahun").ToString()
                    objectTickets.CustomerBulanlahir = rdr("bulan").ToString()
                    objectTickets.CustomerHarilahir = rdr("hari").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateDataCustomer(ByVal TrxCustomerID As String, ByVal TrxName As String, ByVal TrxEmail As String, ByVal TrxPhone As String, ByVal TrxGender As String, ByVal TrxBirth As String, ByVal TrxCIF As String, ByVal TrxNIK As String, ByVal TrxAddress As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim _Result As String = String.Empty
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Tr_Customer_Update"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxName", HttpUtility.UrlDecode(TrxName))
                sqlComm.Parameters.AddWithValue("TrxEmail", TrxEmail)
                sqlComm.Parameters.AddWithValue("TrxPhone", TrxPhone)
                sqlComm.Parameters.AddWithValue("TrxGender", TrxGender)
                sqlComm.Parameters.AddWithValue("TrxBirth", TrxBirth)
                sqlComm.Parameters.AddWithValue("TrxCIF", TrxCIF)
                sqlComm.Parameters.AddWithValue("TrxNIK", TrxNIK)
                sqlComm.Parameters.AddWithValue("TrxAddress", HttpUtility.UrlDecode(TrxAddress))
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Tr_Customer_Update " & "'" & HttpUtility.UrlDecode(TrxName) & "'," & "'" & TrxEmail & "'," & "'" & TrxPhone & "'," & "'" & TrxGender & "', " & "'" & TrxBirth & "',  " & "'" & TrxCIF & "',  " & "'" & TrxNIK & "', " & "'" & HttpUtility.UrlDecode(TrxAddress) & "',  " & "'" & TrxUserName & "', " & "'" & TrxCustomerID & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "UpdateSuccess" Then
                objectTickets.Result = "True"
                objectTickets.msgSystem = "Data has been update"
                listTickets.Add(objectTickets)
                strExec = "exec Tr_Customer_Update " & "'" & HttpUtility.UrlDecode(TrxName) & "'," & "'" & TrxEmail & "'," & "'" & TrxPhone & "'," & "'" & TrxGender & "', " & "'" & TrxBirth & "', " & "'" & TrxCIF & "',  " & "'" & TrxNIK & "', " & "'" & HttpUtility.UrlDecode(TrxAddress) & "',  " & "'" & TrxUserName & "', " & "'" & TrxCustomerID & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.msgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec Tr_Customer_Update " & "'" & HttpUtility.UrlDecode(TrxName) & "'," & "'" & TrxEmail & "'," & "'" & TrxPhone & "'," & "'" & TrxGender & "', " & "'" & TrxBirth & "', " & "'" & TrxCIF & "',  " & "'" & TrxNIK & "', " & "'" & HttpUtility.UrlDecode(TrxAddress) & "',  " & "'" & TrxUserName & "', " & "'" & TrxCustomerID & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _Result)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteDataCustomer(ByVal TrxCustomerID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Tr_Customer_Delete"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Tr_Customer_Delete " & "'" & TrxCustomerID & "', " & "'" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Customer Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec Tr_Customer_Delete " & "'" & TrxCustomerID & "', " & "'" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function CountingDataCustomerChannel(ByVal TrxValue As String) As String
        Dim listTickets As List(Of listCounting) = New List(Of listCounting)()
        Dim strCounting As Integer
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Using con As SqlConnection = New SqlConnection(cs)
            Dim cmd As SqlCommand
            cmd = New SqlCommand("select count(*) as ResultValue from SML_mCustomerChannel where ValueChannel='" & TrxValue & "'", con)
            cmd.CommandType = CommandType.Text
            con.Open()
            Dim rdr As SqlDataReader = cmd.ExecuteReader()
            If rdr.Read() Then
                strCounting = rdr("ResultValue").ToString()
            Else
            End If
        End Using
        If strCounting > 0 Then
            Dim objectTickets As listCounting = New listCounting()
            objectTickets.Result = "True"
            listTickets.Add(objectTickets)
        Else
            Dim objectTickets As listCounting = New listCounting()
            objectTickets.Result = "False"
            listTickets.Add(objectTickets)
        End If

        'Return String.Format(Name & ";" & State)
        'Return String.Format("Name: {0}{2} State: {1}{2}", Name, State)
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function FunctionDataSetting(ByVal TrxType As String) As String
        Dim listTickets As List(Of listCounting) = New List(Of listCounting)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim strValue As String = String.Empty
        Try
            strQuery = "select * from TR_Data_Setting where Type='" & TrxType & "'"
            Using con As SqlConnection = New SqlConnection(cs)

                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                If rdr.Read() Then
                    strValue = rdr("Value").ToString()
                End If

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try
        Return strValue
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetExtendCategorySLA(ByVal filterData As String) As String
        Dim listTickets As List(Of listExtendSLA) = New List(Of listExtendSLA)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "select * from Temp_ExtendSubCategory where ID='" & filterData & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listExtendSLA = New listExtendSLA()
                    objectTickets.Result = "True"
                    objectTickets.TrxExtendSLA = rdr("SLA").ToString()
                    objectTickets.TrxNameExtend = rdr("NameExtend").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    Public Function CheckNotifikasiEmail(ByVal Type As String)
        Dim strTR_TypeNotifikasiEmail As String = String.Empty
        strTR_TypeNotifikasiEmail = "select State from TR_TypeNotifikasiEmail where Type='" & Type & "'"
        sqldr = Proses.ExecuteReader(strTR_TypeNotifikasiEmail)
        Try
            If sqldr.HasRows() Then
                sqldr.Read()
                If sqldr("State").ToString = "Y" Then
                    LogSuccess(strLogTime, strTR_TypeNotifikasiEmail)
                    Return True
                Else
                    LogSuccess(strLogTime, strTR_TypeNotifikasiEmail)
                    Return False
                End If
            Else
            End If
            sqldr.Close()
        Catch ex As Exception
            LogError(strLogTime, ex, strTR_TypeNotifikasiEmail)
        End Try
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function NotifikasiEmailCreateTransaction(ByVal TrxTO As String, ByVal TrxCC As String, ByVal TrxBCC As String, ByVal TrxAgent As String, ByVal TrxTicketNumber As String, ByVal TrxType As String) As String
        If (CheckNotifikasiEmail("Create")) = True Then

            Dim TrxSubject As String = String.Empty
            Dim TrxBody As String = String.Empty
            Dim strTemplate As String = String.Empty
            strTemplate = "select * from TR_TemplateNotifikasiEmail where Type='Create'"
            sqldr = Proses.ExecuteReader(strTemplate)
            Try
                If sqldr.HasRows() Then
                    sqldr.Read()
                    TrxSubject = sqldr("Subject").ToString
                    TrxBody = sqldr("Body").ToString
                    LogSuccess(HttpContext.Current.Session("UserName"), strTemplate)
                Else
                    LogSuccess(HttpContext.Current.Session("UserName"), strTemplate)
                End If
                sqldr.Close()
            Catch ex As Exception
                LogError(HttpContext.Current.Session("UserName"), ex, strTemplate)
            End Try

            Dim TrxEmailID As String = "ICC " - DateTime.Now.ToString("yyyyMMddhhmmssfff")
            Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "TR_Notifikasi_Ticket"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("EMAILID", TrxEmailID)
                    sqlComm.Parameters.AddWithValue("EFROM", TrxEmailForm)
                    sqlComm.Parameters.AddWithValue("ETO", TrxTO)
                    sqlComm.Parameters.AddWithValue("ECC", TrxCC)
                    sqlComm.Parameters.AddWithValue("EBCC", TrxBCC)
                    sqlComm.Parameters.AddWithValue("ESUBJECT", TrxSubject)
                    sqlComm.Parameters.AddWithValue("EBODY", TrxBody)
                    sqlComm.Parameters.AddWithValue("EAGENT", TrxAgent)
                    sqlComm.Parameters.AddWithValue("ETICKETID", TrxTicketNumber)
                    sqlComm.Parameters.AddWithValue("ETYPE", TrxType)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "False"
                objectTickets.msgSystem = ex.Message()
                listTickets.Add(objectTickets)
                strExec = "exec TR_Notifikasi_Ticket - Email Create Ticket " & "'" & TrxEmailID & "'," & "'" & TrxEmailForm & "'," & "'" & TrxTO & "'," & "'" & TrxCC & "', " & "'" & TrxBCC & "', " & "'" & TrxSubject & "',  " & "'" & TrxBody & "', " & "'" & TrxAgent & "', " & "'" & TrxTicketNumber & "', " & "'" & TrxType & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.msgSystem = "Data Customer Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec TR_Notifikasi_Ticket - Email Create Ticket " & "'" & TrxEmailID & "'," & "'" & TrxEmailForm & "'," & "'" & TrxTO & "'," & "'" & TrxCC & "', " & "'" & TrxBCC & "', " & "'" & TrxSubject & "',  " & "'" & TrxBody & "', " & "'" & TrxAgent & "', " & "'" & TrxTicketNumber & "', " & "'" & TrxType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                ''End
            End Try
            Dim js As JavaScriptSerializer = New JavaScriptSerializer()
            Return js.Serialize(listTickets)
        Else
            Dim strExec As String = String.Empty
            strExec = "exec TR_Notifikasi_Ticket - Email Create Ticket - Setting Notif Email Tidak Ada"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End If
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateThread(ByVal TrxGenesysID As String, ByVal TrxReason As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "TR_Update_Thread"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxGenesysID", TrxGenesysID)
                sqlComm.Parameters.AddWithValue("TrxReason", TrxReason)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec TR_Update_Thread " & "'" & TrxGenesysID & "'," & "'" & TrxReason & "'," & "'" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Thread Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec TR_Update_Thread " & "'" & TrxGenesysID & "'," & "'" & TrxReason & "'," & "'" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function EscalationTransactionTicket(ByVal TrxTicketNumber As String, ByVal TrxResponse As String, ByVal TrxLayer As String, ByVal TrxStatus As String, ByVal TrxUsername As String, ByVal TrxChannel As String, ByVal TrxThreadID As String, ByVal TrxGenesysID As String, ByVal TrxEscalasiUnit As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Tr_EscalationTransactionTicket"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxTicketNumber", TrxTicketNumber)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsername)
                sqlComm.Parameters.AddWithValue("TrxLayer", TrxLayer)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxEscalasiUnit", TrxEscalasiUnit)
                sqlComm.Parameters.AddWithValue("TrxChannel", TrxChannel)
                sqlComm.Parameters.AddWithValue("TrxResponse", HttpUtility.UrlDecode(TrxResponse))
                sqlComm.Parameters.AddWithValue("TrxThreadID", TrxThreadID)
                sqlComm.Parameters.AddWithValue("TrxGenesysID", TrxGenesysID)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Tr_EscalationTransactionTicket " & "'" & TrxTicketNumber & "'," & "'" & TrxUsername & "'," & "'" & TrxLayer & "'," & "'" & TrxStatus & "'," & "'" & TrxEscalasiUnit & "'," & "'" & TrxChannel & "', " & "'" & HttpUtility.UrlDecode(TrxResponse) & "', " & "'" & TrxThreadID & "', " & "'" & TrxGenesysID & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Escalation"
            listTickets.Add(objectTickets)
            strExec = "exec Tr_EscalationTransactionTicket " & "'" & TrxTicketNumber & "'," & "'" & TrxUsername & "'," & "'" & TrxLayer & "'," & "'" & TrxStatus & "'," & "'" & TrxEscalasiUnit & "'," & "'" & TrxChannel & "', " & "'" & HttpUtility.UrlDecode(TrxResponse) & "', " & "'" & TrxThreadID & "', " & "'" & TrxGenesysID & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectOrganizationCase(ByVal filterData As String) As String
        Dim listTickets As List(Of listOrganization) = New List(Of listOrganization)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "SELECT * FROM mOrganization where ORGANIZATION_NAME='" & filterData & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listOrganization = New listOrganization()
                    objectTickets.Result = "True"
                    objectTickets.OrganizationID = rdr("ORGANIZATION_ID").ToString()
                    objectTickets.OrganizationName = rdr("ORGANIZATION_NAME").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectHistoryTransaction(ByVal filterData As String) As String
        Dim listTickets As List(Of listTransaction) = New List(Of listTransaction)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "SELECT * FROM tTicket where TicketNumber='" & filterData & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransaction = New listTransaction()
                    objectTickets.Result = "True"
                    objectTickets.TrxID = rdr("ID").ToString()
                    objectTickets.TrxCustomerid = rdr("NIK").ToString()
                    objectTickets.TrxTicketNumber = rdr("TicketNumber").ToString()
                    objectTickets.TrxTicketSourceName = rdr("TicketSourceName").ToString()
                    objectTickets.TrxCategoryID = rdr("CategoryID").ToString()
                    objectTickets.TrxCategoryName = rdr("CategoryName").ToString()
                    objectTickets.TrxLevel1ID = rdr("SubCategory1ID").ToString()
                    objectTickets.TrxLevel1Name = rdr("SubCategory1Name").ToString()
                    objectTickets.TrxLevel2ID = rdr("SubCategory2ID").ToString()
                    objectTickets.TrxLevel2Name = rdr("SubCategory2Name").ToString()
                    objectTickets.TrxLevel3ID = rdr("SubCategory3ID").ToString()
                    objectTickets.TrxLevel3Name = rdr("SubCategory3Name").ToString()
                    objectTickets.TrxDetailComplaint = rdr("DetailComplaint").ToString()
                    objectTickets.TrxResponComplaint = rdr("ResponComplaint").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function CountingAgentLogin(ByVal TrxLevelUser As String) As String
        Dim listTickets As List(Of listCounting) = New List(Of listCounting)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim strCounting As String = String.Empty
        Try
            strQuery = "select count (*) as Data from msUser where LevelUser='" & TrxLevelUser & "' and LOGIN='1'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                If rdr.Read() Then
                    strCounting = rdr("Data").ToString()
                End If

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try
        If strCounting > 0 Then
            Return True
        Else
            Return False
        End If
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateThreadMultipleAccounut(ByVal TrxCustomerID As String, ByVal TrxGenesysID As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "SP_Temp_DoubleCustomer"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxGenesysID", TrxGenesysID)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec SP_Temp_DoubleCustomer " & "'" & TrxCustomerID & "'," & "'" & TrxGenesysID & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Thread Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec SP_Temp_DoubleCustomer " & "'" & TrxCustomerID & "'," & "'" & TrxGenesysID & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function TempHistoryTransactionUI(ByVal filterData As String) As String
        Dim listTickets As List(Of listTransaction) = New List(Of listTransaction)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec sp_TicketHistory " & filterData & ""
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransaction = New listTransaction()
                    objectTickets.Result = "True"
                    'objectTickets.TrxID = rdr("ID").ToString()
                    objectTickets.TrxCustomerid = rdr("NIK").ToString()
                    objectTickets.TrxCustomerName = rdr("Name").ToString()
                    objectTickets.TrxTicketNumber = rdr("TicketNumber").ToString()
                    objectTickets.TrxTicketSourceName = rdr("TicketSourceName").ToString()
                    'objectTickets.TrxCategoryID = rdr("CategoryID").ToString()
                    'objectTickets.TrxCategoryName = rdr("CategoryName").ToString()
                    'objectTickets.TrxLevel1ID = rdr("SubCategory1ID").ToString()
                    'objectTickets.TrxLevel1Name = rdr("SubCategory1Name").ToString()
                    'objectTickets.TrxLevel2ID = rdr("SubCategory2ID").ToString()
                    'objectTickets.TrxLevel2Name = rdr("SubCategory2Name").ToString()
                    'objectTickets.TrxLevel3ID = rdr("SubCategory3ID").ToString()
                    objectTickets.TrxLevel3Name = rdr("SubCategory3Name").ToString()
                    objectTickets.TrxStatus = rdr("Status").ToString()
                    objectTickets.TrxDetailComplaint = rdr("DetailComplaint").ToString()
                    objectTickets.TrxGenesysID = rdr("GenesysNumber").ToString()
                    objectTickets.TrxThreadID = rdr("ThreadID").ToString()
                    objectTickets.TrxInteractionAccount = rdr("Account").ToString()
                    objectTickets.TrxUserCreate = rdr("UserCreate").ToString()
                    objectTickets.TrxDateCreate = rdr("DateCreate").ToString()
                    objectTickets.TrxDateClose = rdr("DateClose").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function New_DashboardSection(ByVal Data1 As String, ByVal Data2 As String, ByVal Data3 As String, ByVal Data4 As String, ByVal Data5 As String, ByVal Data6 As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Using conn As SqlConnection = New SqlConnection(connstring)
            conn.Open()

            sql = "exec DASHBOARD_TICKET '" & Data1 & "','" & Data2 & "','" & Data3 & "','" & Data4 & "','" & Data5 & "', '" & Data6 & "'"

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
    Public Function Temp_SelectEmailOut(ByVal TxrIVCID As String) As String
        Dim listTickets As List(Of listEmailOut) = New List(Of listEmailOut)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "select * from ICC_EMAIL_OUT where IVC_ID='" & TxrIVCID & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listEmailOut = New listEmailOut()
                    objectTickets.Result = "True"
                    objectTickets.TrxIVCID = rdr("IVC_ID").ToString()
                    objectTickets.TrxBodyHTML = rdr("EBODY_HTML").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GroupingDataCustomer(ByVal TrxFromCustomerID As String, ByVal TrxToCustomerID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "TR_GroupingCustomer"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxFromCustomerID", TrxFromCustomerID)
                sqlComm.Parameters.AddWithValue("TrxToCustomerID", TrxToCustomerID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec GroupingDataCustomer " & "'" & TrxFromCustomerID & "'," & "'" & TrxToCustomerID & "'," & "'" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Grouping Customer Has Been Success"
            listTickets.Add(objectTickets)
            strExec = "exec GroupingDataCustomer " & "'" & TrxFromCustomerID & "'," & "'" & TrxToCustomerID & "'," & "'" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteGroupingDataCustomer(ByVal TrxFromCustomerID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "TR_DeleteGroupingCustomer"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxFromCustomerID", TrxFromCustomerID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec DeleteGroupingDataCustomer " & "'" & TrxFromCustomerID & "'," & "'" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Delete Data Grouping Customer Has Been Success"
            listTickets.Add(objectTickets)
            strExec = "exec DeleteGroupingDataCustomer " & "'" & TrxFromCustomerID & "'," & "'" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ws_2_taskboard(ByVal UserID As String, ByVal LayerID As String, ByVal Spv As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec SP_TempKotakTodolist '" & UserID & "','" & LayerID & "','" & Spv & "'"

                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
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
    Public Function UIDESK_LoginModule(ByVal Username As String, ByVal Password As String) As String
        Dim listTickets As List(Of listKategori) = New List(Of listKategori)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "Exec SP_LOGIN_APPLIKASI '" & Username & "','" & Password & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listKategori = New listKategori()
                    objectTickets.Result = "True"
                    objectTickets.CategoriID = rdr("CategoryID").ToString()
                    objectTickets.CategoriName = rdr("Name").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    '<WebMethod>
    'Public Function UploadFile() As Response
    '    Dim Response As Response = New Response()
    '    Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
    '    'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
    '    Dim SavePath As String = HttpContext.Current.Server.MapPath("~/UploadFile/")
    '    Dim Username As String = HttpContext.Current.Request.Form("Username")
    '    Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
    '    Dim FileName As String = String.Empty
    '    Dim FileExt As String = String.Empty
    '    Dim FileId As Guid
    '    For i As Integer = 0 To Files.Count - 1
    '        Dim File As HttpPostedFile = Files(i)
    '        FileId = Guid.NewGuid()
    '        FileName = File.FileName
    '        FileExt = Path.GetExtension(File.FileName)

    '        Dim validFileTypes As String() = {"bmp", "gif", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "pdf"}
    '        Dim isValidFile As Boolean = False
    '        For j As Integer = 0 To validFileTypes.Length - 1
    '            If FileExt = "." & validFileTypes(j) Then

    '                Dim FileMod As DateTime = DateTime.Now
    '                Dim FileType As String = File.ContentType
    '                Dim FileSize As Long = File.ContentLength
    '                Dim FilePath As String = "/UploadFile/"
    '                File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))

    '            Else
    '                'Exit Function
    '            End If
    '        Next

    '    Next
    '    Response.Guid = FileId
    '    Response.FileName = FileName
    '    Response.FileExt = FileExt
    '    'SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; 
    '    'HDR=NO; IMEX=1; Database=\\ptmkpwa12dev08.pertamina.com\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx', 'SELECT * FROM [Sheet1$]')

    '    ''Coba new
    '    Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("WAConnection").ConnectionString)
    '    Dim TrxStatus, TrxNoHP, TrxMsgBlast, TrxFileAttch As String

    '    Try
    '        Dim path As String = HttpContext.Current.Server.MapPath("~/UploadFile/" & String.Concat(FileId, FileExt))
    '        Dim pathNya As String = "E:\#2020\RND\Helpdesk_Wagent\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx"
    '        Dim excelCS As String = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Database={0};Extended Properties=Excel 12.0;HDR=NO; IMEX=1;", pathNya)

    '        'Dim sqlImport As String = "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; " &
    '        '                           "HDR=NO; IMEX=1; Database=E:\#2020\RND\Helpdesk_Wagent\UploadFile\" & String.Concat(FileId) & ".xlsx', 'SELECT *,''" & String.Concat(FileId) & "'' as IDupload FROM [Sheet1$]')"
    '        Dim sqlImport As String = "exec WA_Tr_SelectExcel '" & String.Concat(FileId) & "'"
    '        Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
    '        cmd.CommandType = CommandType.Text

    '        sqlconManual.Open()
    '        Dim rdr As SqlDataReader = cmd.ExecuteReader()
    '        Dim strExec As String = String.Empty
    '        Dim constr As String = ConfigurationManager.ConnectionStrings("WAConnection").ConnectionString
    '        While rdr.Read()
    '            'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
    '            TrxStatus = rdr("F1").ToString
    '            TrxNoHP = rdr("F2").ToString
    '            TrxMsgBlast = rdr("F3").ToString
    '            TrxFileAttch = rdr("F4").ToString

    '            Try
    '                Using con As New SqlConnection(constr)
    '                    Dim sqlComm As New SqlCommand()
    '                    sqlComm.Connection = con
    '                    sqlComm.CommandText = "WA_Tr_ImportBlast"
    '                    sqlComm.CommandType = CommandType.StoredProcedure
    '                    sqlComm.Parameters.AddWithValue("Status", TrxStatus)
    '                    sqlComm.Parameters.AddWithValue("NoHP", TrxNoHP)
    '                    sqlComm.Parameters.AddWithValue("MsgBlast", TrxMsgBlast)
    '                    sqlComm.Parameters.AddWithValue("FileAttch", TrxFileAttch)
    '                    con.Open()
    '                    sqlComm.ExecuteNonQuery()
    '                End Using
    '            Catch ex As Exception

    '                strExec = "exec WA_Tr_ImportBlast " & "'" & TrxStatus & "'," & "'" & TrxNoHP & "'," & "'" & TrxMsgBlast & "'," & "'" & TrxFileAttch & "'"
    '                LogError(strLogTime, ex, strExec)
    '            Finally

    '                strExec = "exec WA_Tr_ImportBlast " & "'" & TrxStatus & "'," & "'" & TrxNoHP & "'," & "'" & TrxMsgBlast & "'," & "'" & TrxFileAttch & "'"
    '                LogSuccess(strLogTime, strExec)
    '                ''End
    '            End Try
    '            'End If
    '        End While


    '    Catch __unusedException1__ As Exception

    '    Finally
    '        'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
    '    End Try
    '    Return Response

    'End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function deleteFileUpload(ByVal fileName As String) As String
        Dim ResponseDelete As ResponseDelete = New ResponseDelete()

        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/UploadFile/")
        Try
            File.Delete(SavePath & fileName)
            ResponseDelete.ResultNya = "True"
            'Return ResponseDelete
        Catch e As Exception
            ResponseDelete.ResultNya = "False"
            'Return ResponseDelete
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(ResponseDelete)

    End Function
    '<WebMethod(EnableSession:=True)>
    'Public Function GetExcelData(ByVal byteData As String) As String
    '    Dim bytes As Byte() = Convert.FromBase64String(byteData)
    '    Dim filePath As String = HttpContext.Current.Server.MapPath("~/UploadFile/Test.xls")

    '    If Not Directory.Exists(HttpContext.Current.Server.MapPath("~/UploadFile")) Then
    '        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/UploadFile"))
    '    End If
    '    ' Save file in File folder.
    '    File.WriteAllBytes(filePath, bytes)
    '    Dim extension As String = Path.GetExtension(filePath)
    '    Dim excelConnectionString As String = ""

    '    Select Case extension
    '        Case ".xls" 'Excel 97-03
    '            excelConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Excel 8.0;HDR=YES;IMEX=1;'"
    '        Case ".xlsx" 'Excel 07
    '            excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties='Excel 12.0;HDR=YES;IMEX=1;'"
    '    End Select

    '    excelConnectionString = String.Format(excelConnectionString, filePath)
    '    Dim excelConnection As OleDbConnection = New OleDbConnection(excelConnectionString)
    '    Dim cmdExcel As OleDbCommand = New OleDbCommand()
    '    Dim oleDA As OleDbDataAdapter = New OleDbDataAdapter()
    '    cmdExcel.Connection = excelConnection
    '    excelConnection.Open()
    '    Dim dtExcelSchema As DataTable
    '    dtExcelSchema = excelConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, Nothing)
    '    Dim SheetName As String = dtExcelSchema.Rows(0)("TABLE_NAME").ToString()
    '    excelConnection.Close()
    '    excelConnection.Open()
    '    cmdExcel.CommandText = "SELECT * From [" & SheetName & "]"
    '    oleDA.SelectCommand = cmdExcel
    '    Dim ds As DataSet = New DataSet()
    '    oleDA.Fill(ds)
    '    excelConnection.Close()
    '    ' Delete saved file.
    '    Directory.Delete(HttpContext.Current.Server.MapPath("~/UploadFile"), True)

    '    Return ds.GetXml()
    'End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectDataCalendar(ByVal filterData As String) As String
        Dim listTickets As List(Of listDataCalendar) = New List(Of listDataCalendar)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "SELECT * FROM WAG_calendar where AgentID='" & HttpContext.Current.Session("UserName") & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listDataCalendar = New listDataCalendar()
                    objectTickets.titleNya = rdr("ReminderTitle").ToString()
                    objectTickets.startNya = rdr("DateCreate").ToString()
                    objectTickets.endNya = rdr("DateCreate").ToString()
                    objectTickets.className = rdr("ClassName").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ws_1_Thread_select(ByVal TrxUserName As String, ByVal TrxUnitKerja As String, ByVal TrxLevelUser As String) As String
        Dim listTickets As List(Of listTransactionThread) = New List(Of listTransactionThread)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "Exec TR_DataThread '" & TrxLevelUser & "', '" & TrxUserName & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransactionThread = New listTransactionThread()
                    objectTickets.Result = "True"
                    objectTickets.TrxThreadID = rdr("ThreadID").ToString()
                    objectTickets.TrxThreadChannel = rdr("ValueThread").ToString()
                    objectTickets.TrxIconThreadChannel = rdr("IconValueThread").ToString()
                    objectTickets.TrxThreadNumberID = rdr("GenesysNumber").ToString()
                    objectTickets.TrxThreadAccount = rdr("Account").ToString()
                    objectTickets.TrxThreadContactID = rdr("AccountContactID").ToString()
                    objectTickets.TrxThreadaAgentID = rdr("AgentID").ToString()
                    objectTickets.TrxThreadSubject = rdr("Subject").ToString()
                    objectTickets.TrxThreadCustomer = rdr("CustomerID").ToString()
                    objectTickets.TrxThreadTicketNumber = rdr("TicketNumber").ToString()
                    objectTickets.TrxThreadaDateCreate = rdr("DateCreate").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionThread(ByVal TrxChannel As String, ByVal TrxThreadID As String, ByVal TrxNumberid As String, ByVal TrxCustomerID As String,
                                            ByVal TrxUsername As String, ByVal TrxAccount As String, ByVal TrxSubject As String, ByVal TrxDescription As String) As String
        Dim TrxGenerateThreadID As String = String.Empty
        Dim TrxGenerateNumberID As String = String.Empty
        Dim TrxGetCustomerID As String = ""
        If TrxChannel = "WA" Then
            TrxGenerateThreadID = strTime & New Random().Next(1000000, 9999999)
        ElseIf TrxChannel = "Call" Then
            'TrxGenerateNumberID = "CALL-" + Guid.NewGuid().ToString("N")
            'TrxNumberid = TrxGenerateNumberID
            TrxGenerateThreadID = strTime & New Random().Next(1000000, 9999999)
        Else
            If TrxThreadID = "" Then
                TrxGenerateThreadID = strTime & New Random().Next(1000000, 9999999)
            Else
                TrxGenerateThreadID = TrxThreadID
            End If
        End If
        If TrxChannel = "Call" Then
            TrxGetCustomerID = GetValueCustomerID(TrxAccount)
        Else
            TrxGetCustomerID = TrxCustomerID
        End If
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_InsertThread"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxChannel", TrxChannel)
                sqlComm.Parameters.AddWithValue("TrxThreadID", TrxGenerateThreadID)
                sqlComm.Parameters.AddWithValue("TrxNumberID", TrxNumberid)
                sqlComm.Parameters.AddWithValue("TrxAccount", TrxAccount)
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxGetCustomerID)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsername)
                sqlComm.Parameters.AddWithValue("TrxSubject", HttpUtility.UrlDecode(TrxSubject))
                sqlComm.Parameters.AddWithValue("TrxDescription", HttpUtility.UrlDecode(TrxDescription))
                sqlComm.Parameters.AddWithValue("TrxType", TrxChannel)
                sqlComm.Parameters.AddWithValue("TrxPhoneChat", TrxAccount)
                'sqlComm.Parameters.AddWithValue("TrxCustomerName", TrxChannel)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_InsertThread " & "'" & TrxChannel & "'," & "'" & TrxThreadID & "'," & "'" & TrxNumberid & "'," & "'" & TrxAccount & "'," & "'" & TrxCustomerID & "'," & "'" & TrxUsername & "'," & "'" & HttpUtility.UrlDecode(TrxSubject) & "','" & HttpUtility.UrlDecode(TrxDescription) & "'," & "'" & TrxChannel & "'," & "'" & TrxAccount & "'"
            'strExec = "exec UIDESK_Temp_InsertThread 'Call','2021112308350368701','CALL-b90b75a19d1a4a1eb252d5cff5252fd6','Agent1','085889088095','201124104628','-','-','Call','Agent1'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxGenerateNumberID = TrxNumberid
            objectTickets.TrxGenerateThreadID = TrxGenerateThreadID
            objectTickets.TrxGenerateCustomerID = TrxGetCustomerID
            objectTickets.msgSystem = "Data Thread Has Been Insert"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_InsertThread " & "'" & TrxChannel & "'," & "'" & TrxThreadID & "'," & "'" & TrxNumberid & "'," & "'" & TrxAccount & "'," & "'" & TrxCustomerID & "'," & "'" & TrxUsername & "'," & "'" & HttpUtility.UrlDecode(TrxSubject) & "','" & HttpUtility.UrlDecode(TrxDescription) & "'," & "'" & TrxChannel & "'," & "'" & TrxAccount & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            LogSuccess(HttpContext.Current.Session("UserName"), TrxNumberid)
            LogSuccess(HttpContext.Current.Session("UserName"), TrxGenerateThreadID)
            LogSuccess(HttpContext.Current.Session("UserName"), TrxGetCustomerID)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectCustomerChannel(ByVal TrxPhone As String) As String
        Dim listTickets As List(Of listCustomer) = New List(Of listCustomer)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "exec UIDESK_Temp_CustomerChannel '" & TrxPhone & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listCustomer = New listCustomer()
                    objectTickets.Result = "True"
                    objectTickets.CustomerID = rdr("CountingCall").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectChannel(ByVal TrxPhone As String) As String
        Dim listTickets As List(Of listCustomer) = New List(Of listCustomer)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "select * from SML_mCustomerChannel where ValueChannel= '" & TrxPhone & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listCustomer = New listCustomer()
                    objectTickets.Result = "True"
                    objectTickets.CustomerID = rdr("CustomerID").ToString()
                    objectTickets.ChannelValue = rdr("ValueChannel").ToString()
                    objectTickets.ChannelType = rdr("FlagChannel").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertNoteInstan(ByVal TrxCustomerID As String, ByVal TrxNoteInstan As String, ByVal TrxNumberID As String, ByVal TrxThreadID As String, ByVal TrxUsername As String, ByVal TrxChannel As String) As String
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUsername.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
        Dim strTrxNumberID, strTrxThreadid As String
        If TrxNumberID = "" Then
            strTrxThreadid = strTime & New Random().Next(1000000, 9999999)
            strTrxNumberID = strTime & New Random().Next(100000000, 999999999)
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_Temp_NoteInstanInsert"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxAction", "Manual")
                    sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                    sqlComm.Parameters.AddWithValue("TrxNoteInstan", HttpUtility.UrlDecode(TrxNoteInstan))
                    sqlComm.Parameters.AddWithValue("TrxNumberID", strTrxNumberID)
                    sqlComm.Parameters.AddWithValue("TrxThreadID", strTrxThreadid)
                    sqlComm.Parameters.AddWithValue("TrxUsername", TrxUserNameXSS)
                    sqlComm.Parameters.AddWithValue("TrxChannel", "Manual")
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "False"
                objectTickets.msgSystem = ex.Message()
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_NoteInstanInsert " & "'" & TrxCustomerID & "','" & TrxNumberID & "','" & TrxThreadID & "'," & "'" & TrxUserNameXSS & "'," & "'" & HttpUtility.UrlDecode(TrxNoteInstan) & "'," & "'" & HttpUtility.UrlDecode(TrxChannel) & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.msgSystem = "Data Note Instan Has Been Insert"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_NoteInstanInsert " & "'" & TrxCustomerID & "','" & TrxNumberID & "','" & TrxThreadID & "'," & "'" & TrxUserNameXSS & "'," & "'" & HttpUtility.UrlDecode(TrxNoteInstan) & "'," & "'" & HttpUtility.UrlDecode(TrxChannel) & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                ''End
            End Try
        Else
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_Temp_NoteInstanInsert"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxAction", "Url")
                    sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                    sqlComm.Parameters.AddWithValue("TrxNoteInstan", HttpUtility.UrlDecode(TrxNoteInstan))
                    sqlComm.Parameters.AddWithValue("TrxNumberID", TrxNumberID)
                    sqlComm.Parameters.AddWithValue("TrxThreadID", TrxThreadID)
                    sqlComm.Parameters.AddWithValue("TrxUsername", TrxUserNameXSS)
                    sqlComm.Parameters.AddWithValue("TrxChannel", TrxChannel)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "False"
                objectTickets.msgSystem = ex.Message()
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_NoteInstanInsert " & "'" & TrxCustomerID & "','" & TrxNumberID & "','" & TrxThreadID & "'," & "'" & TrxUserNameXSS & "'," & "'" & HttpUtility.UrlDecode(TrxNoteInstan) & "'," & "'" & HttpUtility.UrlDecode(TrxChannel) & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.msgSystem = "Data Note Instan Has Been Insert"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_NoteInstanInsert " & "'" & TrxCustomerID & "','" & TrxNumberID & "','" & TrxThreadID & "'," & "'" & TrxUserNameXSS & "'," & "'" & HttpUtility.UrlDecode(TrxNoteInstan) & "'," & "'" & HttpUtility.UrlDecode(TrxChannel) & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                ''End
            End Try
        End If

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertNoteInternal(ByVal TrxInternalNote As String, ByVal TrxTicketNumber As String, ByVal TrxUserName As String) As String
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_NoteInternalInsert"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxInternalNote", HttpUtility.UrlDecode(TrxInternalNote))
                sqlComm.Parameters.AddWithValue("TrxTicketNumber", TrxTicketNumber)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_NoteInternalInsert " & "'" & TrxTicketNumber & "'," & "'" & TrxUserNameXSS & "'," & "'" & HttpUtility.UrlDecode(TrxInternalNote) & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Note Internal Has Been Insert"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_NoteInternalInsert " & "'" & TrxTicketNumber & "'," & "'" & TrxUserNameXSS & "'," & "'" & HttpUtility.UrlDecode(TrxInternalNote) & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ListDataTransactionTicket(ByVal TrxCustomerID As String, ByVal TrxUserName As String, ByVal TrxNumberID As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec UIDESK_Temp_ListDataTransactionticket '" & TrxCustomerID & "','" & TrxUserName & "','" & TrxNumberID & "'"

                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
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
    Public Function UIDESKPublishTransaction(ByVal TrxCustomerID As String, ByVal TrxUserName As String) As String
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_PublishTransaction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUserNameXSS)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_PublishTransaction " & "'" & TrxCustomerID & "'," & "'" & TrxUserNameXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Publish"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_PublishTransaction " & "'" & TrxCustomerID & "'," & "'" & TrxUserNameXSS & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESKPublishTransactionTicketNumber(ByVal TrxTicketNumber As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_PublishTransactionTicketNumber"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxTicketNumber", TrxTicketNumber)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_PublishTransactionTicketNumber " & "'" & TrxTicketNumber & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Remove"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_PublishTransactionTicketNumber " & "'" & TrxTicketNumber & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    Public Function UploadFileAttachmentTicket() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/apps/attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/")
        Dim TrxUserCreate As String = HttpContext.Current.Request.Form("Username")
        Dim TrxNumberID As String = HttpContext.Current.Request.Form("numberid")
        Dim TrxCustomerID As String = HttpContext.Current.Request.Form("customerid")
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "")))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        End If

        For i As Integer = 0 To Files.Count - 1
            Dim File As HttpPostedFile = Files(i)
            FileId = Guid.NewGuid()
            FileName = File.FileName
            FileExt = Path.GetExtension(File.FileName)
            FileSizing = File.ContentLength

            'Dim validFileTypes As String() = {"bmp", "gif", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "pdf"}
            Dim validFileTypes As String() = {"png", "jpg", "jpeg", "pdf"}
            Dim isValidFile As Boolean = False
            For j As Integer = 0 To validFileTypes.Length - 1
                If FileExt = "." & validFileTypes(j) Then
                    Dim FileMod As DateTime = DateTime.Now
                    Dim FileType As String = File.ContentType
                    Dim FileSize As Long = File.ContentLength / 1024 / 1024
                    Dim FilePath As String = "apps/attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/"
                    If FileSize > 5 Then
                        Response.Guid = FileId
                        Response.FileName = FileName
                        Response.FileExt = FileExt
                        Response.FileSizing = FileSizing
                        Response.ResultUpload = "Please upload file less than 2 MB. Thanks!"
                    Else
                        File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
                    End If
                    'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))
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
            Dim path As String = HttpContext.Current.Server.MapPath("~/apps/attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/" & String.Concat(FileId, FileExt))
            Dim TrxUrl As String = "attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/" & String.Concat(FileId, FileExt)

            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_TrxTicketAttachment"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                    sqlComm.Parameters.AddWithValue("TrxNumberID", TrxNumberID)
                    sqlComm.Parameters.AddWithValue("TrxUrl", TrxUrl)
                    sqlComm.Parameters.AddWithValue("TrxFilename", HttpUtility.UrlDecode(FileName))
                    sqlComm.Parameters.AddWithValue("TrxFileType", FileExt)
                    sqlComm.Parameters.AddWithValue("TrxFileSize", FileSizing)
                    sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserCreate)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception

                strExec = "exec UIDESK_TrxTicketAttachment " & "'" & TrxCustomerID & "'," & "'" & TrxNumberID & "'," & "'" & TrxUrl & "'," & "'" & HttpUtility.UrlDecode(FileName) & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally

                strExec = "exec UIDESK_TrxTicketAttachment " & "'" & TrxCustomerID & "'," & "'" & TrxNumberID & "'," & "'" & TrxUrl & "'," & "'" & HttpUtility.UrlDecode(FileName) & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                ''End
            End Try

        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Return Response
    End Function
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
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ResetPassword(ByVal TrxPassword As String, ByVal TrxUserName As String, ByVal TrxUserCreated As String) As String
        Dim TrxPasswordXSS As String = AntiXssEncoder.HtmlEncode(TrxPassword.Trim, True)
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
                sqlComm.CommandText = "UIDESK_TrxResetPassword"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxPassword", TrxPasswordXSS)
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
            strExec = "exec UIDESK_TrxResetPassword " & "'" & TrxPasswordXSS & "'," & "'" & TrxUserNameXSS & "'," & "'" & TrxUserCreatedXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.msgSystem = "Reset Password Success"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxResetPassword " & "'" & TrxPasswordXSS & "'," & "'" & TrxUserNameXSS & "'," & "'" & TrxUserCreatedXSS & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.msgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxResetPassword " & "'" & TrxPasswordXSS & "'," & "'" & TrxUserNameXSS & "'," & "'" & TrxUserCreatedXSS & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End If
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    Public Function Encrypt(clearText As String) As String
        Dim EncryptionKey As String = "MAKV2SPBNI99212"
        Dim clearBytes As Byte() = Encoding.Unicode.GetBytes(clearText)
        Using encryptor As Aes = Aes.Create()
            Dim pdb As New Rfc2898DeriveBytes(EncryptionKey, New Byte() {&H49, &H76, &H61, &H6E, &H20, &H4D,
             &H65, &H64, &H76, &H65, &H64, &H65,
             &H76})
            encryptor.Key = pdb.GetBytes(32)
            encryptor.IV = pdb.GetBytes(16)
            Using ms As New MemoryStream()
                Using cs As New CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write)
                    cs.Write(clearBytes, 0, clearBytes.Length)
                    cs.Close()
                End Using
                clearText = Convert.ToBase64String(ms.ToArray())
            End Using
        End Using
        Return clearText
    End Function
    Public Function Decrypt(cipherText As String) As String
        Dim EncryptionKey As String = "MAKV2SPBNI99212"
        Dim cipherBytes As Byte() = Convert.FromBase64String(cipherText)
        Using encryptor As Aes = Aes.Create()
            Dim pdb As New Rfc2898DeriveBytes(EncryptionKey, New Byte() {&H49, &H76, &H61, &H6E, &H20, &H4D,
             &H65, &H64, &H76, &H65, &H64, &H65,
             &H76})
            encryptor.Key = pdb.GetBytes(32)
            encryptor.IV = pdb.GetBytes(16)
            Using ms As New MemoryStream()
                Using cs As New CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write)
                    cs.Write(cipherBytes, 0, cipherBytes.Length)
                    cs.Close()
                End Using
                cipherText = Encoding.Unicode.GetString(ms.ToArray())
            End Using
        End Using
        Return cipherText
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteAttachmentTicket(ByVal TrxID As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxTicketAttachmentDelete"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxTicketAttachmentDelete " & "'" & TrxID & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Delete Data Attachment Success"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxTicketAttachmentDelete " & "'" & TrxID & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    '<WebMethod(EnableSession:=True)>
    'Public Function UploadFileAttachmentThread() As Response
    '    Dim Response As Response = New Response()
    '    Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
    '    'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
    '    Dim SavePath As String = HttpContext.Current.Server.MapPath("~/apps/attachmentThread/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy") & "/")
    '    Dim TrxUserCreate As String = HttpContext.Current.Request.Form("Username")
    '    Dim TrxNumberID As String = HttpContext.Current.Request.Form("numberid")
    '    Dim TrxCustomerID As String = HttpContext.Current.Request.Form("customerid")
    '    'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
    '    Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
    '    Dim FileName As String = String.Empty
    '    Dim FileExt As String = String.Empty
    '    Dim FileSizing As String = String.Empty
    '    Dim FileId As Guid

    '    Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/attachmentThread/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy")))
    '    If Not System.IO.Directory.Exists(DirectoryX) Then
    '        System.IO.Directory.CreateDirectory(DirectoryX)
    '    End If

    '    For i As Integer = 0 To Files.Count - 1
    '        Dim File As HttpPostedFile = Files(i)
    '        FileId = Guid.NewGuid()
    '        FileName = File.FileName
    '        FileExt = Path.GetExtension(File.FileName)
    '        FileSizing = File.ContentLength

    '        Dim validFileTypes As String() = {"bmp", "gif", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "pdf"}
    '        Dim isValidFile As Boolean = False
    '        For j As Integer = 0 To validFileTypes.Length - 1
    '            If FileExt = "." & validFileTypes(j) Then
    '                Dim FileMod As DateTime = DateTime.Now
    '                Dim FileType As String = File.ContentType
    '                Dim FileSize As Long = File.ContentLength / 1024
    '                Dim FilePath As String = "apps/attachmentThread/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy") & "/"
    '                File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
    '                'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))
    '            Else
    '                'Exit Function
    '            End If
    '        Next

    '    Next
    '    Response.Guid = FileId
    '    Response.FileName = FileName
    '    Response.FileExt = FileExt
    '    Response.FileSizing = FileSizing
    '    'SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; 
    '    'HDR=NO; IMEX=1; Database=\\ptmkpwa12dev08.pertamina.com\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx', 'SELECT * FROM [Sheet1$]')
    '    ''Coba new
    '    Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    '    Try
    '        Dim path As String = HttpContext.Current.Server.MapPath("~/apps/attachmentThread/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy") & "/" & String.Concat(FileId, FileExt))
    '        Dim TrxUrl As String = "attachmentThread/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy") & "/" & String.Concat(FileId, FileExt)

    '        Dim strExec As String = String.Empty
    '        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    '        Try
    '            Using con As New SqlConnection(constr)
    '                Dim sqlComm As New SqlCommand()
    '                sqlComm.Connection = con
    '                sqlComm.CommandText = "UIDESK_TrxThreadAttachment"
    '                sqlComm.CommandType = CommandType.StoredProcedure
    '                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
    '                sqlComm.Parameters.AddWithValue("TrxNumberID", TrxNumberID)
    '                sqlComm.Parameters.AddWithValue("TrxUrl", TrxUrl)
    '                sqlComm.Parameters.AddWithValue("TrxFilename", HttpUtility.UrlDecode(FileName))
    '                sqlComm.Parameters.AddWithValue("TrxFileType", FileExt)
    '                sqlComm.Parameters.AddWithValue("TrxFileSize", FileSizing)
    '                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserCreate)
    '                con.Open()
    '                sqlComm.ExecuteNonQuery()
    '            End Using
    '        Catch ex As Exception

    '            strExec = "exec UIDESK_TrxThreadAttachment " & "'" & TrxCustomerID & "'," & "'" & TrxNumberID & "'," & "'" & TrxUrl & "'," & "'" & HttpUtility.UrlDecode(FileName) & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
    '            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
    '        Finally

    '            strExec = "exec UIDESK_TrxThreadAttachment " & "'" & TrxCustomerID & "'," & "'" & TrxNumberID & "'," & "'" & TrxUrl & "'," & "'" & HttpUtility.UrlDecode(FileName) & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
    '            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
    '            ''End
    '        End Try

    '    Catch __unusedException1__ As Exception
    '    Finally
    '        'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
    '    End Try
    '    Return Response

    'End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionThreadPortal(ByVal TrxCustomerID As String,
                                                  ByVal TrxUsername As String, ByVal TrxAccount As String, ByVal TrxProduct As String,
                                                  ByVal TrxDescription As String, ByVal TrxPhone As String,
                                                  ByVal TrxCustomerName As String, ByVal TrxDateTransaction As String) As String
        Dim TrxPhoneXSS As String = AntiXssEncoder.HtmlEncode(TrxPhone.Trim, True)
        Dim TrxAccountXSS As String = AntiXssEncoder.HtmlEncode(TrxAccount.Trim, True)
        Dim TrxProductXSS As String = AntiXssEncoder.HtmlEncode(TrxProduct.Trim, True)
        Dim TrxCustomerNameXSS As String = AntiXssEncoder.HtmlEncode(TrxCustomerName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim TrxThreadID As String = strTime & New Random().Next(1000000, 9999999)
        Dim TrxNumberID As String = strTime & New Random().Next(100000000, 999999999)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_InsertThreadPortal"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsername)
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxNumberID", TrxNumberID)
                sqlComm.Parameters.AddWithValue("TrxThreadID", TrxThreadID)
                sqlComm.Parameters.AddWithValue("TrxAccount", TrxAccountXSS)
                'sqlComm.Parameters.AddWithValue("TrxCategory", TrxCategory)
                sqlComm.Parameters.AddWithValue("TrxProduct", TrxProductXSS)
                'sqlComm.Parameters.AddWithValue("TrxProblem", TrxProblem)
                sqlComm.Parameters.AddWithValue("TrxDescription", HttpUtility.UrlDecode(TrxDescription))
                sqlComm.Parameters.AddWithValue("TrxChannel", "Portal")
                'sqlComm.Parameters.AddWithValue("TrxPriority", TrxPriority)
                sqlComm.Parameters.AddWithValue("TrxPhone", TrxPhoneXSS)
                sqlComm.Parameters.AddWithValue("TrxCustomerName", TrxCustomerNameXSS)
                sqlComm.Parameters.AddWithValue("TrxDateTransaction", TrxDateTransaction)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_InsertThreadPortal " & "'" & TrxUsername & "'," & "'" & TrxCustomerID & "'," & "'" & TrxNumberID & "'," & "'" & TrxThreadID & "'," & "'" & TrxAccount & "'," & "'" & TrxProduct & "'," & "'" & HttpUtility.UrlDecode(TrxDescription) & "','Portal'," & "'" & TrxPhone & "'," & "'" & TrxCustomerName & "'," & "'" & TrxDateTransaction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Thread Has Been Insert"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_InsertThreadPortal " & "'" & TrxUsername & "'," & "'" & TrxCustomerID & "'," & "'" & TrxNumberID & "'," & "'" & TrxThreadID & "'," & "'" & TrxAccount & "'," & "'" & TrxProduct & "'," & "'" & HttpUtility.UrlDecode(TrxDescription) & "','Portal'," & "'" & TrxPhone & "'," & "'" & TrxCustomerName & "'," & "'" & TrxDateTransaction & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionTicketReminder(ByVal TicketNumber As String,
                                                  ByVal TrxJudul As String, ByVal TrxTanggal As String, ByVal TrxDescription As String,
                                                  ByVal TrxUserCreate As String) As String

        Dim TrxJudulXSS As String = AntiXssEncoder.HtmlEncode(TrxJudul.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxTicketReminder"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TicketNumber", TicketNumber)
                sqlComm.Parameters.AddWithValue("TrxJudul", TrxJudulXSS)
                sqlComm.Parameters.AddWithValue("TrxTanggal", TrxTanggal)
                sqlComm.Parameters.AddWithValue("TrxDescription", HttpUtility.UrlDecode(TrxDescription))
                sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxTicketReminder " & "'" & TicketNumber & "'," & "'" & TrxJudul & "'," & "'" & TrxTanggal & "'," & "'" & HttpUtility.UrlDecode(TrxDescription) & "'," & "'" & TrxUserCreate & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Thread Has Been Insert"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxTicketReminder " & "'" & TicketNumber & "'," & "'" & TrxJudul & "'," & "'" & TrxTanggal & "'," & "'" & HttpUtility.UrlDecode(TrxDescription) & "'," & "'" & TrxUserCreate & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    Function GetValueCustomerID(ByVal _Value As String)
        Dim strSql As String = ""
        strSql = "select CustomerID from SML_mCustomerChannel WHERE ValueChannel='" & _Value & "'"
        _reading = Proses.ExecuteReader(strSql)
        Try
            If _reading.HasRows() Then
                _reading.Read()
                Return _reading("CustomerID").ToString
            Else
                Return "-"
            End If
            _reading.Close()
            LogSuccess(strLogTime, strSql)
        Catch ex As Exception
            LogError(strLogTime, ex, strSql)
        End Try
    End Function
    <WebMethod(EnableSession:=True)>
    Public Function UploadFileAttachmentEmailTicket() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/apps/attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/")
        Dim TrxUserCreate As String = HttpContext.Current.Request.Form("Username")
        Dim TrxNumberID As String = HttpContext.Current.Request.Form("numberid")
        Dim TrxCustomerID As String = HttpContext.Current.Request.Form("customerid")
        Dim SavePathEmail As String = HttpContext.Current.Server.MapPath(_RootAttachmentOutboxEmail & "" & TrxNumberID)
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "")))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        End If

        For i As Integer = 0 To Files.Count - 1
            Dim File As HttpPostedFile = Files(i)
            FileId = Guid.NewGuid()
            FileName = File.FileName
            FileExt = Path.GetExtension(File.FileName)
            FileSizing = File.ContentLength

            'Dim validFileTypes As String() = {"bmp", "gif", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "pdf"}
            Dim validFileTypes As String() = {"png", "jpg", "jpeg", "pdf"}
            Dim isValidFile As Boolean = False
            For j As Integer = 0 To validFileTypes.Length - 1
                If FileExt = "." & validFileTypes(j) Then
                    Dim FileMod As DateTime = DateTime.Now
                    Dim FileType As String = File.ContentType
                    Dim FileSize As Long = File.ContentLength / 1024 / 1024
                    Dim FilePath As String = "apps/attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/"
                    If FileSize > 5 Then
                        Response.Guid = FileId
                        Response.FileName = FileName
                        Response.FileExt = FileExt
                        Response.FileSizing = FileSizing
                        Response.ResultUpload = "Please upload file less than 5 MB. Thanks!"
                    Else
                        File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
                    End If
                    'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))
                Else
                    'Exit Function
                End If
            Next

        Next
        Response.Guid = FileId
        Response.FileName = FileName
        Response.FileExt = FileExt
        Response.FileSizing = FileSizing

        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim TrxUrl As String = "attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/" & String.Concat(FileId, FileExt)
        Try
            Dim path As String = HttpContext.Current.Server.MapPath("~/apps/attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/" & String.Concat(FileId, FileExt))
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_TrxTicketAttachment"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                    sqlComm.Parameters.AddWithValue("TrxNumberID", TrxNumberID)
                    sqlComm.Parameters.AddWithValue("TrxUrl", TrxUrl)
                    sqlComm.Parameters.AddWithValue("TrxFilename", HttpUtility.UrlDecode(FileName))
                    sqlComm.Parameters.AddWithValue("TrxFileType", FileExt)
                    sqlComm.Parameters.AddWithValue("TrxFileSize", FileSizing)
                    sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserCreate)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception
                strExec = "exec UIDESK_TrxTicketAttachment " & "'" & TrxCustomerID & "'," & "'" & TrxNumberID & "'," & "'" & TrxUrl & "'," & "'" & HttpUtility.UrlDecode(FileName) & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                strExec = "exec UIDESK_TrxTicketAttachment " & "'" & TrxCustomerID & "'," & "'" & TrxNumberID & "'," & "'" & TrxUrl & "'," & "'" & HttpUtility.UrlDecode(FileName) & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try
        Catch ex As Exception
        End Try

        Dim DirectoryEmail As String = Path.Combine(Server.MapPath(_RootAttachmentOutboxEmail & "" & TrxNumberID))
        If Not System.IO.Directory.Exists(DirectoryEmail) Then
            System.IO.Directory.CreateDirectory(DirectoryEmail)
        End If

        For i As Integer = 0 To Files.Count - 1
            Dim File As HttpPostedFile = Files(i)
            FileId = Guid.NewGuid()
            FileName = File.FileName
            FileExt = Path.GetExtension(File.FileName)
            FileSizing = File.ContentLength

            'Dim validFileTypes As String() = {"bmp", "gif", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "pdf"}
            Dim validFileTypes As String() = {"png", "jpg", "jpeg", "pdf"}
            Dim isValidFile As Boolean = False
            For j As Integer = 0 To validFileTypes.Length - 1
                If FileExt = "." & validFileTypes(j) Then
                    Dim FileMod As DateTime = DateTime.Now
                    Dim FileType As String = File.ContentType
                    Dim FileSize As Long = File.ContentLength / 1024 / 1024
                    Dim FilePath As String = _RootAttachmentOutboxEmail & "" & TrxNumberID
                    If FileSize > 5 Then
                        Response.Guid = FileId
                        Response.FileName = FileName
                        Response.FileExt = FileExt
                        Response.FileSizing = FileSizing
                        Response.ResultUpload = "Please upload file less than 5 MB. Thanks!"
                    Else
                        File.SaveAs(Path.Combine(SavePathEmail, String.Concat(FileId, FileExt)))
                    End If
                    'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))
                Else
                    'Exit Function
                End If
            Next

        Next
        Response.Guid = FileId
        Response.FileName = FileName
        Response.FileExt = FileExt
        Response.FileSizing = FileSizing

        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        Try

            Dim TrxUrlEmail As String = TrxNumberID & "/" & String.Concat(FileId, FileExt)

            Dim strExecEmail As String = String.Empty
            Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_TrxAttachmentEmail"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxEmailID", TrxNumberID)
                    sqlComm.Parameters.AddWithValue("TrxUrl", TrxUrlEmail)
                    sqlComm.Parameters.AddWithValue("TrxFilename", HttpUtility.UrlDecode(FileName))
                    sqlComm.Parameters.AddWithValue("TrxFileType", FileExt)
                    sqlComm.Parameters.AddWithValue("TrxFileSize", FileSizing)
                    sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
                strExecEmail = "exec UIDESK_TrxAttachmentEmail " & "'" & TrxNumberID & "'," & "'" & TrxUrl & "'," & "'" & FileName & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Catch ex As Exception
                strExecEmail = "exec UIDESK_TrxAttachmentEmail " & "'" & TrxNumberID & "'," & "'" & TrxUrl & "'," & "'" & FileName & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                strExecEmail = "exec UIDESK_TrxAttachmentEmail " & "'" & TrxNumberID & "'," & "'" & TrxUrl & "'," & "'" & FileName & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                ''End
            End Try

        Catch __unusedException1__ As Exception
        Finally
        End Try

        Return Response
    End Function
    '<WebMethod()>
    '<ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    'Public Function GetWhereRecords_New(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String) As String
    '    Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    '    'Dim dt As DataTable = New DataTable() msuser,id,username,loginid  | 0,0,'agent1',1
    '    'Dim sql As String = ""
    '    'Using conn As SqlConnection = New SqlConnection(connstring)
    '    '    conn.Open()
    '    '    If tableType = "AllWhereData" Then

    '    '        sql = "select * from [" & tableName & "] " & paramQuery & " "
    '    '    End If
    '    '    Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
    '    '    Dim ds As DataSet = New DataSet()
    '    '    ad.Fill(ds)
    '    '    dt = ds.Tables(0)
    '    '    conn.Close()
    '    'End Using

    '    'Dim cmd As New SqlCommand()
    '    'cmd.CommandType = CommandType.Text
    '    ''cmd.CommandText = "select * from Temp_TrxCSAT where UniqueID=@UniquieIDNya1"
    '    'cmd.CommandText = "select * from [" & tableName & "] @UniquieIDNya2"
    '    'cmd.Parameters.AddWithValue("@UniquieIDNya1", Trim(tableName))
    '    'cmd.Parameters.AddWithValue("@UniquieIDNya2", Trim(paramQuery))
    '    'Dim results As New DataSet
    '    'results = ExecuteQuery(cmd)
    '    Dim FinalTable As String = String.Empty
    '    Dim FinalWhere As String = String.Empty
    '    Dim FinalField As String = String.Empty
    '    Dim FinalValue As String = String.Empty

    '    Dim XtringField As String = tableName
    '    Dim strArrayField() As String = XtringField.Split(",")
    '    Dim resultFields As String = ""

    '    Dim XtringValue As String = paramQuery
    '    Dim strArrayValue() As String = XtringValue.Split(",")
    '    Dim resultValues As String = ""
    '    Dim dt As DataTable = New DataTable()
    '    Dim sql As String = ""
    '    Dim tableJson As String = ""
    '    Try


    '        If strArrayField.Length.ToString() <> strArrayValue.Length.ToString() Then

    '            Return False

    '        Else

    '            Dim i As Integer = 2
    '            While (i < strArrayField.Length.ToString())

    '                resultFields &= "" & strArrayField(i).ToString & "" & ","
    '                resultValues &= "'" & strArrayValue(i).ToString & "'" & ","
    '                FinalField &= "and " & strArrayField(i).ToString & "='" & strArrayValue(i).ToString & "'" & " "
    '                i = i + 1
    '            End While
    '            FinalTable = strArrayField(0).ToString
    '            FinalWhere = "Where " & strArrayField(1).ToString & " <> ''"
    '            FinalField = RemoveLastCharacter(FinalField.ToString)
    '            'Dim insertQuery As String = "insert into " & tableName & " (" & RemoveLastCharacter(resultFields.ToString) & ") values (" & RemoveLastCharacter(resultValues.ToString) & ")"
    '            'Com = New SqlCommand(insertQuery, weberConnection)
    '            'weberConnection.Open()
    '            'Com.ExecuteNonQuery()
    '            'weberConnection.Close()
    '            'Return True
    '        End If


    '        Using conn As SqlConnection = New SqlConnection(connstring)
    '            conn.Open()
    '            If tableType = "AllWhereData" Then

    '                sql = "select * from [" & FinalTable & "] " & FinalWhere & FinalField & " "
    '            End If
    '            Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
    '            Dim ds As DataSet = New DataSet()
    '            ad.Fill(ds)
    '            dt = ds.Tables(0)
    '            conn.Close()
    '        End Using
    '    Catch ex As Exception
    '        LogError(strLogTime, ex, sql)
    '    Finally
    '        LogSuccess(strLogTime, sql)
    '        tableJson = ConvertDataTabletoString(dt)

    '    End Try
    '    Return tableJson
    'End Function
End Class