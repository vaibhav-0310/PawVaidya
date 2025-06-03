import React, { useState } from "react";
import login from "../../assests/login.svg"
import axios from "axios";
import {Link} from "react-router-dom";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const re = await axios.post("/api/send-otp", {
        username: form.username,
      });
      setOtpSent(true);
      alert("OTP sent to your email");
    } catch (err) {
      console.log(err);
      alert("Invalid credentials or OTP not sent");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", form, {
        withCredentials: true,
      });
      alert("User logined in successfully");
      console.log(response.data.message);
      navigate("/");
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-8"
          style={{
            textAlign: "center",
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
            
            
          </div>
        </div>
        <div
          className="col-4"
          style={{
            
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
            <form onSubmit={otpSent ? handleSubmit : handleSendOtp} style={{ textAlign: "center" }}>
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
              {otpSent && (
                <>
                  <input
                    className="input-signup"
                    placeholder="Enter OTP"
                    name="otp"
                    onChange={handleInput}
                  />
                  <br />
                  <br />
                </>
              )}

               <button
                className="btn"
                style={{ background: "#3A9D9B" }}
                type="submit"
              >
                {otpSent ? "Submit" : "Send OTP"}
              </button>
            </form><br/>
            <p style={{textAlign:"center"}}>New Here? <Link to="/signup">SignUp Here</Link> to connect with trusted vets</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
