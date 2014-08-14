var AIMLInterpreter = require("aimlinterpreter");
var fs = require("fs");
var _ = require("underscore");


function BotHandler(db) {
    "use strict";
    var botName = "Admin";
	var aimlInterpreter = new AIMLInterpreter({name: botName, age: "42"});

    this.loadAIMLFiles = function(){

    	var filesArray = fs.readdirSync("./aiml");

    	filesArray = _(filesArray).map(function(filename){
    		return "./aiml/" + filename;
    	});
    	// TODO: is there a better way to do this
    	// file not found error unless we pass the full path along with the files

		// load all aiml files into the interpreter
    	aimlInterpreter.loadAIMLFilesIntoArray(filesArray);
    };

    this.getUsername = function(){
    	return botName;
    };

    this.sendMessageToBot = function(message, callback){

		aimlInterpreter.findAnswerInLoadedAIMLFiles(message, function(answer, wildCardArray){
			// do something here if necessary then return the callback
			console.log(answer + " | " + wildCardArray);
			
			callback(answer, wildCardArray);
		});
    
    };
}

module.exports = BotHandler;
