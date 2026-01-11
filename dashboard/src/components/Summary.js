import React, { useEffect, useState } from "react";
import axios from "axios";

const Summary = () => {
  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3002/api/dashboard/summary"
      );
      setSummary(res.data);
    } catch (err) {
      console.error("Summary fetch error", err);
    }
  };

  useEffect(() => {
  fetchSummary();

  const refresh = () => fetchSummary();

  
  window.addEventListener("order-updated", refresh);

  const id = setInterval(fetchSummary, 3000);

  return () => {
    clearInterval(id);
    window.removeEventListener("order-updated", refresh);
  };
}, []);


  if (!summary) return null;

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

     
      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{(summary.marginAvailable / 1000).toFixed(2)}k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{summary.marginsUsed}</span>
            </p>
            <p>
              Opening balance{" "}
              <span>
                {(summary.openingBalance / 1000).toFixed(2)}k
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

     
      <div className="section">
        <span>
          <p>Holdings ({summary.holdingsCount})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={summary.pnl >= 0 ? "profit" : "loss"}>
              {(summary.pnl / 1000).toFixed(2)}k{" "}
              <small>{summary.pnlPercent}%</small>
            </h3>
            <p>P&amp;L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value{" "}
              <span>{(summary.currentValue / 1000).toFixed(2)}k</span>
            </p>
            <p>
              Investment{" "}
              <span>{(summary.investment / 1000).toFixed(2)}k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
