let fs = require('fs');
let xml2js = require('xml2js');
let parseString = require('xml2js').parseString;

var newsCollection;
var xmlBuilder;
var xml;


function printCollection(){
	fs.readFile('./news.xml', 'utf-8', function (err, xmlDoc){
		if(err){ console.log("Failed to load XML."); }
		
		parseString(xmlDoc, function(err, result){
			if(err) { console.log("Failed to parse xml."); }
			
			newsCollection = result;
		
			var counter = 1;
		
			for(var news in newsCollection){
				for(var num in newsCollection[news]["ARTICLE"]){
					console.log("Article: " + (counter));
					console.log("Title: " + newsCollection.NEWS.ARTICLE[num].TITLE);
					console.log("Author: " + newsCollection.NEWS.ARTICLE[num].AUTHOR);
					console.log("Date: " + newsCollection.NEWS.ARTICLE[num].DATE);
					console.log("Public: " + newsCollection.NEWS.ARTICLE[num].PUBLIC);
					console.log("Content: " + newsCollection.NEWS.ARTICLE[num].CONTENT);
					counter++;
				}
			}
		});
	});
}
/*
//Create a news story to the persistent store
function createNewsStory(){
	
	//Read file
	fs.readFile('./news.xml', 'utf-8', function(err, data){
		//Output error
		if(err) { console.log("Failed to load XML."); }
		
		//Parse xml file
		var xmlDoc = xmlParser.parseFromString(data, "news/xml");
		
		
		//Create new news story node
		var newArticle = xmlDoc.createElement("ARTICLE");
		
		var newTitle = xmlDoc.createElement("TITLE");
		newTitle.appendChild(xmlDoc.responseXML.createTextNode("New"));
		var newAuthor = xmlDoc.createElement("AUTHOR");
		newAuthor.appendChild(xmlDoc.responseXML.createTextNode("New"));
		var newDate = xmlDoc.createElement("DATE");
		newDate.appendChild(xmlDoc.responseXML.createTextNode("New"));
		var newPublic = xmlDoc.createElement("PUBLIC");
		newPublic.appendChild(xmlDoc.responseXML.createTextNode("New"));
		var newContent = xmlDoc.createElement("CONTENT");
		newContent.appendChild(xmlDoc.responseXML.createTextNode("New"));
		
		newArticle.appendChild(newTitle);
		newArticle.appendChild(newAuthor);
		newArticle.appendChild(newDate);
		newArticle.appendChild(newPublic);
		newArticle.appendChild(newContent);
		
		//Add new Article to xml
		xmlDoc.getElementsByTagName("NEWS")[0].appendChild(newArticle);
		
		//Replace Values
		//x = xmlDoc.getElementsByTagName("ARTICLE")[0].childNodes[0];
		//x.replaceData("New","New","New","New","New");
		
		console.log("New news story added");
	});
}
*/

//Update headlines of existing news storys
function updateHeadline(title){
	
	//Read file
	fs.readFile('./news.xml', 'utf-8', function(err, xmlDoc){
		if(err){ console.log("Failed to load XML."); }
		
		parseString(xmlDoc, function(err, result){
			if(err) { console.log("Failed to parse xml."); }
			
			newsCollection = result;
		
			for(var news in newsCollection){
				for(var num in newsCollection[news]["ARTICLE"]){
					if(newsCollection.NEWS.ARTICLE[num].TITLE == title){
						
						newsCollection.NEWS.ARTICLE[num].TITLE = "Updated title.";
						
						xmlBuilder = new xml2js.Builder();
						xml = xmlBuilder.buildObject(newsCollection);
						
						fs.writeFile('./news.xml', xml, function(err, xmlDoc){
							if(err){ console.log("Failed to write xml."); }
							
							console.log("Successfully updated news story title.");
						});
						
						break;
					}
				}
			}
		});
	});
}	

//Change content of existing storys
function changeContent(title){
	
	//Read file
	fs.readFile('./news.xml', 'utf-8', function(err, xmlDoc){
		if(err){ console.log("Failed to load XML."); }
		
		parseString(xmlDoc, function(err, result){
			if(err) { console.log("Failed to parse xml."); }
			
			newsCollection = result;
		
			for(var news in newsCollection){
				for(var num in newsCollection[news]["ARTICLE"]){
					if(newsCollection.NEWS.ARTICLE[num].TITLE == title){
						
						newsCollection.NEWS.ARTICLE[num].CONTENT = "Updated content.";
						
						xmlBuilder = new xml2js.Builder();
						xml = xmlBuilder.buildObject(newsCollection);
						
						fs.writeFile('./news.xml', xml, function(err, xmlDoc){
							if(err){ console.log("Failed to write xml."); }
							
							console.log("Successfully updated news story content.");
						});
						
						break;
					}
				}
			}
		});
	});
}	

//Delete existing story
function deleteNewsStory(title){
	
	//Read file
	fs.readFile('./news.xml', 'utf-8', function(err, xmlDoc){
		if(err){ console.log("Failed to load XML."); }
		
		parseString(xmlDoc, function(err, result){
			if(err) { console.log("Failed to parse xml."); }
			
			newsCollection = result;
		
			for(var news in newsCollection){
				for(var num in newsCollection[news]["ARTICLE"]){
					if(newsCollection.NEWS.ARTICLE[num].TITLE == title){
						
						newsCollection.NEWS.ARTICLE[num].TITLE = "Updated title";
						
						xmlBuilder = new xml2js.Builder();
						xml = xmlBuilder.buildObject(newsCollection);
						
						fs.writeFile('./news.xml', xml, function(err, xmlDoc){
							if(err){ console.log("Failed to write xml."); }
							
							console.log("Successfully updated news story title.");
						});
						
						break;
					}
				}
			}
		});
	});
}
/*
//Return a collection of news story obj based on filter
function filteredCollection(){
	
}
*/

//console.log(createNewsStory());
//console.log(deleteNewsStory("Mark Mulder ends 2015 comeback bid"));
//console.log(updateHeadline("Angels sign Stewart, Herrmann to minor-league deals"));
//console.log(changeContent("Angels, Garrett Richards settle on $3.2 million for 2015"));
//console.log(printCollection());
//console.log(filteredCollection());
