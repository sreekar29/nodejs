const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sreekar29:wZPjmly32KVhmHBp@namastenode.gsdn8l2.mongodb.net/",
  );
};

module.exports = connectDB;

