### WLA Images Checker bookmarklet

  * Usage 

    To list down the images on the page, display them if possible and get their width and heigtht as well as their available attributes.
    
  * Code  

    ```
    javascript:function listAttributes(arr){let strOutput="<DIV>";strOutput+="<UL>";for(let i=0;i<arr.length;i++)strOutput+="<LI><SPAN class='propertyname'>"+arr[i].name+"</SPAN>: "+arr[i].value+"</LI>";return strOutput+="</UL></DIV>",strOutput}function isValidHttpUrl(strTest){let url;try{url=new URL(strTest)}catch(_){return!1}return"http:"===url.protocol||"https:"===url.protocol}function isValidImage(strTest){let re;return new RegExp("(?:.svg|.jpg|.jpeg|.gif|.png)").test(strTest)}function formatHTMLcellvalues(strCellinput){let strOutput;return strOutput=isValidHttpUrl(strCellinput)&&isValidImage(strCellinput)?"<A HREF='"+strCellinput+"' target='blank'>"+strCellinput+"</A><BR><IMG = SRC='"+strCellinput+"'>":"object"==typeof strCellinput?listAttributes(strCellinput):null==strCellinput||0==String(strCellinput).trim().length?"":String(strCellinput).trim(),strOutput}function setTableStyle(){let strOutput="<STYLE>";return strOutput+="table,th,td { border:1px solid #9E9E9E; border-collapse: collapse  }",strOutput+="th { background: #FFC107; }",strOutput+="img { height:100px; max-width:90% }",strOutput+=".propertyname { font-weight:bold; font-color:blue; }",strOutput+="</STYLE>",strOutput}function formatPageHeaders(strHeader,strNotes=""){let strOutput="<H1>"+strHeader+"</H1>";return strOutput+="<STRONG>Page URL: </STRONG>",strOutput+="<A href='"+location.href+"' target='_blank'>"+location.href+"</A><BR>",strOutput+="<STRONG>Page Title: </STRONG>",strOutput+=document.title+"<BR><BR>",strOutput+=""!=strNotes?"<STRONG>NOTE: </STRONG>"+strNotes+"<BR><BR>":"",strOutput}function formatHTMLTableHeaders(){let strOutput="<TABLE>";strOutput+="<TR>";for(let i=0;i<arguments.length;i++)strOutput+="<TH>"+arguments[i]+"</TH>";return strOutput+="</TR>",strOutput}function formatHTMLTableRows(){let strOutput="<TR>";for(let i=0;i<arguments.length;i++)strOutput+="<TD>"+formatHTMLcellvalues(arguments[i])+"</TD>";return strOutput+="</TR>",strOutput}!function(){let pageH1="WLA Images Checker v01",pageNotes="",objCollection=document.images,pageHost=location.host,strHTMLlines="";strHTMLlines+=setTableStyle(),strHTMLlines+=formatPageHeaders(pageH1,""),strHTMLlines+=formatHTMLTableHeaders("No","Image URL","Image Height","Image Width","Image Alt Text","Image Attributes");for(let i=0;i<objCollection.length;i++){let objItem=objCollection[i];strHTMLlines+=formatHTMLTableRows(i+1,objItem.src,objItem.height,objItem.width,objItem.alt,objItem.attributes)}strHTMLlines+="</TABLE>",strHTMLlines+="<BR><BR><DIV style='text-align: center;'><CITE>Copyright: (c) 2021, Washington Alto</CITE></DIV>";let myWin=window.open();myWin.document.writeln(strHTMLlines),myWin.document.close()}();
    ```
  * Screenshot  

    ![image of Wikipedia page](screenshots/Wikipedia.png)
      
    <p align=center>Image of Wikipedia page</p>

    ![image of WLA Image Checker result](screenshots/WLAImageCheckerOutput.png)

    <p align=center>Image of Wikipedia WLA Image Checker result</p>
