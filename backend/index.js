require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const positionsRoutes = require("./routes/positionsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const chatRoutes = require("./routes/chatRoutes");

const { OrdersModel } = require("./models/OrdersModel");
const { PositionsModel } = require("./models/PositionsModel");
const fundsRoutes = require("./routes/fundsRoutes");
const { HoldingsModel } = require("./models/HoldingsModel");

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/funds", fundsRoutes);
app.use("/api/chat", chatRoutes);

// HOLDINGS
app.get("/allHoldings", async (req, res) => {
  const data = await HoldingsModel.find({});
  res.json(data);
});


const FundsModel = require("./models/FundsModel");


// ================= ORDERS (GET) =================
app.get("/orders", async (req, res) => {
  try {
    const orders = await OrdersModel.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Orders fetch failed" });
  }
});


// ORDER PLACE
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    // Save Order
    await OrdersModel.create({ name, qty, price, mode });

    // UPSERT POSITION
    let position = await PositionsModel.findOne({ instrument: name });

    if (position) {
      const totalQty = position.qty + qty;
      const newAvg =
        (position.avg * position.qty + price * qty) / totalQty;

      position.qty = totalQty;
      position.avg = Number(newAvg.toFixed(2));
      await position.save();
    } else {
      await PositionsModel.create({
        instrument: name,
        qty,
        avg: price,
      });
    }

    // FUNDS UPDATE 
    let funds = await FundsModel.findOne();
    if (!funds) {
      funds = await FundsModel.create({
        openingBalance: 100000,
        usedMargin: 0,
        availableMargin: 100000,
      });
    }

    funds.usedMargin += qty * price;
    funds.availableMargin =
      funds.openingBalance - funds.usedMargin;

    await funds.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  }
});



mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log("Backend running on 3002")
    );
  });
