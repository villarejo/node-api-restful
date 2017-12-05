'use strict'

const express = require('express')
const playerCtrl = require('../controllers/player')
const userCtrl = require('../controllers/user')
const clubCtrl = require('../controllers/club')
const auth = require('../middlewares/auth')
const api = express.Router()


//Beware initial '/' is always needed below in api.get('/...')   !!

//Actions involving players
api.get('/mongodb/player', playerCtrl.getPlayers)
api.get('/mongodb/player/:playerId', playerCtrl.getPlayer)
api.post('/mongodb/player', auth, playerCtrl.savePlayer)
api.put('/mongodb/player/:playerId', auth, playerCtrl.updatePlayer)
api.delete('/mongodb/player/:playerId', auth, playerCtrl.deletePlayer)

//Actions involving clubs
api.get('/mysql/club', clubCtrl.getClubs)

//Actions involving users and login
api.get('/user', userCtrl.getUsers)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.delete('/user/:userId', auth, userCtrl.deleteUser)


// valid token check
api.get('/private', auth, (req, res) => {
	res.status(200).send({ message: `Access granted` })
})

module.exports = api
