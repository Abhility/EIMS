const Leave = require('../models/Leave');
const User = require('../models/User');

const allLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find().populate('user');
    res.json(leaves);
  } catch (err) {
    res.status(500);
    next(err);
  }
};

const leaveById = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.leaveId).populate('user');
    res.json(leave);
  } catch (err) {
    console.log(err);
    res.status(500);
    next(err);
  }
};

const allLeavesOfUser = async (req, res, next) => {
  try {
    const leaves = await Leave.find({ user: req.params.userId });
    res.json(leaves);
  } catch (err) {
    console.log(err);
    res.status(500);
    next(err);
  }
};

const addLeave = async (req, res, next) => {
  const { startDate, endDate, reason } = req.body;
  try {
    let diff = new Date(endDate) - new Date(startDate);
    let days = Math.round(diff / (1000 * 60 * 60 * 24)) + 1;
    const user = await User.findById(req.params.userId);
    console.log(user);
    console.log(startDate, endDate, reason, days);
    if (user) {
      if (days > user.leaveQuota) throw new Error('Leave quota exceeded');
      else {
        user.leaveQuota = user.leaveQuota - days;
        const leave = await Leave.create({
          startDate,
          endDate,
          days,
          reason,
          isApproved: null,
          user: user._id,
        });
        user.leaves.push(leave);
        await User.updateOne({ _id: user._id }, user);
        res.status(201).json(leave);
      }
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    next(err);
  }
};

const updateLeave = async (req, res, next) => {
  const { isApproved } = req.body;
  try {
    let leave = await Leave.findById(req.params.leaveId).populate('user');
    if (leave) {
      if (leave.isApproved != null) throw new Error('Leave already processed');
      if (isApproved) {
        leave.isApproved = isApproved;
        await Leave.updateOne({ _id: leave._id }, leave);
      } else {
        const user = leave.user;
        user.leaveQuota = user.leaveQuota + leave.days;
        await User.updateOne({ _id: user._id }, user);
        await Leave.updateOne({ _id: leave._id }, leave);
      }
      res.status(200).json({ message: 'Leave processed' });
    } else {
      throw new Error('Invalid leave Id');
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    next(err);
  }
};

module.exports = {
  allLeaves,
  leaveById,
  addLeave,
  updateLeave,
  allLeavesOfUser,
};
