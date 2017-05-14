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
	"tabStart", "tabStatement", "tabTable", "tabVK", "tabCircuit","btnNextToStatement",
	"btnNextToTable", "btnNextToVK", "btnNextToCircuit", "btnRestart", "btnPrint", 
	"hdgStart", "hdgStatement", "hdgTable", "hdgVK" , "hdgCircuit",

];

function localizeAll() {
    var lang = "es";
    if (lang != "") String.locale = lang;
    
    for(var i = 0; i<internationalizableTags.length; i++) {
        console.log("Internationalizing tag " + internationalizableTags[i]);
	localizeHTMLTag(internationalizableTags[i]);
    }

}


/* Some helper functions: */

var _ = function (string) {
	return string.toLocaleString();
};

function localizeHTMLTag(tagId)
{
	tag = document.getElementById(tagId);
	tag.innerHTML = _(tag.innerHTML);
}
