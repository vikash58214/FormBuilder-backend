const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const isUserLoggedIn = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
    next();
  } catch (error) {
    return res.json({ message: "you've not logged In" });
  }
};

module.exports = isUserLoggedIn;
