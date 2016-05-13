'use strict';

var Notification = require("../models/notification");

module.exports = function(socket) {
    socket.on('getNotifications', function(userId, cb) {
        Notification.find({
                '_user': userId,
                read: false
            })
            .sort({
                _id: -1
            })
            .populate('_post')
            .exec(function(err, notifications) {
                console.log(err, notifications)
                cb(err, notifications);
            });
    });
    socket.on('readNotifications', function(userId, cb) {
        Notification.update({
                '_user': userId,
                read: false
            }, {
                $set: {
                    read: true
                }
            }, {
                multi: true
            },
            function(err, notification) {
                cb(err, notification);
            });
    });
}