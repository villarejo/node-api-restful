'use strict'

const mysql = require('mysql')
const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 3001

//MYSQL version (no express, need to be improved!)
app.get('/api/mysql/player', (req, res) => {
	con.query("SELECT * FROM Jugador", function (err, result, fields) {
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
	con.query(`SELECT * FROM Jugador where id=${req.params.playerId}`, function (err, result, fields) {
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

app.get('/api/mysql/club', (req, res) => {
	con.query("SELECT * FROM Club", function (err, result, fields) {
  		if (err) throw err;
  		//console.log(result);
		var clubs = [];
		for (var i = 0;i < result.length; i++) {
			clubs.push(
				{
					id : result[i].id,
					fullName: result[i].nombre
				}
			)
		}
		res.status(200).send({clubs})
	})
})


//This is needed to avoid deprecation warnings related to promises:
/*
DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
*/
mongoose.Promise = global.Promise;

//The mongoDB connection
mongoose.connect('mongodb://localhost:27017/futbol6',{ useMongoClient: true }, (err, res) => {
	if (err) {
		return console.log(`Error while trying to connect MongoDB. ${err}`)
	}
	console.log('MongoDB connection succesfully stablished...')
	app.listen(port, () => {
		console.log(`API RESTful listeing at http://localhost:${port}`)
	})
})

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "ubuntu",
	database: "futbol6"
})

con.connect(function(err){
	if(err) throw err
	console.log("Connected to MySQL")
})
