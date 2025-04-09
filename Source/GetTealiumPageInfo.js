/* ===================== Start of Class Obj_to_JSON ===================== */
/*  class Obj_to_JSON
Description: This class provides methods and properties to display recursively object properties
given an object as input. The class also have the capability to display a link that allows user
to download JSON file which is very useful
 */
(function () {
    if (
        typeof Obj_to_JSON === "undefined" &&
        typeof PageProperty === "undefined") {
        class Obj_to_JSON {

            strHTMLlines = ""; // Defines the property strHTMLlines used for populating the lines of HTML codes for the recursive object properties
            objJSON = ""; // Defines the string for the raw CSV object

            /*
            setDivStyle()
            Sets the Div element style using inline CSS
             */
            static setDivStyle(divBackgroundcolor, divPropertycolor) {
                let strOutput = "<STYLE>";
                strOutput +=
                ".propertyname { font-weight:bold; font-color:" + divPropertycolor + "; }" +
                ".outputarea { background-color: " + divBackgroundcolor + "; } ";
                strOutput += "</STYLE>";
                return strOutput;
            }

            /* constructor
            Parameter:
             * inputObjname - string name of the object passed
             */
            constructor(inputObjname) {
                this.inputObj = eval(inputObjname);
                this.inputObjname = inputObjname;
            }

            static recursiveObjformat(obj) {
                let strOutput = "<DIV class='outputarea'>";
                strOutput += "<UL>";

                for (let property in obj) {
                    if (!obj.hasOwnProperty(property))
                        continue;

                    const value = obj[property];
                    strOutput += `<LI><SPAN class='propertyname'>${property}</SPAN>: `;

                    if (value == null) {
                        strOutput += "(null)";
                    } else if (typeof value === 'function') {
                        strOutput += value.toString();
                    } else if (Array.isArray(value)) {
                        strOutput += "<OL>";
                        for (let item of value) {
                            strOutput += "<LI>";
                            if (item && typeof item === 'object') {
                                strOutput += this.recursiveObjformat(item);
                            } else {
                                strOutput += item;
                            }
                            strOutput += "</LI>";
                        }
                        strOutput += "</OL>";
                    } else if (typeof value === 'object') {
                        strOutput += this.recursiveObjformat(value);
                    } else {
                        strOutput += value;
                    }

                    strOutput += "</LI>";
                }

                strOutput += "</UL></DIV>";
                return strOutput;
            }

            /*
            display()
            Parameters:
             * divBackgroundcolor - sets the background color for the object area
             * divPropertycolor - sets the font color for property name of the object
             */
            display(divBackgroundcolor = 'lightblue', divPropertycolor = 'blue') {
                let obj = this.inputObj;
                let strOutput = "<STRONG>" + this.inputObjname + "</STRONG>";
                strOutput += Obj_to_JSON.setDivStyle(divBackgroundcolor, divPropertycolor);
                strOutput += Obj_to_JSON.recursiveObjformat(obj);

                let strJSON = Obj_to_JSON.createobjJSON(this);
                strOutput += Obj_to_JSON.createJSONBloblink(strJSON);
                return strOutput;
            }

            /*
            static createobjJSON()
            Creates the JSON file from JavaScript object so it can be downloaded later
            Parameter:
             * thisObj - this refers to the class since createobjCSVTable is a static class
             */
            static createobjJSON(thisObj) {
                return JSON.stringify(thisObj.inputObj);
            }

            /*
            function createJSONBloblink (objJSON,JSONFileName)
            Formats the A href link for the objCSV so it can be downloadable
            Parameter:
             * objJSON - string of JSON file for download
             * JSONFileName - string of JSON filename. Default is "download.json"
             */
            static createJSONBloblink(objJSON, jsonFileName = "download.json") {
                let linkText = 'Download as JSON';
                let objJSONBlob = new Blob([objJSON], {
                    type: 'text/json'
                });
                let jsonURL = window.URL.createObjectURL(objJSONBlob);
                let HTMLlink = '<A href="' + jsonURL + '" download="' + jsonFileName + '">' + linkText + '</A><BR><BR>';
                return HTMLlink;
            }
        }
        /* ===================== End of Class Obj_to_JSON ===================== */

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
                    strOutput += PageProperty.formatObjvalues(this.objProperty[key]) + "<BR>";
                }
                strOutput += "<BR>";
                return strOutput;
            }
            /*
            displayPageFooters(strHeader)
            Sets and formats the HTML page footer which is normally the copyright notice
             */
            displayPageFooters() {
                let strFooter = "<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";
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
                if (PageProperty.isValidHttpUrl(strCellinput)) { // if strCellinput is URL, then wrap A href tag around so it can be displayed as hyperlink
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

        propDict = {
            "Page URL": location.href,
            "Page Name": document.title,
        }
        let propPage = new PageProperty(propDict, pageTitle = "WLA Tealium Checker v04");
        let strHTMLlines = "";

        strHTMLlines += propPage.displayPageHeaders();

        let customObj = {};

        customObj = new Obj_to_JSON("utag.data");
        strHTMLlines += customObj.display();

        customObj = new Obj_to_JSON("utag.rpt");
        strHTMLlines += customObj.display();

        customObj = new Obj_to_JSON("utag.cfg");
        strHTMLlines += customObj.display();

        customObj = new Obj_to_JSON("utag.send");
        strHTMLlines += customObj.display();

        customObj = new Obj_to_JSON("utag.sender");
        strHTMLlines += customObj.display();

        if (utag.gdpr) {
            if (utag.gdpr.consent_prompt) {
                customObj = new Obj_to_JSON("utag.gdpr.consent_prompt");
                strHTMLlines += customObj.display();
            }
            if (utag.gdpr.preferences_prompt) {
                customObj = new Obj_to_JSON("utag.gdpr.preferences_prompt");
                strHTMLlines += customObj.display();
            }
            customObj = new Obj_to_JSON("utag.gdpr.values");
            strHTMLlines += customObj.display();
        }

        strHTMLlines += propPage.displayPageFooters();

        // Open a new tab or window in browser and display the concatenated strings strHTMLlines
        let myWin = window.open();
        myWin.document.writeln(strHTMLlines);
        myWin.document.close();
    }
})();
