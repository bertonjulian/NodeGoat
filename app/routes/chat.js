function ChatHandler(db) {
    "use strict";

    // usernames which are currently connected to the chat
    var usernames = {};
    var numUsers = 0;

    // optional bot which can interact with users while chatting
    var bot;

    this.displayChatPage = function(req, res, next) {
        var userId = req.session.userId;
        return res.render("chat", {
            handle: userId
        });
    };

    // initi
    this.setupChatService = function(socket, botHandler) {

        if (botHandler) {
            bot = botHandler;
        }

        var addedUser = false;

        // when the client emits "newMessageEvent", this listens and executes
        socket.on("newMessageEvent", function(msg) {

            // TODO: parse the message for @admin and if found send to bot for response
            var socketId = socket.id;
            var response = botHandler.sendMessageToBot(msg, function(answer) {
                socket.broadcast.to(socketId).emit('newMessageEvent', {
                    username: botHandler.getUsername(),
                    message: answer
                });

            });

            // socket.broadcast.emit("newMessageEvent", {
            //     username: socket.username,
            //     message: msg
            // });
        });

        // when the client emits "addUserEvent", this listens and executes
        socket.on("addUserEvent", function(username) {
            // we store the username in the socket session for this client
            socket.username = username;
            // add the client"s username to the global list
            usernames[username] = username;
            ++numUsers;
            addedUser = true;
            socket.emit("loginEvent", {
                numUsers: numUsers
            });
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit("userJoinedEvent", {
                username: socket.username,
                numUsers: numUsers
            });
        });

        // when the client emits "startTypingEvent", we broadcast it to others
        socket.on("startTypingEvent", function() {
            socket.broadcast.emit("startTypingEvent", {
                username: socket.username
            });
        });

        // when the client emits "stopTypingEvent", we broadcast it to others
        socket.on("stopTypingEvent", function() {
            socket.broadcast.emit("stopTypingEvent", {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on("disconnect", function() {
            // remove the username from global usernames list
            if (addedUser) {
                delete usernames[socket.username];
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.emit("userLeftEvent", {
                    username: socket.username,
                    numUsers: numUsers
                });
            }
        });

    };
}

module.exports = ChatHandler;
