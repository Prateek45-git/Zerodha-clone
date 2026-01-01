const express = require("express");
const axios = require("axios");
const router = express.Router(); 

const { PositionsModel } = require("../models/PositionsModel");

router.get("/", async (req, res) => {
  try {
    const positions = await PositionsModel.find({});

    const enriched = await Promise.all(
      positions.map(async (p) => {
        let ltp = p.avg;

        try {
          const symbol = `${p.instrument}.NS`;

          const y = await axios.get(
            `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`
          );

          const quote = y.data?.quoteResponse?.result?.[0];
          if (quote?.regularMarketPrice) {
            ltp = quote.regularMarketPrice;
          }
        } catch (e) {
          ltp = p.avg;
        }

        const pnl = (ltp - p.avg) * p.qty;

        return {
          ...p.toObject(),
          ltp: Number(ltp.toFixed(2)),
          pnl: Number(pnl.toFixed(2)),
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error("Positions error:", err);
    res.status(500).json({ error: "Positions fetch failed" });
  }
});

module.exports = router; 
