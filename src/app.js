const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed");
  });

app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  //   await user.save();
  try {
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(500).send("Error creating user");
  }
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
