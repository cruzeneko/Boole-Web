function ModalManager() {
    
    this.displayInfoModal = function(heading, text) {
        document.getElementById("infoModalTitle").innerHTML = heading;
        document.getElementById("infoModalText").innerHTML = text;
        $("#infoModal").modal();
    }

    function displayOverrideConfirmModal(divName, heading, text, overrideFunction) {

    }


}
