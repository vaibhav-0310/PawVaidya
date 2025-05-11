import React, { useState } from "react";
import image from "../assests/image.svg";
import logo from "../assests/logo.svg";
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
      const re = await axios.post("http://localhost:8080/send-otp", {email:form.email});
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
          <img src={image} alt="Signup" style={{ height: "80%" }} />
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
              style={{ textAlign: "center" }}
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
