const express = require('express');
var router = express.Router();
const db = require('../models');

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

router.get('/:mid', (req, res) => {
  db.Model.findOne({
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


module.exports = router