import React, { useState } from "react";
import login from "../assests/login.svg";
import axios from "axios";
import {Link} from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", form);
      alert("User logined in successfully");
      console.log(response.data.message);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-8"
          style={{
            textAlign: "center",
            background: "#F2E4C6",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="row">
            <div className="col-11" style={{ height: "80vh" }}>
              <img src={login} alt="login" style={{ height: "100%" }} />
            </div>
            <div className="button col-1" style={{ textAlign: "right" }}>
              <button
                className="signup-button"
                style={{
                  backgroundColor: "#d7cfc2",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#9e9284",
                  width: "100px",
                }}
                onClick={() => (window.location.href = "/signup")}
              >
                Signup
              </button>
              <br></br>
              <br></br>
              <button
                className="login-button"
                style={{
                  backgroundColor: "#9e9284",
                  color: "white",
                  border: "none",
                  padding: "14px 20px 14px 14px",
                  fontSize: "18px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  width: "100px",
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div
          className="col-4"
          style={{
            background: "#a8d5ba",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <h3>Welcome</h3>
              <h3>To</h3>
              <h3 style={{ color: "#3A9D9B" }}>PawVaidya !</h3>
              <p>Access expert advice for your furry friends</p>
            </div>
             <br></br>
            <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
              <input
                className="input-signup"
                placeholder="Username"
                name="username"
                onChange={handleInput}
              />
              <br />
              <br />
              <input
                className="input-signup"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleInput}
              />
              <br />
              <br />
              
              <button
                className="btn"
                style={{ background: "#3A9D9B" }}
                type="submit"
              >
                Login
              </button>
            </form><br/>
            <p style={{textAlign:"center"}}>New Here? <Link to="/signup">SignUp Here</Link> to connect with trusted vets</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
