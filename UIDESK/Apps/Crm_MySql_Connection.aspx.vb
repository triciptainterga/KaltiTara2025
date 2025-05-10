Imports MySql.Data.MySqlClient
Public Class Crm_MySql_Connection
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Protected Sub Button_MySqlConnection_ServerClick(sender As Object, e As EventArgs)
        'Dim connectionString As String = "Server=datakelola.com;Port=3306;Database=multichat;Uid=multichat;Pwd=JcjCZ2i3kDipkeJR;"
        Dim connectionString As String = "Server=10.216.206.7;Port=3306;Database=multichat;Uid=multichat;Pwd=Multichat!@#;"
        Using conn As New MySqlConnection(connectionString)
            Try
                conn.Open()
                Console.WriteLine("Koneksi berhasil!")
            Catch ex As Exception
                Console.WriteLine("Terjadi kesalahan: " & ex.Message)
            End Try
        End Using
    End Sub

    Protected Sub TestingLogin_ServerClick(sender As Object, e As EventArgs)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DKConnection").ConnectionString
        Dim result As String = String.Empty
        Dim querySyntax As String = ""
        Try
            Using conn As New MySqlConnection(constr)
                conn.Open()
                Dim query As String = "UPDATE multichat.user_agents SET aux='ready' WHERE username=@username"
                Using cmd As New MySqlCommand(query, conn)
                    cmd.Parameters.AddWithValue("@username", LoginValue.Value)
                    Dim rowsAffected As Integer = cmd.ExecuteNonQuery()
                    If rowsAffected > 0 Then
                        result = "Update successful!"
                    End If
                End Using
            End Using
        Catch ex As Exception
            result = "Error: " & ex.Message
        End Try
    End Sub

    Protected Sub TestingLogout_ServerClick(sender As Object, e As EventArgs)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DKConnection").ConnectionString
        Dim result As String = String.Empty
        Dim querySyntax As String = ""
        Try
            Using conn As New MySqlConnection(constr)
                conn.Open()
                Dim query As String = "UPDATE multichat.user_agents SET aux=NULL WHERE username=@username"
                Using cmd As New MySqlCommand(query, conn)
                    cmd.Parameters.AddWithValue("@username", LogoutValue.Value)
                    Dim rowsAffected As Integer = cmd.ExecuteNonQuery()
                    If rowsAffected > 0 Then
                        result = "Update successful!"
                    End If
                End Using
            End Using
        Catch ex As Exception
            result = "Error: " & ex.Message
        End Try
    End Sub
End Class