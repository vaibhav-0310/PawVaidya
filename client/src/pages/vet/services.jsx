import React from 'react';
import setho from "../../assests/setho.svg";

function Services() {
  return (
    <>
      <div className="container mt-5 service">
        <div className=" text-center mb-5">
          <h2> Discover our simple
three-step process for exceptional pet <span className="back">care</span></h2>
        </div>
        <div className="row ms-lg-5 ">
          <div className="col-3 text-start">
             <b>Schedule for a comprehensive assessment</b>
           <br />
           <p style={{fontSize:"12px"}}>Book an appointment to discuss your pet's health and wellness.</p>

            </div>

            <div className="col-3 offset-1 text-start">
             <b>Connect through real-time video and audio conferencing.</b>
           <br />
           <p style={{fontSize:"12px"}}>Enable real-time video or audio calls between patients and licensed healthcare professionals.</p>

            </div>

              <div className="col-3 offset-1 text-start">
             <b>Cancel with our various payment methods.</b>
           <br />
           <p style={{fontSize:"12px"}}> Payment Methods for Pet Health and Wellbeing Consultation..</p>

            </div>
          </div>
        </div>
    </>
  );
}

export default Services;