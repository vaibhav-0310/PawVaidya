import React from 'react';
import Navbar from '../Navbar';
import Hero from './hero';
import HorizontalScrollCategories from './scroll';
import Services from './services';
import Footer from "../footer";

function Home() {
    return ( 
     <>
     <Navbar/>
     <Hero/>
     <HorizontalScrollCategories/>
     <Services/>
     <Footer/>
     </>
     );
}

export default Home;    