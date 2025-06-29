import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


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
        toast.success("Item added to cart successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }catch(e){
      console.error(e);
      toast.error(e.response?.data?.message || "Failed to add item to cart");
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