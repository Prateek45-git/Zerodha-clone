import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import DoughnutChart from "./DoughnoutChart";

import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlistSymbols, STOCK_REFRESH_INTERVAL } from "../data/data";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const responses = await Promise.all(
          watchlistSymbols.map((s) =>
            axios.get(`http://localhost:3002/api/stocks/price/${s}`)
          )
        );

        const cleaned = responses
          .map((r) => ({
            name: r.data.symbol,
            price: Number(r.data.price),
            percent: r.data.percent || "0.00%",
            isDown: r.data.percent?.includes("-"),
          }))
          .filter((s) => s.name && !isNaN(s.price));

        setWatchlist(cleaned);
      } catch (err) {
        console.error("Watchlist fetch error", err);
      }
    };

    fetchWatchlist();
    const id = setInterval(fetchWatchlist, STOCK_REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const chartData = {
    labels: watchlist.map((s) => s.name),
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
  <div className="search-container">
     <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
  </div>

  <div className="watchlist-scroll">
    <ul className="list mt-0">
      {watchlist.map((s) => (
        <WatchListItem key={s.name} stock={s} />
      ))}
    </ul>

    
    {watchlist.length > 0 && (
      <div className="watchlist-chart">
        <DoughnutChart data={chartData} />
      </div>
    )}
  </div>
</div>

  );
};

export default WatchList;


const WatchListItem = ({ stock }) => {
  const [show, setShow] = useState(false);
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  return (
    <li onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>

        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>

          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <span className="price">{stock.price.toFixed(2)}</span>
        </div>
      </div>

      {show && (
        <span className="actions">
          <Tooltip title="Buy" arrow TransitionComponent={Grow}>
            <button className="buy" onClick={() => openBuyWindow(stock.name)}>
              Buy
            </button>
          </Tooltip>

          <Tooltip title="Sell" arrow TransitionComponent={Grow}>
            <button className="sell" onClick={() => openSellWindow(stock.name)}>
              Sell
            </button>
          </Tooltip>

          <button className="action">
            <BarChartOutlined />
          </button>

          <button className="action">
            <MoreHoriz />
          </button>
        </span>
      )}
    </li>
  );
};
