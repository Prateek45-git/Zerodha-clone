const express = require("express");
const router = express.Router();
const FundsModel = require("../models/FundsModel");


router.get("/", async (req, res) => {
  let funds = await FundsModel.findOne();

 
  if (!funds) {
    funds = await FundsModel.create({
      openingBalance: 3740,
      usedMargin: 0,
    });
  }

  res.json({
    openingBalance: funds.openingBalance,
    usedMargin: funds.usedMargin,
    availableMargin: funds.openingBalance - funds.usedMargin,
  });
});


router.post("/add", async (req, res) => {
  const { amount } = req.body;

  let funds = await FundsModel.findOne();
  if (!funds) {
    funds = await FundsModel.create({
      openingBalance: amount,
      usedMargin: 0,
    });
  } else {
    funds.openingBalance += Number(amount);
    await funds.save();
  }

  res.json({ success: true });
});

module.exports = router;
