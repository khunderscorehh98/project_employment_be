const express = require('express');
const router = express.Router()
const fs = require('fs');
const handlebars = require('handlebars')

// Navbar
const nav = require('../views/nav')
handlebars.registerPartial('nav', nav)

const db = require('../config/db')

const peoplePage = fs.readFileSync('../backend/views/people.handlebars', 'utf8')

const compiledTemplate = handlebars.compile(peoplePage);

//GET ALL People
router.get('/people', (req, res) => {
    const renderedTemplate = compiledTemplate({
        title: 'Page',
        heading: 'Welcome to Database!',
        content: peoplePage,
      });

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
    res.send(renderedTemplate)
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