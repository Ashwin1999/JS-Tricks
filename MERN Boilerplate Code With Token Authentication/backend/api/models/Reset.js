const mongoose = require("mongoose");

const ResetSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
  },
  { timestamps: true }
);

ResetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

module.exports = mongoose.model("Reset", ResetSchema);
