let fs = require('fs');
let xml2js = require('xml2js');
let parseString = require('xml2js').parseString;

var newsCollection;
var xmlBuilder;
var xml;


function printCollection(){
	//Read xml file
	fs.readFile('./news.xml', 'utf-8', function (err, xmlDoc){
		if(err){ console.log("Failed to load XML."); }
		//Parse xml file
		parseString(xmlDoc, function(err, result){
			if(err) { console.log("Failed to parse xml."); }
			//Store parsed xml into json obj called newsCollection
			newsCollection = result;
			//Counter
			var counter = 1;
			//Iterate through newsCollection and print
			for(var news in newsCollection){
				for(var num in newsCollection[news]["ARTICLE"]){
					console.log("Article: " + (counter));
					console.log(newsCollection.NEWS.ARTICLE[num]);
					console.log(newsCollection.NEWS);
					console.log();
					counter++;
				}
			}
		});
	});
}

//Create a news story to the persistent store
function createNewsStory(title, story){
	//Read file
	fs.readFile('./news.xml', 'utf-8', function(err, xmlDoc){
		if(err){ console.log("Failed to load XML."); }
		//Parse xml file
		parseString(xmlDoc, function(err, result){
			if(err) { console.log("Failed to parse xml."); }
			//Store parsed xml into json obj called newsCollection
			newsCollection = result;
			//Iterate through newsCollection and create new story
			for(var news in newsCollection){
				for(var num in newsCollection[news]["ARTICLE"]){
					if(newsCollection.NEWS.ARTICLE[num].TITLE != title && story == null){	
						//Push to json object
						newsCollection.NEWS.ARTICLE.push({
							TITLE: title,
							AUTHOR: "Default Author",
							DATE: "00-00-0000",
							PUBLIC: "T",
							CONTENT: "Default content"
						});
						//Build xml
						xmlBuilder = new xml2js.Builder();
						xml = xmlBuilder.buildObject(newsCollection);
						//Write file
						fs.writeFile('./news.xml', xml, function(err, xmlDoc){
							if(err){ console.log("Failed to write xml."); }
							console.log("Successfully updated news story title.");
						});
						break;
					} else if(newsCollection.NEWS.ARTICLE[num].TITLE != title && story != null){
						//Set values of story
						var newTitle = story.TITLE;
						var newAuthor = story.AUTHOR;
						var newDate = story.DATE;
						var newPublic = story.PUBLIC;
						var newContent = story.CONTENT;
						//Push to json object
						newsCollection.NEWS.ARTICLE.push({
							TITLE: newTitle,
							AUTHOR: newAuthor,
							DATE: newDate,
							PUBLIC: newPublic,
							CONTENT: newContent
						});
						//Build xml
						xmlBuilder = new xml2js.Builder();
						xml = xmlBuilder.buildObject(newsCollection);
						//Write file
						fs.writeFile('./news.xml', xml, function(err, xmlDoc){
							if(err){ console.log("Failed to write xml."); }
							console.log("Successfully updated news story title.");
						});
						break;
					} else {
						console.log("The news story you tried to create already exists.");
					}
				}
			}
		});
	});
}	


//Update headlines of existing news storys
function updateHeadline(title){
	
	//Read file
	fs.readFile('./news.xml', 'utf-8', function(err, xmlDoc){
		if(err){ console.log("Failed to load XML."); }
		//Parse xml file
		parseString(xmlDoc, function(err, result){
			if(err) { console.log("Failed to parse xml."); }
			//Store parsed xml into json obj called newsCollection
			newsCollection = result;
			//Iterate through newsCollection and update title
			for(var news in newsCollection){
				for(var num in newsCollection[news]["ARTICLE"]){
					if(newsCollection.NEWS.ARTICLE[num].TITLE == title){
						//Change title
						newsCollection.NEWS.ARTICLE[num].TITLE = "Updated title.";
						//Build xml
						xmlBuilder = new xml2js.Builder();
						xml = xmlBuilder.buildObject(newsCollection);
						//Write file
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
		//Parse xml file
		parseString(xmlDoc, function(err, result){
			if(err) { console.log("Failed to parse xml."); }
			//Store parsed xml into json obj called newsCollection
			newsCollection = result;
			//Iterate through newsCollection and update content
			for(var news in newsCollection){
				for(var num in newsCollection[news]["ARTICLE"]){
					if(newsCollection.NEWS.ARTICLE[num].TITLE == title){
						//Change content
						newsCollection.NEWS.ARTICLE[num].CONTENT = "Updated content.";
						//Build xml
						xmlBuilder = new xml2js.Builder();
						xml = xmlBuilder.buildObject(newsCollection);
						//Write file
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
						
						delete newsCollection.NEWS.ARTICLE[num];
						
						xmlBuilder = new xml2js.Builder();
						xml = xmlBuilder.buildObject(newsCollection);
						
						fs.writeFile('./news.xml', xml, function(err, xmlDoc){
							if(err){ console.log("Failed to write xml."); }
							
							console.log("Successfully deleted news story.");
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
function filteredCollection(subString, dataRange, author){
	
}
*/

//console.log(createNewsStory("New news story.", null));
//console.log(deleteNewsStory("Mark Mulder ends 2015 comeback bid"));
//console.log(updateHeadline("Angels sign Stewart, Herrmann to minor-league deals"));
//console.log(changeContent("Angels, Garrett Richards settle on $3.2 million for 2015"));
//console.log(printCollection());
//console.log(filteredCollection(null, null, "Igor"));
