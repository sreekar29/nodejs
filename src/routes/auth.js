const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");

authRouter.post("/signup", async (req, res) => {
  try {
    //validating the user data
    validateSignUpData(req);

    const { firstName, lastName, email, password, age, gender } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //creating a new instance of the user
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,
    });

    await user.save();
    res.status(200).send("User created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating user");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).send("User is successfully logged in");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) }).send("Logout Successfull");
});

module.exports = authRouter;
