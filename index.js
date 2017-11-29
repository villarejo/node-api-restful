'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const mongoose = require('mongoose')

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

app.post('/api/player', (req, res) => {
	/* thanks to body parser, we can access POST request body with req.body */
	console.log(req.body)
	res.status(200).send({message : 'Player received'})
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

mongoose.connect('mongodb://localhost:27017/futbol6',{ useMongoClient: true }, (err, res) => {

	if (err) throw err
	console.log('MongoDB connection succesfully stablished...')
	app.listen(port, () => {
		console.log(`API RESTful listeing at http://localhost:${port}`)
	})

})
