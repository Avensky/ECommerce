//setup 
const express = require('express');
// const cors                = require("cors");
const app = express();
const bodyParser = require('body-parser');
// set up cors to allow us to accept requests from our client
// app.use(cors());
// app.options('*', cors());

// get information from html forms raw
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	bodyParser.json({
		verify: (req, res, buf) => { req.rawBody = buf.toString(); }
	})
);

//dev packages
if (process.env.NODE_ENV !== 'production') {
	//development logging
	const morgan = require('morgan');
	app.use(morgan('dev'));
}


// config
require('./models/products');
require('./models/orders');

// routes
require('./routes/shop.js')(app);

module.exports = app;