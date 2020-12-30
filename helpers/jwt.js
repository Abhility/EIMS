const jwt = require("jsonwebtoken");

const generateToken = (data) =>
  jwt.sign({ userId: data.id, userRole: data.role }, process.env.SECRET_KEY);

module.exports = { generateToken };
