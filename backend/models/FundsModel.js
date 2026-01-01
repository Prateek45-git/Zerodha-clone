const mongoose = require("mongoose");

const FundsSchema = new mongoose.Schema({
  openingBalance: {
    type: Number,
    required: true,
  },
  usedMargin: {
    type: Number,
    default: 0,
  },
  availableMargin: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Funds", FundsSchema);
