const { ParentCommand } = require('bullmq');
const express = require('express');
var router = express.Router();
const db = require('../models');

router.get('/getCommentsByModel/:mid', (req, res) => {
    const { mid } = req.params
    db.Comment.findAll({
        include: [{
            model: db.User,
            attributes: ['Id', 'Username', 'Email', 'Type'],
            where: {
                IsActive: 1
            }
        }, {
            model: db.Comment,
            as: 'ChildComment'
        }],
        where: {
            ModelId: mid,
            Visibility: 1,
            ReplyTo: -1
        }
    }).then(result => {
        res.send(result)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
})

router.get('/getCommentsByParentId/:cid', (req, res) => {
    const { cid } = req.params
    db.Comment.findAll({
        include: [{
            model: db.User,
            attributes: ['Id', 'Username', 'Email', 'Type'],
            where: {
                IsActive: 1
            }
        }, {
            model: db.Comment,
            as: 'ChildComment'
        }],
        where: {
            ReplyTo: cid,
            Visibility: 1
        }
    }).then(result => {
        res.send(result)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
})

router.post('/addComment', (req, res) => {
    const { comment, replyTo, uid, mid, pid, imgs } = req.body
    db.Comment.create({
        UserId: uid,
        ModelId: mid,
        ProjectId: pid,
        Comment: comment,
        Images: imgs,
        Datetime: new Date(),
        ReplyTo: replyTo,
        Visibility: 1
    }).then(() => {
        res.send({success: 'ok'})
    }).catch(err => {
        res.status(500).send({
            message: err.message,
        });
    })
})

module.exports = router