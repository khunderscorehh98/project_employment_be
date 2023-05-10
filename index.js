const express = require('express');
const app = express();
const handlebars = require('handlebars');
const fs = require('fs');

const cors = require('cors');
app.use(express.json());
app.use(cors());

const template = fs.readFileSync('../backend/views/index.handlebars', 'utf8');
const peoplePage = fs.readFileSync('../backend/views')
const compiledTemplate = handlebars.compile(template);

app.use(express.static('public'));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/favicon.ico');
});


// Index Routing
app.get('/', (req, res) => {
  const renderedTemplate = compiledTemplate({
    title: 'Page',
    heading: 'Welcome to Database!',
    content: template,
  });
  
  // Send the rendered HTML to the client
  res.send(renderedTemplate);
});

app.use(express.static('public'));

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

// Router 
const userRouter = require('./router/users');
const loginRouter = require('./router/login');
const serviceRouter = require('./router/service');

app.use('/', userRouter);
app.use('/', loginRouter);
app.use('/', serviceRouter);

//Localhosting
const PORT = '5000';
app.listen(PORT, console.log(`Your backend is up! at port: ${PORT}`));
