const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // figure out timestamp
      // use getter method to format the timestamp on query
    },
    //   user that created this thougth
    username: {
      type: String,
      required: true,
    },
    //   like replies
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
  //   create a virtual called reactionCount that retrieves the length of thought's reactions array field on query
);
thoughtSchema.virtual(reactionCount).get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
