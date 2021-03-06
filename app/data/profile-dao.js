/* The ProfileDAO must be constructed with a connected database object */
function ProfileDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof ProfileDAO)) {
        console.log("Warning: ProfileDAO constructor called without 'new' operator");
        return new ProfileDAO(db);
    }

    var users = db.collection("users");

    /* Fix for A6 - Sensitive Data Exposure

    // Use crypto module to save sensitive data such as ssn, dob in encrypted format
    var crypto = require("crypto");
    var config = require("../../config/config");

    // Helper function to encrypt data
    var encrypt = function(toEncrypt) {
        var cipher = crypto.createCipher(config.cryptoAlgo, config.cryptoKey);
        return cipher.update(toEncrypt, "utf8", "hex") + cipher.final("hex");
    };

    // Helper function to decrypt data
    var decrypt = function(toDecrypt) {
        var decipher = crypto.createDecipher(config.cryptoAlgo, config.cryptoKey);
        return decipher.update(toDecrypt, "hex", "utf8") + decipher.final("utf8");
    };

    */

    this.updateUser = function(userId, firstName, lastName, ssn, dob, address, callback) {

        // Create user document
        var user = {
            _id: userId,
            firstName: firstName,
            lastName: lastName,
            // Insecure storage of ssn and DOB
            ssn: ssn,
            dob: dob,
            /*
            // Fix for A7 - Sensitive Data Exposure
            // Store encrypted ssn and DOB
            ssn: encrypt(ssn),
            dob: encrypt(dob),
            */
            address: address
        };

        users.update({
            _id: userId
        }, {
            $set: user
        }, function(err, result) {

            if (!err) {
                console.log("Updated user profile");
                return callback(null, user);
            }

            return callback(err, null);
        });
    };

    this.getByUserId = function(userId, callback) {
        users.findOne({
            _id: userId
        }, function(err, user) {

            if (err) return callback(err, null);
            /*
            // Fix for A7 - Sensitive Data Exposure
            // Decrypt ssn and DOB values to display to user
            user.ssn = user.ssn ? decrypt(user.ssn) : "";
            user.dob = user.dob ? decrypt(user.dob) : "";
            */

            callback(null, user);
        });
    };
}

module.exports.ProfileDAO = ProfileDAO;
