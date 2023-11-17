const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
  creationDate: {
    type: String,
    default: () => new Date().toLocaleDateString("en-GB"),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
