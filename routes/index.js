const { Router } = require('express');
const router = Router();

var userRouter = require('./user')
var projectRouter = require('./projects')
var modelRouter = require('./models')
var resultRouter = require('./results')
var searchRouter = require('./search')

router.use('/user', userRouter)
router.use('/projects', projectRouter)
router.use('/models', modelRouter)
router.use('/results', resultRouter)
router.use('/search', searchRouter)

module.exports = router