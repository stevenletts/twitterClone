const TweetRouter = require("express").Router();
const { verifyToken } = require("../verifyToken");
const {
  createTweet,
  deleteTweet,
  likeOrDislikeTweet,
  getAllTweets,
  getUserTweets,
} = require("../controllers/tweet");

TweetRouter.post("/", verifyToken, createTweet);

TweetRouter.delete("/:id", verifyToken, deleteTweet);

// Like or Dislike a Tweet
TweetRouter.put("/:id/like", likeOrDislikeTweet);

// get all timeline tweets
TweetRouter.get("/timeline/:id", getAllTweets);

// get user Tweets only
TweetRouter.get("/user/all/:id", getUserTweets);

module.exports = TweetRouter;
