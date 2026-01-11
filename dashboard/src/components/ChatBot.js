import React, { useState } from "react";
import axios from "axios";
import "./ChatBot.css";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 Ask me about stocks & trading!" },
  ]);

  const sendMessage = async () => {
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setMsg("");

    const res = await axios.post("http://localhost:3002/api/chat", {
      message: msg,
    });

    setMessages((prev) => [
      ...prev,
      { from: "bot", text: res.data.reply },
    ]);
  };

  return (
    <>
      <div className="chat-btn" onClick={() => setOpen(!open)}>
        🤖 
      </div>

      {open && (
        <div className="chat-box">
          <div className="chat-header">Stock Assistant</div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={m.from}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Ask about stocks..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
