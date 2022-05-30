const { Thought, User } = require('../models')

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  },

  // get Thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  },



 addThought: ({ body }, res) => {
  Thought.create(body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
},

  // update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this ID" })
          return
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.json(err))
  },

  // delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err))
  },

  // add friend to friend list
  addReaction ({ params, body }, res) {
   Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } })
     .select('-__v -reactions._id')
     .then(data => {
       if (!data) {
         res.status(404).json({ message: 'No thought found with this id!' });
         return;
       }
       res.json(data);
     })
     .catch(err => res.json(err));
 },

 deleteReaction ({ params }, res) {
   Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
     .select('-__v -reactions._id')
     .then(data => res.json(data))
     .catch(err => res.json(err));
 },
}

module.exports = thoughtController
