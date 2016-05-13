'use strict';

var crypto = require('crypto'),
    bucket = "secreto",
    awsKey = "",
    secret = "",
    User = require("../models/user");

module.exports = function(socket) {

    socket.on('createUpdateUser', function(data, cb) {
        User.update({
            facebook_id: data.facebook_id
        }, data, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        }, () => {
            User.findOne({
                facebook_id: data.facebook_id
            }, (err, user) => {
                cb(user);
            })
        });
    });

    socket.on('sign', function(fileName, cb) {

        var expiration = new Date(new Date().getTime() + 1000 * 60 * 5).toISOString(); // expire in 5 minutes

        var policy = {
            "expiration": expiration,
            "conditions": [{
                    "bucket": bucket
                }, {
                    "key": fileName
                }, {
                    "acl": 'public-read'
                },
                ["starts-with", "$Content-Type", ""],
                ["content-length-range", 0, 524288000]
            ]
        };

        var policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64');
        var signature = crypto.createHmac('sha1', secret).update(policyBase64).digest('base64');
        cb({
            bucket: bucket,
            awsKey: awsKey,
            policy: policyBase64,
            signature: signature
        });

    })

}