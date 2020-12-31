const User = require('../models/User');

const allUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500);
        next(err);
    }
}

const userById = async (req, res, next) => {
    console.log('id', req.params.userId)
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.status(500);
        next(err);
    }
}

//user registration
const userRegistration = async (req, res, next) => {
    const { email, phone } = { email: req.body.email, phone: req.body.phone };
    const emailExistence = await User.findOne({ email });
    const phoneExistence = await User.findOne({ phone });
    const phonExistence = await User.findOne();
    if (emailExistence) res.status(409).json({ message: "Email already exists" });
    else if (phoneExistence)
    res.status(409).json({ message: "Phone number already exists" });
    else {
    var isRegister = false;
    const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    phone: req.body.phone,
    address: req.body.address,
    team: req.body.team,
    title: req.body.title,
    salary: req.body.salary,
    photoUrl: req.body.photoUrl,
    leaveQuota: req.body.leaveQuota,
    };
    await User.insertMany(newUser, function (err) {
    if (err) throw err;
    else {
    res.status(200).json({message:"Registration successful"});
    }
});
    } 

};

module.exports = { allUsers, userById,userRegistration}