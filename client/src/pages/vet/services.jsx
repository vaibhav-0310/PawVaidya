import React from 'react';
import setho from "../../assests/setho.svg";

function Services() {
  return (
    <>
      <div className="container mt-5 service">
        <div className=" text-center">
          &#128308; Services We Provide
        </div>
        <div className="row">
          <div className="col-3">
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={setho} className="img-fluid rounded-start"></img>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;