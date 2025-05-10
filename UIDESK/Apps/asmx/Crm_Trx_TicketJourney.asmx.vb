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

' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class Crm_Trx_TicketJourney1
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
        Public Property TrxCC As String
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
    Public Function Uidesk_Trx_UserStatus(ByVal ID As String, ByVal LevelUser As String, ByVal Status As String, ByVal NA As String, ByVal UserName As String, ByVal Action As String) As String
        If Action = "Insert" Or Action = "Update" Or Action = "Delete" Then
            Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "Uidesk_Trx_UserStatus"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("@ID", ID)
                    sqlComm.Parameters.AddWithValue("@LevelUser", LevelUser)
                    sqlComm.Parameters.AddWithValue("@Status", Status)
                    sqlComm.Parameters.AddWithValue("@NA", NA)
                    sqlComm.Parameters.AddWithValue("@UserName", UserName)
                    sqlComm.Parameters.AddWithValue("@Action", Action)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                    con.Close()
                End Using
            Catch ex As Exception
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "False"
                objectTickets.TrxmsgSystem = ex.Message()
                listTickets.Add(objectTickets)
                strExec = "exec Uidesk_Trx_UserStatus '" & ID & "','" & LevelUser & "','" & Status & "','" & NA & "','" & UserName & "','" & Action & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally
                Dim objectTickets As resultInsert = New resultInsert()
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec Uidesk_Trx_UserStatus '" & ID & "','" & LevelUser & "','" & Status & "','" & NA & "','" & UserName & "','" & Action & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End Try
            Dim js As JavaScriptSerializer = New JavaScriptSerializer()
            Return js.Serialize(listTickets)
        Else
            Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Dim dt As DataTable = New DataTable()

            Dim NameSP = "Exec Uidesk_Trx_UserStatus"
            Dim ExecSP = "" & NameSP & " '0','" & ID & "','" & LevelUser & "','" & Status & "','" & NA & "','" & UserName & "','" & Action & "'"
            Try
                Using conn As SqlConnection = New SqlConnection(connstring)
                    conn.Open()
                    Dim sqlComm As SqlCommand = New SqlCommand("Uidesk_Trx_UserStatus", conn)
                    sqlComm.Parameters.AddWithValue("@ID", ID)
                    sqlComm.Parameters.AddWithValue("@LevelUser", LevelUser)
                    sqlComm.Parameters.AddWithValue("@Status", Status)
                    sqlComm.Parameters.AddWithValue("@NA", NA)
                    sqlComm.Parameters.AddWithValue("@UserName", UserName)
                    sqlComm.Parameters.AddWithValue("@Action", Action)
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
        End If
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Update_TransactionTicket_New_Eskalasi(ByVal TrxTicketNumber As String, ByVal TrxResponse As String, ByVal TrxStatus As String, ByVal TrxUsername As String, ByVal TrxChannel As String,
                                             ByVal TrxThreadID As String, ByVal TrxGenesysID As String, ByVal TrxEscalasiUnit As String, ByVal TrxEscalasiStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Trx_TicketJourney"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxTicketNumber", TrxTicketNumber)
                sqlComm.Parameters.AddWithValue("TrxResponse", HttpUtility.UrlDecode(TrxResponse))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsername)
                sqlComm.Parameters.AddWithValue("TrxThreadID", TrxThreadID)
                sqlComm.Parameters.AddWithValue("TrxGenesysID", TrxGenesysID)
                sqlComm.Parameters.AddWithValue("TrxEscalasiUnit", TrxEscalasiUnit)
                sqlComm.Parameters.AddWithValue("TrxEscalasiStatus", TrxEscalasiStatus)
                sqlComm.Parameters.AddWithValue("TrxChannel", TrxChannel)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Trx_TicketJourney '" & TrxTicketNumber & "','" & HttpUtility.UrlDecode(TrxResponse) & "','" & TrxStatus & "','" & TrxUsername & "','" & TrxChannel & "','" & TrxThreadID & "','" & TrxGenesysID & "', '" & TrxEscalasiUnit & "', '" & TrxEscalasiStatus & "', '" & TrxChannel & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Trx_TicketJourney '" & TrxTicketNumber & "','" & HttpUtility.UrlDecode(TrxResponse) & "','" & TrxStatus & "','" & TrxUsername & "','" & TrxChannel & "','" & TrxThreadID & "','" & TrxGenesysID & "', '" & TrxEscalasiUnit & "', '" & TrxEscalasiStatus & "', '" & TrxChannel & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
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
    Public Function TicketActivity(ByVal TicketNumber As String, ByVal UserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "BRA_Ticket_Activity_Display"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TicketNumber", TicketNumber)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec BRA_Ticket_Activity_Display '" & TicketNumber & "','" & UserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec BRA_Ticket_Activity_Display '" & TicketNumber & "','" & UserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try

        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP = "Exec UIDESK_TrmDropdown"
        Dim ExecSP = "" & NameSP & " '" & TicketNumber & "','" & UserName & "','UIDESK181'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmDropdown", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TicketNumber)
                sqlComm.Parameters.AddWithValue("@TrxUserName", UserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", "UIDESK181")
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
    Public Function TicketInteraction(ByVal TicketNumber As String, ByVal UserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP = "Exec UIDESK_TrmDropdown"
        Dim ExecSP = "" & NameSP & " '" & TicketNumber & "','" & UserName & "','UIDESK190'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmDropdown", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TicketNumber)
                sqlComm.Parameters.AddWithValue("@TrxUserName", UserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", "UIDESK190")
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
    Public Function BRA_FollowUpTicket(ByVal UserName As String, ByVal TicketNumber As String, ByVal Status As String, ByVal ResponseAgent As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "BRA_FollowUpTicket"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                sqlComm.Parameters.AddWithValue("TicketNumber", TicketNumber)
                sqlComm.Parameters.AddWithValue("Status", Status)
                sqlComm.Parameters.AddWithValue("ResponseAgent", ResponseAgent)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec BRA_FollowUpTicket '" & UserName & "', '" & TicketNumber & "', '" & Status & "', '" & ResponseAgent & "',"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec BRA_FollowUpTicket '" & UserName & "', '" & TicketNumber & "', '" & Status & "', '" & ResponseAgent & "',"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function BRA_TicketProperties(ByVal UserName As String, ByVal TicketNumber As String, ByVal Pertanyaan As String, ByVal Jawaban As String, ByVal CatatanTeamLeader As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "BRA_TicketProperties"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                sqlComm.Parameters.AddWithValue("TicketNumber", TicketNumber)
                sqlComm.Parameters.AddWithValue("Pertanyaan", Pertanyaan)
                sqlComm.Parameters.AddWithValue("Jawaban", Jawaban)
                sqlComm.Parameters.AddWithValue("CatatanTeamLeader", CatatanTeamLeader)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec BRA_TicketProperties '" & UserName & "', '" & TicketNumber & "', '" & Pertanyaan & "', '" & Jawaban & "', '" & CatatanTeamLeader & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec BRA_TicketProperties '" & UserName & "', '" & TicketNumber & "', '" & Pertanyaan & "', '" & Jawaban & "', '" & CatatanTeamLeader & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class