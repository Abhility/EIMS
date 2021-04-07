const User = require('../models/User');
const { generateToken } = require('../helpers/jwt');

const loginController = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        const token = generateToken({ id: user._id, role: user.role });
        res.setHeader('Authorization', token);
        res.status(200).json({
          message: 'Login successfull!',
          token,
          userId: user._id,
          name: user.name,
          role: user.role,
        });
      } else {
        res.status(400).json({ message: 'invalid password' });
      }
    } else {
      res.status(404);
      throw new Error(`User with email '${email}' not found`);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { loginController };
