'use strict'

const express = require('express')
const playerCtrl = require('../controllers/player')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

//Beware initial "/" is always needed!!
api.get('/mongodb/player', playerCtrl.getPlayers)
api.get('/mongodb/player/:playerId', playerCtrl.getPlayer)
//POST request to add a player to mongoDB
api.post('/mongodb/player', auth, playerCtrl.savePlayer)
//Put method recomended for updates
api.put('/mongodb/player/:playerId', auth, playerCtrl.updatePlayer)
api.delete('/mongodb/player/:playerId', auth, playerCtrl.deletePlayer)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

api.get('/user', userCtrl.getUsers)
api.delete('/user/:userId', auth, userCtrl.deleteUser)

// valid token check example
api.get('/private', auth, (req, res) => {
	res.status(200).send({ message: `Access granted` })
})

module.exports = api
