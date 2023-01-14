const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy   = require('passport-google-oauth20').Strategy;
const mongoose         = require('mongoose');
const Users            = mongoose.model('Users');
const keys             = require('../config/keys');
const usersController  = require('./usersController');
const crypto           = require('crypto');
const Email            = require('../utils/email');

module.exports         = function(passport:any) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser(function(user:any, done:any) {
        process.nextTick(function() {
          return done(null, {
            user
          });
        });
      });

    passport.deserializeUser(function(user:any, done:any) {
        process.nextTick(function() {
          return done(null, user);
        });
      });


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req:any, email:string, password:string, done:any) {
        console.log('email', email);
        console.log('password', password);
        console.log('done', done);
        // asynchronous
        process.nextTick(function() {
            Users.findOne({ 'local.email' :  email }, function(err:any, user:any) {
                // if there are any errors, return the error
                if (err) return done(err);

                // if no user is found, return the message
                if (!user){
                    return done(null, false, {
                        user: null,
                        message: 'Oops! Email not found.'
                    });
                }
                if (!user.validPassword(password))
                    return done(null, false, {
                        user: null,
                        message: 'Oops! Wrong password.'
                    });
                // all is well, return user
                else{
                    return done(null, user, {
                        user:user,
                        message:'Successful login'
                    });
                }
            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
//        proxy               : true
    },
    function (req:any, email:string, password:string, done:any) {

        // asynchronous
        process.nextTick(function() {

            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the email address is in use.
            Users.findOne({'local.email': email}, (err:any, existingUser:any) => {

                // if there are any errors, return the error
                if (err) done(err);

                // check to see if there's already a user with that email
                if (existingUser) 
                    return done(null, false, {
                        user: null,
                        message: 'Oops! That email is already taken.'
                    });

                //  If we're logged in, we're connecting a new local account.
                if(req.user) usersController.connectUser(req, email, password, done);

                //  We're not logged in, so we're creating a brand new user.
                else usersController.createUser(email, password, done);
            });
        });

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
        clientID            : keys.googleClientID,
        clientSecret        : keys.googleClientSecret,
        callbackURL         : keys.googleCallbackURL,
        passReqToCallback   : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req:any, token:any, refreshToken:any, profile:any, done:any) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                Users.findOne({ 'google.id' : profile.id }, function(err:any, user:any) {
                    if (err) done(err);
                    // if there is a user id already but no token 
                    //(user was linked at one point and then removed)
                    if (user) {
                        if (!user.google.token) {
                           usersController.reviveGoogleUser(user, token, profile, done);
                        }

                        return done(null, user);
                    } else usersController.createGoogleUser(token, profile, done);
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                usersController.connectGoogleUser(req, token, profile, done);
            }
        });
    }));

// =========================================================================  
// FACEBOOK ================================================================  
// =========================================================================
    passport.use(new FacebookStrategy({
        clientID            : keys.facebookClientID,
        clientSecret        : keys.facebookClientSecret,
        callbackURL         : keys.facebookCallbackURL,
        passReqToCallback   : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        profileFields       : ['id', 'displayName', 'photos', 'email','first_name', 'last_name'],
//        enableProof     : true,
        proxy           : true
    },
    function (req:any, token:any, refreshToken:any, profile:any, done:any) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                Users.findOne({ 'facebook.id' : profile.id }, function(err:any, user:any) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        // just add our token and profile information
                        if (!user.facebook.token) {
                            usersController.reviveFacebookUser(user, token, profile, done);
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        usersController.createFacebookUser(token, profile, done);
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                usersController.connectFacebookUser(req, token, profile, done);
            }
        });
    }));
};

export{}