'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const mongoose = require('mongoose')

// Line below is not a npm library so it is needed to declare full path
const Player = require('./models/player')

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

const app = express()
const port = process.env.PORT || 3001

/* middleware */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* initial example
app.get('/hello/:name', (req, res) => {
	res.send({ message: `Hello ${req.params.name}!` })
})
*/

app.get('/api/player', (req, res) => {
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

app.get('/api/player/:playerId', (req, res) => {
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

//this POST construction add a player to mongoDB
app.post('/api/mongodb/player', (req, res) => {
	console.log('POST /api/player')
	/* thanks to body parser, we can access POST request body with req.body */
	console.log(req.body)

	let player = new Player()
	player.id = req.body.id
	player.fullName = req.body.fullName
	player.nickName = req.body.nickName
	player.profile = req.body.profile
	player.affiliatedClub = req.body.affiliatedClub
	player.condition = req.body.condition

	player.save((err, playerStored) => {
		if (err) res.status(500).send({message: `Error while inserting register into MongoDB. ${err}`})
		res.status(200).send({player: playerStored})
	})

})

app.put('/api/player/:playerId', (req, res) => {

})

app.delete('/api/player/:playerId', (req, res) => {

})

app.get('/api/club', (req, res) => {
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
