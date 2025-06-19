import React from 'react';
import axios from 'axios';


function Items({ title, image, price, type }) {

  const cartSubmit=async ()=>{
    try{
      const response=await axios.post("/api/cart",{
        title,
        image,
        price,
        type
      });
      if(response.status===201){
        alert("Item added to cart successfully");
      }
    }catch(e){
      console.error(e);
    }
  }
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100" style={{ padding: "20px" }}>
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Price: &#x20B9;{price}</p>
          <p className="card-text">Type: {type}</p>
          <a href="#" className="btn btn-dark mt-auto" style={{borderRadius:"50px !important"}} onClick={cartSubmit}>Add to Cart</a>
        </div>
      </div>
    </div>
  );
}


export default Items;