const { Router } = require('express');
const router = Router();

var userRouter = require('./user')

router.use('/user', userRouter)

module.exports = router