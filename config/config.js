var _ = require("underscore");

var config = _.extend(
    require(__dirname + "/../config/env/all.js"),
    require(__dirname + "/../config/env/" + (process.env.NODE_ENV || "development") + ".js") || {}
);

module.exports = config;
