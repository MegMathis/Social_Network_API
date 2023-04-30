const Thought = require("./Thought");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    //   array of _id values referencing the THOUGHT model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    //   array of _id values referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // indicating we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// create a virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// bonus.. remove user associated thoughts when deleted
// pre hook to findoneanddelete.  prehook asynchronous
userSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function () {
    console.log("user before delete");
    const document = await this.model.findOne(this.getQuery());
    console.log(document.username);
    await Thought.deleteMany({ username: document.username });
  }
);

const User = model("user", userSchema);

module.exports = User;
