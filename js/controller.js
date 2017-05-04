function configure(config_json) {
    var config = JSON.parse(config_json);

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

    for(var i = 0; i<inputCount; i++) {
        var currentInput = document.getElementById("input"+i);
        jQuery._data( document.getElementById("add_input"),"events").click[0].handler();
        currentInput.value = inputNames[i];
        if(inputsAreReadOnly) {
            currentInput.readOnly = true;
        }
    }
    for(var i = 0; i<outputCount; i++) {
        var currentOutput = document.getElementById("output"+i);
        jQuery._data( document.getElementById("add_output"),"events").click[0].handler();
        currentOutput.value = outputNames[i];
        if(outputsAreReadOnly) {
            currentOutput.readOnly = true;
        }
    }

    
    var inputRemoveControls = document.getElementsByClassName("remove_input");
    var outputRemoveControls = document.getElementsByClassName("remove_output");

    if(inputCountIsReadOnly) {
        for (var i = 0; i<inputRemoveControls; i++) {
            var toRemove = inputRemoveControls[i];
            inputRemoveControls[i].parentNode.removeChild(toRemove);
        }
        document.getElementById("add_input").disabled = true
    }
    
    if(outputCountIsReadOnly) {
        for (var i = 0; i<outputRemoveControls; i++) {
            var toRemove = outputRemoveControls[i];
            outputRemoveControls[i].parentNode.removeChild(toRemove); 
        }
        document.getElementById("add_output").disabled = true
    }
    
    gRealAvailableInputs = config.availableRealWorldInputs;
    gRealAvailableOutputs = config.availableRealWorldOutputs;

}
