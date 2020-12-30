const mongoose = require("mongoose");

const FinanceSchema = mongoose.Schema(
  {
    type: { type: String, require: true },
    amount: { type: Number, require: true },
    comments: { type: String, require: true },
    isApproved: { type: Boolean, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("finance", FinanceSchema, "Finance");
