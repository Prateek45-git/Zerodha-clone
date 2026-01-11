import React, { useEffect, useState } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);


  const fetchHoldings = async () => {
    try {
      const res = await axios.get("http://localhost:3002/allHoldings");

      const formatted = res.data.map((h) => ({
        ...h,
        ltp: Number(h.price) || 0,
        prevLtp: Number(h.price) || 0,
      }));

      setHoldings(formatted);
    } catch (err) {
      console.error("Holdings fetch failed", err);
    }
  };

  
  useEffect(() => {
    fetchHoldings();
    window.addEventListener("order-updated", fetchHoldings);
    return () =>
      window.removeEventListener("order-updated", fetchHoldings);
  }, []);

 
  useEffect(() => {
    if (!Array.isArray(holdings) || holdings.length === 0) return;

    const interval = setInterval(async () => {
      try {
        const updated = await Promise.all(
          holdings.map(async (h) => {
            const res = await axios.get(
              `http://localhost:3002/api/stocks/price/${h.name}`
            );

            return {
              ...h,
              prevLtp: h.ltp,
              ltp: Number(res.data.price) || h.ltp,
            };
          })
        );

        setHoldings(updated);
      } catch (err) {
        console.error("Live price update failed", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [holdings.length]);

  
  const graphData = {
  labels: holdings.map((h) => h.name),
  datasets: [
    {
      label: "Current Value (₹)",
      data: holdings.map((h) =>
        Number((h.ltp * h.qty).toFixed(2))
      ),
      backgroundColor: "rgba(255, 99, 132, 0.65)", // 💗 only pink
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      barThickness: 50,        
maxBarThickness: 35, 

    },
  ],
};


  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

     
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg</th>
              <th>LTP</th>
              <th>Value</th>
              <th>P&amp;L</th>
              <th>Day</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((s, i) => {
              const value = s.ltp * s.qty;
              const pnl = value - s.avg * s.qty;

              const blink =
                s.ltp > s.prevLtp
                  ? "blink-green"
                  : s.ltp < s.prevLtp
                  ? "blink-red"
                  : "";

              return (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.qty}</td>
                  <td>{s.avg.toFixed(2)}</td>

                  <td className={blink}>{s.ltp.toFixed(2)}</td>

                  <td>{value.toFixed(2)}</td>

                  <td className={pnl >= 0 ? "profit" : "loss"}>
                    {pnl.toFixed(2)}
                  </td>

                  <td className={pnl >= 0 ? "profit" : "loss"}>
                    {((pnl / (s.avg * s.qty)) * 100).toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      
      <div style={{ marginTop: "40px"}}>
        <VerticalGraph data={graphData} />
      </div>
    </>
  );
};

export default Holdings;
