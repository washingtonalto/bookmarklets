/*
function listQueryParameters(urlString)
	Lists down all the query parameters for the URLString
*/
function listQueryParameters(urlString) {

  function queryparamToObject( prmstr ) {
    var params = {};
    if (!prmstr) {
      return params;
    }
    let prmarr = prmstr.indexOf('&') ? prmstr.split('&') : prmstr;
    for ( let i = 0; i < prmarr.length; i++) {
        let tmparr = prmarr[i].split('=');
        params[tmparr[0]] = tmparr[1];
    }
    return params;
  }
  
  queryObj = urlString.indexOf('?') ? queryparamToObject(urlString.split('?')[1]) : {};
  let strOutput = "";
  if (Object.keys(queryObj).length === 0) {
    strOutput += "";
  } else {  
    strOutput = "<DIV>";
    strOutput = "<BR><BR><SPAN class='propertyname'>Query Parameters:</SPAN>";
    strOutput += "<UL>";
    for (const item in queryObj) {
      strOutput +=
        "<LI><SPAN class='propertyname'>" +
        item +
        "</SPAN>: " +
        decodeURIComponent(queryObj[item]) +
        "</LI>";
    }
    strOutput += "</UL></DIV>";
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
  let tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };

  function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
  }

  // function to convert strings with HTML code to HTML entities character so they can be displayed in outerHTML
  // code is from https://stackoverflow.com/questions/5499078/fastest-method-to-escape-html-tags-as-html-entities 
  function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
  }

  let strOutput;
  if (isValidHttpUrl(strCellinput)) {
    strOutput =
      "<A HREF='" +
      strCellinput +
      "' target='_blank'>" +
      decodeURIComponent(strCellinput) +
      "</A>" +
      listQueryParameters(strCellinput);
  }  else {
    strOutput =
      strCellinput == null || String(strCellinput).trim().length == 0
        ? ""
        : safe_tags_replace(String(strCellinput).trim());
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
    "table { width: 100%;  }";
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
  strOutput += document.title + "<BR>";
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

  let pageH1 = "WLA HTTP Resource Extractor v01"; // H1 Header
  let pageNotes =
    "Use on browsers based on Chromium like Google Chrome or Microsoft Edge"; // Important notes to display
  let objCollection = performance.getEntriesByType("resource"); // define the DOM object as HTML Collections
  let pageHost = location.host; // define the host of the page
  let strHTMLlines = ""; // define the HTML line string
  strHTMLlines += setTableStyle();
  strHTMLlines += formatPageHeaders(pageH1, pageNotes);
  strHTMLlines += "<div style='overflow-x:auto;'>";
  strHTMLlines += formatHTMLTableHeaders(
    "No",
    "Resource Type",
    "Resource Name"
  );
  for (let i = 0; i < objCollection.length; i++) {
    let objItem = objCollection[i]; // get the object HTML collection item
    strHTMLlines += formatHTMLTableRows(
      i + 1,
      objItem["initiatorType"],
      objItem["name"]
    );
  }
  strHTMLlines += "</TABLE>";
  strHTMLlines += "</DIV>";
  strHTMLlines +=
    "<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";

  // Open a new tab or window in browser and display the concatenated strings strHTMLlines
  let myWin = window.open();
  myWin.document.writeln(strHTMLlines);
  myWin.document.close();
})();
