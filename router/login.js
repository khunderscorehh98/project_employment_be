const express = require('express')
const router = express.Router()

const db = require('../config/db')

//GET ALL LOGIN
router.get('/login', (req, res) => {
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
router.get('/login/:id', (req, res) => {
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
router.post('/login', (req, res) => {
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

module.exports = router;