var gKarnaughMapObjects = [];


function validateTabSwitchToTruthTable() {
    if(gDefinedOutputCount < gDeclaredOutputCount && gDefinedInputCount < gDeclaredInputCount) {
        alert("Error: Hay entradas y salidas no definidas!");
        return false;
    }
    if(gDefinedInputCount < gDeclaredInputCount) {
        alert("Error: Hay entradas no definidas!");
        return false;
    }
    if(gDefinedOutputCount < gDeclaredOutputCount) {
        alert("Error: Hay salidas no definidas!");
        return false;
    }
    if(gDuplicatedOutputs && gDuplicatedInputs) {
        alert("Error: Hay entradas y salidas duplicadas");
        return false;
    }
    if(gDuplicatedInputs) {
        alert("Error: Hay entradas duplicadas");
        return false;
    }
    if(gDuplicatedOutputs) {
        alert("Error: hay salidas duplicadas");
        return false;
    }
    return true;
}

function createAndPopulateKMaps() {
    console.log("Populating all");
    $('.slider').not('.slick-initialized').slick();
    //$('.slider').slick('unslick');
    var kMapSlider = document.getElementById("vkSlider");
    var j = 0;
    for(var i = gDefinedOutputCount - 1; i >=0 ; i--) {
        //createAndPopulateSingleKMap(kMapSlider, gOutputHashmap[i]);
        $('.slider').slick('slickAdd','<div id="vkdiv'+i+'"><p>'+gOutputHashmap[i]+'</p></div>', 0);
        createAndPopulateSingleKMap(document.getElementById("vkdiv"+i), gOutputHashmap[i], i);
    }
    $('.slider').slick('slickGoTo', 0);
}

function createAndPopulateSingleKMap(parentDiv, outputName, outputOrdinal) {
    var newDiv = document.createElement('div');
    var intDiv = document.createElement('div');
    var topDiv = document.createElement('div');

    newDiv.id = "vk-"+outputName+"-div";
    intDiv.id = "vk-"+outputName+"-intdiv";
    topDiv.id = "vk-"+outputName+"-topdiv";

    topDiv.appendChild(newDiv);
    parentDiv.appendChild(topDiv);
    // newDiv.className =  something?

    // Create the KMAP and the underlying QMC. The first parameter to the 
    // QMC constructor should only be a existing div when debugging.
    var qmc = new QuineMcCluskey("thiswillneverexist", 2, 4, 0);
    qmc.init();
    var karnaugh = new KarnaughMap("vk-"+outputName+"-div", "vk-"+outputName+"-intdiv", qmc, gDeclaredInputCount, outputName, gInputHashmap);    
    karnaugh.init();
    karnaugh.allowDontCares(1);
    karnaugh.setDontShowResult(1);

    for(var i = 0; i< truthTable.length ; i++) {
        karnaugh.setFnValue(i, truthTable[i][gDeclaredInputCount+outputOrdinal]);
    }
    
    var solveHideButton = document.createElement("input");
    solveHideButton.type = "button";
    solveHideButton.value = "Resolver"
    solveHideButton.onclick = showHideSolution;
    solveHideButton.setAttribute("associatedKMapIdx",outputOrdinal);

    topDiv.appendChild(solveHideButton);
    gKarnaughMapObjects[outputOrdinal] = karnaugh;
}

function showHideSolution() {
    var karnaugh = gKarnaughMapObjects[this.getAttribute("associatedKMapIdx")];
    //if(karnaugh == null) throw "Did not expect Karnaugh Map object to be NULL";
    //if(typeof karnaugh === 'undefined') throw "Did not expect Karnaugh Map object to be undefined";

    if(this.value == "Resolver") {
        this.value = "Ocultar";
        karnaugh.setDontShowResult(0);
    }
    else if (this.value == "Ocultar"){
        this.value = "Resolver";
        karnaugh.setDontShowResult(1);
    }
    else throw("Unexpected value");
}

function placeInSingleCellTable(doc, html) {
    //Create a fake table that contains the only element in its only cell

    var newElement = document.createElement("div");
    newElement.innerHTML = "<table><tr><td></b>"+ html+"<b></td></tr></table>";
    var htmlElement = newElement.firstChild;

    //Produce an autotable table from the fake table
    var res = doc.autoTableHtmlToJson(htmlElement);

    //Render the autotable and place it in the document, with 
    doc.autoTable(res.columns, res.rows, 
    {
        startY: doc.autoTableEndPosY() + 10,
        pageBreak: 'auto',
        theme: 'plain',
        headerStyles: {fontStyle: 'normal'}
    });
}

function getStatementPrintableHtml() {
    var ret = "";
    
    //Actual statement text
    ret+="<h3>Enunciado</h3>";
    ret+=document.getElementById("panel-enunciado-capturado").innerHTML;


    //Table containing inputs/outputs
    ret+="<h3>Entradas y Salidas</h3>"
    ret+="<div>";
    ret+="<p>";
    ret+="<b>" +" Entradas: " + "</b> ";
    for(var i = 0; i<Object.keys(gInputHashmap).length; i++) {
        ret+="<tt>" + gInputHashmap[i] + "</tt>";
        if(i < Object.keys(gInputHashmap).length-1) {
            ret+=" , ";
        }
    }
    ret+="</p>";
    ret+="</div>";
    ret+="<div>";
    ret+="<p>";
    ret+="<b>" +" Salidas: " + "</b> ";
    for(var i = 0; i<Object.keys(gOutputHashmap).length; i++) {
        ret+="<tt>" + gOutputHashmap[i] + "</tt>";
        if(i < Object.keys(gOutputHashmap).length-1) {
            ret+=" , ";
        }
    }
    ret+="</p>";
    ret+="</div>";
    return ret;
}

function getTruthTablePrintableHtml() {
    var ret = "";
    var table = document.getElementById("tablaVerdad");
    ret+="<table style=\"font-size:9px;\">"
    ret+=table.innerHTML;
    ret+="</table>"
    return ret;
}

function centeredText(doc, yOffset, text) {
    var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(text) * doc.internal.getFontSize() / 2); 
    doc.text(text, xOffset, yOffset);
}

function printAll() {
    var doc = new jsPDF('p', 'pt');
    var title, date, titleSize, subtitleSize, startY, nextX, nextY, interSectionSpacing, dateOptions;
    var specialElementHandlers = {
	'#editor': function(element, renderer){
		return true;
	}
    };
    date = new Date();
    dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    startY = 150;
    nextX = 36;
    titleSize = 20;
    subtitleSize = 11;
    defaultFontSize = 11;
    sectionHeadingSize = 14;
    interSectionSpacing = 32;

    doc.setFontSize(titleSize);
    centeredText(doc, startY, "Titulo del Problema");
    doc.setFontSize(subtitleSize);
    nextY = startY + 4*subtitleSize;
    centeredText(doc, nextY, "subtitulo");
    nextY += interSectionSpacing;

    //Actual content starts here:
    doc.setFontSize(sectionHeadingSize);					// Render section heading for statement section
    doc.text("Enunciado", nextX, nextY);
    nextY+=sectionHeadingSize/2;

    doc.fromHTML(document.getElementById('panel-enunciado-capturado').innerHTML, nextX, nextY, {
        'width': doc.internal.pageSize.width - 2 * nextX, 
        'elementHandlers': specialElementHandlers
    });
    nextY += 0.45 * statementHeight + interSectionSpacing;

    doc.setFontSize(sectionHeadingSize);
    nextY+=sectionHeadingSize/2;
    doc.text("Entradas y Salidas", nextX, nextY);
    nextY += sectionHeadingSize*2;

    var inputs, outputs;
    inputs = outputs = "";
    for(var i = 0; i< Object.keys(gInputHashmap).length; i++) {
        inputs+=gInputHashmap[i];
        if(i < Object.keys(gInputHashmap).length - 1){
            inputs+=",";
        }
    }
    for(var i = 0; i< Object.keys(gOutputHashmap).length; i++) {
        outputs+=gOutputHashmap[i]; 
        if(i < Object.keys(gOutputHashmap).length - 1){
            outputs+=",";
        }
    }
    
    doc.setFontSize(defaultFontSize);
    doc.setFontType("bold");
    var inY, outY;
    inY = nextY;
    doc.text("Entradas: ", nextX, nextY);
    nextY+=defaultFontSize*2;
    outY = nextY;
    doc.text("Salidas: ", nextX, nextY);
    doc.setFont("courier");
    doc.text(inputs, nextX + 100, inY);
    doc.text(outputs, nextX + 100, outY);

    //placeInSingleCellTable(doc, docHtml)
    doc.save('sample-file.pdf');
}

function setupEventListeners() {
    setupInputOutputControlListeners();
}

function updateInputStatus(elementid) {
    var idx = document.getElementById(elementid).getAttribute("idx");
    gInputHashmap[idx] = document.getElementById(elementid).value;
}

function updateOutputStatus(elementid) {
    var idx = document.getElementById(elementid).getAttribute("idx");
    gInputHashmap[idx] = document.getElementById(elementid).value;
}

function evaluateInputStatus(elementid) {
    var idx = document.getElementById(elementid).getAttribute("idx");
    gInputHashmap[idx] = document.getElementById(elementid).value;
    gDefinedInputCount = 0;
    gDuplicatedInputs = false; //Assume correct;
    for(var i = 0; i<=gDeclaredInputCount; i++){
        if(gInputHashmap[i]!="" && gInputHashmap[i]!=null){
            gDefinedInputCount+=1;
        }
        if(i!=idx){
            gDuplicatedInputs = gDuplicatedInputs || (gInputHashmap[i] == document.getElementById(elementid).value);
        }
    }
}

function evaluateOutputStatus(elementid) {
    var idx = document.getElementById(elementid).getAttribute("idx");
    gOutputHashmap[idx] = document.getElementById(elementid).value;
    gDefinedOutputCount = 0;
    gDuplicatedOutputs = false; //Assume correct;
    for(var i = 0; i<=gDeclaredOutputCount; i++){
        if(gOutputHashmap[i]!="" && gOutputHashmap[i]!=null){
            gDefinedOutputCount+=1;
        }
        if(i!=idx){
            gDuplicatedOutputs = gDuplicatedOutputs || (gOutputHashmap[i] == document.getElementById(elementid).value);
        }
    }
}

function evaluateInputOutputStatus() {
    for(var i = 0; i<gDeclaredInputCount; i++){
        evaluateInputStatus("input"+i);
    }
    for(var i = 0; i<gDeclaredOutputCount; i++){
        evaluateOutputStatus("output"+i);
    }
}

function addIndividualInputDataListener(ElementId) {
    document.getElementById(ElementId).addEventListener("blur", function (evt) {
        var elementid = evt.target.id;
        evaluateInputStatus(elementid);
    });
}

function addIndividualOutputDataListener(ElementId) {
    document.getElementById(ElementId).addEventListener("blur", function (evt) {
        var elementid = evt.target.id;
        evaluateOutputStatus(elementid);
    });
}
function toggleTruthValue(element) {
    var newValue;
    //alert("InnerHTML: " + element.innerHTML);
    if(element.innerHTML == '' || element.innerHTML == 'X') {
        element.innerHTML = newValue = "0";
    }else if(element.innerHTML == '0') {
        element.innerHTML = newValue = "1";
    }else if(element.innerHTML == '1') {
        element.innerHTML = newValue = "X";
    }
    truthTable[element.getAttribute("i")][element.getAttribute("j")] = newValue;
}

function tableCreate(){
    var body = document.getElementById("truthtable-panel");
    tbl  = document.createElement('table');
    tbl.id = "tablaVerdad";
    tbl.setAttribute("align", "center");
    
    //Initialize the structure that will hold data
    truthTable = new Array(gDeclaredInputCount);

    var header = tbl.insertRow();
    for(var i = 0; i < gDeclaredInputCount; i++){
            var td = header.insertCell();
            td.className = "tv-th";
            td.appendChild(document.createTextNode(gInputHashmap[i]));
    }
    for(var i = 0; i < gDeclaredOutputCount; i++){
            var td = header.insertCell();
            td.className = "tv-th";
            td.appendChild(document.createTextNode(gOutputHashmap[i]));
    }

    for(var i = 0; i < Math.pow(2,gDeclaredInputCount); i++){
        var tr = tbl.insertRow();
        truthTable[i] = new Array(gDeclaredInputCount + gDeclaredOutputCount);
        //These are input columns, must not be modifiable.
        for(var j = 0; j < gDeclaredInputCount; j++){
            var inputLogicalValue = ((1 == ( (i >> (gDeclaredInputCount - 1 - j)) & 1))? 1:0);
            var td = tr.insertCell();
            td.className = "tv-td-unmod";
            td.setAttribute("i", i);
            td.setAttribute("j", j);
            td.appendChild(document.createTextNode(inputLogicalValue));
            truthTable[i][j] = inputLogicalValue;
        }
        //These others are output columns. Must be modifiable.
        for(var j = 0; j < gDeclaredOutputCount; j++){
            var td = tr.insertCell();
            td.className = "tv-td";
            td.onclick = function(caller) {
                toggleTruthValue(caller.target);
            };
            td.appendChild(document.createTextNode(''));
            td.setAttribute("i", i);
            td.setAttribute("j", gDeclaredInputCount + j);
        }
    }
    body.appendChild(tbl);
}

function tableFillAllZeroes() {
    tableFillAll("0");
}

function tableFillAllOnes() {
    tableFillAll("1");
}

function tableFillAllIndeterminations() {
    tableFillAll("X");
}

function tableClearAll() {
    var elements = document.getElementsByClassName('tv-td');//This gets only modifieable table cells.
    for (var i = 0; i < elements.length; i++) {
        var item = elements[i];
        item.innerHTML = '';
    }

    for (var i = 0; i < truthTable.length; i++){
        for(var j = gDeclaredInputCount; j<gDeclaredInputCount+gDeclaredOutputCount; j++){
            truthTable[i][j] = "";
        }
    }
}

function tableFillAll(fillWith) {
    var elements = document.getElementsByClassName('tv-td');//This gets only modifieable table cells.
    for (var i = 0; i < elements.length; i++) {
        var item = elements[i];
        if(item.innerHTML == '') {
            item.innerHTML = fillWith;
        }
    }
    for (var i = 0; i < truthTable.length; i++){
        for(var j = gDeclaredInputCount; j<gDeclaredInputCount+gDeclaredOutputCount; j++){
            if(truthTable[i][j] == "" || typeof truthTable[i][j] == 'undefined') {
                truthTable[i][j] = fillWith;
            }
        }
    }
}

function setupInputOutputControlListeners() {
    var max_out_fields = 10; //maximum outputs to the system
    var max_in_fields = 4;   //maximum inputs to the system
    var in_wrapper = $(".input_fields_wrap");  //document.getElementById("add_input_wrapper");
    var out_wrapper = $(".input_fields_wrap"); //document.getElementById("add_output_wrapper");
    
    addIndividualInputDataListener("input0");
    addIndividualOutputDataListener("output0");

    //alert("ready");
    var inputs = 0; //initlal text box count
    $("#add_input").click(function(e){ //on add input button click
	//alert("clicked add in");
        e.preventDefault();
        if(inputs < max_in_fields-1){ //max input box allowed
            inputs++; //text box increment
            gDeclaredInputCount++;
            $("#add_input_wrap").append('<div><input type="text" class="form-control" name="mytext[]" idx='+inputs+' id="input'+inputs+'"/><a href="#" class="remove_input">Eliminar</a></div>');
            addIndividualInputDataListener('input'+inputs);
        }
    });

    var outputs = 0;
    $("#add_output").click(function(e){ //on add input button click
        //alert("clicked add out");
	e.preventDefault();
        if(outputs < max_out_fields-1){ //max input box allowed
            outputs++; //text box increment
            gDeclaredOutputCount++;
            $("#add_output_wrap").append('<div><input type="text" class="form-control" name="mytext[]" idx='+outputs+' id="output'+outputs+'"/><a href="#" class="remove_output">Eliminar</a></div>');
            addIndividualOutputDataListener('output'+outputs);
        }
    });

    
    $(out_wrapper).on("click",".remove_input", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); gInputHashmap[inputs]=null; inputs--; gDeclaredInputCount--;
    })

    $(in_wrapper).on("click",".remove_output", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); gOutputHashmap[outputs]=null; outputs--; gDeclaredOutputCount--; 
    })
}

function tokenizeAndDisplayNewFormula(expr, ins, out) {
//(~e2·~e3) ∨ (~e1·e2·e3) ∨ (~e0·e1·e2)

//1-  Expr -> 0
//2-  Expr -> 1
//3-  Expr -> (in-0 | ... | in-n)
//4-  Expr -> ~Expr
//5-  Expr -> ( Expr )
//6-  Expr -> Expr & Expr
//7-  Expr -> Expr | Expr
//function parse(expr, ins, out) {

    var ret = [];
    //Some preprocessing
    //First get rid of spaces and adapt symbols:
    expr = expr.replace(/\u2228/g, "|");//Logical disjunction
    expr = expr.replace(/\u00B7/g, "&");//Logical conjunction
    expr = expr.replace(/ /g, "" );     //Spaces    

    console.log("Sanitized expression: " + expr);

    //First build a regex that will accept input names only
    var inputRegexStr = "^(";
    for(var i = 0; i<ins.length; i++) {
        inputRegexStr += ins[i]
        if(i < ins.length-1){
            inputRegexStr+="|";
        }
    }    
    inputRegexStr += ")$";
    var inputRegex = new RegExp(inputRegexStr);
    console.log("var name regex: " + inputRegex);

    //Then work out how many parentheses are in each token if the expression is split in "|" and "&"
    var tokensAnd = expr.split("&"); var numParenthesesAnd = 0; var couldBeAndExpr = true;
    var tokensOr = expr.split("|"); var numParenthesesOr = 0; var couldBeOrExpr = true;

    console.log("Checking for and");
    if(tokensAnd.length <= 1) couldBeAndExpr = false;
    for (var i = 0; i<tokensAnd.length; i++) {
        var token = tokensAnd[i];
        console.log("token " + token + "has " + (token.match(/[(]/g) || []).length + "(s");
        console.log("token " + token + "has " + (token.match(/[)]/g) || []).length + ")s");
        if( (token.match(/[(]/g) || []).length != (token.match(/[)]/g) || []).length ) {
            couldBeAndExpr = false;
            break;
        }
    }

    if(tokensOr.length <= 1) couldBeOrExpr = false;
    for (var i = 0; i<tokensOr.length; i++) {
        var token = tokensOr[i];
        if( (token.match(/[(]/g) || []).length != (token.match(/[)]/g) || []).length ) {
            couldBeOrExpr = false;
            break;
        }
    }

    //Finally check if there is only one "(" and one ")"
    var isParenExpr = false;
    if((expr.match(/[(]/g) || []).length == 1 && (expr.match(/[)]/g) || []).length == 1) {
        isParenExpr = true;
    }

    if(isParenExpr) {
        console.log("expr -> ( expr )");
        ret = tokenizeAndDisplayNewFormula(expr.substring(1, expr.length-1), ins, out)
    }
    else if(couldBeAndExpr){
        console.log("expr -> expr & expr");
        var tokens = expr.split("&");
        ret[0] = "&";
        for(var i = 0; i<tokens.length; i++){
            ret[i+1] = tokenizeAndDisplayNewFormula(tokens[i], ins, out);
        }
    }
    else if(couldBeOrExpr){
        console.log("expr -> expr | expr");
        var tokens = expr.split("|");
        ret[0] = "|";
        for(var i = 0; i<tokens.length; i++){
            ret[i+1] = tokenizeAndDisplayNewFormula(tokens[i], ins, out);
        }
    }
    else if(expr.charAt(0) == "~"){
        console.log("expr -> ~Expr");
        ret = ["~", tokenizeAndDisplayNewFormula(expr.substring(1), ins, out)];
    }
    else if(expr.charAt(0) == "0") {
        console.log("Expr -> 0")
        ret = "0";
    }
    else if(inputRegex.test(expr)){
        console.log("expr -> (in-0 | ... | in-n)")
        ret = expr;
    }
    else if(expr.charAt(0) == "1") {
        console.log("Expr -> 1")
        ret = "1";
    }
    return ret;
}

