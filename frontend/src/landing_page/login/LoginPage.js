import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3002/api/auth/login",
        {
          email: email.toLowerCase().trim(),
          password,
        }
      );

      // ✅ TOKEN SAVE
      localStorage.setItem("token", res.data.token);

      // 🔥 TRY DEMO CHECK (QUERY PARAM)
      const redirect = searchParams.get("redirect");

      if (redirect === "dashboard") {
        // ❗ React Router bypass
        window.location.replace("http://localhost:3001");
        return;
      }

      // 🔵 NORMAL LOGIN
      navigate("/home");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Login</h2>
      <form>
        <label>Username</label>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "300px", marginTop: "20px" }}
      />
      <br />

      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "300px", marginTop: "20px" }}
      />
      <br />

      <button
        onClick={handleLogin}
        className="btn btn-primary"
        style={{ marginTop: "30px", width: "150px" }}
      >
        Login
      </button>
      </form>
    </div>
  );
}

export default LoginPage;
