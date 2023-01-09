const mongoose  = require('mongoose');
const Users     = mongoose.model('Users');
const authController = require('../controllers/authController');
// load the auth variables

module.exports  = function(app:any, passport:any) {
    // =============================================================================
    // LOGIN =======================================================================
    // =============================================================================
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
                console.log('user', user);
                if (err) { 
                    return res.status(200).json({info:{
                        user:null,
                        message: err
                    }})
                }
                //return res.redirect('/profile/' + user.username);
                return res.status(200).json({info});
            });
        })(req, res);
    });
    // =====================================
    // REGISTER ============================
    // =====================================
        // process the signup form
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
                    }
                    return res.status(200).json({info});
            });

             })(req, res, next);
         });

    // =============================================================================
    // getUser ==================================================================
    // =============================================================================
	app.get('/api/getUser', async (req:any, res:any) => {
        console.log('req', req.user)
        if (req.user){
            console.log('req.user', req.user)
            res.status(200).json({
                user:req.user,
                message:'User found'
            });
        } else {
            res.status(200).json({
                user: null,
                message:'Not authorized'
            });
        }
    });

// =====================================
// LOGOUT ==============================
// =====================================
app.get('/api/logout', function(req:any, res:any, next:any) {
    req.logout(function(err:any) {
        if (err) { return next(err); }
        res.status(200).json({message:'logout successful'})
      });
});


























    // Get all users
//     app.get('/api/v1/fetchUsers', (req,res) =>{
//         Users.find({},(err:any,doc:any)=>{
//             if(doc)
//                 res.json(doc);
//             else {
//                 res.err(err);
//             }
//         })
//     });
// 	
// 	app.get('/ping', (req:any, res:any) => {
//         res.status(200).send("pong!");
// 	});
// 
// 	app.get('/api/ping', (req:any, res:any) => {
//         res.status(200).send("api pong!");
// 	});
// 

//     
//     // =============================================================================
//     // AUTHENTICATION ==============================================================
//     // =============================================================================
//         // =====================================
//         // LOGIN ===============================
//         // =====================================
//         app.post('/api/login', function(req:any, res:any, next:any) {
//             passport.authenticate('local-login', function(err:any, user:any, info:any) {
//                 if (err) { return next(err); }
//                 if (!user) { return res.send(info); }
//                 req.logIn(user, function(err:any) {
//                 if (err) { return next(err); }
//                 //return res.redirect('/profile/' + user.username);
//                 return res.send(200)
//                 });
//             })(req, res, next);
//         })
// 

// 
         // =====================================
         // =====================================
         // FACEBOOK ROUTES =====================
         // route for facebook authentication and login
             app.get('/api/facebook', 
             passport.authenticate('facebook', { 
                 scope : ['public_profile', 'email'] 
             }));
     
             // handle the callback after facebook has authenticated the user
             app.get('/api/facebook/callback',
                 passport.authenticate('facebook', {
                     successRedirect : '/shop',
                     failureRedirect : '/'
                 }));
//     
//         // =====================================
//         // TWITTER ROUTES ======================
//         // =====================================
//         // route for twitter authentication and login
//             app.get('/api/twitter', 
//                 passport.authenticate('twitter', { 
//                 scope : 'email' 
//                 }));
// 
//             // handle the callback after twitter has authenticated the user
//             app.get('/api/twitter/callback',
//                 passport.authenticate('twitter', {
//                     successRedirect : '/profile',
//                     failureRedirect : '/'
//                 }));
//     
//     
// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails

  app.get('/api/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
  // the callback after google has authenticated the user
  app.get('/api/google/callback',
      passport.authenticate('google', {
              successRedirect : '/shop',
          failureRedirect : '/'
      }));

//     // =============================================================================
//     // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
//     // =============================================================================
//     
//         // locally --------------------------------
// 	app.post('/api/connect/local', function(req:any, res:any, next:any) {
// 		passport.authenticate('local-signup', function(err:any, user:any, info:any) {
// 			if (err) { return next(err); }
// 			if (!user) { return res.send(info); }
// 			req.logIn(user, function(err:any) {
// 			if (err) { return next(err); }
// 			//return res.redirect('/profile');
// 			return res.send(200)
// 			});
// 		})(req, res, next);
// 	});
// 
         // facebook -------------------------------
     
             // send to facebook to do the authentication
             app.get('/api/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
     
             // handle the callback after facebook has authorized the user
             app.get('/api/connect/facebook/callback',
                 passport.authorize('facebook', {
                     successRedirect : '/shop',
                     failureRedirect : '/'
                 }));
     
//         // twitter --------------------------------
//     
//             // send to twitter to do the authentication
//             app.get('/api/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
//     
//             // handle the callback after twitter has authorized the user
//             app.get('/api/connect/twitter/callback',
//                 passport.authorize('twitter', {
//                     successRedirect : '/profile',
//                     failureRedirect : '/'
//                 }));
//     
//     
//         // google ---------------------------------
//     
//             // send to google to do the authentication
//             app.get('/api/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
//     
//             // the callback after google has authorized the user
//             app.get('/api/connect/google/callback',
//                 passport.authorize('google', {
//                     successRedirect : '/profile',
//                     failureRedirect : '/'
//                 }));
//     
//     // =============================================================================
//     // UNLINK ACCOUNTS =============================================================
//     // =============================================================================
//     // used to unlink accounts. for social accounts, just remove the token
//     // for local account, remove email and password
//     // user account will stay active in case they want to reconnect in the future
//     
//         // local -----------------------------------
//         app.get('/api/unlink/local', function(req:any, res:any) {
//             var user            = req.user;
//             user.local.email    = undefined;
//             user.local.password = undefined;
//             user.save(function(err:any) {
//                 res.redirect('/profile');
//             });
//         });
//     
//         // facebook -------------------------------
//         app.get('/api/unlink/facebook', function(req:any, res:any) {
//             var user            = req.user;
//             user.facebook.token = undefined;
//             user.save(function(err:any) {
//                 res.redirect('/profile');
//             });
//         });
//     
//         // twitter --------------------------------
//         app.get('/api/unlink/twitter', function(req:any, res:any) {
//             var user           = req.user;
//             user.twitter.token = undefined;
//             user.save(function(err:any) {
//                 res.redirect('/profile');
//             });
//         });
//     
//         // google ---------------------------------
//         app.get('/api/unlink/google', function(req:any, res:any) {
//             var user          = req.user;
//             user.google.token = undefined;
//             user.save(function(err:any) {
//                 res.redirect('/profile');
//             });
//         });
//     
//     
//     };
//     
//     // route middleware to ensure user is logged in
//     function isLoggedIn(req:any, res:any, next:any) {
//         if (req.isAuthenticated())
//             return next();
//     
//         res.redirect('/');
}
