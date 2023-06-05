const TweetRouter = require("express").Router();
const { verifyToken } = require("../verifyToken");
const { createTweet, deleteTweet } = require("../controllers/tweet");

TweetRouter.post("/", verifyToken, createTweet);

TweetRouter.delete("/:id", verifyToken, deleteTweet);

module.exports = TweetRouter;
