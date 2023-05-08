const express = require('express');
const app = express();

const cors = require('cors')
app.use(express.json());
app.use(cors())

// Random Number Generator, interval 3 seconds-------------------------
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
//--------------------------------------------------------------------------------

// Index Routing
app.get("/" , (req, res) => {
    res.json("Welcome to Database!")
})

// Router 
const userRouter = require('./router/users')
const loginRouter = require('./router/login')
const serviceRouter = require('./router/service')

app.use('/', userRouter)
app.use('/', loginRouter)
app.use('/', serviceRouter)

//Localhosting
const PORT = '5000';
app.listen(PORT, console.log(`Your backend is up! at port: ${PORT}`))