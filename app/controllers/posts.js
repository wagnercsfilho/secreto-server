'use strict';

var Notification = require("../models/notification");
var Post = require("../models/post");
var User = require("../models/user");

module.exports = function(socket) {
    socket.on('getPosts', function(data, cb) {
        User.find({
            facebook_id: {
                $in: data
            }
        }).exec(function(err, users) {
            Post.find({
                    '_user': {
                        $in: users
                    }
                })
                .populate('_user')
                .sort({
                    _id: -1
                })
                .exec(function(err, data) {
                    cb(err, data);
                });
        })
    });
    
    socket.on('createPost', function(data, cb) {
        Post.create(data, function(err, post) {
            cb(err, post);
        });
    });
    socket.on('likePost', function(data, cb) {
        Post.findById(data.post._id, function(err, post) {
            post.likes.push(data._user);
            post.save(function(err, post) {

                if (data._user !== post._user) {
                    Notification.create({
                        type: 'LIKE',
                        _user: post._user,
                        _post: post._id,
                        read: false
                    }, function(err, notification) {
                        socket.broadcast.emit('newNotification/' + post._user, notification);
                        cb(err, post);
                    });
                }
                else {
                    cb(err, post);
                }

            });

        });
    });
    socket.on('dislikePost', function(data, cb) {
        Post.findById(data.post._id, function(err, post) {

            post.likes.splice(post.likes.indexOf(data._user), 1);
            post.save(function(err, data) {
                cb(err, data);
            });

        });
    });
}