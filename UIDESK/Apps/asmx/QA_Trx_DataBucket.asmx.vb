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
Imports System.Web.HttpException

' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class QA_Trx_DataBucket1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlcon_acra As New SqlConnection(ConfigurationManager.ConnectionStrings("AcraConnection").ConnectionString)
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
        'Public Property AcraID As String
        'Public Property KodeAlatTest As String
        'Public Property UserType As String
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
    Public Function SimpanTransaksi(ByVal ID As String, ByVal Site As String, ByVal Channel As String, ByVal Agent As String, ByVal Waktu As String, ByVal Bulan As String,
                                    ByVal Tahun As String, ByVal Account As String, ByVal Link As String, ByVal UserName As String, ByVal Name As String, ByVal Type As String,
                                    ByVal Action As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "BRA_QM_TrxDataBucket"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("ID", ID)
                sqlComm.Parameters.AddWithValue("Site", Site)
                sqlComm.Parameters.AddWithValue("Channel", Channel)
                sqlComm.Parameters.AddWithValue("Agent", Agent)
                sqlComm.Parameters.AddWithValue("Waktu", Waktu)
                sqlComm.Parameters.AddWithValue("Bulan", Bulan)
                sqlComm.Parameters.AddWithValue("Tahun", Tahun)
                sqlComm.Parameters.AddWithValue("Account", Account)
                sqlComm.Parameters.AddWithValue("Link", Link)
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                sqlComm.Parameters.AddWithValue("Name", Name)
                sqlComm.Parameters.AddWithValue("Type", Type)
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
            strExec = "exec BRA_QM_TrxDataBucket '" & ID & "','" & Site & "','" & Channel & "','" & Agent & "','" & Bulan & "','" & Bulan & "','" & Tahun & "','" & Account & "','" & Link & "','" & UserName & "','" & Name & "','" & Type & "','" & Action & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec BRA_QM_TrxDataBucket '" & ID & "','" & Site & "','" & Channel & "','" & Agent & "','" & Bulan & "','" & Bulan & "','" & Tahun & "','" & Account & "','" & Link & "','" & UserName & "','" & Name & "','" & Type & "','" & Action & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function BRA_QA_GetDataTransaction(ByVal Channel As String, ByVal StarDate As String, ByVal EndDate As String, ByVal Action As String, ByVal UserName As String) As String
        'Dim connstring As String = ConfigurationManager.ConnectionStrings("AcraConnection").ConnectionString
        Dim connstring As String
        Dim dt As DataTable = New DataTable()
        If Channel = "Call" Then
            connstring = ConfigurationManager.ConnectionStrings("AcraConnection").ConnectionString
        Else
            connstring = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        End If
        Dim NameSP = "Exec BRA_QA_GetDataTransaction"
        Dim ExecSP = "" & NameSP & " '" & Channel & "','" & StarDate & "','" & EndDate & "','" & Action & "','" & UserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("BRA_QA_GetDataTransaction", conn)
                sqlComm.Parameters.AddWithValue("@Channel", Channel)
                sqlComm.Parameters.AddWithValue("@StarDate", StarDate)
                sqlComm.Parameters.AddWithValue("@EndDate", EndDate)
                sqlComm.Parameters.AddWithValue("@Action", Action)
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
            LogError(HttpContext.Current.Session("UserName"), ex, ExecSP)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), ExecSP)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ProsesTransaksi(ByVal ID As String, ByVal UserName As String, ByVal Action As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            'exec [BRA_QM_TrxDataBucket_GetManual] 21292,'199312292013101002','INSERT'
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "BRA_QM_TrxDataBucket_GetManual"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("ID", ID)
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
            strExec = "exec BRA_QM_TrxDataBucket_GetManual '" & ID & "','" & UserName & "','" & Action & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec BRA_QM_TrxDataBucket_GetManual '" & ID & "','" & UserName & "','" & Action & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UP_Durasi(ByVal ID As String, ByVal Durasi As String, ByVal UserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "BRA_QM_TrxDataBucket"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("ID", ID)
                sqlComm.Parameters.AddWithValue("Durasi", Durasi)
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
            strExec = "exec UP_Durasi '" & ID & "','" & Durasi & "','" & UserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec UP_Durasi '" & ID & "','" & Durasi & "','" & UserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DataReject(ByVal AcraID As String, ByVal UserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("AcraConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_BRA_RejectBucketPenilaian"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("AcraID", AcraID)
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
            strExec = "exec QM_BRA_RejectBucketPenilaian '" & AcraID & "','" & UserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec QM_BRA_RejectBucketPenilaian '" & AcraID & "','" & UserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function QA_CheckingDataReject(ByVal AcraID As String, ByVal UserName As String) As String
        Dim connstring As String
        connstring = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP = "Exec QA_CheckingDataReject"
        Dim ExecSP = "" & NameSP & " '" & AcraID & "','" & UserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("QA_CheckingDataReject", conn)
                sqlComm.Parameters.AddWithValue("@AcraID", AcraID)
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
            LogError(HttpContext.Current.Session("UserName"), ex, ExecSP)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), ExecSP)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DataDelete(ByVal AcraID As String, ByVal UserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("AcraConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_BRA_DeleteBucketPenilaian"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("AcraID", AcraID)
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
            strExec = "exec QM_BRA_DeleteBucketPenilaian '" & AcraID & "','" & UserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Transaction Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec QM_BRA_DeleteBucketPenilaian '" & AcraID & "','" & UserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteAcraID(ByVal AcraID As String, ByVal UserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "QM_BRA_DeleteAcraID"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("AcraID", AcraID)
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
            strExec = "exec QM_BRA_DeleteAcraID '" & AcraID & "','" & UserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec QM_BRA_DeleteAcraID '" & AcraID & "','" & UserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class