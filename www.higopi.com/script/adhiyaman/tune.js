<?php ob_start("ob_gzhandler"); ?>
var tun = getTuneMap();
tun[58253] = "\u0BB8\u0BCD\u0BB0\u0B88";
tun[57869] = "\u0B83";

var uni = getUniTuneMap();

function getUniTuneMap()
{
	var retArr = new Array();
   retArr["\u0BB8\u0BCD\u0BB0\u0BC0"] = String.fromCharCode(58253);
   retArr["\u0B83"] = String.fromCharCode(57869);
	var startidx = 57857;
   for(var i=1;i<12; i++)
   {
		var idx = startidx + (16*24) + i;
		retArr[tun[idx]] = String.fromCharCode(idx);
	}
   for(var i=1;i<12; i++)
      for(var j=0;j<24; j++)
   {
		var idx = startidx + (16*j) + i;
		retArr[tun[idx]] = String.fromCharCode(idx);
	}
   for(var i=0;i<2; i++)
      for(var j=0;j<24; j++)
   {
		var idx = startidx + (16*j) + i - 1;
		retArr[tun[idx]] = String.fromCharCode(idx);
	}
	return retArr;
}


function getTuneMap()
{
	var retArr = new Array();
	var startidx = 57857;
	for(var i=0;i<491; i++)
	{
		var idx = startidx+i;
		retArr[idx] = getUniStr(startidx+i);
	}
	return retArr;
}

function getUniStr(num)
{
	var retStr = "";
	var uyirmeiarr = new Array("\u0BCD","\u200C","\u0BBE","\u0BBF","\u0BC0","\u0BC1","\u0BC2",
				"\u0BC6","\u0BC7","\u0BC8","\u0BCA","\u0BCB","\u0BCC");
	var meiarr = new Array("\u200C","\u0B95","\u0B99","\u0B9A","\u0B9E","\u0B9F","\u0BA3","\u0BA4",
				"\u0BA8","\u0BAA","\u0BAE","\u0BAF","\u0BB0","\u0BB2","\u0BB5","\u0BB4",
				"\u0BB3","\u0BB1","\u0BA9","\u0B9C","\u0BB7","\u0BB7","\u0BB8","\u0BB9",
				"\u0B95\u0BCD\u0BB7");
	var uyirarr = new Array("\u200C","\u0B85","\u0B86","\u0B87","\u0B88","\u0B89","\u0B8A","\u0B8E",
				"\u0B8F","\u0B90","\u0B92","\u0B93","\u0B94","\u0B83");
	var d1 = num % 16;
	if(num <= 57869 && typeof uyirarr[d1] != "undefined")
		retStr = uyirarr[d1];
	else if(typeof uyirmeiarr[d1] != "undefined")
		retStr = uyirmeiarr[d1];
	var d2 = Math.floor(num /16) - 3616;
	if( retStr != "" && typeof meiarr[d2] != "undefined")
		retStr = meiarr[d2] + retStr;
	retStr = retStr.replace("\u200C","");
	return retStr;
}