import React, { useState } from "react";
import image from "../../assests/image.svg";
import logo from "../../assests/logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    state: "",
    district: "",
    otp: "",
  });
  const Navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const re = await axios.post("/api/send-otp", {
        email: form.email,
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
      const response = await axios.post("/api/signup", form, {
        withCredentials: true,
      });
      toast.success("Signup successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      Navigate("/");
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.error || "Signup failed", {
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
          }}
        >
          
          <div className="row">
            <div className="col-11" style={{ height: "80vh" }}>
              <img src={image} alt="Signup" style={{ height: "100%" , marginTop:"10vh"}} />
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
            <div style={{ textAlign: "left" }}>
              <h3>Welcome</h3>
              <h3>To</h3>
              <h3 style={{ color: "#3A9D9B" }}>PawVaidya !</h3>
              <p>Access expert advice for your furry friends</p>
            </div>

            <form
              onSubmit={otpSent ? handleSubmit : handleSendOtp}
              style={{ textAlign: "left" }}
            >
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
                placeholder="Email"
                name="email"
                type="email"
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
              <input
                className="input-signup"
                placeholder="State"
                name="state"
                onChange={handleInput}
              />
              <br />
              <br />
              <input
                className="input-signup"
                placeholder="District"
                name="district"
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
              <input type="checkbox" required />&nbsp;
              I fully accept the terms and conditions
              <br />
              <br />
              <button
                className="btn"
                style={{ background: "#3A9D9B" }}
                type="submit"
              >
                {otpSent ? "Submit" : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Signup;
