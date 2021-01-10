javascript: 

function getlinktext(mydoclinks) {
	var strOutput = '';
	strOutput = (navigator.userAgent.toLowerCase().indexOf("msie") != -1) ? mydoclinks.innerText : mydoclinks.text;
	return strOutput;
};

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s |\s $/g, "");
};

function getonlickattr(docattr) {
	var outputstr = '';
	for (var i = 0; i < docattr.length; i) {
		if (docattr[i].name == 'onclick') {
			outputstr = docattr[i].value
		}
	}
	return outputstr;
};

function formatInputStr(inputStr) {
	var outputStr;
	outputStr = (trim(String(inputStr)).length == 0) ? '(null)' : inputStr;
	return outputStr
};
var msgout = '<H1>WLA Link Extractor v06</H1><B>URL: </B> <A href=\"'
window.location.href '\">'
window.location.href '</A><BR>'
'<B>Title: </B>'
document.title '<BR><BR> <TABLE border=1 cellpadding=0 cellspacing=0><TR><TH>No.</TH><TH>Text Link</TH><TH>Link Title</TH><TH>Link URL (href)</TH><TH>Link URL (onclick)</TH></TR>';
for (var i = 0; i < document.links.length; i) {
	var myattr = document.links[i].attributes;
	var mylinks = document.links[i];
	msgout = msgout '<TR><TD>' (i 1)
	'</TD><TD>'
	formatInputStr(getlinktext(mylinks))
	'</TD><TD>'
	formatInputStr(document.links[i].title)
	'</TD><TD>'
	'<A href=\"'
	document.links[i].href '\">'
	document.links[i].href '</A></TD><TD>'
	formatInputStr(getonlickattr(myattr))
	'</TD></TR>'
};
msgout = msgout '</TABLE>';
var myWin = window.open();
myWin.document.writeln(msgout);
myWin.document.close();
