const Finance = require('../models/Finance');
const User = require('../models/User');

const allFinances = async (req, res, next) => {
    try {
        const finances = await Finance.find().populate('user');
        res.json(finances);
    } catch (err) {
        res.status(500);
        next(err);
    }
}

const allFinancesOfUser = async (req, res, next) => {
    try {
        const finances = await Finance.find({ user: req.params.userId });
        res.json(finances);
    } catch (err) {
        console.log(err);
        res.status(500);
        next(err);
    }
}

const addFinance = async (req, res, next) => {
    const { type, amount, comments } = req.body;
    try {
        const user = await User.findById(req.params.userId);
        console.log(user);
        console.log(type, amount, comments);
        if (user) {
            const finance = await Finance.create({
                type,
                amount,
                comments,
                isApproved: null,
                user: user._id,
            });
            user.finances.push(finance);
            await User.updateOne({ _id: user._id }, user);
            res.status(201).json(finance);

        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500);
        next(err);
    }
}

const financeById = async (req, res, next) => {
    try {
        const finance = await Finance.findById(req.params.financeId).populate('user');
        res.json(finance);
    } catch (error) {
        console.log(error);
        res.status(500);
        next(error);
    }
}
const updateFinance = async (req, res, next) => {
    const { isApproved } = req.body;
    try {
        let finance = await Finance.findById(req.params.financeId);
        if (finance) {
            if (finance.isApproved != null)
                throw new Error('Finance already processed');
            finance.isApproved = isApproved;
            await Finance.updateOne({ _id: finance._id }, finance);
            res.status(200).json({ message: 'Finance processed' });
        } else {
            throw new Error('Invalid Finance Id');
        }
    } catch (err) {
        console.log(err);
        res.status(500);
        next(err);
    }
}


module.exports = { allFinances, allFinancesOfUser, addFinance, financeById, updateFinance };
