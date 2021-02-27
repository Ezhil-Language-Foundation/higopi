<?php ob_start("ob_gzhandler"); ?>
var eng = new Array();
var oldloc = "" ;

function adhiyan_isWS(text)
{
	return !(/[^\t\n\r ]/.test(text));
}

function adhiyan_setMenus(enc)
{
	adhiyan_setEnc(enc);
	var oldloc = "";
	document.getElementById('englishcxt').setAttribute("checked","false");
	document.getElementById('tsciicxt').setAttribute("checked","false");
	document.getElementById('tunecxt').setAttribute("checked","false");
	document.getElementById('asccxt').setAttribute("checked","false");
	document.getElementById('tabcxt').setAttribute("checked","false");
	document.getElementById('tamcxt').setAttribute("checked","false");
	document.getElementById('thanthicxt').setAttribute("checked","false");
	document.getElementById('manicxt').setAttribute("checked","false");
	document.getElementById(enc+'cxt').setAttribute("checked","true");
	if(document.getElementById('englishmnu') != null )
	{
		document.getElementById('englishmnu').setAttribute("checked","false");
		document.getElementById('tsciimnu').setAttribute("checked","false");
		document.getElementById('tunemnu').setAttribute("checked","false");
		document.getElementById('ascmnu').setAttribute("checked","false");
		document.getElementById('tabmnu').setAttribute("checked","false");
		document.getElementById('tammnu').setAttribute("checked","false");
		document.getElementById('thanthimnu').setAttribute("checked","false");
		document.getElementById('manimnu').setAttribute("checked","false");
		document.getElementById(enc+'mnu').setAttribute("checked","true");
	}
}

function adhiyan_doProc(enc)
{
	adhiyan_setMenus(enc)
	content.location.reload();
}

function adhiyan_convWin()
{
	var page = content;
    if (!page || !page.location || page.location.href.match("^about:") ||
    		page.location.host == undefined )
        return;
    var newloc = page.location;
    if(oldloc != newloc)
    {
		oldloc = newloc;
		if(adhiyan_selEnc != "english")
		{
			if(page.frames.length != 0)
			{
				var frm = page.document.getElementsByTagName('frame');
				//if no frames then it could be iframes
				if(frm.length == 0)
					frm = page.document.getElementsByTagName('iframe');
				var script1 = page.document.createElement("SCRIPT");
				script1.src = 'chrome://adhiyan/content/adhiyaman.js';
				script1.type = 'text/javascript';
				var script2 = page.document.createElement("SCRIPT");
				script2.src = 'chrome://adhiyan/content/'+adhiyan_selEnc+'.js';
				if(adhiyan_selEnc == "asc")
					script2.src = 'chrome://adhiyan/content/asc2uni.js';
				script2.type = 'text/javascript';
				var script3 = page.document.createElement("SCRIPT");
				script3.src = 'chrome://adhiyan/content/settings.js';
				script3.type = 'text/javascript';
				var script4 = page.document.createElement("SCRIPT");
				script4.src = 'chrome://adhiyan/content/adhiyan.js';
				script4.type = 'text/javascript';
				var contType = page.document.createElement("META");
				contType.setAttribute("http-equiv","Content-Type");
				contType.setAttribute("content","text/html; charset=ISO-8859-1");
				var head = page.document.getElementsByTagName('head').item(0);
				head.appendChild(script1);
				head.appendChild(script2);
				head.appendChild(script3);
				head.appendChild(script4);
				head.appendChild(contType);
				for(var i=0;i<frm.length;++i )
				{
						mainurl = content.location.href;
						mainurl = mainurl.substring(mainurl.indexOf("http://")+7, mainurl.indexOf("/", 8));
						if(mainurl.indexOf("www.") >= 0 )
							mainurl = mainurl.replace("www.","");
							if(frm[i] && frm[i].src && frm[i].src.indexOf(mainurl) >= 0)
								frm[i].setAttribute("onload", "adhiyan_selEnc='"+adhiyan_selEnc+"';adhiyan_convFrWin(this)");
				}
			}
				//REPLACE THE TEXT WITH UNICODE ENCODED TEXT
				var body = page.document.getElementsByTagName('body');
				for(var i=0;i<body.length;++i )
					adhiyan_modTxt(body[i]);
		}
	}
}

function adhiyan_convFrWin(frmelem)
{
	mainurl = content.location.href;
	mainurl = mainurl.substring(mainurl.indexOf("http://")+7, mainurl.indexOf("/", 8));
	if(mainurl.indexOf("www.") >= 0 )
		mainurl = mainurl.replace("www.","");
	if(frmelem && frmelem.src && frmelem.src.indexOf(mainurl) >= 0)
	{
		page = frmelem.contentWindow;
		var body = page.document.getElementsByTagName('body');
		for(var i=0;i<body.length;++i )
			adhiyan_modTxt(body[i]);
	}
}

function adhiyan_fixAlign(obj)
{
	if(!obj) return;

	if(obj.style)
	{
		var objStyle = window.getComputedStyle(obj, '');
		if(objStyle.textAlign.length == 7 && !window.opera)
		{
			obj.style.textAlign = "left";
		}

		if(objStyle.letterSpacing.length!=0 && objStyle.letterSpacing.length!=6 )
		{
			obj.style.letterSpacing = "normal";
		}

		if(objStyle.wordSpacing.length!=0 && objStyle.wordSpacing.length!=6 && !window.opera)
		{
			obj.style.wordSpacing = "normal";
		}
	}
}

function adhiyan_modTxt(node)
{
	if(node == null)
		return;
	adhiyan_fixAlign(node);
	if(node.nodeType == 3)
	{
		if(adhiyan_isWS(node.nodeValue))
			return;
		var parent = node.parentNode;
 		if (parent.nodeType == 1)
        {
	        if(adhiyan_selEnc == "asc")
	        	node.replaceData(0, node.length, adhiyan_asc2uni(node.nodeValue));
	        else
				node.replaceData(0, node.length, adhiyan_convEnc(node.nodeValue));
		}
	}
	//Ignore comment nodes and script nodes
    else if (node.nodeType != 8 && (node.nodeType != 1 || !(node instanceof HTMLScriptElement)))
    {
		for(var k=0;k<node.childNodes.length;++k)
			adhiyan_modTxt(node.childNodes.item(k));
	}
}
