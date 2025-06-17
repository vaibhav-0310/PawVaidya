import React from 'react';
import Navbar from '../../utils/Navbar';
import Hero from './hero';
import HorizontalScrollCategories from './scroll';
import Services from './services';
import Footer from "../../utils/footer";
import Gallery from '../../utils/gallery';
import { data } from 'react-router';

function Home() {
    return ( 
     <>
     <Navbar/>
     <Hero/>
     <HorizontalScrollCategories/>
     <Services/>
     <Gallery/>
     <Footer/>
     </>
     );
}

export default Home;    