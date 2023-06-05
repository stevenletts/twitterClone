const User = require("../models/User");
constTweet = require("../models/Tweet");
const { handleError } = require("../error");

const getAll = async (req, res, next) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else return next(handleError(403, "you can only update your own account"));
};

const remove = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req, params.id);
      await Tweet.remove({ userId: req.params.id });
      res.status(200).json("user deleted");
    } catch (err) {
      next(err);
    }
  } else return next(handleError(403, "you can only delete your own account"));
};

const follow = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: { followers: req.body.id },
      });
      await currentUser.updateOne({ $push: { following: req.params.id } });
    } else res.status(403).json("already follow");

    res.status(200).json("following user");
  } catch (err) {
    next(err);
  }
};

const unfollow = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);

    if (user.followers.includes(req.body.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },
      });
      await currentUser.updateOne({ $pull: { following: req.params.id } });
    } else res.status(403).json("you do not follow them");

    res.status(200).json("unfolllowed user");
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, update, remove, follow, unfollow };
