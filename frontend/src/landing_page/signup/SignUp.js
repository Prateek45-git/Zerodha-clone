import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:3002/api/auth/register", {
        name,
        email,
        password,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });

      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
  <div className="container">
    <div className="row align-items-center min-vh-100">
      
      
      <div className="col-lg-6 text-center">
        <img
          src="media/images/signup.png"
          className="img-fluid"
          alt="signup"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="col-lg-6">
        <div className="mx-auto" style={{ maxWidth: "420px" }}>
          
          <h2 className="text-center mb-3">Signup Now</h2>
          <p className="text-center text-muted mb-4">
            Open a free demat and trading account
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            
            <div className="mb-3">
              <label className="formLabel">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="formLabel">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="formLabel">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={handleSignup}
              className="btn btn-primary w-100 mt-3"
            >
              Sign up for free
            </button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <a href="/login" style={{ textDecoration: "none" }}>
                Login
              </a>
            </p>
          </form>

        </div>
      </div>
    </div>
  </div>
);

}

export default SignupPage;
