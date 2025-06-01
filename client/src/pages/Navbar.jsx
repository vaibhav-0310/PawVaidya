import React from 'react';
import { Link } from 'react-router';
import logo from "../assests/logo.svg";

function Navbar() {
    return ( 
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-all">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
        <img src={logo} className='paw' />
        </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav nav nav-underline">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">Pets</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">Essentials</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" >Consult a Vet</Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link" >Patient PHR</Link>
        </li>
      </ul>
      </div>
    </div>
    <div >
        <Link to={"/login"}>
        <button className='btn btn-dark but-1'>Login</button>
        </Link>
    </div>
  </div>
</nav>
        </>
     );
}

export default Navbar;