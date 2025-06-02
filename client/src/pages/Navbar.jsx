import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import logo from "../assests/logo.svg";
import axios from 'axios';

function Navbar() {
  const [user, setUser] = useState({ username: "" });

  useEffect(() => {
    axios.get("http://localhost:8080/auth-status", { withCredentials: true })
      .then((res) => {
        console.log("Auth status:", res.data);
        if (res.data.isAuthenticated) {
      
          setUser({ username: res.data.user.username });
        } else {
          console.log("User not logged in");
          setUser({ username: "" }); 
        }
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        setUser({ username: "" }); 
      });
  }, []); 

  useEffect(() => {
    if (user.username) {
      console.log("User updated:", user);
    }
  }, [user]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-all">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} className='paw' alt="Logo" />
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav nav nav-underline">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pets">Pets</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/essentials">Essentials</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/consult">Consult a Vet</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/phr">Patient PHR</Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            {user.username ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted">Welcome, {user.username}</span>
                
              </div>
            ) : (
              <Link to="/login">
                <button className='btn btn-dark but-1'>Login</button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;