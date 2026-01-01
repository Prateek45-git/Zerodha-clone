const mongoose = require("mongoose");

const PositionsSchema = new mongoose.Schema({
  product: {
    type: String,
    default: "CNC",
  },
  instrument: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  avg: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = {
  PositionsModel: mongoose.model("positions", PositionsSchema),
};
