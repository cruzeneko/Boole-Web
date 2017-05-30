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
    gLastError =  _("This tab switch is not allowed.");
    gLastError += " ";
    gLastError += _("You must declare inputs and outputs first.");
    return ValidationStatus.DISALLOWED;
}


function validIntroVK(){
    gLastError = _("This tab switch is not allowed.");
    
    return ValidationStatus.DISALLOWED;
}


function validIntroCircuit(){
    gLastError = _("This tab switch is not allowed.");
    return ValidationStatus.DISALLOWED;
}


function validStatementIntro(){
    //Warn about data loss. If okay, continue
    modalMgr.displayOverrideConfirmModal(
                                         _("Confirm"), 
                                         _("Statement data will be lost. Do you want to continue?"), 
                                         function(){
                                            triggerTabSwitch("Intro");
                                            modalMgr.hideAllModals();
                                         });

    return ValidationStatus.DATA_LOSS;
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
    gLastError = _("This tab switch is not allowed.");
    gLastError += " ";
    gLastError += _("You must fill in the truth table first");
    return ValidationStatus.DISALLOWED;
}

function validStatementCircuit(){
    gLastError = _("This tab switch is not allowed.");
    gLastError += " ";
    gLastError += _("You must fill in the truth table and solve Karnaugh maps first.");
    return ValidationStatus.DISALLOWED;
}


function validTableIntro(){
    //Warn about data loss. If okay, continue
    modalMgr.displayOverrideConfirmModal(
                                         _("Confirm"),
                                         _("The statement and the truth table will be lost. Do you want to continue?"),
                                         function(){
                                            triggerTabSwitch("Intro");
                                            modalMgr.hideAllModals();
                                         });

    return ValidationStatus.DATA_LOSS;
}


function validTableStatement(){
    //Warn about data loss. If okay, continue
    modalMgr.displayOverrideConfirmModal(
                                         _("Confirm"),
                                         _("The truth table  will be lost. Do you want to continue?"),
                                         function(){
                                            triggerTabSwitch("Statement");
                                            modalMgr.hideAllModals();
                                         });

    return ValidationStatus.DATA_LOSS;
}


function validTableTable(){
    return ValidationStatus.ALLOWED;
}

function validTableVK(){
    var tableIsFull = isTruthTableComplete(truthTable)
    if(tableIsFull){ 
        return ValidationStatus.ALLOWED;
    }
    else{
        gLastError = _("You must fill the truth table before creating Karnaugh Maps from it.");
        return ValidationStatus.DISALLOWED;
    }
}


function validTableCircuit(){
    gLastError = _("This tab switch is not allowed.");
    gLastError += " ";
    gLastError += _("You must solve Karnaugh maps first.");
    return ValidationStatus.DISALLOWED;
}


function validVKIntro(){
    //Warn about data loss. If okay, continue
    modalMgr.displayOverrideConfirmModal(
                                         _("Confirm"),
                                         _("Statement, truth table and Karnaugh maps will be lost. Do you want to continue?"),
                                         function(){
                                            triggerTabSwitch("Intro");
                                            modalMgr.hideAllModals();
                                         });

    return ValidationStatus.DATA_LOSS;
}


function validVKStatement(){
    //Warn about data loss. If okay, continue
    modalMgr.displayOverrideConfirmModal(
                                         _("Confirm"),
                                         _("Karnaugh maps and truth table will be lost. Do you want to continue?"),
                                         function(){
                                            triggerTabSwitch("Statement");
                                            modalMgr.hideAllModals();
                                         });

    return ValidationStatus.DATA_LOSS;
}


function validVKTable(){
    //Warn about data loss. If okay, continue
    modalMgr.displayOverrideConfirmModal(
                                         _("Confirm"),
                                         _("Karnaugh maps and table will be lost. Do you want to continue?"),
                                         function(){
                                            triggerTabSwitch("Table");
                                            modalMgr.hideAllModals();
                                         });

    return ValidationStatus.DATA_LOSS;
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
    //Warn about data loss. If okay, continue
    modalMgr.displayOverrideConfirmModal(
                                         _("Confirm"),
                                         _("The whole system will be lost. Do you want to continue?"),
                                         function(){
                                            triggerTabSwitch("Intro");
                                            modalMgr.hideAllModals();
                                         });

    return ValidationStatus.DATA_LOSS;
}


function validCircuitStatement(){
//Warn about data loss. If okay, continue
    modalMgr.displayOverrideConfirmModal(
                                         _("Confirm"),
                                         _("The whole system will be lost. Do you want to continue?"),
                                         function(){
                                            triggerTabSwitch("Statement");
                                            modalMgr.hideAllModals();
                                         });

    return ValidationStatus.DATA_LOSS;
}


function validCircuitTable(){
    //Warn about data loss. If okay, continue
    modalMgr.displayOverrideConfirmModal(
                                         _("Confirm"),
                                         _("Karnaugh maps and the circuit will be lost. Do you want to continue?"),
                                         function(){
                                            triggerTabSwitch("Table");
                                            modalMgr.hideAllModals();
                                         });

    return ValidationStatus.DATA_LOSS;
}


function validCircuitVK(){
    //Warn about data loss. If okay, continue
    modalMgr.displayOverrideConfirmModal(
                                         _("Confirm"),
                                         _("Circuit representations will be lost. Do you want to continue?"),
                                         function(){
                                            triggerTabSwitch("VK");
                                            modalMgr.hideAllModals();
                                         });

    return ValidationStatus.DATA_LOSS;
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
    if(gSystemTitle == "") gSystemTitle = _("Untitled");

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
    $("#vkSlider").empty();
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
    var realIn = [];
    var realOut = [];
    var sysIn = [];
    var sysOut = [];

    var j,k;
    for(var i = j = k = 0; i<gPorts.length; i++) {
        if(gPorts[i].type == "in"){
            realIn[j++] = gPorts[i].portReprText;
        }
        else if(gPorts[i].type == "out") {
            realOut[k++] = gPorts[i].portReprText;
        }
    }

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
                    gCorrespondenceHashmap[ui.draggable[0].innerText] = getPortByDescriptiveText($(this)[0].firstChild.innerHTML);
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
                    gCorrespondenceHashmap[ui.draggable[0].innerText] = getPortByDescriptiveText($(this)[0].firstChild.innerHTML);
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
