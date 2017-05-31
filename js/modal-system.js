function ModalManager() {
    
    this.displayInfoModal = function(heading, text) {
        document.getElementById("infoModalTitle").innerHTML = heading;
        document.getElementById("infoModalText").innerHTML = text;
        $("#infoModal").modal();
    }

    this.displayOverrideConfirmModal = function(heading, text, overrideFunction) {
        document.getElementById("dataLossWarnModalTitle").innerHTML = heading;
        document.getElementById("dataLossWarnModalText").innerHTML = text;
        document.getElementById("dataLossWarnModalProceedButton").innerHTML = _("Proceed");
        document.getElementById("dataLossWarnModalCancelButton").innerHTML = _("Cancel");
        document.getElementById("dataLossWarnModalProceedButton").onclick = overrideFunction;
        $("#dataLossWarnModal").modal();
    }

    this.hideAllModals = function() {
        $('#infoModal').modal('hide');
        $('#dataLossWarnModal').modal('hide');
    }

}
