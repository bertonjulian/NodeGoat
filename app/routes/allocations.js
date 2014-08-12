var AllocationsDAO = require("../data/allocations-dao").AllocationsDAO;

function AllocationsHandler(db) {
    "use strict";

    var allocationsDAO = new AllocationsDAO(db);


    this.displayAllocations = function(req, res, next) {

        var userId = req.session.userId;

        allocationsDAO.getByUserId(userId, function(error, allocations) {
            if (error) return next(error);
            return res.render("allocations", allocations);
        });
    };
}

module.exports = AllocationsHandler;
