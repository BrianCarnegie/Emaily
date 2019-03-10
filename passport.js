//Modules Used
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Defining just the strategy...
const mongoose = require('mongoose');
//Keys File
const keys = require('../config/keys');

//Importing over our model or 'class'
const User = mongoose.model('users');

//Grabbing the user id out of the user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Converting the id back to the user to be used as 'req.body'
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

//Google strategy which is accessing from the keys file
passport.use(
    new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},(accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
    .then(existingUser => {
        if(existingUser){
            done(null, existingUser);
        }
        else{
            new User({ googleId: profile.id }).save()
            .then(newUser => done(null, newUser));
        }
    })
    .catch(err => {
        console.log('Error', err.message);
    })
})
);
