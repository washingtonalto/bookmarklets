(function () {
  if (
    typeof ListofObj_to_Table === "undefined" &&
    typeof PageProperty === "undefined"
  ) {
    /* ===================== Start of Class ListofObj_to_Table ===================== */
    /*  class ListofObj_to_Table
    Description: This class provides methods and properties to create HTML table given a list of
    Object as input as well as the table field header names and the key values of the objects itself
*/
    class ListofObj_to_Table {
      strHTMLlines = ""; // Defines the property strHTMLlines used for populating the lines of HTML codes for the HTML table
      tableHeader = ["No."]; // Defines the Table Header with "No." as the first field for enumerating how many rows in the table
      tableData = []; // Defines the Table rows of field names based on the key values on each of the object in the list of objects
      tableTitle = ""; // Defines the table title before the HTML table is displayed
      objCSV = ""; // Defines the string for the raw CSV object

      /* constructor 
     Parameter: 
     * tableObjSchema - Dictionary where key-value pair contain "Table Header Names" as key and table field object as value. Note that
       the value in the key-value pair should use have in the string objItem as object; for example, objItem['innerHTML'],
       objItem['innerText']
     * tableObj - this is the list of Objects; for example, HTMLCollections from document.querySelectorAll() calls 
  */
      constructor(tableObjSchema, tableObj) {
        this.tableObjSchema = tableObjSchema;
        this.tableObj = tableObj;
      }

      /*
    static listAttributes(arr)
    Lists down attributes for the attributes property using HTML list
    Parameter:
    * arr - name-value pair defining name of attribute and its corresponding values in the HTML element
  */
      static listAttributes(arr) {
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
    static isValidHttpUrl(strTest)
    Check if string strTest is a URL and if it is, return true otherwise, return false
    Parameter:
    * strTest - string tested whether it's a URL or not. If string is a URL, it returns true; 
      otherwise, it returns false
  */
      static isValidHttpUrl(strTest) {
        let url;

        try {
          url = new URL(strTest);
        } catch (_) {
          return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
      }

      /*
    static formatHTMLcellvalues(strCellinput)
    Format HTML table cell values so that string strCellinput is empty string when value is null and string is trimmed
    Also, if strCellinput is valid URL, then <A> tag is appended
    Parameter:
    * strCellinput - object value to be displayed in the HTML table cell
  */
      static formatHTMLcellvalues(strCellinput) {
        let tagsToReplace = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
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
        if (ListofObj_to_Table.isValidHttpUrl(strCellinput)) {
          // if strCellinput is URL, then wrap A href tag around so it can be displayed as hyperlink
          strOutput =
            "<A HREF='" +
            strCellinput +
            "' target='_blank'>" +
            decodeURIComponent(strCellinput) +
            "</A>";
        } else if (typeof strCellinput === "object") {
          strOutput = ListofObj_to_Table.listAttributes(strCellinput);
        } else {
          strOutput =
            strCellinput == null || String(strCellinput).trim().length == 0
              ? ""
              : safe_tags_replace(String(strCellinput).trim());
        }
        return strOutput;
      }

      /*
  setTableStyle()
    Sets the HTML table using inline CSS
    Parameter:
    * headerBackgroundColor - defines the color of the HTML Table header. By default, color is "#FFC107"
  */
      setTableStyle(headerBackgroundColor = "#FFC107") {
        let strOutput = "<STYLE>";
        strOutput +=
          "table,th,td { border:1px solid #9E9E9E; border-collapse: collapse  }";
        strOutput += "th { background: " + headerBackgroundColor + "; }";
        strOutput += ".propertyname { font-weight:bold; font-color:blue; }";
        strOutput += "</STYLE>";
        return strOutput;
      }

      /*
    setTableTitle(tableTitle="") 
    Sets the Table Title before the HTML table
    Parameter:
    * tableTitle - string for the title of the HTML table
  */
      setTableTitle(tableTitle = "") {
        this.tableTitle = tableTitle;
      }

      /*
    static formatHTMLTableHeaders()
    Sets and formats the HTML table headers like the <TH>. Note that arguments is variable and 
    defines the table header titles to be used
  */
      static formatHTMLTableHeaders() {
        let strOutput = "<TABLE>";
        strOutput += "<TR>";
        for (let i = 0; i < arguments.length; i++) {
          strOutput += "<TH>" + arguments[i] + "</TH>";
        }
        strOutput += "</TR>";
        return strOutput;
      }

      /*
    static formatHTMLTableRows() 
    Sets and formats the HTML table row like the <TR> and <TD>. Note that arguments is variable and 
    defines the table cells to be used
  */
      static formatHTMLTableRows() {
        let strOutput = "<TR>";
        for (let i = 0; i < arguments.length; i++) {
          strOutput +=
            "<TD>" +
            ListofObj_to_Table.formatHTMLcellvalues(arguments[i]) +
            "</TD>";
        }
        strOutput += "</TR>";
        return strOutput;
      }

      /*
  createHTMLTable() 
    Creates the HTML Table proper
  */
      createHTMLTable() {
        let objCollection = this.tableObj;

        // this.tableHeader - contains Table Header label including "No."
        this.tableHeader = this.tableHeader.concat(
          Object.keys(this.tableObjSchema)
        );
        // this.tableData - contains object field keys e.g. objItem['innerText']
        this.tableData = Object.values(this.tableObjSchema);
        this.collectionFields = [];

        this.strHTMLlines += this.setTableStyle();
        this.strHTMLlines +=
          this.tableTitle.length > 0 ? "<H1>" + this.tableTitle + "</H1>" : "";
        this.strHTMLlines += ListofObj_to_Table.formatHTMLTableHeaders(
          ...this.tableHeader
        );
        for (let i = 0; i < objCollection.length; i++) {
          let objItem = objCollection[i]; // get the object HTML collection item
          this.tableData.forEach((item) => {
            this.collectionFields.push(eval(item));
          });
          this.strHTMLlines += ListofObj_to_Table.formatHTMLTableRows(
            i + 1,
            ...this.collectionFields
          );
          this.collectionFields = [];
        }
        this.strHTMLlines += "</TABLE><BR>";

        this.objCSV = ListofObj_to_Table.createobjCSVTable(this);
        this.strHTMLlines += ListofObj_to_Table.createCSVBloblink(this.objCSV);
        return this.strHTMLlines;
      }

      /*
    static formatCSVTableHeaders()
    Formats the CSV Headers to be used for downloading to CSV from the HTML Table
  */
      static formatCSVTableHeaders() {
        let strOutput = "";
        for (let i = 0; i < arguments.length; i++) {
          if (i < arguments.length - 1) {
            strOutput += '"' + arguments[i] + '"' + ",";
          } else {
            strOutput += '"' + arguments[i] + '"' + "\n";
          }
        }
        return strOutput;
      }

      /*
    static formatCSVTableRows() 
    Formats the CSV rows to be used for downloading to CSV from the HTML Table
  */
      static formatCSVTableRows() {
        let strOutput = "";
        for (let i = 0; i < arguments.length; i++) {
          if (i < arguments.length - 1) {
            strOutput +=
              ListofObj_to_Table.escapeForCSV(
                ListofObj_to_Table.formatCSVcellvalues(arguments[i])
              ) + ",";
          } else {
            strOutput +=
              ListofObj_to_Table.escapeForCSV(
                ListofObj_to_Table.formatCSVcellvalues(arguments[i])
              ) + "\n";
          }
        }
        return strOutput;
      }

      /*
    static createobjCSVTable() 
    Creates the raw csv so it can be downloaded later 
    Parameter:
    * thisObj - this refers to the class since createobjCSVTable is a static class 
  */
      static createobjCSVTable(thisObj) {
        let objCollection = thisObj.tableObj;
        thisObj.collectionFields = [];
        let strCSVlines = "";

        strCSVlines += ListofObj_to_Table.formatCSVTableHeaders(
          ...thisObj.tableHeader
        );
        for (let i = 0; i < objCollection.length; i++) {
          let objItem = objCollection[i]; // get the object HTML collection item
          thisObj.tableData.forEach((item) => {
            thisObj.collectionFields.push(eval(item));
          });
          strCSVlines += ListofObj_to_Table.formatCSVTableRows(
            i + 1,
            ...thisObj.collectionFields
          );
          thisObj.collectionFields = [];
        }
        return strCSVlines;
      }

      /*
  function createCSVBloblink (objCSV,csvFileName)
  Formats the A href link for the objCSV so it can be downloadable 
  Parameter:
  * objCSV - string of raw CSV where line breaks delimits rows of comma-separated values
  * csvFileName - string of CSV filename. Default is "download.csv" 
  */
      static createCSVBloblink(objCSV, csvFileName = "download.csv") {
        let linkText = "Download as CSV";
        let objCSVBlob = new Blob([objCSV], { type: "text/csv" });
        let csvURL = window.URL.createObjectURL(objCSVBlob);
        let HTMLlink =
          '<A href="' +
          csvURL +
          '" download="' +
          csvFileName +
          '">' +
          linkText +
          "</A>";
        return HTMLlink;
      }

      /* static escapeForCSV(inputString)
     formats the string so that if it has double-quotes, it can be escaped properly for 
     CSV formatting purposes
     * inputString - string to be checked and formatted for quotes 
  */
      static escapeForCSV(inputString) {
        // Check if the string contains special characters
        if (/[",\n]/.test(inputString)) {
          // Escape double quotes with double quotes and wrap the string in double quotes
          return '"' + inputString.replace(/"/g, '""') + '"';
        }
        return inputString;
      }

      /*
    static formatCSVcellvalues(strCellinput)
    Format CSVCellvalues so it can be displayed properly within CSV cells
    Parameter:
    * strCellinput - object value to be displayed in the CSV cell
  */
      static formatCSVcellvalues(strCellinput) {
        function CSVlistAttributes(arr) {
          let strOutput = "";
          for (let i = 0; i < arr.length; i++) {
            strOutput += arr[i].name + ": " + arr[i].value + ";\n\r";
          }
          return strOutput;
        }

        let strOutput;
        if (typeof strCellinput === "object") {
          strOutput = CSVlistAttributes(strCellinput);
        } else {
          strOutput = String(strCellinput).trim();
        }
        return strOutput;
      }
    }
    /* ===================== End of Class ListofObj_to_Table ===================== */

    /* ===================== Start of Class PageProperty ===================== */
    /*  class PageProperty
    Description: This class provides methods and properties to set the page properties to 
    display in the new tab report like the Page URL, the Title and so on
*/
    class PageProperty {
      pageTitle = "";
      objProperty = {}; // accepts object value-pair containing those items to display; for example:
      // { "Page URL":location.href }

      constructor(objProperty, pageTitle = "") {
        this.pageTitle = pageTitle;
        this.objProperty = objProperty;
      }

      /*
    displayPageHeaders(strHeader)
    Sets and formats the HTML page headers like the <H1>, the page URL and the page title
  */
      displayPageHeaders() {
        let strHeader = this.pageTitle;
        let strOutput = "<TITLE>" + strHeader + "</TITLE>";
        strOutput += "<H1>" + strHeader + "</H1>";

        for (let key in this.objProperty) {
          strOutput += "<STRONG>" + key + "</STRONG>: ";
          strOutput +=
            PageProperty.formatObjvalues(this.objProperty[key]) + "<BR>";
        }
        strOutput += "<BR>";
        return strOutput;
      }
      /*
    displayPageFooters(strHeader)
    Sets and formats the HTML page footer which is normally the copyright notice
  */
      displayPageFooters() {
        let strFooter =
          "<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";
        return strFooter;
      }
      /*
    static isValidHttpUrl(strTest)
    Check if string strTest is a URL and if it is, return true otherwise, return false
    Parameter:
    * strTest - string tested whether it's a URL or not. If string is a URL, it returns true; 
      otherwise, it returns false
  */
      static isValidHttpUrl(strTest) {
        let url;

        try {
          url = new URL(strTest);
        } catch (_) {
          return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
      }

      static formatObjvalues(strCellinput) {
        let tagsToReplace = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
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
        if (PageProperty.isValidHttpUrl(strCellinput)) {
          // if strCellinput is URL, then wrap A href tag around so it can be displayed as hyperlink
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
              : safe_tags_replace(String(strCellinput).trim());
        }
        return strOutput;
      }
    }
    /* ===================== End of Class PageProperty ===================== */

    function convertXPathObj_to_listofObjArr(objXPathCollection) {
      var nodes = [];
      let node = objXPathCollection.iterateNext();
      while (node) {
        nodes.push(node);
        node = objXPathCollection.iterateNext();
      }
      return nodes;
    }

    var xPathwebscrape = prompt(
      "Enter XPath expression for web scraping (default://A): ",
      "//A"
    );
    let objXPathCollection = document.evaluate(
      xPathwebscrape,
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    ); // define the DOM object as HTML Collections

    let strHTMLlines = "";

    propDict = {
      "Page URL": location.href,
      "Page Name": document.title,
      "XPath expression used for extraction": xPathwebscrape,
    };
    let propPage = new PageProperty(
      propDict,
      (pageTitle = "WLA XPath Web Scraper v03")
    );
    strHTMLlines += propPage.displayPageHeaders();

    listoftestObject = convertXPathObj_to_listofObjArr(objXPathCollection);
    tableschema = {
      "Extracted Text": "objItem['textContent']",
      outerHTML: "objItem['outerHTML']",
    };
    var htmlTable = new ListofObj_to_Table(tableschema, listoftestObject);
    strHTMLlines += htmlTable.createHTMLTable();
    strHTMLlines += propPage.displayPageFooters();

    let myWin = window.open();
    myWin.document.writeln(strHTMLlines);
    myWin.document.close();
  }
})();
