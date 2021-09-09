// global vars
var words = [] , oldwords = "" , anagrams = [] , anag = "" , newanag = "" ; 
var word = "", testword = "", wordlen = "";
var cnt = 0, letcnt = 0, pos = 0, dispno = 0;
var lnlen = 0 ; lncnt = 0 ; ln = "";
var testchar = "", letter = "";
var goodfit = "";
var safety = "";
var emsg = "";
var title = "";
var testdup = "";
var validwrd = "";

// constants 
var fillchar = "*";
var nowords = 11;
var safelim = 30;
var lnwidth = 40;
var noblln = 10;

function errorhandler(msg,url,ln)
{
	alert("Error: "+msg+"\nIn File: "+url+"\nAt Line: "+ln);
	return true;
}
onerror=errorhandler;

function makeAnag()
{
	goodfit = false;
	safety = 0;
	while (goodfit == false)
	{
		pos = (Math.ceil(Math.random() * wordlen))-1;
		testchar = anag.charAt(pos);

		if (testchar == fillchar && pos != letcnt)
		{
			goodfit = true;
			anag = anag.substring(0,pos)+letter+anag.substring(pos+1);											
		}

		safety++;
		if (safety > safelim)
		{
			emsg += "ERROR - CANNOT FIT LETTER "+letter+" IN ANAGRAM FOR WORD "+word+"<br>";
			break;
		}
	}
}

function init()
{

	var panel=document.getElementById("panel");

	panel.innerHTML = "";

	title = prompt("Enter type of words e.g. animals","");
	panel.innerHTML += "These words are all "+title+".<br><br>";

	panel.innerHTML += "<ol>";

	safety = 0;

	for (cnt = 0 ; cnt < nowords ; cnt ++)
	{
		validwrd = false;
		while (validwrd == false)
		{	
			// prompts 
 			switch (cnt)
  			{
  			case 0: pt = "Enter example word";break;
  			case 1: pt = "Enter 1st word";break;
  			case 2: pt = "Enter 2nd word";break;
	  		case 3: pt = "Enter 3rd word";break;
 			default: pt = "Enter "+cnt+"th word";
	  		}

			testword = prompt(pt,"");
			testword = testword.toUpperCase();

			// test for duplicate words
			testdup = oldwords.indexOf(testword);
			if (testdup == -1)
			{
				word = testword;
				words[cnt] = word;
				oldwords = oldwords.concat("+");
				oldwords = oldwords.concat(word);
				validwrd = true;
			}
			else
			{
				alert("word "+testword+" has already been entered");
			}


			safety++;
			if (safety > safelim)
			{
				emsg += "ERROR - CANNOT VALIDATE WORD "+word+"<br>";
				break;
			}

		}
	}

	// Process Words
	for (cnt=0 ; cnt < nowords ; cnt++)
	{
		word = words[cnt];
		wordlen = word.length;

		// format new word
		anag = "";
		for (letcnt=0 ; letcnt < wordlen ; letcnt++)		
		{
			anag = anag.concat(fillchar);								
		}

		// make anagram
		for (letcnt=0 ; letcnt < wordlen ; letcnt++)		
		{
			letter = word.charAt(letcnt);

			switch (letcnt)
			{
			case wordlen-1:
				pos = anag.indexOf(fillchar);
				anag = anag.substring(0,pos)+letter+anag.substring(pos+1);
				break;
			case wordlen-2:
				pos = anag.indexOf(fillchar);
				anag = anag.substring(0,pos)+letter+anag.substring(pos+1);
				break;
			case wordlen-3:
				pos = anag.lastIndexOf(fillchar);
				anag = anag.substring(0,pos)+letter+anag.substring(pos+1);
				break;
			default:			
				makeAnag();
			}		
		}
		
		anagrams[cnt] = anag;			

		// display anagrams
		if (emsg != "")
		{
			panel.innerHTML+="Error!!!!!!!<br>"+emsg+"Please try again.";
		}
		else
		{
			if (cnt == 0)
			{panel.innerHTML += "<li>"+anag+" --- "+word+" (Example)</li><br><br>";}
			else
			{
				if (cnt < 10)
				{dispno = " "+cnt;}
				else
				{dispno = cnt;}

				ln = "<li>"+dispno+" "+anag+"<span> ";
				lnlen = lnwidth - wordlen;
				for (lncnt = 0 ; lncnt < lnlen ; lncnt++)
				{
					ln = ln.concat("_");					
				}
				ln = ln.concat("</span></li><br><br>");
				panel.innerHTML += ln;
				// panel.innerHTML += "  wordlen= "+wordlen+" len= "+lnlen;
			}
		}

	}

	panel.innerHTML += "</ol>";
	panel.innerHTML += "<br><hr>";

	// insert empty lines on question sheet
	for (cnt=0 ; cnt < noblln ; cnt++)
	{
		panel.innerHTML += "<br>";
	}	

	// show answer sheet

	panel.innerHTML += "<u>ANAGRAMS ANSWER SHEET FOR "+title+"</u><br><br>";

	for (cnt=0 ; cnt < nowords ; cnt++)
	{
		word = words[cnt];
		anag = anagrams[cnt];	
		
		if (cnt < 10)
		{dispno = " "+cnt;}
		else
		{dispno = cnt;}

		if (cnt !=0)
		{panel.innerHTML += dispno+" "+anag+" -- "+word+"<br><br>";}

	}



}
window.onload=init