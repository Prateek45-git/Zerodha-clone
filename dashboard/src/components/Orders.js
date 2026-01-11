import React, { useEffect, useState } from "react";
import axios from "axios";

const REFRESH = 3000;

const Orders = () => {
  const [orders, setOrders] = useState([]);


  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:3002/orders");

    const formatted = res.data.map(o => ({
      ...o,
      ltp: o.price,        
      prevLtp: o.price,
    }));

    setOrders(formatted);
  };

  useEffect(() => {
    fetchOrders();
    window.addEventListener("order-updated", fetchOrders);
    return () =>
      window.removeEventListener("order-updated", fetchOrders);
  }, []);


  useEffect(() => {
    if (orders.length === 0) return;

    const id = setInterval(async () => {
      try {
        const updated = await Promise.all(
          orders.map(async (o) => {
            const res = await axios.get(
              `http://localhost:3002/api/stocks/price/${o.name}`
            );

            return {
              ...o,
              prevLtp: o.ltp,
              ltp: Number(res.data.price),
            };
          })
        );

        setOrders(updated);
      } catch (err) {
        console.error("Live price update failed", err);
      }
    }, REFRESH);

    return () => clearInterval(id);
  }, [orders]);

  
  const placeOrder = async (name, mode) => {
    await axios.post("http://localhost:3002/newOrder", {
      name,
      qty: 1,
      price: 100,
      mode,
    });

    window.dispatchEvent(new Event("order-updated"));
  };

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Order Price</th>
              <th>LTP</th>
              <th>Mode</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, i) => {
              const blink =
                o.ltp > o.prevLtp
                  ? "blink-green"
                  : o.ltp < o.prevLtp
                  ? "blink-red"
                  : "";

              return (
                <tr key={i}>
                  <td>{o.name}</td>
                  <td>{o.qty}</td>
                  <td>₹{o.price}</td>

                  <td className={blink}>
                    ₹{Number(o.ltp).toFixed(2)}
                  </td>

                  <td className={o.mode === "BUY" ? "profit" : "loss"}>
                    {o.mode}
                  </td>

                  <td>
                    <button
                      className="btn btn-blue"
                      onClick={() => placeOrder(o.name, "BUY")}
                    >
                      BUY
                    </button>

                    <button
                      className="btn btn-grey"
                      style={{ background: "orangered", marginLeft: 6 }}
                      onClick={() => placeOrder(o.name, "SELL")}
                    >
                      SELL
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
