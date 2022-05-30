const { User } = require('../models')

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  },

  // get user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  },


  //create new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err))
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID" })
          return
        }
        res.json(dbUserData)
      })
      .catch(err => res.json(err))
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err))
  },

  // add friend to friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      {
        $addToSet: {
          friends: params.friendId,
        },
      },
      { new: true, runValidators: true }
    )
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      {
        $pull: {
          friends: params.friendId,
        },
      },
      { new: true, runValidators: true }
    )
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  },
}

module.exports = userController