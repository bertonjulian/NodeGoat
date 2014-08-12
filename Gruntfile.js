var config = require("./config/config"); // Application config properties
var MongoClient = require("mongodb").MongoClient; // Driver for connecting to MongoDB
var async = require("async");
var DummyDataHandler = require("./dummyDataHelper");
var dummyDataHandler = new DummyDataHandler();
var util = require("util");
var _ = require("underscore");

function configureGrunt(grunt) {

    "use strict";

    // Project Configuration
    grunt.initConfig({
        config: config,
        pkg: grunt.file.readJSON("package.json"),
        // watch: {
        //     js: {
        //         files: ["app/assets/js/**", "app/data/**/*.js", "app/routes/**/*.js", "server.js", "test/**/*.js"],
        //         tasks: ["jshint"],
        //         options: {
        //             livereload: true
        //         }
        //     },
        //     html: {
        //         files: ["app/views/**"],
        //         options: {
        //             livereload: true
        //         }
        //     },
        //     css: {
        //         files: ["app/assets/css/**"],
        //         options: {
        //             livereload: true
        //         }
        //     }
        // },
        jshint: {
            all: ["test/**/*.js", "config/**", "app/assets/js/**",
                "app/data/**/*.js", "app/routes/**/*.js", "server.js"
            ],
            options: {
                jshintrc: true
            }
        },
        jsbeautifier: {
            files: ["Gruntfile.js", "config/**", "app/views/**",
                "app/assets/js/**", "app/assets/css/**", "app/data/**/*.js",
                "app/routes/**/*.js", "server.js", "test/**/*.js"
            ],
            options: {
                html: {
                    braceStyle: "collapse",
                    indentChar: " ",
                    indentScripts: "keep",
                    indentSize: 4,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    unformatted: ["a", "sub", "sup", "b", "i", "u", "pre"],
                    wrapLineLength: 0
                },
                css: {
                    indentChar: " ",
                    indentSize: 4
                },
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        },
        nodemon: {
            dev: {
                script: "<%= pkg.main %>",
                options: {
                    args: [],
                    ignore: ["README.md", "node_modules/**"],
                    ext: "js, html, css",
                    watch: ["app/data", "app/routes", "app/assets", "app/views", "app/views/tutorial"],
                    delay: 1,
                    env: {
                        PORT: "<%= config.port %>"
                    },
                    cwd: __dirname
                }
            },
            debug: {
                script: "<%= pkg.main %>",
                options: {
                    args: [],
                    ignore: ["README.md", "node_modules/**"],
                    ext: "js, html, css",
                    watch: ["app/data", "app/routes", "app/assets", "app/views", "app/views/tutorial"],
                    nodeArgs: ["--debug-brk"],
                    delay: 1,
                    env: {
                        PORT: "<%= config.port %>"
                    },
                    cwd: __dirname
                }
            },
        },
        "node-inspector": {
            custom: {
                options: {
                    "web-host": "localhost"
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ["nodemon:dev"] //, "watch"]
            },
            debug: {
                tasks: ["node-inspector", "nodemon:debug"]
            },
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: "spec"
            },
            src: ["test/**/*.js"]
        },
        env: {
            test: {
                NODE_ENV: "test"
            }
        },
    });



    // Load NPM tasks 
    //grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-env");
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks("grunt-node-inspector");

    // Making grunt default to force in order not to break the project.
    grunt.option("force", true);


    // Code Validation, beautification task(s).
    grunt.registerTask("precommit", ["jsbeautifier", "jshint"]);

    // Test task.
    grunt.registerTask("test", ["env:test", "mochaTest"]);

    // start server.
    grunt.registerTask("run", ["precommit", "concurrent:dev"]);

    // start server with node inspector running
    grunt.registerTask("debug", ["precommit", "concurrent:debug"]);

    // Default task(s).
    grunt.registerTask("default", ["precommit", "concurrent:dev"]);

    // drop all collections and repopulate the db with dummy data
    grunt.registerTask("resetDatabase", ["drop", "populate"]);

    grunt.registerTask("drop", "drop dev database", function() {
        var done = this.async();
        grunt.log.writeln("connecting to the db : " + config.db);

        MongoClient.connect(config.db, function(err, db) {
            if (err) return grunt.log.error(["Cannot connect to MongoDB : " + err]);

            async.parallel([
                    // remove each collection one by one

                    function(callback) {
                        db.collection("allocations", function(err, collection) {
                            collection.remove(function(err) {
                                if (err) return callback(err);
                                grunt.log.ok(["allocations removed"]);
                                callback(null);
                            });

                        });
                    },
                    function(callback) {
                        db.collection("benefits", function(err, collection) {
                            collection.remove(function(err) {
                                if (err) return callback(err);
                                grunt.log.ok(["benefits removed"]);
                                callback(null);
                            });

                        });
                    },
                    function(callback) {
                        db.collection("users", function(err, collection) {
                            collection.remove(function(err) {
                                if (err) return callback(err);
                                grunt.log.ok(["users removed"]);
                                callback(null);
                            });

                        });
                    },
                    function(callback) {
                        db.collection("contributions", function(err, collection) {
                            collection.remove(function(err) {
                                if (err) return callback(err);
                                grunt.log.ok(["contributions removed"]);
                                callback(null);
                            });

                        });
                    },
                    function(callback) {
                        db.collection("counters", function(err, collection) {
                            collection.remove(function(err) {
                                if (err) return callback(err);
                                grunt.log.ok(["counters removed"]);
                                callback(null);
                            });

                        });
                    }
                ],
                function(err) {
                    // deleting the collections is done
                    if (err) return done(err);
                    db.close();
                    grunt.log.writeln("all database collections have been deleted");

                    done(); // tells grunt we are finished
                });
        });

    });

    grunt.registerTask("populate", "populate dev database", function() {

        var done = this.async();

        MongoClient.connect(config.db, function(err, db) {
            if (err) return grunt.log.error(["Cannot connect to MongoDB : " + err]);



            async.series([

                    // add users
                    function(callback) {

                        var admin = dummyDataHandler.getAdminUser();
                        var users = dummyDataHandler.generateNormalUsers();
                        var testUser = dummyDataHandler.getTestUser();
                        users.push(admin);
                        users.push(testUser);

                        grunt.log.write(util.inspect(users));
                        db.collection("users").insert(users, function(err) {
                            if (err) return callback(err);
                            callback(null);
                        });
                    },

                    // add allocations
                    function(callback) {

                        db.collection("users").find({
                            "isAdmin": {
                                $ne: true
                            }
                        }).toArray(function(err, users) {

                            var allocations = [];
                            _(users).each(function(user) {
                                allocations.push(dummyDataHandler.getAllocation(user._id));

                            });

                            grunt.log.write(util.inspect(allocations));

                            db.collection("allocations").insert(allocations, function(err) {
                                if (err) return callback(err);
                                callback(null);
                            });

                        });

                    }
                    // // add files to all folders
                    // function(callback) {

                    // },

                    // // make contact with other users
                    // function(callback) {


                    // }

                ],

                function(err, results) {
                    if (err) return done(err);
                    grunt.log.writeln("all database collections have been populated");

                    done();
                });

        });

    });
}

module.exports = configureGrunt;
