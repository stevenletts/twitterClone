const Tweet = require("../models/Tweet");
const { handleError } = require("./error");

const createTweet = async (req, res, next) => {
  const newTweet = new Tweet(req.body);
  try {
    const savedTweet = await newTweet.save();
    res.status(200).json(savedTweet);
  } catch (err) {
    next(handleError(500, err));
  }
};

const deleteTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.body.userId) {
      await tweet.deleteOne();
      res.status(200).json("tweet has been deleted");
    } else {
      handleError(500, err);
    }
  } catch (err) {
    handleError(500, err);
  }
};

const likeOrDislikeTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("tweet has been liked");
    } else {
      await tweet.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("tweet has been disliked");
    }
  } catch (err) {
    handleError(500, err);
  }
};

const getAllTweets = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: currentUser._id });
    const followersTweets = await Promise.all(
      currentUser.following.map((followerId) => {
        return Tweet.find({ userId: followerId });
      })
    );
    res.status(200).json(userTweets.concat(...followersTweets));
  } catch (err) {
    handleError(500, err);
  }
};

const getUserTweets = async (req, res, next) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(userTweets);
  } catch (err) {
    handleError(500, err);
  }
};

const getExploreTweet = async (req, res, next) => {
  try {
    const exploreTweets = await Tweet.find({ likes: { $exists: true } }).sort({
      likes: -1,
    });

    res.status(200).json(exploreTweets);
  } catch (err) {
    handleError(500, err);
  }
};

module.exports = {
  createTweet,
  deleteTweet,
  likeOrDislikeTweet,
  getAllTweets,
  getUserTweets,
  getExploreTweet,
};
