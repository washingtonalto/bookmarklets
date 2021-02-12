/*
function returnHTTPStatus(url)
	Returns HTTP Status and Status text only 
*/
function returnHTTPAllResponseHeaders(url) {
  let strOutput;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("HEAD", url, false);
  try {
    xmlHttp.send();
  } catch (e) {
    console.log("Error: " + e);
  }
  xmlHttp.onload = function () {
    strOutput = xmlHttp.getAllResponseHeaders();
  };
  xmlHttp.onload();
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
  strOutput += document.title + "<BR>";
  strOutput += "<STRONG>Page Title Length: </STRONG>";
  strOutput += document.title.trim().length + "<BR><BR>";
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

/*
function getallH1toH6()
  Get concatenates all converted H1 to H6 HTML Collections into one array for easier processing
*/
function getallH1toH6() {
  let arrallH = new Array();
  let arrH1 = Array.from(document.getElementsByTagName("H1"));
  let arrH2 = Array.from(document.getElementsByTagName("H2"));
  let arrH3 = Array.from(document.getElementsByTagName("H3"));
  let arrH4 = Array.from(document.getElementsByTagName("H4"));
  let arrH5 = Array.from(document.getElementsByTagName("H5"));
  let arrH6 = Array.from(document.getElementsByTagName("H6"));
  arrallH = arrH1
    .concat(arrH2)
    .concat(arrH3)
    .concat(arrH4)
    .concat(arrH5)
    .concat(arrH6);
  return arrallH;
}

(function () {
  let pageH1 = "WLA Basic Page Info Checker v01"; // H1 Header
  let pageNotes = ""; // Important notes to display
  let objCollection = ""; // define the DOM object as HTML Collections
  let pageHost = location.host; // define the host of the page
  let strHTMLlines = ""; // define the HTML line string
  strHTMLlines += setTableStyle();
  strHTMLlines += formatPageHeaders(pageH1, pageNotes);

  // ----- H1 to H6 Tag Information -----
  objCollection = getallH1toH6();
  strHTMLlines += "<H1>H1 to H6 Tag</H1>";
  strHTMLlines += formatHTMLTableHeaders(
    "No",
    "H1 to H6 Tag",
    "H1 to H6 Tag Text",
    "H1 to H6 Tag Text Length"
  );
  for (let i = 0; i < objCollection.length; i++) {
    let objItem = objCollection[i]; // get the object HTML collection item
    strHTMLlines += formatHTMLTableRows(
      i + 1,
      objItem["tagName"],
      objItem["innerText"].trim(),
      objItem["innerText"].trim().length
    );
  }
  strHTMLlines += "</TABLE>";

  // ----- Meta Tag Information -----
  objCollection = document.querySelectorAll("meta[name]");
  strHTMLlines += "<H1>Meta Name Tag</H1>";
  strHTMLlines += formatHTMLTableHeaders(
    "No",
    "Name",
    "Content",
    "Content Length"
  );
  for (let i = 0; i < objCollection.length; i++) {
    let objItem = objCollection[i]; // get the object HTML collection item
    if (
      objItem &&
      objItem.attributes.name != undefined &&
      objItem.attributes.content != undefined
    ) {
      strHTMLlines += formatHTMLTableRows(
        i + 1,
        objItem.attributes["name"].value,
        objItem.attributes["content"].value,
        String(objItem.attributes["content"].value).trim().length
      );
    }
  }
  strHTMLlines += "</TABLE>";

  // ----- HTTP Request Response Information -----
  let responsetext = returnHTTPAllResponseHeaders(location.href);
  objCollection = responsetext.split("\n");
  objCollection.pop(); // removes last line which is always a blank because of the split function
  strHTMLlines += "<H1>HTTP Response Headers Information</H1>";
  strHTMLlines += formatHTMLTableHeaders("No", "Item-Pair");
  for (let i = 0; i < objCollection.length; i++) {
    let objItem = objCollection[i]; // get the object HTML collection item
    strHTMLlines += formatHTMLTableRows(i + 1, objItem);
  }
  strHTMLlines += "</TABLE>";

  strHTMLlines +=
    "<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";

  // Open a new tab or window in browser and display the concatenated strings strHTMLlines
  let myWin = window.open();
  myWin.document.writeln(strHTMLlines);
  myWin.document.close();
})();
