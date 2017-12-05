'use strict'

const Club = require('../models/club')

function getClubs (req, res) {

	Club.findAll((err, result) => {
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
}

module.exports = {
	getClubs,
}
