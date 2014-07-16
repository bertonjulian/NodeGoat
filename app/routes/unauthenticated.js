/* The all pages that do not require authentication */
function UnAuthenticatedHandler() {
    "use strict";

    this.displayAboutPage = function(req, res, next) {
        return res.render("about");
    };

    this.displayContactPage = function(req, res, next) {
        return res.render("contact");
    };

    this.displayHomePage = function(req, res, next) {
        return res.render("home");
    };

    this.displayChatPage = function(req, res, next) {
        return res.render("chat");
    };
}

module.exports = UnAuthenticatedHandler;
