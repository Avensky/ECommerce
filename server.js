const app = require('./app');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const express = require('express');

//connect to database
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(keys.mongoURI, { 
    autoIndex: process.env.NODE_ENV === 'production' ? false : true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(res => console.log('Succesfully connected to MongoDb'))
  .catch(err => console.log('💥Failed to connect to MongoDb', err))
module.exports = {mongoose}

//serve production files
if (process.env.NODE_ENV === 'production') {
    //Express will server up production asses
    app.use(express.static('./frontend/build'));

    //Express will serve the index.html file
    //if it doesn't recogize the route
    const path = require('path');
    const filepath = path.join(__dirname, './frontend/build/index.html');

    app.get('*', (req,res) => {
        res.sendFile(filepath, function(err){
            if (err) return res.status(err.status).end();
            else return res.status(200).end();
        });
    });
};

//start server
const server = app.listen(keys.port, keys.ipAdress, (err) =>{
    console.log('App running on port: ', keys.port);
});
//handle errors
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
  
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});