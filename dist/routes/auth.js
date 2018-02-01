const express = require("express");
const passport = require('passport');
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
        return done(null, profile);
    }
    else {
        return done(null, false);
    }
}));

const router = express.Router();

router.get('/login',
    passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect("/main");
},
);
module.exports = router;