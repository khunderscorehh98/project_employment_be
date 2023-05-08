const express = require('express');
const app = express();

// LOL
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
}, 3000);
//

const db = require('./config/db')

const cors = require('cors')

app.use(express.json());
app.use(cors())


app.get("/" , (req, res) => {
    res.json("Welcome to Database!")
})

//GET ALL People
app.get('/people', (req, res) => {
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
app.get('/people/:id', (req, res) => {
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
app.post('/people', (req, res) => {
    let wrap = req.body

    let name = wrap.name
    let age = wrap.age
    let address = wrap.address
    let ic = wrap.ic
    let major = wrap.major
    let skill_id = getNextRandom()
    let service_id = getNextRandom()
    let description = wrap.description

    let sql = `insert into users (name, age, address, ic, major, skill_id, service_id, description) 
    values ('${name}', '${age}', '${address}', '${ic}', '${major}', '${skill_id}', '${service_id}', '${description}')`

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
app.delete('/people/:id', (req, res) => {
    let ic = req.params.id
    let sql = `delete from users where id = ${id}`

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

//TODO: Endpoint for Updating User Details

//USER-----------LOGIN
//GET ALL LOGIN
app.get('/login', (req, res) => {
    let sql = `select * from login`
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

//GET Login by ID
app.get('/login/:id', (req, res) => {
    let id = req.params.id
    let sql = `select * from where login_id = ${id}`

    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(200).json({
            error: false,
            message: 'Here is the record requested!',
            data: result
        })        
    })
})

// POST Login
app.post('/login', (req, res) => {
    let wrap = req.body

    let login = wrap.login
    let password = wrap.password

    let sql = `insert into login (login, password) values ('${login}', '${password}')`

    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(201).json({
            error: false,
            message: 'Record has been created!',
            data: result
        })
    })
})


const PORT = '5000';
app.listen(PORT, console.log(`Your backend is up! at port: ${PORT}`))