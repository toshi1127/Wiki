'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function extractProfile(profile) {
    var imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    return {
        id: profile.id,
        displayName: profile.displayName,
        image: imageUrl
    };
}

_passport2.default.use(new GoogleStrategy({
    clientID: "134812553393-6huph2g2q6fvdb7v00sdoclh5esuii06.apps.googleusercontent.com",
    clientSecret: "xdEe3RQATvYRY5tXp1TLPEVo",
    callbackURL: 'http://localhost:8080/auth/google/callback',
    accessType: 'offline'
}, function (accessToken, refreshToken, profile, done) {
    _users2.default.findByIdAndUpdate(profile.id, extractProfile(profile), {
        upsert: true,
        new: true
    }, function (err, user) {
        return done(null, user);
    });
}));

_passport2.default.serializeUser(function (user, done) {
    done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
    _users2.default.findById(id, function (err, user) {
        if (err || !user) {
            return done(err);
        }
        done(null, user);
    });
});

var router = _express2.default.Router();

router.get('/login', _passport2.default.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', _passport2.default.authenticate('google'), function (req, res) {
    res.redirect("/main/" + res["req"]["user"]["displayName"]);
});
module.exports = router;