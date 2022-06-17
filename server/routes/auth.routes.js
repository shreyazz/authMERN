//  login and signup routes for user

const express = require("express");
const router = express.Router();
const userSchema = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authorizeUser = require("../middlewares/auth");
const { response } = require("express");

// Sign In / Login
router.post("/login", async (req, res, next) => {
  try {
    const secretKey = process.env.JWT_SECRET;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: "Please fill all the data! 🔴" });
    }
    const findUser = await userSchema.findOne({
      email: email,
    });
    if (!findUser) {
      return res.status(401).json({ message: "Email not found! 🔴" });
    }
    const passMatching = await bcrypt.compare(password, findUser.password);
    if (!passMatching) {
      return res.status(401).json({ message: "Auth Failed" });
    }
    let token = jwt.sign(
      { email: findUser.email, userId: findUser._id },
      secretKey
    );
    return res
      .status(200)
      .json({ message: "User logged in! 🟢", token: token, details: findUser });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Some error occurred in login route! 🔴" });
  }
});

// sign up / registration of a new user

router.post("/register", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(422).json({ message: "Please fill all the data! 🔴" });
    }
    const findUser = await userSchema.findOne({ email });
    if (findUser) {
      res.status(409).json({ message: "user is already present." });
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = await userSchema.create({
      name,
      email,
      password: hashedPass,
    });

    if (!newUser) {
      res.json({
        message: "Some error occurred during registration of the user! 🔴",
      });
    }
    res.status(201).json({ message: "User created! 🟢", details: newUser });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Some error occurred in register route! 🔴" });
  }
});

router.route("/all-users").get(authorizeUser, (req, res, next) => {
  userSchema.find((err, data) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(data);
  });
});
module.exports = router;