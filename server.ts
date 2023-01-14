const keys 		= require('./config/keys');
const express 	= require('express');
const App 		= require('./app');

//serve production files
if (process.env.NODE_ENV === 'production') {
	//Express will server up production asses
	App.use(express.static('./frontend/build'));

	//Express will serve the index.html file
	//if it doesn't recogize the route
	const path = require('path');
	const filepath = path.join(__dirname, './frontend/build/index.html');

	App.get('*', (req :any, res :any) => {
		res.sendFile(filepath, function(err:any){
			if (err) return res.status(err.status).end();
			else return res.status(200).end();
		});
	});
}

//start server
const server = App.listen(keys.port, keys.ipAdress, () =>{
	console.log('App running on port: ', keys.port);
});
//handle errors
process.on('unhandledRejection', (err :any) => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	if (err instanceof Error){
		console.log("err name, err message = ", err.name, err.message);
		server.close(() => {
			process.exit(1);
		});
	}
});
  
process.on('SIGTERM', () => {
	console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
	server.close(() => {
		console.log('💥 Process terminated!');
	});
});

export{}