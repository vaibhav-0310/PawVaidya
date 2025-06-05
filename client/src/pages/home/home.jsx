import React from 'react';
import Navbar from '../Navbar';
import Hero from './hero';
import HorizontalScrollCategories from './scroll';
import Services from './services';
import Footer from "../footer";
import Image from './image';
import { data } from 'react-router';

function Home() {
    const image=[{
        image:"https://cdn.prod.website-files.com/67607a4da94c236117377bec/677c7c4ed1ede0d10b106a30_Frame%202147226624.webp"
    },
{
    image:"https://cdn.prod.website-files.com/67607a4da94c236117377bec/677c7c4e9299666fd58ac9ba_Frame%202147226625.webp"
},{
    image:"https://cdn.prod.website-files.com/67607a4da94c236117377bec/677c7c4ea22068717e76f7ea_Frame%202147226626.webp"
},
{
    image:"https://cdn.prod.website-files.com/67607a4da94c236117377bec/677c7c4f46b218e13109bf8b_Frame%202147226625-1.webp"
}];
    return ( 
     <>
     <Navbar/>
     <Hero/>
     <HorizontalScrollCategories/>
     <Services/>
     <div className="container mt-5 image-container-home ml-4">
        <div className="row">
     {image.map((data, index) => (
        <div className="col-3">
           <Image key={index} image={data.image} />
        </div>
     ))}
     </div>
     </div>
     <Footer/>
     </>
     );
}

export default Home;    