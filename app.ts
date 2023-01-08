//setup
const express 	    = require('express');
const app 			= express();
const bodyParser 	= require('body-parser');
const session       = require('express-session')
const passport      = require('passport')
const cors 			= require("cors");

// set up cors to allow us to accept requests from our client
app.use(cors());
app.options('*', cors());

// get information from html forms raw
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	bodyParser.json({
		verify: (req:any, res:any, buf:any) => { req.rawBody = buf.toString(); }
	})
);

// set up cors to allow us to accept requests from our client
//app.use(cors());
//app.options('*', cors());

//dev packages
if (process.env.NODE_ENV !== 'production') {
	//development logging
	const morgan = require('morgan');
	app.use(morgan('dev'));
}


// models
require('./models/products');
require('./models/orders');
require('./models/users');

require('./controllers/passport')(passport); // pass passport for configuration

app.use(session({ 
	secret: 'keyboard cat',   // session secret
	resave: false,
	saveUninitialized: false,
	cookie: {
		//secure: true,
		maxAge: 30*24*60*60*1000
	}
  })); 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// routes
require('./routes/shop.ts')(app);
require('./routes/auth.ts')(app,passport);

module.exports = app;