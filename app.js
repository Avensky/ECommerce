//setup 
const express = require('express')
const app = express()

//dev packages
if (process.env.NODE_ENV !== 'production') {
    //development logging
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

module.exports = app;