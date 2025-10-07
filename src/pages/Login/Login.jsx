import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      {/* Login Panel */}
      {isLogin ? (
        <div className="form-box login-box active">
          <h2>Login</h2>
          <form>
            <div className="input-box">
              <input type="email" required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <input type="password" required />
              <label>Password</label>
            </div>
            <button type="submit" className="btn">Login</button>
            <p className="switch">
              Don&apos;t have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Register</span>
            </p>
          </form>
        </div>
      ) : (
        /* Register Panel */
        <div className="form-box register-box active">
          <h2>Register</h2>
          <form>
            <div className="input-box">
              <input type="text" required />
              <label>Name</label>
            </div>
            <div className="input-box">
              <input type="email" required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <input type="password" required />
              <label>Password</label>
            </div>
            <div className="input-box">
              <input type="password" required />
              <label>Confirm Password</label>
            </div>
            <button type="submit" className="btn">Register</button>
            <p className="switch">
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}