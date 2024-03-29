/*
function setPageStyle()
	Sets the Page using inline CSS
*/
function setPageStyle() {
  let strOutput = "<STYLE>";
  strOutput +=
    ".propertyname { font-weight:bold; font-color:blue; }" +
    ".outputarea { background-color: lightblue; } ";
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

function recursiveObjformat(obj) {
  let strOutput = "<DIV class='outputarea'>";
  strOutput += "<UL>";
  for (let property in obj) {
    if (obj.hasOwnProperty(property) && obj[property] == null) {
      strOutput +=
        "<LI><SPAN class='propertyname'>" + property + "</SPAN>: (null)</LI>";
    } else if (
      obj.hasOwnProperty(property) &&
      (obj[property].constructor == String ||
        obj[property].constructor == Number ||
        obj[property].constructor == Boolean)
    ) {
      strOutput +=
        "<LI><SPAN class='propertyname'>" +
        property +
        "</SPAN>: " +
        obj[property] +
        "</LI>";
    } else if (
      obj.hasOwnProperty(property) &&
      obj[property].constructor == Array
    ) {
      strOutput +=
        "<LI><SPAN class='propertyname'>" + property + "</SPAN>: <OL>";
      for (let i = 0; i < obj[property].length; i++) {
        strOutput += "<LI>" + obj[property][i] + "</LI>";
      }
      strOutput += "</OL></LI>";
    } else if (
      obj.hasOwnProperty(property) &&
      obj[property].constructor == Object
    ) {
      strOutput += "<LI><SPAN class='propertyname'>" + property + "</SPAN>: ";
      strOutput += recursiveObjformat(obj[property]);
      strOutput += "</LI>";
    } else if (
      obj.hasOwnProperty(property) &&
      obj[property].constructor == Function
    ) {
      strOutput += "<LI><SPAN class='propertyname'>" + property + "</SPAN>: ";
      strOutput += obj[property];
      strOutput += "</LI>";
    }
  }
  strOutput += "</UL></DIV><BR>";
  return strOutput;
}

(function () {
  let pageH1 = "WLA Tealium Checker v02"; // H1 Header
  let pageNotes = ""; // Important notes to display
  let pageHost = location.host; // define the host of the page
  let strHTMLlines = ""; // define the HTML line string
  strHTMLlines += setPageStyle();
  strHTMLlines += formatPageHeaders(pageH1, pageNotes);

  strHTMLlines += "<H2>utag.data</H2>";
  strHTMLlines += recursiveObjformat(utag.data);

  strHTMLlines += "<H2>utag.rpt</H2>";
  strHTMLlines += recursiveObjformat(utag.rpt);

  strHTMLlines += "<H2>utag.cfg</H2>";
  strHTMLlines += recursiveObjformat(utag.cfg);

  strHTMLlines += "<H2>utag.send</H2>";
  strHTMLlines += recursiveObjformat(utag.send);

  strHTMLlines += "<H2>utag.sender</H2>";
  strHTMLlines += recursiveObjformat(utag.sender);

  if (utag.gdpr) {  
    if (utag.gdpr.consent_prompt) {
      strHTMLlines += "<H2>utag.gdpr.consent_prompt</H2>";
      strHTMLlines += recursiveObjformat(utag.gdpr.consent_prompt);
    }
    if (utag.gdpr.preferences_prompt) {
      strHTMLlines += "<H2>utag.gdpr.preferences_prompt</H2>";
      strHTMLlines += recursiveObjformat(utag.gdpr.preferences_prompt);
    }
    strHTMLlines += "<H2>utag.gdpr.values</H2>";
    strHTMLlines += recursiveObjformat(utag.gdpr.values);
  } 

  strHTMLlines +=
    "<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";

  // Open a new tab or window in browser and display the concatenated strings strHTMLlines
  let myWin = window.open();
  myWin.document.writeln(strHTMLlines);
  myWin.document.close();
})();
