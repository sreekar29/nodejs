const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from the server");
});

app.get("/about", (req, res) => {
    res.send("Hello from about page");
});

app.get("/contact", (req, res) => {
    res.send("Hello from contact page");
});

app.listen(7777, () => {
    console.log("Server is running on port 7777");
});