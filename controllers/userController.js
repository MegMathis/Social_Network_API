const { User } = require("../models");

// api/users
const userController = {
  // get all users
  getUsers(req, res) {
    User.find({})
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get single user by its _id and populated thought and friend data
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .select("-__v")
      .populate({
        path: "friends",
      })
      .populate({
        path: "thoughts",
      })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found with this id" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // post a new user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // put to update a user by its _id,
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found with this id" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // delete to remove user by its _id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found with this id" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found with this id" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  // delete to remove user by its _id
  removeFriend({ params }, res) {
    console.log("remove friend", params.friendId);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },
};
