$(document).ready(function () {
    $("#Adm_ApplicationAgent").hide();
    $("#Adm_ApplicationTeamLeader").hide();
    $("#Adm_ApplicationDepartment").hide();
    $("#Adm_ApplicationSysAdmin").hide();
    $("#UpdateChannelEmail").hide();
    $("#SimpanChannelEmail").hide();
    $("#UpdateChannelCall").hide();
    $("#SimpanChannelCall").hide();
    $("#DivTeamLeaderGroupAgent").hide();
    $("#GroupAgentUser").hide();
    $("#ResultTableChannel").hide();
});
function Change_Adm_Cmb_LevelUser(val) {
    //var selectedText = $("#cmbStatus").find("option:selected").text();
    //var selectedValue = $("#Adm_Cmb_LevelUser").val();
    if ($("#Adm_Cmb_LevelUser").val() == "Agent") {
        $("#Adm_ApplicationAgent").hide();
        $("#Adm_ApplicationTeamLeader").hide();
        $("#Adm_ApplicationDepartment").hide();
        $("#Adm_ApplicationSysAdmin").show();
        $("#GroupAgentUser").show();
        $("#Simpan").show();
        $("#TicketingSwitchCheckChecked").prop('checked', true);
        $('#TicketingSwitchCheckChecked').attr("disabled", false);
        $("#QualitySwitchCheckChecked").prop('checked', true);
        $('#QualitySwitchCheckChecked').attr("disabled", false);
        $("#ForecastingSwitchCheckChecked").prop('checked', true);
        $('#ForecastingSwitchCheckChecked').attr("disabled", false);
        $("#SchedulingSwitchCheckChecked").prop('checked', true);
        $('#SchedulingSwitchCheckChecked').attr("disabled", false);
    } else if ($("#Adm_Cmb_LevelUser").val() == "Team Leader") {
        $("#Adm_ApplicationAgent").hide();
        $("#Adm_ApplicationTeamLeader").show();
        $("#Adm_ApplicationDepartment").hide();
        $("#Adm_ApplicationSysAdmin").show();
        $("#GroupAgentUser").hide();
        $("#TicketingSwitchCheckChecked").prop('checked', true);
        $('#TicketingSwitchCheckChecked').attr("disabled", false);
        $("#QualitySwitchCheckChecked").prop('checked', true);
        $('#QualitySwitchCheckChecked').attr("disabled", false);
        $("#ForecastingSwitchCheckChecked").prop('checked', true);
        $('#ForecastingSwitchCheckChecked').attr("disabled", false);
        $("#SchedulingSwitchCheckChecked").prop('checked', true);
        $('#SchedulingSwitchCheckChecked').attr("disabled", false);
    } else if ($("#Adm_Cmb_LevelUser").val() == "Department") {
        $("#Adm_ApplicationAgent").hide();
        $("#Adm_ApplicationTeamLeader").hide();
        $("#Adm_ApplicationDepartment").show();
        $("#Adm_ApplicationSysAdmin").show();
        $("#GroupAgentUser").hide();
        $("#QualitySwitchCheckChecked").prop('checked', false);
        $('#QualitySwitchCheckChecked').attr("disabled", true);
        $("#ForecastingSwitchCheckChecked").prop('checked', false);
        $('#ForecastingSwitchCheckChecked').attr("disabled", true);
        $("#SchedulingSwitchCheckChecked").prop('checked', false);
        $('#SchedulingSwitchCheckChecked').attr("disabled", true);
    } else if ($("#Adm_Cmb_LevelUser").val() == "QA") {
        $("#Adm_ApplicationAgent").hide();
        $("#Adm_ApplicationTeamLeader").hide();
        $("#Adm_ApplicationDepartment").hide();
        $("#Adm_ApplicationSysAdmin").show();
        $("#GroupAgentUser").hide();
        $("#TicketingSwitchCheckChecked").prop('checked', false);
        $('#TicketingSwitchCheckChecked').attr("disabled", true);
        $("#QualitySwitchCheckChecked").prop('checked', true);
        $("#ForecastingSwitchCheckChecked").prop('checked', false);
        $('#ForecastingSwitchCheckChecked').attr("disabled", true);
        $("#SchedulingSwitchCheckChecked").prop('checked', false);
        $('#SchedulingSwitchCheckChecked').attr("disabled", true);
    } else if ($("#Adm_Cmb_LevelUser").val() == "Admin Release") {
        $("#Adm_ApplicationAgent").hide();
        $("#Adm_ApplicationTeamLeader").hide();
        $("#Adm_ApplicationDepartment").hide();
        $("#Adm_ApplicationSysAdmin").show();
        $("#GroupAgentUser").hide();
        $("#TicketingSwitchCheckChecked").prop('checked', false);
        $('#TicketingSwitchCheckChecked').attr("disabled", true);
        $("#QualitySwitchCheckChecked").prop('checked', true);
        $("#ForecastingSwitchCheckChecked").prop('checked', false);
        $('#ForecastingSwitchCheckChecked').attr("disabled", true);
        $("#SchedulingSwitchCheckChecked").prop('checked', false);
        $('#SchedulingSwitchCheckChecked').attr("disabled", true);
    } else if ($("#Adm_Cmb_LevelUser").val() == "Supervisor") {
        $("#Adm_ApplicationAgent").hide();
        $("#Adm_ApplicationTeamLeader").hide();
        $("#Adm_ApplicationDepartment").hide();
        $("#Adm_ApplicationSysAdmin").show();
        $("#GroupAgentUser").hide();
        $("#TicketingSwitchCheckChecked").prop('checked', true);
        $('#TicketingSwitchCheckChecked').attr("disabled", false);
        $("#QualitySwitchCheckChecked").prop('checked', false);
        $('#QualitySwitchCheckChecked').attr("disabled", false);
        $("#ForecastingSwitchCheckChecked").prop('checked', false);
        $('#ForecastingSwitchCheckChecked').attr("disabled", true);
        $("#SchedulingSwitchCheckChecked").prop('checked', false);
        $('#SchedulingSwitchCheckChecked').attr("disabled", true);
    } else if ($("#Adm_Cmb_LevelUser").val() == "Sys Admin") {
        $("#Adm_ApplicationAgent").hide();
        $("#Adm_ApplicationTeamLeader").hide();
        $("#Adm_ApplicationDepartment").hide();
        $("#Adm_ApplicationDepartment").hide();
        $("#Adm_ApplicationSysAdmin").show();
        $("#GroupAgentUser").hide(); 
    } else {
        $("#Adm_ApplicationAgent").hide();
        $("#Adm_ApplicationTeamLeader").hide();
        $("#Adm_ApplicationDepartment").hide();
        $("#Adm_ApplicationDepartment").hide();
        $("#Adm_ApplicationSysAdmin").hide();
        $("#GroupAgentUser").hide();
    }
}
function TicketingSystemChange(checked) {
    if (checked) {
        if ($("#Adm_Cmb_LevelUser").val() == "Agent") {
            $("#Adm_ApplicationAgent").show();
        } else {
            $("#Adm_ApplicationAgent").hide();
        }
    } else {
        $("#Adm_ApplicationAgent").hide();
    }
}
function CheckCall(checked) {
    if (checked) {
        $("#addContactModalCall").modal('show');
        $("#ContentPlaceHolder1_HdCall").val("YES")
        $("#SimpanChannelCall").show();
    } else {
        $("#addContactModalCall").modal('hide');
        $("#ContentPlaceHolder1_HdCall").val("NO")
        $("#SimpanChannelCall").hide();
    }
};
function CheckEmail(checked) {
    if (checked) {
        $("#addContactModal").modal('show');
        $("#ContentPlaceHolder1_HdEmail").val("YES")
        $("#SimpanChannelEmail").show();
    } else {
        $("#addContactModal").modal('hide');
        $("#ContentPlaceHolder1_HdEmail").val("NO")
        $("#SimpanChannelEmail").hide();
    }
}
function CheckWhatsApp(checked) {
    if (checked) {
        $("#addContactModal").modal('show');
        $("#ContentPlaceHolder1_HdWhatsApp").val("YES")
        $("#SimpanChannelEmail").show();
    } else {
        $("#addContactModal").modal('hide');
        $("#ContentPlaceHolder1_HdWhatsApp").val("NO")
        $("#SimpanChannelEmail").hide();
    }
}
function CheckInstagram(checked) {
    if (checked) {
        $("#addContactModal").modal('show');
        $("#ContentPlaceHolder1_HdInstagram").val("YES")
        $("#SimpanChannelEmail").show();
    } else {
        $("#addContactModal").modal('show');
        $("#ContentPlaceHolder1_HdInstagram").val("NO")
        $("#SimpanChannelEmail").hide();
    }
}
function CheckFacebook(checked) {
    if (checked) {
        $("#addContactModal").modal('show');
        $("#ContentPlaceHolder1_HdFacebook").val("YES")
        $("#SimpanChannelEmail").show();
    } else {
        $("#addContactModal").modal('show');
        $("#ContentPlaceHolder1_HdFacebook").val("NO")
        $("#SimpanChannelEmail").hide();
    }
}
function CheckChat(checked) {
    if (checked) {
        $("#addContactModal").modal('show');
        $("#ContentPlaceHolder1_HdChat").val("YES")
        $("#SimpanChannelEmail").show();
    } else {
        $("#addContactModal").modal('show');
        $("#ContentPlaceHolder1_HdChat").val("NO")
        $("#SimpanChannelEmail").hide();
    }
}
function TeamLeader_AddGroupAgent() {
    $("#DivTeamLeaderGroupAgent").show();
    $("#addContactModalGroupAgent").modal('hide');
}
function AddGroupAgent() {
    $("#addContactModalGroupAgent").modal('show');
}
function ActionSimpanChannelEmail() {
    $("#addContactModal").modal('hide');
    $("#ResultTableChannel").show();
}