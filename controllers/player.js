'use strict'

// Line below is not a npm library so it is needed to declare full path
const Player = require('../models/player')

function getPlayer (req, res) {
	let playerId = req.params.playerId

	Player.findById(playerId, (err, player) => {
		if (err) return res.status(500).send({message: `Error when getting response. ${err}`})
		if (!player) return res.status(404).send({message: `Player does not exist`})

		res.status(200).send({ player })
	})
}

function getPlayers (req, res) {
	Player.find({} , (err, players) => {
		if (err) return res.status(500).send({message: `Error when getting response. ${err}`})
		if (!players) return res.status(404).send({message: `It does not exist any product`})

		res.status(200).send({ players })
	})
}

function savePlayer (req, res){
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
}

function updatePlayer (req, res) {
	let playerId = req.params.playerId
	let update = req.body

	Player.findByIdAndUpdate(playerId, update, (err, playerUpdated) => {

		if (err) return res.status(500).send({message: `Error when getting response. ${err}`})
		if (!playerUpdated) return res.status(404).send({message: `Player does not exist`})

		res.status(200).send({ message: `Player with id ${playerId} successfully updated` })
	})
}

function deletePlayer (req, res) {
	let playerId = req.params.playerId

	Player.findById(playerId, (err, player) => {

		if (err) return res.status(500).send({message: `Error when getting response. ${err}`})
		if (!player) return res.status(404).send({message: `Player does not exist`})

		player.remove(err =>{
			if (err) return res.status(500).send({message: `Error when getting response. ${err}`})
			res.status(200).send({ message: `Player with id ${playerId} was successfully removed` })
		})
	})
}


module.exports = {
	getPlayer,
	getPlayers,
	savePlayer,
	updatePlayer,
	deletePlayer
}
