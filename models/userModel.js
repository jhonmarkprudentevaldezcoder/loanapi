const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    userStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", userSchema);

module.exports = Users;
