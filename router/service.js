const express = require('express')
const router = express.Router()

const db = require('../config/db')

// Get All
router.get('/service', (req, res) => {
    let sql = `select * from service`
    db.connection.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(200).json({
            error: false,
            message: 'Here is the record request!',
            data: result
        })
    })
})

// Get by ID
router.get('/service/:id', (req, res) => {
    let id = req.params.id
    let sql = `select * from services where id = ${id}`

    db.connection.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(200).json({
            error: false,
            message: 'Here is the specific record that you requested!',
            data: result
        })
    },
    )
})

//POST
router.post('/service', (req, res) => {
    let wrap = req.body

    let service = wrap.service
    let price = wrap.price
    let category = wrap.category
    let description = wrap.description
    let user_id = uuid.v4()

    let sql = `insert into service (service, price, category, description, user_id) values ('${service}', '${price}', '${category}', '${description}', ${user_id})`

    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(201).json({
            error: false,
            message: 'Record has been added!',
            data: result
        })
    })
})

//PUT
router.put('/service/:id', (req, res) => {
    let user_id = req.params.id
    
    let wrap = req.body
    
    let service = wrap.service
    let price = wrap.price
    let category = wrap.category
    let description = wrap.description

    let sql = `update service set service = ${service}, price = ${price}, category = ${category}, description = ${description} where user_id = ${user_id}`

    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(201).json({
            error: false,
            message: 'Record has been updated!',
            data: result
        })
    })
})

// //DELETE
// router.delete()
module.exports = router