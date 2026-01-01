const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const msg = req.body.message.toLowerCase();

  
  if (msg.includes("market") && msg.includes("open")) {
    return res.json({
      reply: "Indian stock market 9:15 AM se 3:30 PM tak open hota hai 📈",
    });
  }

  
  if (msg.includes("p&l") || msg.includes("profit")) {
    return res.json({
      reply: "P&L ka matlab hai Profit & Loss 💰",
    });
  }

  
  if (msg.includes("price")) {
    try {
      const words = msg.split(" ");
      const symbol = words[words.length - 1].toUpperCase() + ".NS";

      const yahoo = await axios.get(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`
      );

      const price =
        yahoo.data.quoteResponse.result[0]?.regularMarketPrice;

      if (!price) throw "No price";

      return res.json({
        reply: `${symbol.replace(".NS", "")} ka current price ₹${price}`,
      });
    } catch {
      return res.json({
        reply: "Stock symbol samajh nahi aaya 🤔",
      });
    }
  }

 
  res.json({
    reply:
      "Stock trading se related poochho 📊 (example: INFY price, market open, P&L)",
  });
});

module.exports = router;


