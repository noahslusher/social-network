const router = require('express').Router()
const {
 getAllThoughts,
 getThoughtById,
 addThought,
 updateThought,
 deleteThought,
 addReaction,
 deleteReaction
} = require('../../controllers/thought-controller')

// /api/thoughts
router
.route('/')
.get(getAllThoughts)
.post(addThought)


// /api/thoughts/:id
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

// /api/thought/:userId
router
.route('/:userId').post(addThought)

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction)
.delete(deleteReaction)


module.exports = router

