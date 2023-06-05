const { handleError } = require("../error");

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();

    const { password, ...other } = newUser._doc;

    const token = jwt.sign({ id: newUser._id }, process.env.JWT);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(handleError(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(handleError(400, "password not correct"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...other } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(other);
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, signIn };
