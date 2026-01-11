import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);

  
  const ctx = useContext(GeneralContext);
  console.log("GeneralContext value:", ctx); 
  const { closeBuyWindow } = ctx || {};

  const handleBuyClick = async () => {
    try {
      setLoading(true);
      if (!uid) throw new Error("No stock selected");
      if (!stockQuantity || Number(stockQuantity) <= 0) throw new Error("Invalid quantity");
      if (!stockPrice || Number(stockPrice) <= 0) throw new Error("Invalid price");

      const payload = {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      };

      const res = await axios.post("http://localhost:3002/newOrder", payload);
      window.dispatchEvent(new Event("order-updated"));
      console.log("Order response:", res.data);

      if (typeof closeBuyWindow === "function") closeBuyWindow();
      else console.error("closeBuyWindow is not a function:", closeBuyWindow);
    } catch (err) {
      console.error("Buy failed:", err, err.response?.data);
      alert("Failed to place order: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    if (typeof closeBuyWindow === "function") closeBuyWindow();
    else console.error("closeBuyWindow is not a function:", closeBuyWindow);
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              min={1}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              min={0}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick} disabled={loading} type="button">
            {loading ? "Placing..." : "Buy"}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick} disabled={loading} type="button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
