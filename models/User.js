const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
    phone: { type: String, require: true, unique: true },
    address: { type: String, require: true },
    team: { type: String, require: true },
    title: { type: String, require: true },
    salary: { type: String, require: true },
    photoUrl: { type: String, require: true },
    leaveQuota: { type: Number, require: true },
    finances: [{ type: mongoose.Schema.Types.ObjectId, ref: "finance" }],
    leaves: [{ type: mongoose.Schema.Types.ObjectId, ref: "leave" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema, "User");
