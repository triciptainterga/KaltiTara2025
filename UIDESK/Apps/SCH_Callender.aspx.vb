Public Class SCH_Callender
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        hd_AgentScheduleID.Value = Session("USERID")
    End Sub

End Class