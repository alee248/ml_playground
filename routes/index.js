const { Router } = require('express');
const router = Router();

var userRouter = require('./user')
var projectRouter = require('./projects')
var modelRouter = require('./models')

router.use('/user', userRouter)
router.use('/projects', projectRouter)
router.use('/models', modelRouter)

module.exports = router