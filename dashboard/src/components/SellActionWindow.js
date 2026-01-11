import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const { closeSellWindow } = useContext(GeneralContext) || {};

  const handleSellClick = async () => {
    if (!uid) return alert("No stock selected");
    if (stockQuantity <= 0 || stockPrice <= 0)
      return alert("Quantity and price must be greater than 0");

    try {
      setLoading(true);

      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "SELL",
      });
      window.dispatchEvent(new Event("order-updated"));


      if (typeof closeSellWindow === "function") closeSellWindow();
    } catch (error) {
      console.error("Sell order failed:", error.response?.data || error.message);
      alert("Failed to place sell order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" id="buy-window" draggable>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min={1}
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              min={0}
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button
            className="btn btn-blue"
            style={{ backgroundColor: "orangered" }}
            onClick={handleSellClick}
            disabled={loading}
          >
            {loading ? "Placing..." : "SELL"}
          </button>

          <button
            className="btn btn-grey"
            onClick={closeSellWindow}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
