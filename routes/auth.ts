const usersController   = require('../controllers/usersController');
const mongoose          = require('mongoose');
const Users             = mongoose.model('Users');
const AppError          = require('./../utils/appError');
const Email             = require('./../utils/email');
const crypto            = require('crypto');
const keys              = require('../config/keys');
// load the auth variables

module.exports  = function(app:any, passport:any) {

    // =============================================================================
    // User ========================================================================
    // =============================================================================
    
    // getUser 
    app.get('/api/getUser', usersController.getUser);

    // logout
    app.get('/api/logout', function(req:any, res:any, next:any) {
        req.logout(function(err:any) {
            if (err) { return next(err); }
            res.status(200).json({message:'logout successful'})
        });
    });

    // =============================================================================
    // Local Accounts ==============================================================
    // =============================================================================
    
    // Login
    app.post('/api/login', function(req:any, res:any,) {
        passport.authenticate('local-login', (err:any, user:any, info:any) =>{
            if (err) { 
                console.log('err', err);
                return res.status(200).json({err}); 
            }

            if (!user) { 
                console.log('info', info);
                return res.status(200).json({info}); 
            }

            req.logIn(user, function(err:any) {
                console.log('user = ', user);
                if (err) { 
                    return res.status(200).json({info:{
                        user:null,
                        message: err
                    }})
                }
                //return res.redirect('/profile/' + user.username);
                return res.status(200).json({info});
            });

            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
 //           req.session.regenerate(function (err:any) {
 //               console.log('user', user);
 //               if (err) {
 //                   return res.status(200).json({
 //                       info:{  
 //                           user:null,
 //                           message: err
 //                       }
 //                   })
 //               }
 //
 //               // store user information in session, typically a user id
 //               req.session.user = req.body.user
 //               
 //               // save the session before redirection to ensure page
 //               // load does not happen before session is saved
 //               req.session.save(function (err:any) {
 //                   return res.status(200).json({info});
 //               });
 //           });
        })(req, res);
    });

    // REGISTER 
    app.post('/api/signup', function(req:any, res:any, next:any) {
        passport.authenticate('local-signup', function(err:any, user:any, info:any) {
            if (err) { 
                console.log('err', err);
                return res.status(200).json({err}); }
            if (!user) { 
                console.log('info', info);
                return res.status(200).json({info}); 
            }
            req.logIn(user, function(err:any) {
                console.log('user', user);
                if (err) { 
                    return res.status(200).json({info:{
                        user:null,
                        message: err
                    }})
                };
                return res.status(200).json({info});
            });
        })(req, res, next);
    });

    // RESET PASSWORD

    app.post('/api/resetPassword/:token', async(req:any, res:any, next:any) => {

        // 1) Get user based on the token
        console.log('params = ',req.params.token)
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        console.log('hashedToken = ',hashedToken)

        const user = await Users.findOne({
            'local.passwordResetToken': hashedToken,
            'local.passwordResetExpires': { $gt: Date.now() }
        });

        // 2) If token has not expired, and there is user, set the new password
        if (!user) {
            return  res.status(200).json({info:{
                user: null,
                message:'Token is invalid or has expired'
            }});
        }

        console.log('user=  ',user);
        console.log('req.body=  ',req.body);
        user.local.password = user.generateHash(req.body.password);
        // user.local.passwordConfirm = req.body.passwordConfirm;
        user.local.passwordResetToken = undefined;
        user.local.passwordResetExpires = undefined;
        await user.save();
        
        // 3) Update changedPasswordAt property for the user
        // 4) Log the user in
        req.logIn(user, function(err:any) {
            console.log('user', user);
            if (err) { 
                return res.status(200).json({info:{
                    user:null,
                    message: err
                }})
            };
            return res.status(200).json({info:{
                user:user,
                message:'Successfully updated password'}});
        });
    });


    // FORGOT PASSWORD 

    app.post('/api/forgotPassword', async(req:any, res:any, next:any) =>  {
        console.log('forgot password',req.body);

        // 1) Get user by email
        const user = await Users.findOne({ 'local.email': req.body.email });
        if (!user) {
            return res.status(200).json({info:{
                user: null,
                message:'Email not found!'
            }});
        }
        console.log('user', user)

        // 2) Generate the random reset token
        const resetToken = user.createPasswordResetToken();
        console.log('resetToken', resetToken)
        await user.save({ validateBeforeSave: false });
        //console.log('user token', user);

        // 3) Send it to user's email
        try {
            //const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
            const resetURL = `${req.protocol}://${req.hostname}${keys.clientPort}/resetPassword/${resetToken}`;
            console.log('resetURL', resetURL)
            console.log('user', user)
            const email = user.local.email
            await new Email(user, email, resetURL).sendPasswordReset();
            return res.status(200).json({info:{
                status: 'success',
                message: 'Password reset token sent to email! Link is valid for 10 minutes!'
            }});
        } catch (err) {
            console.log('err', err)
            user.local.passwordResetToken = undefined;
            user.local.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            
            return res.status(500).json({info:{
                status: 'error',
                message: 'There was an error sending the email. Try again later!'
            }});
        }
    });












    // Connect a local account if user is already logged in
	app.post('/api/connect/local', function(req:any, res:any, next:any) {
		passport.authenticate('local-signup', function(err:any, user:any, info:any) {
			if (err) { return next(err); }
			if (!user) { return res.send(info); }
			req.logIn(user, function(err:any) {
			if (err) { return next(err); }
			//return res.redirect('/profile');
			return res.send(200)
			});
		})(req, res, next);
	});

    // Disonnect a local account if user is already logged in on another account
    app.get('/api/unlink/local', function(req:any, res:any) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err:any) {
            res.redirect('/shop');
        });
    });

    // ==========================================================================
    // FACEBOOK ROUTES ==========================================================
    // ==========================================================================
    
    //facebook login
    app.get('/api/facebook', 
        passport.authenticate('facebook', { 
            scope : ['public_profile', 'email'] 
        })
    );

    // handle the callback after facebook has authenticated the user
    app.get('/api/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/shop',
            failureRedirect : '/'
        })
    );

    //  Connect a facebook account if user is already logged in
    app.get('/api/connect/facebook', 
        passport.authorize('facebook', { 
            scope : 'email' 
        })
    );

    // handle the callback after facebook has authorized the user
    app.get('/api/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect : '/shop',
            failureRedirect : '/'
        })
    );
     
    // removing the token in case user wants to reconnect
    app.get('/api/unlink/facebook', function(req:any, res:any) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err:any) {
            res.redirect('/profile');
        });
    });

    // ==========================================================================
    // GOOGLE ROUTES ============================================================
    // ==========================================================================
    
    // profile gets us their basic information including their name email 
    app.get('/api/google',
        passport.authenticate('google', { 
            scope : ['profile', 'email'] 
        })
    );

    // the callback after google has authenticated the user
    app.get('/api/google/callback',
        passport.authenticate('google', {
            successRedirect : '/shop',
            failureRedirect : '/'
        })
    );


    // Connect a google account if user is already logged in
    app.get('/api/connect/google', 
        passport.authorize('google', { 
            scope : ['profile', 'email'] 
        }) 
    );

    // the callback after google has authorized the user
    app.get('/api/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/shop',
            failureRedirect : '/'
        })
    );

   // removing the token in case user wants to reconnect
    app.get('/api/unlink/google', function(req:any, res:any) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err:any) {
            res.redirect('/profile');
        });
    });

};

export{};