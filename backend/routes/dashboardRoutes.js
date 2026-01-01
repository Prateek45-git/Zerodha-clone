const express = require("express");
const axios = require("axios");
const router = express.Router();

const { HoldingsModel } = require("../models/HoldingsModel");
const FundsModel = require("../models/FundsModel");

router.get("/summary", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});
    let funds = await FundsModel.findOne();

    if (!funds) {
      funds = await FundsModel.create({
        openingBalance: 100000,
        usedMargin: 0,
        availableMargin: 100000,
      });
    }

    let investment = 0;
    let currentValue = 0;

    for (let h of holdings) {
      investment += h.avg * h.qty;

      let ltp = h.avg;
      try {
        const r = await axios.get(
          `http://localhost:3002/api/stocks/price/${h.name}`
        );
        ltp = Number(r.data.price || h.avg);
      } catch {}

      currentValue += ltp * h.qty;
    }

    const pnl = currentValue - investment;

    res.json({
      marginAvailable: funds.availableMargin,
      marginsUsed: funds.usedMargin,
      openingBalance: funds.openingBalance,
      holdingsCount: holdings.length,
      investment: Number(investment.toFixed(2)),
      currentValue: Number(currentValue.toFixed(2)),
      pnl: Number(pnl.toFixed(2)),
      pnlPercent: investment
        ? Number(((pnl / investment) * 100).toFixed(2))
        : 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Summary failed" });
  }
});

module.exports = router;
