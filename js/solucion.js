var gDeclaredInputCount = 1;
var gDefinedInputCount = 0;
var gDeclaredOutputCount = 1;
var gDefinedOutputCount = 0;
var gInputHashmap = {};
var gOutputHashmap = {};
var gDuplicatedInputs = false;
var gDuplicatedOutputs = false;
var gQmcHashmap = {};
var gKarnaughHashmap = {};
var gSystemTitle;
var currentTab = "Intro";
var truthTable;
var modalMgr = new ModalManager();
var gPorts = [];
var gCorrespondenceHashmap = {}
var gExternalServiceTriggeredCount = 0;
var gSystemArchitectureType = "behavioral";

var validationFunctions = {
                                "Intro":     {"Intro":validIntroIntro,     "Statement":validIntroStatement,     "Table":validIntroTable,       "VK": validIntroVK,       "Circuit":validIntroCircuit},
                                "Statement": {"Intro":validStatementIntro, "Statement":validStatementStatement, "Table":validStatementTable,   "VK": validStatementVK,   "Circuit":validTableCircuit},
                                "Table":     {"Intro":validTableIntro,     "Statement":validTableStatement,     "Table":validTableTable,       "VK": validTableVK,       "Circuit":validTableCircuit},
                                "VK":        {"Intro":validVKIntro,        "Statement":validVKStatement,        "Table":validVKTable,          "VK": validVKVK,          "Circuit":validVKCircuit},
                                "Circuit":   {"Intro":validCircuitIntro,   "Statement":validCircuitStatement,   "Table":validCircuitTable,     "VK": validCircuitVK,     "Circuit":validCircuitCircuit}
                            };
var preOperationFunctions = {
                                "Intro":     {"Intro":preopIntroIntro,     "Statement":preopIntroStatement,     "Table":preopIntroTable,       "VK": preopIntroVK,       "Circuit":preopIntroCircuit},
                                "Statement": {"Intro":preopStatementIntro, "Statement":preopStatementStatement, "Table":preopStatementTable,   "VK": preopStatementVK,   "Circuit":preopStatementCircuit},
                                "Table":     {"Intro":preopTableIntro,     "Statement":preopTableStatement,     "Table":preopTableTable,       "VK": preopTableVK,       "Circuit":preopTableCircuit},
                                "VK":        {"Intro":preopVKIntro,        "Statement":preopVKStatement,        "Table":preopVKTable,          "VK": preopVKVK,          "Circuit":preopVKCircuit},
                                "Circuit":   {"Intro":preopCircuitIntro,   "Statement":preopCircuitStatement,   "Table":preopCircuitTable,     "VK": preopCircuitVK,     "Circuit":preopCircuitCircuit}
                            };
var postOperationFunctions = {
                                "Intro":     {"Intro":posopIntroIntro,     "Statement":posopIntroStatement,     "Table":posopIntroTable,       "VK": posopIntroVK,   "Circuit":posopIntroCircuit},
                                "Statement": {"Intro":posopStatementIntro, "Statement":posopStatementStatement, "Table":posopStatementTable,   "VK": posopTableVK,   "Circuit":posopTableCircuit},
                                "Table":     {"Intro":posopTableIntro,     "Statement":posopTableStatement,     "Table":posopTableTable,       "VK": posopTableVK,   "Circuit":posopTableCircuit},
                                "VK":        {"Intro":posopVKIntro,        "Statement":posopVKStatement,        "Table":posopVKTable,          "VK": posopVKVK,      "Circuit":posopVKCircuit},
                                "Circuit":   {"Intro":posopCircuitIntro,   "Statement":posopCircuitStatement,   "Table":posopCircuitTable,     "VK": posopCircuitVK, "Circuit":posopCircuitCircuit}
                            };


var statementHeight = 0;
var truthTableWidth = 0;

function validateTabSwitch(TabName) {
    var allowed;

    allowed = validationFunctions[currentTab][TabName]();
    console.log("Validating: " + currentTab + " -> " + TabName + ": ");
    
    if(allowed == ValidationStatus.ALLOWED)
        console.log("allowed");
    else if(allowed == ValidationStatus.DISALLOWED)
        console.log("not allowed");
    else if(allowed == ValidationStatus.DATA_LOSS)
        console.log("data loss will occur. Standing by for user");

    return allowed;
}

function preOperateOnTabSwitch(TabName) {
    console.log("Pre-operating: " + currentTab + " -> " + TabName);
    preOperationFunctions[currentTab][TabName]();
    console.log("Done, theoretically");
}

function postOperateOnTabSwitch(TabName) {
    console.log("Post-operating: " + currentTab + " -> " + TabName);
    postOperationFunctions[currentTab][TabName]();
    currentTab = TabName;
}


function triggerTabSwitch(TabName) {
    var i, tabcontent, tablinks, targetTab;

    preOperateOnTabSwitch(TabName);

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    targetTab = document.getElementById(TabName);
    targetTab.style.display = "block";
    document.getElementById(targetTab.getAttribute("tab")).className += " active";

    //Post-operate on the tab switch
    postOperateOnTabSwitch(TabName);
}

function openTab(TabName) {
    var i, tabcontent, tablinks;

    var allowed = validateTabSwitch(TabName);
    if(allowed == ValidationStatus.ALLOWED){
        triggerTabSwitch(TabName);
    }
    else if(allowed == ValidationStatus.DISALLOWED){
        modalMgr.displayInfoModal(_("Operation not allowed"), gLastError)
    }


}

function gotoTab(TabId) {
    document.getElementById(TabId).click()
}
    

$(document).ready(function() {
	setupEventListeners();
	
});
