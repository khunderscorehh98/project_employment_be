const express = require('express');
const app = express();

const db = require('./config/db')

const cors = require('cors')

app.use(cors())
app.use(express.json());


app.get("/" , (req, res) => {
    res.json("Welcome to Database!")
})

//GET ALL People
app.get('/people', (req, res) => {
    let sql = `select * from user`
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
    let ic = req.params.id
    let sql = `select * from user where id = ${id}`

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

    let sql = `insert into user (name, age, address) values ('${name}', '${age}', '${address}')`

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
app.delete('/people/:id', (res, req) => {
    let ic = req.params.id
    let sql = `delete from user where id = ${id}`

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
app.get('login', (res, req) => {
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
            message: 'Here is the record requested!',
            data: result
        })
    })
})


const PORT = '5000';
app.listen(PORT, console.log(`Your server is up! at port: ${PORT}`))