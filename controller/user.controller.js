const User = require("../models/User");

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500);
    next(err);
  }
};

const userById = async (req, res, next) => {
  console.log("id", req.params.userId);
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(500);
    next(err);
  }
};

module.exports = { allUsers, userById };