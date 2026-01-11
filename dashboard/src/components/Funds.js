import React, { useEffect, useState } from "react";
import axios from "axios";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [amount, setAmount] = useState("");

  const fetchFunds = async () => {
    const res = await axios.get("http://localhost:3002/api/funds");
    setFunds(res.data);
  };

  const addFunds = async () => {
    await axios.post("http://localhost:3002/api/funds/add", {
      amount,
    });

    setAmount("");
    fetchFunds(); 
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  if (!funds) return null;

  return (
    <>
    
      <h3>Funds</h3>
      <p>Opening Balance: ₹{funds.openingBalance}</p>
      <p>Used Margin: ₹{funds.usedMargin}</p>
      <p className="profit">Available Margin: ₹{funds.availableMargin}</p>
      
      <label className="formLabel" style={{ marginInline: "1px" }}></label>
      <input
        placeholder="Add Funds.."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ lineHeight: "2", width: "200px", borderRadius: "6px", marginTop: "5px" }}
      />{" "}
      <br />
      <br />
      <button
        onClick={addFunds}
        className=" btn-primary fs-5 mb-5 col-lg-6 mt-5"
        style={{
          width: "15%",
          backgroundColor: "#006afdf2",
          color: "white",
          padding: "10px 18px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
          marginLeft: "30px"
        }}
      >
        Add Funds
      </button>
      
    </>
  );
};

export default Funds;
