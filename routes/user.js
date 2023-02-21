const express = require('express');
const path = require("path")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const sqlite3 = require('sqlite3').verbose()
var router = express.Router();


const db = new sqlite3.Database('data/data.db')

// login endpoint
router.post("/login", (req, res) => {
    const {email, password} = req.body

    // look up database
    let sql = `SELECT Id, Email, Username, Password, IsActive FROM Users WHERE Email = '${email}' and Password = '${password}'`
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        if (rows.length === 0) {
            // if there's no record
            const user = {'Id': -1}
            res.send(user)
        } else {
            const user = rows[0]
            res.send(user)
        }
    })
});

module.exports = router