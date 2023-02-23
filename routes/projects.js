const express = require('express');
var router = express.Router();
const db = require('../models');

// get all projects
router.get('/', (req, res) => {
    db.Project.findAll({
        attributes: ['Id', 'Title', 'Description']
    })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
});

// fixed showing associated models in projects
router.get('/:pid', (req, res) => {
    db.Project.findOne({
        include: [{
            model: db.Model,
            attributes: ['Id', 'Name']
        }],
        where: {
            Id: req.params.pid,
        },
    })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
});




module.exports = router