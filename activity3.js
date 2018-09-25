var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var DOMParser = require('xmldom').DOMParser;
var xmlParser = new DOMParser();

//Create HTML request object
var xmlHttp = new XMLHttpRequest();
			
//Open and send XML
xmlHttp.open("GET", "news.xml", true);
xmlHttp.send();

//Open login
function exe(){
	window.open("Activity3_Login.html");
}
			
//Grab xml response and store into an object
var xmlDoc = xmlParser.parseFromString(data, "news/xml");

function validate(){
	var username = document.getElementById("uname").value;
	var password = document.getElementById("pswd").value;
	if ( username == "elayman1" && password == "ser421"){
		window.location = "Activity3_Features.html";
	} else {
		window.location = "Activity3_LoginFailed.html";
	}
}
			
function createTable(){
	//Create HTML table
	var table="<tr><th>Title</th><th>Author</th><th>Date</th></tr>";
			
	//Array that holds all the article node in a xml
	var x = xmlDoc.getElementsByTagName("ARTICLE");
			
	//Display each xml child node of an article node in a table
	for(var i = 0; i < x.length; i++){
		var title = (x[i].getElementsByTagName("TITLE")[0].childNode[0].nodeValue);
		table += 
			//Makes titles into hyperlinks to Activity3_StoryDisplayTemplate
			"<tr><td style=\"cursor:pointer\" onclick=\"location.href='Activity3_StoryDisplayTemplate.html'\">" +
			title + "</td><td>" +
				(x[i].getElementsByTagName("AUTHOR")[0].childNode[0].nodeValue) + "</td><td>" +
				(x[i].getElementsByTagName("DATE")[0].childNode[0].nodeValue) + "</td></tr>";
	}
	//Display table in HTML
	document.getElementById("newsStories").innerHTML = table;
}	

function cancel(){
	alert ("Your story has successfully been cancelled.");
	window.location = "Activity3_Features.html";
}

function save(){
	alert ("Your story has successfully been saved.");
	window.location = "Activity3_Features.html";
}

function logout(){
	alert ("You have been successfully logged out.");
	window.location = "Activity3_Login.html";
}

console.log(exe());