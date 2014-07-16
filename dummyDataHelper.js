var _ = require("underscore");
var faker = require("faker");


function dummyDataHelper(){
	"use strict";

	var DECIMAL = 10;
	var NUM_USERS = 15;
 
	this.numberOfUsers = function(){
		return NUM_USERS;
	};

	this.getNormalUsers = function(num){
		var numberOfUsers = num || NUM_USERS;

		var users = _(numberOfUsers).times(function(n){
			var date = new Date();

			// gets a date in the future min 10 years but max 60 years
			date.setYear(date.getFullYear() + getRandomArbitrary(10,60));

			var userName = faker.Internet.userName();
			return {
				userName : userName,
				firstName : faker.Name.firstName(),
				lastName : faker.Name.lastName(),
				// password is username + 3 numbers
				password : userName + getRandomArbitrary(100,999), // change this later
				isAdmin : false,
				benefitStartDate: date
			};
		});

		return users;
	};

	this.getAdminUser = function(){
			return {
				userName : "admin",
				firstName : faker.Name.firstName(),
				lastName : faker.Name.lastName(),
				password : "Admin_123", // change this later
				isAdmin : true
			};

	};

	var getRandomArbitrary = function(min, max) {
		return Math.random() * (max - min) + min;
	};

}

module.exports = dummyDataHelper;
