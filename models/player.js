'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlayerSchema = Schema({
	id: Number,
	fullName: String,
	nickName: String,
	profile: String,
	affiliatedClub: Number,
	condition: String
})

module.exports = mongoose.model('Player', PlayerSchema)
