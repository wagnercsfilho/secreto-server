'use strict';

var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');
var mongoose = require('mongoose');

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

var config = require('./app/config');

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
    res.sendFile('index.html');
})

mongoose.connect(config.mongoUri);

io.on('connection', function(socket) {
    require("./app/controllers/users")(socket);
    require("./app/controllers/posts")(socket);
    require("./app/controllers/notifications")(socket);
    require("./app/controllers/comments")(socket);
});

server.listen(config.port, config.ip);
