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

// TODO: push the file to redis
router.post('/test/:mid', upload.single('file'), (req, res) => {

    // This is the file
    const file = req.file

    // This is the model id
    const mid = req.params.mid

    // when pushed to redis or failed, send status back
    res.send({"status": "done"})
})


module.exports = router