/*
function listAttributes(arr)
	Lists down attributes for the attributes property
*/
function listAttributes(arr) {
  let strOutput = "<DIV>";
  strOutput += "<UL>";
  for (let i = 0; i < arr.length; i++) {
    strOutput +=
      "<LI><SPAN class='propertyname'>" +
      arr[i].name +
      "</SPAN>: " +
      arr[i].value +
      "</LI>";
  }
  strOutput += "</UL></DIV>";
  return strOutput;
}

/*
function returnHTTPStatus(urlDict)
	Returns HTTP Status only for "Internal" links only
*/
function returnHTTPStatus(urlDict) {
	
	statusCodeDict = {'100':'Continue','101':'Switching Protocols','102':'Processing (WebDAV)','103':'Early Hints Experimental','200':'OK','201':'Created',
	'202':'Accepted','203':'Non-Authoritative Information','204':'No Content','205':'Reset Content','206':'Partial Content','207':'Multi-Status (WebDAV)',
	'208':'Already Reported (WebDAV)','226':'IM Used (HTTP Delta encoding)','300':'Multiple Choices','301':'Moved Permanently','302':'Found','303':'See Other',
	'304':'Not Modified','305':'Use Proxy Deprecated','306':'unused','307':'Temporary Redirect','308':'Permanent Redirect','400':'Bad Request','401':'Unauthorized',
	'402':'Payment Required Experimental','403':'Forbidden','404':'Not Found','405':'Method Not Allowed','406':'Not Acceptable','407':'Proxy Authentication Required',
	'408':'Request Timeout','409':'Conflict','410':'Gone','411':'Length Required','412':'Precondition Failed','413':'Payload Too Large','414':'URI Too Long',
	'415':'Unsupported Media Type','416':'Range Not Satisfiable','417':'Expectation Failed','421':'Misdirected Request','422':'Unprocessable Entity (WebDAV)',
	'423':'Locked (WebDAV)','424':'Failed Dependency (WebDAV)','425':'Too Early Experimental','426':'Upgrade Required','428':'Precondition Required',
	'429':'Too Many Requests','431':'Request Header Fields Too Large','451':'Unavailable For Legal Reasons','500':'Internal Server Error','501':'Not Implemented',
	'502':'Bad Gateway','503':'Service Unavailable','504':'Gateway Timeout','505':'HTTP Version Not Supported','506':'Variant Also Negotiates',
	'507':'Insufficient Storage (WebDAV)','508':'Loop Detected (WebDAV)','510':'Not Extended','511':'Network Authentication Required'};
	url = String(urlDict['internalLink']);
	linkText = String(urlDict['internalLinkText']);
    let xmlHttp = new XMLHttpRequest();
	let statusCode = 0;
    xmlHttp.open("HEAD", url, false);
	try { 
    	xmlHttp.send();
	} catch (e) {
		console.log("Error: "+e)
	}
    xmlHttp.onload = function () {
        statusCode = xmlHttp.status;
		statusText = statusCodeDict[String(statusCode)];
	}
    xmlHttp.onload();
	statusDesc = formatHTMLcellvalues(url) + (linkText? ' ('+linkText+')':'') + ' - HTTP Status: ' + (statusCode != 200 ? "<span style='color:red'>"+statusCode+"</span>":statusCode) + (statusText?': ':'') + statusText;
	return  {statusCode:statusCode,statusDesc:statusDesc}
	
}

/*
function checkInternalExternalLink(linkHost,pageHost)
	Returns "Internal" if linkHost == pageHost else returns "External"
*/
function checkInternalExternalLink(linkHost, pageHost) {
  let strOutput;
  if (linkHost == pageHost) {
    strOutput = "Internal";
  } else {
    strOutput = "External";
  }
  return strOutput;
}

/*
function isValidHttpUrl(strTest)
	Check if string strTest is a URL and if it is, return true otherwise, return false
*/
function isValidHttpUrl(strTest) {
  let url;

  try {
    url = new URL(strTest);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

/*
function formatHTMLcellvalues(strCellinput)
	Format HTML table cell values so that string strCellinput is empty string when value is null and string is trimmed
	Also, if strCellinput is valid URL, then <A> tag is appended
*/
function formatHTMLcellvalues(strCellinput) {
  let strOutput;
  if (isValidHttpUrl(strCellinput)) {
    strOutput =
      "<A HREF='" +
      strCellinput +
      "' target='_blank'>" +
      decodeURIComponent(strCellinput) +
      "</A>";
  } else if (typeof strCellinput === "object") {
    strOutput = listAttributes(strCellinput);
  } else {
    strOutput =
      strCellinput == null || String(strCellinput).trim().length == 0
        ? ""
        : String(strCellinput).trim();
  }
  return strOutput;
}

/*
function setTableStyle()
	Sets the HTML table using inline CSS
*/
function setTableStyle() {
  let strOutput = "<STYLE>";
  strOutput +=
    "table,th,td { border:1px solid #9E9E9E; border-collapse: collapse  }";
  strOutput += "th { background: #FFC107; }";
  strOutput += ".propertyname { font-weight:bold; font-color:blue; }";
  strOutput += "</STYLE>";
  return strOutput;
}

/*
function formatPageHeaders(strHeader)
	Sets and formats the HTML page headers like the <H1>, the page URL and the page title
*/
function formatPageHeaders(strHeader, strNotes = "") {
  let strOutput = "<H1>" + strHeader + "</H1>";
  strOutput += "<STRONG>Page URL: </STRONG>";
  strOutput +=
    "<A href='" +
    location.href +
    "' target='_blank'>" +
    location.href +
    "</A><BR>";
  strOutput += "<STRONG>Page Title: </STRONG>";
  strOutput += document.title + "<BR><BR>";
  strOutput +=
    strNotes != "" ? "<STRONG>NOTE: </STRONG>" + strNotes + "<BR><BR>" : "";
  return strOutput;
}

/*
function formatHTMLTableHeaders()
	Sets and formats the HTML table headers like the <TH>. Note that arguments is variable and 
	defines the table header titles to be used
*/
function formatHTMLTableHeaders() {
  let strOutput = "<TABLE>";
  strOutput += "<TR>";
  for (let i = 0; i < arguments.length; i++) {
    strOutput += "<TH>" + arguments[i] + "</TH>";
  }
  strOutput += "</TR>";
  return strOutput;
}

/*
function formatHTMLTableRows() 
	Sets and formats the HTML table row like the <TR> and <TD>. Note that arguments is variable and 
	defines the table cells to be used
*/
function formatHTMLTableRows() {
  let strOutput = "<TR>";
  for (let i = 0; i < arguments.length; i++) {
    strOutput += "<TD>" + formatHTMLcellvalues(arguments[i]) + "</TD>";
  }
  strOutput += "</TR>";
  return strOutput;
}

(function () {

  let pageH1 = "WLA Broken Links Checker v01"; // H1 Header
  let pageNotes =
    "Only internal links have HTTP Status. It's not possible to obtain" +
    " HTTP status for external links. Please double-check broken links " + 
    "or 4XX status by testing URL of specified link in browser "; // Important notes to display
  const objCollection = document.links; // define the DOM object as HTML Collections
  let pageHost = location.host; // define the host of the page
  let strHTMLlines = ""; // define the HTML line string
  strHTMLlines += setTableStyle();
  strHTMLlines += formatPageHeaders(pageH1, pageNotes);
  strHTMLlines += formatHTMLTableHeaders(
    "No",
    "Link URL",
    "Link Text",
    "Internal or External",
    "Link Attributes"
  );
  listofInternalLinks = [];
  for (let i = 0; i < objCollection.length; i++) {
    let objItem = objCollection[i]; // get the object HTML collection item
    let objInternalExternalLink = checkInternalExternalLink(
      objItem["host"],
      pageHost
    );
    strHTMLlines += formatHTMLTableRows(
      i + 1,
      objItem["href"],
      objItem["innerText"],
      objInternalExternalLink,
      objItem["attributes"]
    );
	if (objInternalExternalLink == "Internal") {
		// stores the internal link both the URL as well as the link text as dictionary and push it to list listofInternalLinks
		listofInternalLinks.push({internalLink:objItem["href"],
								  internalLinkText:objItem["innerText"]})
	};
  }
  strHTMLlines += "</TABLE>";
  
  numBrokenLinks = 0;
  numLinks = 0;
  strHTMLlines += "<BR><BR>Internal Links and corresponding HTTP Status<BR>";
  strHTMLlines += "<OL>";
  listofInternalLinks.sort();
  for (let i = 0; i < listofInternalLinks.length; i++) {
	  let internalLinks = listofInternalLinks[i]; // get the object HTML collection item
	  statusDesc = returnHTTPStatus(internalLinks)['statusDesc']
	  statusCode = returnHTTPStatus(internalLinks)['statusCode']
	  strHTMLlines += "<LI>"+ statusDesc + "</LI>";
	  if (statusCode != 200) {
	  	  numBrokenLinks += 1;
	  }
	  numLinks += 1;
  }
  strHTMLlines += "</OL>";
  strHTMLlines += "<BR>The number of broken links (internal) is " + numBrokenLinks + " out of " + numLinks + " internal links."
  strHTMLlines +=
    "<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";

  // Open a new tab or window in browser and display the concatenated strings strHTMLlines
  let myWin = window.open();
  myWin.document.writeln(strHTMLlines);
  myWin.document.close();
})();
