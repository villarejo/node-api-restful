'use strict'

//const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName,
		password: req.body.password
	})

	user.save((err) => {
		if (err) res.status(500).send({ message: `Error creating user: ${err}` })

		return res.status(201).send({ token: service.createToken(user) })
	})
}

function signIn (req, res) {
	User.find( { email: req.body.email }, (err, user) => {

		if(err) return rest.status(500).send({ message: err })

		//Beware !user is not valid with find function because it returns an object with value []
		if (!user.length) return res.status(404).send({
			message: `User does not exist ${user}`
		})

		req.user = user
		res.status(200).send({
			message: `Correct log in ${user}`,
			token: service.createToken(user)
		})
	})
}

module.exports = {
	signUp,
	signIn
}
