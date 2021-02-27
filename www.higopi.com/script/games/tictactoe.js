<?php ob_start("ob_gzhandler"); ?>
ticArr = new Array();
gridsize= 5;
expertmode = true;
for(i=0;i<gridsize; i++)
{
	ticArr[i] = new Array();
	for(j=0;j<gridsize;j++)
		ticArr[i][j] = 0;
}
var gameOver = false;
var gameStarted = false;
function displayGrid()
{
	txt = '<br><br><form>Select the Mode:<select id=mode onchange="setMode(this)"><option value="'
			+'beginner">Beginner<option value="expert" selected>Expert</select> Select Grid Size '
			+'<select id=gridsize onchange="setGridSize(this)"><option value="3">3<option'
			+' value="4">4<option value="5" selected>5<option value="6">6<option value="7">7<option'
			+' value="8">8<option value="9">9</select><br>'
	txt += '<center><table align="center" border="0"><tr><td>'
	txt += '<table align="center" border="0" width="'+(gridsize*40 + 20)
			+'" height="'+(gridsize*40 + 20)+'" class=convbtn><tr align="center"><td></td>'
	for(i=0;i<gridsize; i++)
		txt += '<td height="20">C'+(i+1)+'</td>';
	txt += '</tr>'
	for(i=0;i<gridsize; i++)
	{
		txt += '<tr><td width="20">R'+(i+1)+'</td>';
		for(j=0;j<gridsize;j++)
			txt += '<td width="40" height="40" align="center" nowrap="nowrap"' +
					' class="selconvbtn" onclick="mrkBox(this)" id="c'+i+''+j+'">';
		txt += '</tr>';
	}
	txt += '</table></td><td> &nbsp; </td><td>';
	txt += 'Moves:<br><select id="moves" size="15" style="width:250px;" onclick="mrkBox()"></select>';
	txt += '</td></tr></table><</center></form>';
	document.getElementById("playspace").innerHTML = txt;
	mrkBox();
}

function setGridSize(selobj)
{
	if(gameStarted && !gameOver )
	{
		c=confirm('Game Not Over! Start a new game?');
		if(!c)
			return;
	}
	gridsize= selobj.options[selobj.selectedIndex].value;
	ticArr = new Array();
	for(i=0;i<gridsize; i++)
	{
		ticArr[i] = new Array();
		for(j=0;j<gridsize;j++)
			ticArr[i][j] = 0;
	}
	displayGrid();
	document.getElementById("gridsize").selectedIndex = gridsize - 3;
}

function setMode(mobj)
{
	if(mobj.options[mobj.selectedIndex].value == "beginner")
		expertmode = false;
	else
		expertmode = true;
}

function mrkBox(cellobj)
{
	mrkid = gridsize*gridsize +1;
	if(gameOver)
	{
		c=confirm('Game Over! Start a new game?');
		if(c)
		{
			ticArr = new Array();
			for(i=0;i<gridsize; i++)
			{
				ticArr[i] = new Array();
				for(j=0;j<gridsize;j++)
					ticArr[i][j] = 0;
			}
			movesDisp = document.getElementById('moves');
			while(movesDisp.options.length != 0)
				movesDisp.options[movesDisp.options.length -1] = null;
			gameOver = false;
			gameStarted = false;
			fillBoxes();
			return;
		}
		else
			return;
	}

	if(cellobj != null)
	{
		row = cellobj.id.substring(1,2);
		col = cellobj.id.substring(2,3);
		if(ticArr[row][col] != 0)
	  		alert("Already marked");
	  	else
	  	{
	  		ticArr[row][col] =	1;
	  		row++;col++;
	  		movesDisp = document.getElementById('moves');
	  		movesDisp.options[movesDisp.options.length] = new Option('You Marked: R'+row+'-C'+col);
	  		movesDisp.options[movesDisp.options.length -1 ].selected =true;
	  		checkWin();
	  		playComp();
  		}
  		gameStarted = true;
	}
	fillBoxes();
}

function fillBoxes()
{
	for(i=0;i<gridsize; i++)
		for(j=0;j<gridsize;j++)
			if(ticArr[i][j] == 1)
				document.getElementById('c'+i+j).innerHTML = '<span style="font-size:16pt;color:white">'
														+'X</span>';
			else if(ticArr[i][j] == 2)
				document.getElementById('c'+i+j).innerHTML = '<span style="font-size:16pt;color:white">'
														+'O</span>';
			else
				document.getElementById('c'+i+j).innerHTML = '<span style="font-size:16pt;color:#0e88af;">'
														+'X</span>';
}

function playComp()
{
	if(gameOver)
		return;
	movesDisp = document.getElementById('moves');
	//Beginner mode
	if(!expertmode)
	{
		//Make a random move
		randrow = Math.floor(Math.random()*gridsize);
		randcol = Math.floor(Math.random()*gridsize);
		while( ticArr[randrow][randcol] != 0 )
		{
			randrow = Math.floor(Math.random()*gridsize);
			randcol = Math.floor(Math.random()*gridsize);
		}
		crow = randrow;
		ccol = randcol;
	}
	else
	{
		//If middle box is available Grab it!
		mbxid = Math.floor(gridsize/2);
	    if( ticArr[mbxid][mbxid] == 0)
	    {
			crow = mbxid;
			ccol = mbxid;
		}
		else
		{
			crow = gridsize;
			ccol = gridsize;
			//Make a winning move!
			windcombtwos = new Array();
			for(i=0;i<gridsize;i++)
			{
				windcombtwos[i] = ""
				for(j=0;j<i;j++)
					windcombtwos[i] += "2,"
				windcombtwos[i] += "0,"
				for(j=i+1;j<gridsize;j++)
					windcombtwos[i] += "2,"
				windcombtwos[i] = windcombtwos[i].substring(0,windcombtwos[i].length - 1)
			}
			for(i=0;i<gridsize;i++)
				for(j=0;j<gridsize;j++)
					if(ticArr[i] == windcombtwos[j])
					{
						crow = i;
						ccol = j;
					}
			for(i=0;i<gridsize;i++)
				for(j=0;j<gridsize; j++)
				{
					wincomb = ticArr[0][j];
					for(k=1;k<gridsize; k++)
						wincomb += ","+ ticArr[k][j];
					if(wincomb == windcombtwos[i])
					{
						crow = i;
						ccol = j;
					}
			}
			// Make a protecting move!
			if(crow == gridsize && ccol == gridsize)
			{
				//Make a winning move!
				windcombones = new Array();
				for(i=0;i<gridsize;i++)
				{
					windcombones[i] = ""
					for(j=0;j<i;j++)
						windcombones[i] += "1,"
					windcombones[i] += "0,"
					for(j=i+1;j<gridsize;j++)
						windcombones[i] += "1,"
					windcombones[i] = windcombones[i].substring(0,windcombones[i].length - 1)
				}
				for(i=0;i<gridsize;i++)
					for(j=0;j<gridsize;j++)
						if(ticArr[i] == windcombones[j])
						{
							crow = i;
							ccol = j;
						}
				for(i=0;i<gridsize;i++)
					for(j=0;j<gridsize; j++)
					{
						wincomb = ticArr[0][j];
						for(k=1;k<gridsize; k++)
							wincomb += ","+ ticArr[k][j];
						if(wincomb == windcombones[i])
						{
							crow = i;
							ccol = j;
						}
				}

				//Grab the corners
				if(crow == gridsize && ccol == gridsize)
				{
					if(ticArr[0][0] == 0)	{	crow = 0; ccol = 0; }
					else if(ticArr[0][gridsize-1] == 0)	{	crow = 0; ccol = gridsize-1; }
					else if(ticArr[gridsize-1][0] == 0)	{	crow = gridsize-1; ccol = 0; }
					else if(ticArr[gridsize-1][gridsize-1] == 0)	{	crow = gridsize-1; ccol = gridsize-1; }
					//Make a Random move
					else
					{
						randrow = Math.floor(Math.random()*gridsize);
						randcol = Math.floor(Math.random()*gridsize);
						while( ticArr[randrow][randcol] != 0 )
						{
							randrow = Math.floor(Math.random()*gridsize);
							randcol = Math.floor(Math.random()*gridsize);
						}
						crow = randrow;
						ccol = randcol;
					}
				}
			}
		}
	}
	ticArr[crow][ccol] = 2;
	crow++;ccol++
	movesDisp.options[movesDisp.options.length] = new Option('Computer Marked: R'+crow+'-C'+ccol);
	movesDisp.options[movesDisp.options.length -1 ].selected =true;
	checkWin();
}

function checkWin()
{
	movesDisp = document.getElementById('moves');
	winner = 0;
	isComplete = true;
	for(i=0;i<gridsize; i++)
		for(j=0;j<gridsize;j++)
			if(ticArr[i][j] == 0)
				isComplete = false;
	var winones = "1";
	var wintwos	= "2";
	for(i=0;i<gridsize-1; i++)
	{
		winones += ",1";
		wintwos	+= ",2";
	}
	//check horizontal
	for(i=0;i<gridsize; i++)
	{
		if(ticArr[i] == winones)
			winner = 1;
		if(ticArr[i] == wintwos)
			winner = 2;
	}
	//check vertical
	for(j=0;j<gridsize; j++)
	{
		wincomb = ticArr[0][j];
		for(i=1;i<gridsize; i++)
			wincomb += ","+ ticArr[i][j];
		if(wincomb == winones)
			winner = 1;
		if(wincomb == wintwos)
			winner = 2;
	}
	//check diagonal
	wincomb = ticArr[0][0];
	for(i=1;i<gridsize; i++)
		wincomb += ","+ ticArr[i][i];
	if(wincomb == winones)
		winner = 1;
	if(wincomb == wintwos)
		winner = 2;
	//check reverse diagonal
		wincomb = ticArr[0][gridsize-1];
	for(i=1;i<gridsize; i++)
		wincomb += ","+ ticArr[i][gridsize-1-i];
	if(wincomb == winones)
		winner = 1;
	if(wincomb == wintwos)
		winner = 2;

	clk = " Click for new game.";
	if(winner == 1)
		movesDisp.options[movesDisp.options.length] = new Option('YOU HAVE WON!'+clk);
	else if(winner == 2)
		movesDisp.options[movesDisp.options.length] = new Option('YOU HAVE LOST!'+clk);
	else if(isComplete)
		movesDisp.options[movesDisp.options.length] = new Option('ITS A DRAW!'+clk);
	if(winner != 0 || isComplete)
		gameOver = true;
	movesDisp.options[movesDisp.options.length -1 ].selected =true;
}
