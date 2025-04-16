import axios from "axios";
import React, { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const res = await axios.post("/api/auth/login", {
          email,
          password,
        });
  
        localStorage.setItem("userInfo", JSON.stringify(res.data)); // ✅ store user
        localStorage.setItem("token", res.data.token);
  
        alert("Login Successful!");
        setEmail("");
        setPassword("");
        window.location.href = "/dashboard";
      } catch (err) {
        console.error(err);
        alert("Login failed. Please check your credentials.");
      }
    } else {
      alert("Please enter email and password.");
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Your Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-primary" onClick={handleLogin}>Login</button>

        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
