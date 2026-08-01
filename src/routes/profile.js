const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const { validateEditProfileData, validateEditPassword } = require("../utils/validation");
const bcrypt = require('bcrypt');
const User = require('../models/user');

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Not allowed to edit");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send(`${loggedInUser.firstName} 's profile is updated successfully`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/editpassword", userAuth, async (req, res) => {
  try {
    const {password} = req.body;
    if(!validateEditPassword(password)){
        throw new Error("ERROR: " +err.message);
    }
    const latestPassword = await bcrypt.hash(password, 10);
    const user = req.user;
    user.password = latestPassword;
    await user.save();
    res.status(201).send("Password reset successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
