//setup
const exp = require('express');
const app = exp();
const bodyParser = require('body-parser');

//const cors = require("cors");
// set up cors to allow us to accept requests from our client
// app.use(cors());
// app.options('*', cors());

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

// routes
require('./routes/shop.ts')(app);

module.exports = app;