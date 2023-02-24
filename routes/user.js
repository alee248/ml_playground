const express = require('express');
// const path = require("path")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcryptjs")
var router = express.Router();
const db = require('../models');
// const Op = db.Sequelize.Op;

// login endpoint
router.post("/login", (req, res) => {
    const { email, password } = req.body

    // look up database
    db.User.findOne({
        where: {
            Email: email,
            Password: password
        }
    }).then((user) => {
        if (user && user.dataValues) {
            res.send(user.dataValues)
        } else {
            res.send({Id: -1})
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
});

router.get("/getPendingJobs/:uid", (req, res) => {
    const { uid } = req.params

    db.Result.findAll({
        include: [{
            model: db.Model,
            attributes: ['Id', 'Name', 'Version']
        }],
        where: {
            UserId: uid
        }
    }).then(result => {
        res.send(result)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
})

module.exports = router