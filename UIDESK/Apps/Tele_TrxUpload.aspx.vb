Public Class Tele_TrxUpload
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.QueryString("id") = "All" Then
            XtraUpload.SelectCommand = "SELECT ROW_NUMBER() OVER (ORDER BY ID) RowNumber, * FROM Tele_TrxHeader WHERE UploadStatus='0'"
        Else
            XtraUpload.SelectCommand = "SELECT ROW_NUMBER() OVER (ORDER BY ID) RowNumber, * FROM Tele_TrxHeader WHERE UploadID='" & Request.QueryString("id") & "'"
        End If
    End Sub

End Class