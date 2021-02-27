<?php ob_start("ob_gzhandler"); ?>
var asc = new Array("dummy");
var ascpad = new Array()
ascpad[353] = 154;  //š
ascpad[376] = 159;  //Ÿ
ascpad[710] = 136;  //ˆ
ascpad[8224] = 134;  //†
ascpad[8225] = 135;  //‡
ascpad[8226] = 149;  //•
ascpad[8230] = 133; //…
ascpad[8240] = 137;  //‰
ascpad[8364] = 128;  //€
ascpad[8482] = 153;//™

ascpad[352] = 138;  //Š
ascpad[8217] = 146; //’
ascpad[381] = 142; //Ž
ascpad[8218] = 130; //‚
ascpad[8249] = 139; //‹
ascpad[8220] = 147;  //“
ascpad[382] = 158; //ž
ascpad[402] = 131; //ƒ
ascpad[8222] = 132; //„

function adhiyan_asc2uni(istr)
{

    var retstr = "";
    var i = 0;
    while( i < istr.length)
    {
        if(istr.charCodeAt(i) <128 || istr.charCodeAt(i) > 255)
        {
            retstr += String.fromCharCode(istr.charCodeAt(i));
            i++;
        }
        else
        {
            var chr = 0;
            var adj = 2816;
            i++;
            if(istr.charCodeAt(i) == 175)
                adj += 64;
            i++;
			chr += istr.charCodeAt(i);
	        if(chr > 255)
	        {
	        	if(ascpad[chr] == null)
    	        	retstr += String.fromCharCode(chr);
    	        else
    	           	retstr += String.fromCharCode(ascpad[chr]+adj);
	        }
			else
            	retstr += String.fromCharCode(chr+adj);
            i++;
        }
    }
    return retstr;
}
