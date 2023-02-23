const express = require('express');
const multer = require('multer')
var router = express.Router();
const db = require('../models');
const upload = multer();

// get all models
router.get('/', (req, res) => {
    db.Model.findAll({
        attributes: ['Id', 'Name', 'Details', 'Date']
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

// fixed showing associated projects in models
router.get('/:mid', (req, res) => {
    db.Model.findOne({
        include: [{
            model: db.Project,
            attributes: ['Id', 'Title']
        }],
        where: {
            Id: req.params.mid,
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

// TODO: push the file to redis
router.post('/test/:mid/:uid', upload.single('file'), async (req, res) => {
    // This is the file
    const file = req.file

    // This is the model id and user id
    const { mid, uid } = req.params

    // add record to result table
    await db.Result.create({
        UserId: uid,
        ModelId: mid,
        FileName: file.originalname,
        Datetime: new Date()
    })

    // when pushed to redis or failed, send status back
    // when worker pulls the file from redis, change result.status to 'Processing'
    // when worker successfully processed the file, save results to result.value and change result.status to 'Done'
    // when process failed, change result.status to 'Failed'
    res.send({ "status": "done" })
})


module.exports = router