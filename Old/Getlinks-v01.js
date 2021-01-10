function isValidHttpUrl(strTest) {
  let url;
  
  try {
    url = new URL(strTest);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function formatHTMLcellvalues(strCellinput) {
	let strOutput;
	if (isValidHttpUrl(strCellinput)) {
		strOutput = "<A HREF='" + strCellinput + "' target='_blank'>" + strCellinput + "</A>";
	} else {
		strOutput = strCellinput == null || String(strCellinput).trim().length == 0 ? '' : String(strCellinput).trim();
	}
	return strOutput;
}

function setTableStyle() {
	let strOutput = "<STYLE>";
	strOutput += "table,th,td { border:1px solid #9E9E9E; border-collapse: collapse  }";
	strOutput += "th { background: #FFC107; }";
	strOutput += "</STYLE>";
	return strOutput;
}

function formatPageHeaders(strHeader) {
	let strOutput = "<H1>" + strHeader + "</H1>";
	strOutput += "<STRONG>Page URL: </STRONG>";
	strOutput += "<A href='" + location.href + "' target='_blank'>" + location.href + "</A><BR>";
    strOutput += "<STRONG>Page Title: </STRONG>";
	strOutput += document.title + "<BR><BR>";
	return strOutput;
}

function formatHTMLTableHeaders() {
	let strOutput = "<TABLE>";
	strOutput += "<TR>"
	for (let i = 0; i < arguments.length; i++) {
	    strOutput += "<TH>" + arguments[i] + "</TH>";
	}
	strOutput += "</TR>";
	return strOutput;
}

function formatHTMLTableRows() {
	let strOutput = "<TR>";
	for (let i = 0; i < arguments.length; i++) {
	    strOutput += "<TD>" + formatHTMLcellvalues(arguments[i]) + "</TD>";
	}
	strOutput += "</TR>";
	return strOutput;
}

let objCollection = document.links;
var strHTMLlines = "";
strHTMLlines += setTableStyle();
strHTMLlines += formatPageHeaders("WLA Link Checker v03");
strHTMLlines += formatHTMLTableHeaders("No","Link URL","Link Text"); 
for (let i=0;i < objCollection.length;i++) {
	let objItem = objCollection[i];
	strHTMLlines += formatHTMLTableRows(i+1,objItem["href"],objItem["innerText"])
}
strHTMLlines += "</TABLE>"

var myWin = window.open();
myWin.document.writeln(strHTMLlines);
myWin.document.close();
