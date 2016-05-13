var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: String,
    facebook_id: String
});

module.exports = User;