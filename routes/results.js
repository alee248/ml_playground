const express = require('express');
var router = express.Router();
const db = require('../models');

router.get('/:rid', (req, res) => {
    const { rid } = req.params
    db.Result.findOne({
        where: {
            Id: rid
        },
        lock: true
    }).then((result) => {
        res.send(result)
    }).catch(err => {
        res.sendStatus(500, {
            message: err.message
        })
    })
})

router.get('/delete/:rid', (req, res) => {
    const { rid } = req.params
    db.Result.findOne({
        where: {
            Id: rid
        },
        lock: true,
        attributes: ['Status']
    }).then(result => {
        if (result && result.Status !== 'Processing') {
            db.Result.destroy({
                where: {
                    Id: rid
                },
                lock: true
            }).then(() => {
                res.send({ result: 'succeed' })
            }).catch(err => {
                res.sendStatus(500, {
                    message: err.message
                })
            })
        } else {
            res.send({ result: 'Delete failed!' })
        }
    }).catch(err => {
        res.sendStatus(500, {
            message: err.message
        })
    })
})

module.exports = router