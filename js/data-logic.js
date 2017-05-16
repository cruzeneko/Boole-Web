var gKarnaughMapObjects = [];
var gBooleanExpressionStrings = [];

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
    var kMapSlider = document.getElementById("vkSlider");
    var j = 0;
    $('#panel-vks').carousel({
        interval: false
    });

    for(var i = gDefinedOutputCount - 1; i >=0 ; i--) {
        //createAndPopulateSingleKMap(kMapSlider, gOutputHashmap[i]);
	var newDiv = document.createElement('div');
	var newP = document.createElement('p');
	newP.innerHTML+=gOutputHashmap[i];
	newDiv.appendChild(newP);
        newDiv.setAttribute("id", "vkdiv"+i);
	newDiv.className += "item";
	if(i == 0){
	    newDiv.className += " active";
	}
	newDiv.style.marginLeft = newDiv.style.marginRight = "50px";

	kMapSlider.appendChild(newDiv);
        createAndPopulateSingleKMap(document.getElementById("vkdiv"+i), gOutputHashmap[i], i);
    }
    $("#panel-vks").carousel("pause").removeData();
    $("#panel-vks").carousel(0);
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
        startY: nextY,
        pageBreak: 'auto',
        theme: 'stripped',
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
    var title, date, titleSize, subtitleSize, startY, nextX, nextY, interSectionSpacing, dateOptions, pageWidth;
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
    pageWidth = Math.floor(doc.internal.pageSize.width)
    doc.setFontSize(titleSize);
    centeredText(doc, startY, gSystemTitle);
    doc.setFontSize(subtitleSize);
    nextY = startY + 4*subtitleSize;
    centeredText(doc, nextY, "subtitulo");
    nextY += interSectionSpacing;

    //Actual content starts here:
    doc.setFontSize(sectionHeadingSize);					// Render section heading for statement section
    doc.text(_("Statement"), nextX, nextY);
    nextY+=sectionHeadingSize/2;

    doc.fromHTML(document.getElementById('panel-enunciado-capturado').innerHTML, nextX, nextY, {
        'width': doc.internal.pageSize.width - 2 * nextX, 
        'elementHandlers': specialElementHandlers
    });
    nextY += 0.75 * statementHeight + interSectionSpacing;

    //Check if nextY is about to overflow page boundaries and create a new page if so.
    if( nextY + 75 > doc.internal.pageSize.height) {
        doc.addPage();
        nextY = startY;
    }

    doc.setFontSize(sectionHeadingSize);
    nextY+=sectionHeadingSize/2;
    doc.text(_("Entradas y Salidas"), nextX, nextY);
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
    doc.text(_("Inputs:"), nextX, nextY);
    nextY+=defaultFontSize*2;
    outY = nextY;
    doc.text(_("Outputs:"), nextX, nextY);
    doc.setFont("courier");
    doc.text(inputs, nextX + 100, inY);
    doc.text(outputs, nextX + 100, outY);
    nextY+=defaultFontSize*2;

    //Produce an autotable table from the fake table
    var truthtable = document.getElementById("tablaVerdad");
    var res = doc.autoTableHtmlToJson(truthtable);

    nextY += interSectionSpacing;

    doc.setFontSize(sectionHeadingSize);
    doc.setFont("helvetica");
    doc.setFontType("normal");
    nextY+=sectionHeadingSize/2;
    doc.text(_("Truth Table"), nextX, nextY);
    nextY += sectionHeadingSize*2;

    //Render the autotable and place it in the document, with
    doc.autoTable(res.columns, res.rows,
    {
       startY: nextY,
       margin: {left: 36+(pageWidth-truthTableWidth)/2, right: 36+(pageWidth-truthTableWidth)/2},
       pageBreak: 'auto',
       theme: 'striped',
       headerStyles: {
           fontStyle: 'normal',
           lineWidth: 1,
           lineColor: [0, 0, 0],
           halign: 'center'
       },
       bodyStyles: {
          lineWidth: 1,
          lineColor: [0,0,0],
          halign: 'center'
      },
      drawCell: function(cell, data) {
          var rows = data.table.rows;
          if (data.column.index < gDeclaredInputCount) {
              doc.setFillColor(180, 210, 255);
          }
      }
    });

    nextY = doc.autoTableEndPosY() + interSectionSpacing;
    //Check if nextY is about to overflow page boundaries and create a new page if so.
    if( nextY + 75 > doc.internal.pageSize.height) {
        doc.addPage();
        nextY = startY;
    }


    nextY+=sectionHeadingSize/2;
    doc.text(_("Karnaugh Maps"), nextX, nextY);
    nextY = renderVKDiagramsInGrid(doc, 0, nextY) + interSectionSpacing;

    doc.text(_("Circuit"), nextX, nextY);
    nextY+=sectionHeadingSize/2;
    nextY = renderCircuitDiagramsInGrid(doc, 0, nextY);

    doc.save('sample-file.pdf');
}

function renderSingleSvgElement(doc, startX, startY, sizeX, sizeY, svgElement) {
    svgElementClone = svgElement.cloneNode(true)
    svgElementClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var fakeDiv =  document.createElement("div");
    fakeDiv.appendChild(svgElementClone);      
    
    var svg = fakeDiv.innerHTML;

    if (svg){
        svg = svg.replace(/\r?\n|\r/g, '').trim();
    }

    var canvas = document.createElement('canvas');
    canvas.setAttribute("width", sizeX);
    canvas.setAttribute("height", sizeY);
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    canvg(canvas, svg);

    var imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', startX, startY, sizeX, sizeY);
    console.log("Drawing an element at ("+startX+","+startY+")");

}

function renderVKDiagramsInGrid(doc, startX, startY) {
    var nextX = startX;
    var nextY = startY;
    var offsetX = 0;
    var offsetY = 0;
    var pageHeight = Math.floor(doc.internal.pageSize.height);
    var pageWidth = Math.floor(doc.internal.pageSize.width);
    
    //One can safely assume that all VK elements are the same height/width, since they have the same inputs/outputs.
    //Therefore, use the first to calculate margins and related dimensions.

    var firstSvgContainer = document.getElementById("vk-" + gOutputHashmap[0] + "-div");
    var firstVKSvg = firstSvgContainer.firstChild;
    var firstVKSvgHeight = Math.floor(firstVKSvg.getAttribute("height"))*0.75;
    var firstVKSvgWidth = Math.floor(firstVKSvg.getAttribute("width"))*0.75; 

    //Assuming two VK diagrams per row (two columns), calculate margins.
    //First calculate total margin (both sides plus centre) and divide it between sides and
    //centre (70% both sides + 30% centre)
    var totalMarginTmp = pageWidth - 2*firstVKSvgWidth;
    var margin = (totalMarginTmp*0.70)/2;
    var centerMargin  = (totalMarginTmp*0.30);

    for( var i = 0; i < Math.ceil(gDeclaredOutputCount/2); i++) {
        //Check if we're about to overflow the page vertically. If so, we add a new page.
        if(nextY + firstVKSvgHeight > pageHeight) {
            nextY = 36;
            doc.addPage();
        }
        
        offsetX = margin;
        for(var j = 0 ; j < 2 ; j++){
            var currentSvgContainer = document.getElementById("vk-" + gOutputHashmap[2*i + j] + "-div");
            if(currentSvgContainer != null){
                renderSingleSvgElement(doc, nextX + offsetX , nextY , firstVKSvgWidth, firstVKSvgHeight, currentSvgContainer.firstChild);
            }
            offsetX += firstVKSvgWidth + centerMargin;
        }
        nextY += firstVKSvgHeight;
    }
    return nextY;
}

function renderCircuitDiagramsInGrid(doc, startX, startY) {
    var nextX = startX;
    var nextY = startY;
    var offsetX = 0;
    var offsetY = 0;
    var pageHeight = Math.floor(doc.internal.pageSize.height);
    var pageWidth = Math.floor(doc.internal.pageSize.width);

    var svgElements = document.getElementById("holaz").childNodes;
    //One cannot assume that all diagrams are the same dimensions, therefore, one must calculate margins for
    //each circuit diagram pair.

    for(var i = 0; i<Math.ceil(gDeclaredOutputCount/2); i++) {

        var thisHeight, nextHeight, thisWidth, nextWidth;
        var margin, centerSpace;
        thisHeight = nextHeight = thisWidth = nextWidth = 0;

        var thisSvg = svgElements[2*i  +1];
        var nextSvg = svgElements[2*i+1+2];

        var thereIsAPair = nextSvg != null;

        var thisHeight = Math.floor(thisSvg.getAttribute("height"))*0.75;
        var thisWidth = Math.floor(thisSvg.getAttribute("width"))*0.75;

        if(thereIsAPair) {
            var nextHeight = Math.floor(nextSvg.getAttribute("height"))*0.75;      
            var nextWidth = Math.floor(nextSvg.getAttribute("width"))*0.75;
        }
      
        //Check if this pair will overflow the page. If so, get a new page and start drawing there
        var maxHeight = Math.max(thisHeight, nextHeight);
        if(nextY + maxHeight > pageHeight) {
            doc.addPage();
            nextY = 36;
        }

        //Calculate margin for this circuit pair: If there are two circuits to render remaining, then
        //margin will be 70% of the total space not taken by circuits divided by two. The centre space will
        //be the remaining 30%.

        var totalSpaceTmp = pageWidth - (thisWidth+nextWidth);        
        if(thereIsAPair) {
            margin = (totalSpaceTmp*0.70)/2;
            centerSpace = totalSpaceTmp*0.30;
        }
        else {
            margin = totalSpaceTmp/2;
            centerSpace = 0;
        }
        renderSingleSvgElement(doc, nextX+margin, nextY, thisWidth, thisHeight, thisSvg);
        
        if(thereIsAPair) {
            renderSingleSvgElement(doc, nextX+margin+thisWidth+centerSpace, nextY, nextWidth, nextHeight, nextSvg);        
        }

        nextY += Math.max(thisHeight, nextHeight);
    }
    return nextY;
} 

function isInput(string) {
    for(var i = 0; i<Object.keys(gInputHashmap).length; i++) {
        if(string === gInputHashmap[i]){
            return true;
        }
    }
    return false;
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

function clearAllFormulae( ) {
    $("#formulaeContainer").empty();
}

function addSOPToPage(sop) {
    var targetDiv = document.getElementById("formulaeContainer");
    var formulaDiv = document.createElement('div');
    //formulaDiv.className = "text-center"
    formulaDiv.innerHTML = sop;
    targetDiv.appendChild(formulaDiv);

    //Instruct MathJax to typeset the whole page
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function reEvaluateSumOfProductsFormulae(truthTable) {
    //Begin by clearing all (possibly outdated) formulae
    clearAllFormulae();    

    //We'll need to produce one sum of products per declared output
    for( var i = 0; i < gDeclaredOutputCount; i++ ) {
        //Start by checking that each output column of the truth table is defined.
	//as a sum of minterms cannot be produced if an output is undefined for a
	//particular configuration

        var thisSOPIsDefined = true;
        for(var j = 0 ; j < truthTable.length; j++) {
	    if(typeof truthTable[j][gDeclaredInputCount + i] == "undefined" ) {
                thisSOPIsDefined = false;
                break;
            }
        }

	//If we cannot calculate this sum of minterms, then proceed to the next one
        if(!thisSOPIsDefined) continue;

        sumOfMinterms = "";
	sumOfMinterms += ("$" + gOutputHashmap[i] + " = ");
        for(var j = 0; j < truthTable.length; j++) {
        if(truthTable[j][gDeclaredInputCount+i] == "1"){    
                var thisMinterm = "";
                for (var k = gDeclaredInputCount-1 ; k >= 0 ; k--) {
                    var thisVar = gInputHashmap[gDeclaredInputCount-1-k];
                        if( ( ( 1 << k ) & j ) != 0 ) {
                            //Conjunctive clause not inverted
                            thisMinterm+=thisVar;
                        }
                        else {
                            //Conjunctive clause is inverted
                            thisMinterm+=("\\overline{"+thisVar+"}");
                        }
                }
                sumOfMinterms += thisMinterm;
                if( j < truthTable.length-1){
                   sumOfMinterms += "+";
                }
            }
        }
        if(sumOfMinterms.charAt(sumOfMinterms.length - 1) == "+"){
        sumOfMinterms = sumOfMinterms.substring(0, sumOfMinterms.length - 1);
        }
        sumOfMinterms += "$";
        console.log("One of the sums of minterms is " + sumOfMinterms);        
        addSOPToPage(sumOfMinterms)
    }
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

    reEvaluateSumOfProductsFormulae(truthTable);
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
        //e.preventDefault();
        if(inputs < max_in_fields-1){ //max input box allowed
            inputs++; //text box increment
            gDeclaredInputCount++;
            $("#add_input_wrap").append('<div><input type="text" class="form-control" name="mytext[]" idx='+inputs+' id="input'+inputs+'"/><a href="#" id="inDelete'+inputs +'" class="remove_input">Eliminar</a></div>');
            localizeHTMLTag("inDelete"+inputs);
	    addIndividualInputDataListener('input'+inputs);
        }
    });

    var outputs = 0;
    $("#add_output").click(function(e){ //on add input button click
        //alert("clicked add out");
	//e.preventDefault();
        if(outputs < max_out_fields-1){ //max input box allowed
            outputs++; //text box increment
            gDeclaredOutputCount++;
            $("#add_output_wrap").append('<div><input type="text" class="form-control" name="mytext[]" idx='+outputs+' id="output'+outputs+'"/><a href="#" id="outDelete'+outputs +'" class="remove_output">Delete</a></div>');
            localizeHTMLTag("outDelete"+outputs);
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

function getAssociatedPortByCorrespondence( port, correspondence) {
    if (typeof correspondence == undefined) return port;
    else return correspondence[port];
}

// Generates the VHDL program text for an expression expressed in prefix notation
// using JS objects.
//
// Takes the expression itself, the set of ports that will appear on the VHDL program
// and an optional correspondence from the ports in the expression to the ports that
// will appear in the program.

function generateVHDLProgramForExpressions(expr, portCorrespondence, entityName, inoutports, inports, outports){
    var ret = "";

    if(typeof inoutports == "undefined" && 
       (typeof inports == "undefined" ) || (typeof outports == "undefined")){
       throw "VHDL generation error: Ports misdefined.";
    }    

    ret +=               "library IEEE;\n";
    ret +=               "use IEEE.STD_LOGIC_1164.ALL;\n";
    ret +=               "use IEEE.STD_LOGIC_ARITH.ALL;\n";
    ret +=               "use IEEE.STD_LOGIC_UNSIGNED.ALL;\n";
    
    ret +=               "\n";
    ret +=               "\n";
    ret +=               "entity " + entityName + " is\n";
    ret +=               "\t";
    ret +=                   "Port (\n";
    
    if(typeof inports != "undefined")
    for(var i=0;i<inports.length;i++){
        ret+=            "\t\t";
        ret+=                    inports[i]+" : in std_logic;\n";
    }

    if(typeof inoutports != "undefined")
    for(var i=0;i<inoutports.length;i++){
        ret+=            "\t\t";
        ret+=                    inoutports[i]+" : inout std_logic;\n";
    } 

    if(typeof outports != "undefined")
    for(var i=0;i<outports.length;i++){
        ret+=            "\t\t";
        ret+=                    outports[i]+" : in std_logic;\n";
    }

    ret +=               "\t\t";
    ret +=                       ");\n";
    ret +=               "end "+ entityName + ";\n";                         
    ret +=               "\n\n";

    ret +=               "architecture behavioral of " + entityName + " is\n";
    ret +=               "\t";
    ret +=                   "begin\n";

    for(var i=0; i<gBooleanExpressionStrings.length;i++){
        var expr = gBooleanExpressionStrings[i];
        ret +=            "\t\t";
        ret +=            outports[i] + "<=" + parseFormulaToVHDLNotations(expr, inports , gOutputHashmap[i]);
        ret +=            "\n";
    }

    ret += "end behavioral;"
    return ret;
}

function downloadUnlinkedVHDL(){
    alert("Called!");
    var inPorts = [];
    var outPorts = [];

    for(var i=0; i<Object.keys(gInputHashmap).length; i++){
        inPorts[i] = gInputHashmap[i];
    }
    for(var i=0; i<Object.keys(gOutputHashmap).length; i++){
        outPorts[i] = gOutputHashmap[i];
    }
    debugger;
    generateVHDLProgramForExpressions(gBooleanExpressionStrings, 
    				      undefined,
                                      "HolaHolita",
                                      undefined,
                                      inPorts,
                                      outPorts
                                      );
}

function downloadLinkedVHDL(){

}

function openExternalServiceIfAvailable(){
    
}


function parseFormulaToPrefixNotation(expr, ins , outs ) {
    var prefixInnerParser = new ExprPrefixParser();
    var prefixParser = new ExprGenericParser(prefixInnerParser);
    prefixInnerParser.init(prefixParser);

    return prefixParser.nextRecursionLevel(expr, ins, outs);
}

function parseFormulaToVHDLNotations(expr, ins, outs) {
    var VHDLInnerParser = new ExprVHDLParser();
    var VHDLParser = new ExprGenericParser(VHDLInnerParser);
    VHDLInnerParser.init(VHDLParser);

    return VHDLParser.nextRecursionLevel(expr, ins, outs);

}
