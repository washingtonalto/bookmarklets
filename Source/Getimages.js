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
function isValidImage(strTest)
	Check if string strTest is a valid image string and if it is, return true otherwise, return false
*/
function isValidImage(strTest) {
  let re = new RegExp("(?:.svg|.jpg|.jpeg|.gif|.png)");

  return re.test(strTest);
}

/*
function formatHTMLcellvalues(strCellinput)
	Format HTML table cell values so that string strCellinput is empty string when value is null and string is trimmed
	Also, if strCellinput is valid URL, then <A> tag is appended
*/
function formatHTMLcellvalues(strCellinput) {
  let strOutput;
  if (isValidHttpUrl(strCellinput) && isValidImage(strCellinput)) {
    strOutput =
      "<A HREF='" +
      strCellinput +
      "' target='blank'>" +
      strCellinput +
      "</A><BR><IMG = SRC='" +
      strCellinput +
      "'>";
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
  strOutput += "img { height:100px; max-width:90% }";
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
  let pageH1 = "WLA Images Checker v01"; // H1 Header
  let pageNotes = ""; // Important notes to display
  let objCollection = document.images; // define the DOM object as HTML Collections
  let pageHost = location.host; // define the host of the page
  let strHTMLlines = ""; // define the HTML line string
  strHTMLlines += setTableStyle();
  strHTMLlines += formatPageHeaders(pageH1, pageNotes);
  strHTMLlines += formatHTMLTableHeaders(
    "No",
    "Image URL",
    "Image Height",
    "Image Width",
    "Image Alt Text",
    "Image Attributes"
  );
  for (let i = 0; i < objCollection.length; i++) {
    let objItem = objCollection[i]; // get the object HTML collection item
    strHTMLlines += formatHTMLTableRows(
      i + 1,
      objItem["src"],
      objItem["height"],
      objItem["width"],
      objItem["alt"],
      objItem["attributes"]
    );
  }
  strHTMLlines += "</TABLE>";
  strHTMLlines +=
    "<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";

  // Open a new tab or window in browser and display the concatenated strings strHTMLlines
  let myWin = window.open();
  myWin.document.writeln(strHTMLlines);
  myWin.document.close();
})();
