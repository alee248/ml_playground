const express = require('express');
var router = express.Router();
const db = require('../models');

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

router.get('/:pid', (req, res) => {
    db.Project.findOne({
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