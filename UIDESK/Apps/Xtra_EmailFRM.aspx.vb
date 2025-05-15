Public Class Xtra_EmailFRM
    Inherits System.Web.UI.Page

    ' Event Page_Load
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        ' Jalankan hanya pada saat halaman pertama kali dimuat
        If Not IsPostBack Then
            ' Tambahkan logika untuk inisialisasi halaman jika diperlukan
        End If
    End Sub

    ' Mengatur data untuk ASPxGridView saat diinisialisasi
    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        ' Ganti stored procedure ini dengan nama yang relevan untuk aplikasi Anda
        ' DSource.SelectCommand = "exec GetInboxEmails"
    End Sub

    ' Fungsi untuk mengekspor data dari ASPxGridView berdasarkan format yang dipilih
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim fileFormat As String = ddList.SelectedValue

        ' Mengekspor data sesuai dengan format yang dipilih oleh pengguna
        Select Case fileFormat
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("EmailData_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("EmailData_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("EmailData_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("EmailData_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("EmailData_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub
End Class
