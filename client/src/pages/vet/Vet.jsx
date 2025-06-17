import React from 'react';
import Footer from "../../utils/footer.jsx";
import Container from "./container.jsx";
import Image from './image.jsx';
import Team from './team.jsx';
import Services from './services.jsx';
function Vet() {
    const data=[
        {
            image: "https://cdn.prod.website-files.com/67607a4da94c236117377c10/677c7b208e5d344187df3f26_Frame%202147226655.webp",
            name:"Dr. Sandra",
            post:"Preventive Care Specialist",
        },
        {
            image: "https://cdn.prod.website-files.com/67607a4da94c236117377c10/677c7b168c35cfc04e2ed001_Frame%202147226654.webp",
            name:"Dr. Lucia",
            post:"Grooming Expert",
        },
        {
            image: "https://cdn.prod.website-files.com/67607a4da94c236117377c10/677c7b089299666fd589bf4b_Frame%202147226648.webp",
            name:"Dr. Lily",
            post:"Surgeon",
        },
        {
            image: "https://cdn.prod.website-files.com/67607a4da94c236117377c10/677c7b029299666fd589b980_Frame%202147226649.webp",
            name:"Dr. Simth",
            post:"Diagnostic Specialist",
        },
        {
            image: "https://cdn.prod.website-files.com/67607a4da94c236117377c10/677c7af0608d1e4140db5b84_Frame%202147226647.webp",
            name:"Dr. Laura",
            post:"Veterinary Specialist",
        },
        {
            image: "https://cdn.prod.website-files.com/67607a4da94c236117377c10/677c7ae9f96aeeb814d72c5f_Frame%202147226616.webp",
            name:"Dr. Vaibhav",
            post:"Veterinarian",
        },
    ]
    return (  
        <>
        <Container/>
        <Image/>
        <Services/>
        <div className="container mt-5">
            <h2 className="text-center mb-4">Meet Our Team</h2>
            <div className="row">
                {data.map((item, index) => (
                    <Team key={index} name={item.name} image={item.image} post={item.post} />
                ))}
            </div>
        </div>
        
        <Footer/>
        </>
    );
}

export default Vet;