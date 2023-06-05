const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: { type: String, required: true, max: 280 },
    likes: { type: Array, defaultValue: [] },
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", TweetSchema);

module.exports = Tweet;
