### WLA CSS Selector Web Scraper bookmarklet

  * Usage 

    To list down results of web scrape CSS selector query in tabular form. The result includes not only the extracted innerText but also the outerHTML and the attributes of the node 
    
  * Code  

    ```
    javascript:function listAttributes(arr){let strOutput="<DIV>";strOutput+="<UL>";for(let i=0;i<arr.length;i++)strOutput+="<LI><SPAN class='propertyname'>"+arr[i].name+"</SPAN>: "+arr[i].value+"</LI>";return strOutput+="</UL></DIV>",strOutput}function isValidHttpUrl(strTest){let url;try{url=new URL(strTest)}catch(_){return!1}return"http:"===url.protocol||"https:"===url.protocol}function formatHTMLcellvalues(strCellinput){let tagsToReplace={"&":"&amp;","<":"&lt;",">":"&gt;"},strOutput;function replaceTag(tag){return tagsToReplace[tag]||tag}function safe_tags_replace(str){return str.replace(/[&<>]/g,replaceTag)}return strOutput=isValidHttpUrl(strCellinput)?"<A HREF='"+strCellinput+"' target='_blank'>"+decodeURIComponent(strCellinput)+"</A>":"object"==typeof strCellinput?listAttributes(strCellinput):null==strCellinput||0==String(strCellinput).trim().length?"":safe_tags_replace(String(strCellinput).trim()),strOutput}function setTableStyle(){let strOutput="<STYLE>";return strOutput+="table,th,td { border:1px solid #9E9E9E; border-collapse: collapse  }",strOutput+="th { background: #FFC107; }",strOutput+=".propertyname { font-weight:bold; font-color:blue; }",strOutput+="</STYLE>",strOutput}function formatPageHeaders(strHeader,strNotes="",strCSSSelector=""){let strOutput="<H1>"+strHeader+"</H1>";return strOutput+="<STRONG>Page URL: </STRONG>",strOutput+="<A href='"+location.href+"' target='_blank'>"+location.href+"</A><BR>",strOutput+="<STRONG>Page Title: </STRONG>",strOutput+=document.title+"<BR>",strOutput+="<STRONG>CSS selector used: </STRONG>",strOutput+=strCSSSelector+"<BR><BR>",strOutput+=""!=strNotes?"<STRONG>NOTE: </STRONG>"+strNotes+"<BR><BR>":"",strOutput}function formatHTMLTableHeaders(){let strOutput="<TABLE>";strOutput+="<TR>";for(let i=0;i<arguments.length;i++)strOutput+="<TH>"+arguments[i]+"</TH>";return strOutput+="</TR>",strOutput}function formatHTMLTableRows(){let strOutput="<TR>";for(let i=0;i<arguments.length;i++)strOutput+="<TD>"+formatHTMLcellvalues(arguments[i])+"</TD>";return strOutput+="</TR>",strOutput}!function(){const cssSelectorwebscrape=prompt("Enter CSS selector for web scraping (default:A): ","A");let pageH1="WLA CSS Selector Web Scraper v01",pageNotes="",objCollection=document.querySelectorAll(cssSelectorwebscrape),pageHost=location.host,strHTMLlines="";strHTMLlines+=setTableStyle(),strHTMLlines+=formatPageHeaders(pageH1,"",cssSelectorwebscrape),strHTMLlines+=formatHTMLTableHeaders("No","Extracted innerText","Extracted outerHTML","CSS selector attributes");for(let i=0;i<objCollection.length;i++){let objItem=objCollection[i];strHTMLlines+=formatHTMLTableRows(i+1,objItem.innerText,objItem.outerHTML,objItem.attributes)}strHTMLlines+="</TABLE>",strHTMLlines+="<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";let myWin=window.open();myWin.document.writeln(strHTMLlines),myWin.document.close()}();
    ```
  * Screenshot  

    ![image of Wikipedia page](screenshots/Wikipedia.png)
      
    <p align=center>Image of Wikipedia page</p>

    ![image of WLA CSS Extractor result](screenshots/WLACSSExtractor.png)

    <p align=center>Image of Wikipedia WLA CSS Extractor result</p>
