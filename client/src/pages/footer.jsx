import React from 'react';
import Paw from "../assests/paw.svg";

function Footer() {
    return ( <>
    <div className="container footer-container">
        <div className="row">
            <div className="col-3">
                <img src={Paw} className="footer-logo" alt="Logo" style={{color:"pink",height:"50px"}} />&nbsp;
                PawVadiya
            </div>
            <div className="col-2">
                <h5>About Us</h5>
                <ul className="list-unstyled">
                    <li>Our Story</li>
                    <li>Team</li>
                    <li>Careers</li>
                </ul>

            </div>
            <div className="col-2">
                <h5>Services</h5>
                <ul className="list-unstyled">
                    <li>Pet Adoption</li>
                    <li>Pet Care</li>
                    <li>Training</li>
                </ul>
            </div>
            <div className="col-2">
                <h5>Contact Us</h5>
                <ul className="list-unstyled">
                    <li><i class="fa-solid fa-envelope"></i>&nbsp; info@pawvadia.com</li>
                    <li><i class="fa-solid fa-phone"></i>&nbsp; 1800 123 4567</li>
                    <li><i class="fa-solid fa-location-dot"></i>&nbsp; 123 random street, India.</li>
                    <li><i class="fa-brands fa-instagram"></i>&nbsp; <i class="fa-brands fa-x-twitter"></i>&nbsp;<i class="fa-brands fa-facebook"></i></li>
                </ul>
            </div>
            <div className="col-3"></div>
        </div><br></br><br></br>
       &#169; 2025 PawVadiya. All rights reserved. 
    </div>
    </> );
}

export default Footer;