import express from 'express'
import passport from 'passport'
import mongoose from 'mongoose';

import User from '../models/users'

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function extractProfile(profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    return {
        id: profile.id,
        displayName: profile.displayName,
        image: imageUrl,
    };
}

passport.use(new GoogleStrategy({
    clientID: "981413818459-0pnh6j8bgmlq2vhvuochrj5o0pgm1aik.apps.googleusercontent.com",
    clientSecret: "JZ-U7sExCOkze3-j0cvQb3ul",
    callbackURL: 'http://localhost:8080/auth/google/callback',
    accessType: 'offline',
}, function (accessToken, refreshToken, profile, done) {
    if (profile) {
        User.findByIdAndUpdate(profile.id, extractProfile(profile), {
            upsert: true,
            new: true,
        }, (err, user) => {
            return done(null, profile);
        })
    }
    else {
        return done(null, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err || !user) {
            return done(err);
        }
        done(null, user);
    });
});

const router = express.Router();

router.get('/login',
    passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect("/main/" + res["req"]["user"]["displayName"]);
});
module.exports = router;