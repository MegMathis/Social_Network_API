// get all thoughts
// get to get a single thought by its _id
// post to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// put to update a thought by its _id
// delete to remove a thought by its _id
// post to create a reaction stored in a single thought's reactions array field
// delete to pull and remove a reaction by the reaction's reactionId value

const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtsById,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtsController");

// /api/thoughts - getAllThought and CreateThought
router.route("/").get(getAllThoughts).post(addThought);

// /api/thoughts/:id - getThoughtById, updateThought, and deleteThought
router
  .route("/:thoughtId")
  .get(getThoughtsById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions - addReaction
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId - removeReaction
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
