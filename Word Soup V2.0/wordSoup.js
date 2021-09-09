// Word Soup V2.0 
// By Paul Clark
// add check for free space

// global vars
var soup = [] , soupline = "" , newsoupline = "";
var words = [] , word = "", wordlen = "", letter = "";
var cnt = 0 ; xcnt = 0, ycnt = 0, lncnt = 0, letcnt = 0;
var startx = 0, starty = 0, pos = 0, pos2 = 0 , testpos = 0 , endx = 0, endy = 0 ;
var al = "" , testchar = "", newchar = "";
var safety = "";
var multi = "", multi2 = "";
var goodfit = "", goodXWord = "", goodlet = "" ;
var lead = "" , trail = "";
var title = "";
var height = 0 , width = 0;
var alno = 0;
var dupwords = [] , dupword = "" , dupcnt = 0 , nodupwds = 0 , dupfound = "";
var nowords = 0;

// constants
var fillchar = "!";
var als = ["h","v","d","d2"];


function errorhandler(msg,url,ln)
{
	alert("Error: "+msg+"\nIn File: "+url+"\nAt Line: "+ln);
	return true;
}
onerror=errorhandler;

function startSoup()
{
	for (xcnt=0 ; xcnt < width ; xcnt++)
	{
		soupline = soupline.concat(fillchar);			
	}


	for (ycnt=0 ; ycnt < height ; ycnt++)
	{
		soup[ycnt] = soupline;
	}		
}

function getAlignment()
{

  	switch (al)
  	{
  	case "h" : al = "v";break;
  	case "v" : al = "d";break;
  	case "d" : al = "d2";break;
  	case "d2" : al = "h";break;
  	default : al = "h";
  	}

//	alno = (Math.ceil(Math.random() * als.length))-1;
//	al = als[alno]
// panel.innerHTML += "<br>word: "+word+"<br>alno= "+alno+"<br>al= "+al; 
}

function xWord()
{
	goodXWord = false;
	lncnt = 0;
	while (goodXWord == false)		
	{
		soupline = soup[lncnt];

		// look at letters in word and make crossword
		goodlet = false;
		letcnt = 0 ;

		while (goodlet == false)
		{

			letter = word.charAt(letcnt);
			testpos = soupline.indexOf(letter);
			if (testpos !== -1)
			{

				// Calculate x and y coordinates
				switch (al)
				{
				case "v":
					startx = testpos;
					starty = lncnt - letcnt;
					endx = startx;
					endy = starty + wordlen - 1;
					break;
				case "h":
					startx = testpos - letcnt;
					starty = lncnt;
					endx = startx + wordlen - 1;
					endy = starty;
					break;
				case "d":
					startx = testpos - letcnt;
					starty = lncnt - letcnt;
					endx = startx + wordlen - 1;
					endy = starty + wordlen - 1;
					break;
				case "d2":
					startx = testpos - letcnt;
					starty = lncnt + letcnt;
					endx = startx + wordlen + 1;
					endy = starty - wordlen + 1;
					break;
				default:
					startx = testpos - letcnt;
					starty = lncnt;	
					endx = startx + wordlen - 1;
					endy = starty;	
				}


				// check xword fits in grid
				if (startx >= 0 && starty >= 0 && endx < width && endy < height && endx > 0 && endy > 0)
				{
					checkWord();
					if (goodfit == true)
					{					
						goodlet = true;
						goodXWord = true;

					}
				}
					
			}

			letcnt++

			if (letcnt == wordlen)
			{goodlet = true;}


		}
	

		lncnt++

		if (lncnt == height)
		{goodXWord = true;}

	}	

}

function fitWord()
{

	switch (al)
	{
	case "v":
		multi = height - wordlen;	
		startx = (Math.ceil(Math.random() * width))-1;
		starty = (Math.ceil(Math.random() * multi))-1;
		break;
	case "h":
		multi = width - wordlen;	
		startx = (Math.ceil(Math.random() * multi))-1;
		starty = (Math.ceil(Math.random() * height))-1;
		break;
	case "d":
		multi = height - wordlen;	
		multi2 = width - wordlen;	
		startx = (Math.ceil(Math.random() * multi))-1;
		starty = (Math.ceil(Math.random() * multi2))-1;
		break;
	case "d2":
		multi = height - wordlen;	
		multi2 = width - wordlen;	
		startx = (Math.ceil(Math.random() * multi))-1;
		starty = (Math.ceil(Math.random() * multi2))+wordlen-1;
		break;
	default:
		multi = height - wordlen;	
		startx = (Math.ceil(Math.random() * width))-1;
		starty = (Math.ceil(Math.random() * multi))-1;
	}	
}


function checkWord()
{
	goodfit = true;	

	switch (al)
	{
	case "v":
		for (ycnt = 0 ; ycnt < wordlen ; ycnt++)		
		{
			pos = starty + ycnt;

			testchar = soup[pos].charAt(startx);

			if (testchar != fillchar && testchar != word.charAt(ycnt)) 
			{goodfit = false;}

		}
		break;
	case "h":
		for (xcnt = 0 ; xcnt < wordlen ; xcnt++)		
		{
			pos = startx + xcnt;

			testchar = soup[starty].charAt(pos);

			if (testchar != fillchar && testchar != word.charAt(ycnt)) 
			{goodfit = false;}
		}
		break;
	case "d":
		for (ycnt = 0 ; ycnt < wordlen ; ycnt++)		
		{
			pos = starty + ycnt;
			pos2 = startx + ycnt;
			testchar = soup[pos].charAt(pos2);

			if (testchar != fillchar && testchar != word.charAt(ycnt)) 
			{goodfit = false;}
		}
		break;
	case "d2":
		for (ycnt = 0 ; ycnt < wordlen ; ycnt++)		
		{
			pos = starty - ycnt;
			pos2 = startx + ycnt;
			testchar = soup[pos].charAt(pos2);

			if (testchar != fillchar && testchar != word.charAt(ycnt)) 
			{goodfit = false;}
		}
		break;

	default:
		for (xcnt = 0 ; xcnt < wordlen ; xcnt++)		
		{
			pos = startx + xcnt;
			testchar = soup[starty].charAt(pos);

			if (testchar != fillchar && testchar != word.charAt(ycnt)) 
			{goodfit = false;}

		}					
	}

}

function addWord()
{
	switch (al)
	{
	case "v":
		for (ycnt = 0 ; ycnt < wordlen ; ycnt++)		
		{
			pos = ycnt + starty;
			soupline = soup[pos];
			newchar = word.charAt(ycnt);

			lead = soupline.substring(0,startx);
			trail = soupline.substring(startx+1);

			newsoupline = lead+newchar+trail;
			soup[pos] = newsoupline;
		
		}
		break;
	case "h":
		soupline = soup[starty];
		newsoupline = soupline.substring(0,startx)+word+soupline.substring(startx+wordlen);
		soup[starty] = newsoupline;		
		break;
	case "d":
		for (ycnt = 0 ; ycnt < wordlen ; ycnt++)		
		{
			pos = starty + ycnt;
			pos2 = startx + ycnt;
			soupline = soup[pos];
			newchar = word.charAt(ycnt);

			lead = soupline.substring(0,pos2);
			trail = soupline.substring(pos2+1);

			newsoupline = lead+newchar+trail;
			soup[pos] = newsoupline;
		}
		break;
	case "d2":
		for (ycnt = 0 ; ycnt < wordlen ; ycnt++)		
		{
			pos = starty - ycnt;
			pos2 = startx + ycnt;
			soupline = soup[pos];
			newchar = word.charAt(ycnt);

			lead = soupline.substring(0,pos2);
			trail = soupline.substring(pos2+1);

			newsoupline = lead+newchar+trail;
			soup[pos] = newsoupline;
		}
		break;
	default:
		soupline = soup[starty];
		newsoupline = soupline.substring(0,startx)+word+soupline.substring(startx+wordlen);
		soup[starty] = newsoupline;		
		break;
	}

}

function getNewchar()
{
	var newcode = "";		
	newcode = 65 + Math.ceil(Math.random() * 25);
	newchar = String.fromCharCode(newcode);
}

function fillGaps()
{

		for (ycnt = 0 ; ycnt < height ; ycnt++)
		{
			soupline = soup[ycnt];				
			newsoupline = soupline;
			
			for (xcnt = 0 ; xcnt < width ; xcnt++)
			{
				testchar = soupline.charAt(startx);

				if (testchar = fillchar) 
				{
					getNewchar();

					newsoupline = newsoupline.replace(fillchar,newchar);

				}
				
			}			

			soup[ycnt] = newsoupline;			
		}


}


function init()
{

	var panel=document.getElementById("panel");

	panel.innerHTML = "";

	// input of parameters

  	title = prompt("Enter title, e.g animal names, adjectives","");

  	var validnowds = false;
  	while (validnowds == false)
  	{
  		nowords = prompt("Enter number of words - maximum 50","");
  		if (nowords > 0 && nowords < 50)
  		{validnowds = true;}
  		else
  		{alert("Incorrect number of words - please retype");}
  
  	}
  	panel.innerHTML += "There are "+nowords+" "+title+"<br>hidden in the grid.<br><br>";

	var validht = false;
	while (validht == false)
	{
		height = prompt("Enter grid height - maximum 30","20");
		if (height > 0 && height < 31)
		{validht = true;}
		else
		{alert("Incorrect height - please retype");}
	}

	var validwd = false;
	while (validwd == false)
	{
		width = prompt("Enter grid width - maximum 30","20");
		if (width > 0 && width < 31)
		{validwd = true;}
		else
		{alert("Incorrect width - please retype");}
	}


	startSoup();

	// Input of Words
	
	cnt = 0;
	while (cnt < nowords)
	{
		word = prompt("Enter Word no. "+(cnt+1)+" of "+nowords,"");

		word = word.toUpperCase();
		wordlen = word.length;

		dupfound = false;
		nodupwds = dupwords.length;
		for (dupcnt=0 ; dupcnt < nodupwds ; dupcnt++)
		{
			dupword = dupwords[dupcnt];
			if (word == dupword)
			{dupfound = true;}
		}

		if (dupfound == true)
		{
			alert("Word "+word+" has already been entered. Use new word");
		}
		else
		{
			words[cnt] = word;
			dupwords[cnt] = word;
			cnt++
		}
	}

	// Process Words
	al = "d";
	for (cnt=0 ; cnt < nowords ; cnt++)
	{
		word = words[cnt];
		wordlen = word.length;

		if (cnt == 0)
		{
			startx = 0;
			starty = 0;
			al = "h";
			addWord();
		}
		else
		{

			safety = 0;
			goodfit = false;
			getAlignment();
			xWord();
			while (goodfit == false)
			{		

				fitWord();
				checkWord();
			
				safety++;
				if (safety > 12)
				{
					panel.innerHTML+="<br>ERROR - CANNOT FIT WORD "+word+" IN GRID";
					break;
				}
			}

			if (goodfit == true)
			{
				addWord();
			}
		}
// panel.innerHTML+="<br>word= "+word+"<br>"+soup.join("<br>");
	}


	fillGaps();	

	// display soup
	panel.innerHTML+="<br>"+soup.join("<br>");

	
}
window.onload=init