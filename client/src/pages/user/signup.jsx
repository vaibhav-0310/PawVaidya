import React, { useState } from "react";
import image from "../../assests/image.svg";
import logo from "../../assests/logo.svg";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    state: "",
    district: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const re = await axios.post("http://localhost:8080/send-otp", {
        email: form.email,
      });
      setOtpSent(true);
      alert("OTP sent to your email");
    } catch (err) {
      console.log(err);
      alert("Failed to send OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signup", form);
      alert("User created successfully");
      console.log(response.data.message);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Signup failed");
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
          }}
        >
          <div style={{ textAlign: "left" }}>
            <img src={logo} alt="logo" style={{ height: "100px" }} />
          </div>
          <div className="row">
            <div className="col-11" style={{ height: "80vh" }}>
              <img src={image} alt="Signup" style={{ height: "100%" }} />
            </div>
            <div className="button col-1" style={{ textAlign: "right" }}>
              <button
                className="signup-button"
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
                  
                }}
              >
                Signup
              </button>
              <br></br>
              <br></br>
              <button
                className="login-button"
                style={{
                  backgroundColor: "#d7cfc2",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color:"#9e9284",
                  
                }}
                onClick={() => (window.location.href = "/login")}
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
            <div style={{ textAlign: "right" }}>
              <h3>Welcome</h3>
              <h3>To</h3>
              <h3 style={{ color: "#3A9D9B" }}>PawVaidya !</h3>
              <p>Access expert advice for your furry friends</p>
            </div>

            <form
              onSubmit={otpSent ? handleSubmit : handleSendOtp}
              style={{ textAlign: "right" }}
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
  );
}

export default Signup;
