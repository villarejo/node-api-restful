'use strict'

const db = require('../db')

function create(userId, text, done) {

	var values = [userId, text, new Date().toISOString()]

	var query = `INSERT INTO Club
		(nombre,
		competicionEuropea,
		supercopa,
		logo,
		categoriaActual,
		categoríaAnterior,
		economicamenteEstable,
		anexo_resumen_cpd,
		padreFilial,
		pais	)
		VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  db.get().query(query, values, function(err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
}

function findAll(done) {
	var query = `SELECT	* FROM Club;`

	db.get().query(query, function (err, rows) {
		if (err) return done(err)
		done(null, rows)
	})
}

function findById(id, done) {
  db.get().query('SELECT * FROM Club WHERE id = ?', id, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

module.exports = {
	create,
	findAll,
	findById
}
