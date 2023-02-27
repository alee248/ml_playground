const express = require('express');
var router = express.Router();
const db = require('../models');
const { Queue } = require("bullmq");

const redisConfiguration = {
    connection: {
        host: "127.0.0.1",
        port: "6379",
    },
};

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

router.get('/delete/:rid', async (req, res) => {
    const { rid } = req.params

    try {
        const result = await db.Result.findOne({
            where: {
                Id: rid
            },
            lock: true,
            attributes: ['Status']
        })
        if (result && result.Status !== 'Processing') {
            const mlQueue = new Queue("mlqueue", redisConfiguration)
            const job = await mlQueue.getJob(rid)
            if (job) {
                await job.remove()
            }
            await db.Result.destroy({
                where: {
                    Id: rid
                },
                lock: true
            })
            res.send({ result: 'succeed' })
        }
    } catch (err) {
        res.sendStatus(500, {
            message: err.message
        })
    }



    // db.Result.findOne({
    //     where: {
    //         Id: rid
    //     },
    //     lock: true,
    //     attributes: ['Status']
    // }).then(result => {
    //     if (result && result.Status !== 'Processing') {
    //         db.Result.destroy({
    //             where: {
    //                 Id: rid
    //             },
    //             lock: true
    //         }).then(() => {
    //             res.send({ result: 'succeed' })

    //         }).catch(err => {
    //             res.sendStatus(500, {
    //                 message: err.message
    //             })
    //         })
    //     } else {
    //         res.send({ result: 'Delete failed!' })
    //     }
    // }).catch(err => {
    //     res.sendStatus(500, {
    //         message: err.message
    //     })
    // })
})

module.exports = router