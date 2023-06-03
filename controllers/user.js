const User = require("../models/User");

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

module.exports = { getAll, getOne };
