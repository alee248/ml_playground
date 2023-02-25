const express = require('express');
const multer = require('multer')
const router = express.Router();
const db = require('../models');
const upload = multer();
const { Queue } = require("bullmq");

const redisConfiguration = {
    connection: {
        host: "127.0.0.1",
        port: "6379",
    },
};

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
router.post('/test/:mid/:uid', upload.any('files'), async (req, res) => {
    // This is the file
    const { files } = req
    const { mid, uid } = req.params
    // consent === true means you can save the data locally
    const { consent } = req.body

    // get file names
    let fileNames = []
    for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].originalname)
    }

    let datapath = ''
    if (consent === 'true') {
        // save the data and provide datapath
        // for multiple data, save in a folder and provide folder path
        datapath = 'saved-data-path'
    }

    // add record to result table
    const result = await db.Result.create({
        UserId: uid,
        ModelId: mid,
        FileName: JSON.stringify({ filenames: fileNames }),
        Datetime: new Date(),
        DataSaved: consent ? datapath : null
    })

    // when pushed to redis or failed, send status back
    // when worker pulls the file from redis, change result.status to 'Processing'
    // when worker successfully processed the file, save results to result.value and change result.status to 'Done'
    // when process failed, change result.status to 'Failed'

    const fileContent = []
    for (let file of files) {
        fileContent.push(Buffer.from(file.buffer).toString('utf-8'))
    }


    const mlQueue = new Queue("mlqueue", redisConfiguration);

    for (let file of files) {
        mlQueue.add(result.dataValues.Id, {
            modelId: result.dataValues.ModelId,
            userId: result.dataValues.UserId,
            fileNames,
            fileContent
        })
    }

    res.send({ "status": "done" })
})


module.exports = router