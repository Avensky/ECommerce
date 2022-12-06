const app = require('./app');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const port = process.env.port || 5000;

//connect to database
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(res => console.log('Succesfully connected to MongoDb'))
  .catch(err => console.log('💥Failed to connect to MongoDb', err))
module.exports = {mongoose}

//serve production files
if (process.env.NODE_ENV === 'production') {
    //Express will server up production asses
    app.use(express.static('./client/build'));

    //Express will serve the index.html file
    //if it doesn't recogize the route
    const path = require('path')
    const filepath = path.join(__dirname, './client/build/index.html');

    app.get('*', (req,res) => {
        res.sendFile(filepath, function(err){
            if (err) return res.status(err.status).end();
            else return res.status(200).end();
        })   
    })
}

//start server
const server = app.listen(port, keys.ipAdress, (err) =>{
    console.log('App running on port: ', port);
})
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
