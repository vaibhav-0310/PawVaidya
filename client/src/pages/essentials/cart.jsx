import React from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useEffect } from 'react';
import { useState } from 'react';
function Cart() {
    let [cartItems, setCartItems] = useState([]);
    useEffect(() => {
  const fetchCartItems = async () => {
    try {
      const response = await axios.get("/api/cart"); // Adjust the route if needed
      if (response.status === 200) {
        console.log("Cart items fetched successfully");
        setCartItems(response.data);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  fetchCartItems();
}, []);

    return (
  <>
    <Navbar />
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      <div className="row">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100" style={{ padding: "20px" }}>
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Price: {item.price}</p>
                  <p className="card-text">Type: {item.type}</p>
                  <button className="btn btn-dark mt-auto" style={{ borderRadius: "50px" }}>
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>
    </div>
    <Footer />
  </>
);}

    

export default Cart;