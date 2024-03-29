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
        : decodeURIComponent(String(strCellinput).trim());
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
function getcookieObject()
  Get cookie as an object that was extracted from document.cookie DOM object
*/
function getcookieObject() {
  const cookies = document.cookie.split(";").reduce((cookies, cookie) => {
    const [name, val] = cookie.split("=").map((c) => c.trim());
    cookies[name] = decodeURIComponent(val);
    return cookies;
  }, {});
  return cookies;  
}

(function () {
  let pageH1 = "WLA First-party Cookie Extractor v01"; // H1 Header
  let pageNotes = "Not all cookies can be extracted. Only cookies stored in current domain and are not http only can be extracted by this bookmarklet due to security design of JavaScript"; // Important notes to display
  let pageHost = location.host; // define the host of the page
  let strHTMLlines = ""; // define the HTML line string
  strHTMLlines += setTableStyle();
  strHTMLlines += formatPageHeaders(pageH1, pageNotes);

  // ----- H1 to H6 Tag Information -----
  objCookies = getcookieObject();
  strHTMLlines += "<H1>Cookie name-value pairs</H1>";
  strHTMLlines += formatHTMLTableHeaders(
    "No",
    "Cookie Name",
    "Cookie Value"  
  );
  let i = 0;
  for (objItem in objCookies) {
    strHTMLlines += formatHTMLTableRows(
      i + 1,
      objItem,
      objCookies[objItem]
    );
    i += 1;
  }
  strHTMLlines += "</TABLE>";

  strHTMLlines +=
    "<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";

  // Open a new tab or window in browser and display the concatenated strings strHTMLlines
  let myWin = window.open();
  myWin.document.writeln(strHTMLlines);
  myWin.document.close();
})();
