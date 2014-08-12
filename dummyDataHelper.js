var _ = require("underscore");
var faker = require("faker");


function dummyDataHelper(){
	"use strict";

	var DECIMAL = 10;
	var NUM_USERS = 15;
	var MIN_YEARS = 10;
	var MAX_YEARS = 60;
 
	this.numberOfUsers = function(){
		return NUM_USERS;
	};

	this.getTestUser = function(){

		var futureDate = getFutureDate(MIN_YEARS, MAX_YEARS);

		return {
			userName : 'w',
			firstName : faker.Name.firstName(),
			lastName : faker.Name.lastName(),
			password : 'w',
			isAdmin : false,
			benefitStartDate: futureDate
		};
	};

	this.generateNormalUsers = function(num){
		var numberOfUsers = num || NUM_USERS;

		var users = _(numberOfUsers).times(function(n){
			
			var futureDate = getFutureDate(MIN_YEARS, MAX_YEARS);
			var userName = faker.Internet.userName();
			return {
				userName : userName,
				firstName : faker.Name.firstName(),
				lastName : faker.Name.lastName(),
				// password is username + 3 numbers
				password : userName + getRandomNumber(100,999),
				isAdmin : false,
				benefitStartDate: futureDate
			};
		});

		return users;
	};

	this.getAllocation = function(userId){
		
		// stocks funds and bonds must add up to 100
		// as its a percentage of where the users money is 
		// invested.
		var stocks = getRandomNumber(0, 100);
		var funds = getRandomNumber(0, 100 - stocks);
		var bonds = 100 - (stocks + funds);

		return {
			"userId" : userId,
			"stocks" : stocks,
			"funds"  : funds,
			"bonds"  : bonds
		};
	};

	this.getAdminUser = function(){
		
		var futureDate = getFutureDate(MIN_YEARS, MAX_YEARS);

		return {
			userName : "admin",
			firstName : faker.Name.firstName(),
			lastName : faker.Name.lastName(),
			password : "Admin_123", // change this later
			isAdmin : true,
			benefitStartDate: futureDate // might not be needed.

		};

	};

	// get a random integer between the min and max params
	var getRandomNumber = function(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	};

	// gets a date in the future min 10 years but max 60 years
	var getFutureDate = function(minYears, maxYears){
		var date = new Date();
		date.setYear(date.getFullYear() + getRandomNumber(minYears,maxYears));
	};

}

module.exports = dummyDataHelper;
