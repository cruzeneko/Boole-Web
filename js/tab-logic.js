ValidationStatus = {
	ALLOWED: 0,
	DISALLOWED: 1,
	DATA_LOSS: 2
};

function validIntroIntro(){
    return ValidationStatus.ALLOWED;
}


function validIntroStatement(){
    return ValidationStatus.ALLOWED;
}


function validIntroTable(){
    return ValidationStatus.DISALLOWED;
}


function validIntroVK(){
    return ValidationStatus.DISALLOWED;
}


function validIntroCircuit(){
    return ValidationStatus.ALLOWED;
}


function validStatementIntro(){
    //Must warn that data will be lost
    return ValidationStatus.ALLOWED;
}


function validStatementStatement(){
    return ValidationStatus.ALLOWED;
}


function validStatementTable(){
    evaluateInputOutputStatus();
    var allowed = validateTabSwitchToTruthTable();
    if(allowed) return ValidationStatus.ALLOWED;
    else return ValidationStatus.DISALLOWED;

}

function validStatementVK(){
    return ValidationStatus.DISALLOWED;
}

function validStatementCircuit(){
    return ValidationStatus.DISALLOWED;
}


function validTableIntro(){
    //Must warn that data will be lost
    return ValidationStatus.ALLOWED;
}


function validTableStatement(){
    //Must warn that data will be lost
    return ValidationStatus.ALLOWED;
}


function validTableTable(){
    return ValidationStatus.ALLOWED;
}

function validTableVK(){
    var tableIsFull = isTruthTableComplete(truthTable)
    debugger;
    if(tableIsFull){ 
        ValidationStatus.ALLOWED;
    }
    else{
        gLastError = _("You must fill the truth table before creating Karnaugh Maps from it");
        return ValidationStatus.DISALLOWED;
    }
}


function validTableCircuit(){
    return ValidationStatus.DISALLOWED;
}


function validVKIntro(){
    //Must warn that data will be lost
    return ValidationStatus.ALLOWED;
}


function validVKStatement(){
    //Must warn that data will be lost
    return ValidationStatus.ALLOWED;
}


function validVKTable(){
    //Must warn that data will be lost
    return ValidationStatus.ALLOWED;
}


function validVKVK(){
    return ValidationStatus.ALLOWED;
}


function validVKCircuit(){
    var allowed = ValidationStatus.ALLOWED;
    console.log("Have to check " + gKarnaughMapObjects.length + " objects to validate");
    for(var i = 0; i<gKarnaughMapObjects.length; i++) {
        allowed = allowed && gKarnaughMapObjects[i].hasKnownSolution();
        console.log("Checkin'");
    }
    return allowed;
}


function validCircuitIntro(){
    //Must warn that data will be lost
    return ValidationStatus.ALLOWED;
}


function validCircuitStatement(){
    //Must warn that data will be lost
    return ValidationStatus.ALLOWED;
}


function validCircuitTable(){
    //Must warn that data will be lost
    return ValidationStatus.ALLOWED;
}


function validCircuitVK(){
    //Must warn that data will be lost
    return ValidationStatus.ALLOWED;
}


function validCircuitCircuit(){
    return ValidationStatus.ALLOWED;
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
    //Transfer title
    gSystemTitle = document.getElementById("tbTitle").value;

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
        gBooleanExpressionStrings[i] = formula;
        console.log("Dealing with formula " + formula);

        var sol = parseFormulaToPrefixNotation(formula, inputs, [gOutputHashmap[i]]);
	test("holaz",[[gOutputHashmap[i],sol]]);
        //console.log("Solution is: " + sol);
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
    posopVKCircuit(); //Debug only
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
    var realIn = ["realIn1","realIn2","realIn3","realIn4","realIn5","realIn6"];
    var realOut = ["realOut1", "realOut2", "realOut3", "realOut4", "realOut5", "realOut6"];
    var sysIn = ["a" , "b",  "c"];
    var sysOut = ["b", "c" , "d"];

    for(var i = 0; i<Object.keys(gInputHashmap).length; i++) {
        sysIn[i] = gInputHashmap[i];
    }

    for(var i = 0; i<Object.keys(gOutputHashmap).length; i++) {
        sysOut[i] = gOutputHashmap[i];
    }

    var sysInDiv = document.createElement('div');
    sysInDiv.id = "sysInDiv";

    var sysOutDiv = document.createElement('div');
    sysOutDiv.id = "sysOutDiv";

    var realInDiv = document.createElement('div');
    realInDiv.id = "realInDiv";

    var realOutDiv = document.createElement('div');
    realOutDiv.id = "realOutDiv";

    var systemIODiv = document.getElementById("systemIOcol");
    var realIODiv = document.getElementById("realIOcol");

    for(var i = 0; i<sysIn.length; i++) {
        var newDraggableInDiv = document.createElement('div');
        var portText = document.createElement('tt');
        newDraggableInDiv.className = "draggable-in";
        newDraggableInDiv.color = "red";
        portText.innerHTML = sysIn[i];
        newDraggableInDiv.appendChild(portText);
        sysInDiv.appendChild(newDraggableInDiv);

    }

    for(var i = 0; i<sysOut.length; i++) {
        var newDraggableOutDiv = document.createElement('div');
        var portText = document.createElement('tt');
        newDraggableOutDiv.className = "draggable-out";
        newDraggableOutDiv.color = "red";
        portText.innerHTML = sysOut[i];
        newDraggableOutDiv.appendChild(portText);
        sysOutDiv.appendChild(newDraggableOutDiv);
    }

    for(var i = 0; i<realIn.length; i++) {
        var newDroppableInDiv = document.createElement('div');
        var portText = document.createElement('tt');
        newDroppableInDiv.className = "droppable-in";
        newDroppableInDiv.color = "red";
        portText.innerHTML = realIn[i];
        newDroppableInDiv.appendChild(portText);
        realInDiv.appendChild(newDroppableInDiv);
    }

    for(var i = 0; i<realOut.length; i++) {
        var newDroppableOutDiv = document.createElement('div');
        var portText = document.createElement('tt');
        newDroppableOutDiv.className = "droppable-out";
        newDroppableOutDiv.color = "red";
        portText.innerHTML = realOut[i];
        newDroppableOutDiv.appendChild(portText);
        realOutDiv.appendChild(newDroppableOutDiv);
    }


    //Make elements draggable
    $('#integration-modal').on('shown.bs.modal', function() {
        var max = -1;
        $(".draggable-in").each(function() {
            var h = $(this).height();
            var w = $(this).width(); 
            max = h > max ? h : max;
            max = w > max ? w : max;
        });
        $(".draggable-out").each(function() {
            var h = $(this).height();
            var w = $(this).width();
            max = h > max ? h : max;
            max = w > max ? w : max;
        });
        $(".draggable-in").height(max); $(".draggable-in").width(max);
        $(".draggable-out").height(max); $(".draggable-out").width(max);
        $(".droppable-in").height($(".droppable-in").height()+max);
        $(".droppable-out").height($(".droppable-out").height()+max);
	$(".droppable-in").width($(".droppable-in").height());
        $(".droppable-out").width($(".droppable-out").height());


        $(".draggable-in").draggable({ 
            revert: true,
            start: function(event, ui) {
                $(this).parent().attr('full', 'false');
                $(".droppable-out").fadeTo( "fast", 0.33 );
            },
            stop: function(event, ui) {
                $(".droppable-out").fadeTo( "fast", 1);
            }
        });
        $(".draggable-out").draggable({ 
            revert: true, 
            start: function(event, ui) {
                $(this).parent().attr('full', 'false');
                $(".droppable-in").fadeTo( "fast", 0.33 );
            },
            stop: function(event, ui) {
                $(".droppable-in").fadeTo( "fast", 1);
            }
        });
        
        $(".draggable-in").on('mousedown', function(event) { 
            $('.container').css('z-index','1');
            $( this ).css('z-index','1000');
            $( this ).css({position: 'relative'});
        });
        $(".draggable-out").on('mousedown', function(event) {
            $('.container').css('z-index','1');
            $( this ).css('z-index','1000');
            $( this ).css({position: 'relative'});
        });

        $(".droppable-in").attr('full', 'false');
        $(".droppable-out").attr('full', 'false');

        $(".droppable-in").droppable({
            activeClass: 'ui-state-hover',
            hoverClass: 'ui-state-active',
            // uncomment the line below to only accept the .correct class..
            // Note: the "drop" function will not be called if not ".correct"
            //  accept : '.correct',
            drop: function(event, ui) {
                // alternative method:
                // if (ui.draggable.find('p').text() == "1") {
                if (ui.draggable.is('.draggable-in') && $(this).attr('full') === 'false') {
                    $(this).addClass('ui-state-highlight').find('p').html('You got it!');
                    $(this).attr('full', 'true');
                    $(this).append(ui.draggable.css({position: 'static'}));
                } else {
                    $('.droppable-in > p').html('Not that one!')
                    setTimeout(function(){ $('.droppable-in > p').html('Drop here'); }, 1000);
                }
            }
        });
 
        $(".droppable-out").droppable({
            activeClass: 'ui-state-hover',
            hoverClass: 'ui-state-active',
            // uncomment the line below to only accept the .correct class..
            // Note: the "drop" function will not be called if not ".correct"
            //  accept : '.correct',
            drop: function(event, ui) {
                // alternative method:
                // if (ui.draggable.find('p').text() == "1") {
                if (ui.draggable.is('.draggable-out') && $(this).attr('full') === 'false') {
                    $(this).addClass('ui-state-highlight').find('p').html('You got it!');
                    $(this).attr('full', 'true');
                    $(this).append(ui.draggable.css({position: 'static'}));
                } else {
                    $('.droppable-in > p').html('Not that one!')
                    setTimeout(function(){ $('.droppable-out > p').html('Drop here'); }, 1000);
                }
            }
        });
    });

    systemIODiv.appendChild(sysInDiv);
    systemIODiv.appendChild(sysOutDiv);
    realIODiv.appendChild(realInDiv);
    realIODiv.appendChild(realOutDiv);

    $("#btnOpenExternal").innerHTML += externalServiceActionName
}

function debugCreateP(text){
    var p2 = document.createElement('p');
    p2.innerHTML = text;
    return p2;
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
