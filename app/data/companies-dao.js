/* The CompaniesDAO must be constructed with a connected database object */
function CompaniesDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof CompaniesDAO)) {
        console.log("Warning: CompaniesDAO constructor called without 'new' operator");
        return new CompaniesDAO(db);
    }

    var companiesDB = db.collection("companies");

    this.getCompaniesByName = function(name, callback) {

        companiesDB
            .find({
                $text: {
                    $search: name
                }
            }, {
                score: {
                    $meta: "textScore"
                }
            })
            .sort({
                score: {
                    $meta: "textScore"
                }
            })
            .limit(50)
            .toArray(function(error, companies) {
                if (error) return callback(error, null);
                if (!companies) return callback("Could not find companies", null);
                callback(null, companies);
            });
    };
}

module.exports.CompaniesDAO = CompaniesDAO;
