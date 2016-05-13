var mongoose = require('mongoose');

var Notification = mongoose.model('Notification', {
    type: String,
    _post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = Notification;