'use strict'

const express = require('express')
const PlayerCtrl = require('../controllers/player')
const auth = require('../middlewares/auth')
const api = express.Router()

//Beware initial "/" is always needed!!
api.get('/mongodb/player', PlayerCtrl.getPlayers)
api.get('/mongodb/player/:playerId', PlayerCtrl.getPlayer)
//POST request to add a player to mongoDB
api.post('/mongodb/player', PlayerCtrl.savePlayer)
//Put method recomended for updates
api.put('/mongodb/player/:playerId', PlayerCtrl.updatePlayer)
api.delete('/mongodb/player/:playerId', PlayerCtrl.deletePlayer)
api.get('/private', auth, (req, res) => {
	res.status(200).send({ message: 'You got access' })
})

module.exports = api
