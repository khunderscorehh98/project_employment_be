const express = require('express');
const app = express();

const db = require('./config/db')

const cors = require('cors')

app.use(cors())
app.use(express.json());


app.get("/" , (req, res) => {
    res.json("Welcome to Database!")
})