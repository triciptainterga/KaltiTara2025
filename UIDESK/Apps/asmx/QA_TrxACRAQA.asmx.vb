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

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class QA_TrxACRAQA1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim Proses As New ClsConn
    Public Class ResultTransaction
        Public Property Result As String
        Public Property ResultID As String
        Public Property ResultUser As String
        Public Property ResultMessage As String
        Public Property ResultDate As String
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
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecords(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Using conn As SqlConnection = New SqlConnection(connstring)
            conn.Open()
            If tableType = "AllWhereData" Then

                sql = "select * from [" & tableName & "] " & paramQuery & " "
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
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_RejectData(ByVal QM_AcraID As String, ByVal QM_QaName As String, ByVal QM_Status As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_RejectData"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("@AcraID", QM_AcraID)
                sqlComm.Parameters.AddWithValue("@UserQAID", QM_QaName)
                sqlComm.Parameters.AddWithValue("@StatusData", QM_Status)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_RejectData '" & QM_AcraID & "','" & QM_QaName & "','" & QM_Status & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultMessage = "Data Has Been Reject"
            listTickets.Add(objectTickets)
            strExec = "exec QM_RejectData '" & QM_AcraID & "','" & QM_QaName & "','" & QM_Status & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_RequestShare(ByVal QM_AcraID As String, ByVal QM_QaName As String, ByVal QM_Status As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_RequestShare"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("@AcraID", QM_AcraID)
                sqlComm.Parameters.AddWithValue("@UserQAID", QM_QaName)
                sqlComm.Parameters.AddWithValue("@StatusData", QM_Status)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_RequestShare '" & QM_AcraID & "','" & QM_QaName & "','" & QM_Status & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "True"
            objectTickets.ResultMessage = "Data Has Been Share"
            listTickets.Add(objectTickets)
            strExec = "exec QM_RequestShare '" & QM_AcraID & "','" & QM_QaName & "','" & QM_Status & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_AddMore(ByVal QM_Type As String, ByVal QM_QaName As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim ResultNya As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_AddMore"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("@TypeQA", QM_Type)
                sqlComm.Parameters.AddWithValue("@UserQAID", QM_QaName)
                'con.Open()
                'sqlComm.ExecuteNonQuery()
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    ResultNya &= sqldr("AcraID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_AddMore '" & QM_Type & "','" & QM_QaName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            If ResultNya = "0" Then
                Dim objectTickets As ResultTransaction = New ResultTransaction()
                objectTickets.Result = "False"
                objectTickets.ResultMessage = "Request Add More Failed"
                listTickets.Add(objectTickets)
                strExec = "exec QM_AddMore '" & QM_Type & "','" & QM_QaName & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                Dim objectTickets As ResultTransaction = New ResultTransaction()
                objectTickets.Result = "True"
                objectTickets.ResultMessage = "Data Has Been Request Add More"
                listTickets.Add(objectTickets)
                strExec = "exec QM_AddMore '" & QM_Type & "','" & QM_QaName & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End If
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QM_RequestShare_Achieve(ByVal QM_AcraID As String, ByVal QM_QaName As String, ByVal QM_Status As String) As String
        Dim listTickets As List(Of ResultTransaction) = New List(Of ResultTransaction)()
        Dim strExec As String = String.Empty
        Dim ResultNya As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_RequestShare"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("@AcraID", QM_AcraID)
                sqlComm.Parameters.AddWithValue("@UserQAID", QM_QaName)
                sqlComm.Parameters.AddWithValue("@StatusData", QM_Status)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    ResultNya &= sqldr("ResultNya").ToString
                End While
                sqldr.Close()
                con.Close()
                'con.Open()
                'sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultTransaction = New ResultTransaction()
            objectTickets.Result = "False"
            objectTickets.ResultMessage = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec QM_RequestShare '" & QM_AcraID & "','" & QM_QaName & "','" & QM_Status & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            If ResultNya = "Success" Then
                Dim objectTickets As ResultTransaction = New ResultTransaction()
                objectTickets.Result = "True"
                objectTickets.ResultMessage = "Data Has Been Request Share"
                listTickets.Add(objectTickets)
                strExec = "exec QM_RequestShare '" & QM_AcraID & "','" & QM_QaName & "','" & QM_Status & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                Dim objectTickets As ResultTransaction = New ResultTransaction()
                objectTickets.Result = "False"
                objectTickets.ResultMessage = "Today User Has Been Request"
                listTickets.Add(objectTickets)
                strExec = "exec QM_RequestShare '" & QM_AcraID & "','" & QM_QaName & "','" & QM_Status & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End If

        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class