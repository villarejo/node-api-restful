'ue strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PlayerSchema = Schema({
	id: Number,
	fullName: String,
	nickname: String,
	profile: String,
	affiliatedClub: Number,
	condition: String
})

mongoose.model('Player', PlayerSchema)
