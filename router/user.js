const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const userRouter = express.Router();
const dotenv = require("dotenv");
const isUserLoggedIn = require("../middleware/user");

dotenv.config();

userRouter.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (user) {
      return res.json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    res.json({ message: "success" });
  } catch (error) {
    res.send(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.json({ message: "user not found" });
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.json({ message: "invalid password" });
    }
    const jwToken = await jwt.sign(user, process.env.JWT_KEY);

    res.json({ message: "success", token: jwToken });
  } catch (error) {
    res.send(error);
  }
});

userRouter.get("/getUser", isUserLoggedIn, (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.send(error);
  }
});

module.exports = userRouter;
