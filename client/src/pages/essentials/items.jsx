import React from 'react';


function Items({ title, image, price, type }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100" style={{ padding: "20px" }}>
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Price: {price}</p>
          <p className="card-text">Type: {type}</p>
          <a href="#" className="btn btn-dark mt-auto" style={{borderRadius:"50px !important"}}>Add to Cart</a>
        </div>
      </div>
    </div>
  );
}


export default Items;