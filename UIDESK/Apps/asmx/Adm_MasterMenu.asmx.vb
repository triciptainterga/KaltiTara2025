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
Imports System.Web.Security.AntiXss
Imports System.Configuration
Imports Newtonsoft.Json.Linq
Imports Newtonsoft.Json
Imports System.Collections.Generic
'Imports System.Xml.Formatting

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class Adm_MasterMenu
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn
    Dim VariabelCookiesUsername As HttpCookie = HttpContext.Current.Request.Cookies("CookiesUserName")

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
    Public Class SubMenu
        Public Property SubMenuID As Integer
        Public Property SubMenuName As String
        Public Property Url_Dua As String
    End Class

    Public Class Menu
        Public Property System As Integer
        Public Property SystemName As String
        Public Property MenuID As Integer
        Public Property MenuName As String
        Public Property IconMenu As String
        Public Property Url_Satu As String
        Public Property Number As Integer
        Public Property submenus As List(Of SubMenu)
    End Class
    Public Class MenuData
        Public Property System As Integer
        Public Property SystemName As String
        Public Property MenuID As Integer
        Public Property MenuName As String
        Public Property IconMenu As String
        Public Property Url_Satu As String
        Public Property Number As Integer
        Public Property SubMenuID As Integer
        Public Property SubMenuName As String
        Public Property Url_Dua As String
        Public Property SubMenuIDTree As Integer?
        Public Property MenuTreeName As String
        Public Property Url_Tiga As String
    End Class
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
    Public Function UIDESK_TrmMasterCombo(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrmDropdown"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmDropdown", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "0")
                sqlComm.Parameters.AddWithValue("@TrxUserName", "Admin")
                sqlComm.Parameters.AddWithValue("@TrxAction", "UIDESK169")
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

        'Dim generator As New JsonGenerator()
        'Dim tableJson As String = GenerateDynamicJsonFromDataTable(dt)
        'Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetJsonResult(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim NameSP As String = "Exec UIDESK_TrmDropdown"
        Dim ExecSP As String = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','" & TrxAction & "'"
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmDropdown", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "0")
                sqlComm.Parameters.AddWithValue("@TrxUserName", "Admin")
                sqlComm.Parameters.AddWithValue("@TrxAction", "UIDESK169")
                sqlComm.CommandType = CommandType.StoredProcedure
                Dim da As SqlDataAdapter = New SqlDataAdapter()
                Dim ds As DataSet = New DataSet()
                da.SelectCommand = sqlComm
                da.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()

                ' Display data for debugging
                For Each row As DataRow In dt.Rows
                    For Each column As DataColumn In dt.Columns
                        Console.Write(row(column) & vbTab)
                    Next
                    Console.WriteLine()
                Next
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, ExecSP)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), ExecSP)
        End Try

        Dim tableJson As String = ConvertDataTableToJsonTree(dt)
        Return tableJson
    End Function

    Private Function ConvertDataTableToJsonTree(dt As DataTable) As String
        Dim treeList As New List(Of Object)()

        For Each row As DataRow In dt.Rows
            Dim parentID = row("SystemName")
            Dim node = New With {
                .id = row("MenuID"),
                .menuName = row("MenuName"),
                .parentId = parentID,
                .children = New List(Of Object)()
            }
            If parentID Is Nothing OrElse String.IsNullOrEmpty(parentID.ToString()) Then
                treeList.Add(node)
            Else
                AddNodeToTree(treeList, parentID, node)
            End If
        Next

        Return JsonConvert.SerializeObject(treeList)
    End Function

    Private Sub AddNodeToTree(tree As List(Of Object), parentId As Object, node As Object)
        For Each item In tree
            If item.id = parentId Then
                item.children.Add(node)
                Return
            ElseIf item.children IsNot Nothing AndAlso item.children.Count > 0 Then
                AddNodeToTree(item.children, parentId, node)
            End If
        Next
    End Sub

    Public Function GetMenuData() As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxID As Integer = 0
        Dim TrxUserName As String = "Admin"
        Dim TrxAction As String = "UIDESK169"

        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmDropdown", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                sqlComm.CommandType = CommandType.StoredProcedure

                Dim da As SqlDataAdapter = New SqlDataAdapter(sqlComm)
                da.Fill(dt)

                conn.Close()
            End Using
        Catch ex As Exception
            ' Tangani error di sini
        End Try

        ' Mengonversi DataTable menjadi JSON
        Dim menus As List(Of Menu) = ConvertDataTableToMenuList(dt)
        Dim json As String = Newtonsoft.Json.JsonConvert.SerializeObject(menus)

        Return json
    End Function

    Private Function ConvertDataTableToMenuList(dt As DataTable) As List(Of Menu)
        Dim menus As New List(Of Menu)

        For Each row As DataRow In dt.Rows
            Dim menuId As Integer = Convert.ToInt32(row("MenuID"))

            ' Cari menu dengan ID yang sama jika sudah ada
            Dim existingMenu As Menu = menus.FirstOrDefault(Function(m) m.MenuID = menuId)

            If existingMenu Is Nothing Then
                ' Buat menu baru jika belum ada
                Dim newMenu As New Menu With {
                .System = Convert.ToInt32(row("System")),
                .SystemName = Convert.ToString(row("SystemName")),
                .MenuID = menuId,
                .MenuName = Convert.ToString(row("MenuName")),
                .IconMenu = Convert.ToString(row("IconMenu")),
                .Url_Satu = Convert.ToString(row("Url_Satu")),
                .Number = Convert.ToInt32(row("Number")),
                .submenus = New List(Of SubMenu)()
            }

                ' Tambahkan submenu jika ada
                If Not IsDBNull(row("SubMenuID")) Then
                    newMenu.submenus.Add(New SubMenu With {
                    .SubMenuID = Convert.ToInt32(row("SubMenuID")),
                    .SubMenuName = Convert.ToString(row("SubMenuName")),
                    .Url_Dua = Convert.ToString(row("Url_Dua"))
                })
                End If

                menus.Add(newMenu)
            Else
                ' Tambahkan submenu ke menu yang sudah ada
                If Not IsDBNull(row("SubMenuID")) Then
                    existingMenu.submenus.Add(New SubMenu With {
                    .SubMenuID = Convert.ToInt32(row("SubMenuID")),
                    .SubMenuName = Convert.ToString(row("SubMenuName")),
                    .Url_Dua = Convert.ToString(row("Url_Dua"))
                })
                End If
            End If
        Next

        Return menus
    End Function
    Public Function GenerateDynamicJsonFromDataTable(dt As DataTable) As String
        ' Inisialisasi objek JSON utama
        Dim jsonObj As New JObject()

        ' Ambil nilai systemname dari baris pertama (jika ada)
        Dim systemName As String = If(dt.Rows.Count > 0, dt.Rows(0)("systemname").ToString(), "")

        ' Tambahkan properti systemname ke dalam objek JSON utama
        jsonObj.Add("systemname", systemName)

        ' Iterasi melalui setiap baris dalam DataTable
        For Each row As DataRow In dt.Rows
            ' Ambil nilai kolom yang relevan dari DataRow
            Dim subMenuID As Integer = Convert.ToInt32(row("SubMenuID"))
            Dim subMenuName As String = row("SubMenuName").ToString()
            Dim urlDua As String = row("Url_Dua").ToString()
            Dim subMenuIDTree As Integer? = If(row("SubMenuIDTree") Is DBNull.Value, Nothing, Convert.ToInt32(row("SubMenuIDTree")))
            Dim menuTreeName As String = If(row("MenuTreeName") Is DBNull.Value, Nothing, row("MenuTreeName").ToString())
            Dim urlTiga As String = If(row("Url_Tiga") Is DBNull.Value, Nothing, row("Url_Tiga").ToString())

            ' Buat objek JSON untuk setiap baris dalam DataTable
            Dim subMenuObj As New JObject()
            subMenuObj.Add("SubMenuID", subMenuID)
            subMenuObj.Add("SubMenuName", subMenuName)
            subMenuObj.Add("Url_Dua", urlDua)
            subMenuObj.Add("SubMenuIDTree", subMenuIDTree)
            subMenuObj.Add("MenuTreeName", menuTreeName)
            subMenuObj.Add("Url_Tiga", urlTiga)

            ' Tambahkan objek subMenuObj ke dalam JObject utama sesuai dengan hierarki yang sesuai
            Dim currentObj As JObject = jsonObj
            Dim hierarchyKeys As New List(Of String)()

            ' Iterasi melalui setiap kolom dalam DataRow
            For Each column As DataColumn In dt.Columns
                Dim columnName As String = column.ColumnName
                Dim columnValue As Object = row(columnName)

                ' Skip column if it's one of the known properties
                If columnName = "SubMenuID" OrElse columnName = "SubMenuName" OrElse columnName = "Url_Dua" OrElse
                   columnName = "SubMenuIDTree" OrElse columnName = "MenuTreeName" OrElse columnName = "Url_Tiga" Then
                    Continue For
                End If

                ' Add property to the current object
                If TypeOf columnValue Is DBNull Then
                    currentObj.Add(columnName, Nothing)
                Else
                    currentObj.Add(columnName, JToken.FromObject(columnValue))
                End If
            Next

            ' Tambahkan objek subMenuObj ke dalam JObject utama sesuai dengan hierarki yang sesuai
            If Not currentObj.ContainsKey(subMenuName) Then
                currentObj.Add(subMenuName, New JObject())
            End If

            Dim subMenuNameObj As JObject = DirectCast(currentObj(subMenuName), JObject)
            subMenuNameObj.Add(subMenuID.ToString(), subMenuObj)
        Next

        ' Konversi JObject utama ke dalam string JSON
        Dim jsonResult As String = jsonObj.ToString()

        Return jsonResult
    End Function

    ' Fungsi untuk mengambil data dari database dan mengonversinya ke JSON
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Function GetMenuDataAsJson() As String
        Dim connString As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As New DataTable()

        Try
            Using conn As SqlConnection = New SqlConnection(connString)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmDropdown", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "0")
                sqlComm.Parameters.AddWithValue("@TrxUserName", "Admin")
                sqlComm.Parameters.AddWithValue("@TrxAction", "UIDESK169")
                sqlComm.CommandType = CommandType.StoredProcedure
                Dim da As SqlDataAdapter = New SqlDataAdapter(sqlComm)
                da.Fill(dt)
                conn.Close()
            End Using
        Catch ex As Exception
            ' Handle your exception here
            Return "{""error"": """ & ex.Message & """}"
        End Try

        ' Convert DataTable to list of anonymous objects
        Dim menuList = New List(Of Object)()
        For Each row As DataRow In dt.Rows
            Dim menuObj = New With {
            Key .System = row("System"),
            .SystemName = row("SystemName"),
            .MenuID = row("MenuID"),
            .MenuName = row("MenuName"),
            .IconMenu = row("IconMenu"),
            .Url_Satu = row("Url_Satu"),
            .Number = row("Number"),
            .SubMenuID = row("SubMenuID"),
            .SubMenuName = row("SubMenuName"),
            .Url_Dua = row("Url_Dua"),
            .SubMenuIDTree = If(row.IsNull("SubMenuIDTree"), Nothing, row("SubMenuIDTree")),
            .MenuTreeName = If(row.IsNull("MenuTreeName"), Nothing, row("MenuTreeName")),
            .Url_Tiga = If(row.IsNull("Url_Tiga"), Nothing, row("Url_Tiga"))
        }
            menuList.Add(menuObj)
        Next

        ' Serialize list to JSON using Newtonsoft.Json
        Dim jsonResult As String = JsonConvert.SerializeObject(menuList)

        Return jsonResult
    End Function

    'Sub Main()
    '    Dim xmlString As String = "<?xml version=""1.0"" encoding=""utf-8""?>" &
    '        "<string xmlns=""http://tempuri.org/"">" &
    '        "[ " &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1008,""MenuName"":""Master Data"",""IconMenu"":""database"",""Url_Satu"":"""",""Number"":3,""SubMenuID"":4801,""SubMenuName"":""Data Category"",""Url_Dua"":""Crm_Trm_Category.aspx"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1008,""MenuName"":""Master Data"",""IconMenu"":""database"",""Url_Satu"":"""",""Number"":3,""SubMenuID"":4801,""SubMenuName"":""Data Category"",""Url_Dua"":""Crm_Trm_Category.aspx"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1008,""MenuName"":""Master Data"",""IconMenu"":""database"",""Url_Satu"":"""",""Number"":3,""SubMenuID"":4802,""SubMenuName"":""Data Enquiry Type"",""Url_Dua"":""Crm_Trm_Category_Type.aspx"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1008,""MenuName"":""Master Data"",""IconMenu"":""database"",""Url_Satu"":"""",""Number"":3,""SubMenuID"":4803,""SubMenuName"":""Data Enquiry Detail"",""Url_Dua"":""Crm_Trm_Category_Detail.aspx"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1008,""MenuName"":""Master Data"",""IconMenu"":""database"",""Url_Satu"":"""",""Number"":3,""SubMenuID"":4804,""SubMenuName"":""Data Problem"",""Url_Dua"":""Crm_Trm_Category_Reason.aspx"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1008,""MenuName"":""Master Data"",""IconMenu"":""database"",""Url_Satu"":"""",""Number"":3,""SubMenuID"":4848,""SubMenuName"":""Data Priority Scale"",""Url_Dua"":""Crm_Trm_Priority.aspx"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1008,""MenuName"":""Master Data"",""IconMenu"":""database"",""Url_Satu"":"""",""Number"":3,""SubMenuID"":4808,""SubMenuName"":""Data Channel Ticket"",""Url_Dua"":""Crm_Trm_Channel.aspx"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":3026,""MenuName"":""Channel "",""IconMenu"":""monitor"",""Url_Satu"":"""",""Number"":6,""SubMenuID"":6922,""SubMenuName"":""Outbound Call"",""Url_Dua"":"""",""SubMenuIDTree"":30,""MenuTreeName"":""History Call"",""Url_Tiga"":""TrxHistoryOutbound.aspx""}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1008,""MenuName"":""Master Data"",""IconMenu"":""database"",""Url_Satu"":"""",""Number"":3,""SubMenuID"":4849,""SubMenuName"":""Data Customer Category"",""Url_Dua"":""Crm_Trm_Customer_Category.aspx"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1008,""MenuName"":""Master Data"",""IconMenu"":""database"",""Url_Satu"":"""",""Number"":3,""SubMenuID"":4812,""SubMenuName"":""Data Department"",""Url_Dua"":""Crm_Trm_Department.aspx"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1008,""MenuName"":""Master Data"",""IconMenu"":""database"",""Url_Satu"":"""",""Number"":3,""SubMenuID"":6933,""SubMenuName"":""Data Product Name"",""Url_Dua"":""Crm_Trm_Product_Name.aspx"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1009,""MenuName"":""Apps"",""IconMenu"":""grid"",""Url_Satu"":"""",""Number"":2,""SubMenuID"":4815,""SubMenuName"":""Taskboard"",""Url_Dua"":""Crm_Trx_Taskboard.aspx?status=Open"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1009,""MenuName"":""Apps"",""IconMenu"":""grid"",""Url_Satu"":"""",""Number"":2,""SubMenuID"":4815,""SubMenuName"":""Taskboard"",""Url_Dua"":""Crm_Trx_Taskboard.aspx?status=Open"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1009,""MenuName"":""Apps"",""IconMenu"":""grid"",""Url_Satu"":"""",""Number"":2,""SubMenuID"":4815,""SubMenuName"":""Taskboard"",""Url_Dua"":""Crm_Trx_Taskboard.aspx?status=Open"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1009,""MenuName"":""Apps"",""IconMenu"":""grid"",""Url_Satu"":"""",""Number"":2,""SubMenuID"":4815,""SubMenuName"":""Taskboard"",""Url_Dua"":""Crm_Trx_Taskboard.aspx?status=Open"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1009,""MenuName"":""Apps"",""IconMenu"":""grid"",""Url_Satu"":"""",""Number"":2,""SubMenuID"":4815,""SubMenuName"":""Taskboard"",""Url_Dua"":""Crm_Trx_Taskboard.aspx?status=Open"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}," &
    '            "{" & """System"":1,""SystemName"":""Ticketing System"",""MenuID"":1009,""MenuName"":""Apps"",""IconMenu"":""grid"",""Url_Satu"":"""",""Number"":2,""SubMenuID"":4815,""SubMenuName"":""Taskboard"",""Url_Dua"":""Crm_Trx_Taskboard.aspx?status=Open"",""SubMenuIDTree"":null,""MenuTreeName"":null,""Url_Tiga"":null}" &
    '        "]" &
    '        "</string>"

    '    ' Convert XML string to JSON array
    '    Dim xmlObj = JsonConvert.DeserializeXmlNode(xmlString)
    '    Dim jsonArrayString As String = JsonConvert.SerializeXmlNode(xmlObj("string"))

    '    ' Deserialize JSON array into list of MenuData objects
    '    Dim menuDataList As List(Of MenuData) = JsonConvert.DeserializeObject(Of List(Of MenuData))(jsonArrayString)

    '    ' Group menu data by MenuID
    '    Dim groupedData = menuDataList.GroupBy(Function(m) m.MenuID).Select(Function(g) New With {
    '        .System = g.First().System,
    '        .SystemName = g.First().SystemName,
    '        .MenuID = g.Key,
    '        .MenuName = g.First().MenuName,
    '        .IconMenu = g.First().IconMenu,
    '        .Url_Satu = g.First().Url_Satu,
    '        .Number = g.First().Number,
    '        .SubMenus = g.Select(Function(s) New With {
    '            .SubMenuID = s.SubMenuID,
    '            .SubMenuName = s.SubMenuName,
    '            .Url_Dua = s.Url_Dua,
    '            .SubMenuIDTree = s.SubMenuIDTree,
    '            .MenuTreeName = s.MenuTreeName,
    '            .Url_Tiga = s.Url_Tiga
    '        }).ToList()
    '    })

    '    ' Convert grouped data to JSON format
    '    Dim jsonResult As String = JsonConvert.SerializeObject(groupedData, Formatting.Indented)

    '    ' Output the result
    '    Console.WriteLine(jsonResult)
    'End Sub

End Class