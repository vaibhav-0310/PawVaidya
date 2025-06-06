import React from 'react';
import {Link} from 'react-router-dom';

function Card({ title, image, description }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 custom-card">
                <div className="image-container">
                    <img src={image} className="card-img-top zoom-image" alt={title} />
                </div>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <Link to={`/blogs/${title}`} style={{textDecoration:"none"}}>Read More &rarr;</Link>
                </div>
            </div>
        </div>
    );
}

export default Card;
