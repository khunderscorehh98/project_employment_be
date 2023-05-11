const express = require('express');
const router = express.Router()
const fs = require('fs');

const db = require('../config/db')


const uuid = require('uuid');
const seedrandom = require('seedrandom');
const rng = seedrandom(uuid.v4());

const MAX_NUMBER = 1000000;
const MAX_ATTEMPTS = 10;
const usedNumbers = new Set();

function getNextRandom() {
  let outputRng;
  let attempts = 0;
  do {
    outputRng = Math.floor(rng() * MAX_NUMBER);
    attempts += 1;
  } while (usedNumbers.has(outputRng) && attempts < MAX_ATTEMPTS);

  if (attempts === MAX_ATTEMPTS) {
    // Reset the set of used numbers if we've exhausted all attempts
    usedNumbers.clear();
  } else {
    usedNumbers.add(outputRng);
  }

  return outputRng;
}

setInterval(() => {
  const outputRng = getNextRandom();
  console.log(outputRng);
}, 2500);


//GET ALL People
router.get('/people', (req, res) => {
    let sql = `select * from users`
    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(200).json({
            error: false,
            message: "Here's the record requested!",
            data: result
        })
    })
})

//GET People by ID
router.get('/people/:id', (req, res) => {
    let id = req.params.id
    let sql = `select * from users where user_id = ${id}`

    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(200).json({
            error: false,
            data: result
        })
    })
})

//POST
router.post('/people', (req, res) => {
    let wrap = req.body

    let fname = wrap.fname
    let lname = wrap.lname
    let age = wrap.age
    let address = wrap.address
    let ic = wrap.ic
    let major = wrap.major
    let skill_id = getNextRandom()
    let service_id = getNextRandom()
    let description = wrap.description

    let sql = `insert into users (first_name, last_name, age, address, ic, major, skill_id, service_id, description) 
    values ('${fname}', '${lname}', '${age}', '${address}', '${ic}', '${major}', '${skill_id}', '${service_id}', '${description}')`

    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(201).json({
            error: false,
            message: "Record has been added!",
            data: result
        })
    })
})

//DELETE
router.delete('/people/:id', (req, res) => {
    let id = req.params.id
    let sql = `delete from users where user_id = ${id}`

    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(200).json({
            error: false,
            message: 'Record has been deleted!'
        })
    })
})

router.put('/people/:id', (req, res) => {
    let user_id = req.params.id

    let wrap  = req.body
    let fname = wrap.fname
    let lname = wrap.lname
    let age = wrap.age
    let address = wrap.address
    let ic = wrap.ic
    let major = wrap.major
    let description = wrap.description

    let sql = `update users set first_name = '${fname}', last_name = '${lname}', age = '${age}', address = '${address}', ic = '${ic}', major = '${major}', description = '${description}' where user_id = '${user_id}' `

    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(200).json({
            error: false,
            message: 'Record has been updated!',
            data: result
        })
    })
})

module.exports = router;