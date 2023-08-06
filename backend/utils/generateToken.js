const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SCERET, { expiresIn: "30d" });
};

module.exports = generateToken;
