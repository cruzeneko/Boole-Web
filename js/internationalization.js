function loaded()
{
        alert("called!");
	var lang = "es";
	if (lang != "") String.locale = lang;

	alert(_("Localizing the document title..."));
	document.title = _(document.title);

	alert(_("Localizing other HTML tags..."));
	localizeHTMLTag("headertext");
	localizeHTMLTag("subtitletext");
	localizeHTMLTag("showinenglish");
	localizeHTMLTag("showingerman");

	alert(_("Localizing done!"));
}

var internationalizableTags = 
[
	"tabStart", "tabStatement", "tabTable", "tabVK", "tabCircuit",
	/*"btnNextToStatement", "btnNextToTable", "btnNextToVK",*/ 
	/*"btnNextToCircuit",*/ "btnRestart", "btnPrintAll", "hdgStart", 
	"hdgStatement", "hdgTable", "hdgVK" , "hdgCircuit", "add_input",
	"add_output", "btnFill0", "btnFill1", "btnFillX", "btnClear",
	"subHdgStatement", "subHdgTable", "subHdgVK", "hdgInputCol", 
	"hdgOutputCol", "btnExternalSvc", "hdgCircuit", "subHdgCircuit",
	"titlePrompt"
];

function localizeAll() {
    var lang = "es";
    if (lang != "") String.locale = lang;
    
    for(var i = 0; i<internationalizableTags.length; i++) {
	localizeHTMLTag(internationalizableTags[i]);
    }

}


/* Some helper functions: */

var _ = function (string) {
	return string.toLocaleString();
};

function localizeHTMLTag(tagId)
{
	console.log("Internationalizing tag " + tagId);
	tag = document.getElementById(tagId);
	tag.innerHTML = _(tag.innerHTML);
}
