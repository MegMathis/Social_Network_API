// get all users
// get single user by its _id and populated thought and friend data
// post a new user
// put to update a user by its _id,
// delete to remove user by its _id

const router = require("express").Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:id
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
