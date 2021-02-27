<?php ob_start("ob_gzhandler"); ?>
/* Strip whitespace from the beginning and end of a string */
if (typeof String.prototype.trim == "undefined") {
    String.prototype.trim = function () {
        var s = this.replace(/^\s*/, "");
        return s.replace(/\s*$/, "");
    }
}

if (typeof String.prototype.initCaps == "undefined") {
    String.prototype.initCaps = function () {
        return this.substring(0,1).toUpperCase()+ this.substring(1,this.length);
    }
}

var adhiyan_selEnc = "tscii";

function adhiyan_setEnc(enc)
{
	adhiyan_selEnc = enc;
}

function adhiyan_convEnc(txt)
{
	if(adhiyan_checkEng(txt) && adhiyan_selEnc != "kalaham" )
		return txt;
	var txtarr = eval(adhiyan_selEnc.substring(0,3));
	if(adhiyan_getAssocArrayLength(txtarr) == 0)
		return txt;
	eval("txt = adhiyan_align"+adhiyan_selEnc.toUpperCase()+"(txt);");
	for(itm in txtarr)
	{
		var mychar = String.fromCharCode(itm);
		if(isNaN(itm))
			mychar = itm;
		if(mychar == '[' || mychar == ']' || mychar == '('
		|| mychar == ')' || mychar == '{' || mychar == '}'
		|| mychar == '^' || mychar == '$' || mychar == '|'
		|| mychar == '.' || mychar == '+' || mychar == '?'
		|| mychar == '*' || mychar == '/' || mychar == ':'
		|| mychar == '\\' )
			mychar = '\\'+mychar;
		var rexp = new RegExp(mychar,"g");
		txt = txt.replace(rexp, txtarr[itm]);
	}
	txt = adhiyan_canonicalFix(txt);
	return txt;
}

function adhiyan_canonicalFix(txt)
{
	var mychar = "\u0BC6\u0BBE"; //ogara otru
	var rexp = new RegExp(mychar,"g");
	txt = txt.replace(rexp, "\u0BCA");

	mychar = "\u0BC7\u0BBE"; //Ogaara otru
	rexp = new RegExp(mychar,"g");
	txt = txt.replace(rexp, "\u0BCB");

	mychar = "\u0BC6\u0BB3"; //augaara otru
	rexp = new RegExp(mychar,"g");
	txt = txt.replace(rexp, "\u0BCC");

	mychar = "\u0B92\u0BB3"; //augara uyir
	rexp = new RegExp(mychar,"g");
	txt = txt.replace(rexp, "\u0B94");

	// re-split egaram + ragaram + otru
	mychar = "\u0BCA([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
	rexp = new RegExp(mychar,"g");
	txt = txt.replace(rexp, "\u0BC6\u0BB0$1");

	// re-split Egaaram + ragaram + otru
	mychar = "\u0BCB([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
	var rexp = new RegExp(mychar,"g");
	txt = txt.replace(rexp, "\u0BC7\u0BB0$1");

	// re-split egaram + lagaram + otru
	mychar = "\u0BCC([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
	var rexp = new RegExp(mychar,"g");
	txt = txt.replace(rexp, "\u0BC6\u0BB3$1");

	// re-split ogaram + lagaram + otru
	mychar = "\u0B94([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
	var rexp = new RegExp(mychar,"g");
	txt = txt.replace(rexp, "\u0B92\u0BB3$1");

	// make aagaara otru + otru = ragaram + otru
	mychar = "\u0BBE([\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BCD])";
	rexp = new RegExp(mychar,"g");
	txt = txt.replace(rexp, "\u0BB0$1");

	//join ugaram + ugaram = uugaram
	txt = txt.replace("\u0BC1\u0BC1", "\u0BC2");

	//join ugaram + aagara kaal = uugaram
	txt = txt.replace("\u0BC1\u0BBE", "\u0BC2");

	return txt;
}

function adhiyan_alignTSCII(txt)
{
	txt = adhiyan_alignOrder(txt,166);
	txt = adhiyan_alignOrder(txt,167);
	txt = adhiyan_alignOrder(txt,168);
	txt = adhiyan_alignOrder(txt,338);
	return txt;
}

function adhiyan_alignTAM(txt)
{
	txt = adhiyan_alignOrder(txt,170);
	txt = adhiyan_alignOrder(txt,171);
	txt = adhiyan_alignOrder(txt,172);
	return txt;
}

function adhiyan_alignTAB(txt)
{
	txt = adhiyan_alignOrder(txt,170);
	txt = adhiyan_alignOrder(txt,171);
	txt = adhiyan_alignOrder(txt,172);
	return txt;
}

function adhiyan_alignUNICODE(txt)	{ return txt;	} //dummy
function adhiyan_alignTUNE(txt)	{	return txt;	} //dummy
function adhiyan_alignASC(txt)	{	return txt;	} //dummy
function adhiyan_alignTHANTHI(txt)
{
	txt = adhiyan_alignOrder(txt,217);
	txt = adhiyan_alignOrder(txt,218);
	txt = adhiyan_alignOrder(txt,219);
	return txt;
}
function adhiyan_alignMANI(txt)
{
	txt = adhiyan_alignOrder(txt,249);
	txt = adhiyan_alignOrder(txt,250);
	txt = adhiyan_alignOrder(txt,251);
	return txt;
}

function adhiyan_alignCHENET(txt)
{
	txt = adhiyan_alignOrder(txt,249);
	txt = adhiyan_alignOrder(txt,250);
	txt = adhiyan_alignOrder(txt,251);
	return txt;
}

function adhiyan_alignKAMBAR(txt)
{
	txt = adhiyan_alignOrder(txt,188);
	txt = adhiyan_alignOrder(txt,216);
	txt = adhiyan_alignOrder(txt,231);
	return txt;
}

function adhiyan_alignKALAHAM(txt)
{
	txt = adhiyan_alignOrder(txt,105);
	txt = adhiyan_alignOrder(txt,78);
	txt = adhiyan_alignOrder(txt,110);
	return txt;
}

function adhiyan_alignOrder(txt,charcode)
{
	var mychar = String.fromCharCode(charcode);
	var rexp = new RegExp(mychar+"(.)","g");
	txt = txt.replace(rexp, "$1"+mychar);
	return txt;
}

function adhiyan_checkEng(str)
{
	str = str.trim();
	str2 = str.trim();
	retval = true;
	seedlen = 15;
	if(str.length < seedlen )
		seedlen = str.length

	str = str.substring(0,seedlen)
	//verify first 15 chars are in english
	for(i=0;i<seedlen;i++)
	{
		strcd = str[i].charCodeAt(0);
		retval = retval && ( (strcd <= 122 && strcd >= 32) || strcd == 10 || strcd == 13
					|| strcd == 169 || strcd == 174 || strcd == 153 || strcd == 8220
					|| strcd == 8221 || strcd == 8211);
	}
	if(retval)
	{
		//verify last 15 chars are in english
		seedlen = 15;
		if(str2.length < seedlen )
			seedlen = str2.length
		str = str2.substring(str2.length - seedlen,str2.length)
		for(i=0;i<seedlen;i++)
		{
			strcd = str[i].charCodeAt(0);
			retval = retval && ( (strcd <= 122 && strcd >= 32) || strcd == 10 || strcd == 13
						|| strcd == 169 || strcd == 174 || strcd == 153 || strcd == 8220
						|| strcd == 8221 || strcd == 8211);
		}
	}
	return retval;
}

function adhiyan_getAssocArrayLength(tempArray) {
   var result = 0;
   if(tempArray.length != 0 )
      return tempArray.length;
   for ( tempValue in tempArray ) {
      result++;
   }
   return result;
}