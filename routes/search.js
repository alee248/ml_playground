const express = require("express");
var router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
    let { title } = req.body;
    console.log(title);

    let searcharr = {};
    try {
        const projects = await db.Project.findAll({
            where: {
                Title: {
                    [Op.like]: `%${title}%`,
                },
            },
            attributes: ["Id", "Title", "Description"],
        });
        searcharr["projects"] = projects;
    } catch (err) {
        console.error(err);
    }
    try {
        const models = await db.Model.findAll({
            where: {
                Name: {
                    [Op.like]: `%${title}%`,
                },
            },
            attributes: ["Id", "Name", "Details"],
        });
        searcharr["models"] = models;
    } catch (err) {
        console.error(err);
    }

    res.send(searcharr);
});

router.post('/getUserByUsername', (req, res) => {
    const { username } = req.body
    
    db.User.findAll({
        where: {
            Username: {
                [Op.like]: `%${username}%`
            }
        },
        attributes: ['Id', 'Username', 'Email']
    }).then(result => {
        res.send(result)
    }).catch(err => {
        res.sendStatus(500, {
            message: err.message
        })
    })
})

module.exports = router;
