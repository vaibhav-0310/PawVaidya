import React from 'react';
import "./services.css";
import { useNavigate } from 'react-router';

function Services() {
    const navigate = useNavigate();
    const handleBookNow = () => {
       navigate("chat/686d64cc18f4beccba94317e");
    }
    return (
        <div className="container mt-5 service mb-5">
            <h3 className="text-center mb-5">Veterinary services tailored for your pet’s needs</h3>
            <div className="row text-center">
                <div className="col-md-4 mb-4">
                    <span className="service-header">Preventative care</span>
                    <p>Our preventative care services ensure your pet stays healthy and happy. Regular check-ups and vaccinations are key to preventing illness.</p>
                    <button className='book-btn btn' onClick={handleBookNow}>Book Now</button>
                </div>
                <div className="col-md-4 mb-4 bro">
                    <span className="service-header">Essential vaccinations</span>
                    <p>Vaccinations are crucial for your pet's health and well-being. Our expert veterinarians provide comprehensive vaccination services.</p>
                    <button className='book-btn btn' onClick={handleBookNow}>Book Now</button>
                </div>
                <div className="col-md-4 mb-4 bro">
                    <span className="service-header">Surgical care</span>
                    <p>Our surgical services are designed to ensure your pet receives the highest level of care. From routine procedures to complex surgeries.</p>
                    <button className='book-btn btn' onClick={handleBookNow}>Book Now</button>
                </div>
            </div>
        </div>
    );
}

export default Services;
