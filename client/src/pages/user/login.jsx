import React, { useState } from "react";
import login from "../../assests/login.svg"
import axios from "axios";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

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
      toast.success("OTP sent successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Failed to send OTP", {
        position: "center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", form, {
        withCredentials: true,
      });
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(response.data.message);
      navigate("/");
    } catch (err) {
      console.log(err.response?.data?.error || err.message);
      toast.error(err.response?.data?.error|| "Login failed", {
        position: "center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
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
