function validIntroIntro(){
    return true;
}


function validIntroStatement(){
    return true;
}


function validIntroTable(){
    return false;
}


function validIntroVK(){
    return false;
}


function validIntroCircuit(){
    return true;
}


function validStatementIntro(){
    //Must warn that data will be lost
    return true;
}


function validStatementStatement(){
    return true;
}


function validStatementTable(){
    evaluateInputOutputStatus();
    return validateTabSwitchToTruthTable();
}

function validStatementVK(){
    return false;
}

function validStatementCircuit(){
    return false;
}


function validTableIntro(){
    //Must warn that data will be lost
    return true;
}


function validTableStatement(){
    //Must warn that data will be lost
    return true;
}


function validTableTable(){
    return true;
}

function validTableVK(){
    return true;
}


function validTableCircuit(){
    return false;
}


function validVKIntro(){
    //Must warn that data will be lost
    return true;
}


function validVKStatement(){
    //Must warn that data will be lost
    return true;
}


function validVKTable(){
    //Must warn that data will be lost
    return true;
}


function validVKVK(){
    return true;
}


function validVKCircuit(){
    var allowed = true;
    console.log("Have to check " + gKarnaughMapObjects.length + " objects to validate");
    for(var i = 0; i<gKarnaughMapObjects.length; i++) {
        allowed = allowed && gKarnaughMapObjects[i].hasKnownSolution();
        console.log("Checkin'");
    }
    return allowed;
}


function validCircuitIntro(){
    //Must warn that data will be lost
    return true;
}


function validCircuitStatement(){
    //Must warn that data will be lost
    return true;
}


function validCircuitTable(){
    //Must warn that data will be lost
    return true;
}


function validCircuitVK(){
    //Must warn that data will be lost
    return true;
}


function validCircuitCircuit(){
    return true;
}


function preopIntroIntro(){
    //Nothing
}


function preopIntroStatement(){
    //Nothing
}


function preopIntroTable(){
    throw "Transición no permitida realizada.";
}


function preopIntroVK(){
    throw "Transición no permitida realizada.";
}


function preopIntroCircuit(){
    //throw "Transición no permitida realizada.";
}


function preopStatementIntro(){
    //Nothing
}


function preopStatementStatement(){
    //Nothing
}


function preopStatementTable(){
    //Clear and append table
    var truthTablePanel = document.getElementById("truthtable-panel");
    while (truthTablePanel.firstChild) {
        truthTablePanel.removeChild(truthTablePanel.firstChild);
    }
    document.getElementById("panel-enunciado-capturado").innerHTML = quill.container.firstChild.innerHTML;
    //document.getElementById("truthtable-panel").innerHTML = "";
    tableCreate();
    return;
}


function preopStatementVK(){
    throw "Transición no permitida realizada.";
}


function preopStatementCircuit(){
    throw "Transición no permitida realizada.";
}


function preopTableIntro(){
    //Nothing
}


function preopTableStatement(){
    //Nothing
}


function preopTableTable(){
    //Nothing
}


function preopTableVK(){
    createAndPopulateKMaps();
    document.getElementById("captured-truthtable-panel").innerHTML = document.getElementById("truthtable-panel").innerHTML;
}


function preopTableCircuit(){
    throw "Transición no permitida realizada.";
}


function preopVKIntro(){
    //Nothing
}


function preopVKStatement(){
    //Nothing
}


function preopVKTable(){
    //Nothing
}


function preopVKVK(){
    //Nothing
}


function preopVKCircuit(){
    //debugger;
    var inputs = [];
    var formulae = [];

    for(var i = 0; i< Object.keys(gInputHashmap).length; i++) {
        inputs[i] = gInputHashmap[i];
    }

    //Alternative 1: Renders all the circuits in one svg. More adequate for displaying.
    /*
    for(var i = 0; i<gKarnaughMapObjects.length; i++){
        var currentFormula = gKarnaughMapObjects[i].getLastSolution();
        var prefixNotationFormula = tokenizeAndDisplayNewFormula(currentFormula, inputs, [gOutputHashmap[i]]);
        formulae[i] = [gOutputHashmap[i], prefixNotationFormula];
    }
    test("holaz", formulae);
    */

    //Alternative 2: Renders each circuit in a separate div. More adequate for printing.

    for(var i = 0; i<gKarnaughMapObjects.length; i++) {
        var formula = gKarnaughMapObjects[i].getLastSolution();
        console.log("Dealing with formula " + formula);
        var sol = tokenizeAndDisplayNewFormula(formula, inputs, [gOutputHashmap[i]]);
        test("holaz",[[gOutputHashmap[i],sol]]);
        console.log("Solution is: " + sol);
    }
}


function preopCircuitIntro(){
    //Nothing yet
}


function preopCircuitStatement(){
    //Nothing yet
}


function preopCircuitTable(){
    //Nothing yet
}


function preopCircuitVK(){
    //Nothing yet
}


function preopCircuitCircuit(){
    //Nothing
}
    

function posopIntroIntro(){
    //Nothing
}


function posopIntroStatement(){
    //Nothing yet
}


function posopIntroTable(){
    //TODO
}


function posopIntroVK(){
    throw "Transición no permitida realizada";
}


function posopIntroCircuit(){
    //throw "Transición no permitida realizada";
}


function posopStatementIntro(){
    //Nothing yet
}


function posopStatementStatement(){
    //Nothing
}


function posopStatementTable(){
    var children = document.getElementById('panel-enunciado-capturado').children;
    for (var i = 0; i < children.length; i++) {
        statementHeight+=children[i].clientHeight;
    }
    
    truthTableWidth = document.getElementById('tablaVerdad').clientHeight * 0.75;
}


function posopStatementVK(){
    //TODO
}


function posopStatementCircuit(){
    throw "Transición no permitida realizada."
}


function 
posopTableIntro(){
    //Nothing yet
}


function posopTableStatement(){
    //Nothing yet
}


function posopTableTable(){
    //Nothing
}


function posopTableVK(){
    //TODO
}


function posopTableCircuit(){
    throw "Transición no permitida realizada";
}


function posopVKIntro(){
    //nothing yet
}


function posopVKStatement(){
    //Nothing yet
}


function posopVKTable(){
    //Nothing yet
}


function posopVKVK(){
    //Nothing
}


function posopVKCircuit(){
    //Nothing yet
}


function posopCircuitIntro(){
    //Nothing yet
}


function posopCircuitStatement(){
    //Nothing yet
}


function posopCircuitTable(){
    //Nothing yet
}


function posopCircuitVK(){
    //Nothing yet
}


function posopCircuitCircuit(){
    //Nothing
}
