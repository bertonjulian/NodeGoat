var CompaniesDAO = require("../data/companies-dao").CompaniesDAO;

function CompaniesHandler(db) {
    "use strict";

    var companiesDAO = new CompaniesDAO(db);


    this.displayCompaniesSearchPage = function(req, res, next) {

        var searchTerm = req.query.query;

        if (searchTerm) {
            companiesDAO.getCompaniesByName(searchTerm, function(error, companies) {
                if (error) return next(error);
                return res.render("companies", {companies:companies});
            });
        } else {
            return res.render("companies");
        }

    };

    this.getSearchResults = function(req, res, next) {};
}

module.exports = CompaniesHandler;
