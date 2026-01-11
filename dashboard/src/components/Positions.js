import React, { useEffect, useState } from "react";
import axios from "axios";

const REFRESH = 3000;

const Positions = () => {
  const [positions, setPositions] = useState([]);

  const fetchPositions = async () => {
    const res = await axios.get("http://localhost:3002/api/positions");
    setPositions((prev) =>
      res.data.map((p) => ({
        ...p,
        prevLtp: prev.find((x) => x._id === p._id)?.ltp ?? p.ltp,
      }))
    );
  };

  useEffect(() => {
    fetchPositions();
    const id = setInterval(fetchPositions, REFRESH);
    window.addEventListener("order-updated", fetchPositions);

    return () => {
      clearInterval(id);
      window.removeEventListener("order-updated", fetchPositions);
    };
  }, []);

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg</th>
              <th>LTP</th>
              <th>P&L</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((p) => {
              const blink =
                p.ltp > p.prevLtp
                  ? "blink-green"
                  : p.ltp < p.prevLtp
                  ? "blink-red"
                  : "";

              return (
                <tr key={p._id}>
                  <td>CNC</td>
                  <td>{p.instrument}</td>
                  <td>{p.qty}</td>
                  <td>{p.avg.toFixed(2)}</td>
                  <td className={blink}>{p.ltp.toFixed(2)}</td>
                  <td className={p.pnl >= 0 ? "profit" : "loss"}>
                    {p.pnl.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
