'use strict'

const db = require('../db')

function create(userId, text, done) {
  var values = [userId, text, new Date().toISOString()]

  db.get().query('INSERT INTO comments (user_id, text, date) VALUES(?, ?, ?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
}

function findAll(done) {
  db.get().query('SELECT * FROM Club;', function (err, rows) {
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
