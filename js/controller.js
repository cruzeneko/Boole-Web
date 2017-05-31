function configure(config_json) {
    var config = JSON.parse(config_json);
    if(config.type != "config")
        return;

    //Set up statement
    var statement = config.statement;
    var statementIsEditable = config.statementIsEditable;
    
    quill.container.firstChild.innerHTML = statement;
    if(!statementIsEditable) {
        quill.disable();
    }


    //Set up inputs: add as many as needed, set them to their value and then flag them
    //read only as needed.

    var inputCount = config.inputCount;
    var outputCount = config.outputCount;
    var inputNames = config.inputs;
    var outputNames = config.outputs;
    var inputsAreReadOnly = !config.inputsAreModifiable;
    var outputsAreReadOnly = !config.outputsAreModifiable;
    var inputCountIsReadOnly = !config.inputCountIsEditable;
    var outputCountIsReadOnly = !config.outputCountIsEditable;

    for(var i = 0; i<inputCount-1; i++){
        jQuery._data( document.getElementById("add_input"),"events").click[0].handler();
    }
    for(var i = 0; i<outputCount-1; i++){
        jQuery._data( document.getElementById("add_output"),"events").click[0].handler();
    }

    for(var i = 0; i<inputCount; i++) {
        var currentInput = document.getElementById("input"+i);
        currentInput.value = ((inputNames!=null) ? inputNames[i] : "");
        if(inputsAreReadOnly) {
            currentInput.readOnly = true;
            var currentRemove = document.getElementById("inDelete"+i);
            if(currentRemove!=null){
                currentRemove.remove();
            }
        }
    }
    for(var i = 0; i<outputCount; i++) {
        var currentOutput = document.getElementById("output"+i);
        currentOutput.value = ((outputNames!=null) ? outputNames[i] : "");;
        if(outputsAreReadOnly) {
            currentOutput.readOnly = true;
            var currentRemove = document.getElementById("outDelete"+i);
            if(currentRemove!=null){
		currentRemove.remove();
            }
        }
    }
    
    var inputRemoveControls = document.getElementsByClassName("remove_input");
    var outputRemoveControls = document.getElementsByClassName("remove_output");

    if(inputCountIsReadOnly) {
        for (var i = 0; i<inputRemoveControls.length; i++) {
            var toRemove = inputRemoveControls[i];
            inputRemoveControls[i].parentNode.removeChild(toRemove);
        }
        document.getElementById("add_input").disabled = true;
        document.getElementById("input"+inputCount).remove();
        if(!inputsAreReadOnly)
	    document.getElementById("inDelete"+inputCount).remove();
    }
    
    if(outputCountIsReadOnly) {
        for (var i = 0; i<outputRemoveControls.length; i++) {
            var toRemove = outputRemoveControls[i];
            outputRemoveControls[i].parentNode.removeChild(toRemove); 
        }
        document.getElementById("add_output").disabled = true;
        document.getElementById("output"+outputCount).remove();
        if(!outputsAreReadOnly)
	    document.getElementById("outDelete"+outputCount).remove();
    }
    evaluateInputOutputStatus();
}


function configure_integration(integration_config_json) {
    var config = JSON.parse(integration_config_json);
    if(config.type != "integrationConfig")
        return;

    document.getElementById("btnExternalSvc").innerHTML = config.externalSvcBtnText;
    document.getElementById("btnLaunchExternalSvc").innerHTML = config.launchSvcBtnText;

    if(!config.downloadUnlinkedVHDLBtnEnabled){
        document.getElementById("btnUnlinkedVHDL").disabled = true;    
    }
    if(!config.downloadUnlinkedVHDLBtnPresent){
        document.getElementById("btnUnlinkedVHDL").remove();
    }
    if(!config.downloadLinkedVHDLBtnEnabled){
        document.getElementById("btnLinkedVHDL").disabled = true;
    }
    if(!config.downloadLinkedVHDLBtnPresent){
        document.getElementById("btnLinkedVHDL").remove();
    }

    gSystemArchitectureType = config.archType;    

    gPorts = config.ports;
    
}
