const express = require('express')
const router = express.Router()

const db = require('../config/db')

router.get('/skill', (req, res) => {
    let sql = `select * from setskill`

    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(200).json({
            error: false,
            message: 'Here is the data request!',
            data: result
        })
    })
})

router.get('/skill/:id', (req, res) => {
    let id = req.params.id
    let sql = `select * from setskill where id = ${id}`

    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(200).json({
            error: false,
            message: 'Here is the specific skill you requested!',
            data: result
        })
    })
})

router.get('/skill/detail/:id', (req, res) => {
    let id = req.params.id
    let sql = `select * from setskill where skill_id = ${id}`

    db.connection.query(sql, (error, result) => {
        if(error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
        res.status(200).json({
            error: false,
            message: 'Here is the skill from the specific person you requested!',
            data: result
        })
    })
})


// TODO: SQL for POSTing skill and individual POST '/skill/(skill_id)/(skill)'
router.post('/skill', (req, res) => {
    let sql = `insert into setskill `
})

// router.put()
// router.delete()

module.exports = router