// get all thoughts
// get to get a single thought by its _id
// post to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// put to update a thought by its _id
// delete to remove a thought by its _id
// post to create a reaction stored in a single thought's reactions array field
// delete to pull and remove a reaction by the reaction's reactionId value

const { Thought, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      // .populate({
      //   path: "thoughts",
      // })
      .sort({ _id: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  getThoughtsById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      // .select("-__v")
      // .populate({
      //   path: "thoughts",
      // })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with that id" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thoughtData) => {
        console.log(thoughtData);
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with that id" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought with this id found" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        console.log(deletedThought);
        User.findOneAndUpdate(
          { username: deletedThought.username },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        ).then((userData) => {
          if (!userData) {
            res.status(404).json({ message: "No user found with that id" });
            return;
          }
          res.json(userData);
        });
      })
      .catch((err) => res.json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought with that id found" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
