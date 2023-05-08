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

const userRouter = require('./router/users')

const cors = require('cors')

app.use(express.json());
app.use(cors())


app.get("/" , (req, res) => {
    res.json("Welcome to Database!")
})


app.use('/', userRouter)

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