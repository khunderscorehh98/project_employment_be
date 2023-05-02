const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "smP7r$E<^=!R",
    database: "freelance",
    port: "3306"
})

module.exports = { 
    connection
}