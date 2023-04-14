const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: String,
  created_at: { type: Date, default: Date.now() },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
