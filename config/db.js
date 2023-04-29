const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    port: ""
})

module.exports = { 
    connection
}