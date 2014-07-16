var ProfileDAO = require("../data/profile-dao").ProfileDAO;

/* The ProfileHandler must be constructed with a connected db */
function ProfileHandler(db) {
    "use strict";

    var profile = new ProfileDAO(db);

    this.displayProfile = function(req, res, next) {

        profile.getByUserId(req.session.userId, function(error, user) {

            if (error) return next(error);

            return res.render("profile", user);
        });
    };

    this.handleProfileUpdate = function(req, res, next) {

        var firstName = req.body.firstName;

        var lastName = req.body.lastName;
        var ssn = req.body.ssn;
        var dob = req.body.dob;
        var address = req.body.address;
        var userId = req.session.userId;

        profile.updateUser(userId, firstName, lastName, ssn, dob, address, function(err, user) {

            if (err) return next(err);
            user.updateSuccess = true;

            return res.render("profile", user);
        });

    };

}

module.exports = ProfileHandler;
