'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
const db = require('./db')

//MYSQL version (no express, need to be improved (and modelled)!)
app.get('/api/mysql/player', (req, res) => {
	db.get().query("SELECT * FROM Jugador", function (err, result, fields) {
  		if (err) throw err;
  		//console.log(result);
		var players = [];
		for (var i = 0;i < result.length; i++) {
			players.push(
				{
					id : result[i].id,
					fullName: result[i].nombre_apellidos
				}
			)
		}
		res.status(200).send({players})
	})
})

app.get('/api/mysql/player/:playerId', (req, res) => {
	db.get().query(`SELECT * FROM Jugador where id=${req.params.playerId}`, function (err, result, fields) {
  		if (err) throw err;
  		console.log(result);
		var players = [];
		for (var i = 0;i < result.length; i++) {
			players.push(
				{
					id : result[i].id,
					fullName: result[i].nombre_apellidos
				}
			)
		}
		res.status(200).send({players})
	})
})


//This is needed to avoid deprecation warnings related to promises:
/*
DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
*/
mongoose.Promise = global.Promise;

//The mongoDB connection
mongoose.connect(config.db,{ useMongoClient: true }, (err, res) => {
	if (err) {
		return console.log(`Error while trying to connect MongoDB. ${err}`)
		process.exit(1)
	}
	console.log('MongoDB connection successfully stablished')
	app.listen(config.port, () => {
		console.log(`API RESTful listeing at http://localhost:${config.port}`)
	})
})


// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
	if (err) {
		return console.log(`Unable to connect to MySQL. ${err}`)
		process.exit(1)
	}
	console.log('MySQL connection successfully stablished')
})
