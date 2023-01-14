const mongoose=require('mongoose');
const Users=mongoose.model('Users');

// =========================================================================
// User ==================================================================
// =========================================================================
exports.getUser = async (req:any, res:any) => {
    //console.log('req.user = ', req.user)
    if (req.user){
        //console.log('req.user = ', req.user.user)
        res.status(200).json({
            user:req.user.user,
            message:'User found'
        });
    } else {
        res.status(200).json({
            user: null,
            message:'Not authorized'
        });
    }
};

// =========================================================================
// Local ==================================================================
// =========================================================================
exports.createUser = async(email:any,password:any,done:any) => {
    // create the user
    var newUser            = new Users();

    newUser.local.email    = email;
    newUser.local.password = newUser.generateHash(password);
    // save the user
    console.log(newUser)
    newUser.save(function(err:any) {
        if (err)
            throw err;

        return done(null, newUser,{
            user: newUser,
            message:'Successfully created account'
        });
    });
};

exports.resetPassword = async(req:any,password:string,done:any) => {
    console.log('req.user = ', req.user);
    console.log('password = ', password);
    // upate password
    var user            = req.user;
    //console.log('user',user)
    user.local.password = user.generateHash(password);
    //user.local.passwordConfirm = req.body.confirm_password;
    //console.log('req.body.password',req.body.password)
    //console.log('req.body.confirm_password',req.body.confirm_password)
    user.local.passwordResetToken = undefined;
    user.local.passwordResetExpires = undefined;

    // save the user
    user.save(function(err:any) {
        if (err)
            throw err;

        return done(null, user,{
            user: user,
            message:'Successfully updated password!'
        });
    });
};

exports.connectUser = (req:any, email:string, password:string, done:any) => {
    var user            = req.user;
    user.local.email    = email;
    user.local.password = user.generateHash(password);
    user.save(function(err:any) {
        if (err)
            throw err;
        return done(null, user, {
            user: user,
            message: 'Successfully connected account!'
        });
    });
};

// =========================================================================
// GOOGLE ==================================================================
// =========================================================================
exports.createGoogleUser = (token:string, profile:any, done:any)=>{
    var newUser          = new Users();

    newUser.google.id    = profile.id;
    newUser.google.token = token;
    newUser.google.name  = profile.displayName;
    newUser.google.email = profile.emails[0].value; // pull the first email

    newUser.save(function(err:any) {
        if (err)
            throw err;
        return done(null, newUser);
    });
};

exports.reviveGoogleUser = (user:any, token:string, profile:any, done:any)=>{

    user.google.token = token;
    user.google.name  = profile.displayName;
    user.google.email = profile.emails[0].value; // pull the first email

    user.save(function(err:any) {
        if (err)
            throw err;
        return done(null, user);
    });
};

exports.connectGoogleUser = (req:any, token:string, profile:any, done:any)=>{
    var user          = req.user; // pull the user out of the session

    user.google.id    = profile.id;
    user.google.token = token;
    user.google.name  = profile.displayName;
    user.google.email = profile.emails[0].value; // pull the first email
    user.save(function(err:any) {
        if (err)
            throw err;
        return done(null, user);
    });
};

// =========================================================================  
// FACEBOOK ================================================================  
// =========================================================================

exports.createFacebookUser = (token:string, profile:any, done:any)=>{
    var newUser            = new Users();

    newUser.facebook.id    = profile.id;
    newUser.facebook.token = token;
    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
    newUser.facebook.email = profile.emails[0].value;

    newUser.save(function(err:any) {
        if (err)
            throw err;
        return done(null, newUser);
    });
};

exports.reviveFacebookUser = (user:any, token:string, profile:any, done:any)=>{
    user.facebook.token = token;
    user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
    user.facebook.email = profile.emails[0].value;

    user.save(function(err:any) {
        if (err)
            throw err;
        return done(null, user);
    });
};

exports.connectFacebookUser = (req:any, token:string, profile:any, done:any)=>{
    var user            = req.user; // pull the user out of the session

    user.facebook.id    = profile.id;
    user.facebook.token = token;
    user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
    user.facebook.email = profile.emails[0].value;

    user.save(function(err:any) {
        if (err)
            throw err;
        return done(null, user);
    });
};


export{};