### WLA Tealium Checker bookmarklet

  * Usage 

    To list down some Tealium UDO variable values as well as information from relevant Tealium objects. Note that this will only work on pages that uses Tealium. 
    
  * Code  

    ```
    javascript:function setPageStyle(){let strOutput="<STYLE>";return strOutput+=".propertyname { font-weight:bold; font-color:blue; }.outputarea { background-color: lightblue; } ",strOutput+="</STYLE>",strOutput}function formatPageHeaders(strHeader,strNotes=""){let strOutput="<H1>"+strHeader+"</H1>";return strOutput+="<STRONG>Page URL: </STRONG>",strOutput+="<A href='"+location.href+"' target='_blank'>"+location.href+"</A><BR>",strOutput+="<STRONG>Page Title: </STRONG>",strOutput+=document.title+"<BR><BR>",strOutput+=""!=strNotes?"<STRONG>NOTE: </STRONG>"+strNotes+"<BR><BR>":"",strOutput}function recursiveObjformat(obj){let strOutput="<DIV class='outputarea'>";strOutput+="<UL>";for(let property in obj)if(obj.hasOwnProperty(property)&&null==obj[property])strOutput+="<LI><SPAN class='propertyname'>"+property+"</SPAN>: (null)</LI>";else if(!obj.hasOwnProperty(property)||obj[property].constructor!=String&&obj[property].constructor!=Number&&obj[property].constructor!=Boolean)if(obj.hasOwnProperty(property)&&obj[property].constructor==Array){strOutput+="<LI><SPAN class='propertyname'>"+property+"</SPAN>: <OL>";for(let i=0;i<obj[property].length;i++)strOutput+="<LI>"+obj[property][i]+"</LI>";strOutput+="</OL></LI>"}else obj.hasOwnProperty(property)&&obj[property].constructor==Object?(strOutput+="<LI><SPAN class='propertyname'>"+property+"</SPAN>: ",strOutput+=recursiveObjformat(obj[property]),strOutput+="</LI>"):obj.hasOwnProperty(property)&&obj[property].constructor==Function&&(strOutput+="<LI><SPAN class='propertyname'>"+property+"</SPAN>: ",strOutput+=obj[property],strOutput+="</LI>");else strOutput+="<LI><SPAN class='propertyname'>"+property+"</SPAN>: "+obj[property]+"</LI>";return strOutput+="</UL></DIV><BR>",strOutput}!function(){let pageH1="WLA Tealium Checker v01",pageNotes="",pageHost=location.host,strHTMLlines="";strHTMLlines+=setPageStyle(),strHTMLlines+=formatPageHeaders(pageH1,""),strHTMLlines+="<H2>utag.data</H2>",strHTMLlines+=recursiveObjformat(utag.data),strHTMLlines+="<H2>utag.rpt</H2>",strHTMLlines+=recursiveObjformat(utag.rpt),strHTMLlines+="<H2>utag.cfg</H2>",strHTMLlines+=recursiveObjformat(utag.cfg),strHTMLlines+="<H2>utag.send</H2>",strHTMLlines+=recursiveObjformat(utag.send),strHTMLlines+="<H2>utag.sender</H2>",strHTMLlines+=recursiveObjformat(utag.sender),strHTMLlines+="<BR><BR><DIV style='text-align: center;'><CITE>Coded by Washington Alto</CITE></DIV>";let myWin=window.open();myWin.document.writeln(strHTMLlines),myWin.document.close()}();
    ```
  * Screenshot  

    ![image of Wikipedia page](screenshots/Tealium.png)
      
    <p align=center>Image of Tealium page</p>

    ![image of WLA Basic Page Info Checker result](screenshots/WLATealiumInfoChecker.png)

    <p align=center>Image of Wikipedia WLA Tealium Checker result</p>
