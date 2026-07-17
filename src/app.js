const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.get("/admin/createUser", adminAuth, (req,res)=>{
    res.send("User created successfully");
})

app.get("/user/getUser", userAuth, (req,res)=>{
    res.send("User details fetched successfully");
});

app.get("/admin/deleteAllUsers", adminAuth, (req,res)=>{
    res.send("All users deleted");
});

app.delete("/admin/deleteUser", adminAuth, (req,res)=>{
    res.send("User deleted successfully");
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
