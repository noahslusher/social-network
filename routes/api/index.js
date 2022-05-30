const router = require('express').Router()

const userRoutes = require('./user-routes')
// const thoughtRoutes = require('./thought-routes')
// const friendRoutes = require('./friend-routes')
// const reactionRoutes = require('./reaction-routes')

router.use('/users', userRoutes)

module.exports = router