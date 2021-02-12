/*
function returnHTTPStatus(url,strInternalExternal)
	Returns HTTP Status and Status text only for "Internal" links only
	Note that returnHTTPStatus(url,strInternalExternal)[0] returns status code
	Note that returnHTTPStatus(url,strInternalExternal)[1] returns status text
*/
function returnHTTPStatus(url, strInternalExternal) {
  let xmlHttp = new XMLHttpRequest();
  let statusCode = "", statusText = "";
  xmlHttp.open("HEAD", url, false);
  if (strInternalExternal == "Internal") {
    try {
      xmlHttp.send();
    } catch (e) {
      console.log("Error: " + e);
    }
    xmlHttp.onload = function() {
      statusText = xmlHttp.statusText;
      statusCode = xmlHttp.status;
    }
    xmlHttp.onload();
  } else {
    statusText = "External link status unknown";
    statusCode = "";
  }
  return [statusCode, statusText];
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
      "<A HREF='" + strCellinput + "' target='_blank'>" + decodeURIComponent(strCellinput) + "</A>";
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
  strOutput += "</STYLE>";
  return strOutput;
}

/*
function formatPageHeaders(strHeader)
	Sets and formats the HTML page headers like the <H1>, the page URL and the page title
*/
function formatPageHeaders(strHeader,strNotes = "") {
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
  strOutput += strNotes != "" ? "<STRONG>NOTE: </STRONG>" + strNotes + "<BR><BR>" : ""; 
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

const pageH1 = "WLA Links Checker v01";                       // H1 Header
const pageNotes = "Only internal links have HTTP Status. It's not possible to obtain" +
                  " HTTP status for external links";          // Important notes to display
var objCollection = document.links; // define the DOM object as HTML Collections
var pageHost = location.host;       // define the host of the page
var strHTMLlines = "";              // define the HTML line string
strHTMLlines += setTableStyle();
strHTMLlines += formatPageHeaders(pageH1,pageNotes);
strHTMLlines += formatHTMLTableHeaders(
  "No",
  "Link URL",
  "Link Text",
  "Link Protocol",
  "Internal/External",
  "Status Code",
  "Status Text"
);
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
    objItem["protocol"].replace(":", ""),
	objInternalExternalLink,
	returnHTTPStatus(objItem["href"],objInternalExternalLink)[0],
	returnHTTPStatus(objItem["href"],objInternalExternalLink)[1]
  );
}
strHTMLlines += "</TABLE>";
strHTMLlines += "<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";

// Open a new tab or window in browser and display the concatenated strings strHTMLlines
var myWin = window.open();
myWin.document.writeln(strHTMLlines);
myWin.document.close();
