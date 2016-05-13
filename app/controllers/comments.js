'use strict';

var Notification = require("../models/notification");
var Post = require("../models/post");
var Comment = require("../models/comment");

module.exports = function(socket) {
    
    socket.on('createComment', function(data, cb) {
        Comment.create(data, function(err, comment) {
            Post.findById(data._post, function(err, post) {
                post.comments += 1;
                post.save(function(err, post) {

                    if (data.user !== post._user) {
                        Notification.create({
                            type: 'COMMENT',
                            _user: post._user,
                            _post: post._id,
                            read: false
                        }, function(err, notification) {
                            socket.broadcast.emit('newNotification/' + post._user, notification);
                            cb(err, comment);
                        });
                    }
                    else {
                        cb(err, comment);
                    }

                });

            });

        });
    });
    
    socket.on('getCommentByPost', function(post, cb) {
        Comment.find({
            _post: post._id
        }).exec(function(err, comment) {
            cb(err, comment);
        });
    });
    
}