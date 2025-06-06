import React from 'react';

function Team({name,image,post}) {
    return ( 
        <>
          <div className="col-md-4 mb-4">
            <div className="card h-100 custom-card">
                <div className="image-container">
                    <img src={image} className="card-img-top zoom-image" alt={name} />
                </div>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{post}</p>
                    <p>Connect!</p>
                </div>
            </div>
        </div>
        </>
     );
}

export default Team;