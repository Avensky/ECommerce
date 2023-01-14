//setup
const express 	    = require('express');
const app 			= express();
const mongoose 		= require('mongoose');
const session       = require('express-session')
const MongoStore 	= require('connect-mongo');
const bodyParser 	= require('body-parser');
const passport      = require('passport');
const cors 			= require("cors");
const keys 			= require('./config/keys');

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

// connect to database
main().catch((err :any) => console.log('💥Failed to connect to MongoDb', err));

async function main() {
	mongoose.set('strictQuery', false);
	await mongoose.connect(keys.mongoURI, { 
		autoIndex: process.env.NODE_ENV === 'production' ? false : true,
	});
}

if
 (process.env.NODE_ENV==='production') {
	app.set('trust proxy', 1) // trust first proxy
	app.use(session({ 		
		proxy: true,
		secret: 'keyboardcat',   // session secret
		saveUninitialized: false, // don't create session until something stored
		resave: false, //don't save session if unmodified
		secure: true, // it requires an https-enabled website
		store: new MongoStore ({
			client: mongoose.connection.getClient(),
			collectionName: "sessions",
			stringify: false,
			ttl: 14 * 24 * 60 * 60, // = 14 days. Default)
		})
	})); 
} else {
	app.use(session({
		secret: 'keyboardcat',   // session secret
		saveUninitialized: false, // don't create session until something stored
		resave: false, //don't save session if unmodified
		store: new MongoStore ({
			client: mongoose.connection.getClient(),
			collectionName: "sessions",
			stringify: false,
			ttl: 14 * 24 * 60 * 60, // = 14 days. Default)
			// crypto: {secret: 'squirrel'}
		})
	}));
}

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes
require('./routes/shop.ts')(app);
require('./routes/auth.ts')(app,passport);

module.exports = app;
export{}