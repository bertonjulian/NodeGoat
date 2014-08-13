var SessionHandler = require("./session");
var UnAuthenticatedHandler = require("./unauthenticated");
var ProfileHandler = require("./profile");
var BenefitsHandler = require("./benefits");
var ContributionsHandler = require("./contributions");
var AllocationsHandler = require("./allocations");
var CompaniesHandler = require("./companies");
var ErrorHandler = require("./error").errorHandler;

var exports = function(app, db) {

    "use strict";

    var sessionHandler = new SessionHandler(db);
    var profileHandler = new ProfileHandler(db);
    var benefitsHandler = new BenefitsHandler(db);
    var contributionsHandler = new ContributionsHandler(db);
    var allocationsHandler = new AllocationsHandler(db);
    var unAuthenticatedHandler = new UnAuthenticatedHandler();
    var companiesHandler = new CompaniesHandler(db);

    // Middleware to check if a user is logged in
    var isLoggedIn = sessionHandler.isLoggedInMiddleware;

    //Middleware to check if user has admin rights
    var isAdmin = sessionHandler.isAdminUserMiddleware;

    // The main page of the app
    app.get("/", sessionHandler.displayWelcomePage);

    // Landing page
    app.get("/home", unAuthenticatedHandler.displayHomePage);

    // Login form
    app.get("/login", sessionHandler.displayLoginPage);
    app.post("/login", sessionHandler.handleLoginRequest);

    // About us page
    app.get("/about", unAuthenticatedHandler.displayAboutPage);

    // Contact us page
    app.get("/contact", unAuthenticatedHandler.displayContactPage);

    // chat page
    app.get("/chat", unAuthenticatedHandler.displayChatPage);

    // Signup form
    app.get("/signup", sessionHandler.displaySignupPage);
    app.post("/signup", sessionHandler.handleSignup);

    // Logout page
    app.get("/logout", sessionHandler.displayLogoutPage);

    // The main page of the app
    app.get("/dashboard", isLoggedIn, sessionHandler.displayWelcomePage);

    // Profile page
    app.get("/profile", isLoggedIn, profileHandler.displayProfile);
    app.post("/profile", isLoggedIn, profileHandler.handleProfileUpdate);

    // Contributions Page
    app.get("/contributions", isLoggedIn, contributionsHandler.displayContributions);
    app.post("/contributions", isLoggedIn, contributionsHandler.handleContributionsUpdate);

    // Benefits Page
    app.get("/benefits", isLoggedIn, benefitsHandler.displayBenefits);
    app.post("/benefits", isLoggedIn, benefitsHandler.updateBenefits);
    /* Fix for A7 - checks user role to implement  Function Level Access Control
     app.get("/benefits", isLoggedIn, isAdmin, benefitsHandler.displayBenefits);
     app.post("/benefits", isLoggedIn, isAdmin, benefitsHandler.updateBenefits);
     */

    app.get("/companies", companiesHandler.displayCompaniesSearchPage);

    // Allocations Page
    app.get("/allocations", isLoggedIn, allocationsHandler.displayAllocations);

    // Handle redirect for learning resources link
    app.get("/learn", isLoggedIn, function(req, res, next) {
        return res.redirect(req.query.url); // Insecure way to handle redirects by taking redirect url from query string
    });

    // Handle redirect for learning resources link
    app.get("/tutorial", function(req, res, next) {
        return res.render("tutorial/a1");
    });
    app.get("/tutorial/:page", function(req, res, next) {
        return res.render("tutorial/" + req.params.page);
    });

    // Error handling middleware
    app.use(ErrorHandler);
};

module.exports = exports;
