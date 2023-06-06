const TweetRouter = require("express").Router();
const { verifyToken } = require("../verifyToken");
const {
  createTweet,
  deleteTweet,
  likeOrDislikeTweet,
  getAllTweets,
  getUserTweets,
  getExploreTweet,
} = require("../controllers/tweet");

TweetRouter.post("/", createTweet);

TweetRouter.delete("/:id", deleteTweet);

// Like or Dislike a Tweet
TweetRouter.put("/:id/like", likeOrDislikeTweet);

// get all timeline tweets
TweetRouter.get("/timeline/:id", getAllTweets);

// get user Tweets only
TweetRouter.get("/user/all/:id", getUserTweets);

TweetRouter.get("/explore", getExploreTweet);

module.exports = TweetRouter;
