### WLA CSS Selector Web Scraper bookmarklet

  * Usage 

    To list down results of web scrape CSS selector query in tabular form. The result includes not only the extracted innerText but also the outerHTML and the attributes of the node. Not only will one be able to view the table of extracted text but one will be able to quickly download them to CSV format. 
    
  * Code  

    ```
    javascript:function listAttributes(t){let e="<DIV>";e+="<UL>";for(let o=0;o<t.length;o++)e+="<LI><SPAN class='propertyname'>"+t[o].name+"</SPAN>: "+t[o].value+"</LI>";return e+="</UL></DIV>",e}function isValidHttpUrl(t){let e;try{e=new URL(t)}catch(t){return!1}return"http:"===e.protocol||"https:"===e.protocol}function formatHTMLcellvalues(t){function e(t){return n[t]||t}function o(t){return t.replace(/[&<>]/g,e)}let r,n={"&":"&amp;","<":"&lt;",">":"&gt;"};return r=isValidHttpUrl(t)?"<A HREF='"+t+"' target='_blank'>"+decodeURIComponent(t)+"</A>":"object"==typeof t?listAttributes(t):null==t||0==String(t).trim().length?"":o(String(t).trim()),r}function setTableStyle(){let t="<STYLE>";return t+="table,th,td { border:1px solid #9E9E9E; border-collapse: collapse  }",t+="th { background: #FFC107; }",t+=".propertyname { font-weight:bold; font-color:blue; }",t+="</STYLE>",t}function formatPageHeaders(t,e="",o=""){let r="<H1>"+t+"</H1>";return r+="<STRONG>Page URL: </STRONG>",r+="<A href='"+location.href+"' target='_blank'>"+location.href+"</A><BR>",r+="<STRONG>Page Title: </STRONG>",r+=document.title+"<BR>",r+="<STRONG>CSS selector used: </STRONG>",r+=o+"<BR><BR>",r+=""!=e?"<STRONG>NOTE: </STRONG>"+e+"<BR><BR>":"",r}function formatHTMLTableHeaders(){let t="<TABLE>";t+="<TR>";for(let e=0;e<arguments.length;e++)t+="<TH>"+arguments[e]+"</TH>";return t+="</TR>",t}function formatHTMLTableRows(){let t="<TR>";for(let e=0;e<arguments.length;e++)t+="<TD>"+formatHTMLcellvalues(arguments[e])+"</TD>";return t+="</TR>",t}function formatHTMLCollobjtoCSV(t){if("object"==typeof t){listofTextContent=[],t.forEach(t=>{listofTextContent.push('"'+t.innerText.trim()+'"')});let e=listofTextContent.join("\n");return e}return null}function createCSVBloblink(t,e){let o="Download Extracted innerText in CSV",r=new Blob([t],{type:"text/csv"}),n=window.URL.createObjectURL(r),l='<A href="'+n+'" download="'+e+'">'+o+"</A>";return l}(function(){const t=prompt("Enter CSS selector for web scraping (default:A): ","A");let e="WLA CSS Selector Web Scraper v01",o="",r=document.querySelectorAll(t),n=(location.host,"");n+=setTableStyle(),n+=formatPageHeaders(e,o,t),n+=formatHTMLTableHeaders("No","Extracted innerText","Extracted outerHTML","CSS selector attributes");for(let t=0;t<r.length;t++){let e=r[t];n+=formatHTMLTableRows(t+1,e.innerText,e.outerHTML,e.attributes)}n+="</TABLE>",n+="<BR>";let l=formatHTMLCollobjtoCSV(r),a=createCSVBloblink(l,"CSS_Extraction_list");n+=a,n+="<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";let c=window.open();c.document.writeln(n),c.document.close()})();
    ```
  * Screenshot  

    ![image of Wikipedia page](screenshots/Wikipedia.png)
      
    <p align=center>Image of Wikipedia page</p>

    ![image of WLA CSS Extractor result](screenshots/WLACSSExtractor.png)

    <p align=center>Image of Wikipedia WLA CSS Extractor result</p>
