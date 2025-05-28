import React from 'react';
import { Link } from 'react-router';
import logo from "../assests/logo.svg";

function Navbar() {
    return ( 
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-all">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">
        <img src={logo} className='paw' />
        </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav nav nav-underline">
        <li class="nav-item">
          <Link class="nav-link " aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/">Pets</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/">Essentials</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" >Consult a Vet</Link>
        </li>
         <li class="nav-item">
          <Link class="nav-link" >Patient EHR</Link>
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