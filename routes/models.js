const express = require('express');
const multer = require('multer')
var router = express.Router();
const db = require('../models');
const upload = multer();
const redis = require("redis");
var fs = require('fs');
const redisUrl = "redis://127.0.0.1:6379";
const redisClient = redis.createClient(redisUrl);
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
    const files = req.files
    console.log(files)
    // const data = file.buffer

    // This is the model id and user id
    const { mid, uid } = req.params
    console.log({mid, uid})

    let filenames = []
    for (let i=0; i<files.length; i++) {
        filenames.push(files[i].originalname)
    }

    // add record to result table
    await db.Result.create({
        UserId: uid,
        ModelId: mid,
        FileName: JSON.stringify({ filenames }),
        Datetime: new Date()
    })

    // // when pushed to redis or failed, send status back
    // // when worker pulls the file from redis, change result.status to 'Processing'
    // // when worker successfully processed the file, save results to result.value and change result.status to 'Done'
    // // when process failed, change result.status to 'Failed'

    // // connect to redis
    // await redisClient.connect();

    // fs.readFile(file, 'UTF-8', function(err, csv) {
    //     $.csv.toArrays(csv, {}, function(err, data) {
    //       for(var i=0, len=data.length; i<len; i++) {
    //         console.log(data[i]); //Will print every csv line as a newline
    //       }
    //     });
    // });

    // // const myQueue = new Queue("myqueue", redisConfiguration);
    // // redisClient.set(file.originalname, JSON.stringify({ data }))


    res.send({ "status": "done" })
})


module.exports = router