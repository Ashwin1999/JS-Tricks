const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');

passport.use(
    new GoogleStrategy({
        // get the below two from the google+ api you've created in google cloud projects
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/redirect"
    },
        (accessToken, refreshToken, profile, done) => {
            // passport callback function
            console.log("callback fired!");

            User.findOne({ googleID: profile.id }).then((currentUser) => {
                if (currentUser) {
                    // user exists
                    console.log('Logged in as ' + currentUser.name);
                } else {
                    // create user and save google id to db
                    new User({
                        googleID: profile.id,
                        name: profile.displayName,
                        email: profile._json.email,
                        imageURL: profile._json.picture,
                    }).save().then((newUser) => {
                        console.log('new user created:\t' + newUser);
                    });
                }
            })
        })
);