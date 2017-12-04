'use strict'

const express = require('express')
const PlayerCtrl = require('../controllers/player')
const api = express.Router()

//Beware initial "/" is always needed!!
api.get('/mongodb/player', PlayerCtrl.getPlayers)
api.get('/mongodb/player/:playerId', PlayerCtrl.getPlayer)
//POST request to add a player to mongoDB
api.post('/mongodb/player', PlayerCtrl.savePlayer)
//Put method recomended for updates
api.put('/mongodb/player/:playerId', PlayerCtrl.updatePlayer)
api.delete('/mongodb/player/:playerId', PlayerCtrl.deletePlayer)

module.exports = api
